/* Kódovňa – prehrávač lekcií, testov a opakovania. */
(function () {
  var esc = K.esc;
  var POCHVALY = ["Výborne!", "Presne tak!", "Správne!", "Super!", "Paráda!"];
  var XP = { volba: 5, doplnenie: 5, poradie: 5, kod: 10 };
  function nahodne(a) { return a[Math.floor(Math.random() * a.length)]; }

  /* ---------- typy krokov ---------- */
  var TYPY = {};

  TYPY.vyklad = function (k) {
    var el = K.el('<div class="vyklad"></div>');
    var maVrstvy = !!(k.podrobne || k.hlbka);
    function vykresli() {
      var u = maVrstvy ? K.stav.nast.uroven : 0;
      var h = '<h2 class="krok-nadpis">' + k.nadpis + "</h2>";
      if (maVrstvy) h += '<div class="uroven" role="group" aria-label="Úroveň vysvetlenia">' +
        ["Stručne", "Podrobne", "Do hĺbky"].map(function (n, i) { return '<button type="button" data-u="' + i + '" class="' + (i === u ? "on" : "") + '"' + (i === 2 && !k.hlbka ? " hidden" : "") + ">" + n + "</button>"; }).join("") + "</div>";
      h += k.text;
      if (k.obr) h += '<figure class="obr" style="margin:0">' + k.obr + (k.obrPopis ? "<figcaption>" + k.obrPopis + "</figcaption>" : "") + "</figure>";
      if (u >= 1 && k.podrobne) h += '<div class="vrstva"><span class="stitok">Podrobne</span>' + k.podrobne + "</div>";
      if (u >= 2 && k.hlbka) h += '<div class="vrstva hlbka"><span class="stitok">Do hĺbky</span>' + k.hlbka + "</div>";
      if (k.tip) h += '<div class="tip"><b>Tip:</b> ' + k.tip + "</div>";
      el.innerHTML = h;
    }
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-u]"); if (!b) return;
      K.stav.nast.uroven = +b.dataset.u; K.uloz(); vykresli();
    });
    vykresli();
    return { el: el, bezKontroly: true };
  };

  TYPY.volba = function (k, hotovo) {
    var poradie = K.zamiesaj(k.moznosti.map(function (_, i) { return i; })), vybrata = -1;
    var el = K.el('<div class="vyklad"><p class="otazka"></p>' + (k.kod ? K.blokKodu(k.kod, k.jazyk) : "") + '<div class="moznosti" role="radiogroup"></div></div>');
    el.querySelector(".otazka").innerHTML = k.otazka;
    var box = el.querySelector(".moznosti");
    box.innerHTML = poradie.map(function (i, p) {
      return '<button type="button" role="radio" class="moznost" data-i="' + i + '"><span class="p">' + "ABCDEF"[p] + "</span><span>" + k.moznosti[i] + "</span></button>";
    }).join("");
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".moznost"); if (!b || el.dataset.zamknute) return;
      vybrata = +b.dataset.i;
      K.$$(".moznost", box).forEach(function (x) { x.classList.toggle("vybrata", x === b); x.setAttribute("aria-checked", x === b); });
      hotovo(true);
    });
    return {
      el: el,
      skontroluj: function (cb) {
        var ok = vybrata === k.spravna;
        var sprava = ok ? (k.vysvetlenie || "") : ((k.preco && k.preco[vybrata]) || k.vysvetlenieZle || "Pozri sa na otázku ešte raz.");
        cb(ok, sprava);
      },
      ukazSpravne: function () {
        el.dataset.zamknute = 1;
        K.$$(".moznost", box).forEach(function (x) { var i = +x.dataset.i; if (i === k.spravna) x.classList.add("spravna"); else if (i === vybrata) x.classList.add("nespravna"); });
      },
      reset: function () { vybrata = -1; K.$$(".moznost", box).forEach(function (x) { x.classList.remove("vybrata", "nespravna"); }); hotovo(false); },
    };
  };

  TYPY.doplnenie = function (k, hotovo) {
    var sloty = [], tokeny = K.zamiesaj(k.zetony.map(function (t, i) { return { t: t, i: i }; }));
    var el = K.el('<div class="vyklad"><p class="otazka"></p><div class="sablona"></div><div class="zetony"></div></div>');
    el.querySelector(".otazka").innerHTML = k.otazka;
    var pocet = 0;
    el.querySelector(".sablona").innerHTML = esc(k.sablona).replace(/\[\[(\d+)\]\]/g, function (_, n) { pocet++; return '<button type="button" class="slot" data-s="' + n + '">&nbsp;</button>'; });
    for (var i = 0; i < pocet; i++) sloty.push(null);
    var zet = el.querySelector(".zetony");
    zet.innerHTML = tokeny.map(function (o) { return '<button type="button" class="zeton" data-t="' + o.i + '">' + esc(o.t) + "</button>"; }).join("");
    function obnov() {
      K.$$(".slot", el).forEach(function (s) { var v = sloty[+s.dataset.s]; s.textContent = v === null ? " " : k.zetony[v]; s.classList.toggle("plny", v !== null); });
      K.$$(".zeton", el).forEach(function (z) { z.classList.toggle("pouzity", sloty.indexOf(+z.dataset.t) >= 0); });
      hotovo(sloty.indexOf(null) < 0);
    }
    el.addEventListener("click", function (e) {
      if (el.dataset.zamknute) return;
      var z = e.target.closest(".zeton"), s = e.target.closest(".slot");
      if (z) { var volny = sloty.indexOf(null); if (volny >= 0) { sloty[volny] = +z.dataset.t; obnov(); } }
      else if (s) { sloty[+s.dataset.s] = null; obnov(); }
    });
    function sedi(i) { var spr = k.spravne[i]; var v = sloty[i] === null ? null : k.zetony[sloty[i]]; return Array.isArray(spr) ? spr.indexOf(v) >= 0 : v === spr; }
    return {
      el: el,
      skontroluj: function (cb) { var ok = sloty.every(function (_, i) { return sedi(i); }); cb(ok, ok ? (k.vysvetlenie || "") : (k.vysvetlenieZle || "Niektoré políčka nesedia. Ťukni na ne a skús iné.")); },
      ukazSpravne: function () { el.dataset.zamknute = 1; K.$$(".slot", el).forEach(function (s) { s.classList.add(sedi(+s.dataset.s) ? "dobre" : "zle"); }); },
      reset: function () { K.$$(".slot", el).forEach(function (s, i) { if (!sedi(+s.dataset.s)) sloty[+s.dataset.s] = null; s.classList.remove("dobre", "zle"); }); obnov(); },
    };
  };

  TYPY.poradie = function (k, hotovo) {
    var zdroj = K.zamiesaj(k.riadky.map(function (_, i) { return i; })), ciel = [];
    if (zdroj.every(function (v, i) { return v === i; }) && zdroj.length > 1) zdroj.reverse();
    var el = K.el('<div class="vyklad"><p class="otazka"></p><div class="poradie-ciel"></div><div class="poradie-zdroj"></div></div>');
    el.querySelector(".otazka").innerHTML = k.otazka;
    function riadok(i) { return '<button type="button" class="riadok-kod" data-r="' + i + '">' + K.zvyrazni(k.riadky[i], k.jazyk || "html") + "</button>"; }
    function obnov() {
      el.querySelector(".poradie-ciel").innerHTML = ciel.map(riadok).join("");
      el.querySelector(".poradie-zdroj").innerHTML = zdroj.map(riadok).join("");
      hotovo(zdroj.length === 0);
    }
    el.addEventListener("click", function (e) {
      if (el.dataset.zamknute) return;
      var b = e.target.closest(".riadok-kod"); if (!b) return;
      var r = +b.dataset.r;
      if (b.parentNode.classList.contains("poradie-zdroj")) { zdroj.splice(zdroj.indexOf(r), 1); ciel.push(r); }
      else { ciel.splice(ciel.indexOf(r), 1); zdroj.push(r); }
      obnov();
    });
    obnov();
    return {
      el: el,
      skontroluj: function (cb) { var ok = ciel.every(function (v, i) { return k.riadky[v] === k.riadky[i]; }); cb(ok, ok ? (k.vysvetlenie || "") : (k.vysvetlenieZle || "Poradie ešte nesedí. Zelené riadky sú na správnom mieste.")); },
      ukazSpravne: function () { el.dataset.zamknute = 1; K.$$(".poradie-ciel .riadok-kod", el).forEach(function (b, i) { b.classList.add(k.riadky[+b.dataset.r] === k.riadky[i] ? "dobre" : "zle"); }); },
      reset: function () {
        var dobre = []; for (var i = 0; i < ciel.length; i++) { if (k.riadky[ciel[i]] === k.riadky[i]) dobre.push(ciel[i]); else break; }
        ciel.slice(dobre.length).forEach(function (v) { zdroj.push(v); }); ciel = dobre; obnov();
      },
    };
  };

  TYPY.kod = function (k, hotovo) {
    var subory = { html: (k.start && k.start.html) || "", css: (k.start && k.start.css) || "", js: (k.start && k.start.js) || "" };
    var el = K.el('<div class="editor-krok"><div class="zadanie"></div><div class="chyba-box" hidden></div></div>');
    el.querySelector(".zadanie").innerHTML = "<b>Úloha:</b> " + k.zadanie + (k.napoveda ? ' <button type="button" class="btn sek" data-napoveda style="min-height:34px;padding:5px 12px;font-size:13.5px;margin-top:8px;display:flex">Nápoveda</button><div class="tip" data-tip hidden style="margin-top:8px"></div>' : "");
    var chyba = el.querySelector(".chyba-box"), jsChyba = null, pokusy = 0;
    var nahlad = K.Nahlad(k.vyskaNahladu || "180px");
    var ed = K.Editor({ subory: subory, karty: k.karty || ["html"], aktivna: k.aktivna, vyska: k.vyska || "200px",
      onZmena: function (s) { chyba.hidden = true; ed && ed.oznacChybu(0); jsChyba = null; nahlad.spusti(s); hotovo(true); } });
    el.insertBefore(ed.el, chyba); el.appendChild(nahlad.el);
    nahlad.spusti(subory, true);
    function sprava(e) { if (e.data && e.data.kodovnaChyba && e.source === nahlad.iframe.contentWindow) jsChyba = e.data; }
    window.addEventListener("message", sprava);
    var nap = el.querySelector("[data-napoveda]");
    if (nap) nap.onclick = function () { var t = el.querySelector("[data-tip]"); t.hidden = false; t.innerHTML = k.napoveda; };
    function ukazChybu(text) { chyba.hidden = false; chyba.innerHTML = "<b>!</b><span>" + esc(text) + "</span>"; }
    hotovo(true);
    return {
      el: el, xp: XP.kod,
      upratat: function () { window.removeEventListener("message", sprava); },
      skontroluj: function (cb) {
        pokusy++;
        var s = ed.subory();
        if ((k.karty || ["html"]).indexOf("html") >= 0) {
          var h = K.skontrolujHtml(s.html);
          if (h) { ed.karta("html"); ed.oznacChybu(h.riadok); ukazChybu(h.sprava); cb(false, "V HTML je chyba. Pozri červený riadok v editore."); return; }
        }
        jsChyba = null;
        nahlad.over(s, function (doc) {
          if (jsChyba) { ukazChybu(K.prelozChybu(jsChyba.kodovnaChyba)); cb(false, "JavaScript skončil chybou. Vysvetlenie je nad editorom."); return; }
          var m = null;
          try { m = doc ? k.kontrola(doc, s) : "Náhľad sa nenačítal, skús znova."; } catch (e) { m = "Kontrola zlyhala: " + e.message; }
          if (m && pokusy >= 2 && k.riesenie && !el.querySelector("[data-riesenie]")) {
            var b = K.el('<button type="button" class="btn sek" data-riesenie style="min-height:34px;padding:5px 12px;font-size:13.5px;margin-top:8px;display:flex">Ukázať riešenie</button>');
            b.onclick = function () { b.remove(); ed.nastav({ html: k.riesenie.html || "", css: k.riesenie.css || "", js: k.riesenie.js || "" }); };
            el.querySelector(".zadanie").appendChild(b);
            m += " Ak si nevieš rady, môžeš si pozrieť riešenie.";
          }
          cb(!m, m || k.vysvetlenie || "Funguje to!");
        });
      },
      ukazSpravne: function () {},
      reset: function () { hotovo(true); },
    };
  };

  /* ---------- prehrávač ----------
     opts: { kroky:[{krok, qid}], rezim:"lekcia"|"test"|"opakovanie", farba, koniec(vysledok), zavriet() } */
  K.Prehravac = function (opts) {
    var el = K.el('<div class="lekcia"><div class="lekcia-hore"><button type="button" class="ikona-btn" data-zavriet aria-label="Zavrieť">' + K.ikona.zavriet + '</button><div class="pruh"><i></i></div><span class="chip xp">' + K.ikona.blesk + '<span data-xp>0</span></span></div>' +
      '<div class="lekcia-telo"><div class="obal"></div></div><div class="lekcia-dole"><div class="spatna-vazba" hidden></div><div class="potvrd" hidden></div><button type="button" class="btn plna" data-hlavne>Skontrolovať</button></div></div>');
    if (opts.farba) el.style.setProperty("--farba", opts.farba);
    var telo = el.querySelector(".lekcia-telo .obal"), dole = el.querySelector(".lekcia-dole"), sv = el.querySelector(".spatna-vazba"),
        tl = el.querySelector("[data-hlavne]"), potvrd = el.querySelector(".potvrd"), pruh = el.querySelector(".pruh i");
    var i = -1, akt = null, stav = "odpoved", xp = 0, spravne = 0, otazok = 0, chybneQ = [], zleTeraz = false, start = Date.now();

    function dalsi() {
      if (akt && akt.upratat) akt.upratat();
      i++;
      if (i >= opts.kroky.length) { koniec(); return; }
      var k = opts.kroky[i].krok;
      zleTeraz = false; stav = "odpoved";
      akt = TYPY[k.typ](k, function (moze) { if (stav === "odpoved") tl.disabled = !moze; });
      telo.innerHTML = ""; telo.appendChild(akt.el);
      el.querySelector(".lekcia-telo").scrollTop = 0;
      pruh.style.width = (i / opts.kroky.length * 100) + "%";
      dole.className = "lekcia-dole"; sv.hidden = true;
      if (akt.bezKontroly) { tl.textContent = "Pokračovať"; tl.disabled = false; stav = "dalej"; tl.className = "btn plna"; }
      else { tl.textContent = "Skontrolovať"; tl.className = "btn plna"; tl.disabled = k.typ !== "kod"; otazok++; }
    }
    function vyhodnot(ok, sprava) {
      var q = opts.kroky[i], k = q.krok;
      dole.className = "lekcia-dole " + (ok ? "ok" : "zle"); sv.hidden = false;
      sv.innerHTML = "<div><b>" + (ok ? nahodne(POCHVALY) : (opts.rezim === "test" ? "Nesprávne" : "Ešte nie")) + "</b>" + (sprava ? "<p>" + esc(sprava) + "</p>" : "") + "</div>";
      if (ok) {
        if (!zleTeraz) spravne++; else K.stav.opravene++;
        var body = akt.xp || XP[k.typ] || 5; if (opts.rezim === "opakovanie") body = 3;
        if (opts.rezim !== "test") { xp += body; el.querySelector("[data-xp]").textContent = xp; }
        if (opts.rezim === "opakovanie") K.opakovanieVysledok(q.qid, !zleTeraz);
        akt.ukazSpravne(); stav = "dalej"; tl.textContent = "Pokračovať"; tl.className = "btn plna ok";
      } else {
        if (!zleTeraz) { chybneQ.push(q); if (opts.rezim === "lekcia" && q.qid && k.typ !== "kod") K.chybaVOtazke(q.qid); }
        zleTeraz = true;
        if (opts.rezim === "test") { akt.ukazSpravne(); stav = "dalej"; tl.textContent = "Pokračovať"; tl.className = "btn plna zle"; }
        else { stav = "znova"; tl.textContent = "Skúsiť znova"; tl.className = "btn plna zle"; }
      }
      tl.disabled = false;
    }
    tl.onclick = function () {
      if (stav === "odpoved") { tl.disabled = true; akt.skontroluj(vyhodnot); }
      else if (stav === "znova") { dole.className = "lekcia-dole"; sv.hidden = true; stav = "odpoved"; tl.className = "btn plna"; tl.textContent = "Skontrolovať"; akt.reset(); }
      else dalsi();
    };
    function koniec() {
      pruh.style.width = "100%";
      var sek = Math.round((Date.now() - start) / 1000);
      K.pridajCas(sek);
      if (xp) K.pridajXP(xp); else { K.zaznamenajAktivitu(); K.uloz(); }
      K._spatHandler = null;
      opts.koniec({ xp: xp, spravne: spravne, otazok: otazok, sekundy: sek, chybne: chybneQ, el: el, telo: telo, dole: dole, tlacidlo: tl });
    }
    function zavriet() {
      if (i >= opts.kroky.length) { opts.zavriet(); return; }
      potvrd.hidden = false;
      potvrd.innerHTML = "<b>Naozaj chceš odísť?</b><span>Pokrok v tejto " + (opts.rezim === "test" ? "skúške" : "lekcii") + ' sa neuloží.</span><div class="riadok"><button type="button" class="btn sek" data-ostat style="flex:1">Zostať</button><button type="button" class="btn zle" data-odist style="flex:1">Odísť</button></div>';
    }
    potvrd.addEventListener("click", function (e) {
      if (e.target.closest("[data-ostat]")) potvrd.hidden = true;
      if (e.target.closest("[data-odist]")) { K._spatHandler = null; opts.zavriet(); }
    });
    el.querySelector("[data-zavriet]").onclick = zavriet;
    K._spatHandler = zavriet;
    K._upratat = function () { K._spatHandler = null; if (akt && akt.upratat) akt.upratat(); };
    dalsi();
    return el;
  };

  /* ---------- zhrnutie ---------- */
  function trofejSvg() {
    return '<svg class="trofej" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56" fill="var(--accent-soft)"/>' +
      '<path d="M40 30h40v18a20 20 0 0 1-40 0z" fill="var(--flame)"/><path d="M40 36H28a12 12 0 0 0 14 14M80 36h12a12 12 0 0 1-14 14" fill="none" stroke="var(--flame)" stroke-width="5"/>' +
      '<rect x="54" y="66" width="12" height="14" fill="var(--flame)"/><rect x="42" y="80" width="36" height="9" rx="3" fill="var(--text)"/>' +
      '<path d="m60 37 3 6 6.5 1-4.7 4.6 1.1 6.4-5.9-3-5.9 3 1.1-6.4-4.7-4.6 6.5-1z" fill="#fff"/></svg>';
  }
  function cas(s) { return s < 60 ? s + " s" : Math.round(s / 60) + " min"; }

  /* ---------- obrazovka: lekcia ---------- */
  K.obrazovky.lekcia = function (id) {
    var info = K.lekcia(id);
    if (!info) return K.el('<div class="obal"><p>Lekcia sa nenašla.</p><a class="btn" href="#domov">Domov</a></div>');
    var kurz = K.kurz(info.kurz);
    if (!K.jeOdomknute(info.kurz, id) && !K.stav.hotove[id]) { setTimeout(function () { K.ist("kurz-" + info.kurz, true); K.toast("Najprv dokonči predchádzajúce lekcie."); }); return K.el("<div></div>"); }
    var kroky = info.lekcia.kroky.map(function (k, i) { return { krok: k, qid: id + "#" + i }; });
    return K.Prehravac({
      kroky: kroky, rezim: "lekcia", farba: kurz.farba,
      zavriet: function () { K.ist("kurz-" + info.kurz, true); },
      koniec: function (v) {
        var prvyKrat = !K.stav.hotove[id];
        K.stav.hotove[id] = true;
        var bonus = prvyKrat ? 10 : 0; if (bonus) K.pridajXP(bonus);
        K.skontrolujOdznaky(); K.uloz();
        var presnost = v.otazok ? Math.round(v.spravne / v.otazok * 100) : 100;
        var dalsia = K.dalsiaPolozka(info.kurz);
        v.telo.innerHTML = '<div class="zhrnutie">' + trofejSvg() + "<h1>Lekcia hotová!</h1><p class=\"tlmene\" style=\"margin:0\">" + esc(info.lekcia.nazov) + "</p>" +
          '<div class="statistiky"><div><b>+' + (v.xp + bonus) + "</b><small>XP</small></div><div><b>" + presnost + " %</b><small>na prvý pokus</small></div><div><b>" + cas(v.sekundy) + "</b><small>čas</small></div></div>" +
          (K.aktualnaSeria() ? '<span class="chip ohen">' + K.ikona.ohen + K.aktualnaSeria() + (K.aktualnaSeria() === 1 ? " deň" : K.aktualnaSeria() < 5 ? " dni" : " dní") + " za sebou</span>" : "") +
          (v.chybne.length ? '<p class="tlmene" style="margin:0;font-size:14px">Otázky, ktoré ti nešli, ti pripomeniem v Opakovaní.</p>' : "") + "</div>";
        v.dole.className = "lekcia-dole";
        v.dole.querySelector(".spatna-vazba").hidden = true;
        var t = v.tlacidlo; t.className = "btn plna"; t.disabled = false;
        if (dalsia && dalsia.typ === "lekcia") { t.textContent = "Ďalšia lekcia"; t.onclick = function () { K.ist("lekcia-" + dalsia.id, true); }; }
        else if (dalsia && dalsia.typ === "test") { t.textContent = "Na test modulu"; t.onclick = function () { K.ist("test-" + info.kurz + "-" + dalsia.modul.cislo, true); }; }
        else { t.textContent = "Späť na kurz"; t.onclick = function () { K.ist("kurz-" + info.kurz, true); }; }
        var spat = K.el('<button type="button" class="btn sek plna">Späť na kurz</button>');
        spat.onclick = function () { K.ist("kurz-" + info.kurz, true); };
        if (dalsia) v.dole.appendChild(spat);
      },
    });
  };

  /* ---------- obrazovka: test modulu ---------- */
  K.obrazovky.test = function (param) {
    var p = (param || "").split("-"), kurzId = p[0], m = K.modul(kurzId, p[1]), kurz = K.kurz(kurzId);
    if (!m || !m.test) return K.el('<div class="obal"><p>Test sa nenašiel.</p></div>');
    var testId = kurzId + "-test-" + m.cislo, potrebne = m.test.potrebne || 70;
    if (!K.jeOdomknute(kurzId, testId)) { setTimeout(function () { K.ist("kurz-" + kurzId, true); K.toast("Test sa odomkne po dokončení lekcií modulu."); }); return K.el("<div></div>"); }
    var predch = K.stav.testy[testId];
    var uvod = K.el('<div class="lekcia"><div class="lekcia-hore"><button type="button" class="ikona-btn" aria-label="Späť">' + K.ikona.spat + '</button></div><div class="lekcia-telo"><div class="obal"><div class="zhrnutie" style="padding-top:10px">' +
      '<svg class="trofej" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56" fill="var(--accent-soft)"/><rect x="34" y="26" width="52" height="68" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="4"/><path d="M46 46h28M46 58h28M46 70h16" stroke="var(--accent)" stroke-width="4" stroke-linecap="round"/><circle cx="84" cy="84" r="16" fill="var(--ok)"/><path d="m77 84 5 5 9-10" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      "<h1>Test: " + esc(m.nazov) + "</h1><p class=\"tlmene\" style=\"margin:0;max-width:40ch\">Overíš si, čo si sa naučil v lekciách " + m.lekcie.map(function (_, i) { return i + 1; }).join(", ") + ". Na prejdenie potrebuješ aspoň " + potrebne + " %. Nápovedy tu nie sú, ale test môžeš opakovať koľkokrát chceš.</p>" +
      '<div class="statistiky"><div><b>' + m.test.otazky.length + "</b><small>otázok</small></div><div><b>" + potrebne + " %</b><small>na prejdenie</small></div><div><b>" + (predch ? predch.best + " %" : "–") + "</b><small>najlepší výsledok</small></div></div>" +
      '</div></div></div><div class="lekcia-dole"><button type="button" class="btn plna" data-zacat>Začať test</button></div></div>');
    uvod.querySelector(".ikona-btn").onclick = function () { K.ist("kurz-" + kurzId, true); };
    uvod.querySelector("[data-zacat]").onclick = function () {
      var kroky = K.zamiesaj(m.test.otazky.map(function (q, i) { return { krok: q, qid: testId + "#" + i }; }));
      var pr = K.Prehravac({
        kroky: kroky, rezim: "test", farba: kurz.farba,
        zavriet: function () { K.ist("kurz-" + kurzId, true); },
        koniec: function (v) {
          var pct = Math.round(v.spravne / v.otazok * 100), preslo = pct >= potrebne;
          var z = K.stav.testy[testId] || { best: 0, preslo: false };
          var prvyKrat = preslo && !z.preslo;
          z.best = Math.max(z.best, pct); z.preslo = z.preslo || preslo; K.stav.testy[testId] = z;
          v.chybne.forEach(function (q) { K.chybaVOtazke(q.qid); });
          var body = preslo ? (prvyKrat ? 50 : 10) + v.spravne * 2 : v.spravne;
          K.pridajXP(body);
          var lekcie = {}; v.chybne.forEach(function (q) { if (q.krok.lekcia) lekcie[q.krok.lekcia] = 1; });
          var odpor = Object.keys(lekcie).map(function (lid) { var l = K.lekcia(lid); return l ? '<a class="btn sek plna" href="#lekcia-' + lid + '">Zopakovať: ' + esc(l.lekcia.nazov) + "</a>" : ""; }).join("");
          v.telo.innerHTML = '<div class="zhrnutie">' + (preslo ? trofejSvg() : "") + '<div class="vysledok-testu" style="color:' + (preslo ? "var(--ok)" : "var(--bad)") + '">' + pct + " %</div>" +
            "<h1>" + (preslo ? "Test si zvládol!" : "Ešte to nie je ono") + "</h1>" +
            '<p class="tlmene" style="margin:0">' + v.spravne + " z " + v.otazok + " správne · +" + body + " XP" + (preslo ? "" : " · potrebuješ " + potrebne + " %") + "</p>" +
            (odpor ? '<div style="display:flex;flex-direction:column;gap:8px;width:100%"><span class="stitok">Odporúčam zopakovať</span>' + odpor + "</div>" : "") + "</div>";
          v.dole.className = "lekcia-dole"; v.dole.querySelector(".spatna-vazba").hidden = true;
          var t = v.tlacidlo; t.className = "btn plna"; t.disabled = false;
          if (preslo) { t.textContent = "Pokračovať"; t.onclick = function () { K.ist("kurz-" + kurzId, true); }; }
          else { t.textContent = "Skúsiť znova"; t.onclick = function () { K.vykresli(); }; }
        },
      });
      var main = K.$("#obrazovka"); main.innerHTML = ""; main.appendChild(pr);
    };
    K._spatHandler = function () { K.ist("kurz-" + kurzId, true); };
    return uvod;
  };

  /* ---------- obrazovka: opakovanie ---------- */
  K.obrazovky.opakovanie = function () {
    var q = K.zamiesaj(K.naOpakovanie()).slice(0, 10);
    if (!q.length) {
      var e = K.el('<div class="lekcia"><div class="lekcia-hore"><button type="button" class="ikona-btn" aria-label="Späť">' + K.ikona.spat + '</button></div><div class="lekcia-telo"><div class="obal"><div class="zhrnutie">' + trofejSvg() + '<h1>Nič na opakovanie</h1><p class="tlmene" style="margin:0;max-width:40ch">Keď sa v lekcii pomýliš, otázku ti tu pripomeniem o deň, potom o 3, 7 a 14 dní. Tak si ju zapamätáš natrvalo.</p></div></div></div></div>');
      e.querySelector(".ikona-btn").onclick = function () { K.ist("domov", true); };
      return e;
    }
    return K.Prehravac({
      kroky: q.map(function (id) { return { krok: K.krokPodlaId(id), qid: id }; }), rezim: "opakovanie",
      zavriet: function () { K.ist("domov", true); },
      koniec: function (v) {
        var zostava = K.naOpakovanie().length;
        v.telo.innerHTML = '<div class="zhrnutie">' + trofejSvg() + "<h1>Zopakované!</h1>" +
          '<div class="statistiky"><div><b>+' + v.xp + "</b><small>XP</small></div><div><b>" + v.spravne + "/" + v.otazok + "</b><small>na prvý pokus</small></div><div><b>" + zostava + "</b><small>zostáva dnes</small></div></div>" +
          '<p class="tlmene" style="margin:0;font-size:14px">Čo si vedel hneď, ti pripomeniem neskôr. Čo nie, uvidíš zajtra znova.</p></div>';
        v.dole.className = "lekcia-dole"; v.dole.querySelector(".spatna-vazba").hidden = true;
        var t = v.tlacidlo; t.className = "btn plna"; t.disabled = false; t.textContent = "Hotovo";
        t.onclick = function () { K.ist("domov", true); };
      },
    });
  };
})();
