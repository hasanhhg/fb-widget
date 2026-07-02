// FB Widget v3
(async()=>{
let w=new ListWidget(),g=new LinearGradient();
g.locations=[0,1];g.colors=[new Color("#0f0f1a"),new Color("#1a1a3e")];
w.backgroundGradient=g;w.setPadding(20,20,20,20);
w.refreshAfterDate=new Date(Date.now()+30*60*1000);
try{
const r=await new Request("https://raw.githubusercontent.com/hasanhhg/fb-widget/main/latest.json?_t="+Date.now()).loadString();
const d=JSON.parse(r);
let T=d.text||"";
if(T&&T.length>5){
  let sz=18;
  if(T.length>60)sz=16;if(T.length>120)sz=14;if(T.length>200)sz=13;
  if(T.length>300)sz=12;if(T.length>400)sz=11;if(T.length>550)sz=10;
  let q=w.addText(T);q.font=Font.mediumSystemFont(sz);q.textColor=new Color("#f0f0f5");
}else{
  w.addText("Waiting...").textColor=new Color("#8ba4d4");
}
config.runsInWidget?Script.setWidget(w):w.presentMedium();
}catch(e){
w.addText("...").textColor=new Color("#8ba4d4");
config.runsInWidget?Script.setWidget(w):w.presentMedium();
}
Script.complete()
})()