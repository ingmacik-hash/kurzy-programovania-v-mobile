/* Syntax – obrazovky: domov, kurz, slovník, projekty, profil. */
(function () {
  var esc = K.esc;
  function dni(n) { return n === 1 ? "deň" : (n >= 2 && n <= 4) ? "dni" : "dní"; }
  function farby(k) { return "--farba:" + k.farba + ";--na-farbe:" + (k.naFarbe || "#fff"); }

  /* ---------- domov ---------- */
  K.obrazovky.domov = function () {
    var s = K.stav, dnes = K.dnes(), min = Math.floor(dnes.s / 60), ciel = s.nast.ciel, pct = Math.min(1, dnes.s / 60 / ciel);
    var seria = K.aktualnaSeria(), opak = K.naOpakovanie().length;
    var r = 30, obvod = 2 * Math.PI * r;
    var h = '<div class="obal">' +
      '<div class="hlavicka"><div class="logo">Syn<b>tax</b></div><span class="medzera"></span>' +
      '<span class="chip ohen" title="Séria dní">' + K.ikona.ohen + seria + '</span><span class="chip xp" title="Body XP">' + K.ikona.blesk + s.xp + "</span></div>" +
      '<div class="karta ciel"><svg viewBox="0 0 74 74" aria-hidden="true"><circle cx="37" cy="37" r="' + r + '" fill="none" stroke="var(--surface-2)" stroke-width="9"/>' +
      (pct > 0 ? '<circle cx="37" cy="37" r="' + r + '" fill="none" stroke="' + (pct >= 1 ? "var(--ok)" : "var(--accent)") + '" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + (obvod * pct) + " " + obvod + '" transform="rotate(-90 37 37)"/>' : "") +
      '<text x="37" y="42" text-anchor="middle" font-size="15" font-weight="800" fill="var(--text)" font-family="Inter,sans-serif">' + Math.min(min, 99) + "/" + ciel + "</text></svg>" +
      "<div><span class=\"stitok\">Denný cieľ</span><h2>" + (pct >= 1 ? "Splnené, výborne!" : min ? "Ešte " + (ciel - min) + " min a máš to" : "Dnes " + ciel + " minút kódu") + "</h2>" +
      '<p class="tlmene" style="margin:2px 0 0;font-size:14px">' + (seria ? "Séria: " + seria + " " + dni(seria) + " za sebou." : "Začni sériu dní ešte dnes.") + "</p></div></div>";

    var posl = posledny();
    if (posl) {
      var k = K.kurz(posl.kurz), d = K.dalsiaPolozka(posl.kurz), pk = K.pokrokKurzu(posl.kurz);
      if (d) h += '<div class="karta pokracuj" style="' + farby(k) + '"><span class="stitok">Pokračuj · ' + esc(k.nazov) + "</span><h2>" + esc(d.typ === "test" ? "Test: " + d.modul.nazov : d.lekcia.nazov) + "</h2>" +
        '<div class="pruh"><i style="width:' + pk.pct + '%"></i></div><a class="btn plna" href="#' + (d.typ === "test" ? "test-" + posl.kurz + "-" + d.modul.cislo : "lekcia-" + d.id) + '">' + K.ikona.hrat.replace("<svg", '<svg width="18" height="18" fill="currentColor"') + "Pokračovať</a></div>";
    }
    if (opak) h += '<a class="karta riadok" href="#opakovanie" style="text-decoration:none;color:var(--text)"><span class="ikona-btn" style="background:var(--flame-bg);color:var(--flame)">' + K.ikona.opak + '</span><div class="medzera"><b>Opakovanie</b><div class="tlmene" style="font-size:14px">' + opak + " " + (opak === 1 ? "otázka čaká" : opak < 5 ? "otázky čakajú" : "otázok čaká") + "</div></div><span class=\"tlmene\">›</span></a>";

    h += '<div class="riadok"><h2 style="font-size:20px">' + (posl ? "Všetky jazyky" : "Čo sa chceš naučiť?") + "</h2></div><div class=\"mriezka\">";
    K.katalog.forEach(function (k) {
      var pk = K.pokrokKurzu(k.id), dost = (K.moduly[k.id] || []).length > 0;
      h += '<a class="jazyk' + (dost ? "" : " caka") + '" href="#kurz-' + k.id + '" style="' + farby(k) + '">' + (dost ? "" : '<span class="zamok">Čoskoro</span>') +
        '<span class="zn">' + esc(k.skratka) + "</span><div><h3>" + esc(k.nazov) + "</h3><p>" + esc(k.podtitul) + "</p></div>" +
        (dost ? '<div class="pruh"><i style="width:' + pk.pct + '%"></i></div>' : "") + "</a>";
    });
    h += "</div></div>";
    return K.el(h);
  };
  function posledny() {
    var naj = null;
    Object.keys(K.stav.hotove).forEach(function (id) { naj = id; });
    if (naj) return { kurz: naj.split("-")[0] };
    return null;
  }

  /* ---------- kurz (mapa lekcií) ---------- */
  K.obrazovky.kurz = function (id) {
    var k = K.kurz(id);
    if (!k) return K.el('<div class="obal"><p>Kurz sa nenašiel.</p></div>');
    var mod = K.moduly[id] || [], pk = K.pokrokKurzu(id), dalsia = K.dalsiaPolozka(id);
    var h = '<div style="' + farby(k) + '"><div class="kurz-hero"><div class="vnutro"><a class="ikona-btn" href="#domov" aria-label="Domov">' + K.ikona.spat + "</a>" +
      '<span class="stitok" style="color:inherit;opacity:.85">Kurz · ' + pk.hotove + " z " + pk.spolu + " hotových</span><h1>" + esc(k.nazov) + "</h1><p>" + k.popis + "</p>" +
      '<div class="pouzitie">' + k.pouzitie.map(function (p) { return "<span>" + esc(p) + "</span>"; }).join("") + "</div></div></div>";
    h += '<div class="obal">';
    if (!mod.length) h += '<div class="karta"><b>Kurz pripravujeme.</b><p class="tlmene" style="margin:4px 0 0">Zatiaľ si pozri plán modulov nižšie. Medzitým môžeš skúšať kód v Projektoch.</p></div>';
    mod.forEach(function (m) {
      h += '<section class="modul"><div class="modul-hlava"><span class="stitok">Modul ' + m.cislo + "</span><h2>" + esc(m.nazov) + "</h2></div>" + (m.popis ? '<p class="tlmene" style="margin:-6px 0 0;font-size:14px">' + m.popis + "</p>" : "") + '<div class="cesta">';
      m.lekcie.forEach(function (l, i) {
        var hot = !!K.stav.hotove[l.id], akt = dalsia && dalsia.id === l.id, odom = hot || akt;
        h += '<a class="uzol ' + (hot ? "hotovo" : akt ? "aktualna" : "zamknuta") + '" href="#lekcia-' + l.id + '"' + (odom ? "" : ' aria-disabled="true" tabindex="-1"') + '><span class="kruh">' + (hot ? K.ikona.fajka : odom ? (i + 1) : K.ikona.zamok) + '</span><span class="txt"><b>' + esc(l.nazov) + "</b><small>" + l.kroky.length + " krokov · ~" + (l.minut || 5) + " min" + (akt ? " · ďalšia na rade" : "") + "</small></span></a>";
      });
      if (m.test) {
        var tid = id + "-test-" + m.cislo, t = K.stav.testy[tid], ok = t && t.preslo, aktT = dalsia && dalsia.id === tid;
        h += '<a class="uzol test ' + (ok ? "hotovo" : aktT ? "aktualna" : "zamknuta") + '" href="#test-' + id + "-" + m.cislo + '"><span class="kruh">' + (ok ? K.ikona.fajka : aktT ? K.ikona.test : K.ikona.zamok) + '</span><span class="txt"><b>Test modulu ' + m.cislo + "</b><small>" + m.test.otazky.length + " otázok" + (t ? " · najlepšie " + t.best + " %" : " · otázky zo všetkých lekcií modulu") + "</small></span></a>";
      }
      h += "</div></section>";
    });
    var plan = (k.plan || []).filter(function (p, i) { return i >= mod.length; });
    if (plan.length) h += '<section class="modul"><div class="modul-hlava"><span class="stitok">Pripravujeme</span></div><div class="plan">' +
      plan.map(function (p) { return "<div>" + K.ikona.zamok.replace("<svg", '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"') + "<span><b>" + esc(p) + "</b></span></div>"; }).join("") + "</div></section>";
    h += "</div></div>";
    return K.el(h);
  };

  /* ---------- slovník znakov ---------- */
  K.obrazovky.slovnik = function (kurzId) {
    var dostupne = K.katalog.filter(function (k) { return K.slovnik[k.id]; });
    var akt = kurzId && K.slovnik[kurzId] ? kurzId : (dostupne[0] && dostupne[0].id);
    var el = K.el('<div class="obal"><div><span class="stitok">Slovník</span><h1 style="font-size:28px">Znaky a značky</h1></div>' +
      '<div class="prepinac">' + dostupne.map(function (k) { return '<button type="button" data-k="' + k.id + '" class="' + (k.id === akt ? "on" : "") + '">' + esc(k.nazov) + "</button>"; }).join("") + "</div>" +
      '<label class="hladat">' + K.ikona.hladat + '<input type="search" id="hladat-slovnik" placeholder="Hľadaj znak alebo slovo, napr. &lt;a&gt; alebo odkaz" autocomplete="off"></label><div data-zoznam></div></div>');
    var zoznam = el.querySelector("[data-zoznam]"), inp = el.querySelector("input");
    function vykresli() {
      var q = inp.value.trim().toLowerCase(), hesla = K.slovnik[akt] || [], kat = null, h = "";
      var f = hesla.filter(function (x) { return !q || (x.znak + " " + x.nazov + " " + x.popis).toLowerCase().indexOf(q) >= 0; });
      f.forEach(function (x) {
        if (x.kat !== kat && !q) { kat = x.kat; h += '<div class="stitok kat">' + esc(kat) + "</div>"; }
        h += '<div class="heslo"><div class="z">' + esc(x.znak) + "</div><div style=\"min-width:0\"><b>" + esc(x.nazov) + "</b><p>" + x.popis + "</p>" + (x.priklad ? K.blokKodu(x.priklad, x.jazyk || akt) : "") + "</div></div>";
      });
      zoznam.innerHTML = h || '<p class="tlmene">Nič som nenašiel. Skús iné slovo.</p>';
    }
    inp.addEventListener("input", vykresli);
    el.querySelector(".prepinac").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { akt = b.dataset.k; K.$$(".prepinac button", el).forEach(function (x) { x.classList.toggle("on", x === b); }); vykresli(); } });
    vykresli();
    return el;
  };

  /* ---------- projekty ---------- */
  var VZOR = {
    html: "<h1>Môj projekt</h1>\n<p>Tu začni písať.</p>\n<button id=\"tlacidlo\">Klikni</button>",
    css: "body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\nh1 {\n  color: #2f5bea;\n}",
    js: "document.getElementById(\"tlacidlo\").onclick = function () {\n  alert(\"Ahoj!\");\n};",
  };
  K.obrazovky.projekty = function () {
    var p = K.stav.projekty;
    var h = '<div class="obal"><div class="riadok"><div><span class="stitok">Moje projekty</span><h1 style="font-size:28px">Dielňa</h1></div><span class="medzera"></span>' +
      '<button type="button" class="btn" data-novy>' + K.ikona.plus.replace("<svg", '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"') + "Nový</button></div>";
    if (!p.length) h += '<div class="karta prazdne"><svg viewBox="0 0 90 90" aria-hidden="true"><rect x="8" y="16" width="74" height="58" rx="10" fill="var(--code-bg)"/><path d="m32 38-8 7 8 7M58 38l8 7-8 7M48 34l-6 22" fill="none" stroke="var(--hl-tag)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      "<b style=\"color:var(--text)\">Zatiaľ tu nič nie je</b><span>Projekt je tvoja vlastná stránka s HTML, CSS a JavaScriptom. Ťukni na <b>Nový</b> a skúšaj, čo si sa naučil.</span></div>";
    else h += '<div class="karta" style="display:flex;flex-direction:column;gap:14px">' + p.slice().reverse().map(function (x) {
      return '<a class="projekt" href="#projekt-' + x.id + '"><span class="zn">&lt;/&gt;</span><span class="medzera" style="min-width:0"><b style="display:block">' + esc(x.nazov) + '</b><small class="tlmene">Upravené ' + esc(x.upravene) + "</small></span><span class=\"tlmene\">›</span></a>";
    }).join("") + "</div>";
    h += "</div>";
    var el = K.el(h);
    el.querySelector("[data-novy]").onclick = function () {
      var id = Date.now().toString(36);
      K.stav.projekty.push({ id: id, nazov: "Projekt " + (K.stav.projekty.length + 1), upravene: K.den(), subory: { html: VZOR.html, css: VZOR.css, js: VZOR.js } });
      K.skontrolujOdznaky(); K.uloz(); K.ist("projekt-" + id);
    };
    return el;
  };
  K.obrazovky.projekt = function (id) {
    var p = K.stav.projekty.filter(function (x) { return x.id === id; })[0];
    if (!p) return K.el('<div class="obal"><p>Projekt sa nenašiel.</p><a class="btn" href="#projekty">Späť</a></div>');
    var el = K.el('<div class="obal" style="gap:12px"><div class="riadok"><button type="button" class="ikona-btn" data-spat aria-label="Späť">' + K.ikona.spat + '</button><input class="nazov-input" id="nazov-projektu" aria-label="Názov projektu"><button type="button" class="ikona-btn" data-zmaz aria-label="Zmazať projekt">' + K.ikona.kos + '</button></div><div class="potvrd" hidden><b>Zmazať projekt „' + esc(p.nazov) + '“?</b><span>Toto sa nedá vrátiť.</span><div class="riadok"><button type="button" class="btn sek" data-nie style="flex:1">Nechať</button><button type="button" class="btn zle" data-ano style="flex:1">Zmazať</button></div></div></div>');
    var inp = el.querySelector("input"); inp.value = p.nazov;
    inp.addEventListener("input", function () { p.nazov = inp.value || "Bez názvu"; K.uloz(); });
    var nahlad = K.Nahlad("260px");
    var ed = K.Editor({ subory: p.subory, karty: ["html", "css", "js"], vyska: "260px", onZmena: function (s) { p.subory = s; p.upravene = K.den(); K.uloz(); nahlad.spusti(s); } });
    el.appendChild(ed.el); el.appendChild(nahlad.el); nahlad.spusti(p.subory, true);
    el.querySelector("[data-spat]").onclick = function () { K.ist("projekty", true); };
    var potvrd = el.querySelector(".potvrd");
    el.querySelector("[data-zmaz]").onclick = function () { potvrd.hidden = false; };
    el.querySelector("[data-nie]").onclick = function () { potvrd.hidden = true; };
    el.querySelector("[data-ano]").onclick = function () { K.stav.projekty = K.stav.projekty.filter(function (x) { return x.id !== id; }); K.uloz(); K.ist("projekty", true); K.toast("Projekt zmazaný"); };
    K._spatHandler = function () { K.ist("projekty", true); };
    K._upratat = function () { K._spatHandler = null; };
    return el;
  };

  /* ---------- profil ---------- */
  K.obrazovky.profil = function () {
    var s = K.stav, hotove = Object.keys(s.hotove).length, seria = K.aktualnaSeria();
    var h = '<div class="obal"><div><span class="stitok">Profil</span><h1 style="font-size:28px">Tvoj pokrok</h1></div>' +
      '<div class="statistiky"><div><b>' + s.xp + "</b><small>XP spolu</small></div><div><b>" + seria + "</b><small>séria dní</small></div><div><b>" + hotove + "</b><small>lekcií</small></div></div>" +
      '<div class="karta graf"><div class="riadok" style="margin-bottom:8px"><b>Posledných 7 dní</b><span class="medzera"></span><span class="tlmene" style="font-size:13px">XP za deň</span></div>' + graf() + "</div>" +
      '<div><h2 style="font-size:20px;margin-bottom:10px">Odznaky</h2><div class="odznaky">' + K.ODZNAKY.map(function (o) {
        var ma = !!s.odznaky[o.id];
        return '<div class="odznak' + (ma ? " ma" : "") + '"><span class="m">' + K.ikona[o.ikona] + "</span>" + esc(o.nazov) + "</div>";
      }).join("") + "</div></div>" +
      '<div class="karta" style="padding-block:4px"><div class="nastavenie"><label for="n-tema">Vzhľad</label><select id="n-tema"><option value="system">Podľa telefónu</option><option value="light">Svetlý</option><option value="dark">Tmavý</option></select></div>' +
      '<div class="nastavenie"><label for="n-ciel">Denný cieľ</label><select id="n-ciel"><option value="5">5 minút</option><option value="10">10 minút</option><option value="15">15 minút</option><option value="20">20 minút</option><option value="30">30 minút</option></select></div>' +
      '<div class="nastavenie"><label for="n-uroven">Vysvetlenia</label><select id="n-uroven"><option value="0">Stručne</option><option value="1">Podrobne</option><option value="2">Do hĺbky</option></select></div>' +
      '<div class="nastavenie"><label>Vymazať celý pokrok</label><button type="button" class="btn sek" data-vymaz style="min-height:38px;padding:6px 12px">Vymazať</button></div></div>' +
      '<div class="potvrd" hidden><b>Naozaj vymazať všetok pokrok?</b><span>Zmažú sa XP, lekcie, testy, séria aj projekty. Toto sa nedá vrátiť.</span><div class="riadok"><button type="button" class="btn sek" data-nie style="flex:1">Nechať</button><button type="button" class="btn zle" data-ano style="flex:1">Vymazať</button></div></div>' +
      '<p class="tlmene" style="font-size:12.5px;text-align:center;margin:0">Syntax · pokrok sa ukladá len v tomto telefóne</p></div>';
    var el = K.el(h);
    var t = el.querySelector("#n-tema"), c = el.querySelector("#n-ciel"), u = el.querySelector("#n-uroven");
    t.value = s.nast.tema; c.value = String(s.nast.ciel); u.value = String(s.nast.uroven);
    t.onchange = function () { s.nast.tema = t.value; K.uloz(); K.temu(); };
    c.onchange = function () { s.nast.ciel = +c.value; K.uloz(); };
    u.onchange = function () { s.nast.uroven = +u.value; K.uloz(); };
    var potvrd = el.querySelector(".potvrd");
    el.querySelector("[data-vymaz]").onclick = function () { potvrd.hidden = false; potvrd.scrollIntoView({ behavior: "smooth", block: "center" }); };
    el.querySelector("[data-nie]").onclick = function () { potvrd.hidden = true; };
    el.querySelector("[data-ano]").onclick = function () { K.vymaz(); K.vykresli(); K.toast("Pokrok vymazaný"); };
    return el;
  };
  function graf() {
    var d = K.den(), data = [], max = 10;
    for (var i = 6; i >= 0; i--) { var den = K.posunDen(d, -i), v = (K.stav.dni[den] || { xp: 0 }).xp; data.push({ den: den, v: v }); if (v > max) max = v; }
    var krok = max <= 20 ? 5 : max <= 50 ? 10 : max <= 100 ? 25 : max <= 250 ? 50 : 100; max = Math.ceil(max / krok) * krok;
    var W = 320, H = 150, L = 30, B = 22, T = 8, sir = (W - L) / 7;
    var NAZVY = ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"];
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="XP za posledných 7 dní">';
    for (var g = 0; g <= max; g += krok) { var y = H - B - (g / max) * (H - B - T); svg += '<line x1="' + L + '" x2="' + W + '" y1="' + y + '" y2="' + y + '" stroke="var(--line)" stroke-width="1"/><text x="' + (L - 6) + '" y="' + (y + 4) + '" text-anchor="end" font-size="10" fill="var(--muted)" font-family="Inter,sans-serif">' + g + "</text>"; }
    data.forEach(function (x, i) {
      var vy = (x.v / max) * (H - B - T), xx = L + i * sir + sir * 0.18, w = sir * 0.64, dnes = i === 6;
      var p = x.den.split("-"), dt = new Date(+p[0], +p[1] - 1, +p[2]);
      if (x.v) svg += '<rect x="' + xx + '" y="' + (H - B - vy) + '" width="' + w + '" height="' + vy + '" rx="4" fill="' + (dnes ? "var(--accent)" : "var(--accent-soft)") + '"' + (dnes ? "" : ' stroke="var(--accent)" stroke-width="1"') + "/>";
      if (x.v) svg += '<text x="' + (xx + w / 2) + '" y="' + (H - B - vy - 4) + '" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text)" font-family="Inter,sans-serif">' + x.v + "</text>";
      svg += '<text x="' + (xx + w / 2) + '" y="' + (H - 6) + '" text-anchor="middle" font-size="11" font-weight="' + (dnes ? 700 : 400) + '" fill="' + (dnes ? "var(--text)" : "var(--muted)") + '" font-family="Inter,sans-serif">' + (dnes ? "Dnes" : NAZVY[dt.getDay()]) + "</text>";
    });
    return svg + "</svg>";
  }
})();
