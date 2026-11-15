/* Smalltalk · Modul 2 · Čísla, texty a vstup */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "st"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "st", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function beh(kod, vstup) { var x = K.spustiSmalltalkHned(kod, vstup || ""); return r(x.vystup); }

  var L1 = { id: "smalltalk-2-1", nazov: "Čísla bez obmedzení", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Celé čísla, zlomky a desatinné čísla",
      text: UKAZ("30 factorial printNl.\n(7 / 2) printNl.\n(1 / 3) + (1 / 6) printNl.\n((1 / 3) + (1 / 6)) printNl.\n(7 / 2) asFloat printNl.\n0.1 + 0.2 printNl.", "265252859812191058636308480000000\n7/2\n1/6\n1/2\n3.5\n0.2"),
      podrobne: "<p>Celé čísla v Smalltalku nemajú hornú hranicu: <code>100 factorial</code> má 158 číslic. Delenie dvoch celých čísel dá presný <b>zlomok</b> (7/2), nie zaokrúhlené číslo. Desatinné čísla (Float) majú bodku: <code>3.14</code>. Pozor na prioritu: v riadku 3 sa najprv vypíše <code>1/6</code>.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>(6 / 4) printNl</code>?", moznosti: ["3/2", "1.5", "1", "6/4"], spravna: 0, vysvetlenie: "Zlomok sa sám skráti." },
    { typ: "kod", zadanie: "Vypíš cez <code>printNl</code> počet číslic čísla <code>50 factorial</code>: <b>65</b>. Tip: <code>printString size</code>.",
      karty: ["st"], start: { st: "" }, vyska: "110px",
      napoveda: "50 factorial printString size printNl.", riesenie: { st: "50 factorial printString size printNl." },
      kontrola: function (v, kod) { if (!/factorial/.test(kod)) return "Použi factorial."; return r(v)[0] === "65" ? null : "Výstup má byť 65."; },
      vysvetlenie: "Číslo sa premenilo na text a spočítali sme jeho znaky." },
  ] };

  var L2 = { id: "smalltalk-2-2", nazov: "Počítanie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Užitočné správy čísel",
      text: P.tabulka(["Správa", "Výsledok"], [["<code>17 // 5</code>", "3 (celočíselné delenie)"], ["<code>17 \\\\ 5</code>", "2 (zvyšok)"], ["<code>2 raisedTo: 10</code>", "1024"], ["<code>16 sqrt</code>", "4.0"], ["<code>7 isPrime</code>", "true"], ["<code>12 gcd: 18</code>", "6 (najväčší spoločný deliteľ)"], ["<code>3.7 rounded</code>", "4"], ["<code>(2/3) asFloat roundTo: 0.01</code>", "0.67"], ["<code>5 between: 1 and: 10</code>", "true"]]),
      podrobne: "<p>Zvyšok sa píše dvoma spätnými lomkami <code>\\\\</code>. Číslo na text: <code>42 printString</code>. Text na číslo: <code>'42' asNumber</code>.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>23 \\\\ 4</code>?", moznosti: ["3", "5", "5.75", "4"], spravna: 0, vysvetlenie: "23 = 5 × 4 + 3." },
    { typ: "kod", zadanie: "Pre <code>minuty := 135</code> vypíš <b>2 h 15 min</b> (hodiny cez <code>//</code>, minúty cez <code>\\\\</code>, spoj ich ako text).",
      karty: ["st"], start: { st: "| minuty |\nminuty := 135.\n" }, vyska: "140px",
      napoveda: "Transcript show: (minuty // 60) printString; show: ' h '; show: (minuty \\\\ 60) printString; show: ' min'; cr.", riesenie: { st: "| minuty |\nminuty := 135.\nTranscript show: (minuty // 60) printString; show: ' h '; show: (minuty \\\\ 60) printString; show: ' min'; cr." },
      kontrola: function (v, kod) { if (!/\/\//.test(kod) || !/\\\\/.test(kod)) return "Použi // aj \\\\."; return r(v)[0] === "2 h 15 min" ? null : "Výstup má byť 2 h 15 min"; },
      vysvetlenie: "Celočíselné delenie a zvyšok." },
  ] };

  var L3 = { id: "smalltalk-2-3", nazov: "Texty", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Práca s textom",
      text: UKAZ("| s |\ns := 'Bratislava'.\ns size printNl.\ns asUppercase displayNl.\ns reversed displayNl.\n(s copyFrom: 1 to: 5) displayNl.\n(s includesSubstring: 'slav') printNl.\n(s , ' je hlavné mesto') displayNl.\n('Vek: ' , 15 printString) displayNl.", "10\nBRATISLAVA\navalsitarB\nBrati\ntrue\nBratislava je hlavné mesto\nVek: 15"),
      podrobne: "<p>Texty sa spájajú <b>čiarkou</b> <code>,</code>. Spájať sa dajú len texty, číslo treba premeniť cez <code>printString</code>. Indexy textu začínajú od <b>1</b>, nie od 0. <code>printNl</code> vypíše text s apostrofmi, <code>displayNl</code> bez nich.</p>" },
    { typ: "volba", otazka: "Prečo nefunguje <code>'Body: ' , 42</code>?", moznosti: ["Čiarkou sa spájajú len texty, treba 42 printString", "Chýba bodka", "Čiarka sa nepoužíva", "Funguje"], spravna: 0, vysvetlenie: "'Body: ' , 42 printString" },
    { typ: "volba", otazka: "Čo vráti <code>'Smalltalk' first</code>?", moznosti: ["$S (znak)", "'S'", "1", "'Small'"], spravna: 0, vysvetlenie: "Jeden znak sa píše $S." },
    { typ: "kod", zadanie: "Pre slovo <code>'kajak'</code> vypíš <b>true</b>, ak je to palindróm (rovnaké odpredu aj odzadu). Použi <code>reversed</code> a <code>=</code>.",
      karty: ["st"], start: { st: "| slovo |\nslovo := 'kajak'.\n" }, vyska: "130px",
      napoveda: "(slovo = slovo reversed) printNl.", riesenie: { st: "| slovo |\nslovo := 'kajak'.\n(slovo = slovo reversed) printNl." },
      kontrola: function (v, kod) { if (!/reversed|reverse/.test(kod)) return "Použi reversed."; return r(v)[0] === "true" ? null : "Výstup má byť true."; },
      vysvetlenie: "Porovnanie textov cez = porovná obsah." },
  ] };

  var L4 = { id: "smalltalk-2-4", nazov: "Znaky a symboly", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "$a a #meno",
      text: UKAZ("$a printNl.\n$a isVowel printNl.\n$a asUppercase printNl.\n$a value printNl.\n#ahoj printNl.\n(#ahoj == #ahoj) printNl.\n('Smalltalk' occurrencesOf: $l) printNl.", "$a\ntrue\n$A\n97\n#ahoj\ntrue\n3"),
      podrobne: "<p><b>Znak</b> (Character) sa píše s dolárom: <code>$a</code>, <code>$7</code>, <code>$ </code> (medzera). <b>Symbol</b> je jedinečný text s mriežkou: <code>#ahoj</code>. Dva rovnaké symboly sú ten istý objekt, preto sa používajú ako kľúče a mená správ.</p>" },
    { typ: "volba", otazka: "Čo je <code>$x</code>?", moznosti: ["Jeden znak x", "Premenná x", "Text 'x'", "Symbol"], spravna: 0, vysvetlenie: "Character." },
    { typ: "kod", zadanie: "Spočítaj, koľko samohlások je v texte <code>'objektove programovanie'</code>. Použi <code>count: [:c | c isVowel]</code>. Vypíš <b>10</b>.",
      karty: ["st"], start: { st: "| t |\nt := 'objektove programovanie'.\n" }, vyska: "130px",
      napoveda: "(t count: [:c | c isVowel]) printNl.", riesenie: { st: "| t |\nt := 'objektove programovanie'.\n(t count: [:c | c isVowel]) printNl." },
      kontrola: function (v, kod) { if (!/isVowel/.test(kod)) return "Použi isVowel."; return r(v)[0] === "10" ? null : "Výstup má byť 10."; },
      vysvetlenie: "Text je kolekcia znakov. Blok [:c | …] uvidíš podrobne v ďalšom module." },
  ] };

  var L5 = { id: "smalltalk-2-5", nazov: "Vstup", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "stdin nextLine",
      text: "<p>Riadok zo vstupu načítaš správou <code>stdin nextLine</code> (ako v GNU Smalltalku). Vráti text, číslo z neho získaš cez <code>asNumber</code>:</p>" + UKAZ("| meno vek |\nmeno := stdin nextLine.\nvek := stdin nextLine asNumber.\nTranscript showCr: meno , ' o rok: ' , (vek + 1) printString.", "Jana o rok: 16"),
      podrobne: "<p>Keď vstup skončí, nextLine vráti <code>nil</code>. Text, ktorý nie je číslo, vráti po asNumber tiež nil.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>'12' asNumber + 1</code>?", moznosti: ["13", "'121'", "chybu", "nil"], spravna: 0, vysvetlenie: "asNumber z textu urobí číslo." },
    { typ: "kod", zadanie: "Načítaj dve čísla, každé na riadku (vstup <b>8</b> a <b>5</b>), a vypíš ich súčin: <b>8 * 5 = 40</b>.",
      karty: ["st"], vstup: "8\n5", start: { st: "| a b |\n" }, vyska: "150px",
      napoveda: "a := stdin nextLine asNumber. … Transcript showCr: a printString , ' * ' , b printString , ' = ' , (a * b) printString.", riesenie: { st: "| a b |\na := stdin nextLine asNumber.\nb := stdin nextLine asNumber.\nTranscript showCr: a printString , ' * ' , b printString , ' = ' , (a * b) printString." },
      kontrola: function (v, kod) { if (!/stdin/.test(kod)) return "Čísla načítaj cez stdin nextLine."; if (r(v)[0] !== "8 * 5 = 40") return "Výstup má byť 8 * 5 = 40."; return beh(kod, "3\n7")[0] === "3 * 7 = 21" ? null : "Pre vstup 3 a 7 má vyjsť 3 * 7 = 21."; },
      vysvetlenie: "Program funguje pre ľubovoľné čísla." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li>Veľké celé čísla, zlomky a Float.</li><li><code>//</code>, <code>\\\\</code>, raisedTo:, sqrt, isPrime.</li><li>Texty: size, <code>,</code>, reversed, copyFrom:to:, indexy od 1.</li><li>Znaky <code>$a</code> a symboly <code>#ahoj</code>.</li><li><code>stdin nextLine</code> a <code>asNumber</code>.</li></ul>", tip: "Ďalej bloky, podmienky a cykly." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "smalltalk-2-1", otazka: "Čo vypíše <code>(10 / 4) printNl</code>?", moznosti: ["5/2", "2.5", "2", "10/4"], spravna: 0, vysvetlenie: "Presný skrátený zlomok." },
    { typ: "volba", lekcia: "smalltalk-2-2", otazka: "Čo vráti <code>9 // 2</code>?", moznosti: ["4", "4.5", "1", "9/2"], spravna: 0, vysvetlenie: "Celočíselné delenie." },
    { typ: "volba", lekcia: "smalltalk-2-3", otazka: "Ako spojíš texty v Smalltalku?", moznosti: ["Čiarkou ,", "Plusom +", "Bodkou .", "&"], spravna: 0, vysvetlenie: "'a' , 'b'" },
    { typ: "volba", lekcia: "smalltalk-2-3", otazka: "Od akého čísla začínajú indexy textu?", moznosti: ["1", "0", "-1", "závisí"], spravna: 0, vysvetlenie: "Smalltalk počíta od 1." },
    { typ: "volba", lekcia: "smalltalk-2-4", otazka: "Ktorý zápis je symbol?", moznosti: ["<code>#farba</code>", "<code>$f</code>", "<code>'farba'</code>", "<code>farba</code>"], spravna: 0, vysvetlenie: "Mriežka." },
    { typ: "volba", lekcia: "smalltalk-2-5", otazka: "Čo vráti <code>stdin nextLine</code>?", moznosti: ["Riadok ako text", "Číslo", "Znak", "Vždy nil"], spravna: 0, vysvetlenie: "Číslo cez asNumber." },
    { typ: "doplnenie", lekcia: "smalltalk-2-3", otazka: "Vypíš text s číslom:", sablona: "('Body: ' [[0]] 42 [[1]]) displayNl.", zetony: [",", "printString", "+", "asText", "."], spravne: [",", "printString"], vysvetlenie: "'Body: ' , 42 printString" },
  ];

  K.registrujModul("smalltalk", { cislo: 2, nazov: "Čísla, texty a vstup", popis: "Veľké čísla a zlomky, počítanie, texty, znaky, symboly a vstup.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
