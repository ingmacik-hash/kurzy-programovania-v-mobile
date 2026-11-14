/* Kotlin · Záverečné projekty */
(function () {
  var P = K.pom;
  function r(v) { return P.riadky(v); }
  function ma(v, x) { return r(v).indexOf(x) >= 0; }

  K.registrujZaver("kotlin", [
    { id: "kotlin-p1", nazov: "Kvíz", minut: 30,
      popis: "Kvízová hra: otázky s možnosťami, hodnotenie odpovedí, skóre a známka na konci.",
      zadanie: "Vytvor <code>data class Otazka(val text: String, val moznosti: List&lt;String&gt;, val spravna: Int)</code> (spravna je číslo možnosti od 1). Priprav tieto 4 otázky v zozname:<ol><li>Hlavné mesto Slovenska? (Košice, Bratislava, Nitra) → 2</li><li>Koľko je 7 * 8? (54, 56, 64) → 2</li><li>Ktorý jazyk je oficiálny pre Android? (Kotlin, Swift, C#) → 1</li><li>Koľko bitov má bajt? (4, 8, 16) → 2</li></ol>Odpovede (čísla) čítaj zo vstupu. Pre každú otázku vypíš <code>N. text</code>, potom <code>Správne!</code> alebo <code>Nesprávne, správne je: možnosť</code>. Neplatný vstup (nie číslo 1–3) ber ako nesprávnu odpoveď. Na konci <code>Skóre: X/4 (P %)</code> a známku cez <code>when</code>: 4 → <code>Výborne!</code>, 3 → <code>Dobre</code>, inak <code>Skús znova</code>.",
      karty: ["kt"], vstup: "2\n54\n1\nx", start: { kt: "data class Otazka(val text: String, val moznosti: List<String>, val spravna: Int)\n\nfun main() {\n    \n}" },
      napoveda: "val otazky = listOf(Otazka(\"Hlavné mesto Slovenska?\", listOf(\"Košice\", \"Bratislava\", \"Nitra\"), 2), …). Odpoveď: readln().toIntOrNull(). Percentá: skore * 100 / otazky.size.",
      kriteria: [
        { text: "Otázky sa vypisujú s číslom", body: 1, test: function (v) { return ma(v, "1. Hlavné mesto Slovenska?") && ma(v, "4. Koľko bitov má bajt?"); } },
        { text: "Správna odpoveď sa vyhodnotí", body: 2, test: function (v) { var l = r(v), i = l.indexOf("1. Hlavné mesto Slovenska?"), j = l.indexOf("3. Ktorý jazyk je oficiálny pre Android?"); return i >= 0 && l[i + 1] === "Správne!" && j >= 0 && l[j + 1] === "Správne!"; } },
        { text: "Pri chybe sa ukáže správna možnosť", body: 2, test: function (v) { return ma(v, "Nesprávne, správne je: 56"); } },
        { text: "Neplatný vstup je nesprávna odpoveď (bez pádu)", body: 2, test: function (v) { return ma(v, "Nesprávne, správne je: 8"); } },
        { text: "Skóre a percentá", body: 2, test: function (v) { return ma(v, "Skóre: 2/4 (50 %)"); } },
        { text: "Hodnotenie cez when", body: 1, test: function (v, s) { return ma(v, "Skús znova") && /when/.test(s.kt); } },
        { text: "Otázky sú v data class a zozname", body: 1, test: function (v, s) { return /data\s+class\s+Otazka/.test(s.kt) && /listOf\s*\(\s*Otazka/.test(s.kt); } },
      ],
      riesenie: { kt: 'data class Otazka(val text: String, val moznosti: List<String>, val spravna: Int)\n\nfun main() {\n    val otazky = listOf(\n        Otazka("Hlavné mesto Slovenska?", listOf("Košice", "Bratislava", "Nitra"), 2),\n        Otazka("Koľko je 7 * 8?", listOf("54", "56", "64"), 2),\n        Otazka("Ktorý jazyk je oficiálny pre Android?", listOf("Kotlin", "Swift", "C#"), 1),\n        Otazka("Koľko bitov má bajt?", listOf("4", "8", "16"), 2),\n    )\n    var skore = 0\n    for ((i, o) in otazky.withIndex()) {\n        println("${i + 1}. ${o.text}")\n        val odpoved = readLine()?.toIntOrNull()\n        if (odpoved == o.spravna) {\n            println("Správne!")\n            skore++\n        } else {\n            println("Nesprávne, správne je: ${o.moznosti[o.spravna - 1]}")\n        }\n    }\n    println("Skóre: $skore/${otazky.size} (${skore * 100 / otazky.size} %)")\n    println(when (skore) {\n        4 -> "Výborne!"\n        3 -> "Dobre"\n        else -> "Skús znova"\n    })\n}' } },

    { id: "kotlin-p2", nazov: "Zoznam úloh", minut: 30,
      popis: "Aplikácia na úlohy v príkazovom riadku: pridávanie, odškrtávanie, mazanie a prehľad.",
      zadanie: "Vytvor <code>data class Uloha(val text: String, var hotova: Boolean = false)</code> a meniteľný zoznam úloh. Príkazy zo vstupu:<ul><li><code>pridaj text úlohy</code> (text môže mať medzery),</li><li><code>hotovo N</code> označí N-tú úlohu (od 1), neplatné číslo → <code>Neplatné číslo</code>,</li><li><code>zmaz N</code> zmaže N-tú úlohu,</li><li><code>vypis</code> vypíše úlohy <code>N. [x] text</code> alebo <code>N. [ ] text</code> a riadok <code>Hotové: X z Y</code>,</li><li><code>koniec</code>.</li></ul>",
      karty: ["kt"], vstup: "pridaj Nakúpiť chlieb\npridaj Upratať izbu\npridaj Naučiť sa Kotlin\nhotovo 3\nhotovo 9\nzmaz 2\nvypis\nkoniec", start: { kt: "data class Uloha(val text: String, var hotova: Boolean = false)\n\nfun main() {\n    val ulohy = mutableListOf<Uloha>()\n    \n}" },
      napoveda: "while (true) { val riadok = readLine() ?: break; if (riadok == \"koniec\") break; val prikaz = riadok.substringBefore(\" \"); val zvysok = riadok.substringAfter(\" \", \"\") … }  Index: zvysok.toIntOrNull()?.minus(1), kontrola in ulohy.indices.",
      kriteria: [
        { text: "Pridanie úloh s medzerami v texte", body: 2, test: function (v) { return ma(v, "1. [ ] Nakúpiť chlieb"); } },
        { text: "Označenie úlohy ako hotovej", body: 2, test: function (v) { return ma(v, "2. [x] Naučiť sa Kotlin"); } },
        { text: "Neplatné číslo úlohy sa ohlási (bez pádu)", body: 2, test: function (v) { return ma(v, "Neplatné číslo"); } },
        { text: "Zmazanie úlohy", body: 2, test: function (v) { var t = r(v).join("\n"); return !/Upratať izbu/.test(t) && r(v).filter(function (x) { return /^\d+\. \[/.test(x); }).length === 2; } },
        { text: "Súhrn hotových úloh", body: 1, test: function (v) { return ma(v, "Hotové: 1 z 2"); } },
        { text: "data class Uloha a mutableListOf", body: 1, test: function (v, s) { return /data\s+class\s+Uloha/.test(s.kt) && /mutableListOf/.test(s.kt); } },
      ],
      riesenie: { kt: 'data class Uloha(val text: String, var hotova: Boolean = false)\n\nfun main() {\n    val ulohy = mutableListOf<Uloha>()\n    while (true) {\n        val riadok = readLine() ?: break\n        if (riadok == "koniec") break\n        val prikaz = riadok.substringBefore(" ")\n        val zvysok = riadok.substringAfter(" ", "")\n        when (prikaz) {\n            "pridaj" -> ulohy.add(Uloha(zvysok))\n            "hotovo", "zmaz" -> {\n                val i = zvysok.toIntOrNull()?.minus(1)\n                if (i == null || i !in ulohy.indices) {\n                    println("Neplatné číslo")\n                } else if (prikaz == "hotovo") {\n                    ulohy[i].hotova = true\n                } else {\n                    ulohy.removeAt(i)\n                }\n            }\n            "vypis" -> {\n                ulohy.forEachIndexed { i, u -> println("${i + 1}. [${if (u.hotova) "x" else " "}] ${u.text}") }\n                println("Hotové: ${ulohy.count { it.hotova }} z ${ulohy.size}")\n            }\n        }\n    }\n}' } },

    { id: "kotlin-p3", nazov: "Analýza predaja", minut: 30,
      popis: "Analytik e-shopu dostane zoznam predajov a potrebuje z neho rýchly prehľad. Kolekcie a lambdy v Kotline sú na to ako stvorené.",
      zadanie: "Riadky vstupu majú tvar <code>produkt kategoria cena kusy</code>. Ulož ich ako <code>data class Predaj(val produkt: String, val kategoria: String, val cena: Double, val kusy: Int)</code>. Vypíš (sumy na 2 miesta cez <code>\"%.2f\".format</code>, výsledky nech sú s bodkou):<pre class=\"kod\">Tržba spolu: 323.80\nElektronika: 218.00\nKnihy: 74.70\nDoplnky: 31.10\nNajviac kusov: Hrnček (7)\nNajvyššia tržba: Monitor (179.00)</pre>Kategórie zoraď od najvyššej tržby (<code>groupBy</code>, <code>sumOf</code>, <code>sortedByDescending</code>). Tržba = cena × kusy.",
      karty: ["kt"], vstup: "Monitor Elektronika 179.0 1\nMyš Elektronika 19.5 2\nKniha Knihy 24.9 3\nHrnček Doplnky 3.3 7\nBatoh Doplnky 8.0 1", start: { kt: "data class Predaj(val produkt: String, val kategoria: String, val cena: Double, val kusy: Int)\n\nfun main() {\n    val predaje = mutableListOf<Predaj>()\n    \n}" },
      napoveda: "Čítanie: while (true) { val r = readLine() ?: break; if (r.isBlank()) break; val c = r.split(\" \"); predaje.add(Predaj(c[0], c[1], c[2].toDouble(), c[3].toInt())) }. Formát s bodkou: String.format(java.util.Locale.US, \"%.2f\", x).",
      kriteria: [
        { text: "Celková tržba", body: 2, test: function (v) { return ma(v, "Tržba spolu: 323.80"); } },
        { text: "Tržba podľa kategórií", body: 2, test: function (v) { return ma(v, "Elektronika: 218.00") && ma(v, "Knihy: 74.70") && ma(v, "Doplnky: 31.10"); } },
        { text: "Kategórie zoradené od najvyššej tržby", body: 2, test: function (v) { var l = r(v), a = l.indexOf("Elektronika: 218.00"), b = l.indexOf("Knihy: 74.70"), c = l.indexOf("Doplnky: 31.10"); return a >= 0 && a < b && b < c; } },
        { text: "Produkt s najviac kusmi", body: 1, test: function (v) { return ma(v, "Najviac kusov: Hrnček (7)"); } },
        { text: "Produkt s najvyššou tržbou", body: 1, test: function (v) { return ma(v, "Najvyššia tržba: Monitor (179.00)"); } },
        { text: "Použité groupBy a sumOf", body: 2, test: function (v, s) { return /groupBy/.test(s.kt) && /sumOf/.test(s.kt); } },
      ],
      riesenie: { kt: 'data class Predaj(val produkt: String, val kategoria: String, val cena: Double, val kusy: Int) {\n    val trzba get() = cena * kusy\n}\n\nfun f(x: Double) = String.format(java.util.Locale.US, "%.2f", x)\n\nfun main() {\n    val predaje = mutableListOf<Predaj>()\n    while (true) {\n        val riadok = readLine() ?: break\n        if (riadok.isBlank()) break\n        val c = riadok.split(" ")\n        predaje.add(Predaj(c[0], c[1], c[2].toDouble(), c[3].toInt()))\n    }\n    println("Tržba spolu: ${f(predaje.sumOf { it.trzba })}")\n    predaje.groupBy { it.kategoria }\n        .mapValues { (_, p) -> p.sumOf { it.trzba } }\n        .toList()\n        .sortedByDescending { it.second }\n        .forEach { (k, t) -> println("$k: ${f(t)}") }\n    val kusy = predaje.maxByOrNull { it.kusy }!!\n    println("Najviac kusov: ${kusy.produkt} (${kusy.kusy})")\n    val naj = predaje.maxByOrNull { it.trzba }!!\n    println("Najvyššia tržba: ${naj.produkt} (${f(naj.trzba)})")\n}' } },
  ]);
})();
