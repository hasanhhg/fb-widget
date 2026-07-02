// FB Widget v3
(async()=>{
const T="EsSelâmu Aleykum ve Rahmetullahi ve Bereketuhu Bismillahî'r-Rahmânì'r-Rahîm SABAH UL'HAYIR SABAH UL'NÛR";
let w=new ListWidget(),g=new LinearGradient();
g.locations=[0,1];g.colors=[new Color("#0f0f1a"),new Color("#1a1a3e")];
w.backgroundGradient=g;w.setPadding(20,20,20,20);
w.refreshAfterDate=new Date(Date.now()+30*60*1000);
try{
if(T&&T.length>5){
  let sz=16;
  let q=w.addText(T);q.font=Font.mediumSystemFont(sz);q.textColor=new Color("#f0f0f5");
}else{
  w.addText("Waiting...").textColor=new Color("#8ba4d4");
}
config.runsInWidget?Script.setWidget(w):w.presentMedium();
}catch(e){
w.addText(e.message).textColor=new Color("#ff6b6b");
config.runsInWidget?Script.setWidget(w):w.presentMedium();
}
Script.complete()
})()