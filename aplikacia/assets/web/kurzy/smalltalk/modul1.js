/* Smalltalk · Modul 1 · Objekty a správy */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var KOD = function (t) { return P.kod(t, "st"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "st", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function beh(kod, vstup) { var x = K.spustiSmalltalkHned(kod, vstup || ""); return { riadky: r(x.vystup), chyba: x.chyba }; }

  var OBR = '<svg viewBox="0 0 340 110" role="img" aria-label="Správa: príjemcovi 3 pošleme správu + s argumentom 4, odpoveďou je objekt 7">' +
    '<rect x="8" y="34" width="62" height="40" rx="10" style="fill:#2e7d6b"/><text x="39" y="59" text-anchor="middle" font-size="16" font-weight="700" ' + MONO + ' fill="#fff">3</text>' +
    '<text x="39" y="92" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">príjemca</text>' +
    '<path d="M74 54h58" style="stroke:var(--muted);stroke-width:2"/><path d="M128 48l8 6-8 6" style="fill:var(--muted)"/>' +
    '<rect x="140" y="34" width="70" height="40" rx="20" style="fill:var(--surface-2);stroke:#2e7d6b;stroke-width:2"/><text x="175" y="59" text-anchor="middle" font-size="15" font-weight="700" ' + MONO + ' style="fill:#2e7d6b">+ 4</text>' +
    '<text x="175" y="92" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">správa</text>' +
    '<path d="M214 54h58" style="stroke:var(--muted);stroke-width:2"/><path d="M268 48l8 6-8 6" style="fill:var(--muted)"/>' +
    '<rect x="278" y="34" width="54" height="40" rx="10" style="fill:#2e7d6b"/><text x="305" y="59" text-anchor="middle" font-size="16" font-weight="700" ' + MONO + ' fill="#fff">7</text>' +
    '<text x="305" y="92" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">odpoveď</text></svg>';

  var L1 = { id: "smalltalk-1-1", nazov: "Ahoj, Smalltalk!", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Jazyk, z ktorého sa učili všetci",
      text: "<p>Smalltalk vznikol v 70. rokoch v laboratóriu Xerox PARC. Odtiaľ pochádza myšlienka <b>objektov</b>, grafické okná aj myš. Inšpiroval Javu, Python, Ruby aj Objective-C. Dodnes sa používa (Pharo, Squeak, GNU Smalltalk).</p>" + UKAZ("Transcript showCr: 'Ahoj, svet!'.", "Ahoj, svet!"),
      podrobne: "<p><code>Transcript</code> je objekt, ktorý vypisuje text. Posielame mu <b>správu</b> <code>showCr:</code> s textom (show = ukáž, cr = nový riadok). Text je v <b>apostrofoch</b>. Príkaz končí <b>bodkou</b>, ako veta.</p><p>V tejto aplikácii beží vlastný malý Smalltalk priamo v telefóne, aj bez internetu. Triedy sa zapisujú ako v GNU Smalltalku.</p>" },
    { typ: "volba", otazka: "Čím sa v Smalltalku ukončuje príkaz?", moznosti: ["Bodkou .", "Bodkočiarkou ;", "Novým riadkom", "Ničím"], spravna: 0, vysvetlenie: "Ako veta v slovenčine." },
    { typ: "volba", otazka: "Ako zapíšeš text v Smalltalku?", moznosti: ["<code>'Ahoj'</code>", "<code>\"Ahoj\"</code>", "<code>Ahoj</code>", "<code>#Ahoj</code> je jediná možnosť"], spravna: 0, vysvetlenie: "Úvodzovky \"…\" sú v Smalltalku komentár!" },
    { typ: "kod", zadanie: "Vypíš <b>Učím sa Smalltalk</b>.",
      karty: ["st"], start: { st: "Transcript showCr: 'Ahoj, svet!'." }, vyska: "110px",
      napoveda: "Transcript showCr: 'Učím sa Smalltalk'.", riesenie: { st: "Transcript showCr: 'Učím sa Smalltalk'." },
      kontrola: function (v) { return r(v)[0] === "Učím sa Smalltalk" ? null : "Výstup má byť presne: Učím sa Smalltalk"; },
      vysvetlenie: "Poslal si objektu Transcript správu showCr:." },
  ] };

  var L2 = { id: "smalltalk-1-2", nazov: "Všetko je objekt", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Objekty si posielajú správy",
      text: "<p>V Smalltalku je <b>všetko objekt</b>: čísla, texty, aj true a false. Program robí jediné: posiela objektom <b>správy</b> a objekty odpovedajú:</p>", obr: OBR,
      podrobne: UKAZ("3 printNl.\n(3 + 4) printNl.\n-5 abs printNl.\n'ahoj' size printNl.\n'ahoj' asUppercase displayNl.", "3\n7\n5\n4\nAHOJ") + "<p><code>printNl</code> vypíše objekt a nový riadok. <code>displayNl</code> vypíše text bez apostrofov. Aj <code>+</code> je správa: číslu 3 posielame „+ 4“.</p>" },
    { typ: "volba", otazka: "Čo je v <code>3 + 4</code> príjemca?", moznosti: ["3", "+", "4", "7"], spravna: 0, vysvetlenie: "Správa + 4 ide objektu 3." },
    { typ: "kod", zadanie: "Pošli textu <code>'programovanie'</code> správu <code>size</code> a výsledok vypíš cez <code>printNl</code>: <b>13</b>.",
      karty: ["st"], start: { st: "" }, vyska: "110px",
      napoveda: "'programovanie' size printNl.", riesenie: { st: "'programovanie' size printNl." },
      kontrola: function (v, kod) { if (!/size/.test(kod)) return "Použi správu size."; return r(v)[0] === "13" ? null : "Výstup má byť 13."; },
      vysvetlenie: "Text odpovedal svojou dĺžkou." },
  ] };

  var L3 = { id: "smalltalk-1-3", nazov: "Tri druhy správ", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Unárne, binárne a kľúčové",
      text: P.tabulka(["Druh", "Príklad", "Opis"], [["unárna", "<code>9 sqrt</code>", "len meno, bez argumentu"], ["binárna", "<code>3 + 4</code>", "znak a jeden argument"], ["kľúčová", "<code>5 max: 8</code>", "slovo s dvojbodkou a argument"], ["kľúčová", "<code>10 between: 1 and: 20</code>", "viac častí, každá s argumentom"]]) +
        "<p>Kľúčové správy sa čítajú ako veta: „10, si medzi 1 a 20?“ Celé meno správy je <code>between:and:</code>.</p>",
      podrobne: "<p>Pomenované časti správy robia kód čitateľným bez komentárov. Porovnaj <code>obdlznik(3, 5)</code> v iných jazykoch s <code>Obdlznik sirka: 3 vyska: 5</code> v Smalltalku.</p>" },
    { typ: "volba", otazka: "Aký druh správy je <code>'ahoj' reversed</code>?", moznosti: ["unárna", "binárna", "kľúčová", "to nie je správa"], spravna: 0, vysvetlenie: "Len meno, bez argumentu." },
    { typ: "volba", otazka: "Ako sa volá správa v <code>pole at: 2 put: 'x'</code>?", moznosti: ["<code>at:put:</code>", "<code>at:</code>", "<code>put:</code>", "<code>at put</code>"], spravna: 0, vysvetlenie: "Časti sa spájajú do jedného mena." },
    { typ: "kod", zadanie: "Vypíš cez <code>printNl</code> väčšie z čísel 17 a 42 pomocou správy <code>max:</code>: <b>42</b>.",
      karty: ["st"], start: { st: "" }, vyska: "110px",
      napoveda: "(17 max: 42) printNl.", riesenie: { st: "(17 max: 42) printNl." },
      kontrola: function (v, kod) { if (!/max:/.test(kod)) return "Použi správu max:."; return r(v)[0] === "42" ? null : "Výstup má byť 42."; },
      vysvetlenie: "Zátvorky určili, že printNl ide výsledku max:." },
  ] };

  var L4 = { id: "smalltalk-1-4", nazov: "Priorita správ", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Pozor: žiadna matematická priorita!",
      text: "<p>Smalltalk vyhodnocuje najprv <b>unárne</b>, potom <b>binárne</b>, nakoniec <b>kľúčové</b> správy. Binárne sú si rovné a idú <b>zľava doprava</b>, takže krát nemá prednosť pred plus:</p>" + UKAZ("(3 + 4 * 2) printNl.\n(3 + (4 * 2)) printNl.\n(2 raisedTo: 3 + 1) printNl.\n9 sqrt + 1 printNl.", "14\n11\n16\n1"),
      podrobne: "<p>Posledný riadok je zradný: <code>1 printNl</code> je unárna správa, vyhodnotí sa ako prvá a vypíše 1. Až potom sa sčíta 9 sqrt + 1. Zátvorky vždy pomôžu: <code>(9 sqrt + 1) printNl</code>.</p>" },
    { typ: "volba", otazka: "Koľko je v Smalltalku <code>2 + 3 * 4</code>?", moznosti: ["20", "14", "24", "chyba"], spravna: 0, vysvetlenie: "Zľava: 2 + 3 = 5, potom 5 * 4." },
    { typ: "volba", otazka: "Čo sa vyhodnotí prvé v <code>10 max: 3 + 4 squared</code>?", moznosti: ["4 squared", "3 + 4", "10 max: 3", "všetko naraz"], spravna: 0, vysvetlenie: "Unárne správy majú najvyššiu prioritu." },
    { typ: "kod", zadanie: "Doplň zátvorky, aby program vypísal <b>20</b> (súčet 5 + 15, nie 5 + 3 a potom * 5).",
      karty: ["st"], start: { st: "(5 + 3 * 5) printNl." }, vyska: "110px",
      napoveda: "(5 + (3 * 5)) printNl.", riesenie: { st: "(5 + (3 * 5)) printNl." },
      kontrola: function (v) { return r(v)[0] === "20" ? null : "Výstup má byť 20 (teraz " + (r(v)[0] || "nič") + ")."; },
      vysvetlenie: "Zátvorky sú v Smalltalku dôležitejšie ako inde." },
  ] };

  var L5 = { id: "smalltalk-1-5", nazov: "Premenné a kaskáda", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Premenné",
      text: "<p>Premenné sa deklarujú medzi zvislými čiarami <code>| |</code> a hodnota sa priraďuje cez <code>:=</code>:</p>" + UKAZ("| cena kusov |\ncena := 12.\nkusov := 4.\n(cena * kusov) printNl.", "48") + "<p>Komentár je v <b>úvodzovkách</b>: <code>\"toto je komentár\"</code>.</p>",
      podrobne: "<p>Premenná je len meno, ktoré ukazuje na objekt. Typ nemá, môže ukazovať na hocijaký objekt. Nová premenná ukazuje na <code>nil</code> (nič).</p>" },
    { typ: "vyklad", nadpis: "Kaskáda: viac správ jednému objektu",
      text: "<p>Bodkočiarka <code>;</code> pošle ďalšiu správu <b>tomu istému</b> príjemcovi:</p>" + UKAZ("Transcript show: 'Ahoj'; show: ', '; show: 'svet'; cr.\nTranscript show: 'Druhý riadok'; cr.", "Ahoj, svet\nDruhý riadok"),
      podrobne: "<p>Bez kaskády by si musel písať Transcript pred každú správu. <code>show:</code> nepridá nový riadok, <code>cr</code> áno.</p>" },
    { typ: "volba", otazka: "Ako priradíš premennej x hodnotu 5?", moznosti: ["<code>x := 5.</code>", "<code>x = 5.</code>", "<code>x == 5.</code>", "<code>5 -&gt; x.</code>"], spravna: 0, vysvetlenie: ":= je priradenie, = porovnanie." },
    { typ: "kod", zadanie: "Deklaruj premenné <code>a</code> a <code>b</code>, nastav a := 7, b := 6 a jedným Transcript s kaskádou vypíš <b>7 x 6 = 42</b> (použi <code>show:</code>, <code>printString</code> a nakoniec <code>cr</code>).",
      karty: ["st"], start: { st: "| a b |\n" }, vyska: "150px",
      napoveda: "Transcript show: a printString; show: ' x '; show: b printString; show: ' = '; show: (a * b) printString; cr.", riesenie: { st: "| a b |\na := 7.\nb := 6.\nTranscript show: a printString; show: ' x '; show: b printString; show: ' = '; show: (a * b) printString; cr." },
      kontrola: function (v, kod) { if (!/;/.test(kod)) return "Použi kaskádu ;."; return r(v)[0] === "7 x 6 = 42" ? null : "Výstup má byť 7 x 6 = 42"; },
      vysvetlenie: "printString premení číslo na text." },
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li>Všetko je objekt, program posiela správy.</li><li>Unárne, binárne a kľúčové správy.</li><li>Priorita: unárne, binárne zľava doprava, kľúčové.</li><li>Premenné <code>| a |</code>, priradenie <code>:=</code>, komentár v \"…\".</li><li>Kaskáda <code>;</code>, printNl, displayNl, Transcript.</li></ul>", tip: "Teraz test, potom čísla a texty." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "smalltalk-1-1", otazka: "Čo je v Smalltalku <code>\"toto\"</code>?", moznosti: ["Komentár", "Text", "Symbol", "Chyba"], spravna: 0, vysvetlenie: "Text je v apostrofoch." },
    { typ: "volba", lekcia: "smalltalk-1-2", otazka: "Čo je v Smalltalku objekt?", moznosti: ["Všetko, aj čísla a true", "Len triedy", "Len texty", "Nič"], spravna: 0, vysvetlenie: "Úplne všetko." },
    { typ: "volba", lekcia: "smalltalk-1-3", otazka: "Aký druh správy je <code>max:</code>?", moznosti: ["kľúčová", "unárna", "binárna", "premenná"], spravna: 0, vysvetlenie: "Slovo s dvojbodkou." },
    { typ: "volba", lekcia: "smalltalk-1-4", otazka: "Koľko je <code>10 - 2 * 3</code>?", moznosti: ["24", "4", "18", "chyba"], spravna: 0, vysvetlenie: "Zľava: 8 * 3." },
    { typ: "volba", lekcia: "smalltalk-1-5", otazka: "Čo robí <code>;</code>?", moznosti: ["Pošle ďalšiu správu tomu istému príjemcovi", "Ukončí príkaz", "Je to komentár", "Delí čísla"], spravna: 0, vysvetlenie: "Kaskáda." },
    { typ: "volba", lekcia: "smalltalk-1-5", otazka: "Ako deklaruješ premenné x a y?", moznosti: ["<code>| x y |</code>", "<code>var x, y</code>", "<code>(x y)</code>", "<code>[x y]</code>"], spravna: 0, vysvetlenie: "Medzi zvislé čiary." },
    { typ: "doplnenie", lekcia: "smalltalk-1-5", otazka: "Doplň:", sablona: "[[0]] x [[0]]\nx [[1]] 5[[2]]\nx printNl.", zetony: ["|", ":=", ".", "=", ";"], spravne: ["|", ":=", "."], vysvetlenie: "| x |, x := 5." },
  ];

  K.registrujModul("smalltalk", { cislo: 1, nazov: "Objekty a správy", popis: "Správy, ich priorita, premenné, kaskáda a výpis.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
