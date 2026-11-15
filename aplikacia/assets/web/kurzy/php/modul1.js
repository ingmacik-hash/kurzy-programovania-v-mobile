/* PHP · Modul 1 · Prvý skript */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var KOD = function (t) { return P.kod(t, "php"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "php", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "<?php\n\n" + telo + "\n"; }

  var OBR = '<svg viewBox="0 0 340 100" role="img" aria-label="Prehliadač pošle požiadavku, server spustí PHP a vráti hotovú stránku HTML">' +
    [["prehliadač", "požiadavka"], ["server + PHP", "spustí skript"], ["HTML", "hotová stránka"]].map(function (x, i) {
      var X = 8 + i * 116, hl = i === 1;
      return '<rect x="' + X + '" y="16" width="96" height="46" rx="10" style="fill:' + (hl ? "#777bb3" : "var(--surface-2)") + ';stroke:#777bb3;stroke-width:2"/><text x="' + (X + 48) + '" y="44" text-anchor="middle" font-size="11.5" font-weight="700" ' + TXT + ' style="fill:' + (hl ? "#fff" : "var(--text)") + '">' + x[0] + '</text><text x="' + (X + 48) + '" y="82" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">' + x[1] + "</text>" +
        (i < 2 ? '<path d="M' + (X + 98) + ' 39h14" style="stroke:var(--muted);stroke-width:2"/><path d="M' + (X + 108) + ' 34l6 5-6 5" style="fill:var(--muted)"/>' : "");
    }).join("") + "</svg>";

  var L1 = { id: "php-1-1", nazov: "Ahoj, PHP!", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Jazyk webových serverov",
      text: "<p>PHP beží na <b>serveri</b>: keď otvoríš stránku, server spustí skript v PHP a prehliadaču pošle hotové HTML. Poháňa WordPress, Wikipédiu aj veľkú časť e-shopov:</p>", obr: OBR,
      podrobne: "<p>PHP vzniklo v roku 1994 ako „Personal Home Page“. Dnes beží na asi troch štvrtinách webových stránok, ktoré používajú serverový jazyk. V tejto aplikácii sa PHP spúšťa na internete ako samostatný skript (bez prehliadača), ale princípy sú rovnaké.</p>" },
    { typ: "vyklad", nadpis: "Prvý skript",
      text: UKAZ('<?php\n\necho "Ahoj, svet!\\n";', "Ahoj, svet!"),
      podrobne: "<ul><li>Kód v PHP začína značkou <code>&lt;?php</code>.</li><li><code>echo</code> vypíše text. Nový riadok je <code>\\n</code> (len v úvodzovkách \"…\").</li><li>Príkazy končia <b>bodkočiarkou</b>.</li><li>Na webe by si namiesto \\n písal HTML, napr. <code>echo \"&lt;p&gt;Ahoj&lt;/p&gt;\";</code></li></ul>" },
    { typ: "volba", otazka: "Kde beží PHP?", moznosti: ["Na serveri", "V prehliadači", "Len v mobile", "V databáze"], spravna: 0, vysvetlenie: "Prehliadač dostane už hotové HTML." },
    { typ: "poradie", otazka: "Zoraď skript:", riadky: ["<?php", '$meno = "Jana";', 'echo "Ahoj, $meno\\n";'], vysvetlenie: "Značka, premenná, výpis." },
    { typ: "kod", zadanie: "Uprav skript, aby vypísal <b>Učím sa PHP</b>.",
      karty: ["php"], start: { php: kostra('echo "Ahoj, svet!\\n";') }, vyska: "120px",
      napoveda: 'echo "Učím sa PHP\\n";', riesenie: { php: kostra('echo "Učím sa PHP\\n";') },
      kontrola: function (v) { return r(v)[0] === "Učím sa PHP" ? null : "Výstup má byť presne: Učím sa PHP"; },
      vysvetlenie: "Prvý skript v PHP beží." },
  ] };

  var L2 = { id: "php-1-2", nazov: "Premenné a spájanie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Premenné so znakom $",
      text: UKAZ('<?php\n\n$meno = "Peter";\n$vek = 16;\necho "Volám sa $meno a mám $vek rokov.\\n";\necho \'Jednoduché úvodzovky: $meno\' . "\\n";\necho "Spojenie " . "bodkou" . "\\n";', "Volám sa Peter a mám 16 rokov.\nJednoduché úvodzovky: $meno\nSpojenie bodkou"),
      podrobne: "<ul><li>Každá premenná začína <code>$</code>. Typ sa nepíše.</li><li>V úvodzovkách <code>\"…\"</code> sa premenné dosadia, v apostrofoch <code>'…'</code> nie.</li><li>Texty sa spájajú <b>bodkou</b> <code>.</code>, nie plusom.</li></ul>" },
    { typ: "volba", otazka: "Čo vypíše <code>echo '$x';</code>, keď <code>$x = 5</code>?", moznosti: ["$x", "5", "chybu", "nič"], spravna: 0, vysvetlenie: "V apostrofoch sa premenné nedosadzujú." },
    { typ: "volba", otazka: "Ako spojíš texty v PHP?", moznosti: ["<code>\"a\" . \"b\"</code>", "<code>\"a\" + \"b\"</code>", "<code>\"a\" &amp; \"b\"</code>", "<code>concat(\"a\", \"b\")</code> je jediná možnosť"], spravna: 0, vysvetlenie: "Bodka." },
    { typ: "kod", zadanie: "Vytvor premenné <code>$mesto = \"Žilina\"</code> a <code>$obyvatelia = 80000</code> a vypíš <b>Žilina má 80000 obyvateľov.</b>",
      karty: ["php"], start: { php: kostra("") }, vyska: "150px",
      napoveda: 'echo "$mesto má $obyvatelia obyvateľov.\\n";', riesenie: { php: kostra('$mesto = "Žilina";\n$obyvatelia = 80000;\necho "$mesto má $obyvatelia obyvateľov.\\n";') },
      kontrola: function (v, kod) { if (!/\$mesto\s*=/.test(kod) || !/\$obyvatelia\s*=/.test(kod)) return "Vytvor premenné $mesto a $obyvatelia."; return r(v)[0] === "Žilina má 80000 obyvateľov." ? null : "Výstup má byť Žilina má 80000 obyvateľov."; },
      vysvetlenie: "Premenné sa dosadili do textu." },
  ] };

  var L3 = { id: "php-1-3", nazov: "Komentáre", minut: 5, kroky: [
    { typ: "vyklad", nadpis: "Poznámky v kóde",
      text: KOD("<?php\n\n// komentár do konca riadku\n# aj toto je komentár\n/* komentár\n   na viac riadkov */"),
      podrobne: "<p>PHP pozná tri druhy komentárov. Najčastejšie sa používa <code>//</code> a pre dokumentáciu funkcií <code>/** … */</code>.</p>" },
    { typ: "volba", otazka: "Ktorý zápis NIE JE komentár v PHP?", moznosti: ["<code>-- text</code>", "<code>// text</code>", "<code># text</code>", "<code>/* text */</code>"], spravna: 0, vysvetlenie: "-- je komentár v SQL." },
    { typ: "kod", zadanie: "Zakomentuj riadok s textom <b>Test</b>, aby sa vypísalo len <b>Hotovo</b>.",
      karty: ["php"], start: { php: kostra('echo "Test\\n";\necho "Hotovo\\n";') }, vyska: "130px",
      napoveda: "Pred prvý riadok daj //", riesenie: { php: kostra('// echo "Test\\n";\necho "Hotovo\\n";') },
      kontrola: function (v, kod) { if (!/\/\/|#|\/\*/.test(kod)) return "Použi komentár //."; return r(v).join("|") === "Hotovo" ? null : "Má sa vypísať len Hotovo."; },
      vysvetlenie: "Komentár vypol riadok." },
  ] };

  var L4 = { id: "php-1-4", nazov: "Chyby", minut: 6, kroky: [
    { typ: "vyklad", nadpis: "Keď PHP niečomu nerozumie",
      text: "<p>Najčastejšie chyby:</p><ul><li>chýbajúca <b>bodkočiarka</b> → „syntax error, unexpected …“ (často na nasledujúcom riadku),</li><li>chýbajúci <code>$</code> pred premennou,</li><li>neexistujúca premenná → <b>upozornenie</b> (Warning), skript však beží ďalej,</li><li>chýbajúca zátvorka.</li></ul>",
      podrobne: "<p>PHP rozlišuje <b>chyby</b> (skript sa zastaví) a <b>upozornenia</b> (skript beží, ale niečo je zle). Aplikácia ti oboje vysvetlí po slovensky.</p>" },
    { typ: "volba", otazka: "Čo je zle?", kod: '<?php\n$x = 5\necho $x;', jazyk: "php", moznosti: ["Za $x = 5 chýba bodkočiarka", "echo je zle", "Chýba $ pred echo", "Nič"], spravna: 0, vysvetlenie: "Každý príkaz končí ;" },
    { typ: "kod", zadanie: "Skript má dve chyby. Oprav ho, aby vypísal <b>Funguje!</b>",
      karty: ["php"], start: { php: '<?php\n\n$text = "Funguje!"\necho text . "\\n";\n' }, vyska: "130px",
      napoveda: "Za \"Funguje!\" chýba ; a pred text chýba $.", riesenie: { php: kostra('$text = "Funguje!";\necho $text . "\\n";') },
      kontrola: function (v) { return r(v)[0] === "Funguje!" ? null : "Výstup má byť Funguje!"; },
      vysvetlenie: "Bodkočiarka a $ sú v PHP všade." },
  ] };

  var L5 = { id: "php-1-5", nazov: "Počítanie", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Operátory",
      text: UKAZ('<?php\n\necho 7 + 5, "\\n";\necho 17 / 5, "\\n";\necho intdiv(17, 5), "\\n";\necho 17 % 5, "\\n";\necho 2 ** 10, "\\n";\necho "Súčet: " . (7 + 5) . "\\n";', "12\n3.4\n3\n2\n1024\nSúčet: 12"),
      podrobne: "<p>Na rozdiel od C či Javy <code>/</code> v PHP vráti desatinné číslo, ak delenie nevyjde celé. Celočíselné delenie je <code>intdiv()</code>. <code>**</code> je mocnina. echo môže vypísať viac hodnôt oddelených čiarkou.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>echo 9 / 2;</code>?", moznosti: ["4.5", "4", "5", "chybu"], spravna: 0, vysvetlenie: "PHP vráti desatinné číslo." },
    { typ: "kod", zadanie: "Pre <code>$minuty = 135</code> vypíš <b>135 minút = 2 h 15 min</b>. Hodiny cez <code>intdiv</code>, minúty cez <code>%</code>.",
      karty: ["php"], start: { php: kostra("$minuty = 135;\n") }, vyska: "140px",
      napoveda: 'echo "$minuty minút = " . intdiv($minuty, 60) . " h " . ($minuty % 60) . " min\\n";', riesenie: { php: kostra('$minuty = 135;\necho "$minuty minút = " . intdiv($minuty, 60) . " h " . ($minuty % 60) . " min\\n";') },
      kontrola: function (v, kod) { if (!/intdiv/.test(kod)) return "Hodiny vypočítaj cez intdiv."; return r(v)[0] === "135 minút = 2 h 15 min" ? null : "Výstup má byť 135 minút = 2 h 15 min"; },
      vysvetlenie: "intdiv a % sú dvojica na delenie so zvyškom." },
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li><code>&lt;?php</code>, <code>echo</code>, bodkočiarky.</li><li>Premenné s <code>$</code>, úvodzovky vs. apostrofy.</li><li>Spájanie textov bodkou.</li><li>Komentáre, chyby a upozornenia.</li><li>Operátory, <code>intdiv</code>, <code>**</code>.</li></ul>", tip: "Teraz test, potom typy, vstup a funkcie na text." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "php-1-1", otazka: "Ako začína kód v PHP?", moznosti: ["<code>&lt;?php</code>", "<code>&lt;php&gt;</code>", "<code>#!php</code>", "<code>&lt;script php&gt;</code>"], spravna: 0, vysvetlenie: "<?php" },
    { typ: "volba", lekcia: "php-1-1", otazka: "Ktorý príkaz vypíše text?", moznosti: ["echo", "print_line", "console.log", "System.out"], spravna: 0, vysvetlenie: "echo (alebo print)." },
    { typ: "volba", lekcia: "php-1-2", otazka: "Čím začína každá premenná v PHP?", moznosti: ["$", "@", "#", "&"], spravna: 0, vysvetlenie: "$meno" },
    { typ: "volba", lekcia: "php-1-2", otazka: "Čo vypíše <code>echo \"A\" . 1 + 2;</code>? (v PHP 8 má + prednosť pred .)", moznosti: ["A3", "A12", "3A", "chybu"], spravna: 0, vysvetlenie: "Najprv 1 + 2 = 3, potom spojenie." },
    { typ: "volba", lekcia: "php-1-3", otazka: "Ktorý zápis je komentár v PHP?", moznosti: ["<code># text</code>", "<code>-- text</code>", "<code>' text</code>", "<code>% text</code>"], spravna: 0, vysvetlenie: "#, // aj /* */" },
    { typ: "volba", lekcia: "php-1-5", otazka: "Čo vypíše <code>echo intdiv(7, 2);</code>?", moznosti: ["3", "3.5", "4", "1"], spravna: 0, vysvetlenie: "Celočíselné delenie." },
    { typ: "doplnenie", lekcia: "php-1-2", otazka: "Doplň:", sablona: '[[0]]meno = "Eva";\necho "Ahoj " [[1]] [[0]]meno;', zetony: ["$", ".", "+", "&", "#"], spravne: ["$", "."], vysvetlenie: "$meno a spájanie bodkou." },
  ];

  K.registrujModul("php", { cislo: 1, nazov: "Prvý skript", popis: "echo, premenné, spájanie textu, komentáre, chyby a počítanie.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
