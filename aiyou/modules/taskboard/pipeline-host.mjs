import { pipelineError } from '../../vendor/codex-taskboard/server/pipeline.mjs';
import { pipelinePrompt, pipelineSystem } from '../../vendor/codex-taskboard/server/pipeline-prompt.mjs';

const unavailable = () => pipelineError(503, '请在 DSH 选择支持独立文字请求的默认模型；未提交请求。');
const allowed = selection => selection?.provider && selection.model && !/qiniu|qnaigc|七牛|^codex-cli\s/iu.test(selection.provider + ' ' + selection.model);

export function createDshPipelineRunner(getHost) {
  return {
    async select() {
      const host = getHost();
      const selection = await host?.agentDefaultModel?.currentSelection();
      if (!allowed(selection)) throw unavailable();
      const { provider, model, reasoningEffort } = selection;
      return { provider, model, ...(reasoningEffort === undefined ? {} : { reasoningEffort }) };
    },
    async invoke({ selection, run, stage, signal }) {
      const host = getHost();
      if (!host?.llm || !allowed(selection)) throw unavailable();
      signal.throwIfAborted();
      const call = await host.llm.prepareCall(selection, signal);
      if (call.config.provider !== selection.provider || call.config.model !== selection.model) throw pipelineError(409, '宿主模型路由已变化，请重新发起。');
      const messages = [{ id: run.id + ':' + run.cursor, role: 'user',
        content: [{ type: 'text', text: pipelinePrompt({ run, stage }) }], source: { kind: 'canvas-input' } }];
      const blocks = new Map();
      let finish, usage;
      // Native default model, with no tools and no desktop session injection.
      for await (const chunk of call.stream({ ...call.config, system: pipelineSystem,
        messages, tools: [], purpose: 'taskboard-pipeline', signal })) {
        signal.throwIfAborted();
        if (chunk.type === 'tool-call-delta' || chunk.type === 'block-start' && chunk.blockType === 'tool-call' ||
            chunk.type === 'block-end' && chunk.block?.type === 'tool-call') {
          throw pipelineError(502, '流程步骤不执行模型工具。');
        }
        if (chunk.type === 'text-delta') {
          const next = (blocks.get(chunk.index) || '') + chunk.text;
          if (next.length > 24000) throw pipelineError(502, '模型回执超出长度限制。');
          blocks.set(chunk.index, next);
        }
        if (chunk.type === 'block-end' && chunk.block?.type === 'text') blocks.set(chunk.index, chunk.block.text);
        if (chunk.type === 'usage') usage = chunk.usage;
        if (chunk.type === 'finish') finish = chunk.reason;
      }
      signal.throwIfAborted();
      if (finish?.kind !== 'stop') throw pipelineError(502, 'DSH 模型未返回完成回执。');
      return { text: [...blocks.values()].join(''), usage };
    },
  };
}
