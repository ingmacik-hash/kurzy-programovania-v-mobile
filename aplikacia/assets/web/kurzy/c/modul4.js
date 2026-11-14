/* C · Modul 4 · Funkcie a polia */
(function () {
  var P = K.pom, MONO = P.MONO;
  var KOD = function (t) { return P.kod(t, "c"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "c", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function program(funkcie, telo) { return "#include <stdio.h>\n\n" + funkcie + "\n\nint main(void) {\n" + telo + "\n    return 0;\n}"; }

  var OBR_POLE = '<svg viewBox="0 0 340 80" role="img" aria-label="Pole: prvky tesne za sebou v pamäti s indexmi od 0">' +
    [5, 3, 9, 1, 7].map(function (x, i) {
      var X = 14 + i * 64;
      return '<rect x="' + X + '" y="22" width="58" height="38" rx="6" style="fill:#3949ab"/><text x="' + (X + 29) + '" y="46" text-anchor="middle" font-size="15" font-weight="700" ' + MONO + ' fill="#fff">' + x + '</text><text x="' + (X + 29) + '" y="15" text-anchor="middle" font-size="12" ' + MONO + ' style="fill:var(--hl-num)">a[' + i + "]</text>";
    }).join("") + "</svg>";

  var L1 = { id: "c-4-1", nazov: "Funkcie", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Vlastná funkcia",
      text: "<p>Funkcia má návratový typ, meno a parametre. <code>void</code> znamená, že nič nevracia. Píše sa nad main (alebo sa nad main deklaruje):</p>" + UKAZ('int stvorec(int x) {\n    return x * x;\n}\n\nvoid ciara(int n) {\n    for (int i = 0; i < n; i++) printf("-");\n    printf("\\n");\n}\n\nint main(void) {\n    printf("%d\\n", stvorec(7));\n    ciara(5);\n    return 0;\n}', "49\n-----"),
      podrobne: "<p>Parametre sa v C odovzdávajú <b>hodnotou</b>: funkcia dostane kópiu. Ak ju zmení, originál zostane. Ak má funkcia zmeniť premennú volajúceho, potrebuje jej adresu (ukazovateľ, modul 5).</p>" },
    { typ: "volba", otazka: "Čo vráti funkcia s typom <code>void</code>?", moznosti: ["Nič", "0", "NULL", "Text"], spravna: 0, vysvetlenie: "void = bez návratovej hodnoty." },
    { typ: "kod", zadanie: "Napíš funkciu <code>int vacsie(int a, int b)</code>, ktorá vráti väčšie z dvoch čísel. V main načítaj dve čísla (vstup <b>12 30</b>) a vypíš <b>Väčšie: 30</b>.",
      karty: ["c"], vstup: "12 30", start: { c: program("", '    int a, b;\n    scanf("%d %d", &a, &b);\n    ') }, vyska: "280px",
      napoveda: "int vacsie(int a, int b) { if (a > b) return a; return b; }", riesenie: { c: program("int vacsie(int a, int b) {\n    if (a > b) return a;\n    return b;\n}", '    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("Väčšie: %d\\n", vacsie(a, b));') },
      kontrola: function (v, kod) { if (!/int\s+vacsie\s*\(\s*int\s+\w+\s*,\s*int\s+\w+\s*\)/.test(kod)) return "Chýba funkcia int vacsie(int a, int b)."; return r(v)[0] === "Väčšie: 30" ? null : "Výstup má byť Väčšie: 30"; },
      vysvetlenie: "return vráti výsledok volajúcemu." },
  ] };

  var L2 = { id: "c-4-2", nazov: "Polia", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Rad hodnôt",
      text: "<p>Pole má pevnú veľkosť a indexy od 0:</p>", obr: OBR_POLE,
      podrobne: UKAZ('int a[5] = {5, 3, 9, 1, 7};\nint sucet = 0;\nfor (int i = 0; i < 5; i++) {\n    sucet += a[i];\n}\nprintf("Súčet: %d\\n", sucet);\nprintf("Prvý: %d, posledný: %d\\n", a[0], a[4]);', "Súčet: 25\nPrvý: 5, posledný: 7") + "<p>C <b>nekontroluje hranice poľa</b>. <code>a[5]</code> siahne do cudzej pamäte. To je zdroj mnohých chýb aj bezpečnostných dier.</p>" },
    { typ: "volba", otazka: "Aký je posledný platný index poľa <code>int a[8]</code>?", moznosti: ["7", "8", "9", "0"], spravna: 0, vysvetlenie: "0 až 7." },
    { typ: "kod", zadanie: "Načítaj 6 čísel do poľa (vstup <b>4 9 2 9 5 1</b>) a vypíš najväčšie a jeho prvý index: <b>Max 9 na indexe 1</b>.",
      karty: ["c"], vstup: "4 9 2 9 5 1", start: { c: program("", "    int a[6];\n    ") }, vyska: "280px",
      napoveda: "for (i…) scanf(\"%d\", &a[i]);  potom int mx = a[0], kde = 0; for (i = 1…) if (a[i] > mx) { mx = a[i]; kde = i; }", riesenie: { c: program("", '    int a[6];\n    for (int i = 0; i < 6; i++) scanf("%d", &a[i]);\n    int mx = a[0], kde = 0;\n    for (int i = 1; i < 6; i++) {\n        if (a[i] > mx) {\n            mx = a[i];\n            kde = i;\n        }\n    }\n    printf("Max %d na indexe %d\\n", mx, kde);') },
      kontrola: function (v, kod) { if (!/\[\s*6\s*\]/.test(kod)) return "Použi pole int a[6]."; return r(v)[0] === "Max 9 na indexe 1" ? null : "Výstup má byť Max 9 na indexe 1 (pozor: > nie >=, aby to bol prvý výskyt)."; },
      vysvetlenie: "Porovnanie > nájde prvý výskyt maxima." },
  ] };

  var L3 = { id: "c-4-3", nazov: "Polia vo funkciách", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Pole ako parameter",
      text: "<p>Funkcia nevie, aké veľké pole dostala. Veľkosť jej preto vždy pošli ako ďalší parameter:</p>" + UKAZ('double priemer(int a[], int n) {\n    int s = 0;\n    for (int i = 0; i < n; i++) s += a[i];\n    return (double)s / n;\n}\n\nint main(void) {\n    int z[4] = {1, 2, 2, 3};\n    printf("%.2f\\n", priemer(z, 4));\n    return 0;\n}', "2.00"),
      podrobne: "<p>Pole sa na rozdiel od čísla <b>nekopíruje</b>: funkcia dostane adresu jeho začiatku. Keď zmení <code>a[i]</code>, zmení originál. Ak to nechceš, píš <code>const int a[]</code>.</p>" },
    { typ: "volba", otazka: "Prečo funkcia dostáva aj počet prvkov <code>n</code>?", moznosti: ["Pole v C nepozná svoju dĺžku", "Je to povinné pre double", "Kvôli rýchlosti", "Netreba"], spravna: 0, vysvetlenie: "V C neexistuje a.length." },
    { typ: "kod", zadanie: "Napíš funkciu <code>void zdvojnasob(int a[], int n)</code>, ktorá každý prvok poľa vynásobí dvomi. V main ju zavolaj na pole <code>{1, 5, 3}</code> a vypíš ho: <b>2 10 6</b>.",
      karty: ["c"], start: { c: program("", "    int a[3] = {1, 5, 3};\n    ") }, vyska: "280px",
      napoveda: "void zdvojnasob(int a[], int n) { for (int i = 0; i < n; i++) a[i] *= 2; }", riesenie: { c: program("void zdvojnasob(int a[], int n) {\n    for (int i = 0; i < n; i++) {\n        a[i] *= 2;\n    }\n}", '    int a[3] = {1, 5, 3};\n    zdvojnasob(a, 3);\n    printf("%d %d %d\\n", a[0], a[1], a[2]);') },
      kontrola: function (v, kod) { if (!/void\s+zdvojnasob\s*\(/.test(kod)) return "Chýba funkcia void zdvojnasob(int a[], int n)."; return r(v)[0] === "2 10 6" ? null : "Výstup má byť 2 10 6."; },
      vysvetlenie: "Funkcia zmenila originálne pole." },
  ] };

  var L4 = { id: "c-4-4", nazov: "Triedenie", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Bublinkové triedenie",
      text: "<p>Porovnávaj susedov a vymeň ich, ak sú v zlom poradí. Po každom prechode „vybuble“ najväčší prvok na koniec:</p>" + KOD("for (int i = 0; i < n - 1; i++) {\n    for (int j = 0; j < n - 1 - i; j++) {\n        if (a[j] > a[j + 1]) {\n            int pom = a[j];\n            a[j] = a[j + 1];\n            a[j + 1] = pom;\n        }\n    }\n}"),
      podrobne: "<p>Na výmenu potrebuješ pomocnú premennú. Bez nej by si jednu hodnotu stratil. Štandardná knižnica má aj rýchlu funkciu <code>qsort</code>, ktorá však vyžaduje porovnávaciu funkciu.</p>" },
    { typ: "poradie", otazka: "Zoraď výmenu dvoch hodnôt:", riadky: ["int pom = a;", "a = b;", "b = pom;"], vysvetlenie: "Najprv si odlož a." },
    { typ: "kod", zadanie: "Načítaj 5 čísel (vstup <b>40 10 50 20 30</b>), zoraď ich vzostupne bublinkovým triedením a vypíš oddelené medzerou: <b>10 20 30 40 50</b>.",
      karty: ["c"], vstup: "40 10 50 20 30", start: { c: program("", '    int a[5];\n    for (int i = 0; i < 5; i++) scanf("%d", &a[i]);\n    ') }, vyska: "300px",
      napoveda: "Dva vnorené cykly a výmena cez pom.", riesenie: { c: program("", '    int a[5];\n    for (int i = 0; i < 5; i++) scanf("%d", &a[i]);\n    for (int i = 0; i < 4; i++) {\n        for (int j = 0; j < 4 - i; j++) {\n            if (a[j] > a[j + 1]) {\n                int pom = a[j];\n                a[j] = a[j + 1];\n                a[j + 1] = pom;\n            }\n        }\n    }\n    for (int i = 0; i < 5; i++) printf(i ? " %d" : "%d", a[i]);\n    printf("\\n");') },
      kontrola: function (v, kod) { if (/qsort/.test(kod)) return "Skús to bez qsort, vlastným triedením."; return r(v)[0] === "10 20 30 40 50" ? null : "Výstup má byť 10 20 30 40 50."; },
      vysvetlenie: "Toto je jeden z prvých algoritmov každého programátora." },
  ] };

  var L5 = { id: "c-4-5", nazov: "Knižnica math.h", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Matematické funkcie",
      text: P.tabulka(["Funkcia", "Výsledok"], [["<code>sqrt(16)</code>", "4.0 (odmocnina)"], ["<code>pow(2, 10)</code>", "1024.0 (mocnina)"], ["<code>fabs(-3.5)</code>", "3.5 (absolútna hodnota)"], ["<code>round(2.6)</code>", "3.0"], ["<code>floor(2.6)</code>, <code>ceil(2.1)</code>", "2.0, 3.0"]]) + KOD("#include <math.h>\n…\nprintf(\"%.3f\\n\", sqrt(2));   // 1.414"),
      podrobne: "<p>Funkcie z math.h vracajú double. Pri niektorých prekladačoch treba pri preklade pridať <code>-lm</code> (knižnica math), tu sa to deje automaticky.</p>" },
    { typ: "volba", otazka: "Ktorú knižnicu potrebuješ pre <code>sqrt</code>?", moznosti: ["<code>&lt;math.h&gt;</code>", "<code>&lt;stdio.h&gt;</code>", "<code>&lt;stdlib.h&gt;</code> je jediná", "Žiadnu"], spravna: 0, vysvetlenie: "math.h" },
    { typ: "kod", zadanie: "Načítaj odvesny pravouhlého trojuholníka (vstup <b>3 4</b>) ako double a vypíš preponu podľa Pytagorovej vety na 2 desatinné miesta: <b>Prepona: 5.00</b>.",
      karty: ["c"], vstup: "3 4", start: { c: "#include <stdio.h>\n#include <math.h>\n\nint main(void) {\n    double a, b;\n    scanf(\"%lf %lf\", &a, &b);\n    \n    return 0;\n}" }, vyska: "240px",
      napoveda: 'printf("Prepona: %.2f\\n", sqrt(a * a + b * b));', riesenie: { c: "#include <stdio.h>\n#include <math.h>\n\nint main(void) {\n    double a, b;\n    scanf(\"%lf %lf\", &a, &b);\n    printf(\"Prepona: %.2f\\n\", sqrt(a * a + b * b));\n    return 0;\n}" },
      kontrola: function (v, kod) { if (!/sqrt/.test(kod)) return "Použi sqrt."; return r(v)[0] === "Prepona: 5.00" ? null : "Výstup má byť Prepona: 5.00"; },
      vysvetlenie: "c = √(a² + b²)." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li>Funkcie, <code>void</code>, <code>return</code>, odovzdanie hodnotou.</li><li>Polia, indexy od 0, žiadna kontrola hraníc.</li><li>Pole vo funkcii + jeho dĺžka.</li><li>Bublinkové triedenie a výmena cez pomocnú premennú.</li><li><code>math.h</code>: sqrt, pow, fabs.</li></ul>", tip: "Posledný modul: reťazce, ukazovatele a štruktúry." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "c-4-1", otazka: "Ako sa v C odovzdáva číslo do funkcie?", moznosti: ["Kópiou (hodnotou)", "Originálom", "Ako text", "Nedá sa"], spravna: 0, vysvetlenie: "Funkcia dostane kópiu." },
    { typ: "volba", lekcia: "c-4-1", otazka: "Čo vráti <code>f(3)</code> pre <code>int f(int x) { return x * 2 + 1; }</code>?", moznosti: ["7", "6", "8", "5"], spravna: 0, vysvetlenie: "3 × 2 + 1." },
    { typ: "volba", lekcia: "c-4-2", otazka: "Čo spraví C pri <code>a[10]</code> v poli s 5 prvkami?", moznosti: ["Nič ho nezastaví, siahne do cudzej pamäte", "Chyba prekladu", "Vráti 0", "Zväčší pole"], spravna: 0, vysvetlenie: "Hranice si stráži programátor." },
    { typ: "volba", lekcia: "c-4-3", otazka: "Čo sa stane, keď funkcia zmení prvok poľa, ktoré dostala?", moznosti: ["Zmení sa aj originálne pole", "Zmení sa len kópia", "Chyba", "Nič"], spravna: 0, vysvetlenie: "Pole sa nekopíruje." },
    { typ: "volba", lekcia: "c-4-4", otazka: "Prečo pri výmene potrebuješ pomocnú premennú?", moznosti: ["Inak by si jednu hodnotu prepísal a stratil", "Kvôli rýchlosti", "Je to pravidlo C", "Netreba"], spravna: 0, vysvetlenie: "a = b zničí pôvodné a." },
    { typ: "volba", lekcia: "c-4-5", otazka: "Čo vráti <code>pow(3, 2)</code>?", moznosti: ["9.0", "6.0", "8.0", "1.5"], spravna: 0, vysvetlenie: "3² = 9." },
    { typ: "doplnenie", lekcia: "c-4-1", otazka: "Doplň funkciu:", sablona: "[[0]] obsah(int a, int b) {\n    [[1]] a * b;\n}", zetony: ["int", "return", "void", "printf", "def"], spravne: ["int", "return"], vysvetlenie: "int … return …" },
  ];

  K.registrujModul("c", { cislo: 4, nazov: "Funkcie a polia", popis: "Funkcie, polia, polia vo funkciách, triedenie a math.h.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
