/* C# · Modul 5 · Triedy a objekty */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "cs"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "cs", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function subor(triedy, telo, usingy) { return "using System;\n" + (usingy || "") + "\n" + (triedy ? triedy + "\n\n" : "") + "class Program\n{\n    static void Main()\n    {\n" + telo + "\n    }\n}"; }
  var KOL = "using System.Collections.Generic;\nusing System.Linq;\n";

  var L1 = { id: "csharp-5-1", nazov: "Trieda a objekt", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Vlastný typ",
      text: "<p>Trieda je plán, objekt je konkrétna vec vytvorená cez <code>new</code>:</p>" + UKAZ('class Hrac\n{\n    public string Meno;\n    public int Zivoty = 3;\n\n    public void Zasah()\n    {\n        Zivoty--;\n        Console.WriteLine($"{Meno} má {Zivoty} životy");\n    }\n}\n…\nHrac h = new Hrac();\nh.Meno = "Mario";\nh.Zasah();', "Mario má 2 životy"),
      podrobne: "<p><code>public</code> znamená, že k atribútu alebo metóde sa dá dostať zvonka. Bez neho je člen triedy predvolene private. Každý objekt má vlastné hodnoty atribútov.</p>" },
    { typ: "volba", otazka: "Čo je predvolené, keď pri atribúte triedy nenapíšeš public ani private?", moznosti: ["private", "public", "static", "chyba"], spravna: 0, vysvetlenie: "V C# je člen triedy predvolene private." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Lampa</code> s verejným atribútom <code>bool Zapnuta</code> a metódou <code>public void Prepni()</code>, ktorá stav otočí a vypíše <b>Svieti</b> alebo <b>Nesvieti</b>. V Main vytvor lampu a prepni ju dvakrát: <b>Svieti</b>, <b>Nesvieti</b>.",
      karty: ["cs"], start: { cs: subor("", "        ") }, vyska: "320px",
      napoveda: 'public void Prepni() { Zapnuta = !Zapnuta; Console.WriteLine(Zapnuta ? "Svieti" : "Nesvieti"); }', riesenie: { cs: subor('class Lampa\n{\n    public bool Zapnuta;\n\n    public void Prepni()\n    {\n        Zapnuta = !Zapnuta;\n        Console.WriteLine(Zapnuta ? "Svieti" : "Nesvieti");\n    }\n}', "        Lampa l = new Lampa();\n        l.Prepni();\n        l.Prepni();") },
      kontrola: function (v, kod) { if (!/class\s+Lampa/.test(kod)) return "Vytvor triedu Lampa."; return r(v).join("|") === "Svieti|Nesvieti" ? null : "Výstup má byť Svieti a Nesvieti."; },
      vysvetlenie: "!Zapnuta otočí true na false a naopak." },
  ] };

  var L2 = { id: "csharp-5-2", nazov: "Konštruktor", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Objekt hneď pripravený",
      text: UKAZ('class Kruh\n{\n    public double Polomer;\n\n    public Kruh(double polomer)\n    {\n        Polomer = polomer;\n    }\n\n    public double Obsah() => Math.PI * Polomer * Polomer;\n}\n…\nvar k = new Kruh(2);\nConsole.WriteLine($"{k.Obsah():F2}");', "12.57"),
      podrobne: "<p>Konštruktor má meno triedy a žiadny návratový typ. Ak má parameter rovnaké meno ako atribút, použi <code>this</code>: <code>this.polomer = polomer;</code>. V C# sa však atribúty zvyčajne píšu s veľkým začiatočným písmenom, takže kolízia nenastane.</p>" },
    { typ: "volba", otazka: "Kedy sa zavolá konštruktor?", moznosti: ["Pri new", "Pri prvom volaní metódy", "Na konci programu", "Nikdy sám"], spravna: 0, vysvetlenie: "new Kruh(2) zavolá Kruh(double)." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Kniha</code> s atribútmi <code>Nazov</code>, <code>Autor</code> (string) a <code>Rok</code> (int), konštruktorom so všetkými tromi a metódou <code>public int Vek(int terajsiRok)</code>. V Main pre knihu Hobit, Tolkien, 1937 a rok 2026 vypíš <b>Hobit (Tolkien) má 89 rokov.</b>",
      karty: ["cs"], start: { cs: subor("", "        ") }, vyska: "340px",
      napoveda: "public Kniha(string nazov, string autor, int rok) { Nazov = nazov; Autor = autor; Rok = rok; }  public int Vek(int t) => t - Rok;", riesenie: { cs: subor('class Kniha\n{\n    public string Nazov;\n    public string Autor;\n    public int Rok;\n\n    public Kniha(string nazov, string autor, int rok)\n    {\n        Nazov = nazov;\n        Autor = autor;\n        Rok = rok;\n    }\n\n    public int Vek(int terajsiRok) => terajsiRok - Rok;\n}', '        var k = new Kniha("Hobit", "Tolkien", 1937);\n        Console.WriteLine($"{k.Nazov} ({k.Autor}) má {k.Vek(2026)} rokov.");') },
      kontrola: function (v, kod) { if (!/public\s+Kniha\s*\(/.test(kod)) return "Chýba konštruktor public Kniha(…)."; return r(v)[0] === "Hobit (Tolkien) má 89 rokov." ? null : "Výstup má byť Hobit (Tolkien) má 89 rokov."; },
      vysvetlenie: "Objekt má všetky údaje hneď od vzniku." },
  ] };

  var L3 = { id: "csharp-5-3", nazov: "Vlastnosti (properties)", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "get a set",
      text: "<p><b>Vlastnosť</b> vyzerá zvonka ako atribút, ale vnútri môže kontrolovať hodnoty. Je to typický nástroj C#:</p>" + UKAZ('class Ucet\n{\n    public string Majitel { get; }\n    public decimal Zostatok { get; private set; }\n\n    public Ucet(string majitel) { Majitel = majitel; }\n\n    public bool Vyber(decimal suma)\n    {\n        if (suma <= 0 || suma > Zostatok) return false;\n        Zostatok -= suma;\n        return true;\n    }\n    public void Vloz(decimal suma) { if (suma > 0) Zostatok += suma; }\n}\n…\nvar u = new Ucet("Jana");\nu.Vloz(100);\nConsole.WriteLine($"{u.Vyber(500)} {u.Zostatok}");', "False 100"),
      podrobne: "<ul><li><code>{ get; }</code>: dá sa len čítať (nastaví sa v konštruktore).</li><li><code>{ get; private set; }</code>: čítať môže ktokoľvek, meniť len trieda sama.</li><li><code>u.Zostatok = 1000000;</code> by prekladač odmietol.</li></ul>" },
    { typ: "volba", otazka: "Čo znamená <code>public int Body { get; private set; }</code>?", moznosti: ["Čítať môže každý, meniť len trieda", "Nikto nemôže čítať", "Každý môže meniť", "Je to metóda"], spravna: 0, vysvetlenie: "Zapuzdrenie cez vlastnosť." },
    { typ: "kod", zadanie: "Vytvor triedu <code>Teplomer</code> s vlastnosťou <code>double Teplota { get; private set; }</code> a metódou <code>bool Nastav(double t)</code>, ktorá prijme len teploty od −50 do 60. V Main nastav 21.5, potom 100 a vypíš <b>21.5</b>.",
      karty: ["cs"], start: { cs: subor("", "        ") }, vyska: "320px",
      napoveda: "public bool Nastav(double t) { if (t < -50 || t > 60) return false; Teplota = t; return true; }", riesenie: { cs: subor("class Teplomer\n{\n    public double Teplota { get; private set; }\n\n    public bool Nastav(double t)\n    {\n        if (t < -50 || t > 60) return false;\n        Teplota = t;\n        return true;\n    }\n}", "        var t = new Teplomer();\n        t.Nastav(21.5);\n        t.Nastav(100);\n        Console.WriteLine(t.Teplota);") },
      kontrola: function (v, kod) { if (!/\{\s*get\s*;\s*private\s+set\s*;\s*\}/.test(kod)) return "Použi vlastnosť { get; private set; }."; return (r(v)[0] || "").replace(",", ".") === "21.5" ? null : "Výstup má byť 21.5"; },
      vysvetlenie: "Neplatná hodnota sa do objektu nedostala." },
  ] };

  var L4 = { id: "csharp-5-4", nazov: "ToString a zoznam objektov", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Objekt ako text",
      text: UKAZ('class Produkt\n{\n    public string Nazov { get; }\n    public decimal Cena { get; }\n    public Produkt(string n, decimal c) { Nazov = n; Cena = c; }\n    public override string ToString() => $"{Nazov} ({Cena} €)";\n}\n…\nvar kosik = new List<Produkt> { new("Myš", 19.90m), new("Batoh", 39m) };\nforeach (var p in kosik) Console.WriteLine(p);\nConsole.WriteLine(kosik.Sum(p => p.Cena));', "Myš (19.90 €)\nBatoh (39 €)\n58.90"),
      podrobne: "<p><code>override ToString()</code> určí, ako sa objekt vypíše. <code>new(\"Myš\", 19.90m)</code> je skrátené <code>new Produkt(…)</code>, keď je typ zrejmý. LINQ funguje aj nad objektmi: <code>kosik.Where(p =&gt; p.Cena &gt; 20)</code>.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>kosik.Max(p =&gt; p.Cena)</code>?", moznosti: ["Najvyššiu cenu v košíku", "Najdrahší produkt (objekt)", "Počet produktov", "Súčet cien"], spravna: 0, vysvetlenie: "Max vráti hodnotu, nie objekt." },
    { typ: "kod", zadanie: "Trieda <code>Hrac</code> (Meno, Body) je pripravená. Do zoznamu vlož hráčov Anna 120, Boris 340, Cyril 210 a cez LINQ vypíš poradie od najlepšieho vo formáte <b>1. Boris 340</b>, <b>2. Cyril 210</b>, <b>3. Anna 120</b>.",
      karty: ["cs"], start: { cs: subor("class Hrac\n{\n    public string Meno { get; }\n    public int Body { get; }\n    public Hrac(string meno, int body) { Meno = meno; Body = body; }\n}", "        var hraci = new List<Hrac>();\n        ", KOL) }, vyska: "320px",
      napoveda: 'hraci.Add(new Hrac("Anna", 120)); … var poradie = hraci.OrderByDescending(h => h.Body).ToList(); for (int i = 0; i < poradie.Count; i++) …', riesenie: { cs: subor("class Hrac\n{\n    public string Meno { get; }\n    public int Body { get; }\n    public Hrac(string meno, int body) { Meno = meno; Body = body; }\n}", '        var hraci = new List<Hrac>();\n        hraci.Add(new Hrac("Anna", 120));\n        hraci.Add(new Hrac("Boris", 340));\n        hraci.Add(new Hrac("Cyril", 210));\n        var poradie = hraci.OrderByDescending(h => h.Body).ToList();\n        for (int i = 0; i < poradie.Count; i++)\n        {\n            Console.WriteLine($"{i + 1}. {poradie[i].Meno} {poradie[i].Body}");\n        }', KOL) },
      kontrola: function (v, kod) { if (!/OrderBy/.test(kod)) return "Zoraď cez LINQ (OrderByDescending)."; return r(v).join("|") === "1. Boris 340|2. Cyril 210|3. Anna 120" ? null : "Výstup má byť 1. Boris 340, 2. Cyril 210, 3. Anna 120."; },
      vysvetlenie: "Rebríček hráčov ako v hrách." },
  ] };

  var L5 = { id: "csharp-5-5", nazov: "Dedičnosť", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Predok a potomok",
      text: UKAZ('class Zviera\n{\n    public string Meno { get; }\n    public Zviera(string meno) { Meno = meno; }\n    public virtual string Zvuk() => "...";\n    public void Ozvi() => Console.WriteLine($"{Meno}: {Zvuk()}");\n}\n\nclass Macka : Zviera\n{\n    public Macka(string meno) : base(meno) { }\n    public override string Zvuk() => "Mňau";\n}\n…\nZviera[] zoo = { new Macka("Micka"), new Zviera("Ryba") };\nforeach (var z in zoo) z.Ozvi();', "Micka: Mňau\nRyba: ..."),
      podrobne: "<p>Dedičnosť sa píše dvojbodkou <code>class Macka : Zviera</code>. Metóda, ktorú môže potomok zmeniť, musí byť <code>virtual</code>, a potomok ju prepíše cez <code>override</code>. <code>: base(meno)</code> zavolá konštruktor predka.</p>" },
    { typ: "volba", otazka: "Ako v C# zapíšeš, že Auto dedí z Vozidlo?", moznosti: ["<code>class Auto : Vozidlo</code>", "<code>class Auto extends Vozidlo</code>", "<code>class Auto(Vozidlo)</code>", "<code>class Vozidlo : Auto</code>"], spravna: 0, vysvetlenie: "Dvojbodka." },
    { typ: "kod", zadanie: "Trieda <code>Tvar</code> má <code>public virtual double Obsah() => 0;</code>. Dopíš triedy <code>Stvorec : Tvar</code> (strana) a <code>Obdlznik : Tvar</code> (a, b), ktoré metódu prepíšu. Main je pripravený a vypíše <b>Spolu: 31</b>.",
      karty: ["cs"], start: { cs: subor("class Tvar\n{\n    public virtual double Obsah() => 0;\n}\n", '        Tvar[] tvary = { new Stvorec(3), new Obdlznik(4, 5.5) };\n        double spolu = 0;\n        foreach (var t in tvary) spolu += t.Obsah();\n        Console.WriteLine($"Spolu: {spolu}");') }, vyska: "340px",
      napoveda: "class Stvorec : Tvar { double a; public Stvorec(double a) { this.a = a; } public override double Obsah() => a * a; }", riesenie: { cs: subor("class Tvar\n{\n    public virtual double Obsah() => 0;\n}\n\nclass Stvorec : Tvar\n{\n    double a;\n    public Stvorec(double a) { this.a = a; }\n    public override double Obsah() => a * a;\n}\n\nclass Obdlznik : Tvar\n{\n    double a, b;\n    public Obdlznik(double a, double b) { this.a = a; this.b = b; }\n    public override double Obsah() => a * b;\n}", '        Tvar[] tvary = { new Stvorec(3), new Obdlznik(4, 5.5) };\n        double spolu = 0;\n        foreach (var t in tvary) spolu += t.Obsah();\n        Console.WriteLine($"Spolu: {spolu}");') },
      kontrola: function (v, kod) { if (!/class\s+Stvorec\s*:\s*Tvar/.test(kod) || !/class\s+Obdlznik\s*:\s*Tvar/.test(kod)) return "Vytvor triedy Stvorec : Tvar a Obdlznik : Tvar."; if (!/override/.test(kod)) return "Metódu Obsah prepíš cez override."; return r(v)[0] === "Spolu: 31" ? null : "Výstup má byť Spolu: 31 (9 + 22)."; },
      vysvetlenie: "Polymorfizmus: ten istý cyklus, rôzne tvary." },
    { typ: "vyklad", nadpis: "Kurz C# máš za sebou",
      text: "<ul><li>Console, premenné, Parse, interpolácia.</li><li>Podmienky, switch výrazy, cykly a foreach.</li><li>Metódy, polia, List, Dictionary a LINQ.</li><li>Triedy, konštruktory a vlastnosti.</li><li>ToString, zoznam objektov, dedičnosť a override.</li></ul>", tip: "Po teste ťa čakajú záverečné projekty: inventár hry, pokladnica a turnaj." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "csharp-5-1", otazka: "Ktorým slovom vytvoríš objekt?", moznosti: ["new", "create", "class", "make"], spravna: 0, vysvetlenie: "new Hrac()" },
    { typ: "volba", lekcia: "csharp-5-2", otazka: "Aký návratový typ má konštruktor?", moznosti: ["Žiadny", "void", "int", "typ triedy"], spravna: 0, vysvetlenie: "Konštruktor nemá návratový typ." },
    { typ: "volba", lekcia: "csharp-5-3", otazka: "Čo je <code>{ get; }</code> pri vlastnosti?", moznosti: ["Vlastnosť sa dá len čítať", "Dá sa len zapisovať", "Je to metóda", "Nič"], spravna: 0, vysvetlenie: "Bez set." },
    { typ: "volba", lekcia: "csharp-5-4", otazka: "Prečo prepíšeme ToString?", moznosti: ["Aby sa objekt pekne vypísal", "Aby sa dal porovnať", "Je to povinné", "Kvôli rýchlosti"], spravna: 0, vysvetlenie: "Inak by sa vypísal názov triedy." },
    { typ: "volba", lekcia: "csharp-5-5", otazka: "Čo musí mať metóda predka, aby ju potomok mohol prepísať?", moznosti: ["virtual", "static", "private", "const"], spravna: 0, vysvetlenie: "virtual + override." },
    { typ: "volba", lekcia: "csharp-5-5", otazka: "Čo spraví <code>: base(meno)</code> v konštruktore?", moznosti: ["Zavolá konštruktor predka", "Vytvorí nový objekt", "Zmaže meno", "Nič"], spravna: 0, vysvetlenie: "Predok sa nastaví prvý." },
    { typ: "doplnenie", lekcia: "csharp-5-3", otazka: "Vlastnosť, ktorú mení len trieda:", sablona: "public int Body { [[0]]; [[1]] set; }", zetony: ["get", "private", "public", "read", "static"], spravne: ["get", "private"], vysvetlenie: "{ get; private set; }" },
  ];

  K.registrujModul("csharp", { cislo: 5, nazov: "Triedy a objekty", popis: "Triedy, konštruktory, vlastnosti, ToString, zoznam objektov a dedičnosť.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("csharp", [
    { kat: "Kostra", znak: "using System;", nazov: "Menný priestor", popis: "Sprístupní Console, Math…" },
    { kat: "Kostra", znak: "static void Main()", nazov: "Hlavná metóda", popis: "Tu program začína." },
    { kat: "Výstup", znak: "Console.WriteLine", nazov: "Výpis", popis: "Write bez nového riadku.", priklad: 'Console.WriteLine($"Súčet: {a + b}");' },
    { kat: "Výstup", znak: "$\"…{x}…\"", nazov: "Interpolovaný reťazec", popis: "{x:F2} na 2 miesta, {x,5} šírka 5." },
    { kat: "Výstup", znak: "Console.ReadLine", nazov: "Vstup", popis: "Vráti text. Čísla cez int.Parse.", priklad: "int x = int.Parse(Console.ReadLine());" },
    { kat: "Typy", znak: "int / double / decimal / bool / string", nazov: "Typy", popis: "decimal na peniaze (19.90m)." },
    { kat: "Typy", znak: "var", nazov: "Odvodený typ", popis: "Typ si určí prekladač z hodnoty." },
    { kat: "Typy", znak: "const", nazov: "Konštanta", popis: "Hodnota sa nedá zmeniť." },
    { kat: "Riadenie", znak: "? :", nazov: "Ternárny operátor", popis: "podmienka ? a : b" },
    { kat: "Riadenie", znak: "switch { … => … }", nazov: "Switch výraz", popis: "_ = všetko ostatné." },
    { kat: "Riadenie", znak: "foreach (x in z)", nazov: "Pre každý prvok", popis: "Pole, zoznam aj text." },
    { kat: "Kolekcie", znak: "int[]", nazov: "Pole", popis: "Length, Array.Sort." },
    { kat: "Kolekcie", znak: "List<T>", nazov: "Zoznam", popis: "Add, Remove, Count, Sort." },
    { kat: "Kolekcie", znak: "Dictionary<K, V>", nazov: "Slovník", popis: "ContainsKey, TryGetValue." },
    { kat: "Kolekcie", znak: "LINQ", nazov: "Otázky nad kolekciami", popis: "Where, Select, OrderBy, Sum, Count, Max." },
    { kat: "Kolekcie", znak: "x => …", nazov: "Lambda", popis: "Krátka funkcia: x => x * 2." },
    { kat: "Objekty", znak: "class / new", nazov: "Trieda a objekt", popis: "Plán a konkrétna vec." },
    { kat: "Objekty", znak: "{ get; private set; }", nazov: "Vlastnosť", popis: "Čítanie zvonka, zápis len v triede." },
    { kat: "Objekty", znak: ": Predok / base", nazov: "Dedičnosť", popis: "class Macka : Zviera" },
    { kat: "Objekty", znak: "virtual / override", nazov: "Prepísanie metódy", popis: "Potomok zmení správanie predka." },
  ]);
})();
