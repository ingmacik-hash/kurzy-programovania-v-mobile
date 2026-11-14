/* SQL · Modul 1 · Tabuľky a SELECT */
(function () {
  var P = K.pom, S = P.sql, TXT = P.TXT, MONO = P.MONO;

  var OBR_TABULKA = '<svg viewBox="0 0 340 150" role="img" aria-label="Tabuľka v databáze: stĺpce majú názvy, každý riadok je jeden záznam">' +
    '<rect x="10" y="20" width="320" height="120" rx="10" style="fill:var(--surface-2);stroke:#0f8f84;stroke-width:2"/>' +
    '<rect x="10" y="20" width="320" height="28" rx="10" style="fill:#0f8f84"/><rect x="10" y="38" width="320" height="10" style="fill:#0f8f84"/>' +
    [["id", 24], ["nazov", 80], ["kategoria", 170], ["cena", 270]].map(function (c) { return '<text x="' + c[1] + '" y="39" font-size="12" font-weight="700" ' + MONO + ' fill="#fff">' + c[0] + "</text>"; }).join("") +
    [["1", "Slúchadlá", "Elektronika", "49.9"], ["2", "Myš", "Elektronika", "19.9"], ["4", "Batoh", "Doplnky", "39.0"]].map(function (r, i) {
      var y = 70 + i * 26;
      return '<text x="24" y="' + y + '" font-size="12" ' + MONO + ' style="fill:var(--text)">' + r[0] + '</text><text x="80" y="' + y + '" font-size="12" ' + MONO + ' style="fill:var(--text)">' + r[1] + '</text><text x="170" y="' + y + '" font-size="12" ' + MONO + ' style="fill:var(--text)">' + r[2] + '</text><text x="270" y="' + y + '" font-size="12" ' + MONO + ' style="fill:var(--hl-num)">' + r[3] + "</text>";
    }).join("") +
    '<text x="336" y="14" text-anchor="end" font-size="11" ' + TXT + ' style="fill:var(--muted)">stĺpce ↓   riadky = záznamy →</text></svg>';

  var L1 = { id: "sql-1-1", nazov: "Databáza a tabuľky", minut: 6, kroky: [
    { typ: "vyklad", nadpis: "Kde sú uložené údaje",
      text: "<p>E-shop, banka aj škola ukladajú údaje do <b>databázy</b>. Relačná databáza je súbor <b>tabuliek</b>. Každá tabuľka má pomenované <b>stĺpce</b> a každý <b>riadok</b> je jeden záznam, napríklad jeden produkt.</p>", obr: OBR_TABULKA,
      podrobne: "<p>S databázou sa „rozpráva“ jazykom <b>SQL</b> (Structured Query Language, číta sa es-kju-el alebo sí-kvel). Rovnaké základy fungujú v MySQL, PostgreSQL, SQLite aj Microsoft SQL Serveri. V tejto aplikácii beží SQLite priamo v telefóne.</p>" },
    { typ: "vyklad", nadpis: "Naša databáza: malý e-shop",
      text: "<p>Celý kurz budeš pracovať s databázou e-shopu. Má štyri tabuľky:</p>" + S.schema() +
        "<p><code>zakaznici</code> sú ľudia, <code>produkty</code> tovar, <code>objednavky</code> nákupy a <code>polozky</code> hovoria, čo bolo v ktorej objednávke.</p>",
      podrobne: "<p>Každá tabuľka má stĺpec <code>id</code>: jedinečné číslo riadku (<b>primárny kľúč</b>). Stĺpec <code>zakaznik_id</code> v objednávkach ukazuje na <code>id</code> v zákazníkoch. Takto sú tabuľky prepojené. Viac v module 4.</p>" },
    { typ: "volba", otazka: "Čo je v tabuľke jeden <b>riadok</b>?", moznosti: ["Jeden záznam, napríklad jeden produkt", "Jeden stĺpec", "Celá databáza", "Jeden príkaz SQL"], spravna: 0, vysvetlenie: "Riadok = záznam, stĺpec = vlastnosť (napr. cena)." },
    { typ: "volba", otazka: "V ktorej tabuľke nájdeš cenu monitora?", moznosti: ["produkty", "zakaznici", "objednavky", "polozky"], spravna: 0, vysvetlenie: "Cena je vlastnosť produktu." },
    { typ: "vyklad", nadpis: "Prvý dotaz",
      text: "<p>Dotaz, ktorý vypíše celú tabuľku, vyzerá takto. Hviezdička <code>*</code> znamená „všetky stĺpce“:</p>" + S.ukaz("SELECT * FROM produkty;"),
      podrobne: "<p>Kľúčové slová (SELECT, FROM) sa podľa zvyku píšu veľkými písmenami, aby boli odlíšené od názvov tabuliek. SQL ich však prijme aj malými. Bodkočiarka na konci ukončuje príkaz.</p>" },
    S.uloha("Vypíš celú tabuľku <code>zakaznici</code>.", "SELECT * FROM zakaznici;", { napoveda: "SELECT * FROM zakaznici;", vysvetlenie: "Hotovo: všetky stĺpce, všetky riadky." }),
  ] };

  var L2 = { id: "sql-1-2", nazov: "SELECT a stĺpce", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Len to, čo potrebuješ",
      text: "<p>Namiesto <code>*</code> vymenuj stĺpce oddelené čiarkou. Vo výsledku budú v poradí, v akom ich napíšeš:</p>" + S.ukaz("SELECT nazov, cena\nFROM produkty;"),
      podrobne: "<p>V praxi sa <code>SELECT *</code> používa len na rýchle pozretie. Tabuľky v skutočných firmách majú desiatky stĺpcov a milióny riadkov, preto vyberaj len potrebné stĺpce, je to rýchlejšie.</p>" },
    { typ: "volba", otazka: "Čo vráti tento dotaz?", kod: "SELECT meno, mesto FROM zakaznici;", jazyk: "sql", moznosti: ["Meno a mesto všetkých zákazníkov", "Len prvého zákazníka", "Všetky stĺpce zákazníkov", "Chybu, chýba hviezdička"], spravna: 0, vysvetlenie: "Dva stĺpce, všetky riadky." },
    { typ: "doplnenie", otazka: "Doplň dotaz, ktorý vypíše názov a sklad produktov:", sablona: "[[0]] nazov[[1]] sklad [[2]] produkty;", zetony: ["SELECT", ",", "FROM", "WHERE", ";", "TABLE"], spravne: ["SELECT", ",", "FROM"], vysvetlenie: "SELECT stĺpce FROM tabuľka." },
    { typ: "poradie", otazka: "Zoraď časti dotazu:", jazyk: "sql", riadky: ["SELECT", "  meno, vek", "FROM", "  zakaznici;"], vysvetlenie: "Najprv SELECT a stĺpce, potom FROM a tabuľka." },
    S.uloha("Vypíš z tabuľky <code>produkty</code> stĺpce <code>nazov</code>, <code>kategoria</code> a <code>cena</code> (v tomto poradí).", "SELECT nazov, kategoria, cena FROM produkty;", { tabulky: ["produkty"], napoveda: "SELECT nazov, kategoria, cena FROM produkty;", nazvy: true }),
  ] };

  var L3 = { id: "sql-1-3", nazov: "Výpočty a AS", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Počítanie priamo v dotaze",
      text: "<p>V SELECT môžeš počítať so stĺpcami: <code>+ - * /</code>. Výsledok je nový stĺpec, v tabuľke sa nič nezmení:</p>" + S.ukaz("SELECT nazov, cena, cena * 1.23\nFROM produkty;"),
      podrobne: "<p>Pozor na celé čísla: v SQLite <code>7 / 2</code> je 3 (obe čísla sú celé). Keď chceš desatinný výsledok, napíš <code>7 / 2.0</code> alebo <code>7 * 1.0 / 2</code>.</p>" },
    { typ: "vyklad", nadpis: "Premenovanie stĺpca: AS",
      text: "<p>Názov <code>cena * 1.23</code> nie je pekný. Kľúčovým slovom <code>AS</code> dáš stĺpcu <b>alias</b> (prezývku). Funkcia <code>ROUND(x, 2)</code> zaokrúhli na 2 desatinné miesta:</p>" + S.ukaz("SELECT nazov,\n       ROUND(cena * 1.23, 2) AS s_dph\nFROM produkty;"),
      podrobne: "<p>Alias s medzerou daj do úvodzoviek: <code>AS \"cena s DPH\"</code>. Alias môžeš neskôr použiť v ORDER BY.</p>" },
    { typ: "volba", otazka: "Čo spraví <code>AS</code>?", moznosti: ["Pomenuje stĺpec vo výsledku", "Zmení názov stĺpca v tabuľke natrvalo", "Vytvorí novú tabuľku", "Zoradí výsledok"], spravna: 0, vysvetlenie: "Alias platí len vo výsledku dotazu." },
    { typ: "volba", otazka: "Koľko je v SQLite <code>SELECT 9 / 2;</code>?", moznosti: ["4", "4.5", "5", "chyba"], spravna: 0, vysvetlenie: "Celé číslo deleno celým = celé číslo. 9 / 2.0 = 4.5." },
    S.uloha("Vypíš <code>nazov</code> a hodnotu tovaru na sklade <code>cena * sklad</code> pomenovanú ako <code>hodnota</code>.", "SELECT nazov, cena * sklad AS hodnota FROM produkty;", { tabulky: ["produkty"], nazvy: true, napoveda: "SELECT nazov, cena * sklad AS hodnota FROM produkty;", vysvetlenie: "Monitory majú hodnotu 537 €." }),
  ] };

  var L4 = { id: "sql-1-4", nazov: "DISTINCT a LIMIT", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Bez opakovania: DISTINCT",
      text: "<p>Z akých miest sú zákazníci? Obyčajný SELECT vypíše Bratislavu trikrát. <code>DISTINCT</code> nechá každú hodnotu len raz:</p>" + S.ukaz("SELECT DISTINCT mesto\nFROM zakaznici;"),
      podrobne: "<p>DISTINCT platí pre celý riadok. <code>SELECT DISTINCT mesto, vek</code> odstráni len riadky, kde je rovnaké mesto aj vek.</p>" },
    { typ: "vyklad", nadpis: "Len prvých pár: LIMIT",
      text: "<p><code>LIMIT n</code> vráti najviac n riadkov. Hodí sa na rýchly pohľad do veľkej tabuľky:</p>" + S.ukaz("SELECT nazov, cena\nFROM produkty\nLIMIT 3;"),
      podrobne: "<p><code>LIMIT 3 OFFSET 3</code> preskočí prvé 3 riadky a vráti ďalšie 3. Tak fungujú stránky výsledkov („strana 2“). LIMIT je vždy na konci dotazu.</p>" },
    { typ: "volba", otazka: "Koľko riadkov vráti <code>SELECT DISTINCT kategoria FROM produkty;</code>? Kategórie sú Elektronika, Doplnky a Knihy.", moznosti: ["3", "10", "1", "4"], spravna: 0, vysvetlenie: "Každá kategória raz." },
    { typ: "doplnenie", otazka: "Vráť len prvých 5 zákazníkov:", sablona: "SELECT * FROM zakaznici [[0]] [[1]];", zetony: ["LIMIT", "5", "TOP", "FIRST", "DISTINCT"], spravne: ["LIMIT", "5"], vysvetlenie: "LIMIT 5 na konci." },
    S.uloha("Vypíš zoznam kategórií produktov, každú len raz.", "SELECT DISTINCT kategoria FROM produkty;", { tabulky: ["produkty"], napoveda: "SELECT DISTINCT kategoria FROM produkty;", musi: [[/DISTINCT/i, "Použi DISTINCT."]] }),
    S.uloha("Vypíš <code>meno</code> a <code>email</code> prvých 4 zákazníkov.", "SELECT meno, email FROM zakaznici LIMIT 4;", { tabulky: ["zakaznici"], limit: true, napoveda: "SELECT meno, email FROM zakaznici LIMIT 4;" }),
  ] };

  var L5 = { id: "sql-1-5", nazov: "Funkcie na text", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Úpravy textu vo výsledku",
      text: P.tabulka(["Funkcia", "Čo spraví", "Príklad → výsledok"], [["<code>UPPER(x)</code>", "veľké písmená", "UPPER('ahoj') → AHOJ"], ["<code>LOWER(x)</code>", "malé písmená", "LOWER('SQL') → sql"], ["<code>LENGTH(x)</code>", "počet znakov", "LENGTH('Myš') → 3"], ["<code>SUBSTR(x, od, dĺžka)</code>", "časť textu", "SUBSTR('Bratislava', 1, 3) → Bra"], ["<code>x || y</code>", "spojí texty", "'a' || 'b' → ab"], ["<code>REPLACE(x, a, b)</code>", "nahradí", "REPLACE('a-b', '-', ' ') → a b"]]),
      podrobne: "<p>V SQL sa text píše do <b>apostrofov</b> <code>'…'</code>. Úvodzovky <code>\"…\"</code> sú pre názvy stĺpcov. Toto je častá chyba začiatočníkov.</p>" },
    { typ: "vyklad", nadpis: "Spájanie textov",
      text: S.ukaz("SELECT meno || ' (' || mesto || ')' AS zakaznik\nFROM zakaznici\nLIMIT 4;"),
      podrobne: "<p>Operátor <code>||</code> funguje v SQLite a PostgreSQL. V MySQL sa používa funkcia <code>CONCAT(a, b)</code>.</p>" },
    { typ: "volba", otazka: "Ako zapíšeš text Bratislava v SQL?", moznosti: ["<code>'Bratislava'</code>", "<code>\"Bratislava\"</code> je jediná možnosť", "<code>Bratislava</code>", "<code>(Bratislava)</code>"], spravna: 0, vysvetlenie: "Text patrí do apostrofov." },
    { typ: "volba", otazka: "Čo vráti <code>SELECT LENGTH('SQL');</code>?", moznosti: ["3", "SQL", "1", "LENGTH"], spravna: 0, vysvetlenie: "Tri znaky." },
    S.uloha("Vypíš <code>nazov</code> produktu veľkými písmenami ako stĺpec <code>velkymi</code> a počet znakov názvu ako stĺpec <code>dlzka</code>.", "SELECT UPPER(nazov) AS velkymi, LENGTH(nazov) AS dlzka FROM produkty;", { tabulky: ["produkty"], nazvy: true, napoveda: "SELECT UPPER(nazov) AS velkymi, LENGTH(nazov) AS dlzka FROM produkty;" }),
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li>Databáza = tabuľky so stĺpcami a riadkami.</li><li><code>SELECT stĺpce FROM tabuľka</code>, <code>*</code> = všetky stĺpce.</li><li>Výpočty, <code>ROUND</code> a aliasy <code>AS</code>.</li><li><code>DISTINCT</code> a <code>LIMIT</code>.</li><li>Text v apostrofoch, <code>UPPER</code>, <code>LENGTH</code>, <code>||</code>.</li></ul>", tip: "Teraz krátky test. V ďalšom module sa naučíš vyberať len riadky, ktoré spĺňajú podmienku." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "sql-1-1", otazka: "Čo je stĺpec v tabuľke?", moznosti: ["Jedna vlastnosť všetkých záznamov (napr. cena)", "Jeden záznam", "Celá databáza", "Príkaz"], spravna: 0, vysvetlenie: "Stĺpec = vlastnosť." },
    { typ: "volba", lekcia: "sql-1-1", otazka: "Čo znamená <code>*</code> v <code>SELECT * FROM produkty</code>?", moznosti: ["Všetky stĺpce", "Násobenie", "Všetky tabuľky", "Prvý riadok"], spravna: 0, vysvetlenie: "Hviezdička = všetky stĺpce." },
    { typ: "doplnenie", lekcia: "sql-1-2", otazka: "Vypíš meno a vek zákazníkov:", sablona: "[[0]] meno, vek [[1]] zakaznici;", zetony: ["SELECT", "FROM", "WHERE", "GET", "TABLE"], spravne: ["SELECT", "FROM"], vysvetlenie: "SELECT … FROM …" },
    { typ: "volba", lekcia: "sql-1-3", otazka: "Ktorý dotaz pomenuje stĺpec <code>cena * 2</code> ako <code>dvojita</code>?", moznosti: ["<code>SELECT cena * 2 AS dvojita FROM produkty;</code>", "<code>SELECT dvojita = cena * 2 FROM produkty;</code>", "<code>SELECT cena * 2 NAME dvojita FROM produkty;</code>", "<code>SELECT AS dvojita cena * 2 FROM produkty;</code>"], spravna: 0, vysvetlenie: "výraz AS alias" },
    { typ: "volba", lekcia: "sql-1-3", otazka: "Čo vráti <code>ROUND(2.567, 1)</code>?", moznosti: ["2.6", "2.5", "3", "2.57"], spravna: 0, vysvetlenie: "Na jedno desatinné miesto." },
    { typ: "volba", lekcia: "sql-1-4", otazka: "Čo spraví <code>DISTINCT</code>?", moznosti: ["Odstráni opakujúce sa riadky z výsledku", "Zoradí výsledok", "Zmaže duplikáty z tabuľky", "Vráti prvý riadok"], spravna: 0, vysvetlenie: "Tabuľka zostane nezmenená, mení sa len výsledok." },
    { typ: "volba", lekcia: "sql-1-4", otazka: "Kam patrí <code>LIMIT 10</code>?", moznosti: ["Na koniec dotazu", "Hneď za SELECT", "Pred FROM", "Kamkoľvek"], spravna: 0, vysvetlenie: "LIMIT je posledná časť dotazu." },
    { typ: "volba", lekcia: "sql-1-5", otazka: "Ako spojíš meno a mesto do jedného textu v SQLite?", moznosti: ["<code>meno || ' ' || mesto</code>", "<code>meno + mesto</code>", "<code>meno & mesto</code>", "<code>meno . mesto</code>"], spravna: 0, vysvetlenie: "Operátor || spája texty." },
  ];

  K.registrujModul("sql", { cislo: 1, nazov: "Tabuľky a SELECT", popis: "Tabuľky, stĺpce a riadky. SELECT, výpočty, aliasy, DISTINCT, LIMIT a funkcie na text.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
