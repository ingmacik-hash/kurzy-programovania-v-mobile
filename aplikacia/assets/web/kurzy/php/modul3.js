/* PHP · Modul 3 · Podmienky a cykly */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "php"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "php", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "<?php\n\n" + telo + "\n"; }

  var L1 = { id: "php-3-1", nazov: "if, elseif, else", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Rozhodovanie",
      text: UKAZ('<?php\n\n$body = 72;\nif ($body >= 90) {\n    echo "Výborne\\n";\n} elseif ($body >= 50) {\n    echo "Prešiel si\\n";\n} else {\n    echo "Neprešiel si\\n";\n}', "Prešiel si"),
      podrobne: "<p>V PHP sa píše <code>elseif</code> spolu. Porovnania: <code>==</code> (rovná sa po prevode typov), <code>===</code> (rovná sa aj typ), <code>!=</code>, <code>!==</code>. Odporúča sa používať <code>===</code>: <code>\"5\" == 5</code> je true, ale <code>\"5\" === 5</code> je false.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>\"10\" === 10</code>?", moznosti: ["false", "true", "10", "chybu"], spravna: 0, vysvetlenie: "Iný typ: text vs. číslo." },
    { typ: "kod", zadanie: "Načítaj teplotu (vstup <b>-3</b>) a vypíš <b>Mrzne</b> (pod 0), <b>Chladno</b> (0 až 14) alebo <b>Teplo</b> (15 a viac).",
      karty: ["php"], vstup: "-3", start: { php: kostra("$t = (int)trim(fgets(STDIN));\n") }, vyska: "200px",
      napoveda: 'if ($t < 0) { echo "Mrzne\\n"; } elseif ($t < 15) { … } else { … }', riesenie: { php: kostra('$t = (int)trim(fgets(STDIN));\nif ($t < 0) {\n    echo "Mrzne\\n";\n} elseif ($t < 15) {\n    echo "Chladno\\n";\n} else {\n    echo "Teplo\\n";\n}') },
      kontrola: function (v, kod) { if (!/elseif|else\s+if/.test(kod)) return "Použi elseif."; return r(v)[0] === "Mrzne" ? null : "Pre -3 má vypísať Mrzne."; },
      vysvetlenie: "Podmienky sa skúšajú zhora." },
  ] };

  var L2 = { id: "php-3-2", nazov: "match a logika", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "match (PHP 8)",
      text: UKAZ('<?php\n\n$den = 6;\n$typ = match ($den) {\n    1, 2, 3, 4, 5 => "pracovný deň",\n    6, 7 => "víkend",\n    default => "neplatný deň",\n};\necho $typ, "\\n";\n\n$vek = 16; $listok = true;\nif ($vek >= 15 && $listok) echo "Vstup povolený\\n";', "víkend\nVstup povolený"),
      podrobne: "<p><code>match</code> vráti hodnotu prvej vetvy, ktorá sedí, a porovnáva prísne (===). Logické operátory: <code>&amp;&amp;</code>, <code>||</code>, <code>!</code>. Krátky if: <code>$x = $vek &gt;= 18 ? \"dospelý\" : \"dieťa\";</code></p>" },
    { typ: "volba", otazka: "Čo spraví match, keď nesedí žiadna vetva a chýba default?", moznosti: ["Vyhodí chybu UnhandledMatchError", "Vráti null", "Vráti 0", "Nič"], spravna: 0, vysvetlenie: "Preto dávaj default." },
    { typ: "kod", zadanie: "Načítaj kód krajiny (vstup <b>CZ</b>) a cez <code>match</code> vypíš menu: SK, DE, AT → <b>euro</b>, CZ → <b>koruna</b>, HU → <b>forint</b>, inak <b>neznáma</b>.",
      karty: ["php"], vstup: "CZ", start: { php: kostra("$kod = trim(fgets(STDIN));\n") }, vyska: "200px",
      napoveda: '$mena = match ($kod) { "SK", "DE", "AT" => "euro", "CZ" => "koruna", "HU" => "forint", default => "neznáma" };', riesenie: { php: kostra('$kod = trim(fgets(STDIN));\n$mena = match ($kod) {\n    "SK", "DE", "AT" => "euro",\n    "CZ" => "koruna",\n    "HU" => "forint",\n    default => "neznáma",\n};\necho $mena, "\\n";') },
      kontrola: function (v, kod) { if (!/match\s*\(/.test(kod)) return "Použi match."; return r(v)[0] === "koruna" ? null : "Pre CZ má vypísať koruna."; },
      vysvetlenie: "match je stručný a bezpečný." },
  ] };

  var L3 = { id: "php-3-3", nazov: "for a while", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Cykly",
      text: UKAZ('<?php\n\nfor ($i = 1; $i <= 5; $i++) {\n    echo $i, " ";\n}\necho "\\n";\n$n = 1;\nwhile ($n < 100) {\n    $n *= 3;\n}\necho $n, "\\n";', "1 2 3 4 5 \n243"),
      podrobne: "<p>Rovnaké ako v C či Jave, len premenné majú <code>$</code>. <code>break</code> ukončí cyklus, <code>continue</code> preskočí krok.</p>" },
    { typ: "volba", otazka: "Koľkokrát prebehne <code>for ($i = 0; $i &lt; 10; $i += 3)</code>?", moznosti: ["4", "3", "10", "5"], spravna: 0, vysvetlenie: "0, 3, 6, 9." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>5</b>) a vypíš násobilku n: riadky <b>5 x 1 = 5</b> až <b>5 x 10 = 50</b>.",
      karty: ["php"], vstup: "5", start: { php: kostra("$n = (int)trim(fgets(STDIN));\n") }, vyska: "150px",
      napoveda: 'for ($i = 1; $i <= 10; $i++) echo "$n x $i = " . ($n * $i) . "\\n";', riesenie: { php: kostra('$n = (int)trim(fgets(STDIN));\nfor ($i = 1; $i <= 10; $i++) {\n    echo "$n x $i = " . ($n * $i) . "\\n";\n}') },
      kontrola: function (v, kod) { if (!/for\s*\(|while\s*\(/.test(kod)) return "Použi cyklus."; var l = r(v); if (l.length !== 10) return "Má byť 10 riadkov."; for (var i = 1; i <= 10; i++) if (l[i - 1] !== "5 x " + i + " = " + 5 * i) return "Riadok " + i + " má byť 5 x " + i + " = " + 5 * i; return null; },
      vysvetlenie: "Desať riadkov, jeden cyklus." },
  ] };

  var L4 = { id: "php-3-4", nazov: "foreach", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Prechod poľom",
      text: UKAZ('<?php\n\n$ovocie = ["jablko", "hruška", "slivka"];\nforeach ($ovocie as $o) {\n    echo "- $o\\n";\n}\nforeach ($ovocie as $i => $o) {\n    echo ($i + 1) . ". $o\\n";\n}', "- jablko\n- hruška\n- slivka\n1. jablko\n2. hruška\n3. slivka"),
      podrobne: "<p><code>foreach</code> je v PHP najpoužívanejší cyklus. Zápis <code>$kluc =&gt; $hodnota</code> dá aj index (alebo kľúč pri asociatívnom poli, viac v ďalšom module).</p>" },
    { typ: "volba", otazka: "Čo je <code>$i</code> v <code>foreach ($pole as $i =&gt; $x)</code>?", moznosti: ["Index (kľúč) prvku", "Hodnota prvku", "Počet prvkov", "Nič"], spravna: 0, vysvetlenie: "Kľúč => hodnota." },
    { typ: "kod", zadanie: "Načítaj známky v jednom riadku (vstup <b>1 3 2 5 1</b>), cez foreach spočítaj súčet a počet jednotiek. Vypíš <b>Súčet: 12, jednotiek: 2</b>.",
      karty: ["php"], vstup: "1 3 2 5 1", start: { php: kostra('$znamky = explode(" ", trim(fgets(STDIN)));\n') }, vyska: "180px",
      napoveda: '$s = 0; $j = 0; foreach ($znamky as $z) { $s += (int)$z; if ((int)$z === 1) $j++; }', riesenie: { php: kostra('$znamky = explode(" ", trim(fgets(STDIN)));\n$s = 0;\n$j = 0;\nforeach ($znamky as $z) {\n    $s += (int)$z;\n    if ((int)$z === 1) $j++;\n}\necho "Súčet: $s, jednotiek: $j\\n";') },
      kontrola: function (v, kod) { if (!/foreach/.test(kod)) return "Použi foreach."; return r(v)[0] === "Súčet: 12, jednotiek: 2" ? null : "Výstup má byť Súčet: 12, jednotiek: 2"; },
      vysvetlenie: "explode dáva texty, preto (int)." },
  ] };

  var L5 = { id: "php-3-5", nazov: "Vnorené cykly a HTML", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "PHP generuje HTML",
      text: "<p>Na webe PHP najčastejšie skladá HTML. Napríklad tabuľku z cyklov:</p>" + UKAZ('<?php\n\necho "<table>\\n";\nfor ($r = 1; $r <= 2; $r++) {\n    echo "  <tr>";\n    for ($s = 1; $s <= 3; $s++) {\n        echo "<td>" . ($r * $s) . "</td>";\n    }\n    echo "</tr>\\n";\n}\necho "</table>\\n";', "<table>\n  <tr><td>1</td><td>2</td><td>3</td></tr>\n  <tr><td>2</td><td>4</td><td>6</td></tr>\n</table>"),
      podrobne: "<p>Prehliadač dostane len výsledné HTML, kód PHP nikdy neuvidí. Tak funguje každý e-shop: zoznam produktov z databázy sa v cykle premení na HTML.</p>" },
    { typ: "volba", otazka: "Čo uvidí návštevník stránky, ak si zobrazí jej zdrojový kód?", moznosti: ["Len výsledné HTML", "Kód PHP", "HTML aj PHP", "Nič"], spravna: 0, vysvetlenie: "PHP beží na serveri." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>3</b>) a vygeneruj HTML zoznam položiek: <code>&lt;ul&gt;</code>, potom n riadkov <code>&lt;li&gt;Položka 1&lt;/li&gt;</code> … a <code>&lt;/ul&gt;</code>, každé na samostatnom riadku.",
      karty: ["php"], vstup: "3", start: { php: kostra("$n = (int)trim(fgets(STDIN));\n") }, vyska: "160px",
      napoveda: 'echo "<ul>\\n"; for ($i = 1; $i <= $n; $i++) echo "<li>Položka $i</li>\\n"; echo "</ul>\\n";', riesenie: { php: kostra('$n = (int)trim(fgets(STDIN));\necho "<ul>\\n";\nfor ($i = 1; $i <= $n; $i++) {\n    echo "<li>Položka $i</li>\\n";\n}\necho "</ul>\\n";') },
      kontrola: function (v) { return r(v).join("|") === "<ul>|<li>Položka 1</li>|<li>Položka 2</li>|<li>Položka 3</li>|</ul>" ? null : "Výstup má byť <ul>, 3 riadky <li>Položka N</li> a </ul>."; },
      vysvetlenie: "Presne takto vznikajú zoznamy na weboch." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li><code>if</code>, <code>elseif</code>, <code>else</code>, <code>===</code>.</li><li><code>match</code>, <code>&amp;&amp;</code>, <code>||</code>, <code>? :</code>.</li><li><code>for</code>, <code>while</code>, <code>break</code>, <code>continue</code>.</li><li><code>foreach</code> s indexom.</li><li>Generovanie HTML v cykloch.</li></ul>", tip: "Ďalej funkcie a polia." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "php-3-1", otazka: "Ako sa v PHP píše „inak ak“?", moznosti: ["elseif", "elif", "else if je jediná možnosť", "elsif"], spravna: 0, vysvetlenie: "elseif (funguje aj else if)." },
    { typ: "volba", lekcia: "php-3-1", otazka: "Čo vráti <code>0 == \"a\"</code> v PHP 8?", moznosti: ["false", "true", "chybu", "0"], spravna: 0, vysvetlenie: "PHP 8 to už nepovažuje za rovnaké. Napriek tomu používaj ===." },
    { typ: "volba", lekcia: "php-3-2", otazka: "Ako porovnáva match?", moznosti: ["Prísne (===)", "Voľne (==)", "Len čísla", "Len texty"], spravna: 0, vysvetlenie: "Bez prevodu typov." },
    { typ: "volba", lekcia: "php-3-3", otazka: "Ktorý príkaz ukončí cyklus?", moznosti: ["break", "continue", "exit_loop", "stop"], spravna: 0, vysvetlenie: "break." },
    { typ: "volba", lekcia: "php-3-4", otazka: "Ako prejdeš pole <code>$a</code>?", moznosti: ["<code>foreach ($a as $x)</code>", "<code>foreach ($x in $a)</code>", "<code>for ($x : $a)</code>", "<code>each $a</code>"], spravna: 0, vysvetlenie: "foreach (pole as prvok)." },
    { typ: "volba", lekcia: "php-3-5", otazka: "Kde sa vykoná PHP kód webovej stránky?", moznosti: ["Na serveri", "V prehliadači", "V tlačiarni", "V databáze"], spravna: 0, vysvetlenie: "Prehliadač dostane HTML." },
    { typ: "doplnenie", lekcia: "php-3-4", otazka: "Doplň:", sablona: "foreach ($mena [[0]] $i [[1]] $m) {\n    echo \"$i: $m\";\n}", zetony: ["as", "=>", "in", "->", ":"], spravne: ["as", "=>"], vysvetlenie: "foreach ($pole as $kluc => $hodnota)" },
  ];

  K.registrujModul("php", { cislo: 3, nazov: "Podmienky a cykly", popis: "if/elseif, match, for, while, foreach a generovanie HTML.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
