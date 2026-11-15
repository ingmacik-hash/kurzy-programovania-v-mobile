/* PHP · Modul 2 · Typy, vstup a text */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "php"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "php", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "<?php\n\n" + telo + "\n"; }

  var L1 = { id: "php-2-1", nazov: "Typy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "PHP si typ určí samo",
      text: UKAZ('<?php\n\nvar_dump(42);\nvar_dump(3.14);\nvar_dump("Ahoj");\nvar_dump(true);\nvar_dump(null);\nvar_dump("5" + 3);', 'int(42)\nfloat(3.14)\nstring(4) "Ahoj"\nbool(true)\nNULL\nint(8)'),
      podrobne: "<p><code>var_dump</code> ukáže typ aj hodnotu, hodí sa pri hľadaní chýb. PHP vie text „5“ automaticky prerobiť na číslo. Je to pohodlné, ale zradné: <code>\"5 jabĺk\" + 3</code> dá 8 a upozornenie. Bezpečnejšie je prevádzať výslovne: <code>(int)\"42\"</code>, <code>(float)\"2.5\"</code>.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>var_dump(10 / 4);</code>?", moznosti: ["float(2.5)", "int(2)", "int(3)", "string(3) \"2.5\""], spravna: 0, vysvetlenie: "Delenie, ktoré nevyjde celé, je float." },
    { typ: "kod", zadanie: "Prever typ: vytvor <code>$cena = \"19.90\"</code> (text), preveď ju na číslo <code>(float)</code>, vynásob dvomi a vypíš <b>39.8</b>.",
      karty: ["php"], start: { php: kostra('$cena = "19.90";\n') }, vyska: "140px",
      napoveda: "echo (float)$cena * 2, \"\\n\";", riesenie: { php: kostra('$cena = "19.90";\n$cislo = (float)$cena;\necho $cislo * 2, "\\n";') },
      kontrola: function (v, kod) { if (!/\(float\)|floatval/.test(kod)) return "Preveď text na číslo cez (float)."; return r(v)[0] === "39.8" ? null : "Výstup má byť 39.8"; },
      vysvetlenie: "Výslovný prevod je čitateľnejší." },
  ] };

  var L2 = { id: "php-2-2", nazov: "Vstup", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Čítanie zo vstupu",
      text: "<p>Na webe prichádzajú údaje z formulárov. V našom skripte ich čítame zo vstupu: <code>fgets(STDIN)</code> vráti jeden riadok a <code>trim</code> odstráni medzery a nový riadok na konci:</p>" + UKAZ('<?php\n\n$meno = trim(fgets(STDIN));\n$vek = (int)trim(fgets(STDIN));\necho "$meno, o rok budeš mať " . ($vek + 1) . ".\\n";', "Jana, o rok budeš mať 16."),
      podrobne: "<p>Viac čísel v riadku rozdelíš cez <code>explode(\" \", $riadok)</code>: vznikne pole textov. Na webe by si namiesto fgets čítal <code>$_POST['meno']</code> z formulára.</p>" },
    { typ: "volba", otazka: "Prečo sa používa <code>trim(fgets(STDIN))</code>?", moznosti: ["fgets vráti riadok aj so znakom nového riadku, trim ho odstráni", "trim zmení text na číslo", "Je to povinné pre echo", "fgets bez trim nefunguje"], spravna: 0, vysvetlenie: "Inak by „Jana\\n“ nesedelo s „Jana“." },
    { typ: "kod", zadanie: "Na vstupe sú dve čísla v jednom riadku (<b>12 5</b>). Rozdeľ ich cez <code>explode</code> a vypíš <b>12 + 5 = 17</b>.",
      karty: ["php"], vstup: "12 5", start: { php: kostra("$riadok = trim(fgets(STDIN));\n") }, vyska: "160px",
      napoveda: '[$a, $b] = explode(" ", $riadok);  echo "$a + $b = " . ($a + $b) . "\\n";', riesenie: { php: kostra('$riadok = trim(fgets(STDIN));\n[$a, $b] = explode(" ", $riadok);\n$a = (int)$a;\n$b = (int)$b;\necho "$a + $b = " . ($a + $b) . "\\n";') },
      kontrola: function (v, kod) { if (!/explode/.test(kod)) return "Rozdeľ riadok cez explode."; return r(v)[0] === "12 + 5 = 17" ? null : "Výstup má byť 12 + 5 = 17"; },
      vysvetlenie: "[$a, $b] = … rozbalí pole do dvoch premenných." },
  ] };

  var L3 = { id: "php-2-3", nazov: "Funkcie na text", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Práca s textom a diakritikou",
      text: P.tabulka(["Funkcia", "Výsledok pre \"Žilina\""], [["<code>strlen($s)</code>", "7 (bajty! Ž zaberá 2)"], ["<code>mb_strlen($s)</code>", "6 (znaky)"], ["<code>mb_strtoupper($s)</code>", "ŽILINA"], ["<code>str_replace(\"a\", \"o\", $s)</code>", "Žilino"], ["<code>str_repeat(\"-\", 5)</code>", "-----"], ["<code>mb_substr($s, 0, 3)</code>", "Žil"], ["<code>str_contains($s, \"lin\")</code>", "true"]]),
      podrobne: "<p>Funkcie s predponou <code>mb_</code> (multibyte) správne počítajú slovenské znaky s diakritikou. Bežné <code>strlen</code> a <code>strtoupper</code> pracujú s bajtmi a pri diakritike robia chyby.</p>" },
    { typ: "volba", otazka: "Ktorá funkcia správne spočíta znaky v slove „čučoriedka“?", moznosti: ["<code>mb_strlen</code>", "<code>strlen</code>", "<code>count</code>", "<code>length</code>"], spravna: 0, vysvetlenie: "mb_ = správne pre diakritiku." },
    { typ: "kod", zadanie: "Načítaj meno mesta (vstup <b>Košice</b>) a vypíš ho veľkými písmenami a počet znakov: <b>KOŠICE (6 znakov)</b>. Použi mb_ funkcie.",
      karty: ["php"], vstup: "Košice", start: { php: kostra("$mesto = trim(fgets(STDIN));\n") }, vyska: "140px",
      napoveda: 'echo mb_strtoupper($mesto) . " (" . mb_strlen($mesto) . " znakov)\\n";', riesenie: { php: kostra('$mesto = trim(fgets(STDIN));\necho mb_strtoupper($mesto) . " (" . mb_strlen($mesto) . " znakov)\\n";') },
      kontrola: function (v, kod) { if (!/mb_strlen/.test(kod)) return "Použi mb_strlen, aby sa Š počítalo ako jeden znak."; return r(v)[0] === "KOŠICE (6 znakov)" ? null : "Výstup má byť KOŠICE (6 znakov)"; },
      vysvetlenie: "S obyčajným strlen by vyšlo 7." },
  ] };

  var L4 = { id: "php-2-4", nazov: "Formátovanie čísel", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "round, number_format a printf",
      text: UKAZ('<?php\n\n$cena = 1234.5678;\necho round($cena, 2), "\\n";\necho number_format($cena, 2), "\\n";\necho number_format($cena, 2, ",", " "), " €\\n";\nprintf("%.1f %%\\n", 45.678);\necho sprintf("%05d", 42), "\\n";', "1234.57\n1,234.57\n1 234,57 €\n45.7 %\n00042"),
      podrobne: "<p><code>number_format(číslo, miesta, desatinný oddeľovač, oddeľovač tisícov)</code> je ideálne na ceny po slovensky. <code>printf</code> a <code>sprintf</code> používajú formáty ako v C (<code>%d</code>, <code>%.2f</code>, <code>%s</code>).</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>echo number_format(2.5, 2, \",\", \" \");</code>?", moznosti: ["2,50", "2.50", "2,5", "3"], spravna: 0, vysvetlenie: "Dve miesta, čiarka ako oddeľovač." },
    { typ: "kod", zadanie: "Načítaj cenu bez DPH (vstup <b>1250</b>) a vypíš cenu s 20 % DPH po slovensky: <b>Cena s DPH: 1 500,00 €</b>.",
      karty: ["php"], vstup: "1250", start: { php: kostra("$cena = (float)trim(fgets(STDIN));\n") }, vyska: "150px",
      napoveda: 'echo "Cena s DPH: " . number_format($cena * 1.2, 2, ",", " ") . " €\\n";', riesenie: { php: kostra('$cena = (float)trim(fgets(STDIN));\necho "Cena s DPH: " . number_format($cena * 1.2, 2, ",", " ") . " €\\n";') },
      kontrola: function (v, kod) { if (!/number_format/.test(kod)) return "Použi number_format."; return r(v)[0] === "Cena s DPH: 1 500,00 €" ? null : "Výstup má byť Cena s DPH: 1 500,00 €"; },
      vysvetlenie: "Medzera ako oddeľovač tisícov, čiarka pred desatinami." },
  ] };

  var L5 = { id: "php-2-5", nazov: "Konštanty a matematika", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "const a matematické funkcie",
      text: KOD('<?php\n\nconst DPH = 0.2;          // konštanta (bez $)\necho sqrt(16), "\\n";     // 4\necho max(3, 9, 5), "\\n"; // 9\necho abs(-7), "\\n";      // 7\necho M_PI, "\\n";         // 3.1415926535898\necho rand(1, 6), "\\n";   // náhodné 1 až 6\n$x = 5;\n$x += 3;\n$x++;                     // 9'),
      podrobne: "<p>Konštanty sa píšu bez <code>$</code> a podľa zvyku veľkými písmenami. Funkcie ako sqrt, max, round či rand sú v PHP vždy k dispozícii, netreba nič importovať.</p>" },
    { typ: "volba", otazka: "Ako použiješ konštantu DPH?", moznosti: ["<code>DPH</code>", "<code>$DPH</code>", "<code>const.DPH</code>", "<code>#DPH</code>"], spravna: 0, vysvetlenie: "Bez $." },
    { typ: "kod", zadanie: "Načítaj odvesny (vstup <b>6 8</b>) a vypíš dĺžku prepony: <b>Prepona: 10</b>. Použi sqrt.",
      karty: ["php"], vstup: "6 8", start: { php: kostra('[$a, $b] = explode(" ", trim(fgets(STDIN)));\n') }, vyska: "140px",
      napoveda: 'echo "Prepona: " . sqrt($a * $a + $b * $b) . "\\n";', riesenie: { php: kostra('[$a, $b] = explode(" ", trim(fgets(STDIN)));\necho "Prepona: " . sqrt($a * $a + $b * $b) . "\\n";') },
      kontrola: function (v, kod) { if (!/sqrt/.test(kod)) return "Použi sqrt."; return r(v)[0] === "Prepona: 10" ? null : "Výstup má byť Prepona: 10"; },
      vysvetlenie: "√(36 + 64) = 10." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li>Typy int, float, string, bool, null a <code>var_dump</code>.</li><li>Prevody <code>(int)</code>, <code>(float)</code>.</li><li><code>fgets(STDIN)</code>, <code>trim</code>, <code>explode</code>.</li><li>mb_ funkcie pre diakritiku.</li><li><code>number_format</code>, <code>printf</code>, <code>const</code>.</li></ul>", tip: "Ďalej podmienky a cykly." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "php-2-1", otazka: "Ktorá funkcia vypíše typ aj hodnotu?", moznosti: ["var_dump", "echo", "print", "typeof"], spravna: 0, vysvetlenie: "var_dump." },
    { typ: "volba", lekcia: "php-2-2", otazka: "Čo spraví <code>explode(\",\", \"a,b,c\")</code>?", moznosti: ["Vytvorí pole [\"a\", \"b\", \"c\"]", "Spojí texty", "Zmaže čiarky", "Spočíta čiarky"], spravna: 0, vysvetlenie: "Rozdelí text podľa oddeľovača." },
    { typ: "volba", lekcia: "php-2-3", otazka: "Čo vráti <code>mb_strlen(\"čaj\")</code>?", moznosti: ["3", "4", "2", "6"], spravna: 0, vysvetlenie: "Tri znaky." },
    { typ: "volba", lekcia: "php-2-3", otazka: "Čo vráti <code>str_repeat(\"ab\", 3)</code>?", moznosti: ["ababab", "ab3", "aaabbb", "chybu"], spravna: 0, vysvetlenie: "Zopakuje text." },
    { typ: "volba", lekcia: "php-2-4", otazka: "Ktorý formát v printf vypíše číslo na 2 desatinné miesta?", moznosti: ["%.2f", "%d", "%2", "%s"], spravna: 0, vysvetlenie: "%.2f" },
    { typ: "volba", lekcia: "php-2-5", otazka: "Čo vypíše <code>echo max(4, 11, 7);</code>?", moznosti: ["11", "4", "7", "22"], spravna: 0, vysvetlenie: "Najväčšie." },
    { typ: "doplnenie", lekcia: "php-2-2", otazka: "Načítaj celé číslo:", sablona: "$x = (int)[[0]](fgets([[1]]));", zetony: ["trim", "STDIN", "strip", "input", "STDOUT"], spravne: ["trim", "STDIN"], vysvetlenie: "(int)trim(fgets(STDIN))" },
  ];

  K.registrujModul("php", { cislo: 2, nazov: "Typy, vstup a text", popis: "Typy, prevody, vstup, funkcie na text a formátovanie čísel.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
