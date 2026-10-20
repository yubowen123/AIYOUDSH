import { z } from 'zod';

/** Native projection owned by the workspace browser; old caches can omit this key. */
const aiyouSidebarProjection = {
  key: AIYOU_SIDEBAR_KEY,
  stateVersion: 1,
  stateSchema: z.object({
    turn: z.number().int().nonnegative(),
    prompt: z.string().max(240),
    response: z.string().max(400),
    endReason: z.string().nullable(),
    turnOpen: z.boolean(),
    updatedAt: z.number(),
  }),
  init: () => ({ ...AIYOU_EMPTY_SIDEBAR_FACTS }),
  apply: aiyouFoldSidebarFacts,
  wire: {
    viewSchema: z.object({
      turn: z.number().int().nonnegative(), prompt: z.string().max(240), response: z.string().max(400),
      endReason: z.string().nullable(), turnOpen: z.boolean(), updatedAt: z.number(),
    }),
    view: state => state,
  },
};

const inject = ['sessionProjections'];
/** Register with the real projection registry so cache materialization and teardown stay native. */
function apply(ctx) {
  ctx.sessionProjections.register(aiyouSidebarProjection);
}
export { apply, inject };
