/* Java · Modul 2 · Premenné a vstup */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "java"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "java", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "public class Main {\n    public static void main(String[] args) {\n" + telo + "\n    }\n}"; }
  function sScannerom(telo) { return "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n" + telo + "\n    }\n}"; }

  var L1 = { id: "java-2-1", nazov: "Premenné a typy", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Každá premenná má typ",
      text: P.tabulka(["Typ", "Hodnoty", "Príklad"], [["<code>int</code>", "celé čísla", "<code>int vek = 15;</code>"], ["<code>double</code>", "desatinné čísla", "<code>double cena = 4.99;</code>"], ["<code>boolean</code>", "true / false", "<code>boolean hotovo = false;</code>"], ["<code>char</code>", "jeden znak, apostrofy", "<code>char z = 'A';</code>"], ["<code>String</code>", "text, úvodzovky", "<code>String meno = \"Jana\";</code>"], ["<code>long</code>", "veľké celé čísla", "<code>long svet = 8000000000L;</code>"]]),
      podrobne: "<p>String sa píše s veľkým S, lebo je to <b>trieda</b>, nie základný typ. Premenná typu int nemôže obsahovať text, prekladač to nedovolí. Od Javy 10 môžeš písať aj <code>var x = 5;</code> a typ si odvodí prekladač.</p>" },
    { typ: "volba", otazka: "Ktorý typ použiješ pre cenu 12,90 €?", moznosti: ["<code>double</code>", "<code>int</code>", "<code>boolean</code>", "<code>char</code>"], spravna: 0, vysvetlenie: "Desatinné číslo." },
    { typ: "kod", zadanie: "Vytvor premenné <code>String meno = \"Eva\"</code>, <code>int vek = 14</code> a vypíš <b>Eva má 14 rokov.</b>",
      karty: ["java"], start: { java: kostra("        ") }, vyska: "190px",
      napoveda: 'System.out.println(meno + " má " + vek + " rokov.");', riesenie: { java: kostra('        String meno = "Eva";\n        int vek = 14;\n        System.out.println(meno + " má " + vek + " rokov.");') },
      kontrola: function (v, kod) { if (!/String\s+meno/.test(kod) || !/int\s+vek/.test(kod)) return "Vytvor premenné String meno a int vek."; return r(v)[0] === "Eva má 14 rokov." ? null : "Výstup má byť Eva má 14 rokov."; },
      vysvetlenie: "Text a čísla spojí +." },
  ] };

  var L2 = { id: "java-2-2", nazov: "Vstup cez Scanner", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Čítanie od používateľa",
      text: UKAZ('import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String meno = sc.nextLine();\n        int vek = sc.nextInt();\n        System.out.println(meno + " o rok: " + (vek + 1));\n    }\n}', "Jana\n15\nJana o rok: 16"),
      podrobne: P.tabulka(["Metóda", "Načíta"], [["<code>sc.nextInt()</code>", "celé číslo"], ["<code>sc.nextDouble()</code>", "desatinné číslo"], ["<code>sc.next()</code>", "jedno slovo"], ["<code>sc.nextLine()</code>", "celý riadok"]]) + "<p><code>import</code> na začiatku sprístupní triedu Scanner. Pozor: po nextInt() ostane v riadku znak nového riadku, takže nasledujúci nextLine() vráti prázdny text. Riešenie: zavolaj nextLine() navyše.</p>" },
    { typ: "volba", otazka: "Čo chýba, keď prekladač hlási <code>cannot find symbol: class Scanner</code>?", moznosti: ["import java.util.Scanner;", "Bodkočiarka", "new", "public"], spravna: 0, vysvetlenie: "Scanner treba importovať." },
    { typ: "kod", zadanie: "Načítaj dve celé čísla (vstup <b>8 3</b>) a vypíš ich súčin: <b>8 * 3 = 24</b>.",
      karty: ["java"], vstup: "8 3", start: { java: sScannerom("        ") }, vyska: "220px",
      napoveda: 'int a = sc.nextInt();\nint b = sc.nextInt();\nSystem.out.println(a + " * " + b + " = " + (a * b));', riesenie: { java: sScannerom('        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + " * " + b + " = " + (a * b));') },
      kontrola: function (v, kod) { if (!/nextInt/.test(kod)) return "Načítaj čísla cez sc.nextInt()."; return r(v)[0] === "8 * 3 = 24" ? null : "Výstup má byť 8 * 3 = 24"; },
      vysvetlenie: "Skús zmeniť vstup." },
  ] };

  var L3 = { id: "java-2-3", nazov: "Delenie a pretypovanie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Celé a desatinné",
      text: UKAZ("int a = 7, b = 2;\nSystem.out.println(a / b);\nSystem.out.println(a % b);\nSystem.out.println((double) a / b);\nint c = (int) 3.99;\nSystem.out.println(c);", "3\n1\n3.5\n3"),
      podrobne: "<p>int / int = int. Aby vyšlo desatinné číslo, pretypuj aspoň jedno na double. Prevod double na int <b>oreže</b> desatinnú časť (nezaokrúhľuje). Na zaokrúhlenie je <code>Math.round(x)</code>.</p>" },
    { typ: "vyklad", nadpis: "Formátovaný výpis",
      text: UKAZ('double cena = 19.9 * 1.2;\nSystem.out.println(cena);\nSystem.out.printf("%.2f €%n", cena);\nString s = String.format("%.1f", 2.345);\nSystem.out.println(s);', "23.88\n23,88 €\n2,3") + "<p>printf používa formáty ako v C. <code>%n</code> je nový riadok. Pozor: desatinný oddeľovač závisí od jazyka zariadenia (čiarka alebo bodka).</p>",
      podrobne: "<p>Ak chceš vždy bodku, použi <code>String.format(java.util.Locale.US, \"%.2f\", x)</code>.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>System.out.println((int) 9.8);</code>?", moznosti: ["9", "10", "9.8", "chybu"], spravna: 0, vysvetlenie: "Pretypovanie na int oreže." },
    { typ: "kod", zadanie: "Načítaj body a maximum (vstup <b>45 60</b>) a vypíš úspešnosť v percentách ako desatinné číslo: <b>Úspešnosť: 75.0 %</b> (spoj text a double cez +).",
      karty: ["java"], vstup: "45 60", start: { java: sScannerom("        int body = sc.nextInt();\n        int max = sc.nextInt();\n        ") }, vyska: "220px",
      napoveda: 'double p = (double) body / max * 100;\nSystem.out.println("Úspešnosť: " + p + " %");', riesenie: { java: sScannerom('        int body = sc.nextInt();\n        int max = sc.nextInt();\n        double p = (double) body / max * 100;\n        System.out.println("Úspešnosť: " + p + " %");') },
      kontrola: function (v) { return r(v)[0] === "Úspešnosť: 75.0 %" ? null : "Výstup má byť Úspešnosť: 75.0 % (teraz: " + (r(v)[0] || "nič") + "). Pozor na celočíselné delenie."; },
      vysvetlenie: "Bez (double) by vyšlo 0.0." },
  ] };

  var L4 = { id: "java-2-4", nazov: "Práca s textom", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Metódy triedy String",
      text: P.tabulka(["Zápis", "Výsledok pre s = \"Programovanie\""], [["<code>s.length()</code>", "13"], ["<code>s.toUpperCase()</code>", "PROGRAMOVANIE"], ["<code>s.charAt(0)</code>", "'P'"], ["<code>s.substring(0, 7)</code>", "\"Program\""], ["<code>s.indexOf(\"gram\")</code>", "3"], ["<code>s.contains(\"mov\")</code>", "true"], ["<code>s.replace(\"o\", \"0\")</code>", "Pr0gram0vanie"]]),
      podrobne: "<p>Text v Jave sa nemení (je <b>nemenný</b>). Metódy vracajú nový String. Dôležité: texty porovnávaj cez <code>a.equals(b)</code>, nie <code>a == b</code>. Operátor == porovná, či ide o ten istý objekt v pamäti.</p>" },
    { typ: "volba", otazka: "Ako správne zistíš, či <code>heslo</code> je „tajne“?", moznosti: ["<code>heslo.equals(\"tajne\")</code>", "<code>heslo == \"tajne\"</code>", "<code>heslo = \"tajne\"</code>", "<code>equals(heslo, tajne)</code>"], spravna: 0, vysvetlenie: "Text porovnávaj cez equals." },
    { typ: "kod", zadanie: "Načítaj slovo (vstup <b>Bratislava</b>) a vypíš ho veľkými písmenami, jeho dĺžku a prvé tri písmená, každé na nový riadok: <b>BRATISLAVA</b>, <b>10</b>, <b>Bra</b>.",
      karty: ["java"], vstup: "Bratislava", start: { java: sScannerom("        String s = sc.next();\n        ") }, vyska: "220px",
      napoveda: "s.toUpperCase(), s.length(), s.substring(0, 3)", riesenie: { java: sScannerom("        String s = sc.next();\n        System.out.println(s.toUpperCase());\n        System.out.println(s.length());\n        System.out.println(s.substring(0, 3));") },
      kontrola: function (v) { return r(v).join("|") === "BRATISLAVA|10|Bra" ? null : "Výstup má byť BRATISLAVA, 10, Bra."; },
      vysvetlenie: "Tri metódy triedy String." },
  ] };

  var L5 = { id: "java-2-5", nazov: "Math a konštanty", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Trieda Math",
      text: P.tabulka(["Zápis", "Výsledok"], [["<code>Math.sqrt(16)</code>", "4.0"], ["<code>Math.pow(2, 10)</code>", "1024.0"], ["<code>Math.abs(-7)</code>", "7"], ["<code>Math.max(3, 9)</code>", "9"], ["<code>Math.round(2.5)</code>", "3"], ["<code>Math.PI</code>", "3.14159…"], ["<code>Math.random()</code>", "náhodné číslo 0 až 1"]]) + KOD("final double DPH = 0.2;   // konštanta, nedá sa zmeniť\nint x = 5;\nx += 3;  x++;           // 9"),
      podrobne: "<p><code>final</code> premenná sa po priradení nedá zmeniť. Konštanty sa podľa zvyku píšu VEĽKÝMI písmenami.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>Math.max(4, Math.abs(-6))</code>?", moznosti: ["6", "4", "-6", "10"], spravna: 0, vysvetlenie: "abs(-6) = 6, max(4, 6) = 6." },
    { typ: "kod", zadanie: "Načítaj polomer (vstup <b>2.5</b>) a vypíš obsah kruhu zaokrúhlený na celé číslo cez <code>Math.round</code>: <b>Obsah: 20</b>. Použi <code>Math.PI</code>.",
      karty: ["java"], vstup: "2.5", start: { java: sScannerom("        double r = sc.nextDouble();\n        ") }, vyska: "220px",
      napoveda: 'System.out.println("Obsah: " + Math.round(Math.PI * r * r));', riesenie: { java: sScannerom('        double r = sc.nextDouble();\n        System.out.println("Obsah: " + Math.round(Math.PI * r * r));') },
      kontrola: function (v, kod) { if (!/Math\.PI/.test(kod)) return "Použi Math.PI."; return r(v)[0] === "Obsah: 20" ? null : "Výstup má byť Obsah: 20"; },
      vysvetlenie: "π · 2.5² ≈ 19.63 → 20." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li>Typy int, double, boolean, char, String.</li><li>Scanner: nextInt, nextDouble, next, nextLine.</li><li>Celočíselné delenie a pretypovanie.</li><li>Metódy Stringu a <code>equals</code>.</li><li>Math a <code>final</code>.</li></ul>", tip: "Ďalej podmienky a cykly." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "java-2-1", otazka: "Ktorý typ uloží true alebo false?", moznosti: ["boolean", "bool", "Boolean je jediná možnosť", "bit"], spravna: 0, vysvetlenie: "boolean." },
    { typ: "volba", lekcia: "java-2-2", otazka: "Ktorá metóda Scannera načíta celý riadok?", moznosti: ["nextLine()", "next()", "nextInt()", "readLine()"], spravna: 0, vysvetlenie: "nextLine." },
    { typ: "volba", lekcia: "java-2-3", otazka: "Čo vypíše <code>System.out.println(5 / 2.0);</code>?", moznosti: ["2.5", "2", "2.0", "3"], spravna: 0, vysvetlenie: "Jedno číslo je double." },
    { typ: "volba", lekcia: "java-2-4", otazka: "Čo vráti <code>\"Java\".length()</code>?", moznosti: ["4", "3", "5", "J"], spravna: 0, vysvetlenie: "4 znaky." },
    { typ: "volba", lekcia: "java-2-4", otazka: "Ako porovnáš texty v Jave?", moznosti: ["<code>a.equals(b)</code>", "<code>a == b</code>", "<code>a === b</code>", "<code>compare(a, b)</code>"], spravna: 0, vysvetlenie: "equals porovná obsah." },
    { typ: "volba", lekcia: "java-2-5", otazka: "Čo znamená <code>final</code> pred premennou?", moznosti: ["Hodnota sa nedá zmeniť", "Posledná premenná", "Verejná premenná", "Nič"], spravna: 0, vysvetlenie: "Konštanta." },
    { typ: "doplnenie", lekcia: "java-2-2", otazka: "Načítaj číslo:", sablona: "Scanner sc = [[0]] Scanner(System.in);\nint x = sc.[[1]]();", zetony: ["new", "nextInt", "create", "readInt", "next"], spravne: ["new", "nextInt"], vysvetlenie: "new Scanner, nextInt()." },
  ];

  K.registrujModul("java", { cislo: 2, nazov: "Premenné a vstup", popis: "Typy, Scanner, delenie a pretypovanie, String a Math.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
