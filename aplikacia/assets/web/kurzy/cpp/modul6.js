/* C++ · Modul 6 · Triedy a objekty */
(function () {
  var P = K.pom, CPP = function (t) { return P.kod(t, "cpp"); }, MONO = P.MONO, TXT = P.TXT;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "cpp", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function program(triedy, telo) { return "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\n" + triedy + "\n\nint main() {\n" + telo + "\n    return 0;\n}"; }

  var OBR_TRIEDA = '<svg viewBox="0 0 340 130" role="img" aria-label="Trieda je plán, objekty sú konkrétne výrobky podľa plánu, každý s vlastnými hodnotami">' +
    '<rect x="8" y="14" width="120" height="104" rx="10" style="fill:var(--surface-2);stroke:#c0365b;stroke-width:2;stroke-dasharray:5 4"/><text x="68" y="34" text-anchor="middle" font-size="12.5" font-weight="700" ' + MONO + ' style="fill:#c0365b">class Pes</text>' +
    '<text x="20" y="58" font-size="11" ' + MONO + ' style="fill:var(--text)">meno</text><text x="20" y="76" font-size="11" ' + MONO + ' style="fill:var(--text)">vek</text><text x="20" y="102" font-size="11" ' + MONO + ' style="fill:var(--hl-kw)">stekaj()</text>' +
    [["Rex", "3"], ["Bella", "7"]].map(function (p, i) {
      var y = 14 + i * 56;
      return '<path d="M130 66 L176 ' + (y + 24) + '" style="stroke:var(--muted);stroke-width:1.5"/><rect x="180" y="' + y + '" width="150" height="48" rx="10" style="fill:#c0365b"/><text x="192" y="' + (y + 20) + '" font-size="11.5" font-weight="700" ' + MONO + ' fill="#fff">objekt</text><text x="192" y="' + (y + 38) + '" font-size="11.5" ' + MONO + ' fill="#ffe0e8">meno=' + p[0] + " vek=" + p[1] + "</text>";
    }).join("") + "</svg>";

  var L1 = { id: "cpp-6-1", nazov: "struct", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Vlastný typ s viacerými údajmi",
      text: "<p><code>struct</code> spojí viac premenných do jedného nového typu. Ku časti sa dostaneš cez <b>bodku</b>:</p>" + UKAZ('struct Bod {\n    double x;\n    double y;\n};\n\nint main() {\n    Bod a = {3, 4};\n    Bod b;\n    b.x = 1;\n    b.y = 2;\n    cout << a.x + b.x << endl;\n    return 0;\n}', "4"),
      podrobne: "<p>Za zatváracou zátvorkou struct (a class) je <b>bodkočiarka</b>. Často sa na ňu zabúda. Vlastné typy sa podľa zvyku píšu s veľkým začiatočným písmenom.</p>" },
    { typ: "volba", otazka: "Ako sa dostaneš k položke <code>meno</code> premennej <code>ziak</code>?", moznosti: ["<code>ziak.meno</code>", "<code>ziak[meno]</code>", "<code>ziak-&gt;meno</code> je jediná možnosť", "<code>meno(ziak)</code>"], spravna: 0, vysvetlenie: "Bodka." },
    { typ: "volba", otazka: "Čo chýba?", kod: "struct Kniha {\n    string nazov;\n    int strany;\n}", jazyk: "cpp", moznosti: ["Bodkočiarka za }", "return", "public:", "Nič"], spravna: 0, vysvetlenie: "};" },
    { typ: "kod", zadanie: "Vytvor <code>struct Obdlznik</code> s položkami <code>sirka</code> a <code>vyska</code> (double). V main vytvor obdĺžnik 4 × 2.5 a vypíš jeho obsah: <b>10</b>.",
      karty: ["cpp"], start: { cpp: program("", "    ") }, vyska: "280px",
      napoveda: "struct Obdlznik { double sirka; double vyska; };  Obdlznik o = {4, 2.5}; cout << o.sirka * o.vyska << endl;", riesenie: { cpp: program("struct Obdlznik {\n    double sirka;\n    double vyska;\n};", "    Obdlznik o = {4, 2.5};\n    cout << o.sirka * o.vyska << endl;") },
      kontrola: function (v, kod) { if (!/struct\s+Obdlznik/.test(kod)) return "Vytvor struct Obdlznik."; if (!/\.sirka/.test(kod)) return "K položkám pristupuj cez bodku (o.sirka)."; return r(v)[0] === "10" ? null : "Výstup má byť 10."; },
      vysvetlenie: "Dva údaje, jeden typ." },
  ] };

  var L2 = { id: "cpp-6-2", nazov: "class a metódy", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Údaje aj správanie",
      text: "<p><b>Trieda</b> (class) je plán. Okrem údajov (atribútov) obsahuje aj funkcie, ktoré s nimi pracujú (<b>metódy</b>). Podľa plánu vytvoríš <b>objekty</b>:</p>", obr: OBR_TRIEDA,
      podrobne: UKAZ('class Pes {\npublic:\n    string meno;\n    int vek;\n\n    void stekaj() {\n        cout << meno << ": Haf!" << endl;\n    }\n};\n\nint main() {\n    Pes p;\n    p.meno = "Rex";\n    p.vek = 3;\n    p.stekaj();\n    return 0;\n}', "Rex: Haf!") + "<p>Metóda vidí atribúty svojho objektu priamo, bez bodky. <code>public:</code> znamená, že sú prístupné zvonka (o tom viac o dve lekcie).</p>" },
    { typ: "volba", otazka: "Čo je objekt?", moznosti: ["Konkrétna premenná vytvorená podľa triedy", "Plán, podľa ktorého sa tvoria premenné", "Funkcia v triede", "Knižnica"], spravna: 0, vysvetlenie: "Trieda = plán, objekt = výrobok." },
    { typ: "volba", otazka: "Ako zavoláš metódu <code>pozdrav</code> objektu <code>o</code>?", moznosti: ["<code>o.pozdrav();</code>", "<code>pozdrav(o);</code>", "<code>o-pozdrav;</code>", "<code>Trieda.pozdrav();</code>"], spravna: 0, vysvetlenie: "Bodka a zátvorky." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Ucet</code> s verejným atribútom <code>double zostatok</code> a metódami <code>void vloz(double suma)</code> a <code>void vypis()</code>, ktorá vypíše <b>Zostatok: X</b>. V main nastav zostatok na 100, vlož 50 a vypíš: <b>Zostatok: 150</b>.",
      karty: ["cpp"], start: { cpp: program("", "    ") }, vyska: "320px",
      napoveda: "class Ucet { public: double zostatok; void vloz(double suma) { zostatok += suma; } void vypis() { cout << \"Zostatok: \" << zostatok << endl; } };", riesenie: { cpp: program('class Ucet {\npublic:\n    double zostatok;\n\n    void vloz(double suma) {\n        zostatok += suma;\n    }\n\n    void vypis() {\n        cout << "Zostatok: " << zostatok << endl;\n    }\n};', "    Ucet u;\n    u.zostatok = 100;\n    u.vloz(50);\n    u.vypis();") },
      kontrola: function (v, kod) { if (!/class\s+Ucet/.test(kod)) return "Vytvor triedu class Ucet."; if (!/void\s+vloz\s*\(/.test(kod)) return "Chýba metóda vloz."; return r(v)[0] === "Zostatok: 150" ? null : "Výstup má byť Zostatok: 150."; },
      vysvetlenie: "Údaje a operácie s nimi sú spolu." },
  ] };

  var L3 = { id: "cpp-6-3", nazov: "Konštruktor", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Objekt hneď pripravený",
      text: "<p><b>Konštruktor</b> je špeciálna metóda s menom triedy a bez návratového typu. Zavolá sa automaticky pri vytvorení objektu:</p>" + UKAZ('class Pes {\npublic:\n    string meno;\n    int vek;\n\n    Pes(string m, int v) {\n        meno = m;\n        vek = v;\n    }\n};\n\nint main() {\n    Pes a("Rex", 3);\n    Pes b("Bella", 7);\n    cout << a.meno << " " << b.vek << endl;\n    return 0;\n}', "Rex 7"),
      podrobne: "<p>Kratší zápis s <b>inicializačným zoznamom</b>: <code>Pes(string m, int v) : meno(m), vek(v) {}</code>. Tried môžu mať viac konštruktorov (preťaženie), napr. aj bez parametrov.</p>" },
    { typ: "volba", otazka: "Aký návratový typ má konštruktor?", moznosti: ["Žiadny, ani void", "void", "int", "typ triedy"], spravna: 0, vysvetlenie: "Konštruktor nemá návratový typ." },
    { typ: "volba", otazka: "Kedy sa zavolá konštruktor?", moznosti: ["Pri vytvorení objektu", "Pri prvom volaní metódy", "Na konci programu", "Nikdy sám"], spravna: 0, vysvetlenie: "Automaticky." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Kruh</code> s atribútom <code>double r</code>, konštruktorom <code>Kruh(double polomer)</code> a metódou <code>double obvod()</code> (2 · 3.14159 · r). V main vytvor <code>Kruh k(5);</code> a vypíš obvod: <b>31.4159</b>.",
      karty: ["cpp"], start: { cpp: program("", "    ") }, vyska: "300px",
      napoveda: "class Kruh { public: double r; Kruh(double polomer) { r = polomer; } double obvod() { return 2 * 3.14159 * r; } };", riesenie: { cpp: program("class Kruh {\npublic:\n    double r;\n\n    Kruh(double polomer) {\n        r = polomer;\n    }\n\n    double obvod() {\n        return 2 * 3.14159 * r;\n    }\n};", "    Kruh k(5);\n    cout << k.obvod() << endl;") },
      kontrola: function (v, kod) { if (!/Kruh\s*\(\s*double\s+\w+\s*\)/.test(kod)) return "Chýba konštruktor Kruh(double polomer)."; if (!/Kruh\s+\w+\s*\(\s*5\s*\)/.test(kod)) return "Objekt vytvor cez Kruh k(5);"; return r(v)[0] === "31.4159" ? null : "Výstup má byť 31.4159."; },
      vysvetlenie: "Objekt má hodnotu hneď od vzniku." },
  ] };

  var L4 = { id: "cpp-6-4", nazov: "private a zapuzdrenie", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Chráň údaje",
      text: "<p>Atribúty v časti <code>private:</code> sú prístupné <b>len metódam triedy</b>. Zvonka sa k nim dá dostať len cez verejné metódy, ktoré môžu kontrolovať, či je zmena v poriadku. Tomu sa hovorí <b>zapuzdrenie</b>:</p>" + UKAZ('class Ucet {\nprivate:\n    double zostatok = 0;\npublic:\n    bool vyber(double suma) {\n        if (suma <= 0 || suma > zostatok) return false;\n        zostatok -= suma;\n        return true;\n    }\n    void vloz(double suma) {\n        if (suma > 0) zostatok += suma;\n    }\n    double getZostatok() { return zostatok; }\n};\n\nint main() {\n    Ucet u;\n    u.vloz(100);\n    cout << u.vyber(500) << " " << u.getZostatok() << endl;\n    // u.zostatok = 1000000;  ← chyba prekladu: private\n    return 0;\n}', "0 100"),
      podrobne: "<p>V <code>class</code> je všetko predvolene private, v <code>struct</code> public. Metódy na čítanie sa volajú <b>gettery</b> (<code>getZostatok</code>), na zmenu <b>settery</b>. Bool sa cez cout vypíše ako 1 alebo 0.</p>" },
    { typ: "volba", otazka: "Kto môže meniť private atribút?", moznosti: ["Len metódy tej istej triedy", "Ktokoľvek", "Len main", "Nikto"], spravna: 0, vysvetlenie: "Preto sa zvonka používajú metódy." },
    { typ: "volba", otazka: "Prečo nedať zostatok účtu ako public?", moznosti: ["Ktokoľvek by ho mohol nastaviť na nezmysel", "Program by bol pomalší", "public sa nedá použiť pri double", "Nie je dôvod"], spravna: 0, vysvetlenie: "Zapuzdrenie chráni pravidlá." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Teplomer</code> s <b>private</b> atribútom <code>double teplota</code>. Metóda <code>bool nastav(double t)</code> zmení teplotu len ak je od -50 do 60 (vráti true), inak nič nezmení a vráti false. Metóda <code>double get()</code> ju vráti. V main nastav 22, potom skús 100 a vypíš <code>get()</code>: <b>22</b>.",
      karty: ["cpp"], start: { cpp: program("", "    ") }, vyska: "320px",
      napoveda: "class Teplomer { private: double teplota = 0; public: bool nastav(double t) { if (t < -50 || t > 60) return false; teplota = t; return true; } double get() { return teplota; } };", riesenie: { cpp: program("class Teplomer {\nprivate:\n    double teplota = 0;\npublic:\n    bool nastav(double t) {\n        if (t < -50 || t > 60) return false;\n        teplota = t;\n        return true;\n    }\n    double get() {\n        return teplota;\n    }\n};", "    Teplomer t;\n    t.nastav(22);\n    t.nastav(100);\n    cout << t.get() << endl;") },
      kontrola: function (v, kod) { if (!/private\s*:/.test(kod)) return "Atribút teplota daj do časti private:."; if (!/bool\s+nastav\s*\(/.test(kod)) return "Chýba metóda bool nastav(double t)."; return r(v)[0] === "22" ? null : "Po nastav(22) a nastav(100) má get() vrátiť 22."; },
      vysvetlenie: "Neplatná hodnota sa do objektu nedostala." },
  ] };

  var L5 = { id: "cpp-6-5", nazov: "Objekty vo vektore a dedičnosť", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Veľa objektov",
      text: UKAZ('struct Ziak {\n    string meno;\n    int body;\n};\n\nint main() {\n    vector<Ziak> trieda = {{"Jana", 87}, {"Peter", 64}, {"Eva", 92}};\n    trieda.push_back({"Tomas", 75});\n    int sucet = 0;\n    for (Ziak z : trieda) sucet += z.body;\n    cout << "Priemer: " << sucet / trieda.size() << endl;\n    return 0;\n}', "Priemer: 79"),
      podrobne: "<p>Zoznam objektov je základ skutočných programov: hráči v hre, produkty v e-shope, žiaci v triede.</p>" },
    { typ: "vyklad", nadpis: "Dedičnosť",
      text: "<p>Trieda môže <b>zdediť</b> všetko z inej a pridať niečo navyše:</p>" + UKAZ('class Zviera {\npublic:\n    string meno;\n    void predstav() { cout << "Som " << meno << endl; }\n};\n\nclass Macka : public Zviera {\npublic:\n    void mnaukaj() { cout << meno << ": Mňau" << endl; }\n};\n\nint main() {\n    Macka m;\n    m.meno = "Micka";\n    m.predstav();\n    m.mnaukaj();\n    return 0;\n}', "Som Micka\nMicka: Mňau"),
      podrobne: "<p>Mačka „je“ zviera, takže má meno aj predstav() bez toho, aby si ich písal znova. S kľúčovým slovom <code>virtual</code> môže potomok metódu predka zmeniť (polymorfizmus). To je už téma pre pokročilých.</p>" },
    { typ: "volba", otazka: "Čo znamená <code>class Pes : public Zviera</code>?", moznosti: ["Pes dedí atribúty a metódy triedy Zviera", "Pes je súčasťou Zviera", "Zviera dedí z Pes", "Pes a Zviera sú tá istá trieda"], spravna: 0, vysvetlenie: "Pes je potomok Zvieraťa." },
    { typ: "kod", zadanie: "Máš <code>struct Produkt { string nazov; double cena; };</code> Do vektora vlož 3 produkty: Mys 19.9, Batoh 39, Hrnek 8.9. Vypíš názov najdrahšieho produktu: <b>Batoh</b>.",
      karty: ["cpp"], start: { cpp: program("struct Produkt {\n    string nazov;\n    double cena;\n};", "    vector<Produkt> v;\n    ") }, vyska: "300px",
      napoveda: 'v.push_back({"Mys", 19.9}); …  Produkt najv = v[0]; for (Produkt p : v) if (p.cena > najv.cena) najv = p; cout << najv.nazov << endl;', riesenie: { cpp: program("struct Produkt {\n    string nazov;\n    double cena;\n};", '    vector<Produkt> v;\n    v.push_back({"Mys", 19.9});\n    v.push_back({"Batoh", 39});\n    v.push_back({"Hrnek", 8.9});\n    Produkt najv = v[0];\n    for (Produkt p : v) {\n        if (p.cena > najv.cena) najv = p;\n    }\n    cout << najv.nazov << endl;') },
      kontrola: function (v, kod) { if (!/push_back|vector<Produkt>\s+\w+\s*=\s*\{/.test(kod)) return "Vlož produkty do vektora."; return r(v)[0] === "Batoh" ? null : "Výstup má byť Batoh."; },
      vysvetlenie: "Hľadanie maxima, tentoraz v objektoch." },
    { typ: "vyklad", nadpis: "Kurz C++ máš za sebou",
      text: "<ul><li>Premenné, typy, vstup a výstup.</li><li>Podmienky a cykly.</li><li>Funkcie, referencie a rekurzia.</li><li>Polia, vector, string, sort.</li><li>struct, class, konštruktor, private a dedičnosť.</li></ul>", tip: "Po teste ťa čakajú záverečné projekty: štatistika známok, textová hra a bankový systém." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "cpp-6-1", otazka: "Čo je za zatváracou zátvorkou struct?", moznosti: ["Bodkočiarka", "Nič", "Dvojbodka", "return"], spravna: 0, vysvetlenie: "};" },
    { typ: "volba", lekcia: "cpp-6-2", otazka: "Ako sa volá funkcia vo vnútri triedy?", moznosti: ["Metóda", "Atribút", "Objekt", "Konštruktor vždy"], spravna: 0, vysvetlenie: "Metóda." },
    { typ: "volba", lekcia: "cpp-6-2", otazka: "Aký je vzťah triedy a objektu?", moznosti: ["Trieda je plán, objekt je konkrétna vec podľa neho", "To isté", "Objekt je plán", "Trieda je funkcia"], spravna: 0, vysvetlenie: "Plán a výrobok." },
    { typ: "volba", lekcia: "cpp-6-3", otazka: "Ako sa volá konštruktor triedy <code>Auto</code>?", moznosti: ["<code>Auto</code>", "<code>constructor</code>", "<code>init</code>", "<code>new</code>"], spravna: 0, vysvetlenie: "Rovnako ako trieda." },
    { typ: "volba", lekcia: "cpp-6-4", otazka: "Čo je v <code>class</code> predvolene, keď nenapíšeš public ani private?", moznosti: ["private", "public", "protected", "chyba"], spravna: 0, vysvetlenie: "V struct je to public." },
    { typ: "volba", lekcia: "cpp-6-4", otazka: "Čo je getter?", moznosti: ["Verejná metóda, ktorá vráti hodnotu private atribútu", "Konštruktor", "Premenná", "Knižnica"], spravna: 0, vysvetlenie: "Napr. getZostatok()." },
    { typ: "volba", lekcia: "cpp-6-5", otazka: "Ako zapíšeš, že <code>Student</code> dedí z <code>Osoba</code>?", moznosti: ["<code>class Student : public Osoba</code>", "<code>class Student extends Osoba</code>", "<code>class Student(Osoba)</code>", "<code>class Osoba : Student</code>"], spravna: 0, vysvetlenie: "extends je Java, (Osoba) Python." },
    { typ: "doplnenie", lekcia: "cpp-6-3", otazka: "Doplň triedu:", sablona: "class Bod {\n[[0]]:\n    int x;\n    [[1]](int a) {\n        x = a;\n    }\n};", zetony: ["public", "Bod", "private", "void", "int"], spravne: ["public", "Bod"], vysvetlenie: "public: a konštruktor Bod(…)." },
  ];

  K.registrujModul("cpp", { cislo: 6, nazov: "Triedy a objekty", popis: "struct, class, metódy, konštruktor, private, vektor objektov a dedičnosť.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("cpp", [
    { kat: "Objekty", znak: "struct / class", nazov: "Vlastný typ", popis: "Údaje (a metódy) spolu. Za } bodkočiarka.", priklad: "struct Bod {\n    int x, y;\n};" },
    { kat: "Objekty", znak: "public: / private:", nazov: "Prístup", popis: "Prístupné zvonka / len pre metódy triedy." },
    { kat: "Objekty", znak: "Trieda(…)", nazov: "Konštruktor", popis: "Zavolá sa pri vytvorení objektu." },
    { kat: "Objekty", znak: "obj.metoda()", nazov: "Volanie metódy", popis: "Bodka sprístupní atribúty a metódy." },
    { kat: "Objekty", znak: ": public Predok", nazov: "Dedičnosť", popis: "Trieda prevezme všetko z predka." },
  ]);
})();
