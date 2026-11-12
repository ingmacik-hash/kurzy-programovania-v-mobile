/* JavaScript · Modul 5 · Polia a objekty */
(function () {
  var P = K.pom, JS = function (t) { return P.kod(t, "js"); }, TXT = P.TXT, MONO = P.MONO;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "js", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function over(d, testy) {
    for (var i = 0; i < testy.length; i++) { var v = P.js(d, "JSON.stringify(" + testy[i][0] + ")"); if (v !== JSON.stringify(testy[i][1])) return testy[i][0] + " má byť " + JSON.stringify(testy[i][1]) + ", je: " + v + "."; }
    return null;
  }

  var OBR_POLE = '<svg viewBox="0 0 340 100" role="img" aria-label="Pole je rad šuplíkov s indexmi od nuly">' +
    ["jablko", "hruška", "slivka", "čerešňa"].map(function (t, i) {
      return '<rect x="' + (10 + i * 80) + '" y="22" width="74" height="40" rx="6" style="fill:var(--surface-2);stroke:var(--accent);stroke-width:1.5"/><text x="' + (47 + i * 80) + '" y="47" text-anchor="middle" font-size="12" ' + TXT + ' style="fill:var(--text)">' + t + '</text><text x="' + (47 + i * 80) + '" y="80" text-anchor="middle" font-size="13" font-weight="700" ' + MONO + ' style="fill:var(--hl-num)">' + i + "</text>";
    }).join("") + '<text x="170" y="14" text-anchor="middle" font-size="11" font-weight="700" ' + MONO + ' style="fill:var(--hl-sel)">ovocie</text><text x="170" y="96" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">index · ovocie.length = 4</text></svg>';

  var L1 = { id: "js-5-1", nazov: "Polia", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Veľa hodnôt v jednej premennej",
      text: "<p><b>Pole</b> (array) je zoznam hodnôt v hranatých zátvorkách. Každá má svoje číslo, <b>index</b>, ktorý začína od <b>nuly</b>:</p>", obr: OBR_POLE,
      podrobne: UKAZ('const ovocie = ["jablko", "hruška", "slivka", "čerešňa"];\nconsole.log(ovocie[0]);\nconsole.log(ovocie.length);\novocie[1] = "broskyňa";\nconsole.log(ovocie);', 'jablko\n4\n["jablko","broskyňa","slivka","čerešňa"]') + "<p>Pole môže obsahovať čokoľvek: čísla, texty, aj iné polia. Aj keď je pole <code>const</code>, jeho obsah meniť môžeš. Nemôžeš len do premennej priradiť iné pole.</p>" },
    { typ: "volba", otazka: "Čo je <code>[\"a\", \"b\", \"c\"][2]</code>?", moznosti: ["\"c\"", "\"b\"", "undefined", "\"a\""], spravna: 0, vysvetlenie: "Index 2 je tretí prvok." },
    { typ: "volba", otazka: "Ako získaš posledný prvok poľa <code>p</code>?", moznosti: ["<code>p[p.length - 1]</code>", "<code>p[p.length]</code>", "<code>p[-1]</code>", "<code>p.last</code>"], spravna: 0, vysvetlenie: "Posledný index je o jedna menší ako dĺžka. Nové je aj p.at(-1)." },
    { typ: "vyklad", nadpis: "Pridávanie a odoberanie",
      text: P.tabulka(["Metóda", "Čo robí"], [["<code>push(x)</code>", "pridá na koniec"], ["<code>pop()</code>", "odoberie posledný a vráti ho"], ["<code>unshift(x)</code>", "pridá na začiatok"], ["<code>shift()</code>", "odoberie prvý"], ["<code>includes(x)</code>", "obsahuje x? true/false"], ["<code>indexOf(x)</code>", "index prvku alebo -1"], ["<code>join(\", \")</code>", "spojí do textu"]]),
      podrobne: UKAZ('const nakup = ["mlieko"];\nnakup.push("chlieb");\nnakup.push("syr");\nconsole.log(nakup.join(", "));\nconsole.log(nakup.includes("syr"));', "mlieko, chlieb, syr\ntrue") },
    { typ: "kod", zadanie: "Do poľa <code>ulohy</code> pridaj na koniec <b>\"upratať izbu\"</b>, potom odober prvú úlohu (<code>shift</code>) a vypíš pole spojené čiarkou a medzerou.",
      karty: ["js"], start: { js: 'const ulohy = ["nakúpiť", "vyniesť smeti"];\n' }, vyska: "160px",
      napoveda: 'ulohy.push("upratať izbu"); ulohy.shift(); console.log(ulohy.join(", "));', riesenie: { js: 'const ulohy = ["nakúpiť", "vyniesť smeti"];\nulohy.push("upratať izbu");\nulohy.shift();\nconsole.log(ulohy.join(", "));' },
      kontrola: function (d) {
        var e = over(d, [["ulohy", ["vyniesť smeti", "upratať izbu"]]]); if (e) return e;
        return P.log(d).pop() === "vyniesť smeti, upratať izbu" ? null : "Vypíš ulohy.join(\", \").";
      }, vysvetlenie: "Pole je ako zoznam úloh: pridávaš a odškrtávaš." },
  ] };

  var L2 = { id: "js-5-2", nazov: "Prechod poľom", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "for...of a forEach",
      text: UKAZ('const ziaci = ["Jana", "Peter", "Eva"];\n\nfor (const meno of ziaci) {\n  console.log(`Ahoj ${meno}`);\n}\n\nziaci.forEach((meno, i) => console.log(i + 1, meno));', "Ahoj Jana\nAhoj Peter\nAhoj Eva\n1 Jana\n2 Peter\n3 Eva"),
      podrobne: "<p><code>for...of</code> je najčitateľnejší. <code>forEach</code> volá funkciu pre každý prvok a dá jej aj index. Klasický <code>for (let i = 0; i &lt; pole.length; i++)</code> funguje tiež.</p>" },
    { typ: "volba", otazka: "Čo dostane funkcia vo <code>forEach</code> ako druhý parameter?", moznosti: ["index prvku", "celé pole", "dĺžku poľa", "nič"], spravna: 0, vysvetlenie: "forEach((prvok, index) => …)" },
    { typ: "kod", zadanie: "Funkcia <code>priemer(znamky)</code> vráti priemer čísel v poli (súčet / počet). Pre prázdne pole vráť 0.",
      karty: ["js"], start: { js: "function priemer(znamky) {\n  \n}\n\nconsole.log(priemer([1, 2, 2, 3]));" }, vyska: "200px",
      napoveda: "if (znamky.length === 0) return 0; let s = 0; for (const z of znamky) s += z; return s / znamky.length;", riesenie: { js: "function priemer(znamky) {\n  if (znamky.length === 0) return 0;\n  let sucet = 0;\n  for (const z of znamky) {\n    sucet += z;\n  }\n  return sucet / znamky.length;\n}\n\nconsole.log(priemer([1, 2, 2, 3]));" },
      kontrola: function (d) { return over(d, [["priemer([1, 2, 2, 3])", 2], ["priemer([1])", 1], ["priemer([1, 2])", 1.5], ["priemer([])", 0]]); },
      vysvetlenie: "Aj prázdne pole je ošetrené, inak by vyšlo NaN (delenie nulou)." },
  ] };

  var L3 = { id: "js-5-3", nazov: "map, filter, find", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Nové pole z existujúceho",
      text: P.tabulka(["Metóda", "Vráti"], [["<code>map(f)</code>", "nové pole, každý prvok premenený funkciou"], ["<code>filter(f)</code>", "nové pole len s prvkami, pre ktoré f vráti true"], ["<code>find(f)</code>", "prvý prvok, ktorý vyhovuje"], ["<code>some(f)</code> / <code>every(f)</code>", "vyhovuje aspoň jeden / všetky?"], ["<code>reduce(f, start)</code>", "jednu hodnotu (napr. súčet)"]]) +
        UKAZ("const ceny = [4, 12, 7, 20];\nconst sDPH = ceny.map(c => c * 1.2);\nconst drahe = ceny.filter(c => c > 10);\nconst sucet = ceny.reduce((s, c) => s + c, 0);\nconsole.log(sDPH);\nconsole.log(drahe);\nconsole.log(sucet);", "[4.8,14.4,8.4,24]\n[12,20]\n43"),
      podrobne: "<p>Tieto metódy pôvodné pole nemenia. Dajú sa reťaziť: <code>ceny.filter(c =&gt; c &gt; 5).map(c =&gt; c * 2)</code>. V modernom JavaScripte nahrádzajú väčšinu cyklov.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>[1, 2, 3].map(x =&gt; x * 10)</code>?", moznosti: ["[10, 20, 30]", "60", "[1, 2, 3]", "10"], spravna: 0, vysvetlenie: "map premení každý prvok." },
    { typ: "volba", otazka: "Ktorá metóda vyberie len kladné čísla?", moznosti: ["<code>filter(x =&gt; x &gt; 0)</code>", "<code>map(x =&gt; x &gt; 0)</code>", "<code>find(x =&gt; x &gt; 0)</code>", "<code>reduce(x =&gt; x &gt; 0)</code>"], spravna: 0, vysvetlenie: "map by vrátil pole true/false, find len prvý kladný." },
    { typ: "kod", zadanie: "Z poľa <code>teploty</code> vytvor pole <code>tepleDni</code> len s hodnotami <b>aspoň 20</b> (filter) a pole <code>vFahrenheit</code>, kde každú teplotu prepočítaš <code>c * 9 / 5 + 32</code> (map).",
      karty: ["js"], start: { js: "const teploty = [18, 22, 25, 15, 20];\n" }, vyska: "180px",
      napoveda: "const tepleDni = teploty.filter(t => t >= 20); const vFahrenheit = teploty.map(c => c * 9 / 5 + 32);", riesenie: { js: "const teploty = [18, 22, 25, 15, 20];\nconst tepleDni = teploty.filter(t => t >= 20);\nconst vFahrenheit = teploty.map(c => c * 9 / 5 + 32);\nconsole.log(tepleDni, vFahrenheit);" },
      kontrola: function (d) { return over(d, [["tepleDni", [22, 25, 20]], ["vFahrenheit", [64.4, 71.6, 77, 59, 68]], ["teploty", [18, 22, 25, 15, 20]]]); },
      vysvetlenie: "Pôvodné pole ostalo nezmenené." },
  ] };

  var L4 = { id: "js-5-4", nazov: "Objekty", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Hodnoty s menami",
      text: "<p><b>Objekt</b> zoskupí súvisiace údaje pod mená (kľúče). Píše sa v zložených zátvorkách:</p>" + UKAZ('const ziak = {\n  meno: "Jana",\n  vek: 15,\n  trieda: "1.A",\n};\nconsole.log(ziak.meno);\nziak.vek = 16;\nziak.mesto = "Nitra";\nconsole.log(ziak);', 'Jana\n{"meno":"Jana","vek":16,"trieda":"1.A","mesto":"Nitra"}'),
      podrobne: "<ul><li>Hodnotu čítaš cez bodku: <code>ziak.meno</code>, alebo cez hranaté zátvorky: <code>ziak[\"meno\"]</code> (hodí sa, keď je meno kľúča v premennej).</li><li>Novú vlastnosť pridáš priradením.</li><li>Hodnotou môže byť aj funkcia, potom sa volá <b>metóda</b>.</li></ul>" },
    { typ: "volba", otazka: "Ako získaš vek z objektu <code>osoba</code>?", moznosti: ["<code>osoba.vek</code>", "<code>osoba[vek]</code> bez úvodzoviek", "<code>osoba-&gt;vek</code>", "<code>vek.osoba</code>"], spravna: 0, vysvetlenie: "Bodka alebo osoba[\"vek\"]." },
    { typ: "vyklad", nadpis: "Pole objektov",
      text: "<p>Najčastejšia štruktúra údajov vôbec: zoznam vecí, kde každá má vlastnosti.</p>" + UKAZ('const produkty = [\n  { nazov: "Rožok", cena: 0.15 },\n  { nazov: "Mlieko", cena: 1.09 },\n  { nazov: "Syr", cena: 2.49 },\n];\nconst lacne = produkty.filter(p => p.cena < 2).map(p => p.nazov);\nconsole.log(lacne);', '["Rožok","Mlieko"]'),
      podrobne: "<p>Presne takto vyzerajú údaje, ktoré aplikácie dostávajú zo serverov: zoznam správ, produktov, používateľov…</p>" },
    { typ: "kod", zadanie: "Funkcia <code>najdrahsi(produkty)</code> vráti <b>názov</b> najdrahšieho produktu z poľa objektov <code>{ nazov, cena }</code>.",
      karty: ["js"], start: { js: 'function najdrahsi(produkty) {\n  \n}\n\nconsole.log(najdrahsi([\n  { nazov: "Rožok", cena: 0.15 },\n  { nazov: "Syr", cena: 2.49 },\n  { nazov: "Mlieko", cena: 1.09 },\n]));' }, vyska: "250px",
      napoveda: "let naj = produkty[0]; for (const p of produkty) { if (p.cena > naj.cena) naj = p; } return naj.nazov;", riesenie: { js: 'function najdrahsi(produkty) {\n  let naj = produkty[0];\n  for (const p of produkty) {\n    if (p.cena > naj.cena) naj = p;\n  }\n  return naj.nazov;\n}\n\nconsole.log(najdrahsi([\n  { nazov: "Rožok", cena: 0.15 },\n  { nazov: "Syr", cena: 2.49 },\n  { nazov: "Mlieko", cena: 1.09 },\n]));' },
      kontrola: function (d) { return over(d, [['najdrahsi([{nazov:"A",cena:1},{nazov:"B",cena:5},{nazov:"C",cena:3}])', "B"], ['najdrahsi([{nazov:"X",cena:9}])', "X"], ['najdrahsi([{nazov:"P",cena:7},{nazov:"Q",cena:2}])', "P"]]); },
      vysvetlenie: "Pole objektov + cyklus + podmienka = tvoj prvý „databázový“ dotaz." },
  ] };

  var L5 = { id: "js-5-5", nazov: "JSON a ukladanie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "JSON",
      text: "<p><b>JSON</b> (JavaScript Object Notation) je textový zápis objektov a polí. Je to univerzálny jazyk, ktorým si posielajú údaje servery a aplikácie po celom svete.</p>" + UKAZ('const hrac = { meno: "Jana", skore: 120 };\nconst text = JSON.stringify(hrac);\nconsole.log(text);\nconst spat = JSON.parse(text);\nconsole.log(spat.skore + 1);', '{"meno":"Jana","skore":120}\n121'),
      podrobne: "<p><code>JSON.stringify</code> premení objekt na text, <code>JSON.parse</code> text naspäť na objekt. V JSON musia byť kľúče aj texty v dvojitých úvodzovkách.</p>" },
    { typ: "vyklad", nadpis: "localStorage",
      text: "<p>Prehliadač si vie zapamätať údaje aj po zatvorení stránky. <code>localStorage</code> ukladá len text, preto sa kombinuje s JSON:</p>" + JS('const nastavenia = { tema: "tmava", zvuk: false };\nlocalStorage.setItem("nastavenia", JSON.stringify(nastavenia));\n\n// pri ďalšej návšteve:\nconst ulozene = JSON.parse(localStorage.getItem("nastavenia"));'),
      podrobne: "<p>Takto si aj táto aplikácia pamätá tvoj pokrok, XP a sériu dní. Údaje ostávajú len v tomto zariadení a prehliadači.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>JSON.stringify([1, 2])</code>?", moznosti: ["text \"[1,2]\"", "pole [1, 2]", "číslo 3", "chybu"], spravna: 0, vysvetlenie: "stringify = premeň na text (string)." },
    { typ: "volba", otazka: "Prečo sa pri localStorage používa JSON?", moznosti: ["localStorage ukladá len text", "Je to rýchlejšie", "Kvôli bezpečnosti", "Nepoužíva sa"], spravna: 0, vysvetlenie: "Objekt treba najprv previesť na text." },
    { typ: "kod", zadanie: "Text <code>data</code> obsahuje JSON so zoznamom hráčov. Preveď ho na pole cez <code>JSON.parse</code>, ulož do premennej <code>hraci</code> a vypíš súčet ich skóre.",
      karty: ["js"], start: { js: 'const data = \'[{"meno":"Jana","skore":40},{"meno":"Tomáš","skore":25},{"meno":"Eva","skore":35}]\';\n' }, vyska: "180px",
      napoveda: "const hraci = JSON.parse(data); console.log(hraci.reduce((s, h) => s + h.skore, 0));", riesenie: { js: 'const data = \'[{"meno":"Jana","skore":40},{"meno":"Tomáš","skore":25},{"meno":"Eva","skore":35}]\';\nconst hraci = JSON.parse(data);\nconsole.log(hraci.reduce((s, h) => s + h.skore, 0));' },
      kontrola: function (d) {
        if (P.js(d, "Array.isArray(hraci) && hraci.length") !== 3) return "Premenná hraci má byť pole z JSON.parse(data).";
        return P.log(d).pop() === "100" ? null : "Vypíš súčet skóre (100).";
      }, vysvetlenie: "Presne takto spracúvajú aplikácie údaje zo servera." },
    { typ: "vyklad", nadpis: "Modul 5 máš za sebou",
      text: "<ul><li>Polia, indexy, <code>length</code>, push/pop/shift, includes, join.</li><li>Prechod poľom: for...of, forEach.</li><li><code>map</code>, <code>filter</code>, <code>find</code>, <code>reduce</code>.</li><li>Objekty, pole objektov.</li><li>JSON a localStorage.</li></ul>", tip: "Teraz test. Potom posledný Modul 6: JavaScript ovláda stránku." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "js-5-1", otazka: "Aký je index prvého prvku poľa?", moznosti: ["0", "1", "-1", "závisí od poľa"], spravna: 0, vysvetlenie: "Indexy začínajú nulou." },
    { typ: "volba", lekcia: "js-5-1", otazka: "Čo spraví <code>pole.push(5)</code>?", moznosti: ["Pridá 5 na koniec", "Pridá 5 na začiatok", "Odstráni 5", "Nájde 5"], spravna: 0, vysvetlenie: "push = pridaj na koniec." },
    { typ: "volba", lekcia: "js-5-2", otazka: "Čo vypíše kód?", kod: "let s = 0;\nfor (const x of [2, 4, 6]) s += x;\nconsole.log(s);", moznosti: ["12", "6", "3", "246"], spravna: 0, vysvetlenie: "2 + 4 + 6." },
    { typ: "volba", lekcia: "js-5-3", otazka: "Čo vráti <code>[5, 8, 2].filter(x =&gt; x &gt; 4)</code>?", moznosti: ["[5, 8]", "[8]", "5", "true"], spravna: 0, vysvetlenie: "filter nechá prvky, pre ktoré platí podmienka." },
    { typ: "doplnenie", lekcia: "js-5-3", otazka: "Súčet poľa:", sablona: "const sucet = cisla.[[0]]((s, x) => s + x, [[1]]);", zetony: ["reduce", "0", "map", "1", "sum"], spravne: ["reduce", "0"], vysvetlenie: "reduce so začiatočnou hodnotou 0." },
    { typ: "volba", lekcia: "js-5-4", otazka: "Čo je <code>auto.znacka</code>?", kod: 'const auto = { znacka: "Škoda", rok: 2020 };', moznosti: ["\"Škoda\"", "2020", "undefined", "auto"], spravna: 0, vysvetlenie: "Hodnota pod kľúčom znacka." },
    { typ: "volba", lekcia: "js-5-4", otazka: "Ako pridáš objektu <code>o</code> vlastnosť farba?", moznosti: ["<code>o.farba = \"modrá\";</code>", "<code>o.push(\"farba\");</code>", "<code>add o.farba</code>", "Nedá sa"], spravna: 0, vysvetlenie: "Stačí priradiť." },
    { typ: "volba", lekcia: "js-5-5", otazka: "Čo spraví <code>JSON.parse('{\"a\":1}')</code>?", moznosti: ["Vytvorí objekt s a = 1", "Vytvorí text", "Uloží do prehliadača", "Chybu"], spravna: 0, vysvetlenie: "parse = z textu objekt." },
  ];

  K.registrujModul("js", { cislo: 5, nazov: "Polia a objekty", popis: "Zoznamy hodnôt, metódy polí map, filter a reduce, objekty, pole objektov, JSON a ukladanie v prehliadači.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
