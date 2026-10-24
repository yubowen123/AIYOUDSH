import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const files=Array.from({length:41},(_,i)=>`renderer-${String(i+1).padStart(3,'0')}.js`);
let source=(await Promise.all(files.map(f=>fs.readFile(path.join(base,'src/js',f),'utf8')))).join('\n');
function replace(a,b){if(!source.includes(a))throw Error('Recovered integration anchor missing: '+a.slice(0,90));source=source.replaceAll(a,b);}
replace('cWt.createRoot(n).render(c.jsx(PJt, {\n      children: c.jsx(TJt, {})\n    }))','(window.__DSH_CANVAS_REACT_ROOT__=cWt.createRoot(n)).render(c.jsx($Oi, {}))');
replace('cWt.createRoot(a).render(c.jsx(PJt, {\n          children: c.jsx(TJt, {})\n        }))','(window.__DSH_CANVAS_REACT_ROOT__=cWt.createRoot(a)).render(c.jsx($Oi, {}))');
replace('  Rmi({\n    document: je,','  window.__DSH_CANVAS_BINDINGS__ = {execute: II, snapshot: qb, invalidate: M9, assetStore: ni, localCache: Ur};\n  Rmi({\n    document: je,');
replace('  g.useEffect(() => {\n    Ghe(s1);','  window.__DSH_CANVAS_BINDINGS__.openProject = u5r;\n  g.useEffect(() => {\n    Ghe(s1);');
replace('    const m = fS(t);\n    m && (u.textNodeChatModel = m);','    const m = window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.getDefaultModel("chat");\n    m && (u.textNodeChatModel = m);');
replace('u.chatModel || (u.chatModel = "gemini-3-pro")','u.chatModel || (u.chatModel = window.__AIYOUPLUS_CANVAS_MODEL_ADAPTER__?.getDefaultModel("chat"))');
replace('  if (nativeChatAdapter?.isNativeChat(e.modelId)) return nativeChatAdapter.chatResponse({...e, max_tokens:e.maxTokens});','  const hostChatModel = nativeChatAdapter?.getDefaultModel("chat");\n  if (hostChatModel) return nativeChatAdapter.chatResponse({...e, modelId:hostChatModel, max_tokens:e.maxTokens});\n  throw new Error("DSH 当前文字模型尚未就绪");');
replace('      handleLoadProject: y5r,\n      handleImportWorkflow: b5r','      handleSaveProject: dshExportProject,\n      handleLoadProject: y5r,\n      handleImportWorkflow: b5r');
replace('    } = W2i(CVt);\n  hfi({','    } = W2i(CVt);\n  window.__DSH_CANVAS_BINDINGS__.importProject = y5r;\n  window.__DSH_CANVAS_BINDINGS__.exportProject = dshExportProject;\n  hfi({');
replace('          className: "relative z-10",\n          children: x("下载")','          className: "relative z-10",\n          children: x("下载所选素材")');
// Resolve canvas-owned root-relative images inside its isolated route.
source=source.replace(/(["'`])\/(cinema|luts|models|desktop-pets|aiyouplus-brand)\//g,'$1/aiyoucodex-dsh/canvas/ui/$2/');
await fs.mkdir(path.join(base,'public/assets'),{recursive:true});
await fs.writeFile(path.join(base,'public/assets/canvas.js'),source);
await fs.copyFile(path.join(base,'src/css/styles.css'),path.join(base,'public/assets/canvas.css'));
await fs.writeFile(path.join(base,'build.json'),JSON.stringify({sourceParts:files,sharedScope:true,bytes:Buffer.byteLength(source),sha256:createHash('sha256').update(source).digest('hex'),patches:['Canvas-only root $Oi/fdi/GOi; no TJt app shell','Expose actual WLi executor and eOi snapshot in original GOi lifecycle','Namespace embedded static URLs','Expose original W2i project file callbacks','Relabel selected-media downloads; desktop shell hidden by embedded CSS']},null,2)+'\n');
