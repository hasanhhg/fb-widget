(async () => {
  const POSTS = [{"text": "Allah’a Yönelen Hiçbir Dua Karşılıksız Değildir… Kalpten edilen her dua, Rabbimizin katında değerlidir. Kimi duası hemen kabul olur, kimi ise en hayırlı vakte bırakılır. Bu güzel zikri samimiyetle okuyup ardından gönlünüzden geçenleri Rabbimize emanet edebilirsiniz. ya rahman ya rahim Allah, edilen tüm duaları hayırlısıyla kabul eylesin.", "likes": 0}, {"text": "Elhamdülillâhi, Subhanallâhi, Lâ ilâhe illallâhü Vallâhü Ekber. Lâ havle ve lâ kuvvete illâ billâhil Aliyyil Azîm. Allah, samimiyetle yapılan duaları en güzel şekilde kabul buyursun. Hayırlı olanı nasip etsin, gönlünüzü huzurla doldursun. Âmin.", "likes": 11}, {"text": "TEVEKKÜL (Teslimiyet) insanın elinden geleni yaptıktan sonra, kontrol edemediği sonuçları Yaratıcı'nın takdirine ve adaletine bırakmasıdır. Bu tevekkül hali, belirsizlikler karşısında iç huzuru bulmayı, endişeden uzaklaşmayı ve kalben sükûnete ermeyi sağla", "likes": 8}, {"text": "Kâbe'de bazen bir köşeye çekilip sessizce ağlayan, bazen secdeye kapanıp hıçkıra hıçkıra dua eden insanlara şahit olursunuz. Çünkü oraya gidenlerin çoğu sadece bir yolculuk yapmaya gelmez. Kimi affedilmeyi ister, kimi yıllardır dilinden düşmeyen duasını Rabbine arz eder. Kimi kalbinde taşıdığı yüklerle gelir, kimi yorgundur, kimi çaresizdir, kimi ise sadece Rabbine kavuşmanın hasretini yaşar.", "likes": 14}, {"text": "İnsan bazen sadece gözleriyle değil, kalbiyle de yorulur… Hayata aynı pencereden bakmaya başlar, şükretmeyi unutur, içindeki ferahlık yavaş yavaş kaybolur. Oysa Rabbimizin Esmâ-i Hüsnâ’sı, O’nu daha çok anmak ve O’na daha çok yaklaşmak için bize verilen en güzel vesilelerdendir.", "likes": 9}];
  const TH = {"bg_top": "#1a1a2e", "bg_bottom": "#16213e", "header_color": "#ffffff", "name_color": "#8ba4d4", "quote_color": "#ffffff", "quote_font_size": 15, "like_color": "#ff6b6b", "footer_color": "#8ba4d4", "icon_glyph": "ƒ", "show_likes": true, "header_opacity": 0.9, "name_opacity": 0.8, "time_color": "#8ba4d4", "divider_color": "#ffffff", "divider_opacity": 0.2, "padding": 16, "line_limit": 14, "show_time": true, "show_icon": true, "font_weight": "medium"};
  const fam = config.widgetFamily || "medium";
  const small = fam === "small", large = fam === "large";

  const w = new ListWidget();
  const g = new LinearGradient();
  g.locations = [0, 1];
  g.colors = [new Color(TH.bg_top), new Color(TH.bg_bottom)];
  w.backgroundGradient = g;
  const pad = small ? 12 : 16;
  w.setPadding(pad, pad + 2, pad, pad + 2);
  w.refreshAfterDate = new Date(Date.now() + 30 * 60 * 1000);

  const show = (msg) => {
    const t = w.addText(msg); t.textColor = new Color(TH.name_color);
    t.centerAlignText(); t.font = Font.mediumSystemFont(14);
  };

  if (!POSTS.length) {
    show("…");
    if (config.runsInWidget) Script.setWidget(w); else w.presentMedium();
    Script.complete(); return;
  }

  // Rotate quote by time so it changes through the day
  const idx = Math.floor(Date.now() / (30 * 60 * 1000)) % POSTS.length;
  const post = POSTS[idx];
  let text = (post.text || "").trim();

  // Header: quote glyph + likes
  const head = w.addStack();
  head.centerAlignContent();
  const icon = head.addText(TH.icon_glyph || "❝");
  icon.font = Font.boldSystemFont(small ? 15 : 22);
  icon.textColor = new Color(TH.header_color);
  head.addSpacer();
  if (TH.show_likes && post.likes > 0) {
    const lk = head.addText("♥ " + post.likes);
    lk.font = Font.mediumSystemFont(small ? 10 : 12);
    lk.textColor = new Color(TH.like_color);
  }
  w.addSpacer(small ? 5 : 9);

  // Body: truncate to a per-size cap, then let iOS auto-shrink to fit
  const cap = small ? 150 : (large ? 750 : 340);
  if (text.length > cap) text = text.slice(0, cap - 1).trimEnd() + "…";
  const q = w.addText(text);
  q.textColor = new Color(TH.quote_color);
  const base = TH.quote_font_size || 15;
  q.font = Font.mediumSystemFont(small ? Math.min(13, base) : (large ? base + 4 : base));
  q.minimumScaleFactor = 0.55;
  q.lineLimit = small ? 6 : (large ? 24 : 9);
  q.leftAlignText();

  w.addSpacer();

  // Footer: attribution + position
  const foot = w.addStack();
  foot.centerAlignContent();
  const nm = foot.addText("Kadir Basan");
  nm.font = Font.mediumSystemFont(small ? 9 : 11);
  nm.textColor = new Color(TH.name_color);
  foot.addSpacer();
  const ct = foot.addText((idx + 1) + "/" + POSTS.length);
  ct.font = Font.systemFont(small ? 9 : 11);
  ct.textColor = new Color(TH.footer_color);

  if (config.runsInWidget) Script.setWidget(w);
  else small ? w.presentSmall() : large ? w.presentLarge() : w.presentMedium();
  Script.complete();
})();