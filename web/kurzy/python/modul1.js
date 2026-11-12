/* Python · Modul 1 · Prvé príkazy */
(function () {
  var P = K.pom, PY = function (t) { return P.kod(t, "py"); }, TXT = P.TXT, MONO = P.MONO;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "py", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }

  var OBR_POUZITIE = '<svg viewBox="0 0 340 120" role="img" aria-label="Python sa používa na umelú inteligenciu, dáta, automatizáciu, weby a vedu">' +
    [["🤖", "umelá inteligencia"], ["📊", "dáta a grafy"], ["⚙️", "automatizácia"], ["🌐", "weby"], ["🔬", "veda"]].map(function (x, i) {
      var cx = 36 + i * 67;
      return '<circle cx="' + cx + '" cy="44" r="28" style="fill:var(--surface-2);stroke:#3572a5;stroke-width:2"/><text x="' + cx + '" y="53" text-anchor="middle" font-size="24">' + x[0] + '</text><text x="' + cx + '" y="94" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--text)">' + x[1].split(" ")[0] + '</text><text x="' + cx + '" y="107" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--text)">' + (x[1].split(" ")[1] || "") + "</text>";
    }).join("") + "</svg>";

  var L1 = { id: "python-1-1", nazov: "Čo je Python", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Jazyk, ktorý sa číta ako angličtina",
      text: "<p><b>Python</b> je jeden z najpopulárnejších programovacích jazykov na svete. Má jednoduchý zápis, preto sa často učí ako prvý jazyk. Zároveň ho používajú NASA, Google, Netflix aj vedci.</p>", obr: OBR_POUZITIE,
      podrobne: "<p>Kedy je Python dobrá voľba:</p><ul><li><b>umelá inteligencia</b> a strojové učenie (ChatGPT a podobné modely sa trénujú v Pythone),</li><li>spracovanie <b>dát</b>, tabuliek a grafov,</li><li><b>automatizácia</b> nudnej práce: premenovanie súborov, posielanie e-mailov, sťahovanie údajov,</li><li>serverová časť webov (Django, Flask).</li></ul><p>Na hry s rýchlou grafikou či mobilné aplikácie sú vhodnejšie iné jazyky (C++, C#, Kotlin, Swift).</p>",
      hlbka: "<p>Python vytvoril Holanďan Guido van Rossum v roku 1991. Meno nemá podľa hada, ale podľa britskej komediálnej skupiny Monty Python. Python je <b>interpretovaný</b>: program sa neprekladá dopredu, ale vykonáva riadok po riadku. Je preto pomalší ako C++, no na väčšinu úloh to nevadí.</p>" },
    { typ: "vyklad", nadpis: "Prvý program",
      text: "<p>Príkaz <code>print()</code> vypíše na obrazovku, čo mu dáš do zátvoriek:</p>" + UKAZ('print("Ahoj, svet!")\nprint(2 + 3)', "Ahoj, svet!\n5"),
      podrobne: "<ul><li>Text je v úvodzovkách, jednoduchých alebo dvojitých.</li><li>Čísla a výpočty bez úvodzoviek.</li><li>Na konci riadku <b>nie je</b> bodkočiarka. Každý príkaz je na svojom riadku.</li></ul><p>Python v tejto aplikácii beží priamo v tvojom telefóne, aj bez internetu. Prvé spustenie trvá pár sekúnd.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>print(10 - 4)</code>?", moznosti: ["6", "10 - 4", "\"6\"", "chybu"], spravna: 0, vysvetlenie: "Bez úvodzoviek Python vypočíta výsledok." },
    { typ: "volba", otazka: "Na čo je Python obzvlášť obľúbený?", moznosti: ["Umelá inteligencia a dáta", "Ovládače grafických kariet", "Štýlovanie webov", "Nič, je to starý jazyk"], spravna: 0, vysvetlenie: "AI, dáta a automatizácia sú hlavná doména Pythonu." },
    { typ: "kod", zadanie: "Vypíš dva riadky: <b>Učím sa Python</b> a pod ním výsledok <code>12 * 12</code>. Program spusti tlačidlom ▶ alebo rovno ťukni na Skontrolovať.",
      karty: ["py"], start: { py: "" }, vyska: "140px",
      napoveda: 'print("Učím sa Python") a print(12 * 12)', riesenie: { py: 'print("Učím sa Python")\nprint(12 * 12)' },
      kontrola: function (v) { var l = r(v); if (l[0] !== "Učím sa Python") return "Prvý riadok má byť presne: Učím sa Python"; return l[1] === "144" ? null : "Druhý riadok má byť 144 (12 * 12 bez úvodzoviek)."; },
      vysvetlenie: "Prvý program v Pythone je hotový!" },
  ] };

  var L2 = { id: "python-1-2", nazov: "Viac o print", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Viac hodnôt naraz",
      text: "<p>Do <code>print</code> môžeš dať viac hodnôt oddelených čiarkou. Python medzi ne vloží medzeru:</p>" + UKAZ('print("Mám", 15, "rokov")\nprint("a", "b", "c", sep="-")\nprint("Bez nového riadku", end=" ")\nprint("...pokračujem")', "Mám 15 rokov\na-b-c\nBez nového riadku ...pokračujem"),
      podrobne: "<ul><li><code>sep</code> = oddeľovač medzi hodnotami (predvolene medzera).</li><li><code>end</code> = čo sa vypíše na konci (predvolene nový riadok).</li></ul>" },
    { typ: "volba", otazka: "Čo vypíše <code>print(1, 2, 3, sep=\"+\")</code>?", moznosti: ["1+2+3", "6", "1 2 3", "1, 2, 3"], spravna: 0, vysvetlenie: "sep určuje, čo je medzi hodnotami." },
    { typ: "vyklad", nadpis: "Komentáre a špeciálne znaky",
      text: PY('# Toto je komentár, Python ho ignoruje\nprint("Riadok 1\\nRiadok 2")   # \\n = nový riadok\nprint("Povedal: \\"Ahoj\\"")      # \\" = úvodzovka v texte\nprint(\'Pes\\tMačka\')               # \\t = tabulátor'),
      podrobne: "<p>Komentár začína mriežkou <code>#</code>. Píš doňho vysvetlenia pre seba a ostatných. Spätná lomka <code>\\</code> v texte uvádza špeciálny znak. Úvodzovky v texte vyriešiš aj tak, že text ohraničíš iným druhom: <code>'Povedal: \"Ahoj\"'</code>.</p>" },
    { typ: "volba", otazka: "Ktorý znak začína komentár v Pythone?", moznosti: ["<code>#</code>", "<code>//</code>", "<code>&lt;!--</code>", "<code>--</code>"], spravna: 0, vysvetlenie: "V Pythone je komentár za #." },
    { typ: "kod", zadanie: "Jedným príkazom <code>print</code> vypíš dátum <b>12.11.2026</b> z troch čísel 12, 11 a 2026 (použi <code>sep</code>).",
      karty: ["py"], start: { py: "" }, vyska: "120px",
      napoveda: 'print(12, 11, 2026, sep=".")', riesenie: { py: 'print(12, 11, 2026, sep=".")' },
      kontrola: function (v, kod) { if (!/sep\s*=/.test(kod)) return "Použi parameter sep."; return r(v)[0] === "12.11.2026" ? null : "Výstup má byť 12.11.2026."; },
      vysvetlenie: "sep spojil čísla bodkami." },
  ] };

  var L3 = { id: "python-1-3", nazov: "Čítanie chýb", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Chyby sú normálne",
      text: "<p>Každý programátor robí chyby denne. Dôležité je vedieť ich prečítať. Python pri chybe povie <b>druh chyby</b> a <b>riadok</b>. Táto aplikácia ti chybu preloží do slovenčiny a riadok označí v editore.</p>" + P.tabulka(["Chyba", "Čo znamená"], [["<code>SyntaxError</code>", "zle zapísaný príkaz (chýba úvodzovka, zátvorka, dvojbodka)"], ["<code>NameError</code>", "neznáme meno, často preklep"], ["<code>TypeError</code>", "zlý typ, napr. text + číslo"], ["<code>IndentationError</code>", "zlé odsadenie riadkov"], ["<code>ZeroDivisionError</code>", "delenie nulou"]]),
      podrobne: "<p>Python rozlišuje veľké a malé písmená: <code>Print(\"Ahoj\")</code> skončí NameError, lebo funkcia sa volá <code>print</code>.</p>" },
    { typ: "volba", otazka: "Aká chyba vznikne?", kod: 'print("Ahoj)', moznosti: ["SyntaxError: text nie je uzavretý", "NameError", "Žiadna", "ZeroDivisionError"], spravna: 0, vysvetlenie: "Chýba zatváracia úvodzovka." },
    { typ: "volba", otazka: "Aká chyba vznikne?", kod: 'pirnt("Ahoj")', moznosti: ["NameError: pirnt neexistuje", "SyntaxError", "TypeError", "Vypíše Ahoj"], spravna: 0, vysvetlenie: "Preklep v mene funkcie." },
    { typ: "kod", zadanie: "Program má tri chyby. Oprav ho, aby vypísal <b>Ahoj</b> a potom <b>3</b>.",
      karty: ["py"], start: { py: 'Print("Ahoj")\nprint(1 + 2' }, vyska: "120px",
      napoveda: "Print s malým p a doplň zátvorku na konci druhého riadku.", riesenie: { py: 'print("Ahoj")\nprint(1 + 2)' },
      kontrola: function (v) { var l = r(v); return l[0] === "Ahoj" && l[1] === "3" ? null : "Výstup má byť Ahoj a 3."; },
      vysvetlenie: "Pri chybe si pozri riadok aj vysvetlenie nad editorom." },
  ] };

  var L4 = { id: "python-1-4", nazov: "Vstup od používateľa", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "input()",
      text: "<p><code>input()</code> zastaví program a počká, kým používateľ niečo napíše. Napísaný text vráti:</p>" + UKAZ('meno = input("Ako sa voláš? ")\nprint("Ahoj", meno)', "Ako sa voláš? Jana\nAhoj Jana"),
      podrobne: "<p>V tejto aplikácii program nečaká: čo program prečíta, napíšeš vopred do poľa <b>Vstup</b> nad výstupom. Každý riadok je jedna odpoveď pre jeden <code>input()</code>.</p><p><code>meno</code> je premenná, do ktorej sa odpoveď uloží. Viac o premenných v ďalšom module.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>input()</code>?", moznosti: ["Text, ktorý napísal používateľ", "Vždy číslo", "Nič", "True"], spravna: 0, vysvetlenie: "input vždy vracia text (str)." },
    { typ: "kod", zadanie: "Program sa opýta na obľúbené jedlo (<code>input</code>) a vypíše <b>Aj ja mám rád/a …</b> a jedlo. Vstup je pripravený: <b>pizza</b>.",
      karty: ["py"], vstup: "pizza", start: { py: 'jedlo = input("Obľúbené jedlo? ")\n' }, vyska: "130px",
      napoveda: 'print("Aj ja mám rád/a", jedlo)', riesenie: { py: 'jedlo = input("Obľúbené jedlo? ")\nprint("Aj ja mám rád/a", jedlo)' },
      kontrola: function (v) { var l = r(v); return /Aj ja mám rád\/a pizza/.test(l[l.length - 1]) ? null : "Posledný riadok má byť: Aj ja mám rád/a pizza"; },
      vysvetlenie: "Skús zmeniť vstup na iné jedlo a spustiť znova." },
  ] };

  var L5 = { id: "python-1-5", nazov: "Python ako kalkulačka", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Matematické operátory",
      text: P.tabulka(["Operátor", "Význam", "Príklad", "Výsledok"], [["<code>+ - *</code>", "plus, mínus, krát", "<code>3 * 4</code>", "12"], ["<code>/</code>", "delenie", "<code>7 / 2</code>", "3.5"], ["<code>//</code>", "celočíselné delenie", "<code>7 // 2</code>", "3"], ["<code>%</code>", "zvyšok", "<code>7 % 2</code>", "1"], ["<code>**</code>", "mocnina", "<code>2 ** 10</code>", "1024"]]),
      podrobne: "<p>Poradie ako v matematike, zátvorky ho menia. Delenie <code>/</code> vráti vždy desatinné číslo: <code>6 / 2</code> = <code>3.0</code>. Python počíta aj s obrovskými číslami: skús <code>2 ** 100</code>.</p>" },
    { typ: "volba", otazka: "Koľko je <code>17 // 5</code>?", moznosti: ["3", "3.4", "2", "85"], spravna: 0, vysvetlenie: "Celočíselné delenie zahodí desatinnú časť." },
    { typ: "volba", otazka: "Koľko je <code>17 % 5</code>?", moznosti: ["2", "3", "3.4", "0"], spravna: 0, vysvetlenie: "17 = 3 × 5 + 2." },
    { typ: "kod", zadanie: "Máš 125 minút. Vypíš, koľko je to celých hodín a zvyšných minút, vo formáte <b>2 h 5 min</b> (použi <code>//</code> a <code>%</code>).",
      karty: ["py"], start: { py: "minuty = 125\n" }, vyska: "140px",
      napoveda: 'print(minuty // 60, "h", minuty % 60, "min")', riesenie: { py: 'minuty = 125\nprint(minuty // 60, "h", minuty % 60, "min")' },
      kontrola: function (v, kod) { if (!/\/\//.test(kod) || !/%/.test(kod)) return "Použi // aj %."; return r(v)[0] === "2 h 5 min" ? null : "Výstup má byť 2 h 5 min."; },
      vysvetlenie: "// a % sú dvojica na prevody jednotiek." },
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li><code>print()</code>, <code>sep</code>, <code>end</code>, komentáre <code>#</code>.</li><li>Čítanie chýb: SyntaxError, NameError…</li><li><code>input()</code>.</li><li>Operátory <code>+ - * / // % **</code>.</li></ul>", tip: "Teraz test. Potom Modul 2: premenné a čísla." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "python-1-1", otazka: "Čo je správny zápis výpisu?", moznosti: ["<code>print(\"Ahoj\")</code>", "<code>console.log(\"Ahoj\")</code>", "<code>echo \"Ahoj\"</code>", "<code>print \"Ahoj\";</code>"], spravna: 0, vysvetlenie: "V Pythone 3 je print funkcia so zátvorkami." },
    { typ: "volba", lekcia: "python-1-2", otazka: "Čo vypíše <code>print(\"A\", \"B\")</code>?", moznosti: ["A B", "AB", "A, B", "A+B"], spravna: 0, vysvetlenie: "Predvolený oddeľovač je medzera." },
    { typ: "volba", lekcia: "python-1-2", otazka: "Čo spraví <code>\\n</code> v texte?", moznosti: ["Nový riadok", "Vypíše n", "Komentár", "Chybu"], spravna: 0, vysvetlenie: "\\n = new line." },
    { typ: "volba", lekcia: "python-1-3", otazka: "Aká chyba vznikne pri <code>print(5 / 0)</code>?", moznosti: ["ZeroDivisionError", "SyntaxError", "NameError", "Žiadna"], spravna: 0, vysvetlenie: "Nulou sa deliť nedá." },
    { typ: "volba", lekcia: "python-1-3", otazka: "Prečo nefunguje <code>Print(\"x\")</code>?", moznosti: ["Python rozlišuje veľké a malé písmená", "Chýba bodkočiarka", "x musí byť číslo", "Funguje"], spravna: 0, vysvetlenie: "Funkcia sa volá print." },
    { typ: "volba", lekcia: "python-1-4", otazka: "Aký typ hodnoty vráti <code>input()</code>?", moznosti: ["text (str)", "číslo (int)", "desatinné (float)", "závisí od vstupu"], spravna: 0, vysvetlenie: "Vždy text." },
    { typ: "doplnenie", lekcia: "python-1-5", otazka: "Dvojka na tretiu:", sablona: "print(2 [[0]] 3)  # 8", zetony: ["**", "^", "*", "//"], spravne: ["**"], vysvetlenie: "** je mocnina. ^ v Pythone znamená niečo iné." },
    { typ: "volba", lekcia: "python-1-5", otazka: "Čo vypíše <code>print(8 / 2)</code>?", moznosti: ["4.0", "4", "8/2", "chybu"], spravna: 0, vysvetlenie: "/ vždy vráti desatinné číslo." },
  ];

  K.registrujModul("python", { cislo: 1, nazov: "Prvé príkazy", popis: "Čo je Python, výpis cez print, komentáre, čítanie chýb, vstup a počítanie.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
