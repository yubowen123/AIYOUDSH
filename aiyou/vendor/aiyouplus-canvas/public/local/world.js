import * as THREE from '../vendor/three.module.js';

const SCHEMA = 'aiyouplus.scene.v1';
const TYPES = ['box', 'sphere', 'cylinder', 'plane'];
const LABELS = { box: '立方体', sphere: '球体', cylinder: '圆柱', plane: '地面' };
const ownId = () => globalThis.crypto?.randomUUID?.() || `object-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const finite = (value, limit = 1e6) => typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= limit;
function hex(value) { if (typeof value !== 'string' || !/^#[\da-f]{6}$/i.test(value)) throw new Error('材质颜色必须为 #RRGGBB'); return value.toLowerCase(); }
function vector(value, name, scale = false) {
  if (!Array.isArray(value) || value.length !== 3 || !value.every(v => finite(v) && (!scale || (v >= .001 && v <= 10000)))) throw new Error(`${name}必须是三个有效数值${scale ? '（缩放 .001–10000）' : ''}`);
  return [...value];
}
function validateScene(value) {
  if (!value || value.schema !== SCHEMA || !Array.isArray(value.objects) || value.objects.length > 1000) throw new Error('场景格式无效，需要 aiyouplus.scene.v1 与最多 1000 个对象');
  const ids = new Set();
  const objects = value.objects.map(object => {
    if (!object || !TYPES.includes(object.type) || typeof object.id !== 'string' || !object.id || object.id.length > 200 || ids.has(object.id)) throw new Error('场景形状或对象 ID 无效/重复');
    ids.add(object.id);
    if (typeof object.name !== 'string' || object.name.length > 200) throw new Error('场景对象名称无效');
    return { id: object.id, name: object.name, type: object.type, position: vector(object.position, '位置'), rotation: vector(object.rotation, '弧度旋转'), scale: vector(object.scale, '缩放', true), color: hex(object.color) };
  });
  let camera;
  if (value.camera !== undefined) {
    const c = value.camera;
    if (!c || !finite(c.theta) || !finite(c.phi) || c.phi <= 0 || c.phi >= Math.PI || !finite(c.radius) || c.radius < .2 || c.radius > 500) throw new Error('场景视角无效');
    camera = { theta: c.theta, phi: c.phi, radius: c.radius, target: vector(c.target, '视角目标') };
  }
  return { schema: SCHEMA, objects, ...(camera ? { camera } : {}) };
}
function geometry(type) {
  switch (type) {
    case 'box': return new THREE.BoxGeometry(1, 1, 1);
    case 'sphere': return new THREE.SphereGeometry(.6, 32, 24);
    case 'cylinder': return new THREE.CylinderGeometry(.5, .5, 1.2, 32);
    case 'plane': return new THREE.PlaneGeometry(4, 4);
    default: throw new Error('不支持的几何体');
  }
}
function objectMesh(object) {
  const mesh = new THREE.Mesh(geometry(object.type), new THREE.MeshStandardMaterial({ color: object.color, roughness: .58, metalness: .08, side: THREE.DoubleSide }));
  mesh.name = object.name; mesh.userData = { aiyouplusId: object.id, type: object.type };
  mesh.position.fromArray(object.position); mesh.rotation.fromArray([...object.rotation, 'XYZ']); mesh.scale.fromArray(object.scale); return mesh;
}
function disposeMesh(mesh) { mesh.geometry.dispose(); mesh.material.dispose(); }
function objectRecord(mesh) { return { id: mesh.userData.aiyouplusId, name: mesh.name, type: mesh.userData.type, position: mesh.position.toArray(), rotation: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z], scale: mesh.scale.toArray(), color: `#${mesh.material.color.getHexString(THREE.SRGBColorSpace)}` }; }

// Minimal GLB 2.0 exporter for this editor's real procedural triangle meshes.
// No cameras, lights, grid or selection helpers are exported.
function meshesToGlb(meshes) {
  if (!meshes.length) throw new Error('场景中没有可导出的对象');
  const json = { asset: { version: '2.0', generator: 'AIYOUPLUS local scene editor' }, scene: 0, scenes: [{ name: 'AIYOUPLUS', nodes: [] }], nodes: [], meshes: [], materials: [], accessors: [], bufferViews: [], buffers: [{ byteLength: 0 }] };
  const chunks = []; let binaryLength = 0;
  const addView = (typed, target) => {
    const offset = Math.ceil(binaryLength / 4) * 4;
    const bytes = new Uint8Array(typed.buffer, typed.byteOffset, typed.byteLength);
    chunks.push({ offset, bytes }); binaryLength = offset + bytes.byteLength;
    return json.bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: bytes.byteLength, target }) - 1;
  };
  const attribute = (source, type, minmax = false) => {
    const values = new Float32Array(source.count * source.itemSize), min = Array(source.itemSize).fill(Infinity), max = Array(source.itemSize).fill(-Infinity);
    for (let i = 0; i < source.count; i++) for (let c = 0; c < source.itemSize; c++) { const v = source.getComponent(i, c); if (!Number.isFinite(v)) throw new Error('几何体包含无效顶点'); values[i * source.itemSize + c] = v; min[c] = Math.min(min[c], v); max[c] = Math.max(max[c], v); }
    return json.accessors.push({ bufferView: addView(values, 34962), componentType: 5126, count: source.count, type, ...(minmax ? { min, max } : {}) }) - 1;
  };
  meshes.forEach((mesh, index) => {
    mesh.updateMatrix();
    const g = mesh.geometry, attributes = { POSITION: attribute(g.getAttribute('position'), 'VEC3', true), NORMAL: attribute(g.getAttribute('normal'), 'VEC3') };
    if (g.getAttribute('uv')) attributes.TEXCOORD_0 = attribute(g.getAttribute('uv'), 'VEC2');
    const original = g.index ? Array.from(g.index.array) : Array.from({ length: g.getAttribute('position').count }, (_, i) => i);
    if (original.length % 3 || original.some(i => !Number.isInteger(i) || i < 0 || i >= g.getAttribute('position').count)) throw new Error('几何体三角形索引无效');
    const maxIndex = original.reduce((m, i) => Math.max(m, i), 0), indices = maxIndex < 65536 ? new Uint16Array(original) : new Uint32Array(original);
    const indexAccessor = json.accessors.push({ bufferView: addView(indices, 34963), componentType: indices instanceof Uint16Array ? 5123 : 5125, count: indices.length, type: 'SCALAR', min: [Math.min(...original)], max: [maxIndex] }) - 1;
    const color = mesh.material.color;
    json.materials.push({ name: mesh.name, pbrMetallicRoughness: { baseColorFactor: [color.r, color.g, color.b, 1], metallicFactor: mesh.material.metalness, roughnessFactor: mesh.material.roughness }, doubleSided: mesh.material.side === THREE.DoubleSide });
    json.meshes.push({ name: mesh.name, primitives: [{ attributes, indices: indexAccessor, material: index, mode: 4 }] });
    json.nodes.push({ name: mesh.name, mesh: index, translation: mesh.position.toArray(), rotation: mesh.quaternion.toArray(), scale: mesh.scale.toArray(), extras: { aiyouplus: { id: mesh.userData.aiyouplusId, type: mesh.userData.type } } });
    json.scenes[0].nodes.push(index);
  });
  json.buffers[0].byteLength = binaryLength;
  const encoded = new TextEncoder().encode(JSON.stringify(json)), jsonLength = Math.ceil(encoded.length / 4) * 4, binLength = Math.ceil(binaryLength / 4) * 4, total = 12 + 8 + jsonLength + 8 + binLength;
  const result = new ArrayBuffer(total), view = new DataView(result), bytes = new Uint8Array(result);
  view.setUint32(0, 0x46546c67, true); view.setUint32(4, 2, true); view.setUint32(8, total, true);
  view.setUint32(12, jsonLength, true); view.setUint32(16, 0x4e4f534a, true); bytes.fill(0x20, 20, 20 + jsonLength); bytes.set(encoded, 20);
  const binHeader = 20 + jsonLength; view.setUint32(binHeader, binLength, true); view.setUint32(binHeader + 4, 0x004e4942, true);
  for (const chunk of chunks) bytes.set(chunk.bytes, binHeader + 8 + chunk.offset);
  return result;
}
export function exportSceneGlb(scene) {
  const normalized = validateScene(scene), meshes = normalized.objects.map(objectMesh);
  try { return meshesToGlb(meshes); } finally { meshes.forEach(disposeMesh); }
}

export function createWorld(host) {
  if (!host || typeof host.appendChild !== 'function') throw new Error('缺少 3D 视口容器');
  const document = host.ownerDocument, scope = host.closest('#aiyouplus-local') || document;
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#0b100e');
  const camera = new THREE.PerspectiveCamera(48, 1, .01, 2000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2));
  const canvas = renderer.domElement; canvas.setAttribute('aria-label', 'AIYOUPLUS 3D 场景视口'); canvas.style.touchAction = 'none'; host.appendChild(canvas);
  scene.add(new THREE.HemisphereLight('#ffffff', '#354839', 2.5));
  const key = new THREE.DirectionalLight('#ffffff', 3); key.position.set(4, 7, 5); scene.add(key);
  const fill = new THREE.DirectionalLight('#b6ddff', 1); fill.position.set(-5, 3, -3); scene.add(fill);
  const grid = new THREE.GridHelper(20, 20, '#536a57', '#24372a'); scene.add(grid);
  const group = new THREE.Group(); scene.add(group);
  const selection = new THREE.BoxHelper(undefined, '#c0f66b'); selection.visible = false; scene.add(selection);
  const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2(), target = new THREE.Vector3(0, .5, 0);
  let theta = Math.PI / 4, phi = Math.PI / 3, radius = 7, selected = null, disposed = false, scheduled = 0, drag = null;
  const controls = scope.querySelectorAll('[data-transform]'), colorInput = scope.querySelector('#lp-world-color'), objectList = scope.querySelector('#lp-world-objects');
  function requireLive() { if (disposed) throw new Error('3D 视口已释放'); }
  function draw() { scheduled = 0; if (disposed) return; scene.updateMatrixWorld(true); if (selected) selection.update(); renderer.render(scene, camera); }
  function redraw() { if (!disposed && !scheduled) scheduled = requestAnimationFrame(draw); }
  function orbit() { camera.position.set(target.x + radius * Math.sin(phi) * Math.sin(theta), target.y + radius * Math.cos(phi), target.z + radius * Math.sin(phi) * Math.cos(theta)); camera.lookAt(target); camera.updateMatrixWorld(); redraw(); }
  function resize() { const bounds = host.getBoundingClientRect(), width = Math.max(1, Math.round(bounds.width || host.clientWidth || 640)), height = Math.max(1, Math.round(bounds.height || host.clientHeight || 430)); renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); redraw(); }
  function refresh() {
    if (objectList) {
      objectList.replaceChildren();
      if (!group.children.length) { const empty = document.createElement('p'); empty.textContent = '场景为空，添加一个几何体。'; objectList.appendChild(empty); }
      for (const mesh of group.children) { const button = document.createElement('button'); button.type = 'button'; button.textContent = mesh.name; button.dataset.objectId = mesh.userData.aiyouplusId; button.setAttribute('aria-pressed', String(mesh === selected)); button.style.borderColor = mesh === selected ? '#c0f66b' : ''; button.onclick = () => select(mesh.userData.aiyouplusId); objectList.appendChild(button); }
    }
    for (const input of controls) { input.disabled = !selected; if (selected) { let value = selected[input.dataset.transform][input.dataset.axis]; if (input.dataset.transform === 'rotation') value = THREE.MathUtils.radToDeg(value); input.value = String(Math.round(value * 100000) / 100000); } }
    if (colorInput) { colorInput.disabled = !selected; if (selected) colorInput.value = `#${selected.material.color.getHexString(THREE.SRGBColorSpace)}`; }
    selection.visible = Boolean(selected); if (selected) selection.setFromObject(selected); redraw();
  }
  function select(id) { requireLive(); const mesh = id == null ? null : group.children.find(o => o.userData.aiyouplusId === id); if (id != null && !mesh) throw new Error('找不到要选择的对象'); selected = mesh; refresh(); return mesh ? objectRecord(mesh) : null; }
  function add(type) {
    requireLive(); if (!TYPES.includes(type)) throw new Error('不支持的几何体');
    if (group.children.length >= 1000) throw new Error('场景最多允许 1000 个对象');
    const n = group.children.filter(m => m.userData.type === type).length + 1;
    const object = { id: ownId(), name: `${LABELS[type]} ${n}`, type, position: [0, type === 'plane' ? 0 : type === 'box' ? .5 : .6, 0], rotation: [type === 'plane' ? -Math.PI / 2 : 0, 0, 0], scale: [1, 1, 1], color: type === 'plane' ? '#4c6754' : '#c0f66b' };
    const mesh = objectMesh(object); group.add(mesh); selected = mesh; refresh(); return objectRecord(mesh);
  }
  function resetCamera() { requireLive(); theta = Math.PI / 4; phi = Math.PI / 3; radius = 7; target.set(0, .5, 0); orbit(); }
  function removeSelected() { requireLive(); if (!selected) return false; const mesh = selected; group.remove(mesh); disposeMesh(mesh); selected = group.children.at(-1) || null; refresh(); return true; }
  function transform(kind, axis, value) { requireLive(); if (!['position', 'rotation', 'scale'].includes(kind) || !['x', 'y', 'z'].includes(axis) || !finite(value) || (kind === 'scale' && (value < .001 || value > 10000))) throw new Error('变换参数无效'); if (!selected) throw new Error('请先选择场景对象'); selected[kind][axis] = kind === 'rotation' ? THREE.MathUtils.degToRad(value) : value; refresh(); return objectRecord(selected); }
  function color(value) { requireLive(); const valid = hex(value); if (!selected) throw new Error('请先选择场景对象'); selected.material.color.set(valid); refresh(); return valid; }
  function snapshot() { requireLive(); return { schema: SCHEMA, objects: group.children.map(objectRecord), camera: { theta, phi, radius, target: target.toArray() } }; }
  function load(value) {
    requireLive(); const normalized = validateScene(value), created = [];
    try { for (const object of normalized.objects) created.push(objectMesh(object)); } catch (error) { created.forEach(disposeMesh); throw error; }
    for (const mesh of [...group.children]) { group.remove(mesh); disposeMesh(mesh); }
    for (const mesh of created) group.add(mesh); selected = created[0] || null;
    if (normalized.camera) { ({ theta, phi, radius } = normalized.camera); target.fromArray(normalized.camera.target); orbit(); } else resetCamera();
    refresh(); return snapshot();
  }
  function exportGlb() { requireLive(); validateScene(snapshot()); return meshesToGlb(group.children); }
  function down(event) { if (disposed || (event.button !== 0 && event.button !== 1 && event.button !== 2)) return; drag = { id: event.pointerId, x: event.clientX, y: event.clientY, originX: event.clientX, originY: event.clientY, button: event.button }; canvas.setPointerCapture(event.pointerId); }
  function move(event) { if (!drag || drag.id !== event.pointerId) return; const dx = event.clientX - drag.x, dy = event.clientY - drag.y; drag.x = event.clientX; drag.y = event.clientY;
    if (drag.button === 0 && !event.shiftKey) { theta -= dx * .008; phi = THREE.MathUtils.clamp(phi + dy * .008, .05, Math.PI - .05); }
    else { const units = 2 * radius * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / Math.max(1, canvas.clientHeight); target.addScaledVector(new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0), -dx * units); target.addScaledVector(new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1), dy * units); }
    orbit();
  }
  function up(event) { if (!drag || drag.id !== event.pointerId) return; const press = drag; drag = null; if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    if (event.type === 'pointerup' && press.button === 0 && Math.hypot(event.clientX - press.originX, event.clientY - press.originY) < 4) { const b = canvas.getBoundingClientRect(); pointer.set((event.clientX - b.left) / b.width * 2 - 1, -(event.clientY - b.top) / b.height * 2 + 1); group.updateMatrixWorld(true); raycaster.setFromCamera(pointer, camera); const hits = raycaster.intersectObjects(group.children, false); select(hits[0]?.object.userData.aiyouplusId ?? null); }
  }
  function wheel(event) { event.preventDefault(); radius = THREE.MathUtils.clamp(radius * Math.exp(THREE.MathUtils.clamp(event.deltaY * .001, -2, 2)), .2, 500); orbit(); }
  const contextmenu = event => event.preventDefault();
  canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up); canvas.addEventListener('wheel', wheel, { passive: false }); canvas.addEventListener('contextmenu', contextmenu);
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null; observer?.observe(host); if (!observer) globalThis.addEventListener('resize', resize);
  function dispose() {
    if (disposed) return; disposed = true; if (scheduled) cancelAnimationFrame(scheduled); observer?.disconnect(); globalThis.removeEventListener('resize', resize);
    for (const [type, handler] of [['pointerdown', down], ['pointermove', move], ['pointerup', up], ['pointercancel', up], ['wheel', wheel], ['contextmenu', contextmenu]]) canvas.removeEventListener(type, handler);
    for (const mesh of group.children) disposeMesh(mesh); selection.geometry.dispose(); selection.material.dispose(); grid.geometry.dispose(); for (const material of Array.isArray(grid.material) ? grid.material : [grid.material]) material.dispose(); renderer.dispose(); renderer.forceContextLoss(); canvas.remove(); if (objectList) objectList.replaceChildren();
  }
  resize(); resetCamera(); add('box'); if (scheduled) cancelAnimationFrame(scheduled); draw();
  return { add, resetCamera, removeSelected, transform, color, snapshot, load, exportGlb, dispose, select };
}
