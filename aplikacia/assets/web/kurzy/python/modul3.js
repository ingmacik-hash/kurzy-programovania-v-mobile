/* Python · Modul 3 · Podmienky */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "py", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function posl(v) { var l = r(v); return l[l.length - 1]; }

  var OBR_IF = '<svg viewBox="0 0 340 150" role="img" aria-label="Podmienka rozdelí program na dve cesty: ak platí, vykoná sa blok if, inak blok else">' +
    '<rect x="110" y="8" width="120" height="34" rx="17" style="fill:#3572a5"/><text x="170" y="30" text-anchor="middle" font-size="13" font-weight="700" ' + MONO + ' fill="#fff">vek &gt;= 18 ?</text>' +
    '<path d="M140 42 L70 92" style="stroke:var(--ok);stroke-width:2.5"/><path d="M200 42 L270 92" style="stroke:var(--bad);stroke-width:2.5"/>' +
    '<text x="88" y="66" font-size="12" font-weight="700" ' + TXT + ' style="fill:var(--ok)">True</text><text x="232" y="66" font-size="12" font-weight="700" ' + TXT + ' style="fill:var(--bad)">False</text>' +
    '<rect x="10" y="94" width="130" height="44" rx="10" style="fill:var(--surface-2);stroke:var(--ok);stroke-width:2"/><text x="75" y="121" text-anchor="middle" font-size="12" ' + MONO + ' style="fill:var(--text)">print("Dospelý")</text>' +
    '<rect x="200" y="94" width="130" height="44" rx="10" style="fill:var(--surface-2);stroke:var(--bad);stroke-width:2"/><text x="265" y="121" text-anchor="middle" font-size="12" ' + MONO + ' style="fill:var(--text)">print("Dieťa")</text></svg>';

  var L1 = { id: "python-3-1", nazov: "if a else", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Program, ktorý sa rozhoduje",
      text: "<p><code>if</code> vykoná blok kódu, len keď podmienka platí. <code>else</code> sa vykoná inak:</p>" + UKAZ('vek = 15\nif vek >= 18:\n    print("Dospelý")\nelse:\n    print("Dieťa")\nprint("Koniec")', "Dieťa\nKoniec"), obr: OBR_IF,
      podrobne: "<p>Za podmienkou je <b>dvojbodka</b> a riadky, ktoré k nej patria, sú <b>odsadené o 4 medzery</b>. Odsadenie v Pythone nie je ozdoba, určuje, čo patrí do bloku. Riadok <code>print(\"Koniec\")</code> nie je odsadený, preto sa vykoná vždy.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: 'teplota = 25\nif teplota > 20:\n    print("Teplo")\nelse:\n    print("Zima")', moznosti: ["Teplo", "Zima", "Teplo a Zima", "Nič"], spravna: 0, vysvetlenie: "25 > 20 platí." },
    { typ: "volba", otazka: "Čo chýba v tomto kóde?", kod: 'if body > 50\n    print("Vyhral si")', moznosti: ["Dvojbodka za podmienkou", "Zátvorky okolo podmienky", "Slovo then", "Bodkočiarka"], spravna: 0, vysvetlenie: "if podmienka:" },
    { typ: "poradie", otazka: "Zoraď program:", riadky: ["cislo = 7", "if cislo % 2 == 0:", '    print("párne")', "else:", '    print("nepárne")'], vysvetlenie: "Premenná, if, blok, else, blok." },
    { typ: "kod", zadanie: "Program načíta vek (vstup je pripravený: <b>16</b>). Ak je vek aspoň 18, vypíš <b>Môžeš voliť</b>, inak vypíš <b>Ešte nemôžeš voliť</b>.",
      karty: ["py"], vstup: "16", start: { py: "vek = int(input())\n" }, vyska: "170px",
      napoveda: 'if vek >= 18:\n    print("Môžeš voliť")\nelse:\n    print("Ešte nemôžeš voliť")', riesenie: { py: 'vek = int(input())\nif vek >= 18:\n    print("Môžeš voliť")\nelse:\n    print("Ešte nemôžeš voliť")' },
      kontrola: function (v, kod) {
        if (!/if\s/.test(kod) || !/else\s*:/.test(kod)) return "Použi if aj else.";
        if (posl(v) !== "Ešte nemôžeš voliť") return "Pre vek 16 má program vypísať Ešte nemôžeš voliť.";
        var x = K.spustiPythonHned(kod, ["18"]); return P.riadky(x.vystup).pop() === "Môžeš voliť" ? null : "Pre vek 18 má program vypísať Môžeš voliť (skúsil som to). Pozor na >= .";
      },
      vysvetlenie: "Skús zmeniť vstup na 30 a spustiť." },
  ] };

  var L2 = { id: "python-3-2", nazov: "Porovnania a True/False", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Porovnávacie operátory",
      text: P.tabulka(["Operátor", "Význam", "Príklad → výsledok"], [["<code>==</code>", "rovná sa", "5 == 5 → True"], ["<code>!=</code>", "nerovná sa", "5 != 3 → True"], ["<code>&lt;</code> <code>&gt;</code>", "menší, väčší", "2 &lt; 1 → False"], ["<code>&lt;=</code> <code>&gt;=</code>", "menší/väčší alebo rovný", "3 &gt;= 3 → True"]]) + UKAZ('print(10 > 3)\nprint("a" == "A")\nheslo = "tajne"\nprint(heslo == "tajne")', "True\nFalse\nTrue"),
      podrobne: "<p>Pozor: <code>=</code> ukladá do premennej, <code>==</code> porovnáva. Výsledkom porovnania je <code>True</code> alebo <code>False</code> (typ bool), ktorý môžeš aj uložiť: <code>dospely = vek &gt;= 18</code>.</p><p>Python vie aj reťaziť: <code>0 &lt;= x &lt;= 10</code> znamená x je od 0 do 10.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>print(7 != 7)</code>?", moznosti: ["False", "True", "7", "chybu"], spravna: 0, vysvetlenie: "7 sa rovná 7, takže „nerovná sa“ neplatí." },
    { typ: "volba", otazka: "Ktorý zápis porovnáva?", moznosti: ["<code>x == 5</code>", "<code>x = 5</code>", "<code>x := 5</code> je jediný", "<code>x === 5</code>"], spravna: 0, vysvetlenie: "Dve rovná sa. === je z JavaScriptu." },
    { typ: "kod", zadanie: "Program načíta číslo (vstup: <b>14</b>) a vypíše, či je párne: <b>Párne</b> alebo <b>Nepárne</b>. Tip: číslo je párne, keď <code>cislo % 2 == 0</code>.",
      karty: ["py"], vstup: "14", start: { py: "cislo = int(input())\n" }, vyska: "160px",
      napoveda: 'if cislo % 2 == 0:\n    print("Párne")\nelse:\n    print("Nepárne")', riesenie: { py: 'cislo = int(input())\nif cislo % 2 == 0:\n    print("Párne")\nelse:\n    print("Nepárne")' },
      kontrola: function (v, kod) {
        if (posl(v) !== "Párne") return "Pre 14 má vypísať Párne.";
        return P.riadky(K.spustiPythonHned(kod, ["7"]).vystup).pop() === "Nepárne" ? null : "Pre 7 má vypísať Nepárne.";
      },
      vysvetlenie: "Zvyšok po delení dvomi prezradí párnosť." },
  ] };

  var L3 = { id: "python-3-3", nazov: "elif: viac možností", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Postupné rozhodovanie",
      text: "<p><code>elif</code> (skratka „else if“) pridá ďalšiu podmienku. Python ich skúša zhora a vykoná <b>len prvú</b>, ktorá platí:</p>" + UKAZ('body = 72\nif body >= 90:\n    znamka = 1\nelif body >= 75:\n    znamka = 2\nelif body >= 50:\n    znamka = 3\nelse:\n    znamka = 5\nprint("Známka:", znamka)', "Známka: 3"),
      podrobne: "<p>Poradie je dôležité. Keby bola prvá podmienka <code>body &gt;= 50</code>, aj 95 bodov by dostalo trojku, lebo Python by ďalej nekontroloval. Pri rozsahoch začni od najprísnejšej podmienky.</p>" },
    { typ: "volba", otazka: "Čo vypíše program pre <code>x = 15</code>?", kod: 'if x > 10:\n    print("A")\nelif x > 5:\n    print("B")\nelse:\n    print("C")', moznosti: ["A", "B", "A aj B", "C"], spravna: 0, vysvetlenie: "Prvá pravdivá vetva je A, ďalšie sa nekontrolujú." },
    { typ: "volba", otazka: "Koľko vetiev <code>elif</code> môžeš mať?", moznosti: ["Koľko chceš", "Najviac jednu", "Najviac tri", "Žiadnu bez else"], spravna: 0, vysvetlenie: "else je nepovinné a vždy posledné." },
    { typ: "kod", zadanie: "Program načíta teplotu (vstup: <b>8</b>) a vypíše: pod 0 → <b>Mrzne</b>, 0 až 14 → <b>Chladno</b>, 15 až 24 → <b>Príjemne</b>, 25 a viac → <b>Horúco</b>.",
      karty: ["py"], vstup: "8", start: { py: "t = int(input())\n" }, vyska: "220px",
      napoveda: "if t < 0: … elif t < 15: … elif t < 25: … else: …", riesenie: { py: 't = int(input())\nif t < 0:\n    print("Mrzne")\nelif t < 15:\n    print("Chladno")\nelif t < 25:\n    print("Príjemne")\nelse:\n    print("Horúco")' },
      kontrola: function (v, kod) {
        if (!/elif/.test(kod)) return "Použi elif.";
        var testy = [["-3", "Mrzne"], ["0", "Chladno"], ["8", "Chladno"], ["15", "Príjemne"], ["24", "Príjemne"], ["25", "Horúco"]];
        for (var i = 0; i < testy.length; i++) { var o = P.riadky(K.spustiPythonHned(kod, [testy[i][0]]).vystup).pop(); if (o !== testy[i][1]) return "Pre teplotu " + testy[i][0] + " má vypísať " + testy[i][1] + " (vypísal: " + o + ")."; }
        return null;
      },
      vysvetlenie: "Vyskúšal som 6 teplôt vrátane hraníc a všetky sedia." },
  ] };

  var L4 = { id: "python-3-4", nazov: "and, or, not", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Spájanie podmienok",
      text: P.tabulka(["Operátor", "Platí, keď…"], [["<code>a and b</code>", "platia obe"], ["<code>a or b</code>", "platí aspoň jedna"], ["<code>not a</code>", "a neplatí"]]) + UKAZ('vek = 16\nma_listok = True\nif vek >= 15 and ma_listok:\n    print("Vstup povolený")\nif vek < 6 or vek > 65:\n    print("Zľava")\nif not ma_listok:\n    print("Kúp si lístok")', "Vstup povolený"),
      podrobne: "<p>Python píše tieto operátory slovami, nie znakmi <code>&amp;&amp;</code> a <code>||</code> ako JavaScript či C++. Poradie: najprv <code>not</code>, potom <code>and</code>, nakoniec <code>or</code>. Keď si nie si istý, použi zátvorky.</p>" },
    { typ: "volba", otazka: "Čo je <code>True and False</code>?", moznosti: ["False", "True", "None", "chyba"], spravna: 0, vysvetlenie: "and potrebuje obe True." },
    { typ: "volba", otazka: "Kedy platí <code>x &lt; 0 or x &gt; 100</code>?", moznosti: ["Keď je x mimo rozsahu 0 až 100", "Keď je x od 0 do 100", "Nikdy", "Vždy"], spravna: 0, vysvetlenie: "Stačí jedna z podmienok." },
    { typ: "doplnenie", otazka: "Prestupný rok: deliteľný 4 a nie 100, alebo deliteľný 400.", sablona: "if (rok % 4 == 0 [[0]] rok % 100 != 0) [[1]] rok % 400 == 0:", zetony: ["and", "or", "not", "&&", "||"], spravne: ["and", "or"], vysvetlenie: "(a and b) or c" },
    { typ: "kod", zadanie: "Program načíta rok (vstup: <b>2024</b>) a vypíše <b>Prestupný</b> alebo <b>Neprestupný</b>. Rok je prestupný, ak je deliteľný 4 a nie je deliteľný 100, alebo ak je deliteľný 400.",
      karty: ["py"], vstup: "2024", start: { py: "rok = int(input())\n" }, vyska: "170px",
      napoveda: "if (rok % 4 == 0 and rok % 100 != 0) or rok % 400 == 0:", riesenie: { py: 'rok = int(input())\nif (rok % 4 == 0 and rok % 100 != 0) or rok % 400 == 0:\n    print("Prestupný")\nelse:\n    print("Neprestupný")' },
      kontrola: function (v, kod) {
        var t = [["2024", "Prestupný"], ["2023", "Neprestupný"], ["1900", "Neprestupný"], ["2000", "Prestupný"]];
        for (var i = 0; i < t.length; i++) { var o = P.riadky(K.spustiPythonHned(kod, [t[i][0]]).vystup).pop(); if (o !== t[i][1]) return "Rok " + t[i][0] + " je " + t[i][1].toLowerCase() + ", program vypísal: " + o + "."; }
        return null;
      },
      vysvetlenie: "Overené aj na rokoch 1900 a 2000." },
  ] };

  var L5 = { id: "python-3-5", nazov: "Podmienky v praxi", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Vnorené podmienky",
      text: "<p>V bloku if môže byť ďalší if. Každá úroveň je odsadená o ďalšie 4 medzery:</p>" + UKAZ('meno = "admin"\nheslo = "1234"\nif meno == "admin":\n    if heslo == "1234":\n        print("Vitaj")\n    else:\n        print("Zlé heslo")\nelse:\n    print("Neznámy používateľ")', "Vitaj"),
      podrobne: "<p>Hlboké vnorenie je ťažko čitateľné. Často sa dá nahradiť cez <code>and</code> alebo <code>elif</code>.</p>" },
    { typ: "vyklad", nadpis: "Skratky",
      text: "<p>Operátor <code>in</code> zistí, či je hodnota v texte alebo zozname. Krátky if/else sa dá zapísať do jedného riadku:</p>" + UKAZ('odpoved = "ano"\nif odpoved in ("ano", "áno", "a"):\n    print("Súhlas")\n\nvek = 20\nstav = "dospelý" if vek >= 18 else "dieťa"\nprint(stav)', "Súhlas\ndospelý"),
      podrobne: "<p>Prázdny text <code>\"\"</code>, nula <code>0</code>, prázdny zoznam <code>[]</code> a <code>None</code> sa v podmienke správajú ako False. Preto <code>if meno:</code> znamená „ak meno nie je prázdne“.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: 'x = 0\nif x:\n    print("áno")\nelse:\n    print("nie")', moznosti: ["nie", "áno", "0", "chybu"], spravna: 0, vysvetlenie: "0 sa správa ako False." },
    { typ: "kod", zadanie: "Kino: program načíta vek a deň (vstupy: <b>12</b> a <b>streda</b>). Lístok stojí 8 €. Deti do 12 rokov vrátane platia 5 €. V <b>stredu</b> je pre všetkých zľava 2 €. Vypíš <b>Cena: X €</b>.",
      karty: ["py"], vstup: "12\nstreda", start: { py: "vek = int(input())\nden = input()\n" }, vyska: "220px",
      napoveda: "cena = 8, ak vek <= 12: cena = 5; ak den == \"streda\": cena = cena - 2; print(f\"Cena: {cena} €\")", riesenie: { py: 'vek = int(input())\nden = input()\ncena = 8\nif vek <= 12:\n    cena = 5\nif den == "streda":\n    cena = cena - 2\nprint(f"Cena: {cena} €")' },
      kontrola: function (v, kod) {
        var t = [[["12", "streda"], "Cena: 3 €"], [["30", "streda"], "Cena: 6 €"], [["30", "piatok"], "Cena: 8 €"], [["8", "pondelok"], "Cena: 5 €"], [["13", "pondelok"], "Cena: 8 €"]];
        for (var i = 0; i < t.length; i++) { var o = P.riadky(K.spustiPythonHned(kod, t[i][0]).vystup).pop(); if (o !== t[i][1]) return "Pre vek " + t[i][0][0] + " a deň " + t[i][0][1] + " má vyjsť " + t[i][1] + " (vyšlo: " + o + ")."; }
        return null;
      },
      vysvetlenie: "Dve nezávislé podmienky za sebou." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li><code>if</code>, <code>elif</code>, <code>else</code>, dvojbodka a odsadenie.</li><li>Porovnania <code>== != &lt; &gt; &lt;= &gt;=</code>.</li><li><code>and</code>, <code>or</code>, <code>not</code>.</li><li>Vnorené podmienky, <code>in</code> a krátky if v jednom riadku.</li></ul>", tip: "Ďalej cykly: ako zopakovať kód stokrát bez toho, aby si ho stokrát písal." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "python-3-1", otazka: "Čo určuje, ktoré riadky patria do bloku if?", moznosti: ["Odsadenie (4 medzery)", "Zložené zátvorky { }", "Slovo end", "Prázdny riadok"], spravna: 0, vysvetlenie: "V Pythone je odsadenie povinné." },
    { typ: "volba", lekcia: "python-3-1", otazka: "Čo vypíše program?", kod: 'x = 3\nif x > 5:\n    print("veľké")\nprint("hotovo")', moznosti: ["hotovo", "veľké", "veľké a hotovo", "nič"], spravna: 0, vysvetlenie: "Druhý print nie je odsadený, vykoná sa vždy." },
    { typ: "volba", lekcia: "python-3-2", otazka: "Aký je výsledok <code>3 &gt;= 3</code>?", moznosti: ["True", "False", "3", "chyba"], spravna: 0, vysvetlenie: "Väčší alebo rovný." },
    { typ: "volba", lekcia: "python-3-3", otazka: "Čo vypíše program pre <code>body = 80</code>?", kod: 'if body >= 50:\n    print("3")\nelif body >= 75:\n    print("2")\nelse:\n    print("5")', moznosti: ["3", "2", "2 aj 3", "5"], spravna: 0, vysvetlenie: "Zlé poradie podmienok: prvá platí už pri 50." },
    { typ: "volba", lekcia: "python-3-4", otazka: "Ako sa v Pythone píše „a zároveň“?", moznosti: ["<code>and</code>", "<code>&amp;&amp;</code>", "<code>&amp;</code>", "<code>AND</code>"], spravna: 0, vysvetlenie: "Slovo and, malými písmenami." },
    { typ: "volba", lekcia: "python-3-4", otazka: "Čo je <code>not (5 &gt; 3)</code>?", moznosti: ["False", "True", "2", "chyba"], spravna: 0, vysvetlenie: "5 > 3 je True, not z toho spraví False." },
    { typ: "doplnenie", lekcia: "python-3-3", otazka: "Doplň:", sablona: 'if x > 0:\n    print("+")\n[[0]] x < 0:\n    print("-")\n[[1]]:\n    print("0")', zetony: ["elif", "else", "if", "else if", "then"], spravne: ["elif", "else"], vysvetlenie: "if, elif, else." },
    { typ: "volba", lekcia: "python-3-5", otazka: "Čo je <code>\"dospelý\" if 20 &gt;= 18 else \"dieťa\"</code>?", moznosti: ["\"dospelý\"", "\"dieťa\"", "True", "chyba"], spravna: 0, vysvetlenie: "Podmienka platí, vráti prvú hodnotu." },
  ];

  K.registrujModul("python", { cislo: 3, nazov: "Podmienky", popis: "if, elif, else, porovnania, and/or/not a odsadenie blokov.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("python", [
    { kat: "Podmienky", znak: "if / elif / else", nazov: "Rozhodovanie", popis: "Vykoná prvý blok, ktorého podmienka platí.", priklad: 'if x > 0:\n    print("kladné")\nelse:\n    print("iné")' },
    { kat: "Podmienky", znak: "!= < > <= >=", nazov: "Porovnania", popis: "Výsledok je True alebo False." },
    { kat: "Podmienky", znak: "and / or / not", nazov: "Logické operátory", popis: "Obe / aspoň jedna / opak." },
    { kat: "Podmienky", znak: "a if p else b", nazov: "Krátky if", popis: "Výraz: a, ak platí p, inak b." },
  ]);
})();
