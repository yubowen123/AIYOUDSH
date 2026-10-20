/**
 * Client half — tri-colour session marks.
 *
 * Uses three REAL sidebar seats, all declared `list` slots by ui-workspace and
 * all handed `{ sessionId }` (verified in its source):
 *
 *   sidebar.session.row.leading             the leading decoration
 *   sidebar.workspaces.session.menu.item    entries in the row's "..." menu
 *   sidebar.workspaces.session.row.action   hover buttons
 *
 * CAVEAT WORTH KNOWING: ui-workspace renders the leading seat as
 *   showStatus ? <SessionStatusDots/> : renderSlot('sidebar.session.row.leading')
 * with `showStatus = primaryStatus.state !== 'idle'`. So a RUNNING or errored
 * session shows the host's own status dots and our mark is not drawn there —
 * the mark stays visible in the row menu and, for idle sessions, as the dot.
 * That is the host's layout, not something a plugin can override through slots.
 */
window.__ModuleLoader__.load({
  id: '@local/aiyou-enhancer-session-state',

  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const LEADING_SLOT = 'sidebar.session.row.leading';
    const MENU_SLOT = 'sidebar.workspaces.session.menu.item';
    const ACTION_SLOT = 'sidebar.workspaces.session.row.action';

    const API_ORIGIN = '';
    const API = `${API_ORIGIN}/aiyoucodex-dsh/session-state`;

    const LEVELS = [
      { id: 'urgent-important', label: '紧急且重要', color: 'var(--dsw-alias-state-error-primary)' },
      { id: 'urgent-or-important', label: '紧急或重要', color: 'var(--dsw-alias-state-warn-primary)' },
      { id: 'neither', label: '不紧急', color: 'var(--dsw-alias-state-success-primary)' },
    ];
    const colorOf = (mark) => LEVELS.find((level) => level.id === mark)?.color ?? null;

    // ---------- shared store ----------
    let marks = {};
    let loadedAt = 0;
    let inflight = null;
    const listeners = new Set();

    function emit() {
      for (const listener of listeners) {
        try {
          listener();
        } catch {
          /* a broken listener must not break the store */
        }
      }
    }

    function loadMarks(force = false) {
      if (!force && Date.now() - loadedAt < 3000) return Promise.resolve(marks);
      if (inflight) return inflight;
      inflight = fetch(API, { cache: 'no-store' })
        .then((response) => response.json())
        .then((value) => {
          marks = value?.marks ?? {};
          loadedAt = Date.now();
          emit();
          return marks;
        })
        .catch(() => marks)
        .finally(() => {
          inflight = null;
        });
      return inflight;
    }

    async function setMark(sessionId, mark) {
      // Optimistic: the row must react immediately on click.
      const previous = marks[sessionId];
      const next = { ...marks };
      if (mark) next[sessionId] = mark;
      else delete next[sessionId];
      marks = next;
      loadedAt = Date.now();
      emit();
      try {
        const response = await fetch(`${API}/set`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ sessionId, mark }),
        });
        const value = await response.json();
        if (response.ok && value?.marks) {
          marks = value.marks;
          emit();
        }
      } catch {
        // Roll back on failure so the UI never lies about a saved mark.
        marks = { ...marks, ...(previous ? { [sessionId]: previous } : {}) };
        if (!previous) delete marks[sessionId];
        emit();
      }
    }

    function useMarks() {
      const [, bump] = React.useState(0);
      React.useEffect(() => {
        const listener = () => bump((n) => n + 1);
        listeners.add(listener);
        void loadMarks();
        // Marks can change from another window or a shell; poll so a row's dot
        // does not stay stale until the next mount.
        const timer = setInterval(() => void loadMarks(true), 4000);
        return () => {
          listeners.delete(listener);
          clearInterval(timer);
        };
      }, []);
      return marks;
    }

    // ---------- seats ----------
    function MarkDot(props) {
      const current = useMarks();
      const color = colorOf(current[props?.sessionId]);
      if (!color) return null;
      return h('span', {
        title: '已标注',
        'data-aiyoucodex-mark': current[props?.sessionId],
        style: {
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '999px',
          background: color,
          flex: 'none',
          boxShadow: `0 0 0 2px var(--dsw-alias-bg-layer-1)`,
        },
      });
    }

    function menuRowStyle() {
      return {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        boxSizing: 'border-box',
        padding: '6px 10px',
        border: 'none',
        background: 'transparent',
        color: 'var(--dsw-alias-label-primary)',
        fontSize: '13px',
        lineHeight: '18px',
        cursor: 'pointer',
        textAlign: 'left',
      };
    }

    function MarkMenuItems(props) {
      const current = useMarks();
      const sessionId = props?.sessionId;
      if (!sessionId) return null;
      const active = current[sessionId];
      const items = LEVELS.map((level) => h('button', {
        key: level.id,
        type: 'button',
        role: 'menuitem',
        style: menuRowStyle(),
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();
          void setMark(sessionId, level.id === active ? '' : level.id);
        },
      },
        h('span', { style: { width: '10px', height: '10px', borderRadius: '999px', background: level.color, flex: 'none' } }),
        h('span', { style: { flex: 1 } }, level.label),
        level.id === active ? h('span', { style: { color: 'var(--dsw-alias-brand-primary)' } }, '✓') : null,
      ));

      if (active) {
        items.push(h('button', {
          key: 'clear',
          type: 'button',
          role: 'menuitem',
          style: menuRowStyle(),
          onClick: (event) => {
            event.preventDefault();
            event.stopPropagation();
            void setMark(sessionId, '');
          },
        }, h('span', { style: { width: '10px' } }), h('span', { style: { flex: 1 } }, '清除标注')));
      }
      return h('div', { 'data-aiyoucodex-markmenu': active ?? 'none', style: { display: 'contents' } }, ...items);
    }

    function MarkActionButton(props) {
      const current = useMarks();
      const sessionId = props?.sessionId;
      if (!sessionId) return null;
      const color = colorOf(current[sessionId]);
      // Cycles through the three levels, then clears — the hover affordance
      // upstream exposes as the row's quick mark button.
      const order = LEVELS.map((level) => level.id);
      const nextOf = (value) => {
        const index = order.indexOf(value);
        return index === -1 ? order[0] : index + 1 < order.length ? order[index + 1] : '';
      };
      return h('button', {
        type: 'button',
        'data-aiyoucodex-markaction': current[sessionId] ?? 'none',
        title: color ? '切换标注' : '标注',
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();
          void setMark(sessionId, nextOf(current[sessionId]));
        },
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '18px',
          height: '18px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          padding: 0,
        },
      }, h('span', {
        style: {
          width: '9px',
          height: '9px',
          borderRadius: '999px',
          background: color ?? 'transparent',
          border: color ? 'none' : '1.5px solid var(--dsw-alias-border-l4)',
        },
      }));
    }

    return { inject: ['slots'], apply(ctx) {
      for (const [slot, id, component] of [[LEADING_SLOT, 'leading', MarkDot], [MENU_SLOT, 'menu', MarkMenuItems], [ACTION_SLOT, 'action', MarkActionButton]]) {
        ctx.effect(() => ctx.slots.inject(slot, () => ctx.slots.register({name:slot, id:'@local/aiyou-enhancer-session-state/'+id, order:20}, component)), 'session-state:'+id);
      }
    }};
  },
});
