/**
 * Client half — AIYOUcodex Skills panel as a NATIVE DSH right-sidebar panel.
 *
 * Data comes from the host half over the suite's HTTP channel (a third-party
 * plugin cannot import @deepseek-ai/*, so Typert Remote is unavailable).
 *
 * Feature parity with upstream's skill management:
 *   - six built-in categories, automatic local classification (zero tokens);
 *   - manual re-classification, which always wins over the automatic result;
 *   - user-created custom categories matched by literal keyword substrings
 *     (never regular expressions), with rename and delete;
 *   - a "常用" favourites list.
 *
 * Contract compliance: no primitive imports, no host DOM reads, no DOM outside
 * this component, colors only from --dsw-* tokens, every registration owned by
 * one ctx.effect.
 */
window.__ModuleLoader__.load({
  id: '@local/aiyou-enhancer-skills',

  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const TYPE_ID = '@local/aiyou-enhancer-skills/tab';
    const KIND = 'aiyoucodex-skills';

    const API_ORIGIN = '';
    const API = `${API_ORIGIN}/aiyoucodex-dsh/skills`;

    const t = {
      title: 'Skills 分组',
      loading: '正在读取 Skill 目录…',
      retry: '重试',
      refresh: '重新扫描',
      search: '搜索名称或描述',
      empty: '该分类下没有 Skill',
      back: '返回列表',
      auto: '自动分类',
      manual: '手动分类',
      count: '个 Skill',
      moveTo: '移到分类',
      reset: '恢复自动分类',
      instructions: '说明正文',
      whenToUse: '适用场景',
      path: '路径',
      favorite: '常用',
      addFavorite: '加入常用',
      removeFavorite: '移出常用',
      newGroup: '新建分类',
      groupName: '分类名称',
      confirm: '创建',
      cancel: '取消',
      rename: '改名',
      remove: '删除',
      keywords: '关键词（逗号分隔，按字面匹配）',
      reserved: '该名称已被占用',
    };

    const S = {
      root: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, fontSize: '13px', color: 'var(--dsw-alias-label-primary)' },
      header: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 12px 8px' },
      h1: { fontSize: '14px', fontWeight: 600, margin: 0, flex: 1 },
      chipRow: { display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '0 12px 8px' },
      searchRow: { display: 'flex', gap: '6px', padding: '0 12px 8px' },
      input: { width: '100%', boxSizing: 'border-box', padding: '6px 9px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', color: 'var(--dsw-alias-label-primary)', fontSize: '13px', lineHeight: '18px', outline: 'none' },
      list: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' },
      card: { padding: '10px 12px', borderRadius: 'var(--dsw-radius-lg)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' },
      cardHead: { display: 'flex', gap: '6px', alignItems: 'baseline' },
      cardTitle: { fontSize: '13px', fontWeight: 600, lineHeight: '18px', color: 'var(--dsw-alias-label-primary)', wordBreak: 'break-word', flex: 1 },
      cardDesc: { fontSize: '12px', lineHeight: '17px', color: 'var(--dsw-alias-label-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
      meta: { fontSize: '11px', lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)' },
      btn: { padding: '4px 10px', borderRadius: 'var(--dsw-radius-md)', border: '1px solid var(--dsw-alias-border-l4)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer' },
      star: { border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', lineHeight: '18px', padding: '0 2px', color: 'var(--dsw-alias-label-tertiary)' },
      starOn: { border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', lineHeight: '18px', padding: '0 2px', color: 'var(--dsw-alias-brand-primary)' },
      detailBody: { fontSize: '12px', lineHeight: '18px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'var(--dsw-alias-label-secondary)', maxHeight: '40vh', overflowY: 'auto', border: '1px solid var(--dsw-alias-border-l2)', borderRadius: 'var(--dsw-radius-md)', padding: '10px', background: 'var(--dsw-alias-bg-base)' },
      createBox: { display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px 12px', margin: '0 12px 8px', borderRadius: 'var(--dsw-radius-lg)', border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-1)' },
    };

    function chipStyle(active) {
      return {
        padding: '3px 9px', borderRadius: 'var(--dsw-radius-md)', fontSize: '12px', lineHeight: '18px', cursor: 'pointer',
        border: `1px solid ${active ? 'var(--dsw-alias-brand-primary)' : 'var(--dsw-alias-border-l2)'}`,
        background: active ? 'var(--dsw-alias-bg-layer-2)' : 'transparent',
        color: active ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)',
      };
    }

    async function request(url, options) {
      const response = await fetch(url, { cache: 'no-store', ...options });
      const value = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(value?.error || `HTTP ${response.status}`);
      return value;
    }

    /** Mirrors the host's skillMatchesGroup: keywords are literal substrings. */
    function matchesGroup(skill, group, favorites) {
      if (!group) return true;
      if (group.id === 'all') return true;
      if (group.id === 'common') return favorites.includes(skill.id);
      if (group.builtin) return skill.categoryId === group.id;
      const text = `${skill.name || ''} ${skill.title || ''} ${skill.description || ''}`.toLocaleLowerCase();
      return (group.keywords || []).some((keyword) => text.includes(String(keyword).toLocaleLowerCase()));
    }

    function SkillsPanel() {
      const [snapshot, setSnapshot] = React.useState(null);
      const [error, setError] = React.useState(null);
      const [activeGroup, setActiveGroup] = React.useState('all');
      const [query, setQuery] = React.useState('');
      const [detail, setDetail] = React.useState(null);
      const [busy, setBusy] = React.useState(false);
      const [creating, setCreating] = React.useState(false);
      const [newLabel, setNewLabel] = React.useState('');
      const [newKeywords, setNewKeywords] = React.useState('');

      const load = React.useCallback(async () => {
        setBusy(true);
        setError(null);
        try {
          setSnapshot(await request(`${API}?refresh=1`));
        } catch (failure) {
          setError(String(failure?.message ?? failure));
        } finally {
          setBusy(false);
        }
      }, []);

      React.useEffect(() => {
        void load();
      }, [load]);

      const openDetail = React.useCallback(async (id) => {
        setError(null);
        try {
          setDetail(await request(`${API}/detail?id=${encodeURIComponent(id)}`));
        } catch (failure) {
          setError(String(failure?.message ?? failure));
        }
      }, []);

      const mutate = React.useCallback(async (path, body, after) => {
        try {
          setBusy(true);
          setError(null);
          await request(`${API}/${path}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
          });
          await load();
          if (after) await after();
          return true;
        } catch (failure) {
          setError(String(failure?.message ?? failure));
          return false;
        } finally {
          setBusy(false);
        }
      }, [load]);

      const catalog = snapshot?.catalog ?? [];
      const groups = snapshot?.groups ?? [];
      const favorites = snapshot?.favorites ?? [];

      const counts = React.useMemo(() => {
        const result = {};
        for (const group of groups) {
          result[group.id] = catalog.filter((skill) => matchesGroup(skill, group, favorites)).length;
        }
        return result;
      }, [catalog, groups, favorites]);

      const visible = React.useMemo(() => {
        const needle = query.trim().toLowerCase();
        const group = groups.find((entry) => entry.id === activeGroup);
        return catalog.filter((skill) => {
          if (!matchesGroup(skill, group, favorites)) return false;
          if (!needle) return true;
          return `${skill.name} ${skill.description}`.toLowerCase().includes(needle);
        });
      }, [catalog, groups, activeGroup, query, favorites]);

      const customGroups = groups.filter((group) => !group.builtin);

      // ---------- detail view ----------
      if (detail) {
        const primary = groups.filter((group) => group.builtin && group.id !== 'all' && group.id !== 'common');
        const isFavorite = favorites.includes(detail.id);
        return h('div', { style: S.root },
          h('div', { style: S.header },
            h('button', { type: 'button', style: S.btn, onClick: () => setDetail(null) }, t.back),
            h('h1', { style: S.h1 }, detail.title || detail.name),
            h('button', {
              type: 'button',
              style: isFavorite ? S.starOn : S.star,
              title: isFavorite ? t.removeFavorite : t.addFavorite,
              disabled: busy,
              onClick: () => void mutate('favorite', { skillId: detail.id, favorite: !isFavorite }, () => openDetail(detail.id)),
            }, isFavorite ? '★' : '☆'),
          ),
          h('div', { style: S.list },
            error ? h('div', { role: 'alert', style: { ...S.card, borderColor: 'var(--dsw-alias-border-l4)' } },
              h('div', { style: S.cardTitle }, '操作失败'),
              h('div', { style: S.cardDesc }, error),
            ) : null,
            h('div', { style: S.meta }, `${detail.classificationSource === 'manual' ? t.manual : t.auto} · ${detail.source}`),
            detail.whenToUse ? h('div', { style: S.cardDesc }, `${t.whenToUse}: ${detail.whenToUse}`) : null,
            h('div', { style: S.cardDesc }, detail.description),
            h('div', { style: S.meta }, `${t.path}: ${detail.path}`),
            h('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginTop: '4px' } },
              h('span', { style: S.meta }, t.moveTo),
              ...primary.map((group) => h('button', {
                key: group.id,
                type: 'button',
                style: chipStyle(group.id === detail.categoryId),
                disabled: busy,
                onClick: () => void mutate('assign', { skillId: detail.id, categoryId: group.id }, () => openDetail(detail.id)),
              }, group.label)),
              detail.classificationSource === 'manual'
                ? h('button', {
                    type: 'button',
                    style: S.btn,
                    disabled: busy,
                    onClick: () => void mutate('assign', { skillId: detail.id, categoryId: 'auto' }, () => openDetail(detail.id)),
                  }, t.reset)
                : null,
            ),
            detail.instructions
              ? h('div', null,
                  h('div', { style: { ...S.meta, margin: '8px 0 4px' } }, t.instructions),
                  h('div', { style: S.detailBody }, detail.instructions),
                )
              : null,
          ),
        );
      }

      // ---------- list view ----------
      return h('div', { style: S.root },
        h('div', { style: S.header },
          h('h1', { style: S.h1 }, t.title),
          h('span', { style: S.meta }, `${snapshot?.stats?.total ?? 0} ${t.count}`),
          h('button', { type: 'button', style: S.btn, disabled: busy, onClick: () => void load() }, t.refresh),
        ),

        h('div', { style: S.chipRow },
          ...groups.map((group) => h('button', {
            key: group.id,
            type: 'button',
            style: chipStyle(group.id === activeGroup),
            onClick: () => {
              setActiveGroup(group.id);
              if (!group.builtin) setQuery('');
            },
            onContextMenu: (event) => {
              if (group.builtin) return;
              event.preventDefault();
              const next = window.prompt(`${group.label} — 新名称`, group.label);
              if (next && next.trim() && next.trim() !== group.label) {
                void mutate('groups', { action: 'rename', id: group.id, label: next.trim() });
              } else if (next !== null && (!next.trim() || next.trim() === group.label)) {
                /* unchanged */
              }
            },
          }, `${group.label} ${counts[group.id] ?? 0}`)),
          h('button', { type: 'button', style: chipStyle(false), onClick: () => setCreating((value) => !value) }, `+ ${t.newGroup}`),
        ),

        creating
          ? h('div', { style: S.createBox },
              h('input', {
                style: S.input,
                placeholder: t.groupName,
                value: newLabel,
                autoFocus: true,
                onChange: (event) => setNewLabel(event.target.value),
              }),
              h('input', {
                style: S.input,
                placeholder: t.keywords,
                value: newKeywords,
                onChange: (event) => setNewKeywords(event.target.value),
              }),
              h('div', { style: { display: 'flex', gap: '6px' } },
                h('button', {
                  type: 'button',
                  style: S.btn,
                  disabled: busy || !newLabel.trim(),
                  onClick: () => {
                    const keywords = newKeywords.split(/[,，\s]+/u).map((item) => item.trim()).filter(Boolean);
                    void mutate('groups', { action: 'create', label: newLabel.trim(), keywords }).then((ok) => {
                      if (!ok) return;
                      setNewLabel('');
                      setNewKeywords('');
                      setCreating(false);
                    });
                  },
                }, t.confirm),
                h('button', { type: 'button', style: S.btn, onClick: () => setCreating(false) }, t.cancel),
              ),
            )
          : null,

        h('div', { style: S.searchRow },
          h('input', {
            style: S.input,
            placeholder: t.search,
            value: query,
            onChange: (event) => setQuery(event.target.value),
          }),
        ),

        h('div', { style: S.list },
          error
            ? h('div', { role: 'alert', style: { ...S.card, borderColor: 'var(--dsw-alias-border-l4)' } },
                h('div', { style: S.cardTitle }, '操作失败'),
                h('div', { style: S.cardDesc }, error),
                h('button', { type: 'button', style: S.btn, onClick: () => void load() }, t.retry),
              )
            : null,
          snapshot === null && !error ? h('div', { style: S.meta }, t.loading) : null,
          snapshot !== null && visible.length === 0 && !error ? h('div', { style: S.meta }, t.empty) : null,

          ...visible.map((skill) => {
            const isFavorite = favorites.includes(skill.id);
            return h('div', {
              key: skill.id,
              style: S.card,
              role: 'button',
              tabIndex: 0,
              onClick: () => void openDetail(skill.id),
              onKeyDown: (event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  void openDetail(skill.id);
                }
              },
            },
              h('div', { style: S.cardHead },
                h('div', { style: S.cardTitle }, skill.title || skill.name),
                h('button', {
                  type: 'button',
                  style: isFavorite ? S.starOn : S.star,
                  title: isFavorite ? t.removeFavorite : t.addFavorite,
                  disabled: busy,
                  onClick: (event) => {
                    event.stopPropagation();
                    void mutate('favorite', { skillId: skill.id, favorite: !isFavorite });
                  },
                }, isFavorite ? '★' : '☆'),
              ),
              h('div', { style: S.cardDesc }, skill.description),
              h('div', { style: S.meta },
                `${skill.categoryId} · ${skill.classificationSource === 'manual' ? t.manual : t.auto} · ${skill.source}`),
            );
          }),

          customGroups.length
            ? h('div', { style: { ...S.meta, marginTop: '8px' } },
                `自定义分类：${customGroups.map((group) => group.label).join(' / ')}（右键分类名可改名；在详情页可删除）`)
            : null,
        ),
      );
    }

    return {
      inject: ['slots', 'sidebarRightTabs', 'sidebarRight'],
      apply(ctx) {
        ctx.effect(() => ctx.sidebarRightTabs.register({
          id: TYPE_ID, kind: KIND, title: () => "Skills",
          guide: [{ id: 'open', order: 60, title: () => "Skills", description: () => "Skills" }],
        }), 'skills:type');
        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () =>
          ctx.slots.register({ name: 'sidebar.right.pane.tab', key: TYPE_ID },
            (props) => h(SkillsPanel, { ...props, __sidebarRight: ctx.sidebarRight }))), 'skills:panel');
      },
    };
  },
});
