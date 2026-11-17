/* Python · Modul 3 · Podmienky
   Vysvetlenia v troch vrstvách: text (Stručne), podrobne a hlbka (Do hĺbky). */
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

  /* ====================== Lekcia 1 ====================== */
  var L1 = { id: "python-3-1", nazov: "if a else", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Program, ktorý sa rozhoduje",
      text: "<p>Doteraz sa vykonali vždy všetky riadky. S <b>podmienkou</b> sa program rozhodne: <b>ak</b> (<code>if</code>) niečo platí, urob jedno, <b>inak</b> (<code>else</code>) urob druhé.</p>" + UKAZ('vek = 15\nif vek >= 18:\n    print("Dospelý")\nelse:\n    print("Dieťa")\nprint("Koniec")', "Dieťa\nKoniec"), obr: OBR_IF,
      podrobne: "<p>Pozrime sa na zápis po častiach:</p>" + P.tabulka(["Časť", "Význam"], [["<code>if</code>", "„ak“, začína podmienku"], ["<code>vek &gt;= 18</code>", "otázka, na ktorú je odpoveď áno (True) alebo nie (False)"], ["<code>:</code>", "dvojbodka: „nasleduje, čo sa má urobiť“"], ["4 medzery", "odsadenie: tieto riadky patria k podmienke"], ["<code>else:</code>", "„inak“, vykoná sa, keď podmienka neplatí"]]) +
        "<p><b>Odsadenie</b> v Pythone nie je ozdoba. Určuje, ktoré riadky patria do <b>bloku</b> podmienky. Riadok <code>print(\"Koniec\")</code> nie je odsadený, preto už k podmienke nepatrí a vykoná sa vždy.</p><p>Editor v aplikácii odsadí riadok sám, keď za dvojbodkou stlačíš Enter. Na lište znakov je aj tlačidlo <b>Tab</b>.</p><p><code>else</code> je nepovinné. Keď chýba a podmienka neplatí, program blok jednoducho preskočí.</p>",
      hlbka: "<p>Iné jazyky označujú bloky zloženými zátvorkami <code>{ }</code> a odsadenie je len pre ľudí. Python sa rozhodol, že odsadenie, ktoré by programátor aj tak písal, bude zároveň pravidlom. Kód je preto vždy prehľadne zarovnaný.</p><p>Odsadenie musí byť v rámci bloku <b>rovnaké</b>. Zmes medzier a tabulátorov alebo raz 4 a raz 3 medzery skončí chybou IndentationError. Dohoda (PEP 8) sú 4 medzery.</p><p>Blok nesmie byť prázdny. Keď ešte nevieš, čo doň napísať, použi príkaz <code>pass</code>, ktorý nerobí nič.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: 'teplota = 25\nif teplota > 20:\n    print("Teplo")\nelse:\n    print("Zima")', moznosti: ["Teplo", "Zima", "Teplo a Zima", "Nič"], spravna: 0, vysvetlenie: "25 > 20 platí, vykoná sa blok if. Blok else sa preskočí." },
    { typ: "volba", otazka: "Čo chýba v tomto kóde?", kod: 'if body > 50\n    print("Vyhral si")', moznosti: ["Dvojbodka za podmienkou", "Zátvorky okolo podmienky", "Slovo then", "Bodkočiarka"], spravna: 0, vysvetlenie: "Za podmienkou musí byť dvojbodka: if body > 50:" },
    { typ: "volba", otazka: "Koľkokrát sa vypíše „Hotovo“?", kod: 'x = 3\nif x > 5:\n    print("Veľké")\nprint("Hotovo")', moznosti: ["Raz", "Ani raz", "Dvakrát", "Závisí od x"], spravna: 0, vysvetlenie: "print(\"Hotovo\") nie je odsadený, takže nepatrí do podmienky a vykoná sa vždy." },
    { typ: "poradie", otazka: "Zoraď program:", riadky: ["cislo = 7", "if cislo % 2 == 0:", '    print("párne")', "else:", '    print("nepárne")'], vysvetlenie: "Najprv premenná, potom if s odsadeným blokom a nakoniec else s blokom." },
    { typ: "kod", zadanie: "Program načíta vek (vstup je pripravený: <b>16</b>). Ak je vek aspoň 18, vypíš <b>Môžeš voliť</b>, inak vypíš <b>Ešte nemôžeš voliť</b>.",
      karty: ["py"], vstup: "16", start: { py: "vek = int(input())\n" }, vyska: "170px",
      napoveda: 'if vek >= 18:\n    print("Môžeš voliť")\nelse:\n    print("Ešte nemôžeš voliť")', riesenie: { py: 'vek = int(input())\nif vek >= 18:\n    print("Môžeš voliť")\nelse:\n    print("Ešte nemôžeš voliť")' },
      kontrola: function (v, kod) {
        if (!/if\s/.test(kod) || !/else\s*:/.test(kod)) return "Použi if aj else.";
        if (posl(v) !== "Ešte nemôžeš voliť") return "Pre vek 16 má program vypísať Ešte nemôžeš voliť.";
        var x = K.spustiPythonHned(kod, ["18"]); return P.riadky(x.vystup).pop() === "Môžeš voliť" ? null : "Pre vek 18 má program vypísať Môžeš voliť (skúsil som to). Pozor na >= .";
      },
      vysvetlenie: "Skús zmeniť vstup na 30 a spustiť. Ten istý program dá inú odpoveď." },
  ] };

  /* ====================== Lekcia 2 ====================== */
  var L2 = { id: "python-3-2", nazov: "Porovnania a True/False", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Porovnávacie operátory",
      text: "<p>Podmienka je väčšinou <b>porovnanie</b>. Jeho výsledkom je vždy <code>True</code> (pravda) alebo <code>False</code> (nepravda).</p>" + P.tabulka(["Operátor", "Význam", "Príklad → výsledok"], [["<code>==</code>", "rovná sa", "5 == 5 → True"], ["<code>!=</code>", "nerovná sa", "5 != 3 → True"], ["<code>&lt;</code> <code>&gt;</code>", "menší, väčší", "2 &lt; 1 → False"], ["<code>&lt;=</code> <code>&gt;=</code>", "menší alebo rovný, väčší alebo rovný", "3 &gt;= 3 → True"]]),
      podrobne: UKAZ('print(10 > 3)\nprint("a" == "A")\nheslo = "tajne"\nprint(heslo == "tajne")', "True\nFalse\nTrue") +
        "<p><b>Najčastejšia chyba:</b> <code>=</code> ukladá do premennej, <code>==</code> porovnáva. <code>if x = 5:</code> skončí chybou SyntaxError.</p><p>Texty sa porovnávajú presne, znak po znaku: „a“ a „A“ sú rôzne. Keď chceš porovnať bez ohľadu na veľkosť písmen, preveď oba na malé: <code>odpoved.lower() == \"ano\"</code>.</p><p>Výsledok porovnania môžeš uložiť do premennej: <code>dospely = vek &gt;= 18</code>. Premenná <code>dospely</code> bude mať hodnotu True alebo False.</p>",
      hlbka: "<p>Python vie porovnania <b>reťaziť</b> ako v matematike: <code>0 &lt;= x &lt;= 10</code> znamená, že x je od 0 do 10. V iných jazykoch treba písať <code>0 &lt;= x and x &lt;= 10</code>.</p><p>Pozor na desatinné čísla: <code>0.1 + 0.2 == 0.3</code> je False, lebo súčet je 0.30000000000000004. Desatinné čísla sa preto porovnávajú s toleranciou: <code>abs(a - b) &lt; 0.0001</code> alebo funkciou <code>math.isclose(a, b)</code>.</p><p>Okrem <code>==</code> existuje aj <code>is</code>, ktoré zisťuje, či sú to <b>ten istý objekt</b> v pamäti. Používa sa takmer výlučne pri <code>x is None</code>.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>print(7 != 7)</code>?", moznosti: ["False", "True", "7", "chybu"], spravna: 0, vysvetlenie: "7 sa rovná 7, takže tvrdenie „nerovná sa“ neplatí: False." },
    { typ: "volba", otazka: "Ktorý zápis porovnáva?", moznosti: ["<code>x == 5</code>", "<code>x = 5</code>", "<code>x := 5</code>", "<code>x === 5</code>"], spravna: 0, vysvetlenie: "Dve rovnítka. Jedno ukladá a tri (===) sú z JavaScriptu." },
    { typ: "kod", zadanie: "Program načíta číslo (vstup: <b>14</b>) a vypíše, či je párne: <b>Párne</b> alebo <b>Nepárne</b>. Tip: číslo je párne, keď <code>cislo % 2 == 0</code>.",
      karty: ["py"], vstup: "14", start: { py: "cislo = int(input())\n" }, vyska: "160px",
      napoveda: 'if cislo % 2 == 0:\n    print("Párne")\nelse:\n    print("Nepárne")', riesenie: { py: 'cislo = int(input())\nif cislo % 2 == 0:\n    print("Párne")\nelse:\n    print("Nepárne")' },
      kontrola: function (v, kod) {
        if (posl(v) !== "Párne") return "Pre 14 má vypísať Párne.";
        return P.riadky(K.spustiPythonHned(kod, ["7"]).vystup).pop() === "Nepárne" ? null : "Pre 7 má vypísať Nepárne.";
      },
      vysvetlenie: "Zvyšok po delení dvoma prezradí párnosť. Overil som aj číslo 7." },
  ] };

  /* ====================== Lekcia 3 ====================== */
  var L3 = { id: "python-3-3", nazov: "elif: viac možností", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Postupné rozhodovanie",
      text: "<p>Keď sú možnosti viac ako dve, použi <code>elif</code> (skratka „else if“, teda „inak ak“). Python podmienky skúša <b>zhora nadol</b> a vykoná <b>len prvú</b>, ktorá platí.</p>" + UKAZ('body = 72\nif body >= 90:\n    znamka = 1\nelif body >= 75:\n    znamka = 2\nelif body >= 50:\n    znamka = 3\nelse:\n    znamka = 5\nprint("Známka:", znamka)', "Známka: 3"),
      podrobne: "<p>Ako Python postupuje pri 72 bodoch:</p><ol><li><code>72 &gt;= 90</code>? Nie, ide ďalej.</li><li><code>72 &gt;= 75</code>? Nie, ide ďalej.</li><li><code>72 &gt;= 50</code>? Áno! Nastaví známku 3 a <b>zvyšok preskočí</b>, aj <code>else</code>.</li></ol><p><b>Poradie je dôležité.</b> Keby bola prvá podmienka <code>body &gt;= 50</code>, aj 95 bodov by dostalo trojku, lebo Python by ďalšie podmienky už nekontroloval. Pri rozsahoch začni od najprísnejšej podmienky.</p><p><code>elif</code> môže byť koľko chceš. <code>else</code> je nepovinné a vždy posledné, zachytí všetko, čo nesplnilo žiadnu podmienku.</p>",
      hlbka: "<p>Rozdiel medzi <code>elif</code> a viacerými samostatnými <code>if</code>: samostatné <code>if</code> sa kontrolujú <b>všetky</b>, takže sa môže vykonať aj viac blokov. <code>elif</code> zaručí, že sa vykoná najviac jeden.</p><p>Keď porovnávaš jednu premennú s mnohými konkrétnymi hodnotami, Python 3.10 ponúka príkaz <code>match</code> (podobný <code>switch</code> v iných jazykoch): <code>match den: case \"sobota\" | \"nedeľa\": …</code>. Často je však prehľadnejší slovník (modul 6).</p>" },
    { typ: "volba", otazka: "Čo vypíše program pre <code>x = 15</code>?", kod: 'if x > 10:\n    print("A")\nelif x > 5:\n    print("B")\nelse:\n    print("C")', moznosti: ["A", "B", "A aj B", "C"], spravna: 0, vysvetlenie: "Prvá pravdivá vetva je A. Hoci platí aj x > 5, elif sa už nekontroluje." },
    { typ: "volba", otazka: "Koľko vetiev <code>elif</code> môžeš mať?", moznosti: ["Koľko chceš", "Najviac jednu", "Najviac tri", "Žiadnu bez else"], spravna: 0, vysvetlenie: "elif môže byť ľubovoľne veľa, else je nepovinné a vždy posledné." },
    { typ: "kod", zadanie: "Program načíta teplotu (vstup: <b>8</b>) a vypíše: pod 0 → <b>Mrzne</b>, 0 až 14 → <b>Chladno</b>, 15 až 24 → <b>Príjemne</b>, 25 a viac → <b>Horúco</b>.",
      karty: ["py"], vstup: "8", start: { py: "t = int(input())\n" }, vyska: "220px",
      napoveda: "Postupuj od najnižšej: if t < 0: … elif t < 15: … elif t < 25: … else: …", riesenie: { py: 't = int(input())\nif t < 0:\n    print("Mrzne")\nelif t < 15:\n    print("Chladno")\nelif t < 25:\n    print("Príjemne")\nelse:\n    print("Horúco")' },
      kontrola: function (v, kod) {
        if (!/elif/.test(kod)) return "Použi elif.";
        var testy = [["-3", "Mrzne"], ["0", "Chladno"], ["8", "Chladno"], ["15", "Príjemne"], ["24", "Príjemne"], ["25", "Horúco"]];
        for (var i = 0; i < testy.length; i++) { var o = P.riadky(K.spustiPythonHned(kod, [testy[i][0]]).vystup).pop(); if (o !== testy[i][1]) return "Pre teplotu " + testy[i][0] + " má vypísať " + testy[i][1] + " (vypísal: " + o + ")."; }
        return null;
      },
      vysvetlenie: "Vyskúšal som 6 teplôt vrátane hraníc 0, 15 a 25 a všetky sedia." },
  ] };

  /* ====================== Lekcia 4 ====================== */
  var L4 = { id: "python-3-4", nazov: "and, or, not", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Spájanie podmienok",
      text: "<p>Niekedy musí platiť viac vecí naraz alebo stačí jedna z nich. Na to sú <b>logické operátory</b>:</p>" + P.tabulka(["Operátor", "Platí, keď…", "Po slovensky"], [["<code>a and b</code>", "platia obe", "a zároveň"], ["<code>a or b</code>", "platí aspoň jedna", "alebo"], ["<code>not a</code>", "a neplatí", "nie"]]),
      podrobne: UKAZ('vek = 16\nma_listok = True\nif vek >= 15 and ma_listok:\n    print("Vstup povolený")\nif vek < 6 or vek > 65:\n    print("Zľava")\nif not ma_listok:\n    print("Kúp si lístok")', "Vstup povolený") +
        "<p>Prvá podmienka platí, lebo platí oboje: vek je aspoň 15 <b>a</b> lístok má. Druhá neplatí, lebo 16 nie je pod 6 ani nad 65. Tretia neplatí, lebo <code>not True</code> je False.</p><p>Celá „tabuľka pravdy“ pre <code>and</code> a <code>or</code>:</p>" + P.tabulka(["a", "b", "a and b", "a or b"], [["True", "True", "True", "True"], ["True", "False", "False", "True"], ["False", "True", "False", "True"], ["False", "False", "False", "False"]]) +
        "<p>Python píše tieto operátory slovami. JavaScript, Java či C++ používajú znaky <code>&amp;&amp;</code>, <code>||</code> a <code>!</code>.</p>",
      hlbka: "<p>Poradie vyhodnotenia: najprv <code>not</code>, potom <code>and</code>, nakoniec <code>or</code>. Výraz <code>a or b and c</code> je teda <code>a or (b and c)</code>. Keď si nie si istý, pridaj zátvorky.</p><p>Python vyhodnocuje <b>skrátene</b>: pri <code>a and b</code> sa <code>b</code> nevyhodnotí, ak je <code>a</code> False. Vďaka tomu je <code>pocet &gt; 0 and sucet / pocet &gt; 2</code> bezpečné aj pre počet 0.</p><p>Zaujímavosť: <code>and</code> a <code>or</code> nevracajú vždy True alebo False, ale jednu z hodnôt. <code>meno or \"Anonym\"</code> vráti meno, ak nie je prázdne, inak „Anonym“.</p>" },
    { typ: "volba", otazka: "Čo je <code>True and False</code>?", moznosti: ["False", "True", "None", "chyba"], spravna: 0, vysvetlenie: "and potrebuje, aby platili obe strany." },
    { typ: "volba", otazka: "Kedy platí <code>x &lt; 0 or x &gt; 100</code>?", moznosti: ["Keď je x mimo rozsahu 0 až 100", "Keď je x od 0 do 100", "Nikdy", "Vždy"], spravna: 0, vysvetlenie: "Stačí, keď platí jedna z podmienok: x je záporné alebo väčšie ako 100." },
    { typ: "doplnenie", otazka: "Prestupný rok: deliteľný 4 a nie 100, alebo deliteľný 400.", sablona: "if (rok % 4 == 0 [[0]] rok % 100 != 0) [[1]] rok % 400 == 0:", zetony: ["and", "or", "not", "&&", "||"], spravne: ["and", "or"], vysvetlenie: "(a and b) or c. Znaky && a || Python nepozná." },
    { typ: "kod", zadanie: "Program načíta rok (vstup: <b>2024</b>) a vypíše <b>Prestupný</b> alebo <b>Neprestupný</b>. Rok je prestupný, ak je deliteľný 4 a nie je deliteľný 100, alebo ak je deliteľný 400.",
      karty: ["py"], vstup: "2024", start: { py: "rok = int(input())\n" }, vyska: "170px",
      napoveda: "if (rok % 4 == 0 and rok % 100 != 0) or rok % 400 == 0:", riesenie: { py: 'rok = int(input())\nif (rok % 4 == 0 and rok % 100 != 0) or rok % 400 == 0:\n    print("Prestupný")\nelse:\n    print("Neprestupný")' },
      kontrola: function (v, kod) {
        var t = [["2024", "Prestupný"], ["2023", "Neprestupný"], ["1900", "Neprestupný"], ["2000", "Prestupný"]];
        for (var i = 0; i < t.length; i++) { var o = P.riadky(K.spustiPythonHned(kod, [t[i][0]]).vystup).pop(); if (o !== t[i][1]) return "Rok " + t[i][0] + " je " + t[i][1].toLowerCase() + ", program vypísal: " + o + "."; }
        return null;
      },
      vysvetlenie: "Overené aj na rokoch 1900 (neprestupný) a 2000 (prestupný)." },
  ] };

  /* ====================== Lekcia 5 ====================== */
  var L5 = { id: "python-3-5", nazov: "Podmienky v praxi", minut: 11, kroky: [
    { typ: "vyklad", nadpis: "Vnorené podmienky",
      text: "<p>Do bloku podmienky môžeš dať ďalšiu podmienku. Každá úroveň je odsadená o ďalšie 4 medzery.</p>" + UKAZ('meno = "admin"\nheslo = "1234"\nif meno == "admin":\n    if heslo == "1234":\n        print("Vitaj")\n    else:\n        print("Zlé heslo")\nelse:\n    print("Neznámy používateľ")', "Vitaj"),
      podrobne: "<p>Ako to čítať: najprv sa overí meno. Až keď je meno správne, overí sa heslo. Vnútorný <code>else</code> patrí k vnútornému <code>if</code> (heslo), vonkajší k vonkajšiemu (meno). Ktorý else patrí ku ktorému if, určuje <b>odsadenie</b>.</p><p>Hlboké vnáranie je ťažko čitateľné. Často sa dá nahradiť cez <code>and</code> alebo <code>elif</code>:</p>" + P.kod('if meno != "admin":\n    print("Neznámy používateľ")\nelif heslo != "1234":\n    print("Zlé heslo")\nelse:\n    print("Vitaj")', "py", "Kód"),
      hlbka: "<p>Dobrá zásada: <b>najprv vybav chyby a výnimky</b>, potom normálny prípad. Kód sa potom nevnára a hlavná cesta programu je jasná. Vo funkciách sa na to používa skorý <code>return</code> (modul 5).</p><p>Heslá sa v skutočných programoch nikdy neporovnávajú ako obyčajný text v kóde. Ukladá sa iba ich <b>odtlačok</b> (hash) a porovnávajú sa odtlačky. Tento príklad je len na precvičenie podmienok.</p>" },
    { typ: "vyklad", nadpis: "Skratky",
      text: "<p>Operátor <code>in</code> zistí, či je hodnota medzi viacerými možnosťami. Krátky if/else sa dá zapísať do jedného riadku:</p>" + UKAZ('odpoved = "ano"\nif odpoved in ("ano", "áno", "a"):\n    print("Súhlas")\n\nvek = 20\nstav = "dospelý" if vek >= 18 else "dieťa"\nprint(stav)', "Súhlas\ndospelý"),
      podrobne: "<p><code>odpoved in (\"ano\", \"áno\", \"a\")</code> je kratší zápis pre <code>odpoved == \"ano\" or odpoved == \"áno\" or odpoved == \"a\"</code>.</p><p>Jednoriadkový zápis <code>X if podmienka else Y</code> sa číta: „X, ak platí podmienka, inak Y“. Hodí sa, keď len vyberáš jednu z dvoch hodnôt. Na zložitejšie rozhodovanie použi klasický if.</p><p><b>Pravdivosť:</b> prázdny text <code>\"\"</code>, nula <code>0</code>, prázdny zoznam <code>[]</code> a <code>None</code> sa v podmienke správajú ako False, všetko ostatné ako True. Preto <code>if meno:</code> znamená „ak meno nie je prázdne“.</p>",
      hlbka: "<p>Jednoriadkový if sa volá <b>podmienený výraz</b> (v iných jazykoch ternárny operátor <code>podmienka ? X : Y</code>). Rozdiel oproti príkazu if: je to <b>výraz</b>, ktorý má hodnotu, preto ho môžeš priradiť alebo vložiť do f-reťazca: <code>f\"{n} {'kus' if n == 1 else 'kusy'}\"</code>.</p><p>Pri <code>in</code> s mnohými hodnotami je rýchlejšia množina <code>{\"ano\", \"áno\", \"a\"}</code> ako n-tica, lebo hľadá pomocou hašovania, nie postupným porovnávaním.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: 'x = 0\nif x:\n    print("áno")\nelse:\n    print("nie")', moznosti: ["nie", "áno", "0", "chybu"], spravna: 0, vysvetlenie: "Nula sa v podmienke správa ako False." },
    { typ: "volba", otazka: "Čo bude v premennej <code>s</code>?", kod: 'body = 40\ns = "prešiel" if body >= 50 else "neprešiel"', moznosti: ["neprešiel", "prešiel", "True", "40"], spravna: 0, vysvetlenie: "40 >= 50 neplatí, preto sa vyberie hodnota za else." },
    { typ: "kod", zadanie: "Kino: program načíta vek a deň (vstupy: <b>12</b> a <b>streda</b>). Lístok stojí 8 €. Deti do 12 rokov vrátane platia 5 €. V <b>stredu</b> je pre všetkých zľava 2 €. Vypíš <b>Cena: X €</b>.",
      karty: ["py"], vstup: "12\nstreda", start: { py: "vek = int(input())\nden = input()\n" }, vyska: "220px",
      napoveda: "cena = 8; ak vek <= 12: cena = 5; ak den == \"streda\": cena = cena - 2; nakoniec print(f\"Cena: {cena} €\")", riesenie: { py: 'vek = int(input())\nden = input()\ncena = 8\nif vek <= 12:\n    cena = 5\nif den == "streda":\n    cena = cena - 2\nprint(f"Cena: {cena} €")' },
      kontrola: function (v, kod) {
        var t = [[["12", "streda"], "Cena: 3 €"], [["30", "streda"], "Cena: 6 €"], [["30", "piatok"], "Cena: 8 €"], [["8", "pondelok"], "Cena: 5 €"], [["13", "pondelok"], "Cena: 8 €"]];
        for (var i = 0; i < t.length; i++) { var o = P.riadky(K.spustiPythonHned(kod, t[i][0]).vystup).pop(); if (o !== t[i][1]) return "Pre vek " + t[i][0][0] + " a deň " + t[i][0][1] + " má vyjsť " + t[i][1] + " (vyšlo: " + o + ")."; }
        return null;
      },
      vysvetlenie: "Dve nezávislé podmienky za sebou: každá upraví cenu a obe sa môžu uplatniť naraz." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<p>Čo už vieš:</p><ul><li><code>if</code>, <code>elif</code>, <code>else</code>, dvojbodka a <b>odsadenie</b> blokov,</li><li><b>porovnania</b> <code>== != &lt; &gt; &lt;= &gt;=</code> a hodnoty True a False,</li><li>spájať podmienky cez <code>and</code>, <code>or</code>, <code>not</code>,</li><li><b>vnorené</b> podmienky, operátor <code>in</code> a jednoriadkový if.</li></ul>",
      tip: "Teraz test modulu. Potom cykly: ako zopakovať kód stokrát bez toho, aby si ho stokrát písal." },
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
