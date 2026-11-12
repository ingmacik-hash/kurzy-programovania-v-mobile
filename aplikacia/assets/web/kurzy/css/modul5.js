/* CSS · Modul 5 · Grid */
(function () {
  var P = K.pom, KOD = function (t) { return P.kod(t, "css"); }, TXT = P.TXT, MONO = P.MONO;
  function mriezka(css, n, vyska) {
    return P.ziva('<div class="g">' + Array.apply(null, Array(n || 6)).map(function (_, i) { return '<div class="b">' + (i + 1) + "</div>"; }).join("") + "</div>",
      ".g { background: #f3eeff; border: 2px dashed #a58af0; padding: 6px; }\n.b { background: #6a3fc9; color: white; padding: 10px; border-radius: 6px; font-weight: bold; text-align: center; }\n" + css, vyska || 130);
  }
  function rect(d, sel, i) { return d.querySelectorAll(sel)[i || 0].getBoundingClientRect(); }

  var OBR_GRID = '<svg viewBox="0 0 340 150" role="img" aria-label="Mriežka s troma stĺpcami a dvoma riadkami, medzi nimi medzery gap, čiary mriežky sú očíslované">' +
    (function () {
      var s = "";
      for (var r = 0; r < 2; r++) for (var c = 0; c < 3; c++) s += '<rect x="' + (40 + c * 92) + '" y="' + (24 + r * 56) + '" width="84" height="48" rx="6" style="fill:var(--accent);opacity:' + (r === 0 && c === 0 ? 1 : .55) + '"/>';
      [36, 128, 220, 312].forEach(function (x, i) { s += '<text x="' + x + '" y="16" text-anchor="middle" font-size="10.5" font-weight="700" ' + MONO + ' style="fill:var(--flame)">' + (i + 1) + '</text><path d="M' + x + " 20v118" + '" style="stroke:var(--flame);stroke-dasharray:3 3"/>'; });
      s += '<text x="170" y="148" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">čiary mriežky 1 – 4 · medzera = gap</text>';
      return s;
    })() + "</svg>";

  var L1 = { id: "css-5-1", nazov: "Prvá mriežka", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Flexbox vs. Grid",
      text: "<p>Flexbox ukladá prvky v <b>jednom smere</b> (riadok alebo stĺpec). <b>Grid</b> pracuje v <b>dvoch smeroch naraz</b>: riadky aj stĺpce. Je ideálny na galérie, produkty v e-shope či rozloženie celej stránky.</p>", obr: OBR_GRID,
      podrobne: P.tabulka(["", "Flexbox", "Grid"], [["Smer", "jeden", "dva"], ["Riadi sa", "obsahom položiek", "mriežkou, ktorú určíš"], ["Typicky", "menu, tlačidlá, riadok kariet", "galéria, rozloženie stránky"]]) + "<p>Nevyberáš si jedno: v praxi sa kombinujú. Grid na rozloženie stránky, Flexbox vnútri jednotlivých častí.</p>" },
    { typ: "vyklad", nadpis: "Stĺpce mriežky",
      text: "<p>Rodič dostane <code>display: grid</code> a <code>grid-template-columns</code> určí stĺpce:</p>" + mriezka(".g { display: grid; grid-template-columns: 100px 100px 100px; gap: 6px; }"),
      podrobne: "<p>Tri hodnoty = tri stĺpce. Položky sa samé uložia do riadkov: 1, 2, 3 v prvom, 4, 5, 6 v druhom. Riadky netreba definovať, vzniknú automaticky.</p>" },
    { typ: "volba", otazka: "Čo vytvorí <code>grid-template-columns: 50px 50px;</code>?", moznosti: ["Dva stĺpce po 50px", "Dva riadky po 50px", "Jeden stĺpec 100px", "Štvorec 50×50"], spravna: 0, vysvetlenie: "Každá hodnota je jeden stĺpec." },
    { typ: "volba", otazka: "Kedy je lepší Grid ako Flexbox?", moznosti: ["Keď potrebuješ riadky aj stĺpce naraz", "Na jedno tlačidlo", "Na odsek textu", "Nikdy"], spravna: 0, vysvetlenie: "Grid = dvojrozmerné rozloženie." },
    { typ: "kod", zadanie: "Sprav z <code>.produkty</code> mriežku s tromi stĺpcami po <code>90px</code> a medzerou <code>10px</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="produkty">\n  <div>Jablko</div>\n  <div>Hruška</div>\n  <div>Slivka</div>\n  <div>Broskyňa</div>\n  <div>Marhuľa</div>\n  <div>Čerešňa</div>\n</div>', css: ".produkty div {\n  background: #ffe0b3;\n  padding: 10px;\n}\n.produkty {\n  \n}" }, vyska: "250px",
      napoveda: "<code>display: grid; grid-template-columns: 90px 90px 90px; gap: 10px;</code>", riesenie: { css: ".produkty div {\n  background: #ffe0b3;\n  padding: 10px;\n}\n.produkty {\n  display: grid;\n  grid-template-columns: 90px 90px 90px;\n  gap: 10px;\n}" },
      kontrola: function (d) {
        if (P.styl(d, ".produkty", "display") !== "grid") return ".produkty potrebuje display: grid.";
        var c = P.styl(d, ".produkty", "grid-template-columns").split(" ");
        if (c.length !== 3 || c.some(function (x) { return x !== "90px"; })) return "Majú byť 3 stĺpce po 90px.";
        return P.styl(d, ".produkty", "row-gap") === "10px" ? null : "Chýba gap: 10px.";
      }, vysvetlenie: "Šesť produktov v dvoch riadkoch po troch." },
  ] };

  var L2 = { id: "css-5-2", nazov: "Pružné stĺpce: fr a repeat", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Jednotka fr",
      text: "<p><code>fr</code> (fraction = diel) rozdelí voľné miesto. <code>1fr 1fr 1fr</code> = tri rovnaké stĺpce, nech je obrazovka akákoľvek široká.</p>" + mriezka(".g { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 6px; }", 3, 70),
      podrobne: "<p>Tu je <code>1fr 2fr 1fr</code>: stredný stĺpec je dvakrát širší. Jednotky sa dajú miešať: <code>200px 1fr</code> = bočný panel 200px a obsah vyplní zvyšok.</p>" },
    { typ: "vyklad", nadpis: "repeat()",
      text: "<p>Aby si nemusel písať to isté dookola: <code>repeat(4, 1fr)</code> = <code>1fr 1fr 1fr 1fr</code>.</p>" + mriezka(".g { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }", 8, 110),
      podrobne: "<p>Rovnako funguje <code>grid-template-rows</code> pre riadky, ak potrebuješ pevnú výšku riadkov.</p>" },
    { typ: "volba", otazka: "Bočný panel 250px a obsah na zvyšok šírky:", moznosti: ["<code>grid-template-columns: 250px 1fr;</code>", "<code>grid-template-columns: 250px 100%;</code>", "<code>grid-template-columns: 1fr 250px 1fr;</code>", "<code>grid-columns: 250px auto-fill;</code>"], spravna: 0, vysvetlenie: "1fr vyplní, čo zostane po 250px." },
    { typ: "doplnenie", otazka: "Päť rovnakých stĺpcov:", sablona: "grid-template-columns: [[0]](5, [[1]]);", zetony: ["repeat", "1fr", "times", "5px", "auto"], spravne: ["repeat", "1fr"], vysvetlenie: "repeat(5, 1fr)" },
    { typ: "kod", zadanie: "Rozloženie stránky: <code>.stranka</code> nech je mriežka s dvoma stĺpcami: menu <code>80px</code> a obsah <code>1fr</code>, s medzerou <code>8px</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="stranka">\n  <nav>Menu</nav>\n  <main>Hlavný obsah stránky</main>\n</div>', css: "nav { background: #333; color: white; padding: 10px; }\nmain { background: #eee; padding: 10px; }\n.stranka {\n  \n}" }, vyska: "220px",
      napoveda: "<code>display: grid; grid-template-columns: 80px 1fr; gap: 8px;</code>", riesenie: { css: "nav { background: #333; color: white; padding: 10px; }\nmain { background: #eee; padding: 10px; }\n.stranka {\n  display: grid;\n  grid-template-columns: 80px 1fr;\n  gap: 8px;\n}" },
      kontrola: function (d) {
        if (P.styl(d, ".stranka", "display") !== "grid") return ".stranka potrebuje display: grid.";
        if (Math.round(rect(d, "nav").width) !== 80) return "Menu má byť široké 80px.";
        var s = rect(d, ".stranka"), m = rect(d, "main");
        if (Math.abs(m.right - s.right) > 2) return "Obsah má vyplniť zvyšok šírky (1fr).";
        return P.styl(d, ".stranka", "column-gap") === "8px" ? null : "Chýba gap: 8px.";
      }, vysvetlenie: "Klasické rozloženie s bočným menu." },
  ] };

  var L3 = { id: "css-5-3", nazov: "Položky cez viac buniek", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "span",
      text: "<p>Položka môže zabrať viac stĺpcov alebo riadkov:</p>" + mriezka(".g { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }\n.b:first-child { grid-column: span 2; }\n.b:nth-child(4) { grid-row: span 2; }", 6, 150),
      podrobne: P.tabulka(["Zápis", "Význam"], [["<code>grid-column: span 2;</code>", "zaber 2 stĺpce"], ["<code>grid-row: span 2;</code>", "zaber 2 riadky"], ["<code>grid-column: 1 / 3;</code>", "od čiary 1 po čiaru 3"], ["<code>grid-column: 1 / -1;</code>", "cez celú šírku"]]) },
    { typ: "volba", otazka: "Nadpis má byť cez celú šírku mriežky. Ktorý zápis?", moznosti: ["<code>grid-column: 1 / -1;</code>", "<code>grid-column: all;</code>", "<code>width: 100%;</code>", "<code>grid-row: 1 / -1;</code>"], spravna: 0, vysvetlenie: "-1 je posledná čiara mriežky." },
    { typ: "volba", otazka: "Koľko stĺpcov zaberie <code>grid-column: 2 / 4;</code>?", moznosti: ["2 (od čiary 2 po 4)", "4", "3", "1"], spravna: 0, vysvetlenie: "Čiary 2 → 4 = stĺpce 2 a 3." },
    { typ: "kod", zadanie: "V galérii nech prvá fotka <code>.velka</code> zaberie 2 stĺpce a 2 riadky.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="galeria">\n  <div class="velka">1</div>\n  <div>2</div>\n  <div>3</div>\n  <div>4</div>\n  <div>5</div>\n</div>', css: ".galeria {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 6px;\n}\n.galeria div {\n  background: #2a9d8f;\n  color: white;\n  min-height: 50px;\n}\n.velka {\n  \n}" }, vyska: "290px",
      napoveda: "<code>grid-column: span 2; grid-row: span 2;</code>", riesenie: { css: ".galeria {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 6px;\n}\n.galeria div {\n  background: #2a9d8f;\n  color: white;\n  min-height: 50px;\n}\n.velka {\n  grid-column: span 2;\n  grid-row: span 2;\n}" },
      kontrola: function (d) {
        var v = rect(d, ".velka"), m = rect(d, ".galeria div", 1);
        if (v.width < m.width * 1.8) return "Veľká fotka ešte nezaberá 2 stĺpce.";
        return v.height > m.height * 1.8 ? null : "Veľká fotka ešte nezaberá 2 riadky.";
      }, vysvetlenie: "Zvýraznená fotka a ostatné okolo nej." },
  ] };

  var L4 = { id: "css-5-4", nazov: "Pomenované oblasti", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "grid-template-areas",
      text: "<p>Rozloženie stránky môžeš doslova <b>nakresliť</b> slovami. Každý reťazec je jeden riadok mriežky:</p>" + KOD('.stranka {\n  display: grid;\n  grid-template-columns: 1fr 3fr;\n  grid-template-areas:\n    "hlava hlava"\n    "menu  obsah"\n    "pata  pata";\n}\nheader { grid-area: hlava; }\nnav    { grid-area: menu; }\nmain   { grid-area: obsah; }\nfooter { grid-area: pata; }') +
        P.ziva("<header>hlava</header><nav>menu</nav><main>obsah</main><footer>pata</footer>", '.x{}body{display:grid;grid-template-columns:1fr 3fr;gap:4px;grid-template-areas:"hlava hlava" "menu obsah" "pata pata"}\nheader{grid-area:hlava;background:#f4a261}nav{grid-area:menu;background:#2a9d8f}main{grid-area:obsah;background:#e9c46a;min-height:50px}footer{grid-area:pata;background:#264653;color:#fff}\nbody>*{padding:6px}', 130),
      podrobne: "<p>Rovnaké meno vedľa seba = oblasť cez viac buniek. Bodka <code>.</code> znamená prázdnu bunku. Na mobile stačí prepísať <code>grid-template-areas</code> a stránka sa preusporiada.</p>" },
    { typ: "volba", otazka: "Čo znamená <code>\"hlava hlava\"</code> v grid-template-areas?", moznosti: ["Oblasť hlava zaberá oba stĺpce prvého riadku", "Sú dve hlavičky", "Chyba v zápise", "Hlava má dvojitú výšku"], spravna: 0, vysvetlenie: "Opakované meno = oblasť sa roztiahne." },
    { typ: "kod", zadanie: "Doplň oblasti: <code>header</code> do oblasti <b>hlava</b>, <code>main</code> do <b>obsah</b> a <code>footer</code> do <b>pata</b> (vlastnosť <code>grid-area</code>).",
      karty: ["html", "css"], aktivna: "css", start: { html: "<div class=\"stranka\">\n  <header>Hlavička</header>\n  <main>Obsah</main>\n  <footer>Pätička</footer>\n</div>", css: '.stranka {\n  display: grid;\n  grid-template-areas:\n    "hlava"\n    "obsah"\n    "pata";\n}\nheader { background: #f4a261; }\nfooter { background: #264653; color: white; }\n' }, vyska: "300px",
      napoveda: "<code>header { grid-area: hlava; }</code> a podobne main a footer.", riesenie: { css: '.stranka {\n  display: grid;\n  grid-template-areas:\n    "hlava"\n    "obsah"\n    "pata";\n}\nheader { background: #f4a261; grid-area: hlava; }\nmain { grid-area: obsah; }\nfooter { background: #264653; color: white; grid-area: pata; }\n' },
      kontrola: function (d) {
        var m = { header: "hlava", main: "obsah", footer: "pata" };
        for (var s in m) if (P.styl(d, s, "grid-area").split(" ")[0] !== m[s]) return s + " ešte nemá grid-area: " + m[s] + ".";
        return null;
      }, vysvetlenie: "Teraz stačí zmeniť nákres v grid-template-areas a časti sa presunú." },
  ] };

  var L5 = { id: "css-5-5", nazov: "Mriežka bez media queries", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "auto-fit a minmax",
      text: "<p>Najužitočnejší riadok CSS na galérie a karty:</p>" + KOD("grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));") +
        mriezka(".g { display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 6px; }", 7, 130),
      podrobne: "<p>Čítaj: „vytvor toľko stĺpcov, koľko sa zmestí (auto-fit), každý aspoň 120px a nanajvýš 1fr“. Na mobile vzniknú 2 stĺpce, na tablete 4, na počítači 8, a nemusíš písať žiadne media query.</p>" },
    { typ: "volba", otazka: "Čo zabezpečí <code>minmax(150px, 1fr)</code>?", moznosti: ["Stĺpec bude aspoň 150px a môže rásť", "Stĺpec bude presne 150px", "Najviac 150px", "1 stĺpec"], spravna: 0, vysvetlenie: "minmax(najmenej, najviac)." },
    { typ: "vyklad", nadpis: "Centrovanie a zarovnanie v Gride",
      text: P.tabulka(["Vlastnosť", "Čo robí"], [["<code>place-items: center;</code>", "vycentruje obsah v každej bunke (oba smery)"], ["<code>justify-items</code>", "vodorovne v bunkách"], ["<code>align-items</code>", "zvislo v bunkách"]]) + KOD(".obrazovka {\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n}"),
      podrobne: "<p>Dva riadky a čokoľvek je presne v strede obrazovky. Najkratšie centrovanie v CSS.</p>" },
    { typ: "kod", zadanie: "Karty receptov: <code>.recepty</code> nech je mriežka so stĺpcami <code>repeat(auto-fit, minmax(100px, 1fr))</code> a medzerou <code>10px</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="recepty">\n  <div class="karta">Halušky</div>\n  <div class="karta">Pirohy</div>\n  <div class="karta">Kapustnica</div>\n  <div class="karta">Lokše</div>\n  <div class="karta">Šúľance</div>\n</div>', css: ".karta {\n  background: #fff3e0;\n  border: 1px solid #f0c080;\n  padding: 16px 8px;\n  text-align: center;\n}\n.recepty {\n  \n}" }, vyska: "260px",
      napoveda: "<code>display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 10px;</code>", riesenie: { css: ".karta {\n  background: #fff3e0;\n  border: 1px solid #f0c080;\n  padding: 16px 8px;\n  text-align: center;\n}\n.recepty {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));\n  gap: 10px;\n}" },
      kontrola: function (d, s) {
        if (P.styl(d, ".recepty", "display") !== "grid") return ".recepty potrebuje display: grid.";
        if (!/repeat\(\s*auto-fit\s*,\s*minmax\(\s*100px\s*,\s*1fr\s*\)\s*\)/i.test(s.css)) return "Stĺpce majú byť repeat(auto-fit, minmax(100px, 1fr)).";
        return P.styl(d, ".recepty", "row-gap") === "10px" ? null : "Chýba gap: 10px.";
      }, vysvetlenie: "Skús si predstaviť širšiu obrazovku: kariet v riadku pribudne samo." },
    { typ: "vyklad", nadpis: "Modul 5 máš za sebou",
      text: "<ul><li><code>display: grid</code>, <code>grid-template-columns</code>, <code>gap</code>.</li><li><code>fr</code>, <code>repeat()</code>, <code>minmax()</code>, <code>auto-fit</code>.</li><li><code>grid-column</code>/<code>grid-row</code> so <code>span</code> a čiarami.</li><li><code>grid-template-areas</code> a <code>grid-area</code>.</li><li><code>place-items: center</code>.</li></ul>", tip: "Teraz test. Potom posledný Modul 6: responzívny dizajn a animácie." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "css-5-1", otazka: "Ktorá vlastnosť určuje stĺpce mriežky?", moznosti: ["<code>grid-template-columns</code>", "<code>grid-columns</code>", "<code>columns</code>", "<code>grid-template</code>"], spravna: 0, vysvetlenie: "grid-template-columns." },
    { typ: "volba", lekcia: "css-5-1", otazka: "Hlavný rozdiel Gridu a Flexboxu:", moznosti: ["Grid pracuje v dvoch smeroch, Flexbox v jednom", "Grid je starší", "Flexbox nevie medzery", "Grid nefunguje na mobile"], spravna: 0, vysvetlenie: "Riadky aj stĺpce naraz = Grid." },
    { typ: "volba", lekcia: "css-5-2", otazka: "Čo je <code>1fr</code>?", moznosti: ["Jeden diel voľného miesta", "1 pixel", "1 % šírky", "Jeden riadok"], spravna: 0, vysvetlenie: "fr = fraction." },
    { typ: "doplnenie", lekcia: "css-5-2", otazka: "Tri rovnaké stĺpce:", sablona: "display: [[0]];\ngrid-template-columns: [[1]](3, 1fr);", zetony: ["grid", "repeat", "flex", "times"], spravne: ["grid", "repeat"], vysvetlenie: "display: grid; repeat(3, 1fr)." },
    { typ: "volba", lekcia: "css-5-3", otazka: "Položka cez 3 stĺpce:", moznosti: ["<code>grid-column: span 3;</code>", "<code>grid-span: 3;</code>", "<code>colspan: 3;</code>", "<code>grid-row: span 3;</code>"], spravna: 0, vysvetlenie: "grid-column so span. colspan je HTML atribút tabuliek." },
    { typ: "volba", lekcia: "css-5-4", otazka: "Ako priradíš prvok do oblasti „menu“?", moznosti: ["<code>grid-area: menu;</code>", "<code>area: menu;</code>", "<code>grid-name: menu;</code>", "<code>class=\"menu\"</code>"], spravna: 0, vysvetlenie: "grid-area s menom oblasti." },
    { typ: "volba", lekcia: "css-5-4", otazka: "Čo znamená bodka v <code>\". obsah\"</code>?", moznosti: ["Prázdna bunka", "Chyba", "Oblasť s názvom bodka", "Koniec riadku"], spravna: 0, vysvetlenie: "Bodka = nič tam nie je." },
    { typ: "volba", lekcia: "css-5-5", otazka: "Galéria, ktorá sama zmení počet stĺpcov podľa šírky:", moznosti: ["<code>repeat(auto-fit, minmax(150px, 1fr))</code>", "<code>repeat(3, 150px)</code>", "<code>1fr 1fr 1fr</code>", "<code>auto auto</code>"], spravna: 0, vysvetlenie: "auto-fit + minmax." },
    { typ: "volba", lekcia: "css-5-5", otazka: "Najkratšie centrovanie obsahu v CSS:", moznosti: ["<code>display: grid; place-items: center;</code>", "<code>margin: auto auto;</code>", "<code>align: middle;</code>", "<code>text-align: center;</code>"], spravna: 0, vysvetlenie: "place-items centruje v oboch smeroch." },
  ];

  K.registrujModul("css", { cislo: 5, nazov: "Grid", popis: "Mriežky v dvoch smeroch: stĺpce, fr, repeat, spájanie buniek, pomenované oblasti a automatické stĺpce.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
