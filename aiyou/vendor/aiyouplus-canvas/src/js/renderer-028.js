function nco() {
  return tco.map(t => ({
    id: `${Sfn}:${t.id}`,
    sourceId: Sfn,
    title: t.title,
    description: t.description,
    prompt: t.prompt,
    images: t.image ? [t.image] : [],
    video: t.video,
    videoPage: `${Ifn}?skill_id=${t.id}`,
    author: t.author || "即梦",
    url: `${Ifn}?skill_id=${t.id}`,
    tags: ["Jimeng", ...t.tags]
  })).filter(tA);
}

function Q0r(e = Date.now()) {
  const t = nco();
  if (t.length < 250) throw new Error("Jimeng 技能无法读取，已保留上次内容");
  return {
    items: t,
    syncedAt: e
  };
}

async function rco(e) {
  return e.throwIfAborted(), Q0r();
}

