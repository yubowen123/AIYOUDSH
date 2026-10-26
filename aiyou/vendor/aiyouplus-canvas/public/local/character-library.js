let active;
const make = (tag, text, attributes = {}) => {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
  return element;
};

/** Local character metadata with canonical DSH originals, not a second library. */
export async function openCharacterLibrary({rpc, identity = {}} = {}) {
  if (typeof rpc !== 'function' || !identity.projectId) throw Error('请先打开画布项目');
  if (active?.isConnected) { const existing = active; existing.focus(); return {close: () => existing.close()}; }
  const dialog = make('dialog', undefined, {class: 'dsh-characters', 'aria-label': '角色库'});
  active = dialog;
  const style = make('style');
  style.textContent = [
    '.dsh-characters{box-sizing:border-box;width:min(940px,calc(100vw - 28px));max-height:88vh;padding:20px;border:1px solid #50525b;border-radius:16px;background:#191a1f;color:#f1f2f6;font:14px/1.5 system-ui,sans-serif;color-scheme:dark}',
    '.dsh-characters::backdrop{background:#0009}.dsh-characters *{box-sizing:border-box}.dsh-characters h2{margin:0;font-size:20px}',
    '.dsh-characters header,.dsh-characters footer{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.dsh-characters header{justify-content:space-between;margin-bottom:12px}',
    '.dsh-characters p{margin:6px 0 14px;color:#c0c3ce}.dsh-characters button,.dsh-characters select,.dsh-characters input,.dsh-characters textarea{font:inherit;color:inherit;background:#25272f;border:1px solid #575b68;border-radius:8px;padding:8px 10px}',
    '.dsh-characters button{cursor:pointer}.dsh-characters button:hover:not(:disabled){background:#363a49}.dsh-characters button:disabled{opacity:.45;cursor:not-allowed}.dsh-characters :focus-visible{outline:2px solid #a7c5ff;outline-offset:2px}',
    '.dsh-characters .dc-grid{display:grid;grid-template-columns:230px minmax(0,1fr);gap:18px}.dsh-characters .dc-list{display:flex;flex-direction:column;gap:8px;max-height:55vh;overflow:auto}',
    '.dsh-characters .dc-role{display:flex;gap:8px;align-items:center;text-align:left;width:100%}.dsh-characters .dc-role[aria-pressed=true]{border-color:#a7c5ff;background:#303b52}',
    '.dsh-characters .dc-role img{width:44px;height:44px;object-fit:cover;border-radius:6px}.dsh-characters .dc-role span{overflow-wrap:anywhere}',
    '.dsh-characters .dc-form{min-width:0;display:grid;gap:10px}.dsh-characters label{display:grid;gap:4px}.dsh-characters textarea{resize:vertical;min-height:90px;width:100%}.dsh-characters input,.dsh-characters select{width:100%;min-width:0}',
    '.dsh-characters .dc-preview{max-width:100%;max-height:160px;object-fit:contain;background:#101115;border-radius:8px}.dsh-characters [role=status]{min-height:24px;white-space:pre-wrap;overflow-wrap:anywhere;margin-top:12px}',
    '.dsh-characters .dc-danger{color:#ffb0b0}.dsh-characters .dc-primary{background:#b7d0ff;color:#142039;border-color:#b7d0ff}.dsh-characters .dc-primary:hover:not(:disabled){background:#d0e0ff}',
    '@media(max-width:600px){.dsh-characters{padding:14px}.dsh-characters .dc-grid{grid-template-columns:minmax(0,1fr)}.dsh-characters .dc-list{max-height:140px}.dsh-characters footer button{flex:1}}'
  ].join('');
  const header = make('header'), title = make('h2', '角色库'), close = make('button', '关闭', {type: 'button'}), hint = make('p', '角色信息保存在当前画布项目；图片使用 DSH 素材库原件。');
  header.append(title, close);
  const grid = make('div', undefined, {class: 'dc-grid'}), list = make('nav', undefined, {class: 'dc-list', 'aria-label': '项目角色'}), form = make('form', undefined, {class: 'dc-form'});
  const name = make('input', undefined, {maxlength: '100', required: '', 'aria-label': '角色名称'}), description = make('textarea', undefined, {maxlength: '5000', 'aria-label': '角色描述'}), image = make('select', undefined, {'aria-label': 'DSH角色原图'}), preview = make('img', undefined, {class: 'dc-preview', alt: '角色原图预览'});
  const labelled = (label, input) => { const element = make('label', label); element.append(input); return element; };
  const footer = make('footer'), save = make('button', '保存角色', {type: 'submit', class: 'dc-primary'}), send = make('button', '发送到画布', {type: 'button'}), remove = make('button', '删除角色', {type: 'button', class: 'dc-danger'});
  footer.append(save, send, remove);
  form.append(labelled('名称', name), labelled('描述 / 外观设定', description), labelled('DSH 素材库原图', image), preview, footer);
  grid.append(list, form);
  const status = make('div', '', {role: 'status', 'aria-live': 'polite'});
  dialog.append(style, header, hint, grid, status);
  document.body.append(dialog);
  let snapshot = {revision: 0, characters: []}, images = [], selectedId = '', busy = false, deletionArmed = false;
  const message = (value, failed = false) => { status.textContent = value; status.style.color = failed ? '#ffb0b0' : '#ced8e8'; };
  const assetUrl = asset => '/aiyoucodex-dsh/canvas/file?' + new URLSearchParams({...identity, assetId: asset.id});
  const current = () => snapshot.characters.find(c => c.id === selectedId);
  function controls() {
    save.disabled = busy || !name.value.trim() || !image.value;
    const record = current(), dirty = record && (name.value.trim() !== record.name || description.value.trim() !== record.description || image.value !== record.assetId);
    send.disabled = busy || !record || Boolean(record.missingAsset) || Boolean(dirty);
    send.title = dirty ? '请先保存角色修改' : '将已保存角色原件导入画布';
    remove.disabled = busy || !current();
    name.disabled = description.disabled = image.disabled = close.disabled = busy;
  }
  function previewImage() {
    const item = images.find(a => a.id === image.value);
    preview.hidden = !item;
    if (item) preview.src = assetUrl(item); else preview.removeAttribute('src');
  }
  function select(id) {
    selectedId = id; deletionArmed = false; remove.textContent = '删除角色';
    const record = current();
    name.value = record?.name || ''; description.value = record?.description || '';
    image.value = images.some(a => a.id === record?.assetId) ? record.assetId : '';
    previewImage(); renderList(); controls();
    if (record?.missingAsset) message('角色原图缺失，请重新选择 DSH 原件。', true);
  }
  function renderList() {
    list.replaceChildren();
    const add = make('button', '＋ 新建角色', {type: 'button'}); add.onclick = () => select(''); list.append(add);
    if (!snapshot.characters.length) list.append(make('p', '还没有角色，选择原图并填写名称即可创建。'));
    for (const record of snapshot.characters) {
      const button = make('button', undefined, {type: 'button', class: 'dc-role', 'aria-pressed': String(record.id === selectedId)});
      if (record.asset) button.append(make('img', undefined, {src: assetUrl(record.asset), alt: ''}));
      button.append(make('span', record.name + (record.missingAsset ? '（原图缺失）' : '')));
      button.onclick = () => select(record.id); list.append(button);
    }
  }
  async function refresh() {
    const values = await Promise.all([rpc('canvas_characters_list'), rpc('canvas_characters_assets')]);
    snapshot = values[0]; images = values[1];
    image.replaceChildren(make('option', '请选择 DSH 图片原件', {value: ''}), ...images.map(a => make('option', a.name, {value: a.id})));
    select(selectedId);
    if (!images.length) message('DSH 素材库暂无图片，请先在素材库导入原件。');
    else if (snapshot.warning) message(snapshot.warning);
  }
  async function operation(fn) {
    if (busy) return;
    busy = true; controls();
    try { await fn(); } catch (e) { message(e.message || String(e), true); }
    finally { busy = false; controls(); }
  }
  form.onsubmit = event => {
    event.preventDefault();
    void operation(async () => {
      const next = await rpc('canvas_characters_save', {id: selectedId || undefined, name: name.value, description: description.value, assetId: image.value, expectedRevision: snapshot.revision});
      snapshot = next; select(next.changedId); message(next.warning || '角色已保存。');
    });
  };
  send.onclick = () => void operation(async () => {
    await rpc('canvas_tool_send', {assets: [current().assetId]});
    message('角色原件已发送到当前画布。');
  });
  remove.onclick = () => {
    if (!deletionArmed) { deletionArmed = true; remove.textContent = '再次点击确认删除'; return; }
    void operation(async () => {
      snapshot = await rpc('canvas_characters_remove', {id: selectedId, expectedRevision: snapshot.revision});
      select(''); message(snapshot.warning || '角色已删除，DSH 原件保留。');
    });
  };
  for (const element of [name, description, image]) element.addEventListener('input', () => { deletionArmed = false; remove.textContent = '删除角色'; previewImage(); controls(); });
  close.onclick = () => dialog.close();
  dialog.addEventListener('cancel', event => { if (busy) event.preventDefault(); });
  dialog.addEventListener('close', () => { dialog.remove(); if (active === dialog) active = undefined; }, {once: true});
  dialog.showModal();
  await operation(refresh);
  name.focus();
  return {close: () => { if (!busy) dialog.close(); }, element: dialog};
}
