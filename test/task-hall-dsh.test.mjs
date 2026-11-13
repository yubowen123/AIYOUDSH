import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'node:http';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { apply } from '../aiyou/modules/taskboard/index.js';
import { createTaskHall } from '../aiyou/vendor/codex-taskboard/server/task-hall.mjs';

test('native DSH hall route enforces its host boundary and observes same-machine Agent receipts', async t => {
  const root = await mkdtemp(join(process.env.AIYOU_TEST_OUTPUT || tmpdir(), 'aiyou-dsh-hall-'));
  const env = Object.fromEntries(['DSH_HOME','AIYOU_TASK_HALL_FILE'].map(key => [key, process.env[key]]));
  const file = join(root, 'shared-hall.sqlite');
  process.env.DSH_HOME = root;
  process.env.AIYOU_TASK_HALL_FILE = file;
  const routes = new Map(), disposals = [];
  const ctx = {
    inject(_names, callback) { return callback(ctx); },
    effect(callback) { const cleanup = callback(); if (cleanup) disposals.push(cleanup); },
    connection: { requestRejection: req => req.headers.cookie === 'fixture=authorized' ? undefined : 401 },
    webServer: { register(definition) { routes.set(definition.path, definition); return () => routes.delete(definition.path); } },
  };
  const hall = createTaskHall({ file });
  apply(ctx);
  const endpoint = '/aiyoucodex-dsh/taskboard/task-hall';
  const server = createServer(routes.get(endpoint).handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => {
    await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); });
    for (const dispose of disposals.reverse()) await dispose();
    hall.close();
    for (const [key, value] of Object.entries(env)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    await rm(root, { recursive: true, force: true });
  });
  const url = 'http://127.0.0.1:' + server.address().port + endpoint;
  const headers = { cookie: 'fixture=authorized' };
  assert.equal((await fetch(url)).status, 401);
  assert.equal((await fetch(url, { method: 'POST', headers, body: '{}' })).status, 415);
  const read = async () => {
    const response = await fetch(url, { headers });
    assert.equal(response.status, 200);
    return response.json();
  };
  const post = async command => {
    const response = await fetch(url, { method:'POST', headers: { ...headers, 'content-type': 'application/json' }, body: JSON.stringify(command) });
    assert.equal(response.status, 200, await response.clone().text());
    return response.json();
  };
  const worker = hall.register({ id:'fixture-codex', name: 'Codex fixture', host:'codex' });
  assert.equal((await read()).agents[0].online, false);
  const { task } = await post({ action:'create', title:'待承接事项', requestId:'dsh-task', agentId:worker.id });
  assert.equal(task.timeline[0].actorId, 'operator:dsh');
  assert.equal(task.status, 'queued');
  assert.equal(hall.listOperator('local').tasks[0].id, task.id);
  const working = hall.asAgent(worker, { action:'claim', taskId:task.id, revision:task.revision }).task;
  const snapshot = await read();
  assert.equal(snapshot.tasks[0].status, 'running');
  assert.equal(snapshot.counts.running, 1);
  assert.equal(snapshot.agents[0].activeCount, 1);
  const submitted = hall.asAgent(worker, { action:'submit', taskId:task.id, revision:working.revision, evidence:'结果一' }).task;
  const reviewed = await post({ action:'review', taskId:task.id, revision:submitted.revision, verdict:'pass', evidence:'检测通过' });
  assert.equal(reviewed.task.status, 'continuation');
  const finished = await post({ action:'progress', taskId:task.id, revision:reviewed.task.revision, evidence:'关闭任务' });
  assert.equal(finished.task.status, 'completed');
  assert.equal((await read()).counts.completedToday, 1);
});
