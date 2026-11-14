/* Java · Modul 3 · Podmienky a cykly */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "java"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "java", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function sScannerom(telo) { return "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n" + telo + "\n    }\n}"; }
  function kostra(telo) { return "public class Main {\n    public static void main(String[] args) {\n" + telo + "\n    }\n}"; }

  var L1 = { id: "java-3-1", nazov: "if a else", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Rozhodovanie",
      text: UKAZ('int body = 72;\nif (body >= 90) {\n    System.out.println("Výborne");\n} else if (body >= 50) {\n    System.out.println("Prešiel si");\n} else {\n    System.out.println("Neprešiel si");\n}', "Prešiel si"),
      podrobne: "<p>Podmienka musí byť typu <b>boolean</b>. Na rozdiel od C nemôžeš napísať <code>if (x)</code> pre číslo, Java to nepreloží. Vďaka tomu nevznikne ani chyba <code>if (x = 5)</code>.</p>" },
    { typ: "volba", otazka: "Prečo Java nepreloží <code>if (pocet) { … }</code>, keď je pocet int?", moznosti: ["Podmienka musí byť boolean", "Chýba else", "pocet je zlé meno", "Preloží"], spravna: 0, vysvetlenie: "Treba napr. if (pocet > 0)." },
    { typ: "kod", zadanie: "Načítaj vek (vstup <b>13</b>) a vypíš: do 5 rokov vrátane <b>Zadarmo</b>, 6 až 17 <b>Detský lístok</b>, 18 až 64 <b>Plný lístok</b>, 65 a viac <b>Seniorský lístok</b>.",
      karty: ["java"], vstup: "13", start: { java: sScannerom("        int vek = sc.nextInt();\n        ") }, vyska: "260px",
      napoveda: "if (vek <= 5) … else if (vek <= 17) … else if (vek <= 64) … else …", riesenie: { java: sScannerom('        int vek = sc.nextInt();\n        if (vek <= 5) {\n            System.out.println("Zadarmo");\n        } else if (vek <= 17) {\n            System.out.println("Detský lístok");\n        } else if (vek <= 64) {\n            System.out.println("Plný lístok");\n        } else {\n            System.out.println("Seniorský lístok");\n        }') },
      kontrola: function (v, kod) { if (!/else\s+if/.test(kod)) return "Použi else if."; return r(v)[0] === "Detský lístok" ? null : "Pre vek 13 má vypísať Detský lístok."; },
      vysvetlenie: "Podmienky sa skúšajú zhora." },
  ] };

  var L2 = { id: "java-3-2", nazov: "&&, || a switch", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Logické operátory",
      text: P.tabulka(["Zápis", "Význam"], [["<code>a &amp;&amp; b</code>", "a zároveň"], ["<code>a || b</code>", "alebo"], ["<code>!a</code>", "nie"]]) + UKAZ('String den = "sobota";\nint hodina = 10;\nif ((den.equals("sobota") || den.equals("nedeľa")) && hodina < 12) {\n    System.out.println("Víkendové ráno");\n}', "Víkendové ráno"),
      podrobne: "<p>Pri <code>&amp;&amp;</code> sa pravá strana nevyhodnotí, ak je ľavá false. Preto <code>if (s != null &amp;&amp; s.length() &gt; 0)</code> nikdy nespadne na null.</p>" },
    { typ: "vyklad", nadpis: "Moderný switch",
      text: UKAZ('int den = 3;\nString nazov = switch (den) {\n    case 1 -> "Pondelok";\n    case 2 -> "Utorok";\n    case 3 -> "Streda";\n    case 6, 7 -> "Víkend";\n    default -> "Iný deň";\n};\nSystem.out.println(nazov);', "Streda"),
      podrobne: "<p>Od Javy 14 je switch so šípkami: netreba break a switch vie vrátiť hodnotu. Funguje aj pre String. Starší zápis <code>case 1: … break;</code> stále uvidíš v starších programoch.</p>" },
    { typ: "volba", otazka: "Čo vráti tento switch pre <code>den = 7</code>?", kod: 'switch (den) {\n    case 6, 7 -> "Víkend";\n    default -> "Pracovný deň";\n}', moznosti: ["Víkend", "Pracovný deň", "7", "chybu"], spravna: 0, vysvetlenie: "case 6, 7 zachytí obe hodnoty." },
    { typ: "kod", zadanie: "Načítaj operáciu a dve čísla (vstup <b>* 6 7</b>) a cez switch vypíš výsledok: <b>42</b>. Podporuj +, −, * a /. Pri inom znaku vypíš <b>Neznáma operácia</b>.",
      karty: ["java"], vstup: "* 6 7", start: { java: sScannerom("        String op = sc.next();\n        int a = sc.nextInt(), b = sc.nextInt();\n        ") }, vyska: "280px",
      napoveda: 'switch (op) { case "+" -> System.out.println(a + b); … default -> System.out.println("Neznáma operácia"); }', riesenie: { java: sScannerom('        String op = sc.next();\n        int a = sc.nextInt(), b = sc.nextInt();\n        switch (op) {\n            case "+" -> System.out.println(a + b);\n            case "-" -> System.out.println(a - b);\n            case "*" -> System.out.println(a * b);\n            case "/" -> System.out.println(a / b);\n            default -> System.out.println("Neznáma operácia");\n        }') },
      kontrola: function (v, kod) { if (!/switch/.test(kod)) return "Použi switch."; return r(v)[0] === "42" ? null : "Pre * 6 7 má vypísať 42."; },
      vysvetlenie: "switch funguje aj pre texty." },
  ] };

  var L3 = { id: "java-3-3", nazov: "Cyklus for", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Opakovanie s počítadlom",
      text: UKAZ('for (int i = 1; i <= 5; i++) {\n    System.out.print(i + " ");\n}\nSystem.out.println();\nfor (int i = 10; i > 0; i -= 3) {\n    System.out.print(i + " ");\n}', "1 2 3 4 5 \n10 7 4 1 "),
      podrobne: "<p>Začiatok; podmienka; krok. Premenná i existuje len v cykle.</p>" },
    { typ: "volba", otazka: "Čo vypíše cyklus <code>for (int i = 0; i &lt; 10; i += 4) System.out.print(i);</code>?", moznosti: ["048", "0481", "04812", "4812"], spravna: 0, vysvetlenie: "0, 4, 8; 12 už nie." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>5</b>) a vypíš malú násobilku: riadky <b>5 x 1 = 5</b> až <b>5 x 10 = 50</b>.",
      karty: ["java"], vstup: "5", start: { java: sScannerom("        int n = sc.nextInt();\n        ") }, vyska: "220px",
      napoveda: 'for (int i = 1; i <= 10; i++) System.out.println(n + " x " + i + " = " + (n * i));', riesenie: { java: sScannerom('        int n = sc.nextInt();\n        for (int i = 1; i <= 10; i++) {\n            System.out.println(n + " x " + i + " = " + (n * i));\n        }') },
      kontrola: function (v, kod) { if (!/for\s*\(/.test(kod)) return "Použi cyklus for."; var l = r(v); if (l.length !== 10) return "Má byť 10 riadkov."; for (var i = 1; i <= 10; i++) if (l[i - 1] !== "5 x " + i + " = " + 5 * i) return "Riadok " + i + " má byť 5 x " + i + " = " + 5 * i; return null; },
      vysvetlenie: "Zátvorky okolo n * i sú dôležité." },
  ] };

  var L4 = { id: "java-3-4", nazov: "while a do-while", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kým platí podmienka",
      text: UKAZ('int n = 27, krokov = 0;\nwhile (n != 1) {\n    if (n % 2 == 0) n = n / 2;\n    else n = 3 * n + 1;\n    krokov++;\n}\nSystem.out.println("Krokov: " + krokov);', "Krokov: 111") + "<p>Toto je slávna Collatzova postupnosť: zatiaľ nikto nedokázal, že vždy skončí na 1.</p>",
      podrobne: "<p><code>do { … } while (podmienka);</code> prebehne aspoň raz. Čítanie, kým je vstup: <code>while (sc.hasNextInt()) { int x = sc.nextInt(); … }</code>.</p>" },
    { typ: "volba", otazka: "Ktorý cyklus je vhodný, keď vopred nevieš počet opakovaní?", moznosti: ["while", "for je jediná možnosť", "switch", "žiadny"], spravna: 0, vysvetlenie: "while: kým platí podmienka." },
    { typ: "kod", zadanie: "Načítaj čísla, kým sú na vstupe (vstup <b>3 8 1 9 4</b>), cez <code>while (sc.hasNextInt())</code> a vypíš ich súčet a najväčšie: <b>Súčet: 25, max: 9</b>.",
      karty: ["java"], vstup: "3 8 1 9 4", start: { java: sScannerom("        int sucet = 0, max = Integer.MIN_VALUE;\n        ") }, vyska: "240px",
      napoveda: "while (sc.hasNextInt()) { int x = sc.nextInt(); sucet += x; if (x > max) max = x; }", riesenie: { java: sScannerom('        int sucet = 0, max = Integer.MIN_VALUE;\n        while (sc.hasNextInt()) {\n            int x = sc.nextInt();\n            sucet += x;\n            if (x > max) max = x;\n        }\n        System.out.println("Súčet: " + sucet + ", max: " + max);') },
      kontrola: function (v, kod) { if (!/while\s*\(/.test(kod)) return "Použi cyklus while."; return r(v)[0] === "Súčet: 25, max: 9" ? null : "Výstup má byť Súčet: 25, max: 9"; },
      vysvetlenie: "Integer.MIN_VALUE je najmenšie možné int." },
  ] };

  var L5 = { id: "java-3-5", nazov: "break, continue, vnorené cykly", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Riadenie a vnáranie",
      text: UKAZ('for (int i = 1; i <= 20; i++) {\n    if (i % 3 != 0) continue;\n    if (i > 12) break;\n    System.out.print(i + " ");\n}', "3 6 9 12 ") + UKAZ('for (int r = 1; r <= 3; r++) {\n    System.out.println("*".repeat(r));\n}', "*\n**\n***"),
      podrobne: "<p><code>\"*\".repeat(3)</code> zopakuje text (od Javy 11). break ukončí len najbližší cyklus.</p>" },
    { typ: "volba", otazka: "Čo spraví <code>break</code> vo vnútornom z dvoch vnorených cyklov?", moznosti: ["Ukončí len vnútorný cyklus", "Ukončí oba", "Ukončí program", "Nič"], spravna: 0, vysvetlenie: "Najbližší cyklus." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>4</b>) a nakresli pyramídu z hviezdičiek, zarovnanú na stred medzerami:<br><code>&nbsp;&nbsp;&nbsp;*</code><br><code>&nbsp;&nbsp;***</code><br><code>&nbsp;*****</code><br><code>*******</code>",
      karty: ["java"], vstup: "4", start: { java: sScannerom("        int n = sc.nextInt();\n        ") }, vyska: "220px",
      napoveda: 'for (int r = 1; r <= n; r++) System.out.println(" ".repeat(n - r) + "*".repeat(2 * r - 1));', riesenie: { java: sScannerom('        int n = sc.nextInt();\n        for (int r = 1; r <= n; r++) {\n            System.out.println(" ".repeat(n - r) + "*".repeat(2 * r - 1));\n        }') },
      kontrola: function (v) { var l = (v || "").replace(/\s+$/, "").split("\n").map(function (x) { return x.replace(/\s+$/, ""); }); return l.join("|") === "   *|  ***| *****|*******" ? null : "Pyramída má mať 4 riadky: 3 medzery a *, 2 medzery a ***, 1 medzera a *****, a *******."; },
      vysvetlenie: "Riadok r: n − r medzier a 2r − 1 hviezdičiek." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li><code>if</code>, <code>else if</code>, <code>else</code> s podmienkou typu boolean.</li><li><code>&amp;&amp;</code>, <code>||</code>, <code>!</code> a switch so šípkami.</li><li><code>for</code>, <code>while</code>, <code>do-while</code>, <code>hasNextInt</code>.</li><li><code>break</code>, <code>continue</code>, <code>repeat</code>.</li></ul>", tip: "Ďalej metódy, polia a zoznamy." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "java-3-1", otazka: "Akého typu musí byť podmienka v if?", moznosti: ["boolean", "int", "String", "hocijaký"], spravna: 0, vysvetlenie: "Java je prísna." },
    { typ: "volba", lekcia: "java-3-2", otazka: "Ako zapíšeš „a zároveň“?", moznosti: ["<code>&amp;&amp;</code>", "<code>and</code>", "<code>||</code>", "<code>&amp;</code> je jediná možnosť"], spravna: 0, vysvetlenie: "&&" },
    { typ: "volba", lekcia: "java-3-2", otazka: "Treba v switch so šípkami <code>-&gt;</code> písať break?", moznosti: ["Nie", "Áno, vždy", "Len pri default", "Len pri String"], spravna: 0, vysvetlenie: "Šípkový switch neprepadáva." },
    { typ: "volba", lekcia: "java-3-3", otazka: "Koľkokrát prebehne <code>for (int i = 5; i &gt; 0; i--)</code>?", moznosti: ["5", "4", "6", "0"], spravna: 0, vysvetlenie: "5, 4, 3, 2, 1." },
    { typ: "volba", lekcia: "java-3-4", otazka: "Čo vráti <code>sc.hasNextInt()</code>?", moznosti: ["true, ak na vstupe ešte je celé číslo", "Najbližšie číslo", "Počet čísel", "Nič"], spravna: 0, vysvetlenie: "Len sa pozrie dopredu." },
    { typ: "volba", lekcia: "java-3-5", otazka: "Čo vráti <code>\"ab\".repeat(3)</code>?", moznosti: ["ababab", "ab3", "aaabbb", "chybu"], spravna: 0, vysvetlenie: "Zopakuje text." },
    { typ: "doplnenie", lekcia: "java-3-3", otazka: "Vypíš čísla 1 až 10:", sablona: "for (int i = 1; i [[0]] 10; i[[1]]) {\n    System.out.println(i);\n}", zetony: ["<=", "++", "<", "--", "=="], spravne: ["<=", "++"], vysvetlenie: "i <= 10; i++" },
  ];

  K.registrujModul("java", { cislo: 3, nazov: "Podmienky a cykly", popis: "if/else, logické operátory, switch, for, while, break a continue.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
