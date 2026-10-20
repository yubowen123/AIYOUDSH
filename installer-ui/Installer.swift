import AppKit
import Foundation

private enum InstallerAction: String {
    case install
    case uninstall

    var pendingTitle: String { self == .install ? "正在安装增强…" : "正在卸载增强…" }
    var successTitle: String { self == .install ? "增强已安装" : "增强已卸载" }
    var successDetail: String {
        self == .install
            ? "打开 AIYOUDSH，即可查看新的工作区与扩展入口。"
            : "已移除 AIYOU 界面与扩展增强，可以继续使用官方应用。"
    }
    var failureTitle: String { self == .install ? "安装未完成" : "卸载未完成" }
}

private struct InstallerResult {
    let succeeded: Bool
    let title: String
    let detail: String
}

/// Drain each child pipe independently; retained output is bounded and never displayed.
private final class OutputCapture {
    private let lock = NSLock()
    private var bytes = Data()
    private let limit = 256 * 1024

    func append(_ data: Data) {
        lock.lock()
        defer { lock.unlock() }
        let available = max(0, limit - bytes.count)
        if available > 0 { bytes.append(data.prefix(available)) }
    }

    var data: Data {
        lock.lock()
        defer { lock.unlock() }
        return bytes
    }
}

private enum InstallerRunner {
    static let harnessURL = URL(fileURLWithPath: "/Applications/DeepSeek Harness.app", isDirectory: true)

    static func run(_ action: InstallerAction, resources: URL) -> InstallerResult {
        let files = FileManager.default
        let installer = resources.appendingPathComponent("installer/installer.mjs")
        let runtime = resources.appendingPathComponent("runtime", isDirectory: true)
        let yaml = resources.appendingPathComponent("installer/vendor/yaml", isDirectory: true)
        guard files.fileExists(atPath: installer.path), files.fileExists(atPath: runtime.path), files.fileExists(atPath: yaml.path) else {
            return InstallerResult(succeeded: false, title: "安装包不完整", detail: "缺少增强组件，请重新下载完整安装包后再试。")
        }

        let nodePaths = ["/opt/homebrew/bin/node", "/usr/local/bin/node"]
        var environment = ProcessInfo.processInfo.environment
        let executable: URL
        if let node = nodePaths.first(where: { files.isExecutableFile(atPath: $0) }) {
            executable = URL(fileURLWithPath: node)
        } else {
            executable = harnessURL.appendingPathComponent("Contents/MacOS/DeepSeek Harness")
            guard files.isExecutableFile(atPath: executable.path) else {
                return InstallerResult(succeeded: false, title: "请先安装 DeepSeek Harness", detail: "将官方 DeepSeek Harness 放入“应用程序”文件夹，再打开本安装器。")
            }
            environment["ELECTRON_RUN_AS_NODE"] = "1"
        }

        let process = Process()
        process.executableURL = executable
        process.arguments = [installer.path, action.rawValue, "--runtime", runtime.path]
        process.environment = environment
        process.currentDirectoryURL = resources
        let output = Pipe()
        let errors = Pipe()
        process.standardOutput = output
        process.standardError = errors
        let captured = OutputCapture()

        do {
            try process.run()
        } catch {
            return InstallerResult(succeeded: false, title: action.failureTitle, detail: "无法开始操作，请重新打开安装器后重试。")
        }

        let readers = DispatchGroup()
        for (pipe, keep) in [(output, true), (errors, false)] {
            readers.enter()
            DispatchQueue.global(qos: .utility).async {
                defer { readers.leave() }
                while true {
                    let chunk = pipe.fileHandleForReading.availableData
                    if chunk.isEmpty { break }
                    if keep { captured.append(chunk) }
                }
            }
        }
        process.waitUntilExit()
        readers.wait()

        guard process.terminationReason == .exit, process.terminationStatus == 0 else {
            return InstallerResult(succeeded: false, title: action.failureTitle, detail: "操作没有完成。请重试；若仍无法完成，请使用完整安装包再次操作。")
        }
        guard let summary = (try? JSONSerialization.jsonObject(with: captured.data)) as? [String: Any],
              summary["ok"] as? Bool != false else {
            return InstallerResult(succeeded: false, title: "操作结果尚未确认", detail: "没有收到完整的安装结果，请重新运行本安装器。")
        }
        return InstallerResult(succeeded: true, title: action.successTitle, detail: action.successDetail)
    }
}

private final class InstallerApp: NSObject, NSApplicationDelegate, NSWindowDelegate {
    private var window: NSWindow!
    private var installButton: NSButton!
    private var uninstallButton: NSButton!
    private var openButton: NSButton!
    private var statusTitle: NSTextField!
    private var statusDetail: NSTextField!
    private var statusIcon: NSImageView!
    private var spinner: NSProgressIndicator!
    private var busy = false

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.regular)
        makeMenu()
        makeWindow()
        window.center()
        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }

    private func makeMenu() {
        let main = NSMenu()
        let item = NSMenuItem()
        let menu = NSMenu()
        menu.addItem(withTitle: "退出增强安装器", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        item.submenu = menu
        main.addItem(item)
        NSApp.mainMenu = main
    }

    private func label(_ text: String, size: CGFloat, weight: NSFont.Weight = .regular) -> NSTextField {
        let result = NSTextField(wrappingLabelWithString: text)
        result.font = .systemFont(ofSize: size, weight: weight)
        result.textColor = .labelColor
        result.isSelectable = false
        result.translatesAutoresizingMaskIntoConstraints = false
        return result
    }

    private func makeWindow() {
        window = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 680, height: 452), styleMask: [.titled, .closable, .miniaturizable], backing: .buffered, defer: false)
        window.title = "AIYOUDSH 增强安装器"
        window.isReleasedWhenClosed = false
        window.delegate = self
        window.backgroundColor = .windowBackgroundColor
        let content = NSView()
        window.contentView = content

        let badge = NSImageView()
        badge.translatesAutoresizingMaskIntoConstraints = false
        badge.image = NSImage(systemSymbolName: "sparkles.rectangle.stack", accessibilityDescription: "AIYOU 界面增强")
        badge.contentTintColor = .systemIndigo
        badge.symbolConfiguration = NSImage.SymbolConfiguration(pointSize: 36, weight: .medium)
        content.addSubview(badge)

        let title = label("AIYOUDSH 增强安装器", size: 25, weight: .semibold)
        let subtitle = label("官方 DeepSeek Harness 的界面与扩展增强", size: 15, weight: .medium)
        subtitle.textColor = .secondaryLabelColor
        let description = label("让对话、项目、资产与常用工具，在熟悉的工作区里自然衔接。", size: 14)
        description.textColor = .secondaryLabelColor
        [title, subtitle, description].forEach(content.addSubview)

        let panel = NSView()
        panel.translatesAutoresizingMaskIntoConstraints = false
        panel.wantsLayer = true
        panel.layer?.cornerRadius = 13
        panel.layer?.backgroundColor = NSColor.controlBackgroundColor.cgColor
        content.addSubview(panel)

        statusIcon = NSImageView()
        statusIcon.translatesAutoresizingMaskIntoConstraints = false
        statusIcon.image = NSImage(systemSymbolName: "checkmark.circle", accessibilityDescription: "准备就绪")
        statusIcon.contentTintColor = .systemIndigo
        statusIcon.symbolConfiguration = NSImage.SymbolConfiguration(pointSize: 23, weight: .regular)
        panel.addSubview(statusIcon)
        spinner = NSProgressIndicator()
        spinner.translatesAutoresizingMaskIntoConstraints = false
        spinner.style = .spinning
        spinner.controlSize = .regular
        spinner.isDisplayedWhenStopped = false
        panel.addSubview(spinner)
        statusTitle = label("准备就绪", size: 15, weight: .semibold)
        statusDetail = label("点击“安装增强”，将 AIYOU 的工作区体验加入官方应用。", size: 13)
        statusDetail.textColor = .secondaryLabelColor
        panel.addSubview(statusTitle)
        panel.addSubview(statusDetail)

        installButton = NSButton(title: "安装增强", target: self, action: #selector(install))
        installButton.bezelStyle = .rounded
        installButton.keyEquivalent = "\r"
        installButton.bezelColor = .systemIndigo
        installButton.contentTintColor = .white
        uninstallButton = NSButton(title: "卸载增强", target: self, action: #selector(uninstall))
        uninstallButton.bezelStyle = .rounded
        openButton = NSButton(title: "打开 AIYOUDSH", target: self, action: #selector(openHarness))
        openButton.bezelStyle = .rounded
        let buttons = NSStackView(views: [installButton, uninstallButton, openButton])
        buttons.translatesAutoresizingMaskIntoConstraints = false
        buttons.orientation = .horizontal
        buttons.spacing = 12
        buttons.distribution = .fillEqually
        content.addSubview(buttons)

        let footer = label("安装和卸载由本机完成，官方应用仍是你的日常使用入口。", size: 11)
        footer.textColor = .tertiaryLabelColor
        content.addSubview(footer)

        NSLayoutConstraint.activate([
            badge.leadingAnchor.constraint(equalTo: content.leadingAnchor, constant: 34),
            badge.topAnchor.constraint(equalTo: content.topAnchor, constant: 36),
            badge.widthAnchor.constraint(equalToConstant: 52), badge.heightAnchor.constraint(equalToConstant: 52),
            title.leadingAnchor.constraint(equalTo: badge.trailingAnchor, constant: 18),
            title.trailingAnchor.constraint(equalTo: content.trailingAnchor, constant: -34),
            title.topAnchor.constraint(equalTo: content.topAnchor, constant: 37),
            subtitle.leadingAnchor.constraint(equalTo: title.leadingAnchor),
            subtitle.trailingAnchor.constraint(equalTo: title.trailingAnchor),
            subtitle.topAnchor.constraint(equalTo: title.bottomAnchor, constant: 8),
            description.leadingAnchor.constraint(equalTo: content.leadingAnchor, constant: 36),
            description.trailingAnchor.constraint(equalTo: content.trailingAnchor, constant: -36),
            description.topAnchor.constraint(equalTo: badge.bottomAnchor, constant: 27),
            panel.leadingAnchor.constraint(equalTo: content.leadingAnchor, constant: 34),
            panel.trailingAnchor.constraint(equalTo: content.trailingAnchor, constant: -34),
            panel.topAnchor.constraint(equalTo: description.bottomAnchor, constant: 23),
            panel.heightAnchor.constraint(equalToConstant: 108),
            statusIcon.leadingAnchor.constraint(equalTo: panel.leadingAnchor, constant: 20),
            statusIcon.topAnchor.constraint(equalTo: panel.topAnchor, constant: 22),
            statusIcon.widthAnchor.constraint(equalToConstant: 25), statusIcon.heightAnchor.constraint(equalToConstant: 25),
            spinner.centerXAnchor.constraint(equalTo: statusIcon.centerXAnchor), spinner.centerYAnchor.constraint(equalTo: statusIcon.centerYAnchor),
            statusTitle.leadingAnchor.constraint(equalTo: statusIcon.trailingAnchor, constant: 13),
            statusTitle.topAnchor.constraint(equalTo: panel.topAnchor, constant: 21),
            statusTitle.trailingAnchor.constraint(equalTo: panel.trailingAnchor, constant: -20),
            statusDetail.leadingAnchor.constraint(equalTo: statusTitle.leadingAnchor),
            statusDetail.trailingAnchor.constraint(equalTo: statusTitle.trailingAnchor),
            statusDetail.topAnchor.constraint(equalTo: statusTitle.bottomAnchor, constant: 8),
            buttons.leadingAnchor.constraint(equalTo: content.leadingAnchor, constant: 34),
            buttons.trailingAnchor.constraint(equalTo: content.trailingAnchor, constant: -34),
            buttons.topAnchor.constraint(equalTo: panel.bottomAnchor, constant: 25),
            buttons.heightAnchor.constraint(equalToConstant: 36),
            footer.leadingAnchor.constraint(equalTo: content.leadingAnchor, constant: 36),
            footer.trailingAnchor.constraint(equalTo: content.trailingAnchor, constant: -36),
            footer.topAnchor.constraint(equalTo: buttons.bottomAnchor, constant: 17),
        ])
    }

    @objc private func install() { perform(.install) }
    @objc private func uninstall() { perform(.uninstall) }

    private func perform(_ action: InstallerAction) {
        guard !busy else { return }
        guard let resources = Bundle.main.resourceURL else {
            show(InstallerResult(succeeded: false, title: "安装包不完整", detail: "请重新下载完整安装包后再试。"))
            return
        }
        setBusy(true)
        statusTitle.stringValue = action.pendingTitle
        statusDetail.stringValue = "请稍候，完成后会在这里显示结果。"
        DispatchQueue.global(qos: .userInitiated).async { [weak self] in
            let result = InstallerRunner.run(action, resources: resources)
            DispatchQueue.main.async {
                guard let self = self else { return }
                self.setBusy(false)
                self.show(result)
            }
        }
    }

    private func setBusy(_ value: Bool) {
        busy = value
        [installButton, uninstallButton, openButton].forEach { $0?.isEnabled = !value }
        statusIcon.isHidden = value
        if value { spinner.startAnimation(nil) } else { spinner.stopAnimation(nil) }
    }

    private func show(_ result: InstallerResult) {
        statusTitle.stringValue = result.title
        statusDetail.stringValue = result.detail
        statusIcon.image = NSImage(systemSymbolName: result.succeeded ? "checkmark.circle.fill" : "exclamationmark.circle", accessibilityDescription: result.succeeded ? "操作完成" : "操作未完成")
        statusIcon.contentTintColor = result.succeeded ? .systemGreen : .systemOrange
    }

    @objc private func openHarness() {
        guard FileManager.default.fileExists(atPath: InstallerRunner.harnessURL.path) else {
            show(InstallerResult(succeeded: false, title: "未找到 DeepSeek Harness", detail: "请先将官方应用放入“应用程序”文件夹。"))
            return
        }
        NSWorkspace.shared.openApplication(at: InstallerRunner.harnessURL, configuration: NSWorkspace.OpenConfiguration()) { [weak self] _, error in
            guard error != nil else { return }
            DispatchQueue.main.async {
                self?.show(InstallerResult(succeeded: false, title: "暂时无法打开 AIYOUDSH", detail: "请从“应用程序”文件夹打开 DeepSeek Harness。"))
            }
        }
    }

    func windowShouldClose(_ sender: NSWindow) -> Bool {
        if busy { statusDetail.stringValue = "正在完成操作，请稍候再关闭安装器。" }
        return !busy
    }

    func applicationShouldTerminate(_ sender: NSApplication) -> NSApplication.TerminateReply {
        if busy {
            window.makeKeyAndOrderFront(nil)
            statusDetail.stringValue = "正在完成操作，请稍候再退出安装器。"
            return .terminateCancel
        }
        return .terminateNow
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }
}

let app = NSApplication.shared
private let delegate = InstallerApp()
app.delegate = delegate
app.run()
