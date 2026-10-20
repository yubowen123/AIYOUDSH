/** Declared static media plus one original silent mecha video loop. */
export const BACKGROUNDS = Object.freeze(Object.fromEntries([
  ['mecha-control','png',0.46,'AIYOUcodex 原机甲静态背景'],
  ['pink-candy','png',0.78,'AIYOUcodex 原软糖静态背景'],
  ['island-affection','png',0.48,'AIYOUcodex 原海岛静态背景'],
  ['beach-vacation','png',0.90,'AIYOUcodex 原海边静态背景'],
  ['yoyo-tilt-collection','png',0.82,'AIYOUcodex 原 YOYO 静态背景'],
  ['crayon-shinchan-four-scenes-xixi','svg',0.46,'中性纸纹回退；未包含用户相册'],
  ['spongebob-beach-motion','svg',0.46,'中性海浪回退；未包含用户参考图片'],
].map(([id,extension,opacity,note]) => [id,{file:`${id}.${extension}`,type:'image',fit:'cover',x:75,y:50,opacity,note,animated:false,url:`/aiyoucodex-dsh/theme/media?id=${id}`}])));

export function publicBackground(value,id) {
  if (!value) return null;
  return { type:'image',url:`/aiyoucodex-dsh/theme/media?id=${encodeURIComponent(id)}`,fit:value.fit === 'contain' ? 'contain' : 'cover',
    x:Number.isFinite(value.x)?Math.max(0,Math.min(100,value.x)):75,y:Number.isFinite(value.y)?Math.max(0,Math.min(100,value.y)):50,
    opacity:Number.isFinite(value.opacity)?Math.max(0,Math.min(1,value.opacity)):0.46,note:String(value.note||'本地静态背景').slice(0,120),animated:id==='mecha-control',
    ...(id==='mecha-control'?{videoUrl:'/aiyoucodex-dsh/theme/media?id=mecha-control&slot=loop',motionLabel:'原机甲视频循环 · 非会话事件动画'}:{}) };
}
