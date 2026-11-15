/* Smalltalk · Modul 3 · Bloky, podmienky a cykly */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "st"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "st", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function beh(kod, vstup) { var x = K.spustiSmalltalkHned(kod, vstup || ""); return r(x.vystup); }

  var L1 = { id: "smalltalk-3-1", nazov: "Bloky", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Kód v hranatých zátvorkách",
      text: "<p><b>Blok</b> je kúsok kódu v <code>[ ]</code>, ktorý sa vykoná, až keď mu pošleš <code>value</code>. Parametre sa píšu s dvojbodkou a oddeľujú sa zvislou čiarou:</p>" + UKAZ("| pozdrav stvorec sucet |\npozdrav := [Transcript showCr: 'Ahoj!'].\npozdrav value.\nstvorec := [:x | x * x].\n(stvorec value: 7) printNl.\nsucet := [:a :b | a + b].\n(sucet value: 2 value: 3) printNl.", "Ahoj!\n49\n5"),
      podrobne: "<p>Blok je tiež objekt: dá sa uložiť do premennej a poslať ako argument. Výsledkom bloku je hodnota posledného výrazu. Z blokov sú v Smalltalku postavené podmienky aj cykly.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>([:x | x + 1] value: 9) printNl</code>?", moznosti: ["10", "9", "[:x | x + 1]", "chybu"], spravna: 0, vysvetlenie: "Blok dostal 9 a vrátil 10." },
    { typ: "kod", zadanie: "Ulož do premennej <code>obsah</code> blok s dvoma parametrami <code>[:a :b | …]</code>, ktorý vráti obsah obdĺžnika. Vypíš výsledok pre 4 a 7: <b>28</b>.",
      karty: ["st"], start: { st: "| obsah |\n" }, vyska: "130px",
      napoveda: "obsah := [:a :b | a * b].\n(obsah value: 4 value: 7) printNl.", riesenie: { st: "| obsah |\nobsah := [:a :b | a * b].\n(obsah value: 4 value: 7) printNl." },
      kontrola: function (v, kod) { if (!/value:\s*\S+\s*value:/.test(kod)) return "Zavolaj blok cez value: … value: …"; return r(v)[0] === "28" ? null : "Výstup má byť 28."; },
      vysvetlenie: "Blok s dvoma parametrami." },
  ] };

  var L2 = { id: "smalltalk-3-2", nazov: "ifTrue: ifFalse:", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Podmienka je správa",
      text: "<p>Smalltalk nemá príkaz if. Porovnanie vráti objekt <code>true</code> alebo <code>false</code> a tomu pošleš správu <code>ifTrue:ifFalse:</code> s dvoma blokmi:</p>" + UKAZ("| vek |\nvek := 16.\n(vek >= 18)\n    ifTrue: [Transcript showCr: 'dospelý']\n    ifFalse: [Transcript showCr: 'dieťa'].\n(vek even ifTrue: ['párny'] ifFalse: ['nepárny']) displayNl.", "dieťa\npárny"),
      podrobne: "<p>Objekt true vykoná prvý blok, false druhý. Podmienka vracia hodnotu bloku, preto sa dá použiť aj ako výraz. Existujú aj samostatné <code>ifTrue:</code> a <code>ifFalse:</code>.</p>" },
    { typ: "volba", otazka: "Komu sa posiela správa <code>ifTrue:ifFalse:</code>?", moznosti: ["Objektu true alebo false", "Číslu", "Bloku", "Transcriptu"], spravna: 0, vysvetlenie: "Výsledku porovnania." },
    { typ: "kod", zadanie: "Načítaj teplotu (vstup <b>-4</b>) a vypíš <b>mrzne</b>, ak je pod nulou, inak <b>nemrzne</b>.",
      karty: ["st"], vstup: "-4", start: { st: "| t |\nt := stdin nextLine asNumber.\n" }, vyska: "150px",
      napoveda: "(t < 0) ifTrue: ['mrzne' displayNl] ifFalse: ['nemrzne' displayNl].", riesenie: { st: "| t |\nt := stdin nextLine asNumber.\n(t < 0)\n    ifTrue: ['mrzne' displayNl]\n    ifFalse: ['nemrzne' displayNl]." },
      kontrola: function (v, kod) { if (!/ifTrue:/.test(kod)) return "Použi ifTrue:ifFalse:."; if (r(v)[0] !== "mrzne") return "Pre -4 má vypísať mrzne."; return beh(kod, "5")[0] === "nemrzne" ? null : "Pre 5 má vypísať nemrzne."; },
      vysvetlenie: "Podmienka ako správa objektu." },
  ] };

  var L3 = { id: "smalltalk-3-3", nazov: "and:, or:, not", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Logika",
      text: UKAZ("| x |\nx := 7.\n((x > 0) and: [x < 10]) printNl.\n((x < 0) or: [x > 5]) printNl.\n(x > 5) not printNl.\n(x between: 1 and: 10) printNl.", "true\ntrue\nfalse\ntrue"),
      podrobne: "<p>Pri <code>and:</code> a <code>or:</code> je druhá podmienka v <b>bloku</b>, aby sa vyhodnotila len vtedy, keď je to potrebné. Existujú aj <code>&amp;</code> a <code>|</code>, ktoré vyhodnotia obe strany vždy.</p>" },
    { typ: "volba", otazka: "Prečo je druhá podmienka v <code>and:</code> v hranatých zátvorkách?", moznosti: ["Vyhodnotí sa len, ak je prvá true", "Je to povinné pre čísla", "Kvôli priorite", "Nie je to potrebné"], spravna: 0, vysvetlenie: "Blok sa vykoná len keď treba." },
    { typ: "kod", zadanie: "Načítaj rok (vstup <b>2000</b>) a vypíš <b>true</b>, ak je prestupný: deliteľný 4 a nie 100, alebo deliteľný 400. Použi <code>\\\\</code>, <code>and:</code> a <code>or:</code>.",
      karty: ["st"], vstup: "2000", start: { st: "| rok |\nrok := stdin nextLine asNumber.\n" }, vyska: "150px",
      napoveda: "(((rok \\\\ 4 = 0) and: [rok \\\\ 100 ~= 0]) or: [rok \\\\ 400 = 0]) printNl.", riesenie: { st: "| rok |\nrok := stdin nextLine asNumber.\n(((rok \\\\ 4 = 0) and: [rok \\\\ 100 ~= 0]) or: [rok \\\\ 400 = 0]) printNl." },
      kontrola: function (v, kod) { if (!/and:/.test(kod) || !/or:/.test(kod)) return "Použi and: aj or:."; if (r(v)[0] !== "true") return "Rok 2000 je prestupný."; var t = [["1900", "false"], ["2024", "true"], ["2023", "false"]]; for (var i = 0; i < t.length; i++) if (beh(kod, t[i][0])[0] !== t[i][1]) return "Pre rok " + t[i][0] + " má vyjsť " + t[i][1] + "."; return null; },
      vysvetlenie: "Overené aj na rokoch 1900, 2023 a 2024." },
  ] };

  var L4 = { id: "smalltalk-3-4", nazov: "to:do: a timesRepeat:", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Cykly sú tiež správy",
      text: UKAZ("3 timesRepeat: [Transcript show: 'Hip '].\nTranscript cr.\n1 to: 5 do: [:i | Transcript show: i printString; show: ' '].\nTranscript cr.\n10 to: 0 by: -5 do: [:i | i printNl].", "Hip Hip Hip \n1 2 3 4 5 \n10\n5\n0"),
      podrobne: "<p><code>timesRepeat:</code> zopakuje blok n-krát. <code>to:do:</code> dá bloku postupne čísla od začiatku po koniec vrátane. <code>to:by:do:</code> s krokom.</p>" },
    { typ: "volba", otazka: "Koľkokrát sa vykoná blok v <code>2 to: 6 do: [:i | …]</code>?", moznosti: ["5", "4", "6", "2"], spravna: 0, vysvetlenie: "2, 3, 4, 5, 6." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>5</b>) a vypíš súčet čísel 1 až n cez <code>to:do:</code>: <b>15</b>.",
      karty: ["st"], vstup: "5", start: { st: "| n sucet |\nn := stdin nextLine asNumber.\nsucet := 0.\n" }, vyska: "150px",
      napoveda: "1 to: n do: [:i | sucet := sucet + i].\nsucet printNl.", riesenie: { st: "| n sucet |\nn := stdin nextLine asNumber.\nsucet := 0.\n1 to: n do: [:i | sucet := sucet + i].\nsucet printNl." },
      kontrola: function (v, kod) { if (!/to:\s*\S+\s*do:/.test(kod)) return "Použi to:do:."; if (r(v)[0] !== "15") return "Pre 5 má vyjsť 15."; return beh(kod, "100")[0] === "5050" ? null : "Pre 100 má vyjsť 5050."; },
      vysvetlenie: "Blok mení premennú sucet zvonka." },
  ] };

  var L5 = { id: "smalltalk-3-5", nazov: "whileTrue:", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kým platí podmienka",
      text: "<p>Podmienka je tu v <b>bloku</b>, lebo sa musí vyhodnocovať stále znova:</p>" + UKAZ("| n kroky |\nn := 27.\nkroky := 0.\n[n ~= 1] whileTrue: [\n    n := n even ifTrue: [n // 2] ifFalse: [3 * n + 1].\n    kroky := kroky + 1].\nkroky printNl.", "111"),
      podrobne: "<p>Toto je Collatzova postupnosť. Nikto zatiaľ nedokázal, že vždy skončí na 1. Ak by sa podmienka nikdy nezmenila, cyklus by bežal donekonečna. Aplikácia ho po chvíli zastaví.</p>" },
    { typ: "volba", otazka: "Čo je zle v <code>(i &lt; 10) whileTrue: [i := i + 1]</code>?", moznosti: ["Podmienka musí byť v bloku [i < 10]", "Chýba bodka", "whileTrue: neexistuje", "Nič"], spravna: 0, vysvetlenie: "whileTrue: sa posiela bloku." },
    { typ: "kod", zadanie: "Načítaj číslo (vstup <b>4728</b>) a cyklom whileTrue: spočítaj jeho ciferný súčet: <b>21</b>. Tip: posledná cifra je <code>n \\\\ 10</code>, bez nej <code>n // 10</code>.",
      karty: ["st"], vstup: "4728", start: { st: "| n s |\nn := stdin nextLine asNumber.\ns := 0.\n" }, vyska: "160px",
      napoveda: "[n > 0] whileTrue: [s := s + (n \\\\ 10). n := n // 10].\ns printNl.", riesenie: { st: "| n s |\nn := stdin nextLine asNumber.\ns := 0.\n[n > 0] whileTrue: [\n    s := s + (n \\\\ 10).\n    n := n // 10].\ns printNl." },
      kontrola: function (v, kod) { if (!/whileTrue:/.test(kod)) return "Použi whileTrue:."; if (r(v)[0] !== "21") return "Pre 4728 má vyjsť 21."; return beh(kod, "999")[0] === "27" ? null : "Pre 999 má vyjsť 27."; },
      vysvetlenie: "Cyklus beží, kým zostávajú cifry." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li>Bloky <code>[:x | …]</code> a <code>value:</code>.</li><li>Podmienky ako správy: <code>ifTrue:ifFalse:</code>.</li><li><code>and:</code>, <code>or:</code>, <code>not</code>.</li><li><code>timesRepeat:</code>, <code>to:do:</code>, <code>to:by:do:</code>.</li><li><code>[podmienka] whileTrue: [telo]</code>.</li></ul>", tip: "Ďalej kolekcie, kde bloky naplno zažiaria." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "smalltalk-3-1", otazka: "Ako zavoláš blok s jedným parametrom?", moznosti: ["<code>blok value: 5</code>", "<code>blok(5)</code>", "<code>blok call: 5</code>", "<code>blok.run(5)</code>"], spravna: 0, vysvetlenie: "value:" },
    { typ: "volba", lekcia: "smalltalk-3-2", otazka: "Čo vráti <code>(3 &gt; 2) ifTrue: ['a'] ifFalse: ['b']</code>?", moznosti: ["'a'", "'b'", "true", "nil"], spravna: 0, vysvetlenie: "Hodnotu prvého bloku." },
    { typ: "volba", lekcia: "smalltalk-3-3", otazka: "Ako zapíšeš „x je kladné a párne“?", moznosti: ["<code>(x &gt; 0) and: [x even]</code>", "<code>x &gt; 0 &amp;&amp; x even</code>", "<code>x &gt; 0 and x even</code>", "<code>(x &gt; 0, x even)</code>"], spravna: 0, vysvetlenie: "and: s blokom." },
    { typ: "volba", lekcia: "smalltalk-3-4", otazka: "Čo vypíše <code>1 to: 3 do: [:i | Transcript show: i printString]</code>?", moznosti: ["123", "0123", "12", "3"], spravna: 0, vysvetlenie: "1 až 3 vrátane." },
    { typ: "volba", lekcia: "smalltalk-3-5", otazka: "Komu sa posiela <code>whileTrue:</code>?", moznosti: ["Bloku s podmienkou", "Objektu true", "Číslu", "Transcriptu"], spravna: 0, vysvetlenie: "[podmienka] whileTrue: [telo]" },
    { typ: "doplnenie", lekcia: "smalltalk-3-1", otazka: "Blok, ktorý zdvojnásobí číslo:", sablona: "[ [[0]]x [[1]] x * 2 ]", zetony: [":", "|", ";", ".", "^"], spravne: [":", "|"], vysvetlenie: "[:x | x * 2]" },
  ];

  K.registrujModul("smalltalk", { cislo: 3, nazov: "Bloky, podmienky a cykly", popis: "Bloky, ifTrue:ifFalse:, and:/or:, to:do:, timesRepeat: a whileTrue:.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
