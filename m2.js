/* MBA 851 Module 2 — manpower, demand, supply, competition, project cost */
(function(){
const {H}=Course, el=H.el, t_=H.t;
const tab=s=>el('g',{},s);
const box=(g,x,y,w,h,fill='var(--card)',stroke='var(--line)',rx=8)=>el('rect',{x,y,width:w,height:h,rx,fill,stroke},g);
const wrap=(g,x,y,str,max=28,a={})=>{const words=str.split(' ');let line='',ly=y;const lh=a.lh||15;words.forEach(w=>{if((line+' '+w).trim().length>max){t_(g,x,ly,line.trim(),a);line=w;ly+=lh;}else line+=' '+w;});if(line.trim())t_(g,x,ly,line.trim(),a);return ly;};
const showTabs=(tabs,t)=>tabs.forEach(([g,a,b,last])=>H.op(g,H.es(t,a-.12,a+.1)*(last?1:(1-H.es(t,b-.1,b+.05)))));
const N=v=>'₦'+Math.round(v).toLocaleString('en-NG');const n=v=>Math.round(v).toLocaleString('en-NG');
const M=v=>'₦'+(v/1e6).toFixed(v>=1e7?1:2)+'m';

/* ================= 2.1 ================= */
const IND=[['General manager',1,420000],['Accounts/admin officer',1,240000],['Marketing officer',1,240000],['Sales clerk',3,360000],['Accounts clerk',2,240000],['Secretary',1,180000],['Driver',3,288000],['Security staff',4,336000]];
const DIR=[['Production manager',1,360000],['Technicians',2,288000],['Shift supervisors',4,720000],['Laboratory technician',1,180000],['Factory attendants / operators',12,1296000]];
function manScene(stage){
  H.cap(stage,'Manpower plan: a sachet water plant');
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);t_(A,300,50,'What the evaluator examines',{'text-anchor':'middle','font-size':16,'font-weight':700});
  ['Key employees','Key responsibilities','Qualifications','Hours of work','Training and development','Remuneration'].forEach((x,i)=>{const c=i%2,r=Math.floor(i/2);box(A,60+c*250,90+r*90,230,64,'var(--org-soft)','none',12);t_(A,175+c*250,128+r*90,x,{'text-anchor':'middle','font-size':14,'font-weight':700});});
  const B=tab(s);tabs.push([B,1,2]);t_(B,300,46,'Job definitions → departments',{'text-anchor':'middle','font-size':16,'font-weight':700});
  box(B,230,70,140,40,'var(--ink)','none',8);t_(B,300,95,'General manager',{'text-anchor':'middle','font-size':12.5,'font-weight':700,fill:'var(--paper)'});
  [['Production',100,['Production manager','Shift supervisors','Technicians','Lab technician','Operators']],['Marketing',300,['Marketing officer','Sales clerks','Drivers']],['Finance',500,['Accounts/admin officer','Accounts clerks']]].forEach(([d,x,jobs])=>{el('line',{x1:300,y1:110,x2:x,y2:150,stroke:'var(--line)','stroke-width':2},B);box(B,x-80,150,160,36,'var(--org-soft)','none',8);t_(B,x,173,d,{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--org)'});jobs.forEach((j,i)=>{box(B,x-80,198+i*38,160,30,'var(--card)','var(--line)',6);t_(B,x,218+i*38,j,{'text-anchor':'middle','font-size':11.5});});});
  const C=tab(s);tabs.push([C,2,3]);t_(C,300,46,'Two users of the manpower plan',{'text-anchor':'middle','font-size':16,'font-weight':700});
  [['Project initiator','Knows in advance who the key staff will be, their responsibilities and qualifications'],['Bank or lender','Checks that the management skills exist before granting a loan or overdraft']].forEach(([a,b],i)=>{const x=40+i*270;box(C,x,80,250,280,i?'var(--data-soft)':'var(--org-soft)','none',14);H.person(C,x+125,170,i?'var(--data)':'var(--org)',3);t_(C,x+125,230,a,{'text-anchor':'middle','font-size':15,'font-weight':700});wrap(C,x+125,262,b,30,{'text-anchor':'middle','font-size':12.5});});
  const D=tab(s);tabs.push([D,3,4]);t_(D,300,40,'36 staff: direct and indirect labour',{'text-anchor':'middle','font-size':16,'font-weight':700});
  const ppl=[];for(let i=0;i<36;i++){const g=el('g',{},D);H.person(g,0,0,i<20?'var(--org)':'var(--emp)',1.5);ppl.push(g);}
  const dL=t_(D,150,400,'Direct labour: 20',{'text-anchor':'middle','font-size':14,'font-weight':700,fill:'var(--org)'}),iL=t_(D,450,400,'Indirect labour: 16',{'text-anchor':'middle','font-size':14,'font-weight':700,fill:'var(--emp)'});
  const E=tab(s);tabs.push([E,4,6,true]);const eT=t_(E,300,30,'',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const rows=[...DIR.map(r=>[...r,'d']),...IND.map(r=>[...r,'i'])].sort((a,b)=>b[2]-a[2]);const mx=1400000;
  const rowsG=el('g',{},E);const rEls=rows.map(([p,c,v,k],i)=>{const y=48+i*25;t_(rowsG,200,y+15,`${p} (${c})`,{'text-anchor':'end','font-size':11});const r=el('rect',{x:208,y:y+3,height:17,rx:3,fill:k==='d'?'var(--org)':'var(--emp)'},rowsG);const tx=t_(rowsG,0,y+16,'',{'font-size':10.5,class:'mono'});return {r,tx,v};});
  const stack=el('g',{},E);const sx=40,sw=520,tot=5662800;const seg=[[2844000,'var(--org)','Direct ₦2,844,000'],[2304000,'var(--emp)','Indirect ₦2,304,000'],[514800,'var(--data)','Welfare 10% ₦514,800']];let acc=0;seg.forEach(([v,c,l],i)=>{const x=sx+sw*acc/tot,w=sw*v/tot;el('rect',{x,y:300,width:w,height:48,fill:c},stack);t_(stack,x+w/2,i===2?395:375,l,{'text-anchor':'middle','font-size':11.5,'font-weight':700});acc+=v;});
  t_(stack,300,290,'Total salary, wages and welfare: ₦5,662,800 a year',{'text-anchor':'middle','font-size':13.5,'font-weight':700});
  return {update(t){showTabs(tabs,t);
    const sp=H.es(t,3.2,3.8);ppl.forEach((g,i)=>{const d=i<20;const j=d?i:i-20;const gx=d?(50+(j%5)*46):(360+(j%4)*50),gy=d?(110+Math.floor(j/5)*66):(110+Math.floor(j/4)*66);const mx0=60+(i%9)*60,my0=110+Math.floor(i/9)*66;g.setAttribute('transform',`translate(${H.lerp(mx0,gx,sp)},${H.lerp(my0,gy,sp)})`);});H.op(dL,sp);H.op(iL,sp);
    const bp=H.es(t,4.1,4.7);rEls.forEach(r=>{const w=300*r.v/mx*bp;H.set(r.r,{width:w});H.set(r.tx,{x:212+w});r.tx.textContent=bp>.8?n(r.v):'';});H.op(stack,H.es(t,5,5.3));rEls.forEach(r=>{H.op(r.r,1-H.es(t,5,5.2)*.0);});
    eT.textContent=t<5?'Annual outlay by post':'';H.op(rowsG,1-H.es(t,5,5.2));
  }};
}
Course.add({id:'2.1',module:2,title:'Manpower Planning and Evaluation',vizLabel:'Staff sorted into direct and indirect labour',
  hook:{who:'Kelechi, project initiator',text:'Kelechi’s sachet water business plan is ready except for one page: the manpower plan. His bank officer says she will not lend until she knows who will run the plant and what they will cost.'},
  objectives:['Explain manpower planning and evaluation in a project','Describe job definition and departmentalisation','Distinguish direct from indirect labour','Build a manpower requirement and outlay table'],
  steps:[
    {h:'Labour coordinates the other factors',t:'<p>Every enterprise needs labour; labour coordinates land and capital. The evaluator examines key employees, their responsibilities, qualifications, hours of work, training and development, and remuneration.</p>'},
    {h:'Organising the project',t:'<p>Organising assigns duties and coordinates effort toward the firm’s objectives, but a plan comes first. Two things matter: <b>job definitions</b> and <b>departmentalisation</b>, grouping similar jobs. The commonest way is by function: production, marketing, finance.</p>'},
    {h:'Two uses of the manpower plan',t:'<p>The <b>project initiator</b> uses it to structure the project and know in advance who the key staff will be. <b>Banks</b> use it before granting a loan or overdraft, to be convinced the management skills exist, matching people and qualifications to jobs. Pay should hover around the industry average.</p>'},
    {h:'Direct and indirect labour',t:'<p><b>Direct labour</b> works on actual production: production manager, supervisors, technicians, lab technician, factory attendants (20 people). <b>Indirect labour</b> does not work directly on the product: accounts, admin, marketing, drivers, security (16 people).</p>'},
    {h:'The outlay by post',t:'<p>The course’s plan lists each post, its specification (e.g. HND water technology for the production manager) and annual outlay. Twelve factory attendants together cost ₦1,296,000 a year, the largest single line.</p>'},
    {h:'The total bill',t:'<p>Direct ₦2,844,000 + indirect ₦2,304,000 = ₦5,148,000. Add staff welfare at 10% (₦514,800) for a total of <b>₦5,662,800</b> a year, which feeds into the projected income statement.</p>'}
  ],
  scene:manScene,
  sandboxIntro:'Change the staffing and see the annual bill.',
  sandbox(ctl,st){
    const s=H.svg(st,520,240);const p={op:12,pay:100,wf:10};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s21o',label:'Factory attendants / operators',min:4,max:30,value:12},v=>{p.op=v;draw();});
    H.slider(ctl,{id:'s21p',label:'Pay level vs course figures',min:70,max:150,step:5,value:100,fmt:v=>v+'%'},v=>{p.pay=v;draw();});
    H.slider(ctl,{id:'s21w',label:'Staff welfare',min:0,max:25,value:10,fmt:v=>v+'%'},v=>{p.wf=v;draw();});
    function draw(){s.innerHTML='';const k=p.pay/100;const dir=(2844000-1296000+108000*p.op)*k,ind=2304000*k,wf=(dir+ind)*p.wf/100,tot=dir+ind+wf;
      [[dir,'var(--org)','Direct'],[ind,'var(--emp)','Indirect'],[wf,'var(--data)','Welfare']].reduce((acc,[v,c,l])=>{const x=20+480*acc/tot,w=480*v/tot;el('rect',{x,y:80,width:w,height:60,fill:c},s);if(w>40)t_(s,x+w/2,165,l,{'text-anchor':'middle','font-size':12,'font-weight':700});return acc+v;},0);
      t_(s,260,50,'Total: '+N(tot)+' a year',{'text-anchor':'middle','font-size':17,'font-weight':700});
      ro.innerHTML=`Staff: <b>${p.op+24}</b> · direct ${N(dir)} · indirect ${N(ind)} · welfare ${N(wf)}<br>Each operator costs about ${N(108000*k)} a year.`;}
    draw();
  },
  sae:{q:'List and explain four departments that could be found in a big manufacturing firm.',a:['Production: makes the goods; direct labour.','Marketing: sells and promotes the products.','Finance and accounts: books, payments, budgeting.','Administration / human resources: staffing, welfare, office services. (Others: quality control, maintenance, purchasing.)']},
  tma:{q:'Why is a manpower plan important in a start-up project?',outline:['Shapes the organisation: job definitions and departments','Tells the initiator in advance who the key staff are, their duties and qualifications','Banks use it to judge management skills before lending','Gives the salary and wages bill for the projected income statement','Separates direct from indirect labour for costing']},
  quiz:[
    {q:'Which of these is direct labour in a soap plant?',o:['Accounts clerk','Marketing officer','Production supervisor','Security staff'],a:2,w:'Direct labour works on actual production.'},
    {q:'In the course example, staff welfare is added at…',o:['5%','10%','15%','20%'],a:1,w:'₦514,800 is 10% of ₦5,148,000.'},
    {q:'Why do banks study the manpower plan?',o:['To set salaries','To be convinced the management skills exist before lending','To recruit staff','To pay taxes'],a:1,w:'Lenders match people and qualifications to the jobs.'}
  ],
  card:[{h:'Examine',items:['Key employees','Responsibilities','Qualifications','Hours of work','Training and development','Remuneration']},{h:'Course example totals',items:['Direct labour: 20 staff, ₦2,844,000','Indirect labour: 16 staff, ₦2,304,000','Welfare 10%: ₦514,800','Total: ₦5,662,800']}]
});

/* ================= 2.2 ================= */
const CENSUS=[['Kano',9383682],['Lagos',9013534],['Kaduna',6066562],['Katsina',5792578],['Oyo',5591589],['Rivers',5185400],['Bauchi',4676465],['Jigawa',4348649],['Benue',4219244],['Anambra',4182032]];
function demandScene(stage){
  H.cap(stage,'Demand analysis');
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);t_(A,300,38,'An analytical framework for demand',{'text-anchor':'middle','font-size':15,'font-weight':700});
  ['Get total population data and make projections','Study the details of the population','Define the good or service','Define demand to guide your direction','Look at factors affecting demand','Generate conditional demand (quantitative and qualitative)','Project future demand'].forEach((x,i)=>{box(A,60,58+i*52,480,40,'var(--org-soft)','none',20);t_(A,84,83+i*52,`${i+1}`,{'font-size':14,'font-weight':700,fill:'var(--org)',class:'mono'});t_(A,110,83+i*52,x,{'font-size':13});});
  const B=tab(s);tabs.push([B,1,2]);t_(B,300,34,'Census 2006: ten most populous states',{'text-anchor':'middle','font-size':15,'font-weight':700});const cB=CENSUS.map(([st,v],i)=>{const y=52+i*34;t_(B,110,y+19,st,{'text-anchor':'end','font-size':12.5});const r=el('rect',{x:118,y:y+4,height:22,rx:3,fill:'var(--data)'},B);const tx=t_(B,0,y+20,'',{'font-size':11,class:'mono'});return {r,tx,v};});
  t_(B,300,420,'Nigeria total: 140,003,542',{'text-anchor':'middle','font-size':13,'font-weight':700});
  const C=tab(s);tabs.push([C,2,3]);const cT=t_(C,300,36,'',{'text-anchor':'middle','font-size':15,'font-weight':700});const dots=[];for(let i=0;i<100;i++){dots.push(el('circle',{cx:150+(i%10)*30,cy:70+Math.floor(i/10)*30,r:10},C));}const cN=t_(C,300,400,'',{'text-anchor':'middle','font-size':12.5});
  const D=tab(s);tabs.push([D,3,4]);t_(D,300,40,'Consumer or customer?',{'text-anchor':'middle','font-size':16,'font-weight':700});
  [['Consumer','uses the product for personal benefit, or changes its form: a soap maker consuming caustic soda','var(--org-soft)'],['Customer','may be a consumer, or a dealer who buys and resells','var(--emp-soft)']].forEach(([a,b,c],i)=>{box(D,40+i*270,70,250,150,c,'none',14);t_(D,165+i*270,104,a,{'text-anchor':'middle','font-size':16,'font-weight':700});wrap(D,165+i*270,134,b,30,{'text-anchor':'middle','font-size':12.5});});
  t_(D,300,262,'Define the customer you serve, even for a service:',{'text-anchor':'middle','font-size':13});['Hotels for students','Hotels for travellers','Hotels for high-class individuals'].forEach((x,i)=>{box(D,40+i*180,280,170,48,'var(--sunk)','none',24);t_(D,125+i*180,309,x,{'text-anchor':'middle','font-size':12});});
  const E=tab(s);tabs.push([E,4,6]);const ax=H.axes(E,{x:80,y:70,w:440,h:280,xmin:0,xmax:10,ymin:0,ymax:10,xt:[],yt:[],xl:'Quantity demanded →',yl:'↑ Price'});
  const dc=el('path',{fill:'none',stroke:'var(--data)','stroke-width':3.5},E),dc0=el('path',{fill:'none',stroke:'var(--data)','stroke-width':2,'stroke-dasharray':'5 5',opacity:.5},E),dd=el('circle',{r:7,fill:'var(--emp)'},E);
  const share=el('rect',{y:ax.sy(5.2),height:ax.sy(0)-ax.sy(5.2),fill:'var(--org-soft)'},E);const shT=t_(E,0,0,'project demand',{'font-size':11.5,'font-weight':700,fill:'var(--org)','text-anchor':'middle'});
  const eT=t_(E,300,36,'',{'text-anchor':'middle','font-size':15,'font-weight':700}),eN=t_(E,300,400,'',{'text-anchor':'middle','font-size':12.5});
  const F=tab(s);tabs.push([F,6,7]);t_(F,300,40,'Not all demand is for consumer goods',{'text-anchor':'middle','font-size':16,'font-weight':700});
  [['Consumer goods','bought for final use: a tyre bought by Mr Solomon for his car'],['Intermediate goods','used to make consumer goods: flour for bread; tyres bought by a car maker'],['Capital goods','used to make other goods and last long: a manufacturing plant']].forEach(([a,b],i)=>{box(F,60,80+i*100,480,80,['var(--emp-soft)','var(--data-soft)','var(--org-soft)'][i],'none',12);t_(F,80,110+i*100,a,{'font-size':15,'font-weight':700});wrap(F,80,134+i*100,b,64,{'font-size':12.5});});
  const G=tab(s);tabs.push([G,7,8]);t_(G,300,50,'Building market demand',{'text-anchor':'middle','font-size':16,'font-weight':700});
  t_(G,300,120,'Market demand = X × Y',{'text-anchor':'middle','font-size':26,'font-weight':700,class:'mono'});t_(G,300,150,'X = people in the population · Y = average units each consumes a year',{'text-anchor':'middle','font-size':12.5,fill:'var(--muted)'});
  box(G,80,190,440,170,'var(--org-soft)','none',14);t_(G,300,222,'Madas: 400,000 people, one bottle of water each a day',{'text-anchor':'middle','font-size':13.5,'font-weight':700});
  const gN=t_(G,300,290,'',{'text-anchor':'middle','font-size':24,'font-weight':700,class:'mono'});t_(G,300,330,'bottles of water a year',{'text-anchor':'middle','font-size':13});
  const Hh=tab(s);tabs.push([Hh,8,9,true]);const hax=H.axes(Hh,{x:70,y:70,w:470,h:270,xmin:0,xmax:12,ymin:0,ymax:100,xt:[[0,'Yr 0'],[4,'4'],[8,'8'],[12,'12']],yt:[0,50,100],xl:'time',yl:'Demand (illustrative)'});
  const r=H.seeded(3);const past=[];for(let i=0;i<=8;i++)past.push([i,30+4.5*i+(r()-.5)*8]);past.forEach(([x,y])=>el('circle',{cx:hax.sx(x),cy:hax.sy(y),r:5,fill:'var(--data)'},Hh));
  const trend=el('line',{stroke:'var(--org)','stroke-width':3},Hh),fc=el('line',{stroke:'var(--org)','stroke-width':3,'stroke-dasharray':'8 6'},Hh);const hT=t_(Hh,300,36,'',{'text-anchor':'middle','font-size':15,'font-weight':700}),hN=t_(Hh,300,400,'',{'text-anchor':'middle','font-size':12.5});
  const D0=q=>9-q*.8;
  return {update(t){showTabs(tabs,t);const k=Math.floor(t);
    const bp=H.es(t,1.1,1.7);cB.forEach(b=>{const w=380*b.v/9383682*bp;H.set(b.r,{width:w});H.set(b.tx,{x:124+w});b.tx.textContent=bp>.8?(b.v/1e6).toFixed(2)+'m':'';});
    const sub=H.seg(t,2,2.9);const mode=sub<.5?'f':'b';const sh=mode==='f'?50:4;cT.textContent=mode==='f'?'A lipstick maker’s market: the female population':'A toy maker’s market: babies and young children';
    dots.forEach((d,i)=>H.set(d,{fill:i<sh?(mode==='f'?'var(--emp)':'var(--org)'):'var(--sunk)'}));cN.textContent='Each dot ≈ 1% of the population (illustrative shares)';
    const fp=H.es(t,5.1,5.6);const shift=fp*2.2;const pts=[],p0=[];for(let i=0;i<=40;i++){const q=10*i/40;const pr=D0(q-shift);if(pr>=0&&pr<=10)pts.push([ax.sx(q),ax.sy(pr)]);const pr0=D0(q);if(pr0>=0)p0.push([ax.sx(q),ax.sy(pr0)]);}
    H.set(dc,{d:H.path(pts)});H.set(dc0,{d:H.path(p0)});H.op(dc0,fp);
    const mv=H.seg(t,4.2,4.9);const q=k===4?2+5*mv:5+shift;H.set(dd,{cx:ax.sx(q),cy:ax.sy(D0(q-shift))});
    H.set(share,{x:ax.sx(0),width:ax.sx(1.6)-ax.sx(0),y:ax.sy(5.2)});H.set(shT,{x:ax.sx(.8),y:ax.sy(5.2)-8});H.op(share,k===4&&mv>.6?1:0);H.op(shT,k===4&&mv>.6?1:0);
    eT.textContent=k===4?'Demand: quantities buyers will take at each price':'Income, population or a complement’s price shifts the curve';eN.textContent=k===4?'Higher price, smaller quantity. Project demand is a share of total market demand.':'Rising incomes or population move the whole curve to the right';
    gN.textContent=n(400000*365*H.es(t,7.1,7.7));
    const tp=H.es(t,8.1,8.6);H.set(trend,{x1:hax.sx(0),y1:hax.sy(30),x2:hax.sx(8),y2:hax.sy(66)});H.set(fc,{x1:hax.sx(8),y1:hax.sy(66),x2:hax.sx(8+4*tp),y2:hax.sy(66+18*tp)});
    hT.textContent='Time series: past demand projected forward';hN.textContent='Slope of the trend ≈ +4.5 units a year: the expected growth in demand';
  }};
}
Course.add({id:'2.2',module:2,title:'Demand Analysis',vizLabel:'Census bars, a demand curve and a trend line',
  hook:{who:'Bisi, entrepreneur',text:'Bisi plans a sachet water plant in Ibadan. Her cousin says “everybody drinks water, so the market is 140 million people.” Bisi suspects the real number is smaller. How should she measure it?'},
  objectives:['Explain what demand analysis is and why it matters','Follow the analytical framework for demand','Distinguish total market demand from project demand','Estimate market demand and describe forecasting techniques'],
  steps:[
    {h:'A framework for demand analysis',t:'<p>Demand analysis is the measurement and forecasting of demand for a project’s goods or services, a peep into the future. Both initiators and lending banks use it. The course’s framework has seven steps, from population data to projections.</p>'},
    {h:'Start with population data',t:'<p>The 2006 census put Nigeria at <b>140,003,542</b>. Kano (9.38m) and Lagos (9.01m) lead, then Kaduna, Katsina and Oyo.</p>'},
    {h:'Analyse the population',t:'<p>The total is not the end of the job. A lipstick maker cares about the female population; a baby-toy maker cares about the number of babies. Break the population down by state, LGA, sex, age, household, literacy and economic activity.</p>'},
    {h:'Who are your potential customers?',t:'<p>A <b>consumer</b> uses a product for personal benefit, or changes its form (a soap maker consuming caustic soda). A <b>customer</b> may be a consumer or a dealer who resells. Define the customers you will serve, as hotels do for students, travellers and the wealthy.</p>'},
    {h:'Define demand',t:'<p>Demand is the total quantity that able customers in a defined area will buy at set prices. The demand curve slopes downward. <b>Total market demand</b> is for the whole area; <b>project demand</b> is the project’s share of it. Confusing the two is a fatal mistake.</p>'},
    {h:'Factors that shift demand',t:'<p>Price moves you along the curve. <b>Income</b> and <b>population</b> shift it: richer or larger populations buy more. Ethnic and religious structure matter (palm oil in the south, groundnut oil in the north; pork). Prices of complements such as tea and sugar also matter.</p>'},
    {h:'Intermediate and capital goods',t:'<p><b>Intermediate goods</b> are used to make consumer goods: flour for bread, tyres for a car maker. <b>Capital goods</b> make both and last a long time: a manufacturing plant.</p>'},
    {h:'Building market demand: X × Y',t:'<p>If X is the population and Y is the average units each person consumes a year, total market demand is <b>XY</b>. In Madas, 400,000 people drink one bottle a day: 400,000 × 365 = <b>146,000,000 bottles</b> a year.</p>'},
    {h:'Forecasting future demand',t:'<p><b>Qualitative</b> techniques: expert opinion and the sales force composite. <b>Quantitative</b> techniques use past data and are less subjective, such as the <b>time series</b>, which relates demand to time. The slope of the trend line is the expected yearly growth.</p>'}
  ],
  scene:demandScene,
  sandboxIntro:'Estimate market demand and your project’s share.',
  sandbox(ctl,st){
    const s=H.svg(st,520,260);const p={x:400,y:365,sh:5};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s22x',label:'People in the target market (X)',min:50,max:3000,step:50,value:400,fmt:v=>n(v*1000)},v=>{p.x=v;draw();});
    H.slider(ctl,{id:'s22y',label:'Units per person per year (Y)',min:12,max:730,step:1,value:365},v=>{p.y=v;draw();});
    H.slider(ctl,{id:'s22s',label:'Project share of the market',min:1,max:50,value:5,fmt:v=>v+'%'},v=>{p.sh=v;draw();});
    function draw(){s.innerHTML='';const md=p.x*1000*p.y,pd=md*p.sh/100;el('rect',{x:20,y:60,width:480,height:70,rx:6,fill:'var(--data-soft)'},s);el('rect',{x:20,y:60,width:480*p.sh/100,height:70,rx:6,fill:'var(--org)'},s);
      t_(s,20,48,'Total market demand: '+n(md)+' units a year',{'font-size':13,'font-weight':700});t_(s,20,160,'Project demand: '+n(pd)+' units a year',{'font-size':13,'font-weight':700,fill:'var(--org)'});
      ro.innerHTML=`X × Y = ${n(p.x*1000)} × ${p.y} = <b>${n(md)}</b>. At ${p.sh}% share, the project plans for <b>${n(pd)}</b> units.`;}
    draw();
  },
  sae:{q:'There are 400,000 persons in a city called Madas. Each person drinks a bottle of water daily. What is the annual demand for water in Madas?',a:'X × Y = 400,000 × 365 = <b>146,000,000 bottles</b> a year.'},
  tma:{q:'Why is the analysis of population data important when building a demand analysis?',outline:['Population is the starting point of demand (X in X × Y)','The total is not the market: segment by sex, age, location, income, literacy','Examples: lipstick → female population; baby toys → babies','Ethnic and religious structure change what is bought','It separates total market demand from project demand and supports forecasts']},
  quiz:[
    {q:'Project demand is…',o:['Total demand in Nigeria','The project’s share of total market demand','The price of the product','Supply minus exports'],a:1,w:'Confusing market and project demand leads to fatal mistakes.'},
    {q:'Which shifts the whole demand curve to the right?',o:['A fall in the product’s own price','A rise in population income','A rise in the product’s own price','Higher production cost'],a:1,w:'Own price moves along the curve; income and population shift it.'},
    {q:'Flour bought by a bakery is…',o:['A consumer good','An intermediate good','A capital good','A substitute'],a:1,w:'It is used to make a consumer good, bread.'},
    {q:'Which is a quantitative forecasting technique?',o:['Expert opinion','Sales force composite','Time series','Delphi panel of salesmen'],a:2,w:'Time series uses past data and is less subjective.'}
  ],
  card:[{h:'Demand framework',ordered:true,items:['Population data and projections','Study population details','Define the good or service','Define demand','Factors affecting demand','Conditional demand','Projections']},{h:'Factors affecting demand',items:['Price','Income','Population (size, ethnic and religious structure)','Prices of other goods (complements)']},{h:'Key formula',items:['Market demand = X × Y','Madas: 400,000 × 365 = 146,000,000']}]
});

/* ================= 2.3 ================= */
function supplyScene(stage){
  H.cap(stage,'The supply equation');H.tag(stage);
  const s=H.svg(stage,600,440);
  const pool=el('rect',{x:220,y:200,width:160,rx:8,fill:'var(--data-soft)'},s);el('rect',{x:220,y:200,width:160,height:160,rx:8,fill:'none',stroke:'var(--muted)','stroke-width':2},s);t_(s,300,384,'Supply available locally (X)',{'text-anchor':'middle','font-size':12,'font-weight':700});
  const pipe=(d,c)=>el('path',{d,fill:'none',stroke:c,'stroke-width':12,'stroke-linecap':'round',opacity:.85},s);
  const pA=pipe('M40 120 C 160 120 180 220 225 240','var(--org)'),pB=pipe('M560 120 C 440 120 420 220 375 240','var(--emp)'),pC=pipe('M300 360 C 300 400 420 410 560 410','var(--err)');
  const lA=t_(s,40,104,'A: domestic supply',{'font-size':13,'font-weight':700,fill:'var(--org)'}),lB=t_(s,560,104,'B: foreign supply (imports)',{'font-size':13,'font-weight':700,fill:'var(--emp)','text-anchor':'end'}),lC=t_(s,560,432,'C: exports',{'font-size':13,'font-weight':700,fill:'var(--err)','text-anchor':'end'});
  const eq=t_(s,300,52,'',{'text-anchor':'middle','font-size':22,'font-weight':700,class:'mono'});const eq2=t_(s,300,78,'',{'text-anchor':'middle','font-size':13,fill:'var(--muted)'});
  const dl=el('line',{x1:210,x2:390,stroke:'var(--ink)','stroke-width':3,'stroke-dasharray':'8 5'},s);const dlT=t_(s,396,0,'demand 95',{'font-size':12,'font-weight':700});const gap=el('rect',{x:220,width:160,fill:'var(--org)',opacity:.25},s);const gapT=t_(s,300,0,'gap = opportunity',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--org)'});
  const sup=el('g',{},s);const sp=[['Big',40,'var(--org)'],['Big',32,'var(--org)'],['Medium',20,'var(--data)'],['Medium',16,'var(--data)'],['Small',9,'var(--emp)'],['Small',7,'var(--emp)'],['Small',6,'var(--emp)']];
  el('rect',{x:20,y:120,width:560,height:300,rx:12,fill:'var(--card)',stroke:'var(--line)'},sup);t_(sup,300,146,'Who supplies? Players by installed capacity',{'text-anchor':'middle','font-size':14,'font-weight':700});
  sp.forEach(([c,r,col],i)=>{el('circle',{cx:70+i*75,cy:250,r:r,fill:col,opacity:.75},sup);t_(sup,70+i*75,320,c,{'text-anchor':'middle','font-size':11});});
  ['Number of players','Installed and actual operating capacities','Expansion plans','Labour and raw material costs and trends','Size category: big, medium, small'].forEach((x,i)=>t_(sup,40,350+i*14,'▸ '+x,{'font-size':10.5}));
  const A=60,B=25,C=10;
  return {update(t){const k=Math.floor(t);const a=H.es(t,1,1.5),b=H.es(t,2,2.5),c=H.es(t,3,3.5);
    H.op(pA,.2+.8*a);H.op(lA,.3+.7*a);H.op(pB,.2+.8*b);H.op(lB,.3+.7*b);H.op(pC,.2+.8*c);H.op(lC,.3+.7*c);
    const X=A*a+B*b-C*c;const h=160*X/100;H.set(pool,{y:360-h,height:h});
    eq.textContent=k<1?'Who supplies the market?':k<4?`X = (A + B) − C`:`X = (${A} + ${B}) − ${C} = ${A+B-C}`;eq2.textContent=k>=4?'million litres of liquid soap a year':k<1?'Abando Nigeria Ltd studies the liquid soap market':'';
    const dp=H.es(t,5,5.4);const dy=360-160*95/100;H.set(dl,{y1:dy,y2:dy});H.set(dlT,{y:dy+4});H.op(dl,dp);H.op(dlT,dp);H.set(gap,{y:dy,height:(360-h)-dy});H.set(gapT,{y:dy+((360-h)-dy)/2+4});H.op(gap,dp);H.op(gapT,dp);
    H.op(sup,H.es(t,6,6.2));
  }};
}
Course.add({id:'2.3',module:2,title:'Supply Analysis',vizLabel:'Three pipes filling a supply pool',
  hook:{who:'Abando Nigeria Ltd',text:'Abando wants to build a liquid soap factory. Demand looks strong, but how much liquid soap is already reaching Nigerian shoppers, from local factories and from imports?'},
  objectives:['Explain what supply analysis is','Use the supply equation X = (A + B) − C','Identify the demand–supply gap','List the facts to collect about suppliers'],
  steps:[
    {h:'The supply side of the market',t:'<p>Supply analysis identifies the supply of a good or service, who the suppliers are and where they are. Together with demand it reveals the <b>demand–supply gap</b>, the space a new project can fill.</p>'},
    {h:'A: domestic supply',t:'<p>What local producers put on the market. Sources include official output data such as the course’s table of output values by product.</p>'},
    {h:'B: foreign supply',t:'<p>Imports add to what is available locally.</p>'},
    {h:'C: exports',t:'<p>Exported quantities leave the country and are not available for local consumption, so they are subtracted.</p>'},
    {h:'The supply equation',t:'<p><b>X = (A + B) − C</b>. With illustrative figures of 60 million litres made locally, 25 million imported and 10 million exported, supply is 75 million litres.</p>'},
    {h:'The demand–supply gap',t:'<p>If demand is 95 million litres and supply is 75 million, there is an unmet gap of 20 million litres: the project’s opportunity.</p>'},
    {h:'Analysing supply data',t:'<p>Supply totals are not enough. Find the number of players, their installed and actual operating capacities, expansion plans, critical labour and raw material costs and their direction, and group suppliers as big, medium or small. This feeds the marketing plan.</p>'}
  ],
  scene:supplyScene,
  sandboxIntro:'Set the three components of supply and the demand, and read off the gap.',
  sandbox(ctl,st){
    const s=H.svg(st,520,260);const p={a:60,b:25,c:10,d:95};const ro=H.readout(ctl);
    [['a','A: domestic supply'],['b','B: imports'],['c','C: exports'],['d','Demand']].forEach(([k,l])=>H.slider(ctl,{id:'s23'+k,label:l,min:0,max:150,value:p[k],fmt:v=>v+'m'},v=>{p[k]=v;draw();}));
    function draw(){s.innerHTML='';const X=p.a+p.b-p.c,mx=Math.max(150,X,p.d),sc=v=>420*v/mx;
      el('rect',{x:60,y:50,width:sc(Math.max(0,X)),height:50,rx:5,fill:'var(--data)'},s);t_(s,50,80,'Supply',{'text-anchor':'end','font-size':12,'font-weight':700});
      el('rect',{x:60,y:130,width:sc(p.d),height:50,rx:5,fill:'var(--org)'},s);t_(s,50,160,'Demand',{'text-anchor':'end','font-size':12,'font-weight':700});
      const g=p.d-X;ro.innerHTML=`X = (${p.a} + ${p.b}) − ${p.c} = <b>${X}m</b>.<br>${g>0?`Gap of <b>${g}m</b>: room for a new project.`:`<span style="color:var(--err)">Supply exceeds demand by ${-g}m: a new entrant must take share from others.</span>`}`;}
    draw();H.tag(st,'Illustrative figures');
  },
  sae:{q:'Explain the supply equation and its relevance.',a:'X = (A + B) − C, where A is domestic supply, B foreign supply (imports) and C exports. It shows how much is actually available to local buyers. Compared with demand it reveals the demand–supply gap that a new project can serve.'},
  tma:{q:'Discuss the three components of supply that make up the supply equation.',outline:['A: domestic supply, from local producers','B: foreign supply, imported quantity','C: exports, removed because not available locally','X = (A + B) − C; example','Use with demand to find the gap; then study suppliers’ capacities and costs']},
  quiz:[
    {q:'In X = (A + B) − C, what is C?',o:['Imports','Exports','Domestic supply','Consumption'],a:1,w:'Exports are not available for local consumption.'},
    {q:'Domestic 50, imports 30, exports 20. Supply is…',o:['100','60','80','40'],a:1,w:'(50 + 30) − 20 = 60.'},
    {q:'Why does a project evaluator want the demand–supply gap?',o:['To set salaries','It shows unmet demand the project could serve','To compute tax','To pick a location'],a:1,w:'A positive gap is the project’s opportunity.'}
  ],
  card:[{h:'Supply equation',items:['X = (A + B) − C','A domestic supply','B foreign supply (imports)','C exports']},{h:'Facts about suppliers',items:['Number of players','Installed capacities','Actual operating capacities','Expansion plans','Labour costs','Raw material costs and trends','Big, medium or small']}]
});

/* ================= 2.4 ================= */
const FORCES=[['Rivalry among current competitors',300,240],['Threat of new entrants',300,104],['Bargaining power of suppliers',100,240],['Bargaining power of customers',500,240],['Threat of substitutes',300,380]];
function compScene(stage){
  H.cap(stage,'Forces governing competition (Porter, 1980)');
  const s=H.svg(stage,600,440);
  const fr=el('g',{},s);
  const nodes=FORCES.map(([n,x,y],i)=>{const g=el('g',{},fr);if(i)el('line',{x1:x,y1:y,x2:300,y2:240,stroke:'var(--line)','stroke-width':3},fr);const r=box(g,x-(i?90:110),y-(i?32:46),i?180:220,i?64:92,i?'var(--card)':'var(--org-soft)',i?'var(--line)':'var(--org)',12);wrap(g,x,y-(i?4:8),n,i?22:20,{'text-anchor':'middle','font-size':12.5,'font-weight':700});return {g,r};});
  const arrows=FORCES.slice(1).map(([n,x,y])=>{const a=el('path',{fill:'var(--err)'},s);return {a,x,y};});
  const note=el('g',{},s);box(note,20,12,560,38,'var(--sunk)','none',10);const nT=t_(note,300,36,'',{'text-anchor':'middle','font-size':12.5});
  const fw=el('g',{},s);box(fw,20,20,560,400,'var(--card)','var(--line)',12);t_(fw,300,50,'Competition: a framework for analysis',{'text-anchor':'middle','font-size':15,'font-weight':700});
  [['Industry outlook',['Demand: usefulness, desire, stability','Supply capacity of the industry','Labour and raw material costs','Taxation, permits, regulation']],['Company’s position',['Market position and products','Standing of its products','Location and comparative location','Equipment efficiency and cost advantages','Financial strength and management ability']]].forEach(([h,it],i)=>{const x=40+i*275;box(fw,x,72,255,330,i?'var(--data-soft)':'var(--org-soft)','none',10);t_(fw,x+16,100,h,{'font-size':14,'font-weight':700});it.forEach((x2,j)=>wrap(fw,x+16,130+j*52,'▸ '+x2,34,{'font-size':12}));});
  const mp=el('g',{},s);box(mp,20,20,560,400,'var(--card)','var(--line)',12);t_(mp,300,50,'The marketing plan must answer',{'text-anchor':'middle','font-size':15,'font-weight':700});
  ['What is the product or service?','What are its uses?','What is the offered price?','Where will it be found?','How will it be advertised?'].forEach((x,i)=>{box(mp,60,74+i*48,480,38,'var(--emp-soft)','none',19);t_(mp,84,98+i*48,x,{'font-size':13.5});});
  t_(mp,300,330,'Plus: market size, competitors and their prices, trends,',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});t_(mp,300,348,'market share sought, strengths, weaknesses, competitive advantage,',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});t_(mp,300,366,'distribution, promotion and customer service policy',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  const notes=['','Firms jockey for position; some lead, some follow, some close shop','New entrants bring new capacity; the threat depends on barriers and incumbents’ reaction','Strong suppliers can raise prices and influence prices generally','Powerful buyer groups more or less dictate the price they will pay','Substitutes limit an industry’s potential: sugar limits honey'];
  return {update(t){const k=Math.floor(t);H.op(fw,k===0?1:0);H.op(mp,k>=6?H.es(t,6,6.2):0);H.op(note,k>=1&&k<=5?1:0);nT.textContent=notes[Math.min(5,k)]||'';
    nodes.forEach((nd,i)=>{const on=k===i+1;H.set(nd.r,{fill:on?(i?'var(--err-soft)':'var(--org)'):(i?'var(--card)':'var(--org-soft)'),stroke:on?'var(--err)':i?'var(--line)':'var(--org)'});nd.g.querySelectorAll('text').forEach(x=>H.set(x,{fill:on&&!i?'var(--card)':'var(--ink)'}));});
    arrows.forEach((a,i)=>{const on=k===i+2;const dx=300-a.x,dy=240-a.y,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L;const p=H.seg(t,i+2,i+2.8);const st=.45+.2*p;const cx=a.x+dx*st,cy=a.y+dy*st;H.set(a.a,{d:`M${cx+ux*14} ${cy+uy*14} L${cx-uy*9} ${cy+ux*9} L${cx+uy*9} ${cy-ux*9}Z`});H.op(a.a,on?1:0);});
  }};
}
Course.add({id:'2.4',module:2,title:'Competition and Marketing Plans',vizLabel:'Five forces pressing on an industry',
  hook:{who:'Femi, marketing manager',text:'Femi’s firm wants to launch a new biscuit brand. Two giants dominate, sugar and flour suppliers keep raising prices, and supermarkets demand long credit. How fierce is this market, and what should the marketing plan say?'},
  objectives:['Explain the nature of competition','Use the framework of industry outlook and company position','Describe the five forces governing competition','State what a marketing plan should answer'],
  steps:[
    {h:'A framework for analysing competition',t:'<p>Every firm takes market demand and supply as given; it must respond to the market, analyse opportunities and threats, and plan. The framework looks at the <b>industry outlook</b> and the <b>company’s position in the industry</b>.</p>'},
    {h:'Rivalry among current competitors',t:'<p>Competition exists in every industry because each firm wants to sell and gain market share at others’ expense. Firms jockey for position; some emerge as leaders, some as followers, others close shop.</p>'},
    {h:'Threat of new entrants',t:'<p>New entrants bring new capacity. The threat depends on the barriers to entry and the reaction of existing players.</p>'},
    {h:'Bargaining power of suppliers',t:'<p>Strong suppliers can exert pressure on market participants, raising prices and influencing the price of goods generally.</p>'},
    {h:'Bargaining power of customers',t:'<p>Powerful buyer groups influence prices because they more or less dictate the price at which they will buy.</p>'},
    {h:'Threat of substitutes',t:'<p>Substitute goods limit an industry’s potential: sugar limits the honey industry’s growth.</p>'},
    {h:'The marketing plan',t:'<p>The marketing plan relates the firm to its consumers and the market. It answers: what is the product, what are its uses, what is the price, where will it be found, how will it be advertised? The course’s checklists add competitors, trends, share, strengths, distribution, promotion and customer service.</p>'}
  ],
  scene:compScene,
  sandboxIntro:'Rate each force for an industry you know. Strong forces squeeze profits.',
  sandbox(ctl,st){
    const s=H.svg(st,520,260);const v=[3,3,3,3,3];const ro=H.readout(ctl);
    FORCES.forEach(([nm],i)=>H.slider(ctl,{id:'s24'+i,label:nm,min:1,max:5,value:3,fmt:x=>['','very weak','weak','moderate','strong','very strong'][x]},x=>{v[i]=x;draw();}));
    function draw(){s.innerHTML='';const avg=v.reduce((a,b)=>a+b)/5,att=(5-avg)/4;el('rect',{x:30,y:110,width:460,height:30,rx:15,fill:'var(--sunk)'},s);el('rect',{x:30,y:110,width:460*att,height:30,rx:15,fill:att>.6?'var(--org)':att>.35?'var(--emp)':'var(--err)'},s);
      t_(s,260,90,'Industry attractiveness',{'text-anchor':'middle','font-size':15,'font-weight':700});t_(s,30,165,'unattractive',{'font-size':11,fill:'var(--muted)'});t_(s,490,165,'attractive',{'font-size':11,fill:'var(--muted)','text-anchor':'end'});
      const top=FORCES.map((f,i)=>[f[0],v[i]]).sort((a,b)=>b[1]-a[1])[0];ro.innerHTML=`${att>.6?'<b>Attractive industry.</b>':att>.35?'<b>Moderately attractive.</b>':'<b>Tough industry.</b>'} The strongest force is “${top[0].toLowerCase()}”: the marketing plan must answer it.`;}
    draw();H.tag(st,'Illustrative scoring');
  },
  sae:{q:'In evaluating the outlook for an industry, list and discuss four items you think are important.',a:['Demand: usefulness, desire and stability of demand.','Supply capacity of the industry: room for another player.','Labour and raw material costs: their level and direction.','Taxation, permits and regulation: cost and ease of operating.']},
  tma:{q:'Discuss the five basic forces that govern competition in industry.',outline:['Rivalry among existing competitors: jockeying for position','Threat of new entrants: new capacity; barriers and reactions','Bargaining power of suppliers: raising input prices','Bargaining power of customers: dictating prices','Threat of substitutes: sugar vs honey','Source: Porter (1980)']},
  quiz:[
    {q:'“Sugar limits the honey industry’s growth” illustrates…',o:['Supplier power','Threat of substitutes','Threat of new entrants','Buyer power'],a:1,w:'Substitute goods limit an industry’s potential.'},
    {q:'The threat of new entrants depends on…',o:['Advertising only','Barriers to entry and existing players’ reaction','Tax rates only','The number of customers'],a:1,w:'The course names barriers and the reaction of incumbents.'},
    {q:'Which question belongs in a marketing plan?',o:['What is the offered price?','What is the depreciation rate?','Who audits the accounts?','What is the retirement age?'],a:0,w:'Product, uses, price, place and advertising.'}
  ],
  card:[{h:'Five forces (Porter, 1980)',items:FORCES.map(f=>f[0])},{h:'Marketing plan questions',items:['What is the product or service?','What are its uses?','What is the price?','Where will it be found?','How will it be advertised?']}]
});

/* ================= 2.5 ================= */
const COST=[['Land, buildings, steel structures',22000000,9000000],['Machinery and equipment',98740000,20800000],['Storage tanks',8100000,0],['Utilities',14000000,14000000],['Pre-operational expenses',1450000,1450000],['Working capital',30617994,30617994]];
const TOTAL=174907994;
function costScene(stage){
  H.cap(stage,'Project cost: vegetable oil refinery');
  let T=0;const cols=['--manila','--data','--emp-soft','--org-soft','--muted','--emp'];
  const o=H.c3(stage,{yaw:.55,pitch:.32,dist:22,f:1.15,spin:.0018,render(ctx,o){const C=o.col;const split=H.es(T,7,7.6);const k=Math.floor(T);
    const sc=12/TOTAL;let y=0,ys=0,yb=0;const faces=[];const labels=[];
    COST.forEach(([n,v,sp],i)=>{const show=H.es(T,i+1,i+1.5);if(show<=0)return;const h=v*sc*show;
      if(split<=0){faces.push(...H.c3box(o,[0,y+h/2,0],[3.2,Math.max(.01,h),3.2],C[cols[i].slice(2)]));labels.push([[1.9,y+h/2,1.6],n+'  '+M(v),i===k-1]);y+=h;}
      else{const hs=sp*sc,hb=(v-sp)*sc,dx=H.lerp(0,2.6,split);if(hs>0)faces.push(...H.c3box(o,[-dx,ys+hs/2,0],[3.2*(1-.25*split),hs,3.2],C.org));if(hb>0)faces.push(...H.c3box(o,[dx,yb+hb/2,0],[3.2*(1-.25*split),hb,3.2],C.data));ys+=hs;yb+=hb;}});
    H.c3faces(ctx,faces,C.card);
    if(split<=0)labels.forEach(([p,txt,on])=>H.c3text(ctx,o,p,txt,on?C.org:C.ink,on?14:12,'left'));
    else{H.c3text(ctx,o,[-2.6,ys+.6,0],'Sponsor '+M(75867994)+' (43%)',C.org,14);H.c3text(ctx,o,[2.6,yb+.6,0],'Bank '+M(99040000)+' (57%)',C.data,14);}
  }});
  o.ty=5.5;
  const ov=H.h('div',{style:'position:absolute;left:12px;right:12px;top:30px;pointer-events:none'});stage.append(ov);const big=H.h('div',{class:'mono',style:'font-size:1.6rem;font-weight:700'}),sub=H.h('div',{style:'font-size:.85rem;color:var(--muted)'});ov.append(big,sub);
  const notes=['Eight headings: land, building, machinery, utilities, furniture, vehicles, pre-operational, working capital','Land ₦4m, civil works ₦5m, steel structures ₦13m','Crude, refined, fatty acid, water, diesel and furnace oil tanks','500 KVA transformer ₦3.5m, 500 KVA generator ₦10m, borehole ₦0.5m','US$695,000 × ₦132 = ₦91.74m, + L/C ₦0.5m + port clearing ₦6.5m','Feasibility study, consulting, NAFDAC registration, travel','1 week of raw materials + 1 month wages + 1 month diesel','Sponsor and bank contributions'];
  return {update(t){T=t;o.dirty=true;const k=Math.min(7,Math.floor(t));let cum=0;COST.forEach(([n,v],i)=>{cum+=v*H.es(t,i+1,i+1.5);});
    big.textContent=k===0?'₦0':k>=7?'₦174,907,994':N(cum);sub.textContent=notes[k];
  }};
}
Course.add({id:'2.5',module:2,title:'Project Cost Analysis',vizLabel:'A 3D tower of project costs',
  hook:{who:'Ifeoma, project promoter',text:'Ifeoma knows her refinery machine costs US$695,000. Her bank asks for the total project cost and how it will be financed. Is the machine price the answer? Not even close.'},
  objectives:['Define project cost and its sub-headings','Use checklists for each cost heading','Build a project cost summary including working capital','Read a financing plan and contribution ratio'],
  steps:[
    {h:'What project cost covers',t:'<p>Project cost is all costs incurred in setting up a project, attached to it, listed exhaustively and grouped consistently: <b>land, building, machinery and equipment, utilities, furniture and fittings, vehicles, pre-operational expenses, working capital</b>.</p>'},
    {h:'Land, buildings and steel structures',t:'<p>Land ₦4,000,000; civil works and foundations ₦5,000,000; steel structures (beams, channels, plates, roofing) ₦13,000,000. Total <b>₦22,000,000</b>. Land costs include survey, certificate of occupancy, legal documentation and fencing.</p>'},
    {h:'Storage tanks',t:'<p>Two 200-ton crude oil tanks, a 300-ton refined oil tank, a fatty acid tank, and water, diesel and furnace oil tanks: <b>₦8,100,000</b>.</p>'},
    {h:'Utilities',t:'<p>A 500 KVA transformer (₦3.5m), a 500 KVA generator (₦10m) and a water borehole (₦0.5m): <b>₦14,000,000</b>.</p>'},
    {h:'Machinery and equipment',t:'<p>The imported full-line refinery: US$695,000 C&F Lagos × ₦132 = ₦91,740,000, plus bank L/C charges ₦500,000 and port clearing ₦6,500,000: <b>₦98,740,000</b>, by far the biggest block. Remember freight, insurance, duties, installation and test running.</p>'},
    {h:'Pre-operational expenses',t:'<p>Feasibility studies, project management consulting, NAFDAC registration and travel: <b>₦1,450,000</b>.</p>'},
    {h:'Working capital',t:'<p>Fixed costs total ₦144,290,000. Working capital funds the start of operations: one week of raw materials (₦29,697,261), one month of factory wages (₦482,820) and one month of diesel and lubricants (₦437,913): <b>₦30,617,994</b>. Grand total <b>₦174,907,994</b>.</p>'},
    {h:'The financing plan',t:'<p>The sponsor puts in ₦75,867,994 (land and machinery shares, all utilities, pre-operational costs and working capital) and the bank ₦99,040,000. That is about <b>43% sponsor, 57% bank</b>; the course prints 43.3% and 56.7%.</p>'}
  ],
  scene:costScene,
  sandboxIntro:'The course example used ₦132 to the dollar. Change the exchange rate and see what happens to the project.',
  sandbox(ctl,st){
    const s=H.svg(st,520,260);const p={fx:132,wk:1};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s25f',label:'Exchange rate (₦ per US$)',min:100,max:1700,step:10,value:132,fmt:v=>'₦'+v},v=>{p.fx=v;draw();});
    H.slider(ctl,{id:'s25w',label:'Weeks of raw materials in working capital',min:1,max:6,value:1},v=>{p.wk=v;draw();});
    function draw(){s.innerHTML='';const mach=695000*p.fx+7000000,fixed=22000000+8100000+14000000+1450000+mach,wc=29697261*p.wk+482820+437913,tot=fixed+wc,bank=99040000;
      const parts=[['Machinery',mach,'var(--data)'],['Other fixed',fixed-mach,'var(--manila)'],['Working capital',wc,'var(--emp)']];let acc=0;parts.forEach(([l,v,c])=>{const w=480*v/tot;el('rect',{x:20+acc,y:70,width:w,height:56,fill:c},s);if(w>60)t_(s,20+acc+w/2,150,l,{'text-anchor':'middle','font-size':11.5,'font-weight':700});acc+=w;});
      t_(s,260,50,'Total project cost: '+N(tot),{'text-anchor':'middle','font-size':16,'font-weight':700});
      ro.innerHTML=`Machinery: <b>${N(mach)}</b> · total: <b>${N(tot)}</b>.<br>If the bank still lends ₦99.04m, the sponsor must find <b>${N(tot-bank)}</b> (${Math.round(100*(tot-bank)/tot)}% of the project).`;}
    draw();
  },
  sae:{q:'List and explain 10 items that should appear in a project cost analysis of a start-up sachet water plant.',a:['Land (purchase, survey, C of O, legal fees, fence)','Factory building and offices','Water treatment and sachet filling machines','Freight, duties, installation and test running','Borehole with fittings','Generator and transformer','Storage tanks','Delivery vans and vehicles','Pre-operational: feasibility study, NAFDAC registration','Working capital: raw materials (nylon, chemicals), salaries, diesel']},
  tma:{q:'Why is it important to know the total cost of a project?',outline:['To decide if the sponsor can afford it, and how much to borrow','Banks need it to structure loans and the financing plan','It feeds depreciation, the income statement and the cash flow','Avoids under-costing (e.g. forgetting freight, duties, working capital)','Needed for payback, ARR, NPV and IRR']},
  quiz:[
    {q:'Which is the largest cost block in the refinery example?',o:['Land and buildings','Machinery and equipment','Working capital','Utilities'],a:1,w:'₦98.74m of the ₦174.9m total.'},
    {q:'Working capital in the example covers…',o:['The generator','One week of raw materials, one month of wages and diesel','The feasibility study','Port clearing charges'],a:1,w:'₦30,617,994 in total.'},
    {q:'The bank’s share of the refinery financing is about…',o:['25%','43%','57%','75%'],a:2,w:'₦99.04m of ₦174.9m ≈ 57%.'}
  ],
  card:[{h:'Cost sub-headings',items:['Land','Building','Machinery and equipment','Utilities','Furniture and fittings','Vehicles','Pre-operational expenses','Working capital']},{h:'Refinery summary',items:['Land, buildings, steel ₦22.0m','Machinery ₦98.74m','Tanks ₦8.1m','Utilities ₦14.0m','Pre-operational ₦1.45m','Working capital ₦30.62m','Total ₦174.91m · sponsor 43%, bank 57%']}]
});
})();
