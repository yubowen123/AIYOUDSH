function ico() {
  return aco.map(t => ({
    id: `${Efn}:${t.id}`,
    sourceId: Efn,
    title: t.title,
    description: t.description,
    prompt: t.prompt,
    images: t.images,
    video: t.video,
    videoPage: `${Tfn}/${t.id}`,
    author: t.author || "Lovart",
    url: `${Tfn}/${t.id}`,
    tags: ["Lovart", ...t.tags]
  })).filter(tA);
}

function Y0r(e = Date.now()) {
  const t = ico();
  if (t.length < 500) throw new Error("Lovart 技能无法读取，已保留上次内容");
  return {
    items: t,
    syncedAt: e
  };
}

async function oco(e) {
  return e.throwIfAborted(), Y0r();
}

