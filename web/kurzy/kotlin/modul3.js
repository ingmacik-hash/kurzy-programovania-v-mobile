/* Kotlin · Modul 3 · Podmienky a cykly */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "kt"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "kt", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "fun main() {\n" + telo + "\n}"; }

  var L1 = { id: "kotlin-3-1", nazov: "if ako výraz", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "if, ktorý vracia hodnotu",
      text: UKAZ('val teplota = 18\nif (teplota > 25) {\n    println("Horúco")\n} else if (teplota > 15) {\n    println("Príjemne")\n} else {\n    println("Chladno")\n}\n\nval stav = if (teplota >= 0) "voda" else "ľad"\nprintln(stav)', "Príjemne\nvoda"),
      podrobne: "<p>V Kotline je <code>if</code> <b>výraz</b>: vráti hodnotu poslednej vetvy. Preto Kotlin nepotrebuje ternárny operátor <code>? :</code>. Logické operátory: <code>&amp;&amp;</code>, <code>||</code>, <code>!</code>.</p>" },
    { typ: "volba", otazka: "Čo bude v <code>v</code>?", kod: 'val x = 7\nval v = if (x % 2 == 0) "párne" else "nepárne"', moznosti: ["nepárne", "párne", "7", "chyba"], spravna: 0, vysvetlenie: "7 % 2 = 1." },
    { typ: "kod", zadanie: "Načítaj vek (vstup <b>16</b>) a do premennej <code>val listok</code> ulož cez <b>if výraz</b> text <b>detský</b> (do 17 vrátane) alebo <b>plný</b>. Vypíš <b>Lístok: detský</b>.",
      karty: ["kt"], vstup: "16", start: { kt: kostra("    val vek = readln().toInt()\n    ") }, vyska: "140px",
      napoveda: 'val listok = if (vek <= 17) "detský" else "plný"', riesenie: { kt: kostra('    val vek = readln().toInt()\n    val listok = if (vek <= 17) "detský" else "plný"\n    println("Lístok: $listok")') },
      kontrola: function (v, kod) { if (!/val\s+listok\s*=\s*if/.test(kod)) return "Ulož výsledok if výrazu: val listok = if (…) … else …"; return r(v)[0] === "Lístok: detský" ? null : "Výstup má byť Lístok: detský"; },
      vysvetlenie: "if výraz nahradí ternárny operátor." },
  ] };

  var L2 = { id: "kotlin-3-2", nazov: "when", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Silnejší switch",
      text: UKAZ('val mesiac = 7\nval obdobie = when (mesiac) {\n    12, 1, 2 -> "zima"\n    in 3..5 -> "jar"\n    in 6..8 -> "leto"\n    else -> "jeseň"\n}\nprintln(obdobie)', "leto"),
      podrobne: "<p><code>when</code> porovná hodnotu s vetvami a vráti výsledok prvej, ktorá sedí. Vie zoznamy (<code>12, 1, 2</code>), rozsahy (<code>in 3..5</code>) aj typy. Bez argumentu funguje ako reťaz if: <code>when { x &lt; 0 -&gt; …; x == 0 -&gt; …; else -&gt; … }</code>.</p>" },
    { typ: "volba", otazka: "Čo znamená <code>in 3..5</code>?", moznosti: ["Hodnota je od 3 do 5 vrátane", "3 alebo 5", "3 až 4", "Viac ako 3"], spravna: 0, vysvetlenie: "Rozsah vrátane oboch koncov." },
    { typ: "kod", zadanie: "Načítaj body (vstup <b>82</b>) a cez <code>when</code> s rozsahmi vypíš známku: 90..100 → <b>1</b>, 75..89 → <b>2</b>, 50..74 → <b>3</b>, 30..49 → <b>4</b>, inak <b>5</b>. Výpis: <b>Známka: 2</b>.",
      karty: ["kt"], vstup: "82", start: { kt: kostra("    val body = readln().toInt()\n    ") }, vyska: "200px",
      napoveda: "val z = when (body) { in 90..100 -> 1; in 75..89 -> 2; … else -> 5 }", riesenie: { kt: kostra('    val body = readln().toInt()\n    val z = when (body) {\n        in 90..100 -> 1\n        in 75..89 -> 2\n        in 50..74 -> 3\n        in 30..49 -> 4\n        else -> 5\n    }\n    println("Známka: $z")') },
      kontrola: function (v, kod) { if (!/when/.test(kod)) return "Použi when."; return r(v)[0] === "Známka: 2" ? null : "Pre 82 bodov má vyjsť Známka: 2."; },
      vysvetlenie: "when s rozsahmi je čitateľnejší ako reťaz if." },
  ] };

  var L3 = { id: "kotlin-3-3", nazov: "for a rozsahy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Cyklus cez rozsah",
      text: UKAZ('for (i in 1..5) print("$i ")\nprintln()\nfor (i in 0 until 5) print("$i ")\nprintln()\nfor (i in 10 downTo 0 step 3) print("$i ")\nprintln()\nfor (z in "Ahoj") print("$z-")', "1 2 3 4 5 \n0 1 2 3 4 \n10 7 4 1 \nA-h-o-j-"),
      podrobne: P.tabulka(["Zápis", "Čísla"], [["<code>1..5</code>", "1 až 5 vrátane"], ["<code>0 until 5</code>", "0 až 4 (bez 5)"], ["<code>10 downTo 0</code>", "10, 9, … 0"], ["<code>step 2</code>", "po dvoch"]]) + "<p><code>repeat(3) { … }</code> zopakuje blok trikrát.</p>" },
    { typ: "volba", otazka: "Ktoré čísla prejde <code>for (i in 0 until 3)</code>?", moznosti: ["0 1 2", "0 1 2 3", "1 2 3", "3"], spravna: 0, vysvetlenie: "until bez hornej hranice." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>7</b>) a vypíš súčet nepárnych čísel od 1 po n: <b>Súčet: 16</b> (1 + 3 + 5 + 7). Použi <code>step 2</code>.",
      karty: ["kt"], vstup: "7", start: { kt: kostra("    val n = readln().toInt()\n    ") }, vyska: "150px",
      napoveda: "var s = 0; for (i in 1..n step 2) s += i", riesenie: { kt: kostra('    val n = readln().toInt()\n    var s = 0\n    for (i in 1..n step 2) s += i\n    println("Súčet: $s")') },
      kontrola: function (v, kod) { if (!/step/.test(kod)) return "Použi step 2."; return r(v)[0] === "Súčet: 16" ? null : "Výstup má byť Súčet: 16"; },
      vysvetlenie: "Rozsah s krokom 2: 1, 3, 5, 7." },
  ] };

  var L4 = { id: "kotlin-3-4", nazov: "while", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Kým platí podmienka",
      text: UKAZ('var peniaze = 100.0\nvar roky = 0\nwhile (peniaze < 200) {\n    peniaze *= 1.1\n    roky++\n}\nprintln("Za $roky rokov")', "Za 8 rokov") + "<p><code>do { … } while (…)</code> prebehne aspoň raz.</p>",
      podrobne: "<p>Pozor na nekonečný cyklus: niečo v ňom musí meniť podmienku. Server, na ktorom sa Kotlin spúšťa, príliš dlhý program po chvíli zastaví.</p>" },
    { typ: "volba", otazka: "Čo chýba v cykle <code>var i = 0; while (i &lt; 5) { println(i) }</code>?", moznosti: ["i++, inak je cyklus nekonečný", "Bodkočiarka", "step", "Nič"], spravna: 0, vysvetlenie: "i sa nemení." },
    { typ: "kod", zadanie: "Ciferný súčet: načítaj číslo (vstup <b>98765</b>) a cyklom while sčítaj jeho cifry: <b>35</b>.",
      karty: ["kt"], vstup: "98765", start: { kt: kostra("    var n = readln().toInt()\n    ") }, vyska: "160px",
      napoveda: "var s = 0; while (n > 0) { s += n % 10; n /= 10 }", riesenie: { kt: kostra("    var n = readln().toInt()\n    var s = 0\n    while (n > 0) {\n        s += n % 10\n        n /= 10\n    }\n    println(s)") },
      kontrola: function (v, kod) { if (!/while/.test(kod)) return "Použi cyklus while."; return r(v)[0] === "35" ? null : "Pre 98765 má vyjsť 35."; },
      vysvetlenie: "% 10 je posledná cifra, / 10 ju odstráni." },
  ] };

  var L5 = { id: "kotlin-3-5", nazov: "break, continue, vnorené cykly", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Riadenie cyklu",
      text: UKAZ('for (i in 1..10) {\n    if (i % 3 == 0) continue\n    if (i > 8) break\n    print("$i ")\n}\nprintln()\nfor (r in 1..3) println("*".repeat(r))', "1 2 4 5 7 8 \n*\n**\n***"),
      podrobne: "<p>Na ukončenie vonkajšieho cyklu z vnútorného má Kotlin <b>návestia</b>: <code>vonku@ for (…) { for (…) { break@vonku } }</code>.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>\"ab\".repeat(2)</code>?", moznosti: ["abab", "ab2", "aabb", "chybu"], spravna: 0, vysvetlenie: "Zopakuje text." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>5</b>) a nakresli pravouhlý trojuholník z čísel:<br><code>1</code><br><code>1 2</code><br><code>1 2 3</code><br>… až <code>1 2 3 4 5</code>. Použi vnorené cykly.",
      karty: ["kt"], vstup: "5", start: { kt: kostra("    val n = readln().toInt()\n    ") }, vyska: "180px",
      napoveda: 'for (r in 1..n) { val riadok = (1..r).joinToString(" "); println(riadok) } alebo vnútorný for s print', riesenie: { kt: kostra('    val n = readln().toInt()\n    for (r in 1..n) {\n        for (s in 1..r) {\n            print(if (s == 1) "$s" else " $s")\n        }\n        println()\n    }') },
      kontrola: function (v, kod) { if ((kod.match(/for\s*\(/g) || []).length < 2 && !/joinToString/.test(kod)) return "Použi vnorené cykly."; return r(v).join("|") === "1|1 2|1 2 3|1 2 3 4|1 2 3 4 5" ? null : "Výstup má byť 5 riadkov: 1 / 1 2 / … / 1 2 3 4 5."; },
      vysvetlenie: "Vnútorný cyklus ide po aktuálny riadok." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li><code>if</code> ako výraz.</li><li><code>when</code> so zoznamami a rozsahmi.</li><li><code>for (i in 1..n)</code>, <code>until</code>, <code>downTo</code>, <code>step</code>.</li><li><code>while</code>, <code>break</code>, <code>continue</code>, <code>repeat</code>.</li></ul>", tip: "Ďalej funkcie a kolekcie." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "kotlin-3-1", otazka: "Prečo Kotlin nemá ternárny operátor <code>? :</code>?", moznosti: ["if je výraz a vracia hodnotu", "Je zakázaný", "Nahradí ho when vždy", "Má ho"], spravna: 0, vysvetlenie: "val x = if (…) a else b" },
    { typ: "volba", lekcia: "kotlin-3-2", otazka: "Čo je v when obdoba default?", moznosti: ["else", "default", "_", "otherwise"], spravna: 0, vysvetlenie: "else ->" },
    { typ: "volba", lekcia: "kotlin-3-3", otazka: "Ktoré čísla dá <code>5 downTo 1 step 2</code>?", moznosti: ["5 3 1", "5 4 3 2 1", "1 3 5", "5 3"], spravna: 0, vysvetlenie: "Od 5 nadol po dvoch." },
    { typ: "volba", lekcia: "kotlin-3-3", otazka: "Koľkokrát prebehne <code>for (i in 1..10)</code>?", moznosti: ["10", "9", "11", "1"], spravna: 0, vysvetlenie: ".. je vrátane." },
    { typ: "volba", lekcia: "kotlin-3-4", otazka: "Ktorý cyklus prebehne aspoň raz?", moznosti: ["do-while", "while", "for", "repeat(0)"], spravna: 0, vysvetlenie: "Podmienka na konci." },
    { typ: "volba", lekcia: "kotlin-3-5", otazka: "Čo spraví <code>continue</code>?", moznosti: ["Preskočí zvyšok kroku", "Ukončí cyklus", "Ukončí program", "Nič"], spravna: 0, vysvetlenie: "Ďalšie opakovanie." },
    { typ: "doplnenie", lekcia: "kotlin-3-3", otazka: "Cyklus 0 až 9:", sablona: "for (i [[0]] 0 [[1]] 10) println(i)", zetony: ["in", "until", "..", "to", "of"], spravne: ["in", "until"], vysvetlenie: "0 until 10" },
  ];

  K.registrujModul("kotlin", { cislo: 3, nazov: "Podmienky a cykly", popis: "if výraz, when, rozsahy, for, while, break a continue.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
