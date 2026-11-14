/* SQL · Záverečné projekty + slovník */
(function () {
  var P = K.pom, S = P.sql;

  /* i-tý výsledok (SELECT) v skripte žiaka porovnaný so vzorovým dotazom */
  function vysledok(r, i, vzor, volby) { var t = (r.vysledky || [])[i]; return !!t && !S.porovnaj(t, r.cista("", vzor), volby); }
  function hodnota(r, q) { var t = r.dotaz(q); return t && t.riadky[0] ? t.riadky[0][0] : null; }

  K.registrujZaver("sql", [
    { id: "sql-p1", nazov: "Report e-shopu", minut: 25,
      popis: "Vedenie e-shopu chce prehľad. Napíš štyri dotazy, ktoré odpovedia na ich otázky. Každý dotaz ukončí bodkočiarka a výsledky sa zobrazia jeden za druhým.",
      zadanie: "Napíš 4 dotazy <b>v tomto poradí</b>:<ol><li>Produkty na sklade (sklad &gt; 0): <code>nazov</code>, <code>cena</code>, zoradené od najdrahšieho.</li><li>Počet zákazníkov v každom meste: <code>mesto</code>, <code>pocet</code>, zoradené od najväčšieho počtu, pri zhode podľa mesta.</li><li>Tržba za každú kategóriu (súčet množstvo × cena zo všetkých položiek): <code>kategoria</code>, <code>trzba</code> zaokrúhlená na 2 desatinné miesta, od najvyššej.</li><li>Zákazník, ktorý minul najviac: <code>meno</code> a <code>minul</code> (jeden riadok).</li></ol>" + S.schema(),
      karty: ["sql"], start: { sql: "-- 1. produkty na sklade\n\n-- 2. zákazníci podľa mesta\n\n-- 3. tržba podľa kategórie\n\n-- 4. najlepší zákazník\n" },
      napoveda: "1: WHERE sklad > 0 ORDER BY cena DESC. 2: GROUP BY mesto ORDER BY pocet DESC, mesto. 3: polozky JOIN produkty, GROUP BY kategoria. 4: spoj 4 tabuľky, GROUP BY zákazník, ORDER BY minul DESC LIMIT 1.",
      kriteria: [
        { text: "1. dotaz: produkty na sklade od najdrahšieho", body: 2, test: function (v, s, r) { return vysledok(r, 0, "SELECT nazov, cena FROM produkty WHERE sklad > 0 ORDER BY cena DESC;", { poradie: true }); } },
        { text: "2. dotaz: počet zákazníkov podľa mesta, správne zoradený", body: 2, test: function (v, s, r) { return vysledok(r, 1, "SELECT mesto, COUNT(*) AS pocet FROM zakaznici GROUP BY mesto ORDER BY pocet DESC, mesto;", { poradie: true }); } },
        { text: "3. dotaz: tržba podľa kategórie", body: 3, test: function (v, s, r) { return vysledok(r, 2, "SELECT p.kategoria, ROUND(SUM(po.mnozstvo * p.cena), 2) AS trzba FROM polozky po JOIN produkty p ON po.produkt_id = p.id GROUP BY p.kategoria ORDER BY trzba DESC;", { poradie: true }); } },
        { text: "4. dotaz: zákazník, ktorý minul najviac", body: 3, test: function (v, s, r) { return vysledok(r, 3, "SELECT z.meno, ROUND(SUM(po.mnozstvo * p.cena), 2) AS minul FROM polozky po JOIN objednavky o ON po.objednavka_id = o.id JOIN zakaznici z ON o.zakaznik_id = z.id JOIN produkty p ON po.produkt_id = p.id GROUP BY z.id, z.meno ORDER BY minul DESC LIMIT 1;"); } },
        { text: "Stĺpce majú požadované názvy (pocet, trzba, minul)", body: 1, test: function (v, s, r) { var x = r.vysledky || []; return x.length >= 4 && x[1].stlpce[1] === "pocet" && x[2].stlpce[1] === "trzba" && x[3].stlpce[1] === "minul"; } },
        { text: "Dotazy nemenia údaje (žiadny INSERT, UPDATE ani DELETE)", body: 1, test: function (v, s, r) { return r.zmenene === 0 && (r.vysledky || []).length >= 4; } },
      ],
      riesenie: { sql: "-- 1. produkty na sklade\nSELECT nazov, cena FROM produkty\nWHERE sklad > 0\nORDER BY cena DESC;\n\n-- 2. zákazníci podľa mesta\nSELECT mesto, COUNT(*) AS pocet\nFROM zakaznici\nGROUP BY mesto\nORDER BY pocet DESC, mesto;\n\n-- 3. tržba podľa kategórie\nSELECT p.kategoria, ROUND(SUM(po.mnozstvo * p.cena), 2) AS trzba\nFROM polozky po\nJOIN produkty p ON po.produkt_id = p.id\nGROUP BY p.kategoria\nORDER BY trzba DESC;\n\n-- 4. najlepší zákazník\nSELECT z.meno, ROUND(SUM(po.mnozstvo * p.cena), 2) AS minul\nFROM polozky po\nJOIN objednavky o ON po.objednavka_id = o.id\nJOIN zakaznici z ON o.zakaznik_id = z.id\nJOIN produkty p ON po.produkt_id = p.id\nGROUP BY z.id, z.meno\nORDER BY minul DESC\nLIMIT 1;" } },

    { id: "sql-p2", nazov: "Databáza knižnice", minut: 30, databaza: "",
      popis: "Navrhni od nuly databázu školskej knižnice: knihy, čitateľov a výpožičky. Začínaš s prázdnou databázou.",
      zadanie: "<ol><li>Vytvor tabuľky <code>knihy</code> (id, nazov, autor, rok), <code>citatelia</code> (id, meno, trieda) a <code>vypozicky</code> (id, kniha_id, citatel_id, datum). Každá má <code>id INTEGER PRIMARY KEY</code>, <code>nazov</code> a <code>meno</code> sú povinné (NOT NULL), <code>kniha_id</code> a <code>citatel_id</code> sú cudzie kľúče (REFERENCES).</li><li>Vlož aspoň 4 knihy, 3 čitateľov a 4 výpožičky.</li><li>Na koniec napíš dotaz, ktorý vypíše <code>meno</code> čitateľa a <code>nazov</code> knihy pre všetky výpožičky.</li></ol>",
      karty: ["sql"], start: { sql: "-- 1. tabuľky\n\n-- 2. údaje\n\n-- 3. kto má požičané čo\n" },
      napoveda: "CREATE TABLE knihy (id INTEGER PRIMARY KEY, nazov TEXT NOT NULL, autor TEXT, rok INTEGER); … kniha_id INTEGER REFERENCES knihy(id) … Na konci: SELECT c.meno, k.nazov FROM vypozicky v JOIN citatelia c ON v.citatel_id = c.id JOIN knihy k ON v.kniha_id = k.id;",
      kriteria: [
        { text: "Tabuľky knihy, citatelia a vypozicky existujú so všetkými stĺpcami", body: 2, test: function (v, s, r) {
          var ok = true;
          [["knihy", "id,nazov,autor,rok"], ["citatelia", "id,meno,trieda"], ["vypozicky", "id,kniha_id,citatel_id,datum"]].forEach(function (t) {
            var x = r.dotaz("SELECT name FROM pragma_table_info('" + t[0] + "')"), m = x ? x.riadky.map(function (a) { return String(a[0]).toLowerCase(); }) : [];
            t[1].split(",").forEach(function (c) { if (m.indexOf(c) < 0) ok = false; });
          });
          return ok; } },
        { text: "Každá tabuľka má id ako PRIMARY KEY", body: 1, test: function (v, s, r) { return ["knihy", "citatelia", "vypozicky"].every(function (t) { return hodnota(r, "SELECT pk FROM pragma_table_info('" + t + "') WHERE name = 'id'") === 1; }); } },
        { text: "nazov knihy a meno čitateľa sú NOT NULL", body: 1, test: function (v, s, r) { return hodnota(r, "SELECT \"notnull\" FROM pragma_table_info('knihy') WHERE name = 'nazov'") === 1 && hodnota(r, "SELECT \"notnull\" FROM pragma_table_info('citatelia') WHERE name = 'meno'") === 1; } },
        { text: "Výpožičky majú cudzie kľúče na knihy a čitateľov", body: 2, test: function (v, s, r) { var t = r.dotaz("SELECT \"table\", \"from\" FROM pragma_foreign_key_list('vypozicky')"), m = t ? t.riadky.map(function (a) { return a.join(".").toLowerCase(); }) : []; return m.indexOf("knihy.kniha_id") >= 0 && m.indexOf("citatelia.citatel_id") >= 0; } },
        { text: "Aspoň 4 knihy, 3 čitatelia a 4 výpožičky", body: 2, test: function (v, s, r) { return hodnota(r, "SELECT COUNT(*) FROM knihy") >= 4 && hodnota(r, "SELECT COUNT(*) FROM citatelia") >= 3 && hodnota(r, "SELECT COUNT(*) FROM vypozicky") >= 4; } },
        { text: "Všetky výpožičky ukazujú na existujúcu knihu aj čitateľa", body: 1, test: function (v, s, r) { return hodnota(r, "SELECT COUNT(*) FROM vypozicky") > 0 && hodnota(r, "SELECT COUNT(*) FROM vypozicky v JOIN knihy k ON v.kniha_id = k.id JOIN citatelia c ON v.citatel_id = c.id") === hodnota(r, "SELECT COUNT(*) FROM vypozicky"); } },
        { text: "Posledný dotaz vypíše meno čitateľa a názov knihy pre každú výpožičku", body: 3, test: function (v, s, r) { var t = r.tabulka, o = r.dotaz("SELECT c.meno, k.nazov FROM vypozicky v JOIN citatelia c ON v.citatel_id = c.id JOIN knihy k ON v.kniha_id = k.id"); return !!t && !S.porovnaj(t, o); } },
      ],
      riesenie: { sql: "-- 1. tabuľky\nCREATE TABLE knihy (\n  id INTEGER PRIMARY KEY,\n  nazov TEXT NOT NULL,\n  autor TEXT,\n  rok INTEGER\n);\nCREATE TABLE citatelia (\n  id INTEGER PRIMARY KEY,\n  meno TEXT NOT NULL,\n  trieda TEXT\n);\nCREATE TABLE vypozicky (\n  id INTEGER PRIMARY KEY,\n  kniha_id INTEGER REFERENCES knihy(id),\n  citatel_id INTEGER REFERENCES citatelia(id),\n  datum TEXT\n);\n\n-- 2. údaje\nINSERT INTO knihy (nazov, autor, rok) VALUES\n  ('Malý princ', 'Antoine de Saint-Exupéry', 1943),\n  ('Hobit', 'J. R. R. Tolkien', 1937),\n  ('Dobrodružstvá Toma Sawyera', 'Mark Twain', 1876),\n  ('Robinson Crusoe', 'Daniel Defoe', 1719);\nINSERT INTO citatelia (meno, trieda) VALUES\n  ('Jana', '7.A'), ('Peter', '8.B'), ('Lucia', '7.A');\nINSERT INTO vypozicky (kniha_id, citatel_id, datum) VALUES\n  (1, 1, '2026-03-01'), (2, 2, '2026-03-02'),\n  (3, 1, '2026-03-05'), (4, 3, '2026-03-06');\n\n-- 3. kto má požičané čo\nSELECT c.meno, k.nazov\nFROM vypozicky v\nJOIN citatelia c ON v.citatel_id = c.id\nJOIN knihy k ON v.kniha_id = k.id;" } },

    { id: "sql-p3", nazov: "Upratovanie údajov", minut: 25,
      popis: "V databáze e-shopu sa nahromadil neporiadok. Oprav ho príkazmi INSERT, UPDATE a DELETE. Pozor na WHERE!",
      zadanie: "Napíš príkazy, ktoré:<ol><li>Zákazníkom bez e-mailu nastavia e-mail <code>'neznamy@mail.sk'</code>.</li><li>Zlacnia všetku <b>elektroniku</b> o 20 % (<code>cena * 0.8</code>).</li><li>Zmažú <b>zrušenú</b> objednávku aj s jej položkami.</li><li>Vypredané produkty (sklad 0) naskladnia: sklad nastavia na 10.</li><li>Pridajú nový produkt <b>Tablet</b>, kategória <b>Elektronika</b>, cena <b>299</b>, sklad <b>4</b>.</li></ol>" + S.schema(),
      karty: ["sql"], start: { sql: "-- 1. chýbajúce e-maily\n\n-- 2. zľava na elektroniku\n\n-- 3. zrušená objednávka\n\n-- 4. naskladnenie\n\n-- 5. nový produkt\n" },
      napoveda: "1: UPDATE … WHERE email IS NULL. 2: UPDATE … SET cena = cena * 0.8 WHERE kategoria = 'Elektronika'. 3: najprv DELETE FROM polozky WHERE objednavka_id IN (SELECT id FROM objednavky WHERE stav = 'zrušená'), potom objednávku. 4: WHERE sklad = 0. 5: INSERT INTO produkty (…) VALUES (…).",
      kriteria: [
        { text: "Nikto nemá prázdny e-mail a doplnený je 'neznamy@mail.sk'", body: 2, test: function (v, s, r) { return hodnota(r, "SELECT COUNT(*) FROM zakaznici WHERE email IS NULL") === 0 && hodnota(r, "SELECT COUNT(*) FROM zakaznici WHERE email = 'neznamy@mail.sk'") === 2; } },
        { text: "Elektronika je o 20 % lacnejšia, ostatné ceny sa nezmenili", body: 2, test: function (v, s, r) { return hodnota(r, "SELECT ROUND(cena, 2) FROM produkty WHERE id = 8") === 143.2 && hodnota(r, "SELECT ROUND(cena, 2) FROM produkty WHERE id = 2") === 15.92 && hodnota(r, "SELECT cena FROM produkty WHERE id = 6") === 24.9; } },
        { text: "Zrušená objednávka a jej položky sú zmazané", body: 2, test: function (v, s, r) { return hodnota(r, "SELECT COUNT(*) FROM objednavky WHERE stav = 'zrušená'") === 0 && hodnota(r, "SELECT COUNT(*) FROM polozky WHERE objednavka_id = 5") === 0; } },
        { text: "Ostatné objednávky a položky zostali", body: 1, test: function (v, s, r) { return hodnota(r, "SELECT COUNT(*) FROM objednavky") === 8 && hodnota(r, "SELECT COUNT(*) FROM polozky") === 15; } },
        { text: "Vypredané produkty majú sklad 10, ostatné sklady sa nezmenili", body: 2, test: function (v, s, r) { return hodnota(r, "SELECT COUNT(*) FROM produkty WHERE sklad = 0") === 0 && hodnota(r, "SELECT sklad FROM produkty WHERE id = 3") === 10 && hodnota(r, "SELECT sklad FROM produkty WHERE id = 10") === 10 && hodnota(r, "SELECT sklad FROM produkty WHERE id = 2") === 40; } },
        { text: "Nový produkt Tablet je v databáze so správnymi údajmi", body: 2, test: function (v, s, r) { return hodnota(r, "SELECT COUNT(*) FROM produkty WHERE nazov = 'Tablet' AND kategoria = 'Elektronika' AND cena = 299 AND sklad = 4") === 1; } },
        { text: "Tablet nebol zlacnený (pridaný až po zľave)", body: 1, test: function (v, s, r) { return hodnota(r, "SELECT cena FROM produkty WHERE nazov = 'Tablet'") === 299; } },
      ],
      riesenie: { sql: "-- 1. chýbajúce e-maily\nUPDATE zakaznici SET email = 'neznamy@mail.sk' WHERE email IS NULL;\n\n-- 2. zľava na elektroniku\nUPDATE produkty SET cena = cena * 0.8 WHERE kategoria = 'Elektronika';\n\n-- 3. zrušená objednávka\nDELETE FROM polozky WHERE objednavka_id IN (SELECT id FROM objednavky WHERE stav = 'zrušená');\nDELETE FROM objednavky WHERE stav = 'zrušená';\n\n-- 4. naskladnenie\nUPDATE produkty SET sklad = 10 WHERE sklad = 0;\n\n-- 5. nový produkt\nINSERT INTO produkty (nazov, kategoria, cena, sklad) VALUES ('Tablet', 'Elektronika', 299, 4);" } },
  ]);

  K.registrujSlovnik("sql", [
    { kat: "Výber", znak: "SELECT", nazov: "Vyber stĺpce", popis: "Začiatok každého dotazu. * = všetky stĺpce.", priklad: "SELECT nazov, cena FROM produkty;", jazyk: "sql" },
    { kat: "Výber", znak: "FROM", nazov: "Z tabuľky", popis: "Z ktorej tabuľky sa vyberá." },
    { kat: "Výber", znak: "WHERE", nazov: "Podmienka", popis: "Nechá len riadky, ktoré spĺňajú podmienku.", priklad: "WHERE cena < 20", jazyk: "sql" },
    { kat: "Výber", znak: "ORDER BY", nazov: "Zoradenie", popis: "ASC vzostupne (predvolené), DESC zostupne." },
    { kat: "Výber", znak: "LIMIT", nazov: "Najviac n riadkov", popis: "Na konci dotazu. OFFSET preskočí riadky." },
    { kat: "Výber", znak: "DISTINCT", nazov: "Bez opakovania", popis: "Každý rovnaký riadok len raz." },
    { kat: "Výber", znak: "AS", nazov: "Alias", popis: "Premenuje stĺpec alebo tabuľku vo výsledku." },
    { kat: "Podmienky", znak: "= <> < > <= >=", nazov: "Porovnania", popis: "Rovná sa je jedno =. Nerovná sa <> alebo !=." },
    { kat: "Podmienky", znak: "AND / OR / NOT", nazov: "Spájanie podmienok", popis: "AND obe, OR aspoň jedna, NOT opak. Zátvorky určia poradie." },
    { kat: "Podmienky", znak: "IN ( )", nazov: "V zozname", popis: "mesto IN ('Nitra', 'Žilina')" },
    { kat: "Podmienky", znak: "BETWEEN … AND …", nazov: "V rozsahu", popis: "Vrátane hraníc." },
    { kat: "Podmienky", znak: "LIKE", nazov: "Vzor textu", popis: "% = hocijaký text, _ = jeden znak.", priklad: "WHERE meno LIKE 'J%'", jazyk: "sql" },
    { kat: "Podmienky", znak: "IS NULL", nazov: "Chýbajúca hodnota", popis: "NULL sa nedá porovnať cez =." },
    { kat: "Zoskupovanie", znak: "COUNT / SUM / AVG", nazov: "Agregačné funkcie", popis: "Počet, súčet, priemer. Ďalej MIN a MAX." },
    { kat: "Zoskupovanie", znak: "GROUP BY", nazov: "Skupiny", popis: "Štatistika pre každú hodnotu stĺpca.", priklad: "SELECT mesto, COUNT(*) FROM zakaznici GROUP BY mesto;", jazyk: "sql" },
    { kat: "Zoskupovanie", znak: "HAVING", nazov: "Podmienka na skupiny", popis: "Ako WHERE, ale po zoskupení." },
    { kat: "Zoskupovanie", znak: "CASE WHEN", nazov: "Ak – tak", popis: "CASE WHEN podmienka THEN hodnota ELSE iná END" },
    { kat: "Spájanie", znak: "JOIN … ON", nazov: "Spojenie tabuliek", popis: "Spojí riadky, kde platí podmienka za ON.", priklad: "FROM objednavky o JOIN zakaznici z ON o.zakaznik_id = z.id", jazyk: "sql" },
    { kat: "Spájanie", znak: "LEFT JOIN", nazov: "Ľavé spojenie", popis: "Ponechá všetky riadky ľavej tabuľky, chýbajúce doplní NULL." },
    { kat: "Spájanie", znak: "PRIMARY KEY", nazov: "Primárny kľúč", popis: "Jednoznačne určuje riadok." },
    { kat: "Spájanie", znak: "REFERENCES", nazov: "Cudzí kľúč", popis: "Stĺpec, ktorý ukazuje na kľúč inej tabuľky." },
    { kat: "Zmeny", znak: "INSERT INTO", nazov: "Pridaj riadok", popis: "INSERT INTO t (a, b) VALUES (1, 'x');" },
    { kat: "Zmeny", znak: "UPDATE … SET", nazov: "Zmeň", popis: "Vždy s WHERE, inak zmení všetky riadky!" },
    { kat: "Zmeny", znak: "DELETE FROM", nazov: "Zmaž riadky", popis: "Vždy s WHERE, inak zmaže všetky riadky!" },
    { kat: "Zmeny", znak: "CREATE TABLE", nazov: "Nová tabuľka", popis: "Typy INTEGER, REAL, TEXT, BLOB." },
    { kat: "Zmeny", znak: "NOT NULL / UNIQUE / CHECK", nazov: "Pravidlá", popis: "Povinná, jedinečná, spĺňajúca podmienku." },
    { kat: "Znaky", znak: "' '", nazov: "Apostrofy", popis: "Text v SQL: 'Bratislava'." },
    { kat: "Znaky", znak: ";", nazov: "Bodkočiarka", popis: "Koniec príkazu." },
    { kat: "Znaky", znak: "--", nazov: "Komentár", popis: "Zvyšok riadku sa ignoruje." },
    { kat: "Znaky", znak: "||", nazov: "Spojenie textov", popis: "'a' || 'b' = 'ab'" },
  ]);
})();
