import { hallError } from '../../vendor/codex-taskboard/server/task-hall.mjs';

const unsupported = /qiniu|qnaigc|qbox|qnssl|qiniucdn|七牛/iu;
const MAX_TEXT = 12_000;
const MAX_TOKENS = 1200;
const unavailable = () => hallError(503, 'DSH 未配置可用的原生模型。请在 DSH 中选择模型。');

export function hasDshHallModelHost(host) {
  return typeof host?.agentDefaultModel?.currentSelection === 'function'
    && typeof host?.llm?.listProviders === 'function'
    && typeof host?.llm?.prepareCall === 'function';
}

function allowed(provider, model) {
  return typeof provider === 'string' && provider.trim() && typeof model === 'string' && model.trim()
    && !/^(?:codex|claude)(?:-code)?-cli$/iu.test(provider.trim()) && !unsupported.test(provider + ' ' + model);
}

async function nativeSelection(host) {
  if (!hasDshHallModelHost(host)) return null;
  const selected = await host.agentDefaultModel.currentSelection();
  const { provider, model, reasoningEffort } = selected ?? {};
  if (!allowed(provider, model)) return null;
  const registered = host.llm.listProviders().find(entry => entry.id === provider);
  if (!registered || unsupported.test([registered.id, registered.name, registered.displayName].join(' '))) return null;
  return { provider, model, ...(reasoningEffort === undefined ? {} : { reasoningEffort }) };
}

/** Background task execution uses the configured native DSH model. Existing
 * desktop conversations, private credentials and tools stay with their owner. */
export function createDshHallModel(getHost) {
  return {
    select() { return nativeSelection(getHost()); },
    async invoke({ selection, system, prompt, signal, runId }) {
      signal?.throwIfAborted();
      const host = getHost();
      const current = await nativeSelection(host);
      if (!current) throw unavailable();
      if (current.provider !== selection?.provider || current.model !== selection?.model
          || current.reasoningEffort !== selection?.reasoningEffort || getHost() !== host) {
        throw hallError(409, 'DSH 默认模型已变化，请重新启动该任务。');
      }
      const request = { ...current };
      const call = await host.llm.prepareCall(request, signal, (controls, modelInfo) => ({
        ...controls, maxTokens: Math.min(MAX_TOKENS, modelInfo?.defaultMaxTokens ?? MAX_TOKENS),
      }));
      signal?.throwIfAborted();
      if (call.config.provider !== current.provider || call.config.model !== current.model || getHost() !== host) {
        throw hallError(409, 'DSH 模型路由已变化，请重新启动该任务。');
      }
      const messages = [{
        id: runId, role: 'user', content: [{ type: 'text', text: prompt }], source: { kind: 'canvas-input' },
      }];
      const blocks = new Map();
      let finish, size = 0;
      const saveText = (index, text) => {
        size += text.length - (blocks.get(index)?.length ?? 0);
        if (size > MAX_TEXT) throw hallError(502, 'DSH 模型回执超出长度限制。');
        blocks.set(index, text);
      };
      for await (const chunk of call.stream({
        ...call.config, system, messages, tools: [], purpose: 'task-hall', signal,
      })) {
        signal?.throwIfAborted();
        if (chunk.type === 'tool-call-delta' || chunk.type === 'block-start' && chunk.blockType === 'tool-call'
            || chunk.type === 'block-end' && chunk.block?.type === 'tool-call') {
          throw hallError(502, '任务大厅没有授权 DSH 模型工具。');
        }
        if (chunk.type === 'text-delta' && typeof chunk.text === 'string') {
          saveText(chunk.index, (blocks.get(chunk.index) ?? '') + chunk.text);
        } else if (chunk.type === 'block-end' && chunk.block?.type === 'text' && typeof chunk.block.text === 'string') {
          saveText(chunk.index, chunk.block.text);
        } else if (chunk.type === 'finish') {
          finish = chunk.reason;
        }
      }
      signal?.throwIfAborted();
      const text = [...blocks.entries()].sort(([a], [b]) => a - b).map(([, value]) => value).join('').trim();
      if (finish?.kind !== 'stop' || !text) throw hallError(502, 'DSH 原生模型没有返回完整的文字回执。');
      return { text, model: call.config.model };
    },
  };
}
