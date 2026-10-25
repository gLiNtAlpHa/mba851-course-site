/* MBA 851 living course — engine: helpers, scroll scenes, views */
(function(){
const NS='http://www.w3.org/2000/svg';
const C = window.Course = {units:[], byId:{}};
C.modules = [
  {n:1, title:'The Project, Its Location and Its Plant'},
  {n:2, title:'People, Markets and Costs'},
  {n:3, title:'Projected Statements and Evaluation Criteria'}
];
C.add = u => { C.units.push(u); C.byId[u.id]=u; };

/* ---------- maths + DOM helpers ---------- */
const H = C.H = {};
H.clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
H.lerp=(a,b,t)=>a+(b-a)*t;
H.seg=(t,a,b)=>H.clamp((t-a)/(b-a));
H.ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
H.es=(t,a,b)=>H.ease(H.seg(t,a,b));
H.rand=(seed=>()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;})(42);
H.seeded=s=>{let seed=s;return()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};};
H.gauss=r=>{let u=r()||1e-9,v=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);};
H.npdf=(x,m,s)=>Math.exp(-.5*((x-m)/s)**2)/(s*Math.sqrt(2*Math.PI));
function setA(e,a){for(const k in a){const v=a[k];if(v==null)continue;
  if(k==='text'){e.textContent=v;continue}
  if(typeof v==='string'&&v.includes('var(')&&(k==='fill'||k==='stroke'||k==='stop-color')){e.style[k==='stop-color'?'stopColor':k]=v;continue}
  e.setAttribute(k,v);} return e;}
H.el=(tag,a={},p)=>{const e=document.createElementNS(NS,tag);setA(e,a);if(p)p.appendChild(e);return e;};
H.set=(e,a)=>setA(e,a);
H.svg=(parent,w=600,h=440)=>{const s=H.el('svg',{viewBox:`0 0 ${w} ${h}`,preserveAspectRatio:'xMidYMid meet',role:'img'});parent.appendChild(s);return s;};
H.t=(p,x,y,str,a={})=>H.el('text',Object.assign({x,y,fill:'var(--ink)','font-size':13,text:str},a),p);
H.h=(tag,a={},kids=[])=>{const e=document.createElement(tag);for(const k in a){if(k==='html')e.innerHTML=a[k];else if(k==='text')e.textContent=a[k];else if(k.startsWith('on'))e.addEventListener(k.slice(2),a[k]);else e.setAttribute(k,a[k]);}
  (Array.isArray(kids)?kids:[kids]).forEach(c=>c!=null&&e.append(c));return e;};
H.op=(e,o)=>{e.style.opacity=o;e.style.display=o<=0.001?'none':'';};
H.path=pts=>pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
H.css=name=>getComputedStyle(document.documentElement).getPropertyValue(name).trim();
H.tag=(stage,txt='Illustrative data')=>{const d=document.createElement('div');d.className='illus';d.textContent=txt;stage.appendChild(d);return d;};
H.cap=(stage,txt)=>{const d=document.createElement('div');d.className='stage-cap';d.textContent=txt;stage.appendChild(d);return d;};
/* axes in an svg; returns scale fns */
H.axes=(g,{x,y,w,h,xmin=0,xmax=1,ymin=0,ymax=1,xl='',yl='',xt=[],yt=[]})=>{
  const sx=v=>x+(v-xmin)/(xmax-xmin)*w, sy=v=>y+h-(v-ymin)/(ymax-ymin)*h;
  H.el('line',{x1:x,y1:y+h,x2:x+w,y2:y+h,stroke:'var(--muted)','stroke-width':1.2},g);
  H.el('line',{x1:x,y1:y,x2:x,y2:y+h,stroke:'var(--muted)','stroke-width':1.2},g);
  xt.forEach(v=>{const t=Array.isArray(v)?v:[v,v];H.el('line',{x1:sx(t[0]),x2:sx(t[0]),y1:y+h,y2:y+h+4,stroke:'var(--muted)'},g);H.t(g,sx(t[0]),y+h+17,String(t[1]),{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});});
  yt.forEach(v=>{const t=Array.isArray(v)?v:[v,v];H.el('line',{x1:x-4,x2:x+w,y1:sy(t[0]),y2:sy(t[0]),stroke:'var(--line)','stroke-width':.8},g);H.t(g,x-7,sy(t[0])+4,String(t[1]),{'text-anchor':'end','font-size':11,fill:'var(--muted)'});});
  if(xl)H.t(g,x+w,y+h+34,xl,{'text-anchor':'end','font-size':12,fill:'var(--muted)'});
  if(yl)H.t(g,x,y-10,yl,{'font-size':12,fill:'var(--muted)'});
  return {sx,sy};
};
/* person glyph */
H.person=(g,x,y,col='var(--emp)',s=1)=>{const p=H.el('g',{transform:`translate(${x},${y}) scale(${s})`},g);
  H.el('circle',{cx:0,cy:-9,r:4.2,fill:col},p);H.el('path',{d:'M-6 6 Q-6 -3 0 -3 Q6 -3 6 6 Z',fill:col},p);return p;};
/* controls */
H.slider=(parent,{id,label,min,max,step=1,value,fmt=v=>v},on)=>{
  const out=H.h('output',{for:id},fmt(value));
  const inp=H.h('input',{type:'range',id,min,max,step,value});
  inp.addEventListener('input',()=>{out.textContent=fmt(+inp.value);on(+inp.value);});
  parent.append(H.h('div',{class:'ctl'},[H.h('label',{for:id},[H.h('span',{},label),out]),inp]));return inp;};
H.segBtns=(parent,label,opts,val,on)=>{const box=H.h('div',{class:'ctl'},[H.h('label',{},[H.h('span',{},label)])]);const s=H.h('div',{class:'seg',role:'group','aria-label':label});
  opts.forEach(o=>{const b=H.h('button',{type:'button','aria-pressed':String(o[0]===val)},o[1]);b.onclick=()=>{s.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');on(o[0]);};s.append(b);});
  box.append(s);parent.append(box);return s;};
H.readout=parent=>{const r=H.h('div',{class:'readout','aria-live':'polite'});parent.append(r);return r;};

/* ---------- tiny 3D on canvas ---------- */
H.c3=(stage,{yaw=.6,pitch=.38,dist=18,f=1.15,spin=.0022,render})=>{
  const cv=document.createElement('canvas');cv.style.cssText='width:100%;height:100%;display:block';stage.appendChild(cv);
  const ctx=cv.getContext('2d');const o={yaw,pitch,dist,f,spin,dirty:true,w:1,h:1,cx:0,cy:0,ty:0};
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const size=()=>{const r=stage.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);o.w=r.width;o.h=r.height;cv.width=Math.max(1,r.width*d);cv.height=Math.max(1,r.height*d);ctx.setTransform(d,0,0,d,0,0);o.dirty=true;};
  new ResizeObserver(size).observe(stage);size();
  o.proj=p=>{const cy=Math.cos(o.yaw),sy=Math.sin(o.yaw),cp=Math.cos(o.pitch),sp=Math.sin(o.pitch);
    const x=p[0]-o.cx,y=p[1]-o.ty,z=p[2];const x1=x*cy+z*sy,z1=-x*sy+z*cy;const y2=y*cp-z1*sp,z2=y*sp+z1*cp;
    const d=o.dist+z2,s=o.f*Math.min(o.w,o.h*1.25)/Math.max(.1,d);return [o.w/2+x1*s,o.h/2-y2*s,d,s];};
  o.col={};const cols=['org','org-soft','emp','emp-soft','err','err-soft','ink','muted','line','sunk','data','data-soft','card','paper','manila','manila-ink'];
  let vis=true;new IntersectionObserver(es=>{vis=es[0].isIntersecting;}).observe(stage);
  const loop=()=>{if(!stage.isConnected)return;requestAnimationFrame(loop);if(!vis)return;
    if(o.spin&&!reduce){o.yaw+=o.spin;o.dirty=true;}
    if(!o.dirty)return;o.dirty=false;cols.forEach(c=>o.col[c]=H.css('--'+c));ctx.clearRect(0,0,o.w,o.h);render(ctx,o);};
  requestAnimationFrame(loop);return o;};
H.c3line=(ctx,o,a,b,col,w=2)=>{const p=o.proj(a),q=o.proj(b);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke();};
H.c3ring=(ctx,o,y,r,col,w=2,n=64)=>{ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();for(let i=0;i<=n;i++){const a=i/n*Math.PI*2,p=o.proj([Math.cos(a)*r,y,Math.sin(a)*r]);i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);}ctx.stroke();};
H.c3text=(ctx,o,p,txt,col,size=12,align='center',weight=700)=>{const q=o.proj(p);ctx.fillStyle=col;ctx.font=`${weight} ${size}px "Atkinson Hyperlegible", sans-serif`;ctx.textAlign=align;ctx.fillText(txt,q[0],q[1]);};
H.c3box=(o,c,sz,col)=>{const [x,y,z]=c,[a,b,d]=sz.map(v=>v/2);const V=[[x-a,y-b,z-d],[x+a,y-b,z-d],[x+a,y+b,z-d],[x-a,y+b,z-d],[x-a,y-b,z+d],[x+a,y-b,z+d],[x+a,y+b,z+d],[x-a,y+b,z+d]];
  const F=[[0,1,2,3,.8],[5,4,7,6,.8],[4,0,3,7,.64],[1,5,6,2,.64],[3,2,6,7,1],[4,5,1,0,.5]];
  return F.map(f=>{const P=f.slice(0,4).map(i=>o.proj(V[i]));return {P,z:P.reduce((s,p)=>s+p[2],0)/4,shade:f[4],col};});};
H.c3faces=(ctx,faces,stroke)=>{faces.sort((a,b)=>b.z-a.z).forEach(f=>{const P=f.P;let ar=0;for(let i=0;i<4;i++){const p=P[i],q=P[(i+1)%4];ar+=p[0]*q[1]-q[0]*p[1];}if(ar>0)return;
  ctx.beginPath();P.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=f.col;ctx.fill();
  ctx.fillStyle=`rgba(0,0,0,${(1-f.shade)*.5})`;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}});};

/* ---------- storage ---------- */
const store={get(k,d){try{const v=localStorage.getItem('mba851:'+k);return v==null?d:JSON.parse(v);}catch(e){return d;}},
  set(k,v){try{localStorage.setItem('mba851:'+k,JSON.stringify(v));}catch(e){}}};
C.store=store;
const done=()=>store.get('done',{});
const markDone=id=>{const d=done();d[id]=Date.now();store.set('done',d);};

/* ---------- theme ---------- */
function theme(){const order=['system','light','dark'];let cur=store.get('theme','system');
  const apply=()=>{if(cur==='system')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',cur);
    const b=document.getElementById('themeBtn');b.textContent='Theme: '+cur;};
  apply();document.getElementById('themeBtn').onclick=()=>{cur=order[(order.indexOf(cur)+1)%3];store.set('theme',cur);apply();route(true);};}

/* ---------- scroll engine ---------- */
let scrollHandler=null;
function attachScroll(stepsEl,scene){
  const steps=[...stepsEl.children];
  const onScroll=()=>{
    const mobile=innerWidth<=900, anchor=innerHeight*(mobile?0.82:0.55);
    let t=0;
    for(let i=0;i<steps.length;i++){const r=steps[i].getBoundingClientRect();
      if(r.top<=anchor){t=i+H.clamp((anchor-r.top)/r.height);} }
    t=H.clamp(t,0,steps.length-0.0001);
    const k=Math.floor(t);steps.forEach((s,i)=>s.classList.toggle('on',i===k));
    if(scene&&scene.update)scene.update(t);
  };
  return onScroll;
}
function readBar(){const b=document.getElementById('readBar');const h=document.documentElement;const p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);b.style.width=(H.clamp(p)*100)+'%';}
let raf=0;addEventListener('scroll',()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;readBar();if(scrollHandler)scrollHandler();});},{passive:true});
addEventListener('resize',()=>{if(scrollHandler)scrollHandler();});

/* ---------- views ---------- */
const app=()=>document.getElementById('app');
function home(){
  scrollHandler=null;const d=done();const total=C.units.length, n=Object.keys(d).filter(k=>C.byId[k]).length;
  const last=store.get('last',null);
  const root=app();root.innerHTML='';
  const hero=H.h('section',{class:'hero'});
  const left=H.h('div',{},[
    H.h('div',{class:'eyebrow'},'National Open University course · 3 modules · 15 units'),
    H.h('h1',{html:'Project evaluation, <em>drawn as it moves</em>.'}),
    H.h('p',{class:'lede'},'Scroll through each unit and watch a project take shape: a plant’s capacity shrinking from installed to proposed, palm kernels flowing into oil and cake, costs stacking into a ₦175 million budget, cash balances rising month by month, and the NPV curve crossing zero at the internal rate of return.'),
    H.h('p',{class:'credit'},'Course content: MBA 851, Course Writer Leon Ikpe (NOUN). Worked examples use the course’s own figures; charts marked “Illustrative data” use example numbers.')
  ]);
  const acts=H.h('div',{class:'actions'});
  const first=last&&C.byId[last]?C.byId[last]:C.units[0];
  acts.append(H.h('a',{class:'btn primary',href:'#u'+first.id.replace('.','-')},last?'Resume unit '+first.id:'Start with unit 1.1'));
  acts.append(H.h('a',{class:'btn',href:'#revise'},'Flashcards and exam practice'));
  left.append(acts);
  left.append(H.h('div',{class:'legend-key'},[H.h('span',{},[H.h('i',{class:'dot',style:'background:var(--org)'}),'Benefits and inflows']),H.h('span',{},[H.h('i',{class:'dot',style:'background:var(--emp)'}),'Costs and outflows']),H.h('span',{},[H.h('i',{class:'dot',style:'background:var(--err)'}),'Loss, deficit, risk']),H.h('span',{},[H.h('i',{class:'dot',style:'background:var(--data)'}),'Data and evidence'])]));
  const viz=H.h('div',{class:'hero-viz','aria-label':'The net present value of a project falling as the discount rate rises, crossing zero at the internal rate of return'});
  hero.append(left,viz);root.append(hero);heroViz(viz);
  const cab=H.h('section',{class:'cabinet','aria-label':'Course map'});
  cab.append(H.h('div',{class:'drawer-head'},[H.h('h2',{style:'font-size:var(--s3)'},'Course map'),H.h('span',{class:'count mono'},`${n} of ${total} files reviewed`)]));
  C.modules.forEach(m=>{
    const us=C.units.filter(u=>u.module===m.n);
    const dr=H.h('div',{class:'drawer'});
    dr.append(H.h('div',{class:'drawer-head'},[H.h('h2',{},`Module ${m.n}: ${m.title}`),H.h('span',{class:'count'},`${us.filter(u=>d[u.id]).length}/${us.length}`)]));
    const fs=H.h('div',{class:'files'});
    us.forEach(u=>{const a=H.h('a',{class:'file',href:'#u'+u.id.replace('.','-'),'data-no':'FILE '+u.id},[H.h('h3',{},u.title),H.h('span',{class:'viz'},u.vizLabel||'')]);
      if(d[u.id])a.append(H.h('span',{class:'stamp'},'REVIEWED'));fs.append(a);});
    dr.append(fs);cab.append(dr);
  });
  root.append(cab);
}
function heroViz(box){
  const s=H.svg(box,480,360);const g=H.el('g',{},s);
  const cf=[16000,14000,12000],c0=32400,npv=r=>-c0+cf.reduce((a,c,i)=>a+c/Math.pow(1+r,i+1),0);
  const ax=H.axes(g,{x:64,y:56,w:390,h:250,xmin:0,xmax:.4,ymin:-9000,ymax:10000,xt:[[0,'0%'],[.1,'10%'],[.2,'20%'],[.3,'30%'],[.4,'40%']],yt:[[-5000,'−₦5k'],[0,'₦0'],[5000,'₦5k']],xl:'discount rate',yl:'NPV'});
  H.el('line',{x1:ax.sx(0),x2:ax.sx(.4),y1:ax.sy(0),y2:ax.sy(0),stroke:'var(--ink)','stroke-width':1.2},g);
  const pts=[];for(let i=0;i<=80;i++){const r=.4*i/80;pts.push([ax.sx(r),ax.sy(npv(r))]);}H.el('path',{d:H.path(pts),fill:'none',stroke:'var(--data)','stroke-width':3},g);
  H.el('circle',{cx:ax.sx(.1498),cy:ax.sy(0),r:6,fill:'var(--org)'},g);H.t(g,ax.sx(.1498)+8,ax.sy(0)-10,'IRR ≈ 15%',{'font-size':12,'font-weight':700,fill:'var(--org)'});
  const tl=H.el('line',{stroke:'var(--emp)','stroke-width':2.5},g),dot=H.el('circle',{r:6,fill:'var(--emp)'},g),lab=H.t(g,245,26,'',{'text-anchor':'middle','font-weight':700,'font-size':14});
  const draw=r=>{const v=npv(r),d=(npv(r+1e-4)-npv(r-1e-4))/2e-4;H.set(dot,{cx:ax.sx(r),cy:ax.sy(v)});H.set(tl,{x1:ax.sx(r-.05),y1:ax.sy(v-d*.05),x2:ax.sx(r+.05),y2:ax.sy(v+d*.05)});
    lab.textContent=`At ${(r*100).toFixed(0)}%: NPV ${v<0?'−':''}₦${Math.abs(Math.round(v)).toLocaleString('en-NG')}`;};
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){draw(.1);return;}
  const t0=performance.now();const go=now=>{if(!box.isConnected)return;const k=((now-t0)/1000)%10;const r=.02+.34*(k<5?H.ease(k/5):1-H.ease((k-5)/5));draw(r);requestAnimationFrame(go);};requestAnimationFrame(go);
}

function unitView(u){
  store.set('last',u.id);
  const root=app();root.innerHTML='';
  const head=H.h('header',{class:'unit-head'},[H.h('span',{class:'tab'},`FILE ${u.id} · MODULE ${u.module}`),H.h('h1',{},u.title)]);
  root.append(head);
  root.append(H.h('div',{class:'hook'},[H.h('div',{class:'avatar','aria-hidden':'true'},u.hook.who[0]),H.h('div',{},[H.h('div',{class:'eyebrow'},'Case: '+u.hook.who),H.h('p',{html:u.hook.text})])]));
  root.append(H.h('div',{class:'objectives'},[H.h('div',{class:'eyebrow'},'By the end of this unit you should be able to'),H.h('ul',{},u.objectives.map(o=>H.h('li',{},o)))]));
  const story=H.h('section',{class:'story','aria-label':'Scroll story'});
  const steps=H.h('div',{class:'steps'});
  u.steps.forEach((s,i)=>steps.append(H.h('div',{class:'step'},H.h('div',{class:'card'},[H.h('div',{class:'n'},`Step ${i+1} of ${u.steps.length}`),H.h('h3',{},s.h),H.h('div',{html:s.t})]))));
  const sw=H.h('div',{class:'stage-wrap'});const stage=H.h('div',{class:'stage',role:'img','aria-label':u.stageLabel||('Visual for '+u.title)});sw.append(stage);
  story.append(steps,sw);root.append(story);
  let scene=null;try{scene=u.scene(stage);}catch(e){console.error(e);}
  scrollHandler=attachScroll(steps,scene);requestAnimationFrame(()=>scrollHandler&&scrollHandler());
  // sandbox
  if(u.sandbox){const sec=H.h('section',{class:'section'},[H.h('h2',{},'Try it yourself'),H.h('p',{class:'sub'},u.sandboxIntro||'Change the settings and watch the picture respond.')]);
    const sb=H.h('div',{class:'sandbox'});const ctl=H.h('div',{class:'controls'});const st=H.h('div',{class:'sb-stage'});sb.append(ctl,st);sec.append(sb);root.append(sec);
    try{u.sandbox(ctl,st);const ro=ctl.querySelector('.readout');if(ro)ctl.append(ro);}catch(e){console.error(e);}}
  // SAE + TMA
  const sec2=H.h('section',{class:'section'},[H.h('h2',{},'Exercises'),H.h('p',{class:'sub'},'The tutor-marked assignment comes from the course. Practice questions are added for revision.')]);
  const g2=H.h('div',{class:'grid2'});
  if(u.sae)g2.append(panelReveal(u.saeOwn?'Practice question':'Self-assessment exercise',u.sae.q,u.sae.a,'Show a model answer'));
  if(u.tma)g2.append(panelReveal('Tutor-marked assignment',u.tma.q,u.tma.outline,'Show an answer outline'));
  sec2.append(g2);root.append(sec2);
  // quiz
  const sec3=H.h('section',{class:'section'},[H.h('h2',{},'Quick check'),H.h('p',{class:'sub'},'Pick an answer to see why it is right or wrong.')]);
  sec3.append(quiz(u.quiz,()=>markDone(u.id)));root.append(sec3);
  // revision card
  const sec4=H.h('section',{class:'section'},[H.h('h2',{},'Revision card'),H.h('p',{class:'sub'},'The lists to remember from this unit.')]);
  const rc=H.h('div',{class:'rev-card'});
  u.card.forEach(c=>rc.append(H.h('div',{},[H.h('h4',{},c.h),H.h(c.ordered?'ol':'ul',{},c.items.map(i=>H.h('li',{},i)))])));
  sec4.append(rc);
  const status=H.h('span',{class:'why','aria-live':'polite'});
  const cp=H.h('button',{class:'btn',type:'button'},'Copy card as text');
  cp.onclick=()=>{const txt=`MBA 851 Unit ${u.id}: ${u.title}\n\n`+u.card.map(c=>c.h+'\n'+c.items.map((x,i)=>(c.ordered?(i+1)+'. ':'- ')+x).join('\n')).join('\n\n');
    navigator.clipboard.writeText(txt).then(()=>status.textContent='Copied.').catch(()=>{status.textContent='Copy is blocked here. Select the card text instead.';});};
  sec4.append(H.h('div',{class:'copy-row'},[cp,status]));root.append(sec4);
  // pager
  const i=C.units.indexOf(u),pv=C.units[i-1],nx=C.units[i+1];const pg=H.h('nav',{class:'pager'});
  pg.append(pv?H.h('a',{href:'#u'+pv.id.replace('.','-')},[H.h('div',{class:'eyebrow'},'Previous'),H.h('div',{},pv.id+' '+pv.title)]):H.h('span'));
  pg.append(nx?H.h('a',{class:'next',href:'#u'+nx.id.replace('.','-')},[H.h('div',{class:'eyebrow'},'Next'),H.h('div',{},nx.id+' '+nx.title)]):H.h('a',{class:'next',href:'#revise'},[H.h('div',{class:'eyebrow'},'Finished'),H.h('div',{},'Revise the whole course')]));
  root.append(pg);
}
function panelReveal(title,q,ans,btnTxt){
  const body=H.h('div',{class:'reveal-body',hidden:''});
  if(Array.isArray(ans))body.append(H.h('ul',{},ans.map(a=>H.h('li',{html:a}))));else body.append(H.h('p',{html:ans}));
  const b=H.h('button',{class:'btn',type:'button','aria-expanded':'false'},btnTxt);
  b.onclick=()=>{body.hidden=!body.hidden;b.setAttribute('aria-expanded',String(!body.hidden));b.textContent=body.hidden?btnTxt:'Hide';};
  return H.h('div',{class:'panel'},[H.h('div',{class:'eyebrow'},title),H.h('h3',{html:q}),H.h('div',{class:'reveal'},[b,body])]);
}
function quiz(qs,onAll){
  const box=H.h('div',{class:'quiz'});let answered=0,right=0;const sc=H.h('div',{class:'score','aria-live':'polite'},`Score: 0 / ${qs.length}`);
  qs.forEach((q,qi)=>{const card=H.h('div',{class:'q'},[H.h('div',{class:'qt'},`${qi+1}. ${q.q}`)]);const opts=H.h('div',{class:'opts'});const why=H.h('div',{class:'why',hidden:''});
    let locked=false;q.o.forEach((o,oi)=>{const b=H.h('button',{class:'opt',type:'button'},o);b.onclick=()=>{if(locked)return;locked=true;answered++;
      if(oi===q.a){b.classList.add('right');right++;why.innerHTML='<b>Correct.</b> '+q.w;}else{b.classList.add('wrong');opts.children[q.a].classList.add('right');why.innerHTML='<b>Not quite.</b> '+q.w;}
      why.hidden=false;sc.textContent=`Score: ${right} / ${qs.length}`;if(answered===qs.length&&onAll)onAll(right);};opts.append(b);});
    card.append(opts,why);box.append(card);});
  box.append(sc);return box;
}
function revise(){
  scrollHandler=null;const root=app();root.innerHTML='';
  root.append(H.h('header',{class:'unit-head'},[H.h('span',{class:'tab'},'REVISION'),H.h('h1',{},'Flashcards and exam practice'),H.h('p',{style:'color:var(--muted)'},'Flashcards cover every key list in the course. Exam practice draws 20 questions at random from all units.')]));
  const cards=[];C.units.forEach(u=>u.card.forEach(c=>cards.push({u,c})));
  let i=0;const fc=H.h('div',{class:'fc-wrap'});const flash=H.h('div',{class:'flash',tabindex:'0',role:'button','aria-label':'Flashcard. Press to flip.'});
  const inner=H.h('div',{class:'flash-inner'});const front=H.h('div',{class:'face'}),back=H.h('div',{class:'face back'});inner.append(front,back);flash.append(inner);
  const pos=H.h('span',{class:'mono'});
  const show=()=>{const {u,c}=cards[i];flash.classList.remove('flip');front.innerHTML='';back.innerHTML='';
    front.append(H.h('div',{class:'eyebrow'},`Unit ${u.id} · ${u.title}`),H.h('h3',{},c.h),H.h('p',{style:'color:var(--muted)'},`Recall ${c.items.length} points, then tap to check.`));
    back.append(H.h('div',{class:'eyebrow'},c.h),H.h('ol',{},c.items.map(x=>H.h('li',{},x))));pos.textContent=`${i+1} / ${cards.length}`;};
  const flip=()=>flash.classList.toggle('flip');flash.onclick=flip;flash.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip();}};
  const nav=H.h('div',{class:'copy-row'},[H.h('button',{class:'btn',type:'button',onclick:()=>{i=(i-1+cards.length)%cards.length;show();}},'Previous'),H.h('button',{class:'btn',type:'button',onclick:()=>{i=(i+1)%cards.length;show();}},'Next'),H.h('button',{class:'btn',type:'button',onclick:()=>{i=Math.floor(Math.random()*cards.length);show();}},'Shuffle'),pos]);
  fc.append(flash,nav);show();
  root.append(H.h('section',{class:'section'},[H.h('h2',{},'Flashcards'),fc]));
  const ex=H.h('section',{class:'section'},[H.h('h2',{},'Exam practice')]);const exBox=H.h('div');
  const start=()=>{exBox.innerHTML='';const all=[];C.units.forEach(u=>u.quiz.forEach(q=>all.push(Object.assign({},q,{q:`[${u.id}] `+q.q}))));
    for(let k=all.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[all[k],all[j]]=[all[j],all[k]];}
    exBox.append(quiz(all.slice(0,20)));};
  ex.append(H.h('button',{class:'btn primary',type:'button',onclick:start,style:'margin-bottom:14px'},'Start a new 20-question paper'),exBox);start();
  root.append(ex);
}

function route(keep){
  const h=(location.hash||'#home').slice(1);
  const y=keep?scrollY:0;
  if(h.startsWith('u')){const id=h.slice(1).replace('-','.');const u=C.byId[id];if(u){unitView(u);document.title='MBA 851 · '+u.id+' '+u.title;}else home();}
  else if(h==='revise'){revise();document.title='MBA 851 Revision';}
  else {home();document.title='MBA 851 Living Course';}
  scrollTo(0,y);readBar();if(scrollHandler)scrollHandler();
}
C.boot=()=>{theme();addEventListener('hashchange',()=>route());route();};
})();
