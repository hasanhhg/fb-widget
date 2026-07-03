// FB Widget loader - paste ONCE into Scriptable. Auto-updates from GitHub.
const SRC = "https://raw.githubusercontent.com/hasanhhg/fb-widget/main/widget-bundle.js";
try {
  const code = await new Request(SRC + "?t=" + Date.now()).loadString();
  await eval(code);
} catch (e) {
  const w = new ListWidget();
  const t = w.addText("⚠︎ FB widget offline");
  t.textColor = Color.gray(); t.centerAlignText();
  if (config.runsInWidget) Script.setWidget(w); else w.presentMedium();
  Script.complete();
}
