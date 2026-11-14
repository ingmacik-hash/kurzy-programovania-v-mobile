/* C · Modul 1 · Prvý program */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var KOD = function (t) { return P.kod(t, "c"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "c", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "#include <stdio.h>\n\nint main(void) {\n" + telo + "\n    return 0;\n}"; }

  var OBR_PREKLAD = '<svg viewBox="0 0 340 92" role="img" aria-label="Zdrojový kód v C preloží prekladač na strojový kód, ktorý procesor priamo vykoná">' +
    [["program.c", "zdrojový kód", "var(--surface-2)", "var(--text)"], ["gcc", "prekladač", "#3949ab", "#fff"], ["program", "strojový kód", "var(--surface-2)", "var(--text)"]].map(function (x, i) {
      var X = 8 + i * 116;
      return '<rect x="' + X + '" y="14" width="96" height="48" rx="10" style="fill:' + x[2] + ';stroke:#3949ab;stroke-width:2"/><text x="' + (X + 48) + '" y="38" text-anchor="middle" font-size="12.5" font-weight="700" ' + MONO + ' style="fill:' + x[3] + '">' + x[0] + '</text><text x="' + (X + 48) + '" y="80" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">' + x[1] + "</text>" +
        (i < 2 ? '<path d="M' + (X + 98) + ' 38h14" style="stroke:var(--muted);stroke-width:2"/><path d="M' + (X + 108) + ' 33l6 5-6 5" style="fill:var(--muted)"/>' : "");
    }).join("") + "</svg>";

  var L1 = { id: "c-1-1", nazov: "Ahoj, C!", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Najstarší z veľkých jazykov",
      text: "<p>Jazyk C vznikol v roku 1972 a dodnes v ňom beží jadro Linuxu, Windowsu aj Androidu. Program v C sa najprv <b>preloží</b> do strojového kódu a až potom spustí:</p>", obr: OBR_PREKLAD,
      podrobne: "<p>Prekladač (kompilátor) skontroluje celý program ešte pred spustením. Ak nájde chybu, program sa vôbec nespustí. V tejto aplikácii sa C prekladá na internete, preto potrebuješ dáta alebo Wi-Fi.</p>" },
    { typ: "vyklad", nadpis: "Prvý program",
      text: UKAZ('#include <stdio.h>\n\nint main(void) {\n    printf("Ahoj, svet!\\n");\n    return 0;\n}', "Ahoj, svet!"),
      podrobne: "<ul><li><code>#include &lt;stdio.h&gt;</code> pripojí knižnicu pre vstup a výstup (standard input/output).</li><li><code>int main(void)</code> je hlavná funkcia, tu program začína.</li><li><code>printf</code> vypíše text. <code>\\n</code> znamená nový riadok.</li><li><code>return 0;</code> oznámi, že program skončil bez chyby.</li><li>Každý príkaz končí <b>bodkočiarkou</b>.</li></ul>" },
    { typ: "volba", otazka: "Kde program v C začína?", moznosti: ["Vo funkcii <code>main</code>", "Na prvom riadku súboru", "Pri <code>#include</code>", "Pri <code>printf</code>"], spravna: 0, vysvetlenie: "main je vstupný bod programu." },
    { typ: "poradie", otazka: "Zoraď kostru programu:", riadky: ["#include <stdio.h>", "int main(void) {", '    printf("Ahoj");', "    return 0;", "}"], vysvetlenie: "include, main, príkazy, return, zátvorka." },
    { typ: "kod", zadanie: "Uprav program, aby vypísal <b>Učím sa C</b>.",
      karty: ["c"], start: { c: kostra('    printf("Ahoj, svet!\\n");') }, vyska: "190px",
      napoveda: 'printf("Učím sa C\\n");', riesenie: { c: kostra('    printf("Učím sa C\\n");') },
      kontrola: function (v) { return r(v)[0] === "Učím sa C" ? null : "Výstup má byť presne: Učím sa C"; },
      vysvetlenie: "Prvý program v C je na svete." },
  ] };

  var L2 = { id: "c-1-2", nazov: "printf a nové riadky", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "printf nepridá nový riadok sám",
      text: "<p>Na rozdiel od Pythonu <code>printf</code> nový riadok nepridá. Musíš ho napísať: <code>\\n</code>.</p>" + UKAZ('printf("Jeden ");\nprintf("riadok\\n");\nprintf("Druhý\\nTretí\\n");', "Jeden riadok\nDruhý\nTretí"),
      podrobne: P.tabulka(["Zápis", "Význam"], [["<code>\\n</code>", "nový riadok"], ["<code>\\t</code>", "tabulátor"], ["<code>\\\"</code>", "úvodzovka v texte"], ["<code>\\\\</code>", "spätné lomítko"], ["<code>%%</code>", "znak % (v printf)"]]) },
    { typ: "volba", otazka: "Koľko riadkov vypíše <code>printf(\"A\\nB\\nC\");</code>?", moznosti: ["3", "1", "2", "0"], spravna: 0, vysvetlenie: "Dva \\n rozdelia text na tri riadky." },
    { typ: "volba", otazka: "Ako vypíšeš úvodzovku <code>\"</code>?", moznosti: ["<code>\\\"</code>", "<code>\"\"</code>", "<code>'\"'</code> v printf", "Nedá sa"], spravna: 0, vysvetlenie: "Spätné lomítko pred znakom." },
    { typ: "kod", zadanie: "Vypíš tri riadky: <b>Meno: Jana</b>, <b>Mesto: Nitra</b> a <b>Vek: 15</b>. Môžeš použiť jeden alebo viac printf.",
      karty: ["c"], start: { c: kostra("    ") }, vyska: "200px",
      napoveda: 'printf("Meno: Jana\\nMesto: Nitra\\nVek: 15\\n");', riesenie: { c: kostra('    printf("Meno: Jana\\n");\n    printf("Mesto: Nitra\\n");\n    printf("Vek: 15\\n");') },
      kontrola: function (v) { return r(v).join("|") === "Meno: Jana|Mesto: Nitra|Vek: 15" ? null : "Výstup majú byť 3 riadky: Meno: Jana, Mesto: Nitra, Vek: 15. Nezabudni na \\n."; },
      vysvetlenie: "Bez \\n by bolo všetko v jednom riadku." },
  ] };

  var L3 = { id: "c-1-3", nazov: "Komentáre", minut: 5, kroky: [
    { typ: "vyklad", nadpis: "Poznámky pre ľudí",
      text: "<p>Komentáre prekladač ignoruje. Slúžia na vysvetlenie kódu:</p>" + KOD("// komentár do konca riadku\n\n/* komentár\n   na viac riadkov */\n\nprintf(\"Ahoj\\n\");  // vypíše pozdrav"),
      podrobne: "<p>Dobrý komentár vysvetľuje <b>prečo</b>, nie čo. Riadok <code>i = i + 1; // zvýš i o 1</code> je zbytočný komentár, kód to hovorí sám.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: '// printf("A\\n");\nprintf("B\\n");', moznosti: ["B", "A a B", "A", "nič"], spravna: 0, vysvetlenie: "Prvý riadok je komentár." },
    { typ: "kod", zadanie: "Program vypisuje 3 riadky. Zakomentuj prostredný riadok (pridaj pred neho <code>//</code>), aby sa vypísali len <b>Prvý</b> a <b>Tretí</b>.",
      karty: ["c"], start: { c: kostra('    printf("Prvý\\n");\n    printf("Druhý\\n");\n    printf("Tretí\\n");') }, vyska: "210px",
      napoveda: '    // printf("Druhý\\n");', riesenie: { c: kostra('    printf("Prvý\\n");\n    // printf("Druhý\\n");\n    printf("Tretí\\n");') },
      kontrola: function (v, kod) { if (!/\/\/|\/\*/.test(kod)) return "Použi komentár //."; return r(v).join("|") === "Prvý|Tretí" ? null : "Majú sa vypísať len Prvý a Tretí."; },
      vysvetlenie: "Zakomentovanie je rýchly spôsob, ako dočasne vypnúť kód." },
  ] };

  var L4 = { id: "c-1-4", nazov: "Chyby prekladu", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Prekladač ti pomáha",
      text: "<p>Ak je v programe chyba, prekladač ho odmietne a povie číslo riadku. Aplikácia ti hlášku preloží do slovenčiny. Najčastejšie chyby začiatočníkov:</p><ul><li>chýbajúca <b>bodkočiarka</b> (prekladač ju často hlási až na nasledujúcom riadku),</li><li>chýbajúca <b>zátvorka</b> alebo úvodzovka,</li><li>preklep v názve (<code>prinf</code> namiesto <code>printf</code>),</li><li>chýbajúci <code>#include</code>.</li></ul>",
      podrobne: "<p>Okrem chýb (error) hlási prekladač aj <b>varovania</b> (warning). Program sa spustí, ale niečo je podozrivé. Varovania sa oplatí čítať.</p>" },
    { typ: "volba", otazka: "Čo je zle?", kod: '#include <stdio.h>\n\nint main(void) {\n    printf("Ahoj\\n")\n    return 0;\n}', moznosti: ["Chýba bodkočiarka za printf", "Chýba #include", "main je zle", "Nič"], spravna: 0, vysvetlenie: "Každý príkaz končí ;" },
    { typ: "kod", zadanie: "V programe sú dve chyby. Oprav ho, aby vypísal <b>Funguje!</b>",
      karty: ["c"], start: { c: '#include <stdio.h>\n\nint main(void) {\n    printf("Funguje!\\n")\n    return 0;\n' }, vyska: "190px",
      napoveda: "Za printf(…) chýba ; a na konci chýba zatváracia zátvorka }.", riesenie: { c: kostra('    printf("Funguje!\\n");') },
      kontrola: function (v) { return r(v)[0] === "Funguje!" ? null : "Výstup má byť Funguje!"; },
      vysvetlenie: "Čítanie chybových hlášok je dôležitá zručnosť." },
  ] };

  var L5 = { id: "c-1-5", nazov: "Počítanie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "printf vie vypísať aj čísla",
      text: "<p>Do textu v printf vložíš miesto pre číslo cez <code>%d</code> (celé číslo). Hodnota príde za čiarkou:</p>" + UKAZ('printf("%d\\n", 7 + 5);\nprintf("Výsledok: %d\\n", 6 * 7);\nprintf("%d a %d\\n", 10 / 3, 10 % 3);', "12\nVýsledok: 42\n3 a 1"),
      podrobne: "<ul><li><code>/</code> pri celých číslach delí celočíselne: 10 / 3 = 3.</li><li><code>%</code> je zvyšok po delení: 10 % 3 = 1.</li><li>Každé <code>%d</code> potrebuje jednu hodnotu, v poradí.</li></ul>" },
    { typ: "volba", otazka: "Čo vypíše <code>printf(\"%d\", 17 / 5);</code>?", moznosti: ["3", "3.4", "2", "17/5"], spravna: 0, vysvetlenie: "Celočíselné delenie." },
    { typ: "volba", otazka: "Čo vypíše <code>printf(\"%d\", 17 % 5);</code>?", moznosti: ["2", "3", "0", "5"], spravna: 0, vysvetlenie: "17 = 3 × 5 + 2." },
    { typ: "kod", zadanie: "Vypíš <b>Sekúnd za deň: 86400</b>. Číslo nevypočítaj sám, nechaj ho vypočítať program: <code>24 * 60 * 60</code>.",
      karty: ["c"], start: { c: kostra("    ") }, vyska: "190px",
      napoveda: 'printf("Sekúnd za deň: %d\\n", 24 * 60 * 60);', riesenie: { c: kostra('    printf("Sekúnd za deň: %d\\n", 24 * 60 * 60);') },
      kontrola: function (v, kod) { if (/86400/.test(kod)) return "Nepíš 86400 priamo, nechaj program vypočítať 24 * 60 * 60."; return r(v)[0] === "Sekúnd za deň: 86400" ? null : "Výstup má byť Sekúnd za deň: 86400"; },
      vysvetlenie: "%d nahradila vypočítaná hodnota." },
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li>Kostra: <code>#include</code>, <code>main</code>, <code>return 0;</code>.</li><li><code>printf</code>, <code>\\n</code> a ďalšie špeciálne znaky.</li><li>Komentáre <code>//</code> a <code>/* */</code>.</li><li>Čítanie chýb prekladu.</li><li><code>%d</code>, celočíselné delenie a zvyšok.</li></ul>", tip: "Teraz krátky test. Potom premenné a čítanie vstupu." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "c-1-1", otazka: "Čo spraví <code>#include &lt;stdio.h&gt;</code>?", moznosti: ["Pripojí knižnicu pre vstup a výstup (printf)", "Spustí program", "Vytvorí premennú", "Je to komentár"], spravna: 0, vysvetlenie: "stdio = standard input/output." },
    { typ: "volba", lekcia: "c-1-1", otazka: "Čo znamená <code>return 0;</code> v main?", moznosti: ["Program skončil bez chyby", "Vypíše 0", "Zopakuje program", "Chyba"], spravna: 0, vysvetlenie: "0 = úspech." },
    { typ: "volba", lekcia: "c-1-2", otazka: "Ako spravíš nový riadok v printf?", moznosti: ["<code>\\n</code>", "<code>/n</code>", "<code>endl</code>", "Netreba, pridá ho sám"], spravna: 0, vysvetlenie: "\\n" },
    { typ: "volba", lekcia: "c-1-3", otazka: "Ktorý zápis je komentár?", moznosti: ["<code>// poznámka</code>", "<code># poznámka</code>", "<code>-- poznámka</code>", "<code>&lt;!-- poznámka --&gt;</code>"], spravna: 0, vysvetlenie: "// alebo /* */" },
    { typ: "volba", lekcia: "c-1-4", otazka: "Čím končí každý príkaz v C?", moznosti: ["Bodkočiarkou ;", "Bodkou", "Dvojbodkou", "Novým riadkom"], spravna: 0, vysvetlenie: ";" },
    { typ: "volba", lekcia: "c-1-5", otazka: "Čo vypíše <code>printf(\"%d\", 2 + 3 * 4);</code>?", moznosti: ["14", "20", "234", "9"], spravna: 0, vysvetlenie: "Násobenie má prednosť." },
    { typ: "doplnenie", lekcia: "c-1-5", otazka: "Vypíš súčet:", sablona: 'printf("[[0]]\\n", 3 + 4)[[1]]', zetony: ["%d", ";", "%s", ":", "&"], spravne: ["%d", ";"], vysvetlenie: "%d pre celé číslo, na konci ;" },
  ];

  K.registrujModul("c", { cislo: 1, nazov: "Prvý program", popis: "Kostra programu, printf, komentáre, chyby prekladu a počítanie.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
