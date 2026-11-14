/* C# · Modul 4 · Metódy, polia a zoznamy */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "cs"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "cs", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function program(metody, telo, usingy) { return "using System;\n" + (usingy || "") + "\nclass Program\n{\n" + (metody ? metody + "\n\n" : "") + "    static void Main()\n    {\n" + telo + "\n    }\n}"; }
  var KOL = "using System.Collections.Generic;\n", LINQ = "using System.Collections.Generic;\nusing System.Linq;\n";

  var L1 = { id: "csharp-4-1", nazov: "Metódy", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Vlastné metódy",
      text: UKAZ('static int Stvorec(int x)\n{\n    return x * x;\n}\n\nstatic void Pozdrav(string meno, string pozdrav = "Ahoj")\n{\n    Console.WriteLine($"{pozdrav}, {meno}!");\n}\n…\nConsole.WriteLine(Stvorec(9));\nPozdrav("Jana");\nPozdrav("Peter", "Servus");', "81\nAhoj, Jana!\nServus, Peter!"),
      podrobne: "<p>Metódy v C# sa podľa zvyku píšu s veľkým začiatočným písmenom (PascalCase). Parameter môže mať predvolenú hodnotu. Krátka metóda sa dá zapísať šípkou: <code>static int Stvorec(int x) =&gt; x * x;</code></p>" },
    { typ: "volba", otazka: "Ako sa v C# zvyčajne pomenúvajú metódy?", moznosti: ["VelkymZaciatkom (PascalCase)", "malym_s_podtrznikom", "VSETKO_VELKE", "na tom nezáleží"], spravna: 0, vysvetlenie: "Console.WriteLine, Math.Sqrt…" },
    { typ: "kod", zadanie: "Napíš metódu <code>static bool JePalindrom(string s)</code>, ktorá vráti, či sa slovo číta rovnako odpredu aj odzadu (bez ohľadu na veľkosť písmen). V Main pre vstup <b>Anna</b> vypíš <b>True</b>.",
      karty: ["cs"], vstup: "Anna", start: { cs: program("", "        string slovo = Console.ReadLine();\n        ") }, vyska: "300px",
      napoveda: "s = s.ToLower(); for (int i = 0; i < s.Length / 2; i++) if (s[i] != s[s.Length - 1 - i]) return false; return true;", riesenie: { cs: program("    static bool JePalindrom(string s)\n    {\n        s = s.ToLower();\n        for (int i = 0; i < s.Length / 2; i++)\n        {\n            if (s[i] != s[s.Length - 1 - i]) return false;\n        }\n        return true;\n    }", "        string slovo = Console.ReadLine();\n        Console.WriteLine(JePalindrom(slovo));") },
      kontrola: function (v, kod) { if (!/static\s+bool\s+JePalindrom\s*\(\s*string\s+\w+\s*\)/.test(kod)) return "Chýba metóda static bool JePalindrom(string s)."; return r(v)[0] === "True" ? null : "Pre Anna má vypísať True."; },
      vysvetlenie: "bool sa vypíše ako True alebo False." },
  ] };

  var L2 = { id: "csharp-4-2", nazov: "Polia", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Pole s pevnou dĺžkou",
      text: UKAZ('int[] body = { 12, 7, 30, 5 };\nConsole.WriteLine(body.Length);\nbody[1] = 8;\nint sucet = 0;\nforeach (int b in body) sucet += b;\nConsole.WriteLine(sucet);\nConsole.WriteLine(string.Join(", ", body));\nArray.Sort(body);\nConsole.WriteLine(string.Join(" ", body));', "4\n55\n12, 8, 30, 5\n5 8 12 30"),
      podrobne: "<p><code>string.Join(\", \", pole)</code> spojí prvky do textu. Pri zlom indexe C# vyhodí IndexOutOfRangeException. Nové pole <code>new int[5]</code> má samé nuly.</p>" },
    { typ: "volba", otazka: "Ako pekne vypíšeš prvky poľa oddelené čiarkou?", moznosti: ["<code>string.Join(\", \", pole)</code>", "<code>Console.WriteLine(pole)</code>", "<code>pole.Print()</code>", "<code>pole.ToString()</code>"], spravna: 0, vysvetlenie: "Join spojí prvky." },
    { typ: "kod", zadanie: "Načítaj čísla v jednom riadku (vstup <b>5 -3 8 0 -1 4</b>) do poľa (<code>Split</code> a <code>int.Parse</code>) a vypíš len kladné, oddelené čiarkou a medzerou: <b>5, 8, 4</b>.",
      karty: ["cs"], vstup: "5 -3 8 0 -1 4", start: { cs: program("", "        string[] casti = Console.ReadLine().Split(' ');\n        ", KOL) }, vyska: "280px",
      napoveda: "int[] a = new int[casti.Length]; for … a[i] = int.Parse(casti[i]); potom List<int> kladne a string.Join.", riesenie: { cs: program("", '        string[] casti = Console.ReadLine().Split(\' \');\n        int[] a = new int[casti.Length];\n        for (int i = 0; i < casti.Length; i++) a[i] = int.Parse(casti[i]);\n        List<int> kladne = new List<int>();\n        foreach (int x in a)\n        {\n            if (x > 0) kladne.Add(x);\n        }\n        Console.WriteLine(string.Join(", ", kladne));', KOL) },
      kontrola: function (v) { return r(v)[0] === "5, 8, 4" ? null : "Výstup má byť 5, 8, 4"; },
      vysvetlenie: "Kladné sme zbierali do zoznamu." },
  ] };

  var L3 = { id: "csharp-4-3", nazov: "List", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Zoznam, ktorý rastie",
      text: UKAZ('using System.Collections.Generic;\n…\nList<string> nakup = new List<string> { "chlieb" };\nnakup.Add("mlieko");\nnakup.Insert(0, "vajcia");\nConsole.WriteLine(nakup.Count);\nConsole.WriteLine(nakup[1]);\nnakup.Remove("mlieko");\nConsole.WriteLine(nakup.Contains("mlieko"));\nConsole.WriteLine(string.Join(", ", nakup));', "3\nchlieb\nFalse\nvajcia, chlieb"),
      podrobne: "<p>Pole má <code>Length</code>, zoznam <code>Count</code>. Zoznam zoradíš cez <code>nakup.Sort()</code>. <code>Dictionary&lt;string, int&gt;</code> je slovník kľúč → hodnota.</p>" },
    { typ: "volba", otazka: "Ako zistíš počet prvkov <code>List</code>?", moznosti: ["<code>zoznam.Count</code>", "<code>zoznam.Length</code>", "<code>zoznam.Size()</code>", "<code>len(zoznam)</code>"], spravna: 0, vysvetlenie: "Count." },
    { typ: "kod", zadanie: "Načítaj mená v jednom riadku (vstup <b>Peter Eva Jana Adam</b>) do <code>List&lt;string&gt;</code>, zoraď ich a vypíš prvé a posledné podľa abecedy: <b>Prvý: Adam, posledný: Peter</b>.",
      karty: ["cs"], vstup: "Peter Eva Jana Adam", start: { cs: program("", "        List<string> mena = new List<string>(Console.ReadLine().Split(' '));\n        ", KOL) }, vyska: "240px",
      napoveda: 'mena.Sort(); Console.WriteLine($"Prvý: {mena[0]}, posledný: {mena[mena.Count - 1]}");', riesenie: { cs: program("", '        List<string> mena = new List<string>(Console.ReadLine().Split(\' \'));\n        mena.Sort();\n        Console.WriteLine($"Prvý: {mena[0]}, posledný: {mena[mena.Count - 1]}");', KOL) },
      kontrola: function (v, kod) { if (!/\.Sort\s*\(/.test(kod)) return "Zoraď zoznam cez Sort()."; return r(v)[0] === "Prvý: Adam, posledný: Peter" ? null : "Výstup má byť Prvý: Adam, posledný: Peter"; },
      vysvetlenie: "Posledný index je Count − 1." },
  ] };

  var L4 = { id: "csharp-4-4", nazov: "LINQ", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Otázky nad zoznamami",
      text: "<p><b>LINQ</b> (using System.Linq) pridá kolekciám užitočné metódy. Pripomína SQL:</p>" + UKAZ('int[] c = { 5, 2, 9, 1, 7 };\nConsole.WriteLine(c.Sum());\nConsole.WriteLine(c.Max());\nConsole.WriteLine(c.Average());\nvar velke = c.Where(x => x > 4).OrderBy(x => x);\nConsole.WriteLine(string.Join(" ", velke));\nvar dvojnasobky = c.Select(x => x * 2);\nConsole.WriteLine(string.Join(" ", dvojnasobky));', "24\n9\n4.8\n5 7 9\n10 4 18 2 14"),
      podrobne: "<p><code>x =&gt; x &gt; 4</code> je <b>lambda</b>: krátka funkcia „pre x vráť x &gt; 4“. Where filtruje, Select mení prvky, OrderBy triedi, Count spočíta. LINQ používajú C# programátori každý deň.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>new[] { 1, 2, 3, 4 }.Where(x => x % 2 == 0).Sum()</code>?", moznosti: ["6", "10", "4", "2"], spravna: 0, vysvetlenie: "2 + 4." },
    { typ: "kod", zadanie: "Načítaj známky v jednom riadku (vstup <b>1 3 2 5 1 2</b>). Cez LINQ vypíš priemer na 2 miesta, počet jednotiek a či je niektorá známka 5: <b>Priemer: 2.33</b>, <b>Jednotiek: 2</b>, <b>Päťka: True</b>.",
      karty: ["cs"], vstup: "1 3 2 5 1 2", start: { cs: program("", "        int[] z = Console.ReadLine().Split(' ').Select(int.Parse).ToArray();\n        ", LINQ) }, vyska: "260px",
      napoveda: 'z.Average():F2, z.Count(x => x == 1), z.Contains(5) alebo z.Any(x => x == 5)', riesenie: { cs: program("", '        int[] z = Console.ReadLine().Split(\' \').Select(int.Parse).ToArray();\n        Console.WriteLine($"Priemer: {z.Average():F2}");\n        Console.WriteLine($"Jednotiek: {z.Count(x => x == 1)}");\n        Console.WriteLine($"Päťka: {z.Contains(5)}");', LINQ) },
      kontrola: function (v, kod) { if (!/=>/.test(kod)) return "Použi LINQ s lambdou (napr. Count(x => x == 1))."; var l = r(v).map(function (x) { return x.replace(",", "."); }); return l.join("|") === "Priemer: 2.33|Jednotiek: 2|Päťka: True" ? null : "Výstup má byť Priemer: 2.33, Jednotiek: 2, Päťka: True"; },
      vysvetlenie: "Tri otázky, tri riadky kódu." },
  ] };

  var L5 = { id: "csharp-4-5", nazov: "Dictionary", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kľúč → hodnota",
      text: UKAZ('var ceny = new Dictionary<string, double>\n{\n    ["chlieb"] = 1.2,\n    ["mlieko"] = 0.9\n};\nceny["syr"] = 2.5;\nConsole.WriteLine(ceny["mlieko"]);\nConsole.WriteLine(ceny.ContainsKey("vajcia"));\nforeach (var p in ceny)\n{\n    Console.WriteLine($"{p.Key}: {p.Value}");\n}', "0.9\nFalse\nchlieb: 1.2\nmlieko: 0.9\nsyr: 2.5"),
      podrobne: "<p>Neexistujúci kľúč vyhodí KeyNotFoundException. Bezpečne: <code>ceny.TryGetValue(\"x\", out double c)</code> alebo <code>ceny.GetValueOrDefault(\"x\")</code>.</p>" },
    { typ: "volba", otazka: "Ako zistíš, či slovník obsahuje kľúč?", moznosti: ["<code>d.ContainsKey(k)</code>", "<code>d.Has(k)</code>", "<code>k in d</code>", "<code>d.Contains(k)</code> je jediná možnosť"], spravna: 0, vysvetlenie: "ContainsKey." },
    { typ: "kod", zadanie: "Načítaj slová v jednom riadku (vstup <b>pes mačka pes vták pes mačka</b>) a cez <code>Dictionary&lt;string, int&gt;</code> spočítaj výskyty. Vypíš ich v poradí prvého výskytu: <b>pes: 3</b>, <b>mačka: 2</b>, <b>vták: 1</b>.",
      karty: ["cs"], vstup: "pes mačka pes vták pes mačka", start: { cs: program("", "        string[] slova = Console.ReadLine().Split(' ');\n        var pocty = new Dictionary<string, int>();\n        ", KOL) }, vyska: "280px",
      napoveda: "foreach (string s in slova) { if (pocty.ContainsKey(s)) pocty[s]++; else pocty[s] = 1; }", riesenie: { cs: program("", '        string[] slova = Console.ReadLine().Split(\' \');\n        var pocty = new Dictionary<string, int>();\n        foreach (string s in slova)\n        {\n            if (pocty.ContainsKey(s)) pocty[s]++;\n            else pocty[s] = 1;\n        }\n        foreach (var p in pocty)\n        {\n            Console.WriteLine($"{p.Key}: {p.Value}");\n        }', KOL) },
      kontrola: function (v, kod) { if (!/Dictionary/.test(kod)) return "Použi Dictionary."; return r(v).join("|") === "pes: 3|mačka: 2|vták: 1" ? null : "Výstup má byť pes: 3, mačka: 2, vták: 1."; },
      vysvetlenie: "Klasické počítanie výskytov." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li>static metódy, predvolené parametre, =&gt;.</li><li>Polia, <code>Length</code>, <code>Array.Sort</code>, <code>string.Join</code>.</li><li><code>List&lt;T&gt;</code>: Add, Remove, Count, Sort.</li><li>LINQ: Where, Select, Sum, Average, Count.</li><li><code>Dictionary&lt;K, V&gt;</code>.</li></ul>", tip: "Posledný modul: triedy, vlastnosti a objekty." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "csharp-4-1", otazka: "Čo znamená <code>=&gt;</code> v <code>static int Dvakrat(int x) =&gt; x * 2;</code>?", moznosti: ["Krátky zápis metódy, ktorá vráti x * 2", "Porovnanie", "Priradenie", "Komentár"], spravna: 0, vysvetlenie: "Expression-bodied metóda." },
    { typ: "volba", lekcia: "csharp-4-2", otazka: "Ako zistíš dĺžku poľa <code>a</code>?", moznosti: ["<code>a.Length</code>", "<code>a.Count</code>", "<code>a.Size</code>", "<code>len(a)</code>"], spravna: 0, vysvetlenie: "Pole: Length, List: Count." },
    { typ: "volba", lekcia: "csharp-4-3", otazka: "Ktorá metóda pridá prvok do List?", moznosti: ["<code>Add</code>", "<code>Push</code>", "<code>Append</code> je jediná možnosť", "<code>Insert</code> je jediná možnosť"], spravna: 0, vysvetlenie: "Add na koniec, Insert na pozíciu." },
    { typ: "volba", lekcia: "csharp-4-4", otazka: "Čo robí <code>Where(x =&gt; x &gt; 0)</code>?", moznosti: ["Nechá len prvky väčšie ako 0", "Zmení prvky na kladné", "Spočíta kladné", "Zoradí"], spravna: 0, vysvetlenie: "Filter." },
    { typ: "volba", lekcia: "csharp-4-4", otazka: "Čo vráti <code>new[] { 2, 4 }.Select(x =&gt; x + 1)</code>?", moznosti: ["3, 5", "6", "2, 4, 1", "1"], spravna: 0, vysvetlenie: "Select zmení každý prvok." },
    { typ: "volba", lekcia: "csharp-4-5", otazka: "Čo uloží <code>Dictionary&lt;string, int&gt;</code>?", moznosti: ["Dvojice text → číslo", "Zoznam textov", "Len čísla", "Text a číslo v jednej hodnote"], spravna: 0, vysvetlenie: "Kľúč string, hodnota int." },
    { typ: "doplnenie", lekcia: "csharp-4-3", otazka: "Vytvor zoznam a pridaj prvok:", sablona: "var z = [[0]] List<int>();\nz.[[1]](5);", zetony: ["new", "Add", "create", "Push", "make"], spravne: ["new", "Add"], vysvetlenie: "new List<int>(); z.Add(5);" },
  ];

  K.registrujModul("csharp", { cislo: 4, nazov: "Metódy, polia a zoznamy", popis: "Metódy, polia, List, LINQ a Dictionary.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
