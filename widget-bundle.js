(async () => {
  const POSTS = [{"text": "Favorieten Güzelliği bulmak için Tüm dünyayı dolaşsak da; Onu içimizde taşımıyorsak asla bulamayız... Rabbim güzellikleri eksik etmesin hayatınızdan", "likes": 7}, {"text": "Favorieten Allâh bazen birini kalbine koyar ama hayatına koymaz bâzı sevgiler imtihandır..", "likes": 12}, {"text": "Favorieten MUTLULUK, nedir biliyor musunuz ? Umudunu yitirmiş insanlara umut olabilmektir. Sadece kendini değil, çevrendekileri de güldürebilmektir. Sadece kazanmak değil, kazandığını paylaşabilmektir.", "likes": 8}, {"text": "Favorieten Rabbimizin rahmetiyle kalplerimiz nurlansın, gözlerimiz hakikati görsün, gönlümüz huzurla dolsun.", "likes": 10}];
  const TH = {"bg_top": "#1a1a2e", "bg_bottom": "#16213e", "quote_color": "#ffffff", "name_color": "#8ba4d4", "like_color": "#ff6b6b", "header_color": "#ffffff", "header_opacity": 0.9, "name_opacity": 0.8, "quote_font_size": 15, "time_color": "#8ba4d4", "footer_color": "#8ba4d4", "divider_color": "#ffffff", "divider_opacity": 0.2, "padding": 16, "line_limit": 14, "show_likes": true, "show_time": true, "show_icon": true, "icon_glyph": "ƒ", "font_weight": "medium"};

  if (config.runsInWidget) {
    const fam = config.widgetFamily || "medium";
    const small = fam === "small", large = fam === "large";
    const w = new ListWidget();
    const g = new LinearGradient();
    g.locations = [0, 1];
    g.colors = [new Color(TH.bg_top), new Color(TH.bg_bottom)];
    w.backgroundGradient = g;
    const pad = small ? 12 : 14;
    w.setPadding(pad, pad + 2, pad, pad + 2);
    w.refreshAfterDate = new Date(Date.now() + 30 * 60 * 1000);
    if (POSTS.length) {
      const idx = Math.floor(Date.now() / (30 * 60 * 1000)) % POSTS.length;
      let text = (POSTS[idx].text || "").trim();
      const cap = small ? 190 : (large ? 1000 : 460);
      if (text.length > cap) text = text.slice(0, cap - 1).trimEnd() + "…";
      const L = text.length;
      let fs;
      if (small)      fs = L < 50 ? 16 : L < 90 ? 14 : L < 140 ? 12.5 : 11;
      else if (large) fs = L < 120 ? 30 : L < 250 ? 26 : L < 450 ? 22 : L < 700 ? 18 : 15;
      else            fs = L < 70 ? 24 : L < 120 ? 21 : L < 180 ? 18 : L < 260 ? 16 : L < 360 ? 14 : 12.5;
      w.addSpacer();
      const q = w.addText(text);
      q.textColor = new Color(TH.quote_color);
      q.font = Font.mediumSystemFont(fs);
      q.minimumScaleFactor = 0.5;
      q.leftAlignText();
      w.addSpacer(small ? 3 : 5);
      const nm = w.addText("Kadir Basan");
      nm.font = Font.mediumSystemFont(small ? 9 : 10);
      nm.textColor = new Color(TH.name_color);
      w.addSpacer();
    } else {
      const t = w.addText("…"); t.textColor = new Color(TH.name_color); t.centerAlignText();
    }
    Script.setWidget(w);
    Script.complete();
    return;
  }

  const wv = new WebView();
  await wv.loadHTML("<!DOCTYPE html><html><head><meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no\">\n<style>\n*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;-webkit-user-select:none}\nhtml,body{width:100%;height:100%;overflow:hidden;background:linear-gradient(160deg,#1a1a2e,#16213e);font-family:-apple-system,'Helvetica Neue',sans-serif}\n.track{display:flex;height:100%;transition:transform .3s cubic-bezier(.25,.46,.45,.94);will-change:transform}\n.slide{min-width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;padding:70px 26px 96px}\n.q{color:#ffffff;font-size:20px;line-height:1.55;font-weight:400;overflow-y:auto;max-height:100%}\n.meta{position:fixed;bottom:40px;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:0 26px}\n.name{color:#8ba4d4;font-size:13px;font-weight:500}\n.likes{color:#ff6b6b;font-size:13px;font-weight:500}\n.dots{position:fixed;top:28px;left:0;right:0;display:flex;justify-content:center;gap:6px;flex-wrap:wrap;padding:0 40px}\n.dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.22);transition:all .3s}\n.dot.on{background:#8ba4d4;width:16px;border-radius:3px}\n.hint{position:fixed;bottom:16px;left:0;right:0;text-align:center;color:rgba(255,255,255,.28);font-size:11px}\n</style></head><body>\n<div class=\"dots\" id=\"dots\"></div>\n<div class=\"track\" id=\"track\"></div>\n<div class=\"meta\"><span class=\"name\">Kadir Basan</span><span class=\"likes\" id=\"lk\"></span></div>\n<div class=\"hint\" id=\"hint\">&#8249; swipe &#8250;</div>\n<script>\nvar Q=[{\"text\": \"Favorieten Güzelliği bulmak için Tüm dünyayı dolaşsak da; Onu içimizde taşımıyorsak asla bulamayız... Rabbim güzellikleri eksik etmesin hayatınızdan\", \"likes\": 7}, {\"text\": \"Favorieten Allâh bazen birini kalbine koyar ama hayatına koymaz bâzı sevgiler imtihandır..\", \"likes\": 12}, {\"text\": \"Favorieten MUTLULUK, nedir biliyor musunuz ? Umudunu yitirmiş insanlara umut olabilmektir. Sadece kendini değil, çevrendekileri de güldürebilmektir. Sadece kazanmak değil, kazandığını paylaşabilmektir.\", \"likes\": 8}, {\"text\": \"Favorieten Rabbimizin rahmetiyle kalplerimiz nurlansın, gözlerimiz hakikati görsün, gönlümüz huzurla dolsun.\", \"likes\": 10}];\nvar track=document.getElementById('track'),dots=document.getElementById('dots'),lk=document.getElementById('lk'),hint=document.getElementById('hint');\nvar i=0;\nQ.forEach(function(p,j){\n  var s=document.createElement('div');s.className='slide';\n  var d=document.createElement('div');d.className='q';d.textContent=p.text;\n  s.appendChild(d);track.appendChild(s);\n  var dt=document.createElement('div');dt.className='dot';dots.appendChild(dt);\n});\nfunction go(n){\n  i=Math.max(0,Math.min(n,Q.length-1));\n  track.style.transform='translateX(-'+(i*100)+'%)';\n  var ds=dots.children;for(var j=0;j<ds.length;j++){ds[j].className='dot'+(j===i?' on':'');}\n  lk.textContent=Q[i].likes>0?('♥ '+Q[i].likes):'';\n  if(i>0&&hint){hint.style.display='none';}\n}\ngo(0);\nvar sx=0,sw=false;\ndocument.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sw=true},{passive:true});\ndocument.addEventListener('touchend',function(e){if(!sw)return;sw=false;var dx=sx-e.changedTouches[0].clientX;if(Math.abs(dx)>45)go(dx>0?i+1:i-1)},{passive:true});\n</script></body></html>");
  await wv.present(true);
  Script.complete();
})();