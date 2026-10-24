function Zlo() {
  return Jlo.map(t => ({
    id: `${_fn}:${t.id}`,
    sourceId: _fn,
    title: t.title,
    description: t.description,
    prompt: t.prompt,
    images: t.image ? [t.image] : [],
    video: t.video,
    videoPage: `${kfn}?skill_id=${t.id}`,
    author: t.author || "Flova",
    url: `${kfn}?skill_id=${t.id}`,
    tags: ["Flova Skill", ...t.tags]
  })).filter(tA);
}

function K0r(e = Date.now()) {
  const t = Zlo();
  if (t.length < 150) throw new Error("Flova Skill 无法读取，已保留上次内容");
  return {
    items: t,
    syncedAt: e
  };
}

async function eco(e) {
  return e.throwIfAborted(), K0r();
}

