/* SQL · Databáza kurzu (malý e-shop) a pomôcky pre lekcie */
(function () {
  var P = K.pom;

  K.sqlDatabaza = [
    "CREATE TABLE zakaznici (id INTEGER PRIMARY KEY, meno TEXT NOT NULL, mesto TEXT, vek INTEGER, email TEXT);",
    "INSERT INTO zakaznici VALUES",
    " (1,'Jana Nováková','Bratislava',28,'jana@mail.sk'),(2,'Peter Horváth','Košice',35,'peter@mail.sk'),",
    " (3,'Lucia Kováčová','Žilina',22,NULL),(4,'Martin Varga','Bratislava',41,'martin@mail.sk'),",
    " (5,'Eva Tóthová','Nitra',19,'eva@mail.sk'),(6,'Tomáš Baláž','Košice',30,NULL),",
    " (7,'Zuzana Szabóová','Bratislava',25,'zuzana@mail.sk'),(8,'Michal Molnár','Prešov',52,'michal@mail.sk');",
    "CREATE TABLE produkty (id INTEGER PRIMARY KEY, nazov TEXT NOT NULL, kategoria TEXT, cena REAL, sklad INTEGER);",
    "INSERT INTO produkty VALUES",
    " (1,'Slúchadlá','Elektronika',49.9,15),(2,'Myš','Elektronika',19.9,40),(3,'Klávesnica','Elektronika',34.5,0),",
    " (4,'Batoh','Doplnky',39.0,8),(5,'Fľaša na vodu','Doplnky',12.5,25),(6,'Kniha Python','Knihy',24.9,12),",
    " (7,'Kniha SQL','Knihy',22.0,5),(8,'Monitor','Elektronika',179.0,3),(9,'Hrnček','Doplnky',8.9,60),(10,'Kniha C++','Knihy',29.9,0);",
    "CREATE TABLE objednavky (id INTEGER PRIMARY KEY, zakaznik_id INTEGER REFERENCES zakaznici(id), datum TEXT, stav TEXT);",
    "INSERT INTO objednavky VALUES",
    " (1,1,'2026-01-05','doručená'),(2,2,'2026-01-12','doručená'),(3,1,'2026-02-03','doručená'),",
    " (4,4,'2026-02-14','odoslaná'),(5,5,'2026-02-20','zrušená'),(6,7,'2026-03-01','doručená'),",
    " (7,2,'2026-03-08','nová'),(8,4,'2026-03-15','nová'),(9,8,'2026-03-20','odoslaná');",
    "CREATE TABLE polozky (objednavka_id INTEGER REFERENCES objednavky(id), produkt_id INTEGER REFERENCES produkty(id), mnozstvo INTEGER);",
    "INSERT INTO polozky VALUES",
    " (1,1,1),(1,9,2),(2,8,1),(3,6,1),(3,7,1),(4,2,2),(4,4,1),(5,5,3),",
    " (6,1,1),(6,6,1),(6,9,4),(7,3,1),(8,8,1),(8,2,1),(9,10,1),(9,5,2);",
  ].join("\n");

  var S = P.sql = {};
  /* Prehľad tabuliek databázy (do výkladu alebo zadania) */
  var SCHEMA = {
    zakaznici: "id, meno, mesto, vek, email",
    produkty: "id, nazov, kategoria, cena, sklad",
    objednavky: "id, zakaznik_id, datum, stav",
    polozky: "objednavka_id, produkt_id, mnozstvo",
  };
  S.schema = function (tabulky) {
    return '<div class="sql-schema">' + (tabulky || Object.keys(SCHEMA)).map(function (t) { return "<div><b>" + t + "</b><span>" + SCHEMA[t] + "</span></div>"; }).join("") + "</div>";
  };
  /* Kód dotazu a pod ním jeho skutočný výsledok nad databázou kurzu */
  S.ukaz = function (dotaz) { return '<div class="kod-obal">' + K.blokKodu(dotaz, "sql", "SQL") + '<div class="sql-ziva" data-q="' + K.esc(dotaz) + '">Načítavam výsledok…</div></div>'; };
  S.kod = function (t) { return K.blokKodu(t, "sql"); };

  function hodnota(x) { return typeof x === "number" ? Math.round(x * 100) / 100 : x; }
  function riadokText(r) { return JSON.stringify(r.map(hodnota)); }
  /* Porovná výsledok žiaka so vzorom. Vráti null (OK) alebo vysvetlenie. */
  S.porovnaj = function (t, o, volby) {
    volby = volby || {};
    if (!o) return "Vzorový dotaz sa nepodarilo spustiť.";
    if (!t) return "Dotaz nevrátil žiadnu tabuľku. Výsledok ukáže príkaz SELECT.";
    if (t.stlpce.length !== o.stlpce.length) return "Výsledok má " + t.stlpce.length + " stĺpc" + (t.stlpce.length === 1 ? "" : t.stlpce.length < 5 ? "e" : "ov") + ", očakávam " + o.stlpce.length + " (" + o.stlpce.join(", ") + ").";
    if (volby.nazvy) for (var i = 0; i < o.stlpce.length; i++) if (t.stlpce[i].toLowerCase() !== o.stlpce[i].toLowerCase()) return "Stĺpec " + (i + 1) + " sa má volať „" + o.stlpce[i] + "“ (teraz „" + t.stlpce[i] + "“). Pomôže AS.";
    if (t.riadky.length !== o.riadky.length) return "Výsledok má " + t.riadky.length + " riadkov, očakávam " + o.riadky.length + ". Skontroluj podmienku" + (volby.limit ? " alebo LIMIT" : "") + ".";
    var a = t.riadky.map(riadokText), b = o.riadky.map(riadokText);
    if (volby.poradie) {
      var sa = a.slice().sort().join("\n"), sb = b.slice().sort().join("\n");
      for (var j = 0; j < a.length; j++) if (a[j] !== b[j]) return sa === sb ? "Riadky sú správne, ale v zlom poradí. Skontroluj ORDER BY (ASC / DESC)." : "Riadok " + (j + 1) + " nesedí. Očakávam: " + o.riadky[j].join(" | ");
      return null;
    }
    a.sort(); b.sort();
    for (var k = 0; k < a.length; k++) if (a[k] !== b[k]) return "Niektoré hodnoty nesedia. Skontroluj vybrané stĺpce a podmienku. Napríklad chýba: " + JSON.parse(b[k]).join(" | ");
    return null;
  };
  /* Úloha typu SELECT: výsledok sa porovná so vzorovým dotazom.
     volby: { poradie, nazvy, limit, musi:[[regex, "hláška"]], vstupna:"tabuľky do zadania" } */
  S.uloha = function (zadanie, riesenie, volby) {
    volby = volby || {};
    return {
      typ: "kod", zadanie: zadanie + (volby.tabulky ? S.schema(volby.tabulky) : ""), karty: ["sql"], start: { sql: volby.start || "" }, vyska: volby.vyska || "150px",
      napoveda: volby.napoveda, riesenie: { sql: riesenie }, databaza: volby.databaza,
      kontrola: function (v, kod, r) {
        var cist = kod.replace(/--.*$/gm, "");
        for (var i = 0; i < (volby.musi || []).length; i++) if (!volby.musi[i][0].test(cist)) return volby.musi[i][1];
        if (volby.zmena) {
          var t1 = r.dotaz(volby.zmena), o1 = r.cista(riesenie, volby.zmena);
          var m = S.porovnaj(t1, o1, { poradie: true });
          return m ? "Údaje v tabuľke po tvojom príkaze nesedia. " + m.replace("Výsledok", "Kontrolný výpis") : null;
        }
        return S.porovnaj(r.tabulka, r.cista("", riesenie), volby);
      },
      vysvetlenie: volby.vysvetlenie,
    };
  };
})();
