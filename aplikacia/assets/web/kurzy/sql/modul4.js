/* SQL · Modul 4 · Spájanie tabuliek */
(function () {
  var P = K.pom, S = P.sql, TXT = P.TXT, MONO = P.MONO;

  var OBR_KLUC = '<svg viewBox="0 0 340 130" role="img" aria-label="Stĺpec zakaznik_id v objednávkach ukazuje na id v tabuľke zákazníkov">' +
    '<rect x="8" y="14" width="140" height="104" rx="10" style="fill:var(--surface-2);stroke:#0f8f84;stroke-width:2"/><text x="20" y="34" font-size="12" font-weight="700" ' + TXT + ' style="fill:var(--text)">zakaznici</text>' +
    '<text x="20" y="58" font-size="11.5" ' + MONO + ' style="fill:#0f8f84;font-weight:700">id = 1</text><text x="20" y="78" font-size="11.5" ' + MONO + ' style="fill:var(--text)">Jana</text><text x="20" y="98" font-size="11.5" ' + MONO + ' style="fill:var(--muted)">Bratislava</text>' +
    '<rect x="192" y="14" width="140" height="104" rx="10" style="fill:var(--surface-2);stroke:#3572a5;stroke-width:2"/><text x="204" y="34" font-size="12" font-weight="700" ' + TXT + ' style="fill:var(--text)">objednavky</text>' +
    '<text x="204" y="58" font-size="11.5" ' + MONO + ' style="fill:var(--text)">id = 3</text><text x="204" y="78" font-size="11.5" ' + MONO + ' style="fill:#0f8f84;font-weight:700">zakaznik_id = 1</text><text x="204" y="98" font-size="11.5" ' + MONO + ' style="fill:var(--muted)">2026-02-03</text>' +
    '<path d="M200 74 C170 74 170 54 92 54" style="fill:none;stroke:#0f8f84;stroke-width:2;stroke-dasharray:4 3"/><path d="M98 49l-8 5 8 5" style="fill:#0f8f84"/></svg>';

  var L1 = { id: "sql-4-1", nazov: "Kľúče a vzťahy", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Prečo viac tabuliek",
      text: "<p>Keby sme meno a mesto zákazníka písali do každej objednávky, opakovali by sa. A keby sa Jana presťahovala, museli by sme meniť veľa riadkov. Preto objednávka obsahuje len <b>číslo zákazníka</b>:</p>", obr: OBR_KLUC,
      podrobne: "<ul><li><b>Primárny kľúč</b> (PRIMARY KEY): stĺpec, ktorý jednoznačne určuje riadok, u nás <code>id</code>.</li><li><b>Cudzí kľúč</b> (FOREIGN KEY): stĺpec, ktorý ukazuje na primárny kľúč inej tabuľky, napr. <code>objednavky.zakaznik_id → zakaznici.id</code>.</li></ul><p>Rozdelenie údajov do tabuliek bez opakovania sa volá <b>normalizácia</b>.</p>" },
    { typ: "vyklad", nadpis: "Prepojenia v našom e-shope",
      text: S.schema() + "<ul><li><code>objednavky.zakaznik_id</code> → <code>zakaznici.id</code></li><li><code>polozky.objednavka_id</code> → <code>objednavky.id</code></li><li><code>polozky.produkt_id</code> → <code>produkty.id</code></li></ul>",
      podrobne: "<p>Tabuľka <code>polozky</code> je „spojovacia“: jedna objednávka má viac produktov a jeden produkt je vo viacerých objednávkach. Takému vzťahu sa hovorí M:N (mnoho k mnohým).</p>" },
    { typ: "volba", otazka: "Čo je primárny kľúč?", moznosti: ["Stĺpec, ktorý jednoznačne určuje riadok", "Najdôležitejší stĺpec s menom", "Heslo k databáze", "Prvý riadok tabuľky"], spravna: 0, vysvetlenie: "Napr. id, žiadne dva riadky ho nemajú rovnaké." },
    { typ: "volba", otazka: "Na čo ukazuje <code>polozky.produkt_id</code>?", moznosti: ["<code>produkty.id</code>", "<code>objednavky.id</code>", "<code>zakaznici.id</code>", "<code>polozky.id</code>"], spravna: 0, vysvetlenie: "Číslo produktu v položke." },
    S.uloha("Rozcvička bez spájania: vypíš všetky stĺpce objednávok zákazníka s <code>id</code> 1.", "SELECT * FROM objednavky WHERE zakaznik_id = 1;", { tabulky: ["objednavky"], napoveda: "WHERE zakaznik_id = 1" }),
  ] };

  var L2 = { id: "sql-4-2", nazov: "INNER JOIN", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Spojenie dvoch tabuliek",
      text: "<p><code>JOIN</code> poskladá riadky z dvoch tabuliek k sebe. Za <code>ON</code> napíšeš, ktoré stĺpce sa majú zhodovať:</p>" + S.ukaz("SELECT objednavky.id, zakaznici.meno, objednavky.datum\nFROM objednavky\nJOIN zakaznici ON objednavky.zakaznik_id = zakaznici.id;"),
      podrobne: "<p><code>JOIN</code> a <code>INNER JOIN</code> sú to isté. Vo výsledku sú len riadky, ktoré majú pár v oboch tabuľkách. Zápis <code>tabulka.stlpec</code> hovorí, z ktorej tabuľky stĺpec je. Je povinný, keď majú obe tabuľky stĺpec s rovnakým menom (tu <code>id</code>).</p>" },
    { typ: "vyklad", nadpis: "Kratšie s aliasmi tabuliek",
      text: "<p>Tabuľke môžeš dať krátke meno priamo za FROM alebo JOIN:</p>" + S.ukaz("SELECT o.id, z.meno, z.mesto, o.stav\nFROM objednavky o\nJOIN zakaznici z ON o.zakaznik_id = z.id\nWHERE z.mesto = 'Bratislava';"),
      podrobne: "<p>Za JOIN môžeš pokračovať ako obvykle: WHERE, GROUP BY, ORDER BY, LIMIT.</p>" },
    { typ: "volba", otazka: "Čo patrí za <code>ON</code>?", moznosti: ["Podmienka, ktoré stĺpce sa majú zhodovať", "Názov novej tabuľky", "Zoznam stĺpcov na výpis", "Počet riadkov"], spravna: 0, vysvetlenie: "Napr. o.zakaznik_id = z.id" },
    { typ: "doplnenie", otazka: "Spoj položky s produktmi:", sablona: "SELECT p.nazov, po.mnozstvo FROM polozky po [[0]] produkty p [[1]] po.produkt_id = p.[[2]];", zetony: ["JOIN", "ON", "id", "WHERE", "nazov", "AND"], spravne: ["JOIN", "ON", "id"], vysvetlenie: "JOIN … ON po.produkt_id = p.id" },
    S.uloha("Vypíš <code>datum</code> a <code>stav</code> každej objednávky spolu s <code>meno</code> zákazníka (v tomto poradí: meno, datum, stav).", "SELECT z.meno, o.datum, o.stav FROM objednavky o JOIN zakaznici z ON o.zakaznik_id = z.id;", { tabulky: ["zakaznici", "objednavky"], musi: [[/JOIN/i, "Spoj tabuľky cez JOIN."]], napoveda: "FROM objednavky o JOIN zakaznici z ON o.zakaznik_id = z.id" }),
    S.uloha("Vypíš mená zákazníkov a dátum ich objednávok so stavom <b>nová</b>.", "SELECT z.meno, o.datum FROM objednavky o JOIN zakaznici z ON o.zakaznik_id = z.id WHERE o.stav = 'nová';", { tabulky: ["zakaznici", "objednavky"], napoveda: "… JOIN … WHERE o.stav = 'nová'" }),
  ] };

  var L3 = { id: "sql-4-3", nazov: "Viac tabuliek naraz", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Reťaz JOINov",
      text: "<p>Čo presne si kto kúpil? Treba spojiť štyri tabuľky. Každý ďalší JOIN pridá jednu tabuľku:</p>" + S.ukaz("SELECT z.meno, p.nazov, po.mnozstvo\nFROM polozky po\nJOIN objednavky o ON po.objednavka_id = o.id\nJOIN zakaznici z ON o.zakaznik_id = z.id\nJOIN produkty p ON po.produkt_id = p.id\nORDER BY z.meno;"),
      podrobne: "<p>Postupuj po šípkach vzťahov: položka → objednávka → zákazník, a položka → produkt. Každý JOIN má vlastné ON.</p>" },
    { typ: "vyklad", nadpis: "Výpočty cez viac tabuliek",
      text: "<p>Cena je v produktoch, množstvo v položkách. Po spojení ich vynásobíš:</p>" + S.ukaz("SELECT po.objednavka_id, p.nazov,\n       po.mnozstvo * p.cena AS spolu\nFROM polozky po\nJOIN produkty p ON po.produkt_id = p.id\nWHERE po.objednavka_id = 6;") },
    { typ: "volba", otazka: "Koľko JOINov potrebuješ na spojenie 3 tabuliek?", moznosti: ["2", "3", "1", "4"], spravna: 0, vysvetlenie: "FROM prvá, potom JOIN druhá a JOIN tretia." },
    S.uloha("Vypíš <code>nazov</code> produktu a <code>mnozstvo</code> pre všetky položky objednávky číslo <b>3</b>.", "SELECT p.nazov, po.mnozstvo FROM polozky po JOIN produkty p ON po.produkt_id = p.id WHERE po.objednavka_id = 3;", { tabulky: ["polozky", "produkty"], napoveda: "FROM polozky po JOIN produkty p ON po.produkt_id = p.id WHERE po.objednavka_id = 3" }),
    S.uloha("Vypíš <code>meno</code> zákazníka a <code>nazov</code> produktu pre všetko, čo kedy objednali zákazníci z <b>Bratislavy</b>.", "SELECT z.meno, p.nazov FROM polozky po JOIN objednavky o ON po.objednavka_id = o.id JOIN zakaznici z ON o.zakaznik_id = z.id JOIN produkty p ON po.produkt_id = p.id WHERE z.mesto = 'Bratislava';", { tabulky: ["zakaznici", "objednavky", "polozky", "produkty"], vyska: "190px", napoveda: "polozky → objednavky → zakaznici a polozky → produkty, potom WHERE z.mesto = 'Bratislava'" }),
  ] };

  var L4 = { id: "sql-4-4", nazov: "LEFT JOIN", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Aj tie bez páru",
      text: "<p>INNER JOIN vynechá zákazníkov bez objednávky. <code>LEFT JOIN</code> ponechá <b>všetky riadky z ľavej tabuľky</b> (tej za FROM). Kde pár chýba, doplní NULL:</p>" + S.ukaz("SELECT z.meno, o.id AS objednavka\nFROM zakaznici z\nLEFT JOIN objednavky o ON o.zakaznik_id = z.id;"),
      podrobne: "<p>Lucia a Tomáš majú v stĺpci objednavka NULL, ešte nič nekúpili. Existuje aj RIGHT JOIN (ponechá pravú tabuľku), ale v praxi sa skoro vždy používa LEFT JOIN s tabuľkami v správnom poradí.</p>" },
    { typ: "vyklad", nadpis: "Hľadanie chýbajúcich",
      text: "<p>LEFT JOIN + <code>IS NULL</code> nájde riadky, ktoré nemajú pár:</p>" + S.ukaz("SELECT z.meno\nFROM zakaznici z\nLEFT JOIN objednavky o ON o.zakaznik_id = z.id\nWHERE o.id IS NULL;") },
    { typ: "volba", otazka: "Čo spraví LEFT JOIN so zákazníkom, ktorý nemá objednávku?", moznosti: ["Ponechá ho, stĺpce objednávky budú NULL", "Vynechá ho", "Skončí chybou", "Zduplikuje ho"], spravna: 0, vysvetlenie: "Ľavá tabuľka zostáva celá." },
    { typ: "volba", otazka: "Ktorá tabuľka je pri <code>FROM a LEFT JOIN b</code> „ľavá“?", moznosti: ["a", "b", "tá s menej riadkami", "obe"], spravna: 0, vysvetlenie: "Tá za FROM." },
    S.uloha("Vypíš <code>meno</code> každého zákazníka a <code>datum</code> jeho objednávok. Zákazníkov bez objednávky nevynechaj.", "SELECT z.meno, o.datum FROM zakaznici z LEFT JOIN objednavky o ON o.zakaznik_id = z.id;", { tabulky: ["zakaznici", "objednavky"], musi: [[/LEFT\s+JOIN/i, "Použi LEFT JOIN, aby ostali aj zákazníci bez objednávky."]], napoveda: "FROM zakaznici z LEFT JOIN objednavky o ON o.zakaznik_id = z.id" }),
  ] };

  var L5 = { id: "sql-4-5", nazov: "JOIN a štatistiky", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Spoj a zoskup",
      text: "<p>Najsilnejšie dotazy kombinujú JOIN s GROUP BY. Koľko objednávok má každý zákazník?</p>" + S.ukaz("SELECT z.meno, COUNT(o.id) AS objednavok\nFROM zakaznici z\nLEFT JOIN objednavky o ON o.zakaznik_id = z.id\nGROUP BY z.id, z.meno\nORDER BY objednavok DESC, z.meno;"),
      podrobne: "<p>Prečo <code>COUNT(o.id)</code> a nie <code>COUNT(*)</code>? Pri zákazníkovi bez objednávky by COUNT(*) započítal riadok s NULL ako 1. COUNT(o.id) NULL nepočíta, takže správne vráti 0.</p>" },
    { typ: "vyklad", nadpis: "Tržby",
      text: S.ukaz("SELECT p.kategoria,\n       SUM(po.mnozstvo * p.cena) AS trzba\nFROM polozky po\nJOIN produkty p ON po.produkt_id = p.id\nGROUP BY p.kategoria\nORDER BY trzba DESC;") + "<p>Takéto dotazy píšu analytici každý deň. Odpovedajú na otázky ako „čo sa predáva najlepšie“.</p>" },
    { typ: "volba", otazka: "Prečo je pri LEFT JOIN lepšie <code>COUNT(o.id)</code> ako <code>COUNT(*)</code>?", moznosti: ["COUNT(o.id) nezapočíta chýbajúce (NULL) objednávky, takže dá 0", "Je rýchlejšie", "COUNT(*) nefunguje s JOIN", "Nie je rozdiel"], spravna: 0, vysvetlenie: "COUNT(stĺpec) vynechá NULL." },
    S.uloha("Pre každý produkt, ktorý sa predal, vypíš <code>nazov</code> a celkové predané množstvo ako <code>predane</code>, zoradené od najviac predaného (pri zhode podľa názvu).", "SELECT p.nazov, SUM(po.mnozstvo) AS predane FROM polozky po JOIN produkty p ON po.produkt_id = p.id GROUP BY p.id, p.nazov ORDER BY predane DESC, p.nazov;", { tabulky: ["polozky", "produkty"], nazvy: true, poradie: true, vyska: "170px", napoveda: "JOIN produkty, GROUP BY p.id, p.nazov, SUM(po.mnozstvo) AS predane, ORDER BY predane DESC, p.nazov" }),
    S.uloha("Vypíš <code>meno</code> zákazníka a celkovú sumu všetkých jeho položiek ako <code>minul</code> (zaokrúhlenú na 2 desatinné miesta). Len zákazníkov, ktorí niečo kúpili.", "SELECT z.meno, ROUND(SUM(po.mnozstvo * p.cena), 2) AS minul FROM polozky po JOIN objednavky o ON po.objednavka_id = o.id JOIN zakaznici z ON o.zakaznik_id = z.id JOIN produkty p ON po.produkt_id = p.id GROUP BY z.id, z.meno;", { tabulky: ["zakaznici", "objednavky", "polozky", "produkty"], nazvy: true, vyska: "200px", napoveda: "Spoj všetky 4 tabuľky, GROUP BY z.id, z.meno a SUM(po.mnozstvo * p.cena)." }),
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li>Primárne a cudzie kľúče.</li><li><code>JOIN … ON …</code> a aliasy tabuliek.</li><li>Reťaz JOINov cez viac tabuliek.</li><li><code>LEFT JOIN</code> a hľadanie chýbajúcich cez <code>IS NULL</code>.</li><li>JOIN + GROUP BY = štatistiky a tržby.</li></ul>", tip: "Posledný modul: budeš údaje pridávať, meniť, mazať a vytvoríš vlastnú tabuľku." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "sql-4-1", otazka: "Čo je cudzí kľúč?", moznosti: ["Stĺpec, ktorý ukazuje na primárny kľúč inej tabuľky", "Kľúč od cudzej databázy", "Stĺpec s textom", "Druhý primárny kľúč"], spravna: 0, vysvetlenie: "Napr. objednavky.zakaznik_id." },
    { typ: "volba", lekcia: "sql-4-2", otazka: "Ktorý zápis spojí objednávky so zákazníkmi?", moznosti: ["<code>FROM objednavky o JOIN zakaznici z ON o.zakaznik_id = z.id</code>", "<code>FROM objednavky, zakaznici WHERE id = id</code>", "<code>JOIN objednavky + zakaznici</code>", "<code>FROM objednavky ON zakaznici</code>"], spravna: 0, vysvetlenie: "JOIN … ON zhoda kľúčov." },
    { typ: "volba", lekcia: "sql-4-2", otazka: "Prečo píšeme <code>z.id</code> a nie len <code>id</code>?", moznosti: ["Stĺpec id je v oboch tabuľkách", "Je to rýchlejšie", "id je kľúčové slovo", "Netreba, je to jedno"], spravna: 0, vysvetlenie: "Inak „ambiguous column name“." },
    { typ: "volba", lekcia: "sql-4-3", otazka: "Koľko JOINov potrebuješ na spojenie položiek, objednávok, zákazníkov a produktov?", moznosti: ["3", "4", "2", "1"], spravna: 0, vysvetlenie: "4 tabuľky = FROM + 3 JOINy." },
    { typ: "volba", lekcia: "sql-4-4", otazka: "Ako nájdeš zákazníkov bez objednávky?", moznosti: ["LEFT JOIN objednávok a WHERE o.id IS NULL", "INNER JOIN a WHERE o.id = 0", "JOIN bez ON", "Nedá sa"], spravna: 0, vysvetlenie: "Chýbajúci pár má NULL." },
    { typ: "volba", lekcia: "sql-4-4", otazka: "Ktorý JOIN ponechá všetky riadky z tabuľky za FROM?", moznosti: ["LEFT JOIN", "INNER JOIN", "JOIN", "CROSS JOIN"], spravna: 0, vysvetlenie: "LEFT = ľavá zostáva celá." },
    { typ: "doplnenie", lekcia: "sql-4-5", otazka: "Počet objednávok každého zákazníka:", sablona: "SELECT z.meno, [[0]](o.id) FROM zakaznici z LEFT JOIN objednavky o ON o.zakaznik_id = z.id [[1]] BY z.id, z.meno;", zetony: ["COUNT", "GROUP", "SUM", "ORDER", "HAVING"], spravne: ["COUNT", "GROUP"], vysvetlenie: "COUNT(o.id) … GROUP BY" },
  ];

  K.registrujModul("sql", { cislo: 4, nazov: "Spájanie tabuliek", popis: "Kľúče, JOIN, viac tabuliek, LEFT JOIN a štatistiky cez spojené tabuľky.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
