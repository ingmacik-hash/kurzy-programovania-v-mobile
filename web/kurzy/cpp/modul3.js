/* C++ · Modul 3 · Podmienky a cykly */
(function () {
  var P = K.pom, CPP = function (t) { return P.kod(t, "cpp"); }, MONO = P.MONO, TXT = P.TXT;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "cpp", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n" + telo + "\n    return 0;\n}"; }

  var OBR_FOR = '<svg viewBox="0 0 340 100" role="img" aria-label="Cyklus for má tri časti: začiatok, podmienku a krok">' +
    '<rect x="8" y="30" width="324" height="40" rx="10" style="fill:var(--code-bg)"/>' +
    '<text x="20" y="56" font-size="14" ' + MONO + ' style="fill:var(--hl-kw)">for (</text>' +
    '<text x="68" y="56" font-size="14" ' + MONO + ' style="fill:#7fd3a0">int i = 0</text><text x="148" y="56" font-size="14" ' + MONO + ' style="fill:var(--code-text)">;</text>' +
    '<text x="160" y="56" font-size="14" ' + MONO + ' style="fill:#ffcf6e">i &lt; 5</text><text x="210" y="56" font-size="14" ' + MONO + ' style="fill:var(--code-text)">;</text>' +
    '<text x="222" y="56" font-size="14" ' + MONO + ' style="fill:#ff8f6b">i++</text><text x="258" y="56" font-size="14" ' + MONO + ' style="fill:var(--hl-kw)">)</text>' +
    '<text x="105" y="22" text-anchor="middle" font-size="11" ' + TXT + ' style="fill:#2f9e63">začiatok (raz)</text><text x="183" y="92" text-anchor="middle" font-size="11" ' + TXT + ' style="fill:#b8860b">podmienka (pred každým krokom)</text><text x="240" y="22" text-anchor="middle" font-size="11" ' + TXT + ' style="fill:#d05a32">krok (po každom)</text></svg>';

  var L1 = { id: "cpp-3-1", nazov: "if a else", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Rozhodovanie",
      text: "<p>Podmienka je v <b>okrúhlych zátvorkách</b>, blok v <b>zložených</b>:</p>" + UKAZ('int vek = 15;\nif (vek >= 18) {\n    cout << "Dospelý" << endl;\n} else {\n    cout << "Dieťa" << endl;\n}', "Dieťa"),
      podrobne: "<p>Porovnania sú rovnaké ako v iných jazykoch: <code>== != &lt; &gt; &lt;= &gt;=</code>. Odsadenie v C++ nie je povinné (bloky určujú zátvorky), ale vždy odsadzuj, kvôli čitateľnosti.</p><p>Pozor na <code>if (x = 5)</code>: jedno <code>=</code> do x priradí 5 a podmienka vždy platí. Prekladač na to často len upozorní.</p>" },
    { typ: "volba", otazka: "Čo vypíše program pre <code>int x = 10;</code>?", kod: 'if (x % 2 == 0) {\n    cout << "párne";\n} else {\n    cout << "nepárne";\n}', moznosti: ["párne", "nepárne", "nič", "chybu"], spravna: 0, vysvetlenie: "10 % 2 = 0." },
    { typ: "volba", otazka: "Čo je zle?", kod: 'if vek > 18 {\n    cout << "OK";\n}', moznosti: ["Podmienka musí byť v zátvorkách ( )", "Chýba dvojbodka", "Chýba then", "Nič"], spravna: 0, vysvetlenie: "if (vek > 18)" },
    { typ: "kod", zadanie: "Načítaj číslo (vstup <b>-4</b>) a vypíš <b>kladné</b>, <b>záporné</b> alebo <b>nula</b>.",
      karty: ["cpp"], vstup: "-4", start: { cpp: kostra("    int x;\n    cin >> x;\n    ") }, vyska: "260px",
      napoveda: 'if (x > 0) { … } else if (x < 0) { … } else { … }', riesenie: { cpp: kostra('    int x;\n    cin >> x;\n    if (x > 0) {\n        cout << "kladné" << endl;\n    } else if (x < 0) {\n        cout << "záporné" << endl;\n    } else {\n        cout << "nula" << endl;\n    }') },
      kontrola: function (v, kod) { if (!/if\s*\(/.test(kod)) return "Použi if."; if (!/else/.test(kod)) return "Použi aj else."; return r(v)[0] === "záporné" ? null : "Pre -4 má vypísať záporné."; },
      vysvetlenie: "else if pridá ďalšiu vetvu." },
  ] };

  var L2 = { id: "cpp-3-2", nazov: "&&, || a !", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Logické operátory",
      text: P.tabulka(["C++", "Význam"], [["<code>&amp;&amp;</code>", "a zároveň (and)"], ["<code>||</code>", "alebo (or)"], ["<code>!</code>", "nie (not)"]]) + UKAZ('int vek = 16;\nbool listok = true;\nif (vek >= 15 && listok) {\n    cout << "Vstup povolený" << endl;\n}\nif (!listok || vek < 6) {\n    cout << "Nevstúpiš" << endl;\n}', "Vstup povolený"),
      podrobne: "<p>Ak je ľavá strana <code>&amp;&amp;</code> nepravdivá, pravá sa už nevyhodnocuje (skrátené vyhodnocovanie). Preto <code>if (b != 0 &amp;&amp; a / b &gt; 2)</code> nikdy nedelí nulou.</p>" },
    { typ: "volba", otazka: "Kedy platí <code>(x &gt; 0 &amp;&amp; x &lt; 10)</code>?", moznosti: ["Keď je x od 1 do 9", "Keď je x kladné alebo menšie ako 10", "Vždy", "Nikdy"], spravna: 0, vysvetlenie: "Obe podmienky naraz." },
    { typ: "doplnenie", otazka: "Víkend je sobota alebo nedeľa:", sablona: 'if (den == "sobota" [[0]] den == "nedeľa")', zetony: ["||", "&&", "!", "or", "|"], spravne: ["||"], vysvetlenie: "|| = alebo." },
    { typ: "kod", zadanie: "Načítaj rok (vstup <b>1900</b>) a vypíš <b>prestupný</b> alebo <b>neprestupný</b>. Prestupný je rok deliteľný 4 a nie 100, alebo deliteľný 400.",
      karty: ["cpp"], vstup: "1900", start: { cpp: kostra("    int rok;\n    cin >> rok;\n    ") }, vyska: "240px",
      napoveda: "if ((rok % 4 == 0 && rok % 100 != 0) || rok % 400 == 0)", riesenie: { cpp: kostra('    int rok;\n    cin >> rok;\n    if ((rok % 4 == 0 && rok % 100 != 0) || rok % 400 == 0) {\n        cout << "prestupný" << endl;\n    } else {\n        cout << "neprestupný" << endl;\n    }') },
      kontrola: function (v, kod) { if (!/&&/.test(kod) || !/\|\|/.test(kod)) return "Použi && aj ||."; return r(v)[0] === "neprestupný" ? null : "Rok 1900 nie je prestupný (deliteľný 100, ale nie 400)."; },
      vysvetlenie: "1900 je známa pasca." },
  ] };

  var L3 = { id: "cpp-3-3", nazov: "Cyklus for", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Tri časti cyklu for",
      text: UKAZ("for (int i = 1; i <= 5; i++) {\n    cout << i << \" \";\n}\ncout << endl;", "1 2 3 4 5 "), obr: OBR_FOR,
      podrobne: "<ol><li>Začiatok sa vykoná raz: vytvorí počítadlo.</li><li>Pred každým krokom sa skontroluje podmienka. Ak neplatí, cyklus končí.</li><li>Po každom kroku sa vykoná krok, tu <code>i++</code> (zvýš o 1).</li></ol><p>Odpočítavanie: <code>for (int i = 10; i &gt; 0; i--)</code>. Po dvoch: <code>i += 2</code>.</p>" },
    { typ: "vyklad", nadpis: "Súčet v cykle",
      text: UKAZ("int sucet = 0;\nfor (int i = 1; i <= 100; i++) {\n    sucet += i;\n}\ncout << sucet << endl;", "5050"),
      podrobne: "<p>Premenná <code>sucet</code> musí byť vytvorená <b>pred</b> cyklom a mať počiatočnú hodnotu 0. Premenná <code>i</code> existuje len vnútri cyklu.</p>" },
    { typ: "volba", otazka: "Koľkokrát sa vykoná telo cyklu <code>for (int i = 0; i &lt; 3; i++)</code>?", moznosti: ["3", "4", "2", "0"], spravna: 0, vysvetlenie: "i = 0, 1, 2." },
    { typ: "poradie", otazka: "Zoraď časti hlavičky cyklu:", riadky: ["for (", "int i = 0;", "i < 10;", "i++", ")"], vysvetlenie: "začiatok; podmienka; krok" },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>6</b>) a vypíš súčin čísel 1 až n, teda n! (pre 6: <b>720</b>). Použi <code>long long</code>.",
      karty: ["cpp"], vstup: "6", start: { cpp: kostra("    int n;\n    cin >> n;\n    ") }, vyska: "220px",
      napoveda: "long long f = 1; for (int i = 1; i <= n; i++) f *= i;", riesenie: { cpp: kostra("    int n;\n    cin >> n;\n    long long f = 1;\n    for (int i = 1; i <= n; i++) {\n        f *= i;\n    }\n    cout << f << endl;") },
      kontrola: function (v, kod) { if (!/for\s*\(/.test(kod)) return "Použi cyklus for."; return r(v)[0] === "720" ? null : "Pre 6 má vyjsť 720."; },
      vysvetlenie: "Súčin začína od 1." },
  ] };

  var L4 = { id: "cpp-3-4", nazov: "while a do-while", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kým platí",
      text: "<p><code>while</code> opakuje, kým podmienka platí. <code>do … while</code> kontroluje podmienku až na konci, takže prebehne <b>aspoň raz</b>:</p>" + UKAZ('int n = 1;\nwhile (n < 100) {\n    n *= 2;\n}\ncout << n << endl;\n\nint x = 50;\ndo {\n    cout << "raz" << endl;\n} while (x < 10);', "128\nraz"),
      podrobne: "<p>do-while sa hodí napríklad na menu: najprv ho ukáž, potom sa pýtaj, či pokračovať. Pozor na bodkočiarku za <code>while (…);</code> pri do-while.</p>" },
    { typ: "vyklad", nadpis: "Čítanie, kým sú čísla",
      text: UKAZ("int x, sucet = 0;\nwhile (cin >> x) {\n    sucet += x;\n}\ncout << sucet << endl;", "(vstup 3 4 5) → 12") + "<p><code>cin &gt;&gt; x</code> v podmienke vráti false, keď už vstup nie je. Takto sa v súťažnom programovaní čítajú vstupy neznámej dĺžky.</p>" },
    { typ: "volba", otazka: "Koľkokrát prebehne <code>do { … } while (false);</code>?", moznosti: ["1", "0", "nekonečne", "chyba"], spravna: 0, vysvetlenie: "do-while vždy aspoň raz." },
    { typ: "kod", zadanie: "Ciferný súčet: načítaj číslo (vstup <b>4728</b>) a cyklom while sčítaj jeho cifry (4 + 7 + 2 + 8 = <b>21</b>). Tip: posledná cifra je <code>n % 10</code>, odstrániš ju cez <code>n /= 10</code>.",
      karty: ["cpp"], vstup: "4728", start: { cpp: kostra("    int n;\n    cin >> n;\n    ") }, vyska: "240px",
      napoveda: "int sucet = 0; while (n > 0) { sucet += n % 10; n /= 10; }", riesenie: { cpp: kostra("    int n;\n    cin >> n;\n    int sucet = 0;\n    while (n > 0) {\n        sucet += n % 10;\n        n /= 10;\n    }\n    cout << sucet << endl;") },
      kontrola: function (v, kod) { if (!/while\s*\(/.test(kod)) return "Použi cyklus while."; return r(v)[0] === "21" ? null : "Pre 4728 má vyjsť 21."; },
      vysvetlenie: "% 10 a / 10 sú klasika práce s ciframi." },
  ] };

  var L5 = { id: "cpp-3-5", nazov: "break, continue a vnorené cykly", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Riadenie cyklu",
      text: "<p><code>break</code> ukončí cyklus, <code>continue</code> preskočí na ďalší krok:</p>" + UKAZ("for (int i = 1; i <= 10; i++) {\n    if (i % 3 == 0) continue;\n    if (i > 7) break;\n    cout << i << \" \";\n}", "1 2 4 5 7 "),
      podrobne: "<p>Ak má if len jeden príkaz, zložené zátvorky môžeš vynechať, ako vyššie. Začiatočníkom sa však odporúča písať ich vždy.</p>" },
    { typ: "vyklad", nadpis: "Cyklus v cykle",
      text: UKAZ('for (int r = 1; r <= 3; r++) {\n    for (int s = 1; s <= r; s++) {\n        cout << "*";\n    }\n    cout << endl;\n}', "*\n**\n***") },
    { typ: "volba", otazka: "Koľko hviezdičiek vypíšu dva vnorené cykly <code>for (i = 0; i &lt; 4; i++)</code> a <code>for (j = 0; j &lt; 5; j++)</code>?", moznosti: ["20", "9", "4", "5"], spravna: 0, vysvetlenie: "4 × 5." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>4</b>) a vypíš malú násobilku n × n: v každom riadku čísla oddelené medzerou. Prvý riadok <b>1 2 3 4</b>, posledný <b>4 8 12 16</b>.",
      karty: ["cpp"], vstup: "4", start: { cpp: kostra("    int n;\n    cin >> n;\n    ") }, vyska: "260px",
      napoveda: 'for (int r = 1; r <= n; r++) { for (int s = 1; s <= n; s++) { cout << r * s; if (s < n) cout << " "; } cout << endl; }', riesenie: { cpp: kostra('    int n;\n    cin >> n;\n    for (int r = 1; r <= n; r++) {\n        for (int s = 1; s <= n; s++) {\n            cout << r * s;\n            if (s < n) cout << " ";\n        }\n        cout << endl;\n    }') },
      kontrola: function (v, kod) { if ((kod.match(/for\s*\(/g) || []).length < 2) return "Použi dva vnorené cykly for."; return r(v).join("|") === "1 2 3 4|2 4 6 8|3 6 9 12|4 8 12 16" ? null : "Výstup má mať 4 riadky: 1 2 3 4 / 2 4 6 8 / 3 6 9 12 / 4 8 12 16."; },
      vysvetlenie: "Medzery na koncoch riadkov sa nepočítajú." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li><code>if</code>, <code>else if</code>, <code>else</code> so zátvorkami.</li><li><code>&amp;&amp;</code>, <code>||</code>, <code>!</code>.</li><li><code>for (začiatok; podmienka; krok)</code>.</li><li><code>while</code>, <code>do-while</code>, <code>while (cin &gt;&gt; x)</code>.</li><li><code>break</code>, <code>continue</code>, vnorené cykly.</li></ul>", tip: "Ďalej funkcie: ako rozdeliť program na menšie časti." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "cpp-3-1", otazka: "Kde je v C++ podmienka if?", moznosti: ["V okrúhlych zátvorkách ( )", "Za dvojbodkou", "V hranatých [ ]", "Bez zátvoriek"], spravna: 0, vysvetlenie: "if (podmienka) { … }" },
    { typ: "volba", lekcia: "cpp-3-1", otazka: "Čo je problém v <code>if (x = 5)</code>?", moznosti: ["Priradí 5 namiesto porovnania, podmienka vždy platí", "Nič", "Chýba bodkočiarka", "x musí byť string"], spravna: 0, vysvetlenie: "Porovnanie je ==." },
    { typ: "volba", lekcia: "cpp-3-2", otazka: "Ako sa v C++ píše „alebo“?", moznosti: ["<code>||</code>", "<code>&amp;&amp;</code>", "<code>or</code> je jediná možnosť", "<code>|</code>"], spravna: 0, vysvetlenie: "||" },
    { typ: "volba", lekcia: "cpp-3-3", otazka: "Čo vypíše cyklus?", kod: "for (int i = 0; i < 10; i += 3) {\n    cout << i << \" \";\n}", moznosti: ["0 3 6 9", "0 3 6", "3 6 9", "0 1 2 3"], spravna: 0, vysvetlenie: "0, 3, 6, 9; 12 už nie je menej ako 10." },
    { typ: "volba", lekcia: "cpp-3-4", otazka: "Ktorý cyklus prebehne vždy aspoň raz?", moznosti: ["do-while", "while", "for", "žiadny"], spravna: 0, vysvetlenie: "Podmienka je až na konci." },
    { typ: "volba", lekcia: "cpp-3-4", otazka: "Čo je <code>4728 % 10</code>?", moznosti: ["8", "472", "4", "2"], spravna: 0, vysvetlenie: "Posledná cifra." },
    { typ: "volba", lekcia: "cpp-3-5", otazka: "Čo spraví <code>continue</code>?", moznosti: ["Preskočí zvyšok kroku a pokračuje ďalším", "Ukončí cyklus", "Ukončí program", "Nič"], spravna: 0, vysvetlenie: "Skok na ďalšie opakovanie." },
    { typ: "doplnenie", lekcia: "cpp-3-3", otazka: "Vypíš čísla 1 až 5:", sablona: "for (int i = 1; i [[0]] 5; i[[1]]) {\n    cout << i;\n}", zetony: ["<=", "++", "<", "--", "=="], spravne: ["<=", "++"], vysvetlenie: "i <= 5; i++" },
  ];

  K.registrujModul("cpp", { cislo: 3, nazov: "Podmienky a cykly", popis: "if/else, logické operátory, for, while, do-while, break a continue.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("cpp", [
    { kat: "Riadenie", znak: "if / else", nazov: "Podmienka", popis: "Podmienka v ( ), blok v { }.", priklad: 'if (x > 0) {\n    cout << "kladné";\n}' },
    { kat: "Riadenie", znak: "&& || !", nazov: "Logické operátory", popis: "A zároveň, alebo, nie." },
    { kat: "Riadenie", znak: "for", nazov: "Cyklus for", popis: "for (začiatok; podmienka; krok)", priklad: "for (int i = 0; i < 5; i++) {\n    cout << i;\n}" },
    { kat: "Riadenie", znak: "while / do-while", nazov: "Cyklus while", popis: "Kým platí podmienka. do-while prebehne aspoň raz." },
    { kat: "Riadenie", znak: "break / continue", nazov: "Riadenie cyklu", popis: "Ukonči cyklus / preskoč krok." },
    { kat: "Operátory", znak: "++ / --", nazov: "Zvýš / zníž o 1", popis: "i++ je to isté ako i = i + 1." },
  ]);
})();
