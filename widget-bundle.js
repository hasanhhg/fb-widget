// FB Widget v2
(async()=>{
const T="Zamanın kalabalığında, insanın kendi huzurunu aradığı bir dönemdeyiz. ‘İyilerle karşılaştırsın’ diye dua ediyorum, çünkü insanın en büyük nasibi güzel insanlardır. Kalbi güzel, niyeti temiz insanlarla yolumuzun kesişmesi dileğiyle.. Jij en 10 anderen";
let w=new ListWidget(),g=new LinearGradient();
g.locations=[0,1];g.colors=[new Color("#0f0f1a"),new Color("#1a1a3e")];
w.backgroundGradient=g;w.setPadding(20,20,20,20);
w.refreshAfterDate=new Date(Date.now()+30*60*1000);
try{
if(T&&T.length>5){
  let sz=14;
  w.addSpacer();
  let q=w.addText(T);q.font=Font.mediumSystemFont(sz);q.textColor=new Color("#f0f0f5");
  w.addSpacer();
  let f=w.addStack();f.layoutHorizontally();f.addSpacer();
  let ft=f.addText("\u25C0");ft.font=Font.regularSystemFont(9);
  ft.textColor=new Color("#8ba4d4");ft.textOpacity=0.4;
}else{
  w.addText("Waiting...").textColor=new Color("#8ba4d4");
}
config.runsInWidget?Script.setWidget(w):w.presentMedium();
}catch(e){
w.addText("\u2014").font=Font.lightSystemFont(28).textOpacity=0.3;
w.addSpacer(4);
w.addText("Loading").textColor=new Color("#8ba4d4");
config.runsInWidget?Script.setWidget(w):w.presentMedium();
}
Script.complete()
})()