/* C · Modul 5 · Reťazce, ukazovatele a struct */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var KOD = function (t) { return P.kod(t, "c"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "c", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function program(funkcie, telo, include) { return "#include <stdio.h>\n" + (include || "") + "\n" + funkcie + (funkcie ? "\n\n" : "") + "int main(void) {\n" + telo + "\n    return 0;\n}"; }

  var OBR_RETAZEC = '<svg viewBox="0 0 340 80" role="img" aria-label="Reťazec je pole znakov ukončené nulovým znakom \\0">' +
    ["A", "h", "o", "j", "\\0"].map(function (z, i) {
      var X = 14 + i * 64, nula = i === 4;
      return '<rect x="' + X + '" y="20" width="58" height="38" rx="6" style="fill:' + (nula ? "var(--surface-2)" : "#3949ab") + ';stroke:#3949ab;stroke-width:2"/><text x="' + (X + 29) + '" y="44" text-anchor="middle" font-size="15" font-weight="700" ' + MONO + ' style="fill:' + (nula ? "#3949ab" : "#fff") + '">' + z + '</text><text x="' + (X + 29) + '" y="74" text-anchor="middle" font-size="11" ' + MONO + ' style="fill:var(--muted)">[' + i + "]</text>";
    }).join("") + '<text x="336" y="14" text-anchor="end" font-size="11" ' + TXT + ' style="fill:var(--muted)">char s[] = "Ahoj";</text></svg>';

  var OBR_UKAZ = '<svg viewBox="0 0 340 96" role="img" aria-label="Ukazovateľ p obsahuje adresu premennej x">' +
    '<rect x="20" y="30" width="110" height="44" rx="8" style="fill:var(--surface-2);stroke:#3949ab;stroke-width:2"/><text x="75" y="57" text-anchor="middle" font-size="13" font-weight="700" ' + MONO + ' style="fill:var(--hl-num)">0x7ffc10</text><text x="75" y="22" text-anchor="middle" font-size="12" ' + MONO + ' style="fill:var(--text)">int *p</text>' +
    '<path d="M132 52h70" style="stroke:#3949ab;stroke-width:2"/><path d="M198 46l8 6-8 6" style="fill:#3949ab"/>' +
    '<rect x="210" y="30" width="110" height="44" rx="8" style="fill:#3949ab"/><text x="265" y="58" text-anchor="middle" font-size="16" font-weight="700" ' + MONO + ' fill="#fff">42</text><text x="265" y="22" text-anchor="middle" font-size="12" ' + MONO + ' style="fill:var(--text)">int x</text>' +
    '<text x="265" y="90" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">adresa 0x7ffc10</text></svg>';

  var L1 = { id: "c-5-1", nazov: "Reťazce", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Text je pole znakov",
      text: "<p>C nemá typ string. Text je pole znakov <code>char</code>, ktoré končí špeciálnym znakom <code>'\\0'</code> (nula):</p>", obr: OBR_RETAZEC,
      podrobne: UKAZ('char meno[20] = "Jana";\nprintf("%s\\n", meno);\nprintf("Prvé písmeno: %c\\n", meno[0]);\nscanf("%19s", meno);   // načíta jedno slovo', "Jana\nPrvé písmeno: J") + "<p>Formát <code>%s</code> vypisuje a načítava reťazce. Pri scanf s reťazcom <b>netreba &amp;</b>, meno poľa už je adresa. <code>%19s</code> obmedzí dĺžku, aby sa text zmestil do poľa (20 vrátane \\0).</p>" },
    { typ: "volba", otazka: "Koľko bajtov potrebuje text <code>\"Ahoj\"</code>?", moznosti: ["5 (4 znaky + \\0)", "4", "8", "1"], spravna: 0, vysvetlenie: "Ukončovací znak \\0 zaberá miesto." },
    { typ: "kod", zadanie: "Načítaj slovo (vstup <b>programovanie</b>) a vypíš jeho prvé a posledné písmeno a dĺžku (spočítaj cyklom, kým nenarazíš na <code>'\\0'</code>): <b>p e 13</b>.",
      karty: ["c"], vstup: "programovanie", start: { c: program("", '    char s[100];\n    scanf("%99s", s);\n    ') }, vyska: "260px",
      napoveda: "int n = 0; while (s[n] != '\\0') n++;  printf(\"%c %c %d\\n\", s[0], s[n - 1], n);", riesenie: { c: program("", "    char s[100];\n    scanf(\"%99s\", s);\n    int n = 0;\n    while (s[n] != '\\0') n++;\n    printf(\"%c %c %d\\n\", s[0], s[n - 1], n);") },
      kontrola: function (v, kod) { if (/strlen/.test(kod)) return "Tentoraz dĺžku spočítaj sám cyklom (strlen príde v ďalšej lekcii)."; return r(v)[0] === "p e 13" ? null : "Výstup má byť p e 13."; },
      vysvetlenie: "Presne takto pracuje strlen." },
  ] };

  var L2 = { id: "c-5-2", nazov: "string.h", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Funkcie na reťazce",
      text: P.tabulka(["Funkcia", "Čo spraví"], [["<code>strlen(s)</code>", "dĺžka (bez \\0)"], ["<code>strcpy(cie, zdroj)</code>", "skopíruje text"], ["<code>strcat(cie, zdroj)</code>", "pripojí text na koniec"], ["<code>strcmp(a, b)</code>", "porovná: 0 = rovnaké"], ["<code>toupper(c)</code>", "veľké písmeno (ctype.h)"]]),
      podrobne: "<p>Reťazce sa <b>nedajú</b> porovnávať cez <code>==</code> ani priraďovať cez <code>=</code>. <code>a == b</code> porovná adresy, nie text. Na to sú strcmp a strcpy. Cieľové pole musí byť dosť veľké, inak strcpy a strcat prepíšu cudziu pamäť.</p>" },
    { typ: "volba", otazka: "Ako zistíš, či sú reťazce <code>a</code> a <code>b</code> rovnaké?", moznosti: ["<code>strcmp(a, b) == 0</code>", "<code>a == b</code>", "<code>a.equals(b)</code>", "<code>strlen(a) == strlen(b)</code>"], spravna: 0, vysvetlenie: "== porovná adresy." },
    { typ: "kod", zadanie: "Načítaj heslo (vstup <b>tajne123</b>). Ak je rovnaké ako <code>\"tajne123\"</code>, vypíš <b>Prístup povolený</b>, inak <b>Zlé heslo</b>. Na druhý riadok vypíš <b>Dĺžka: 8</b>.",
      karty: ["c"], vstup: "tajne123", start: { c: program("", '    char heslo[50];\n    scanf("%49s", heslo);\n    ', "#include <string.h>\n") }, vyska: "280px",
      napoveda: 'if (strcmp(heslo, "tajne123") == 0) … ; printf("Dĺžka: %d\\n", (int)strlen(heslo));', riesenie: { c: program("", '    char heslo[50];\n    scanf("%49s", heslo);\n    if (strcmp(heslo, "tajne123") == 0) {\n        printf("Prístup povolený\\n");\n    } else {\n        printf("Zlé heslo\\n");\n    }\n    printf("Dĺžka: %d\\n", (int)strlen(heslo));', "#include <string.h>\n") },
      kontrola: function (v, kod) { if (!/strcmp/.test(kod)) return "Porovnaj texty cez strcmp."; return r(v).join("|") === "Prístup povolený|Dĺžka: 8" ? null : "Výstup má byť Prístup povolený a Dĺžka: 8."; },
      vysvetlenie: "strlen vracia size_t, preto (int) pri %d." },
  ] };

  var L3 = { id: "c-5-3", nazov: "Ukazovatele", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Premenná s adresou",
      text: "<p><b>Ukazovateľ</b> (pointer) je premenná, ktorá obsahuje <b>adresu</b> inej premennej. <code>&amp;x</code> dá adresu x, <code>*p</code> dá hodnotu na adrese p:</p>", obr: OBR_UKAZ,
      podrobne: UKAZ('int x = 42;\nint *p = &x;\nprintf("%d\\n", *p);\n*p = 100;\nprintf("%d\\n", x);', "42\n100") + "<p>Cez ukazovateľ môžeš meniť premennú, ktorá „patrí“ niekomu inému. Presne to robí scanf, keď mu dáš <code>&amp;vek</code>.</p>" },
    { typ: "vyklad", nadpis: "Funkcia, ktorá zmení premennú",
      text: UKAZ('void vymen(int *a, int *b) {\n    int pom = *a;\n    *a = *b;\n    *b = pom;\n}\n\nint main(void) {\n    int x = 1, y = 2;\n    vymen(&x, &y);\n    printf("%d %d\\n", x, y);\n    return 0;\n}', "2 1"),
      podrobne: "<p>Ukazovateľ, ktorý neukazuje nikam, má hodnotu <code>NULL</code>. Prístup cez NULL alebo cez neplatnú adresu program zhodí (segmentation fault). To je najznámejšia chyba v C.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: "int a = 5;\nint *p = &a;\n*p = *p + 1;\nprintf(\"%d\", a);", moznosti: ["6", "5", "adresu", "chybu"], spravna: 0, vysvetlenie: "Cez p sa zmenilo a." },
    { typ: "kod", zadanie: "Napíš funkciu <code>void delenie(int a, int b, int *podiel, int *zvysok)</code>, ktorá cez ukazovatele vráti podiel aj zvyšok. V main pre vstup <b>17 5</b> vypíš <b>17 = 3 * 5 + 2</b>.",
      karty: ["c"], vstup: "17 5", start: { c: program("", '    int a, b, p, z;\n    scanf("%d %d", &a, &b);\n    ') }, vyska: "300px",
      napoveda: "void delenie(int a, int b, int *podiel, int *zvysok) { *podiel = a / b; *zvysok = a % b; }  volanie: delenie(a, b, &p, &z);", riesenie: { c: program("void delenie(int a, int b, int *podiel, int *zvysok) {\n    *podiel = a / b;\n    *zvysok = a % b;\n}", '    int a, b, p, z;\n    scanf("%d %d", &a, &b);\n    delenie(a, b, &p, &z);\n    printf("%d = %d * %d + %d\\n", a, p, b, z);') },
      kontrola: function (v, kod) { if (!/int\s*\*\s*\w+/.test(kod) || !/void\s+delenie/.test(kod)) return "Napíš funkciu void delenie s parametrami int *podiel a int *zvysok."; return r(v)[0] === "17 = 3 * 5 + 2" ? null : "Výstup má byť 17 = 3 * 5 + 2."; },
      vysvetlenie: "Dva výsledky z jednej funkcie vďaka ukazovateľom." },
  ] };

  var L4 = { id: "c-5-4", nazov: "struct", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Vlastný typ",
      text: "<p><code>struct</code> spojí viac údajov do jedného typu:</p>" + UKAZ('struct Ziak {\n    char meno[30];\n    int body;\n};\n\nint main(void) {\n    struct Ziak z = {"Jana", 87};\n    z.body += 5;\n    printf("%s: %d\\n", z.meno, z.body);\n    return 0;\n}', "Jana: 92"),
      podrobne: "<p>Cez <code>typedef struct { … } Ziak;</code> môžeš potom písať len <code>Ziak z;</code> bez slova struct. Ak máš ukazovateľ na struct, k položke sa dostaneš šípkou: <code>p-&gt;body</code> (to isté ako <code>(*p).body</code>).</p>" },
    { typ: "volba", otazka: "Ako sa dostaneš k položke <code>body</code> cez ukazovateľ <code>p</code> na struct?", moznosti: ["<code>p-&gt;body</code>", "<code>p.body</code>", "<code>*p.body</code>", "<code>p[body]</code>"], spravna: 0, vysvetlenie: "Šípka = (*p).body" },
    { typ: "kod", zadanie: "Vytvor <code>struct Bod { double x; double y; };</code> a načítaj dva body (vstup <b>1 2 4 6</b>). Vypíš ich vzdialenosť na 2 desatinné miesta: <b>Vzdialenosť: 5.00</b>.",
      karty: ["c"], vstup: "1 2 4 6", start: { c: program("", "    ", "#include <math.h>\n") }, vyska: "300px",
      napoveda: "struct Bod a, b; scanf(\"%lf %lf %lf %lf\", &a.x, &a.y, &b.x, &b.y);  sqrt((b.x-a.x)*(b.x-a.x) + (b.y-a.y)*(b.y-a.y))", riesenie: { c: program("struct Bod {\n    double x;\n    double y;\n};", '    struct Bod a, b;\n    scanf("%lf %lf %lf %lf", &a.x, &a.y, &b.x, &b.y);\n    double dx = b.x - a.x, dy = b.y - a.y;\n    printf("Vzdialenosť: %.2f\\n", sqrt(dx * dx + dy * dy));', "#include <math.h>\n") },
      kontrola: function (v, kod) { if (!/struct\s+Bod/.test(kod)) return "Vytvor struct Bod."; return r(v)[0] === "Vzdialenosť: 5.00" ? null : "Výstup má byť Vzdialenosť: 5.00"; },
      vysvetlenie: "Bod je teraz jeden údaj s dvoma súradnicami." },
  ] };

  var L5 = { id: "c-5-5", nazov: "Pole štruktúr", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Malá databáza",
      text: UKAZ('typedef struct {\n    char nazov[30];\n    double cena;\n} Produkt;\n\nint main(void) {\n    Produkt p[3] = {{"Mys", 19.9}, {"Batoh", 39.0}, {"Hrnek", 8.9}};\n    double spolu = 0;\n    for (int i = 0; i < 3; i++) spolu += p[i].cena;\n    printf("Spolu: %.2f\\n", spolu);\n    return 0;\n}', "Spolu: 67.80"),
      podrobne: "<p>Pole štruktúr je v C základ evidencií: žiaci, produkty, hráči. Rovnaké myšlienky neskôr uvidíš v triedach (C++, Java, C#) aj v tabuľkách databáz (SQL).</p>" },
    { typ: "volba", otazka: "Ako zapíšeš cenu druhého produktu v poli <code>p</code>?", moznosti: ["<code>p[1].cena</code>", "<code>p.cena[1]</code>", "<code>p[2].cena</code>", "<code>cena(p, 1)</code>"], spravna: 0, vysvetlenie: "Index 1 = druhý." },
    { typ: "kod", zadanie: "Na vstupe je počet žiakov a potom pre každého meno a body (vstup je pripravený). Ulož ich do poľa štruktúr a vypíš meno žiaka s najviac bodmi: <b>Najlepší: Eva (92)</b>.",
      karty: ["c"], vstup: "4\nJana 87\nPeter 64\nEva 92\nTomas 75", start: { c: program("typedef struct {\n    char meno[30];\n    int body;\n} Ziak;", "    Ziak z[50];\n    int n;\n    scanf(\"%d\", &n);\n    ") }, vyska: "320px",
      napoveda: "for (i < n) scanf(\"%29s %d\", z[i].meno, &z[i].body);  potom nájdi index s najväčšími bodmi.", riesenie: { c: program("typedef struct {\n    char meno[30];\n    int body;\n} Ziak;", '    Ziak z[50];\n    int n;\n    scanf("%d", &n);\n    for (int i = 0; i < n; i++) {\n        scanf("%29s %d", z[i].meno, &z[i].body);\n    }\n    int best = 0;\n    for (int i = 1; i < n; i++) {\n        if (z[i].body > z[best].body) best = i;\n    }\n    printf("Najlepší: %s (%d)\\n", z[best].meno, z[best].body);') },
      kontrola: function (v, kod) { if (!/\.body/.test(kod)) return "Ukladaj žiakov do poľa štruktúr (z[i].body)."; return r(v)[0] === "Najlepší: Eva (92)" ? null : "Výstup má byť Najlepší: Eva (92)."; },
      vysvetlenie: "Uložíš si index najlepšieho, nie len body." },
    { typ: "vyklad", nadpis: "Kurz C máš za sebou",
      text: "<ul><li>printf, scanf, typy a formáty.</li><li>Podmienky, cykly, funkcie a polia.</li><li>Reťazce ako polia znakov a string.h.</li><li>Ukazovatele, <code>&amp;</code> a <code>*</code>.</li><li><code>struct</code>, <code>typedef</code> a pole štruktúr.</li></ul>", tip: "Po teste ťa čakajú záverečné projekty: štatistika teplôt, šifra a evidencia kníh." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "c-5-1", otazka: "Čím končí každý reťazec v C?", moznosti: ["Znakom '\\0'", "Znakom '\\n'", "Bodkočiarkou", "Ničím"], spravna: 0, vysvetlenie: "Nulový znak." },
    { typ: "volba", lekcia: "c-5-1", otazka: "Ktorý formát vypíše reťazec?", moznosti: ["<code>%s</code>", "<code>%c</code>", "<code>%d</code>", "<code>%t</code>"], spravna: 0, vysvetlenie: "%s = string." },
    { typ: "volba", lekcia: "c-5-2", otazka: "Čo vráti <code>strlen(\"Ahoj\")</code>?", moznosti: ["4", "5", "3", "0"], spravna: 0, vysvetlenie: "\\0 sa nepočíta." },
    { typ: "volba", lekcia: "c-5-2", otazka: "Prečo nefunguje <code>if (a == \"ano\")</code>?", moznosti: ["Porovnáva adresy, nie text; treba strcmp", "Chýba bodkočiarka", "\"ano\" je zle", "Funguje"], spravna: 0, vysvetlenie: "strcmp(a, \"ano\") == 0" },
    { typ: "volba", lekcia: "c-5-3", otazka: "Čo je <code>&amp;x</code>?", moznosti: ["Adresa premennej x", "Hodnota x", "x a ešte niečo", "Ukazovateľ na ukazovateľ"], spravna: 0, vysvetlenie: "& = adresa." },
    { typ: "volba", lekcia: "c-5-3", otazka: "Čo spraví <code>*p = 0;</code>?", moznosti: ["Zapíše 0 do premennej, na ktorú ukazuje p", "Vynuluje ukazovateľ", "Zmaže p", "Chyba"], spravna: 0, vysvetlenie: "* = hodnota na adrese." },
    { typ: "volba", lekcia: "c-5-4", otazka: "Na čo slúži <code>typedef</code>?", moznosti: ["Dá typu nové, kratšie meno", "Vytvorí premennú", "Vymaže struct", "Je to komentár"], spravna: 0, vysvetlenie: "typedef struct {…} Ziak;" },
    { typ: "doplnenie", lekcia: "c-5-3", otazka: "Funkcia zvýši premennú cez ukazovateľ:", sablona: "void zvys(int [[0]]x) {\n    ([[1]]x)++;\n}\n// volanie: zvys([[2]]a);", zetony: ["*", "*", "&", "#", "%"], spravne: ["*", "*", "&"], vysvetlenie: "Parameter int *x, (*x)++, volanie zvys(&a)." },
  ];

  K.registrujModul("c", { cislo: 5, nazov: "Reťazce, ukazovatele a struct", popis: "Polia znakov, string.h, ukazovatele, struct a pole štruktúr.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("c", [
    { kat: "Kostra", znak: "#include <stdio.h>", nazov: "Knižnica vstupu a výstupu", popis: "printf, scanf." },
    { kat: "Kostra", znak: "int main(void)", nazov: "Hlavná funkcia", popis: "Tu program začína. return 0 = bez chyby." },
    { kat: "Znaky", znak: ";", nazov: "Bodkočiarka", popis: "Koniec príkazu." },
    { kat: "Znaky", znak: "{ }", nazov: "Blok", popis: "Kód patriaci k funkcii, if alebo cyklu." },
    { kat: "Znaky", znak: "// /* */", nazov: "Komentár", popis: "Prekladač ho ignoruje." },
    { kat: "Znaky", znak: "\\n", nazov: "Nový riadok", popis: "printf ho nepridá sám." },
    { kat: "Výstup", znak: "printf", nazov: "Výpis", popis: "%d celé, %f desatinné, %.2f na 2 miesta, %c znak, %s text, %% percento.", priklad: 'printf("%d + %d = %d\\n", a, b, a + b);' },
    { kat: "Výstup", znak: "scanf", nazov: "Načítanie", popis: "Pred premennú &, pre double %lf, pre text bez &.", priklad: 'scanf("%d", &vek);' },
    { kat: "Typy", znak: "int / double / char", nazov: "Základné typy", popis: "Celé číslo, desatinné číslo, jeden znak." },
    { kat: "Typy", znak: "(double)x", nazov: "Pretypovanie", popis: "Dočasne zmení typ, napr. pre presné delenie." },
    { kat: "Typy", znak: "const", nazov: "Konštanta", popis: "Hodnota sa nedá zmeniť." },
    { kat: "Riadenie", znak: "if / else", nazov: "Podmienka", popis: "Nenulové = pravda." },
    { kat: "Riadenie", znak: "switch / case", nazov: "Voľba", popis: "Nezabudni na break." },
    { kat: "Riadenie", znak: "for / while", nazov: "Cykly", popis: "do-while prebehne aspoň raz." },
    { kat: "Polia", znak: "int a[n]", nazov: "Pole", popis: "Indexy 0 až n-1, hranice sa nekontrolujú." },
    { kat: "Polia", znak: "char s[]", nazov: "Reťazec", popis: "Pole znakov ukončené '\\0'." },
    { kat: "Polia", znak: "strlen / strcmp / strcpy", nazov: "string.h", popis: "Dĺžka, porovnanie (0 = rovnaké), kopírovanie." },
    { kat: "Pamäť", znak: "&x", nazov: "Adresa", popis: "Kde v pamäti je premenná x." },
    { kat: "Pamäť", znak: "int *p", nazov: "Ukazovateľ", popis: "Premenná s adresou. *p = hodnota na adrese." },
    { kat: "Pamäť", znak: "NULL", nazov: "Prázdny ukazovateľ", popis: "Neukazuje nikam." },
    { kat: "Typy", znak: "struct", nazov: "Štruktúra", popis: "Vlastný typ z viacerých položiek. p->x pri ukazovateli." },
  ]);
})();
