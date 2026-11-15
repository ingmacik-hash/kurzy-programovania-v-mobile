/* PHP · Modul 5 · Objekty a bezpečný web */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "php"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "php", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "<?php\n\n" + telo + "\n"; }

  var L1 = { id: "php-5-1", nazov: "Triedy a objekty", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "class a new",
      text: UKAZ('<?php\n\nclass Produkt {\n    public function __construct(\n        public string $nazov,\n        public float $cena,\n    ) {}\n\n    public function sDph(): float {\n        return round($this->cena * 1.2, 2);\n    }\n}\n\n$p = new Produkt("Myš", 19.9);\necho $p->nazov . ": " . $p->sDph() . " €\\n";', "Myš: 23.88 €"),
      podrobne: "<ul><li>K vlastnostiam a metódam objektu sa pristupuje šípkou <code>-&gt;</code>.</li><li><code>$this</code> je aktuálny objekt.</li><li>Konštruktor sa volá <code>__construct</code>. Zápis <code>public string $nazov</code> priamo v jeho parametroch (PHP 8) vytvorí vlastnosť aj ju nastaví.</li></ul>" },
    { typ: "volba", otazka: "Ako zavoláš metódu <code>uloz</code> objektu <code>$u</code>?", moznosti: ["<code>$u-&gt;uloz()</code>", "<code>$u.uloz()</code>", "<code>$u::uloz()</code> je jediná možnosť", "<code>uloz($u)</code>"], spravna: 0, vysvetlenie: "Šípka." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Obdlznik</code> s vlastnosťami <code>$a</code>, <code>$b</code> (cez konštruktor) a metódou <code>obsah()</code>. Vypíš obsah obdĺžnika 4 × 2.5: <b>Obsah: 10</b>.",
      karty: ["php"], start: { php: kostra("") }, vyska: "220px",
      napoveda: "class Obdlznik { public function __construct(public float $a, public float $b) {} public function obsah(): float { return $this->a * $this->b; } }", riesenie: { php: kostra('class Obdlznik {\n    public function __construct(public float $a, public float $b) {}\n\n    public function obsah(): float {\n        return $this->a * $this->b;\n    }\n}\n\n$o = new Obdlznik(4, 2.5);\necho "Obsah: " . $o->obsah() . "\\n";') },
      kontrola: function (v, kod) { if (!/class\s+Obdlznik/.test(kod)) return "Vytvor triedu Obdlznik."; if (!/\$this->/.test(kod)) return "V metóde použi $this->a a $this->b."; return r(v)[0] === "Obsah: 10" ? null : "Výstup má byť Obsah: 10"; },
      vysvetlenie: "$this-> sprístupní vlastnosti objektu." },
  ] };

  var L2 = { id: "php-5-2", nazov: "private a pravidlá", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Zapuzdrenie",
      text: UKAZ('<?php\n\nclass Ucet {\n    private float $zostatok = 0;\n\n    public function vloz(float $suma): void {\n        if ($suma > 0) $this->zostatok += $suma;\n    }\n    public function vyber(float $suma): bool {\n        if ($suma <= 0 || $suma > $this->zostatok) return false;\n        $this->zostatok -= $suma;\n        return true;\n    }\n    public function getZostatok(): float { return $this->zostatok; }\n}\n\n$u = new Ucet();\n$u->vloz(100);\nvar_dump($u->vyber(500));\necho $u->getZostatok(), "\\n";', "bool(false)\n100"),
      podrobne: "<p><code>private</code> vlastnosť je dostupná len vnútri triedy. <code>$u-&gt;zostatok = 1000000;</code> skončí chybou. Vlastnosť <code>readonly</code> sa dá nastaviť len raz (v konštruktore).</p>" },
    { typ: "volba", otazka: "Čo sa stane pri <code>$u-&gt;zostatok = 5;</code>, keď je zostatok private?", moznosti: ["Chyba: prístup k private vlastnosti", "Zostatok bude 5", "Nič", "Upozornenie, ale zmení sa"], spravna: 0, vysvetlenie: "Chráni to pravidlá triedy." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Teplomer</code> s <b>private</b> vlastnosťou <code>$teplota = 0</code>, metódou <code>nastav(float $t): bool</code> (prijme len −50 až 60) a getterom <code>getTeplota()</code>. Nastav 21.5, potom 100 a vypíš <b>21.5</b>.",
      karty: ["php"], start: { php: kostra("") }, vyska: "240px",
      napoveda: "if ($t < -50 || $t > 60) return false; $this->teplota = $t; return true;", riesenie: { php: kostra('class Teplomer {\n    private float $teplota = 0;\n\n    public function nastav(float $t): bool {\n        if ($t < -50 || $t > 60) return false;\n        $this->teplota = $t;\n        return true;\n    }\n\n    public function getTeplota(): float {\n        return $this->teplota;\n    }\n}\n\n$t = new Teplomer();\n$t->nastav(21.5);\n$t->nastav(100);\necho $t->getTeplota(), "\\n";') },
      kontrola: function (v, kod) { if (!/private\s+(float\s+|int\s+)?\$teplota/.test(kod)) return "Vlastnosť $teplota má byť private."; return r(v)[0] === "21.5" ? null : "Výstup má byť 21.5"; },
      vysvetlenie: "Neplatná hodnota sa do objektu nedostala." },
  ] };

  var L3 = { id: "php-5-3", nazov: "Dedičnosť a __toString", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "extends",
      text: UKAZ('<?php\n\nclass Zviera {\n    public function __construct(protected string $meno) {}\n    public function zvuk(): string { return "..."; }\n    public function __toString(): string {\n        return $this->meno . ": " . $this->zvuk();\n    }\n}\n\nclass Macka extends Zviera {\n    public function zvuk(): string { return "Mňau"; }\n}\n\n$zoo = [new Macka("Micka"), new Zviera("Ryba")];\nforeach ($zoo as $z) echo $z, "\\n";', "Micka: Mňau\nRyba: ..."),
      podrobne: "<p><code>protected</code> je prístupné v triede aj v potomkoch. <code>__toString</code> určí, ako sa objekt vypíše cez echo. Metódy so dvoma podčiarkovníkmi na začiatku sú „magické“: PHP ich volá samo.</p>" },
    { typ: "volba", otazka: "Ktorým slovom trieda dedí z inej?", moznosti: ["extends", "inherits", ":", "implements"], spravna: 0, vysvetlenie: "class Macka extends Zviera" },
    { typ: "kod", zadanie: "Trieda <code>Tvar</code> s metódou <code>obsah(): float</code> (vráti 0) je pripravená. Dopíš <code>Stvorec extends Tvar</code> (strana) a <code>Kruh extends Tvar</code> (polomer, <code>M_PI</code>). Skript vypíše <b>Spolu: 19.14</b>.",
      karty: ["php"], start: { php: kostra('class Tvar {\n    public function obsah(): float { return 0; }\n}\n\n\n\n$tvary = [new Stvorec(4), new Kruh(1)];\n$spolu = 0;\nforeach ($tvary as $t) $spolu += $t->obsah();\necho "Spolu: " . round($spolu, 2) . "\\n";') }, vyska: "260px",
      napoveda: "class Stvorec extends Tvar { public function __construct(private float $a) {} public function obsah(): float { return $this->a * $this->a; } }", riesenie: { php: kostra('class Tvar {\n    public function obsah(): float { return 0; }\n}\n\nclass Stvorec extends Tvar {\n    public function __construct(private float $a) {}\n    public function obsah(): float { return $this->a * $this->a; }\n}\n\nclass Kruh extends Tvar {\n    public function __construct(private float $r) {}\n    public function obsah(): float { return M_PI * $this->r * $this->r; }\n}\n\n$tvary = [new Stvorec(4), new Kruh(1)];\n$spolu = 0;\nforeach ($tvary as $t) $spolu += $t->obsah();\necho "Spolu: " . round($spolu, 2) . "\\n";') },
      kontrola: function (v, kod) { if (!/class\s+Stvorec\s+extends\s+Tvar/.test(kod) || !/class\s+Kruh\s+extends\s+Tvar/.test(kod)) return "Vytvor Stvorec extends Tvar a Kruh extends Tvar."; return r(v)[0] === "Spolu: 19.14" ? null : "Výstup má byť Spolu: 19.14"; },
      vysvetlenie: "16 + π = 19.14." },
  ] };

  var L4 = { id: "php-5-4", nazov: "Bezpečnosť", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Nikdy never vstupu",
      text: "<p>Keď PHP vypíše do stránky text od používateľa, útočník by mohol vložiť vlastný JavaScript (útok <b>XSS</b>). Preto sa text pred výpisom vždy upraví cez <code>htmlspecialchars</code>:</p>" + UKAZ('<?php\n\n$komentar = \'<script>alert("hack")</script>\';\necho htmlspecialchars($komentar), "\\n";\n\n$email = "jana@mail.sk";\nvar_dump(filter_var($email, FILTER_VALIDATE_EMAIL) !== false);', '&lt;script&gt;alert(&quot;hack&quot;)&lt;/script&gt;\nbool(true)'),
      podrobne: "<ul><li><code>htmlspecialchars</code> zmení &lt; &gt; &quot; &amp; na neškodné entity.</li><li><code>filter_var</code> overí e-mail, číslo či URL.</li><li>Do databázy sa údaje posielajú cez <b>pripravené príkazy</b> (PDO prepare), nikdy nie spájaním textu. Inak hrozí SQL injection.</li><li>Heslá sa ukladajú len ako hash: <code>password_hash</code> a <code>password_verify</code>.</li></ul>" },
    { typ: "volba", otazka: "Prečo sa text od používateľa vypisuje cez htmlspecialchars?", moznosti: ["Aby nemohol vložiť škodlivý HTML/JavaScript", "Aby bol kratší", "Kvôli diakritike", "Aby sa uložil do databázy"], spravna: 0, vysvetlenie: "Ochrana pred XSS." },
    { typ: "volba", otazka: "Ako sa správne ukladajú heslá?", moznosti: ["Ako hash cez password_hash", "Ako obyčajný text", "Zašifrované cez base64", "Pospájané s menom"], spravna: 0, vysvetlenie: "Hash sa nedá spätne prečítať." },
    { typ: "kod", zadanie: "Načítaj meno a e-mail (vstup je pripravený, každé na riadku). Meno vypíš bezpečne cez htmlspecialchars v tvare <b>Meno: …</b>. Ak je e-mail platný, vypíš <b>E-mail: OK</b>, inak <b>E-mail: neplatný</b>.",
      karty: ["php"], vstup: "<b>Jana</b>\njana(at)mail", start: { php: kostra("$meno = trim(fgets(STDIN));\n$email = trim(fgets(STDIN));\n") }, vyska: "180px",
      napoveda: 'echo "Meno: " . htmlspecialchars($meno) . "\\n"; echo "E-mail: " . (filter_var($email, FILTER_VALIDATE_EMAIL) ? "OK" : "neplatný") . "\\n";', riesenie: { php: kostra('$meno = trim(fgets(STDIN));\n$email = trim(fgets(STDIN));\necho "Meno: " . htmlspecialchars($meno) . "\\n";\necho "E-mail: " . (filter_var($email, FILTER_VALIDATE_EMAIL) ? "OK" : "neplatný") . "\\n";') },
      kontrola: function (v, kod) { if (!/htmlspecialchars/.test(kod)) return "Meno vypíš cez htmlspecialchars."; return r(v).join("|") === "Meno: &lt;b&gt;Jana&lt;/b&gt;|E-mail: neplatný" ? null : "Výstup má byť Meno: &lt;b&gt;Jana&lt;/b&gt; a E-mail: neplatný"; },
      vysvetlenie: "Značky sa zobrazia ako text, nie ako HTML." },
  ] };

  var L5 = { id: "php-5-5", nazov: "Dátum a čas", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "DateTime",
      text: UKAZ('<?php\n\n$d = new DateTime("2026-03-15");\necho $d->format("d.m.Y"), "\\n";\n$d->modify("+30 days");\necho $d->format("d.m.Y"), "\\n";\n$a = new DateTime("2026-01-01");\n$b = new DateTime("2026-12-24");\necho $a->diff($b)->days, " dní do Vianoc\\n";', "15.03.2026\n14.04.2026\n357 dní do Vianoc"),
      podrobne: "<p>Formát: <code>d</code> deň, <code>m</code> mesiac, <code>Y</code> rok, <code>H:i</code> čas. Aktuálny dátum je <code>new DateTime()</code> (v úlohách používame pevné dátumy, aby výsledok vždy sedel).</p>" },
    { typ: "volba", otazka: "Ako vypíšeš dátum v tvare 24.12.2026?", moznosti: ["<code>$d-&gt;format(\"d.m.Y\")</code>", "<code>$d-&gt;format(\"Y-m-d\")</code>", "<code>$d.toString()</code>", "<code>date($d)</code>"], spravna: 0, vysvetlenie: "d.m.Y" },
    { typ: "kod", zadanie: "Načítaj dátum narodenia (vstup <b>2010-05-20</b>) a vypíš, koľko celých rokov má dňa 2026-11-15: <b>Vek: 16</b>.",
      karty: ["php"], vstup: "2010-05-20", start: { php: kostra('$narodenie = new DateTime(trim(fgets(STDIN)));\n$dnes = new DateTime("2026-11-15");\n') }, vyska: "150px",
      napoveda: 'echo "Vek: " . $narodenie->diff($dnes)->y . "\\n";', riesenie: { php: kostra('$narodenie = new DateTime(trim(fgets(STDIN)));\n$dnes = new DateTime("2026-11-15");\necho "Vek: " . $narodenie->diff($dnes)->y . "\\n";') },
      kontrola: function (v, kod) { if (!/diff/.test(kod)) return "Použi diff."; return r(v)[0] === "Vek: 16" ? null : "Výstup má byť Vek: 16"; },
      vysvetlenie: "diff vráti rozdiel v rokoch (y), mesiacoch (m) aj dňoch." },
    { typ: "vyklad", nadpis: "Kurz PHP máš za sebou",
      text: "<ul><li>echo, premenné, typy a vstup.</li><li>Podmienky, match a cykly.</li><li>Funkcie, polia, asociatívne polia a JSON.</li><li>Triedy, private, dedičnosť.</li><li>Bezpečnosť: htmlspecialchars, filter_var, password_hash.</li><li>Dátumy cez DateTime.</li></ul>", tip: "Po teste ťa čakajú záverečné projekty: faktúra, spracovanie formulára a štatistika z JSON." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "php-5-1", otazka: "Ako sa volá konštruktor v PHP?", moznosti: ["__construct", "constructor", "init", "new"], spravna: 0, vysvetlenie: "Dva podčiarkovníky." },
    { typ: "volba", lekcia: "php-5-1", otazka: "Čo je <code>$this</code>?", moznosti: ["Aktuálny objekt", "Trieda", "Premenná z formulára", "Nič"], spravna: 0, vysvetlenie: "$this->vlastnost" },
    { typ: "volba", lekcia: "php-5-2", otazka: "Odkiaľ je prístupná private vlastnosť?", moznosti: ["Len z metód tej triedy", "Odkiaľkoľvek", "Z potomkov", "Z formulára"], spravna: 0, vysvetlenie: "protected aj z potomkov." },
    { typ: "volba", lekcia: "php-5-3", otazka: "Ktorá metóda určí, ako sa objekt vypíše cez echo?", moznosti: ["__toString", "toString", "__print", "format"], spravna: 0, vysvetlenie: "Magická metóda." },
    { typ: "volba", lekcia: "php-5-4", otazka: "Čo chráni pred SQL injection?", moznosti: ["Pripravené príkazy (prepare)", "htmlspecialchars", "echo", "trim"], spravna: 0, vysvetlenie: "Hodnoty sa neposielajú spájaním textu." },
    { typ: "volba", lekcia: "php-5-5", otazka: "Čo vypíše <code>(new DateTime(\"2026-01-05\"))-&gt;format(\"d.m.\")</code>?", moznosti: ["05.01.", "5.1.", "01.05.", "2026"], spravna: 0, vysvetlenie: "d a m s nulou na začiatku." },
    { typ: "doplnenie", lekcia: "php-5-1", otazka: "Vytvor objekt a zavolaj metódu:", sablona: "$p = [[0]] Produkt(\"Myš\", 19.9);\necho $p[[1]]sDph();", zetony: ["new", "->", ".", "::", "create"], spravne: ["new", "->"], vysvetlenie: "new a ->" },
  ];

  K.registrujModul("php", { cislo: 5, nazov: "Objekty a bezpečný web", popis: "Triedy, private, dedičnosť, bezpečnosť a dátumy.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("php", [
    { kat: "Základy", znak: "<?php", nazov: "Začiatok kódu", popis: "Všetko za touto značkou je PHP." },
    { kat: "Základy", znak: "echo", nazov: "Výpis", popis: "Vypíše text alebo hodnoty oddelené čiarkou.", priklad: '<?php\necho "Ahoj, $meno!\\n";' },
    { kat: "Základy", znak: "$premenna", nazov: "Premenná", popis: "Vždy so znakom $." },
    { kat: "Základy", znak: ". (bodka)", nazov: "Spájanie textu", popis: "\"a\" . \"b\" = \"ab\"" },
    { kat: "Základy", znak: "\"…\" vs '…'", nazov: "Úvodzovky", popis: "V úvodzovkách sa premenné dosadia, v apostrofoch nie." },
    { kat: "Vstup", znak: "trim(fgets(STDIN))", nazov: "Riadok zo vstupu", popis: "Na webe namiesto toho $_POST / $_GET." },
    { kat: "Vstup", znak: "explode / implode", nazov: "Rozdeľ / spoj", popis: "Text na pole a späť." },
    { kat: "Text", znak: "mb_strlen / mb_strtoupper", nazov: "Text s diakritikou", popis: "mb_ funkcie správne počítajú č, š, ž." },
    { kat: "Text", znak: "number_format", nazov: "Formát čísla", popis: "number_format(1500, 2, \",\", \" \") = 1 500,00" },
    { kat: "Riadenie", znak: "if / elseif / else", nazov: "Podmienka", popis: "Porovnávaj cez ===." },
    { kat: "Riadenie", znak: "match", nazov: "Voľba", popis: "Vráti hodnotu vetvy, default pre ostatné." },
    { kat: "Riadenie", znak: "foreach ($a as $k => $v)", nazov: "Prechod poľom", popis: "Najpoužívanejší cyklus v PHP." },
    { kat: "Polia", znak: "[1, 2, 3]", nazov: "Pole", popis: "$a[] = x pridá na koniec, count($a) počet." },
    { kat: "Polia", znak: "[\"k\" => \"v\"]", nazov: "Asociatívne pole", popis: "Kľúč → hodnota, isset overí kľúč." },
    { kat: "Polia", znak: "array_map / array_filter / usort", nazov: "Operácie s poľom", popis: "S krátkou funkciou fn($x) => …" },
    { kat: "Funkcie", znak: "function f(int $x): int", nazov: "Funkcia", popis: "Typy parametrov a výsledku." },
    { kat: "Funkcie", znak: "json_encode / json_decode", nazov: "JSON", popis: "Pole ↔ text JSON." },
    { kat: "Objekty", znak: "class / new / ->", nazov: "Objekty", popis: "$o->metoda(), $this vnútri triedy." },
    { kat: "Objekty", znak: "__construct", nazov: "Konštruktor", popis: "Volá sa pri new." },
    { kat: "Objekty", znak: "private / protected / public", nazov: "Prístup", popis: "Len trieda / aj potomkovia / všetci." },
    { kat: "Bezpečnosť", znak: "htmlspecialchars", nazov: "Ochrana pred XSS", popis: "Text od používateľa vždy cez ňu." },
    { kat: "Bezpečnosť", znak: "password_hash", nazov: "Heslá", popis: "Ukladaj len hash, over cez password_verify." },
  ]);
})();
