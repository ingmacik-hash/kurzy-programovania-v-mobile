/* Kotlin · Modul 4 · Funkcie a kolekcie */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "kt"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "kt", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function program(funkcie, telo) { return (funkcie ? funkcie + "\n\n" : "") + "fun main() {\n" + telo + "\n}"; }

  var L1 = { id: "kotlin-4-1", nazov: "Funkcie", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "fun",
      text: UKAZ('fun stvorec(x: Int): Int {\n    return x * x\n}\n\nfun obsah(a: Double, b: Double) = a * b\n\nfun pozdrav(meno: String, pozdrav: String = "Ahoj") {\n    println("$pozdrav, $meno!")\n}\n\nfun main() {\n    println(stvorec(9))\n    println(obsah(2.0, 3.5))\n    pozdrav("Jana")\n    pozdrav(meno = "Peter", pozdrav = "Servus")\n}', "81\n7.0\nAhoj, Jana!\nServus, Peter!"),
      podrobne: "<ul><li>Typ parametra sa píše za dvojbodku: <code>x: Int</code>.</li><li>Návratový typ za zátvorky: <code>): Int</code>. Funkcia bez výsledku vracia Unit (netreba písať).</li><li>Krátka funkcia: <code>fun obsah(a: Double, b: Double) = a * b</code>.</li><li>Predvolené hodnoty a pomenované argumenty.</li></ul>" },
    { typ: "volba", otazka: "Ako zapíšeš parameter typu Int?", moznosti: ["<code>x: Int</code>", "<code>Int x</code>", "<code>x Int</code>", "<code>int x</code>"], spravna: 0, vysvetlenie: "Meno: Typ." },
    { typ: "kod", zadanie: "Napíš funkciu <code>fun jePrvocislo(n: Int): Boolean</code> a v main vypíš prvočísla od 2 do 30 oddelené medzerou: <b>2 3 5 7 11 13 17 19 23 29</b>.",
      karty: ["kt"], start: { kt: program("", "    ") }, vyska: "220px",
      napoveda: "if (n < 2) return false; for (d in 2 until n) if (n % d == 0) return false; return true.  Výpis: (2..30).filter { jePrvocislo(it) }.joinToString(\" \")", riesenie: { kt: program("fun jePrvocislo(n: Int): Boolean {\n    if (n < 2) return false\n    for (d in 2 until n) {\n        if (n % d == 0) return false\n    }\n    return true\n}", '    println((2..30).filter { jePrvocislo(it) }.joinToString(" "))') },
      kontrola: function (v, kod) { if (!/fun\s+jePrvocislo\s*\(\s*n\s*:\s*Int\s*\)\s*:\s*Boolean/.test(kod)) return "Chýba funkcia fun jePrvocislo(n: Int): Boolean."; return r(v)[0] === "2 3 5 7 11 13 17 19 23 29" ? null : "Výstup má byť 2 3 5 7 11 13 17 19 23 29"; },
      vysvetlenie: "filter a joinToString uvidíš o chvíľu podrobne." },
  ] };

  var L2 = { id: "kotlin-4-2", nazov: "Zoznamy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "listOf a mutableListOf",
      text: UKAZ('val ovocie = listOf("jablko", "hruška", "slivka")\nprintln(ovocie[0])\nprintln(ovocie.size)\n\nval nakup = mutableListOf("chlieb")\nnakup.add("mlieko")\nnakup.remove("chlieb")\nnakup += "syr"\nprintln(nakup)\nprintln("syr" in nakup)', "jablko\n3\n[mlieko, syr]\ntrue"),
      podrobne: "<p><code>listOf</code> vytvorí zoznam, ktorý sa nedá meniť. <code>mutableListOf</code> sa meniť dá. Rovnaký princíp ako val a var: menej meniteľnosti = menej chýb. Prechod: <code>for (o in ovocie)</code> alebo <code>ovocie.forEach { println(it) }</code>.</p>" },
    { typ: "volba", otazka: "Do ktorého zoznamu môžeš pridávať?", moznosti: ["mutableListOf(…)", "listOf(…)", "do oboch", "do žiadneho"], spravna: 0, vysvetlenie: "mutable = meniteľný." },
    { typ: "kod", zadanie: "Načítaj slová v jednom riadku (vstup <b>pes mačka pes vták mačka pes</b>) a do <code>mutableListOf&lt;String&gt;()</code> pridaj len tie, ktoré v ňom ešte nie sú. Vypíš zoznam: <b>[pes, mačka, vták]</b>.",
      karty: ["kt"], vstup: "pes mačka pes vták mačka pes", start: { kt: program("", '    val slova = readln().split(" ")\n    val jedinecne = mutableListOf<String>()\n    ') }, vyska: "170px",
      napoveda: "for (s in slova) if (s !in jedinecne) jedinecne.add(s)", riesenie: { kt: program("", '    val slova = readln().split(" ")\n    val jedinecne = mutableListOf<String>()\n    for (s in slova) {\n        if (s !in jedinecne) jedinecne.add(s)\n    }\n    println(jedinecne)') },
      kontrola: function (v, kod) { if (!/\.add\s*\(|\+=/.test(kod)) return "Pridávaj cez add."; return r(v)[0] === "[pes, mačka, vták]" ? null : "Výstup má byť [pes, mačka, vták]"; },
      vysvetlenie: "!in = nie je v." },
  ] };

  var L3 = { id: "kotlin-4-3", nazov: "Lambdy: filter a map", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Funkcie nad kolekciami",
      text: UKAZ('val c = listOf(5, 2, 9, 1, 7)\nprintln(c.sum())\nprintln(c.maxOrNull())\nprintln(c.average())\nprintln(c.filter { it > 4 })\nprintln(c.map { it * 2 })\nprintln(c.sorted())\nprintln(c.count { it % 2 == 1 })\nprintln(c.joinToString(" + "))', "24\n9\n4.8\n[5, 9, 7]\n[10, 4, 18, 2, 14]\n[1, 2, 5, 7, 9]\n4\n5 + 2 + 9 + 1 + 7"),
      podrobne: "<p><code>{ it &gt; 4 }</code> je <b>lambda</b>: krátka funkcia, kde <code>it</code> je aktuálny prvok. filter vyberá, map mení, sorted triedi, count počíta. Spájajú sa za sebou: <code>c.filter { it &gt; 2 }.map { it * 10 }.sum()</code>.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>listOf(1, 2, 3, 4).filter { it % 2 == 0 }.sum()</code>?", moznosti: ["6", "10", "4", "[2, 4]"], spravna: 0, vysvetlenie: "2 + 4." },
    { typ: "kod", zadanie: "Načítaj známky v jednom riadku (vstup <b>1 3 2 5 1 2</b>) ako zoznam Int. Vypíš priemer na 2 miesta, počet jednotiek a zoradené známky: <b>Priemer: 2.33</b>, <b>Jednotiek: 2</b>, <b>[1, 1, 2, 2, 3, 5]</b>.",
      karty: ["kt"], vstup: "1 3 2 5 1 2", start: { kt: program("", '    val z = readln().split(" ").map { it.toInt() }\n    ') }, vyska: "170px",
      napoveda: 'println("Priemer: ${"%.2f".format(z.average())}")  z.count { it == 1 }  z.sorted()', riesenie: { kt: program("", '    val z = readln().split(" ").map { it.toInt() }\n    println("Priemer: ${"%.2f".format(z.average())}")\n    println("Jednotiek: ${z.count { it == 1 }}")\n    println(z.sorted())') },
      kontrola: function (v, kod) { if (!/count\s*\{/.test(kod)) return "Jednotky spočítaj cez count { … }."; var l = r(v).map(function (x) { return x.replace(/(\d),(\d)/, "$1.$2"); }); return l.join("|") === "Priemer: 2.33|Jednotiek: 2|[1, 1, 2, 2, 3, 5]" ? null : "Výstup má byť Priemer: 2.33, Jednotiek: 2, [1, 1, 2, 2, 3, 5]"; },
      vysvetlenie: "Bez jediného cyklu." },
  ] };

  var L4 = { id: "kotlin-4-4", nazov: "Mapy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kľúč → hodnota",
      text: UKAZ('val ceny = mutableMapOf("chlieb" to 1.2, "mlieko" to 0.9)\nceny["syr"] = 2.5\nprintln(ceny["mlieko"])\nprintln(ceny["vajcia"])\nprintln(ceny.getOrDefault("vajcia", 0.0))\nfor ((tovar, cena) in ceny) println("$tovar: $cena")', "0.9\nnull\n0.0\nchlieb: 1.2\nmlieko: 0.9\nsyr: 2.5"),
      podrobne: "<p><code>\"chlieb\" to 1.2</code> vytvorí dvojicu. Neexistujúci kľúč vráti <code>null</code> (nie chybu). Počítanie výskytov má Kotlin hotové: <code>slova.groupingBy { it }.eachCount()</code>.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>mapOf(\"a\" to 1)[\"b\"]</code>?", moznosti: ["null", "0", "chybu", "\"b\""], spravna: 0, vysvetlenie: "Chýbajúci kľúč = null." },
    { typ: "kod", zadanie: "Načítaj slová v jednom riadku (vstup <b>pes mačka pes vták pes mačka</b>) a spočítaj výskyty do <code>mutableMapOf&lt;String, Int&gt;()</code>. Vypíš v poradí prvého výskytu: <b>pes: 3</b>, <b>mačka: 2</b>, <b>vták: 1</b>.",
      karty: ["kt"], vstup: "pes mačka pes vták pes mačka", start: { kt: program("", '    val slova = readln().split(" ")\n    val pocty = mutableMapOf<String, Int>()\n    ') }, vyska: "180px",
      napoveda: "for (s in slova) pocty[s] = (pocty[s] ?: 0) + 1   potom for ((k, v) in pocty) println(\"$k: $v\")", riesenie: { kt: program("", '    val slova = readln().split(" ")\n    val pocty = mutableMapOf<String, Int>()\n    for (s in slova) pocty[s] = (pocty[s] ?: 0) + 1\n    for ((k, v) in pocty) println("$k: $v")') },
      kontrola: function (v, kod) { if (!/MapOf|mapOf/.test(kod)) return "Použi mapu."; return r(v).join("|") === "pes: 3|mačka: 2|vták: 1" ? null : "Výstup má byť pes: 3, mačka: 2, vták: 1."; },
      vysvetlenie: "?: 0 znamená „ak je null, použi 0“ (viac v ďalšom module)." },
  ] };

  var L5 = { id: "kotlin-4-5", nazov: "Funkcie ako hodnoty", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Lambda v premennej",
      text: UKAZ('val dvakrat = { x: Int -> x * 2 }\nprintln(dvakrat(21))\n\nfun aplikuj(c: List<Int>, f: (Int) -> Int) = c.map(f)\nprintln(aplikuj(listOf(1, 2, 3), dvakrat))\nprintln(aplikuj(listOf(1, 2, 3)) { it * it })', "42\n[2, 4, 6]\n[1, 4, 9]"),
      podrobne: "<p>Typ <code>(Int) -&gt; Int</code> znamená „funkcia, ktorá dostane Int a vráti Int“. Ak je lambda posledný argument, píše sa za zátvorky. Presne tak fungujú filter a map.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>{ a: Int, b: Int -&gt; a + b }(2, 3)</code>?", moznosti: ["5", "23", "chybu", "(2, 3)"], spravna: 0, vysvetlenie: "Lambda sa hneď zavolá." },
    { typ: "kod", zadanie: "Napíš funkciu <code>fun pocetSplnujucich(c: List&lt;Int&gt;, podmienka: (Int) -&gt; Boolean): Int</code>, ktorá vráti, koľko prvkov spĺňa podmienku. V main pre <code>listOf(4, 9, 1, 7, 12, 3)</code> vypíš počet čísel väčších ako 5: <b>3</b>.",
      karty: ["kt"], start: { kt: program("", "    val cisla = listOf(4, 9, 1, 7, 12, 3)\n    ") }, vyska: "200px",
      napoveda: "fun pocetSplnujucich(c: List<Int>, podmienka: (Int) -> Boolean): Int { var p = 0; for (x in c) if (podmienka(x)) p++; return p }", riesenie: { kt: program("fun pocetSplnujucich(c: List<Int>, podmienka: (Int) -> Boolean): Int {\n    var p = 0\n    for (x in c) {\n        if (podmienka(x)) p++\n    }\n    return p\n}", "    val cisla = listOf(4, 9, 1, 7, 12, 3)\n    println(pocetSplnujucich(cisla) { it > 5 })") },
      kontrola: function (v, kod) { if (!/\(\s*Int\s*\)\s*->\s*Boolean/.test(kod)) return "Parameter podmienka má typ (Int) -> Boolean."; return r(v)[0] === "3" ? null : "Výstup má byť 3."; },
      vysvetlenie: "Vlastná funkcia, ktorá prijíma inú funkciu." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li><code>fun</code>, typy parametrov, predvolené a pomenované argumenty.</li><li><code>listOf</code>, <code>mutableListOf</code>, <code>in</code>.</li><li>Lambdy: filter, map, sorted, count, sum, joinToString.</li><li><code>mapOf</code>, <code>mutableMapOf</code>.</li><li>Funkcie ako hodnoty.</li></ul>", tip: "Posledný modul: triedy a bezpečná práca s null." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "kotlin-4-1", otazka: "Kde sa píše návratový typ funkcie?", moznosti: ["Za zátvorky: fun f(): Int", "Pred fun", "Za názov bez dvojbodky", "Nepíše sa nikdy"], spravna: 0, vysvetlenie: "fun f(x: Int): Int" },
    { typ: "volba", lekcia: "kotlin-4-1", otazka: "Čo vráti <code>fun f(x: Int = 3) = x * 2</code> pri volaní <code>f()</code>?", moznosti: ["6", "0", "chybu", "3"], spravna: 0, vysvetlenie: "Predvolená hodnota 3." },
    { typ: "volba", lekcia: "kotlin-4-2", otazka: "Ako zistíš počet prvkov zoznamu?", moznosti: ["<code>zoznam.size</code>", "<code>zoznam.length</code>", "<code>zoznam.count()</code> je jediná možnosť", "<code>len(zoznam)</code>"], spravna: 0, vysvetlenie: "size." },
    { typ: "volba", lekcia: "kotlin-4-3", otazka: "Čo je <code>it</code> v <code>c.filter { it &gt; 0 }</code>?", moznosti: ["Aktuálny prvok", "Celý zoznam", "Index", "Výsledok"], spravna: 0, vysvetlenie: "Implicitný parameter lambdy." },
    { typ: "volba", lekcia: "kotlin-4-3", otazka: "Čo vráti <code>listOf(1, 2, 3).map { it * 10 }</code>?", moznosti: ["[10, 20, 30]", "60", "[1, 2, 3, 10]", "[11, 12, 13]"], spravna: 0, vysvetlenie: "map zmení každý prvok." },
    { typ: "volba", lekcia: "kotlin-4-4", otazka: "Ako vytvoríš dvojicu kľúč–hodnota v mapOf?", moznosti: ["<code>\"a\" to 1</code>", "<code>\"a\": 1</code>", "<code>\"a\" =&gt; 1</code>", "<code>(\"a\", 1)</code> je jediná možnosť"], spravna: 0, vysvetlenie: "to" },
    { typ: "doplnenie", lekcia: "kotlin-4-3", otazka: "Párne čísla vynásob dvomi:", sablona: "c.[[0]] { it % 2 == 0 }.[[1]] { it * 2 }", zetony: ["filter", "map", "where", "select", "forEach"], spravne: ["filter", "map"], vysvetlenie: "filter, potom map." },
  ];

  K.registrujModul("kotlin", { cislo: 4, nazov: "Funkcie a kolekcie", popis: "Funkcie, zoznamy, lambdy, mapy a funkcie ako hodnoty.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
