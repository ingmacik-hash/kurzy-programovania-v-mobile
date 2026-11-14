/* SQL · Modul 2 · Filtrovanie a triedenie */
(function () {
  var P = K.pom, S = P.sql;

  var L1 = { id: "sql-2-1", nazov: "WHERE: podmienka", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Len riadky, ktoré chceš",
      text: "<p><code>WHERE</code> nechá vo výsledku len riadky, ktoré spĺňajú podmienku. Píše sa za FROM:</p>" + S.ukaz("SELECT nazov, cena\nFROM produkty\nWHERE cena < 20;"),
      podrobne: "<p>Databáza prejde riadok po riadku a pre každý vyhodnotí podmienku. Ak platí, riadok ide do výsledku. Tabuľka sa pritom nemení.</p>" },
    { typ: "vyklad", nadpis: "Porovnania",
      text: P.tabulka(["Operátor", "Význam", "Príklad"], [["<code>=</code>", "rovná sa (jedno =)", "<code>mesto = 'Košice'</code>"], ["<code>&lt;&gt;</code> alebo <code>!=</code>", "nerovná sa", "<code>stav &lt;&gt; 'zrušená'</code>"], ["<code>&lt;</code>, <code>&gt;</code>", "menší, väčší", "<code>vek &gt; 30</code>"], ["<code>&lt;=</code>, <code>&gt;=</code>", "menší/väčší alebo rovný", "<code>sklad &gt;= 10</code>"]]) +
        S.ukaz("SELECT meno, vek\nFROM zakaznici\nWHERE mesto = 'Bratislava';"),
      podrobne: "<p>Na rozdiel od JavaScriptu či Pythonu sa v SQL porovnáva jedným <code>=</code>. Text porovnávaj v apostrofoch. V SQLite záleží na veľkosti písmen: <code>'bratislava'</code> nenájde „Bratislava“.</p>" },
    { typ: "volba", otazka: "Koľko produktov vráti <code>WHERE sklad = 0</code>? (Klávesnica a Kniha C++ nie sú na sklade.)", moznosti: ["2", "0", "10", "8"], spravna: 0, vysvetlenie: "Dva produkty majú sklad 0." },
    { typ: "volba", otazka: "Ktorá podmienka je správne?", moznosti: ["<code>WHERE mesto = 'Nitra'</code>", "<code>WHERE mesto == 'Nitra'</code>", "<code>WHERE mesto = Nitra</code>", "<code>IF mesto = 'Nitra'</code>"], spravna: 0, vysvetlenie: "Jedno = a text v apostrofoch." },
    S.uloha("Vypíš <code>nazov</code> a <code>sklad</code> produktov, ktorých je na sklade <b>viac ako 10</b> kusov.", "SELECT nazov, sklad FROM produkty WHERE sklad > 10;", { tabulky: ["produkty"], musi: [[/WHERE/i, "Použi WHERE."]], napoveda: "… WHERE sklad > 10;" }),
    S.uloha("Vypíš mená zákazníkov z <b>Košíc</b>.", "SELECT meno FROM zakaznici WHERE mesto = 'Košice';", { tabulky: ["zakaznici"], napoveda: "SELECT meno FROM zakaznici WHERE mesto = 'Košice';" }),
  ] };

  var L2 = { id: "sql-2-2", nazov: "AND, OR, NOT", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Viac podmienok naraz",
      text: "<ul><li><code>AND</code>: musia platiť <b>obe</b> podmienky.</li><li><code>OR</code>: stačí <b>jedna</b>.</li><li><code>NOT</code>: obráti podmienku.</li></ul>" + S.ukaz("SELECT nazov, kategoria, cena\nFROM produkty\nWHERE kategoria = 'Elektronika' AND cena < 40;"),
      podrobne: "<p>AND má prednosť pred OR, ako násobenie pred sčítaním. Keď ich miešaš, použi zátvorky: <code>WHERE (mesto = 'Nitra' OR mesto = 'Žilina') AND vek &lt; 25</code>.</p>" },
    { typ: "vyklad", nadpis: "OR v praxi",
      text: S.ukaz("SELECT meno, mesto\nFROM zakaznici\nWHERE mesto = 'Nitra' OR mesto = 'Žilina';") },
    { typ: "volba", otazka: "Ktorí zákazníci prejdú podmienkou <code>vek &gt; 30 AND mesto = 'Bratislava'</code>?", moznosti: ["Starší ako 30 a zároveň z Bratislavy", "Všetci z Bratislavy", "Všetci starší ako 30", "Starší ako 30 alebo z Bratislavy"], spravna: 0, vysvetlenie: "AND = obe naraz." },
    { typ: "volba", otazka: "Čo vráti <code>WHERE NOT stav = 'doručená'</code>?", moznosti: ["Objednávky, ktoré nie sú doručené", "Len doručené", "Nič", "Chybu"], spravna: 0, vysvetlenie: "NOT obráti podmienku." },
    S.uloha("Vypíš <code>nazov</code> a <code>cena</code> produktov z kategórie <b>Knihy</b>, ktoré stoja <b>menej ako 25</b> €.", "SELECT nazov, cena FROM produkty WHERE kategoria = 'Knihy' AND cena < 25;", { tabulky: ["produkty"], musi: [[/AND/i, "Spoj dve podmienky cez AND."]], napoveda: "WHERE kategoria = 'Knihy' AND cena < 25" }),
    S.uloha("Vypíš objednávky (všetky stĺpce), ktoré majú stav <b>nová</b> alebo <b>odoslaná</b>.", "SELECT * FROM objednavky WHERE stav = 'nová' OR stav = 'odoslaná';", { tabulky: ["objednavky"], napoveda: "WHERE stav = 'nová' OR stav = 'odoslaná'" }),
  ] };

  var L3 = { id: "sql-2-3", nazov: "IN a BETWEEN", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Zoznam hodnôt: IN",
      text: "<p>Namiesto dlhého <code>OR</code> napíš zoznam do <code>IN ( )</code>:</p>" + S.ukaz("SELECT meno, mesto\nFROM zakaznici\nWHERE mesto IN ('Nitra', 'Žilina', 'Prešov');"),
      podrobne: "<p><code>NOT IN (…)</code> vráti riadky, ktorých hodnota v zozname nie je.</p>" },
    { typ: "vyklad", nadpis: "Rozsah: BETWEEN",
      text: "<p><code>BETWEEN a AND b</code> znamená od a do b <b>vrátane</b> oboch hraníc:</p>" + S.ukaz("SELECT meno, vek\nFROM zakaznici\nWHERE vek BETWEEN 25 AND 35;"),
      podrobne: "<p>Funguje aj pre dátumy v tvare RRRR-MM-DD: <code>WHERE datum BETWEEN '2026-02-01' AND '2026-02-28'</code>.</p>" },
    { typ: "volba", otazka: "Patrí 35-ročný Peter do <code>vek BETWEEN 25 AND 35</code>?", moznosti: ["Áno, hranice sa počítajú", "Nie, 35 je už mimo", "Len ak je z Bratislavy", "Závisí od databázy"], spravna: 0, vysvetlenie: "BETWEEN je vrátane hraníc." },
    { typ: "doplnenie", otazka: "Vyber produkty s id 1, 4 alebo 8:", sablona: "SELECT * FROM produkty WHERE id [[0]] (1, 4, 8);", zetony: ["IN", "BETWEEN", "=", "LIKE"], spravne: ["IN"], vysvetlenie: "IN so zoznamom hodnôt." },
    S.uloha("Vypíš všetky objednávky (všetky stĺpce) z <b>februára 2026</b> (dátum od <code>'2026-02-01'</code> do <code>'2026-02-28'</code>).", "SELECT * FROM objednavky WHERE datum BETWEEN '2026-02-01' AND '2026-02-28';", { tabulky: ["objednavky"], napoveda: "WHERE datum BETWEEN '2026-02-01' AND '2026-02-28'" }),
    S.uloha("Vypíš <code>nazov</code> a <code>kategoria</code> produktov, ktoré <b>nie sú</b> v kategóriách Knihy a Doplnky. Použi <code>NOT IN</code>.", "SELECT nazov, kategoria FROM produkty WHERE kategoria NOT IN ('Knihy', 'Doplnky');", { tabulky: ["produkty"], musi: [[/NOT\s+IN/i, "Použi NOT IN."]], napoveda: "WHERE kategoria NOT IN ('Knihy', 'Doplnky')" }),
  ] };

  var L4 = { id: "sql-2-4", nazov: "LIKE a NULL", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Hľadanie v texte: LIKE",
      text: "<p><code>LIKE</code> porovnáva so vzorom. <code>%</code> znamená „hocijaký text (aj prázdny)“ a <code>_</code> presne jeden znak:</p>" + P.tabulka(["Vzor", "Nájde"], [["<code>'Kniha%'</code>", "začína na Kniha"], ["<code>'%ová'</code>", "končí na ová"], ["<code>'%a%'</code>", "obsahuje a"], ["<code>'M_š'</code>", "M, jeden znak, š (Myš)"]]) + S.ukaz("SELECT nazov\nFROM produkty\nWHERE nazov LIKE 'Kniha%';"),
      podrobne: "<p>V SQLite LIKE nerozlišuje veľké a malé písmená pri anglických písmenách (a = A). Pri písmenách s diakritikou ich rozlišuje.</p>" },
    { typ: "vyklad", nadpis: "Chýbajúca hodnota: NULL",
      text: "<p><code>NULL</code> znamená „neznáme / nevyplnené“. Nie je to 0 ani prázdny text. Porovnáva sa len cez <code>IS NULL</code> a <code>IS NOT NULL</code>:</p>" + S.ukaz("SELECT meno, email\nFROM zakaznici\nWHERE email IS NULL;"),
      podrobne: "<p><code>email = NULL</code> nikdy neplatí, ani pre prázdne e-maily, lebo „neznáme sa nerovná ničomu“. Toto je jedna z najčastejších chýb v SQL. Funkcia <code>IFNULL(email, 'bez e-mailu')</code> nahradí NULL inou hodnotou.</p>" },
    { typ: "volba", otazka: "Ktorý vzor nájde mená končiace na <b>ová</b>?", moznosti: ["<code>LIKE '%ová'</code>", "<code>LIKE 'ová%'</code>", "<code>LIKE '_ová'</code>", "<code>= '%ová'</code>"], spravna: 0, vysvetlenie: "% pred ová = čokoľvek pred tým." },
    { typ: "volba", otazka: "Ako nájdeš zákazníkov bez e-mailu?", moznosti: ["<code>WHERE email IS NULL</code>", "<code>WHERE email = NULL</code>", "<code>WHERE email = ''</code>", "<code>WHERE email = 0</code>"], spravna: 0, vysvetlenie: "NULL sa testuje cez IS NULL." },
    S.uloha("Vypíš mená zákazníkov, ktorých meno končí na <b>ová</b>.", "SELECT meno FROM zakaznici WHERE meno LIKE '%ová';", { tabulky: ["zakaznici"], musi: [[/LIKE/i, "Použi LIKE."]], napoveda: "WHERE meno LIKE '%ová'" }),
    S.uloha("Vypíš <code>meno</code> a <code>email</code> zákazníkov, ktorí e-mail <b>majú</b>.", "SELECT meno, email FROM zakaznici WHERE email IS NOT NULL;", { tabulky: ["zakaznici"], napoveda: "WHERE email IS NOT NULL" }),
  ] };

  var L5 = { id: "sql-2-5", nazov: "ORDER BY: triedenie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Zoradenie výsledku",
      text: "<p>Bez <code>ORDER BY</code> databáza nesľubuje žiadne poradie. <code>ASC</code> = vzostupne (predvolené), <code>DESC</code> = zostupne:</p>" + S.ukaz("SELECT nazov, cena\nFROM produkty\nORDER BY cena DESC;"),
      podrobne: "<p>Triediť môžeš podľa viacerých stĺpcov: <code>ORDER BY mesto, vek DESC</code> zoradí podľa mesta a v rámci mesta od najstaršieho.</p>" },
    { typ: "vyklad", nadpis: "Poradie častí dotazu",
      text: "<p>Časti dotazu majú pevné poradie. Toto si zapamätaj:</p>" + S.kod("SELECT  stĺpce\nFROM    tabuľka\nWHERE   podmienka\nORDER BY stĺpec\nLIMIT   počet;") + S.ukaz("SELECT nazov, cena\nFROM produkty\nWHERE kategoria = 'Elektronika'\nORDER BY cena DESC\nLIMIT 2;"),
      podrobne: "<p>ORDER BY + LIMIT je obľúbená kombinácia: „3 najdrahšie“, „5 najnovších objednávok“, „najmladší zákazník“.</p>" },
    { typ: "poradie", otazka: "Zoraď časti dotazu:", jazyk: "sql", riadky: ["SELECT meno, vek", "FROM zakaznici", "WHERE vek > 20", "ORDER BY vek DESC", "LIMIT 3;"], vysvetlenie: "SELECT, FROM, WHERE, ORDER BY, LIMIT." },
    { typ: "volba", otazka: "Ako zoradíš od najmenšej ceny po najväčšiu?", moznosti: ["<code>ORDER BY cena</code>", "<code>ORDER BY cena DESC</code>", "<code>SORT cena</code>", "<code>ORDER cena UP</code>"], spravna: 0, vysvetlenie: "Predvolene ASC (vzostupne)." },
    S.uloha("Vypíš <code>meno</code> a <code>vek</code> zákazníkov zoradených od <b>najstaršieho</b>.", "SELECT meno, vek FROM zakaznici ORDER BY vek DESC;", { tabulky: ["zakaznici"], poradie: true, napoveda: "ORDER BY vek DESC" }),
    S.uloha("Vypíš <code>nazov</code> a <code>cena</code> <b>troch najlacnejších</b> produktov, ktoré sú na sklade (sklad väčší ako 0).", "SELECT nazov, cena FROM produkty WHERE sklad > 0 ORDER BY cena LIMIT 3;", { tabulky: ["produkty"], poradie: true, limit: true, napoveda: "WHERE sklad > 0 ORDER BY cena LIMIT 3" }),
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li><code>WHERE</code> a porovnania <code>= &lt;&gt; &lt; &gt;</code>.</li><li><code>AND</code>, <code>OR</code>, <code>NOT</code> a zátvorky.</li><li><code>IN</code> a <code>BETWEEN</code>.</li><li><code>LIKE</code> so znakmi % a _.</li><li><code>IS NULL</code>.</li><li><code>ORDER BY … ASC/DESC</code>.</li></ul>", tip: "V ďalšom module budeš počítať súčty, priemery a štatistiky." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "sql-2-1", otazka: "Kam patrí <code>WHERE</code>?", moznosti: ["Za FROM", "Pred SELECT", "Za ORDER BY", "Za LIMIT"], spravna: 0, vysvetlenie: "SELECT … FROM … WHERE …" },
    { typ: "volba", lekcia: "sql-2-1", otazka: "Ako zapíšeš „nerovná sa“?", moznosti: ["<code>&lt;&gt;</code>", "<code>=!</code>", "<code>&gt;&lt;</code>", "<code>NOT=</code>"], spravna: 0, vysvetlenie: "&lt;&gt; alebo !=" },
    { typ: "volba", lekcia: "sql-2-2", otazka: "Čo vráti <code>WHERE mesto = 'Nitra' OR vek &lt; 20</code>?", moznosti: ["Zákazníkov z Nitry aj všetkých mladších ako 20", "Len zákazníkov z Nitry mladších ako 20", "Nikoho", "Chybu"], spravna: 0, vysvetlenie: "OR = stačí jedna podmienka." },
    { typ: "doplnenie", lekcia: "sql-2-3", otazka: "Ceny od 10 do 30 vrátane:", sablona: "WHERE cena [[0]] 10 [[1]] 30", zetony: ["BETWEEN", "AND", "OR", "IN", "TO"], spravne: ["BETWEEN", "AND"], vysvetlenie: "BETWEEN a AND b" },
    { typ: "volba", lekcia: "sql-2-3", otazka: "Čo je kratší zápis pre <code>x = 1 OR x = 2 OR x = 3</code>?", moznosti: ["<code>x IN (1, 2, 3)</code>", "<code>x = (1, 2, 3)</code>", "<code>x LIKE 1,2,3</code>", "<code>x BETWEEN 1, 3</code>"], spravna: 0, vysvetlenie: "IN so zoznamom." },
    { typ: "volba", lekcia: "sql-2-4", otazka: "Čo znamená <code>%</code> v LIKE?", moznosti: ["Hocijaký text (aj prázdny)", "Presne jeden znak", "Percento", "Číslo"], spravna: 0, vysvetlenie: "_ je jeden znak, % ľubovoľne veľa." },
    { typ: "volba", lekcia: "sql-2-4", otazka: "Prečo <code>WHERE email = NULL</code> nič nevráti?", moznosti: ["NULL sa porovnáva cez IS NULL", "Lebo NULL je 0", "Lebo chýba apostrof", "Vráti všetko"], spravna: 0, vysvetlenie: "Neznáme sa nerovná ničomu, ani NULL." },
    { typ: "poradie", lekcia: "sql-2-5", otazka: "Zoraď časti dotazu:", jazyk: "sql", riadky: ["SELECT nazov", "FROM produkty", "WHERE sklad > 0", "ORDER BY cena DESC", "LIMIT 1;"], vysvetlenie: "SELECT, FROM, WHERE, ORDER BY, LIMIT." },
  ];

  K.registrujModul("sql", { cislo: 2, nazov: "Filtrovanie a triedenie", popis: "WHERE, AND/OR, IN, BETWEEN, LIKE, NULL a ORDER BY.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
