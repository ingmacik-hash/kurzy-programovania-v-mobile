/* PHP · Modul 4 · Funkcie a polia */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "php"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "php", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "<?php\n\n" + telo + "\n"; }

  var L1 = { id: "php-4-1", nazov: "Funkcie", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "function",
      text: UKAZ('<?php\n\nfunction stvorec(int $x): int {\n    return $x * $x;\n}\n\nfunction pozdrav(string $meno, string $pozdrav = "Ahoj"): string {\n    return "$pozdrav, $meno!";\n}\n\necho stvorec(9), "\\n";\necho pozdrav("Jana"), "\\n";\necho pozdrav("Peter", "Servus"), "\\n";', "81\nAhoj, Jana!\nServus, Peter!"),
      podrobne: "<p>Typy parametrov (<code>int $x</code>) a výsledku (<code>: int</code>) sú v PHP nepovinné, ale moderný kód ich používa: chyby sa ukážu skôr. Krátka funkcia: <code>$dvakrat = fn($x) =&gt; $x * 2;</code></p>" },
    { typ: "volba", otazka: "Čo znamená <code>: string</code> za zátvorkami funkcie?", moznosti: ["Funkcia vráti text", "Parameter je text", "Funkcia je komentár", "Nič"], spravna: 0, vysvetlenie: "Návratový typ." },
    { typ: "kod", zadanie: "Napíš funkciu <code>function jePrestupny(int $rok): bool</code>. Načítaj rok (vstup <b>2024</b>) a vypíš <b>2024 je prestupný</b> alebo <b>… nie je prestupný</b>.",
      karty: ["php"], vstup: "2024", start: { php: kostra("$rok = (int)trim(fgets(STDIN));\n") }, vyska: "220px",
      napoveda: "return ($rok % 4 === 0 && $rok % 100 !== 0) || $rok % 400 === 0;", riesenie: { php: kostra('function jePrestupny(int $rok): bool {\n    return ($rok % 4 === 0 && $rok % 100 !== 0) || $rok % 400 === 0;\n}\n\n$rok = (int)trim(fgets(STDIN));\necho $rok . (jePrestupny($rok) ? " je prestupný" : " nie je prestupný") . "\\n";') },
      kontrola: function (v, kod) { if (!/function\s+jePrestupny\s*\(/.test(kod)) return "Chýba funkcia jePrestupny."; return r(v)[0] === "2024 je prestupný" ? null : "Výstup má byť 2024 je prestupný"; },
      vysvetlenie: "Funkcia vracia bool, ? : vyberie text." },
  ] };

  var L2 = { id: "php-4-2", nazov: "Polia", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Indexované pole",
      text: UKAZ('<?php\n\n$body = [12, 7, 30];\n$body[] = 5;          // pridá na koniec\necho $body[0], "\\n";\necho count($body), "\\n";\necho array_sum($body), "\\n";\necho max($body), "\\n";\necho implode(", ", $body), "\\n";\nsort($body);\necho implode(" ", $body), "\\n";', "12\n4\n54\n30\n12, 7, 30, 5\n5 7 12 30"),
      podrobne: "<p>Pole v PHP rastie samo: <code>$pole[] = x</code> pridá prvok. <code>implode</code> spojí prvky do textu, <code>explode</code> robí opak. <code>print_r($pole)</code> vypíše pole na ladenie.</p>" },
    { typ: "volba", otazka: "Ako pridáš prvok na koniec poľa <code>$a</code>?", moznosti: ["<code>$a[] = 5;</code>", "<code>$a.push(5);</code>", "<code>$a += 5;</code>", "<code>add($a, 5);</code>"], spravna: 0, vysvetlenie: "Prázdne hranaté zátvorky." },
    { typ: "kod", zadanie: "Načítaj čísla v jednom riadku (vstup <b>8 3 12 5 1</b>), zoraď ich zostupne (<code>rsort</code>) a vypíš ich oddelené čiarkou a medzerou a pod to priemer: <b>12, 8, 5, 3, 1</b> a <b>Priemer: 5.8</b>.",
      karty: ["php"], vstup: "8 3 12 5 1", start: { php: kostra('$c = array_map("intval", explode(" ", trim(fgets(STDIN))));\n') }, vyska: "170px",
      napoveda: 'rsort($c); echo implode(", ", $c), "\\n"; echo "Priemer: " . array_sum($c) / count($c) . "\\n";', riesenie: { php: kostra('$c = array_map("intval", explode(" ", trim(fgets(STDIN))));\nrsort($c);\necho implode(", ", $c), "\\n";\necho "Priemer: " . array_sum($c) / count($c) . "\\n";') },
      kontrola: function (v, kod) { if (!/rsort/.test(kod)) return "Zoraď zostupne cez rsort."; return r(v).join("|") === "12, 8, 5, 3, 1|Priemer: 5.8" ? null : "Výstup má byť 12, 8, 5, 3, 1 a Priemer: 5.8"; },
      vysvetlenie: "array_map(\"intval\", …) previedol texty na čísla." },
  ] };

  var L3 = { id: "php-4-3", nazov: "Asociatívne polia", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Kľúč → hodnota",
      text: UKAZ('<?php\n\n$ziak = ["meno" => "Jana", "vek" => 15, "trieda" => "9.A"];\necho $ziak["meno"], "\\n";\n$ziak["mesto"] = "Nitra";\nforeach ($ziak as $kluc => $hodnota) {\n    echo "$kluc: $hodnota\\n";\n}\necho isset($ziak["email"]) ? "má e-mail" : "nemá e-mail", "\\n";', "Jana\nmeno: Jana\nvek: 15\ntrieda: 9.A\nmesto: Nitra\nnemá e-mail"),
      podrobne: "<p>Asociatívne pole je v PHP všade: údaje z formulára (<code>$_POST</code>), riadky z databázy aj JSON. <code>isset</code> zistí, či kľúč existuje. Pole polí je ako tabuľka: <code>$ziaci[0][\"meno\"]</code>.</p>" },
    { typ: "volba", otazka: "Ako zistíš, či pole <code>$a</code> má kľúč \"x\"?", moznosti: ["<code>isset($a[\"x\"])</code>", "<code>$a.has(\"x\")</code>", "<code>in_array(\"x\")</code>", "<code>$a[\"x\"] != null</code> je jediná možnosť"], spravna: 0, vysvetlenie: "isset (alebo array_key_exists)." },
    { typ: "kod", zadanie: "Máš cenník <code>$ceny = [\"chlieb\" => 1.2, \"mlieko\" => 0.9, \"syr\" => 2.5];</code> Načítaj nákup v jednom riadku (vstup <b>chlieb syr chlieb vajcia</b>). Spočítaj cenu známych položiek, neznáme vypíš ako <b>Nemáme: vajcia</b>. Na konci <b>Spolu: 4.9</b>.",
      karty: ["php"], vstup: "chlieb syr chlieb vajcia", start: { php: kostra('$ceny = ["chlieb" => 1.2, "mlieko" => 0.9, "syr" => 2.5];\n$nakup = explode(" ", trim(fgets(STDIN)));\n') }, vyska: "220px",
      napoveda: 'foreach ($nakup as $p) { if (isset($ceny[$p])) $spolu += $ceny[$p]; else echo "Nemáme: $p\\n"; }', riesenie: { php: kostra('$ceny = ["chlieb" => 1.2, "mlieko" => 0.9, "syr" => 2.5];\n$nakup = explode(" ", trim(fgets(STDIN)));\n$spolu = 0;\nforeach ($nakup as $p) {\n    if (isset($ceny[$p])) {\n        $spolu += $ceny[$p];\n    } else {\n        echo "Nemáme: $p\\n";\n    }\n}\necho "Spolu: " . round($spolu, 2) . "\\n";') },
      kontrola: function (v, kod) { if (!/isset|array_key_exists/.test(kod)) return "Over kľúč cez isset."; return r(v).join("|") === "Nemáme: vajcia|Spolu: 4.9" ? null : "Výstup má byť Nemáme: vajcia a Spolu: 4.9"; },
      vysvetlenie: "Cenník je typické asociatívne pole." },
  ] };

  var L4 = { id: "php-4-4", nazov: "array_map, array_filter", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Funkcie nad poľami",
      text: UKAZ('<?php\n\n$c = [5, 2, 9, 1, 7];\n$dvojnasobky = array_map(fn($x) => $x * 2, $c);\n$velke = array_filter($c, fn($x) => $x > 4);\necho implode(" ", $dvojnasobky), "\\n";\necho implode(" ", $velke), "\\n";\necho in_array(9, $c) ? "9 tam je" : "9 tam nie je", "\\n";\nusort($c, fn($a, $b) => $b <=> $a);\necho implode(" ", $c), "\\n";', "10 4 18 2 14\n5 9 7\n9 tam je\n9 7 5 2 1"),
      podrobne: "<p><code>fn($x) =&gt; …</code> je krátka anonymná funkcia. <code>&lt;=&gt;</code> (spaceship) vráti −1, 0 alebo 1 a hodí sa do usort na triedenie podľa vlastného pravidla.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>array_filter([1, 2, 3, 4], fn($x) =&gt; $x % 2 == 0)</code>?", moznosti: ["Prvky 2 a 4", "Prvky 1 a 3", "Súčet 6", "true"], spravna: 0, vysvetlenie: "Nechá párne." },
    { typ: "kod", zadanie: "Máš pole žiakov <code>[[\"meno\" =&gt; \"Jana\", \"body\" =&gt; 87], …]</code>. Cez <code>usort</code> ich zoraď podľa bodov zostupne a vypíš mená oddelené čiarkou: <b>Eva, Jana, Peter</b>.",
      karty: ["php"], start: { php: kostra('$ziaci = [\n    ["meno" => "Jana", "body" => 87],\n    ["meno" => "Peter", "body" => 64],\n    ["meno" => "Eva", "body" => 92],\n];\n') }, vyska: "220px",
      napoveda: 'usort($ziaci, fn($a, $b) => $b["body"] <=> $a["body"]); echo implode(", ", array_map(fn($z) => $z["meno"], $ziaci)), "\\n";', riesenie: { php: kostra('$ziaci = [\n    ["meno" => "Jana", "body" => 87],\n    ["meno" => "Peter", "body" => 64],\n    ["meno" => "Eva", "body" => 92],\n];\nusort($ziaci, fn($a, $b) => $b["body"] <=> $a["body"]);\necho implode(", ", array_map(fn($z) => $z["meno"], $ziaci)), "\\n";') },
      kontrola: function (v, kod) { if (!/usort/.test(kod)) return "Zoraď cez usort."; return r(v)[0] === "Eva, Jana, Peter" ? null : "Výstup má byť Eva, Jana, Peter"; },
      vysvetlenie: "Pole polí je ako tabuľka z databázy." },
  ] };

  var L5 = { id: "php-4-5", nazov: "JSON", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Údaje pre aplikácie",
      text: "<p>Webové služby (API) si posielajú údaje vo formáte <b>JSON</b>. PHP ho vie prečítať aj vytvoriť:</p>" + UKAZ('<?php\n\n$produkt = ["nazov" => "Myš", "cena" => 19.9, "skladom" => true];\necho json_encode($produkt), "\\n";\n\n$json = \'{"mesto":"Nitra","teplota":21}\';\n$data = json_decode($json, true);\necho $data["mesto"] . ": " . $data["teplota"] . " °C\\n";', '{"nazov":"My\\u0161","cena":19.9,"skladom":true}\nNitra: 21 °C'),
      podrobne: "<p><code>json_decode($text, true)</code> vráti asociatívne pole. <code>json_encode($pole, JSON_UNESCAPED_UNICODE)</code> nechá diakritiku čitateľnú. Takto PHP komunikuje s mobilnými aplikáciami a JavaScriptom.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>json_decode('{\"a\":1}', true)</code>?", moznosti: ["Pole [\"a\" => 1]", "Text", "Číslo 1", "null"], spravna: 0, vysvetlenie: "true = asociatívne pole." },
    { typ: "kod", zadanie: "Na vstupe je JSON so zoznamom objednávok (je pripravený). Vypíš počet objednávok a ich celkovú sumu: <b>3 objednávky, spolu 89.5 €</b>.",
      karty: ["php"], vstup: '[{"id":1,"suma":24.5},{"id":2,"suma":40},{"id":3,"suma":25}]', start: { php: kostra("$objednavky = json_decode(trim(fgets(STDIN)), true);\n") }, vyska: "160px",
      napoveda: '$spolu = array_sum(array_column($objednavky, "suma")); echo count($objednavky) . " objednávky, spolu $spolu €\\n";', riesenie: { php: kostra('$objednavky = json_decode(trim(fgets(STDIN)), true);\n$spolu = array_sum(array_column($objednavky, "suma"));\necho count($objednavky) . " objednávky, spolu $spolu €\\n";') },
      kontrola: function (v, kod) { if (!/json_decode/.test(kod)) return "Použi json_decode."; return r(v)[0] === "3 objednávky, spolu 89.5 €" ? null : "Výstup má byť 3 objednávky, spolu 89.5 €"; },
      vysvetlenie: "array_column vyberie jeden stĺpec z poľa polí." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li><code>function</code> s typmi a predvolenými hodnotami, <code>fn</code>.</li><li>Polia: <code>$a[] =</code>, count, array_sum, sort, implode.</li><li>Asociatívne polia, isset, foreach s kľúčom.</li><li>array_map, array_filter, usort, <code>&lt;=&gt;</code>.</li><li>JSON: json_encode a json_decode.</li></ul>", tip: "Posledný modul: triedy, objekty a bezpečnosť webu." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "php-4-1", otazka: "Ktorým slovom definuješ funkciu v PHP?", moznosti: ["function", "def", "fun", "func"], spravna: 0, vysvetlenie: "function." },
    { typ: "volba", lekcia: "php-4-2", otazka: "Ako zistíš počet prvkov poľa?", moznosti: ["<code>count($a)</code>", "<code>$a.length</code>", "<code>len($a)</code>", "<code>size($a)</code>"], spravna: 0, vysvetlenie: "count." },
    { typ: "volba", lekcia: "php-4-2", otazka: "Čo vráti <code>implode(\"-\", [1, 2, 3])</code>?", moznosti: ["\"1-2-3\"", "[1, 2, 3]", "6", "\"123\""], spravna: 0, vysvetlenie: "Spojí prvky." },
    { typ: "volba", lekcia: "php-4-3", otazka: "Ako zapíšeš pole s kľúčom meno a hodnotou Jana?", moznosti: ["<code>[\"meno\" =&gt; \"Jana\"]</code>", "<code>[\"meno\": \"Jana\"]</code>", "<code>{meno = \"Jana\"}</code>", "<code>(\"meno\", \"Jana\")</code>"], spravna: 0, vysvetlenie: "=>" },
    { typ: "volba", lekcia: "php-4-4", otazka: "Čo vráti <code>5 &lt;=&gt; 3</code>?", moznosti: ["1", "-1", "0", "true"], spravna: 0, vysvetlenie: "Ľavá strana je väčšia." },
    { typ: "volba", lekcia: "php-4-5", otazka: "Na čo slúži json_encode?", moznosti: ["Premení pole na text vo formáte JSON", "Zašifruje údaje", "Načíta súbor", "Vypíše HTML"], spravna: 0, vysvetlenie: "PHP → JSON." },
    { typ: "doplnenie", lekcia: "php-4-4", otazka: "Zdvojnásob prvky:", sablona: "$b = [[0]]([[1]]($x) => $x * 2, $a);", zetony: ["array_map", "fn", "array_filter", "function", "map"], spravne: ["array_map", "fn"], vysvetlenie: "array_map(fn($x) => …, $a)" },
  ];

  K.registrujModul("php", { cislo: 4, nazov: "Funkcie a polia", popis: "Funkcie, polia, asociatívne polia, array_map a JSON.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
