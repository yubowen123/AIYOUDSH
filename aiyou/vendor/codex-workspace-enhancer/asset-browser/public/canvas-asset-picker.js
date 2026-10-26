const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const KINDS = new Set(["image", "video", "audio", "text"]);
const opaqueId = value => typeof value === "string" && value.length > 0 && value.length <= 4096 && !/[\s\u0000-\u001f\u007f/\\]/u.test(value) && !/^[a-z][a-z0-9+.-]*:/i.test(value);

/** A selection surface over the existing library rows, never another library. */
export function createCanvasAssetPicker({ assetGrid, getAssetById, win = window, doc = document }) {
  const query = new URL(win.location.href).searchParams;
  const requested = query.get("picker") === "canvas";
  if (!requested) return { requested: false, active: false, acceptsKind: () => true, decorate() {}, async focus() {} };
  const requestId = query.get("requestId") || "";
  const kinds = query.has("kinds") ? query.get("kinds").split(",").map(value => value.trim()) : [...KINDS];
  const validKinds = query.getAll("kinds").length <= 1 && kinds.length > 0 && kinds.every(value => KINDS.has(value));
  const allowedKinds = new Set(validKinds ? kinds : []);
  const restricted = allowedKinds.size < KINDS.size;
  const focusAssetId = query.getAll("focusAssetId").length === 1 && opaqueId(query.get("focusAssetId")) ? query.get("focusAssetId") : "";
  function sameOriginParent() {
    try { return win.parent !== win && win.location.origin !== "null" && win.parent.location.origin === win.location.origin; }
    catch { return false; }
  }
  const active = query.getAll("picker").length === 1 && query.getAll("requestId").length === 1 && UUID.test(requestId) && validKinds && sameOriginParent();
  let phase = "ready", chosen = "", focusStarted = false;
  const focusController = new AbortController();
  doc.body.dataset.assetPicker = "canvas";
  const banner = doc.createElement("section");
  banner.id = "canvasAssetPickerBanner";
  banner.className = "canvas-picker-banner";
  const title = doc.createElement("strong"); title.textContent = "从 DSH 素材库插入";
  const status = doc.createElement("p"); status.id = "canvasAssetPickerStatus"; status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
  status.textContent = active ? "搜索或筛选素材，点击“插入画布”。" : "选择请求无效，请从画布重新打开素材库。";
  banner.append(title, status);
  doc.querySelector(".library-main").prepend(banner);
  for (const button of doc.querySelectorAll("#assetKindTabs [data-asset-kind]")) {
    const kind = button.dataset.assetKind;
    button.hidden = restricted && !allowedKinds.has(kind);
    button.disabled = button.hidden;
    if (restricted) button.classList.toggle("active", kind === kinds[0]);
  }
  if (focusAssetId) {
    doc.addEventListener("pointerdown", () => focusController.abort(), { once: true });
    doc.addEventListener("keydown", () => focusController.abort(), { once: true });
    for (const event of ["click", "input", "change"]) doc.addEventListener(event, () => focusController.abort(), { once: true, capture: true });
    win.addEventListener("pagehide", () => focusController.abort(), { once: true });
  }

  function rowFor(card) {
    if (!card.isConnected || !assetGrid.contains(card)) return null;
    const row = getAssetById(card.dataset.assetId);
    if (!row || row.id !== card.dataset.assetId || !allowedKinds.has(row.kind)) return null;
    const id = row.canonicalAssetId || row.id;
    return opaqueId(id) ? { row, id } : null;
  }
  function syncButtons() {
    for (const card of assetGrid.querySelectorAll(".asset-card")) {
      const button = card.querySelector("[data-canvas-asset-select]");
      if (!button) continue;
      const value = rowFor(card);
      button.disabled = !active || phase !== "ready" || !value;
      button.textContent = phase === "pending" && value?.id === chosen ? "正在插入…" : phase === "complete" && value?.id === chosen ? "已交给画布" : "插入画布";
      button.setAttribute("aria-label", "插入画布：" + (value?.row.title || value?.row.name || "素材"));
    }
  }
  function select(card) {
    if (!active || phase !== "ready" || !sameOriginParent()) return;
    const value = rowFor(card);
    if (!value) { status.textContent = "素材已更新，请重新搜索后选择。"; syncButtons(); return; }
    phase = "pending"; chosen = value.id;
    status.textContent = "正在将选择交给画布，请稍候。"; syncButtons();
    try { win.parent.postMessage({ type: "dsh-asset-library-select", requestId, assetIds: [value.id] }, win.location.origin); }
    catch { phase = "ready"; status.textContent = "未能发送选择，请重新打开画布素材库。"; syncButtons(); }
  }
  win.addEventListener("message", event => {
    const message = event.data;
    if (!active || phase !== "pending" || event.source !== win.parent || event.origin !== win.location.origin || message?.type !== "dsh-asset-library-result" || message.requestId !== requestId || typeof message.ok !== "boolean") return;
    phase = message.ok ? "complete" : "ready";
    status.textContent = message.ok ? "素材已交给画布。" : String(message.message || "插入未完成，请重新选择。").slice(0, 400);
    syncButtons();
  });
  return {
    requested, active, defaultKind: restricted ? kinds[0] : null,
    acceptsKind: kind => allowedKinds.has(kind),
    async focus({ projects, currentProjectId, readPage, openRow }) {
      if (!active || !focusAssetId || focusStarted) return;
      focusStarted = true;
      const signal = AbortSignal.any([focusController.signal, AbortSignal.timeout(30000)]);
      status.textContent = "正在从真实素材列表定位素材…";
      try {
        const ordered = [...projects].sort((a, b) => Number(b.id === currentProjectId) - Number(a.id === currentProjectId));
        for (const project of ordered) {
          let offset = 0;
          for (;;) {
            signal.throwIfAborted();
            const page = await readPage(project.id, offset, signal), rows = page.assets || [];
            const row = rows.find(value => value.canonicalAssetId === focusAssetId || value.id === focusAssetId);
            if (row) {
              if (!allowedKinds.has(row.kind)) { status.textContent = "该素材类型不适用于当前选择，请选择其他素材。"; return; }
              signal.throwIfAborted(); await openRow(row, project.id); signal.throwIfAborted();
              const card = [...assetGrid.querySelectorAll(".asset-card")].find(value => rowFor(value)?.id === (row.canonicalAssetId || row.id));
              if (!card) { status.textContent = "素材列表已更新，请重新搜索或选择。"; return; }
              card.classList.add("canvas-picker-focused"); card.scrollIntoView({ block: "center" });
              card.querySelector("[data-canvas-asset-select]")?.focus({ preventScroll: true });
              status.textContent = "已定位“" + (row.title || row.name || "素材") + "”，点击“插入画布”后才会插入。";
              return;
            }
            if (!page.page?.hasMore || !rows.length) break;
            offset += rows.length;
          }
        }
        status.textContent = "暂未找到该素材，可切换项目或搜索名称继续查找。";
      } catch {
        if (phase === "ready") status.textContent = focusController.signal.aborted ? "搜索或筛选素材，点击“插入画布”。" : "定位暂未完成，可继续搜索或筛选素材。";
      }
    },
    decorate() {
      for (const card of assetGrid.querySelectorAll(".asset-card")) {
        if (card.querySelector("[data-canvas-asset-select]")) continue;
        const button = doc.createElement("button");
        button.type = "button"; button.className = "canvas-picker-select"; button.dataset.canvasAssetSelect = "";
        button.addEventListener("click", event => { event.preventDefault(); event.stopPropagation(); select(card); });
        card.append(button);
      }
      syncButtons();
    },
  };
}
