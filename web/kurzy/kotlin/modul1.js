/* Kotlin · Modul 1 · Prvý program */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var KOD = function (t) { return P.kod(t, "kt"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "kt", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "fun main() {\n" + telo + "\n}"; }

  var OBR = '<svg viewBox="0 0 340 100" role="img" aria-label="Ten istý výpis v Jave a v Kotline: Kotlin je kratší">' +
    '<rect x="6" y="10" width="160" height="80" rx="10" style="fill:var(--code-bg)"/><text x="16" y="28" font-size="10" font-weight="700" ' + TXT + ' style="fill:var(--code-muted)">JAVA</text>' +
    ['public class Main {', '  public static void', '    main(String[] a) {', '    System.out.println("Ahoj");', '  } }'].map(function (t, i) { return '<text x="16" y="' + (44 + i * 10) + '" font-size="8.5" ' + MONO + ' style="fill:var(--code-text)">' + K.esc(t) + "</text>"; }).join("") +
    '<rect x="176" y="10" width="158" height="80" rx="10" style="fill:var(--code-bg);stroke:#7f52ff;stroke-width:2"/><text x="186" y="28" font-size="10" font-weight="700" ' + TXT + ' style="fill:#a88bff">KOTLIN</text>' +
    ['fun main() {', '  println("Ahoj")', '}'].map(function (t, i) { return '<text x="186" y="' + (50 + i * 13) + '" font-size="10" ' + MONO + ' style="fill:var(--code-text)">' + K.esc(t) + "</text>"; }).join("") + "</svg>";

  var L1 = { id: "kotlin-1-1", nazov: "Ahoj, Kotlin!", minut: 6, kroky: [
    { typ: "vyklad", nadpis: "Moderný jazyk Androidu",
      text: "<p>Kotlin vytvorila firma JetBrains a Google ho v roku 2019 vyhlásil za hlavný jazyk pre Android. Beží na rovnakom základe ako Java (JVM), ale píše sa oveľa stručnejšie:</p>", obr: OBR,
      podrobne: "<p>Kotlin dokáže použiť všetky knižnice Javy, preto ho firmy mohli zavádzať postupne. Píšu sa v ňom aplikácie ako Pinterest, Trello či Duolingo. V tejto aplikácii sa Kotlin spúšťa na internete cez server JetBrains.</p>" },
    { typ: "vyklad", nadpis: "Prvý program",
      text: UKAZ('fun main() {\n    println("Ahoj, svet!")\n}', "Ahoj, svet!"),
      podrobne: "<ul><li><code>fun</code> označuje funkciu, <code>main</code> je miesto, kde program začína.</li><li><code>println</code> vypíše text a nový riadok.</li><li><b>Bodkočiarky netreba</b>: koniec riadku stačí.</li><li>Žiadna trieda okolo, žiadne <code>public static void</code>.</li></ul>" },
    { typ: "volba", otazka: "Čo v Kotline na konci príkazu netreba?", moznosti: ["Bodkočiarku", "Zátvorky pri println", "Úvodzovky okolo textu", "Nič, všetko treba"], spravna: 0, vysvetlenie: "Kotlin bodkočiarky nevyžaduje." },
    { typ: "kod", zadanie: "Uprav program, aby vypísal <b>Učím sa Kotlin</b>.",
      karty: ["kt"], start: { kt: kostra('    println("Ahoj, svet!")') }, vyska: "120px",
      napoveda: 'println("Učím sa Kotlin")', riesenie: { kt: kostra('    println("Učím sa Kotlin")') },
      kontrola: function (v) { return r(v)[0] === "Učím sa Kotlin" ? null : "Výstup má byť presne: Učím sa Kotlin"; },
      vysvetlenie: "Tri riadky a program je hotový." },
  ] };

  var L2 = { id: "kotlin-1-2", nazov: "print a šablóny", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Hodnoty priamo v texte",
      text: "<p>Do textu vložíš hodnotu znakom <code>$</code>, výraz cez <code>${ }</code>. Volá sa to <b>šablóna reťazca</b>:</p>" + UKAZ('val meno = "Jana"\nprintln("Ahoj, $meno!")\nprintln("2 + 3 = ${2 + 3}")\nprint("Bez ")\nprint("nového riadku")\nprintln()', "Ahoj, Jana!\n2 + 3 = 5\nBez nového riadku"),
      podrobne: "<p><code>print</code> nepridá nový riadok, <code>println</code> áno. Znak dolára samotný napíšeš ako <code>\\$</code>. Viacriadkový text je v trojitých úvodzovkách <code>\"\"\"…\"\"\"</code>.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>println(\"Mám ${10 * 2} rokov\")</code>?", moznosti: ["Mám 20 rokov", "Mám ${10 * 2} rokov", "Mám 10 * 2 rokov", "chybu"], spravna: 0, vysvetlenie: "Výraz v ${} sa vypočíta." },
    { typ: "kod", zadanie: "Pomocou šablóny vypíš <b>Sekúnd za hodinu: 3600</b>. Číslo vypočítaj (<code>60 * 60</code>) vnútri <code>${ }</code>.",
      karty: ["kt"], start: { kt: kostra("    ") }, vyska: "120px",
      napoveda: 'println("Sekúnd za hodinu: ${60 * 60}")', riesenie: { kt: kostra('    println("Sekúnd za hodinu: ${60 * 60}")') },
      kontrola: function (v, kod) { if (/3600/.test(kod)) return "Nepíš 3600 priamo, vypočítaj ho v ${ }."; if (!/\$\{/.test(kod)) return "Použi šablónu ${…}."; return r(v)[0] === "Sekúnd za hodinu: 3600" ? null : "Výstup má byť Sekúnd za hodinu: 3600"; },
      vysvetlenie: "Šablóny sú v Kotline všade." },
  ] };

  var L3 = { id: "kotlin-1-3", nazov: "Komentáre", minut: 5, kroky: [
    { typ: "vyklad", nadpis: "Poznámky v kóde",
      text: KOD("// komentár do konca riadku\n\n/* komentár\n   na viac riadkov */\n\n/** Dokumentačný komentár (KDoc) */"),
      podrobne: "<p>Komentáre prekladač ignoruje. Používaj ich na vysvetlenie, prečo je kód napísaný tak, ako je.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: '// println("A")\nprintln("B")', moznosti: ["B", "A a B", "A", "nič"], spravna: 0, vysvetlenie: "Prvý riadok je komentár." },
    { typ: "kod", zadanie: "Zakomentuj riadok s textom <b>Test</b>, aby sa vypísalo len <b>Hotovo</b>.",
      karty: ["kt"], start: { kt: kostra('    println("Test")\n    println("Hotovo")') }, vyska: "130px",
      napoveda: "Pred prvý println napíš //", riesenie: { kt: kostra('    // println("Test")\n    println("Hotovo")') },
      kontrola: function (v, kod) { if (!/\/\/|\/\*/.test(kod)) return "Použi komentár //."; return r(v).join("|") === "Hotovo" ? null : "Má sa vypísať len Hotovo."; },
      vysvetlenie: "Komentár vypol riadok." },
  ] };

  var L4 = { id: "kotlin-1-4", nazov: "Chyby prekladu", minut: 6, kroky: [
    { typ: "vyklad", nadpis: "Kotlin kontroluje vopred",
      text: "<p>Najčastejšie chyby začiatočníkov:</p><ul><li>chýbajúca zátvorka alebo úvodzovka,</li><li>preklep v názve (<code>printn</code>) → „Unresolved reference“,</li><li>zlý typ hodnoty (text namiesto čísla) → „Type mismatch“,</li><li>zmena hodnoty <code>val</code> (o tom v ďalšom module).</li></ul>",
      podrobne: "<p>Kotlin je navrhnutý tak, aby odhalil čo najviac chýb ešte pred spustením. Najmä prácu s prázdnou hodnotou null, ktorá v iných jazykoch spôsobuje najviac pádov.</p>" },
    { typ: "volba", otazka: "Čo hlási „Unresolved reference: printn“?", moznosti: ["printn neexistuje, je to preklep", "Chýba bodkočiarka", "Zlý typ", "Program je v poriadku"], spravna: 0, vysvetlenie: "Správne je println." },
    { typ: "kod", zadanie: "Program má dve chyby. Oprav ho, aby vypísal <b>Funguje!</b>",
      karty: ["kt"], start: { kt: 'fun main() {\n    Println("Funguje!"\n}' }, vyska: "120px",
      napoveda: "println s malým p a chýba zatváracia zátvorka ).", riesenie: { kt: kostra('    println("Funguje!")') },
      kontrola: function (v) { return r(v)[0] === "Funguje!" ? null : "Výstup má byť Funguje!"; },
      vysvetlenie: "Veľkosť písmen a zátvorky sú dôležité." },
  ] };

  var L5 = { id: "kotlin-1-5", nazov: "Počítanie", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Operátory",
      text: UKAZ('println(7 + 5)\nprintln(17 / 5)\nprintln(17 % 5)\nprintln(17 / 5.0)\nprintln("7" + "5")\nprintln(2 * (3 + 4))', "12\n3\n2\n3.4\n75\n14"),
      podrobne: "<p>Delenie dvoch celých čísel je celočíselné (17 / 5 = 3). Ak je aspoň jedno číslo desatinné (5.0), výsledok je desatinný. <code>%</code> je zvyšok po delení.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>println(9 / 2)</code>?", moznosti: ["4", "4.5", "5", "chybu"], spravna: 0, vysvetlenie: "Celočíselné delenie." },
    { typ: "kod", zadanie: "Za 125 minút: vypíš <b>125 minút = 2 h 5 min</b>. Hodiny a minúty vypočítaj cez <code>/</code> a <code>%</code> v šablóne.",
      karty: ["kt"], start: { kt: kostra("    val minuty = 125\n    ") }, vyska: "140px",
      napoveda: 'println("$minuty minút = ${minuty / 60} h ${minuty % 60} min")', riesenie: { kt: kostra('    val minuty = 125\n    println("$minuty minút = ${minuty / 60} h ${minuty % 60} min")') },
      kontrola: function (v, kod) { if (!/%/.test(kod)) return "Minúty vypočítaj cez %."; return r(v)[0] === "125 minút = 2 h 5 min" ? null : "Výstup má byť 125 minút = 2 h 5 min"; },
      vysvetlenie: "/ dá celé hodiny, % zvyšné minúty." },
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li><code>fun main()</code> a <code>println</code>, bez bodkočiarok.</li><li>Šablóny <code>$x</code> a <code>${výraz}</code>.</li><li>Komentáre a chyby prekladu.</li><li>Operátory a celočíselné delenie.</li></ul>", tip: "Teraz test, potom premenné, typy a vstup." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "kotlin-1-1", otazka: "Ktorým slovom začína definícia funkcie v Kotline?", moznosti: ["fun", "def", "function", "void"], spravna: 0, vysvetlenie: "fun main()" },
    { typ: "volba", lekcia: "kotlin-1-1", otazka: "Pre ktorý systém je Kotlin hlavným jazykom?", moznosti: ["Android", "iOS", "Windows", "Linux"], spravna: 0, vysvetlenie: "Google ho odporúča pre Android." },
    { typ: "volba", lekcia: "kotlin-1-2", otazka: "Čo vypíše <code>val x = 3; println(\"x = $x\")</code>?", moznosti: ["x = 3", "x = $x", "3 = 3", "chybu"], spravna: 0, vysvetlenie: "$x vloží hodnotu." },
    { typ: "volba", lekcia: "kotlin-1-3", otazka: "Ktorý zápis je komentár?", moznosti: ["<code>// text</code>", "<code># text</code>", "<code>-- text</code>", "<code>; text</code>"], spravna: 0, vysvetlenie: "//" },
    { typ: "volba", lekcia: "kotlin-1-4", otazka: "Čo znamená chyba „Type mismatch“?", moznosti: ["Hodnota má iný typ, než sa čaká", "Chýba bodkočiarka", "Preklep v názve", "Program je pomalý"], spravna: 0, vysvetlenie: "Napr. text namiesto čísla." },
    { typ: "volba", lekcia: "kotlin-1-5", otazka: "Čo vypíše <code>println(10 % 4)</code>?", moznosti: ["2", "2.5", "4", "0"], spravna: 0, vysvetlenie: "10 = 2 × 4 + 2." },
    { typ: "doplnenie", lekcia: "kotlin-1-2", otazka: "Doplň šablónu:", sablona: 'println("Súčet: [[0]]a + b[[1]]")', zetony: ["${", "}", "{", "$(", ")"], spravne: ["${", "}"], vysvetlenie: "${a + b}" },
  ];

  K.registrujModul("kotlin", { cislo: 1, nazov: "Prvý program", popis: "fun main, println, šablóny reťazcov, komentáre a počítanie.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
