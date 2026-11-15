/* PHP · Záverečné projekty */
(function () {
  var P = K.pom;
  function r(v) { return P.riadky(v); }
  function ma(v, x) { return r(v).indexOf(x) >= 0; }

  K.registrujZaver("php", [
    { id: "php-p1", nazov: "Faktúra", minut: 30,
      popis: "Malá firma potrebuje z položiek objednávky vytlačiť faktúru so sumami po slovensky a s DPH.",
      zadanie: "Riadky vstupu majú tvar <code>názov;množstvo;cena za kus</code>, kým nepríde prázdny riadok alebo koniec vstupu. Napíš funkciu <code>function suma(float $c): string</code>, ktorá vráti sumu vo formáte <code>1 234,50 €</code> (number_format). Pre každú položku vypíš <code>názov: množstvo x cena = spolu</code> (cena a spolu cez suma()). Potom:<pre class=\"kod\">Klávesnica: 2 x 34,50 € = 69,00 €\nMonitor: 1 x 1 179,00 € = 1 179,00 €\nKábel HDMI: 3 x 8,90 € = 26,70 €\nZáklad: 1 274,70 €\nDPH 20 %: 254,94 €\nSpolu: 1 529,64 €</pre>",
      karty: ["php"], vstup: "Klávesnica;2;34.50\nMonitor;1;1179\nKábel HDMI;3;8.90", start: { php: "<?php\n\n" },
      napoveda: "while (($riadok = fgets(STDIN)) !== false) { $riadok = trim($riadok); if ($riadok === \"\") break; [$nazov, $mn, $cena] = explode(\";\", $riadok); … }  suma: number_format($c, 2, \",\", \" \") . \" €\"",
      kriteria: [
        { text: "Riadky položiek so sumami po slovensky", body: 3, test: function (v) { return ma(v, "Klávesnica: 2 x 34,50 € = 69,00 €") && ma(v, "Kábel HDMI: 3 x 8,90 € = 26,70 €"); } },
        { text: "Oddeľovač tisícov (1 179,00 €)", body: 1, test: function (v) { return ma(v, "Monitor: 1 x 1 179,00 € = 1 179,00 €"); } },
        { text: "Základ", body: 1, test: function (v) { return ma(v, "Základ: 1 274,70 €"); } },
        { text: "DPH 20 %", body: 2, test: function (v) { return ma(v, "DPH 20 %: 254,94 €"); } },
        { text: "Celková suma", body: 2, test: function (v) { return ma(v, "Spolu: 1 529,64 €"); } },
        { text: "Funkcia suma() s number_format", body: 2, test: function (v, s) { return /function\s+suma\s*\(/.test(s.php) && /number_format/.test(s.php); } },
      ],
      riesenie: { php: '<?php\n\nfunction suma(float $c): string {\n    return number_format($c, 2, ",", " ") . " €";\n}\n\n$zaklad = 0;\nwhile (($riadok = fgets(STDIN)) !== false) {\n    $riadok = trim($riadok);\n    if ($riadok === "") break;\n    [$nazov, $mn, $cena] = explode(";", $riadok);\n    $spolu = (int)$mn * (float)$cena;\n    $zaklad += $spolu;\n    echo "$nazov: $mn x " . suma((float)$cena) . " = " . suma($spolu) . "\\n";\n}\n$dph = round($zaklad * 0.2, 2);\necho "Základ: " . suma($zaklad) . "\\n";\necho "DPH 20 %: " . suma($dph) . "\\n";\necho "Spolu: " . suma($zaklad + $dph) . "\\n";\n' } },

    { id: "php-p2", nazov: "Kontrola formulára", minut: 30,
      popis: "Registračný formulár na tábor: PHP skontroluje údaje, vypíše chyby a bezpečne zobrazí správu od používateľa.",
      zadanie: "Údaje z formulára prichádzajú ako riadky <code>kľúč=hodnota</code> (meno, email, vek, sprava). Ulož ich do asociatívneho pola <code>$form</code>. Skontroluj: meno nesmie byť prázdne, email musí byť platný (filter_var), vek je celé číslo od 10 do 18, správa má najviac 100 znakov (mb_strlen). Ak sú chyby, vypíš <code>Chyby:</code> a pod tým každú chybu ako <code>- …</code>, inak <code>Registrácia úspešná</code>. Nakoniec vždy vypíš <code>Správa: …</code> bezpečne cez htmlspecialchars.<pre class=\"kod\">Chyby:\n- Neplatný e-mail\n- Vek musí byť od 10 do 18\nSpráva: Teším sa &lt;b&gt;veľmi&lt;/b&gt;!</pre>",
      karty: ["php"], vstup: "meno=Jana\nemail=jana@\nvek=21\nsprava=Teším sa <b>veľmi</b>!", start: { php: "<?php\n\n$form = [];\n" },
      napoveda: "while (($r = fgets(STDIN)) !== false) { [$k, $v] = explode(\"=\", trim($r), 2); $form[$k] = $v; }  Chyby zbieraj do poľa $chyby[] = \"…\".",
      kriteria: [
        { text: "Údaje sa uložia do asociatívneho poľa", body: 1, test: function (v, s) { return /\$form\s*\[\s*\$\w+\s*\]\s*=/.test(s.php); } },
        { text: "Neplatný e-mail sa zachytí", body: 2, test: function (v) { return ma(v, "- Neplatný e-mail"); } },
        { text: "Vek mimo rozsahu sa zachytí", body: 2, test: function (v) { return ma(v, "- Vek musí byť od 10 do 18"); } },
        { text: "Platné meno a správa nie sú hlásené ako chyba", body: 1, test: function (v) { return r(v).filter(function (x) { return /^- /.test(x); }).length === 2; } },
        { text: "Hlavička Chyby: a nie Registrácia úspešná", body: 1, test: function (v) { return r(v)[0] === "Chyby:" && !ma(v, "Registrácia úspešná"); } },
        { text: "Správa je vypísaná bezpečne (htmlspecialchars)", body: 3, test: function (v, s) { return ma(v, "Správa: Teším sa &lt;b&gt;veľmi&lt;/b&gt;!") && /htmlspecialchars/.test(s.php); } },
        { text: "Použité filter_var a mb_strlen", body: 1, test: function (v, s) { return /filter_var/.test(s.php) && /mb_strlen/.test(s.php); } },
      ],
      riesenie: { php: '<?php\n\n$form = [];\nwhile (($riadok = fgets(STDIN)) !== false) {\n    $riadok = trim($riadok);\n    if ($riadok === "") continue;\n    [$kluc, $hodnota] = explode("=", $riadok, 2);\n    $form[$kluc] = $hodnota;\n}\n\n$chyby = [];\nif (trim($form["meno"] ?? "") === "") $chyby[] = "Meno je povinné";\nif (!filter_var($form["email"] ?? "", FILTER_VALIDATE_EMAIL)) $chyby[] = "Neplatný e-mail";\n$vek = filter_var($form["vek"] ?? "", FILTER_VALIDATE_INT);\nif ($vek === false || $vek < 10 || $vek > 18) $chyby[] = "Vek musí byť od 10 do 18";\nif (mb_strlen($form["sprava"] ?? "") > 100) $chyby[] = "Správa je príliš dlhá";\n\nif ($chyby) {\n    echo "Chyby:\\n";\n    foreach ($chyby as $ch) echo "- $ch\\n";\n} else {\n    echo "Registrácia úspešná\\n";\n}\necho "Správa: " . htmlspecialchars($form["sprava"] ?? "") . "\\n";\n' } },

    { id: "php-p3", nazov: "Výsledky ankety", minut: 30,
      popis: "Škola robila anketu, ktorý programovací jazyk sa žiaci chcú učiť. Hlasy prišli ako JSON z webovej aplikácie.",
      zadanie: "Na vstupe je JSON pole hlasov <code>[{\"meno\": …, \"jazyk\": …}, …]</code>. Vytvor triedu <code>Anketa</code> s metódou <code>pridaj(string $jazyk)</code> a metódou <code>vysledky(): array</code>, ktorá vráti počty zoradené od najväčšieho (arsort). Vypíš počet hlasov, potom riadky <code>jazyk: počet (percentá %)</code> s percentami zaokrúhlenými na celé číslo a nakoniec víťaza:<pre class=\"kod\">Hlasov: 8\nPython: 4 (50 %)\nJavaScript: 2 (25 %)\nC#: 1 (13 %)\nKotlin: 1 (13 %)\nVíťaz: Python</pre>Pri rovnakom počte nechaj poradie prvého hlasu.",
      karty: ["php"], vstup: '[{"meno":"Jana","jazyk":"Python"},{"meno":"Peter","jazyk":"JavaScript"},{"meno":"Eva","jazyk":"Python"},{"meno":"Tomáš","jazyk":"C#"},{"meno":"Lucia","jazyk":"Python"},{"meno":"Adam","jazyk":"JavaScript"},{"meno":"Ema","jazyk":"Kotlin"},{"meno":"Filip","jazyk":"Python"}]', start: { php: "<?php\n\nclass Anketa {\n    \n}\n\n$hlasy = json_decode(trim(fgets(STDIN)), true);\n" },
      napoveda: "V triede private array $pocty = []; pridaj: $this->pocty[$jazyk] = ($this->pocty[$jazyk] ?? 0) + 1; vysledky: $p = $this->pocty; arsort($p); return $p;  Percentá: round($pocet / $spolu * 100).",
      kriteria: [
        { text: "Počet hlasov", body: 1, test: function (v) { return ma(v, "Hlasov: 8"); } },
        { text: "Počty a percentá", body: 3, test: function (v) { return ma(v, "Python: 4 (50 %)") && ma(v, "JavaScript: 2 (25 %)") && ma(v, "C#: 1 (13 %)"); } },
        { text: "Zoradenie od najväčšieho", body: 2, test: function (v) { var l = r(v); return l[1] === "Python: 4 (50 %)" && l[2] === "JavaScript: 2 (25 %)"; } },
        { text: "Pri zhode ostáva poradie prvého hlasu (C# pred Kotlinom)", body: 1, test: function (v) { var l = r(v); return l.indexOf("C#: 1 (13 %)") >= 0 && l.indexOf("C#: 1 (13 %)") < l.indexOf("Kotlin: 1 (13 %)"); } },
        { text: "Víťaz", body: 1, test: function (v) { return ma(v, "Víťaz: Python"); } },
        { text: "Trieda Anketa s metódami pridaj a vysledky", body: 2, test: function (v, s) { return /class\s+Anketa/.test(s.php) && /function\s+pridaj\s*\(/.test(s.php) && /function\s+vysledky\s*\(/.test(s.php); } },
        { text: "Údaje sa čítajú cez json_decode", body: 1, test: function (v, s) { return /json_decode/.test(s.php); } },
      ],
      riesenie: { php: '<?php\n\nclass Anketa {\n    private array $pocty = [];\n\n    public function pridaj(string $jazyk): void {\n        $this->pocty[$jazyk] = ($this->pocty[$jazyk] ?? 0) + 1;\n    }\n\n    public function vysledky(): array {\n        $p = $this->pocty;\n        arsort($p);\n        return $p;\n    }\n}\n\n$hlasy = json_decode(trim(fgets(STDIN)), true);\n$anketa = new Anketa();\nforeach ($hlasy as $h) {\n    $anketa->pridaj($h["jazyk"]);\n}\n$spolu = count($hlasy);\necho "Hlasov: $spolu\\n";\n$vysledky = $anketa->vysledky();\nforeach ($vysledky as $jazyk => $pocet) {\n    echo "$jazyk: $pocet (" . round($pocet / $spolu * 100) . " %)\\n";\n}\necho "Víťaz: " . array_key_first($vysledky) . "\\n";\n' } },
  ]);
})();
