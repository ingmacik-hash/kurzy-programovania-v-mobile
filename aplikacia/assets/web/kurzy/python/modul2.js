/* Python · Modul 2 · Premenné a čísla
   Vysvetlenia v troch vrstvách: text (Stručne), podrobne a hlbka (Do hĺbky). */
(function () {
  var P = K.pom, PY = function (t) { return P.kod(t, "py"); }, TXT = P.TXT, MONO = P.MONO;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "py", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }

  var OBR_STITOK = '<svg viewBox="0 0 340 110" role="img" aria-label="Premenná v Pythone je menovka, ktorá ukazuje na hodnotu">' +
    '<rect x="200" y="30" width="110" height="50" rx="10" style="fill:var(--surface-2);stroke:#3572a5;stroke-width:2"/><text x="255" y="61" text-anchor="middle" font-size="16" font-weight="700" ' + MONO + ' style="fill:var(--text)">"Jana"</text>' +
    '<rect x="20" y="40" width="90" height="30" rx="15" style="fill:#3572a5"/><text x="65" y="60" text-anchor="middle" font-size="13" font-weight="700" ' + MONO + ' fill="#fff">meno</text>' +
    '<path d="M112 55h80" style="stroke:var(--muted);stroke-width:2"/><path d="M186 49l8 6-8 6" style="fill:var(--muted)"/>' +
    '<text x="170" y="100" text-anchor="middle" font-size="11" ' + MONO + ' style="fill:var(--text)">meno = "Jana"</text></svg>';

  /* ====================== Lekcia 1 ====================== */
  var L1 = { id: "python-2-1", nazov: "Premenné", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Meno pre hodnotu",
      text: "<p><b>Premenná</b> je meno, pod ktorým si program zapamätá hodnotu. Vytvoríš ju <b>priradením</b>: vľavo meno, potom <code>=</code> a vpravo hodnota.</p>" + UKAZ('meno = "Jana"\nvek = 15\nprint(meno, "má", vek, "rokov")', "Jana má 15 rokov") + "<p>Kedykoľvek potom napíšeš <code>vek</code>, Python použije hodnotu 15.</p>", obr: OBR_STITOK,
      podrobne: "<p>V module 1 si premennú prirovnal ku škatuľke s menovkou. Teraz sa pozrieme, čo s ňou všetko vieš robiť.</p><p>Premenná sa hodí, keď:</p><ul><li>hodnotu potrebuješ <b>viackrát</b>: napíšeš ju raz a meníš na jednom mieste,</li><li>hodnotu zatiaľ <b>nepoznáš</b>, napríklad odpoveď používateľa,</li><li>chceš, aby bol kód <b>čitateľný</b>: <code>cena * pocet</code> povie viac ako <code>12 * 4</code>.</li></ul><p>Python nepotrebuje žiadne slovo ako <code>let</code> alebo <code>int</code>. Premenná vznikne v momente, keď do nej prvýkrát niečo priradíš.</p><p><b>Pozor:</b> premennú musíš vytvoriť <b>skôr</b>, než ju použiješ. Python číta program zhora nadol. Ak napíšeš <code>print(vek)</code> nad riadok <code>vek = 15</code>, skončí to chybou NameError.</p>",
      hlbka: "<p>Presnejšie: premenná v Pythone je <b>menovka prilepená na hodnotu</b>, nie škatuľka, ktorá hodnotu obsahuje. Hodnota (napríklad text „Jana“) leží v pamäti ako <b>objekt</b> a meno na ňu len ukazuje. Preto môže na jednu hodnotu ukazovať viac mien naraz.</p><p>Funkcia <code>id(meno)</code> ti prezradí číslo objektu v pamäti. Po <code>a = 5</code> a <code>b = a</code> majú <code>id(a)</code> a <code>id(b)</code> rovnakú hodnotu, lebo obe mená ukazujú na ten istý objekt. Pri číslach a textoch to nevadí, pri zoznamoch (modul 6) to bude dôležité.</p><p>Python je <b>dynamicky typovaný</b>: do tej istej premennej môžeš najprv vložiť číslo a neskôr text. Je to pohodlné, no dobrá prax je dávať jednej premennej vždy rovnaký druh hodnoty.</p>" },
    { typ: "vyklad", nadpis: "Zmena hodnoty",
      text: "<p>Hodnotu premennej môžeš kedykoľvek zmeniť. Nová hodnota nahradí starú.</p>" + UKAZ('vek = 15\nprint("Teraz:", vek)\nvek = vek + 1\nprint("O rok:", vek)', "Teraz: 15\nO rok: 16"),
      podrobne: "<p>Riadok <code>vek = vek + 1</code> čítaj <b>sprava doľava</b>:</p><ol><li>vezmi aktuálnu hodnotu <code>vek</code> (15),</li><li>pripočítaj 1 (16),</li><li>výsledok ulož späť do <code>vek</code>.</li></ol><p>Pretože sa to robí veľmi často, existujú skratky:</p>" + P.tabulka(["Skratka", "Znamená"], [["<code>x += 5</code>", "<code>x = x + 5</code>"], ["<code>x -= 2</code>", "<code>x = x - 2</code>"], ["<code>x *= 3</code>", "<code>x = x * 3</code>"], ["<code>x /= 2</code>", "<code>x = x / 2</code>"]]) +
        "<p>Python nemá zápis <code>x++</code>, ktorý poznáš možno z iných jazykov. Píše sa <code>x += 1</code>.</p>",
      hlbka: "<p>Python vie priradiť aj viac premenných naraz: <code>a, b = 3, 4</code>. Vďaka tomu vymeníš hodnoty dvoch premenných jedným riadkom: <code>a, b = b, a</code>. V iných jazykoch na to treba pomocnú premennú.</p><p>Čísla a texty sú v Pythone <b>nemenné</b> (immutable). Pri <code>vek += 1</code> sa staré číslo 15 nezmení na 16. Vytvorí sa nové číslo 16 a menovka <code>vek</code> sa prelepí naň. Staré číslo, na ktoré už nič neukazuje, neskôr odstráni <b>správca pamäte</b> (garbage collector).</p>" },
    { typ: "volba", otazka: "Aká bude hodnota <code>x</code>?", kod: "x = 3\nx = x * 2\nx += 1", moznosti: ["7", "6", "3", "4"], spravna: 0, vysvetlenie: "3 × 2 = 6, potom += 1 pripočíta jednotku: 7." },
    { typ: "vyklad", nadpis: "Ako pomenovať premennú",
      text: "<ul><li>Používaj <b>malé písmená</b> a slová spájaj podčiarkovníkom: <code>pocet_ziakov</code>.</li><li>Povolené sú písmená, číslice a <code>_</code>. Meno <b>nesmie začínať číslicou</b> a nesmie obsahovať medzeru.</li><li>Nepoužívaj diakritiku ani slová, ktoré Python už pozná, ako <code>print</code>, <code>if</code>, <code>for</code>.</li></ul>",
      podrobne: "<p>Štýl s podčiarkovníkmi sa volá <b>snake_case</b> (had). Je to oficiálne odporúčanie pre Python.</p>" + P.tabulka(["Meno", "Je v poriadku?"], [["<code>celkova_cena</code>", "áno, výstižné"], ["<code>x</code>", "funguje, ale nič nehovorí"], ["<code>1cena</code>", "nie, začína číslicou"], ["<code>celková cena</code>", "nie, medzera"], ["<code>print</code>", "funguje, ale pokazí ti funkciu print"]]) +
        "<p>Záleží na veľkosti písmen: <code>vek</code>, <code>Vek</code> a <code>VEK</code> sú tri rôzne premenné. Hodnoty, ktoré sa nemenia, sa podľa zvyku píšu veľkými písmenami: <code>DPH = 0.23</code>.</p>",
      hlbka: "<p>Slová, ktoré nesmieš použiť vôbec, sa volajú <b>kľúčové slová</b>: <code>if</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>def</code>, <code>return</code>, <code>True</code>, <code>False</code>, <code>None</code>, <code>and</code>, <code>or</code>, <code>not</code> a ďalšie, spolu asi 35. Zoznam vypíše <code>import keyword; print(keyword.kwlist)</code>.</p><p>Mená ako <code>print</code>, <code>list</code> alebo <code>input</code> nie sú kľúčové slová, ale vstavané funkcie. Python ti ich dovolí prepísať (<code>print = 5</code>), no potom <code>print(\"Ahoj\")</code> skončí chybou, lebo <code>print</code> je už číslo.</p><p>Odporúčania pre štýl kódu v Pythone sú spísané v dokumente <b>PEP 8</b>. Dodržiavajú ich takmer všetky projekty.</p>" },
    { typ: "volba", otazka: "Ktoré meno premennej je v Pythone najvhodnejšie?", moznosti: ["<code>celkova_cena</code>", "<code>CelkovaCena</code>", "<code>celková cena</code>", "<code>1cena</code>"], spravna: 0, vysvetlenie: "snake_case bez diakritiky. Medzera a číslica na začiatku nie sú povolené, CelkovaCena funguje, ale nie je to štýl Pythonu." },
    { typ: "kod", zadanie: "Vytvor premenné <code>cena</code> = 12 a <code>kusov</code> = 4. Do premennej <code>spolu</code> ulož ich súčin a vypíš <b>Spolu: 48</b>.",
      karty: ["py"], start: { py: "" }, vyska: "150px",
      napoveda: 'Štyri riadky: cena = 12, kusov = 4, spolu = cena * kusov a nakoniec print("Spolu:", spolu).', riesenie: { py: 'cena = 12\nkusov = 4\nspolu = cena * kusov\nprint("Spolu:", spolu)' },
      kontrola: function (v, kod) { if (!/spolu\s*=/.test(kod)) return "Vytvor premennú spolu."; return r(v)[0] === "Spolu: 48" ? null : "Výstup má byť Spolu: 48."; },
      vysvetlenie: "Skús zmeniť cenu na 15 a spusti znova. Výsledok sa prepočíta sám, lebo program pracuje s premennými." },
  ] };

  /* ====================== Lekcia 2 ====================== */
  var L2 = { id: "python-2-2", nazov: "Dátové typy", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Druhy hodnôt",
      text: "<p>Každá hodnota má <b>typ</b>. Typ určuje, čo s hodnotou môžeš robiť. Najčastejšie typy:</p>" + P.tabulka(["Typ", "Príklad", "Význam"], [["<code>int</code>", "<code>42</code>, <code>-7</code>", "celé číslo"], ["<code>float</code>", "<code>3.14</code>, <code>2.0</code>", "desatinné číslo (s bodkou!)"], ["<code>str</code>", "<code>\"Ahoj\"</code>", "text"], ["<code>bool</code>", "<code>True</code>, <code>False</code>", "pravda alebo nepravda"]]),
      podrobne: "<p>Python si typ určí sám podľa toho, ako hodnotu zapíšeš. Funkcia <code>type()</code> ti ho prezradí:</p>" + UKAZ('print(type(42))\nprint(type(3.5))\nprint(type("42"))\nprint(type(True))', "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>") +
        "<p>Všimni si tretí riadok: <code>\"42\"</code> v úvodzovkách je <b>text</b>, nie číslo. Pre Python sú to len dva znaky, štvorka a dvojka.</p><p>Mená typov sú skratky z angličtiny: <b>int</b>eger (celé číslo), <b>float</b>ing point (pohyblivá desatinná čiarka), <b>str</b>ing (reťazec znakov), <b>bool</b>ean (logická hodnota podľa matematika Boola).</p><p>Existuje aj špeciálna hodnota <code>None</code>, ktorá znamená „nič, žiadna hodnota“. Stretneš sa s ňou pri funkciách.</p>",
      hlbka: "<p>Typy v Pythone sú <b>triedy</b> a hodnoty sú ich <b>objekty</b>. Preto výpis hovorí <code>&lt;class 'int'&gt;</code>. Každý typ má vlastné <b>metódy</b>, teda funkcie, ktoré volaš cez bodku: <code>\"ahoj\".upper()</code>.</p><p><code>bool</code> je v Pythone podtyp <code>int</code>: <code>True</code> sa správa ako 1 a <code>False</code> ako 0. Preto <code>True + True</code> je 2. Využíva sa to napríklad pri počítaní, koľko hodnôt spĺňa podmienku.</p><p>Okrem týchto jednoduchých typov existujú aj zložené: <code>list</code> (zoznam), <code>dict</code> (slovník), <code>tuple</code> (n-tica) a <code>set</code> (množina). Spoznáš ich v module 6.</p>" },
    { typ: "volba", otazka: "Aký typ je <code>\"3.14\"</code>?", moznosti: ["str", "float", "int", "bool"], spravna: 0, vysvetlenie: "Je v úvodzovkách, takže je to text, hoci vyzerá ako číslo." },
    { typ: "volba", otazka: "Ako sa v Pythone píše pravda?", moznosti: ["<code>True</code>", "<code>true</code>", "<code>TRUE</code>", "<code>Pravda</code>"], spravna: 0, vysvetlenie: "S veľkým T. Malé true by Python považoval za neznáme meno premennej (NameError)." },
    { typ: "vyklad", nadpis: "Text a číslo sa nesčítajú",
      text: "<p>Znamienko <code>+</code> robí pri číslach a textoch niečo iné. Čísla <b>sčíta</b>, texty <b>spojí</b>. Text a číslo dohromady Python nespojí a ohlási chybu.</p>" + UKAZ('print(2 + 3)\nprint("2" + "3")\nvek = 15\nprint("Mám " + vek + " rokov")', "5\n23\nTypeError: can only concatenate str (not \"int\") to str"),
      podrobne: "<p>Chyba <b>TypeError</b> znamená: tieto dva typy sa nedajú takto skombinovať. Riešenia sú tri:</p><ol><li>čiarky v <code>print</code>: <code>print(\"Mám\", vek, \"rokov\")</code> (najjednoduchšie),</li><li>prevod na text: <code>\"Mám \" + str(vek) + \" rokov\"</code> (o lekciu ďalej),</li><li>f-reťazec: <code>f\"Mám {vek} rokov\"</code> (o dve lekcie, najpohodlnejšie).</li></ol><p>Text sa dá aj <b>násobiť</b> celým číslom: <code>\"ha\" * 3</code> je <code>\"hahaha\"</code>. Hodí sa na čiary: <code>print(\"-\" * 20)</code>.</p>",
      hlbka: "<p>Python je <b>silne typovaný</b>: typy sám potichu nemení. JavaScript je slabo typovaný a <code>\"Mám \" + 15</code> v ňom vytvorí text „Mám 15“. Znie to pohodlnejšie, ale <code>\"5\" - 2</code> je v JavaScripte 3 a <code>\"5\" + 2</code> je „52“. Takéto tiché prevody vedú k chybám, ktoré sa ťažko hľadajú.</p><p>Python chybu ukáže hneď na riadku, kde vznikla. Je to výhoda, aj keď to na začiatku nepôsobí tak.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>print(\"4\" + \"4\")</code>?", moznosti: ["44", "8", "4 4", "chybu"], spravna: 0, vysvetlenie: "Obe hodnoty sú texty, + ich spojí za seba." },
    { typ: "kod", zadanie: "Oprav program, aby vypísal <b>Mám 15 rokov</b>. Použi <code>str()</code>, ktoré premení číslo na text.",
      karty: ["py"], start: { py: 'vek = 15\nprint("Mám " + vek + " rokov")' }, vyska: "120px",
      napoveda: 'Obal premennú vek do str(): print("Mám " + str(vek) + " rokov")', riesenie: { py: 'vek = 15\nprint("Mám " + str(vek) + " rokov")' },
      kontrola: function (v, kod) { if (!/str\(/.test(kod)) return "Použi str(vek)."; return r(v)[0] === "Mám 15 rokov" ? null : "Výstup má byť Mám 15 rokov. Skontroluj medzery v úvodzovkách."; },
      vysvetlenie: "str() vyrobilo z čísla 15 text „15“ a ten sa už dá spojiť s ostatným textom." },
  ] };

  /* ====================== Lekcia 3 ====================== */
  var L3 = { id: "python-2-3", nazov: "Prevody typov", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "int(), float(), str()",
      text: "<p>Hodnotu môžeš previesť na iný typ. Funkcia má rovnaké meno ako typ, na ktorý prevádzaš:</p>" + P.tabulka(["Zápis", "Výsledok"], [["<code>int(\"42\")</code>", "42 (text na celé číslo)"], ["<code>float(\"2.5\")</code>", "2.5 (text na desatinné číslo)"], ["<code>str(10)</code>", "\"10\" (číslo na text)"], ["<code>int(3.99)</code>", "3 (desatinná časť sa odreže)"], ["<code>round(3.567, 2)</code>", "3.57 (zaokrúhlenie)"]]),
      podrobne: "<p>Pozor na rozdiel medzi <b>odrezaním</b> a <b>zaokrúhlením</b>:</p>" + UKAZ("print(int(3.99))\nprint(round(3.99))\nprint(round(3.14159, 2))", "3\n4\n3.14") +
        "<p><code>int()</code> desatinnú časť jednoducho zahodí. <code>round()</code> zaokrúhli podľa pravidiel. Druhý údaj v <code>round</code> hovorí, na koľko desatinných miest.</p><p>Prevod nie vždy funguje. <code>int(\"ahoj\")</code> skončí chybou <b>ValueError</b>, lebo „ahoj“ nie je číslo. Rovnako <code>int(\"2.5\")</code>: text s bodkou treba previesť cez <code>float</code>.</p>",
      hlbka: "<p><code>round()</code> v Pythone zaokrúhľuje polovice <b>k párnemu číslu</b>: <code>round(2.5)</code> je 2 a <code>round(3.5)</code> je 4. Je to takzvané bankárske zaokrúhľovanie. Pri veľkom množstve čísel nevzniká systematická chyba smerom hore.</p><p>Logické hodnoty sa dajú tiež prevádzať: <code>bool(0)</code>, <code>bool(\"\")</code> a <code>bool(None)</code> sú False, takmer všetko ostatné je True. Tomu sa hovorí <b>pravdivosť</b> (truthiness) a využiješ ju pri podmienkach.</p>" },
    { typ: "vyklad", nadpis: "Čísla z input()",
      text: "<p>Pamätáš si, že <code>input()</code> vráti vždy <b>text</b>? Keď chceš s odpoveďou počítať, musíš ju previesť na číslo:</p>" + UKAZ('a = int(input("Prvé číslo: "))\nb = int(input("Druhé číslo: "))\nprint("Súčet:", a + b)', "Prvé číslo: 7\nDruhé číslo: 5\nSúčet: 12"),
      podrobne: "<p>Zápis <code>int(input(\"…\"))</code> sa číta <b>zvnútra von</b>:</p><ol><li>najprv sa vykoná <code>input(\"Prvé číslo: \")</code> a vráti text, napríklad „7“,</li><li>potom <code>int(\"7\")</code> z neho spraví číslo 7,</li><li>nakoniec sa 7 uloží do <code>a</code>.</li></ol><p>Bez <code>int()</code> by súčet „7“ a „5“ bol text „75“. Pri desatinných číslach, napríklad cene alebo výške, použi <code>float(input())</code>.</p>",
      hlbka: "<p>Keď používateľ napíše niečo, čo nie je číslo, program spadne s ValueError. V skutočných programoch sa to rieši príkazmi <code>try</code> a <code>except</code>, ktoré chybu zachytia, a program sa opýta znova. To sa naučíš neskôr.</p><p><code>int()</code> zvládne aj medzery okolo čísla (<code>int(\" 7 \")</code> je 7) a čísla v iných sústavách: <code>int(\"ff\", 16)</code> je 255 a <code>int(\"101\", 2)</code> je 5.</p>" },
    { typ: "volba", otazka: "Čo vypíše program pri vstupe 3 a 4?", kod: 'a = input()\nb = input()\nprint(a + b)', moznosti: ["34", "7", "chybu", "3 4"], spravna: 0, vysvetlenie: "Bez int() sú a aj b texty a + ich spojí: „3“ a „4“ dá „34“." },
    { typ: "volba", otazka: "Čo vypíše <code>print(int(7.9))</code>?", moznosti: ["7", "8", "7.9", "chybu"], spravna: 0, vysvetlenie: "int() desatinnú časť odreže, nezaokrúhľuje. Na zaokrúhlenie je round()." },
    { typ: "doplnenie", otazka: "Načítaj desatinné číslo:", sablona: 'vyska = [[0]]([[1]]("Výška v m: "))', zetony: ["float", "input", "int", "str", "print"], spravne: ["float", "input"], vysvetlenie: "Najprv input() načíta text, potom ho float() premení na desatinné číslo." },
    { typ: "kod", zadanie: "Program načíta dve celé čísla (vstup je pripravený: <b>7</b> a <b>5</b>) a vypíše ich súčin vo tvare <b>7 * 5 = 35</b>.",
      karty: ["py"], vstup: "7\n5", start: { py: "a = input()\nb = input()\n" }, vyska: "150px",
      napoveda: 'Obal input() do int(): a = int(input()). Potom print(a, "*", b, "=", a * b).', riesenie: { py: 'a = int(input())\nb = int(input())\nprint(a, "*", b, "=", a * b)' },
      kontrola: function (v) { var l = r(v); return l[l.length - 1] === "7 * 5 = 35" ? null : "Posledný riadok má byť 7 * 5 = 35 (teraz: " + l[l.length - 1] + ")."; },
      vysvetlenie: "Skús v poli Vstup zmeniť čísla a spusti znova." },
  ] };

  /* ====================== Lekcia 4 ====================== */
  var L4 = { id: "python-2-4", nazov: "f-reťazce", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Hodnoty priamo v texte",
      text: "<p><b>f-reťazec</b> je najpohodlnejší spôsob, ako vložiť hodnoty do textu. Pred úvodzovky napíšeš písmeno <code>f</code> a premenné vkladáš do zložených zátvoriek <code>{ }</code>.</p>" + UKAZ('meno = "Jana"\nvek = 15\nprint(f"{meno} má {vek} rokov.")', "Jana má 15 rokov."),
      podrobne: "<p>Porovnaj tri spôsoby, ktoré už poznáš:</p>" + P.kod('print(meno, "má", vek, "rokov.")          # čiarky\nprint(meno + " má " + str(vek) + " rokov.")  # spájanie\nprint(f"{meno} má {vek} rokov.")          # f-reťazec', "py", "Kód") +
        "<p>Všetky vypíšu to isté. f-reťazec je najprehľadnejší: vidíš celú vetu naraz, netreba <code>str()</code> a medzery píšeš presne tam, kde ich chceš.</p><p>Vnútri <code>{ }</code> môže byť aj <b>výpočet</b>: <code>f\"O rok budeš mať {vek + 1}\"</code>.</p><p><b>Častá chyba:</b> zabudnuté <code>f</code>. Potom sa vypíše doslova <code>{meno}</code> aj so zátvorkami.</p>",
      hlbka: "<p>f-reťazce (formatted string literals) pribudli v Pythone 3.6 v roku 2016. Staršie spôsoby sú <code>\"{} má {}\".format(meno, vek)</code> a <code>\"%s má %d\" % (meno, vek)</code>. Stretneš ich v starších návodoch.</p><p>Výraz v <code>{ }</code> sa vyhodnotí v momente, keď sa riadok vykoná. Od Pythonu 3.8 môžeš písať <code>f\"{vek=}\"</code> a vypíše sa <code>vek=15</code>, čo je veľmi užitočné pri hľadaní chýb.</p><p>Keď potrebuješ v texte samotnú zloženú zátvorku, zdvojíš ju: <code>f\"{{ a }}\"</code> vypíše <code>{ a }</code>.</p>" },
    { typ: "vyklad", nadpis: "Formátovanie čísel",
      text: "<p>Za dvojbodku v <code>{ }</code> môžeš napísať, <b>ako</b> sa má číslo zobraziť. Najčastejšie: <code>:.2f</code> znamená „na 2 desatinné miesta“.</p>" + UKAZ('cena = 7.5\nprint(f"Cena: {cena:.2f} €")', "Cena: 7.50 €"),
      podrobne: P.tabulka(["Zápis", "Výsledok pre x = 3.14159"], [["<code>f\"{x:.2f}\"</code>", "3.14 (2 desatinné miesta)"], ["<code>f\"{x:.0f}\"</code>", "3 (bez desatinných miest)"], ["<code>f\"{1234567:,}\"</code>", "1,234,567 (oddelenie tisícok)"], ["<code>f\"{0.25:.0%}\"</code>", "25% (percentá)"], ["<code>f\"{7:3}\"</code>", "„  7“ (šírka 3 znaky)"]]) +
        "<p>Písmeno <b>f</b> v <code>.2f</code> znamená <i>fixed</i>, pevný počet desatinných miest. Na peniaze sa používa vždy <code>:.2f</code>, aby bolo 7.50, a nie 7.5.</p>",
      hlbka: "<p>Formátovanie má celý malý jazyk: <code>{text:&lt;10}</code> zarovná vľavo na šírku 10, <code>{text:&gt;10}</code> vpravo, <code>{text:^10}</code> na stred a <code>{cislo:05}</code> doplní nuly zľava (00042). Vďaka tomu vypíšeš pekne zarovnané tabuľky.</p><p>Formátovanie mení len <b>zobrazenie</b>, hodnota v premennej zostane rovnaká. Keď potrebuješ s zaokrúhlenou hodnotou ďalej počítať, použi <code>round()</code>.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>print(f\"{2.5 * 2:.1f}\")</code>?", moznosti: ["5.0", "5", "2.5 * 2", "5.00"], spravna: 0, vysvetlenie: "Výraz sa vypočíta (5) a zobrazí s jedným desatinným miestom: 5.0." },
    { typ: "volba", otazka: "Čo vypíše program?", kod: 'mesto = "Nitra"\nprint("Bývam v {mesto}")', moznosti: ["Bývam v {mesto}", "Bývam v Nitra", "chybu", "Bývam v"], spravna: 0, vysvetlenie: "Pred úvodzovkami chýba f, preto sa zátvorky vypíšu doslova. Správne: f\"Bývam v {mesto}\"." },
    { typ: "kod", zadanie: "Vypočítaj cenu s DPH 23 % pre <code>cena = 19.99</code> a vypíš ju pomocou f-reťazca s dvoma desatinnými miestami: <b>S DPH: 24.59 €</b>.",
      karty: ["py"], start: { py: "cena = 19.99\n" }, vyska: "140px",
      napoveda: 'Cena s DPH je cena * 1.23. Vlož ju do f-reťazca s formátom :.2f: print(f"S DPH: {cena * 1.23:.2f} €")', riesenie: { py: 'cena = 19.99\nprint(f"S DPH: {cena * 1.23:.2f} €")' },
      kontrola: function (v, kod) { if (!/f["']/.test(kod)) return "Použi f-reťazec (f\"…\")."; return r(v)[0] === "S DPH: 24.59 €" ? null : "Výstup má byť S DPH: 24.59 €"; },
      vysvetlenie: "Výpočet aj zaokrúhlenie na centy v jednom riadku." },
  ] };

  /* ====================== Lekcia 5 ====================== */
  var L5 = { id: "python-2-5", nazov: "Práca s textom", minut: 11, kroky: [
    { typ: "vyklad", nadpis: "Metódy textu",
      text: "<p>Text má zabudované <b>metódy</b>: príkazy, ktoré s ním niečo urobia. Voláš ich cez <b>bodku</b> za textom alebo premennou.</p>" + UKAZ('t = "Ahoj svet"\nprint(t.upper())\nprint(t.replace("svet", "Python"))\nprint(len(t))', "AHOJ SVET\nAhoj Python\n9"),
      podrobne: P.tabulka(["Zápis", "Výsledok pre t = \"Ahoj svet\""], [["<code>len(t)</code>", "9 (počet znakov aj s medzerou)"], ["<code>t.upper()</code>", "\"AHOJ SVET\""], ["<code>t.lower()</code>", "\"ahoj svet\""], ["<code>t.replace(\"svet\", \"Python\")</code>", "\"Ahoj Python\""], ["<code>t.count(\"o\")</code>", "1 (koľkokrát sa vyskytuje)"], ["<code>\"svet\" in t</code>", "True (obsahuje?)"], ["<code>t.split()</code>", "[\"Ahoj\", \"svet\"] (rozdelí na slová)"], ["<code>t.strip()</code>", "odstráni medzery na začiatku a konci"]]) +
        "<p><code>len()</code> je <b>funkcia</b> (píše sa pred hodnotu), ostatné sú <b>metódy</b> (píšu sa za bodku). Nezabudni na zátvorky: <code>t.upper</code> bez nich nič neurobí.</p><p>Metódy pôvodný text <b>nemenia</b>, vracajú nový. Ak chceš zmenu zachovať, ulož ju: <code>t = t.upper()</code>.</p>",
      hlbka: "<p>Text je nemenný (immutable), preto každá metóda vytvára nový. Pri spájaní tisícov kúskov textu v cykle je preto rýchlejšie dať ich do zoznamu a spojiť naraz: <code>\" \".join(zoznam)</code>.</p><p>Užitočné sú aj <code>t.startswith(\"Ah\")</code>, <code>t.endswith(\".py\")</code>, <code>t.find(\"svet\")</code> (vráti pozíciu alebo −1), <code>t.capitalize()</code> a <code>t.isdigit()</code> (sú to samé číslice?). Úplný zoznam vypíše <code>help(str)</code>.</p><p><code>upper()</code> zvláda aj diakritiku, lebo Python používa Unicode: <code>\"čučoriedka\".upper()</code> je ČUČORIEDKA.</p>" },
    { typ: "volba", otazka: "Ako zistíš, či text obsahuje slovo „mačka“?", moznosti: ["<code>\"mačka\" in text</code>", "<code>text.has(\"mačka\")</code>", "<code>text.includes(\"mačka\")</code>", "<code>contains(text)</code>"], spravna: 0, vysvetlenie: "Operátor in vráti True alebo False. includes je z JavaScriptu." },
    { typ: "vyklad", nadpis: "Indexy a výrezy",
      text: "<p>Každý znak v texte má poradové číslo, <b>index</b>. Počíta sa <b>od nuly</b>. K znaku sa dostaneš hranatými zátvorkami.</p>" + UKAZ('t = "Python"\nprint(t[0])\nprint(t[-1])\nprint(t[0:3])', "P\nn\nPyt"),
      podrobne: P.tabulka(["Znak", "P", "y", "t", "h", "o", "n"], [["index", "0", "1", "2", "3", "4", "5"], ["od konca", "-6", "-5", "-4", "-3", "-2", "-1"]]) +
        "<ul><li><code>t[0]</code> je prvý znak, <code>t[-1]</code> posledný. Záporné indexy počítajú od konca.</li><li><code>t[a:b]</code> je <b>výrez</b> od indexu a <b>po</b> b, ale b sa už nezahrnie. <code>t[0:3]</code> sú znaky 0, 1 a 2.</li><li>Keď a alebo b vynecháš, myslí sa začiatok alebo koniec: <code>t[:2]</code> je „Py“, <code>t[2:]</code> je „thon“.</li><li><code>t[::-1]</code> je celý text odzadu.</li></ul>",
      hlbka: "<p>Výrez má tri časti <code>[začiatok:koniec:krok]</code>. Krok 2 berie každý druhý znak: <code>\"Python\"[::2]</code> je „Pto“. Záporný krok ide odzadu.</p><p>Prečo koniec nie je zahrnutý? Lebo potom platí pekné pravidlo: <code>t[:k] + t[k:]</code> je vždy celý text a dĺžka výrezu <code>t[a:b]</code> je b − a. Rovnako funguje <code>range(a, b)</code>.</p><p>Index mimo textu (<code>t[10]</code>) skončí chybou IndexError, výrez mimo textu (<code>t[3:100]</code>) však chybu nehlási, len vráti, čo sa dá.</p>" },
    { typ: "volba", otazka: "Čo je <code>\"Slovensko\"[0:4]</code>?", moznosti: ["\"Slov\"", "\"Slove\"", "\"lov\"", "\"S\""], spravna: 0, vysvetlenie: "Znaky s indexmi 0, 1, 2, 3. Index 4 sa už nezahrnie." },
    { typ: "volba", otazka: "Čo je <code>\"Python\"[-2]</code>?", moznosti: ["\"o\"", "\"n\"", "\"h\"", "chyba"], spravna: 0, vysvetlenie: "-1 je posledné n, -2 je predposledné o." },
    { typ: "kod", zadanie: "Program načíta vetu (vstup je pripravený) a vypíše: počet znakov, vetu veľkými písmenami a vetu odzadu, každé na samostatnom riadku.",
      karty: ["py"], vstup: "Python je super", start: { py: "veta = input()\n" }, vyska: "150px",
      napoveda: "Tri riadky: print(len(veta)), print(veta.upper()) a print(veta[::-1]).", riesenie: { py: "veta = input()\nprint(len(veta))\nprint(veta.upper())\nprint(veta[::-1])" },
      kontrola: function (v) { var l = r(v).slice(-3); return l[0] === "15" && l[1] === "PYTHON JE SUPER" && l[2] === "repus ej nohtyP" ? null : "Očakávaný výstup: 15, PYTHON JE SUPER, repus ej nohtyP."; },
      vysvetlenie: "Funkcia len, metóda upper a výrez [::-1]: tri rôzne nástroje na prácu s textom." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<p>Čo už vieš:</p><ul><li>vytvárať a meniť <b>premenné</b>, skratky <code>+=</code> a pravidlá pre mená (snake_case),</li><li><b>typy</b> <code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code> a funkciu <code>type()</code>,</li><li><b>prevody</b> <code>int()</code>, <code>float()</code>, <code>str()</code> a <code>round()</code>, aj pri čítaní čísel cez <code>input()</code>,</li><li>skladať text cez <b>f-reťazce</b> a formátovať čísla <code>:.2f</code>,</li><li>pracovať s textom: <b>metódy</b>, <b>indexy</b> a <b>výrezy</b>.</li></ul>",
      tip: "Teraz test modulu. V module 3 sa program naučí rozhodovať: podmienky if a else." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "python-2-1", otazka: "Ako vytvoríš premennú s hodnotou 10?", moznosti: ["<code>x = 10</code>", "<code>let x = 10</code>", "<code>int x = 10;</code>", "<code>x := 10</code> je jediná možnosť"], spravna: 0, vysvetlenie: "V Pythone stačí priradenie." },
    { typ: "volba", lekcia: "python-2-1", otazka: "Čo znamená <code>body += 5</code>?", moznosti: ["<code>body = body + 5</code>", "<code>body = 5</code>", "porovnanie s 5", "chyba"], spravna: 0, vysvetlenie: "+= je skratka: k aktuálnej hodnote pripočítaj 5." },
    { typ: "volba", lekcia: "python-2-4", otazka: "Čo vypíše <code>print(f\"{3 * 4} kusov\")</code>?", moznosti: ["12 kusov", "3 * 4 kusov", "{3 * 4} kusov", "chybu"], spravna: 0, vysvetlenie: "Výraz v zložených zátvorkách sa vypočíta." },
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
