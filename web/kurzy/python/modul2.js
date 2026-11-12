/* Python · Modul 2 · Premenné a čísla */
(function () {
  var P = K.pom, PY = function (t) { return P.kod(t, "py"); }, TXT = P.TXT, MONO = P.MONO;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "py", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }

  var OBR_STITOK = '<svg viewBox="0 0 340 110" role="img" aria-label="Premenná v Pythone je menovka, ktorá ukazuje na hodnotu">' +
    '<rect x="200" y="30" width="110" height="50" rx="10" style="fill:var(--surface-2);stroke:#3572a5;stroke-width:2"/><text x="255" y="61" text-anchor="middle" font-size="16" font-weight="700" ' + MONO + ' style="fill:var(--hl-str)">"Jana"</text>' +
    '<rect x="20" y="40" width="90" height="30" rx="15" style="fill:#3572a5"/><text x="65" y="60" text-anchor="middle" font-size="13" font-weight="700" ' + MONO + ' fill="#fff">meno</text>' +
    '<path d="M112 55h80" style="stroke:var(--muted);stroke-width:2"/><path d="M186 49l8 6-8 6" style="fill:var(--muted)"/>' +
    '<text x="170" y="100" text-anchor="middle" font-size="11" ' + MONO + ' style="fill:var(--text)">meno = "Jana"</text></svg>';

  var L1 = { id: "python-2-1", nazov: "Premenné", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Meno pre hodnotu",
      text: "<p><b>Premenná</b> je meno, pod ktorým si program zapamätá hodnotu. Vytvoríš ju jednoducho priradením cez <code>=</code>. Žiadne <code>let</code> ani typ netreba:</p>", obr: OBR_STITOK,
      podrobne: UKAZ('meno = "Jana"\nvek = 15\nprint(meno, "má", vek)\nvek = vek + 1\nprint("O rok:", vek)', "Jana má 15\nO rok: 16") + "<p>Riadok <code>vek = vek + 1</code> čítaj sprava: vezmi starý vek, pripočítaj 1 a výsledok ulož späť do vek. Skrátene: <code>vek += 1</code>.</p>" },
    { typ: "vyklad", nadpis: "Ako pomenovať premennú",
      text: "<ul><li>Malé písmená, slová spojené podčiarkovníkom: <code>pocet_ziakov</code> (štýl <b>snake_case</b>).</li><li>Písmená, číslice a <code>_</code>. Nesmie začínať číslicou.</li><li>Nepoužívaj diakritiku a slová ako <code>print</code>, <code>if</code>, <code>for</code>.</li><li>Rozlišujú sa veľké a malé písmená.</li></ul>",
      podrobne: "<p>Konštanty (hodnoty, ktoré sa nemenia) sa podľa zvyku píšu veľkými: <code>DPH = 0.23</code>. Python ich zmene nezabráni, je to len dohoda medzi programátormi.</p>" },
    { typ: "volba", otazka: "Ktoré meno premennej je v Pythone najvhodnejšie?", moznosti: ["<code>celkova_cena</code>", "<code>CelkovaCena</code>", "<code>celková cena</code>", "<code>1cena</code>"], spravna: 0, vysvetlenie: "snake_case bez diakritiky." },
    { typ: "volba", otazka: "Aká bude hodnota <code>x</code>?", kod: "x = 3\nx = x * 2\nx += 1", moznosti: ["7", "6", "3", "4"], spravna: 0, vysvetlenie: "3 × 2 = 6, plus 1 = 7." },
    { typ: "kod", zadanie: "Vytvor premenné <code>cena</code> = 12 a <code>kusov</code> = 4. Do premennej <code>spolu</code> ulož ich súčin a vypíš <b>Spolu: 48</b>.",
      karty: ["py"], start: { py: "" }, vyska: "150px",
      napoveda: 'cena = 12, kusov = 4, spolu = cena * kusov, print("Spolu:", spolu)', riesenie: { py: 'cena = 12\nkusov = 4\nspolu = cena * kusov\nprint("Spolu:", spolu)' },
      kontrola: function (v, kod) { if (!/spolu\s*=/.test(kod)) return "Vytvor premennú spolu."; return r(v)[0] === "Spolu: 48" ? null : "Výstup má byť Spolu: 48."; },
      vysvetlenie: "Premenné robia výpočty čitateľné." },
  ] };

  var L2 = { id: "python-2-2", nazov: "Dátové typy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Druhy hodnôt",
      text: P.tabulka(["Typ", "Príklad", "Význam"], [["<code>int</code>", "<code>42</code>, <code>-7</code>", "celé číslo"], ["<code>float</code>", "<code>3.14</code>, <code>2.0</code>", "desatinné číslo (bodka!)"], ["<code>str</code>", "<code>\"Ahoj\"</code>", "text (string)"], ["<code>bool</code>", "<code>True</code>, <code>False</code>", "pravda / nepravda (veľké T a F)"], ["<code>None</code>", "<code>None</code>", "žiadna hodnota"]]) +
        UKAZ('print(type(42))\nprint(type(3.5))\nprint(type("42"))\nprint(type(True))', "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>"),
      podrobne: "<p>Python si typ určí sám podľa hodnoty. Funkcia <code>type()</code> ti ho prezradí. Neskôr spoznáš aj zložené typy: <code>list</code> (zoznam), <code>dict</code> (slovník).</p>" },
    { typ: "volba", otazka: "Aký typ je <code>\"3.14\"</code>?", moznosti: ["str", "float", "int", "bool"], spravna: 0, vysvetlenie: "Úvodzovky = text." },
    { typ: "volba", otazka: "Ako sa v Pythone píše pravda?", moznosti: ["<code>True</code>", "<code>true</code>", "<code>TRUE</code>", "<code>1==1 je jediná možnosť</code>"], spravna: 0, vysvetlenie: "S veľkým T. true by bolo neznáme meno." },
    { typ: "vyklad", nadpis: "Text a číslo sa nesčítajú",
      text: UKAZ('vek = 15\nprint("Mám " + vek + " rokov")', "TypeError: can only concatenate str (not \"int\") to str") + "<p>Python je prísnejší ako JavaScript: text a číslo nespojí sám. Riešenia: <code>print(\"Mám\", vek, \"rokov\")</code>, <code>\"Mám \" + str(vek)</code>, alebo f-reťazec (o dve lekcie).</p>",
      podrobne: "<p>Táto prísnosť je výhoda: chyba sa ukáže hneď, nie až keď niekde vznikne „155“ namiesto 20.</p>" },
    { typ: "kod", zadanie: "Oprav program, aby vypísal <b>Mám 15 rokov</b>. Použi <code>str()</code>.",
      karty: ["py"], start: { py: 'vek = 15\nprint("Mám " + vek + " rokov")' }, vyska: "120px",
      napoveda: 'print("Mám " + str(vek) + " rokov")', riesenie: { py: 'vek = 15\nprint("Mám " + str(vek) + " rokov")' },
      kontrola: function (v, kod) { if (!/str\(/.test(kod)) return "Použi str(vek)."; return r(v)[0] === "Mám 15 rokov" ? null : "Výstup má byť Mám 15 rokov."; },
      vysvetlenie: "str() premenilo číslo na text." },
  ] };

  var L3 = { id: "python-2-3", nazov: "Prevody typov", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "int(), float(), str()",
      text: P.tabulka(["Zápis", "Výsledok"], [["<code>int(\"42\")</code>", "42 (text na celé číslo)"], ["<code>float(\"2.5\")</code>", "2.5"], ["<code>str(10)</code>", "\"10\""], ["<code>int(3.99)</code>", "3 (odreže desatinnú časť)"], ["<code>round(3.567, 2)</code>", "3.57 (zaokrúhli)"]]),
      podrobne: "<p><code>int(\"abc\")</code> skončí chybou ValueError, lebo „abc“ nie je číslo.</p>" },
    { typ: "vyklad", nadpis: "Čísla z input()",
      text: "<p>Keďže <code>input()</code> vždy vráti text, čísla treba previesť:</p>" + UKAZ('a = int(input("Prvé číslo: "))\nb = int(input("Druhé číslo: "))\nprint("Súčet:", a + b)', "Prvé číslo: 7\nDruhé číslo: 5\nSúčet: 12"),
      podrobne: "<p>Bez <code>int()</code> by vyšlo „75“ (spojenie textov). Pri desatinných číslach použi <code>float()</code>.</p>" },
    { typ: "volba", otazka: "Čo vypíše program pri vstupe 3 a 4?", kod: 'a = input()\nb = input()\nprint(a + b)', moznosti: ["34", "7", "chybu", "3 4"], spravna: 0, vysvetlenie: "Bez int() sú to texty a + ich spojí." },
    { typ: "doplnenie", otazka: "Načítaj desatinné číslo:", sablona: 'vyska = [[0]]([[1]]("Výška v m: "))', zetony: ["float", "input", "int", "str", "print"], spravne: ["float", "input"], vysvetlenie: "float(input(…))" },
    { typ: "kod", zadanie: "Program načíta dve celé čísla (vstup je pripravený: <b>7</b> a <b>5</b>) a vypíše ich súčin vo tvare <b>7 * 5 = 35</b>.",
      karty: ["py"], vstup: "7\n5", start: { py: "a = input()\nb = input()\n" }, vyska: "150px",
      napoveda: 'a = int(input()), b = int(input()), print(a, "*", b, "=", a * b)', riesenie: { py: 'a = int(input())\nb = int(input())\nprint(a, "*", b, "=", a * b)' },
      kontrola: function (v) { var l = r(v); return l[l.length - 1] === "7 * 5 = 35" ? null : "Posledný riadok má byť 7 * 5 = 35 (teraz: " + l[l.length - 1] + ")."; },
      vysvetlenie: "Skús zmeniť vstupy a spustiť znova." },
  ] };

  var L4 = { id: "python-2-4", nazov: "f-reťazce", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Hodnoty priamo v texte",
      text: "<p>Pred úvodzovky napíš <code>f</code> a premenné vkladaj do <code>{ }</code>. Je to najpohodlnejší spôsob, ako skladať text:</p>" + UKAZ('meno = "Jana"\nvek = 15\nprint(f"{meno} má {vek} rokov, o rok {vek + 1}.")', "Jana má 15 rokov, o rok 16."),
      podrobne: "<p>Vnútri <code>{ }</code> môže byť ľubovoľný výraz: výpočet, volanie funkcie, aj podmienka.</p>" },
    { typ: "vyklad", nadpis: "Formátovanie čísel",
      text: P.tabulka(["Zápis", "Výsledok pre x = 3.14159"], [["<code>f\"{x:.2f}\"</code>", "3.14 (2 desatinné miesta)"], ["<code>f\"{x:.0f}\"</code>", "3"], ["<code>f\"{1234567:,}\"</code>", "1,234,567"], ["<code>f\"{0.25:.0%}\"</code>", "25%"], ["<code>f\"{7:3}\"</code>", "„  7“ (šírka 3)"]]),
      podrobne: "<p>Na peniaze sa používa <code>:.2f</code>. Zarovnanie do stĺpcov: <code>:&lt;10</code> vľavo, <code>:&gt;10</code> vpravo na šírku 10.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>print(f\"{2.5 * 2:.1f}\")</code>?", moznosti: ["5.0", "5", "2.5 * 2", "5.00"], spravna: 0, vysvetlenie: "Výpočet a jedno desatinné miesto." },
    { typ: "kod", zadanie: "Vypočítaj cenu s DPH 23 % pre <code>cena = 19.99</code> a vypíš ju pomocou f-reťazca s dvoma desatinnými miestami: <b>S DPH: 24.59 €</b>.",
      karty: ["py"], start: { py: "cena = 19.99\n" }, vyska: "140px",
      napoveda: 'print(f"S DPH: {cena * 1.23:.2f} €")', riesenie: { py: 'cena = 19.99\nprint(f"S DPH: {cena * 1.23:.2f} €")' },
      kontrola: function (v, kod) { if (!/f["']/.test(kod)) return "Použi f-reťazec (f\"…\")."; return r(v)[0] === "S DPH: 24.59 €" ? null : "Výstup má byť S DPH: 24.59 €"; },
      vysvetlenie: "Zaokrúhlenie aj text v jednom." },
  ] };

  var L5 = { id: "python-2-5", nazov: "Práca s textom", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Metódy textu",
      text: P.tabulka(["Zápis", "Výsledok pre t = \"Ahoj svet\""], [["<code>len(t)</code>", "9"], ["<code>t.upper()</code>", "\"AHOJ SVET\""], ["<code>t.lower()</code>", "\"ahoj svet\""], ["<code>t.replace(\"svet\", \"Python\")</code>", "\"Ahoj Python\""], ["<code>t.count(\"o\")</code>", "1"], ["<code>\"svet\" in t</code>", "True"], ["<code>t.split()</code>", "[\"Ahoj\", \"svet\"]"], ["<code>t.strip()</code>", "bez medzier na krajoch"]]),
      podrobne: "<p><code>len()</code> je funkcia, ostatné sú metódy volané cez bodku. Text sa nemení, metódy vracajú nový.</p>" },
    { typ: "vyklad", nadpis: "Indexy a výrezy",
      text: UKAZ('t = "Python"\nprint(t[0])\nprint(t[-1])\nprint(t[0:3])\nprint(t[::-1])', "P\nn\nPyt\nnohtyP"),
      podrobne: "<ul><li>Index od 0. Záporný index počíta od konca: <code>-1</code> je posledný znak.</li><li><code>t[a:b]</code> = výrez od a po b (bez b).</li><li><code>t[::-1]</code> = celý text odzadu.</li></ul>" },
    { typ: "volba", otazka: "Čo je <code>\"Slovensko\"[0:4]</code>?", moznosti: ["\"Slov\"", "\"Slove\"", "\"lov\"", "\"S\""], spravna: 0, vysvetlenie: "Znaky 0, 1, 2, 3." },
    { typ: "volba", otazka: "Ako zistíš, či text obsahuje slovo „mačka“?", moznosti: ["<code>\"mačka\" in text</code>", "<code>text.has(\"mačka\")</code>", "<code>text.includes(\"mačka\")</code>", "<code>contains(text)</code>"], spravna: 0, vysvetlenie: "Operátor in. includes je z JavaScriptu." },
    { typ: "kod", zadanie: "Program načíta vetu (vstup je pripravený) a vypíše: počet znakov, vetu veľkými písmenami a vetu odzadu, každé na samostatnom riadku.",
      karty: ["py"], vstup: "Python je super", start: { py: "veta = input()\n" }, vyska: "150px",
      napoveda: "print(len(veta)), print(veta.upper()), print(veta[::-1])", riesenie: { py: "veta = input()\nprint(len(veta))\nprint(veta.upper())\nprint(veta[::-1])" },
      kontrola: function (v) { var l = r(v).slice(-3); return l[0] === "15" && l[1] === "PYTHON JE SUPER" && l[2] === "repus ej nohtyP" ? null : "Očakávaný výstup: 15, PYTHON JE SUPER, repus ej nohtyP."; },
      vysvetlenie: "Tri metódy, tri riadky." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li>Premenné a snake_case.</li><li>Typy int, float, str, bool, None a <code>type()</code>.</li><li>Prevody <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>round()</code>.</li><li>f-reťazce a formátovanie <code>:.2f</code>.</li><li>Metódy textu, indexy a výrezy.</li></ul>", tip: "Teraz test. Ďalšie moduly Pythonu (podmienky, cykly, funkcie, zoznamy) pripravujeme." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "python-2-1", otazka: "Ako vytvoríš premennú s hodnotou 10?", moznosti: ["<code>x = 10</code>", "<code>let x = 10</code>", "<code>int x = 10;</code>", "<code>x := 10</code> je jediná možnosť"], spravna: 0, vysvetlenie: "V Pythone stačí priradenie." },
    { typ: "volba", lekcia: "python-2-2", otazka: "Čo vypíše <code>print(type(7.0))</code>?", moznosti: ["&lt;class 'float'&gt;", "&lt;class 'int'&gt;", "7.0", "&lt;class 'str'&gt;"], spravna: 0, vysvetlenie: "7.0 je desatinné číslo." },
    { typ: "volba", lekcia: "python-2-2", otazka: "Čo spraví <code>\"Vek: \" + 15</code>?", moznosti: ["TypeError", "Vek: 15", "Vek: 15.0", "15"], spravna: 0, vysvetlenie: "Text a číslo sa nesčítajú." },
    { typ: "volba", lekcia: "python-2-3", otazka: "Čo vráti <code>int(\"8\") + 2</code>?", moznosti: ["10", "82", "chybu", "\"10\""], spravna: 0, vysvetlenie: "int premení text na číslo." },
    { typ: "volba", lekcia: "python-2-3", otazka: "Čo vráti <code>round(2.678, 1)</code>?", moznosti: ["2.7", "2.6", "3", "2.68"], spravna: 0, vysvetlenie: "Na jedno desatinné miesto." },
    { typ: "doplnenie", lekcia: "python-2-4", otazka: "Vypíš cenu na 2 desatinné miesta:", sablona: 'print([[0]]"{cena[[1]]}")', zetony: ["f", ":.2f", "%", ".2", "r"], spravne: ["f", ":.2f"], vysvetlenie: "f\"{cena:.2f}\"" },
    { typ: "volba", lekcia: "python-2-5", otazka: "Čo je <code>\"Python\"[-2]</code>?", moznosti: ["\"o\"", "\"n\"", "\"h\"", "chyba"], spravna: 0, vysvetlenie: "-1 je n, -2 je o." },
    { typ: "volba", lekcia: "python-2-5", otazka: "Ako zistíš dĺžku textu <code>t</code>?", moznosti: ["<code>len(t)</code>", "<code>t.length</code>", "<code>t.len()</code>", "<code>size(t)</code>"], spravna: 0, vysvetlenie: "len() je zabudovaná funkcia." },
  ];

  K.registrujModul("python", { cislo: 2, nazov: "Premenné a čísla", popis: "Premenné, dátové typy, prevody, f-reťazce a práca s textom.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("python", [
    { kat: "Znaky", znak: "#", nazov: "Komentár", popis: "Všetko za # do konca riadku Python ignoruje." },
    { kat: "Znaky", znak: "=", nazov: "Priradenie", popis: "Uloží hodnotu do premennej.", priklad: "vek = 15" },
    { kat: "Znaky", znak: "==", nazov: "Rovná sa", popis: "Porovnanie, vráti True alebo False." },
    { kat: "Znaky", znak: ":", nazov: "Dvojbodka", popis: "Na konci riadku s if, for, while, def. Za ňou nasleduje odsadený blok." },
    { kat: "Znaky", znak: "␣␣␣␣", nazov: "Odsadenie", popis: "4 medzery určujú, čo patrí do bloku. V Pythone je povinné." },
    { kat: "Znaky", znak: "\" \" / ' '", nazov: "Úvodzovky", popis: "Ohraničujú text." },
    { kat: "Znaky", znak: "f\"{ }\"", nazov: "f-reťazec", popis: "Text s vloženými hodnotami.", priklad: 'print(f"Ahoj {meno}")' },
    { kat: "Znaky", znak: "\\n", nazov: "Nový riadok", popis: "Špeciálny znak v texte. \\t je tabulátor." },
    { kat: "Operátory", znak: "+ - * /", nazov: "Počty", popis: "/ vráti vždy desatinné číslo." },
    { kat: "Operátory", znak: "//", nazov: "Celočíselné delenie", popis: "7 // 2 = 3." },
    { kat: "Operátory", znak: "%", nazov: "Zvyšok", popis: "7 % 2 = 1." },
    { kat: "Operátory", znak: "**", nazov: "Mocnina", popis: "2 ** 3 = 8." },
    { kat: "Operátory", znak: "+=", nazov: "Pripočítaj", popis: "x += 1 je x = x + 1." },
    { kat: "Operátory", znak: "in", nazov: "Obsahuje", popis: '"a" in "mačka" → True.' },
    { kat: "Typy", znak: "int / float", nazov: "Čísla", popis: "Celé a desatinné (s bodkou)." },
    { kat: "Typy", znak: "str", nazov: "Text", popis: "Reťazec znakov v úvodzovkách." },
    { kat: "Typy", znak: "True / False", nazov: "bool", popis: "Pravda a nepravda, s veľkým začiatočným písmenom." },
    { kat: "Typy", znak: "None", nazov: "Nič", popis: "Žiadna hodnota." },
    { kat: "Funkcie", znak: "print()", nazov: "Výpis", popis: "Parametre sep a end.", priklad: 'print("a", "b", sep="-")' },
    { kat: "Funkcie", znak: "input()", nazov: "Vstup", popis: "Načíta text od používateľa." },
    { kat: "Funkcie", znak: "int() / float() / str()", nazov: "Prevody", popis: "Zmenia typ hodnoty." },
    { kat: "Funkcie", znak: "len()", nazov: "Dĺžka", popis: "Počet znakov alebo prvkov." },
    { kat: "Funkcie", znak: "type()", nazov: "Typ", popis: "Zistí typ hodnoty." },
    { kat: "Funkcie", znak: "round()", nazov: "Zaokrúhli", popis: "round(3.14159, 2) = 3.14." },
    { kat: "Metódy textu", znak: ".upper() / .lower()", nazov: "Veľké / malé", popis: "Zmení veľkosť písmen." },
    { kat: "Metódy textu", znak: ".replace()", nazov: "Nahraď", popis: "Nahradí časť textu." },
    { kat: "Metódy textu", znak: ".split()", nazov: "Rozdeľ", popis: "Rozdelí text na zoznam slov." },
    { kat: "Metódy textu", znak: "[a:b]", nazov: "Výrez", popis: "Časť textu od a po b. [::-1] = odzadu." },
  ]);
})();
