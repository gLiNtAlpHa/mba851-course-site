/* MBA 851 Module 1 — project cycle, format, location, capacity, engineering */
(function(){
const {H}=Course, el=H.el, t_=H.t;
const tab=s=>el('g',{},s);
const box=(g,x,y,w,h,fill='var(--card)',stroke='var(--line)',rx=8)=>el('rect',{x,y,width:w,height:h,rx,fill,stroke},g);
const wrap=(g,x,y,str,max=28,a={})=>{const words=str.split(' ');let line='',ly=y;const lh=a.lh||15;words.forEach(w=>{if((line+' '+w).trim().length>max){t_(g,x,ly,line.trim(),a);line=w;ly+=lh;}else line+=' '+w;});if(line.trim())t_(g,x,ly,line.trim(),a);return ly;};
const showTabs=(tabs,t)=>tabs.forEach(([g,a,b,last])=>H.op(g,H.es(t,a-.12,a+.1)*(last?1:(1-H.es(t,b-.1,b+.05)))));
const N=v=>'₦'+Math.round(v).toLocaleString('en-NG');
const n=v=>Math.round(v).toLocaleString('en-NG');
const checklist=(ctl,st,groups,label)=>{const ro=H.readout(ctl);const state={};const wrapEl=H.h('div',{style:'padding:14px;display:grid;gap:14px'});st.append(wrapEl);
  const upd=()=>{const tot=groups.reduce((a,g)=>a+g[1].length,0),done=Object.values(state).filter(Boolean).length;ro.innerHTML=`<b>${done}</b> of ${tot} items covered (${Math.round(100*done/tot)}%).<br>${done===tot?'Complete: this '+label+' is ready for review.':'An evaluator would ask about the unticked items.'}`;};
  groups.forEach(([h,items])=>{const g=H.h('fieldset',{style:'border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin:0'},[H.h('legend',{style:'font-weight:700;padding:0 6px'},h)]);
    items.forEach((it,i)=>{const id='ck'+h.replace(/\W/g,'')+i;const cb=H.h('input',{type:'checkbox',id});cb.onchange=()=>{state[id]=cb.checked;upd();};g.append(H.h('div',{style:'display:flex;gap:8px;align-items:center;padding:3px 0'},[cb,H.h('label',{for:id},it)]));});wrapEl.append(g);});upd();};

/* ================= 1.1 ================= */
const STAGES=['Idea','Identification','Evaluation','Selection','Execution'];
function cycleScene(stage){
  H.cap(stage,'The project cycle');
  const s=H.svg(stage,600,440);const cx=300,cy=225,R=150;
  el('circle',{cx,cy,r:R,fill:'none',stroke:'var(--line)','stroke-width':10},s);const arc=el('circle',{cx,cy,r:R,fill:'none',stroke:'var(--org)','stroke-width':10,'stroke-linecap':'round',transform:`rotate(-90 ${cx} ${cy})`},s);const L=2*Math.PI*R;arc.style.strokeDasharray=L;
  const pos=i=>{const a=-Math.PI/2+i*2*Math.PI/5;return [cx+Math.cos(a)*R,cy+Math.sin(a)*R];};
  const nodes=STAGES.map((n,i)=>{const [x,y]=pos(i);const g=el('g',{},s);const c=el('circle',{cx:x,cy:y,r:34,fill:'var(--card)',stroke:'var(--line)','stroke-width':3},g);t_(g,x,y-2,String(i+1),{'text-anchor':'middle','font-size':16,'font-weight':700,class:'mono'});t_(g,x,y+14,n,{'text-anchor':'middle','font-size':10.5,'font-weight':700});return {g,c};});
  const token=el('g',{},s);el('rect',{x:-11,y:-14,width:22,height:28,rx:3,fill:'var(--emp)'},token);el('line',{x1:-6,x2:6,y1:-6,y2:-6,stroke:'var(--card)','stroke-width':2},token);el('line',{x1:-6,x2:6,y1:0,y2:0,stroke:'var(--card)','stroke-width':2},token);
  const center=el('g',{},s);const cT=t_(center,cx,cy-30,'',{'text-anchor':'middle','font-size':15,'font-weight':700});const cL=[0,1,2,3].map(i=>t_(center,cx,cy-6+i*18,'',{'text-anchor':'middle','font-size':11.5}));
  const gauge=el('g',{},s);box(gauge,cx-60,cy+44,130,14,'var(--sunk)','none',7);const gF=el('rect',{x:cx-60,y:cy+44,height:14,rx:7,fill:'var(--org)'},gauge);const gO=el('rect',{x:cx-60,y:cy+64,height:14,rx:7,fill:'var(--emp)'},gauge);t_(gauge,cx-64,cy+55,'₦10m funds',{'text-anchor':'end','font-size':10});t_(gauge,cx-64,cy+75,'₦40m outlay',{'text-anchor':'end','font-size':10});
  const mfg=el('g',{},s);const mf=['Customer','Marketing','Design','Planning','Purchasing','Production'];el('rect',{x:20,y:20,width:560,height:400,rx:14,fill:'var(--card)',stroke:'var(--line)'},mfg);t_(mfg,300,52,'A manufacturing project cycle (Figure 2)',{'text-anchor':'middle','font-size':15,'font-weight':700});
  mf.forEach((m,i)=>{const a=-Math.PI/2+i*2*Math.PI/6,x=300+Math.cos(a)*130,y=235+Math.sin(a)*130;el('circle',{cx:x,cy:y,r:42,fill:i===0?'var(--emp-soft)':'var(--org-soft)'},mfg);t_(mfg,x,y+5,m,{'text-anchor':'middle','font-size':12,'font-weight':700});const a2=a+2*Math.PI/12,x2=300+Math.cos(a2)*130,y2=235+Math.sin(a2)*130;t_(mfg,x2,y2+6,'→',{'text-anchor':'middle','font-size':16,fill:'var(--muted)',transform:`rotate(${(a2*180/Math.PI)+90} ${x2} ${y2})`});});
  const txt=[['A project','an undertaking needing','concentrated effort and resources',''],['1 Idea','from inside: a salesperson, a cleaner,','a director · from outside: customers','new products or expanded capacity'],['2 Identification','the idea is written down clearly','and seen at board level as a','possible business investment'],['3 Evaluation','estimate benefits and costs as','future cash flows · an expert team','or outside consultants (less bias)'],['4 Selection','the Board matches the outlay','with the firm’s financial capability',''],['5 Execution','a project management team keeps','spending on budget and on schedule','· monthly budget reports']];
  return {update(t){const k=Math.min(5,Math.floor(t));const p=H.clamp(t-1,0,4.9)/5;arc.style.strokeDashoffset=L*(1-Math.max(0,t<1?0:(t-1)/5));
    nodes.forEach((nd,i)=>{const on=k===i+1;H.set(nd.c,{fill:on?'var(--org)':t>=i+1?'var(--org-soft)':'var(--card)',stroke:t>=i+1?'var(--org)':'var(--line)'});nd.g.querySelectorAll('text').forEach(x=>H.set(x,{fill:on?'var(--card)':'var(--ink)'}));});
    const a=-Math.PI/2+H.clamp(t-1,0,4.95)*2*Math.PI/5;token.setAttribute('transform',`translate(${cx+Math.cos(a)*(R+46)},${cy+Math.sin(a)*(R+46)})`);H.op(token,H.es(t,.6,1));
    const tx=txt[Math.min(5,k)];cT.textContent=tx[0];cL.forEach((l,i)=>l.textContent=tx[i+1]||'');
    H.op(gauge,k===4?1:0);H.set(gF,{width:130*.25});H.set(gO,{width:130*H.es(t,4.1,4.5)});H.op(center,t<6?1:0);H.op(mfg,H.es(t,6,6.2));
  }};
}
Course.add({id:'1.1',module:1,title:'The Project Cycle',vizLabel:'A project moving round its cycle',
  hook:{who:'Chinedu, sales representative',text:'Chinedu keeps hearing customers in Enugu ask for a cheaper bottled table water. He mentions it to his manager. How does a passing remark become a factory on the ground?'},
  objectives:['Explain what a project cycle is','Describe the five stages from idea to execution','Identify sources of new project ideas'],
  steps:[
    {h:'What a project is',t:'<p>A project is an undertaking that needs concentrated effort, commitment and the deployment of resources. It may be public (a railway from Ibadan to Onitsha) or private (a new brewery at Enugu).</p><p>The <b>project cycle</b> describes the stages from the conception of an idea to when the project is executed.</p>'},
    {h:'1. The idea stage',t:'<p>Ideas come from <b>inside</b> the organisation (a salesperson who meets success or problems with customers, a factory cleaner, an executive director) or from <b>outside</b> (customers asking for bigger or better products).</p><p>Categories: add new products to existing lines; expand capacity in existing lines.</p>'},
    {h:'2. The identification stage',t:'<p>Ideas are only useful once clearly identified and put down systematically. At board level the whole organisation must see the idea clearly as a possible area of business investment.</p>'},
    {h:'3. The evaluation stage',t:'<p>Estimate the project’s <b>benefits and costs</b>, measured as <b>cash flows</b>. This is hard because they are <b>future</b> cash flows.</p><p>Use an objective team from production, marketing, accounts and administration, or outside consultants, which tends to eliminate bias.</p>'},
    {h:'4. The selection stage',t:'<p>Selection is a top-management responsibility, usually the Board’s. Outlays are matched with the firm’s financial capability: a firm with ₦10 million cannot take on a ₦40 million project unless it can raise money outside, for example from banks.</p>'},
    {h:'5. The execution stage',t:'<p>A project management team ensures the budget is spent on the project and it finishes on schedule. In a well-run firm it sends top management a <b>monthly budget report</b> for monitoring and control.</p>'},
    {h:'A manufacturing project cycle',t:'<p>Inside a manufacturing firm the cycle runs: customer → marketing → design → planning → purchasing → production, and back to the customer.</p>'}
  ],
  scene:cycleScene,
  sandboxIntro:'Play the Board at the selection stage: can the firm afford this project?',
  sandbox(ctl,st){
    const s=H.svg(st,520,300);const p={f:10,o:40,b:25};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s11f',label:'Firm’s investment funds',min:0,max:100,value:10,fmt:v=>'₦'+v+'m'},v=>{p.f=v;draw();});
    H.slider(ctl,{id:'s11o',label:'Project capital outlay',min:5,max:150,step:5,value:40,fmt:v=>'₦'+v+'m'},v=>{p.o=v;draw();});
    H.slider(ctl,{id:'s11b',label:'Bank finance available',min:0,max:100,step:5,value:25,fmt:v=>'₦'+v+'m'},v=>{p.b=v;draw();});
    function draw(){s.innerHTML='';const mx=Math.max(p.o,p.f+p.b)*1.1,X=v=>40+440*v/mx;
      el('rect',{x:40,y:80,width:X(p.f)-40,height:40,rx:4,fill:'var(--org)'},s);el('rect',{x:X(p.f),y:80,width:X(p.f+p.b)-X(p.f),height:40,rx:4,fill:'var(--data-soft)',stroke:'var(--data)'},s);t_(s,40,70,'Money available: own funds + bank',{'font-size':12,'font-weight':700});
      el('rect',{x:40,y:170,width:X(p.o)-40,height:40,rx:4,fill:'var(--emp)'},s);t_(s,40,160,'Project outlay',{'font-size':12,'font-weight':700});
      const gap=p.o-p.f;ro.innerHTML=p.f>=p.o?'<b>Affordable from own funds.</b> The Board can select it.':p.f+p.b>=p.o?`<b>Affordable with a bank loan of ₦${gap}m.</b> The bank will now study the project’s cash flows.`:`<b>Not affordable:</b> short by ₦${p.o-p.f-p.b}m. Reject, scale down, or find more finance.`;}
    draw();
  },
  sae:{q:'Discuss three sources of new project ideas.',a:['A salesperson’s contact with customers (successes or problems in the market).','Any level of staff inside the firm, from a factory cleaner to an executive director.','Outside requests, such as existing customers asking for bigger or better products.']},
  tma:{q:'Explain the term “project cycle”, and list and discuss its stages.',outline:['Define the project cycle: stages from conception of an idea to execution','Idea: sources inside and outside; new products or more capacity','Identification: systematic statement, board-level view','Evaluation: benefits and costs as future cash flows; team or consultants','Selection: Board matches outlay to financial capability','Execution: project management team; budget and schedule; monthly reports']},
  quiz:[
    {q:'Which is the correct order of the project cycle?',o:['Idea, evaluation, identification, selection, execution','Idea, identification, evaluation, selection, execution','Identification, idea, selection, evaluation, execution','Idea, selection, identification, evaluation, execution'],a:1,w:'Idea → identification → evaluation → selection → execution.'},
    {q:'In project evaluation, benefits and costs should be measured as…',o:['Accounting profits','Cash flows','Market share','Number of employees'],a:1,w:'The course says benefits and costs should be measured in terms of cash flows.'},
    {q:'Why might a firm contract evaluation to consultants?',o:['It is cheaper','It tends to eliminate bias','Consultants choose the project','Banks require it by law'],a:1,w:'Outside parties tend to eliminate bias.'},
    {q:'Project selection is mainly the responsibility of…',o:['The project management team','The sales department','Top management, usually the Board of Directors','The bank'],a:2,w:'Selection is a top-management responsibility, usually the Board.'}
  ],
  card:[{h:'Stages of the project cycle',ordered:true,items:['Idea','Identification','Evaluation','Selection','Execution']},{h:'Sources of ideas',items:['Inside: salespeople, any staff, executives','Outside: customer requests','Types: new products; expanded capacity']}]
});

/* ================= 1.2 ================= */
const SEGS=[['Technical and engineering',['Land for the project','Civil works and foundations','Steel structures','Factory building','Offices','Wind force and direction','Electric power','Generator','Potable water','Borehole','Sewage','Existing roads','Access difficulties','Machinery list','Raw materials','Professionals','Skilled labour','Unskilled labour']],
  ['Management',['Legal form of the business','Organisational structure','Who will manage the project','Qualifications of key staff','Number of employees','Salaries']],
  ['Demand and market',['Population of the market','Nature of demand','Factors affecting demand','Size of the market','Supply situation','Price','Market share','Advertisement strategy','Promotional strategy']],
  ['Financial',['Cost of land and buildings','Cost of utilities','Cost of machinery','Revenues','Expenditures','Projected income statement','Projected cash flow statement','Projected balance sheet']],
  ['Economic',['Employment generating capacity','Contribution to economic growth','Contribution to government revenue','Forward linkages','Backward linkages','Externalities']]];
function formatScene(stage){
  H.cap(stage,'The evaluation report, segment by segment');
  const s=H.svg(stage,600,440);const cols=['var(--data)','var(--org)','var(--emp)','var(--ink)','var(--err)'];
  box(s,40,70,520,350,'var(--card)','var(--line)',10);
  const tabsE=SEGS.map((sg,i)=>{const g=el('g',{},s);const r=el('rect',{x:40+i*104,y:38,width:100,height:36,rx:8,fill:'var(--sunk)'},g);const w=sg[0].split(' ');t_(g,90+i*104,54,w[0],{'text-anchor':'middle','font-size':11,'font-weight':700});if(w.length>1)t_(g,90+i*104,67,w.slice(1).join(' '),{'text-anchor':'middle','font-size':11,'font-weight':700});return r;});
  const body=el('g',{},s);
  const cover=el('g',{},s);t_(cover,300,170,'Project Evaluation Report',{'text-anchor':'middle','font-size':22,'font-weight':700});t_(cover,300,200,'Proposed vegetable oil refinery',{'text-anchor':'middle','font-size':14,fill:'var(--muted)'});t_(cover,300,250,'Five segments, one per functional area',{'text-anchor':'middle','font-size':13});
  const radarG=el('g',{},s);
  return {update(t){const k=Math.floor(t);H.op(cover,k===0?1:0);
    tabsE.forEach((r,i)=>H.set(r,{fill:k===i+1?cols[i]:'var(--sunk)'}));tabsE.forEach((r,i)=>r.parentNode.querySelectorAll('text').forEach(x=>H.set(x,{fill:k===i+1?'var(--card)':'var(--ink)'})));
    body.innerHTML='';radarG.innerHTML='';
    if(k>=1&&k<=5){const sg=SEGS[k-1];const fr=H.seg(t,k,k+.8);t_(body,60,100,`Checklist: ${sg[0]} segment`,{'font-size':15,'font-weight':700,fill:cols[k-1]});
      const per=Math.ceil(sg[1].length/2);sg[1].forEach((it,i)=>{const c=i<per?0:1,r=i%per,x=60+c*250,y=128+r*(sg[1].length>12?30:38);const on=i<Math.round(fr*sg[1].length);el('rect',{x,y:y-11,width:14,height:14,rx:3,fill:on?cols[k-1]:'var(--card)',stroke:'var(--muted)'},body);if(on)t_(body,x+7,y+1,'✓',{'text-anchor':'middle','font-size':11,fill:'var(--card)','font-weight':700});t_(body,x+22,y+1,it,{'font-size':12});});}
    if(k>=6){t_(radarG,300,104,'Coverage across the five segments',{'text-anchor':'middle','font-size':15,'font-weight':700});const cx=300,cy=265,R=120;for(let r=1;r<=4;r++)el('polygon',{points:SEGS.map((_,i)=>{const a=-Math.PI/2+i*2*Math.PI/5;return [cx+Math.cos(a)*R*r/4,cy+Math.sin(a)*R*r/4].join(',');}).join(' '),fill:'none',stroke:'var(--line)'},radarG);
      SEGS.forEach((sg,i)=>{const a=-Math.PI/2+i*2*Math.PI/5;t_(radarG,cx+Math.cos(a)*(R+18),cy+Math.sin(a)*(R+18)+4,sg[0].split(' ')[0],{'text-anchor':Math.abs(Math.cos(a))<.2?'middle':Math.cos(a)>0?'start':'end','font-size':12,'font-weight':700});});
      const v=[1,1,.9,1,.7].map(x=>x*H.es(t,6,6.6));el('polygon',{points:v.map((x,i)=>{const a=-Math.PI/2+i*2*Math.PI/5;return [cx+Math.cos(a)*R*x,cy+Math.sin(a)*R*x].join(',');}).join(' '),fill:'var(--org-soft)',stroke:'var(--org)','stroke-width':3,'fill-opacity':.8},radarG);}
  }};
}
Course.add({id:'1.2',module:1,title:'Project Evaluation: An Introductory Format',vizLabel:'A report with five checklist tabs',
  hook:{who:'Amaka, bank credit analyst',text:'A 60-page feasibility study for a vegetable oil refinery has landed on Amaka’s desk. Where should she start, and how will she know if anything important is missing?'},
  objectives:['Explain the format for project evaluation','Describe the five segments and what each checks','Use checklists to test the completeness of an evaluation'],
  steps:[
    {h:'A format for the work',t:'<p>Evaluation is a careful consideration of the totality of a project to see how useful or valuable it is. It attaches financial value to a project and lets us compare it with others. It is always documented.</p><p>A simple format follows the functional areas of an organisation: five segments.</p>'},
    {h:'Technical and engineering segment',t:'<p>Tests the total technical and engineering soundness of the project, and how it relates to its environment: land, civil works, structures, power, water, roads, machinery, raw materials and labour.</p>'},
    {h:'Management segment',t:'<p>Projects succeed only if well managed. Check the legal form of the business and whether it can carry the project, the structure, who will manage, key staff qualifications, staff numbers and salaries.</p>'},
    {h:'Demand and market segment',t:'<p>Demand translates to revenues, so evaluate population, nature of demand, factors affecting it, market size, the supply situation, price, market share, and advertising and promotion strategies.</p>'},
    {h:'Financial segment',t:'<p>All the financial aspects: start-up costs of land, buildings, utilities and machinery; revenues and expenditures; and the projected income statement, cash flow statement and balance sheet.</p>'},
    {h:'Economic segment',t:'<p>The macro view: benefits and costs to society as a whole. Employment generation, contribution to growth and government revenue, forward and backward linkages, and externalities.</p>'},
    {h:'Putting it together',t:'<p>A complete evaluation covers all five segments. Gaps show up immediately on the radar: here the economic segment is thin and needs more work.</p>'}
  ],
  scene:formatScene,
  sandboxIntro:'Use the course’s checklists on a project of your own. Tick what your evaluation already covers.',
  sandbox(ctl,st){checklist(ctl,st,SEGS.slice(1),'evaluation');},
  sae:{q:'List and explain five items you would expect in the checklist of the management segment.',a:['Legal form of the business: can it legally carry the project?','Organisational structure: how work and authority are arranged.','Who will manage the project: named managers.','Qualifications of key staff: education and experience.','Number of employees and salaries: cost and adequacy.']},
  tma:{q:'Discuss the key segments of project evaluation.',outline:['Technical and engineering: soundness and environment','Management: legal form, structure, people','Demand and market: demand → revenues; supply; strategies','Financial: costs, revenues, projected statements','Economic: value to society, linkages, externalities']},
  quiz:[
    {q:'Which segment looks at forward and backward linkages?',o:['Technical','Management','Financial','Economic'],a:3,w:'The economic segment takes the macro view, including linkages and externalities.'},
    {q:'Why is the demand and market segment important?',o:['It sets salaries','Demand translates to revenues','It covers land costs','It decides the legal form'],a:1,w:'Demand translates to revenues.'},
    {q:'The projected balance sheet belongs to which segment?',o:['Financial','Economic','Management','Technical'],a:0,w:'The financial segment covers projected income, cash flow and balance sheet.'}
  ],
  card:[{h:'Five segments',ordered:true,items:SEGS.map(s=>s[0])},{h:'Economic segment checklist',items:SEGS[4][1]}]
});

/* ================= 1.3 ================= */
const CITIES={Lagos:[6.45,3.39],Ibadan:[7.38,3.95],Kano:[12.0,8.52],Kaduna:[10.52,7.44],Abuja:[9.06,7.49],'Port Harcourt':[4.82,7.03],Onitsha:[6.15,6.79],Enugu:[6.44,7.5],Aba:[5.11,7.37],Umuahia:[5.53,7.49],Calabar:[4.95,8.32],Owerri:[5.48,7.03],Warri:[5.52,5.75],Jos:[9.9,8.86],Maiduguri:[11.85,13.16],Sokoto:[13.06,5.24]};
const MX=lon=>40+(lon-2.6)*41,MY=lat=>430-(lat-4.2)*32;
function locScene(stage){
  H.cap(stage,'Where projects locate in Nigeria');
  const s=H.svg(stage,600,440);
  const zones=el('g',{},s);const zone=(lat,lon,r,col,lab)=>{const g=el('g',{},zones);el('circle',{cx:MX(lon),cy:MY(lat),r,fill:col,opacity:.25},g);t_(g,MX(lon),MY(lat)-r-4,lab,{'text-anchor':'middle','font-size':11,'font-weight':700});return g;};
  const zCocoa=zone(7.2,4.9,42,'var(--emp)','cocoa (west)'),zPalm=zone(5.5,7.3,46,'var(--org)','oil palm (east)'),zCoal=zone(6.44,7.5,14,'var(--ink)','coal, Enugu'),zTea=zone(6.9,11.3,26,'var(--org)','tea, Mambilla');
  const rail=el('g',{},s);const line=(pts,c)=>el('path',{d:H.path(pts.map(n=>[MX(CITIES[n][1]),MY(CITIES[n][0])])),fill:'none',stroke:c,'stroke-width':4,'stroke-dasharray':'2 6','stroke-linecap':'round'},rail);
  line(['Lagos','Ibadan','Kaduna','Kano'],'var(--ink)');line(['Port Harcourt','Aba','Umuahia','Enugu','Jos','Maiduguri'],'var(--ink)');
  const pops={Kano:9.38,Lagos:9.01,Kaduna:6.07,Ibadan:5.59,'Port Harcourt':5.19};const bub=el('g',{},s);const bEls=Object.keys(pops).map(c=>el('circle',{cx:MX(CITIES[c][1]),cy:MY(CITIES[c][0]),r:0,fill:'var(--data)',opacity:.3},bub));
  const dots=el('g',{},s);Object.entries(CITIES).forEach(([n,[la,lo]])=>{el('circle',{cx:MX(lo),cy:MY(la),r:4,fill:'var(--ink)'},dots);t_(dots,MX(lo)+6,MY(la)+4,n,{'font-size':10.5});});
  const air=el('g',{},s);['Port Harcourt','Calabar','Enugu','Lagos','Abuja','Kano'].forEach(c=>t_(air,MX(CITIES[c][1])-4,MY(CITIES[c][0])-8,'✈',{'font-size':14,'text-anchor':'end',fill:'var(--data)'}));
  const pol=el('g',{},s);el('path',{d:`M${MX(5.75)} ${MY(5.52)} Q ${MX(8)} ${MY(9)} ${MX(8.52)} ${MY(12)}`,fill:'none',stroke:'var(--err)','stroke-width':3,'stroke-dasharray':'8 5'},pol);t_(pol,MX(8.4),MY(9.4),'crude hauled far inland',{'font-size':11,'font-weight':700,fill:'var(--err)'});t_(pol,MX(8.4),MY(9.4)+14,'→ refinery may run at a loss',{'font-size':11,fill:'var(--err)'});
  const nd=el('g',{},s);el('ellipse',{cx:MX(6.4),cy:MY(5.1),rx:90,ry:36,fill:'var(--org-soft)',stroke:'var(--org)','stroke-dasharray':'5 4'},nd);t_(nd,MX(6.4),MY(4.45),'Niger Delta: intervention projects',{'text-anchor':'middle','font-size':11,'font-weight':700,fill:'var(--org)'});
  const panel=el('g',{},s);box(panel,14,14,572,80,'var(--card)','var(--line)',10);const pT=t_(panel,30,38,'',{'font-size':14,'font-weight':700});const pL=[0,1,2].map(i=>t_(panel,30,58+i*15,'',{'font-size':11.5}));
  const info=[['Location factors','Private projects: economic guidelines.','Public projects: may not be profit-driven.',''],['1 Nearness to markets','Businesses follow their markets:','bubbles show 2006 census population','(Kano 9.4m, Lagos 9.0m, Kaduna 6.1m)'],['2 Raw materials','Raw materials can be over 80% of a','product: coal at Enugu, cocoa in the','west, palm oil in the east, tea at Mambilla'],['3 Power supply','In manufacturing, electricity is','everything. Poor public power forces','firms to run costly generators'],['4 Water supply','Soft drinks and garri processing use','a lot of water',''],['5 Road networks','Move raw materials in and goods out;','good roads cut transport costs',''],['6 Rail system','Cheap haulage. Aba and Umuahia grew','as trading posts along the line',''],['7 Airports','Port Harcourt, Calabar and Enugu','enjoy air links and faster growth',''],['8 Land','Plantations and cassava farms for','garri plants need vast land',''],['9 Political considerations','Not always economic: a refinery','far from crude may run at a loss',''],['10 Intervention projects','Located to correct uneven development,','e.g. the Niger Delta','']];
  return {update(t){const k=Math.min(10,Math.floor(t));const f=info[k];pT.textContent=f[0];pL.forEach((l,i)=>l.textContent=f[i+1]);
    bEls.forEach((b,i)=>H.set(b,{r:pops[Object.keys(pops)[i]]*4.5*H.es(t,1,1.5)*(k===1?1:.0001)}));
    [zCocoa,zPalm,zCoal,zTea].forEach(z=>H.op(z,k===2||k===8?1:0));H.op(rail,k===6?1:0);H.op(air,k===7?1:0);H.op(pol,k===9?1:0);H.op(nd,k===10?1:0);
  }};
}
const LOCF=['Markets','Raw materials','Power','Water','Roads','Rail','Airport','Land'];
const SITES={Lagos:[10,3,6,7,7,6,10,3],Onitsha:[8,6,5,7,6,4,5,5],Kano:[9,6,5,5,7,8,8,8],'Port Harcourt':[7,7,6,8,6,6,8,4],Enugu:[6,7,5,6,6,7,7,6],Ibadan:[8,8,5,6,8,7,4,7]};
const PTYPES={bottling:['Table water bottling',[8,2,7,10,6,2,1,2]],cocoa:['Cocoa processing',[3,10,7,6,7,6,1,5]],palm:['Palm oil mill',[3,10,4,7,6,3,1,8]],bank:['Bank branch',[10,0,6,2,5,1,3,1]]};
Course.add({id:'1.3',module:1,title:'Factors Affecting the Location of Projects',vizLabel:'A dot map of Nigerian cities and resources',
  hook:{who:'Musa, investor',text:'Musa wants to build a cocoa processing plant. His brother says Lagos, because “that is where business is”. His engineer says near the cocoa farms. Who is right?'},
  objectives:['Explain the factors that affect where projects are located','Give Nigerian examples of each factor','Recognise political and intervention-driven locations'],
  steps:[
    {h:'Projects locate by guidelines',t:'<p>Private sector projects locate on economic guidelines set by the firm. Public sector projects may follow different guidelines and need not be profit-driven. The map plots major Nigerian cities by latitude and longitude.</p>'},
    {h:'1. Nearness to markets',t:'<p>A business profits when third parties buy its output, so <b>businesses follow their markets</b>. Most of the population lives in Lagos, Kano, Onitsha, Port Harcourt, Ibadan, Abuja and similar centres. Bubbles show 2006 census state populations.</p>'},
    {h:'2. Nearness to raw materials',t:'<p>For manufacturers, raw materials can be over 80% of a product, so distance means transport cost. Hence the Nigerian Coal Corporation at Enugu, cocoa processors in the west, oil mills in the east, and tea at the Mambilla Plateau. Service projects can ignore this factor.</p>'},
    {h:'3. Nearness to power supply',t:'<p>In manufacturing, electricity is everything: mixing, machines, motors. Interruptions break production schedules, fail deliveries and lose customers. Poor public supply forces firms to run their own costly generators.</p>'},
    {h:'4. Nearness to water supply',t:'<p>Soft drink makers and garri processors use large volumes of water and are drawn to areas with plentiful supply.</p>'},
    {h:'5. Good road networks',t:'<p>Roads move raw materials to factories and finished goods to markets. Good roads cut transport costs and attract investors.</p>'},
    {h:'6. A good rail system',t:'<p>Rail gives cheap haulage of raw materials and goods. Trading towns grew along the lines: Aba and Umuahia enjoy good trade because they sit on the eastern rail route.</p>'},
    {h:'7. Nearness to airports',t:'<p>Airports speed the movement of people. Towns with air links, such as Port Harcourt, Calabar and Enugu, tend to grow faster.</p>'},
    {h:'8. Availability of land',t:'<p>Land is one of the four factors of production, and it dominates large agricultural projects: oil palm plantations and the cassava farms that feed garri plants need vast areas.</p>'},
    {h:'9. Political considerations',t:'<p>Not every project is located on economic merit. A refinery sited far from crude oil sources may operate at a loss because of the cost of transporting crude.</p>'},
    {h:'10. Intervention projects',t:'<p>Projects placed in specific areas to correct unequal distribution of resources. The Niger Delta produces most of Nigeria’s oil revenue, and government is now focusing development projects there.</p>'}
  ],
  scene:locScene,
  sandboxIntro:'Pick a project type and see which candidate city scores best on the location factors.',
  sandbox(ctl,st){
    const s=H.svg(st,520,300);let ty='cocoa';const ro=H.readout(ctl);
    H.segBtns(ctl,'Project type',Object.entries(PTYPES).map(([k,v])=>[k,v[0]]),'cocoa',v=>{ty=v;draw();});
    function draw(){s.innerHTML='';const w=PTYPES[ty][1],tw=w.reduce((a,b)=>a+b,0);const sc=Object.entries(SITES).map(([c,v])=>[c,v.reduce((a,x,i)=>a+x*w[i],0)/tw]).sort((a,b)=>b[1]-a[1]);
      sc.forEach(([c,v],i)=>{const y=14+i*46;t_(s,10,y+22,c,{'font-size':13,'font-weight':700});el('rect',{x:130,y:y+6,width:340,height:24,rx:4,fill:'var(--sunk)'},s);el('rect',{x:130,y:y+6,width:340*v/10,height:24,rx:4,fill:i===0?'var(--org)':'var(--data-soft)'},s);t_(s,478,y+23,v.toFixed(1),{'font-size':12,class:'mono'});});
      const top=LOCF.map((f,i)=>[f,w[i]]).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0].toLowerCase()).join(', ');
      ro.innerHTML=`Best site: <b>${sc[0][0]}</b>.<br>For a ${PTYPES[ty][0].toLowerCase()}, the heaviest factors are ${top}.`;}
    draw();H.tag(st,'Illustrative site scores');
  },
  sae:{q:'List and discuss four factors that have influenced the location of industrial projects in your present environment.',a:'Model structure: name four industries near you and link each to a factor, e.g. a bottling plant near a reliable water source; a food processor near its farms; a distributor near a major market; a factory along a good highway or rail line. Explain the cost or revenue advantage each location gives.'},
  tma:{q:'Mention and discuss four factors likely to influence the location of projects in Nigeria.',outline:['Nearness to markets: businesses follow population centres','Nearness to raw materials: transport cost; Enugu coal, western cocoa, eastern palm oil, Mambilla tea','Power supply: generators raise costs; schedules and customers','Transport: roads, rail (Aba, Umuahia), airports','Also: water, land, political considerations, intervention projects']},
  quiz:[
    {q:'Why is the Nigerian Coal Corporation located at Enugu?',o:['Near markets','Near its raw material, coal','For political reasons','Near an airport'],a:1,w:'It sits close to the source of coal.'},
    {q:'Aba and Umuahia became trading towns largely because they are…',o:['Near airports','On the railway line','State capitals','Near oil fields'],a:1,w:'The course says trading locations followed the railway system.'},
    {q:'An intervention project is one that is…',o:['Located purely for profit','Located to correct inequalities in resource distribution','Built by foreign investors','Near raw materials'],a:1,w:'Example: development projects in the Niger Delta.'},
    {q:'Which type of project can largely ignore nearness to raw materials?',o:['Cocoa processing','Palm oil mill','Service-based projects such as banks','Coal mining'],a:2,w:'Service-based projects can locate without reference to a raw material source.'}
  ],
  card:[{h:'Ten location factors',ordered:true,items:['Nearness to markets','Nearness to raw materials','Nearness to power supply','Nearness to water supply','Good road networks','A good rail system','Nearness to airports','Availability of land','Political considerations','Intervention projects']}]
});

/* ================= 1.4 ================= */
function capScene(stage){
  H.cap(stage,'Vegetable oil refinery: from installed to proposed capacity');
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);const gx=300,gy=250,GR=150;
  el('path',{d:`M${gx-GR} ${gy} A ${GR} ${GR} 0 0 1 ${gx+GR} ${gy}`,fill:'none',stroke:'var(--sunk)','stroke-width':26},A);
  const arcI=el('path',{fill:'none',stroke:'var(--data-soft)','stroke-width':26},A),arcA=el('path',{fill:'none',stroke:'var(--org)','stroke-width':26},A);
  const needle=el('line',{x1:gx,y1:gy,stroke:'var(--ink)','stroke-width':4,'stroke-linecap':'round'},A);el('circle',{cx:gx,cy:gy,r:9,fill:'var(--ink)'},A);
  [0,50,100,150,200].forEach(v=>{const a=Math.PI*(1-v/200);t_(A,gx+Math.cos(a)*(GR+28),gy-Math.sin(a)*(GR+28)+4,String(v),{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});});
  t_(A,gx,gy+40,'km per hour',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});const aT=t_(A,gx,70,'',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const arcP=(v)=>{const a=Math.PI*(1-v/200);return `M${gx-GR} ${gy} A ${GR} ${GR} 0 0 1 ${gx+Math.cos(a)*GR} ${gy-Math.sin(a)*GR}`;};
  // bars
  const B=tab(s);tabs.push([B,1,5]);const bx=170,bw=380,max=18250;const bars=[['Installed','50 t/day × 365 days',18250,'var(--data-soft)'],['Attainable','90% of installed',16425,'var(--data)'],['Proposed','2 shifts × 10 h × 300 days',12498,'var(--org)'],['Actual','what the market and finance allow',11000,'var(--emp)']];
  const bEls=bars.map(([a,b,v,c],i)=>{const y=60+i*72;t_(B,bx-12,y+20,a,{'text-anchor':'end','font-size':14,'font-weight':700});t_(B,bx-12,y+36,b,{'text-anchor':'end','font-size':10,fill:'var(--muted)'});el('rect',{x:bx,y,width:bw,height:40,rx:5,fill:'var(--sunk)'},B);const r=el('rect',{x:bx,y,height:40,rx:5,fill:c},B);const tx=t_(B,bx+8,y+26,'',{'font-size':13,'font-weight':700,class:'mono',fill:i===0?'var(--ink)':'var(--card)'});return {r,tx,v};});
  const clock=el('g',{},B);const ccx=90,ccy=380;el('circle',{cx:ccx,cy:ccy,r:34,fill:'var(--sunk)'},clock);const sh=(a0,a1,c)=>{const p=a=>[ccx+Math.cos(a)*34,ccy+Math.sin(a)*34];const A0=-Math.PI/2+a0/24*2*Math.PI,A1=-Math.PI/2+a1/24*2*Math.PI;const [x0,y0]=p(A0),[x1,y1]=p(A1);el('path',{d:`M${ccx} ${ccy} L${x0} ${y0} A34 34 0 0 1 ${x1} ${y1}Z`,fill:c},clock);};sh(6,16,'var(--org)');sh(16,26,'var(--org-soft)');t_(clock,ccx,ccy+50,'2 × 10-hour shifts',{'text-anchor':'middle','font-size':10.5});
  const bNote=t_(B,350,426,'',{'text-anchor':'middle','font-size':12});
  // sankey
  const C=tab(s);tabs.push([C,5,6,true]);t_(C,300,36,'Annual input–output (tons)',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const sc=v=>v/32889.6*300;const node=(x,y,h,lab,val,c)=>{el('rect',{x,y,width:16,height:h,fill:c},C);t_(C,x+22,y+h/2,lab,{'font-size':12,'font-weight':700});t_(C,x+22,y+h/2+15,n(val),{'font-size':11,class:'mono',fill:'var(--muted)'});};
  const band=(x0,y0,h0,x1,y1,c)=>el('path',{d:`M${x0} ${y0} C ${(x0+x1)/2} ${y0} ${(x0+x1)/2} ${y1} ${x1} ${y1} L ${x1} ${y1+h0} C ${(x0+x1)/2} ${y1+h0} ${(x0+x1)/2} ${y0+h0} ${x0} ${y0+h0} Z`,fill:c,opacity:.35},C);
  const hK=sc(32889.6),hO=sc(13155.84),hC=sc(18418),hS=sc(1315);node(30,70,hK,'','',  'var(--emp)');t_(C,30,62,'Palm kernel 32,889.6',{'font-size':12,'font-weight':700});
  const flows=el('g',{},C);
  band(46,70,hO,230,60,'var(--org)');band(46,70+hO,hC,230,60+hO+30,'var(--emp)');band(46,70+hO+hC,hS,230,60+hO+hC+60,'var(--muted)');
  node(230,60,hO,'Palm kernel oil (PKO)',13155.84,'var(--org)');node(230,60+hO+30,hC,'Palm kernel cake → feed mills',18418,'var(--emp)');node(230,60+hO+hC+60,hS,'Sludge → soap makers',1315,'var(--muted)');
  const hV=hO*12498/13155.84,hF=hO-hV;band(246,60,hV,440,50,'var(--org)');band(246,60+hV,hF,440,50+hV+24,'var(--data)');
  node(440,50,hV,'Refined vegetable oil',12498,'var(--org)');node(440,50+hV+24,Math.max(3,hF),'Fatty acid → soap',657.84,'var(--data)');
  t_(C,138,400,'Stage 1: crushing',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});t_(C,343,400,'Stage 2: refining',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});
  return {update(t){showTabs(tabs,t);const k=Math.floor(t);
    const ai=H.es(t,.1,.45),aa=H.es(t,.5,.85);H.set(arcI,{d:arcP(200*ai)});H.set(arcA,{d:arcP(100*aa)});const v=aa>0?H.lerp(200,100,aa):200*ai;const a=Math.PI*(1-v/200);H.set(needle,{x2:gx+Math.cos(a)*(GR-20),y2:gy-Math.sin(a)*(GR-20)});
    aT.textContent=aa>.3?'Attainable: 100 km/h, the speed a sane person drives':'Installed: 200 km/h, the manufacturer’s maximum';
    bEls.forEach((b,i)=>{const p=H.es(t,1+i,1.6+i);H.set(b.r,{width:bw*b.v/max*p});b.tx.textContent=p>.6?(i===3?'≤ proposed':n(b.v)+' t'):'';});H.op(clock,k===3?1:0);
    bNote.textContent=k===1?'Installed capacity: 50 tons per day × 365 days':k===2?'Allow for servicing, repairs and shift changes: 90%':k===3?'50 t ÷ 24 h × 10 h = 20.83 t per shift; × 2 = 41.66 t/day × 300 days':k===4?'A plant should produce only what it can sell and finance':'';
  }};
}
Course.add({id:'1.4',module:1,title:'Capacity and Production Planning',vizLabel:'Capacity bars and a palm kernel flow',
  hook:{who:'Ifeoma, project promoter',text:'Ifeoma’s refinery machine is rated at 50 tons a day. Her bank wants a production plan before it lends. Should she promise 18,250 tons a year? The course’s own worked example shows why not.'},
  objectives:['Distinguish installed, attainable and actual capacity','Build a production plan from capacity, shifts and working days','Read an input–output analysis'],
  steps:[
    {h:'Installed vs attainable: the car analogy',t:'<p>Capacity is the output of a plant or machine. A Mercedes Benz with a 200 km/h limit has an <b>installed capacity</b> of 200 km/h. Nobody sane drives at that; 100 km/h is a safe speed: its <b>attainable capacity</b>.</p>'},
    {h:'Installed capacity',t:'<p>The maximum output the plant can produce, given by the equipment manufacturer, usually stated per year. The refinery is rated at 50 tons per day of 24 hours: <b>50 × 365 = 18,250 tons</b> a year.</p>'},
    {h:'Attainable capacity',t:'<p>No machine runs 60 minutes an hour, 24 hours a day, 365 days a year. Servicing, shift changes and repairs cut output. In the example attainable capacity is <b>90%</b> of installed: <b>16,425 tons</b>.</p>'},
    {h:'Proposed capacity: the production plan',t:'<p>One 10-hour shift yields 20.83 tons; two shifts yield 41.66 tons a day. The plant runs <b>300 working days</b> to allow for repairs, servicing and public holidays: <b>41.66 × 300 = 12,498 tons</b> a year.</p>'},
    {h:'Actual capacity',t:'<p>The real output given the market. A plant should produce only what it can sell, and finance for raw materials also limits output.</p>'},
    {h:'Input–output: what the plant turns into what',t:'<p><b>Stage 1</b> crushes 32,889.6 tons of palm kernel into palm kernel oil, cake (sold to feed mills) and sludge (sold to soap makers). <b>Stage 2</b> refines the oil into 12,498 tons of edible vegetable oil plus fatty acid, also sold to soap makers.</p>'}
  ],
  scene:capScene,
  sandboxIntro:'Build your own production plan. Defaults are the course’s refinery.',
  sandbox(ctl,st){
    const s=H.svg(st,520,260);const p={d:50,a:90,sh:2,h:10,w:300};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s14d',label:'Rated output per 24-hour day',min:5,max:200,step:5,value:50,fmt:v=>v+' t'},v=>{p.d=v;draw();});
    H.slider(ctl,{id:'s14a',label:'Attainable as % of installed',min:50,max:100,value:90,fmt:v=>v+'%'},v=>{p.a=v;draw();});
    H.slider(ctl,{id:'s14s',label:'Shifts per day',min:1,max:3,value:2},v=>{p.sh=v;draw();});
    H.slider(ctl,{id:'s14h',label:'Hours per shift',min:4,max:12,value:10,fmt:v=>v+' h'},v=>{p.h=v;draw();});
    H.slider(ctl,{id:'s14w',label:'Working days per year',min:200,max:365,step:5,value:300},v=>{p.w=v;draw();});
    function draw(){s.innerHTML='';const inst=p.d*365,att=inst*p.a/100,prop=Math.min(p.d,p.d/24*p.h*p.sh)*p.w;
      [['Installed',inst,'var(--data-soft)'],['Attainable',att,'var(--data)'],['Proposed',prop,'var(--org)']].forEach(([l,v,c],i)=>{const y=20+i*76;t_(s,10,y+26,l,{'font-size':13,'font-weight':700});el('rect',{x:110,y,width:380,height:40,rx:5,fill:'var(--sunk)'},s);el('rect',{x:110,y,width:380*v/inst,height:40,rx:5,fill:c},s);t_(s,118,y+26,n(v)+' t',{'font-size':13,'font-weight':700,class:'mono',fill:i?'var(--card)':'var(--ink)'});});
      ro.innerHTML=`Proposed = ${p.d} ÷ 24 × ${p.h} h × ${p.sh} shift${p.sh>1?'s':''} × ${p.w} days = <b>${n(prop)} tons</b> (${Math.round(100*prop/inst)}% of installed).${prop>att?'<br><span style="color:var(--err)">The plan exceeds attainable capacity: not realistic.</span>':''}`;}
    draw();
  },
  sae:{q:'A plant can produce 2,000 sachets of water per hour, all things being equal. What is its installed capacity per annum?',a:'2,000 × 24 hours × 365 days = <b>17,520,000 sachets</b> a year. (Installed capacity assumes the machine could run every hour of every day.)'},
  tma:{q:'What is the installed capacity of a plant, and how is it different from attainable capacity?',outline:['Installed: maximum output the manufacturer says the plant can produce; usually stated per year','Example: 50 t/day × 365 = 18,250 t','Attainable: realistic output after servicing, repairs and shift changes; e.g. 90% = 16,425 t','Car analogy: 200 km/h vs a safe 100 km/h','Also contrast actual capacity: limited by market and finance']},
  quiz:[
    {q:'The refinery is rated at 50 tons/day. Its installed annual capacity is…',o:['12,498 t','15,000 t','16,425 t','18,250 t'],a:3,w:'50 × 365 = 18,250 tons.'},
    {q:'Why is proposed capacity (12,498 t) lower than attainable (16,425 t)?',o:['The machine is broken','Two 10-hour shifts on 300 working days','Tax rules','Raw materials are imported'],a:1,w:'41.66 t/day × 300 days = 12,498 t.'},
    {q:'Actual capacity depends mainly on…',o:['The manufacturer’s rating','What the market will buy and available finance','The number of directors','Location of the head office'],a:1,w:'A plant should produce only what it can sell; finance also limits it.'},
    {q:'In the example, palm kernel cake is sold to…',o:['Soap makers','Feed mills','Breweries','Exporters only'],a:1,w:'PKC is a major ingredient in animal feed. Sludge and fatty acid go to soap makers.'}
  ],
  card:[{h:'Three capacities',items:['Installed: manufacturer’s maximum','Attainable: after servicing and repairs (e.g. 90%)','Actual: what the market and finance allow']},{h:'Course refinery figures',items:['Installed 18,250 t (50 t × 365)','Attainable 16,425 t (90%)','Proposed 12,498 t (41.66 t × 300 days)','Inputs: 32,889.6 t palm kernel']}]
});

/* ================= 1.5 ================= */
const MACH=[['Steriliser',-6,'boiled ~30 min under steam'],['Rotary stripper',-2,'strips fruit at ~110 °C'],['Digester',2,'beats fruit into a paste'],['Clarifier',6,'separates oil from water']];
function engScene(stage){
  H.cap(stage,'Engineering evaluation: a palm oil mill');
  let T=0;
  const o=H.c3(stage,{yaw:-.35,pitch:.45,dist:20,f:1.1,spin:0,render(ctx,o){const C=o.col;const vis=H.es(T,3.9,4.1)*(1-H.es(T,7.9,8.05));if(vis<=0)return;ctx.globalAlpha=vis;
    const faces=[];const k=Math.floor(T)-4;MACH.forEach(([n,x],i)=>{faces.push(...H.c3box(o,[x,1,0],[2.4,i===0?2.6:i===3?2.2:1.8,2],i===k?C.org:C['org-soft']));});H.c3faces(ctx,faces,C.line);
    H.c3line(ctx,o,[-8,0,0],[8,0,0],C.line,2);for(let i=0;i<3;i++)H.c3line(ctx,o,[MACH[i][1]+1.2,.6,0],[MACH[i+1][1]-1.2,.6,0],C.muted,3);
    MACH.forEach(([n,x],i)=>{H.c3text(ctx,o,[x,-1,1.6],n,i===k?C.org:C.ink,13);});
    const pp=H.clamp(T-4,0,3.99);const seg=Math.floor(pp),fr=pp-seg;const x=H.lerp(MACH[seg][1],seg<3?MACH[seg+1][1]:MACH[3][1]+2,H.ease(Math.min(1,fr*1.4)));const q=o.proj([x,2.8,0]);ctx.fillStyle=seg>=3&&fr>.5?C.emp:seg>=2?C.emp:C.err;ctx.beginPath();ctx.arc(q[0],q[1],Math.max(6,.35*q[3]),0,7);ctx.fill();
    if(k>=0&&k<4)H.c3text(ctx,o,[MACH[k][1],3.9,0],MACH[k][2],C.ink,13);ctx.globalAlpha=1;}});
  const ov=H.h('div',{style:'position:absolute;inset:0;pointer-events:none'});stage.append(ov);const s=H.svg(ov,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);box(A,40,60,520,330,'var(--card)','var(--line)',12);t_(A,300,96,'Engineering evaluation',{'text-anchor':'middle','font-size':17,'font-weight':700});
  wrap(A,70,130,'Break down, in simple terms, the engineering feasibility of a project. For a manufacturing project it entails:',62,{'font-size':13});['Identification of plant and equipment','Identification of the necessary raw materials','The production process'].forEach((x,i)=>{box(A,90,170+i*56,420,42,'var(--org-soft)','none',21);t_(A,110,196+i*56,`${i+1}. ${x}`,{'font-size':13.5,'font-weight':700});});
  const B=tab(s);tabs.push([B,1,2]);el('circle',{cx:300,cy:230,r:62,fill:'var(--org)'},B);t_(B,300,226,'Engineering',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--card)'});t_(B,300,243,'evaluation',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--card)'});
  [['Machinery and equipment',300,90],['Civil engineering',120,230],['Utilities',480,230],['Electrical and mechanical',300,370]].forEach(([n,x,y])=>{el('line',{x1:300,y1:230,x2:x,y2:y,stroke:'var(--line)','stroke-width':3},B);box(B,x-95,y-22,190,44,'var(--org-soft)','none',22);t_(B,x,y+5,n,{'text-anchor':'middle','font-size':12.5,'font-weight':700});});
  t_(B,300,40,'Components of engineering evaluation (Figure 4)',{'text-anchor':'middle','font-size':14,'font-weight':700});
  const Cc=tab(s);tabs.push([Cc,2,3]);box(Cc,40,40,520,370,'var(--card)','var(--line)',12);t_(Cc,300,70,'What the vendor should tell you about a machine',{'text-anchor':'middle','font-size':15,'font-weight':700});
  ['Components','Installed capacity','Attainable capacity','Electricity consumption','Heating power','Weight and dimensions','Material (e.g. steel)','Screw speed','Compressed air needed','Water quantity and temperature','Power voltage and capacity','Material feeder type','Clamping method and force','Production process'].forEach((x,i)=>{const c=i%2,r=Math.floor(i/2);t_(Cc,70+c*250,104+r*40,'▸ '+x,{'font-size':12.5});});
  const D=tab(s);tabs.push([D,3,4]);box(D,40,60,520,330,'var(--card)','var(--line)',12);t_(D,300,96,'Technical support and maintenance',{'text-anchor':'middle','font-size':16,'font-weight':700});
  wrap(D,70,134,'Technical businesses need machines at maximum efficiency: routine servicing, plus repairs when breakdowns occur. A small business can arrange support from an engineering firm that repairs machinery and generators.',62,{'font-size':13});
  const pts=[];for(let i=0;i<=40;i++){const x=i/40;pts.push([90+420*x,350-110*(x<.5?1-.6*x:.7-.6*(x-.5)+(x>.55?.5:0))]);}
  el('path',{d:H.path(pts),fill:'none',stroke:'var(--org)','stroke-width':3},D);t_(D,300,372,'efficiency drifts down; servicing restores it',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});
  const E=tab(s);tabs.push([E,8,9,true]);t_(E,300,40,'A total engineering overview of a mining project',{'text-anchor':'middle','font-size':15,'font-weight':700});
  [['Stage 1: infrastructure',['Rail link','Roads','Airport','Mining complex','Water and sewerage','Power generation']],['Stage 2: plant',['Mine','Smelter','Semi-finished goods','Mine offices','Workshop','Refinery']],['Stage 3: equipment',['Ore bin','Ore crushers','Conveyors','Cranes','Main building','Sulphuric acid tanks']]].forEach(([h,it],i)=>{const y=64+i*122;box(E,30,y,540,108,'var(--org-soft)','none',12);t_(E,48,y+26,h,{'font-size':13.5,'font-weight':700,fill:'var(--org)'});it.forEach((x,j)=>{box(E,48+(j%3)*174,y+40+Math.floor(j/3)*32,164,26,'var(--card)','none',13);t_(E,130+(j%3)*174,y+58+Math.floor(j/3)*32,x,{'text-anchor':'middle','font-size':11.5});});});
  return {update(t){T=t;o.dirty=true;showTabs(tabs,t);}};
}
Course.add({id:'1.5',module:1,title:'The Concept of Engineering Evaluation',vizLabel:'A 3D palm oil mill line',
  hook:{who:'Tobi, small-scale investor',text:'Tobi has found a supplier selling a “complete palm oil mill” for a good price. The brochure has photos but few numbers. What must an evaluator know about the machines before saying yes?'},
  objectives:['Explain the purpose of engineering evaluation','Name its components','List the plant information an evaluator needs','Follow a production process from start to finish'],
  steps:[
    {h:'What engineering evaluation does',t:'<p>It evaluates and breaks down, in simple terms, the <b>engineering feasibility</b> of a project. In manufacturing it covers the plant and equipment, the raw materials, and the production process.</p>'},
    {h:'Four components',t:'<p>Machinery and equipment; civil engineering; utilities; and electrical and mechanical engineering (the course’s Figure 4).</p>'},
    {h:'Identifying plant and equipment',t:'<p>Apart from land and buildings, the plant and machinery matter most. The vendor should give enough detail for the evaluator to judge feasibility: capacities, power and water needs, dimensions, materials, the production process and more.</p>'},
    {h:'Technical support and maintenance',t:'<p>Machines must run at maximum efficiency, which means routine servicing and prompt repairs. Small businesses can contract an engineering firm for repairs to machinery and generators.</p>'},
    {h:'Palm oil, step 1: steriliser',t:'<p>Quartered fresh fruit bunches go into the boiler/steriliser for about <b>30 minutes</b> under hot steam. Raw material is unlikely to be a problem: the fruit comes from the oil palm. The course advises the high-yielding <b>tenera</b> variety.</p>'},
    {h:'Step 2: rotary stripper',t:'<p>The stripper strips the fruits from the bunches while they are still at about <b>110 °C</b>.</p>'},
    {h:'Step 3: digester',t:'<p>Loose fruits go into the horizontal digester for maceration: they are beaten into a paste.</p>'},
    {h:'Step 4: clarifier',t:'<p>Hot water forces the paste into the clarifier, where oil separates from water and palm oil is collected from a tap.</p>'},
    {h:'A larger example: a mining project',t:'<p>Big projects need a total engineering overview: infrastructure (rail, roads, airport, water, power), the main plant (mine, smelter, refinery, workshops) and equipment (crushers, conveyors, cranes, acid tanks). A further checklist covers site design, surveying, safety, piping, electrical, instrumentation and security.</p>'}
  ],
  scene:engScene,
  sandboxIntro:'Check a vendor’s machine against the course’s plant and machinery checklist.',
  sandbox(ctl,st){checklist(ctl,st,[['Capacity and performance',['Components','Installed capacity','Attainable capacity','Thickness of product','Screw speed','Production process']],['Utilities',['Electricity consumption','Heating power','Compressed air','Water quantity and quality','Water temperature','Power voltage and capacity']],['Physical',['Overall weight','Length, width and height','Material used (e.g. steel)','Structure','Material feeder type','Take-up force','Clamping method and force']]],'machine assessment');},
  sae:{q:'List and discuss three pieces of information about a manufacturing plant that are important to a project evaluator.',a:['Installed and attainable capacity: to build the production plan.','Utility needs (electricity, water, compressed air): to cost utilities and check the site can supply them.','The production process: to confirm the plant can actually make the product to standard.']},
  tma:{q:'Why is the engineering evaluation of a project important?',outline:['Define it: simple breakdown of engineering feasibility','Confirms plant and equipment can deliver the planned capacity','Identifies raw material and utility needs that drive costs','Checks the production process and maintenance arrangements','Feeds cost analysis, production plans and financial projections']},
  quiz:[
    {q:'In the palm oil process, what happens in the digester?',o:['Bunches are sterilised','Fruit is beaten into a paste','Oil is separated from water','Fruit is stripped from bunches'],a:1,w:'The digester macerates the fruit into a paste.'},
    {q:'For how long are fruit bunches sterilised under steam?',o:['About 5 minutes','About 30 minutes','About 2 hours','Overnight'],a:1,w:'About 30 minutes, according to the course.'},
    {q:'Which is one of the four components of engineering evaluation?',o:['Marketing','Utilities','Taxation','Recruitment'],a:1,w:'Machinery and equipment, civil engineering, utilities, electrical and mechanical.'}
  ],
  card:[{h:'Engineering evaluation covers',items:['Plant and equipment','Raw materials','Production process']},{h:'Components',items:['Machinery and equipment','Civil engineering','Utilities','Electrical and mechanical']},{h:'Palm oil process',ordered:true,items:['Steriliser (~30 min)','Rotary stripper (~110 °C)','Digester (paste)','Clarifier (oil from water)']}]
});
})();
