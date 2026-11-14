/* Kotlin · Modul 2 · Typy a vstup */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "kt"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "kt", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "fun main() {\n" + telo + "\n}"; }

  var L1 = { id: "kotlin-2-1", nazov: "val a var", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Nemenné a meniteľné",
      text: UKAZ('val meno = "Jana"   // val: nedá sa zmeniť\nvar body = 10       // var: dá sa zmeniť\nbody += 5\nprintln("$meno má $body bodov")', "Jana má 15 bodov"),
      podrobne: "<p>Kotlin odporúča používať <code>val</code> všade, kde sa hodnota nemení. Program je potom bezpečnejší a ľahšie sa číta. <code>meno = \"Eva\"</code> by skončilo chybou „Val cannot be reassigned“.</p>" },
    { typ: "volba", otazka: "Čo sa stane?", kod: 'val x = 5\nx = 6', moznosti: ["Chyba: val sa nedá zmeniť", "x bude 6", "x bude 5", "x bude 11"], spravna: 0, vysvetlenie: "Na zmenu treba var." },
    { typ: "kod", zadanie: "Program má chybu: pokúša sa zmeniť <code>val</code>. Oprav ho (zmeň val na var), aby vypísal <b>Životy: 2</b>.",
      karty: ["kt"], start: { kt: kostra('    val zivoty = 3\n    zivoty = zivoty - 1\n    println("Životy: $zivoty")') }, vyska: "140px",
      napoveda: "var zivoty = 3", riesenie: { kt: kostra('    var zivoty = 3\n    zivoty = zivoty - 1\n    println("Životy: $zivoty")') },
      kontrola: function (v, kod) { if (!/var\s+zivoty/.test(kod)) return "Premenná, ktorá sa mení, má byť var."; return r(v)[0] === "Životy: 2" ? null : "Výstup má byť Životy: 2"; },
      vysvetlenie: "var pre meniteľné, val pre nemenné." },
  ] };

  var L2 = { id: "kotlin-2-2", nazov: "Typy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kotlin si typ domyslí",
      text: P.tabulka(["Typ", "Príklad"], [["<code>Int</code>", "<code>val vek = 15</code>"], ["<code>Double</code>", "<code>val cena = 4.99</code>"], ["<code>Boolean</code>", "<code>val hotovo = false</code>"], ["<code>Char</code>", "<code>val z = 'A'</code>"], ["<code>String</code>", "<code>val meno = \"Jana\"</code>"], ["<code>Long</code>", "<code>val svet = 8_000_000_000L</code>"]]) + KOD("val vyska: Double = 1.72   // typ môžeš napísať aj výslovne\nval pocet: Int = 3"),
      podrobne: "<p>Všetky typy sa píšu s veľkým začiatočným písmenom. Typ sa dá vynechať, Kotlin ho určí z hodnoty. Typ však platí navždy: do Int nevložíš text. Podčiarkovníky v čísle (8_000_000_000) len zlepšujú čitateľnosť.</p>" },
    { typ: "volba", otazka: "Aký typ má <code>val x = 2.0</code>?", moznosti: ["Double", "Int", "String", "Float je jediná možnosť"], spravna: 0, vysvetlenie: "Desatinné číslo = Double." },
    { typ: "kod", zadanie: "Vytvor <code>val cena: Double = 12.5</code> a <code>val kusov: Int = 4</code>. Vypíš <b>Spolu: 50.0</b>.",
      karty: ["kt"], start: { kt: kostra("    ") }, vyska: "140px",
      napoveda: 'println("Spolu: ${cena * kusov}")', riesenie: { kt: kostra('    val cena: Double = 12.5\n    val kusov: Int = 4\n    println("Spolu: ${cena * kusov}")') },
      kontrola: function (v, kod) { if (!/:\s*Double/.test(kod) || !/:\s*Int/.test(kod)) return "Napíš typy výslovne: val cena: Double, val kusov: Int."; return r(v)[0] === "Spolu: 50.0" ? null : "Výstup má byť Spolu: 50.0"; },
      vysvetlenie: "Double × Int = Double." },
  ] };

  var L3 = { id: "kotlin-2-3", nazov: "Vstup a prevody", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "readln a toInt",
      text: "<p><code>readln()</code> načíta riadok textu. Čísla prevedieš cez <code>toInt()</code> alebo <code>toDouble()</code>:</p>" + UKAZ('val meno = readln()\nval vek = readln().toInt()\nprintln("$meno, o rok budeš mať ${vek + 1}.")', "Jana\n15\nJana, o rok budeš mať 16."),
      podrobne: "<p>Viac čísel v riadku: <code>val (a, b) = readln().split(\" \").map { it.toInt() }</code>. Ak text nie je číslo, toInt() spadne. Bezpečnejšie je <code>toIntOrNull()</code>, ktoré vráti null (o tom v module 5).</p>" },
    { typ: "volba", otazka: "Čo vráti <code>\"42\".toInt() + 1</code>?", moznosti: ["43", "421", "chybu", "\"43\""], spravna: 0, vysvetlenie: "toInt prevedie text na číslo." },
    { typ: "kod", zadanie: "Na vstupe sú dve čísla v jednom riadku (<b>15 4</b>). Vypíš celočíselný podiel a zvyšok: <b>15 = 3 * 4 + 3</b>.",
      karty: ["kt"], vstup: "15 4", start: { kt: kostra('    val (a, b) = readln().split(" ").map { it.toInt() }\n    ') }, vyska: "140px",
      napoveda: 'println("$a = ${a / b} * $b + ${a % b}")', riesenie: { kt: kostra('    val (a, b) = readln().split(" ").map { it.toInt() }\n    println("$a = ${a / b} * $b + ${a % b}")') },
      kontrola: function (v) { return r(v)[0] === "15 = 3 * 4 + 3" ? null : "Výstup má byť 15 = 3 * 4 + 3"; },
      vysvetlenie: "split rozdelil riadok, map previedol časti na čísla." },
  ] };

  var L4 = { id: "kotlin-2-4", nazov: "Práca s textom", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Funkcie textu",
      text: P.tabulka(["Zápis", "Výsledok pre s = \"Programovanie\""], [["<code>s.length</code>", "13"], ["<code>s.uppercase()</code>", "PROGRAMOVANIE"], ["<code>s[0]</code>, <code>s.first()</code>", "'P'"], ["<code>s.substring(0, 7)</code>", "\"Program\""], ["<code>s.reversed()</code>", "einavomargorP"], ["<code>\"mov\" in s</code>", "true"], ["<code>s.count { it == 'o' }</code>", "2"]]),
      podrobne: "<p>Texty sa porovnávajú normálne cez <code>==</code>. <code>{ it == 'o' }</code> je lambda: „pre každý znak it vráť, či je to o“.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>\"abc\".reversed()</code>?", moznosti: ["cba", "abc", "CBA", "chybu"], spravna: 0, vysvetlenie: "Text odzadu." },
    { typ: "kod", zadanie: "Načítaj slovo (vstup <b>Kotlin</b>) a vypíš ho veľkými písmenami, odzadu a jeho dĺžku, každé na riadok: <b>KOTLIN</b>, <b>niltoK</b>, <b>6</b>.",
      karty: ["kt"], vstup: "Kotlin", start: { kt: kostra("    val s = readln()\n    ") }, vyska: "150px",
      napoveda: "println(s.uppercase()), println(s.reversed()), println(s.length)", riesenie: { kt: kostra("    val s = readln()\n    println(s.uppercase())\n    println(s.reversed())\n    println(s.length)") },
      kontrola: function (v) { return r(v).join("|") === "KOTLIN|niltoK|6" ? null : "Výstup má byť KOTLIN, niltoK, 6."; },
      vysvetlenie: "length je vlastnosť, bez zátvoriek." },
  ] };

  var L5 = { id: "kotlin-2-5", nazov: "Matematika a formát", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "kotlin.math a zaokrúhlenie",
      text: UKAZ('import kotlin.math.*\n\nfun main() {\n    println(sqrt(16.0))\n    println(2.0.pow(10))\n    println(abs(-7))\n    println(max(3, 9))\n    println(PI)\n    println("%.2f".format(PI))\n}', "4.0\n1024.0\n7\n9\n3.141592653589793\n3.14"),
      podrobne: "<p><code>import kotlin.math.*</code> sprístupní matematické funkcie. Formát na 2 desatinné miesta: <code>\"%.2f\".format(x)</code>. Desatinný oddeľovač môže závisieť od jazyka zariadenia.</p>" },
    { typ: "volba", otazka: "Ako vypíšeš x na jedno desatinné miesto?", moznosti: ["<code>\"%.1f\".format(x)</code>", "<code>x.round(1)</code>", "<code>format(x, 1)</code>", "<code>x:.1f</code>"], spravna: 0, vysvetlenie: "String.format." },
    { typ: "kod", zadanie: "Načítaj polomer kruhu (vstup <b>3</b>) ako Double a vypíš obsah na 2 desatinné miesta: <b>Obsah: 28.27</b>. Použi <code>PI</code> z kotlin.math.",
      karty: ["kt"], vstup: "3", start: { kt: "import kotlin.math.PI\n\nfun main() {\n    val r = readln().toDouble()\n    \n}" }, vyska: "150px",
      napoveda: 'println("Obsah: ${"%.2f".format(PI * r * r)}")', riesenie: { kt: 'import kotlin.math.PI\n\nfun main() {\n    val r = readln().toDouble()\n    println("Obsah: ${"%.2f".format(PI * r * r)}")\n}' },
      kontrola: function (v, kod) { if (!/PI/.test(kod)) return "Použi PI."; return (r(v)[0] || "").replace(",", ".") === "Obsah: 28.27" ? null : "Výstup má byť Obsah: 28.27"; },
      vysvetlenie: "Šablóna môže obsahovať aj volanie format." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li><code>val</code> a <code>var</code>.</li><li>Typy Int, Double, Boolean, Char, String.</li><li><code>readln()</code>, <code>toInt()</code>, <code>split</code> a <code>map</code>.</li><li>Funkcie textu a <code>in</code>.</li><li>kotlin.math a <code>\"%.2f\".format</code>.</li></ul>", tip: "Ďalej podmienky a cykly." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "kotlin-2-1", otazka: "Ktorým slovom vytvoríš premennú, ktorú môžeš meniť?", moznosti: ["var", "val", "let", "const"], spravna: 0, vysvetlenie: "var = variable." },
    { typ: "volba", lekcia: "kotlin-2-2", otazka: "Ako sa v Kotline píše typ celého čísla?", moznosti: ["Int", "int", "Integer", "number"], spravna: 0, vysvetlenie: "S veľkým I." },
    { typ: "volba", lekcia: "kotlin-2-3", otazka: "Čo vráti <code>readln()</code>?", moznosti: ["Text (String)", "Int", "Double", "null vždy"], spravna: 0, vysvetlenie: "Čísla treba previesť." },
    { typ: "volba", lekcia: "kotlin-2-4", otazka: "Ako zistíš dĺžku textu <code>s</code>?", moznosti: ["<code>s.length</code>", "<code>s.length()</code>", "<code>len(s)</code>", "<code>s.size()</code>"], spravna: 0, vysvetlenie: "Vlastnosť length." },
    { typ: "volba", lekcia: "kotlin-2-4", otazka: "Čo vráti <code>'a' in \"banán\"</code>?", moznosti: ["true", "false", "1", "chybu"], spravna: 0, vysvetlenie: "Znak a v texte je." },
    { typ: "volba", lekcia: "kotlin-2-5", otazka: "Čo treba na použitie <code>sqrt</code>?", moznosti: ["import kotlin.math.*", "Nič", "import java.math", "using Math"], spravna: 0, vysvetlenie: "kotlin.math." },
    { typ: "doplnenie", lekcia: "kotlin-2-3", otazka: "Načítaj číslo:", sablona: "val x = [[0]]().[[1]]()", zetony: ["readln", "toInt", "input", "parseInt", "read"], spravne: ["readln", "toInt"], vysvetlenie: "readln().toInt()" },
  ];

  K.registrujModul("kotlin", { cislo: 2, nazov: "Typy a vstup", popis: "val a var, typy, readln a prevody, text a matematika.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
