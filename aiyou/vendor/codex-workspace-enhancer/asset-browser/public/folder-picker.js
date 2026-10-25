/** Native path selection only. Reading/scanning stays an explicit form action. */
export function pickLocalFolder({ signal, isCurrent = () => true, timeoutMs = 30000, win = window } = {}) {
  if (signal?.aborted) return Promise.reject(new DOMException("已取消选择", "AbortError"));
  let hostWindow;
  try {
    if (win.location.origin !== "null" && win.top !== win && win.top.location.origin === win.location.origin) hostWindow = win.top;
  } catch {}
  if (!hostWindow) try {
    if (win.location.origin !== "null" && win.parent !== win && win.parent.location.origin === win.location.origin) hostWindow = win.parent;
  } catch {}
  if (!hostWindow) return Promise.reject(new Error("当前窗口无法打开本机目录选择器，请手工填写绝对路径。"));
  const requestId = win.crypto.randomUUID();
  return new Promise((resolve, reject) => {
    let timer;
    const finish = (error, path) => {
      clearTimeout(timer);
      win.removeEventListener("message", receive);
      signal?.removeEventListener("abort", abort);
      error ? reject(error) : resolve(path);
    };
    const abort = () => finish(new DOMException("已取消选择", "AbortError"));
    const receive = event => {
      const data = event.data;
      if (event.source !== hostWindow || event.origin !== win.location.origin || data?.type !== "dsh-asset-folder-picked" || data.requestId !== requestId) return;
      if (!isCurrent()) return abort();
      if (data.ok === false) return finish(new Error(String(data.error || "目录选择失败，请手工填写绝对路径。").slice(0, 400)));
      if (data.ok !== true || !(data.path === null || typeof data.path === "string")) return;
      finish(null, data.path);
    };
    win.addEventListener("message", receive);
    signal?.addEventListener("abort", abort, { once: true });
    timer = setTimeout(() => finish(new Error("目录选择器未响应，请手工填写绝对路径，或关闭后重试。")), timeoutMs);
    try { hostWindow.postMessage({ type: "dsh-asset-folder-pick", requestId }, win.location.origin); }
    catch { finish(new Error("无法打开本机目录选择器，请手工填写绝对路径。")); }
  });
}
