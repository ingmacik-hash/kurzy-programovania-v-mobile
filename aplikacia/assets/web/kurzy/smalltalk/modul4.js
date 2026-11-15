/* Smalltalk · Modul 4 · Kolekcie */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "st"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "st", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function beh(kod, vstup) { var x = K.spustiSmalltalkHned(kod, vstup || ""); return r(x.vystup); }

  var L1 = { id: "smalltalk-4-1", nazov: "Polia", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Array",
      text: UKAZ("| p |\np := #(12 7 30 5).\n(p at: 1) printNl.\np size printNl.\np last printNl.\np printNl.\n(p includes: 30) printNl.\n{1 + 1. 2 * 3} printNl.", "12\n4\n5\n#(12 7 30 5)\ntrue\n#(2 6)"),
      podrobne: "<p><code>#( … )</code> je literálne pole: prvky sa nevyhodnocujú, píšu sa oddelené medzerou. <code>{ … }</code> vyhodnotí výrazy oddelené bodkou. Indexy začínajú od <b>1</b>. Nové prázdne pole s 5 miestami: <code>Array new: 5</code>.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>#(10 20 30) at: 2</code>?", moznosti: ["20", "30", "10", "chybu"], spravna: 0, vysvetlenie: "Indexy od 1." },
    { typ: "kod", zadanie: "Pre pole <code>#(4 9 2 7 5)</code> vypíš jeho najväčší prvok, najmenší prvok a súčet, každé cez <code>printNl</code>: <b>9</b>, <b>2</b>, <b>27</b>.",
      karty: ["st"], start: { st: "| p |\np := #(4 9 2 7 5).\n" }, vyska: "130px",
      napoveda: "p max printNl. p min printNl. p sum printNl.", riesenie: { st: "| p |\np := #(4 9 2 7 5).\np max printNl.\np min printNl.\np sum printNl." },
      kontrola: function (v) { return r(v).join("|") === "9|2|27" ? null : "Výstup má byť 9, 2, 27."; },
      vysvetlenie: "Kolekcie vedia veľa samé." },
  ] };

  var L2 = { id: "smalltalk-4-2", nazov: "do:, collect:, select:", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Kolekciám sa posielajú bloky",
      text: UKAZ("| c |\nc := #(5 3 8 1 6).\nc do: [:x | Transcript show: x printString; show: ' '].\nTranscript cr.\n(c collect: [:x | x * 10]) printNl.\n(c select: [:x | x even]) printNl.\n(c reject: [:x | x > 4]) printNl.\n(c detect: [:x | x > 6]) printNl.", "5 3 8 1 6 \n#(50 30 80 10 60)\n#(8 6)\n#(3 1)\n8"),
      podrobne: "<p><code>do:</code> prejde všetky prvky. <code>collect:</code> vytvorí novú kolekciu z výsledkov bloku. <code>select:</code> nechá prvky, pre ktoré blok vráti true, <code>reject:</code> opak. <code>detect:</code> nájde prvý vyhovujúci. Tieto mená prevzali aj iné jazyky (map, filter, find).</p>" },
    { typ: "volba", otazka: "Čo vráti <code>#(1 2 3 4) select: [:x | x odd]</code>?", moznosti: ["#(1 3)", "#(2 4)", "#(true false true false)", "2"], spravna: 0, vysvetlenie: "Nepárne prvky." },
    { typ: "kod", zadanie: "Z poľa teplôt <code>#(18 22 25 19 30 21 15)</code> vyber teploty nad 20 a vypíš ich, potom vypíš ich počet: <b>#(22 25 30 21)</b> a <b>4</b>.",
      karty: ["st"], start: { st: "| t teple |\nt := #(18 22 25 19 30 21 15).\n" }, vyska: "130px",
      napoveda: "teple := t select: [:x | x > 20].\nteple printNl.\nteple size printNl.", riesenie: { st: "| t teple |\nt := #(18 22 25 19 30 21 15).\nteple := t select: [:x | x > 20].\nteple printNl.\nteple size printNl." },
      kontrola: function (v, kod) { if (!/select:/.test(kod)) return "Použi select:."; return r(v).join("|") === "#(22 25 30 21)|4" ? null : "Výstup má byť #(22 25 30 21) a 4."; },
      vysvetlenie: "Bez jediného cyklu." },
  ] };

  var L3 = { id: "smalltalk-4-3", nazov: "inject:into: a triedenie", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Zhrnutie a poradie",
      text: UKAZ("| c |\nc := #(5 3 8 1).\n(c inject: 0 into: [:sucet :x | sucet + x]) printNl.\n(c inject: 1 into: [:sucin :x | sucin * x]) printNl.\nc asSortedCollection asArray printNl.\n(c asSortedCollection: [:a :b | a > b]) asArray printNl.\n(#('pes' 'mačka' 'ryba') asSortedCollection: [:a :b | a size <= b size]) asArray printNl.", "17\n120\n#(1 3 5 8)\n#(8 5 3 1)\n#('pes' 'ryba' 'mačka')"),
      podrobne: "<p><code>inject:into:</code> začne s počiatočnou hodnotou a postupne do nej „vstrekuje“ prvky. <code>asSortedCollection:</code> dostane blok, ktorý povie, kedy má byť a pred b.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>#(2 3 4) inject: 0 into: [:a :x | a + x]</code>?", moznosti: ["9", "24", "0", "#(2 3 4)"], spravna: 0, vysvetlenie: "0 + 2 + 3 + 4." },
    { typ: "kod", zadanie: "Načítaj čísla v jednom riadku (vstup <b>40 10 50 20 30</b>), zoraď ich zostupne a vypíš pole: <b>#(50 40 30 20 10)</b>. Tip: <code>stdin nextLine substrings</code> dá pole textov a <code>collect: [:s | s asNumber]</code> z nich čísla.",
      karty: ["st"], vstup: "40 10 50 20 30", start: { st: "| cisla |\ncisla := stdin nextLine substrings collect: [:s | s asNumber].\n" }, vyska: "140px",
      napoveda: "(cisla asSortedCollection: [:a :b | a > b]) asArray printNl.", riesenie: { st: "| cisla |\ncisla := stdin nextLine substrings collect: [:s | s asNumber].\n(cisla asSortedCollection: [:a :b | a > b]) asArray printNl." },
      kontrola: function (v, kod) { if (!/asSortedCollection|sort/.test(kod)) return "Zoraď čísla (asSortedCollection:)."; if (r(v)[0] !== "#(50 40 30 20 10)") return "Výstup má byť #(50 40 30 20 10)."; return beh(kod, "3 1 2")[0] === "#(3 2 1)" ? null : "Pre 3 1 2 má vyjsť #(3 2 1)."; },
      vysvetlenie: "Blok [:a :b | a > b] = zostupne." },
  ] };

  var L4 = { id: "smalltalk-4-4", nazov: "OrderedCollection", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kolekcia, ktorá rastie",
      text: UKAZ("| nakup |\nnakup := OrderedCollection new.\nnakup add: 'chlieb'; add: 'mlieko'; addFirst: 'vajcia'.\nnakup printNl.\nnakup size printNl.\nnakup remove: 'mlieko'.\nnakup removeFirst printNl.\nnakup printNl.", "an OrderedCollection('vajcia' 'chlieb' 'mlieko')\n3\n'vajcia'\nan OrderedCollection('chlieb')"),
      podrobne: "<p>Pole (Array) má pevnú veľkosť. <code>OrderedCollection</code> rastie: add:, addFirst:, remove:, removeFirst, removeLast. Všetky správy kolekcií (do:, select:, collect: …) fungujú rovnako.</p>" },
    { typ: "volba", otazka: "Ktorá kolekcia vie pridávať prvky?", moznosti: ["OrderedCollection", "Array vytvorené cez #( )", "Interval 1 to: 5", "Symbol"], spravna: 0, vysvetlenie: "add: na koniec." },
    { typ: "kod", zadanie: "Načítaj slová v jednom riadku (vstup <b>pes mačka pes vták mačka pes</b>) a do OrderedCollection pridaj len tie, ktoré v nej ešte nie sú. Vypíš ju: <b>an OrderedCollection('pes' 'mačka' 'vták')</b>.",
      karty: ["st"], vstup: "pes mačka pes vták mačka pes", start: { st: "| slova jedinecne |\nslova := stdin nextLine substrings.\njedinecne := OrderedCollection new.\n" }, vyska: "150px",
      napoveda: "slova do: [:s | (jedinecne includes: s) ifFalse: [jedinecne add: s]].\njedinecne printNl.", riesenie: { st: "| slova jedinecne |\nslova := stdin nextLine substrings.\njedinecne := OrderedCollection new.\nslova do: [:s | (jedinecne includes: s) ifFalse: [jedinecne add: s]].\njedinecne printNl." },
      kontrola: function (v, kod) { if (!/add:/.test(kod)) return "Pridávaj cez add:."; return r(v)[0] === "an OrderedCollection('pes' 'mačka' 'vták')" ? null : "Výstup má byť an OrderedCollection('pes' 'mačka' 'vták')"; },
      vysvetlenie: "includes: zabránil duplikátom." },
  ] };

  var L5 = { id: "smalltalk-4-5", nazov: "Dictionary", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Kľúč → hodnota",
      text: UKAZ("| ceny |\nceny := Dictionary new.\nceny at: #chlieb put: 1.2; at: #syr put: 2.5.\n(ceny at: #syr) printNl.\n(ceny at: #vajcia ifAbsent: [0]) printNl.\n(ceny includesKey: #chlieb) printNl.\nceny keysAndValuesDo: [:k :v | Transcript showCr: k , ': ' , v printString].", "2.5\n0\ntrue\nchlieb: 1.2\nsyr: 2.5"),
      podrobne: "<p>Ako kľúče sa najčastejšie používajú symboly. <code>at:ifAbsent:</code> vráti hodnotu bloku, ak kľúč chýba (bez neho by vznikla chyba). Poradie kľúčov v Dictionary nie je zaručené, preto keď na poradí záleží, zoraď kľúče: <code>ceny keys asSortedCollection</code>.</p>" },
    { typ: "volba", otazka: "Čo spraví <code>d at: #x ifAbsent: [0]</code>, keď kľúč #x chýba?", moznosti: ["Vráti 0", "Spôsobí chybu", "Vráti nil", "Pridá #x"], spravna: 0, vysvetlenie: "Hodnota bloku." },
    { typ: "kod", zadanie: "Načítaj slová v jednom riadku (vstup <b>a b a c b a</b>) a spočítaj výskyty do Dictionary. Vypíš ich zoradené podľa kľúča: <b>a: 3</b>, <b>b: 2</b>, <b>c: 1</b>.",
      karty: ["st"], vstup: "a b a c b a", start: { st: "| pocty |\npocty := Dictionary new.\n" }, vyska: "170px",
      napoveda: "stdin nextLine substrings do: [:s | pocty at: s put: (pocty at: s ifAbsent: [0]) + 1].\npocty keys asSortedCollection do: [:k | Transcript showCr: k , ': ' , (pocty at: k) printString].", riesenie: { st: "| pocty |\npocty := Dictionary new.\nstdin nextLine substrings do: [:s |\n    pocty at: s put: (pocty at: s ifAbsent: [0]) + 1].\npocty keys asSortedCollection do: [:k |\n    Transcript showCr: k , ': ' , (pocty at: k) printString]." },
      kontrola: function (v, kod) { if (!/Dictionary/.test(kod)) return "Použi Dictionary."; return r(v).join("|") === "a: 3|b: 2|c: 1" ? null : "Výstup má byť a: 3, b: 2, c: 1."; },
      vysvetlenie: "Klasické počítanie výskytov." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li><code>#( )</code>, <code>{ }</code>, at:, size, indexy od 1.</li><li>do:, collect:, select:, reject:, detect:.</li><li>inject:into:, asSortedCollection:.</li><li>OrderedCollection: add:, remove:.</li><li>Dictionary: at:put:, at:ifAbsent:, keysAndValuesDo:.</li></ul>", tip: "Posledný modul: vlastné triedy, dedičnosť a výnimky." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "smalltalk-4-1", otazka: "Čo je <code>#(1 2 3) size</code>?", moznosti: ["3", "2", "6", "#(1 2 3)"], spravna: 0, vysvetlenie: "Počet prvkov." },
    { typ: "volba", lekcia: "smalltalk-4-2", otazka: "Čo vráti <code>#(1 2 3) collect: [:x | x * x]</code>?", moznosti: ["#(1 4 9)", "14", "#(1 2 3)", "#(2 4 6)"], spravna: 0, vysvetlenie: "Druhé mocniny." },
    { typ: "volba", lekcia: "smalltalk-4-2", otazka: "Ktorá správa nájde prvý prvok, ktorý spĺňa podmienku?", moznosti: ["detect:", "select:", "collect:", "inject:into:"], spravna: 0, vysvetlenie: "detect:" },
    { typ: "volba", lekcia: "smalltalk-4-3", otazka: "Ako zoradíš kolekciu zostupne?", moznosti: ["<code>c asSortedCollection: [:a :b | a &gt; b]</code>", "<code>c sortDown</code>", "<code>c reverse sorted</code> je jediná možnosť", "<code>c order: #desc</code>"], spravna: 0, vysvetlenie: "Blok porovnania." },
    { typ: "volba", lekcia: "smalltalk-4-4", otazka: "Ktorá správa pridá prvok na začiatok OrderedCollection?", moznosti: ["addFirst:", "add:", "insert:", "push:"], spravna: 0, vysvetlenie: "addFirst:" },
    { typ: "volba", lekcia: "smalltalk-4-5", otazka: "Ako uložíš do slovníka d pod kľúč #vek hodnotu 15?", moznosti: ["<code>d at: #vek put: 15</code>", "<code>d[#vek] := 15</code>", "<code>d put: 15 at: #vek</code>", "<code>d #vek: 15</code>"], spravna: 0, vysvetlenie: "at:put:" },
    { typ: "doplnenie", lekcia: "smalltalk-4-2", otazka: "Párne prvky vynásob desiatimi:", sablona: "(c [[0]] [:x | x even]) [[1]] [:x | x * 10]", zetony: ["select:", "collect:", "detect:", "do:", "reject:"], spravne: ["select:", "collect:"], vysvetlenie: "select:, potom collect:" },
  ];

  K.registrujModul("smalltalk", { cislo: 4, nazov: "Kolekcie", popis: "Polia, do:/collect:/select:, inject:into:, OrderedCollection a Dictionary.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
