/** Presentation only. The parent owns validated theme configuration and CSS. */
const root = document.documentElement;
const page = location.pathname.endsWith('creative-tools.html') ? 'tools' : location.pathname.endsWith('tools.html') ? 'compat' : 'canvas';
const scheme = matchMedia('(prefers-color-scheme: dark)');
const listeners = new Set();
const names = ['bg', 'surface', 'surface-raised', 'ink', 'muted', 'line', 'accent', 'danger', 'warning', 'success'];
const canvasNames = ['bg', 'node', 'panel', 'toolbar', 'text', 'muted', 'border', 'accent', 'grid', 'edge', 'image', 'image-opacity', 'image-fit', 'image-position', 'grid-style', 'grid-size'];
let current, stamp = '', scheduled = false, disposed = false;
const defaults = mode => mode === 'dark'
  ? {bg:'#111318',surface:'#1c2027','surface-raised':'#272d36',ink:'#e8edf3',muted:'#a3adb9',line:'#4a5664',accent:'#a6ceff',danger:'#ffadad',warning:'#ecc579',success:'#94dbc0'}
  : {bg:'#f5f7fa',surface:'#ffffff','surface-raised':'#eaf0f6',ink:'#202b38',muted:'#526171',line:'#bcc8d5',accent:'#215caa',danger:'#a22b31',warning:'#855c0b',success:'#226c4d'};

function refresh() {
  scheduled = false;
  if (disposed) return;
  const explicit = root.getAttribute('data-aiyou-harness-mode');
  const mode = explicit === 'light' || explicit === 'dark' ? explicit : scheme.matches ? 'dark' : 'light';
  const css = getComputedStyle(root), fallback = defaults(mode);
  const palette = Object.fromEntries(names.map(name => [name, css.getPropertyValue('--'+name).trim() || fallback[name]]));
  const canvas = Object.fromEntries(canvasNames.map(name => [name, css.getPropertyValue('--dsh-canvas-'+name).trim()]));
  const gridStyle = ['dots','lines','none'].includes(canvas['grid-style']) ? canvas['grid-style'] : 'dots';
  const gridSize = Math.max(8,Math.min(80,Number.parseFloat(canvas['grid-size']) || 20));
  const value = {mode,palette,canvas,edge:canvas.edge || palette.line,gridStyle,gridSize};
  const next = JSON.stringify(value);
  if (next === stamp) return;
  stamp = next; current = Object.freeze(value);
  root.dataset.dshThemeAdapted = mode;
  root.dataset.dshThemePage = page;
  root.dataset.dshCanvasGrid = gridStyle;
  root.classList.toggle('theme-dark',mode === 'dark');
  root.classList.toggle('theme-light',mode === 'light');
  root.style.colorScheme = mode;
  for (const [name,color] of Object.entries(palette)) {
    if (root.style.getPropertyValue('--dsh-ui-'+name) !== color) root.style.setProperty('--dsh-ui-'+name,color);
  }
  for (const listener of listeners) listener();
}
function schedule() {if (!scheduled && !disposed) {scheduled = true;queueMicrotask(refresh);}}
refresh();
const attributes = new MutationObserver(schedule);
attributes.observe(root,{attributes:true,attributeFilter:['data-aiyou-harness-mode','data-aiyou-harness-theme','style']});
// The host updates CSS even when the selected theme ID stays unchanged.
const styles = new MutationObserver(records => {
  if (records.some(record => record.type === 'characterData' || record.target.closest?.('style,link') || [...record.addedNodes,...record.removedNodes].some(node => node.nodeType === 1 && node.matches?.('style,link')))) schedule();
});
styles.observe(document.head,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['href','media','disabled']});
scheme.addEventListener('change',schedule);
window.__DSH_THEME_ADAPTER__ = Object.freeze({
  subscribe(listener) {listeners.add(listener);return () => listeners.delete(listener);},
  snapshot() {return current;},
  refresh:schedule
});
window.addEventListener('pagehide',() => {disposed=true;attributes.disconnect();styles.disconnect();scheme.removeEventListener('change',schedule);listeners.clear();},{once:true});
