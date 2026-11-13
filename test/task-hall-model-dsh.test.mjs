import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'node:http';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { apply } from '../aiyou/modules/taskboard/index.js';
import { createTaskHall } from '../aiyou/vendor/codex-taskboard/server/task-hall.mjs';
import { createDshHallModel } from '../aiyou/modules/taskboard/hall-host.mjs';

function setup(response, options = {}) {
  let selected = { provider: 'deepseek', model: 'example', reasoningEffort: 'low' };
  const calls = [];
  const host = {
    agentDefaultModel: { currentSelection: () => selected },
    llm: {
      listProviders: () => options.providers ?? [{ id: 'deepseek', displayName: 'DeepSeek' }],
      async prepareCall(config, signal, configure) {
        const controls = configure({ reasoningEffort: config.reasoningEffort }, { defaultMaxTokens: 700 });
        return {
          config: { ...config, ...controls, ...(options.route ?? {}) },
          async *stream(request) {
            calls.push({ signal, request });
            yield* response;
          },
        };
      },
    },
  };
  const adapter = createDshHallModel(() => host);
  const invoke = selection => adapter.invoke({
    selection, prompt: '只处理这项测试任务', system: '独立后台执行',
    runId: 'hall:fixture', signal: AbortSignal.timeout(1000),
  });
  return { adapter, invoke, calls, set selection(value) { selected = value; } };
}

test('Hall calls the configured DSH host model without tools or a desktop session', async () => {
  const fixture = setup([
    { type: 'text-delta', index: 1, text: '任' },
    { type: 'block-end', index: 1, block: { type: 'text', text: '任务' } },
    { type: 'text-delta', index: 0, text: '完成' },
    { type: 'finish', reason: { kind: 'stop' } },
  ]);
  assert.deepEqual(await fixture.invoke(await fixture.adapter.select()), { text: '完成任务', model: 'example' });
  assert.equal(fixture.calls.length, 1);
  const { signal, request } = fixture.calls[0];
  assert.equal(request.signal, signal);
  assert.equal(request.maxTokens, 700);
  assert.deepEqual(request.tools, []);
  assert.equal(request.sessionId, undefined);
  assert.equal(request.messages[0].content[0].text, '只处理这项测试任务');
});

test('Hall refuses excluded or changed DSH routes and does not dispatch', async () => {
  const fallback = setup([], { providers: [{ id: 'codex-cli' }, { id: 'alias', displayName: 'QNAIGC proxy' }] });
  fallback.selection = { provider: 'codex-cli', model: 'external' };
  assert.equal(await fallback.adapter.select(), null);
  fallback.selection = { provider: 'alias', model: 'external' };
  assert.equal(await fallback.adapter.select(), null);
  const stale = setup([]);
  const selected = await stale.adapter.select();
  stale.selection = { ...selected, model: 'other' };
  await assert.rejects(stale.invoke(selected), { status: 409 });
  assert.equal(stale.calls.length, 0);
  const redirected = setup([], { route: { provider: 'different' } });
  await assert.rejects(redirected.invoke(await redirected.adapter.select()), { status: 409 });
  assert.equal(redirected.calls.length, 0);
});

test('Hall rejects tool responses and incomplete native output', async () => {
  for (const response of [
    [{ type: 'block-start', index: 0, blockType: 'tool-call' }],
    [{ type: 'text-delta', index: 0, text: 'x'.repeat(12001) }],
    [{ type: 'text-delta', index: 0, text: '未完成' }, { type: 'finish', reason: { kind: 'max-tokens' } }],
  ]) {
    const fixture = setup(response);
    await assert.rejects(fixture.invoke(await fixture.adapter.select()), { status: 502 });
  }
});


test('native DSH module automatically registers the Agent and shares its detection receipt through the authenticated route', { timeout: 10_000 }, async t => {
  const root = await mkdtemp(join(process.env.AIYOU_TEST_OUTPUT || tmpdir(), 'aiyou-dsh-hall-model-'));
  const previous = { DSH_HOME: process.env.DSH_HOME, AIYOU_TASK_HALL_FILE: process.env.AIYOU_TASK_HALL_FILE };
  process.env.DSH_HOME = root;
  process.env.AIYOU_TASK_HALL_FILE = join(root, 'hall.sqlite');
  const hall = createTaskHall();
  const effects = [], routes = new Map(), calls = [];
  let server;
  t.after(async () => {
    if (server) await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); });
    for (const dispose of effects.reverse()) await dispose();
    hall.close();
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    await rm(root, { recursive: true, force: true });
  });
  const ctx = {
    inject(_services, fn) { fn(ctx); },
    effect(fn) { const done = fn(); if (done) effects.push(done); },
    connection: { requestRejection: req => req.headers['x-test-auth'] === 'yes' ? undefined : 401 },
    webServer: { register(route) { routes.set(route.path, route); } },
    agentDefaultModel: { currentSelection: () => ({ provider: 'deepseek', model: 'native-fixture' }) },
    llm: {
      listProviders: () => [{ id: 'deepseek' }],
      async prepareCall(config) {
        return {
          config,
          async *stream(request) {
            calls.push(request);
            yield { type: 'text-delta', index: 0, text: '{"verdict":"pass","evidence":"检查到真实交接文本"}' };
            yield { type: 'finish', reason: { kind: 'stop' } };
          },
        };
      },
    },
  };
  apply(ctx);
  const endpoint = '/aiyoucodex-dsh/taskboard/task-hall';
  server = createServer(routes.get(endpoint).handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = 'http://127.0.0.1:' + server.address().port + endpoint;
  const read = async () => {
    const response = await fetch(url, { headers: { 'x-test-auth': 'yes' } });
    assert.equal(response.status, 200);
    return response.json();
  };
  assert.equal((await fetch(url)).status, 401);
  assert.ok((await read()).agents.some(agent => agent.id === 'builtin:dsh' && agent.online));
  assert.equal(calls.length, 0, 'discovery must not call the model');
  const codex = hall.managedAgent('codex');
  const { task } = hall.asOperator('codex', {
    action: 'create', title: '模型接线验证', requestId: 'dsh-review-fixture', agentId: 'builtin:codex',
    automation: { reviewAgentId: 'builtin:dsh' },
  });
  const { token } = codex.take();
  codex.finish({ taskId: task.id, token }, { evidence: '独立检测所需回执' });
  let continuation;
  for (let i = 0; i < 100 && !continuation; i++) {
    continuation = (await read()).tasks.find(item => item.id === task.id && item.status === 'continuation');
    if (!continuation) await sleep(50);
  }
  assert.ok(continuation);
  assert.deepEqual(continuation.timeline.slice(-2).map(event => [event.action, event.actorId]), [
    ['review-start', 'builtin:dsh'], ['review', 'builtin:dsh'],
  ]);
  assert.equal(continuation.timeline.at(-1).verdict, 'pass');
  assert.equal(calls.length, 1);
  assert.match(calls[0].messages[0].content[0].text, /独立检测所需回执/);
});
