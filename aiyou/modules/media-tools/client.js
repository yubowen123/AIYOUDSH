window.__ModuleLoader__.load({
 id:"@local/aiyou-enhancer-media-tools",
 factory(require){
  const React=require('react'),h=React.createElement,TYPE="@local/aiyou-enhancer-media-tools"+'/tab',KIND="aiyoucodex-media-tools",TITLE="创作工具";
  let host;const buttonStyle={border:'1px solid var(--dsw-alias-border-l2)',borderRadius:7,padding:'6px 10px',background:'var(--dsw-alias-bg-layer-1)',color:'var(--dsw-alias-label-primary)',font:'inherit',cursor:'pointer'};
  async function api(suffix,body){const response=await fetch('/aiyoucodex-dsh/canvas'+suffix,{...(body?{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)}:{}),cache:'no-store'}),result=await response.json();if(!response.ok||!result.ok)throw Error(typeof result.error==='string'?result.error:result.error?.message||'无法打开创作工具');return result.value;}
  function Workspace({sessionId='',cwd='',projectId=''}){
   const [state,setState]=React.useState({}),[catalog,setCatalog]=React.useState(null),[busy,setBusy]=React.useState(false),[loading,setLoading]=React.useState(true),panel=React.useRef(crypto.randomUUID().replaceAll('-','_'));
   const scope=React.useRef({sessionId,cwd,projectId,active:true,read:0});
   if(scope.current.sessionId!==sessionId||scope.current.cwd!==cwd||scope.current.projectId!==projectId){scope.current.active=false;scope.current={sessionId,cwd,projectId,active:true,read:0};}
   const valid=owner=>owner.active&&scope.current===owner;
   async function choose(target,owner=scope.current){setBusy(true);setState(previous=>({...previous,error:''}));try{const value=await api('/projects/open',{sessionId,projectId:target});if(valid(owner))setState(value);}catch(error){if(valid(owner))setState(previous=>({...previous,error:error.message}));}finally{if(valid(owner))setBusy(false);}}
   async function refresh(){
    const owner=scope.current,request=++owner.read;setLoading(true);setState(previous=>({...previous,error:''}));
    try{const value=await api('/projects?'+new URLSearchParams({sessionId,cwd}));if(valid(owner)&&owner.read===request){setCatalog(value);setState(previous=>({...previous,error:''}));}return value;}
    catch(error){if(valid(owner)&&owner.read===request)setState(previous=>({...previous,error:error.message}));throw error;}
    finally{if(valid(owner)&&owner.read===request)setLoading(false);}
   }
   React.useEffect(()=>{const owner=scope.current;owner.active=true;setState({});setCatalog(null);setBusy(false);void refresh().then(value=>{if(!valid(owner))return;const target=projectId||value.selectedProjectId;if(target)return choose(target,owner);}).catch(()=>{});return()=>{owner.active=false;};},[sessionId,cwd,projectId]);
   const toolbar=h('div',{style:{display:'flex',gap:8,padding:8,alignItems:'center',flexWrap:'wrap'}},h('label',null,'结果所属项目'),h('select',{'aria-label':'创作工具项目',value:state.projectId||'',disabled:busy||loading||catalog===null,style:{...buttonStyle,flex:1,minWidth:140},onChange:event=>{if(event.target.value)void choose(event.target.value);}},h('option',{value:''},'选择画布项目'),...(catalog?.projects||[]).map(project=>h('option',{key:project.projectId,value:project.projectId},project.title))),h('button',{type:'button',style:buttonStyle,disabled:busy||loading,onClick:()=>void refresh().catch(()=>{})},'刷新项目'));
   const query=new URLSearchParams({sessionId,projectId:state.projectId||'',panelId:panel.current}),src='/aiyoucodex-dsh/canvas/ui/creative-tools.html?'+query;
   return h('div',{'data-dsh-creation-workspace':KIND,style:{display:'flex',flexDirection:'column',height:'100%',minHeight:0}},toolbar,state.error&&h('p',{role:'alert',style:{padding:'0 14px',color:'var(--dsw-alias-state-error-primary)'}},state.error),state.projectId?h('iframe',{key:src,src,title:TITLE,style:{flex:1,width:'100%',minHeight:0,border:0,display:'block'},sandbox:'allow-scripts allow-forms allow-same-origin allow-downloads'}):state.error?null:h('p',{role:'status',style:{padding:20}},loading?'正在读取本地项目…':busy?'正在打开项目…':catalog?.projects.length?'选择项目后使用完整的 22 个创作工具。':'请先在「画布」中新建项目，结果将保存到 DSH 统一素材库。'));
  }
  function Tab({useTabInfo}){const{tab}=useTabInfo();const p=tab.navigation.params||{};return h(Workspace,{sessionId:p.sessionId||'',cwd:p.project||'',projectId:p.projectId||''});}
  function Global(){return h(Workspace,{});}
  return {inject:['slots','sidebarRightTabs','sessions','sidebarRight','layout'],apply(ctx){host=ctx;
   ctx.effect(()=>ctx.sidebarRightTabs.register({id:TYPE,kind:KIND,title:()=>TITLE,keepMounted:KIND==='aiyoucodex-canvas',guide:[{id:'open',order:10,title:()=>TITLE,description:()=>TITLE}]}),KIND+':type');
   ctx.effect(()=>ctx.slots.inject('sidebar.right.pane.tab',()=>ctx.slots.register({name:'sidebar.right.pane.tab',key:TYPE},Tab)),KIND+':tab');
   ctx.effect(()=>ctx.slots.inject('main',()=>ctx.slots.register({name:'main',key:KIND},Global)),KIND+':global');
  }};
 }
});
