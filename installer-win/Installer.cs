using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using System.Windows.Forms;
using Microsoft.Win32;

[assembly: System.Reflection.AssemblyTitle("AIYOUDSH 增强安装器")]
[assembly: System.Reflection.AssemblyProduct("AIYOUDSH")]
[assembly: System.Reflection.AssemblyVersion("0.5.0.0")]
[assembly: System.Reflection.AssemblyFileVersion("0.5.0.0")]

namespace AIYOUDSH.Installer
{
    internal sealed class Outcome
    {
        internal bool Succeeded;
        internal string Title;
        internal string Detail;
        internal Outcome(bool succeeded, string title, string detail)
        { Succeeded = succeeded; Title = title; Detail = detail; }
    }

    internal sealed class CapturedOutput
    {
        internal int ExitCode;
        internal string Output;
        internal string Error;
        internal bool Truncated;
        internal bool TimedOut;
    }

    internal sealed class RuntimeCommand
    {
        internal string Executable;
        internal bool Electron;
        internal RuntimeCommand(string executable, bool electron)
        { Executable = executable; Electron = electron; }
    }

    internal static class Commands
    {
        // ProcessStartInfo.Arguments on .NET Framework uses the Windows argv rules.
        // Quote every argument, including empty strings and trailing backslashes.
        internal static string Quote(string value)
        {
            if (value == null || value.IndexOf('\0') >= 0) throw new ArgumentException("Invalid argument.");
            var result = new StringBuilder("\"");
            int slashes = 0;
            foreach (char ch in value)
            {
                if (ch == '\\') { slashes++; continue; }
                if (ch == '"') result.Append('\\', slashes * 2 + 1).Append('"');
                else result.Append('\\', slashes).Append(ch);
                slashes = 0;
            }
            return result.Append('\\', slashes * 2).Append('"').ToString();
        }

        internal static ProcessStartInfo StartInfo(string executable, IEnumerable<string> arguments,
            string workingDirectory, bool electron)
        {
            var info = new ProcessStartInfo {
                FileName = executable, Arguments = String.Join(" ", arguments.Select(Quote)),
                WorkingDirectory = workingDirectory, UseShellExecute = false, CreateNoWindow = true,
                RedirectStandardOutput = true, RedirectStandardError = true,
                StandardOutputEncoding = Encoding.UTF8, StandardErrorEncoding = Encoding.UTF8
            };
            // An inherited Node preload must not change what the packaged installer executes.
            info.EnvironmentVariables.Remove("NODE_OPTIONS");
            info.EnvironmentVariables.Remove("NODE_PATH");
            info.EnvironmentVariables.Remove("ELECTRON_RUN_AS_NODE");
            if (electron) info.EnvironmentVariables["ELECTRON_RUN_AS_NODE"] = "1";
            return info;
        }

        private static async Task<Tuple<string, bool>> Drain(StreamReader reader, int limit)
        {
            var retained = new StringBuilder();
            var buffer = new char[4096];
            bool truncated = false;
            int count;
            while ((count = await reader.ReadAsync(buffer, 0, buffer.Length).ConfigureAwait(false)) > 0)
            {
                int take = Math.Min(count, Math.Max(0, limit - retained.Length));
                if (take > 0) retained.Append(buffer, 0, take);
                if (take < count) truncated = true;
            }
            return Tuple.Create(retained.ToString(), truncated);
        }

        internal static async Task<CapturedOutput> Run(string executable, IEnumerable<string> arguments,
            string workingDirectory, bool electron, int timeoutMilliseconds)
        {
            using (var child = new Process { StartInfo = StartInfo(executable, arguments, workingDirectory, electron) })
            {
                child.Start();
                // Both pipes are drained independently. Output is bounded and never shown verbatim.
                var stdout = Drain(child.StandardOutput, 256 * 1024);
                var stderr = Drain(child.StandardError, 32 * 1024);
                var exited = Task.Run(() => child.WaitForExit());
                bool timedOut = false;
                if (timeoutMilliseconds > 0 && await Task.WhenAny(exited, Task.Delay(timeoutMilliseconds)).ConfigureAwait(false) != exited)
                {
                    timedOut = true;
                    try { child.Kill(); } catch (InvalidOperationException) { }
                }
                await exited.ConfigureAwait(false);
                var output = await stdout.ConfigureAwait(false);
                var error = await stderr.ConfigureAwait(false);
                return new CapturedOutput { ExitCode = child.ExitCode, Output = output.Item1,
                    Error = error.Item1, Truncated = output.Item2, TimedOut = timedOut };
            }
        }

        internal static string[] InstallerArguments(string root, string action, string application)
        {
            if (action != "install" && action != "uninstall") throw new ArgumentException("Invalid action.");
            var args = new List<string> { Path.Combine(root, "installer", "installer.mjs"), action,
                "--runtime", Path.Combine(root, "runtime") };
            if (!String.IsNullOrEmpty(application)) { args.Add("--app"); args.Add(Path.GetDirectoryName(application)); }
            return args.ToArray();
        }
    }

    internal static class Results
    {
        internal static Dictionary<string, object> Parse(string json)
        {
            if (String.IsNullOrWhiteSpace(json) || json.Length > 256 * 1024) return null;
            try {
                var serializer = new JavaScriptSerializer { MaxJsonLength = 256 * 1024, RecursionLimit = 32 };
                return serializer.DeserializeObject(json) as Dictionary<string, object>;
            } catch (ArgumentException) { return null; } catch (InvalidOperationException) { return null; }
        }

        private static bool IsTrue(Dictionary<string, object> data, string key)
        { object value; return data.TryGetValue(key, out value) && value is bool && (bool)value; }

        private static bool HasBoolean(Dictionary<string, object> data, string key)
        { object value; return data.TryGetValue(key, out value) && value is bool; }

        private static bool HasConflicts(Dictionary<string, object> data)
        {
            object value;
            if (!data.TryGetValue("conflicts", out value)) return false;
            var values = value as ICollection;
            return values == null || values.Count > 0;
        }

        internal static Outcome Failure(string action, string code)
        {
            string title = action == "uninstall" ? "卸载未完成" : "安装未完成";
            string detail;
            switch (code) {
                case "APP_MISSING": case "APP_NOT_FOUND": case "ENOENT":
                    detail = "未找到所需文件。请确认官方应用已经安装，并重新下载完整增强安装包。"; break;
                case "APP_VERSION": case "APP_HASH": case "APP_COMPATIBILITY": case "APP_FORMAT": case "APP_PLATFORM":
                    detail = "当前官方应用与本安装包支持的版本不一致。请使用对应版本的增强安装包。"; break;
                case "PROFILE_FORMAT":
                    detail = "请先正常打开官方 DeepSeek Harness 一次，完成初始化后再安装增强。"; break;
                case "INSTALLER_BUSY":
                    detail = "另一个安装或卸载操作正在进行，请等待完成后重试。"; break;
                case "LINK_CONFLICT": case "PROFILE_CONFLICT": case "STATE_PATH": case "STATE_FORMAT":
                case "PATCH_CHANGED": case "PATCH_PATH": case "ROLLBACK_CONFLICT":
                case "BACKUP_CHANGED": case "RUNTIME_CHANGED":
                    detail = "检测到已有文件或配置发生变化。相关内容已保留，请检查原安装状态后重试。"; break;
                case "PARTIAL":
                    detail = "部分增强文件已被修改并保留，卸载尚未全部完成。请检查原安装状态。"; break;
                case "RESULT":
                    return new Outcome(false, "操作结果尚未确认", "没有收到完整的安装结果，请重新运行本安装器。");
                default:
                    detail = "操作没有完成。请重试；若仍无法完成，请使用完整安装包再次操作。"; break;
            }
            return new Outcome(false, title, detail);
        }

        internal static Outcome Interpret(string action, CapturedOutput output)
        {
            var data = Parse(output.Output);
            if (output.ExitCode != 0) {
                var error = Parse(output.Error);
                object code;
                return Failure(action, error != null && error.TryGetValue("code", out code) ? code as string : null);
            }
            object returnedAction, ok;
            if (output.Truncated || data == null || !data.TryGetValue("action", out returnedAction) ||
                !String.Equals(returnedAction as string, action, StringComparison.Ordinal) ||
                (data.TryGetValue("ok", out ok) && (!(ok is bool) || !(bool)ok))) return Failure(action, "RESULT");
            if (HasConflicts(data)) return Failure(action, "PARTIAL");
            if (!HasBoolean(data, "changed")) return Failure(action, "RESULT");
            if (action == "install") {
                object modules;
                if (!IsTrue(data, "compatible") || !data.TryGetValue("modules", out modules) ||
                    !(modules is int) || (int)modules < 1) return Failure(action, "RESULT");
                return new Outcome(true, "增强已安装", "请完全退出并重新打开 AIYOUDSH，查看新的工作区与扩展入口。");
            }
            if (!HasBoolean(data, "installed")) return Failure(action, "RESULT");
            if (IsTrue(data, "installed")) return Failure(action, "PARTIAL");
            return new Outcome(true, "增强已卸载", "请完全退出并重新打开官方应用。会话与个人文件保持原位。");
        }
    }

    internal static class Applications
    {
        // Official executable names are deliberately bounded; never execute arbitrary files found by traversal.
        internal static readonly string[] Names = { "DeepSeek Harness.exe" };

        private static IEnumerable<string> RegistryInstallLocations(RegistryHive hive, RegistryView view)
        {
            var directories = new List<string>();
            try {
                using (var root = RegistryKey.OpenBaseKey(hive, view))
                using (var uninstall = root.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\Uninstall")) {
                    if (uninstall == null) return directories;
                    foreach (string name in uninstall.GetSubKeyNames()) {
                        using (var entry = uninstall.OpenSubKey(name)) {
                            if (entry == null || !String.Equals(entry.GetValue("DisplayName") as string,
                                "DeepSeek Harness", StringComparison.OrdinalIgnoreCase)) continue;
                            string directory = entry.GetValue("InstallLocation") as string;
                            if (!String.IsNullOrWhiteSpace(directory)) directories.Add(directory);
                        }
                    }
                }
            } catch (System.Security.SecurityException) { }
            catch (UnauthorizedAccessException) { } catch (IOException) { }
            return directories;
        }

        internal static string FromDirectory(string directory)
        {
            if (String.IsNullOrWhiteSpace(directory)) return null;
            try {
                string root = Path.GetFullPath(directory);
                if (!File.Exists(Path.Combine(root, "resources", "app.asar"))) return null;
                foreach (string name in Names) {
                    string candidate = Path.Combine(root, name);
                    if (File.Exists(candidate)) return candidate;
                }
            } catch (ArgumentException) { } catch (NotSupportedException) { } catch (PathTooLongException) { }
            return null;
        }

        internal static string Find()
        {
            var roots = new List<string>();
            roots.AddRange(RegistryInstallLocations(RegistryHive.CurrentUser, RegistryView.Default));
            roots.AddRange(RegistryInstallLocations(RegistryHive.LocalMachine, RegistryView.Registry32));
            if (Environment.Is64BitOperatingSystem)
                roots.AddRange(RegistryInstallLocations(RegistryHive.LocalMachine, RegistryView.Registry64));
            string local = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            string programFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
            string programFilesX86 = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86);
            foreach (string parent in new [] { local, Path.Combine(local, "Programs"), programFiles, programFilesX86 })
                if (!String.IsNullOrEmpty(parent)) foreach (string directory in new [] { "DeepSeek Harness", "deepseek-harness" })
                    roots.Add(Path.Combine(parent, directory));
            foreach (string root in roots.Distinct(StringComparer.OrdinalIgnoreCase)) {
                string result = FromDirectory(root); if (result != null) return result;
            }
            return null;
        }

        internal static IEnumerable<string> NodeCandidates()
        {
            var candidates = new List<string>();
            foreach (string directory in (Environment.GetEnvironmentVariable("PATH") ?? "").Split(Path.PathSeparator))
                if (!String.IsNullOrWhiteSpace(directory)) try {
                    string root = Environment.ExpandEnvironmentVariables(directory.Trim().Trim('"'));
                    if (Path.IsPathRooted(root)) candidates.Add(Path.Combine(root, "node.exe"));
                } catch (ArgumentException) { }
            foreach (string parent in new [] { Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),
                Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData) })
                if (!String.IsNullOrEmpty(parent)) candidates.Add(Path.Combine(parent, "nodejs", "node.exe"));
            return candidates.Where(File.Exists).Distinct(StringComparer.OrdinalIgnoreCase);
        }

        internal static async Task<bool> SupportedNode(string executable, bool electron, string root)
        {
            try {
                var result = await Commands.Run(executable, new [] { "--version" }, root, electron, 5000).ConfigureAwait(false);
                if (result.ExitCode != 0 || result.TimedOut || result.Truncated) return false;
                string text = result.Output.Trim();
                Version version;
                return text.StartsWith("v", StringComparison.Ordinal) && Version.TryParse(text.Substring(1), out version) && version.Major >= 24;
            } catch (Exception error) {
                if (error is System.ComponentModel.Win32Exception || error is IOException || error is InvalidOperationException) return false;
                throw;
            }
        }

        internal static async Task<RuntimeCommand> FindRuntime(string root, string application)
        {
            foreach (string node in NodeCandidates())
                if (await SupportedNode(node, false, root).ConfigureAwait(false)) return new RuntimeCommand(node, false);
            if (application != null && await SupportedNode(application, true, root).ConfigureAwait(false))
                return new RuntimeCommand(application, true);
            return null;
        }
    }

    internal sealed class InstallerForm : Form
    {
        private readonly string root;
        private readonly string initialAction;
        private readonly string screenshot;
        private string application;
        private bool busy;
        private Task operation;
        private readonly Label statusTitle = new Label();
        private readonly Label statusDetail = new Label();
        private readonly Label appStatus = new Label();
        private readonly Button install = new Button();
        private readonly Button uninstall = new Button();
        private readonly Button open = new Button();
        private readonly Button choose = new Button();
        private readonly ProgressBar progress = new ProgressBar();
        private readonly Color accent = Color.FromArgb(83, 77, 186);

        internal InstallerForm(string resourceRoot, string action, string selectedApplication, string screenshotPath)
        {
            root = resourceRoot; initialAction = action; screenshot = screenshotPath;
            Environment.ExitCode = initialAction == null ? 0 : 1;
            application = selectedApplication ?? Applications.Find();
            Text = "AIYOUDSH 增强安装器";
            ClientSize = new Size(680, 480); MinimumSize = Size; MaximumSize = Size;
            StartPosition = FormStartPosition.CenterScreen; MaximizeBox = false;
            FormBorderStyle = FormBorderStyle.FixedSingle; AutoScaleMode = AutoScaleMode.Dpi;
            BackColor = Color.FromArgb(246, 247, 250);
            Font = new Font("Microsoft YaHei UI", 9F); Icon = SystemIcons.Application;
            AddLabel("AI", 32, 33, 52, 52, 23F, true, accent);
            AddLabel("AIYOUDSH 增强安装器", 102, 33, 540, 42, 19F, true, Color.FromArgb(28, 31, 40));
            AddLabel("官方 DeepSeek Harness 的界面与扩展增强", 104, 79, 540, 26, 10F, false, Color.DimGray);
            AddLabel("让对话、项目、资产与常用工具，在熟悉的工作区里自然衔接。", 35, 127, 610, 30, 10F, false, Color.DimGray);
            var panel = new Panel { Bounds = new Rectangle(34, 174, 612, 106), BackColor = Color.White };
            Controls.Add(panel);
            statusTitle.SetBounds(22, 18, 570, 26); statusTitle.Font = new Font(Font.FontFamily, 11F, FontStyle.Bold);
            statusTitle.Text = "准备就绪";
            statusDetail.SetBounds(22, 51, 570, 43); statusDetail.ForeColor = Color.DimGray;
            statusDetail.Text = "点击“安装增强”，将 AIYOU 的工作区体验加入官方应用。";
            panel.Controls.Add(statusTitle); panel.Controls.Add(statusDetail);
            progress.SetBounds(34, 284, 612, 4); progress.Style = ProgressBarStyle.Marquee;
            progress.MarqueeAnimationSpeed = 25; progress.Visible = false; Controls.Add(progress);
            ConfigureButton(install, "安装增强", 34, 311, 195, true);
            ConfigureButton(uninstall, "卸载增强", 243, 311, 195, false);
            ConfigureButton(open, "打开 AIYOUDSH", 452, 311, 194, false);
            appStatus.SetBounds(35, 375, 440, 29); appStatus.ForeColor = Color.DimGray;
            Controls.Add(appStatus);
            ConfigureButton(choose, "选择应用目录", 495, 370, 151, false);
            choose.Height = 32;
            AddLabel("安装和卸载由本机完成，官方应用仍是你的日常使用入口。", 35, 432, 610, 24, 8F, false, Color.Gray);
            RefreshApplicationStatus();
            install.Click += (sender, args) => BeginOperation("install");
            uninstall.Click += (sender, args) => BeginOperation("uninstall");
            choose.Click += (sender, args) => SelectApplication();
            open.Click += (sender, args) => OpenApplication();
            AcceptButton = install;
            Shown += (sender, args) => {
                if (screenshot != null) {
                    var timer = new Timer { Interval = 600 };
                    timer.Tick += (s, e) => { timer.Stop(); timer.Dispose(); SaveScreenshot(); };
                    timer.Start();
                } else if (initialAction != null) BeginInvoke(new Action(() => BeginOperation(initialAction)));
            };
            FormClosing += (sender, args) => {
                if (busy || (operation != null && !operation.IsCompleted)) { args.Cancel = true; SetStatus(new Outcome(false, "操作仍在进行", "请等待当前安装或卸载完成，再关闭窗口。")); }
            };
        }

        private void AddLabel(string text, int x, int y, int width, int height, float size, bool bold, Color color)
        {
            Controls.Add(new Label { Text = text, Bounds = new Rectangle(x, y, width, height), ForeColor = color,
                Font = new Font(Font.FontFamily, size, bold ? FontStyle.Bold : FontStyle.Regular), AutoSize = false });
        }

        private void ConfigureButton(Button button, string text, int x, int y, int width, bool primary)
        {
            button.SetBounds(x, y, width, 38); button.Text = text; button.FlatStyle = FlatStyle.Flat;
            button.BackColor = primary ? accent : Color.White; button.ForeColor = primary ? Color.White : Color.FromArgb(45, 47, 55);
            button.FlatAppearance.BorderColor = primary ? accent : Color.FromArgb(213, 216, 225);
            button.UseVisualStyleBackColor = false; Controls.Add(button);
        }

        private void SetStatus(Outcome outcome)
        { statusTitle.Text = outcome.Title; statusTitle.ForeColor = outcome.Succeeded ? accent : Color.FromArgb(135, 63, 52); statusDetail.Text = outcome.Detail; Environment.ExitCode = outcome.Succeeded ? 0 : 1; }

        private void RefreshApplicationStatus()
        { appStatus.Text = application == null ? "尚未找到官方应用，请选择安装目录。" : "已找到官方应用，可安装增强或打开应用。"; }

        private bool SelectApplication()
        {
            using (var dialog = new FolderBrowserDialog { Description = "选择官方 DeepSeek Harness 的安装目录（包含程序和 resources 文件夹）", ShowNewFolderButton = false })
            {
                if (application != null) dialog.SelectedPath = Path.GetDirectoryName(application);
                if (dialog.ShowDialog(this) != DialogResult.OK) return false;
                string selected = Applications.FromDirectory(dialog.SelectedPath);
                if (selected == null) {
                    SetStatus(new Outcome(false, "未找到官方应用", "请选择包含 DeepSeek Harness 程序及 resources 文件夹的安装目录。"));
                    return false;
                }
                application = selected; RefreshApplicationStatus(); return true;
            }
        }

        private void SetBusy(bool value)
        {
            busy = value; install.Enabled = uninstall.Enabled = open.Enabled = choose.Enabled = !value;
            progress.Visible = value; UseWaitCursor = value;
        }

        private void BeginOperation(string action)
        {
            if (busy) return;
            if (!Program.ValidResources(root)) {
                SetStatus(new Outcome(false, "安装包不完整", "缺少增强组件，请先解压完整安装包后再运行安装器。")); return;
            }
            if (action == "install" && application == null && !SelectApplication()) return;
            SetBusy(true);
            statusTitle.ForeColor = accent; statusTitle.Text = action == "install" ? "正在安装增强…" : "正在卸载增强…";
            statusDetail.Text = "正在检查本机兼容性并处理增强组件，请稍候。";
            operation = Perform(action);
        }

        private async Task Perform(string action)
        {
            try {
                var runtime = await Applications.FindRuntime(root, application);
                if (runtime == null) {
                    SetStatus(new Outcome(false, "需要运行环境", "未找到可用的 Node.js 24 及以上环境。请安装官方 Node.js，或选择受支持的 DeepSeek Harness 安装目录。")); return;
                }
                // Installation is allowed to finish its atomic transaction; the UI does not kill it on a timer.
                var result = await Commands.Run(runtime.Executable, Commands.InstallerArguments(root, action, application), root, runtime.Electron, 0);
                SetStatus(Results.Interpret(action, result));
            } catch (Exception error) {
                if (error is OutOfMemoryException || error is StackOverflowException) throw;
                SetStatus(Results.Failure(action, null));
            } finally { SetBusy(false); }
        }

        private void OpenApplication()
        {
            if (busy || (application == null && !SelectApplication())) return;
            try {
                var info = new ProcessStartInfo { FileName = application, WorkingDirectory = Path.GetDirectoryName(application), UseShellExecute = false };
                info.EnvironmentVariables.Remove("ELECTRON_RUN_AS_NODE");
                info.EnvironmentVariables.Remove("NODE_OPTIONS"); info.EnvironmentVariables.Remove("NODE_PATH");
                using (var child = Process.Start(info)) { }
            } catch (Exception error) {
                if (error is OutOfMemoryException || error is StackOverflowException) throw;
                SetStatus(new Outcome(false, "无法打开应用", "请通过开始菜单打开官方应用，或重新选择安装目录。"));
            }
        }

        private void SaveScreenshot()
        {
            try {
                string target = Path.GetFullPath(screenshot);
                Directory.CreateDirectory(Path.GetDirectoryName(target));
                using (var bitmap = new Bitmap(Width, Height)) {
                    DrawToBitmap(bitmap, new Rectangle(Point.Empty, Size));
                    bitmap.Save(target, System.Drawing.Imaging.ImageFormat.Png);
                }
                Environment.ExitCode = 0;
            } catch { Environment.ExitCode = 1; }
            Close();
        }
    }

    internal static class SelfTests
    {
        [DllImport("shell32.dll", SetLastError = true)]
        private static extern IntPtr CommandLineToArgvW([MarshalAs(UnmanagedType.LPWStr)] string commandLine, out int argc);
        [DllImport("kernel32.dll")]
        private static extern IntPtr LocalFree(IntPtr handle);

        private static void Assert(bool condition) { if (!condition) throw new InvalidOperationException("Self-test failed."); }

        internal static int Run(string resultPath)
        {
            int checks = 0; bool passed = false;
            try {
                var values = new [] { "", "simple", "with spaces", "中文 目录", "C:\\path with spaces\\", "quote\"value", "\\\\server\\share\\", "a\\\"b", "& $() % literal" };
                int count;
                IntPtr argv = CommandLineToArgvW("stub.exe " + String.Join(" ", values.Select(Commands.Quote)), out count);
                try {
                    Assert(argv != IntPtr.Zero && count == values.Length + 1);
                    for (int index = 0; index < values.Length; index++)
                        Assert(Marshal.PtrToStringUni(Marshal.ReadIntPtr(argv, (index + 1) * IntPtr.Size)) == values[index]);
                } finally { if (argv != IntPtr.Zero) LocalFree(argv); }
                checks++;
                var good = new CapturedOutput { ExitCode = 0, Output = "{\"action\":\"install\",\"compatible\":true,\"modules\":15,\"changed\":true}" };
                Assert(Results.Interpret("install", good).Succeeded); checks++;
                Assert(!Results.Interpret("uninstall", good).Succeeded); checks++;
                Assert(Results.Interpret("uninstall", new CapturedOutput { ExitCode = 0, Output = "{\"action\":\"uninstall\",\"installed\":false,\"changed\":false}" }).Succeeded); checks++;
                Assert(!Results.Interpret("uninstall", new CapturedOutput { ExitCode = 0, Output = "{\"action\":\"uninstall\",\"installed\":true,\"changed\":true,\"conflicts\":[\"edited\"]}" }).Succeeded); checks++;
                Assert(!Results.Interpret("install", new CapturedOutput { ExitCode = 0, Output = good.Output, Truncated = true }).Succeeded); checks++;
                Assert(!Results.Interpret("install", new CapturedOutput { ExitCode = 0, Output = "{}" }).Succeeded); checks++;
                string sensitive = "do-not-display-private-value";
                var failed = Results.Interpret("install", new CapturedOutput { ExitCode = 1, Error = "{\"code\":\"PROFILE_FORMAT\",\"message\":\"" + sensitive + "\"}" });
                Assert(!failed.Succeeded && !failed.Detail.Contains(sensitive) && failed.Detail.Contains("初始化")); checks++;
                string root = Path.GetFullPath(Path.Combine(Path.GetTempPath(), "AIYOUDSH 中文目录"));
                var args = Commands.InstallerArguments(root, "install", Path.Combine(root, "DeepSeek Harness.exe"));
                Assert(args.Length == 6 && args[0] == Path.Combine(root, "installer", "installer.mjs") && args[3] == Path.Combine(root, "runtime") && args[5] == root); checks++;
                var start = Commands.StartInfo("node.exe", new [] { "--version" }, root, false);
                Assert(!start.UseShellExecute && start.RedirectStandardOutput && start.RedirectStandardError && start.EnvironmentVariables["ELECTRON_RUN_AS_NODE"] == null && start.EnvironmentVariables["NODE_OPTIONS"] == null); checks++;
                var electron = Commands.StartInfo("DeepSeek Harness.exe", new [] { "--version" }, root, true);
                Assert(electron.EnvironmentVariables["ELECTRON_RUN_AS_NODE"] == "1"); checks++;
                Assert(Results.Parse("not JSON " + sensitive) == null); checks++;
                passed = true;
            } catch { passed = false; }
            if (resultPath != null) try {
                string target = Path.GetFullPath(resultPath);
                Directory.CreateDirectory(Path.GetDirectoryName(target));
                var report = new Dictionary<string, object> { { "ok", passed }, { "checks", checks },
                    { "platform", "windows" }, { "profileTouched", false }, { "officialApplicationStarted", false } };
                File.WriteAllText(target, new JavaScriptSerializer().Serialize(report) + Environment.NewLine, new UTF8Encoding(false));
            } catch { return 1; }
            return passed ? 0 : 1;
        }
    }

    internal static class Program
    {
        internal static bool ValidResources(string root)
        {
            return File.Exists(Path.Combine(root, "installer", "installer.mjs")) &&
                Directory.Exists(Path.Combine(root, "installer", "vendor", "yaml")) &&
                File.Exists(Path.Combine(root, "runtime", "manifest.json"));
        }

        [STAThread]
        private static int Main(string[] args)
        {
            string action = null, app = null, result = null, screenshot = null;
            bool test = false;
            for (int index = 0; index < args.Length; index++) {
                string arg = args[index];
                if (arg == "--self-test") test = true;
                else if ((arg == "--result" || arg == "--action" || arg == "--app" || arg == "--ci-screenshot") && index + 1 < args.Length) {
                    string value = args[++index];
                    if (arg == "--result") result = value;
                    else if (arg == "--action") action = value;
                    else if (arg == "--app") { app = Applications.FromDirectory(value); if (app == null) return 2; }
                    else screenshot = value;
                } else return 2;
            }
            if (action != null && action != "install" && action != "uninstall") return 2;
            if (test) return SelfTests.Run(result);
            if (screenshot != null && action != null) return 2;
            Application.EnableVisualStyles(); Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new InstallerForm(AppDomain.CurrentDomain.BaseDirectory, action, app, screenshot));
            return Environment.ExitCode;
        }
    }
}
