/* Základy programovania · Modul 3 · Stavebné kamene programov
   Ukážky sú v Pythone (najčitateľnejší zápis), pri každom pojme je porovnanie s inými jazykmi. */
(function () {
  var P = K.pom, TXT = P.TXT, MONO = P.MONO, F = "#b45309";
  var UKAZ = function (kod, vystup, jazyk) { return '<div class="kod-obal">' + P.kod(kod, jazyk || "py", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }

  /* Premenná ako škatuľka */
  var OBR_SKATULE = '<svg viewBox="0 0 340 100" role="img" aria-label="Premenné sú ako škatule s menovkami, v ktorých sú uložené hodnoty">' +
    [["meno", "\"Jana\""], ["vek", "15"], ["plnolety", "False"]].map(function (x, i) {
      var X = 10 + i * 112;
      return '<path d="M' + X + " 40l14-14h72l14 14" + '" style="fill:var(--surface-2);stroke:' + F + ';stroke-width:1.5"/><rect x="' + X + '" y="40" width="100" height="44" rx="4" style="fill:var(--surface-2);stroke:' + F + ';stroke-width:1.5"/>' +
        '<text x="' + (X + 50) + '" y="68" text-anchor="middle" font-size="14" font-weight="700" ' + MONO + ' style="fill:var(--text)">' + K.esc(x[1]) + "</text>" +
        '<rect x="' + (X + 18) + '" y="6" width="64" height="18" rx="9" style="fill:' + F + '"/><text x="' + (X + 50) + '" y="19" text-anchor="middle" font-size="11" font-weight="700" ' + MONO + ' fill="#fff">' + x[0] + "</text>";
    }).join("") + "</svg>";

  /* Podmienka: rozhodovanie */
  var OBR_PODMIENKA = '<svg viewBox="0 0 340 120" role="img" aria-label="Podmienka: ak platí, vykoná sa jedna vetva, inak druhá">' +
    '<path d="M170 6l70 30-70 30-70-30z" style="fill:' + F + '"/><text x="170" y="41" text-anchor="middle" font-size="12" font-weight="700" ' + MONO + ' fill="#fff">vek &gt;= 18 ?</text>' +
    '<path d="M100 36H50v38M240 36h50v38" style="fill:none;stroke:var(--muted);stroke-width:2"/><path d="M45 70l5 7 5-7M285 70l5 7 5-7" style="fill:var(--muted)"/>' +
    '<text x="72" y="30" text-anchor="middle" font-size="10" font-weight="700" ' + TXT + ' style="fill:var(--ok)">áno</text><text x="268" y="30" text-anchor="middle" font-size="10" font-weight="700" ' + TXT + ' style="fill:var(--bad)">nie</text>' +
    '<rect x="4" y="80" width="92" height="32" rx="8" style="fill:var(--surface-2);stroke:var(--muted)"/><text x="50" y="100" text-anchor="middle" font-size="11" ' + TXT + ' style="fill:var(--text)">„Môžeš voliť“</text>' +
    '<rect x="244" y="80" width="92" height="32" rx="8" style="fill:var(--surface-2);stroke:var(--muted)"/><text x="290" y="100" text-anchor="middle" font-size="11" ' + TXT + ' style="fill:var(--text)">„Ešte nie“</text></svg>';

  /* Cyklus */
  var OBR_CYKLUS = '<svg viewBox="0 0 340 104" role="img" aria-label="Cyklus opakuje tie isté kroky, kým platí podmienka">' +
    '<rect x="20" y="8" width="130" height="34" rx="8" style="fill:' + F + '"/><text x="85" y="30" text-anchor="middle" font-size="12" font-weight="700" ' + TXT + ' fill="#fff">ešte zostali kolá?</text>' +
    '<rect x="20" y="62" width="130" height="34" rx="8" style="fill:var(--surface-2);stroke:' + F + ';stroke-width:1.5"/><text x="85" y="84" text-anchor="middle" font-size="12" ' + TXT + ' style="fill:var(--text)">urob jedno kolo</text>' +
    '<path d="M85 44v14" style="stroke:var(--muted);stroke-width:2"/><path d="M80 54l5 7 5-7" style="fill:var(--muted)"/><text x="94" y="55" font-size="10" ' + TXT + ' style="fill:var(--ok)">áno</text>' +
    '<path d="M18 79H6V25h10" style="fill:none;stroke:var(--muted);stroke-width:2"/><path d="M12 20l7 5-7 5" style="fill:var(--muted)"/>' +
    '<path d="M152 25h70" style="stroke:var(--muted);stroke-width:2"/><path d="M218 20l7 5-7 5" style="fill:var(--muted)"/><text x="186" y="19" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--bad)">nie</text>' +
    '<rect x="228" y="8" width="104" height="34" rx="8" style="fill:var(--surface-2);stroke:var(--muted)"/><text x="280" y="30" text-anchor="middle" font-size="12" ' + TXT + ' style="fill:var(--text)">pokračuj ďalej</text></svg>';

  /* Funkcia ako stroj */
  var OBR_FUNKCIA = '<svg viewBox="0 0 340 90" role="img" aria-label="Funkcia je ako stroj: dostane vstupy (parametre) a vráti výsledok">' +
    '<text x="40" y="38" text-anchor="middle" font-size="13" ' + MONO + ' style="fill:var(--text)">3</text><text x="40" y="58" text-anchor="middle" font-size="13" ' + MONO + ' style="fill:var(--text)">4</text><text x="40" y="80" text-anchor="middle" font-size="9" ' + TXT + ' style="fill:var(--muted)">argumenty</text>' +
    '<path d="M58 45h44" style="stroke:var(--muted);stroke-width:2"/><path d="M98 40l7 5-7 5" style="fill:var(--muted)"/>' +
    '<rect x="108" y="14" width="124" height="62" rx="12" style="fill:' + F + '"/><text x="170" y="40" text-anchor="middle" font-size="13" font-weight="700" ' + MONO + ' fill="#fff">obsah(a, b)</text><text x="170" y="60" text-anchor="middle" font-size="11" ' + MONO + ' fill="#fff">return a * b</text>' +
    '<path d="M234 45h44" style="stroke:var(--muted);stroke-width:2"/><path d="M274 40l7 5-7 5" style="fill:var(--muted)"/>' +
    '<text x="306" y="50" text-anchor="middle" font-size="16" font-weight="700" ' + MONO + ' style="fill:var(--text)">12</text><text x="306" y="80" text-anchor="middle" font-size="9" ' + TXT + ' style="fill:var(--muted)">výsledok</text></svg>';

  /* Zoznam s indexmi */
  var OBR_ZOZNAM = '<svg viewBox="0 0 340 84" role="img" aria-label="Zoznam má prvky očíslované od nuly">' +
    ["\"jablko\"", "\"hruška\"", "\"slivka\"", "\"čerešňa\""].map(function (x, i) {
      var X = 6 + i * 82;
      return '<rect x="' + X + '" y="10" width="78" height="40" rx="6" style="fill:var(--surface-2);stroke:' + F + ';stroke-width:1.5"/><text x="' + (X + 39) + '" y="35" text-anchor="middle" font-size="11.5" ' + MONO + ' style="fill:var(--text)">' + K.esc(x) + '</text><text x="' + (X + 39) + '" y="70" text-anchor="middle" font-size="12" font-weight="700" ' + MONO + ' style="fill:' + F + '">[' + i + "]</text>";
    }).join("") + "</svg>";

  /* ====================== Lekcia 1 ====================== */
  var L1 = { id: "zaklady-3-1", nazov: "Premenné a hodnoty", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Škatuľka s menovkou",
      text: "<p><b>Premenná</b> je pomenované miesto v pamäti, kam si program odloží hodnotu, aby ju mohol neskôr použiť. Predstav si <b>škatuľku s menovkou</b>: do škatuľky vložíš hodnotu, menovka je meno premennej.</p>", obr: OBR_SKATULE,
      podrobne: UKAZ('meno = "Jana"\nvek = 15\nprint(meno, "má", vek, "rokov")', "Jana má 15 rokov") +
        "<p>Znamienko <code>=</code> v programovaní neznamená „rovná sa“ ako v matematike. Znamená <b>„ulož“</b>: hodnotu sprava ulož do premennej vľavo. Tomu sa hovorí <b>priradenie</b>.</p><p>Prečo premenné? Lebo program často pracuje s hodnotami, ktoré <b>nepozná vopred</b>: meno používateľa, skóre v hre, teplota zo senzora. Premenná je pre ne miesto, ktoré má meno, hoci hodnota sa ešte len zistí.</p>",
      hlbka: "<p>V rôznych jazykoch sa premenná vytvára rôzne:</p>" + P.tabulka(["Jazyk", "Zápis"], [["Python", "<code>vek = 15</code>"], ["JavaScript", "<code>let vek = 15;</code>"], ["Java, C, C++", "<code>int vek = 15;</code>"], ["C#", "<code>int vek = 15;</code> alebo <code>var vek = 15;</code>"], ["Kotlin", "<code>var vek = 15</code>"], ["PHP", "<code>$vek = 15;</code>"]]) +
        "<p>V jazykoch ako Java alebo C sa pri vytvorení uvádza aj <b>typ</b> (<code>int</code> je celé číslo). Kompilátor si potom stráži, aby si do premennej omylom nevložil text. V Pythone typ netreba písať, zistí sa z hodnoty.</p>" },
    { typ: "vyklad", nadpis: "Hodnota sa môže meniť",
      text: "<p>Preto sa to volá <b>premenná</b>: hodnotu v nej môžeš kedykoľvek zmeniť. Stará hodnota sa nahradí novou.</p>" + UKAZ("skore = 0\nskore = skore + 10\nskore = skore + 5\nprint(skore)", "15"),
      podrobne: "<p>Riadok <code>skore = skore + 10</code> v matematike nedáva zmysel, v programe áno. Čítaj ho <b>sprava doľava</b>:</p><ol><li>zober, čo je teraz v <code>skore</code> (0),</li><li>pripočítaj 10 (vyjde 10),</li><li>výsledok ulož späť do <code>skore</code>.</li></ol><p>Tak funguje každé počítadlo: body v hre, počet krokov, počet nesprávnych pokusov. Mnohé jazyky majú aj skratku <code>skore += 10</code>.</p>",
      hlbka: "<p>Niektoré hodnoty sa meniť nemajú, napríklad sadzba DPH. Na ne sa používajú <b>konštanty</b>: v JavaScripte <code>const</code>, v Kotline <code>val</code>, v Jave <code>final</code>. Python konštanty nemá, programátori ich len píšu veľkými písmenami (<code>DPH = 0.23</code>) a dohodnú sa, že ich nemenia.</p><p>Premenná má aj <b>rozsah platnosti</b> (scope): premenná vytvorená vo vnútri funkcie existuje len v nej. Vďaka tomu si dve funkcie neprepíšu navzájom premenné s rovnakým menom.</p>" },
    { typ: "volba", otazka: "Aká bude hodnota <code>x</code> na konci?", kod: "x = 5\nx = x * 2\nx = x - 3", moznosti: ["7", "5", "10", "2"], spravna: 0,
      vysvetlenie: "5 × 2 = 10, potom 10 − 3 = 7. Každý riadok pracuje s hodnotou z predchádzajúceho." },
    { typ: "volba", otazka: "Čo znamená <code>=</code> v riadku <code>body = 100</code>?", moznosti: ["Ulož 100 do premennej body", "Over, či sa body rovnajú 100", "Vypíš 100", "Vymaž premennú body"], spravna: 0,
      vysvetlenie: "Jedno = je priradenie. Na porovnanie sa vo väčšine jazykov používa ==." },
    { typ: "kod", zadanie: "Vytvor premennú <code>body</code> s hodnotou 50, potom k nej pripočítaj 25 a vypíš ju. Výsledok má byť <b>75</b>.",
      karty: ["py"], start: { py: "" }, vyska: "130px",
      napoveda: "Tri riadky: body = 50, potom body = body + 25 a nakoniec print(body).", riesenie: { py: "body = 50\nbody = body + 25\nprint(body)" },
      kontrola: function (v, kod) { if (!/body\s*=/.test(kod)) return "Vytvor premennú s menom body."; return r(v)[0] === "75" ? null : "Výstup má byť 75."; },
      vysvetlenie: "Toto je základ každého počítadla bodov v hre." },
  ] };

  /* ====================== Lekcia 2 ====================== */
  var L2 = { id: "zaklady-3-2", nazov: "Dátové typy", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Druhy hodnôt",
      text: "<p>Hodnoty sú rôzneho <b>typu</b>. Najčastejšie sú:</p>" + P.tabulka(["Typ", "Príklad", "Na čo"], [["celé číslo", "<code>42</code>, <code>-7</code>", "počty, vek, body"], ["desatinné číslo", "<code>3.14</code>", "ceny, merania (s bodkou!)"], ["text (reťazec)", "<code>\"Ahoj\"</code>", "mená, správy, v úvodzovkách"], ["logická hodnota", "<code>True</code>, <code>False</code>", "áno / nie, pravda / nepravda"]]),
      podrobne: "<p>Typ určuje, <b>čo sa s hodnotou dá robiť</b>. Čísla sa dajú sčítať a násobiť. Texty sa dajú spájať, prevádzať na veľké písmená alebo hľadať v nich slová. Logické hodnoty sa používajú pri rozhodovaní.</p>" + UKAZ('print(2 + 3)\nprint("2" + "3")', "5\n23") +
        "<p>Pozor: <code>\"2\"</code> v úvodzovkách je <b>text</b>, nie číslo. Plus pri textoch neznamená sčítanie, ale <b>spojenie</b>. Preto vyšlo 23. Toto je jedna z najčastejších chýb začiatočníkov.</p><p>Desatinné čísla sa v programovaní píšu s <b>bodkou</b>: <code>2.5</code>. Čiarka slúži na oddelenie hodnôt.</p>",
      hlbka: "<p>Text sa v programovaní volá <b>reťazec</b> (string), lebo je to reťaz znakov. Logická hodnota sa volá <b>boolean</b> podľa matematika Georgea Boola. Celé číslo je <b>integer</b> (<code>int</code>), desatinné <b>float</b> alebo <b>double</b>.</p><p>V jazykoch ako C a Java majú čísla <b>pevnú veľkosť</b>. Typ <code>int</code> zaberá 4 bajty a pojme čísla približne do ±2,1 miliardy. Keď ho prekročíš, číslo „pretečie“ a zmení sa na záporné. Python celé čísla zväčšuje podľa potreby, preto sa ti to v ňom nestane.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>print(\"5\" + \"5\")</code>?", moznosti: ["55", "10", "5 5", "chybu"], spravna: 0,
      vysvetlenie: "Obe hodnoty sú v úvodzovkách, teda texty. Plus texty spojí za seba." },
    { typ: "vyklad", nadpis: "Prevod medzi typmi",
      text: "<p>Niekedy treba hodnotu previesť na iný typ. Najčastejšie, keď používateľ zadá číslo: program ho dostane ako <b>text</b> a na počítanie ho treba zmeniť na <b>číslo</b>.</p>" + UKAZ('vek = "15"         # text, napr. zo vstupu\nprint(int(vek) + 1)  # prevod na číslo', "16"),
      podrobne: "<p>Prevodné funkcie v Pythone:</p>" + P.tabulka(["Zápis", "Výsledok"], [["<code>int(\"42\")</code>", "číslo 42"], ["<code>float(\"2.5\")</code>", "desatinné číslo 2.5"], ["<code>str(42)</code>", "text \"42\""], ["<code>int(\"ahoj\")</code>", "chyba, „ahoj“ nie je číslo"]]) +
        "<p>Podobné funkcie má každý jazyk: v JavaScripte <code>Number(\"42\")</code>, v Jave <code>Integer.parseInt(\"42\")</code>.</p>",
      hlbka: "<p>Jazyky sa líšia v tom, ako prísne typy stráži. <b>Python</b> text a číslo sám nespojí: <code>\"Vek: \" + 15</code> skončí chybou TypeError. <b>JavaScript</b> je benevolentný a číslo potichu zmení na text: <code>\"5\" + 1</code> je <code>\"51\"</code>, ale <code>\"5\" - 1</code> je <code>4</code>. Takéto tiché prevody bývajú zdrojom ťažko odhaliteľných chýb.</p><p>Preto vznikol TypeScript, rozšírenie JavaScriptu s pevnými typmi, a preto majú Java, C# či Kotlin <b>statické typy</b>, ktoré skontroluje už kompilátor.</p>" },
    { typ: "doplnenie", otazka: "Priraď typy:", sablona: "\"Bratislava\" je [[0]]. 3.5 je [[1]]. True je [[2]].", zetony: ["text", "desatinné číslo", "logická hodnota", "celé číslo"], spravne: ["text", "desatinné číslo", "logická hodnota"],
      vysvetlenie: "Úvodzovky znamenajú text, bodka desatinné číslo a True je logická hodnota." },
  ] };

  /* ====================== Lekcia 3 ====================== */
  var L3 = { id: "zaklady-3-3", nazov: "Podmienky", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Program sa rozhoduje",
      text: "<p><b>Podmienka</b> umožní programu rozhodnúť sa: <b>ak</b> niečo platí, urob jedno, <b>inak</b> urob druhé. Po anglicky <code>if</code> a <code>else</code>.</p>", obr: OBR_PODMIENKA,
      podrobne: UKAZ('vek = 20\nif vek >= 18:\n    print("Môžeš voliť")\nelse:\n    print("Ešte nie")', "Môžeš voliť") +
        "<p>Ako to čítať: <b>ak</b> je vek väčší alebo rovný 18, vypíš „Môžeš voliť“, <b>inak</b> vypíš „Ešte nie“. Vykoná sa vždy len <b>jedna</b> z dvoch vetiev.</p><p>V Pythone za podmienkou nasleduje <b>dvojbodka</b> a príkazy, ktoré k nej patria, sú <b>odsadené</b> (4 medzery). Iné jazyky namiesto odsadenia používajú zložené zátvorky:</p>" + P.kod('if (vek >= 18) {\n    console.log("Môžeš voliť");\n} else {\n    console.log("Ešte nie");\n}', "js", "JavaScript"),
      hlbka: "<p>Viac možností sa rieši reťazou podmienok: v Pythone <code>elif</code> (skratka „else if“), v iných jazykoch <code>else if</code>. Podmienky sa vyhodnocujú zhora a vykoná sa prvá, ktorá platí.</p><p>Výsledkom porovnania je vždy <b>logická hodnota</b>: <code>vek >= 18</code> je buď True, alebo False. Podmienka sa teda pýta len jedno: je táto hodnota pravdivá?</p><p>Na procesore sa podmienka zmení na <b>podmienený skok</b>: „ak je výsledok porovnania nepravda, preskoč nasledujúce pokyny“. Všetky zložité rozhodnutia programov stoja na tejto jednoduchej inštrukcii.</p>" },
    { typ: "vyklad", nadpis: "Porovnávanie",
      text: P.tabulka(["Zápis", "Význam"], [["<code>==</code>", "rovná sa (dve rovnítka!)"], ["<code>!=</code>", "nerovná sa"], ["<code>&lt;</code>, <code>&gt;</code>", "menšie, väčšie"], ["<code>&lt;=</code>, <code>&gt;=</code>", "menšie alebo rovné, väčšie alebo rovné"]]) + "<p>Pozor: <code>=</code> ukladá, <code>==</code> porovnáva.</p>",
      podrobne: "<p>Podmienky sa dajú spájať:</p><ul><li><code>and</code> (a zároveň): platí, keď platia <b>obe</b> časti. <code>vek >= 6 and vek <= 15</code> je školák.</li><li><code>or</code> (alebo): stačí, keď platí <b>aspoň jedna</b>. <code>den == \"sobota\" or den == \"nedeľa\"</code> je víkend.</li><li><code>not</code> (nie): obráti pravdu na nepravdu.</li></ul><p>V jazykoch C, Java a JavaScript sa píšu ako <code>&amp;&amp;</code>, <code>||</code> a <code>!</code>.</p>",
      hlbka: "<p>Logické spojky sa vyhodnocujú <b>skrátene</b>: pri <code>a and b</code> sa <code>b</code> vôbec nevyhodnotí, ak je <code>a</code> nepravda, lebo výsledok je už jasný. Programátori to využívajú: <code>pocet > 0 and sucet / pocet > 5</code> nikdy nedelí nulou.</p><p>Texty sa porovnávajú podľa abecedy, presnejšie podľa čísel znakov. Preto je <code>\"Z\" &lt; \"a\"</code> pravda (veľké písmená majú menšie čísla) a pri slovenskej diakritike porovnanie nemusí sedieť so slovníkom.</p>" },
    { typ: "volba", otazka: "Čo vypíše program pre <code>teplota = 25</code>?", kod: 'if teplota > 30:\n    print("horúco")\nelse:\n    print("príjemne")', moznosti: ["príjemne", "horúco", "horúco aj príjemne", "nič"], spravna: 0,
      vysvetlenie: "25 nie je viac ako 30, podmienka neplatí, preto sa vykoná vetva else." },
    { typ: "volba", otazka: "Ktorý zápis porovná, či sa <code>x</code> rovná 10?", moznosti: ["<code>x == 10</code>", "<code>x = 10</code>", "<code>x =&gt; 10</code>", "<code>x := 10</code>"], spravna: 0,
      vysvetlenie: "Dve rovnítka porovnávajú. Jedno rovnítko by do x uložilo 10." },
    { typ: "kod", zadanie: "Doplň podmienku: ak je <code>body</code> aspoň 50, program vypíše <b>Prešiel si</b>, inak <b>Skús znova</b>. Body sú nastavené na 72.",
      karty: ["py"], start: { py: 'body = 72\nif ___:\n    print("Prešiel si")\nelse:\n    print("Skús znova")' }, vyska: "150px",
      napoveda: "Namiesto ___ napíš porovnanie body >= 50.", riesenie: { py: 'body = 72\nif body >= 50:\n    print("Prešiel si")\nelse:\n    print("Skús znova")' },
      kontrola: function (v, kod) { if (/___/.test(kod)) return "Nahraď ___ podmienkou."; if (!/body\s*>=?\s*(50|49)/.test(kod)) return "Porovnaj body s 50, napríklad body >= 50."; return r(v)[0] === "Prešiel si" ? null : "Pri 72 bodoch má vyjsť Prešiel si."; },
      vysvetlenie: "Skús zmeniť body na 30 a spusti znova. Vykoná sa druhá vetva." },
  ] };

  /* ====================== Lekcia 4 ====================== */
  var L4 = { id: "zaklady-3-4", nazov: "Cykly", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Opakovanie bez kopírovania",
      text: "<p><b>Cyklus</b> opakuje tie isté príkazy viackrát. Namiesto toho, aby si stokrát napísal ten istý riadok, napíšeš ho raz a povieš, koľkokrát sa má zopakovať.</p>", obr: OBR_CYKLUS,
      podrobne: "<p>Dva hlavné druhy cyklov:</p><ul><li><b>for</b>: opakuj pre každý prvok alebo daný počet krát. Hodí sa, keď vopred vieš, koľkokrát.</li><li><b>while</b>: opakuj, <b>kým</b> platí podmienka. Hodí sa, keď to vopred nevieš, napríklad „pýtaj sa, kým používateľ neuhádne“.</li></ul>" + UKAZ('for i in range(1, 4):\n    print("Kolo", i)\nprint("Hotovo")', "Kolo 1\nKolo 2\nKolo 3\nHotovo") +
        "<p><code>range(1, 4)</code> vytvorí čísla 1, 2, 3. Pozor: posledné číslo (4) sa už nezahrnie. Premenná <code>i</code> má v každom kole inú hodnotu. Riadok „Hotovo“ nie je odsadený, preto sa vykoná až po cykle, len raz.</p>",
      hlbka: "<p>V jazykoch C, Java a JavaScript vyzerá klasický cyklus for takto: <code>for (int i = 1; i &lt; 4; i++) { … }</code>. Má tri časti: začiatok (i = 1), podmienku (i &lt; 4) a krok (i++ zvýši i o 1).</p><p>Každé zopakovanie sa volá <b>iterácia</b>. Príkaz <code>break</code> cyklus predčasne ukončí a <code>continue</code> preskočí na ďalšie kolo.</p><p>Na úrovni procesora je cyklus len podmienený skok späť na začiatok. Preto je ľahké omylom vytvoriť <b>nekonečný cyklus</b>: <code>while True:</code> bez <code>break</code> alebo podmienka, ktorá nikdy neprestane platiť. Program potom „zamrzne“.</p>" },
    { typ: "volba", otazka: "Koľkokrát sa vypíše „Ahoj“?", kod: 'for i in range(5):\n    print("Ahoj")', moznosti: ["5", "4", "6", "1"], spravna: 0,
      vysvetlenie: "range(5) sú čísla 0, 1, 2, 3, 4. To je päť kôl." },
    { typ: "volba", otazka: "Ktorý cyklus je vhodný na „pýtaj sa na heslo, kým nie je správne“?", moznosti: ["while", "for s pevným počtom", "žiadny, stačí podmienka", "dva príkazy print"], spravna: 0,
      vysvetlenie: "Nevieme vopred, koľko pokusov bude. while opakuje, kým platí podmienka (heslo je nesprávne)." },
    { typ: "kod", zadanie: "Pomocou cyklu <code>for</code> vypíš čísla od <b>1 do 5</b>, každé na samostatný riadok.",
      karty: ["py"], start: { py: "for i in range(___):\n    print(i)" }, vyska: "120px",
      napoveda: "range(1, 6) vytvorí čísla 1 až 5. Posledné číslo sa nezahŕňa, preto 6.", riesenie: { py: "for i in range(1, 6):\n    print(i)" },
      kontrola: function (v, kod) { if (!/for\s/.test(kod)) return "Použi cyklus for."; return r(v).join(",") === "1,2,3,4,5" ? null : "Výstup majú byť čísla 1 až 5 pod sebou (teraz: " + r(v).join(", ") + ")."; },
      vysvetlenie: "Skús zmeniť 6 na 101 a cyklus vypíše sto čísel. Kód je stále dva riadky." },
  ] };

  /* ====================== Lekcia 5 ====================== */
  var L5 = { id: "zaklady-3-5", nazov: "Funkcie", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Pomenovaný kus programu",
      text: "<p><b>Funkcia</b> je pomenovaný kus programu, ktorý môžeš použiť znova a znova. Ako stroj: dáš mu vstupy (<b>parametre</b>), on niečo urobí a vráti <b>výsledok</b>.</p>", obr: OBR_FUNKCIA,
      podrobne: UKAZ("def obsah(a, b):\n    return a * b\n\nprint(obsah(3, 4))\nprint(obsah(10, 2))", "12\n20") +
        "<ul><li><code>def</code> (z angl. define) začína definíciu funkcie s menom <code>obsah</code>,</li><li><code>a</code> a <code>b</code> sú <b>parametre</b>: miesta pre hodnoty, ktoré funkcia dostane,</li><li><code>return</code> vráti výsledok,</li><li><code>obsah(3, 4)</code> je <b>volanie</b> funkcie: hodnoty 3 a 4 sa dosadia za a a b.</li></ul><p>Funkciu napíšeš raz a použiješ ju na desiatkach miest. Keď v nej opravíš chybu, opraví sa všade naraz.</p>",
      hlbka: "<p>Už poznáš <b>vstavané funkcie</b>, napríklad <code>print</code> a <code>input</code>. Niekto ich napísal za teba a ty ich len voláš. Väčšina kódu, ktorý programátori používajú, sú funkcie napísané inými ľuďmi, o tom bude lekcia o knižniciach.</p><p>Iné jazyky: JavaScript <code>function obsah(a, b) { return a * b; }</code>, Kotlin <code>fun obsah(a: Int, b: Int) = a * b</code>, Java <code>int obsah(int a, int b) { return a * b; }</code>. Vo väčšine jazykov sa funkcie v triedach volajú <b>metódy</b>.</p><p>Pri volaní si počítač zapamätá, kam sa má vrátiť, na takzvanom <b>zásobníku volaní</b> (call stack). Funkcia môže volať inú funkciu aj samu seba (<b>rekurzia</b>). Keď sa volania nikdy neskončia, zásobník pretečie, odtiaľ názov známeho webu pre programátorov Stack Overflow.</p>" },
    { typ: "vyklad", nadpis: "Prečo funkcie",
      text: "<ul><li><b>Neopakuješ sa</b>: ten istý výpočet napíšeš raz.</li><li><b>Prehľadnosť</b>: veľký program sa rozdelí na malé pomenované časti, napríklad <code>nacitaj_subor</code>, <code>vypocitaj_priemer</code>, <code>uloz_vysledok</code>.</li><li><b>Spolupráca</b>: každý v tíme píše iné funkcie.</li></ul>",
      podrobne: "<p>Pamätáš si „rozdeľ a panuj“ z modulu 1? Funkcie sú presne nástroj na to. Každý krok algoritmu sa stane funkciou s výstižným menom a hlavný program sa potom číta skoro ako slovný popis:</p>" + P.kod("cislo = vyber_nahodne_cislo()\nwhile not uhadol:\n    tip = opytaj_sa_na_tip()\n    uhadol = vyhodnot(tip, cislo)\nvypis_pocet_pokusov()", "py", "Kód") +
        "<p>Dobrá funkcia robí <b>jednu vec</b> a jej meno hovorí, akú. Keď je funkcia dlhšia ako obrazovka, oplatí sa ju rozdeliť.</p>",
      hlbka: "<p>Funkcia, ktorá len vráti výsledok a nič iné nemení (nevypisuje, nemení premenné mimo seba), sa volá <b>čistá funkcia</b>. Je ľahké ju testovať: pre rovnaké vstupy vráti vždy rovnaký výsledok. Na tomto princípe stojí funkcionálne programovanie.</p><p>Rozlišuj <b>vrátiť</b> (return) a <b>vypísať</b> (print). Funkcia s print ukáže hodnotu človeku, ale program s ňou ďalej nepracuje. Funkcia s return odovzdá hodnotu programu, ktorý ju môže uložiť do premennej, ďalej počítať alebo vypísať.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: "def dvojnasobok(x):\n    return x * 2\n\nprint(dvojnasobok(7))", moznosti: ["14", "7", "x * 2", "dvojnasobok(7)"], spravna: 0,
      vysvetlenie: "Za x sa dosadí 7 a funkcia vráti 7 × 2 = 14." },
    { typ: "kod", zadanie: "Doplň funkciu <code>pozdrav</code>, ktorá vráti text <b>Ahoj, </b> a meno. Program potom vypíše <b>Ahoj, Eva</b>.",
      karty: ["py"], start: { py: 'def pozdrav(meno):\n    return ___\n\nprint(pozdrav("Eva"))' }, vyska: "140px",
      napoveda: 'Texty sa spájajú plusom: return "Ahoj, " + meno', riesenie: { py: 'def pozdrav(meno):\n    return "Ahoj, " + meno\n\nprint(pozdrav("Eva"))' },
      kontrola: function (v, kod) { if (/___/.test(kod)) return "Nahraď ___ výrazom, ktorý vráti pozdrav."; return r(v)[0] === "Ahoj, Eva" ? null : "Výstup má byť Ahoj, Eva (nezabudni na čiarku a medzeru)."; },
      vysvetlenie: "Skús pridať ďalší riadok print(pozdrav(\"Tomáš\")). Funkcia funguje pre akékoľvek meno." },
  ] };

  /* ====================== Lekcia 6 ====================== */
  var L6 = { id: "zaklady-3-6", nazov: "Zoznamy a slovníky", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Veľa hodnôt pod jedným menom",
      text: "<p>Čo ak potrebuješ uložiť známky celej triedy? Na to je <b>zoznam</b> (v iných jazykoch <b>pole</b>, anglicky list alebo array): jedna premenná, v ktorej je veľa hodnôt za sebou.</p>", obr: OBR_ZOZNAM,
      podrobne: UKAZ('ovocie = ["jablko", "hruška", "slivka"]\nprint(ovocie[0])\nprint(len(ovocie))\novocie.append("čerešňa")\nfor kus in ovocie:\n    print("Mám", kus)', "jablko\n3\nMám jablko\nMám hruška\nMám slivka\nMám čerešňa") +
        "<ul><li>Prvky sú v hranatých zátvorkách, oddelené čiarkami.</li><li>K prvku sa dostaneš cez <b>index</b> (poradové číslo) v hranatých zátvorkách.</li><li><b>Pozor: indexy sa počítajú od nuly.</b> Prvý prvok je <code>[0]</code>, druhý <code>[1]</code>.</li><li>Zoznamy a cykly patria k sebe: <code>for kus in ovocie</code> prejde všetky prvky po jednom.</li></ul>",
      hlbka: "<p>Prečo od nuly? Index znamená, <b>o koľko miest</b> od začiatku sa treba posunúť. Prvý prvok je na začiatku, posun je 0. V pamäti ležia prvky poľa tesne za sebou, takže počítač adresu prvku vypočíta jednoducho: začiatok + index × veľkosť prvku. Preto je prístup k prvku cez index bleskový, nech je pole akokoľvek dlhé.</p><p>Index mimo rozsahu je častá chyba: pole s 3 prvkami nemá prvok <code>[3]</code>. Python ohlási IndexError, Java ArrayIndexOutOfBoundsException a jazyk C to neohlási vôbec a prečíta, čo náhodou leží v pamäti za poľom. To je zdroj mnohých bezpečnostných dier.</p>" },
    { typ: "vyklad", nadpis: "Slovník: hodnoty podľa mena",
      text: "<p><b>Slovník</b> (dictionary, v iných jazykoch mapa alebo objekt) ukladá dvojice <b>kľúč a hodnota</b>. Hodnotu nehľadáš podľa poradia, ale podľa mena.</p>" + UKAZ('ziak = {"meno": "Jana", "vek": 15, "trieda": "9.A"}\nprint(ziak["meno"])\nprint(ziak["trieda"])', "Jana\n9.A"),
      podrobne: "<p>Ako skutočný slovník: heslo (kľúč) a jeho význam (hodnota). Zoznam sa hodí, keď záleží na poradí (rebríček, fronta). Slovník, keď chceš rýchlo nájsť údaj podľa mena (kontakty, nastavenia, údaje o jednej osobe).</p><p>Zoznamy a slovníky sa dajú kombinovať. Zoznam slovníkov je napríklad celá trieda žiakov. Takto vyzerajú údaje, ktoré si posielajú aplikácie cez internet, o tom bude reč v module 4.</p>",
      hlbka: "<p>Zoznamy, slovníky a ďalšie spôsoby usporiadania údajov sa nazývajú <b>dátové štruktúry</b>. Ďalšie známe sú <b>množina</b> (každá hodnota najviac raz), <b>zásobník</b> (posledný dnu, prvý von), <b>fronta</b> (prvý dnu, prvý von), <b>strom</b> a <b>graf</b> (napríklad mapa ciest v navigácii).</p><p>Slovník je vnútri <b>hašovacia tabuľka</b>: z kľúča sa vypočíta číslo, ktoré priamo určí miesto v pamäti. Preto nájde hodnotu takmer okamžite aj medzi miliónom kľúčov, kým v zozname by bolo treba prechádzať prvky po jednom. Výber správnej dátovej štruktúry býva dôležitejší než rýchly procesor.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: 'farby = ["červená", "zelená", "modrá"]\nprint(farby[1])', moznosti: ["zelená", "červená", "modrá", "chybu"], spravna: 0,
      vysvetlenie: "Indexy začínajú od 0: [0] je červená, [1] je zelená." },
    { typ: "volba", otazka: "Kde sa viac hodí slovník ako zoznam?", moznosti: ["Telefónny zoznam: meno → číslo", "Poradie pretekárov v cieli", "Fronta v obchode", "Body v jednotlivých kolách hry"], spravna: 0,
      vysvetlenie: "Číslo hľadáš podľa mena, teda podľa kľúča. V ostatných prípadoch záleží na poradí." },
    { typ: "kod", zadanie: "Zoznam <code>znamky</code> obsahuje známky. Vypočítaj a vypíš ich <b>súčet</b>: prejdi zoznam cyklom a pripočítavaj každú známku do premennej <code>sucet</code>. Výsledok má byť <b>11</b>.",
      karty: ["py"], start: { py: "znamky = [1, 3, 2, 4, 1]\nsucet = 0\nfor z in znamky:\n    ___\nprint(sucet)" }, vyska: "150px",
      napoveda: "V cykle pripočítaj aktuálnu známku: sucet = sucet + z", riesenie: { py: "znamky = [1, 3, 2, 4, 1]\nsucet = 0\nfor z in znamky:\n    sucet = sucet + z\nprint(sucet)" },
      kontrola: function (v, kod) { if (/___/.test(kod)) return "Nahraď ___ príkazom, ktorý pripočíta z k súčtu."; if (/print\(\s*11\s*\)/.test(kod)) return "Výsledok má vypočítať program, nie napísať ty."; return r(v)[0] === "11" ? null : "Súčet má byť 11 (teraz: " + r(v)[0] + ")."; },
      vysvetlenie: "Premenná, zoznam, cyklus a výpočet v jednom. Takto sa počíta súčet, priemer aj maximum." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<p>Poznáš stavebné kamene, z ktorých sú poskladané všetky programy na svete:</p><ul><li><b>premenné</b> a <b>priradenie</b>,</li><li><b>dátové typy</b>: čísla, text, logické hodnoty, a ich prevody,</li><li><b>podmienky</b> a porovnávanie,</li><li><b>cykly</b> for a while,</li><li><b>funkcie</b> s parametrami a návratovou hodnotou,</li><li><b>zoznamy</b> (polia) a <b>slovníky</b>.</li></ul><p>V každom jazykovom kurze sa naučíš presný zápis týchto vecí v danom jazyku.</p>",
      tip: "Po teste ťa čaká posledný modul: knižnice, súbory, Git, web a ako vyzerá práca programátora." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "zaklady-3-1", otazka: "Čo je premenná?", moznosti: ["Pomenované miesto na hodnotu", "Chyba v programe", "Druh cyklu", "Súbor na disku"], spravna: 0, vysvetlenie: "Premenná je škatuľka s menovkou." },
    { typ: "volba", lekcia: "zaklady-3-1", otazka: "Aká je hodnota <code>a</code>?", kod: "a = 2\na = a + 3\na = a * 2", moznosti: ["10", "7", "5", "8"], spravna: 0, vysvetlenie: "2 + 3 = 5, potom 5 × 2 = 10." },
    { typ: "volba", lekcia: "zaklady-3-2", otazka: "Aký typ je <code>\"42\"</code>?", moznosti: ["text", "celé číslo", "desatinné číslo", "logická hodnota"], spravna: 0, vysvetlenie: "Je v úvodzovkách, je to teda text." },
    { typ: "volba", lekcia: "zaklady-3-3", otazka: "Čo znamená <code>!=</code>?", moznosti: ["nerovná sa", "rovná sa", "priradenie", "väčšie"], spravna: 0, vysvetlenie: "!= znamená nerovná sa." },
    { typ: "volba", lekcia: "zaklady-3-3", otazka: "Kedy platí <code>a and b</code>?", moznosti: ["Keď platia obe", "Keď platí aspoň jedna", "Nikdy", "Keď neplatí ani jedna"], spravna: 0, vysvetlenie: "and = a zároveň, musia platiť obe časti." },
    { typ: "volba", lekcia: "zaklady-3-4", otazka: "Na čo slúži cyklus?", moznosti: ["Opakuje príkazy", "Rozhoduje medzi dvoma vetvami", "Ukladá hodnotu", "Vypína program"], spravna: 0, vysvetlenie: "Cyklus opakuje príkazy daný počet krát alebo kým platí podmienka." },
    { typ: "volba", lekcia: "zaklady-3-5", otazka: "Čo urobí <code>return</code> vo funkcii?", moznosti: ["Vráti výsledok tomu, kto funkciu zavolal", "Vypíše text na obrazovku", "Spustí funkciu znova", "Vymaže funkciu"], spravna: 0, vysvetlenie: "return odovzdá hodnotu programu. Vypisuje print." },
    { typ: "volba", lekcia: "zaklady-3-6", otazka: "Aký index má prvý prvok zoznamu?", moznosti: ["0", "1", "-1", "závisí od zoznamu"], spravna: 0, vysvetlenie: "Vo väčšine jazykov sa indexy počítajú od nuly." },
    { typ: "volba", lekcia: "zaklady-3-6", otazka: "Čo ukladá slovník?", moznosti: ["Dvojice kľúč a hodnota", "Len čísla", "Iba jednu hodnotu", "Príkazy programu"], spravna: 0, vysvetlenie: "Slovník hľadá hodnotu podľa kľúča, napríklad meno → telefónne číslo." },
  ];

  K.registrujModul("zaklady", { cislo: 3, nazov: "Stavebné kamene programov", popis: "Premenné, dátové typy, podmienky, cykly, funkcie, zoznamy a slovníky.", lekcie: [L1, L2, L3, L4, L5, L6], test: { otazky: TEST, potrebne: 70 } });
})();
