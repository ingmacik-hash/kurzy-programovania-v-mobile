/* C · Modul 2 · Premenné a vstup */
(function () {
  var P = K.pom, MONO = P.MONO;
  var KOD = function (t) { return P.kod(t, "c"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "c", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "#include <stdio.h>\n\nint main(void) {\n" + telo + "\n    return 0;\n}"; }

  var L1 = { id: "c-2-1", nazov: "Premenné", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Krabička s typom",
      text: "<p>Premenná je miesto v pamäti s menom a <b>typom</b>. Typ určí, aké hodnoty v nej môžu byť:</p>" + UKAZ('int vek = 15;\nvek = vek + 1;\nprintf("Vek: %d\\n", vek);', "Vek: 16"),
      podrobne: "<p>Premenná bez počiatočnej hodnoty (<code>int x;</code>) obsahuje náhodný „odpad“ z pamäte. V C sa to stáva často, preto premenné vždy inicializuj.</p><p>Meno: písmená, číslice a <code>_</code>, nesmie začínať číslicou, bez diakritiky. Veľké a malé písmená sa rozlišujú.</p>" },
    { typ: "volba", otazka: "Akú hodnotu má <code>int x;</code> hneď po vytvorení?", moznosti: ["Nepredvídateľnú", "0", "NULL", "chyba prekladu"], spravna: 0, vysvetlenie: "Preto vždy píš int x = 0;" },
    { typ: "kod", zadanie: "Vytvor premennú <code>int body = 20;</code>, zvýš ju o 5 a vypíš <b>Body: 25</b>.",
      karty: ["c"], start: { c: kostra("    ") }, vyska: "200px",
      napoveda: 'int body = 20;\nbody = body + 5;\nprintf("Body: %d\\n", body);', riesenie: { c: kostra('    int body = 20;\n    body = body + 5;\n    printf("Body: %d\\n", body);') },
      kontrola: function (v, kod) { if (!/int\s+body/.test(kod)) return "Vytvor premennú int body."; return r(v)[0] === "Body: 25" ? null : "Výstup má byť Body: 25"; },
      vysvetlenie: "%d vypíše hodnotu premennej." },
  ] };

  var L2 = { id: "c-2-2", nazov: "Typy a formáty", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Základné typy a ich formáty",
      text: P.tabulka(["Typ", "Hodnoty", "printf"], [["<code>int</code>", "celé číslo", "<code>%d</code>"], ["<code>double</code>", "desatinné číslo", "<code>%f</code>, <code>%.2f</code>"], ["<code>char</code>", "jeden znak, v apostrofoch", "<code>%c</code>"], ["<code>long long</code>", "veľké celé číslo", "<code>%lld</code>"]]) +
        UKAZ("double cena = 4.5;\nchar znamka = 'A';\nprintf(\"%f\\n\", cena);\nprintf(\"%.2f €\\n\", cena);\nprintf(\"Známka %c\\n\", znamka);", "4.500000\n4.50 €\nZnámka A"),
      podrobne: "<p><code>%.2f</code> vypíše číslo na 2 desatinné miesta. Zlý formát (napr. <code>%d</code> pre double) vypíše nezmysel, prekladač na to len upozorní varovaním.</p><p>C nemá typ string. Text je pole znakov, o tom v module 5.</p>" },
    { typ: "volba", otazka: "Ktorý formát použiješ pre <code>double</code> na 1 desatinné miesto?", moznosti: ["<code>%.1f</code>", "<code>%d</code>", "<code>%1d</code>", "<code>%c</code>"], spravna: 0, vysvetlenie: "%.1f" },
    { typ: "volba", otazka: "Čo je <code>'A'</code>?", moznosti: ["char (jeden znak)", "text (string)", "int", "chyba"], spravna: 0, vysvetlenie: "Apostrofy = jeden znak." },
    { typ: "kod", zadanie: "Vytvor <code>double</code> premenné <code>dlzka = 2.5</code> a <code>sirka = 4.2</code> a vypíš obsah obdĺžnika na 2 desatinné miesta: <b>Obsah: 10.50</b>.",
      karty: ["c"], start: { c: kostra("    ") }, vyska: "200px",
      napoveda: 'printf("Obsah: %.2f\\n", dlzka * sirka);', riesenie: { c: kostra('    double dlzka = 2.5;\n    double sirka = 4.2;\n    printf("Obsah: %.2f\\n", dlzka * sirka);') },
      kontrola: function (v, kod) { if (!/double/.test(kod)) return "Použi typ double."; return r(v)[0] === "Obsah: 10.50" ? null : "Výstup má byť Obsah: 10.50 (formát %.2f)."; },
      vysvetlenie: "%.2f zaokrúhli na 2 miesta." },
  ] };

  var L3 = { id: "c-2-3", nazov: "Vstup cez scanf", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Čítanie od používateľa",
      text: "<p><code>scanf</code> načíta hodnotu do premennej. Pozor: pred meno premennej patrí <b>&amp;</b> (adresa premennej):</p>" + UKAZ('int vek;\nprintf("Koľko máš rokov? ");\nscanf("%d", &vek);\nprintf("O rok budeš mať %d.\\n", vek + 1);', "Koľko máš rokov? 15\nO rok budeš mať 16."),
      podrobne: "<p>scanf potrebuje vedieť, <b>kam</b> má hodnotu zapísať, preto dostane adresu <code>&amp;vek</code>. Pre double sa v scanf používa <code>%lf</code> (v printf stačí %f). Viac čísel naraz: <code>scanf(\"%d %d\", &amp;a, &amp;b);</code>.</p>" },
    { typ: "volba", otazka: "Čo chýba?", kod: 'int x;\nscanf("%d", x);', moznosti: ["& pred x", "Bodkočiarka", "printf", "Nič"], spravna: 0, vysvetlenie: "scanf(\"%d\", &x);" },
    { typ: "volba", otazka: "Ktorý formát použiješ v scanf pre double?", moznosti: ["<code>%lf</code>", "<code>%d</code>", "<code>%f</code> je jediná možnosť", "<code>%c</code>"], spravna: 0, vysvetlenie: "scanf: %lf, printf: %f." },
    { typ: "kod", zadanie: "Načítaj dve celé čísla (vstup je pripravený: <b>7 5</b>) a vypíš <b>7 + 5 = 12</b>.",
      karty: ["c"], vstup: "7 5", start: { c: kostra("    int a, b;\n    ") }, vyska: "210px",
      napoveda: 'scanf("%d %d", &a, &b);\nprintf("%d + %d = %d\\n", a, b, a + b);', riesenie: { c: kostra('    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d + %d = %d\\n", a, b, a + b);') },
      kontrola: function (v, kod) { if (!/scanf/.test(kod)) return "Načítaj čísla cez scanf."; return r(v)[0] === "7 + 5 = 12" ? null : "Výstup má byť 7 + 5 = 12."; },
      vysvetlenie: "Zmeň vstup a spusti znova." },
  ] };

  var L4 = { id: "c-2-4", nazov: "Pozor na delenie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "int / int = int",
      text: "<p>Delenie dvoch celých čísel je vždy celé číslo. Aby vyšlo desatinné, aspoň jedno číslo musí byť double:</p>" + UKAZ('int a = 7, b = 2;\nprintf("%d\\n", a / b);\nprintf("%.1f\\n", a / 2.0);\nprintf("%.1f\\n", (double)a / b);', "3\n3.5\n3.5"),
      podrobne: "<p><code>(double)a</code> je <b>pretypovanie</b>: hodnotu a dočasne berie ako double. Častá chyba je <code>(double)(a / b)</code>: tu sa najprv celočíselne vydelí (3) a až potom prevedie na 3.0.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>printf(\"%.2f\", (double)(9 / 2));</code>?", moznosti: ["4.00", "4.50", "4.5", "chyba"], spravna: 0, vysvetlenie: "9 / 2 = 4 ešte pred pretypovaním." },
    { typ: "kod", zadanie: "Načítaj počet bodov a počet otázok (vstup <b>17 20</b>) a vypíš úspešnosť v percentách na 1 desatinné miesto: <b>Úspešnosť: 85.0 %</b>. Na vypísanie znaku % v printf použi <code>%%</code>.",
      karty: ["c"], vstup: "17 20", start: { c: kostra("    int body, otazky;\n    scanf(\"%d %d\", &body, &otazky);\n    ") }, vyska: "220px",
      napoveda: 'printf("Úspešnosť: %.1f %%\\n", (double)body / otazky * 100);', riesenie: { c: kostra('    int body, otazky;\n    scanf("%d %d", &body, &otazky);\n    printf("Úspešnosť: %.1f %%\\n", (double)body / otazky * 100);') },
      kontrola: function (v) { return r(v)[0] === "Úspešnosť: 85.0 %" ? null : "Výstup má byť Úspešnosť: 85.0 % (teraz: " + (r(v)[0] || "nič") + "). Pozor na celočíselné delenie."; },
      vysvetlenie: "Bez pretypovania by vyšlo 0.0 %." },
  ] };

  var L5 = { id: "c-2-5", nazov: "Konštanty a skratky", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "const a #define",
      text: KOD("const double PI = 3.14159;   // nedá sa zmeniť\n#define DPH 20               // náhrada textu pred prekladom\n\nint x = 5;\nx += 3;   // x = x + 3  → 8\nx *= 2;   // x = x * 2  → 16\nx++;      // x = x + 1  → 17\nx--;      // x = x - 1  → 16"),
      podrobne: "<p><code>#define</code> je príkaz preprocesora: pred prekladom nahradí každé DPH textom 20. <code>const</code> je skutočná premenná, ktorú prekladač chráni pred zmenou. V modernom C sa odporúča const.</p>" },
    { typ: "volba", otazka: "Akú hodnotu má x?", kod: "int x = 10;\nx -= 3;\nx *= 2;", moznosti: ["14", "17", "4", "20"], spravna: 0, vysvetlenie: "10 − 3 = 7, 7 × 2 = 14." },
    { typ: "kod", zadanie: "Načítaj polomer kruhu (vstup <b>3</b>) ako double (<code>%lf</code>). S konštantou <code>const double PI = 3.14159;</code> vypíš obsah na 2 desatinné miesta: <b>Obsah: 28.27</b>.",
      karty: ["c"], vstup: "3", start: { c: kostra("    ") }, vyska: "220px",
      napoveda: 'const double PI = 3.14159;\ndouble r;\nscanf("%lf", &r);\nprintf("Obsah: %.2f\\n", PI * r * r);', riesenie: { c: kostra('    const double PI = 3.14159;\n    double r;\n    scanf("%lf", &r);\n    printf("Obsah: %.2f\\n", PI * r * r);') },
      kontrola: function (v, kod) { if (!/const\s+double\s+PI/.test(kod)) return "Vytvor konštantu const double PI."; return r(v)[0] === "Obsah: 28.27" ? null : "Výstup má byť Obsah: 28.27"; },
      vysvetlenie: "Konštanty robia kód čitateľnejším." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li>Premenné <code>int</code>, <code>double</code>, <code>char</code>.</li><li>Formáty <code>%d</code>, <code>%f</code>, <code>%.2f</code>, <code>%c</code>.</li><li><code>scanf</code> s <code>&amp;</code> a <code>%lf</code> pre double.</li><li>Celočíselné delenie a pretypovanie.</li><li><code>const</code>, <code>#define</code>, <code>+=</code>, <code>++</code>.</li></ul>", tip: "Ďalej podmienky a cykly." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "c-2-1", otazka: "Ktorý zápis vytvorí celočíselnú premennú?", moznosti: ["<code>int pocet = 3;</code>", "<code>pocet = 3;</code> bez typu", "<code>var pocet = 3;</code>", "<code>integer pocet = 3;</code>"], spravna: 0, vysvetlenie: "Typ, meno, hodnota." },
    { typ: "volba", lekcia: "c-2-2", otazka: "Ktorý formát vypíše znak?", moznosti: ["<code>%c</code>", "<code>%s</code>", "<code>%d</code>", "<code>%z</code>"], spravna: 0, vysvetlenie: "%c = char." },
    { typ: "volba", lekcia: "c-2-2", otazka: "Čo vypíše <code>printf(\"%.1f\", 2.36);</code>?", moznosti: ["2.4", "2.3", "2.36", "2"], spravna: 0, vysvetlenie: "Zaokrúhli na 1 miesto." },
    { typ: "volba", lekcia: "c-2-3", otazka: "Prečo sa v scanf píše <code>&amp;x</code>?", moznosti: ["scanf potrebuje adresu, kam má hodnotu zapísať", "Je to and", "Kvôli rýchlosti", "Netreba"], spravna: 0, vysvetlenie: "& = adresa premennej." },
    { typ: "volba", lekcia: "c-2-4", otazka: "Čo vypíše <code>printf(\"%d\", 5 / 2);</code>?", moznosti: ["2", "2.5", "3", "chyba"], spravna: 0, vysvetlenie: "Celočíselné delenie." },
    { typ: "volba", lekcia: "c-2-5", otazka: "Čo spraví <code>x++</code>?", moznosti: ["Zvýši x o 1", "Zdvojnásobí x", "Vypíše x", "Nič"], spravna: 0, vysvetlenie: "x = x + 1." },
    { typ: "doplnenie", lekcia: "c-2-3", otazka: "Načítaj desatinné číslo:", sablona: 'double v;\nscanf("[[0]]", [[1]]v);', zetony: ["%lf", "&", "%d", "*", "%c"], spravne: ["%lf", "&"], vysvetlenie: "scanf(\"%lf\", &v);" },
  ];

  K.registrujModul("c", { cislo: 2, nazov: "Premenné a vstup", popis: "int, double, char, formáty printf, scanf, delenie a konštanty.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
