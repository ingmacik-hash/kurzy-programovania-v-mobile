/* SQL · Modul 3 · Zoskupovanie */
(function () {
  var P = K.pom, S = P.sql, TXT = P.TXT;

  var OBR_GROUP = '<svg viewBox="0 0 340 140" role="img" aria-label="GROUP BY rozdelí riadky do skupín a z každej skupiny spraví jeden riadok">' +
    [["Elektronika", "#3572a5", 4], ["Doplnky", "#e0522b", 3], ["Knihy", "#0f8f84", 3]].map(function (g, i) {
      var y = 12 + i * 42, s = "";
      for (var j = 0; j < g[2]; j++) s += '<rect x="' + (12 + j * 26) + '" y="' + y + '" width="22" height="28" rx="4" style="fill:' + g[1] + ';opacity:.85"/>';
      return s + '<path d="M128 ' + (y + 14) + 'h60" style="stroke:var(--muted);stroke-width:2"/><path d="M182 ' + (y + 8) + 'l8 6-8 6" style="fill:var(--muted)"/>' +
        '<rect x="198" y="' + y + '" width="132" height="28" rx="6" style="fill:' + g[1] + '"/><text x="206" y="' + (y + 19) + '" font-size="12" font-weight="700" ' + TXT + ' fill="#fff">' + g[0] + " · " + g[2] + "</text>";
    }).join("") + "</svg>";

  var L1 = { id: "sql-3-1", nazov: "COUNT, SUM, AVG", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Agregačné funkcie",
      text: "<p>Agregačná funkcia spracuje veľa riadkov a vráti jedno číslo:</p>" + P.tabulka(["Funkcia", "Vráti"], [["<code>COUNT(*)</code>", "počet riadkov"], ["<code>SUM(x)</code>", "súčet"], ["<code>AVG(x)</code>", "priemer"], ["<code>MIN(x)</code>, <code>MAX(x)</code>", "najmenšiu, najväčšiu hodnotu"]]) + S.ukaz("SELECT COUNT(*) AS pocet,\n       ROUND(AVG(cena), 2) AS priemer,\n       MAX(cena) AS najdrahsi\nFROM produkty;"),
      podrobne: "<p><code>COUNT(*)</code> počíta riadky. <code>COUNT(email)</code> počíta len riadky, kde email nie je NULL. <code>COUNT(DISTINCT mesto)</code> počíta rôzne mestá.</p>" },
    { typ: "vyklad", nadpis: "S podmienkou",
      text: "<p>WHERE sa vyhodnotí najprv, funkcia potom spočíta len vybrané riadky:</p>" + S.ukaz("SELECT COUNT(*) AS z_bratislavy\nFROM zakaznici\nWHERE mesto = 'Bratislava';") },
    { typ: "volba", otazka: "Čo vráti <code>SELECT COUNT(email) FROM zakaznici;</code>, keď 2 z 8 zákazníkov nemajú e-mail?", moznosti: ["6", "8", "2", "NULL"], spravna: 0, vysvetlenie: "COUNT(stĺpec) vynechá NULL." },
    { typ: "volba", otazka: "Ktorá funkcia vráti najnižšiu cenu?", moznosti: ["<code>MIN(cena)</code>", "<code>LOW(cena)</code>", "<code>SMALL(cena)</code>", "<code>FIRST(cena)</code>"], spravna: 0, vysvetlenie: "MIN a MAX." },
    S.uloha("Zisti, koľko kusov tovaru je spolu na sklade. Výsledok pomenuj <code>spolu</code>.", "SELECT SUM(sklad) AS spolu FROM produkty;", { tabulky: ["produkty"], nazvy: true, napoveda: "SELECT SUM(sklad) AS spolu FROM produkty;" }),
    S.uloha("Zisti priemerný vek zákazníkov z Bratislavy, zaokrúhlený na 1 desatinné miesto, ako stĺpec <code>priemer</code>.", "SELECT ROUND(AVG(vek), 1) AS priemer FROM zakaznici WHERE mesto = 'Bratislava';", { tabulky: ["zakaznici"], nazvy: true, napoveda: "SELECT ROUND(AVG(vek), 1) AS priemer FROM zakaznici WHERE …" }),
  ] };

  var L2 = { id: "sql-3-2", nazov: "GROUP BY", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Štatistika za každú skupinu",
      text: "<p><code>GROUP BY</code> rozdelí riadky do skupín podľa hodnoty stĺpca a agregačnú funkciu spočíta pre každú skupinu zvlášť:</p>", obr: OBR_GROUP,
      podrobne: S.ukaz("SELECT kategoria, COUNT(*) AS pocet\nFROM produkty\nGROUP BY kategoria;") },
    { typ: "vyklad", nadpis: "Pravidlo GROUP BY",
      text: "<p>V SELECT môžu byť len <b>stĺpce, podľa ktorých zoskupuješ</b>, a agregačné funkcie:</p>" + S.ukaz("SELECT mesto,\n       COUNT(*) AS zakaznikov,\n       ROUND(AVG(vek), 1) AS priemerny_vek\nFROM zakaznici\nGROUP BY mesto\nORDER BY zakaznikov DESC;"),
      podrobne: "<p>Keby si do SELECT dal aj <code>meno</code>, ktoré meno by sa malo ukázať za Bratislavu, keď sú tam traja? Väčšina databáz to zakáže. SQLite vyberie náhodné, čo je ešte horšie.</p>" },
    { typ: "volba", otazka: "Koľko riadkov vráti <code>SELECT kategoria, COUNT(*) FROM produkty GROUP BY kategoria;</code>? (3 kategórie)", moznosti: ["3", "10", "1", "30"], spravna: 0, vysvetlenie: "Jeden riadok za skupinu." },
    { typ: "doplnenie", otazka: "Počet objednávok podľa stavu:", sablona: "SELECT stav, [[0]](*) FROM objednavky [[1]] [[2]] stav;", zetony: ["COUNT", "GROUP", "BY", "ORDER", "SUM", "WHERE"], spravne: ["COUNT", "GROUP", "BY"], vysvetlenie: "GROUP BY stav." },
    S.uloha("Pre každú kategóriu vypíš <code>kategoria</code> a priemernú cenu zaokrúhlenú na 2 desatinné miesta ako <code>priemerna_cena</code>.", "SELECT kategoria, ROUND(AVG(cena), 2) AS priemerna_cena FROM produkty GROUP BY kategoria;", { tabulky: ["produkty"], nazvy: true, napoveda: "SELECT kategoria, ROUND(AVG(cena), 2) AS priemerna_cena FROM produkty GROUP BY kategoria;" }),
    S.uloha("Vypíš, koľko objednávok má každý stav (<code>stav</code>, <code>pocet</code>), zoradené od najväčšieho počtu. Pri rovnakom počte zoraď podľa stavu abecedne.", "SELECT stav, COUNT(*) AS pocet FROM objednavky GROUP BY stav ORDER BY pocet DESC, stav;", { tabulky: ["objednavky"], poradie: true, nazvy: true, napoveda: "GROUP BY stav ORDER BY pocet DESC, stav" }),
  ] };

  var L3 = { id: "sql-3-3", nazov: "HAVING", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Podmienka pre skupiny",
      text: "<p><code>WHERE</code> filtruje <b>riadky pred</b> zoskupením. <code>HAVING</code> filtruje <b>skupiny po</b> zoskupení, preto v ňom môžeš použiť COUNT, SUM a podobne:</p>" + S.ukaz("SELECT mesto, COUNT(*) AS pocet\nFROM zakaznici\nGROUP BY mesto\nHAVING COUNT(*) >= 2;"),
      podrobne: "<p>Celé poradie: <code>SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT</code>. Databáza ho vykonáva takto: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.</p>" },
    { typ: "vyklad", nadpis: "WHERE aj HAVING naraz",
      text: S.ukaz("SELECT kategoria, SUM(sklad) AS kusov\nFROM produkty\nWHERE cena < 100\nGROUP BY kategoria\nHAVING SUM(sklad) > 20;") + "<p>Najprv sa vyradí drahý monitor (WHERE), potom sa zoskupí a nakoniec ostanú len kategórie s viac ako 20 kusmi (HAVING).</p>" },
    { typ: "volba", otazka: "Prečo nefunguje <code>WHERE COUNT(*) &gt; 2</code>?", moznosti: ["WHERE beží pred zoskupením, podmienku na skupiny píš do HAVING", "COUNT sa píše malými", "Chýba ORDER BY", "Funguje"], spravna: 0, vysvetlenie: "Na skupiny je HAVING." },
    { typ: "poradie", otazka: "Zoraď časti dotazu:", jazyk: "sql", riadky: ["SELECT mesto, COUNT(*)", "FROM zakaznici", "WHERE vek > 20", "GROUP BY mesto", "HAVING COUNT(*) > 1", "ORDER BY mesto;"], vysvetlenie: "WHERE pred GROUP BY, HAVING za ním." },
    S.uloha("Vypíš kategórie (<code>kategoria</code>, <code>pocet</code>), ktoré majú <b>aspoň 4</b> produkty.", "SELECT kategoria, COUNT(*) AS pocet FROM produkty GROUP BY kategoria HAVING COUNT(*) >= 4;", { tabulky: ["produkty"], musi: [[/HAVING/i, "Podmienku na skupiny daj do HAVING."]], napoveda: "GROUP BY kategoria HAVING COUNT(*) >= 4" }),
  ] };

  var L4 = { id: "sql-3-4", nazov: "CASE: ak – tak", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Podmienka vo výsledku",
      text: "<p><code>CASE</code> funguje ako if/else priamo v SELECT. Vráti hodnotu podľa prvej podmienky, ktorá platí:</p>" + S.ukaz("SELECT nazov, cena,\n  CASE\n    WHEN cena < 20 THEN 'lacné'\n    WHEN cena < 50 THEN 'stredné'\n    ELSE 'drahé'\n  END AS trieda\nFROM produkty;"),
      podrobne: "<p>Každý CASE končí slovom <code>END</code>. Ak nič neplatí a chýba ELSE, výsledok je NULL.</p>" },
    { typ: "vyklad", nadpis: "CASE so zoskupením",
      text: "<p>Silná kombinácia: najprv rozdeľ riadky cez CASE a potom ich spočítaj:</p>" + S.ukaz("SELECT CASE WHEN sklad = 0 THEN 'vypredané' ELSE 'na sklade' END AS stav,\n       COUNT(*) AS pocet\nFROM produkty\nGROUP BY stav;") },
    { typ: "volba", otazka: "Čím musí končiť CASE?", moznosti: ["<code>END</code>", "<code>ELSE</code>", "<code>STOP</code>", "<code>;</code>"], spravna: 0, vysvetlenie: "CASE … END." },
    { typ: "volba", otazka: "Čo vráti CASE pre cenu 20, keď prvá vetva je <code>WHEN cena &lt; 20 THEN 'lacné'</code> a druhá <code>WHEN cena &lt; 50 THEN 'stredné'</code>?", moznosti: ["stredné", "lacné", "NULL", "drahé"], spravna: 0, vysvetlenie: "20 nie je menej ako 20, platí až druhá vetva." },
    S.uloha("Vypíš <code>meno</code>, <code>vek</code> a stĺpec <code>skupina</code>: <b>'junior'</b> pre vek do 25 vrátane, inak <b>'senior'</b>.", "SELECT meno, vek, CASE WHEN vek <= 25 THEN 'junior' ELSE 'senior' END AS skupina FROM zakaznici;", { tabulky: ["zakaznici"], nazvy: true, musi: [[/CASE/i, "Použi CASE WHEN … THEN … ELSE … END."]], napoveda: "CASE WHEN vek <= 25 THEN 'junior' ELSE 'senior' END AS skupina" }),
  ] };

  var L5 = { id: "sql-3-5", nazov: "Poddotazy", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Dotaz v dotaze",
      text: "<p>Ktoré produkty sú drahšie ako priemer? Priemer najprv nevieš, tak ho zistí <b>poddotaz</b> v zátvorkách:</p>" + S.ukaz("SELECT nazov, cena\nFROM produkty\nWHERE cena > (SELECT AVG(cena) FROM produkty);"),
      podrobne: "<p>Poddotaz sa vykoná najprv a jeho výsledok (jedno číslo) sa dosadí do podmienky. Poddotaz, ktorý vracia zoznam, sa používa s <code>IN</code>.</p>" },
    { typ: "vyklad", nadpis: "Poddotaz so zoznamom",
      text: "<p>Zákazníci, ktorí niečo objednali: id z objednávok a k nim mená:</p>" + S.ukaz("SELECT meno\nFROM zakaznici\nWHERE id IN (SELECT zakaznik_id FROM objednavky);"),
      podrobne: "<p>S <code>NOT IN</code> nájdeš zákazníkov, ktorí ešte nič neobjednali. To isté sa dá zapísať aj spojením tabuliek (JOIN), ktoré sa naučíš v ďalšom module.</p>" },
    { typ: "volba", otazka: "Kedy sa vykoná poddotaz v zátvorkách?", moznosti: ["Najprv, jeho výsledok sa použije vo vonkajšom dotaze", "Nakoniec", "Nikdy", "Len pri ORDER BY"], spravna: 0, vysvetlenie: "Zvnútra von." },
    S.uloha("Vypíš <code>meno</code> a <code>vek</code> zákazníka (alebo zákazníkov), ktorý je <b>najmladší</b>. Použi poddotaz s MIN.", "SELECT meno, vek FROM zakaznici WHERE vek = (SELECT MIN(vek) FROM zakaznici);", { tabulky: ["zakaznici"], musi: [[/\(\s*SELECT/i, "Použi poddotaz (SELECT MIN(vek) FROM zakaznici)."]], napoveda: "WHERE vek = (SELECT MIN(vek) FROM zakaznici)" }),
    S.uloha("Vypíš mená zákazníkov, ktorí <b>ešte nemajú</b> žiadnu objednávku.", "SELECT meno FROM zakaznici WHERE id NOT IN (SELECT zakaznik_id FROM objednavky);", { tabulky: ["zakaznici", "objednavky"], napoveda: "WHERE id NOT IN (SELECT zakaznik_id FROM objednavky)" }),
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li><code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>.</li><li><code>GROUP BY</code>: štatistika za skupiny.</li><li><code>HAVING</code>: podmienka na skupiny.</li><li><code>CASE WHEN … THEN … END</code>.</li><li>Poddotazy v zátvorkách.</li></ul>", tip: "V ďalšom module spojíš viac tabuliek naraz: zákazníkov, objednávky aj produkty." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "sql-3-1", otazka: "Čo vráti <code>COUNT(*)</code>?", moznosti: ["Počet riadkov", "Súčet hodnôt", "Počet stĺpcov", "Priemer"], spravna: 0, vysvetlenie: "Počet riadkov." },
    { typ: "volba", lekcia: "sql-3-1", otazka: "Ktorá funkcia vypočíta priemer?", moznosti: ["<code>AVG</code>", "<code>MEAN</code>", "<code>AVERAGE</code>", "<code>MID</code>"], spravna: 0, vysvetlenie: "AVG." },
    { typ: "volba", lekcia: "sql-3-2", otazka: "Čo spraví <code>GROUP BY mesto</code>?", moznosti: ["Vytvorí jednu skupinu (riadok) pre každé mesto", "Zoradí podľa mesta", "Odstráni mestá", "Spojí tabuľky"], spravna: 0, vysvetlenie: "Skupina za každú hodnotu." },
    { typ: "volba", lekcia: "sql-3-2", otazka: "Ktorý stĺpec môžeš dať do SELECT pri <code>GROUP BY kategoria</code>?", moznosti: ["kategoria a agregačné funkcie", "Hocijaký stĺpec", "Len id", "Len *"], spravna: 0, vysvetlenie: "Iné stĺpce nemajú v skupine jednu hodnotu." },
    { typ: "volba", lekcia: "sql-3-3", otazka: "Aký je rozdiel medzi WHERE a HAVING?", moznosti: ["WHERE filtruje riadky pred zoskupením, HAVING skupiny po ňom", "Žiadny", "HAVING je rýchlejšie", "WHERE je len pre text"], spravna: 0, vysvetlenie: "Riadky vs. skupiny." },
    { typ: "doplnenie", lekcia: "sql-3-4", otazka: "Doplň CASE:", sablona: "CASE [[0]] sklad = 0 [[1]] 'nie je' [[2]] 'je' [[3]]", zetony: ["WHEN", "THEN", "ELSE", "END", "IF"], spravne: ["WHEN", "THEN", "ELSE", "END"], vysvetlenie: "CASE WHEN … THEN … ELSE … END" },
    { typ: "volba", lekcia: "sql-3-5", otazka: "Čo robí tento dotaz?", kod: "SELECT nazov FROM produkty\nWHERE cena = (SELECT MAX(cena) FROM produkty);", jazyk: "sql", moznosti: ["Vypíše najdrahší produkt", "Vypíše všetky produkty", "Vypíše najlacnejší produkt", "Skončí chybou"], spravna: 0, vysvetlenie: "Poddotaz zistí najvyššiu cenu." },
    { typ: "poradie", lekcia: "sql-3-3", otazka: "Zoraď časti dotazu:", jazyk: "sql", riadky: ["SELECT kategoria, COUNT(*)", "FROM produkty", "GROUP BY kategoria", "HAVING COUNT(*) > 2;"], vysvetlenie: "GROUP BY, potom HAVING." },
  ];

  K.registrujModul("sql", { cislo: 3, nazov: "Zoskupovanie", popis: "Agregačné funkcie, GROUP BY, HAVING, CASE a poddotazy.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
