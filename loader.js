// FB Widget loader v2 - paste ONCE into Scriptable. Fetches the widget
// bundle from the home server first (Tailscale, then LAN), falls back to
// GitHub, and keeps the last working copy on the phone so a temporary
// network failure shows quotes instead of an error.
const SOURCES = [
  "http://100.106.7.56:8899/widget-bundle.js",
  "http://192.168.0.160:8899/widget-bundle.js",
  "https://raw.githubusercontent.com/hasanhhg/fb-widget/main/widget-bundle.js",
  "https://hasanhhg.github.io/fb-widget/widget-bundle.js"
];
let fm = null;
try { fm = FileManager.local(); } catch (e) {}
const CACHE = fm ? fm.joinPath(fm.documentsDirectory(), "fb-widget-bundle-cache.js") : null;
let code = null, fresh = false;
for (const src of SOURCES) {
  try {
    const r = new Request(src + "?t=" + Date.now());
    r.timeoutInterval = 4;
    const body = await r.loadString();
    if (body && body.indexOf("const POSTS") >= 0) { code = body; fresh = true; break; }
  } catch (e) {}
}
if (!fresh && CACHE) {
  try { if (fm.fileExists(CACHE)) code = fm.readString(CACHE); } catch (e) {}
}
if (code) {
  try { await eval(code); } catch (e) { code = null; }
}
if (code && fresh && CACHE) {
  try { fm.writeString(CACHE, code); } catch (e) {}
}
if (!code) {
  const w = new ListWidget();
  const t = w.addText("\u26A0\uFE0E FB widget offline");
  t.textColor = Color.gray(); t.centerAlignText();
  if (config.runsInWidget) Script.setWidget(w); else w.presentMedium();
  Script.complete();
}
