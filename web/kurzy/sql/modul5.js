/* SQL · Modul 5 · Úpravy dát */
(function () {
  var P = K.pom, S = P.sql;

  /* Stĺpce tabuľky (z databázy žiaka) */
  function stlpce(r, tab) { var t = r.dotaz("SELECT name, type, \"notnull\", pk FROM pragma_table_info('" + tab + "')"); return t ? t.riadky : []; }
  function definicia(r, tab) { var t = r.dotaz("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = '" + tab + "'"); return t && t.riadky[0] ? String(t.riadky[0][0]) : ""; }

  var L1 = { id: "sql-5-1", nazov: "INSERT: pridanie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Nový riadok",
      text: "<p><code>INSERT INTO</code> pridá riadok. Vymenuj stĺpce a do <code>VALUES</code> daj hodnoty v rovnakom poradí:</p>" + S.kod("INSERT INTO produkty (nazov, kategoria, cena, sklad)\nVALUES ('Powerbanka', 'Elektronika', 25.0, 30);"),
      podrobne: "<p>Stĺpec <code>id</code> sme vynechali. Je to INTEGER PRIMARY KEY, takže ho SQLite doplní sám (ďalšie voľné číslo, tu 11). Vynechané stĺpce dostanú NULL alebo predvolenú hodnotu (DEFAULT).</p><p>V tejto aplikácii sa pri každom spustení začína s čistou databázou, takže nič nepokazíš.</p>" },
    { typ: "vyklad", nadpis: "Viac riadkov naraz",
      text: S.kod("INSERT INTO zakaznici (meno, mesto, vek)\nVALUES ('Adam Krátky', 'Trnava', 33),\n       ('Ema Dlhá', 'Trenčín', 27);") + "<p>Za príkazom môžeš v tom istom editore napísať SELECT a hneď vidieť výsledok.</p>" },
    { typ: "volba", otazka: "Čo dostane stĺpec <code>email</code>, keď ho v INSERT vynecháš?", moznosti: ["NULL (alebo predvolenú hodnotu)", "Prázdny text ''", "0", "Príkaz skončí chybou"], spravna: 0, vysvetlenie: "Pokiaľ stĺpec nemá NOT NULL." },
    { typ: "doplnenie", otazka: "Doplň príkaz:", sablona: "[[0]] [[1]] zakaznici (meno, mesto) [[2]] ('Ivan', 'Poprad');", zetony: ["INSERT", "INTO", "VALUES", "SET", "ADD", "UPDATE"], spravne: ["INSERT", "INTO", "VALUES"], vysvetlenie: "INSERT INTO … VALUES …" },
    S.uloha("Pridaj produkt <b>Lampa</b> v kategórii <b>Doplnky</b> s cenou <b>18.5</b> a skladom <b>7</b>. Stĺpec id vynechaj.", "INSERT INTO produkty (nazov, kategoria, cena, sklad) VALUES ('Lampa', 'Doplnky', 18.5, 7);", { tabulky: ["produkty"], zmena: "SELECT * FROM produkty ORDER BY id", napoveda: "INSERT INTO produkty (nazov, kategoria, cena, sklad) VALUES ('Lampa', 'Doplnky', 18.5, 7);", vysvetlenie: "Lampa dostala id 11." }),
  ] };

  var L2 = { id: "sql-5-2", nazov: "UPDATE: zmena", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Zmena existujúcich riadkov",
      text: "<p><code>UPDATE</code> zmení hodnoty. <code>SET</code> povie čo a <code>WHERE</code> ktoré riadky:</p>" + S.kod("UPDATE produkty\nSET sklad = 20\nWHERE id = 3;"),
      podrobne: "<p>Naraz môžeš meniť viac stĺpcov: <code>SET cena = 30, sklad = 5</code>. Nová hodnota môže vychádzať zo starej: <code>SET sklad = sklad + 10</code>.</p>" },
    { typ: "vyklad", nadpis: "Pozor na WHERE!",
      text: "<p>UPDATE <b>bez WHERE zmení všetky riadky</b> v tabuľke. Toto je klasická chyba, ktorá v práci vie spôsobiť veľké problémy:</p>" + S.kod("UPDATE produkty SET cena = 0;   -- všetko zadarmo!"),
      podrobne: "<p>Dobrý zvyk: najprv napíš <code>SELECT * FROM produkty WHERE …</code>, over, ktoré riadky to vyberie, a až potom ten istý WHERE použi v UPDATE.</p>" },
    { typ: "volba", otazka: "Čo spraví <code>UPDATE zakaznici SET mesto = 'Nitra';</code>?", moznosti: ["Presťahuje všetkých zákazníkov do Nitry", "Zmení len prvého", "Nič, chýba WHERE", "Pridá nového zákazníka"], spravna: 0, vysvetlenie: "Bez WHERE sa menia všetky riadky." },
    S.uloha("Objednávku číslo <b>7</b> označ ako <b>odoslaná</b>.", "UPDATE objednavky SET stav = 'odoslaná' WHERE id = 7;", { tabulky: ["objednavky"], zmena: "SELECT * FROM objednavky ORDER BY id", musi: [[/WHERE/i, "Nezabudni na WHERE, inak zmeníš všetky objednávky."]], napoveda: "UPDATE objednavky SET stav = 'odoslaná' WHERE id = 7;" }),
    S.uloha("Zdraž všetky <b>knihy</b> o 10 % (<code>cena * 1.1</code>).", "UPDATE produkty SET cena = cena * 1.1 WHERE kategoria = 'Knihy';", { tabulky: ["produkty"], zmena: "SELECT id, ROUND(cena, 2) FROM produkty ORDER BY id", napoveda: "UPDATE produkty SET cena = cena * 1.1 WHERE kategoria = 'Knihy';" }),
  ] };

  var L3 = { id: "sql-5-3", nazov: "DELETE: mazanie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Zmazanie riadkov",
      text: "<p><code>DELETE FROM</code> zmaže riadky, ktoré spĺňajú WHERE:</p>" + S.kod("DELETE FROM zakaznici\nWHERE id = 6;") + "<p>Aj tu platí: <b>DELETE bez WHERE zmaže celú tabuľku</b>. Späť to nevrátiš.</p>",
      podrobne: "<p>Tabuľka zostane (prázdna). Celú tabuľku aj so štruktúrou odstráni <code>DROP TABLE</code>.</p>" },
    { typ: "vyklad", nadpis: "Cudzie kľúče chránia údaje",
      text: "<p>Skús zmazať objednávku 5. Databáza to nedovolí, lebo na ňu ukazujú položky (cudzí kľúč). Inak by v databáze ostali položky bez objednávky:</p>" + S.kod("DELETE FROM objednavky WHERE id = 5;\n-- chyba: FOREIGN KEY constraint failed") + "<p>Najprv treba zmazať položky, potom objednávku:</p>" + S.kod("DELETE FROM polozky WHERE objednavka_id = 5;\nDELETE FROM objednavky WHERE id = 5;"),
      podrobne: "<p>Pri vytváraní tabuľky sa dá nastaviť <code>ON DELETE CASCADE</code>: potom sa so zmazaním objednávky zmažú aj jej položky automaticky.</p>" },
    { typ: "volba", otazka: "Čo spraví <code>DELETE FROM produkty;</code>?", moznosti: ["Zmaže všetky riadky tabuľky", "Zmaže tabuľku aj so stĺpcami", "Nič, chýba WHERE", "Zmaže prvý riadok"], spravna: 0, vysvetlenie: "Všetky riadky. Tabuľka ostane prázdna." },
    { typ: "volba", otazka: "Prečo sa nedá zmazať objednávka, ktorá má položky?", moznosti: ["Chráni ju cudzí kľúč z tabuľky polozky", "Objednávky sa nedajú mazať", "Chýba COMMIT", "Je to chyba databázy"], spravna: 0, vysvetlenie: "Položky by ukazovali na neexistujúcu objednávku." },
    S.uloha("Zmaž zákazníkov, ktorí <b>nemajú žiadnu objednávku</b>. Použi poddotaz s <code>NOT IN</code>.", "DELETE FROM zakaznici WHERE id NOT IN (SELECT zakaznik_id FROM objednavky);", { tabulky: ["zakaznici", "objednavky"], zmena: "SELECT * FROM zakaznici ORDER BY id", napoveda: "DELETE FROM zakaznici WHERE id NOT IN (SELECT zakaznik_id FROM objednavky);" }),
    S.uloha("Zmaž <b>zrušenú</b> objednávku číslo 5 aj s jej položkami.", "DELETE FROM polozky WHERE objednavka_id = 5;\nDELETE FROM objednavky WHERE id = 5;", { tabulky: ["objednavky", "polozky"], zmena: "SELECT (SELECT COUNT(*) FROM objednavky WHERE id = 5), (SELECT COUNT(*) FROM polozky WHERE objednavka_id = 5), (SELECT COUNT(*) FROM objednavky), (SELECT COUNT(*) FROM polozky)", napoveda: "Najprv DELETE FROM polozky WHERE objednavka_id = 5; potom DELETE FROM objednavky WHERE id = 5;" }),
  ] };

  var L4 = { id: "sql-5-4", nazov: "CREATE TABLE", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Vlastná tabuľka",
      text: "<p><code>CREATE TABLE</code> vytvorí tabuľku. Pre každý stĺpec napíšeš názov a typ:</p>" + S.kod("CREATE TABLE recenzie (\n  id INTEGER PRIMARY KEY,\n  produkt_id INTEGER REFERENCES produkty(id),\n  hodnotenie INTEGER,\n  text TEXT\n);") + P.tabulka(["Typ v SQLite", "Na čo"], [["<code>INTEGER</code>", "celé čísla"], ["<code>REAL</code>", "desatinné čísla"], ["<code>TEXT</code>", "text, aj dátumy 'RRRR-MM-DD'"], ["<code>BLOB</code>", "binárne dáta (obrázky)"]]),
      podrobne: "<p>Iné databázy majú viac typov: <code>VARCHAR(100)</code>, <code>DECIMAL(10,2)</code>, <code>DATE</code>, <code>BOOLEAN</code>. SQLite ich prijme a zaradí k najbližšiemu z týchto štyroch.</p>" },
    { typ: "vyklad", nadpis: "Vytvor a naplň",
      text: S.kod("CREATE TABLE kategorie (id INTEGER PRIMARY KEY, nazov TEXT);\nINSERT INTO kategorie (nazov) VALUES ('Elektronika'), ('Knihy');\nSELECT * FROM kategorie;") + "<p>Tabuľku odstrániš príkazom <code>DROP TABLE kategorie;</code> a stĺpec pridáš cez <code>ALTER TABLE produkty ADD COLUMN farba TEXT;</code></p>" },
    { typ: "volba", otazka: "Aký typ zvolíš pre cenu 19.90?", moznosti: ["REAL", "INTEGER", "TEXT", "BLOB"], spravna: 0, vysvetlenie: "Desatinné číslo." },
    { typ: "poradie", otazka: "Zoraď príkaz:", jazyk: "sql", riadky: ["CREATE TABLE ziaci (", "  id INTEGER PRIMARY KEY,", "  meno TEXT,", "  trieda TEXT", ");"], vysvetlenie: "CREATE TABLE názov ( stĺpce oddelené čiarkou )." },
    { typ: "kod", zadanie: "Vytvor tabuľku <code>recenzie</code> so stĺpcami <code>id</code> (INTEGER PRIMARY KEY), <code>produkt_id</code> (INTEGER), <code>hodnotenie</code> (INTEGER) a <code>text</code> (TEXT). Potom do nej vlož <b>aspoň 2 recenzie</b> na existujúce produkty.",
      karty: ["sql"], start: { sql: "" }, vyska: "190px",
      napoveda: "CREATE TABLE recenzie (id INTEGER PRIMARY KEY, produkt_id INTEGER, hodnotenie INTEGER, text TEXT); potom INSERT INTO recenzie (produkt_id, hodnotenie, text) VALUES (1, 5, 'Super'), (2, 4, 'Dobrá');",
      riesenie: { sql: "CREATE TABLE recenzie (\n  id INTEGER PRIMARY KEY,\n  produkt_id INTEGER REFERENCES produkty(id),\n  hodnotenie INTEGER,\n  text TEXT\n);\nINSERT INTO recenzie (produkt_id, hodnotenie, text)\nVALUES (1, 5, 'Výborný zvuk'), (8, 4, 'Pekný obraz');\nSELECT * FROM recenzie;" },
      kontrola: function (v, kod, r) {
        var s = stlpce(r, "recenzie");
        if (!s.length) return "Tabuľka recenzie neexistuje.";
        var mena = s.map(function (x) { return String(x[0]).toLowerCase(); });
        var chyba = ["id", "produkt_id", "hodnotenie", "text"].filter(function (c) { return mena.indexOf(c) < 0; });
        if (chyba.length) return "Chýba stĺpec: " + chyba.join(", ") + ".";
        var id = s.filter(function (x) { return String(x[0]).toLowerCase() === "id"; })[0];
        if (!id[3]) return "Stĺpec id má byť PRIMARY KEY.";
        var t = r.dotaz("SELECT COUNT(*) FROM recenzie r JOIN produkty p ON r.produkt_id = p.id");
        return t && t.riadky[0][0] >= 2 ? null : "Vlož aspoň 2 recenzie s produkt_id existujúceho produktu (1 až 10).";
      },
      vysvetlenie: "Máš vlastnú tabuľku prepojenú s produktmi." },
  ] };

  var L5 = { id: "sql-5-5", nazov: "Pravidlá pre údaje", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Obmedzenia (constraints)",
      text: "<p>Databáza vie strážiť, aby do nej nevošli nezmysly:</p>" + P.tabulka(["Obmedzenie", "Význam"], [["<code>PRIMARY KEY</code>", "jedinečný identifikátor riadku"], ["<code>NOT NULL</code>", "hodnota musí byť vyplnená"], ["<code>UNIQUE</code>", "hodnota sa nesmie opakovať (napr. e-mail)"], ["<code>DEFAULT x</code>", "predvolená hodnota, keď chýba"], ["<code>CHECK (podmienka)</code>", "hodnota musí spĺňať podmienku"], ["<code>REFERENCES t(id)</code>", "cudzí kľúč"]]) +
        S.kod("CREATE TABLE pouzivatelia (\n  id INTEGER PRIMARY KEY,\n  email TEXT NOT NULL UNIQUE,\n  vek INTEGER CHECK (vek >= 0),\n  aktivny INTEGER DEFAULT 1\n);"),
      podrobne: "<p>Pravidlá v databáze platia vždy, aj keď do nej píše iná aplikácia alebo človek ručne. Preto sa im hovorí „posledná línia obrany“ kvality dát.</p>" },
    { typ: "vyklad", nadpis: "Keď pravidlo neplatí",
      text: "<p>Príkaz, ktorý porušuje pravidlo, skončí chybou a nič sa nezapíše:</p>" + S.kod("INSERT INTO pouzivatelia (email, vek) VALUES ('a@b.sk', -5);\n-- chyba: CHECK constraint failed") + "<p>Aplikácia ti chyby vysvetlí po slovensky. Vyskúšaj si to v úlohe.</p>" },
    { typ: "volba", otazka: "Ktoré obmedzenie zabráni dvom rovnakým e-mailom?", moznosti: ["UNIQUE", "NOT NULL", "DEFAULT", "CHECK"], spravna: 0, vysvetlenie: "UNIQUE = jedinečné." },
    { typ: "volba", otazka: "Čo spraví <code>DEFAULT 1</code>?", moznosti: ["Keď hodnotu nezadáš, uloží sa 1", "Povolí len hodnotu 1", "Zakáže hodnotu 1", "Začne číslovať od 1"], spravna: 0, vysvetlenie: "Predvolená hodnota." },
    { typ: "kod", zadanie: "Vytvor tabuľku <code>pouzivatelia</code>: <code>id</code> INTEGER PRIMARY KEY, <code>email</code> TEXT, ktorý je <b>povinný a jedinečný</b>, a <code>vek</code> INTEGER, ktorý <b>nesmie byť záporný</b> (CHECK). Vlož jedného používateľa.",
      karty: ["sql"], start: { sql: "" }, vyska: "190px",
      napoveda: "email TEXT NOT NULL UNIQUE, vek INTEGER CHECK (vek >= 0)",
      riesenie: { sql: "CREATE TABLE pouzivatelia (\n  id INTEGER PRIMARY KEY,\n  email TEXT NOT NULL UNIQUE,\n  vek INTEGER CHECK (vek >= 0)\n);\nINSERT INTO pouzivatelia (email, vek) VALUES ('jana@mail.sk', 28);" },
      kontrola: function (v, kod, r) {
        var s = stlpce(r, "pouzivatelia");
        if (!s.length) return "Tabuľka pouzivatelia neexistuje.";
        var e = s.filter(function (x) { return String(x[0]).toLowerCase() === "email"; })[0];
        if (!e) return "Chýba stĺpec email.";
        if (!e[2]) return "Stĺpec email má byť NOT NULL.";
        var d = definicia(r, "pouzivatelia");
        if (!/email[^,]*UNIQUE/i.test(d)) return "Stĺpec email má byť UNIQUE.";
        if (!/CHECK\s*\(\s*vek\s*>=?\s*0\s*\)/i.test(d)) return "Pridaj k veku CHECK (vek >= 0).";
        var t = r.dotaz("SELECT COUNT(*) FROM pouzivatelia");
        return t && t.riadky[0][0] >= 1 ? null : "Vlož aspoň jedného používateľa.";
      },
      vysvetlenie: "Skús ešte vložiť záporný vek alebo rovnaký e-mail a pozri, čo sa stane." },
    { typ: "vyklad", nadpis: "Kurz SQL máš za sebou",
      text: "<ul><li><code>SELECT</code>, <code>WHERE</code>, <code>ORDER BY</code>, <code>LIMIT</code>.</li><li><code>GROUP BY</code>, <code>HAVING</code>, agregačné funkcie.</li><li><code>JOIN</code> a <code>LEFT JOIN</code>.</li><li><code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code> (vždy s WHERE!).</li><li><code>CREATE TABLE</code> a obmedzenia.</li></ul>", tip: "Po teste ťa čakajú záverečné projekty: report e-shopu, vlastná databáza knižnice a upratanie údajov." },
  ] };

  var TEST = [
    { typ: "doplnenie", lekcia: "sql-5-1", otazka: "Pridaj zákazníka:", sablona: "[[0]] INTO zakaznici (meno) [[1]] ('Ivan');", zetony: ["INSERT", "VALUES", "ADD", "SET", "UPDATE"], spravne: ["INSERT", "VALUES"], vysvetlenie: "INSERT INTO … VALUES …" },
    { typ: "volba", lekcia: "sql-5-2", otazka: "Ktorý príkaz zvýši sklad produktu 2 o 5?", moznosti: ["<code>UPDATE produkty SET sklad = sklad + 5 WHERE id = 2;</code>", "<code>UPDATE produkty sklad + 5 WHERE id = 2;</code>", "<code>INSERT INTO produkty sklad = 5;</code>", "<code>SET sklad = 5 IN produkty;</code>"], spravna: 0, vysvetlenie: "UPDATE … SET … WHERE …" },
    { typ: "volba", lekcia: "sql-5-2", otazka: "Čo je nebezpečné na <code>UPDATE produkty SET cena = 0;</code>?", moznosti: ["Chýba WHERE, zmení sa každý produkt", "Nič", "Cena nemôže byť 0", "Chýba FROM"], spravna: 0, vysvetlenie: "Bez WHERE platí pre všetky riadky." },
    { typ: "volba", lekcia: "sql-5-3", otazka: "Ktorý príkaz zmaže objednávky so stavom zrušená?", moznosti: ["<code>DELETE FROM objednavky WHERE stav = 'zrušená';</code>", "<code>DROP objednavky WHERE stav = 'zrušená';</code>", "<code>REMOVE FROM objednavky stav = 'zrušená';</code>", "<code>DELETE objednavky;</code>"], spravna: 0, vysvetlenie: "DELETE FROM … WHERE …" },
    { typ: "volba", lekcia: "sql-5-3", otazka: "Aký je rozdiel medzi <code>DELETE FROM t;</code> a <code>DROP TABLE t;</code>?", moznosti: ["DELETE zmaže riadky, DROP celú tabuľku aj so štruktúrou", "Žiadny", "DROP zmaže len prvý riadok", "DELETE je rýchlejší DROP"], spravna: 0, vysvetlenie: "Po DELETE tabuľka ostane prázdna." },
    { typ: "volba", lekcia: "sql-5-4", otazka: "Ktorý typ použiješ v SQLite pre text?", moznosti: ["TEXT", "STRING", "CHAR*", "WORD"], spravna: 0, vysvetlenie: "TEXT." },
    { typ: "volba", lekcia: "sql-5-5", otazka: "Ktoré obmedzenie vyžaduje, aby hodnota bola vyplnená?", moznosti: ["NOT NULL", "UNIQUE", "DEFAULT", "PRIMARY"], spravna: 0, vysvetlenie: "NOT NULL." },
    { typ: "volba", lekcia: "sql-5-5", otazka: "Čo sa stane, keď INSERT poruší CHECK?", moznosti: ["Príkaz skončí chybou a nič sa neuloží", "Uloží sa NULL", "Uloží sa aj tak", "Zmaže sa tabuľka"], spravna: 0, vysvetlenie: "Databáza zlé údaje odmietne." },
  ];

  K.registrujModul("sql", { cislo: 5, nazov: "Úpravy dát", popis: "INSERT, UPDATE, DELETE, CREATE TABLE a pravidlá pre údaje.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
