/* C · Modul 3 · Podmienky a cykly */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "c"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "c", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "#include <stdio.h>\n\nint main(void) {\n" + telo + "\n    return 0;\n}"; }

  var L1 = { id: "c-3-1", nazov: "if a else", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Rozhodovanie",
      text: "<p>Podmienka je v okrúhlych zátvorkách, blok v zložených:</p>" + UKAZ('int teplota = 25;\nif (teplota > 20) {\n    printf("Teplo\\n");\n} else if (teplota > 10) {\n    printf("Príjemne\\n");\n} else {\n    printf("Zima\\n");\n}', "Teplo"),
      podrobne: "<p>C nemalo pôvodne typ bool. Podmienka platí, ak je jej hodnota <b>nenulová</b>. <code>if (5)</code> platí, <code>if (0)</code> nie. Porovnanie <code>a &gt; b</code> vráti 1 alebo 0.</p><p>Pozor: <code>if (x = 5)</code> priradí 5 a vždy platí. Na porovnanie je <code>==</code>.</p>" },
    { typ: "volba", otazka: "Čo vypíše program pre <code>int x = 0;</code>?", kod: 'if (x) printf("áno");\nelse printf("nie");', moznosti: ["nie", "áno", "0", "chybu"], spravna: 0, vysvetlenie: "0 znamená nepravda." },
    { typ: "kod", zadanie: "Načítaj číslo (vstup <b>-7</b>) a vypíš <b>kladné</b>, <b>záporné</b> alebo <b>nula</b>.",
      karty: ["c"], vstup: "-7", start: { c: kostra('    int x;\n    scanf("%d", &x);\n    ') }, vyska: "240px",
      napoveda: 'if (x > 0) printf("kladné\\n"); else if (x < 0) printf("záporné\\n"); else printf("nula\\n");', riesenie: { c: kostra('    int x;\n    scanf("%d", &x);\n    if (x > 0) {\n        printf("kladné\\n");\n    } else if (x < 0) {\n        printf("záporné\\n");\n    } else {\n        printf("nula\\n");\n    }') },
      kontrola: function (v, kod) { if (!/if\s*\(/.test(kod) || !/else/.test(kod)) return "Použi if a else."; return r(v)[0] === "záporné" ? null : "Pre -7 má vypísať záporné."; },
      vysvetlenie: "else if pridá ďalšiu možnosť." },
  ] };

  var L2 = { id: "c-3-2", nazov: "&&, || a switch", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Logické operátory",
      text: P.tabulka(["Zápis", "Význam"], [["<code>a &amp;&amp; b</code>", "a zároveň b"], ["<code>a || b</code>", "a alebo b"], ["<code>!a</code>", "nie a"]]) + KOD('if (vek >= 6 && vek <= 15) printf("Školák\\n");\nif (den == 6 || den == 7) printf("Víkend\\n");'),
      podrobne: "<p>Rozsah sa píše dvoma porovnaniami: <code>vek &gt;= 6 &amp;&amp; vek &lt;= 15</code>. Zápis <code>6 &lt;= vek &lt;= 15</code> sa síce preloží, ale robí niečo úplne iné.</p>" },
    { typ: "vyklad", nadpis: "switch: veľa možností jednej hodnoty",
      text: UKAZ('int den = 3;\nswitch (den) {\n    case 1: printf("Pondelok\\n"); break;\n    case 2: printf("Utorok\\n"); break;\n    case 3: printf("Streda\\n"); break;\n    default: printf("Iný deň\\n");\n}', "Streda"),
      podrobne: "<p>Bez <code>break</code> by program pokračoval do ďalších case (tzv. prepadnutie). <code>default</code> sa vykoná, keď nesedí žiadny case. switch funguje len pre celé čísla a znaky.</p>" },
    { typ: "volba", otazka: "Čo sa stane, keď v case chýba <code>break</code>?", moznosti: ["Vykonajú sa aj nasledujúce case", "Chyba prekladu", "switch skončí", "Nič"], spravna: 0, vysvetlenie: "Prepadnutie (fall-through)." },
    { typ: "kod", zadanie: "Načítaj číslo mesiaca (vstup <b>7</b>) a vypíš ročné obdobie cez switch alebo if: 12, 1, 2 → <b>zima</b>, 3–5 → <b>jar</b>, 6–8 → <b>leto</b>, 9–11 → <b>jeseň</b>.",
      karty: ["c"], vstup: "7", start: { c: kostra('    int m;\n    scanf("%d", &m);\n    ') }, vyska: "260px",
      napoveda: 'if (m == 12 || m <= 2) … else if (m <= 5) … else if (m <= 8) … else …', riesenie: { c: kostra('    int m;\n    scanf("%d", &m);\n    if (m == 12 || m <= 2) {\n        printf("zima\\n");\n    } else if (m <= 5) {\n        printf("jar\\n");\n    } else if (m <= 8) {\n        printf("leto\\n");\n    } else {\n        printf("jeseň\\n");\n    }') },
      kontrola: function (v) { return r(v)[0] === "leto" ? null : "Pre mesiac 7 má vypísať leto."; },
      vysvetlenie: "Skús aj mesiac 12 a 1." },
  ] };

  var L3 = { id: "c-3-3", nazov: "Cyklus for", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Opakovanie s počítadlom",
      text: UKAZ('for (int i = 1; i <= 5; i++) {\n    printf("%d ", i);\n}\nprintf("\\n");', "1 2 3 4 5 ") + "<p>Hlavička má tri časti: <b>začiatok</b> (raz), <b>podmienka</b> (pred každým krokom), <b>krok</b> (po každom).</p>",
      podrobne: "<p>Odpočítavanie: <code>for (int i = 10; i &gt; 0; i--)</code>. Po dvoch: <code>i += 2</code>. Premenná i vytvorená v hlavičke existuje len v cykle.</p>" },
    { typ: "volba", otazka: "Koľkokrát prebehne <code>for (int i = 0; i &lt; 4; i++)</code>?", moznosti: ["4", "5", "3", "nekonečne"], spravna: 0, vysvetlenie: "i = 0, 1, 2, 3." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>10</b>) a vypíš súčet čísel 1 až n: <b>Súčet: 55</b>.",
      karty: ["c"], vstup: "10", start: { c: kostra('    int n;\n    scanf("%d", &n);\n    ') }, vyska: "230px",
      napoveda: 'int sucet = 0;\nfor (int i = 1; i <= n; i++) sucet += i;\nprintf("Súčet: %d\\n", sucet);', riesenie: { c: kostra('    int n;\n    scanf("%d", &n);\n    int sucet = 0;\n    for (int i = 1; i <= n; i++) {\n        sucet += i;\n    }\n    printf("Súčet: %d\\n", sucet);') },
      kontrola: function (v, kod) { if (!/for\s*\(/.test(kod)) return "Použi cyklus for."; return r(v)[0] === "Súčet: 55" ? null : "Pre 10 má vyjsť Súčet: 55."; },
      vysvetlenie: "Súčet začína od 0." },
  ] };

  var L4 = { id: "c-3-4", nazov: "while a do-while", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kým platí podmienka",
      text: UKAZ('int n = 1;\nwhile (n < 100) {\n    n *= 3;\n}\nprintf("%d\\n", n);', "243") + "<p><code>do { … } while (…);</code> prebehne aspoň raz, lebo podmienku kontroluje na konci.</p>",
      podrobne: "<p>Čítanie neznámeho počtu čísel: <code>while (scanf(\"%d\", &amp;x) == 1) { … }</code>. scanf vráti počet úspešne načítaných hodnôt. Na konci vstupu vráti iné číslo a cyklus skončí.</p>" },
    { typ: "volba", otazka: "Čo je zle?", kod: "int i = 0;\nwhile (i < 5) {\n    printf(\"%d\", i);\n}", moznosti: ["i sa nemení, cyklus je nekonečný", "Chýba for", "Chýba break", "Nič"], spravna: 0, vysvetlenie: "Chýba i++." },
    { typ: "kod", zadanie: "Načítaj čísla až do konca vstupu (vstup <b>4 8 15 16 23 42</b>) a vypíš ich počet a súčet: <b>6 čísel, súčet 108</b>.",
      karty: ["c"], vstup: "4 8 15 16 23 42", start: { c: kostra("    int x, pocet = 0, sucet = 0;\n    ") }, vyska: "230px",
      napoveda: 'while (scanf("%d", &x) == 1) { pocet++; sucet += x; }', riesenie: { c: kostra('    int x, pocet = 0, sucet = 0;\n    while (scanf("%d", &x) == 1) {\n        pocet++;\n        sucet += x;\n    }\n    printf("%d čísel, súčet %d\\n", pocet, sucet);') },
      kontrola: function (v, kod) { if (!/while\s*\(/.test(kod)) return "Použi cyklus while."; return r(v)[0] === "6 čísel, súčet 108" ? null : "Výstup má byť 6 čísel, súčet 108."; },
      vysvetlenie: "Program nevie vopred, koľko čísel príde." },
  ] };

  var L5 = { id: "c-3-5", nazov: "break, continue, vnorené cykly", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Riadenie cyklu",
      text: UKAZ('for (int i = 1; i <= 10; i++) {\n    if (i % 2 == 0) continue;\n    if (i > 7) break;\n    printf("%d ", i);\n}', "1 3 5 7 ") + UKAZ('for (int r = 1; r <= 3; r++) {\n    for (int s = 0; s < r; s++) printf("*");\n    printf("\\n");\n}', "*\n**\n***"),
      podrobne: "<p><code>break</code> ukončí cyklus, <code>continue</code> preskočí na ďalší krok. Pri vnorených cykloch break ukončí len vnútorný cyklus.</p>" },
    { typ: "volba", otazka: "Koľko hviezdičiek vypíšu cykly 3 × 4?", moznosti: ["12", "7", "3", "4"], spravna: 0, vysvetlenie: "Vnútorný cyklus prebehne celý pri každom vonkajšom kroku." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>30</b>) a vypíš všetky prvočísla od 2 do n oddelené medzerou: <b>2 3 5 7 11 13 17 19 23 29</b>. Použi vnorený cyklus a break.",
      karty: ["c"], vstup: "30", start: { c: kostra('    int n;\n    scanf("%d", &n);\n    ') }, vyska: "280px",
      napoveda: "Pre každé k od 2 po n: predpokladaj prvocislo = 1; pre d od 2 kým d * d <= k: ak k % d == 0, prvocislo = 0 a break.", riesenie: { c: kostra('    int n;\n    scanf("%d", &n);\n    int prve = 1;\n    for (int k = 2; k <= n; k++) {\n        int prvocislo = 1;\n        for (int d = 2; d * d <= k; d++) {\n            if (k % d == 0) {\n                prvocislo = 0;\n                break;\n            }\n        }\n        if (prvocislo) {\n            if (!prve) printf(" ");\n            printf("%d", k);\n            prve = 0;\n        }\n    }\n    printf("\\n");') },
      kontrola: function (v, kod) { if ((kod.match(/for\s*\(|while\s*\(/g) || []).length < 2) return "Použi dva vnorené cykly."; return r(v)[0] === "2 3 5 7 11 13 17 19 23 29" ? null : "Výstup má byť 2 3 5 7 11 13 17 19 23 29"; },
      vysvetlenie: "Stačí skúšať deliteľov po odmocninu z k." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li><code>if</code>, <code>else if</code>, <code>else</code>, nenulové = pravda.</li><li><code>&amp;&amp;</code>, <code>||</code>, <code>!</code> a <code>switch</code> s <code>break</code>.</li><li><code>for</code>, <code>while</code>, <code>do-while</code>.</li><li><code>while (scanf(…) == 1)</code>.</li><li><code>break</code>, <code>continue</code>, vnorené cykly.</li></ul>", tip: "Ďalej funkcie a polia." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "c-3-1", otazka: "Čo znamená v C podmienka <code>if (x)</code>?", moznosti: ["Platí, ak x nie je 0", "Platí, ak x existuje", "Platí vždy", "Chyba"], spravna: 0, vysvetlenie: "Nenulové = pravda." },
    { typ: "volba", lekcia: "c-3-2", otazka: "Ako zapíšeš „x je od 1 do 10“?", moznosti: ["<code>x &gt;= 1 &amp;&amp; x &lt;= 10</code>", "<code>1 &lt;= x &lt;= 10</code>", "<code>x in 1..10</code>", "<code>x &gt;= 1 || x &lt;= 10</code>"], spravna: 0, vysvetlenie: "Dve porovnania spojené &&." },
    { typ: "volba", lekcia: "c-3-2", otazka: "Na čo slúži <code>default</code> v switch?", moznosti: ["Vykoná sa, keď nesedí žiadny case", "Prvý case", "Ukončí switch", "Nič"], spravna: 0, vysvetlenie: "Ako else." },
    { typ: "volba", lekcia: "c-3-3", otazka: "Čo vypíše cyklus <code>for (int i = 3; i &gt; 0; i--) printf(\"%d\", i);</code>?", moznosti: ["321", "123", "3210", "210"], spravna: 0, vysvetlenie: "Odpočítavanie od 3 po 1." },
    { typ: "volba", lekcia: "c-3-4", otazka: "Čo vráti <code>scanf(\"%d\", &amp;x)</code>, keď úspešne načíta číslo?", moznosti: ["1", "x", "0", "nič"], spravna: 0, vysvetlenie: "Počet načítaných hodnôt." },
    { typ: "volba", lekcia: "c-3-5", otazka: "Ktorý príkaz preskočí zvyšok kroku cyklu?", moznosti: ["<code>continue</code>", "<code>break</code>", "<code>return</code>", "<code>skip</code>"], spravna: 0, vysvetlenie: "continue." },
    { typ: "doplnenie", lekcia: "c-3-3", otazka: "Vypíš čísla 0 až 9:", sablona: 'for (int i = 0; i [[0]] 10; i[[1]]) printf("%d", i);', zetony: ["<", "++", "<=", "--", ">"], spravne: ["<", "++"], vysvetlenie: "i < 10; i++" },
  ];

  K.registrujModul("c", { cislo: 3, nazov: "Podmienky a cykly", popis: "if/else, logické operátory, switch, for, while, break a continue.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
