window.__ModuleLoader__.load({
 id:"@local/aiyou-enhancer-media-tools",
 factory(require){
  const React=require('react'),h=React.createElement,TYPE="@local/aiyou-enhancer-media-tools"+'/tab',KIND="aiyoucodex-media-tools",TITLE="创作工具";
  let host;const buttonStyle={border:'1px solid var(--dsw-alias-border-l2)',borderRadius:7,padding:'6px 10px',background:'var(--dsw-alias-bg-layer-1)',color:'var(--dsw-alias-label-primary)',font:'inherit',cursor:'pointer'};
  function Workspace({sessionId='',cwd='',module='media'}){
   const [state,setState]=React.useState({}),[selected,setSelected]=React.useState(module),panel=React.useRef(crypto.randomUUID().replaceAll('-','_'));
   React.useEffect(()=>{let active=true;setState({});fetch('/aiyoucodex-dsh/canvas/bind',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({sessionId,cwd})}).then(async r=>{const v=await r.json();if(!r.ok||!v.ok)throw Error(v.error||'无法打开项目');if(active)setState(v.value);}).catch(e=>{if(active)setState({error:e.message});});return()=>{active=false;};},[sessionId,cwd]);
   if(state.error)return h('p',{role:'alert',style:{padding:20}},state.error);
   if(!state.projectId)return h('p',{role:'status',style:{padding:20}},'正在打开'+TITLE+'…');
   const query=new URLSearchParams({sessionId,projectId:state.projectId,panelId:panel.current});
   const chosenModule=selected,base='/aiyoucodex-dsh/canvas/ui/tools.html?module='+chosenModule,src=base+(base.includes('?')?'&':'?')+query;
   return h('div',{'data-dsh-creation-workspace':KIND,style:{display:'flex',flexDirection:'column',height:'100%',minHeight:0}},KIND==='aiyoucodex-media-tools'&&h('div',{style:{display:'flex',gap:8,padding:8}},...Object.entries({media:'媒体处理',pipeline:'图像工作流',world:'3D 工作台',production:'生产模板'}).map(([id,label])=>h('button',{type:'button',style:buttonStyle,key:id,onClick:()=>setSelected(id),'aria-pressed':selected===id},label))),h('iframe',{key:src,src,title:TITLE,style:{flex:1,width:'100%',minHeight:0,border:0,display:'block'},sandbox:'allow-scripts allow-forms allow-same-origin allow-downloads'}));
  }
  function Tab({useTabInfo}){const{tab}=useTabInfo();const p=tab.navigation.params||{};return h(Workspace,{sessionId:p.sessionId||'',cwd:p.project||'',module:p.module||'media'});}
  function Global(){return h(Workspace,{});}
  return {inject:['slots','sidebarRightTabs','sessions','sidebarRight','layout'],apply(ctx){host=ctx;
   ctx.effect(()=>ctx.sidebarRightTabs.register({id:TYPE,kind:KIND,title:()=>TITLE,keepMounted:KIND==='aiyoucodex-canvas',guide:[{id:'open',order:10,title:()=>TITLE,description:()=>TITLE}]}),KIND+':type');
   ctx.effect(()=>ctx.slots.inject('sidebar.right.pane.tab',()=>ctx.slots.register({name:'sidebar.right.pane.tab',key:TYPE},Tab)),KIND+':tab');
   ctx.effect(()=>ctx.slots.inject('main',()=>ctx.slots.register({name:'main',key:KIND},Global)),KIND+':global');
   if(KIND==='aiyoucodex-canvas')ctx.effect(()=>{let disposed=false,cursor=0,busy=false;const tick=async()=>{if(busy||disposed)return;busy=true;try{const sessions=ctx.get('sessions').list.getSnapshot().byId,current=Object.values(sessions).find(s=>(s.retainedBy?.mainView??0)>0);if(!current)return;const response=await fetch('/aiyoucodex-dsh/canvas/open-requests?'+new URLSearchParams({sessionId:current.id,cursor:String(cursor)}),{cache:'no-store'}),result=await response.json();if(!response.ok||!result.ok)return;cursor=result.value.cursor;for(const request of result.value.requests){const latest=ctx.get('sessions').list.getSnapshot().byId[current.id];if((latest?.retainedBy?.mainView??0)<1)break;ctx.layout.selectPanel(null);ctx.get('sidebarRight').openTab(KIND,{revealIfOpened:true,params:{sessionId:current.id,project:current.cwd||''}});ctx.layout.openRightbar(true,false);}}catch{}finally{busy=false;}};const timer=setInterval(()=>void tick(),750);void tick();return()=>{disposed=true;clearInterval(timer);};},'canvas:conversation-open');
  }};
 }
});
