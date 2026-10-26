import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {createRequire} from 'node:module';
import {createModelService} from '../aiyou/lib/canvas/model-service.mjs';
const require = createRequire(import.meta.url);
const {buildGenericRequest} = require('../aiyou/lib/canvas/providers/aiyouplus-generic-provider.cjs');
const {normalizeModelCatalog} = require('../aiyou/lib/canvas/providers/aiyouplus-provider-registry.cjs');
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+cRZkAAAAASUVORK5CYII=', 'base64');
const ID = 'service-12345678-1234-4234-8234-123456789abc';
const context = {sessionId: 's-media', projectId: 'p-media'};
function profile(extra = {}) {
  return {provider: ID, name: '受控媒体协议', baseUrl: 'http://127.0.0.1:51999', protocol: 'http-json', authType: 'none', scope: 'production', models: {image: 'mixed'},
    modelCatalog: [{id: 'mixed', kind: 'image', inputModalities: ['text', 'image', 'video', 'audio'], maxReferences: 3, maskSupported: true,
      request: {path: '/generate', template: {model: '{{model}}', prompt: '{{prompt}}', input: '{{referenceMedia}}', mask: '{{maskImage}}', parameters: '{{parameters}}'}},
      response: {base64Path: 'image'}, ...extra}]};
}
async function fixture(t, options = {}) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-media-reference-')), records = new Map(), requests = [], probes = [];
  const inputs = {};
  for (const [kind, extension, mimeType] of [['image', 'png', 'image/png'], ['video', 'mp4', 'video/mp4'], ['audio', 'wav', 'audio/wav'], ['mask', 'png', 'image/png']]) {
    const file = path.join(root, kind + '.' + extension); await fs.writeFile(file, kind === 'image' || kind === 'mask' ? PNG : Buffer.from('controlled-probe-' + kind));
    inputs[kind] = file; records.set(file, {id: 'asset-' + kind, path: file, kind: kind === 'mask' ? 'image' : kind, mimeType});
  }
  const assets = {get: async file => records.get(file) || null, ingestFile: async file => ({id: 'asset-result', path: file, kind: 'image'})};
  const service = createModelService({stateDir: path.join(root, 'state'), assets,
    mediaTools: {probe: async file => { probes.push(file); const kind = records.get(file)?.kind || 'image'; return kind === 'video' ? {kind, hasVideo: true, width: 2, height: 2, duration: 2} : kind === 'audio' ? {kind, hasAudio: true, duration: 2} : {kind, width: options.badMask && file === inputs.mask ? 3 : 2, height: 2}; }},
    fetch: async (_url, request) => { requests.push(JSON.parse(request.body)); return Response.json({image: PNG.toString('base64')}); }});
  await service.invoke('aiyouplus_model_configure', profile(options.model), context);
  t.after(async () => { await service.dispose(); await fs.rm(root, {recursive: true, force: true}); });
  return {root, inputs, records, service, probes, requests,
    run: extra => service.invoke('aiyouplus_model_generate', {kind: 'image', prompt: '受控动作迁移', requestId: 'mixed-request', referencePaths: [inputs.image, inputs.video, inputs.audio], maskPath: inputs.mask, parameters: {operation: 'fixture-edit'}, ...extra}, context)};
}
test('declared mixed media and canonical same-size mask reach a single mapped request in selected order', async t => {
  const f = await fixture(t);
  const result = await f.run({referenceOrder: [{kind: 'path', index: 1}, {kind: 'path', index: 0}, {kind: 'path', index: 2}]});
  assert.equal(f.requests.length, 1);
  assert.deepEqual(f.requests[0].input.map(r => r.kind), ['video', 'image', 'audio']);
  assert.ok(f.requests[0].input[0].dataUrl.startsWith('data:video/mp4;base64,'));
  assert.ok(f.requests[0].input[2].dataUrl.startsWith('data:audio/wav;base64,'));
  assert.ok(f.requests[0].mask.startsWith('data:image/png;base64,'));
  assert.equal(f.requests[0].parameters.operation, 'fixture-edit');
  assert.equal(result.assets[0].id, 'asset-result');
  assert.ok(f.probes.includes(f.inputs.video) && f.probes.includes(f.inputs.mask));
});
test('unsupported video modality and missing mask mapping fail before any transport POST', async t => {
  const noVideo = await fixture(t, {model: {inputModalities: ['text', 'image']}});
  await assert.rejects(noVideo.run(), /未声明.*输入能力/); assert.equal(noVideo.requests.length, 0);
  const noMask = await fixture(t, {model: {request: {path: '/generate', template: {input: '{{referenceMedia}}', parameters: '{{parameters}}'}}}});
  await assert.rejects(noMask.run(), /未映射蒙版/); assert.equal(noMask.requests.length, 0);
});
test('noncanonical mask, wrong dimensions and undeclared mask capability cannot submit', async t => {
  const f = await fixture(t);
  const external = path.join(f.root, 'not-in-dsh.png'); await fs.writeFile(external, PNG);
  await assert.rejects(f.run({maskPath: external}), /DSH素材库授权/); assert.equal(f.requests.length, 0);
  const badSize = await fixture(t, {badMask: true}); await assert.rejects(badSize.run(), /尺寸/); assert.equal(badSize.requests.length, 0);
  const noMask = await fixture(t, {model: {maskSupported: false}}); await assert.rejects(noMask.run(), /未声明蒙版/); assert.equal(noMask.requests.length, 0);
});
test('request mapping cannot silently drop one of the chosen references', () => {
  const cfg = profile({request: {path: '/generate', template: {first: '{{referenceMedia.0.dataUrl}}'}}});
  assert.throws(() => buildGenericRequest(cfg, {kind: 'image', model: 'mixed', prompt: 'test'}, {referenceMedia: [{kind: 'video', dataUrl: 'data:video/mp4;base64,YQ=='}, {kind: 'audio', dataUrl: 'data:audio/wav;base64,Yg=='}]}), /遗漏/);
});
test('mask capability and template fields are explicit safe catalog metadata', () => {
  const entry = normalizeModelCatalog(profile().modelCatalog)[0]; assert.equal(entry.maskSupported, true);
  assert.throws(() => normalizeModelCatalog([{id: 'bad', kind: 'image', maskSupported: 'yes'}]), /蒙版/);
});
