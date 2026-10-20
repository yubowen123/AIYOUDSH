import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { access, lstat, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';
import vm from 'node:vm';
import * as zlib from 'node:zlib';
import { absoluteDirectory, sameDirectory, directChildOf, sessionDirectory } from '../aiyou/lib/platform-paths.mjs';
import { conversationFolderName, MARKER } from '../aiyou/modules/conversation-folders/folders.mjs';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await mkdir(join(repository, 'temporary'), { recursive: true });
const fixture = await mkdtemp(join(repository, 'temporary/platform-paths-'));
const previousHome = process.env.DSH_HOME;
process.env.DSH_HOME = join(fixture, 'dsh');
const folders = await import('../aiyou/modules/conversation-folders/index.js');
const transcript = await import('../aiyou/modules/session-transcript/index.js');
if (previousHome === undefined) delete process.env.DSH_HOME;
else process.env.DSH_HOME = previousHome;
after(() => rm(fixture, { recursive: true, force: true }));
const createLink = (target, path) => symlink(target, path, process.platform === 'win32' ? 'junction' : 'dir');
const modelSource = await readFile(new URL('../packages/dsh-client-ui-workspace/src/aiyou-sidebar-model.js', import.meta.url), 'utf8');
const model = vm.runInNewContext(`${modelSource}\n({aiyouSidebarWorkspaceIds,aiyouSidebarFolderPath})`, { Set });
const ids = (workspaces, selected = 'root') => [...model.aiyouSidebarWorkspaceIds(workspaces, selected)];
const workspace = (workspaceId, path) => ({ workspaceId, path, sessionIds: [workspaceId] });

test('absolute directory validation preserves Mac paths and requires fully qualified Windows drives or UNC', () => {
  assert.equal(absoluteDirectory('/Users/me/project/../studio/', 'darwin'), '/Users/me/studio/');
  assert.equal(absoluteDirectory('C:\\Users\\me\\project\\..\\studio', 'win32'), 'C:\\Users\\me\\studio');
  assert.equal(absoluteDirectory('c:/work/studio', 'win32'), 'c:\\work\\studio');
  assert.equal(absoluteDirectory('\\\\server\\share\\studio', 'win32'), '\\\\server\\share\\studio');
  for (const input of ['', '.', '..', 'relative/folder', 'C:relative', '\\rooted', '/rooted', '\\\\?\\C:\\device', '\\\\server', 'C:\\bad\0path']) assert.equal(absoluteDirectory(input, 'win32'), '', input);
  for (const input of ['', '.', 'relative/folder', 'C:\\work']) assert.equal(absoluteDirectory(input, 'darwin'), '', input);
});

test('workspace child checks normalize Windows case, separators, drive boundaries and traversal', () => {
  assert(sameDirectory('C:\\Work\\Film\\', 'c:/work/film', 'win32'));
  assert(directChildOf('C:\\Work\\Film', 'c:/work/film/output', 'win32'));
  assert(directChildOf('\\\\Server\\Share', '//server/share/output', 'win32'));
  for (const target of ['C:\\Work\\Filmmaker\\out', 'C:\\Work\\Film\\..\\Other', 'D:\\Work\\Film\\out', 'C:\\Work\\Film\\nested\\out', 'output']) assert.equal(directChildOf('C:\\Work\\Film', target, 'win32'), false, target);
  assert.equal(directChildOf('/work/Film', '/work/film/output', 'darwin'), false);
  assert.equal(directChildOf('/work/film', '/work/film/../other', 'darwin'), false);
});

test('session cwd recognizes host-native Windows values without converting relative paths into absolute paths', () => {
  assert.equal(folders.cwdOf({ cwd: 'C:\\Work\\Studio' }, 'win32'), 'C:\\Work\\Studio');
  assert.equal(folders.cwdOf({ cwd: '\\\\server\\share\\Studio' }, 'win32'), '\\\\server\\share\\Studio');
  assert.equal(folders.cwdOf({ cwd: '/Users/me/Studio' }, 'darwin'), '/Users/me/Studio');
  assert.equal(folders.cwdOf({ cwd: 'relative/studio' }, 'darwin'), '');
  assert.equal(folders.cwdOf({ cwd: 'C:relative' }, 'win32'), '');
});

test('transcript export accepts Windows drive and UNC destinations and cannot escape by session id', () => {
  assert.equal(transcript.transcriptExportTarget('C:\\Output\\Copies', 'session-123', 'win32'), 'C:\\Output\\Copies\\session-123');
  assert.equal(transcript.transcriptExportTarget('\\\\Server\\Share\\Copies', 'session-123', 'win32'), '\\\\Server\\Share\\Copies\\session-123');
  assert.equal(transcript.transcriptExportTarget('/Users/me/Copies', 'session-123', 'darwin'), '/Users/me/Copies/session-123');
  for (const dir of ['relative', 'C:relative', '\\rooted']) assert.throws(() => transcript.transcriptExportTarget(dir, 'session-123', 'win32'), /absolute/u);
  for (const id of ['..', '../outside', 'folder/child', 'folder\\child', 'C:outside', '__proto__']) assert.throws(() => sessionDirectory('C:\\Output', id, 'win32'), /safe session/u);
});

test('workspace filtering includes Windows descendants while excluding sibling, parent escape and other drive', () => {
  const workspaces = [
    workspace('root', 'C:\\Work\\Film\\'), workspace('child', 'c:/work/film/Episode1'),
    workspace('alias', 'c:/work/film/./Episode2'), workspace('same', 'c:/WORK/FILM'),
    workspace('sibling', 'C:\\Work\\Filmmaker'), workspace('escape', 'C:\\Work\\Film\\..\\Other'),
    workspace('drive', 'D:\\Work\\Film\\Episode3'), workspace('relative', 'C:Work/Film/Episode4'),
  ];
  assert.deepEqual(ids(workspaces), ['root', 'child', 'alias', 'same']);
  assert.deepEqual(ids([workspace('root', 'C:\\'), workspace('child', 'c:/work'), workspace('other', 'D:\\work')]), ['root', 'child']);
});

test('UNC folder filters normalize server/share case and retain share boundaries', () => {
  assert.deepEqual(ids([
    workspace('root', '\\\\Server\\Share\\Studio'), workspace('child', '//server/share/studio/Episode1'),
    workspace('share', '\\\\Server\\Share2\\Studio'), workspace('escape', '\\\\Server\\Share\\Studio\\..\\Other'),
    workspace('server', '\\\\OtherServer\\Share\\Studio\\Episode1'),
  ]), ['root', 'child']);
});

test('Mac filters retain case and POSIX boundaries while normalizing dot segments', () => {
  assert.deepEqual(ids([
    workspace('root', '/work/Film'), workspace('child', '/work/Film/./ep1'),
    workspace('case', '/work/film/ep2'), workspace('sibling', '/work/Filmmaker'),
    workspace('escape', '/work/Film/../Other'), workspace('relative', 'work/Film/ep3'),
  ]), ['root', 'child']);
  assert.deepEqual(ids([workspace('root', 'relative'), workspace('other', '/relative/child')]), ['root']);
});

test('output folder creates and renames within its native workspace while keeping existing files', async () => {
  const base = join(fixture, 'workspace-rename');
  await mkdir(base);
  const first = await folders.ensureFolder({ sessionId: 'session-rename', workspace: base, title: '第一版' });
  await writeFile(join(first.path, 'keep.txt'), 'preserve this deliverable');
  const renamed = await folders.ensureFolder({ sessionId: 'session-rename', workspace: base, title: '第二版' });
  assert.equal(renamed.path, join(base, '第二版'));
  assert.equal(await readFile(join(renamed.path, 'keep.txt'), 'utf8'), 'preserve this deliverable');
  await assert.rejects(access(first.path));
  assert.equal(await folders.ownedBy(renamed.path, 'session-rename'), true);
});

test('output folder rejects relative workspaces and refuses moving a binding to another workspace', async () => {
  await assert.rejects(folders.ensureFolder({ sessionId: 'session-relative', workspace: 'relative/workspace', title: 'test' }), /absolute/u);
  const first = join(fixture, 'workspace-one'), second = join(fixture, 'workspace-two');
  await mkdir(first); await mkdir(second);
  const binding = await folders.ensureFolder({ sessionId: 'session-bound', workspace: first, title: 'Binding' });
  await writeFile(join(binding.path, 'keep.txt'), 'bound to workspace one');
  await assert.rejects(folders.ensureFolder({ sessionId: 'session-bound', workspace: second, title: 'Moved' }), /different workspace/u);
  assert.equal(await readFile(join(binding.path, 'keep.txt'), 'utf8'), 'bound to workspace one');
  await assert.rejects(access(join(second, 'Moved')));
});

test('output folder never adopts an unowned existing directory or symlink outside its workspace', async () => {
  const base = join(fixture, 'workspace-owner'), foreign = join(fixture, 'foreign-owner');
  await mkdir(base); await mkdir(foreign);
  const title = 'Existing', sessionId = 'session-unowned';
  const target = join(base, conversationFolderName(title, sessionId));
  await mkdir(target); await writeFile(join(target, 'keep.txt'), 'other owner');
  await assert.rejects(folders.ensureFolder({ sessionId, workspace: base, title }), /not owned/u);
  assert.equal(await readFile(join(target, 'keep.txt'), 'utf8'), 'other owner');
  await assert.rejects(access(join(target, MARKER)));
  await createLink(foreign, join(base, 'Linked'));
  await assert.rejects(folders.ensureFolder({ sessionId: 'session-link', workspace: base, title: 'Linked' }), /not owned/u);
  await assert.rejects(access(join(foreign, MARKER)));
});

function transcriptRoutes() {
  const routes = [];
  const server = { register(definition) { routes.push(definition); return () => {}; } };
  const context = {
    webServer: server, connection: { requestRejection: () => undefined },
    inject(_services, callback) { callback(this); },
    effect(effect, key) { if (!key?.endsWith(':lifecycle')) return effect(); },
  };
  transcript.apply(context);
  return routes;
}
async function exportRequest(payload) {
  const route = transcriptRoutes().find(route => route.path.endsWith('/export'));
  const req = Readable.from([Buffer.from(JSON.stringify(payload))]);
  Object.assign(req, { method: 'POST', url: route.path, headers: { 'content-type': 'application/json' } });
  let code, body;
  const response = { setHeader() {}, writeHead(value) { code = value; }, end(value) { body = JSON.parse(value); } };
  await route.handler(req, response);
  return { code, body };
}
const hasZstd = typeof zlib.zstdCompressSync === 'function';
async function sessionLog(sessionId) {
  const dir = join(fixture, 'dsh/sessions/fixture-project', sessionId);
  await mkdir(dir, { recursive: true });
  const event = { type: 'user/message', data: { source: { kind: 'user' }, content: [{ type: 'text', text: 'fixture human message' }] } };
  await writeFile(join(dir, 'session.v4.jsonl.zstd'), zlib.zstdCompressSync(Buffer.from(`${JSON.stringify(event)}\n`)));
}

test('native transcript route writes its readable files beneath an explicit absolute destination', { skip: !hasZstd }, async () => {
  await sessionLog('session-export');
  const root = join(fixture, 'export-output');
  const { code, body } = await exportRequest({ session: 'session-export', dir: root });
  assert.equal(code, 200);
  assert.equal(body.dir, join(root, 'session-export'));
  assert.match(await readFile(join(body.dir, 'conversation.md'), 'utf8'), /fixture human message/u);
  assert.equal(JSON.parse(await readFile(join(body.dir, 'conversation.json'))).sessionId, 'session-export');
});

test('transcript route rejects relative destinations and traversal before export writes', async () => {
  assert.equal((await exportRequest({ session: 'session-invalid', dir: 'relative/output' })).code, 400);
  assert.equal((await exportRequest({ session: '../outside', dir: join(fixture, 'safe-export') })).code, 400);
  await assert.rejects(access(join(fixture, 'dsh/aiyou-enhancer/aiyou-conversations')));
  await assert.rejects(access(join(fixture, 'safe-export')));
});

test('transcript route refuses a symlink destination that would write outside the export root', { skip: !hasZstd }, async () => {
  await sessionLog('session-export-link');
  const root = join(fixture, 'export-links'), foreign = join(fixture, 'foreign-export');
  await mkdir(root); await mkdir(foreign);
  await createLink(foreign, join(root, 'session-export-link'));
  const { code } = await exportRequest({ session: 'session-export-link', dir: root });
  assert.equal(code, 500);
  assert((await lstat(join(root, 'session-export-link'))).isSymbolicLink());
  await assert.rejects(access(join(foreign, 'conversation.md')));
});

test('an edited folder binding cannot rename a marked directory from another workspace', async () => {
  const base = join(fixture, 'workspace-boundary'), outside = join(fixture, 'outside-boundary');
  await mkdir(base); await mkdir(outside);
  await writeFile(join(outside, MARKER), JSON.stringify({ schemaVersion: 1, threadId: 'session-outside' }));
  await writeFile(join(outside, 'keep.txt'), 'must remain outside');
  const store = await folders.readStore();
  store['session-outside'] = { threadId: 'session-outside', workspace: base, path: outside, title: 'Outside' };
  await writeFile(join(fixture, 'dsh/aiyou-enhancer/conversation-folders.json'), JSON.stringify(store));
  await assert.rejects(folders.ensureFolder({ sessionId: 'session-outside', workspace: base, title: 'Moved' }), /different workspace/u);
  assert.equal(await readFile(join(outside, 'keep.txt'), 'utf8'), 'must remain outside');
  await assert.rejects(access(join(base, 'Moved')));
});

test('a relative cwd in the native projection is rejected without using the process workspace', async () => {
  const projectionDir = join(fixture, 'dsh/storages/session_projcache/sessions');
  await mkdir(projectionDir, { recursive: true });
  await writeFile(join(projectionDir, 'session-relative-cwd.json'), JSON.stringify({ record: { identity: { cwd: 'relative/workspace' }, rows: { title: { val: 'No fallback' } } } }));
  await assert.rejects(folders.resolveForSession('session-relative-cwd'), /no absolute workspace/u);
  assert.equal(Object.hasOwn(await folders.readStore(), 'session-relative-cwd'), false);
});
