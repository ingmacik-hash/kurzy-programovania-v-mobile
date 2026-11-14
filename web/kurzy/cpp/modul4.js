/* C++ · Modul 4 · Funkcie */
(function () {
  var P = K.pom, CPP = function (t) { return P.kod(t, "cpp"); }, MONO = P.MONO, TXT = P.TXT;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "cpp", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function program(funkcie, telo) { return "#include <iostream>\n#include <string>\nusing namespace std;\n\n" + funkcie + "\n\nint main() {\n" + telo + "\n    return 0;\n}"; }

  var OBR_REF = '<svg viewBox="0 0 340 120" role="img" aria-label="Pri odovzdaní hodnotou dostane funkcia kópiu, pri odovzdaní referenciou pracuje s originálom">' +
    '<text x="85" y="16" text-anchor="middle" font-size="12" font-weight="700" ' + TXT + ' style="fill:var(--text)">hodnotou: int x</text>' +
    '<rect x="20" y="28" width="56" height="34" rx="6" style="fill:#c0365b"/><text x="48" y="50" text-anchor="middle" font-size="14" font-weight="700" ' + MONO + ' fill="#fff">5</text>' +
    '<rect x="96" y="28" width="56" height="34" rx="6" style="fill:var(--surface-2);stroke:#c0365b;stroke-width:2;stroke-dasharray:4 3"/><text x="124" y="50" text-anchor="middle" font-size="14" font-weight="700" ' + MONO + ' style="fill:#c0365b">5</text>' +
    '<text x="48" y="80" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">originál</text><text x="124" y="80" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">kópia</text>' +
    '<text x="255" y="16" text-anchor="middle" font-size="12" font-weight="700" ' + TXT + ' style="fill:var(--text)">referenciou: int&amp; x</text>' +
    '<rect x="227" y="28" width="56" height="34" rx="6" style="fill:#c0365b"/><text x="255" y="50" text-anchor="middle" font-size="14" font-weight="700" ' + MONO + ' fill="#fff">5</text>' +
    '<text x="255" y="80" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">originál aj x</text>' +
    '<text x="170" y="110" text-anchor="middle" font-size="11" ' + TXT + ' style="fill:var(--muted)">zmena kópie originál nezmení · zmena cez &amp; áno</text></svg>';

  var L1 = { id: "cpp-4-1", nazov: "Prvá funkcia", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Funkcia mimo main",
      text: "<p>Funkcia má <b>návratový typ</b>, meno, zátvorky s parametrami a telo. Typ <code>void</code> znamená, že nič nevracia. Píše sa <b>nad</b> <code>main</code>:</p>" + UKAZ('void pozdrav() {\n    cout << "Ahoj!" << endl;\n}\n\nint main() {\n    pozdrav();\n    pozdrav();\n    return 0;\n}', "Ahoj!\nAhoj!"),
      podrobne: "<p>Prekladač číta súbor zhora nadol. Keby bola funkcia pod main, ešte by ju nepoznal. Riešením je <b>deklarácia</b> (prototyp) nad main: <code>void pozdrav();</code> a telo kdekoľvek nižšie.</p><p>Aj <code>main</code> je funkcia: vracia <code>int</code> (0 = bez chyby) a operačný systém ju spustí ako prvú.</p>" },
    { typ: "volba", otazka: "Čo znamená <code>void</code>?", moznosti: ["Funkcia nič nevracia", "Funkcia je prázdna", "Funkcia vracia 0", "Funkcia je súkromná"], spravna: 0, vysvetlenie: "void = žiadna návratová hodnota." },
    { typ: "volba", otazka: "Prečo prekladač ohlási chybu, keď je funkcia až pod main a nie je deklarovaná?", moznosti: ["Pri preklade main ju ešte nepozná", "main musí byť posledná", "Funkcie musia byť v inom súbore", "Chyba nenastane"], spravna: 0, vysvetlenie: "Číta sa zhora nadol." },
    { typ: "kod", zadanie: "Vytvor funkciu <code>void ciara()</code>, ktorá vypíše <b>----------</b> (10 pomlčiek). V main ju zavolaj, vypíš <b>MENU</b> a znova ju zavolaj.",
      karty: ["cpp"], start: { cpp: program("", "    ") }, vyska: "260px",
      napoveda: 'void ciara() { cout << "----------" << endl; } a v main: ciara(); cout << "MENU" << endl; ciara();', riesenie: { cpp: program('void ciara() {\n    cout << "----------" << endl;\n}', '    ciara();\n    cout << "MENU" << endl;\n    ciara();') },
      kontrola: function (v, kod) { if (!/void\s+ciara\s*\(\s*\)/.test(kod)) return "Vytvor funkciu void ciara()."; return r(v).join("|") === "----------|MENU|----------" ? null : "Výstup: ----------, MENU, ----------."; },
      vysvetlenie: "Funkcia sa dá volať opakovane." },
  ] };

  var L2 = { id: "cpp-4-2", nazov: "Parametre a return", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Vstupy a výsledok",
      text: "<p>Každý parameter má svoj typ. <code>return</code> vráti hodnotu typu, ktorý je pred menom funkcie:</p>" + UKAZ('double obsahKruhu(double r) {\n    return 3.14159 * r * r;\n}\n\nint vacsie(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\n\nint main() {\n    cout << obsahKruhu(2) << endl;\n    cout << vacsie(7, 12) << endl;\n    return 0;\n}', "12.5664\n12"),
      podrobne: "<p>Funkcia môže mať viac return, prvý vykonaný ju ukončí. Funkcia s iným typom ako void musí vždy niečo vrátiť, inak je výsledok nepredvídateľný.</p>" },
    { typ: "volba", otazka: "Aký návratový typ má funkcia, ktorá vráti priemer?", moznosti: ["<code>double</code>", "<code>void</code>", "<code>int</code> je jediná možnosť", "<code>return</code>"], spravna: 0, vysvetlenie: "Priemer býva desatinný." },
    { typ: "doplnenie", otazka: "Funkcia na druhú mocninu:", sablona: "[[0]] stvorec(int x) {\n    [[1]] x * x;\n}", zetony: ["int", "return", "void", "print", "def"], spravne: ["int", "return"], vysvetlenie: "int … return …" },
    { typ: "kod", zadanie: "Vytvor funkciu <code>bool jeParne(int n)</code> a funkciu <code>int sucetCifier(int n)</code>. V main načítaj číslo (vstup <b>1234</b>) a vypíš ciferný súčet (<b>10</b>) a potom <b>párny</b> alebo <b>nepárny</b> podľa toho, či je ciferný súčet párny.",
      karty: ["cpp"], vstup: "1234", start: { cpp: program("", "    int n;\n    cin >> n;\n    ") }, vyska: "300px",
      napoveda: "bool jeParne(int n) { return n % 2 == 0; }  int sucetCifier(int n) { int s = 0; while (n > 0) { s += n % 10; n /= 10; } return s; }", riesenie: { cpp: program("bool jeParne(int n) {\n    return n % 2 == 0;\n}\n\nint sucetCifier(int n) {\n    int s = 0;\n    while (n > 0) {\n        s += n % 10;\n        n /= 10;\n    }\n    return s;\n}", '    int n;\n    cin >> n;\n    int s = sucetCifier(n);\n    cout << s << endl;\n    if (jeParne(s)) cout << "párny" << endl;\n    else cout << "nepárny" << endl;') },
      kontrola: function (v, kod) {
        if (!/bool\s+jeParne\s*\(\s*int\s+\w+\s*\)/.test(kod)) return "Chýba funkcia bool jeParne(int n).";
        if (!/int\s+sucetCifier\s*\(\s*int\s+\w+\s*\)/.test(kod)) return "Chýba funkcia int sucetCifier(int n).";
        if (!/return/.test(kod)) return "Funkcie majú výsledok vrátiť cez return.";
        return r(v).join("|") === "10|párny" ? null : "Pre 1234 má vypísať 10 a párny.";
      },
      vysvetlenie: "Dve malé funkcie, každá robí jednu vec." },
  ] };

  var L3 = { id: "cpp-4-3", nazov: "Hodnotou alebo referenciou", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Funkcia dostane kópiu",
      text: "<p>Normálne funkcia dostane <b>kópiu</b> hodnoty. Keď ju zmení, originál zostane. So znakom <code>&amp;</code> (<b>referencia</b>) pracuje priamo s originálom:</p>", obr: OBR_REF,
      podrobne: UKAZ("void zvys(int x) { x++; }\nvoid zvysRef(int& x) { x++; }\n\nint main() {\n    int a = 5;\n    zvys(a);\n    cout << a << endl;\n    zvysRef(a);\n    cout << a << endl;\n    return 0;\n}", "5\n6") },
    { typ: "vyklad", nadpis: "Kedy použiť &",
      text: "<ul><li>Keď má funkcia <b>zmeniť</b> premennú volajúceho (napr. vymeniť dve čísla).</li><li>Keď je hodnota veľká (dlhý string, pole) a kopírovanie by bolo pomalé. Vtedy pridaj <code>const</code>, aby ju funkcia omylom nezmenila: <code>void vypis(const string&amp; text)</code>.</li></ul>" + CPP("void vymen(int& a, int& b) {\n    int pom = a;\n    a = b;\n    b = pom;\n}") },
    { typ: "volba", otazka: "Čo vypíše program?", kod: "void nastav(int x) { x = 100; }\n\nint main() {\n    int a = 1;\n    nastav(a);\n    cout << a;\n}", moznosti: ["1", "100", "0", "chybu"], spravna: 0, vysvetlenie: "Funkcia zmenila len kópiu." },
    { typ: "volba", otazka: "Ako zapíšeš parameter, ktorý je referencia na int?", moznosti: ["<code>int&amp; x</code>", "<code>int* x</code> je jediná možnosť", "<code>ref int x</code>", "<code>&amp;int x</code>"], spravna: 0, vysvetlenie: "Typ&amp; meno." },
    { typ: "kod", zadanie: "Napíš funkciu <code>void vymen(int&amp; a, int&amp; b)</code>, ktorá vymení hodnoty dvoch premenných. V main načítaj dve čísla (vstup <b>3 8</b>), vymeň ich a vypíš <b>8 3</b>.",
      karty: ["cpp"], vstup: "3 8", start: { cpp: program("", "    int x, y;\n    cin >> x >> y;\n    ") }, vyska: "280px",
      napoveda: "void vymen(int& a, int& b) { int pom = a; a = b; b = pom; } a v main: vymen(x, y); cout << x << \" \" << y << endl;", riesenie: { cpp: program("void vymen(int& a, int& b) {\n    int pom = a;\n    a = b;\n    b = pom;\n}", '    int x, y;\n    cin >> x >> y;\n    vymen(x, y);\n    cout << x << " " << y << endl;') },
      kontrola: function (v, kod) {
        if (!/void\s+vymen\s*\(\s*int\s*&\s*\w+\s*,\s*int\s*&\s*\w+\s*\)/.test(kod)) return "Funkcia má mať hlavičku void vymen(int& a, int& b).";
        if (/\bswap\s*\(/.test(kod)) return "Skús to bez funkcie swap, pomocou pomocnej premennej.";
        return r(v)[0] === "8 3" ? null : "Výstup má byť 8 3.";
      },
      vysvetlenie: "Bez & by sa vymenili len kópie." },
  ] };

  var L4 = { id: "cpp-4-4", nazov: "Preťaženie a predvolené hodnoty", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Rovnaké meno, iné parametre",
      text: "<p>V C++ môže byť viac funkcií s rovnakým menom, ak majú iné typy alebo počet parametrov. Volá sa to <b>preťaženie</b>. Prekladač vyberie tú, ktorá sedí:</p>" + UKAZ('int sucet(int a, int b) { return a + b; }\ndouble sucet(double a, double b) { return a + b; }\nint sucet(int a, int b, int c) { return a + b + c; }\n\nint main() {\n    cout << sucet(2, 3) << endl;\n    cout << sucet(1.5, 2.25) << endl;\n    cout << sucet(1, 2, 3) << endl;\n    return 0;\n}', "5\n3.75\n6"),
      podrobne: "<p>Preťaženie nemôže závisieť len od návratového typu, prekladač by nevedel, ktorú funkciu vybrať.</p>" },
    { typ: "vyklad", nadpis: "Predvolené hodnoty",
      text: UKAZ('void ciara(int dlzka = 10, char znak = \'-\') {\n    for (int i = 0; i < dlzka; i++) cout << znak;\n    cout << endl;\n}\n\nint main() {\n    ciara();\n    ciara(5);\n    ciara(3, \'*\');\n    return 0;\n}', "----------\n-----\n***"),
      podrobne: "<p>Predvolené parametre musia byť na konci zoznamu parametrov.</p>" },
    { typ: "volba", otazka: "Ktorá funkcia sa zavolá pri <code>sucet(2.5, 1.0)</code>?", moznosti: ["double sucet(double, double)", "int sucet(int, int)", "int sucet(int, int, int)", "Žiadna, chyba"], spravna: 0, vysvetlenie: "Argumenty sú double." },
    { typ: "kod", zadanie: "Napíš dve funkcie s menom <code>obsah</code>: <code>obsah(double a)</code> vráti obsah štvorca a <code>obsah(double a, double b)</code> obsah obdĺžnika. V main vypíš <code>obsah(3)</code> a <code>obsah(2, 5)</code>, každé na nový riadok (<b>9</b> a <b>10</b>).",
      karty: ["cpp"], start: { cpp: program("", "    ") }, vyska: "280px",
      napoveda: "double obsah(double a) { return a * a; }  double obsah(double a, double b) { return a * b; }", riesenie: { cpp: program("double obsah(double a) {\n    return a * a;\n}\n\ndouble obsah(double a, double b) {\n    return a * b;\n}", "    cout << obsah(3) << endl;\n    cout << obsah(2, 5) << endl;") },
      kontrola: function (v, kod) { if ((kod.match(/\bobsah\s*\(\s*double/g) || []).length < 2) return "Vytvor dve funkcie obsah s parametrami typu double."; return r(v).join("|") === "9|10" ? null : "Výstup má byť 9 a 10."; },
      vysvetlenie: "Jedno meno, dve verzie." },
  ] };

  var L5 = { id: "cpp-4-5", nazov: "Rekurzia", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Funkcia volá samu seba",
      text: "<p><b>Rekurzia</b> rieši problém pomocou menšieho problému toho istého druhu. Potrebuje <b>základný prípad</b>, kde sa zastaví:</p>" + UKAZ("long long faktorial(int n) {\n    if (n <= 1) return 1;          // základný prípad\n    return n * faktorial(n - 1);   // menší problém\n}\n\nint main() {\n    cout << faktorial(5) << endl;\n    return 0;\n}", "120"),
      podrobne: "<p>faktorial(5) = 5 × faktorial(4) = 5 × 4 × faktorial(3) … až po faktorial(1) = 1. Bez základného prípadu by sa funkcia volala donekonečna a program by spadol (preplnenie zásobníka, <i>stack overflow</i>).</p>" },
    { typ: "volba", otazka: "Čo sa stane, keď rekurzívna funkcia nemá základný prípad?", moznosti: ["Volá sa donekonečna a program spadne", "Vráti 0", "Prekladač to opraví", "Zavolá sa len raz"], spravna: 0, vysvetlenie: "Zásobník sa preplní." },
    { typ: "volba", otazka: "Čo vráti <code>f(3)</code>?", kod: "int f(int n) {\n    if (n == 0) return 0;\n    return n + f(n - 1);\n}", moznosti: ["6", "3", "0", "nekonečno"], spravna: 0, vysvetlenie: "3 + 2 + 1 + 0." },
    { typ: "kod", zadanie: "Napíš rekurzívnu funkciu <code>long long fib(int n)</code>, ktorá vráti n-té Fibonacciho číslo: fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2). Vypíš fib(0) až fib(10) oddelené medzerou: <b>0 1 1 2 3 5 8 13 21 34 55</b>.",
      karty: ["cpp"], start: { cpp: program("", "    ") }, vyska: "280px",
      napoveda: "long long fib(int n) { if (n < 2) return n; return fib(n - 1) + fib(n - 2); }", riesenie: { cpp: program("long long fib(int n) {\n    if (n < 2) return n;\n    return fib(n - 1) + fib(n - 2);\n}", '    for (int i = 0; i <= 10; i++) {\n        cout << fib(i);\n        if (i < 10) cout << " ";\n    }\n    cout << endl;') },
      kontrola: function (v, kod) {
        var m = /fib\s*\(\s*int\s+\w+\s*\)\s*\{([\s\S]*?)\n\}/.exec(kod);
        if (!m || !/fib\s*\(/.test(m[1])) return "Funkcia fib má volať samu seba (rekurzia).";
        return r(v)[0] === "0 1 1 2 3 5 8 13 21 34 55" ? null : "Výstup má byť 0 1 1 2 3 5 8 13 21 34 55.";
      },
      vysvetlenie: "Pekné, ale pre veľké n pomalé. Rýchlejšie je to cyklom." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li>Funkcie, <code>void</code> a návratové typy.</li><li>Parametre a <code>return</code>.</li><li>Odovzdanie hodnotou a referenciou <code>&amp;</code>.</li><li>Preťaženie a predvolené parametre.</li><li>Rekurzia so základným prípadom.</li></ul>", tip: "Ďalej polia, vektory a reťazce: ako pracovať s veľa údajmi naraz." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "cpp-4-1", otazka: "Kam patrí funkcia, ak nemá deklaráciu?", moznosti: ["Nad main", "Pod main", "Do main", "Do iného súboru"], spravna: 0, vysvetlenie: "Prekladač ju musí poznať skôr, ako ju použiješ." },
    { typ: "volba", lekcia: "cpp-4-2", otazka: "Čo chýba vo funkcii <code>int dvakrat(int x) { x * 2; }</code>?", moznosti: ["return", "void", "cout", "Nič"], spravna: 0, vysvetlenie: "return x * 2;" },
    { typ: "volba", lekcia: "cpp-4-2", otazka: "Aký typ vracia <code>bool jeKladne(int n)</code>?", moznosti: ["true alebo false", "číslo", "text", "nič"], spravna: 0, vysvetlenie: "bool." },
    { typ: "volba", lekcia: "cpp-4-3", otazka: "Čo spraví <code>&amp;</code> v <code>void f(int&amp; x)</code>?", moznosti: ["Funkcia pracuje s originálnou premennou", "Vytvorí kópiu", "Zakáže zmenu", "Nič"], spravna: 0, vysvetlenie: "Referencia." },
    { typ: "volba", lekcia: "cpp-4-3", otazka: "Prečo sa píše <code>const string&amp; text</code>?", moznosti: ["Nekopíruje sa a funkcia ho nemôže zmeniť", "Text bude kratší", "Je to povinné pre string", "Kvôli diakritike"], spravna: 0, vysvetlenie: "Rýchle a bezpečné." },
    { typ: "volba", lekcia: "cpp-4-4", otazka: "Čo je preťaženie funkcie?", moznosti: ["Viac funkcií s rovnakým menom a inými parametrami", "Funkcia s príliš veľa riadkami", "Rekurzia", "Volanie v cykle"], spravna: 0, vysvetlenie: "Overloading." },
    { typ: "volba", lekcia: "cpp-4-5", otazka: "Čo musí mať každá rekurzívna funkcia?", moznosti: ["Základný prípad, kde sa zastaví", "Cyklus", "Parameter typu double", "void"], spravna: 0, vysvetlenie: "Inak nekonečné volanie." },
    { typ: "doplnenie", lekcia: "cpp-4-2", otazka: "Doplň funkciu:", sablona: "[[0]] priemer(int a, int b) {\n    [[1]] (a + b) / 2.0;\n}", zetony: ["double", "return", "void", "cout", "int"], spravne: ["double", "return"], vysvetlenie: "double … return …" },
  ];

  K.registrujModul("cpp", { cislo: 4, nazov: "Funkcie", popis: "void a návratové typy, parametre, referencie, preťaženie a rekurzia.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("cpp", [
    { kat: "Funkcie", znak: "void", nazov: "Nič nevracia", popis: "Návratový typ funkcie bez výsledku." },
    { kat: "Funkcie", znak: "return", nazov: "Vráť hodnotu", popis: "Ukončí funkciu a vráti výsledok.", priklad: "int stvorec(int x) {\n    return x * x;\n}" },
    { kat: "Funkcie", znak: "int& x", nazov: "Referencia", popis: "Parameter, ktorý pracuje s originálom." },
    { kat: "Funkcie", znak: "const T&", nazov: "Konštantná referencia", popis: "Bez kopírovania a bez možnosti zmeny." },
  ]);
})();
