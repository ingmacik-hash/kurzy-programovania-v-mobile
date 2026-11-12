/* CSS · Modul 4 · Flexbox */
(function () {
  var P = K.pom, KOD = function (t) { return P.kod(t, "css"); }, TXT = P.TXT, MONO = P.MONO;
  function boxy(css, n, vyska, html) {
    var h = html || ('<div class="f">' + Array.apply(null, Array(n || 3)).map(function (_, i) { return '<div class="b">' + (i + 1) + "</div>"; }).join("") + "</div>");
    return P.ziva(h, ".f { background: #eef1ff; border: 2px dashed #8aa0f0; padding: 6px; min-height: 60px; }\n.b { background: #2f5bea; color: white; padding: 10px 14px; border-radius: 6px; font-weight: bold; }\n" + css, vyska || 100);
  }
  function rect(d, sel, i) { return d.querySelectorAll(sel)[i || 0].getBoundingClientRect(); }

  var OBR_OSI = '<svg viewBox="0 0 340 140" role="img" aria-label="Flex kontajner má hlavnú os vodorovne a priečnu os zvislo">' +
    '<rect x="20" y="20" width="300" height="100" rx="10" style="fill:var(--surface-2);stroke:var(--line)"/>' +
    [0, 1, 2].map(function (i) { return '<rect x="' + (34 + i * 64) + '" y="44" width="54" height="52" rx="6" style="fill:var(--accent)"/>'; }).join("") +
    '<path d="M30 132h280" style="stroke:var(--flame);stroke-width:2.5"/><path d="M302 126l10 6-10 6" style="fill:var(--flame)"/>' +
    '<text x="170" y="14" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--flame)">hlavná os → justify-content</text>' +
    '<path d="M332 26v90" style="stroke:var(--ok);stroke-width:2.5"/><path d="M326 108l6 10 6-10" style="fill:var(--ok)"/>' +
    '<text x="250" y="76" font-size="10.5" font-weight="700" ' + TXT + ' style="fill:var(--ok)">priečna os</text><text x="250" y="90" font-size="10" ' + MONO + ' style="fill:var(--ok)">align-items</text></svg>';

  var L1 = { id: "css-4-1", nazov: "Čo je Flexbox", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Prvky vedľa seba",
      text: "<p><b>Flexbox</b> je spôsob, ako poukladať prvky do <b>riadku alebo stĺpca</b> a jednoducho ich zarovnať. Stačí rodičovi napísať <code>display: flex</code>:</p>" + boxy(".f { display: flex; }"),
      podrobne: "<p>Rodič sa stane <b>flex kontajnerom</b> a jeho priame deti <b>flex položkami</b>. Bloky, ktoré by inak boli pod sebou, sú zrazu v riadku. Flexbox sa používa na menu, hlavičky, karty, tlačidlá s ikonou, centrovanie…</p>",
      hlbka: "<p>Pred Flexboxom (rok 2017 a skôr) sa rozloženie robilo cez <code>float</code> a rôzne triky. Bolo to krehké a centrovanie zvislo bolo povestne ťažké. Dnes Flexbox podporujú všetky prehliadače.</p>" },
    { typ: "vyklad", nadpis: "Hlavná a priečna os",
      text: "<p>Flexbox pracuje v dvoch smeroch:</p>", obr: OBR_OSI,
      podrobne: "<p><code>flex-direction</code> určuje smer hlavnej osi:</p>" + P.tabulka(["Hodnota", "Smer"], [["<code>row</code>", "zľava doprava (predvolené)"], ["<code>column</code>", "zhora nadol"], ["<code>row-reverse</code>", "sprava doľava"], ["<code>column-reverse</code>", "zdola nahor"]]) + boxy(".f { display: flex; flex-direction: column; }", 3, 140) },
    { typ: "volba", otazka: "Komu napíšeš <code>display: flex</code>, aby boli tri karty vedľa seba?", moznosti: ["Rodičovi, ktorý karty obsahuje", "Každej karte", "Prvej karte", "Elementu body vždy"], spravna: 0, vysvetlenie: "Flex sa nastavuje kontajneru. Ovplyvní jeho priame deti." },
    { typ: "volba", otazka: "Ako dáš flex položky pod seba?", moznosti: ["<code>flex-direction: column;</code>", "<code>flex-direction: down;</code>", "<code>display: column;</code>", "<code>flex: vertical;</code>"], spravna: 0, vysvetlenie: "column = stĺpec, hlavná os ide zvislo." },
    { typ: "kod", zadanie: "Daj tri farebné štvorce vedľa seba: kontajneru <code>.rad</code> nastav <code>display: flex</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="rad">\n  <div class="stvorec">A</div>\n  <div class="stvorec">B</div>\n  <div class="stvorec">C</div>\n</div>', css: ".stvorec {\n  width: 60px;\n  height: 60px;\n  background: tomato;\n  margin: 4px;\n}\n.rad {\n  \n}" }, vyska: "230px",
      napoveda: "<code>.rad { display: flex; }</code>", riesenie: { css: ".stvorec {\n  width: 60px;\n  height: 60px;\n  background: tomato;\n  margin: 4px;\n}\n.rad {\n  display: flex;\n}" },
      kontrola: function (d) {
        if (P.styl(d, ".rad", "display") !== "flex") return ".rad ešte nemá display: flex.";
        return Math.abs(rect(d, ".stvorec", 0).top - rect(d, ".stvorec", 2).top) < 2 ? null : "Štvorce nie sú v jednom riadku.";
      }, vysvetlenie: "Jedna vlastnosť a štvorce sú v riadku." },
  ] };

  var L2 = { id: "css-4-2", nazov: "Zarovnanie na hlavnej osi", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "justify-content",
      text: "<p>Ako rozdeliť voľné miesto v riadku:</p>" + P.tabulka(["Hodnota", "Výsledok"], [["<code>flex-start</code>", "na začiatok (predvolené)"], ["<code>center</code>", "do stredu"], ["<code>flex-end</code>", "na koniec"], ["<code>space-between</code>", "prvý na začiatok, posledný na koniec, medzery medzi"], ["<code>space-around</code>", "rovnaké medzery okolo každého"], ["<code>space-evenly</code>", "úplne rovnaké medzery všade"]]),
      podrobne: boxy(".f { display: flex; justify-content: space-between; }", 3, 80) + "<p>Toto je <code>space-between</code>. Typické použitie: logo vľavo, menu vpravo.</p>" },
    { typ: "volba", otazka: "Logo má byť úplne vľavo a menu úplne vpravo. Ktorá hodnota?", moznosti: ["<code>space-between</code>", "<code>center</code>", "<code>flex-start</code>", "<code>space-around</code>"], spravna: 0, vysvetlenie: "space-between odtlačí krajné prvky k okrajom." },
    { typ: "vyklad", nadpis: "Medzera: gap",
      text: "<p>Najjednoduchší spôsob, ako dať medzi položky medzeru, je <code>gap</code> na kontajneri. Funguje len medzi položkami, nie na krajoch:</p>" + boxy(".f { display: flex; gap: 16px; }", 3, 80),
      podrobne: "<p>Kedysi sa medzery robili cez margin na položkách, ale potom mal aj posledný prvok medzeru navyše. <code>gap</code> to rieši čisto.</p>" },
    { typ: "doplnenie", otazka: "Vycentruj tlačidlá a daj medzi ne 10px:", sablona: ".tlacidla {\n  display: flex;\n  [[0]]: center;\n  [[1]]: 10px;\n}", zetony: ["justify-content", "gap", "align-items", "margin", "space"], spravne: ["justify-content", "gap"], vysvetlenie: "justify-content na hlavnej osi, gap pre medzery." },
    { typ: "kod", zadanie: "V hlavičke <code>header</code> daj logo a menu na opačné strany (<code>space-between</code>). Odkazy v <code>nav</code> daj do riadku s medzerou <code>12px</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<header>\n  <b class="logo">Klas</b>\n  <nav>\n    <a href="#">Ponuka</a>\n    <a href="#">Kontakt</a>\n  </nav>\n</header>', css: "header {\n  display: flex;\n  background: #333;\n  color: white;\n  padding: 10px;\n  \n}\nnav a {\n  color: white;\n}\nnav {\n  \n}" }, vyska: "280px",
      napoveda: "V header: <code>justify-content: space-between;</code>. V nav: <code>display: flex; gap: 12px;</code>", riesenie: { css: "header {\n  display: flex;\n  background: #333;\n  color: white;\n  padding: 10px;\n  justify-content: space-between;\n}\nnav a {\n  color: white;\n}\nnav {\n  display: flex;\n  gap: 12px;\n}" },
      kontrola: function (d) {
        if (P.styl(d, "header", "justify-content") !== "space-between") return "header potrebuje justify-content: space-between.";
        if (P.styl(d, "nav", "display") !== "flex") return "nav potrebuje display: flex.";
        return P.styl(d, "nav", "column-gap") === "12px" ? null : "nav potrebuje gap: 12px.";
      }, vysvetlenie: "Presne takto vyzerá hlavička väčšiny webov." },
  ] };

  var L3 = { id: "css-4-3", nazov: "Zarovnanie na priečnej osi", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "align-items",
      text: "<p>Ako zarovnať položky <b>zvislo</b> (pri row):</p>" + P.tabulka(["Hodnota", "Výsledok"], [["<code>stretch</code>", "roztiahnu sa na celú výšku (predvolené)"], ["<code>center</code>", "do stredu"], ["<code>flex-start</code>", "hore"], ["<code>flex-end</code>", "dole"], ["<code>baseline</code>", "podľa spodku textu"]]) +
        boxy(".f { display: flex; align-items: center; height: 90px; gap: 8px; }\n.b:nth-child(2) { padding: 24px 14px; }", 3, 120),
      podrobne: "<p>Ikona vedľa textu, ktorá nie je zarovnaná? <code>align-items: center</code> to opraví.</p>" },
    { typ: "vyklad", nadpis: "Dokonalé centrovanie",
      text: "<p>Kedysi najväčší problém CSS, dnes tri riadky:</p>" + KOD(".kontajner {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}") + boxy(".f { display: flex; justify-content: center; align-items: center; height: 100px; }", 1, 130),
      podrobne: "<p>Ešte kratšie je to v Gride: <code>display: grid; place-items: center;</code>. Spoznáš ho v ďalšom module.</p>" },
    { typ: "volba", otazka: "Pri <code>flex-direction: row</code>, ktorá vlastnosť zarovnáva zvislo?", moznosti: ["<code>align-items</code>", "<code>justify-content</code>", "<code>vertical-align</code>", "<code>text-align</code>"], spravna: 0, vysvetlenie: "align-items pôsobí na priečnej osi." },
    { typ: "volba", otazka: "Čo sa stane pri <code>flex-direction: column</code> s <code>justify-content: center</code>?", moznosti: ["Položky sa vycentrujú zvislo", "Položky sa vycentrujú vodorovne", "Nič", "Chyba"], spravna: 0, vysvetlenie: "Pri column je hlavná os zvislá, preto justify-content pracuje zvislo." },
    { typ: "kod", zadanie: "Vycentruj text <b>Načítavam…</b> vodorovne aj zvislo v prvku <code>.obrazovka</code> pomocou Flexboxu.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="obrazovka">\n  <p>Načítavam…</p>\n</div>', css: ".obrazovka {\n  height: 150px;\n  background: #1d2433;\n  color: white;\n  \n}" }, vyska: "200px",
      napoveda: "<code>display: flex; justify-content: center; align-items: center;</code>", riesenie: { css: ".obrazovka {\n  height: 150px;\n  background: #1d2433;\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}" },
      kontrola: function (d) {
        var o = rect(d, ".obrazovka"), p = rect(d, ".obrazovka p");
        if (P.styl(d, ".obrazovka", "display") !== "flex") return ".obrazovka potrebuje display: flex.";
        if (Math.abs((p.left + p.right) / 2 - (o.left + o.right) / 2) > 3) return "Text nie je vodorovne v strede (justify-content).";
        return Math.abs((p.top + p.bottom) / 2 - (o.top + o.bottom) / 2) < 3 ? null : "Text nie je zvislo v strede (align-items).";
      }, vysvetlenie: "Dokonale v strede." },
  ] };

  var L4 = { id: "css-4-4", nazov: "Pružné položky", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "flex-grow: rozťahovanie",
      text: "<p>Položka s <code>flex-grow: 1</code> zaberie všetko voľné miesto:</p>" + boxy(".f { display: flex; gap: 6px; }\n.b:nth-child(2) { flex-grow: 1; }", 3, 80),
      podrobne: "<p>Ak majú <code>flex-grow: 1</code> všetky položky, rozdelia si miesto rovnako. Pri hodnotách 1 a 2 dostane druhá dvakrát viac voľného miesta. Typické použitie: pole na vyhľadávanie, ktoré vyplní celú šírku vedľa tlačidla.</p>" },
    { typ: "vyklad", nadpis: "Skratka flex",
      text: "<p>Vlastnosť <code>flex</code> spája tri hodnoty: <code>flex-grow</code>, <code>flex-shrink</code> (zmenšovanie) a <code>flex-basis</code> (počiatočná veľkosť).</p>" + P.tabulka(["Zápis", "Význam"], [["<code>flex: 1;</code>", "rovnaký podiel z miesta"], ["<code>flex: 0 0 200px;</code>", "pevne 200px, nerastie, nezmenšuje sa"], ["<code>flex: 1 1 250px;</code>", "začni na 250px, môžeš rásť aj sa zmenšiť"]]),
      podrobne: "<p><code>flex: 1</code> je v praxi najčastejší zápis. Postačí na väčšinu situácií.</p>" },
    { typ: "volba", otazka: "Pole na hľadanie má zabrať všetko miesto vedľa tlačidla. Čo mu dáš?", moznosti: ["<code>flex: 1;</code>", "<code>width: auto;</code>", "<code>flex: 0;</code>", "<code>justify-content: stretch;</code>"], spravna: 0, vysvetlenie: "flex: 1 = rasti do voľného miesta." },
    { typ: "vyklad", nadpis: "Zalamovanie: flex-wrap",
      text: "<p>Bez zalamovania sa položky stláčajú do jedného riadku. S <code>flex-wrap: wrap</code> pokračujú na ďalšom riadku:</p>" + boxy(".f { display: flex; flex-wrap: wrap; gap: 6px; }\n.b { flex: 1 1 90px; }", 5, 110),
      podrobne: "<p>Kombinácia <code>flex-wrap: wrap</code> a <code>flex: 1 1 150px</code> vytvorí karty, ktoré sa samé prispôsobia šírke: na mobile pod sebou, na počítači vedľa seba. A to bez jediného media query.</p>" },
    { typ: "kod", zadanie: "Vyhľadávanie: formulár <code>.hladaj</code> daj do flexu s medzerou <code>8px</code> a poľu <code>input</code> nastav <code>flex: 1</code>, aby vyplnilo miesto vedľa tlačidla.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<form class="hladaj">\n  <input type="search" placeholder="Hľadaj recept">\n  <button>Hľadať</button>\n</form>', css: ".hladaj {\n  \n}\ninput {\n  padding: 8px;\n  \n}" }, vyska: "220px",
      napoveda: "<code>.hladaj { display: flex; gap: 8px; }</code> a do input <code>flex: 1;</code>", riesenie: { css: ".hladaj {\n  display: flex;\n  gap: 8px;\n}\ninput {\n  padding: 8px;\n  flex: 1;\n}" },
      kontrola: function (d) {
        if (P.styl(d, ".hladaj", "display") !== "flex") return ".hladaj potrebuje display: flex.";
        if (P.styl(d, ".hladaj", "column-gap") !== "8px") return ".hladaj potrebuje gap: 8px.";
        if (P.styl(d, "input", "flex-grow") !== "1") return "Pole potrebuje flex: 1.";
        var f = rect(d, ".hladaj"), b = rect(d, "button");
        return Math.abs(b.right - f.right) < 3 ? null : "Pole má vyplniť miesto až po tlačidlo.";
      }, vysvetlenie: "Pole sa natiahne podľa šírky obrazovky." },
  ] };

  var L5 = { id: "css-4-5", nazov: "Flexbox v praxi", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Karta s pätičkou dole",
      text: "<p>Častá úloha: karty rôznej dĺžky, ale tlačidlo má byť vždy úplne dole. Riešenie: karta je flex stĺpec a text dostane <code>flex: 1</code>.</p>" +
        P.ziva('<div class="karty"><div class="karta"><b>Malá</b><p>Krátky text.</p><button>Kúpiť</button></div><div class="karta"><b>Veľká</b><p>Oveľa dlhší popis produktu na viac riadkov textu.</p><button>Kúpiť</button></div></div>',
          ".karty { display: flex; gap: 8px; }\n.karta { flex: 1; display: flex; flex-direction: column; border: 1px solid #ccc; padding: 8px; border-radius: 8px; }\n.karta p { flex: 1; }", 170),
      podrobne: "<p>Rodič <code>.karty</code> dá karty vedľa seba a natiahne ich na rovnakú výšku (<code>align-items: stretch</code> je predvolené). Vnútri karty <code>p { flex: 1 }</code> odtlačí tlačidlo nadol.</p>" },
    { typ: "volba", otazka: "Prečo majú karty v ukážke rovnakú výšku?", moznosti: ["Predvolené align-items: stretch ich natiahne", "Majú height", "Náhoda", "Kvôli gap"], spravna: 0, vysvetlenie: "V riadku sa flex položky naťahujú na výšku najvyššej." },
    { typ: "vyklad", nadpis: "order a align-self",
      text: P.tabulka(["Vlastnosť (na položke)", "Čo robí"], [["<code>order: -1;</code>", "presunie položku dopredu bez zmeny HTML"], ["<code>align-self: flex-end;</code>", "zarovná len túto položku inak"], ["<code>margin-left: auto;</code>", "odtlačí položku a všetko za ňou doprava"]]),
      podrobne: "<p><code>margin-left: auto</code> je obľúbený trik: v menu odtlačí posledné tlačidlo (napr. Prihlásiť) úplne doprava.</p>" },
    { typ: "volba", otazka: "Ako odtlačíš tlačidlo Prihlásiť v menu úplne doprava?", moznosti: ["<code>margin-left: auto;</code>", "<code>float: right;</code>", "<code>right: 0;</code>", "<code>order: 99;</code>"], spravna: 0, vysvetlenie: "Automatický margin zje všetko voľné miesto naľavo." },
    { typ: "kod", zadanie: "Sprav z <code>.galeria</code> flex so zalamovaním (<code>flex-wrap: wrap</code>) a medzerou <code>8px</code>. Každá <code>.fotka</code> nech má <code>flex: 1 1 100px</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="galeria">\n  <div class="fotka">1</div>\n  <div class="fotka">2</div>\n  <div class="fotka">3</div>\n  <div class="fotka">4</div>\n  <div class="fotka">5</div>\n</div>', css: ".fotka {\n  height: 60px;\n  background: #7c5cff;\n  color: white;\n  \n}\n.galeria {\n  \n}" }, vyska: "260px",
      napoveda: "<code>.galeria { display: flex; flex-wrap: wrap; gap: 8px; }</code> a <code>.fotka { flex: 1 1 100px; }</code>", riesenie: { css: ".fotka {\n  height: 60px;\n  background: #7c5cff;\n  color: white;\n  flex: 1 1 100px;\n}\n.galeria {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}" },
      kontrola: function (d) {
        if (P.styl(d, ".galeria", "display") !== "flex") return ".galeria potrebuje display: flex.";
        if (P.styl(d, ".galeria", "flex-wrap") !== "wrap") return ".galeria potrebuje flex-wrap: wrap.";
        if (P.styl(d, ".galeria", "row-gap") !== "8px") return ".galeria potrebuje gap: 8px.";
        return P.styl(d, ".fotka", "flex-basis") === "100px" && P.styl(d, ".fotka", "flex-grow") === "1" ? null : "Fotky potrebujú flex: 1 1 100px.";
      }, vysvetlenie: "Galéria sa prispôsobí akejkoľvek šírke obrazovky." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li><code>display: flex</code> na rodičovi, <code>flex-direction</code>.</li><li><code>justify-content</code> (hlavná os), <code>align-items</code> (priečna os).</li><li><code>gap</code>, <code>flex-wrap</code>.</li><li><code>flex: 1</code>, <code>flex-basis</code>, <code>margin-left: auto</code>, <code>order</code>.</li></ul>", tip: "Teraz test. Potom Modul 5: Grid, mriežky v dvoch smeroch." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "css-4-1", otazka: "Čo spraví <code>display: flex</code> na rodičovi?", moznosti: ["Jeho deti sa zoradia do riadku", "Rodič sa skryje", "Deti budú pod sebou", "Pridá rámik"], spravna: 0, vysvetlenie: "Predvolený smer je row." },
    { typ: "volba", lekcia: "css-4-1", otazka: "Ktorá vlastnosť mení smer na stĺpec?", moznosti: ["<code>flex-direction</code>", "<code>flex-wrap</code>", "<code>justify-content</code>", "<code>display</code>"], spravna: 0, vysvetlenie: "flex-direction: column." },
    { typ: "volba", lekcia: "css-4-2", otazka: "Rovnaké medzery medzi položkami aj na krajoch:", moznosti: ["<code>space-evenly</code>", "<code>space-between</code>", "<code>center</code>", "<code>flex-end</code>"], spravna: 0, vysvetlenie: "space-evenly = všetky medzery rovnaké." },
    { typ: "volba", lekcia: "css-4-2", otazka: "Medzera 20px len medzi flex položkami:", moznosti: ["<code>gap: 20px;</code>", "<code>margin: 20px;</code>", "<code>padding: 20px;</code>", "<code>space: 20px;</code>"], spravna: 0, vysvetlenie: "gap nepridá medzeru na kraje." },
    { typ: "doplnenie", lekcia: "css-4-3", otazka: "Dokonalé centrovanie:", sablona: "display: flex;\n[[0]]: center;\n[[1]]: center;", zetony: ["justify-content", "align-items", "text-align", "vertical-align"], spravne: ["justify-content", "align-items"], vysvetlenie: "Hlavná a priečna os." },
    { typ: "volba", lekcia: "css-4-3", otazka: "Ikona a text v tlačidle nie sú zvislo zarovnané. Čo pomôže?", moznosti: ["<code>align-items: center;</code>", "<code>justify-content: center;</code>", "<code>text-align: center;</code>", "<code>line-height: 0;</code>"], spravna: 0, vysvetlenie: "align-items zarovná zvislo v riadku." },
    { typ: "volba", lekcia: "css-4-4", otazka: "Čo urobí <code>flex: 1</code> na všetkých troch položkách?", moznosti: ["Rozdelia si šírku rovnako", "Prvá bude najširšia", "Budú pod sebou", "Nič"], spravna: 0, vysvetlenie: "Rovnaký podiel z voľného miesta." },
    { typ: "volba", lekcia: "css-4-4", otazka: "Karty sa nezmestia a stláčajú sa. Čo im dovolí prejsť na ďalší riadok?", moznosti: ["<code>flex-wrap: wrap;</code>", "<code>flex-direction: wrap;</code>", "<code>overflow: wrap;</code>", "<code>white-space: wrap;</code>"], spravna: 0, vysvetlenie: "flex-wrap: wrap zapne zalamovanie." },
    { typ: "volba", lekcia: "css-4-5", otazka: "Ako presunieš položku vizuálne na začiatok bez zmeny HTML?", moznosti: ["<code>order: -1;</code>", "<code>position: first;</code>", "<code>flex: first;</code>", "<code>z-index: -1;</code>"], spravna: 0, vysvetlenie: "order mení poradie zobrazenia." },
    { typ: "volba", lekcia: "css-4-5", otazka: "Ako zarovnáš len jednu položku inak ako ostatné?", moznosti: ["<code>align-self</code>", "<code>align-items</code>", "<code>justify-self</code>", "<code>self-align</code>"], spravna: 0, vysvetlenie: "align-self sa píše na položku." },
  ];

  K.registrujModul("css", { cislo: 4, nazov: "Flexbox", popis: "Riadky a stĺpce, zarovnanie na osiach, medzery, rozťahovanie a zalamovanie položiek.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
