/* Java · Modul 1 · Prvý program */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var KOD = function (t) { return P.kod(t, "java"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "java", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "public class Main {\n    public static void main(String[] args) {\n" + telo + "\n    }\n}"; }

  var OBR_JVM = '<svg viewBox="0 0 340 100" role="img" aria-label="Java sa preloží do bajtkódu, ktorý spustí virtuálny stroj JVM na akomkoľvek zariadení">' +
    [["Main.java", "zdrojový kód"], ["javac", "prekladač"], ["Main.class", "bajtkód"], ["JVM", "spustí všade"]].map(function (x, i) {
      var X = 4 + i * 84, hl = i === 1 || i === 3;
      return '<rect x="' + X + '" y="16" width="74" height="44" rx="9" style="fill:' + (hl ? "#b5651d" : "var(--surface-2)") + ';stroke:#b5651d;stroke-width:2"/><text x="' + (X + 37) + '" y="43" text-anchor="middle" font-size="11" font-weight="700" ' + MONO + ' style="fill:' + (hl ? "#fff" : "var(--text)") + '">' + x[0] + '</text><text x="' + (X + 37) + '" y="80" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">' + x[1] + "</text>" +
        (i < 3 ? '<path d="M' + (X + 75) + ' 38h8" style="stroke:var(--muted);stroke-width:2"/>' : "");
    }).join("") + "</svg>";

  var L1 = { id: "java-1-1", nazov: "Ahoj, Java!", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Napíš raz, spusti všade",
      text: "<p>Java sa preloží do <b>bajtkódu</b>, ktorý spustí virtuálny stroj <b>JVM</b>. Ten existuje pre Windows, Linux, Mac aj Android, preto ten istý program beží všade:</p>", obr: OBR_JVM,
      podrobne: "<p>Java vznikla v roku 1995 a dodnes patrí medzi najpoužívanejšie jazyky. Píšu sa v nej bankové systémy, veľké webové služby aj hra Minecraft. V tejto aplikácii sa Java prekladá na internete.</p>" },
    { typ: "vyklad", nadpis: "Prvý program",
      text: UKAZ('public class Main {\n    public static void main(String[] args) {\n        System.out.println("Ahoj, svet!");\n    }\n}', "Ahoj, svet!"),
      podrobne: "<ul><li>V Jave je všetko v <b>triede</b> (class). Naša sa volá Main.</li><li><code>public static void main(String[] args)</code> je hlavná metóda, tu program začína. Zatiaľ si ju pamätaj ako celok.</li><li><code>System.out.println</code> vypíše text a nový riadok.</li><li>Príkazy končia bodkočiarkou, bloky sú v <code>{ }</code>.</li></ul>" },
    { typ: "volba", otazka: "Ktorý príkaz vypíše text a skočí na nový riadok?", moznosti: ["<code>System.out.println(\"…\");</code>", "<code>print(\"…\")</code>", "<code>console.log(\"…\");</code>", "<code>printf(\"…\")</code>"], spravna: 0, vysvetlenie: "println = print line." },
    { typ: "poradie", otazka: "Zoraď program:", riadky: ["public class Main {", "    public static void main(String[] args) {", '        System.out.println("Ahoj");', "    }", "}"], vysvetlenie: "Trieda, metóda main, príkaz a dve zatváracie zátvorky." },
    { typ: "kod", zadanie: "Uprav program, aby vypísal <b>Učím sa Javu</b>.",
      karty: ["java"], start: { java: kostra('        System.out.println("Ahoj, svet!");') }, vyska: "170px",
      napoveda: 'System.out.println("Učím sa Javu");', riesenie: { java: kostra('        System.out.println("Učím sa Javu");') },
      kontrola: function (v) { return r(v)[0] === "Učím sa Javu" ? null : "Výstup má byť presne: Učím sa Javu"; },
      vysvetlenie: "Prvý program v Jave beží." },
  ] };

  var L2 = { id: "java-1-2", nazov: "print a println", minut: 6, kroky: [
    { typ: "vyklad", nadpis: "S novým riadkom aj bez",
      text: UKAZ('System.out.print("Jeden ");\nSystem.out.print("riadok");\nSystem.out.println();\nSystem.out.println("Druhý\\nTretí");', "Jeden riadok\nDruhý\nTretí"),
      podrobne: "<p><code>print</code> nový riadok nepridá, <code>println</code> áno. V texte fungujú špeciálne znaky <code>\\n</code> (nový riadok), <code>\\t</code> (tabulátor) a <code>\\\"</code> (úvodzovka).</p>" },
    { typ: "volba", otazka: "Koľko riadkov vypíše program?", kod: 'System.out.print("A");\nSystem.out.print("B");\nSystem.out.println("C");', moznosti: ["1 (ABC)", "3", "2", "0"], spravna: 0, vysvetlenie: "print nepridá nový riadok." },
    { typ: "kod", zadanie: "Vypíš tri riadky: <b>Meno: Peter</b>, <b>Mesto: Žilina</b> a <b>Vek: 16</b>.",
      karty: ["java"], start: { java: kostra("        ") }, vyska: "180px",
      napoveda: 'System.out.println("Meno: Peter"); …', riesenie: { java: kostra('        System.out.println("Meno: Peter");\n        System.out.println("Mesto: Žilina");\n        System.out.println("Vek: 16");') },
      kontrola: function (v) { return r(v).join("|") === "Meno: Peter|Mesto: Žilina|Vek: 16" ? null : "Výstup majú byť 3 riadky: Meno: Peter, Mesto: Žilina, Vek: 16."; },
      vysvetlenie: "Tri println, tri riadky." },
  ] };

  var L3 = { id: "java-1-3", nazov: "Komentáre", minut: 5, kroky: [
    { typ: "vyklad", nadpis: "Poznámky v kóde",
      text: KOD('// komentár do konca riadku\n\n/* komentár\n   na viac riadkov */\n\n/** Dokumentačný komentár: z neho sa\n *  generuje dokumentácia (Javadoc). */'),
      podrobne: "<p>Komentáre prekladač ignoruje. Javadoc komentáre nad metódami vidíš v programoch ako IntelliJ, keď prejdeš myšou nad názvom metódy.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: '// System.out.println("A");\nSystem.out.println("B"); // tlač B', moznosti: ["B", "A a B", "A", "nič"], spravna: 0, vysvetlenie: "Prvý riadok je komentár." },
    { typ: "kod", zadanie: "Zakomentuj riadok, ktorý vypisuje <b>Chyba</b>, aby program vypísal len <b>Hotovo</b>.",
      karty: ["java"], start: { java: kostra('        System.out.println("Chyba");\n        System.out.println("Hotovo");') }, vyska: "180px",
      napoveda: 'Pred prvý println napíš //', riesenie: { java: kostra('        // System.out.println("Chyba");\n        System.out.println("Hotovo");') },
      kontrola: function (v, kod) { if (!/\/\/|\/\*/.test(kod)) return "Použi komentár //."; return r(v).join("|") === "Hotovo" ? null : "Má sa vypísať len Hotovo."; },
      vysvetlenie: "Kód v komentári sa nevykoná." },
  ] };

  var L4 = { id: "java-1-4", nazov: "Chyby prekladu", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Java je prísna",
      text: "<p>Prekladač Javy skontroluje celý program pred spustením. Najčastejšie chyby:</p><ul><li>chýbajúca <b>bodkočiarka</b>,</li><li>zlé <b>veľké a malé písmená</b>: <code>system.out.println</code> alebo <code>string</code> nefungujú, správne je <code>System</code> a <code>String</code>,</li><li>chýbajúca zátvorka <code>}</code>,</li><li>neuzavretý text.</li></ul>",
      podrobne: "<p>Prísnosť je výhoda: veľa chýb odhalí prekladač ešte predtým, ako sa program dostane k používateľom. Aplikácia ti hlášku preloží do slovenčiny a ukáže riadok.</p>" },
    { typ: "volba", otazka: "Čo je zle?", kod: 'system.out.println("Ahoj");', jazyk: "java", moznosti: ["system má byť System", "Chýba bodkočiarka", "println je zle", "Nič"], spravna: 0, vysvetlenie: "Java rozlišuje veľké a malé písmená." },
    { typ: "kod", zadanie: "Program má dve chyby. Oprav ho, aby vypísal <b>Funguje!</b>",
      karty: ["java"], start: { java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Funguje!")\n    }\n' }, vyska: "170px",
      napoveda: "Za println(…) chýba ; a na konci chýba }.", riesenie: { java: kostra('        System.out.println("Funguje!");') },
      kontrola: function (v) { return r(v)[0] === "Funguje!" ? null : "Výstup má byť Funguje!"; },
      vysvetlenie: "Čítaj hlášku a číslo riadku." },
  ] };

  var L5 = { id: "java-1-5", nazov: "Počítanie a spájanie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Čísla a text",
      text: UKAZ('System.out.println(7 + 5);\nSystem.out.println("7" + "5");\nSystem.out.println("Súčet: " + 7 + 5);\nSystem.out.println("Súčet: " + (7 + 5));\nSystem.out.println(17 / 5 + " a " + 17 % 5);', "12\n75\nSúčet: 75\nSúčet: 12\n3 a 2"),
      podrobne: "<p><code>+</code> s textom <b>spája</b>. Výraz sa vyhodnocuje zľava: <code>\"Súčet: \" + 7</code> je text, a k nemu sa pripojí 5. Zátvorky vynútia, aby sa najprv sčítalo. Delenie dvoch celých čísel je celočíselné: 17 / 5 = 3.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>System.out.println(\"A\" + 1 + 2);</code>?", moznosti: ["A12", "A3", "3A", "chybu"], spravna: 0, vysvetlenie: "Zľava: \"A1\", potom \"A12\"." },
    { typ: "volba", otazka: "Čo vypíše <code>System.out.println(1 + 2 + \"A\");</code>?", moznosti: ["3A", "12A", "A3", "chybu"], spravna: 0, vysvetlenie: "Zľava: 1 + 2 = 3, potom \"3A\"." },
    { typ: "kod", zadanie: "Vypíš <b>Minút za týždeň: 10080</b>. Číslo nech vypočíta program (<code>7 * 24 * 60</code>).",
      karty: ["java"], start: { java: kostra("        ") }, vyska: "170px",
      napoveda: 'System.out.println("Minút za týždeň: " + (7 * 24 * 60));', riesenie: { java: kostra('        System.out.println("Minút za týždeň: " + (7 * 24 * 60));') },
      kontrola: function (v, kod) { if (/10080/.test(kod)) return "Nepíš 10080 priamo, nechaj ho vypočítať."; return r(v)[0] === "Minút za týždeň: 10080" ? null : "Výstup má byť Minút za týždeň: 10080 (nezabudni na zátvorky)."; },
      vysvetlenie: "Zátvorky zabránili spojeniu ako text." },
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li>Trieda Main a metóda main.</li><li><code>System.out.println</code> a <code>print</code>.</li><li>Komentáre a čítanie chýb.</li><li>Veľké a malé písmená sú dôležité.</li><li><code>+</code> sčíta čísla alebo spojí text, celočíselné delenie.</li></ul>", tip: "Teraz test, potom premenné a vstup." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "java-1-1", otazka: "Kde Java program začína?", moznosti: ["V metóde main", "V prvom riadku", "V triede System", "V println"], spravna: 0, vysvetlenie: "public static void main(String[] args)" },
    { typ: "volba", lekcia: "java-1-1", otazka: "Čo spúšťa preložený bajtkód Javy?", moznosti: ["JVM (virtuálny stroj)", "Prehliadač", "Python", "Priamo procesor"], spravna: 0, vysvetlenie: "Java Virtual Machine." },
    { typ: "volba", lekcia: "java-1-2", otazka: "Aký je rozdiel medzi print a println?", moznosti: ["println pridá nový riadok", "print je rýchlejší", "Žiadny", "println vypíše dvakrát"], spravna: 0, vysvetlenie: "line = riadok." },
    { typ: "volba", lekcia: "java-1-3", otazka: "Ktorý zápis je komentár v Jave?", moznosti: ["<code>// text</code>", "<code># text</code>", "<code>-- text</code>", "<code>' text</code>"], spravna: 0, vysvetlenie: "// alebo /* */" },
    { typ: "volba", lekcia: "java-1-4", otazka: "Prečo nefunguje <code>string meno = \"Jana\";</code>?", moznosti: ["Typ sa píše String s veľkým S", "Chýba bodkočiarka", "meno je zlé", "Funguje"], spravna: 0, vysvetlenie: "Java rozlišuje veľkosť písmen." },
    { typ: "volba", lekcia: "java-1-5", otazka: "Čo vypíše <code>System.out.println(10 / 4);</code>?", moznosti: ["2", "2.5", "3", "chybu"], spravna: 0, vysvetlenie: "Celočíselné delenie." },
    { typ: "doplnenie", lekcia: "java-1-1", otazka: "Doplň výpis:", sablona: '[[0]].out.[[1]]("Ahoj");', zetony: ["System", "println", "system", "print_line", "Console"], spravne: ["System", "println"], vysvetlenie: "System.out.println" },
  ];

  K.registrujModul("java", { cislo: 1, nazov: "Prvý program", popis: "Trieda Main, println, komentáre, chyby prekladu a spájanie textu.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
