/* Kotlin · Modul 5 · Triedy a null */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "kt"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "kt", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function program(triedy, telo) { return (triedy ? triedy + "\n\n" : "") + "fun main() {\n" + telo + "\n}"; }

  var L1 = { id: "kotlin-5-1", nazov: "Triedy", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Trieda na jednom riadku",
      text: "<p>V Kotline sa vlastnosti triedy píšu priamo do <b>primárneho konštruktora</b>. Objekt sa vytvára bez slova new:</p>" + UKAZ('class Hrac(val meno: String, var zivoty: Int = 3) {\n    fun zasah() {\n        zivoty--\n        println("$meno má $zivoty životy")\n    }\n}\n\nfun main() {\n    val h = Hrac("Mario")\n    h.zasah()\n    h.zasah()\n}', "Mario má 2 životy\nMario má 1 životy"),
      podrobne: "<p><code>val meno</code> sa dá len čítať, <code>var zivoty</code> aj meniť. V Jave by to isté zabralo konštruktor, dva atribúty a gettery. Overenie hodnôt pri vzniku: blok <code>init { require(zivoty &gt; 0) }</code>.</p>" },
    { typ: "volba", otazka: "Ako vytvoríš objekt triedy Hrac?", moznosti: ["<code>Hrac(\"Mario\")</code>", "<code>new Hrac(\"Mario\")</code> je jediná možnosť", "<code>Hrac.create(\"Mario\")</code>", "<code>object Hrac</code>"], spravna: 0, vysvetlenie: "Bez new." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Obdlznik(val a: Double, val b: Double)</code> s funkciami <code>obsah()</code> a <code>obvod()</code>. V main pre obdĺžnik 3 × 4.5 vypíš <b>Obsah: 13.5, obvod: 15.0</b>.",
      karty: ["kt"], start: { kt: program("", "    ") }, vyska: "200px",
      napoveda: "class Obdlznik(val a: Double, val b: Double) { fun obsah() = a * b; fun obvod() = 2 * (a + b) }", riesenie: { kt: program("class Obdlznik(val a: Double, val b: Double) {\n    fun obsah() = a * b\n    fun obvod() = 2 * (a + b)\n}", '    val o = Obdlznik(3.0, 4.5)\n    println("Obsah: ${o.obsah()}, obvod: ${o.obvod()}")') },
      kontrola: function (v, kod) { if (!/class\s+Obdlznik\s*\(/.test(kod)) return "Vytvor triedu class Obdlznik(…)."; return r(v)[0] === "Obsah: 13.5, obvod: 15.0" ? null : "Výstup má byť Obsah: 13.5, obvod: 15.0"; },
      vysvetlenie: "Trieda aj s funkciami na štyroch riadkoch." },
  ] };

  var L2 = { id: "kotlin-5-2", nazov: "data class", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Trieda na údaje",
      text: UKAZ('data class Produkt(val nazov: String, val cena: Double)\n\nfun main() {\n    val a = Produkt("Myš", 19.9)\n    val b = Produkt("Myš", 19.9)\n    println(a)\n    println(a == b)\n    val c = a.copy(cena = 15.0)\n    println(c)\n}', "Produkt(nazov=Myš, cena=19.9)\ntrue\nProdukt(nazov=Myš, cena=15.0)"),
      podrobne: "<p><code>data class</code> automaticky dostane pekný <code>toString</code>, porovnanie <code>==</code> podľa obsahu a <code>copy</code>. Je ideálna na záznamy: produkty, žiakov, správy.</p>" },
    { typ: "volba", otazka: "Čo pridá <code>data</code> pred class?", moznosti: ["toString, porovnanie podľa obsahu a copy", "Uloženie do databázy", "Zakáže zmeny", "Nič"], spravna: 0, vysvetlenie: "Užitočné metódy zadarmo." },
    { typ: "kod", zadanie: "Vytvor <code>data class Ziak(val meno: String, val body: Int)</code>. Zo zoznamu žiakov Jana 87, Peter 64, Eva 92 vypíš najlepšieho cez <code>maxByOrNull</code>: <b>Ziak(meno=Eva, body=92)</b>.",
      karty: ["kt"], start: { kt: program("", "    ") }, vyska: "200px",
      napoveda: 'val ziaci = listOf(Ziak("Jana", 87), Ziak("Peter", 64), Ziak("Eva", 92)); println(ziaci.maxByOrNull { it.body })', riesenie: { kt: program("data class Ziak(val meno: String, val body: Int)", '    val ziaci = listOf(Ziak("Jana", 87), Ziak("Peter", 64), Ziak("Eva", 92))\n    println(ziaci.maxByOrNull { it.body })') },
      kontrola: function (v, kod) { if (!/data\s+class\s+Ziak/.test(kod)) return "Vytvor data class Ziak."; return r(v)[0] === "Ziak(meno=Eva, body=92)" ? null : "Výstup má byť Ziak(meno=Eva, body=92)"; },
      vysvetlenie: "toString vytvorila data class sama." },
  ] };

  var L3 = { id: "kotlin-5-3", nazov: "Null bezpečnosť", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Najslávnejšia vlastnosť Kotlinu",
      text: "<p>V iných jazykoch spôsobuje najviac pádov hodnota <b>null</b> (nič). Kotlin rozlišuje typy, ktoré null mať <b>môžu</b> (s otáznikom) a ktoré <b>nie</b>:</p>" + UKAZ('var meno: String = "Jana"\n// meno = null      ← chyba prekladu\nvar prezyvka: String? = null\nprintln(prezyvka?.length)\nprintln(prezyvka ?: "bez prezývky")\nprezyvka = "Janka"\nprintln(prezyvka?.length)', "null\nbez prezývky\n5"),
      podrobne: P.tabulka(["Zápis", "Význam"], [["<code>String?</code>", "text alebo null"], ["<code>x?.length</code>", "ak x nie je null, vráť dĺžku, inak null"], ["<code>x ?: \"náhrada\"</code>", "Elvis: ak je x null, použi náhradu"], ["<code>x!!</code>", "„viem, že to nie je null“; ak je, program spadne"]]) },
    { typ: "volba", otazka: "Čo vráti <code>val s: String? = null; s ?: \"nič\"</code>?", moznosti: ["\"nič\"", "null", "chybu", "\"\""], spravna: 0, vysvetlenie: "Elvis operátor dá náhradu." },
    { typ: "volba", otazka: "Prečo prekladač odmietne <code>val s: String? = …; println(s.length)</code>?", moznosti: ["s môže byť null, treba ?. alebo kontrolu", "length neexistuje", "Chýba bodkočiarka", "Neodmietne"], spravna: 0, vysvetlenie: "Kotlin ťa prinúti myslieť na null." },
    { typ: "kod", zadanie: "Na vstupe sú tri riadky (<b>12</b>, <b>abc</b>, <b>30</b>). Každý preveď cez <code>toIntOrNull()</code> a neplatné nahraď nulou cez <code>?:</code>. Vypíš <b>Súčet: 42</b>.",
      karty: ["kt"], vstup: "12\nabc\n30", start: { kt: program("", "    var sucet = 0\n    repeat(3) {\n        val text = readln()\n        \n    }\n    ") }, vyska: "200px",
      napoveda: "sucet += text.toIntOrNull() ?: 0", riesenie: { kt: program("", '    var sucet = 0\n    repeat(3) {\n        val text = readln()\n        sucet += text.toIntOrNull() ?: 0\n    }\n    println("Súčet: $sucet")') },
      kontrola: function (v, kod) { if (!/toIntOrNull/.test(kod) || !/\?:/.test(kod)) return "Použi toIntOrNull() a ?: 0."; return r(v)[0] === "Súčet: 42" ? null : "Výstup má byť Súčet: 42"; },
      vysvetlenie: "Program nespadol ani na „abc“." },
  ] };

  var L4 = { id: "kotlin-5-4", nazov: "Zapuzdrenie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "private set",
      text: UKAZ('class Ucet(val majitel: String) {\n    var zostatok = 0.0\n        private set\n\n    fun vloz(suma: Double) { if (suma > 0) zostatok += suma }\n    fun vyber(suma: Double): Boolean {\n        if (suma <= 0 || suma > zostatok) return false\n        zostatok -= suma\n        return true\n    }\n}\n\nfun main() {\n    val u = Ucet("Jana")\n    u.vloz(100.0)\n    println("${u.vyber(500.0)} ${u.zostatok}")\n}', "false 100.0"),
      podrobne: "<p><code>private set</code> pod vlastnosťou znamená: čítať môže každý, meniť len trieda. <code>u.zostatok = 1e6</code> by prekladač odmietol. Celé vlastnosti či funkcie skryješ cez <code>private</code>.</p>" },
    { typ: "volba", otazka: "Čo znamená <code>private set</code>?", moznosti: ["Hodnotu môže meniť len trieda", "Hodnotu nemožno čítať", "Hodnota je konštanta", "Nič"], spravna: 0, vysvetlenie: "Zápis len zvnútra." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Teplomer</code> s vlastnosťou <code>var teplota = 0.0</code> s <code>private set</code> a funkciou <code>fun nastav(t: Double): Boolean</code>, ktorá prijme len −50 až 60. V main nastav 21.5, potom 100 a vypíš <b>21.5</b>.",
      karty: ["kt"], start: { kt: program("", "    ") }, vyska: "220px",
      napoveda: "fun nastav(t: Double): Boolean { if (t !in -50.0..60.0) return false; teplota = t; return true }", riesenie: { kt: program("class Teplomer {\n    var teplota = 0.0\n        private set\n\n    fun nastav(t: Double): Boolean {\n        if (t !in -50.0..60.0) return false\n        teplota = t\n        return true\n    }\n}", "    val t = Teplomer()\n    t.nastav(21.5)\n    t.nastav(100.0)\n    println(t.teplota)") },
      kontrola: function (v, kod) { if (!/private\s+set/.test(kod)) return "Použi private set."; return r(v)[0] === "21.5" ? null : "Výstup má byť 21.5"; },
      vysvetlenie: "Rozsah sa dá použiť aj na desatinné čísla." },
  ] };

  var L5 = { id: "kotlin-5-5", nazov: "Dedičnosť a open", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "open a override",
      text: "<p>V Kotline sú triedy predvolene <b>uzavreté</b>: dediť sa dá len z triedy označenej <code>open</code>. Tak isto metóda, ktorú chceš prepísať:</p>" + UKAZ('open class Zviera(val meno: String) {\n    open fun zvuk() = "..."\n    fun ozvi() = println("$meno: ${zvuk()}")\n}\n\nclass Macka(meno: String) : Zviera(meno) {\n    override fun zvuk() = "Mňau"\n}\n\nfun main() {\n    val zoo = listOf(Macka("Micka"), Zviera("Ryba"))\n    zoo.forEach { it.ozvi() }\n}', "Micka: Mňau\nRyba: ..."),
      podrobne: "<p>Uzavretosť je zámer: chráni triedy pred nečakaným zneužitím. Abstraktnú triedu, z ktorej nemožno vytvoriť objekt, označíš <code>abstract</code>.</p>" },
    { typ: "volba", otazka: "Čo musí mať trieda, aby z nej šlo dediť?", moznosti: ["open", "public", "data", "nič"], spravna: 0, vysvetlenie: "Predvolene sú triedy final." },
    { typ: "kod", zadanie: "Trieda <code>open class Tvar { open fun obsah() = 0.0 }</code> je pripravená. Dopíš <code>Stvorec(val a: Double) : Tvar()</code> a <code>Kruh(val r: Double) : Tvar()</code> (π = kotlin.math.PI). Main vypíše súčet obsahov zaokrúhlený na 2 miesta: <b>Spolu: 19.14</b>.",
      karty: ["kt"], start: { kt: "import kotlin.math.PI\n\nopen class Tvar {\n    open fun obsah() = 0.0\n}\n\n\n\nfun main() {\n    val tvary = listOf(Stvorec(4.0), Kruh(1.0))\n    println(\"Spolu: ${\"%.2f\".format(tvary.sumOf { it.obsah() })}\")\n}" }, vyska: "240px",
      napoveda: "class Stvorec(val a: Double) : Tvar() { override fun obsah() = a * a }", riesenie: { kt: "import kotlin.math.PI\n\nopen class Tvar {\n    open fun obsah() = 0.0\n}\n\nclass Stvorec(val a: Double) : Tvar() {\n    override fun obsah() = a * a\n}\n\nclass Kruh(val r: Double) : Tvar() {\n    override fun obsah() = PI * r * r\n}\n\nfun main() {\n    val tvary = listOf(Stvorec(4.0), Kruh(1.0))\n    println(\"Spolu: ${\"%.2f\".format(tvary.sumOf { it.obsah() })}\")\n}" },
      kontrola: function (v, kod) { if (!/class\s+Stvorec[^{]*:\s*Tvar\(\)/.test(kod) || !/class\s+Kruh[^{]*:\s*Tvar\(\)/.test(kod)) return "Vytvor Stvorec(…) : Tvar() a Kruh(…) : Tvar()."; return (r(v)[0] || "").replace(",", ".") === "Spolu: 19.14" ? null : "Výstup má byť Spolu: 19.14"; },
      vysvetlenie: "16 + 3.14 = 19.14." },
    { typ: "vyklad", nadpis: "Kurz Kotlin máš za sebou",
      text: "<ul><li>println, šablóny, val a var, readln.</li><li>if výraz, when, rozsahy a cykly.</li><li>Funkcie, zoznamy, mapy a lambdy.</li><li>Triedy, data class, private set.</li><li>Null bezpečnosť: <code>?</code>, <code>?.</code>, <code>?:</code>.</li><li>open, override a dedičnosť.</li></ul>", tip: "Po teste ťa čakajú záverečné projekty: kvíz, zoznam úloh a analýza predaja." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "kotlin-5-1", otazka: "Kde sa v Kotline zvyčajne deklarujú vlastnosti triedy?", moznosti: ["V primárnom konštruktore: class A(val x: Int)", "Len v init bloku", "Mimo triedy", "V main"], spravna: 0, vysvetlenie: "Stručný zápis." },
    { typ: "volba", lekcia: "kotlin-5-2", otazka: "Čo vypíše <code>println(Bod(1, 2))</code> pre <code>data class Bod(val x: Int, val y: Int)</code>?", moznosti: ["Bod(x=1, y=2)", "Bod@1a2b3c", "(1, 2)", "chybu"], spravna: 0, vysvetlenie: "data class má pekný toString." },
    { typ: "volba", lekcia: "kotlin-5-3", otazka: "Ktorý typ môže obsahovať null?", moznosti: ["<code>Int?</code>", "<code>Int</code>", "<code>Int!</code>", "<code>Any</code> nie, nikdy"], spravna: 0, vysvetlenie: "Otáznik = môže byť null." },
    { typ: "volba", lekcia: "kotlin-5-3", otazka: "Čo vráti <code>\"x\".toIntOrNull()</code>?", moznosti: ["null", "0", "chybu", "\"x\""], spravna: 0, vysvetlenie: "Bez pádu." },
    { typ: "volba", lekcia: "kotlin-5-4", otazka: "Čo znamená <code>var x = 0; private set</code>?", moznosti: ["Čítať môže každý, meniť len trieda", "Nikto nemôže čítať", "Je to konštanta", "Chyba"], spravna: 0, vysvetlenie: "Zapuzdrenie." },
    { typ: "volba", lekcia: "kotlin-5-5", otazka: "Prečo nejde <code>class B : A()</code>, keď A nie je open?", moznosti: ["Triedy sú v Kotline predvolene uzavreté", "Chýba new", "Chýba data", "Ide to"], spravna: 0, vysvetlenie: "Treba open class A." },
    { typ: "doplnenie", lekcia: "kotlin-5-3", otazka: "Dĺžka textu, alebo 0 pri null:", sablona: "val d = text[[0]]length [[1]] 0", zetony: ["?.", "?:", "!!", ".", "??"], spravne: ["?.", "?:"], vysvetlenie: "text?.length ?: 0" },
  ];

  K.registrujModul("kotlin", { cislo: 5, nazov: "Triedy a null", popis: "Triedy, data class, null bezpečnosť, private set a dedičnosť.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("kotlin", [
    { kat: "Základy", znak: "fun main()", nazov: "Hlavná funkcia", popis: "Tu program začína. Bodkočiarky netreba." },
    { kat: "Základy", znak: "println / print", nazov: "Výpis", popis: "S novým riadkom / bez neho.", priklad: 'println("Súčet: ${a + b}")' },
    { kat: "Základy", znak: "$x / ${…}", nazov: "Šablóna reťazca", popis: "Vloží hodnotu alebo výraz do textu." },
    { kat: "Základy", znak: "readln()", nazov: "Vstup", popis: "Načíta riadok. Čísla cez toInt().", priklad: "val x = readln().toInt()" },
    { kat: "Premenné", znak: "val / var", nazov: "Nemenná / meniteľná", popis: "Uprednostňuj val." },
    { kat: "Premenné", znak: "Int Double String Boolean", nazov: "Typy", popis: "S veľkým začiatočným písmenom." },
    { kat: "Riadenie", znak: "if (…) a else b", nazov: "if výraz", popis: "if vracia hodnotu." },
    { kat: "Riadenie", znak: "when", nazov: "Voľba", popis: "Vetvy so zoznamami a rozsahmi, else.", priklad: 'when (x) {\n    in 1..5 -> "malé"\n    else -> "veľké"\n}' },
    { kat: "Riadenie", znak: "1..n / until / downTo / step", nazov: "Rozsahy", popis: "for (i in 1..n)" },
    { kat: "Funkcie", znak: "fun f(x: Int): Int", nazov: "Funkcia", popis: "Typ parametra a výsledku za dvojbodkou." },
    { kat: "Funkcie", znak: "{ it * 2 }", nazov: "Lambda", popis: "it = aktuálny prvok." },
    { kat: "Kolekcie", znak: "listOf / mutableListOf", nazov: "Zoznam", popis: "Nemenný / meniteľný." },
    { kat: "Kolekcie", znak: "filter / map / sorted / sum", nazov: "Operácie", popis: "Spájajú sa za sebou." },
    { kat: "Kolekcie", znak: "mapOf(\"a\" to 1)", nazov: "Mapa", popis: "Kľúč → hodnota, chýbajúci kľúč = null." },
    { kat: "Triedy", znak: "class A(val x: Int)", nazov: "Trieda", popis: "Vlastnosti v primárnom konštruktore, bez new." },
    { kat: "Triedy", znak: "data class", nazov: "Dátová trieda", popis: "toString, == a copy zadarmo." },
    { kat: "Triedy", znak: "open / override", nazov: "Dedičnosť", popis: "Triedy sú predvolene uzavreté." },
    { kat: "Null", znak: "String?", nazov: "Môže byť null", popis: "Typ s otáznikom." },
    { kat: "Null", znak: "?.", nazov: "Bezpečné volanie", popis: "Ak je null, vráti null namiesto pádu." },
    { kat: "Null", znak: "?:", nazov: "Elvis", popis: "Náhradná hodnota pri null." },
    { kat: "Null", znak: "!!", nazov: "Vynútenie", popis: "Pri null program spadne. Používaj zriedka." },
  ]);
})();
