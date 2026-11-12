/* JavaScript · Modul 2 · Podmienky */
(function () {
  var P = K.pom, JS = function (t) { return P.kod(t, "js"); }, TXT = P.TXT, MONO = P.MONO;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "js", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  /* Spustí funkciu žiaka s rôznymi vstupmi: vráti text výpisu pre každý vstup. */
  function skus(d, meno, vstupy) { return vstupy.map(function (v) { d.defaultView.__vystup = []; P.js(d, meno + "(" + JSON.stringify(v) + ")"); return d.defaultView.__vystup.join("|"); }); }

  var OBR_IF = '<svg viewBox="0 0 340 150" role="img" aria-label="Podmienka: ak je vek aspoň 18, pokračuj vľavo, inak vpravo">' +
    '<path d="M170 8l70 34-70 34-70-34z" style="fill:var(--accent-soft, var(--surface-2));stroke:var(--accent);stroke-width:2"/>' +
    '<text x="170" y="46" text-anchor="middle" font-size="12.5" font-weight="700" ' + MONO + ' style="fill:var(--text)">vek >= 18 ?</text>' +
    '<path d="M100 42H50v50M240 42h50v50" style="fill:none;stroke:var(--muted);stroke-width:2"/>' +
    '<text x="70" y="36" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--ok)">true</text><text x="252" y="36" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--bad)">false</text>' +
    '<rect x="6" y="94" width="96" height="40" rx="8" style="fill:var(--surface-2);stroke:var(--ok)"/><text x="54" y="118" text-anchor="middle" font-size="11.5" ' + TXT + ' style="fill:var(--text)">Vstup povolený</text>' +
    '<rect x="238" y="94" width="96" height="40" rx="8" style="fill:var(--surface-2);stroke:var(--bad)"/><text x="286" y="118" text-anchor="middle" font-size="11.5" ' + TXT + ' style="fill:var(--text)">Vstup zakázaný</text>' +
    '<text x="170" y="118" text-anchor="middle" font-size="11" ' + MONO + ' style="fill:var(--muted)">if … else</text></svg>';

  var L1 = { id: "js-2-1", nazov: "if a else", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Program sa rozhoduje",
      text: "<p>Doteraz program vykonal všetky riadky za sebou. S <code>if</code> (ak) vykoná časť kódu <b>len vtedy, keď platí podmienka</b>:</p>", obr: OBR_IF,
      podrobne: UKAZ('const vek = 15;\n\nif (vek >= 18) {\n  console.log("Vstup povolený");\n} else {\n  console.log("Vstup zakázaný");\n}', "Vstup zakázaný") + "<p>Podmienka je v okrúhlych zátvorkách, kód v zložených. Vetva <code>else</code> (inak) je nepovinná.</p>" },
    { typ: "vyklad", nadpis: "Porovnávacie operátory",
      text: P.tabulka(["Operátor", "Význam", "Príklad (true)"], [["<code>===</code>", "rovná sa", "<code>5 === 5</code>"], ["<code>!==</code>", "nerovná sa", "<code>5 !== 3</code>"], ["<code>&gt;</code> / <code>&lt;</code>", "väčší / menší", "<code>7 &gt; 3</code>"], ["<code>&gt;=</code> / <code>&lt;=</code>", "väčší alebo rovný / menší alebo rovný", "<code>18 &gt;= 18</code>"]]),
      podrobne: "<p><b>Pozor:</b> jedno <code>=</code> do premennej <b>ukladá</b>, <code>===</code> <b>porovnáva</b>. Existuje aj <code>==</code>, ale to pred porovnaním mení typy (<code>\"5\" == 5</code> je true), čo spôsobuje chyby. Používaj vždy <code>===</code>.</p>" },
    { typ: "volba", otazka: "Ktorý zápis porovná, či sa <code>x</code> rovná 10?", moznosti: ["<code>x === 10</code>", "<code>x = 10</code>", "<code>x =&gt; 10</code>", "<code>x := 10</code>"], spravna: 0, vysvetlenie: "=== porovnáva, = priraďuje." },
    { typ: "volba", otazka: "Čo vypíše program?", kod: 'const body = 50;\nif (body > 50) {\n  console.log("Výhra");\n} else {\n  console.log("Prehra");\n}', moznosti: ["Prehra", "Výhra", "Nič", "Výhra Prehra"], spravna: 0, vysvetlenie: "50 nie je väčšie ako 50. Na to by bolo treba >=." },
    { typ: "poradie", otazka: "Zoraď podmienku:", riadky: ["if (teplota < 0) {", '  console.log("Mrzne");', "} else {", '  console.log("Nemrzne");', "}"], vysvetlenie: "if, kód, } else {, kód, }" },
    { typ: "kod", zadanie: "Napíš funkciu, ktorá pre premennú <code>teplota</code> vypíše <b>Mrzne</b>, ak je teplota menšia ako 0, inak <b>Nemrzne</b>. Kód píš dovnútra pripravenej funkcie.",
      karty: ["js"], start: { js: "function pocasie(teplota) {\n  \n}\n\npocasie(-3);" }, vyska: "190px",
      napoveda: 'if (teplota < 0) { console.log("Mrzne"); } else { console.log("Nemrzne"); }', riesenie: { js: 'function pocasie(teplota) {\n  if (teplota < 0) {\n    console.log("Mrzne");\n  } else {\n    console.log("Nemrzne");\n  }\n}\n\npocasie(-3);' },
      kontrola: function (d) {
        var r = skus(d, "pocasie", [-3, 0, 12]);
        if (r[0] !== "Mrzne") return "Pre -3 má vypísať Mrzne (teraz: " + (r[0] || "nič") + ").";
        if (r[1] !== "Nemrzne") return "Pre 0 má vypísať Nemrzne: 0 nie je menšie ako 0.";
        return r[2] === "Nemrzne" ? null : "Pre 12 má vypísať Nemrzne.";
      }, vysvetlenie: "Kontrola vyskúšala tvoju podmienku pre -3, 0 aj 12." },
  ] };

  var L2 = { id: "js-2-2", nazov: "Viac možností: else if", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Reťaz podmienok",
      text: "<p>Keď je možností viac, pridáš <code>else if</code>. JavaScript ide zhora a vykoná <b>prvú</b> vetvu, ktorej podmienka platí:</p>" + UKAZ('const body = 78;\n\nif (body >= 90) {\n  console.log("Výborný");\n} else if (body >= 75) {\n  console.log("Chválitebný");\n} else if (body >= 50) {\n  console.log("Dobrý");\n} else {\n  console.log("Neprospel");\n}', "Chválitebný"),
      podrobne: "<p>78 platí aj pre <code>&gt;= 50</code>, ale tam sa program už nedostane: zastavil sa pri prvej pravdivej vetve. Preto záleží na poradí. Začni najprísnejšou podmienkou.</p>" },
    { typ: "volba", otazka: "Čo vypíše program pre <code>body = 95</code>, ak by podmienky boli v poradí >= 50, >= 75, >= 90?", moznosti: ["Dobrý", "Výborný", "Chválitebný", "Všetky tri"], spravna: 0, vysvetlenie: "95 >= 50 platí hneď ako prvé, ďalej sa nepozerá. Poradie je dôležité." },
    { typ: "vyklad", nadpis: "Ternárny operátor",
      text: "<p>Krátka podmienka, ktorá vráti jednu z dvoch hodnôt:</p>" + JS('const vek = 20;\nconst text = vek >= 18 ? "dospelý" : "dieťa";'),
      podrobne: "<p>Čítaj: <i>podmienka ? hodnota ak áno : hodnota ak nie</i>. Hodí sa na krátke veci. Na zložitejšie rozhodovanie použi if, je čitateľnejší.</p>" },
    { typ: "doplnenie", otazka: "Doplň ternárny operátor:", sablona: 'const stav = hotovo [[0]] "Hotovo" [[1]] "Pracujem";', zetony: ["?", ":", "!", ";", "else"], spravne: ["?", ":"], vysvetlenie: "podmienka ? áno : nie" },
    { typ: "kod", zadanie: "Doplň funkciu <code>znamka(body)</code>: 90 a viac → <b>1</b>, 75 a viac → <b>2</b>, 50 a viac → <b>3</b>, inak <b>5</b>. Výsledok vypíš cez <code>console.log</code>.",
      karty: ["js"], start: { js: "function znamka(body) {\n  \n}\n\nznamka(80);" }, vyska: "250px",
      napoveda: "if (body >= 90) { console.log(1); } else if (body >= 75) { … } else if (body >= 50) { … } else { console.log(5); }", riesenie: { js: "function znamka(body) {\n  if (body >= 90) {\n    console.log(1);\n  } else if (body >= 75) {\n    console.log(2);\n  } else if (body >= 50) {\n    console.log(3);\n  } else {\n    console.log(5);\n  }\n}\n\nznamka(80);" },
      kontrola: function (d) {
        var vst = [95, 90, 80, 75, 60, 50, 20], ocak = ["1", "1", "2", "2", "3", "3", "5"], r = skus(d, "znamka", vst);
        for (var i = 0; i < vst.length; i++) if (r[i] !== ocak[i]) return "Pre " + vst[i] + " bodov má vyjsť " + ocak[i] + ", vyšlo: " + (r[i] || "nič") + ".";
        return null;
      }, vysvetlenie: "Kontrola vyskúšala 7 rôznych počtov bodov vrátane hraníc." },
  ] };

  var L3 = { id: "js-2-3", nazov: "Logické operátory", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "A, ALEBO, NIE",
      text: P.tabulka(["Operátor", "Význam", "true, keď…"], [["<code>&amp;&amp;</code>", "a zároveň", "platia obe strany"], ["<code>||</code>", "alebo", "platí aspoň jedna"], ["<code>!</code>", "nie", "otočí true ↔ false"]]) + JS('if (vek >= 15 && maPreukaz) {\n  console.log("Môžeš ísť na film");\n}\nif (den === "sobota" || den === "nedeľa") {\n  console.log("Víkend!");\n}\nif (!prihlaseny) {\n  console.log("Prihlás sa");\n}'),
      podrobne: "<p><code>||</code> sa píše dvoma zvislými čiarami (na slovenskej klávesnici pravý Alt + W). V tejto aplikácii ho nájdeš na lište so znakmi.</p>" },
    { typ: "volba", otazka: "Kedy je <code>a &amp;&amp; b</code> true?", moznosti: ["Keď sú a aj b true", "Keď je aspoň jedno true", "Keď sú obe false", "Vždy"], spravna: 0, vysvetlenie: "&& = a zároveň." },
    { typ: "volba", otazka: "Čo vráti <code>!(5 &gt; 3)</code>?", moznosti: ["false", "true", "5", "chybu"], spravna: 0, vysvetlenie: "5 > 3 je true, ! to otočí na false." },
    { typ: "vyklad", nadpis: "Pravdivé a nepravdivé hodnoty",
      text: "<p>V podmienke nemusí byť len true/false. Tieto hodnoty sa správajú ako <b>false</b>: <code>0</code>, <code>\"\"</code> (prázdny text), <code>null</code>, <code>undefined</code>, <code>NaN</code>. Všetko ostatné ako true.</p>" + JS('const meno = "";\nif (!meno) {\n  console.log("Zadaj meno");\n}'),
      podrobne: "<p>Takto sa často kontroluje, či používateľ niečo vyplnil.</p>" },
    { typ: "kod", zadanie: "Funkcia <code>vstupenka(vek, student)</code> vypíše <b>Zľava</b>, ak je vek menší ako 15 <b>alebo</b> je študent (<code>student</code> je true). Inak vypíše <b>Plná cena</b>.",
      karty: ["js"], start: { js: "function vstupenka(vek, student) {\n  \n}\n\nvstupenka(20, true);" }, vyska: "210px",
      napoveda: 'if (vek < 15 || student) { console.log("Zľava"); } else { console.log("Plná cena"); }', riesenie: { js: 'function vstupenka(vek, student) {\n  if (vek < 15 || student) {\n    console.log("Zľava");\n  } else {\n    console.log("Plná cena");\n  }\n}\n\nvstupenka(20, true);' },
      kontrola: function (d) {
        var w = d.defaultView, testy = [[10, false, "Zľava"], [20, true, "Zľava"], [20, false, "Plná cena"], [15, false, "Plná cena"]];
        for (var i = 0; i < testy.length; i++) { w.__vystup = []; P.js(d, "vstupenka(" + testy[i][0] + "," + testy[i][1] + ")"); var v = w.__vystup.join("|"); if (v !== testy[i][2]) return "Pre vek " + testy[i][0] + " a student " + testy[i][1] + " má vyjsť " + testy[i][2] + ", vyšlo: " + (v || "nič") + "."; }
        return null;
      }, vysvetlenie: "|| stačí, aby platila jedna z podmienok." },
  ] };

  var L4 = { id: "js-2-4", nazov: "switch", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Veľa presných hodnôt",
      text: "<p>Keď porovnávaš jednu premennú s mnohými konkrétnymi hodnotami, je prehľadnejší <code>switch</code>:</p>" + UKAZ('const den = "utorok";\n\nswitch (den) {\n  case "pondelok":\n    console.log("Matematika");\n    break;\n  case "utorok":\n    console.log("Telesná");\n    break;\n  default:\n    console.log("Voľno");\n}', "Telesná"),
      podrobne: "<ul><li><code>case</code> = jedna možnosť (porovnáva sa ako ===).</li><li><code>break</code> ukončí switch. Bez neho by program pokračoval do ďalšieho case.</li><li><code>default</code> sa vykoná, keď nesedí žiadny case (ako else).</li></ul>" },
    { typ: "volba", otazka: "Čo sa stane, keď zabudneš <code>break</code>?", moznosti: ["Vykonajú sa aj nasledujúce case", "Chyba", "Nič sa nevykoná", "Vykoná sa len default"], spravna: 0, vysvetlenie: "Program „prepadne“ do ďalších vetiev." },
    { typ: "doplnenie", otazka: "Doplň switch:", sablona: 'switch (farba) {\n  [[0]] "red":\n    console.log("červená");\n    [[1]];\n  [[2]]:\n    console.log("iná");\n}', zetony: ["case", "break", "default", "else", "if", "stop"], spravne: ["case", "break", "default"], vysvetlenie: "case, break, default." },
    { typ: "kod", zadanie: "Doplň <code>switch</code> vo funkcii <code>zviera(meno)</code>: \"pes\" → <b>haf</b>, \"macka\" → <b>mňau</b>, \"krava\" → <b>bú</b>, inak <b>?</b>. Nezabudni na break.",
      karty: ["js"], start: { js: "function zviera(meno) {\n  switch (meno) {\n    \n  }\n}\n\nzviera(\"pes\");" }, vyska: "260px",
      napoveda: 'case "pes": console.log("haf"); break; … default: console.log("?");', riesenie: { js: 'function zviera(meno) {\n  switch (meno) {\n    case "pes":\n      console.log("haf");\n      break;\n    case "macka":\n      console.log("mňau");\n      break;\n    case "krava":\n      console.log("bú");\n      break;\n    default:\n      console.log("?");\n  }\n}\n\nzviera("pes");' },
      kontrola: function (d) {
        var vst = ["pes", "macka", "krava", "slon"], oc = ["haf", "mňau", "bú", "?"], r = skus(d, "zviera", vst);
        for (var i = 0; i < 4; i++) if (r[i] !== oc[i]) return "Pre \"" + vst[i] + "\" má vyjsť " + oc[i] + ", vyšlo: " + (r[i] || "nič").replace(/\|/g, ", ") + (r[i] && r[i].indexOf("|") >= 0 ? " (chýba break?)" : "") + ".";
        return null;
      }, vysvetlenie: "Každé zviera vypísalo práve jeden zvuk." },
  ] };

  var L5 = { id: "js-2-5", nazov: "Podmienky v praxi", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Overenie vstupu",
      text: "<p>Najčastejšie sa podmienky používajú na kontrolu údajov od používateľa:</p>" + JS('function skontrolujHeslo(heslo) {\n  if (heslo.length < 8) {\n    return "Heslo je príliš krátke";\n  }\n  if (!/[0-9]/.test(heslo)) {\n    return "Heslo potrebuje číslicu";\n  }\n  return "OK";\n}'),
      podrobne: "<p>Takýto štýl sa volá <b>skorý návrat</b>: chybu ohlásiš hneď a koniec funkcie platí len pre správny vstup. Je prehľadnejší ako hlboko vnorené if. Viac o <code>return</code> v module Funkcie.</p>" },
    { typ: "volba", otazka: "Prečo je dôležité overovať vstup aj na serveri, nie len v JavaScripte v prehliadači?", moznosti: ["JavaScript v prehliadači sa dá obísť", "Server je rýchlejší", "JavaScript nevie porovnávať", "Nie je to dôležité"], spravna: 0, vysvetlenie: "Kód v prehliadači môže používateľ zmeniť. Bezpečnosť je na serveri." },
    { typ: "volba", otazka: "Čo vypíše kód?", kod: 'const x = 0;\nif (x) {\n  console.log("áno");\n} else {\n  console.log("nie");\n}', moznosti: ["nie", "áno", "0", "chybu"], spravna: 0, vysvetlenie: "0 sa v podmienke správa ako false." },
    { typ: "kod", zadanie: "Funkcia <code>prestupny(rok)</code> vypíše <b>áno</b> pre priestupný rok, inak <b>nie</b>. Pravidlo: rok deliteľný 4 a zároveň nedeliteľný 100, <b>alebo</b> deliteľný 400.",
      karty: ["js"], start: { js: "function prestupny(rok) {\n  \n}\n\nprestupny(2024);" }, vyska: "200px",
      napoveda: "(rok % 4 === 0 && rok % 100 !== 0) || rok % 400 === 0", riesenie: { js: 'function prestupny(rok) {\n  if ((rok % 4 === 0 && rok % 100 !== 0) || rok % 400 === 0) {\n    console.log("áno");\n  } else {\n    console.log("nie");\n  }\n}\n\nprestupny(2024);' },
      kontrola: function (d) {
        var vst = [2024, 2023, 1900, 2000, 2100], oc = ["áno", "nie", "nie", "áno", "nie"], r = skus(d, "prestupny", vst);
        for (var i = 0; i < vst.length; i++) if (r[i] !== oc[i]) return "Rok " + vst[i] + " má vyjsť " + oc[i] + ", vyšlo: " + (r[i] || "nič") + ".";
        return null;
      }, vysvetlenie: "Aj roky 1900 a 2000 sedia. Na tom padá veľa programov." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li><code>if</code>, <code>else if</code>, <code>else</code>.</li><li>Porovnania <code>===</code>, <code>!==</code>, <code>&lt;</code>, <code>&gt;=</code>…</li><li>Logika <code>&amp;&amp;</code>, <code>||</code>, <code>!</code>.</li><li>Ternárny operátor a <code>switch</code>.</li><li>Pravdivé a nepravdivé hodnoty.</li></ul>", tip: "Teraz test. Potom Modul 3: cykly, opakovanie bez opakovania kódu." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "js-2-1", otazka: "Čo je zle?", kod: "if (x = 5) {\n  …\n}", moznosti: ["= priraďuje, na porovnanie treba ===", "Chýba else", "Zátvorky majú byť hranaté", "Nič"], spravna: 0, vysvetlenie: "Častá chyba: v podmienke má byť ===." },
    { typ: "volba", lekcia: "js-2-1", otazka: "Čo vráti <code>\"5\" === 5</code>?", moznosti: ["false", "true", "chybu", "5"], spravna: 0, vysvetlenie: "=== porovnáva aj typ: text nie je číslo." },
    { typ: "volba", lekcia: "js-2-2", otazka: "Koľko vetiev sa vykoná v reťazi if / else if / else?", moznosti: ["Najviac jedna", "Všetky pravdivé", "Vždy dve", "Žiadna"], spravna: 0, vysvetlenie: "Prvá pravdivá a koniec." },
    { typ: "volba", lekcia: "js-2-2", otazka: "Čo bude v premennej <code>t</code>?", kod: 'const n = 7;\nconst t = n % 2 === 0 ? "párne" : "nepárne";', moznosti: ["\"nepárne\"", "\"párne\"", "7", "true"], spravna: 0, vysvetlenie: "7 % 2 je 1, podmienka neplatí." },
    { typ: "volba", lekcia: "js-2-3", otazka: "Kedy je <code>a || b</code> false?", moznosti: ["Keď sú obe false", "Keď je jedno false", "Nikdy", "Keď sú obe true"], spravna: 0, vysvetlenie: "|| potrebuje aspoň jednu pravdu." },
    { typ: "doplnenie", lekcia: "js-2-3", otazka: "Víkend:", sablona: 'if (den === "sobota" [[0]] den === "nedeľa")', zetony: ["||", "&&", "!", "or"], spravne: ["||"], vysvetlenie: "Sobota ALEBO nedeľa." },
    { typ: "volba", lekcia: "js-2-3", otazka: "Ktorá hodnota sa v podmienke správa ako true?", moznosti: ["<code>\"0\"</code>", "<code>0</code>", "<code>\"\"</code>", "<code>null</code>"], spravna: 0, vysvetlenie: "\"0\" je neprázdny text, teda pravdivý." },
    { typ: "volba", lekcia: "js-2-4", otazka: "Ktorá časť switch sa vykoná, keď nesedí žiadny case?", moznosti: ["<code>default</code>", "<code>else</code>", "prvý case", "žiadna, je to chyba"], spravna: 0, vysvetlenie: "default je ako else." },
    { typ: "volba", lekcia: "js-2-5", otazka: "Čo vypíše <code>console.log(10 &gt; 5 &amp;&amp; 2 &gt; 3);</code>?", moznosti: ["false", "true", "10", "chybu"], spravna: 0, vysvetlenie: "Druhá podmienka neplatí, && vyžaduje obe." },
  ];

  K.registrujModul("js", { cislo: 2, nazov: "Podmienky", popis: "Rozhodovanie programu: if, else if, porovnania, logické operátory, ternárny operátor a switch.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
