/* Java · Modul 5 · Triedy a objekty */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var KOD = function (t) { return P.kod(t, "java"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "java", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function subor(triedy, telo, importy) { return (importy || "") + triedy + (triedy ? "\n\n" : "") + "public class Main {\n    public static void main(String[] args) {\n" + telo + "\n    }\n}"; }

  var OBR = '<svg viewBox="0 0 340 120" role="img" aria-label="Trieda je plán, objekty sú konkrétne veci vytvorené podľa plánu">' +
    '<rect x="8" y="12" width="124" height="96" rx="10" style="fill:var(--surface-2);stroke:#b5651d;stroke-width:2;stroke-dasharray:5 4"/><text x="70" y="32" text-anchor="middle" font-size="12.5" font-weight="700" ' + MONO + ' style="fill:#b5651d">class Auto</text>' +
    '<text x="20" y="56" font-size="11" ' + MONO + ' style="fill:var(--text)">znacka</text><text x="20" y="74" font-size="11" ' + MONO + ' style="fill:var(--text)">rychlost</text><text x="20" y="98" font-size="11" ' + MONO + ' style="fill:var(--hl-kw)">zrychli()</text>' +
    [["Škoda", 50], ["Tesla", 120]].map(function (a, i) {
      var y = 10 + i * 56;
      return '<path d="M134 60 L176 ' + (y + 24) + '" style="stroke:var(--muted);stroke-width:1.5"/><rect x="180" y="' + y + '" width="152" height="46" rx="10" style="fill:#b5651d"/><text x="192" y="' + (y + 19) + '" font-size="11" font-weight="700" ' + TXT + ' fill="#fff">new Auto(…)</text><text x="192" y="' + (y + 37) + '" font-size="11" ' + MONO + ' fill="#ffe9d6">' + a[0] + ", " + a[1] + " km/h</text>";
    }).join("") + "</svg>";

  var L1 = { id: "java-5-1", nazov: "Trieda a objekt", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Vlastný typ",
      text: "<p><b>Trieda</b> je plán: aké údaje (atribúty) a aké schopnosti (metódy) bude mať každý <b>objekt</b>. Objekt vytvoríš cez <code>new</code>:</p>", obr: OBR,
      podrobne: UKAZ('class Auto {\n    String znacka;\n    int rychlost;\n\n    void zrychli(int o) {\n        rychlost += o;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Auto a = new Auto();\n        a.znacka = "Škoda";\n        a.zrychli(50);\n        System.out.println(a.znacka + " ide " + a.rychlost + " km/h");\n    }\n}', "Škoda ide 50 km/h") + "<p>Metódy bez <code>static</code> patria objektu a vidia jeho atribúty. Každý objekt má vlastné hodnoty.</p>" },
    { typ: "volba", otazka: "Ktorým slovom vytvoríš nový objekt?", moznosti: ["<code>new</code>", "<code>create</code>", "<code>class</code>", "<code>object</code>"], spravna: 0, vysvetlenie: "new Auto()" },
    { typ: "kod", zadanie: "Vytvor triedu <code>Pes</code> s atribútom <code>String meno</code> a metódou <code>void stekaj()</code>, ktorá vypíše <b>meno: Haf!</b>. V main vytvor psa Rex a zavolaj stekaj: <b>Rex: Haf!</b>",
      karty: ["java"], start: { java: subor("", "        ") }, vyska: "300px",
      napoveda: 'class Pes { String meno; void stekaj() { System.out.println(meno + ": Haf!"); } }  Pes p = new Pes(); p.meno = "Rex"; p.stekaj();', riesenie: { java: subor('class Pes {\n    String meno;\n\n    void stekaj() {\n        System.out.println(meno + ": Haf!");\n    }\n}', '        Pes p = new Pes();\n        p.meno = "Rex";\n        p.stekaj();') },
      kontrola: function (v, kod) { if (!/class\s+Pes/.test(kod)) return "Vytvor triedu class Pes."; if (!/new\s+Pes/.test(kod)) return "Vytvor objekt cez new Pes()."; return r(v)[0] === "Rex: Haf!" ? null : "Výstup má byť Rex: Haf!"; },
      vysvetlenie: "Trieda Pes je plán, p je konkrétny pes." },
  ] };

  var L2 = { id: "java-5-2", nazov: "Konštruktor", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Objekt hneď pripravený",
      text: "<p><b>Konštruktor</b> má meno triedy a žiadny návratový typ. Zavolá sa pri <code>new</code>:</p>" + UKAZ('class Auto {\n    String znacka;\n    int rychlost;\n\n    Auto(String znacka, int rychlost) {\n        this.znacka = znacka;\n        this.rychlost = rychlost;\n    }\n}\n…\nAuto a = new Auto("Tesla", 120);\nSystem.out.println(a.znacka);', "Tesla"),
      podrobne: "<p><code>this.znacka</code> je atribút objektu, <code>znacka</code> je parameter. this rozlíši, ktoré je ktoré, keď majú rovnaké meno. Ak napíšeš vlastný konštruktor, prázdny <code>new Auto()</code> už nefunguje, kým ho tiež nenapíšeš.</p>" },
    { typ: "volba", otazka: "Čo znamená <code>this.meno = meno;</code>?", moznosti: ["Atribút objektu dostane hodnotu parametra", "Parameter dostane hodnotu atribútu", "Nič", "Chyba"], spravna: 0, vysvetlenie: "this = tento objekt." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Obdlznik</code> s atribútmi <code>double a, b</code>, konštruktorom <code>Obdlznik(double a, double b)</code> a metódou <code>double obsah()</code>. V main vypíš obsah obdĺžnika 3 × 4.5: <b>13.5</b>.",
      karty: ["java"], start: { java: subor("", "        ") }, vyska: "300px",
      napoveda: "Obdlznik(double a, double b) { this.a = a; this.b = b; }  double obsah() { return a * b; }", riesenie: { java: subor("class Obdlznik {\n    double a, b;\n\n    Obdlznik(double a, double b) {\n        this.a = a;\n        this.b = b;\n    }\n\n    double obsah() {\n        return a * b;\n    }\n}", "        Obdlznik o = new Obdlznik(3, 4.5);\n        System.out.println(o.obsah());") },
      kontrola: function (v, kod) { if (!/Obdlznik\s*\(\s*double\s+\w+\s*,\s*double\s+\w+\s*\)/.test(kod)) return "Chýba konštruktor Obdlznik(double a, double b)."; return r(v)[0] === "13.5" ? null : "Výstup má byť 13.5"; },
      vysvetlenie: "Objekt má rozmery hneď od vzniku." },
  ] };

  var L3 = { id: "java-5-3", nazov: "private a gettery", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Zapuzdrenie",
      text: "<p>Atribúty sa robia <code>private</code>, aby ich zvonka nikto nemohol pokaziť. Prístup je len cez metódy, ktoré strážia pravidlá:</p>" + UKAZ('class Ucet {\n    private double zostatok;\n\n    public boolean vyber(double suma) {\n        if (suma <= 0 || suma > zostatok) return false;\n        zostatok -= suma;\n        return true;\n    }\n    public void vloz(double suma) { if (suma > 0) zostatok += suma; }\n    public double getZostatok() { return zostatok; }\n}\n…\nUcet u = new Ucet();\nu.vloz(100);\nSystem.out.println(u.vyber(500) + " " + u.getZostatok());', "false 100.0"),
      podrobne: "<p>Metóda na čítanie sa volá <b>getter</b> (getZostatok), na zmenu <b>setter</b> (setMeno). <code>u.zostatok = 1000000;</code> by prekladač odmietol: zostatok je private.</p>" },
    { typ: "volba", otazka: "Odkiaľ je prístupný <code>private</code> atribút?", moznosti: ["Len z metód tej istej triedy", "Odkiaľkoľvek", "Len z main", "Odnikiaľ"], spravna: 0, vysvetlenie: "Preto treba gettery." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Ziak</code> s <b>private</b> atribútmi <code>String meno</code> a <code>int body</code>, konštruktorom <code>Ziak(String meno)</code>, metódou <code>void pridajBody(int b)</code> (záporné body ignoruje) a gettermi <code>getMeno()</code>, <code>getBody()</code>. V main: Jana, pridaj 10, potom -5, potom 7 a vypíš <b>Jana: 17</b>.",
      karty: ["java"], start: { java: subor("", "        ") }, vyska: "340px",
      napoveda: "void pridajBody(int b) { if (b > 0) body += b; }", riesenie: { java: subor('class Ziak {\n    private String meno;\n    private int body;\n\n    Ziak(String meno) {\n        this.meno = meno;\n    }\n\n    void pridajBody(int b) {\n        if (b > 0) body += b;\n    }\n\n    String getMeno() { return meno; }\n    int getBody() { return body; }\n}', '        Ziak z = new Ziak("Jana");\n        z.pridajBody(10);\n        z.pridajBody(-5);\n        z.pridajBody(7);\n        System.out.println(z.getMeno() + ": " + z.getBody());') },
      kontrola: function (v, kod) { if (!/private\s+int\s+body/.test(kod)) return "Atribút body má byť private."; if (!/getBody\s*\(/.test(kod)) return "Chýba getter getBody()."; return r(v)[0] === "Jana: 17" ? null : "Výstup má byť Jana: 17 (záporné body sa nepripočítajú)."; },
      vysvetlenie: "Pravidlo „žiadne záporné body“ stráži trieda sama." },
  ] };

  var L4 = { id: "java-5-4", nazov: "toString a zoznam objektov", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Ako sa objekt vypíše",
      text: UKAZ('class Produkt {\n    String nazov;\n    double cena;\n    Produkt(String n, double c) { nazov = n; cena = c; }\n\n    @Override\n    public String toString() {\n        return nazov + " (" + cena + " €)";\n    }\n}\n…\nArrayList<Produkt> kosik = new ArrayList<>();\nkosik.add(new Produkt("Myš", 19.9));\nkosik.add(new Produkt("Batoh", 39.0));\nSystem.out.println(kosik);', "[Myš (19.9 €), Batoh (39.0 €)]"),
      podrobne: "<p>Metóda <code>toString</code> určuje, ako sa objekt zmení na text (pri println alebo spájaní). <code>@Override</code> hovorí, že prepisujeme metódu, ktorú má každý objekt v Jave. Bez nej by sa vypísalo niečo ako Produkt@1b6d3586.</p>" },
    { typ: "volba", otazka: "Ktorú metódu Java zavolá pri <code>System.out.println(objekt)</code>?", moznosti: ["toString()", "print()", "getText()", "show()"], spravna: 0, vysvetlenie: "toString." },
    { typ: "kod", zadanie: "Trieda <code>Produkt</code> je pripravená. Do ArrayListu vlož produkty Myš 19.9, Batoh 39.0 a Hrnček 8.9. Vypíš súčet cien <b>Spolu: 67.8</b> a najdrahší produkt <b>Najdrahší: Batoh</b>.",
      karty: ["java"], start: { java: subor("class Produkt {\n    String nazov;\n    double cena;\n\n    Produkt(String nazov, double cena) {\n        this.nazov = nazov;\n        this.cena = cena;\n    }\n}", "        ArrayList<Produkt> kosik = new ArrayList<>();\n        ", "import java.util.ArrayList;\n\n") }, vyska: "320px",
      napoveda: "kosik.add(new Produkt(\"Myš\", 19.9)); … for (Produkt p : kosik) { spolu += p.cena; if (p.cena > naj.cena) naj = p; }  Pozor: 19.9 + 39.0 + 8.9 môže vyjsť 67.80000000000001, zaokrúhli: Math.round(spolu * 10) / 10.0", riesenie: { java: subor("class Produkt {\n    String nazov;\n    double cena;\n\n    Produkt(String nazov, double cena) {\n        this.nazov = nazov;\n        this.cena = cena;\n    }\n}", '        ArrayList<Produkt> kosik = new ArrayList<>();\n        kosik.add(new Produkt("Myš", 19.9));\n        kosik.add(new Produkt("Batoh", 39.0));\n        kosik.add(new Produkt("Hrnček", 8.9));\n        double spolu = 0;\n        Produkt naj = kosik.get(0);\n        for (Produkt p : kosik) {\n            spolu += p.cena;\n            if (p.cena > naj.cena) naj = p;\n        }\n        System.out.println("Spolu: " + Math.round(spolu * 10) / 10.0);\n        System.out.println("Najdrahší: " + naj.nazov);', "import java.util.ArrayList;\n\n") },
      kontrola: function (v) { return r(v).join("|") === "Spolu: 67.8|Najdrahší: Batoh" ? null : "Výstup má byť Spolu: 67.8 a Najdrahší: Batoh (pozri nápovedu k zaokrúhleniu)."; },
      vysvetlenie: "Desatinné čísla v počítači nie sú vždy presné, preto zaokrúhľujeme." },
  ] };

  var L5 = { id: "java-5-5", nazov: "Dedičnosť", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "extends",
      text: "<p>Trieda môže <b>zdediť</b> všetko z inej (<code>extends</code>) a niečo pridať alebo zmeniť:</p>" + UKAZ('class Zviera {\n    String meno;\n    Zviera(String meno) { this.meno = meno; }\n    String zvuk() { return "..."; }\n    void ozvi() { System.out.println(meno + ": " + zvuk()); }\n}\n\nclass Macka extends Zviera {\n    Macka(String meno) { super(meno); }\n    @Override String zvuk() { return "Mňau"; }\n}\n\nclass Pes extends Zviera {\n    Pes(String meno) { super(meno); }\n    @Override String zvuk() { return "Haf"; }\n}\n…\nZviera[] zoo = { new Macka("Micka"), new Pes("Rex") };\nfor (Zviera z : zoo) z.ozvi();', "Micka: Mňau\nRex: Haf"),
      podrobne: "<p><code>super(meno)</code> zavolá konštruktor predka. Pole typu Zviera môže obsahovať mačky aj psov a každý sa ozve po svojom. Tomu sa hovorí <b>polymorfizmus</b>.</p>" },
    { typ: "volba", otazka: "Čo znamená <code>class Auto extends Vozidlo</code>?", moznosti: ["Auto dedí atribúty a metódy z Vozidla", "Vozidlo dedí z Auta", "Auto je väčšie", "Nič"], spravna: 0, vysvetlenie: "Auto je špeciálne vozidlo." },
    { typ: "kod", zadanie: "Trieda <code>Tvar</code> má metódu <code>double obsah()</code>. Dopíš triedy <code>Stvorec extends Tvar</code> (strana) a <code>Kruh extends Tvar</code> (polomer, π cez Math.PI), ktoré prepíšu obsah(). Main je pripravený a má vypísať <b>16.0</b> a <b>3.14</b>.",
      karty: ["java"], start: { java: subor("class Tvar {\n    double obsah() { return 0; }\n}\n", '        Tvar[] tvary = { new Stvorec(4), new Kruh(1) };\n        for (Tvar t : tvary) {\n            System.out.println(Math.round(t.obsah() * 100) / 100.0);\n        }') }, vyska: "340px",
      napoveda: "class Stvorec extends Tvar { double a; Stvorec(double a) { this.a = a; } @Override double obsah() { return a * a; } }", riesenie: { java: subor("class Tvar {\n    double obsah() { return 0; }\n}\n\nclass Stvorec extends Tvar {\n    double a;\n    Stvorec(double a) { this.a = a; }\n    @Override double obsah() { return a * a; }\n}\n\nclass Kruh extends Tvar {\n    double r;\n    Kruh(double r) { this.r = r; }\n    @Override double obsah() { return Math.PI * r * r; }\n}", '        Tvar[] tvary = { new Stvorec(4), new Kruh(1) };\n        for (Tvar t : tvary) {\n            System.out.println(Math.round(t.obsah() * 100) / 100.0);\n        }') },
      kontrola: function (v, kod) { if (!/class\s+Stvorec\s+extends\s+Tvar/.test(kod) || !/class\s+Kruh\s+extends\s+Tvar/.test(kod)) return "Vytvor triedy Stvorec extends Tvar a Kruh extends Tvar."; return r(v).join("|") === "16.0|3.14" ? null : "Výstup má byť 16.0 a 3.14."; },
      vysvetlenie: "Ten istý cyklus, rôzne správanie." },
    { typ: "vyklad", nadpis: "Kurz Java máš za sebou",
      text: "<ul><li>println, premenné, Scanner, String a Math.</li><li>Podmienky, switch a cykly.</li><li>Metódy, polia a ArrayList.</li><li>Triedy, konštruktory, private a gettery.</li><li>toString, zoznam objektov a dedičnosť.</li></ul>", tip: "Po teste ťa čakajú záverečné projekty: bankomat, hra Kameň–papier–nožnice a evidencia študentov." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "java-5-1", otazka: "Aký je vzťah triedy a objektu?", moznosti: ["Trieda je plán, objekt je konkrétna vec podľa neho", "To isté", "Objekt je plán", "Trieda je metóda"], spravna: 0, vysvetlenie: "Plán a výrobok." },
    { typ: "volba", lekcia: "java-5-2", otazka: "Ako sa volá konštruktor triedy Kniha?", moznosti: ["Kniha", "constructor", "init", "new"], spravna: 0, vysvetlenie: "Rovnako ako trieda." },
    { typ: "volba", lekcia: "java-5-2", otazka: "Na čo slúži <code>this</code>?", moznosti: ["Odkazuje na aktuálny objekt", "Vytvorí objekt", "Je to typ", "Ukončí metódu"], spravna: 0, vysvetlenie: "this.meno = atribút objektu." },
    { typ: "volba", lekcia: "java-5-3", otazka: "Prečo sú atribúty často private?", moznosti: ["Aby ich zvonka nikto nemohol nastaviť na nezmysel", "Kvôli rýchlosti", "Je to povinné", "Aby sa nedali čítať ani v triede"], spravna: 0, vysvetlenie: "Zapuzdrenie." },
    { typ: "volba", lekcia: "java-5-4", otazka: "Čo spraví <code>@Override</code>?", moznosti: ["Označí, že metóda prepisuje metódu predka", "Vytvorí kópiu", "Zakáže metódu", "Je to komentár bez významu"], spravna: 0, vysvetlenie: "Prekladač skontroluje, že naozaj niečo prepisuješ." },
    { typ: "volba", lekcia: "java-5-5", otazka: "Čo zavolá <code>super(meno)</code> v konštruktore?", moznosti: ["Konštruktor predka", "Metódu main", "toString", "Nič"], spravna: 0, vysvetlenie: "Predok sa nastaví ako prvý." },
    { typ: "doplnenie", lekcia: "java-5-5", otazka: "Doplň dedičnosť:", sablona: "class Student [[0]] Osoba {\n    Student(String m) { [[1]](m); }\n}", zetony: ["extends", "super", "implements", "this", ":"], spravne: ["extends", "super"], vysvetlenie: "extends a super(…)." },
  ];

  K.registrujModul("java", { cislo: 5, nazov: "Triedy a objekty", popis: "Triedy, konštruktory, private, gettery, toString, zoznam objektov a dedičnosť.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("java", [
    { kat: "Kostra", znak: "public class Main", nazov: "Hlavná trieda", popis: "Všetok kód je v triedach." },
    { kat: "Kostra", znak: "public static void main(String[] args)", nazov: "Hlavná metóda", popis: "Tu program začína." },
    { kat: "Výstup", znak: "System.out.println", nazov: "Výpis s novým riadkom", popis: "print bez nového riadku, printf s formátom.", priklad: 'System.out.println("Súčet: " + (a + b));' },
    { kat: "Výstup", znak: "Scanner", nazov: "Vstup", popis: "import java.util.Scanner; nextInt, nextDouble, next, nextLine, hasNextInt.", priklad: "Scanner sc = new Scanner(System.in);\nint x = sc.nextInt();" },
    { kat: "Typy", znak: "int / double / boolean / char", nazov: "Základné typy", popis: "Malým písmenom." },
    { kat: "Typy", znak: "String", nazov: "Text", popis: "S veľkým S. Porovnávaj cez equals." },
    { kat: "Typy", znak: "(int) x", nazov: "Pretypovanie", popis: "Oreže desatinnú časť." },
    { kat: "Typy", znak: "final", nazov: "Konštanta", popis: "Hodnota sa nedá zmeniť." },
    { kat: "Operátory", znak: "&& || !", nazov: "Logické operátory", popis: "A zároveň, alebo, nie." },
    { kat: "Operátory", znak: "+ (s textom)", nazov: "Spájanie", popis: "\"A\" + 1 + 2 = \"A12\"." },
    { kat: "Riadenie", znak: "if / else if / else", nazov: "Podmienka", popis: "Podmienka musí byť boolean." },
    { kat: "Riadenie", znak: "switch ->", nazov: "Voľba", popis: "Moderný switch bez break, vie vrátiť hodnotu." },
    { kat: "Riadenie", znak: "for / while", nazov: "Cykly", popis: "for (int x : pole) je for-each." },
    { kat: "Kolekcie", znak: "int[]", nazov: "Pole", popis: "Pevná dĺžka, a.length, kontrola hraníc." },
    { kat: "Kolekcie", znak: "ArrayList<T>", nazov: "Zoznam", popis: "add, get, size, remove, contains." },
    { kat: "Kolekcie", znak: "Arrays / Collections", nazov: "Pomocné triedy", popis: "sort, toString, max, reverse." },
    { kat: "Objekty", znak: "class / new", nazov: "Trieda a objekt", popis: "Plán a konkrétna vec.", priklad: 'Pes p = new Pes("Rex");' },
    { kat: "Objekty", znak: "this", nazov: "Tento objekt", popis: "this.meno = meno;" },
    { kat: "Objekty", znak: "private / public", nazov: "Prístup", popis: "Len v triede / odkiaľkoľvek." },
    { kat: "Objekty", znak: "extends / super", nazov: "Dedičnosť", popis: "Potomok prevezme všetko z predka." },
    { kat: "Objekty", znak: "@Override toString()", nazov: "Text objektu", popis: "Ako sa objekt vypíše." },
  ]);
})();
