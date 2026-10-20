/** Native feature workspace backed by the complete built-in local service source. */
window.__ModuleLoader__.load({
 id:"@local/aiyou-enhancer-taskboard",
 factory(require){
  const React=require('react'),h=React.createElement;const TYPE_ID="@local/aiyou-enhancer-taskboard/tab";
  function Workspace(){
   const[ready,setReady]=React.useState(false),[error,setError]=React.useState('');
   const load=React.useCallback(async()=>{try{setError('');const response=await fetch('/aiyoucodex-dsh/taskboard/status',{cache:'no-store'});const value=await response.json();if(!response.ok||!value.ready)throw new Error(value.error||'服务尚未就绪');setReady(true);}catch(e){setError(e.message);}},[]);
   React.useEffect(()=>{void load();},[load]);
   if(error)return h('div',{role:'alert',style:{padding:20,color:'var(--dsw-alias-label-primary)'}},h('p',null,error),h('button',{type:'button',onClick:load},'重试'));
   if(!ready)return h('div',{style:{padding:20,color:'var(--dsw-alias-label-secondary)'}},'正在打开项目管理…');
   return h('iframe',{src:'/aiyoucodex-dsh/taskboard/ui/',title:"项目管理",style:{border:0,width:'100%',height:'100%',display:'block',background:'var(--dsw-alias-bg-base)'},sandbox:'allow-scripts allow-forms allow-same-origin allow-downloads'});
  }
  return {inject:['slots','sidebarRightTabs'],apply(ctx){
   ctx.effect(()=>ctx.sidebarRightTabs.register({id:TYPE_ID,kind:"aiyoucodex-taskboard",title:()=>"项目管理",guide:[{id:'open',order:40,title:()=>"项目管理",description:()=>"项目管理"}]}),'taskboard:type');
   ctx.effect(()=>ctx.slots.inject('sidebar.right.pane.tab',()=>ctx.slots.register({name:'sidebar.right.pane.tab',key:TYPE_ID},Workspace)),'taskboard:workspace');
  }};
 }
});
