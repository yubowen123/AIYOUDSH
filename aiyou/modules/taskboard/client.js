/** Native feature workspace backed by the complete built-in local service source. */
window.__ModuleLoader__.load({
 id:"@local/aiyou-enhancer-taskboard",
 factory(require){
  const React=require('react'),h=React.createElement;const TYPE_ID="@local/aiyou-enhancer-taskboard/tab",KIND="aiyoucodex-taskboard";
  function Workspace({onBack}={}){
   const[ready,setReady]=React.useState(false),[error,setError]=React.useState('');
   const load=React.useCallback(async()=>{try{setError('');const response=await fetch('/aiyoucodex-dsh/taskboard/status',{cache:'no-store'});const value=await response.json();if(!response.ok||!value.ready)throw new Error(value.error||'服务尚未就绪');setReady(true);}catch(e){setError(e.message);}},[]);
   React.useEffect(()=>{void load();},[load]);
   if(error)return h('div',{role:'alert',style:{padding:20,color:'var(--dsw-alias-label-primary)'}},h('p',null,error),h('button',{type:'button',onClick:load},'重试'));
   if(!ready)return h('div',{style:{padding:20,color:'var(--dsw-alias-label-secondary)'}},'正在打开任务大厅…');
   return h('div',{style:{display:'flex',flexDirection:'column',height:'100%',minHeight:0}},
    onBack&&h('div',{style:{display:'flex',padding:'7px 12px',background:'var(--dsw-alias-bg-base)'}},
     h('button',{type:'button',onClick:onBack,style:{font:'inherit',color:'var(--dsw-alias-label-primary)',border:'1px solid var(--dsw-alias-border-l2)',borderRadius:8,padding:'4px 10px',background:'transparent'}},'← 返回对话')),
    h('iframe',{src:'/aiyoucodex-dsh/taskboard/ui/',title:"任务大厅",style:{border:0,width:'100%',flex:1,minHeight:0,display:'block',background:'var(--dsw-alias-bg-base)'},sandbox:'allow-scripts allow-forms allow-same-origin allow-downloads'}));
  }
  return {inject:['slots','sidebarRightTabs','layout'],apply(ctx){
   ctx.effect(()=>ctx.sidebarRightTabs.register({id:TYPE_ID,kind:KIND,title:()=>"任务大厅",guide:[{id:'open',order:40,title:()=>"任务大厅",description:()=>"任务大厅"}]}),'taskboard:type');
   ctx.effect(()=>ctx.slots.inject('sidebar.right.pane.tab',()=>ctx.slots.register({name:'sidebar.right.pane.tab',key:TYPE_ID},Workspace)),'taskboard:workspace');
   ctx.effect(()=>ctx.slots.inject('main',()=>ctx.slots.register({name:'main',key:KIND},()=>h(Workspace,{onBack:()=>ctx.layout.selectPanel(null)}))),'taskboard:hall-main');
  }};
 }
});
