/* C++ · Modul 1 · Prvý program */
(function () {
  var P = K.pom, CPP = function (t) { return P.kod(t, "cpp"); }, TXT = P.TXT, MONO = P.MONO;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "cpp", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  var KOSTRA = "#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}";

  var OBR_PREKLAD = '<svg viewBox="0 0 340 110" role="img" aria-label="Zdrojový kód v C++ prekladač preloží na strojový kód, ktorý počítač spustí">' +
    '<rect x="6" y="24" width="90" height="56" rx="8" style="fill:var(--code-bg)"/><text x="51" y="48" text-anchor="middle" font-size="10" ' + MONO + ' style="fill:var(--hl-kw)">int main()</text><text x="51" y="64" text-anchor="middle" font-size="10" ' + MONO + ' style="fill:var(--code-text)">cout &lt;&lt; …</text>' +
    '<path d="M100 52h30" style="stroke:var(--muted);stroke-width:2"/><path d="M126 46l8 6-8 6" style="fill:var(--muted)"/>' +
    '<rect x="138" y="30" width="72" height="44" rx="22" style="fill:#c0365b"/><text x="174" y="56" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' fill="#fff">prekladač</text>' +
    '<path d="M214 52h30" style="stroke:var(--muted);stroke-width:2"/><path d="M240 46l8 6-8 6" style="fill:var(--muted)"/>' +
    '<rect x="252" y="24" width="82" height="56" rx="8" style="fill:var(--surface-2);stroke:var(--line)"/><text x="293" y="48" text-anchor="middle" font-size="10" ' + MONO + ' style="fill:var(--text)">01001101</text><text x="293" y="64" text-anchor="middle" font-size="10" ' + MONO + ' style="fill:var(--text)">11100010</text>' +
    '<text x="51" y="98" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">zdrojový kód</text><text x="293" y="98" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">program (.exe)</text></svg>';

  var L1 = { id: "cpp-1-1", nazov: "Čo je C++", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Rýchly a výkonný jazyk",
      text: "<p><b>C++</b> je jazyk, v ktorom vznikajú programy, kde záleží na rýchlosti: hry (Unreal Engine), prehliadače (Chrome), operačné systémy, programy pre autá a vesmírne sondy.</p><p>Na rozdiel od Pythonu a JavaScriptu sa C++ najprv <b>preloží</b> (skompiluje) do strojového kódu, ktorému rozumie procesor:</p>", obr: OBR_PREKLAD,
      podrobne: "<p>Preklad má výhody: program beží veľmi rýchlo a prekladač nájde veľa chýb ešte pred spustením. Nevýhodou je prísnejší zápis: musíš uvádzať typy premenných, bodkočiarky a dávať pozor na pamäť.</p><p>V tejto aplikácii sa tvoj kód posiela na <b>online prekladač</b> (Wandbox), preto C++ potrebuje internet.</p>",
      hlbka: "<p>C++ vytvoril Dán Bjarne Stroustrup v roku 1985 ako rozšírenie jazyka C. Dodnes sa vyvíja: C++11, C++17, C++20, C++23. Používa sa aj v súťažnom programovaní (olympiáda v informatike), lebo je rýchly a má bohatú knižnicu.</p>" },
    { typ: "volba", otazka: "Čo robí prekladač (kompilátor)?", moznosti: ["Preloží zdrojový kód na strojový kód", "Opraví všetky chyby za teba", "Preloží text do angličtiny", "Spustí webovú stránku"], spravna: 0, vysvetlenie: "Z textu, ktorý píšeš, vytvorí spustiteľný program." },
    { typ: "volba", otazka: "Na ktorý projekt sa C++ hodí najlepšie?", moznosti: ["3D hra s náročnou grafikou", "Štýl webovej stránky", "Jednoduchý formulár na webe", "Tabuľka v Exceli"], spravna: 0, vysvetlenie: "Hry a výkonné programy sú doména C++." },
  ] };

  var L2 = { id: "cpp-1-2", nazov: "Kostra programu", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Ahoj, svet v C++",
      text: UKAZ('#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Ahoj, svet!" << endl;\n    return 0;\n}', "Ahoj, svet!"),
      podrobne: P.tabulka(["Riadok", "Význam"], [["<code>#include &lt;iostream&gt;</code>", "pripojí knižnicu na vstup a výstup (input/output stream)"], ["<code>using namespace std;</code>", "nemusíš písať <code>std::</code> pred cout, cin, string"], ["<code>int main() { … }</code>", "hlavná funkcia, tu program začína"], ["<code>cout &lt;&lt; …</code>", "výpis na obrazovku (console output)"], ["<code>endl</code>", "nový riadok"], ["<code>return 0;</code>", "program skončil úspešne"]]) },
    { typ: "vyklad", nadpis: "Pravidlá zápisu",
      text: "<ul><li>Každý príkaz končí <b>bodkočiarkou</b> <code>;</code>.</li><li>Bloky kódu sú v zložených zátvorkách <code>{ }</code>.</li><li>Záleží na veľkých a malých písmenách.</li><li>Odsadenie nie je povinné (na rozdiel od Pythonu), ale robí kód čitateľným.</li></ul>",
      podrobne: "<p>Kostru <code>#include</code>, <code>using namespace std;</code>, <code>int main()</code> budeš písať v každom programe. V úlohách ju dostaneš pripravenú, ty píšeš dovnútra main.</p>" },
    { typ: "poradie", otazka: "Zoraď kostru programu:", riadky: ["#include <iostream>", "using namespace std;", "int main() {", '    cout << "Ahoj";', "    return 0;", "}"], vysvetlenie: "include, namespace, main, príkazy, return, zátvorka." },
    { typ: "volba", otazka: "Kde program v C++ začína?", moznosti: ["Vo funkcii <code>main</code>", "Na prvom riadku súboru", "V <code>#include</code>", "Kdekoľvek"], spravna: 0, vysvetlenie: "Spúšťa sa vždy main." },
    { typ: "kod", zadanie: "Doplň do <code>main</code> výpis textu <b>Ahoj, C++!</b>.",
      karty: ["cpp"], start: { cpp: KOSTRA }, vyska: "190px",
      napoveda: 'cout << "Ahoj, C++!" << endl;', riesenie: { cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Ahoj, C++!" << endl;\n    return 0;\n}' },
      kontrola: function (v) { return r(v)[0] === "Ahoj, C++!" ? null : "Výstup má byť presne Ahoj, C++!"; },
      vysvetlenie: "Kód sa preložil na internete a spustil." },
  ] };

  var L3 = { id: "cpp-1-3", nazov: "Výpis cez cout", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Reťazenie <<",
      text: "<p>Operátor <code>&lt;&lt;</code> posiela hodnoty do výstupu. Dá sa reťaziť:</p>" + UKAZ('cout << "Mám " << 15 << " rokov." << endl;\ncout << "2 + 3 = " << 2 + 3 << "\\n";\ncout << "A" << "B" << endl;', "Mám 15 rokov.\n2 + 3 = 5\nAB"),
      podrobne: "<ul><li>C++ medzi hodnoty <b>nevkladá medzery</b> sám. Musíš ich dať do textu.</li><li><code>\"\\n\"</code> aj <code>endl</code> spravia nový riadok. <code>endl</code> navyše hneď vyprázdni výstup (je o niečo pomalší).</li><li>Komentáre: <code>// do konca riadku</code> a <code>/* viac riadkov */</code>.</li></ul>" },
    { typ: "volba", otazka: "Čo vypíše <code>cout &lt;&lt; \"x\" &lt;&lt; 1 &lt;&lt; 2;</code>?", moznosti: ["x12", "x 1 2", "x3", "chybu"], spravna: 0, vysvetlenie: "Bez medzier, čísla sa vypíšu za sebou." },
    { typ: "doplnenie", otazka: "Doplň výpis s novým riadkom:", sablona: 'cout [[0]] "Ahoj" [[1]] [[2]];', zetony: ["<<", "<<", "endl", ">>", "print"], spravne: ["<<", "<<", "endl"], vysvetlenie: "cout << \"Ahoj\" << endl;" },
    { typ: "kod", zadanie: "Vypíš dva riadky: <b>Body: 42</b> (číslo 42 pošli ako číslo, nie ako text) a <b>Koniec</b>.",
      karty: ["cpp"], start: { cpp: KOSTRA }, vyska: "190px",
      napoveda: 'cout << "Body: " << 42 << endl; cout << "Koniec" << endl;', riesenie: { cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Body: " << 42 << endl;\n    cout << "Koniec" << endl;\n    return 0;\n}' },
      kontrola: function (v, kod) { var l = r(v); if (l[0] !== "Body: 42") return "Prvý riadok má byť Body: 42 (pozor na medzeru za dvojbodkou)."; if (/"Body: 42"/.test(kod)) return "Číslo 42 pošli zvlášť: << 42"; return l[1] === "Koniec" ? null : "Druhý riadok má byť Koniec."; },
      vysvetlenie: "Text a číslo spojené cez <<." },
  ] };

  var L4 = { id: "cpp-1-4", nazov: "Chyby prekladača", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Prekladač je prísny učiteľ",
      text: "<p>Ak je v kóde chyba, prekladač program <b>vôbec nespustí</b> a povie, kde chyba je. Táto aplikácia hlášku preloží a označí riadok.</p>" + P.tabulka(["Hláška (anglicky)", "Čo znamená"], [["<code>expected ';'</code>", "chýba bodkočiarka (často na riadku vyššie)"], ["<code>'x' was not declared</code>", "premenná x neexistuje alebo je preklep"], ["<code>expected '}'</code>", "chýba zatváracia zátvorka"], ["<code>missing terminating \"</code>", "neuzavretý text"]]),
      podrobne: "<p>Tip: oprav vždy <b>prvú</b> chybu a skús znova. Jedna chýbajúca zátvorka môže spôsobiť desať ďalších hlášok.</p>" },
    { typ: "volba", otazka: "Prekladač hlási chybu na riadku 6, ale tam je všetko v poriadku. Kde hľadať?", moznosti: ["Často na riadku vyššie (chýbajúca ;)", "V inom súbore", "Na poslednom riadku", "Chyba je v prekladači"], spravna: 0, vysvetlenie: "Prekladač si chybu všimne až na ďalšom riadku." },
    { typ: "kod", zadanie: "Program obsahuje dve chyby. Oprav ho, aby vypísal <b>Funguje!</b>.",
      karty: ["cpp"], start: { cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Funguje!" << endl\n    return 0;\n' }, vyska: "190px",
      napoveda: "Za endl chýba bodkočiarka a na konci zatváracia zátvorka }.", riesenie: { cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Funguje!" << endl;\n    return 0;\n}' },
      kontrola: function (v) { return r(v)[0] === "Funguje!" ? null : "Výstup má byť Funguje!"; },
      vysvetlenie: "Prekladač ťa naučí presnosti." },
  ] };

  var L5 = { id: "cpp-1-5", nazov: "Vstup cez cin", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Načítanie hodnôt",
      text: "<p><code>cin &gt;&gt;</code> načíta hodnotu od používateľa do premennej. Premennú treba najprv vytvoriť s typom (viac v Module 2):</p>" + UKAZ('int vek;\ncout << "Koľko máš rokov? ";\ncin >> vek;\ncout << "O rok budeš mať " << vek + 1 << endl;', "Koľko máš rokov? 15\nO rok budeš mať 16"),
      podrobne: "<p>Šípky ukazujú smer údajov: <code>cout &lt;&lt;</code> posiela von na obrazovku, <code>cin &gt;&gt;</code> berie z klávesnice do premennej. <code>cin</code> číta po medzeru alebo koniec riadku, takže <code>cin &gt;&gt; a &gt;&gt; b;</code> načíta dve čísla.</p><p>V aplikácii vstup napíšeš vopred do poľa <b>Vstup</b>.</p>" },
    { typ: "volba", otazka: "Ktorý zápis načíta číslo do premennej <code>n</code>?", moznosti: ["<code>cin &gt;&gt; n;</code>", "<code>cin &lt;&lt; n;</code>", "<code>n = input();</code>", "<code>cout &gt;&gt; n;</code>"], spravna: 0, vysvetlenie: "cin s >>." },
    { typ: "kod", zadanie: "Načítaj dve celé čísla <code>a</code> a <code>b</code> (vstup: <b>8 3</b>) a vypíš ich súčet vo forme <b>8 + 3 = 11</b>.",
      karty: ["cpp"], vstup: "8 3", start: { cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    \n    return 0;\n}" }, vyska: "200px",
      napoveda: 'cin >> a >> b; cout << a << " + " << b << " = " << a + b << endl;', riesenie: { cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a << " + " << b << " = " << a + b << endl;\n    return 0;\n}' },
      kontrola: function (v, kod) { if (!/cin\s*>>/.test(kod)) return "Načítaj čísla cez cin >>."; return r(v)[0] === "8 + 3 = 11" ? null : "Výstup má byť 8 + 3 = 11."; },
      vysvetlenie: "Zmeň vstup a spusti znova." },
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li>C++ sa prekladá prekladačom.</li><li>Kostra: <code>#include</code>, <code>using namespace std;</code>, <code>int main()</code>, <code>return 0;</code></li><li>Výpis <code>cout &lt;&lt;</code>, <code>endl</code>, <code>\\n</code>.</li><li>Bodkočiarky a čítanie chýb prekladača.</li><li>Vstup <code>cin &gt;&gt;</code>.</li></ul>", tip: "Teraz test. Potom Modul 2: premenné a typy." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "cpp-1-1", otazka: "Prečo je C++ rýchly?", moznosti: ["Prekladá sa priamo do strojového kódu", "Beží v prehliadači", "Má krátky zápis", "Nie je rýchly"], spravna: 0, vysvetlenie: "Kompilovaný kód beží priamo na procesore." },
    { typ: "volba", lekcia: "cpp-1-2", otazka: "Ktorý riadok pripojí knižnicu pre cout a cin?", moznosti: ["<code>#include &lt;iostream&gt;</code>", "<code>import iostream</code>", "<code>using cout;</code>", "<code>#include &lt;stdio&gt;</code>"], spravna: 0, vysvetlenie: "iostream = vstupno-výstupné prúdy." },
    { typ: "volba", lekcia: "cpp-1-2", otazka: "Čo znamená <code>return 0;</code> na konci main?", moznosti: ["Program skončil úspešne", "Vypíše 0", "Vymaže premenné", "Spustí program znova"], spravna: 0, vysvetlenie: "0 = bez chyby." },
    { typ: "volba", lekcia: "cpp-1-3", otazka: "Čo vypíše <code>cout &lt;&lt; 2 &lt;&lt; 3;</code>?", moznosti: ["23", "5", "2 3", "6"], spravna: 0, vysvetlenie: "Dve hodnoty za sebou, bez medzery a bez sčítania." },
    { typ: "volba", lekcia: "cpp-1-4", otazka: "Najčastejšia chyba začiatočníka v C++:", moznosti: ["Chýbajúca bodkočiarka", "Príliš veľa medzier", "Malé písmená", "Prázdny riadok"], spravna: 0, vysvetlenie: "expected ';' …" },
    { typ: "doplnenie", lekcia: "cpp-1-5", otazka: "Načítaj a vypíš:", sablona: "int x;\ncin [[0]] x;\ncout [[1]] x;", zetony: [">>", "<<", "=", "->"], spravne: [">>", "<<"], vysvetlenie: "cin >> do premennej, cout << na výstup." },
  ];

  K.registrujModul("cpp", { cislo: 1, nazov: "Prvý program", popis: "Čo je C++ a prekladač, kostra programu, výpis cout, chyby prekladača a vstup cin.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
