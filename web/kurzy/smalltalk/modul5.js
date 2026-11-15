/* Smalltalk · Modul 5 · Triedy a objekty */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "st"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "st", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function beh(kod, doplnok) { var x = K.spustiSmalltalkHned(kod + "\n" + (doplnok || "")); return { riadky: r(x.vystup), chyba: x.chyba }; }

  var L1 = { id: "smalltalk-5-1", nazov: "Vlastná trieda", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Object subclass:",
      text: "<p>Novú triedu vytvoríš ako podtriedu <code>Object</code>. V hranatých zátvorkách sú <b>inštančné premenné</b> a <b>metódy</b>. Metóda je meno správy a telo v <code>[ ]</code>; <code>^</code> vráti výsledok:</p>" + UKAZ("Object subclass: Pes [\n    | meno |\n    meno: m [ meno := m ]\n    stekaj [ ^meno , ': Haf!' ]\n]\n\n| p |\np := Pes new.\np meno: 'Rex'.\np stekaj displayNl.", "Rex: Haf!"),
      podrobne: "<p>Tento zápis tried pochádza z GNU Smalltalku. V Pharo a Squeaku sa triedy píšu v grafickom prehliadači tried, ale princíp je rovnaký. Inštančné premenné vidia len metódy objektu, zvonka sú skryté.</p>" },
    { typ: "volba", otazka: "Čo spraví <code>^</code> v metóde?", moznosti: ["Vráti výsledok metódy", "Je to komentár", "Umocní číslo", "Vytvorí premennú"], spravna: 0, vysvetlenie: "Bez ^ vráti metóda samotný objekt (self)." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Obdlznik</code> s premennými <code>a b</code>, metódou <code>a: x b: y</code> (nastaví obe) a metódou <code>obsah</code>. Vypíš obsah obdĺžnika 4 × 5: <b>20</b>.",
      karty: ["st"], start: { st: "Object subclass: Obdlznik [\n    | a b |\n    \n]\n\n" }, vyska: "220px",
      napoveda: "a: x b: y [ a := x. b := y ]\nobsah [ ^a * b ]\n…\n((Obdlznik new) a: 4 b: 5; obsah) printNl.", riesenie: { st: "Object subclass: Obdlznik [\n    | a b |\n    a: x b: y [ a := x. b := y ]\n    obsah [ ^a * b ]\n]\n\n| o |\no := Obdlznik new.\no a: 4 b: 5.\no obsah printNl." },
      kontrola: function (v, kod) { if (!/subclass:\s*Obdlznik/.test(kod)) return "Vytvor triedu Obdlznik."; if (r(v)[0] !== "20") return "Výstup má byť 20."; var t = beh(kod, "((Obdlznik new) a: 3 b: 7; obsah) printNl."); return t.riadky.pop() === "21" ? null : "Pre 3 × 7 má metóda obsah vrátiť 21."; },
      vysvetlenie: "Objekt si pamätá rozmery v inštančných premenných." },
  ] };

  var L2 = { id: "smalltalk-5-2", nazov: "initialize a konštruktor", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Objekt hneď pripravený",
      text: "<p>Metóda <code>initialize</code> sa zavolá automaticky pri <code>new</code>. Vlastný „konštruktor“ je <b>metóda triedy</b>: zapíše sa ako <code>Trieda class &gt;&gt; meno [ … ]</code>:</p>" + UKAZ("Object subclass: Ucet [\n    | majitel zostatok |\n    Ucet class >> pre: meno [ ^self new nastavMajitela: meno ]\n    initialize [ zostatok := 0 ]\n    nastavMajitela: m [ majitel := m ]\n    vloz: suma [ zostatok := zostatok + suma ]\n    zostatok [ ^zostatok ]\n]\n\n| u |\nu := Ucet pre: 'Jana'.\nu vloz: 100; vloz: 50.\nu zostatok printNl.", "150"),
      podrobne: "<p>Metódu <code>pre:</code> posielame samotnej triede Ucet (nie objektu). Vo vnútri <code>self new</code> vytvorí objekt (zavolá initialize) a nastaví mu meno. Takto sa v Smalltalku robia pohodlné konštruktory.</p>" },
    { typ: "volba", otazka: "Kedy sa zavolá <code>initialize</code>?", moznosti: ["Automaticky pri new", "Len keď ju zavoláš", "Na konci programu", "Nikdy"], spravna: 0, vysvetlenie: "new → initialize." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Pocitadlo</code> s premennou <code>n</code>, metódou <code>initialize</code> (n := 0), metódou <code>zvys</code> (n o 1) a metódou <code>hodnota</code>. Vytvor počítadlo, zvýš ho 3-krát cez <code>timesRepeat:</code> a vypíš <b>3</b>.",
      karty: ["st"], start: { st: "Object subclass: Pocitadlo [\n    | n |\n    \n]\n\n" }, vyska: "220px",
      napoveda: "initialize [ n := 0 ]\nzvys [ n := n + 1 ]\nhodnota [ ^n ]", riesenie: { st: "Object subclass: Pocitadlo [\n    | n |\n    initialize [ n := 0 ]\n    zvys [ n := n + 1 ]\n    hodnota [ ^n ]\n]\n\n| p |\np := Pocitadlo new.\n3 timesRepeat: [p zvys].\np hodnota printNl." },
      kontrola: function (v, kod) { if (!/initialize\s*\[/.test(kod)) return "Pridaj metódu initialize."; if (r(v)[0] !== "3") return "Výstup má byť 3."; var t = beh(kod, "(Pocitadlo new) hodnota printNl."); return t.riadky.pop() === "0" ? null : "Nové počítadlo má mať hodnotu 0 (nastav ju v initialize)."; },
      vysvetlenie: "Bez initialize by n bolo nil a n + 1 by zlyhalo." },
  ] };

  var L3 = { id: "smalltalk-5-3", nazov: "printOn:", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Ako sa objekt vypíše",
      text: "<p>Keď objektu pošleš <code>printNl</code> alebo <code>printString</code>, Smalltalk sa ho opýta správou <code>printOn:</code>. Prepíš ju a objekt sa bude vypisovať po tvojom:</p>" + UKAZ("Object subclass: Bod [\n    | x y |\n    x: ax y: ay [ x := ax. y := ay ]\n    printOn: aStream [\n        aStream nextPutAll: 'Bod('; print: x; nextPutAll: ', '; print: y; nextPutAll: ')' ]\n]\n\n((Bod new) x: 3 y: 4; yourself) printNl.", "Bod(3, 4)"),
      podrobne: "<p>Stream (prúd) je objekt, do ktorého sa postupne píše: <code>nextPutAll:</code> pridá text, <code>print:</code> pridá printString objektu. <code>yourself</code> na konci kaskády vráti samotný objekt.</p>" },
    { typ: "volba", otazka: "Čo vypíše objekt bez vlastného printOn:?", moznosti: ["Napr. a Bod (článok a meno triedy)", "Nič", "Chybu", "Svoje premenné"], spravna: 0, vysvetlenie: "Predvolený výpis je meno triedy." },
    { typ: "kod", zadanie: "Doplň triede <code>Zlomok</code> metódu <code>printOn:</code>, aby sa vypisovala ako <b>3/4</b>.",
      karty: ["st"], start: { st: "Object subclass: Zlomok [\n    | c m |\n    c: a m: b [ c := a. m := b ]\n    \n]\n\n((Zlomok new) c: 3 m: 4; yourself) printNl." }, vyska: "200px",
      napoveda: "printOn: aStream [ aStream print: c; nextPutAll: '/'; print: m ]", riesenie: { st: "Object subclass: Zlomok [\n    | c m |\n    c: a m: b [ c := a. m := b ]\n    printOn: aStream [ aStream print: c; nextPutAll: '/'; print: m ]\n]\n\n((Zlomok new) c: 3 m: 4; yourself) printNl." },
      kontrola: function (v, kod) { if (!/printOn:/.test(kod)) return "Pridaj metódu printOn:."; return r(v)[0] === "3/4" ? null : "Výstup má byť 3/4."; },
      vysvetlenie: "Teraz sa objekt vypisuje zrozumiteľne." },
  ] };

  var L4 = { id: "smalltalk-5-4", nazov: "Dedičnosť a super", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Podtrieda",
      text: UKAZ("Object subclass: Zviera [\n    | meno |\n    meno: m [ meno := m ]\n    zvuk [ ^'...' ]\n    ozvi [ ^meno , ': ' , self zvuk ]\n]\n\nZviera subclass: Macka [\n    zvuk [ ^'Mňau' ]\n]\n\nZviera subclass: Pes [\n    zvuk [ ^'Haf' ]\n    ozvi [ ^super ozvi , '!' ]\n]\n\n{ (Macka new) meno: 'Micka'; yourself. (Pes new) meno: 'Rex'; yourself }\n    do: [:z | z ozvi displayNl].", "Micka: Mňau\nRex: Haf!"),
      podrobne: "<p>Podtrieda zdedí premenné aj metódy a môže ich prepísať. <code>self zvuk</code> pošle správu samému sebe, takže mačka odpovie po mačacky (<b>polymorfizmus</b>). <code>super ozvi</code> zavolá pôvodnú metódu predka.</p>" },
    { typ: "volba", otazka: "Čo spraví <code>super ozvi</code>?", moznosti: ["Zavolá metódu ozvi z nadtriedy", "Zavolá ozvi dvakrát", "Vytvorí nový objekt", "Nič"], spravna: 0, vysvetlenie: "Hľadanie začne v nadtriede." },
    { typ: "kod", zadanie: "Trieda <code>Tvar</code> je pripravená. Vytvor podtriedy <code>Stvorec</code> (premenná a) a <code>Kruh</code> (premenná r) s metódou <code>obsah</code> (pre kruh <code>Float pi * r * r</code>). Program vypíše súčet obsahov zaokrúhlený na 0.01: <b>19.14</b>.",
      karty: ["st"], start: { st: "Object subclass: Tvar [\n    obsah [ ^0 ]\n]\n\n\n\n| tvary |\ntvary := { (Stvorec new) a: 4; yourself. (Kruh new) r: 1; yourself }.\n((tvary inject: 0 into: [:s :t | s + t obsah]) roundTo: 0.01) printNl." }, vyska: "260px",
      napoveda: "Tvar subclass: Stvorec [ | a | a: x [ a := x ] obsah [ ^a * a ] ]", riesenie: { st: "Object subclass: Tvar [\n    obsah [ ^0 ]\n]\n\nTvar subclass: Stvorec [\n    | a |\n    a: x [ a := x ]\n    obsah [ ^a * a ]\n]\n\nTvar subclass: Kruh [\n    | r |\n    r: x [ r := x ]\n    obsah [ ^Float pi * r * r ]\n]\n\n| tvary |\ntvary := { (Stvorec new) a: 4; yourself. (Kruh new) r: 1; yourself }.\n((tvary inject: 0 into: [:s :t | s + t obsah]) roundTo: 0.01) printNl." },
      kontrola: function (v, kod) { if (!/Tvar\s+subclass:\s*Stvorec/.test(kod) || !/Tvar\s+subclass:\s*Kruh/.test(kod)) return "Vytvor Tvar subclass: Stvorec a Tvar subclass: Kruh."; return r(v)[0] === "19.14" ? null : "Výstup má byť 19.14."; },
      vysvetlenie: "Každý tvar počíta obsah po svojom." },
  ] };

  var L5 = { id: "smalltalk-5-5", nazov: "Rozšírenie tried a výnimky", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Aj Integer sa dá rozšíriť",
      text: "<p>V Smalltalku môžeš pridať metódu aj existujúcej triede, napríklad všetkým celým číslam:</p>" + UKAZ("Integer extend [\n    fib [ self < 2 ifTrue: [^self]. ^(self - 1) fib + (self - 2) fib ]\n]\n\n15 fib printNl.", "610") + "<p><b>Výnimky</b> sa zachytávajú správou <code>on:do:</code>:</p>" + UKAZ("| r |\nr := [10 / 0] on: ZeroDivide do: [:e | 'delenie nulou'].\nr displayNl.\nr := [Error signal: 'Nedostatok peňazí'] on: Error do: [:e | e messageText].\nr displayNl.", "delenie nulou\nNedostatok peňazí"),
      podrobne: "<p><code>Error signal: 'text'</code> vyhodí výnimku. Ak ju nikto nezachytí, program skončí a aplikácia ti chybu vysvetlí. V metóde môžeš napísať aj <code>self error: 'text'</code>.</p>" },
    { typ: "volba", otazka: "Ako zachytíš výnimku?", moznosti: ["<code>[ … ] on: Error do: [:e | … ]</code>", "<code>try { } catch { }</code>", "<code>[ … ] catch: Error</code>", "<code>rescue Error</code>"], spravna: 0, vysvetlenie: "Správa bloku on:do:." },
    { typ: "kod", zadanie: "Rozšír triedu <code>Integer</code> o metódu <code>jeDokonale</code>, ktorá vráti true, ak sa číslo rovná súčtu svojich deliteľov menších ako ono (6 = 1 + 2 + 3). Vypíš dokonalé čísla do 500: <b>#(6 28 496)</b>.",
      karty: ["st"], start: { st: "Integer extend [\n    jeDokonale [\n        \n    ]\n]\n\n((1 to: 500) select: [:n | n jeDokonale]) printNl." }, vyska: "220px",
      napoveda: "| s | s := 0. 1 to: self - 1 do: [:d | (self \\\\ d = 0) ifTrue: [s := s + d]]. ^s = self", riesenie: { st: "Integer extend [\n    jeDokonale [\n        | s |\n        s := 0.\n        1 to: self - 1 do: [:d | (self \\\\ d = 0) ifTrue: [s := s + d]].\n        ^s = self\n    ]\n]\n\n((1 to: 500) select: [:n | n jeDokonale]) printNl." },
      kontrola: function (v, kod) { if (!/Integer\s+extend/.test(kod)) return "Použi Integer extend [ … ]."; return r(v)[0] === "#(6 28 496)" ? null : "Výstup má byť #(6 28 496)."; },
      vysvetlenie: "Všetky celé čísla teraz rozumejú správe jeDokonale." },
    { typ: "vyklad", nadpis: "Kurz Smalltalk máš za sebou",
      text: "<ul><li>Všetko je objekt, program posiela správy.</li><li>Bloky, podmienky a cykly ako správy.</li><li>Kolekcie s do:, collect:, select:, inject:into:.</li><li>Vlastné triedy, initialize, metódy triedy, printOn:.</li><li>Dedičnosť, self, super a polymorfizmus.</li><li>Rozšírenie tried a výnimky.</li></ul>", tip: "Po teste ťa čakajú záverečné projekty: zásobník, knižnica a zoo." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "smalltalk-5-1", otazka: "Ako vytvoríš triedu Auto?", moznosti: ["<code>Object subclass: Auto [ … ]</code>", "<code>class Auto { }</code>", "<code>new class Auto</code>", "<code>Auto := Class new</code>"], spravna: 0, vysvetlenie: "Podtrieda Object." },
    { typ: "volba", lekcia: "smalltalk-5-1", otazka: "Čo vráti metóda bez <code>^</code>?", moznosti: ["Samotný objekt (self)", "nil", "0", "chybu"], spravna: 0, vysvetlenie: "Predvolene self." },
    { typ: "volba", lekcia: "smalltalk-5-2", otazka: "Ako zapíšeš metódu triedy (konštruktor)?", moznosti: ["<code>Ucet class &gt;&gt; pre: m [ … ]</code>", "<code>static pre: m</code>", "<code>Ucet.pre(m)</code>", "<code>new pre: m</code>"], spravna: 0, vysvetlenie: "class >>" },
    { typ: "volba", lekcia: "smalltalk-5-3", otazka: "Ktorú metódu prepíšeš, aby sa objekt pekne vypisoval?", moznosti: ["printOn:", "toString", "display", "show:"], spravna: 0, vysvetlenie: "printOn: aStream" },
    { typ: "volba", lekcia: "smalltalk-5-4", otazka: "Čo je <code>self</code>?", moznosti: ["Objekt, ktorý práve vykonáva metódu", "Trieda Object", "Nadtrieda", "Premenná nil"], spravna: 0, vysvetlenie: "Ja sám." },
    { typ: "volba", lekcia: "smalltalk-5-5", otazka: "Čo spraví <code>Error signal: 'Zle'</code>?", moznosti: ["Vyhodí výnimku s textom Zle", "Vypíše Zle", "Vytvorí triedu", "Nič"], spravna: 0, vysvetlenie: "Zachytíš ju cez on:do:." },
    { typ: "doplnenie", lekcia: "smalltalk-5-4", otazka: "Doplň podtriedu:", sablona: "Zviera [[0]] Macka [\n    zvuk [ [[1]]'Mňau' ]\n]", zetony: ["subclass:", "^", "extends", "return", ":"], spravne: ["subclass:", "^"], vysvetlenie: "Zviera subclass: Macka a ^ vráti hodnotu." },
  ];

  K.registrujModul("smalltalk", { cislo: 5, nazov: "Triedy a objekty", popis: "Vlastné triedy, initialize, metódy triedy, printOn:, dedičnosť, extend a výnimky.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("smalltalk", [
    { kat: "Základy", znak: "Transcript showCr:", nazov: "Výpis riadku", popis: "show: bez nového riadku, cr nový riadok.", priklad: "Transcript showCr: 'Ahoj'." },
    { kat: "Základy", znak: "printNl / displayNl", nazov: "Vypíš objekt", popis: "printNl s apostrofmi pri texte, displayNl bez nich." },
    { kat: "Základy", znak: "'text'", nazov: "Text", popis: "V apostrofoch. Apostrof vo vnútri sa zdvojí: 'it''s'." },
    { kat: "Základy", znak: "\"komentár\"", nazov: "Komentár", popis: "V úvodzovkách." },
    { kat: "Základy", znak: ".", nazov: "Bodka", popis: "Koniec príkazu." },
    { kat: "Základy", znak: ";", nazov: "Kaskáda", popis: "Ďalšia správa tomu istému príjemcovi." },
    { kat: "Základy", znak: "| a b |", nazov: "Premenné", popis: "Deklarácia premenných." },
    { kat: "Základy", znak: ":=", nazov: "Priradenie", popis: "x := 5." },
    { kat: "Správy", znak: "unárne > binárne > kľúčové", nazov: "Priorita", popis: "Binárne zľava doprava: 2 + 3 * 4 = 20." },
    { kat: "Správy", znak: "$a / #sym", nazov: "Znak a symbol", popis: "Jeden znak / jedinečné meno." },
    { kat: "Čísla", znak: "// a \\\\", nazov: "Delenie a zvyšok", popis: "17 // 5 = 3, 17 \\\\ 5 = 2. 7 / 2 = 7/2 (zlomok)." },
    { kat: "Čísla", znak: "printString / asNumber", nazov: "Prevody", popis: "Číslo na text a text na číslo." },
    { kat: "Riadenie", znak: "[:x | …]", nazov: "Blok", popis: "Kód na neskôr, value: ho spustí." },
    { kat: "Riadenie", znak: "ifTrue:ifFalse:", nazov: "Podmienka", popis: "Správa objektu true/false.", priklad: "(x > 0) ifTrue: ['kladné' displayNl] ifFalse: ['iné' displayNl]." },
    { kat: "Riadenie", znak: "to:do: / timesRepeat:", nazov: "Cykly s počtom", popis: "1 to: 10 do: [:i | …]." },
    { kat: "Riadenie", znak: "[…] whileTrue: […]", nazov: "Cyklus s podmienkou", popis: "Podmienka v bloku." },
    { kat: "Kolekcie", znak: "#( ) / { }", nazov: "Pole", popis: "Indexy od 1, at:, size." },
    { kat: "Kolekcie", znak: "do: collect: select: detect:", nazov: "Prechod a filtrovanie", popis: "Kolekcie dostávajú bloky." },
    { kat: "Kolekcie", znak: "inject:into:", nazov: "Zhrnutie", popis: "#(1 2 3) inject: 0 into: [:a :x | a + x]" },
    { kat: "Kolekcie", znak: "OrderedCollection / Dictionary", nazov: "Rastúca kolekcia / slovník", popis: "add:, remove: / at:put:, at:ifAbsent:." },
    { kat: "Triedy", znak: "Object subclass: X [ ]", nazov: "Trieda", popis: "Premenné | a |, metódy meno [ … ]." },
    { kat: "Triedy", znak: "^", nazov: "Návrat", popis: "Vráti výsledok metódy." },
    { kat: "Triedy", znak: "self / super", nazov: "Ja sám / predok", popis: "super hľadá metódu v nadtriede." },
    { kat: "Triedy", znak: "X class >> m [ ]", nazov: "Metóda triedy", popis: "Napr. konštruktor X pre: 'meno'." },
    { kat: "Triedy", znak: "printOn:", nazov: "Výpis objektu", popis: "aStream nextPutAll: …; print: …" },
    { kat: "Triedy", znak: "on:do:", nazov: "Výnimky", popis: "[…] on: Error do: [:e | e messageText]" },
  ]);
})();
