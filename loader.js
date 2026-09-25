// Kadir widget. Never edit on the phone, everything comes from the server.
const A = [
  "http://100.106.7.56:8899", "http://192.168.0.160:8899",
  "https://raw.githubusercontent.com/hasanhhg/fb-widget/main", "https://hasanhhg.github.io/fb-widget"
];
const fm = FileManager.local(), C = fm.joinPath(fm.documentsDirectory(), "kadir-cache.js");
let js = null, fresh = false;
for (const u of A) try { const r = new Request(u + "/widget-bundle.js?t=" + Date.now()); r.timeoutInterval = 4; const b = await r.loadString(); if (b.includes("const POSTS")) { js = b; fresh = true; break } } catch (e) {}
if (!js && fm.fileExists(C)) js = fm.readString(C);
if (js && fresh) try { fm.writeString(C, js) } catch (e) {}
if (js) await eval(js); else { const w = new ListWidget(), t = w.addText("Kadir widget offline"); t.textColor = Color.gray(); t.centerAlignText(); config.runsInWidget ? Script.setWidget(w) : w.presentMedium(); Script.complete() }
