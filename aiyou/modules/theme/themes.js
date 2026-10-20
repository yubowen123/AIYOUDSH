import {BACKGROUNDS,publicBackground} from './backgrounds.js';
/**
 * Theme catalogue.
 *
 * L0 PORT — generated directly from AIYOUCODEX's theme packages
 * (`themes/<id>/colors.json` + `design.json` + `manifest.json`, MIT), not
 * re-typed by hand, so the palettes and design tokens are exactly upstream's.
 *
 * Static backgrounds are declared in backgrounds.js. Five reuse the original
 * non-personal theme art. Two use independent neutral fallbacks rather than
 * copying user-provided photos/reference images. The original mecha MP4 can loop silently; per-event behavior is not ported.
 */

export const THEMES = {
  "beach-vacation": {
    "id": "beach-vacation",
    "label": "海边度假·浠浠 ⭐",
    "mode": "light",
    "controls": {"colors":{"primary":"#283e4b","secondary":"#506371","link":"#175e7b","success":"#30653c","danger":"#ad3d46","warning":"#884657","inverse":"#fffdf9"},"alpha":{"overall":1,"chrome":0.9,"sidebar":0.98,"chat":0,"panel":0.98,"card":0.9,"message":0.97,"composer":0.98,"control":0.96,"menu":0.98,"text":1,"border":0.65,"shadow":1,"decoration":0.9,"image":0.9,"composer-area":0},"readability":{"minimum":5.01,"passes":true}},
    "primitives": {
      "sand-100": "#fff3e8",
      "cream-50": "#fff8f2",
      "cream-25": "#fffdf9",
      "ocean-900": "#283e4b",
      "slate-700": "#506371",
      "shell-300": "#d7bdba",
      "rose-600": "#9d5368",
      "rose-800": "#884657",
      "blue-700": "#175e7b",
      "green-700": "#30653c",
      "red-700": "#ad3d46",
      "sunset-100": "#ffe8ec",
      "blue-500": "#3b82f6",
      "green-500": "#269c6e",
      "red-500": "#d94e5b",
      "white": "#ffffff"
    },
    "semantic": {
      "bg": "sand-100",
      "surface": "cream-50",
      "elevated": "cream-25",
      "text": "ocean-900",
      "muted": "slate-700",
      "border": "shell-300",
      "accent": "rose-800",
      "running": "blue-700",
      "complete": "green-700",
      "error": "red-700",
      "user-bg": "sunset-100",
      "brand": "rose-600",
      "running-outline": "blue-500",
      "complete-outline": "green-500",
      "error-outline": "red-500"
    },
    "radius": {
      "control": 18,
      "card": 16,
      "message": 16,
      "dialog": 20,
      "composer": 24,
      "shell": 16
    },
    "spacing": {
      "unit": 4,
      "stack": 10,
      "message-x": 14,
      "message-y": 12
    },
    "borders": {
      "width": 1,
      "focusWidth": 2
    },
    "language": "海边度假：粉色晚霞、碧蓝海浪、奶油沙滩和七位度假角色"
  },
  "crayon-shinchan-four-scenes-xixi": {
    "id": "crayon-shinchan-four-scenes-xixi",
    "label": "小新四图轮播·浠浠",
    "mode": "light",
    "controls": {"colors":{"primary":"#413730","secondary":"#665b51","link":"#315e77","success":"#426749","danger":"#9e3e3c","warning":"#9a5743","inverse":"#fffaf1"},"alpha":{"overall":1,"chrome":0.78,"sidebar":0.68,"chat":0,"panel":0.86,"card":0.92,"message":0.9,"composer":0.9,"control":0.88,"menu":0.98,"text":1,"border":0.65,"shadow":1,"decoration":0.85,"image":0.46,"composer-area":0},"readability":{"minimum":4.99,"passes":true}},
    "primitives": {
      "cream-50": "#f7f1e7",
      "cream-75": "#efe6d7",
      "paper-25": "#fffaf1",
      "brown-800": "#413730",
      "brown-650": "#665b51",
      "sand-200": "#d8cbb9",
      "clay-700": "#9a5743",
      "clay-500": "#bc775d",
      "blue-700": "#315e77",
      "green-700": "#426749",
      "brick-700": "#9e3e3c",
      "blush-100": "#ead5c2",
      "blue-500": "#4b819d",
      "green-500": "#628264",
      "brick-500": "#bd5950",
      "white": "#ffffff"
    },
    "semantic": {
      "bg": "cream-50",
      "surface": "cream-75",
      "elevated": "paper-25",
      "text": "brown-800",
      "muted": "brown-650",
      "border": "sand-200",
      "accent": "clay-700",
      "running": "blue-700",
      "complete": "green-700",
      "error": "brick-700",
      "user-bg": "blush-100",
      "brand": "clay-500",
      "running-outline": "blue-500",
      "complete-outline": "green-500",
      "error-outline": "brick-500"
    },
    "radius": {
      "control": 12,
      "card": 14,
      "message": 16,
      "dialog": 18,
      "composer": 22,
      "shell": 14
    },
    "spacing": {
      "unit": 4,
      "stack": 10,
      "message-x": 14,
      "message-y": 12
    },
    "borders": {
      "width": 1,
      "focusWidth": 2
    },
    "language": "野原家相册：奶油纸色、暖陶土红、天空蓝和叶绿，四张用户照片柔和轮播"
  },
  "island-affection": {
    "id": "island-affection",
    "label": "海岛心动陪伴",
    "mode": "light",
    "controls": {"colors":{"primary":"#183047","secondary":"#3e5266","link":"#215d82","success":"#345e54","danger":"#a03d47","warning":"#8c5030","inverse":"#fffaf6"},"alpha":{"overall":1,"chrome":0.86,"sidebar":0.8,"chat":0,"panel":0.9,"card":0.94,"message":0.94,"composer":0.94,"control":0.9,"menu":0.98,"text":1,"border":0.65,"shadow":1,"decoration":0.15,"image":0.48,"composer-area":0},"readability":{"minimum":4.99,"passes":true}},
    "primitives": {
      "sky-50": "#edf5fb",
      "sky-100": "#e0edf5",
      "ivory-25": "#fffaf6",
      "ink-900": "#183047",
      "ink-650": "#3e5266",
      "mist-300": "#aabccc",
      "rose-700": "#934267",
      "rose-500": "#a44f78",
      "sea-700": "#215d82",
      "leaf-700": "#345e54",
      "error-700": "#a03d47",
      "sand-700": "#8c5030",
      "user-100": "#e4effb",
      "sea-500": "#4387aa",
      "leaf-500": "#4f8b7a",
      "error-500": "#bc5b65",
      "white": "#ffffff"
    },
    "semantic": {
      "bg": "sky-50",
      "surface": "sky-100",
      "elevated": "ivory-25",
      "text": "ink-900",
      "muted": "ink-650",
      "border": "mist-300",
      "accent": "rose-700",
      "running": "sea-700",
      "complete": "leaf-700",
      "error": "error-700",
      "user-bg": "user-100",
      "brand": "rose-500",
      "running-outline": "sea-500",
      "complete-outline": "leaf-500",
      "error-outline": "error-500"
    },
    "radius": {
      "control": 18,
      "card": 16,
      "message": 16,
      "dialog": 20,
      "composer": 24,
      "shell": 16
    },
    "spacing": {
      "unit": 4,
      "stack": 10,
      "message-x": 14,
      "message-y": 12
    },
    "borders": {
      "width": 1,
      "focusWidth": 2
    },
    "language": "海盐蓝、象牙白与花粉色，固定机位第一视角的海岛陪伴"
  },
  "mecha-control": {
    "id": "mecha-control",
    "label": "机甲控制舱",
    "mode": "dark",
    "controls": {"colors":{"primary":"#edf4fa","secondary":"#a9becf","link":"#49adff","success":"#52dba0","danger":"#ff716d","warning":"#ffa932","inverse":"#0c151e"},"alpha":{"overall":1,"chrome":1,"sidebar":0.72,"chat":0,"panel":0.8,"card":0.82,"message":0.82,"composer":0.86,"control":0.86,"menu":0.96,"text":1,"border":0.65,"shadow":1,"decoration":0.9,"image":0.46,"composer-area":0},"readability":{"minimum":5.34,"passes":true}},
    "primitives": {
      "graphite-950": "#0c151e",
      "graphite-900": "#131f2b",
      "graphite-800": "#1b2a38",
      "steel-500": "#58748b",
      "white-100": "#edf4fa",
      "gray-400": "#a9becf",
      "blue-400": "#49adff",
      "green-400": "#52dba0",
      "red-400": "#ff716d",
      "amber-400": "#ffa932",
      "teal-800": "#10635b"
    },
    "semantic": {
      "bg": "graphite-950",
      "surface": "graphite-900",
      "elevated": "graphite-800",
      "text": "white-100",
      "muted": "gray-400",
      "border": "steel-500",
      "accent": "amber-400",
      "running": "blue-400",
      "complete": "green-400",
      "error": "red-400",
      "user-bg": "teal-800"
    },
    "radius": {
      "control": 9,
      "card": 10,
      "message": 16,
      "dialog": 16,
      "composer": 22,
      "shell": 13
    },
    "spacing": {
      "unit": 2,
      "stack": 10,
      "message-x": 14,
      "message-y": 12
    },
    "borders": {
      "width": 1,
      "focusWidth": 2
    },
    "language": "金属控制舱：深石墨、钢蓝倒角、克制琥珀强调、透明圆角消息"
  },
  "pink-candy": {
    "id": "pink-candy",
    "label": "粉嫩软糖",
    "mode": "light",
    "controls": {"colors":{"primary":"#493b45","secondary":"#595959","link":"#235caa","success":"#13774f","danger":"#b52c4c","warning":"#a74370","inverse":"#fffdfe"},"alpha":{"overall":1,"chrome":0.9,"sidebar":0.86,"chat":0,"panel":0.86,"card":0.9,"message":0.82,"composer":0.9,"control":0.86,"menu":0.98,"text":1,"border":0.65,"shadow":1,"decoration":0.9,"image":0.78,"composer-area":0},"readability":{"minimum":4.99,"passes":true}},
    "primitives": {
      "rose-50": "#fff3f7",
      "rose-75": "#fff7fa",
      "milk-25": "#fffdfe",
      "plum-800": "#493b45",
      "gray-600": "#595959",
      "rose-200": "#e6bccd",
      "rose-500": "#c25786",
      "rose-650": "#a74370",
      "blue-700": "#235caa",
      "green-700": "#13774f",
      "red-700": "#b52c4c",
      "blush-100": "#ffdeea",
      "blue-500": "#3b82f6",
      "green-500": "#269c6e",
      "red-500": "#d94e5b",
      "white": "#ffffff"
    },
    "semantic": {
      "bg": "rose-50",
      "surface": "rose-75",
      "elevated": "milk-25",
      "text": "plum-800",
      "muted": "gray-600",
      "border": "rose-200",
      "accent": "rose-650",
      "running": "blue-700",
      "complete": "green-700",
      "error": "red-700",
      "user-bg": "blush-100",
      "brand": "rose-500",
      "running-outline": "blue-500",
      "complete-outline": "green-500",
      "error-outline": "red-500"
    },
    "radius": {
      "control": 18,
      "card": 16,
      "message": 16,
      "dialog": 20,
      "composer": 24,
      "shell": 16
    },
    "spacing": {
      "unit": 4,
      "stack": 10,
      "message-x": 14,
      "message-y": 12
    },
    "borders": {
      "width": 1,
      "focusWidth": 2
    },
    "language": "粉嫩软糖：连续云海、上部软糖兔、奶白曲面、淡玫粉细边、低密度柔光"
  },
  "spongebob-beach-motion": {
    "id": "spongebob-beach-motion",
    "label": "海底假日·海绵宝宝",
    "mode": "light",
    "controls": {"colors":{"primary":"#103a49","secondary":"#365a65","link":"#075f83","success":"#126d5b","danger":"#a93643","warning":"#006779","inverse":"#f8feff"},"alpha":{"overall":0.88,"chrome":0.86,"sidebar":0.84,"chat":0.08,"panel":0.9,"card":0.92,"message":0.86,"composer":0.94,"control":0.86,"menu":0.98,"text":1,"border":0.65,"shadow":1,"decoration":0.9,"image":0.46,"composer-area":0.28},"readability":{"minimum":4.99,"passes":true}},
    "primitives": {
      "rose-50": "#e5f7fa",
      "rose-75": "#eefbfc",
      "milk-25": "#f8feff",
      "plum-800": "#103a49",
      "gray-600": "#365a65",
      "rose-200": "#a8d9df",
      "rose-500": "#078da0",
      "rose-650": "#006779",
      "blue-700": "#075f83",
      "green-700": "#126d5b",
      "red-700": "#a93643",
      "blush-100": "#cdeef1",
      "blue-500": "#0088ad",
      "green-500": "#168d70",
      "red-500": "#d34f58",
      "white": "#ffffff"
    },
    "semantic": {
      "bg": "rose-50",
      "surface": "rose-75",
      "elevated": "milk-25",
      "text": "plum-800",
      "muted": "gray-600",
      "border": "rose-200",
      "accent": "rose-650",
      "running": "blue-700",
      "complete": "green-700",
      "error": "red-700",
      "user-bg": "blush-100",
      "brand": "rose-500",
      "running-outline": "blue-500",
      "complete-outline": "green-500",
      "error-outline": "red-500"
    },
    "radius": {
      "control": 18,
      "card": 16,
      "message": 16,
      "dialog": 20,
      "composer": 24,
      "shell": 16
    },
    "spacing": {
      "unit": 4,
      "stack": 10,
      "message-x": 14,
      "message-y": 12
    },
    "borders": {
      "width": 1,
      "focusWidth": 2
    },
    "language": "深海碧蓝与浅海泡沫色，微光涟漪，简洁清爽"
  },
  "yoyo-tilt-collection": {
    "id": "yoyo-tilt-collection",
    "label": "YOYO萌趣歪头·浠浠",
    "mode": "light",
    "controls": {"colors":{"primary":"#40382f","secondary":"#63514d","link":"#176b91","success":"#27623a","danger":"#a4333f","warning":"#ad3d51","inverse":"#fffdf9"},"alpha":{"overall":1,"chrome":0.9,"sidebar":0.86,"chat":0,"panel":0.86,"card":0.9,"message":0.9,"composer":0.9,"control":0.86,"menu":0.98,"text":1,"border":0.65,"shadow":1,"decoration":0.9,"image":0.82,"composer-area":0},"readability":{"minimum":5.65,"passes":true}},
    "primitives": {
      "lemon-50": "#fff4ee",
      "lemon-75": "#ffe9e1",
      "cream-25": "#fffdf9",
      "cocoa-800": "#40382f",
      "cocoa-650": "#63514d",
      "lemon-250": "#f0c8bb",
      "amber-700": "#ad3d51",
      "ocean-700": "#176b91",
      "green-700": "#27623a",
      "red-700": "#a4333f",
      "amber-650": "#ad3d51",
      "lemon-200": "#ffd8cc",
      "blue-500": "#287eb0",
      "green-500": "#268353",
      "red-500": "#c54853",
      "white": "#ffffff"
    },
    "semantic": {
      "bg": "lemon-50",
      "surface": "lemon-75",
      "elevated": "cream-25",
      "text": "cocoa-800",
      "muted": "cocoa-650",
      "border": "lemon-250",
      "accent": "amber-700",
      "running": "ocean-700",
      "complete": "green-700",
      "error": "red-700",
      "user-bg": "lemon-200",
      "brand": "amber-650",
      "running-outline": "blue-500",
      "complete-outline": "green-500",
      "error-outline": "red-500"
    },
    "radius": {
      "control": 18,
      "card": 16,
      "message": 16,
      "dialog": 20,
      "composer": 24,
      "shell": 16
    },
    "spacing": {
      "unit": 4,
      "stack": 10,
      "message-x": 14,
      "message-y": 12
    },
    "borders": {
      "width": 1,
      "focusWidth": 2
    },
    "language": "YOYO萌趣歪头：五款形象在珊瑚、浅蓝与奶油白转台上错速旋转"
  }
};

for (const theme of Object.values(THEMES)) theme.background=publicBackground(BACKGROUNDS[theme.id],theme.id);

/** New profiles follow the supplied Codex reference; saved choices remain authoritative. */
export const SYSTEM_THEME_ID = 'system';
export const DEFAULT_THEME_ID = 'mecha-control';

export function themeById(id) {
  return THEMES[id] ?? THEMES[DEFAULT_THEME_ID] ?? Object.values(THEMES)[0] ?? null;
}
