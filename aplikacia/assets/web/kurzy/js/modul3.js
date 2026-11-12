/* JavaScript · Modul 3 · Cykly */
(function () {
  var P = K.pom, JS = function (t) { return P.kod(t, "js"); }, TXT = P.TXT, MONO = P.MONO;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "js", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function skus(d, volanie) { d.defaultView.__vystup = []; var v = P.js(d, volanie); return { log: d.defaultView.__vystup.slice(), navrat: v }; }

  var OBR_FOR = '<svg viewBox="0 0 340 120" role="img" aria-label="Cyklus for má tri časti: začiatok, podmienku a krok">' +
    '<rect x="4" y="22" width="332" height="40" rx="10" style="fill:var(--code-bg)"/>' +
    '<text x="170" y="48" text-anchor="middle" font-size="13" ' + MONO + '><tspan style="fill:var(--hl-kw)">for</tspan><tspan style="fill:var(--code-text)"> (</tspan><tspan style="fill:#7fd1ff">let i = 1</tspan><tspan style="fill:var(--code-text)">; </tspan><tspan style="fill:#ffb86b">i &lt;= 5</tspan><tspan style="fill:var(--code-text)">; </tspan><tspan style="fill:#b6f29b">i++</tspan><tspan style="fill:var(--code-text)">)</tspan></text>' +
    [[110, "#7fd1ff", "začiatok", "raz na začiatku"], [184, "#ffb86b", "podmienka", "kým platí, opakuj"], [246, "#b6f29b", "krok", "po každom kole"]].map(function (x) {
      return '<path d="M' + x[0] + ' 66v10" style="stroke:' + x[1] + ';stroke-width:2"/><text x="' + x[0] + '" y="92" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">' + x[2] + '</text><text x="' + x[0] + '" y="106" text-anchor="middle" font-size="9.5" ' + TXT + ' style="fill:var(--muted)">' + x[3] + "</text>";
    }).join("") + "</svg>";

  var L1 = { id: "js-3-1", nazov: "Cyklus for", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Opakovanie bez kopírovania",
      text: "<p>Vypísať čísla 1 až 100 sto riadkami <code>console.log</code>? Na to sú <b>cykly</b>: kus kódu sa zopakuje toľkokrát, koľko treba.</p>", obr: OBR_FOR,
      podrobne: UKAZ("for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}", "1\n2\n3\n4\n5") + "<p>Premenná <code>i</code> (index) sa v každom kole zvýši o 1. Keď podmienka prestane platiť (i je 6), cyklus skončí.</p>" },
    { typ: "volba", otazka: "Koľkokrát sa vykoná telo cyklu <code>for (let i = 0; i &lt; 3; i++)</code>?", moznosti: ["3-krát (i = 0, 1, 2)", "4-krát", "2-krát", "Nekonečne"], spravna: 0, vysvetlenie: "Od 0, kým je menšie ako 3." },
    { typ: "vyklad", nadpis: "Krok nemusí byť 1",
      text: UKAZ("for (let i = 10; i >= 0; i -= 2) {\n  console.log(i);\n}", "10\n8\n6\n4\n2\n0"),
      podrobne: "<p>Cyklus môže ísť aj odzadu a s ľubovoľným krokom. Dôležité: podmienka musí raz prestať platiť. Inak vznikne <b>nekonečný cyklus</b> a stránka zamrzne.</p>" },
    { typ: "volba", otazka: "Prečo je toto nekonečný cyklus?", kod: "for (let i = 1; i > 0; i++) {\n  …\n}", moznosti: ["i stále rastie, takže i > 0 platí vždy", "Chýba break", "i začína na 1", "Nie je nekonečný"], spravna: 0, vysvetlenie: "Podmienka nikdy neprestane platiť." },
    { typ: "kod", zadanie: "Vypíš cyklom <code>for</code> malú násobilku čísla 3: <b>3, 6, 9 … 30</b>, každé číslo na samostatnom riadku.",
      karty: ["js"], start: { js: "" }, vyska: "150px",
      napoveda: "for (let i = 1; i <= 10; i++) { console.log(i * 3); }", riesenie: { js: "for (let i = 1; i <= 10; i++) {\n  console.log(i * 3);\n}" },
      kontrola: function (d, s) {
        if (!/for\s*\(/.test(s.js)) return "Použi cyklus for.";
        var l = P.log(d), oc = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30].join(",");
        return l.join(",") === oc ? null : "Výpis má byť 3, 6, 9 … 30 (10 riadkov). Teraz: " + (l.join(", ") || "nič");
      }, vysvetlenie: "Jeden cyklus namiesto desiatich riadkov." },
  ] };

  var L2 = { id: "js-3-2", nazov: "Cyklus while", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Opakuj, kým platí",
      text: "<p><code>while</code> opakuje, kým platí podmienka. Hodí sa, keď <b>vopred nevieš</b>, koľko kôl bude:</p>" + UKAZ("let peniaze = 100;\nlet tyzdne = 0;\nwhile (peniaze > 0) {\n  peniaze -= 30;\n  tyzdne++;\n}\nconsole.log(`Vydržia ${tyzdne} týždne`);", "Vydržia 4 týždne"),
      podrobne: "<p>Pravidlo: <code>for</code> keď vieš počet opakovaní (prejdi 10 položiek), <code>while</code> keď čakáš na stav (kým hráč nemá 0 životov).</p>" },
    { typ: "volba", otazka: "Kedy je vhodnejší <code>while</code> ako <code>for</code>?", moznosti: ["Keď vopred nevieš počet opakovaní", "Vždy", "Keď počítaš od 1 do 10", "Nikdy"], spravna: 0, vysvetlenie: "while = kým platí podmienka." },
    { typ: "vyklad", nadpis: "break a continue",
      text: P.tabulka(["Príkaz", "Čo urobí"], [["<code>break</code>", "okamžite ukončí celý cyklus"], ["<code>continue</code>", "preskočí zvyšok tohto kola a ide na ďalšie"]]) + UKAZ("for (let i = 1; i <= 10; i++) {\n  if (i % 2 === 0) continue;\n  if (i > 7) break;\n  console.log(i);\n}", "1\n3\n5\n7"),
      podrobne: "<p>Párne čísla preskočil <code>continue</code>, pri 9 cyklus ukončil <code>break</code>.</p>" },
    { typ: "volba", otazka: "Čo spraví <code>break</code> v cykle?", moznosti: ["Ukončí celý cyklus", "Preskočí jedno kolo", "Zastaví celý program", "Reštartuje cyklus"], spravna: 0, vysvetlenie: "Na preskočenie kola je continue." },
    { typ: "kod", zadanie: "Hľadaj prvé číslo väčšie ako 1, ktoré je deliteľné 7 aj 5. Začni od <code>n = 1</code>, v cykle <code>while</code> zvyšuj n, a keď ho nájdeš, vypíš ho a cyklus ukonči (<code>break</code>).",
      karty: ["js"], start: { js: "let n = 1;\n" }, vyska: "190px",
      napoveda: "while (true) { n++; if (n % 7 === 0 && n % 5 === 0) { console.log(n); break; } }", riesenie: { js: "let n = 1;\nwhile (true) {\n  n++;\n  if (n % 7 === 0 && n % 5 === 0) {\n    console.log(n);\n    break;\n  }\n}" },
      kontrola: function (d, s) {
        if (!/while\s*\(/.test(s.js)) return "Použi cyklus while.";
        return P.log(d).join(",") === "35" ? null : "Má sa vypísať jediné číslo: 35. Teraz: " + (P.log(d).join(", ") || "nič");
      }, vysvetlenie: "while (true) s break je bežný vzor, keď hľadáš prvý výskyt." },
  ] };

  var L3 = { id: "js-3-3", nazov: "Sčítavanie v cykle", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Akumulátor",
      text: "<p>Veľmi častý vzor: premenná pred cyklom, ktorá v každom kole <b>niečo pripočíta</b>:</p>" + UKAZ("let sucet = 0;\nfor (let i = 1; i <= 100; i++) {\n  sucet += i;\n}\nconsole.log(sucet);", "5050"),
      podrobne: "<p>Takto sa počíta súčet, priemer, počet výskytov, najväčšia hodnota… Premenná <b>musí byť vytvorená pred cyklom</b>, inak by sa v každom kole nastavila znova na 0.</p>",
      hlbka: "<p>Legenda hovorí, že malý Carl Friedrich Gauss mal v škole sčítať čísla 1 až 100 a hneď povedal 5050: spojil 1 + 100, 2 + 99… = 50 dvojíc po 101. Počítač to zvládne „hrubou silou“ za mikrosekundu.</p>" },
    { typ: "volba", otazka: "Prečo je <code>let sucet = 0;</code> pred cyklom a nie v ňom?", moznosti: ["Inak by sa v každom kole vynulovala", "Je to len zvyk", "V cykle sa nedá vytvoriť premenná", "Kvôli rýchlosti"], spravna: 0, vysvetlenie: "Akumulátor musí prežiť všetky kolá." },
    { typ: "vyklad", nadpis: "Počítanie podľa podmienky",
      text: UKAZ("let parnych = 0;\nfor (let i = 1; i <= 20; i++) {\n  if (i % 2 === 0) {\n    parnych++;\n  }\n}\nconsole.log(parnych);", "10"),
      podrobne: "<p>Cyklus + podmienka = základ väčšiny programov: prejdi všetko a urob niečo len s tým, čo spĺňa podmienku.</p>" },
    { typ: "kod", zadanie: "Doplň funkciu <code>sucetDo(n)</code>, ktorá sčíta čísla od 1 po <code>n</code> a výsledok vráti cez <code>return</code>.",
      karty: ["js"], start: { js: "function sucetDo(n) {\n  let sucet = 0;\n  \n  return sucet;\n}\n\nconsole.log(sucetDo(10));" }, vyska: "220px",
      napoveda: "for (let i = 1; i <= n; i++) { sucet += i; }", riesenie: { js: "function sucetDo(n) {\n  let sucet = 0;\n  for (let i = 1; i <= n; i++) {\n    sucet += i;\n  }\n  return sucet;\n}\n\nconsole.log(sucetDo(10));" },
      kontrola: function (d) {
        var t = [[10, 55], [1, 1], [100, 5050], [0, 0]];
        for (var i = 0; i < t.length; i++) { var v = P.js(d, "sucetDo(" + t[i][0] + ")"); if (v !== t[i][1]) return "sucetDo(" + t[i][0] + ") má vrátiť " + t[i][1] + ", vrátilo: " + v + "."; }
        return null;
      }, vysvetlenie: "Kontrola vyskúšala n = 10, 1, 100 aj 0." },
  ] };

  var L4 = { id: "js-3-4", nazov: "Cykly a text", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Prechod znakmi textu",
      text: "<p>Text sa dá prejsť znak po znaku. Index ide od 0 po <code>length - 1</code>:</p>" + UKAZ('const slovo = "Ahoj";\nfor (let i = 0; i < slovo.length; i++) {\n  console.log(i, slovo[i]);\n}', "0 A\n1 h\n2 o\n3 j"),
      podrobne: "<p>Moderný a kratší zápis je <code>for...of</code>, keď index nepotrebuješ:</p>" + JS('for (const znak of "Ahoj") {\n  console.log(znak);\n}') },
    { typ: "volba", otazka: "Aký je posledný platný index v texte <code>\"Ahoj\"</code>?", moznosti: ["3", "4", "0", "5"], spravna: 0, vysvetlenie: "Dĺžka 4, indexy 0 až 3." },
    { typ: "vyklad", nadpis: "Skladanie textu",
      text: UKAZ('let riadok = "";\nfor (let i = 0; i < 5; i++) {\n  riadok += "★";\n}\nconsole.log(riadok);', "★★★★★"),
      podrobne: "<p>Akumulátor funguje aj s textom: začneš prázdnym <code>\"\"</code> a pridávaš. Kratšie: <code>\"★\".repeat(5)</code>.</p>" },
    { typ: "kod", zadanie: "Funkcia <code>pocetSamohlasok(text)</code> vráti, koľko je v texte samohlások <b>a, e, i, o, u, y</b> (stačia malé, text najprv zmeň cez <code>toLowerCase()</code>).",
      karty: ["js"], start: { js: 'function pocetSamohlasok(text) {\n  const samohlasky = "aeiouy";\n  let pocet = 0;\n  \n  return pocet;\n}\n\nconsole.log(pocetSamohlasok("Programovanie"));' }, vyska: "240px",
      napoveda: "for (const z of text.toLowerCase()) { if (samohlasky.includes(z)) pocet++; }", riesenie: { js: 'function pocetSamohlasok(text) {\n  const samohlasky = "aeiouy";\n  let pocet = 0;\n  for (const z of text.toLowerCase()) {\n    if (samohlasky.includes(z)) pocet++;\n  }\n  return pocet;\n}\n\nconsole.log(pocetSamohlasok("Programovanie"));' },
      kontrola: function (d) {
        var t = [["Programovanie", 6], ["AHOJ", 2], ["xyz", 1], ["", 0]];
        for (var i = 0; i < t.length; i++) { var v = P.js(d, "pocetSamohlasok(" + JSON.stringify(t[i][0]) + ")"); if (v !== t[i][1]) return "pocetSamohlasok(\"" + t[i][0] + "\") má vrátiť " + t[i][1] + ", vrátilo: " + v + "."; }
        return null;
      }, vysvetlenie: "includes() zistí, či je znak medzi samohláskami." },
  ] };

  var L5 = { id: "js-3-5", nazov: "Vnorené cykly", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Cyklus v cykle",
      text: "<p>Na tabuľky, mriežky a dvojice potrebuješ cyklus vnútri cyklu. Vnútorný sa vykoná celý pri <b>každom</b> kole vonkajšieho:</p>" + UKAZ('for (let r = 1; r <= 3; r++) {\n  let riadok = "";\n  for (let s = 1; s <= 3; s++) {\n    riadok += r * s + "\\t";\n  }\n  console.log(riadok);\n}', "1\t2\t3\n2\t4\t6\n3\t6\t9"),
      podrobne: "<p><code>\\t</code> je tabulátor. 3 kolá vonkajšieho × 3 kolá vnútorného = 9 výpočtov. Pri 1000 × 1000 je to už milión. Vnorené cykly vedia byť pomalé.</p>" },
    { typ: "volba", otazka: "Koľkokrát sa vykoná vnútro?", kod: "for (let a = 0; a < 4; a++) {\n  for (let b = 0; b < 5; b++) {\n    // tu\n  }\n}", moznosti: ["20", "9", "5", "4"], spravna: 0, vysvetlenie: "4 × 5 = 20." },
    { typ: "kod", zadanie: "Nakresli schody z hviezdičiek: 4 riadky, v prvom 1 hviezdička, v druhom 2, …, v štvrtom 4 (<code>*</code>, <code>**</code>, <code>***</code>, <code>****</code>).",
      karty: ["js"], start: { js: "" }, vyska: "190px",
      napoveda: 'for (let r = 1; r <= 4; r++) { let t = ""; for (let s = 1; s <= r; s++) { t += "*"; } console.log(t); }', riesenie: { js: 'for (let r = 1; r <= 4; r++) {\n  let t = "";\n  for (let s = 1; s <= r; s++) {\n    t += "*";\n  }\n  console.log(t);\n}' },
      kontrola: function (d) { return P.log(d).join("|") === "*|**|***|****" ? null : "Majú byť 4 riadky: *, **, ***, ****. Teraz: " + (P.log(d).join(" | ") || "nič"); },
      vysvetlenie: "Vnútorný cyklus beží toľkokrát, koľké je kolo vonkajšieho." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li><code>for</code> so začiatkom, podmienkou a krokom.</li><li><code>while</code>, <code>break</code>, <code>continue</code>.</li><li>Akumulátor: súčet, počet, skladanie textu.</li><li><code>for...of</code> cez znaky textu.</li><li>Vnorené cykly.</li></ul>", tip: "Teraz test. Potom Modul 4: funkcie." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "js-3-1", otazka: "Čo vypíše cyklus?", kod: "for (let i = 2; i < 8; i += 2) {\n  console.log(i);\n}", moznosti: ["2, 4, 6", "2, 4, 6, 8", "2, 3, 4, 5, 6, 7", "8"], spravna: 0, vysvetlenie: "8 už nie je menšie ako 8." },
    { typ: "poradie", lekcia: "js-3-1", otazka: "Zoraď časti cyklu for:", riadky: ["for (", "let i = 0;", "i < 10;", "i++", ") { … }"], vysvetlenie: "začiatok; podmienka; krok" },
    { typ: "volba", lekcia: "js-3-2", otazka: "Čo preskočí zvyšok aktuálneho kola?", moznosti: ["<code>continue</code>", "<code>break</code>", "<code>return</code>", "<code>skip</code>"], spravna: 0, vysvetlenie: "continue = pokračuj ďalším kolom." },
    { typ: "volba", lekcia: "js-3-2", otazka: "Koľkokrát sa vykoná telo?", kod: "let x = 10;\nwhile (x > 10) {\n  x--;\n}", moznosti: ["0-krát", "10-krát", "1-krát", "nekonečne"], spravna: 0, vysvetlenie: "10 > 10 neplatí hneď na začiatku." },
    { typ: "volba", lekcia: "js-3-3", otazka: "Aká bude hodnota <code>s</code>?", kod: "let s = 0;\nfor (let i = 1; i <= 4; i++) {\n  s += i;\n}", moznosti: ["10", "4", "5", "0"], spravna: 0, vysvetlenie: "1 + 2 + 3 + 4 = 10." },
    { typ: "doplnenie", lekcia: "js-3-4", otazka: "Prejdi všetky znaky textu:", sablona: 'for (const z [[0]] "Ahoj") {\n  console.log(z);\n}', zetony: ["of", "in", "from", "="], spravne: ["of"], vysvetlenie: "for...of prejde hodnoty." },
    { typ: "volba", lekcia: "js-3-4", otazka: "Čo je <code>\"Pes\"[0]</code>?", moznosti: ["\"P\"", "\"e\"", "\"Pes\"", "undefined"], spravna: 0, vysvetlenie: "Index 0 = prvý znak." },
    { typ: "volba", lekcia: "js-3-5", otazka: "Vnútorný cyklus beží 10-krát, vonkajší 10-krát. Koľko je spolu kôl vnútra?", moznosti: ["100", "20", "10", "1000"], spravna: 0, vysvetlenie: "10 × 10." },
  ];

  K.registrujModul("js", { cislo: 3, nazov: "Cykly", popis: "Opakovanie s for a while, break a continue, sčítavanie v cykle, prechod textom a vnorené cykly.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
