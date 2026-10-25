/* MBA 851 Module 3 — projected statements, evaluation criteria, economic analysis */
(function(){
const {H}=Course, el=H.el, t_=H.t;
const tab=s=>el('g',{},s);
const box=(g,x,y,w,h,fill='var(--card)',stroke='var(--line)',rx=8)=>el('rect',{x,y,width:w,height:h,rx,fill,stroke},g);
const wrap=(g,x,y,str,max=28,a={})=>{const words=str.split(' ');let line='',ly=y;const lh=a.lh||15;words.forEach(w=>{if((line+' '+w).trim().length>max){t_(g,x,ly,line.trim(),a);line=w;ly+=lh;}else line+=' '+w;});if(line.trim())t_(g,x,ly,line.trim(),a);return ly;};
const showTabs=(tabs,t)=>tabs.forEach(([g,a,b,last])=>H.op(g,H.es(t,a-.12,a+.1)*(last?1:(1-H.es(t,b-.1,b+.05)))));
const N=v=>(v<0?'−':'')+'₦'+Math.abs(Math.round(v)).toLocaleString('en-NG');const n=v=>Math.round(v).toLocaleString('en-NG');
const M=v=>(v<0?'−':'')+'₦'+(Math.abs(v)/1e6).toFixed(1)+'m';
const npv=(r,c0,cf)=>-c0+cf.reduce((a,c,i)=>a+c/Math.pow(1+r,i+1),0);
const irr=(c0,cf)=>{let lo=-.99,hi=10;if(npv(lo,c0,cf)*npv(hi,c0,cf)>0)return null;for(let i=0;i<200;i++){const m=(lo+hi)/2;if(npv(m,c0,cf)>0)lo=m;else hi=m;}return (lo+hi)/2;};

/* ================= 3.1 ================= */
const WF=[['Sales',1975344000,'t'],['Cost of sales',-1566320178,'d'],['Gross profit',409023822,'s'],['Selling and distribution',-10265716,'d'],['Administrative',-32263476,'d'],['Profit before tax',366494630,'s'],['Tax provision',-117278281,'d'],['Profit after tax',249216349,'s']];
function incomeScene(stage){
  H.cap(stage,'Projected income statement, Year 1 (2007)');
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);t_(A,300,40,'Who uses a projected income statement?',{'text-anchor':'middle','font-size':15,'font-weight':700});
  [['Owners / sponsors','expected revenues, profit and their dividends'],['Management','the plan handed down as a guide'],['Financial institutions','profitability and ability to repay with interest'],['Potential investors','whether to invest in the firm']].forEach(([a,b],i)=>{const c=i%2,r=Math.floor(i/2);box(A,40+c*270,70+r*170,250,150,'var(--org-soft)','none',14);H.person(A,165+c*270,120+r*170,'var(--org)',2.2);t_(A,165+c*270,165+r*170,a,{'text-anchor':'middle','font-size':14,'font-weight':700});wrap(A,165+c*270,186+r*170,b,30,{'text-anchor':'middle','font-size':12});});
  const B=tab(s);tabs.push([B,1,2]);t_(B,300,36,'Revenue = quantity × price',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const rv=[['Refined vegetable oil',12498,145000],['Palm kernel cake',18418,5000],['Palm kernel sludge',1315,4000],['Fatty acid',657.84,100000]];const rB=rv.map(([p,q,pr],i)=>{const y=70+i*70;t_(B,40,y+14,p,{'font-size':13,'font-weight':700});t_(B,40,y+32,`${n(q)} t × ₦${n(pr)}`,{'font-size':11.5,fill:'var(--muted)',class:'mono'});const r=el('rect',{x:240,y:y,height:34,rx:4,fill:'var(--org)'},B);const tx=t_(B,0,y+22,'',{'font-size':12,class:'mono','font-weight':700});return {r,tx,v:q*pr};});
  t_(B,300,370,'Total Year 1 revenue: ₦1,975,344,000',{'text-anchor':'middle','font-size':15,'font-weight':700});t_(B,300,394,'Bread example: 1,000,000 loaves × ₦100 = ₦100,000,000',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  const C=tab(s);tabs.push([C,2,3]);t_(C,300,44,'Cost or expense?',{'text-anchor':'middle','font-size':16,'font-weight':700});
  [['Cost','the outlay to acquire an asset: buying a delivery van','var(--data-soft)'],['Expense','the cost of earning revenue: fuel the van burns','var(--emp-soft)']].forEach(([a,b,c],i)=>{box(C,40+i*270,80,250,200,c,'none',14);t_(C,165+i*270,120,a,{'text-anchor':'middle','font-size':18,'font-weight':700});wrap(C,165+i*270,160,b,28,{'text-anchor':'middle','font-size':13});});
  t_(C,300,330,'Project expenses from current prices: e.g. today’s diesel price',{'text-anchor':'middle','font-size':12.5});
  const D=tab(s);tabs.push([D,3,4]);t_(D,300,36,'Manufacturing account: cost of manufactured goods',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const mfg=[['Raw materials consumed',1539257610,'var(--emp)'],['Factory overheads',37062568,'var(--muted)']];const tot=1576320178;let acc=0;mfg.forEach(([l,v,c])=>{const w=500*v/tot;el('rect',{x:50+acc,y:120,width:Math.max(w,4),height:80,fill:c},D);acc+=w;});
  t_(D,50,105,'Raw materials ₦1,539,257,610 (98%)',{'font-size':12.5,'font-weight':700});t_(D,550,230,'overheads ₦37,062,568',{'font-size':12,'text-anchor':'end'});
  ['Diesel, oil and lubricant','Electricity','Plant repairs','Salaries and wages (factory)','Depreciation ₦17,248,071','… and others'].forEach((x,i)=>t_(D,330,262+i*20,'▸ '+x,{'font-size':11.5}));t_(D,50,290,'= ₦1,576,320,178',{'font-size':18,'font-weight':700,class:'mono'});
  const E=tab(s);tabs.push([E,4,6,true]);const eT=t_(E,300,32,'',{'text-anchor':'middle','font-size':15,'font-weight':700});const top=2.0e9,sy=v=>380-300*v/top;
  let run=0;const bars=WF.map(([l,v,k],i)=>{const x=40+i*68;let y0,y1;if(k==='t'||k==='s'){y0=0;y1=v;run=v;}else{y0=run+v;y1=run;run=run+v;}const r=el('rect',{x,width:54,rx:3,fill:k==='d'?'var(--err)':k==='t'?'var(--data)':'var(--org)'},E);const lab=wrap(E,x+27,400,l,11,{'text-anchor':'middle','font-size':9.5,lh:11});const tx=t_(E,x+27,0,'',{'text-anchor':'middle','font-size':10,'font-weight':700,class:'mono'});return {r,tx,y0,y1,v};});
  el('line',{x1:30,x2:590,y1:380,y2:380,stroke:'var(--muted)'},E);const eN=t_(E,300,56,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  return {update(t){showTabs(tabs,t);const k=Math.floor(t);
    const bp=H.es(t,1.1,1.7);rB.forEach(b=>{const w=320*b.v/1812210000*bp;H.set(b.r,{width:Math.max(2,w)});H.set(b.tx,{x:246+w});b.tx.textContent=bp>.8?M(b.v):'';});
    bars.forEach((b,i)=>{const p=H.es(t,4+i*.1,4.25+i*.1);const lo=Math.min(b.y0,b.y1),hi=Math.max(b.y0,b.y1);H.set(b.r,{y:sy(hi),height:Math.max(1,(sy(lo)-sy(hi))*p)});H.op(b.r,p>0?1:0);H.set(b.tx,{y:sy(hi)-6});b.tx.textContent=p>.8?M(b.v):'';});
    eT.textContent=k<5?'From sales to profit after tax':'Year 2 (2008): profit after tax ₦243,565,257';eN.textContent=k<5?'tax provision ≈ 32% of profit before tax':'Interest falls from ₦16m to ₦12m as the loan is repaid';
  }};
}
Course.add({id:'3.1',module:3,title:'Projected Income Statement',vizLabel:'A waterfall from sales to profit',
  hook:{who:'Amaka, bank credit analyst',text:'The refinery promoter claims ₦249 million profit in the first year. Amaka wants to see exactly how ₦1.98 billion of sales shrinks to that number, line by line.'},
  objectives:['Explain the projected income statement and its users','Project revenues from quantity and price','Distinguish costs from expenses','Read a projected manufacturing, trading and profit and loss account'],
  steps:[
    {h:'Who needs it',t:'<p>An income statement summarises revenues, expenses and net profit for a period. A <b>projected</b> income statement forecasts them. Users: owners and sponsors (profit and dividends), management (a guide), financial institutions (can the project repay the loan with interest?) and potential investors.</p>'},
    {h:'Projecting revenues',t:'<p>Revenues arise from manufacturing and selling, buying and reselling, services, or lending resources. Start from the known market price: 1,000,000 loaves at ₦100 is ₦100 million. The refinery sells 12,498 t of oil at ₦145,000 plus three by-products: <b>₦1,975,344,000</b> in Year 1. Banks often ask for 3 to 5 years.</p>'},
    {h:'Costs and expenses',t:'<p>A <b>cost</b> is the outlay to acquire an asset, like buying a car. An <b>expense</b> is the cost of earning revenue, like the fuel the car uses. Project expenses from current prices, such as today’s gas and oil prices.</p>'},
    {h:'The manufacturing account',t:'<p>Raw materials consumed (₦1.54 billion, mostly palm kernel) plus factory overheads (diesel, electricity, repairs, wages, depreciation) give the <b>cost of manufactured goods: ₦1,576,320,178</b>.</p>'},
    {h:'The waterfall to net profit',t:'<p>Sales ₦1.975bn, less cost of sales ₦1.566bn, gives <b>gross profit ₦409.0m</b>. Less selling and distribution (₦10.3m) and administrative expenses (₦32.3m, including ₦16m interest) gives <b>profit before tax ₦366.5m</b>. Less tax provision ₦117.3m gives <b>profit after tax ₦249.2m</b>.</p>'},
    {h:'Year 2',t:'<p>With the same sales and slightly higher costs, Year 2 profit after tax is ₦243,565,257. Interest drops as the loan is repaid.</p>'}
  ],
  scene:incomeScene,
  sandboxIntro:'Stress the refinery’s profit: change the oil price and the cost of raw materials.',
  sandbox(ctl,st){
    const s=H.svg(st,520,270);const p={pr:145000,rm:0};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s31p',label:'Refined oil price per ton',min:100000,max:200000,step:2500,value:145000,fmt:v=>'₦'+n(v)},v=>{p.pr=v;draw();});
    H.slider(ctl,{id:'s31r',label:'Raw material cost change',min:-20,max:30,value:0,fmt:v=>(v>0?'+':'')+v+'%'},v=>{p.rm=v;draw();});
    function draw(){s.innerHTML='';const sales=12498*p.pr+163134000,cos=1566320178+1539257610*p.rm/100,gp=sales-cos,pbt=gp-42529192,tax=Math.max(0,pbt*.32),pat=pbt-tax;
      const items=[['Sales',sales,'var(--data)'],['Gross profit',gp,'var(--org)'],['PBT',pbt,'var(--org)'],['PAT',pat,pat<0?'var(--err)':'var(--org)']];const mx=2.4e9;
      items.forEach(([l,v,c],i)=>{const y=20+i*60;t_(s,10,y+26,l,{'font-size':13,'font-weight':700});el('rect',{x:120,y:y+6,width:Math.max(2,360*Math.abs(v)/mx),height:32,rx:4,fill:c},s);t_(s,126+360*Math.abs(v)/mx,y+28,M(v),{'font-size':12,class:'mono'});});
      ro.innerHTML=`Profit after tax: <b>${N(pat)}</b> (course base: ₦249,216,349).<br>${pat<0?'<span style="color:var(--err)">The project makes a loss under these assumptions.</span>':`Margin: ${(100*pat/sales).toFixed(1)}% of sales.`}`;}
    draw();H.tag(st,'Model built on the course figures');
  },
  sae:{q:'List and explain four expense items that can be found in a projected income statement.',a:['Raw materials consumed: the main cost of manufacturing.','Selling and distribution: advertising, vehicle running, transport, loading.','Administrative expenses: stationery, directors’ pay, audit fees, insurance.','Interest and bank charges, and depreciation provisions.']},
  tma:{q:'Discuss the likely users of a projected income statement.',outline:['Owners / sponsors: profit and expected dividends','Management: a guide handed down with the project plan','Financial institutions: profitability and ability to repay loan plus interest','Potential investors: whether to invest','Link to how each uses revenues, expenses and net profit']},
  quiz:[
    {q:'Profit before tax minus tax gives…',o:['Gross profit','Net profit (profit after tax)','Cost of sales','Revenue'],a:1,w:'Deduct taxation from PBT to get net profit.'},
    {q:'Buying a delivery van is a…',o:['Cost','Expense','Revenue','Liability'],a:0,w:'The fuel it burns is an expense.'},
    {q:'In Year 1 the refinery’s gross profit is about…',o:['₦1.98bn','₦409m','₦366m','₦249m'],a:1,w:'₦1,975,344,000 − ₦1,566,320,178 = ₦409,023,822.'}
  ],
  card:[{h:'Structure',ordered:true,items:['Revenues','− Cost of sales','= Gross profit','− Selling, distribution, administrative','= Profit before tax','− Tax','= Profit after tax']},{h:'Users',items:['Owners and sponsors','Management','Financial institutions','Potential investors']}]
});

/* ================= 3.2 ================= */
const CF={in:[[10e6,0,0],[20e6,0,0],[40e6,50e6,60e6]],out:[36.4e6,36.9e6,42.4e6]};
function cashScene(stage){
  H.cap(stage,'Niger Limited: three-month projected cash flow');
  const s=H.svg(stage,600,440);
  const ax=H.axes(s,{x:80,y:70,w:470,h:300,xmin:-.5,xmax:2.5,ymin:-50e6,ymax:80e6,xt:[[0,'January'],[1,'February'],[2,'March']],yt:[[-40e6,'−₦40m'],[-20e6,'−₦20m'],[0,'₦0'],[20e6,'₦20m'],[40e6,'₦40m'],[60e6,'₦60m'],[80e6,'₦80m']]});
  el('line',{x1:ax.sx(-.5),x2:ax.sx(2.5),y1:ax.sy(0),y2:ax.sy(0),stroke:'var(--ink)'},s);
  const cols=['var(--data)','var(--data-soft)','var(--org)'];const inB=[0,1,2].map(m=>[0,1,2].map(j=>el('rect',{x:ax.sx(m)-46,width:40,fill:cols[j]},s)));const outB=[0,1,2].map(m=>el('rect',{x:ax.sx(m)-46,width:40,fill:'var(--err)'},s));
  const ghost=[0,1,2].map(m=>el('rect',{x:ax.sx(m)-46,width:40,fill:'none',stroke:'var(--org)','stroke-dasharray':'4 3'},s));
  const bal=el('path',{fill:'none',stroke:'var(--emp)','stroke-width':3.5},s),balG=el('path',{fill:'none',stroke:'var(--emp)','stroke-width':2,'stroke-dasharray':'6 5',opacity:.6},s);const bD=[0,1,2].map(m=>el('rect',{x:ax.sx(m)+6,width:40,fill:'var(--emp)',opacity:.85},s));const bT=[0,1,2].map(m=>t_(s,ax.sx(m)+26,0,'',{'text-anchor':'middle','font-size':11,'font-weight':700,class:'mono'}));
  const leg=el('g',{},s);[['capital','var(--data)'],['loan','var(--data-soft)'],['cash sales','var(--org)'],['outflows','var(--err)'],['closing balance','var(--emp)']].forEach(([l,c],i)=>{el('rect',{x:80+i*100,y:410,width:12,height:12,fill:c},leg);t_(leg,96+i*100,420,l,{'font-size':11});});
  const ttl=t_(s,300,36,'',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const credit=el('g',{},s);box(credit,90,80,300,92,'var(--card)','var(--line)',10);t_(credit,104,104,'Only cash actually received is an inflow',{'font-size':12.5,'font-weight':700});t_(credit,104,126,'Jan: 4 cars sold on credit ₦10m → no entry',{'font-size':11.5});t_(credit,104,146,'Feb: ₦5m received → ₦5m inflow in February',{'font-size':11.5});t_(credit,104,164,'Cash sales = total sales − credit sales',{'font-size':11.5,fill:'var(--muted)'});
  return {update(t){const k=Math.floor(t);const risk=H.es(t,5,5.6);const sf=1-.25*risk;
    [0,1,2].forEach(m=>{let base=0;[0,1,2].forEach(j=>{const v=CF.in[j][m]*(j===2?sf:1)*H.es(t,1+j*.25,1.4+j*.25);H.set(inB[m][j],{y:ax.sy(base+v),height:ax.sy(base)-ax.sy(base+v)});base+=v;});
      const o=CF.out[m]*H.es(t,3,3.5);H.set(outB[m],{y:ax.sy(0),height:ax.sy(-o)-ax.sy(0)});
      const tin=CF.in.reduce((a,r)=>a+r[m],0);H.set(ghost[m],{y:ax.sy(tin),height:ax.sy(0)-ax.sy(tin)});H.op(ghost[m],risk);});
    const close=(f)=>{let b=0;return [0,1,2].map(m=>{b+=CF.in[0][m]+CF.in[1][m]+CF.in[2][m]*f-CF.out[m];return b;});};const c1=close(sf),c0=close(1);const bp=H.es(t,4,4.5);
    [0,1,2].forEach(m=>{const v=c1[m]*bp;H.set(bD[m],{y:ax.sy(Math.max(0,v)),height:Math.abs(ax.sy(0)-ax.sy(v))});H.set(bT[m],{y:ax.sy(Math.max(0,v))-6});bT[m].textContent=bp>.8?M(c1[m]):'';});
    H.set(bal,{d:H.path(c1.map((v,m)=>[ax.sx(m)+26,ax.sy(v*bp)]))});H.op(bal,bp);H.set(balG,{d:H.path(c0.map((v,m)=>[ax.sx(m)+26,ax.sy(v)]))});H.op(balG,risk);
    H.op(credit,k===2?1:0);
    ttl.textContent=k<1?'A cash flow shows actual receipts and payments':k<3?'Cash inflows':k<4?'Cash outflows':k<5?'Surplus and closing balance':'Risk-adjusted: only 75% of cash sales realised';
  }};
}
Course.add({id:'3.2',module:3,title:'Projected Cash Flow Statements',vizLabel:'Monthly cash bars and a balance line',
  hook:{who:'Niger Limited',text:'Niger Limited’s profit forecast looks healthy. But the bank asks a different question: in which month could the company run out of cash to repay the loan?'},
  objectives:['Define a projected cash flow statement and its users','Explain cash inflows and outflows','Distinguish cash sales from credit sales','Use sensitivity analysis to build a risk-adjusted cash flow'],
  steps:[
    {h:'What it is and who uses it',t:'<p>A projected cash flow statement forecasts actual <b>receipts</b> (inflows) and <b>payments</b> (outflows). The sponsor uses it to know future financing needs and their timing. Banks use it to test the ability to service debt: will cash cover the loan and interest, when is finance needed, how should it be structured, how stable are the flows?</p>'},
    {h:'Cash inflows',t:'<p><b>Capital introduced</b> by owners (₦10m) and a <b>loan</b> (₦20m) come in January. <b>Cash sales</b>, the most important line, are ₦40m, ₦50m and ₦60m.</p><p>A loan has a specific amount, an interest rate and agreed instalments.</p>'},
    {h:'Cash sales vs credit sales',t:'<p>Only cash actually received is entered. Credit sales go to debtors and appear only when converted to cash. Projecting cash sales means weighing the economy, the industry’s demand and supply, competition and its effect on prices.</p>'},
    {h:'Cash outflows',t:'<p>Every expense that uses cash: raw materials, salaries and wages, admin, electricity and gas, <b>loan repayment</b> (₦2m a month), <b>interest</b> (₦400,000), selling expenses, taxation, rates and permits. Total ₦36.4m, ₦36.9m and ₦42.4m.</p>'},
    {h:'Surplus and closing balance',t:'<p>Inflows minus outflows give the monthly surplus (₦33.6m, ₦13.1m, ₦17.6m). Add the opening balance to get closing balances of <b>₦33.6m, ₦46.7m and ₦64.3m</b>.</p>'},
    {h:'Sensitivity analysis',t:'<p>Normal estimates assume all things are equal; they never are. Sensitivity analysis subjects cash flows to adverse conditions: lower volumes, falling prices, rising input costs. Here only <b>75% of cash sales</b> are realised: balances fall to <b>₦23.6m, ₦24.2m and ₦26.8m</b>. February’s surplus shrinks to just ₦0.6m.</p><p>This pessimistic, risk-adjusted cash flow is the one analysts should admire.</p>'}
  ],
  scene:cashScene,
  sandboxIntro:'Run your own sensitivity analysis on Niger Limited.',
  sandbox(ctl,st){
    const s=H.svg(st,520,280);const p={sf:100,co:0};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s32s',label:'Cash sales realised',min:40,max:120,step:5,value:100,fmt:v=>v+'%'},v=>{p.sf=v;draw();});
    H.slider(ctl,{id:'s32c',label:'Increase in outflows',min:0,max:40,value:0,fmt:v=>'+'+v+'%'},v=>{p.co=v;draw();});
    function draw(){s.innerHTML='';const g=el('g',{},s);const ax=H.axes(g,{x:70,y:20,w:430,h:220,xmin:-.5,xmax:2.5,ymin:-40e6,ymax:80e6,xt:[[0,'Jan'],[1,'Feb'],[2,'Mar']],yt:[[-40e6,'−₦40m'],[0,'₦0'],[40e6,'₦40m'],[80e6,'₦80m']]});el('line',{x1:ax.sx(-.5),x2:ax.sx(2.5),y1:ax.sy(0),y2:ax.sy(0),stroke:'var(--ink)'},g);
      let b=0;const out=[];[0,1,2].forEach(m=>{b+=CF.in[0][m]+CF.in[1][m]+CF.in[2][m]*p.sf/100-CF.out[m]*(1+p.co/100);out.push(b);const y=ax.sy(Math.max(0,b)),h=Math.abs(ax.sy(0)-ax.sy(b));el('rect',{x:ax.sx(m)-30,y,width:60,height:h,rx:4,fill:b<0?'var(--err)':'var(--emp)'},g);t_(g,ax.sx(m),b<0?ax.sy(b)+16:y-6,M(b),{'text-anchor':'middle','font-size':12,'font-weight':700,class:'mono'});});
      const neg=out.findIndex(v=>v<0);ro.innerHTML=`Closing balances: ${out.map(M).join(', ')}.<br>${neg>=0?`<span style="color:var(--err)"><b>Cash runs out in ${['January','February','March'][neg]}.</b> The project needs more finance or a restructured loan.</span>`:'Cash stays positive: the loan can be serviced in this scenario.'}`;}
    draw();
  },
  tma:{q:'Why do you think banks are interested in the projected cash flow statements of projects?',outline:['Ability to service debt (existing and future) depends on future cash flows','Shows whether cash covers loan repayment plus interest','Shows when and how much finance is needed, and how to structure it','Shows how stable the cash flows are','Risk-adjusted (sensitivity) versions show the worst case']},
  sae:{q:'In January a company sells four cars on credit for ₦10m and receives ₦5m of it in February. What appears in the cash flow?',a:'Nothing for those sales in January. A ₦5m cash inflow in February. Only cash actually received is entered; the rest stays with debtors until paid.',},
  saeOwn:true,
  quiz:[
    {q:'Which item is a cash inflow?',o:['Loan repayment','Interest charges','Capital introduced','Selling expenses'],a:2,w:'Introducing capital brings cash in.'},
    {q:'In the risk-adjusted cash flow, Niger Limited assumes…',o:['Sales double','Only 75% of cash sales are realised','Costs fall 25%','No loan is taken'],a:1,w:'Sales fall to 75%; outflows are unchanged.'},
    {q:'The main objective of sensitivity analysis is to…',o:['Maximise reported profit','Forecast a worst-case scenario','Calculate tax','Value the land'],a:1,w:'It subjects cash flows to adverse market situations.'}
  ],
  card:[{h:'Cash inflows',items:['Capital introduced','Loan introduced','Cash sales (not credit sales)']},{h:'Cash outflows',items:['Raw materials','Salaries and wages','Office admin and stationery','Loan repayment and interest','Selling expenses','Oil and gas','Taxation, rates and permits']},{h:'Sensitivity assumptions',items:['Lower sales volume (competition)','Lower prices (excess supply)','Higher input prices']}]
});

/* ================= 3.3 ================= */
function bsScene(stage){
  H.cap(stage,'Projected balance sheet, end of Year 1');
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);t_(A,300,60,'Statement of financial position',{'text-anchor':'middle','font-size':17,'font-weight':700});t_(A,300,84,'A projected balance sheet forecasts it at a future date',{'text-anchor':'middle','font-size':12.5,fill:'var(--muted)'});
  const beam=el('g',{},A);el('line',{x1:-200,x2:200,y1:0,y2:0,stroke:'var(--ink)','stroke-width':5,'stroke-linecap':'round'},beam);box(beam,-260,-90,130,86,'var(--org-soft)','none',8);t_(beam,-195,-40,'Assets',{'text-anchor':'middle','font-size':16,'font-weight':700});box(beam,130,-90,130,86,'var(--emp-soft)','none',8);t_(beam,195,-48,'Liabilities',{'text-anchor':'middle','font-size':15,'font-weight':700});t_(beam,195,-28,'and equity',{'text-anchor':'middle','font-size':13});
  el('path',{d:'M300 302 L284 340 L316 340Z',fill:'var(--muted)'},A);
  const B=tab(s);tabs.push([B,1,3]);t_(B,150,40,'Assets',{'text-anchor':'middle','font-size':16,'font-weight':700,fill:'var(--org)'});t_(B,450,40,'Liabilities',{'text-anchor':'middle','font-size':16,'font-weight':700,fill:'var(--emp)'});
  const groupsA=[['Current assets',['Cash (on hand or in bank)','Book debts (debtors)','Prepaid expenses','Marketable securities','Stock: raw materials, WIP, finished goods']],['Investments',['Long-term shares, debentures, bonds']],['Fixed assets',['Land, buildings, machinery, vehicles']]];
  const groupsL=[['Current liabilities',['Bank overdraft','Tax and dividend provisions','Expenses payable, creditors']],['Long-term liabilities',['Term loans','Debentures','Owners’ equity: paid-up capital + retained earnings']]];
  const aE=[],lE=[];let y=60;groupsA.forEach(([h,it])=>{const g=el('g',{},B);box(g,20,y,260,24+it.length*20,'var(--org-soft)','none',8);t_(g,32,y+17,h,{'font-size':12.5,'font-weight':700});it.forEach((x,i)=>t_(g,40,y+37+i*20,'▸ '+x,{'font-size':11}));aE.push(g);y+=34+it.length*20;});
  y=60;groupsL.forEach(([h,it])=>{const g=el('g',{},B);box(g,320,y,260,24+it.length*20,'var(--emp-soft)','none',8);t_(g,332,y+17,h,{'font-size':12.5,'font-weight':700});it.forEach((x,i)=>t_(g,340,y+37+i*20,'▸ '+x,{'font-size':11}));lE.push(g);y+=34+it.length*20;});
  const pre=el('g',{},B);box(pre,20,330,560,80,'var(--card)','var(--line)',10);t_(pre,36,354,'Prepaid expense example',{'font-size':12.5,'font-weight':700});
  for(let m=0;m<12;m++){el('rect',{x:36+m*44,y:366,width:40,height:22,rx:3,fill:m<4?'var(--sunk)':'var(--org)'},pre);t_(pre,56+m*44,382,'JFMAMJJASOND'[m],{'text-anchor':'middle','font-size':11,fill:m<4?'var(--ink)':'var(--card)'});}t_(pre,36,404,'Rent paid in January for the year; books close in April → May–December is a current asset',{'font-size':10.5,fill:'var(--muted)'});
  const C=tab(s);tabs.push([C,3,5,true]);const cT=t_(C,300,32,'',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const H_=330,sc=v=>H_*v/82038476,base=400;
  const fa=el('rect',{x:80,width:150,fill:'var(--org)'},C),nca=el('rect',{x:80,width:150,fill:'var(--org-soft)'},C);const fin=el('rect',{x:370,width:150,fill:'var(--emp)'},C);
  const faT=t_(C,155,0,'Fixed assets ₦66.66m',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--card)'}),ncaT=t_(C,155,0,'Net current assets ₦15.38m',{'text-anchor':'middle','font-size':11.5,'font-weight':700});
  const finT=el('g',{},C);wrap(finT,445,180,'Financed by: share capital, loan, profit and loss account, directors’ current account',18,{'text-anchor':'middle','font-size':11.5,'font-weight':700,fill:'var(--card)'});
  const ca=el('g',{},C);box(ca,250,90,110,66,'var(--card)','var(--line)',6);t_(ca,305,110,'Current assets',{'text-anchor':'middle','font-size':10.5,'font-weight':700});t_(ca,305,126,'₦27.62m',{'text-anchor':'middle','font-size':11,class:'mono'});t_(ca,305,142,'− CL ₦12.25m',{'text-anchor':'middle','font-size':11,class:'mono',fill:'var(--err)'});
  const totT=t_(C,300,428,'Total: ₦82,038,476 on both sides',{'text-anchor':'middle','font-size':13,'font-weight':700});
  return {update(t){showTabs(tabs,t);const k=Math.floor(t);aE.forEach((g,i)=>H.op(g,H.es(t,1+i*.15,1.2+i*.15)));lE.forEach((g,i)=>H.op(g,k>=2?1:.15));H.op(pre,k===1?1:0);
    beam.setAttribute('transform',`translate(300,300) rotate(${Math.sin(H.seg(t,0,.9)*Math.PI*3)*(1-H.seg(t,0,.9))*8})`);
    const p=H.es(t,3.1,3.7),q=H.es(t,3.6,4.1);const hf=sc(66662164)*p,hn=sc(15376312)*q;H.set(fa,{y:base-hf,height:hf});H.set(nca,{y:base-hf-hn,height:hn});H.set(faT,{y:base-hf/2});H.set(ncaT,{y:base-hf-hn/2+4});H.op(faT,p);H.op(ncaT,q);H.op(ca,q*(k<5?1:0));
    const hfin=sc(82038476)*H.es(t,4,4.5);H.set(fin,{y:base-hfin,height:hfin});H.op(finT,H.es(t,4.3,4.6));H.op(totT,H.es(t,4.4,4.7));
    cT.textContent=k<4?'Assets employed':k<5?'Both sides must balance':'Seven steps to build it';
  }};
}
Course.add({id:'3.3',module:3,title:'Projected Balance Sheet',vizLabel:'Two columns that must balance',
  hook:{who:'Tunde, project consultant',text:'Tunde has built the refinery’s income statement and cash flow. The bank now asks for a projected balance sheet: what will the firm own and owe at the end of Year 1?'},
  objectives:['Explain the balance sheet and the projected balance sheet','Classify assets and liabilities','Follow the steps to construct a projected balance sheet'],
  steps:[
    {h:'The statement of financial position',t:'<p>The balance sheet shows the financial condition, the statement of affairs, of a firm. A <b>projected</b> balance sheet is a forecast of the balance sheet at a future date. It has two sides: <b>assets</b> and <b>liabilities</b>.</p>'},
    {h:'Assets',t:'<p>Valuable possessions measured in money. <b>Current assets</b> are cash or will turn into cash within the accounting year: cash, book debts, prepaid expenses, marketable securities, stock. <b>Investments</b> are long-term holdings of shares and bonds that yield income. <b>Fixed assets</b> are held over a year for use in the business.</p>'},
    {h:'Liabilities',t:'<p>Debts payable to creditors. <b>Current liabilities</b> are due within a year: overdraft, tax and dividend provisions, expenses payable. <b>Long-term liabilities</b>: term loans, debentures and the most stable of all, <b>owners’ equity</b> (paid-up capital plus retained earnings).</p>'},
    {h:'The course example',t:'<p>Fixed assets ₦66,629,024 plus preliminary expenses ₦33,140 make ₦66,662,164. Current assets ₦27,623,497 less current liabilities ₦12,247,185 leave <b>net current assets of ₦15,376,312</b>.</p>'},
    {h:'Both sides balance',t:'<p>Total assets employed: <b>₦82,038,476</b>, financed by share capital, loan, the profit and loss account and the directors’ current account. (The course does not print the split of the financing side.)</p>'},
    {h:'Constructing a projected balance sheet',t:'<p><b>1</b> Start from sales revenue. <b>2</b> Compute cost of goods sold. <b>3</b> Compute admin, general and selling expenses. <b>4</b> Bring in sundry items and produce the projected income statement. <b>5</b> Determine tax, dividends and retained earnings. <b>6</b> Project the assets. <b>7</b> Project the liabilities, which must total the same as the assets.</p>'}
  ],
  scene:bsScene,
  sandboxIntro:'Change the numbers and see whether the balance sheet still balances.',
  sandbox(ctl,st){
    const s=H.svg(st,520,280);const p={fa:66.66,ca:27.62,cl:12.25,eq:40,lt:42.04};const ro=H.readout(ctl);
    [['fa','Fixed assets'],['ca','Current assets'],['cl','Current liabilities'],['eq','Share capital + retained earnings'],['lt','Long-term loan']].forEach(([k,l])=>H.slider(ctl,{id:'s33'+k,label:l,min:0,max:120,step:.5,value:p[k],fmt:v=>'₦'+v.toFixed(1)+'m'},v=>{p[k]=v;draw();}));
    function draw(){s.innerHTML='';const left=p.fa+p.ca-p.cl,right=p.eq+p.lt,diff=left-right,mx=Math.max(left,right,1)*1.1,sc=v=>220*v/mx;
      el('rect',{x:110,y:250-sc(p.fa),width:110,height:sc(p.fa),fill:'var(--org)'},s);el('rect',{x:110,y:250-sc(p.fa)-sc(Math.max(0,p.ca-p.cl)),width:110,height:sc(Math.max(0,p.ca-p.cl)),fill:'var(--org-soft)'},s);
      el('rect',{x:300,y:250-sc(p.lt),width:110,height:sc(p.lt),fill:'var(--emp)'},s);el('rect',{x:300,y:250-sc(p.lt)-sc(p.eq),width:110,height:sc(p.eq),fill:'var(--emp-soft)'},s);
      t_(s,165,272,'Assets (net)',{'text-anchor':'middle','font-size':12,'font-weight':700});t_(s,355,272,'Financed by',{'text-anchor':'middle','font-size':12,'font-weight':700});
      ro.innerHTML=`Fixed + net current assets = <b>₦${left.toFixed(2)}m</b> · financed by <b>₦${right.toFixed(2)}m</b><br>${Math.abs(diff)<.05?'<b>Balanced.</b>':`<span style="color:var(--err)">Out of balance by ₦${Math.abs(diff).toFixed(2)}m: check retained earnings, cash or the loan balance.</span>`}`;}
    draw();
  },
  sae:{q:'Discuss the components of a balance sheet.',a:['Assets: current assets (cash, debtors, prepaid expenses, marketable securities, stock), investments, fixed assets.','Liabilities: current liabilities (overdraft, tax and dividend provisions, expenses payable) and long-term liabilities (term loans, debentures, owners’ equity: paid-up capital plus retained earnings).']},
  tma:{q:'Who are the users of the information in a projected balance sheet, and why do they need it?',outline:['Sponsors and owners: future net worth and retained earnings','Banks and lenders: security, gearing, liquidity (net current assets)','Management: planning assets, working capital and financing','Potential investors: financial strength of the project','Link each to specific lines: fixed assets, current ratio, loans, equity']},
  quiz:[
    {q:'Rent paid in advance for months after the year-end is a…',o:['Current liability','Prepaid expense (current asset)','Fixed asset','Long-term liability'],a:1,w:'Prepaid expenses are current assets.'},
    {q:'Net current assets equal…',o:['Fixed assets − current liabilities','Current assets − current liabilities','Total assets − equity','Cash − overdraft'],a:1,w:'₦27,623,497 − ₦12,247,185 = ₦15,376,312 in the example.'},
    {q:'Which is a long-term liability?',o:['Bank overdraft','Tax provision','Debentures','Expenses payable'],a:2,w:'Debentures, term loans and owners’ equity are long-term.'}
  ],
  card:[{h:'Assets',items:['Current: cash, debtors, prepaid, securities, stock','Investments','Fixed: land, buildings, machinery, vehicles']},{h:'Liabilities',items:['Current: overdraft, tax and dividends, payables','Long-term: loans, debentures, owners’ equity']},{h:'Construction steps',ordered:true,items:['Sales revenue','Cost of goods sold','Admin, general, selling expenses','Projected income statement','Tax, dividends, retained earnings','Project assets','Project liabilities']}]
});

/* ================= 3.4 ================= */
function critScene(stage){
  H.cap(stage,'Project evaluation criteria');
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);t_(A,300,40,'A good evaluation criterion should…',{'text-anchor':'middle','font-size':15,'font-weight':700});
  ['separate acceptable from unacceptable projects','rank projects by desirability','apply to any conceivable project','prefer bigger cash flows to smaller ones','prefer early cash flows to later ones'].forEach((x,i)=>{box(A,60,64+i*66,480,52,'var(--org-soft)','none',26);t_(A,90,96+i*66,`${i+1}`,{'font-size':16,'font-weight':700,fill:'var(--org)',class:'mono'});t_(A,120,96+i*66,x,{'font-size':14});});
  // payback
  const B=tab(s);tabs.push([B,1,3]);const bax=H.axes(B,{x:80,y:70,w:470,h:290,xmin:0,xmax:10,ymin:-250000,ymax:300000,xt:[0,2,4,6,8,10].map(v=>[v,'Yr '+v]),yt:[[-200000,'−₦200k'],[0,'₦0'],[200000,'₦200k']],yl:'Cumulative cash'});
  el('line',{x1:bax.sx(0),x2:bax.sx(10),y1:bax.sy(0),y2:bax.sy(0),stroke:'var(--ink)'},B);
  const cum=[];for(let y=0;y<=10;y++)cum.push(-200000+50000*y);const cP=el('path',{fill:'none',stroke:'var(--data)','stroke-width':3.5},B);const pbD=el('circle',{cx:bax.sx(4),cy:bax.sy(0),r:8,fill:'var(--org)'},B);const pbT=t_(B,bax.sx(4),bax.sy(0)+28,'payback: 4 years',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--org)'});
  const ign=el('rect',{x:bax.sx(4),y:bax.sy(300000),width:bax.sx(10)-bax.sx(4),height:bax.sy(0)-bax.sy(300000),fill:'var(--err-soft)',opacity:.6},B);const ignT=t_(B,bax.sx(7),bax.sy(250000),'cash after payback is ignored',{'text-anchor':'middle','font-size':12.5,'font-weight':700,fill:'var(--err)'});
  const bT=t_(B,300,36,'',{'text-anchor':'middle','font-size':15,'font-weight':700});
  // ARR
  const C=tab(s);tabs.push([C,3,4]);t_(C,300,36,'Accounting rate of return',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const rows=[['','Yr 1','Yr 2','Yr 3'],['Earnings before dep. and tax','40,000','50,000','60,000'],['Depreciation','20,000','20,000','20,000'],['Earnings before tax','20,000','30,000','40,000'],['Tax at 50%','10,000','15,000','20,000'],['Earnings after tax','10,000','15,000','20,000'],['Average book value','90,000','70,000','50,000']];
  rows.forEach((r,i)=>r.forEach((c,j)=>t_(C,j?280+j*90:40,74+i*30,c,{'font-size':12,'text-anchor':j?'end':'start','font-weight':i===0||i===5?700:400,class:j&&i?'mono':''})));
  box(C,40,290,520,110,'var(--org-soft)','none',12);t_(C,300,325,'ARR = average income ÷ average investment',{'text-anchor':'middle','font-size':14,'font-weight':700});t_(C,300,358,'= 15,000 ÷ 70,000 = 21.43%',{'text-anchor':'middle','font-size':20,'font-weight':700,class:'mono'});t_(C,300,386,'accept if above management’s minimum rate',{'text-anchor':'middle','font-size':12});
  // discounting
  const D=tab(s);tabs.push([D,4,6]);const dT=t_(D,300,36,'',{'text-anchor':'middle','font-size':15,'font-weight':700});const dax=H.axes(D,{x:80,y:70,w:470,h:280,xmin:0,xmax:3.6,ymin:0,ymax:420000,xt:[[1,'Yr 1'],[2,'Yr 2'],[3,'Yr 3']],yt:[[0,'₦0'],[200000,'₦200k'],[400000,'₦400k']]});
  const cfs=[150000,300000,400000],dfs=[.909,.826,.751];const raw=cfs.map((v,i)=>el('rect',{x:dax.sx(i+1)-40,width:38,y:dax.sy(v),height:dax.sy(0)-dax.sy(v),fill:'var(--sunk)',stroke:'var(--muted)'},D));const pv=cfs.map((v,i)=>el('rect',{x:dax.sx(i+1)+2,width:38,fill:'var(--org)'},D));const pvT=cfs.map((v,i)=>t_(D,dax.sx(i+1)+21,0,'',{'text-anchor':'middle','font-size':10.5,'font-weight':700,class:'mono'}));
  const dcurve=el('path',{fill:'none',stroke:'var(--data)','stroke-width':2.5,'stroke-dasharray':'6 4'},D);const dN=t_(D,300,392,'',{'text-anchor':'middle','font-size':13,'font-weight':700});const dN2=t_(D,300,414,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  // NPV profile
  const E=tab(s);tabs.push([E,6,9,true]);const eT=t_(E,300,32,'',{'text-anchor':'middle','font-size':15,'font-weight':700});const c0=32400,cf=[16000,14000,12000];
  const eax=H.axes(E,{x:90,y:60,w:460,h:300,xmin:0,xmax:.3,ymin:-6000,ymax:10000,xt:[[0,'0%'],[.05,'5%'],[.1,'10%'],[.15,'15%'],[.2,'20%'],[.25,'25%'],[.3,'30%']],yt:[[-5000,'−₦5,000'],[0,'₦0'],[5000,'₦5,000'],[10000,'₦10,000']],xl:'discount rate',yl:'NPV of the barber’s shop'});
  el('line',{x1:eax.sx(0),x2:eax.sx(.3),y1:eax.sy(0),y2:eax.sy(0),stroke:'var(--ink)','stroke-width':1.3},E);const pts=[];for(let i=0;i<=90;i++){const r=.3*i/90;pts.push([eax.sx(r),eax.sy(npv(r,c0,cf))]);}const prof=el('path',{d:H.path(pts),fill:'none',stroke:'var(--data)','stroke-width':3.5},E);const L=prof.getTotalLength?0:0;
  const tan=el('line',{stroke:'var(--emp)','stroke-width':2.5},E),td=el('circle',{r:6,fill:'var(--emp)'},E),tt=t_(E,0,0,'',{'font-size':11.5,'font-weight':700,fill:'var(--emp)'});
  const p14=el('g',{},E);[[.14,498],[.16,-514]].forEach(([r,v])=>{el('circle',{cx:eax.sx(r),cy:eax.sy(v),r:6,fill:v>0?'var(--org)':'var(--err)'},p14);t_(p14,eax.sx(r)+(v>0?-8:8),eax.sy(v)+(v>0?-10:20),`${Math.round(r*100)}%: ${v>0?'+':'−'}₦${Math.abs(v)}`,{'font-size':11.5,'font-weight':700,'text-anchor':v>0?'end':'start',fill:v>0?'var(--org)':'var(--err)'});});
  const irrG=el('g',{},E);el('line',{x1:eax.sx(.1498),x2:eax.sx(.1498),y1:eax.sy(0),y2:eax.sy(-5500),stroke:'var(--org)','stroke-dasharray':'4 4','stroke-width':2},irrG);el('circle',{cx:eax.sx(.1498),cy:eax.sy(0),r:8,fill:'var(--org)'},irrG);t_(irrG,eax.sx(.1498)+10,eax.sy(-4500),'IRR ≈ 15.0%',{'font-size':14,'font-weight':700,fill:'var(--org)'});
  const rule=el('g',{},E);box(rule,330,74,215,84,'var(--card)','var(--line)',10);t_(rule,344,98,'Accept if NPV > 0',{'font-size':12.5,'font-weight':700});t_(rule,344,120,'Accept if IRR > required rate',{'font-size':12.5,'font-weight':700});t_(rule,344,142,'At a 10% cost of capital: accept',{'font-size':11.5,fill:'var(--org)'});
  return {update(t){showTabs(tabs,t);const k=Math.floor(t);
    const cp=H.es(t,1.1,1.8);const cpts=[];for(let i=0;i<=40*cp;i++){const x=10*i/40;cpts.push([bax.sx(x),bax.sy(-200000+50000*x)]);}H.set(cP,{d:cpts.length>1?H.path(cpts):''});H.op(pbD,cp>.45?1:0);H.op(pbT,cp>.45?1:0);H.op(ign,k===2?1:0);H.op(ignT,k===2?1:0);
    bT.textContent=k===1?'Payback: ₦200,000 ÷ ₦50,000 a year = 4 years':'Payback’s blind spots';
    const dp=H.es(t,4.3,4.9),np=H.es(t,5,5.4);cfs.forEach((v,i)=>{const pvv=v*dfs[i]*dp+v*(1-dp);H.set(pv[i],{y:dax.sy(pvv),height:dax.sy(0)-dax.sy(pvv)});H.set(pvT[i],{y:dax.sy(pvv)-6});pvT[i].textContent=dp>.8?n(v*dfs[i]):'';});
    const dc=[];for(let i=0;i<=40;i++){const x=3.6*i/40;dc.push([dax.sx(x),dax.sy(400000/Math.pow(1.1,x))]);}H.set(dcurve,{d:H.path(dc)});H.op(dcurve,dp);
    dT.textContent=k===4?'Time value: a naira later is worth less today':'Net present value at 10%';dN.textContent=k===4?'Discount factor at 10%: 0.909, 0.826, 0.751':np>.5?'PV ₦684,550 − outlay ₦500,000 = NPV ₦184,550':'';dN2.textContent=k===4?'grey = cash received · green = its present value':np>.5?'(with unrounded factors the NPV is ₦184,823)':'';
    const sl=H.seg(t,6.1,6.95);const r=.01+.28*sl,v=npv(r,c0,cf),d=(npv(r+1e-5,c0,cf)-npv(r-1e-5,c0,cf))/2e-5;H.set(td,{cx:eax.sx(r),cy:eax.sy(v)});H.set(tan,{x1:eax.sx(r-.04),y1:eax.sy(v-d*.04),x2:eax.sx(r+.04),y2:eax.sy(v+d*.04)});
    tt.textContent=`slope ≈ −₦${Math.round(-d/100)} per 1% rise`;H.set(tt,{x:eax.sx(r)+10,y:eax.sy(v)-14});H.op(tan,k===6?1:0);H.op(td,k===6?1:0);H.op(tt,k===6?1:0);
    H.op(p14,k>=7?1:0);H.op(irrG,k>=7?H.es(t,7.4,7.8):0);H.op(rule,k>=8?1:0);
    eT.textContent=k===6?'NPV falls as the discount rate rises':k===7?'IRR: the rate where NPV = 0':'The decision rules';
  }};
}
Course.add({id:'3.4',module:3,title:'Project Evaluation Criteria',vizLabel:'A payback line and the NPV curve crossing zero',
  hook:{who:'Sola, barber',text:'Sola can open a barber’s shop for ₦32,400 and expects ₦16,000, ₦14,000 and ₦12,000 over three years. She could also leave the money in a fixed deposit. Is the shop worth it? Four methods give four kinds of answer.'},
  objectives:['State the qualities of a good evaluation criterion','Compute payback period and accounting rate of return','Compute NPV with discount factors','Find the IRR by trial and error and apply the decision rules'],
  steps:[
    {h:'What a good criterion does',t:'<p>Evaluation criteria measure the value of an investment so we can choose between projects. A good criterion separates acceptable from unacceptable projects, ranks them, applies to any project, prefers bigger cash flows, and prefers <b>earlier</b> cash flows.</p>'},
    {h:'Payback period',t:'<p>The years needed to recover the original outlay. With constant inflows: <b>outlay ÷ annual inflow</b>. ₦200,000 ÷ ₦50,000 = <b>4 years</b>: where the cumulative cash line crosses zero. With uneven flows, add them up until they equal the outlay.</p>'},
    {h:'Payback’s weaknesses',t:'<p>Simple, cheap and popular, and it stresses early recovery. But it <b>ignores cash flows after payback</b> (six more years here) and the <b>pattern and timing</b> of inflows.</p>'},
    {h:'Accounting rate of return',t:'<p>ARR = average income after tax ÷ average investment. A ₦100,000 project with ₦40,000 scrap value, straight-line depreciation and 50% tax: 15,000 ÷ 70,000 = <b>21.43%</b> (the course prints 21.42%). Simple, but it uses accounting profit not cash, ignores the time value of money, and ignores reinvestment.</p>'},
    {h:'The time value of money',t:'<p>Discounted cash flow (DCF) methods recognise that cash at different times differs in value. At 10%, ₦1 next year is worth ₦0.909 today, in two years ₦0.826, in three ₦0.751. The dashed curve shows the decay.</p>'},
    {h:'Net present value',t:'<p>Discount inflows at the cost of capital, subtract the outlay. A ₦500,000 project returning ₦150,000, ₦300,000 and ₦400,000 at 10%: PV ₦684,550, <b>NPV ₦184,550</b>. Accept if NPV is positive: it is the immediate increase in the firm’s wealth. Limits: harder to use, needs a known cost of capital, can mislead between projects of different size.</p>'},
    {h:'NPV changes with the rate',t:'<p>Plot the barber’s shop NPV against the discount rate. As the rate rises, NPV falls. The orange tangent shows the <b>slope</b>: how much NPV is lost for each extra percentage point. The curve flattens at higher rates.</p>'},
    {h:'Internal rate of return',t:'<p>IRR is the rate that makes NPV zero. By trial and error: at 16% NPV is −₦514; at 14% it is +₦498. So IRR lies between; the curve crosses zero at about <b>15.0%</b>. It is the highest interest the firm could pay on borrowed funds without being worse off.</p>'},
    {h:'Decision rules',t:'<p>Accept if <b>NPV &gt; 0</b>, or if <b>IRR &gt; the required rate</b> (cost of capital). DCF methods are superior to payback and ARR because they recognise timing and the time value of money and fit the goal of maximising owners’ wealth.</p>'}
  ],
  scene:critScene,
  sandboxIntro:'Enter any project and compare all four criteria. Defaults are the course’s barber’s shop.',
  sandbox(ctl,st){
    const s=H.svg(st,540,300);const p={c0:32400,a:16000,b:14000,c:12000,r:10};const ro=H.readout(ctl);
    [['c0','Outlay',5000,100000,100],['a','Year 1 inflow',0,60000,500],['b','Year 2 inflow',0,60000,500],['c','Year 3 inflow',0,60000,500]].forEach(([k,l,mi,ma,st_])=>H.slider(ctl,{id:'s34'+k,label:l,min:mi,max:ma,step:st_,value:p[k],fmt:v=>'₦'+n(v)},v=>{p[k]=v;draw();}));
    H.slider(ctl,{id:'s34r',label:'Required rate (cost of capital)',min:0,max:40,value:10,fmt:v=>v+'%'},v=>{p.r=v;draw();});
    function draw(){s.innerHTML='';const cf=[p.a,p.b,p.c],g=el('g',{},s);const vals=[];for(let i=0;i<=80;i++){const r=.5*i/80;vals.push([r,npv(r,p.c0,cf)]);}const ymin=Math.min(...vals.map(v=>v[1]),-1000),ymax=Math.max(...vals.map(v=>v[1]),1000);
      const ax=H.axes(g,{x:70,y:20,w:440,h:230,xmin:0,xmax:.5,ymin,ymax,xt:[[0,'0%'],[.1,'10%'],[.2,'20%'],[.3,'30%'],[.4,'40%'],[.5,'50%']],xl:'discount rate',yl:'NPV'});
      el('line',{x1:ax.sx(0),x2:ax.sx(.5),y1:ax.sy(0),y2:ax.sy(0),stroke:'var(--ink)'},g);el('path',{d:H.path(vals.map(([r,v])=>[ax.sx(r),ax.sy(v)])),fill:'none',stroke:'var(--data)','stroke-width':3},g);
      const r=p.r/100,v=npv(r,p.c0,cf),ir=irr(p.c0,cf);el('circle',{cx:ax.sx(r),cy:ax.sy(v),r:7,fill:v>=0?'var(--org)':'var(--err)'},g);if(ir!=null&&ir>=0&&ir<=.5)el('circle',{cx:ax.sx(ir),cy:ax.sy(0),r:6,fill:'none',stroke:'var(--org)','stroke-width':3},g);
      let cum=-p.c0,pb=null;cf.forEach((c,i)=>{if(pb==null&&cum+c>=0)pb=i+(-cum)/c;cum+=c;});const tot=cf.reduce((a,b)=>a+b,0);
      ro.innerHTML=`NPV at ${p.r}%: <b>${N(v)}</b> → ${v>=0?'accept':'reject'}<br>IRR: <b>${ir==null?'none':(ir*100).toFixed(1)+'%'}</b> · payback: <b>${pb==null?'not within 3 years':pb.toFixed(2)+' years'}</b><br>Total inflows ${N(tot)} vs outlay ${N(p.c0)}`;}
    draw();
  },
  sae:{q:'Distinguish between the traditional project evaluation methods and the discounted cash flow criteria.',a:['Traditional: payback period and ARR. Simple, cheap, easy to understand; ignore the time value of money and (payback) cash after recovery; ARR uses accounting profit, not cash.','DCF: NPV and IRR. Discount cash flows at the cost of capital, recognise timing and the time value of money, and fit wealth maximisation; harder to compute and need a cost of capital.']},
  tma:{q:'Why are discounted cash flow (DCF) techniques better and more acceptable than the traditional methods of project evaluation?',outline:['Traditional methods: payback ignores flows after payback and timing; ARR uses profits, ignores time value and reinvestment','DCF recognise that early cash is worth more (discount factors)','NPV: immediate increase in shareholders’ wealth; accept if > 0','IRR: rate where NPV = 0; accept if above cost of capital','Worked examples: NPV ₦184,550; barber IRR ≈ 15%','Note DCF limits: complexity, estimating cost of capital']},
  quiz:[
    {q:'A project costs ₦300,000 and returns ₦75,000 a year. Payback is…',o:['3 years','4 years','5 years','75 years'],a:1,w:'300,000 ÷ 75,000 = 4 years.'},
    {q:'Which method ignores the time value of money?',o:['NPV','IRR','Accounting rate of return','Both NPV and IRR'],a:2,w:'ARR treats profits in different years equally.'},
    {q:'At 14% the NPV is +₦498 and at 16% it is −₦514. The IRR is…',o:['Below 14%','Between 14% and 16%','Above 16%','Exactly 16%'],a:1,w:'NPV changes sign between them; it is about 15.0%.'},
    {q:'A project should be accepted under NPV if…',o:['NPV is negative','NPV is positive','IRR is below the cost of capital','Payback is long'],a:1,w:'Positive NPV means the firm’s value is expected to rise.'},
    {q:'As the discount rate rises, a normal project’s NPV…',o:['Rises','Falls','Stays the same','Becomes infinite'],a:1,w:'Later cash flows are discounted more heavily, so the curve slopes down.'}
  ],
  card:[{h:'Traditional criteria',items:['Payback = outlay ÷ annual inflow','ARR = average income ÷ average investment']},{h:'DCF criteria',items:['NPV = PV of inflows − PV of outflows; accept if > 0','IRR = rate where NPV = 0; accept if > cost of capital']},{h:'Course examples',items:['Payback: ₦200,000 ÷ ₦50,000 = 4 years','ARR: 15,000 ÷ 70,000 = 21.43%','NPV at 10%: ₦184,550','Barber IRR: between 14% and 16% (≈ 15.0%)']}]
});

/* ================= 3.5 ================= */
function econScene(stage){
  H.cap(stage,'From financial to economic analysis');H.tag(stage);
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,2]);const aT=t_(A,300,40,'',{'text-anchor':'middle','font-size':15,'font-weight':700});
  box(A,40,64,250,330,'var(--data-soft)','none',14);box(A,310,64,250,330,'var(--org-soft)','none',14);t_(A,165,96,'Financial analysis',{'text-anchor':'middle','font-size':15,'font-weight':700,fill:'var(--data)'});t_(A,435,96,'Economic analysis',{'text-anchor':'middle','font-size':15,'font-weight':700,fill:'var(--org)'});
  ['micro view: the private investor','costs and benefits in money: profit','“Is it viable for us?”'].forEach((x,i)=>t_(A,165,134+i*30,x,{'text-anchor':'middle','font-size':12.5}));['macro view: society as a whole','costs as opportunity costs','“Is it good for the nation?”'].forEach((x,i)=>t_(A,435,134+i*30,x,{'text-anchor':'middle','font-size':12.5}));
  const both=el('g',{},A);box(both,60,250,480,126,'var(--card)','var(--line)',10);t_(both,300,276,'Both:',{'text-anchor':'middle','font-size':13,'font-weight':700});['solve resource allocation problems (a school or a hospital?)','compare streams of benefits and costs','use discounting and compounding'].forEach((x,i)=>t_(both,300,300+i*22,x,{'text-anchor':'middle','font-size':12.5}));
  const B=tab(s);tabs.push([B,2,3]);t_(B,300,40,'Three discounted measures of project worth',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const bax=H.axes(B,{x:80,y:80,w:200,h:250,xmin:0,xmax:2,ymin:0,ymax:120,xt:[[.5,'benefits'],[1.5,'costs']],yt:[]});el('rect',{x:bax.sx(.5)-30,y:bax.sy(100),width:60,height:bax.sy(0)-bax.sy(100),fill:'var(--org)'},B);el('rect',{x:bax.sx(1.5)-30,y:bax.sy(80),width:60,height:bax.sy(0)-bax.sy(80),fill:'var(--emp)'},B);t_(B,bax.sx(.5),bax.sy(100)-6,'PV 100',{'text-anchor':'middle','font-size':12,'font-weight':700});t_(B,bax.sx(1.5),bax.sy(80)-6,'PV 80',{'text-anchor':'middle','font-size':12,'font-weight':700});
  [['Net present worth','100 − 80 = 20 > 0 → accept'],['Benefit–cost ratio','100 ÷ 80 = 1.25 > 1 → accept; = 1 is marginal'],['Internal rate of return','rate where PV benefits = PV costs']].forEach(([a,b],i)=>{box(B,310,80+i*90,260,74,'var(--card)','var(--line)',10);t_(B,326,106+i*90,a,{'font-size':13.5,'font-weight':700});wrap(B,326,128+i*90,b,32,{'font-size':12});});
  const C=tab(s);tabs.push([C,3,5]);const cT=t_(C,300,36,'',{'text-anchor':'middle','font-size':15,'font-weight':700});const top=140,sy=v=>380-260*v/top;
  const wf=[['Financial net benefit',60,'t'],['+ interest (transfer)',25,'u'],['+ taxes (transfer)',35,'u'],['− subsidies (real cost)',-20,'d'],['Economic net benefit',100,'s']];let run=0;
  const wE=wf.map(([l,v,k],i)=>{const x=50+i*104;let y0,y1;if(k==='t'||k==='s'){y0=0;y1=v;run=v;}else{y0=run;y1=run+v;run+=v;}const r=el('rect',{x,width:80,y:sy(Math.max(y0,y1)),height:Math.abs(sy(y0)-sy(y1)),rx:3,fill:k==='d'?'var(--err)':k==='u'?'var(--data)':k==='t'?'var(--muted)':'var(--org)'},C);wrap(C,x+40,400,l,14,{'text-anchor':'middle','font-size':10.5,lh:12});t_(C,x+40,sy(Math.max(y0,y1))-6,(v>0&&k==='u'?'+':'')+v,{'text-anchor':'middle','font-size':12,'font-weight':700,class:'mono'});return r;});
  el('line',{x1:40,x2:570,y1:380,y2:380,stroke:'var(--muted)'},C);const shadow=t_(C,300,60,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  const D=tab(s);tabs.push([D,5,7]);const dT=t_(D,300,36,'',{'text-anchor':'middle','font-size':15,'font-weight':700});
  el('circle',{cx:300,cy:230,r:56,fill:'var(--org)'},D);t_(D,300,226,'Flour',{'text-anchor':'middle','font-size':14,'font-weight':700,fill:'var(--card)'});t_(D,300,244,'mill',{'text-anchor':'middle','font-size':14,'font-weight':700,fill:'var(--card)'});
  const fwd=el('g',{},D);[['Bakeries',480,140],['Biscuit makers',500,260],['Confectioners',470,370]].forEach(([n,x,y])=>{el('line',{x1:356,y1:230,x2:x-60,y2:y,stroke:'var(--org)','stroke-width':3},fwd);box(fwd,x-62,y-20,124,40,'var(--org-soft)','none',20);t_(fwd,x,y+5,n,{'text-anchor':'middle','font-size':12,'font-weight':700});});t_(fwd,480,90,'Forward: users of the output',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--org)'});
  const bwd=el('g',{},D);[['Wheat farming',120,140],['Transport',100,260],['Packaging',130,370]].forEach(([n,x,y])=>{el('line',{x1:244,y1:230,x2:x+60,y2:y,stroke:'var(--emp)','stroke-width':3},bwd);box(bwd,x-62,y-20,124,40,'var(--emp-soft)','none',20);t_(bwd,x,y+5,n,{'text-anchor':'middle','font-size':12,'font-weight':700});});t_(bwd,120,90,'Backward: suppliers of inputs',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--emp)'});
  const E=tab(s);tabs.push([E,7,8,true]);box(E,40,60,520,330,'var(--card)','var(--line)',12);t_(E,300,92,'Example: a cassava-to-ethanol scheme (2006)',{'text-anchor':'middle','font-size':15,'font-weight':700});
  wrap(E,64,126,'The World Bank considered helping Nigeria set up an ethanol plant covering thousands of hectares in the Niger Delta. Young farmers would get land for subsidised cassava cultivation, heavily subsidised fertiliser, and technical advice.',66,{'font-size':13});
  ['Subsidies are a real cost to the nation: include them','Jobs for young farmers and backward linkage to cassava farming','Forward linkage to ethanol users','Judge by NPW, benefit–cost ratio or IRR at economic prices'].forEach((x,i)=>t_(E,64,248+i*30,'▸ '+x,{'font-size':12.5}));
  return {update(t){showTabs(tabs,t);const k=Math.floor(t);aT.textContent=k===0?'Micro view and macro view':'What they share';H.op(both,k>=1?1:0);
    wE.forEach((r,i)=>H.op(r,H.es(t,3.1+i*.15,3.3+i*.15)));cT.textContent=k===3?'Adjusting financial data to economic data':'Shadow prices';shadow.textContent=k===4?'Revalue inputs and outputs at shadow prices where they differ greatly from market prices':'Interest and taxes only move money between groups; subsidies use real resources';
    H.op(fwd,H.es(t,5.1,5.4));H.op(bwd,k>=6?H.es(t,6.1,6.4):0);dT.textContent=k===5?'Forward linkage effects':'Backward linkage effects';
  }};
}
Course.add({id:'3.5',module:3,title:'Introduction to Economic Analysis',vizLabel:'An adjustment waterfall and a linkage web',
  hook:{who:'A state planning commission',text:'A new flour mill shows only a modest profit for its owners. The state governor asks a different question: what will it do for jobs, farmers, bakers and the economy?'},
  objectives:['Explain economic analysis and contrast it with financial analysis','Use net present worth, benefit–cost ratio and IRR','Adjust financial data for transfer payments, subsidies and shadow prices','Explain forward and backward linkages'],
  steps:[
    {h:'Two lenses on one project',t:'<p><b>Financial analysis</b> is the private investor’s micro view, focused on accounting profit. <b>Economic analysis</b> takes the macro view: will the project improve community, state and national well-being, create jobs, drive growth, create linkages, spread technical knowledge?</p>'},
    {h:'What they share',t:'<p>Both solve resource allocation problems (should a community build a school or a hospital?), both compare streams of benefits and costs, and both use discounting. The difference: economic analysis measures costs as <b>opportunity costs to society</b>.</p>'},
    {h:'Three measures of project worth',t:'<p><b>Net present worth</b> = PW of benefits − PW of costs; accept if positive. <b>Benefit–cost ratio</b> = PW benefits ÷ PW costs; accept if greater than 1; exactly 1 is a marginal, break-even project. <b>IRR</b>: the rate where PW benefits equal PW costs.</p>'},
    {h:'Adjusting the financial analysis',t:'<p>Start from the finished financial analysis. <b>Interest</b> and <b>taxes</b> are <b>transfer payments</b>: what the project loses, the bank or government gains, so society is no richer or poorer; add them back. <b>Subsidies</b> are a real opportunity cost to the nation, so include them as costs.</p>'},
    {h:'Shadow prices',t:'<p>Some inputs and outputs must be revalued at <b>shadow prices</b> where these differ significantly from market prices. Costs and benefits left out of the financial analysis may also need adding.</p>'},
    {h:'Forward linkages',t:'<p>The stimulus to industries that <b>use</b> the project’s output. A flour mill encourages bakeries. A new university attracts housing, canteens and salons.</p>'},
    {h:'Backward linkages',t:'<p>The stimulus to industries that <b>supply</b> the project’s inputs. A flour mill raises demand for wheat farming; a car assembly plant draws in tyre manufacturers.</p>'},
    {h:'An example from the course',t:'<p>In 2006 the World Bank considered a cassava-based ethanol scheme in the Niger Delta, with subsidised land, fertiliser and advice for young farmers. An economic analysis would count the subsidies as real costs, and value the jobs and linkages.</p>'}
  ],
  scene:econScene,
  sandboxIntro:'Turn a financial analysis into an economic one.',
  sandbox(ctl,st){
    const s=H.svg(st,520,260);const p={b:100,c:80,int:true,tax:true,sub:true};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s35b',label:'PV of financial benefits',min:20,max:200,value:100,fmt:v=>'₦'+v+'m'},v=>{p.b=v;draw();});
    H.slider(ctl,{id:'s35c',label:'PV of financial costs (incl. ₦10m interest, ₦12m tax)',min:20,max:200,value:80,fmt:v=>'₦'+v+'m'},v=>{p.c=v;draw();});
    H.segBtns(ctl,'Remove interest and tax (transfers)',[[true,'Yes'],[false,'No']],true,v=>{p.int=v;p.tax=v;draw();});
    H.segBtns(ctl,'Add ₦15m of subsidies as a cost',[[true,'Yes'],[false,'No']],true,v=>{p.sub=v;draw();});
    function draw(){s.innerHTML='';const ec=p.c-(p.int?22:0)+(p.sub?15:0),fb=p.b/p.c,eb=p.b/ec;
      [['Financial',p.b,p.c,fb],['Economic',p.b,ec,eb]].forEach(([l,b,c,r],i)=>{const y=30+i*110;t_(s,10,y+20,l,{'font-size':14,'font-weight':700});el('rect',{x:110,y,width:300*b/200,height:30,rx:4,fill:'var(--org)'},s);el('rect',{x:110,y:y+36,width:300*c/200,height:30,rx:4,fill:'var(--emp)'},s);
        t_(s,420,y+40,`BCR ${r.toFixed(2)}`,{'font-size':15,'font-weight':700,class:'mono',fill:r>=1?'var(--org)':'var(--err)'});});
      ro.innerHTML=`Financial NPW <b>₦${(p.b-p.c).toFixed(0)}m</b>, BCR ${fb.toFixed(2)} · Economic NPW <b>₦${(p.b-ec).toFixed(0)}m</b>, BCR ${eb.toFixed(2)}<br>${(fb>=1)!==(eb>=1)?'<b>The two analyses disagree:</b> the society view changes the decision.':'Both analyses point the same way.'}`;}
    draw();H.tag(st,'Illustrative figures');
  },
  sae:{q:'Compare and contrast financial analysis and economic analysis.',a:['Similar: both solve resource allocation problems, compare benefits and costs, and use discounting and compounding to accept or reject.','Different: financial is micro, from the investor’s view, using money profits; economic is macro, from society’s view, using opportunity costs, excluding transfer payments (interest, taxes), including subsidies, and using shadow prices and linkages.']},
  tma:{q:'What do you see as the basic differences between the financial analysis and the economic analysis of a project?',outline:['Objective: private viability vs value to society','Micro vs macro view','Measurement: market prices and profit vs opportunity cost and shadow prices','Treatment of interest, taxes (transfers) and subsidies','Economic analysis adds employment, growth, linkages, externalities','Measures: NPW, BCR, IRR']},
  quiz:[
    {q:'In economic analysis, interest charges are…',o:['Doubled','Excluded as transfer payments','Treated as subsidies','Treated as shadow prices'],a:1,w:'They move resources from the project to lenders without changing society’s total.'},
    {q:'A benefit–cost ratio of exactly 1 means the project is…',o:['Highly profitable','Marginal (break-even)','Rejected outright','Not measurable'],a:1,w:'Greater than 1 accept; exactly 1 marginal.'},
    {q:'A flour mill encouraging new bakeries is a…',o:['Backward linkage','Forward linkage','Transfer payment','Shadow price'],a:1,w:'Forward linkage: industries that use the project’s output.'},
    {q:'In economic analysis, subsidies are…',o:['Excluded','Included as a real cost to the nation','Added to benefits','Ignored if small'],a:1,w:'Subsidies are an opportunity cost to the nation.'}
  ],
  card:[{h:'Measures of worth',items:['Net present worth = PW benefits − PW costs','Benefit–cost ratio = PW benefits ÷ PW costs','IRR: PW benefits = PW costs']},{h:'Adjustments',items:['Exclude interest (transfer)','Exclude taxes (transfer)','Include subsidies (real cost)','Use shadow prices where needed']},{h:'Linkages',items:['Forward: users of output (flour → bakeries)','Backward: suppliers of inputs (wheat farming, tyres)']}]
});
})();
