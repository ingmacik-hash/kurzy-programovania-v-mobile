/* C# · Modul 3 · Podmienky a cykly */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "cs"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "cs", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "using System;\n\nclass Program\n{\n    static void Main()\n    {\n" + telo + "\n    }\n}"; }

  var L1 = { id: "csharp-3-1", nazov: "if a else", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Rozhodovanie",
      text: UKAZ('int teplota = 8;\nif (teplota >= 25)\n{\n    Console.WriteLine("Horúco");\n}\nelse if (teplota >= 15)\n{\n    Console.WriteLine("Príjemne");\n}\nelse\n{\n    Console.WriteLine("Chladno");\n}', "Chladno"),
      podrobne: "<p>Podmienka musí byť <code>bool</code>. Krátky zápis „ak–tak–inak“ v jednom výraze: <code>string s = vek &gt;= 18 ? \"dospelý\" : \"dieťa\";</code></p>" },
    { typ: "volba", otazka: "Čo bude v <code>s</code> pre <code>x = 3</code>?", kod: 's = x % 2 == 0 ? "párne" : "nepárne";', moznosti: ["nepárne", "párne", "3", "chyba"], spravna: 0, vysvetlenie: "3 % 2 = 1." },
    { typ: "kod", zadanie: "Načítaj body z testu (vstup <b>67</b>) a vypíš známku: 90+ → <b>1</b>, 75–89 → <b>2</b>, 50–74 → <b>3</b>, 30–49 → <b>4</b>, menej → <b>5</b>. Výpis: <b>Známka: 3</b>.",
      karty: ["cs"], vstup: "67", start: { cs: kostra("        int body = int.Parse(Console.ReadLine());\n        ") }, vyska: "280px",
      napoveda: "int z; if (body >= 90) z = 1; else if (body >= 75) z = 2; … Console.WriteLine($\"Známka: {z}\");", riesenie: { cs: kostra('        int body = int.Parse(Console.ReadLine());\n        int z;\n        if (body >= 90) z = 1;\n        else if (body >= 75) z = 2;\n        else if (body >= 50) z = 3;\n        else if (body >= 30) z = 4;\n        else z = 5;\n        Console.WriteLine($"Známka: {z}");') },
      kontrola: function (v, kod) { if (!/else\s+if/.test(kod)) return "Použi else if."; return r(v)[0] === "Známka: 3" ? null : "Pre 67 bodov má vyjsť Známka: 3."; },
      vysvetlenie: "Podmienky od najprísnejšej." },
  ] };

  var L2 = { id: "csharp-3-2", nazov: "Logika a switch", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "&&, || a switch výraz",
      text: KOD('if (vek >= 15 && maListok) { … }\nif (den == "sobota" || den == "nedeľa") { … }') + UKAZ('int mesiac = 7;\nstring obdobie = mesiac switch\n{\n    12 or 1 or 2 => "zima",\n    >= 3 and <= 5 => "jar",\n    >= 6 and <= 8 => "leto",\n    _ => "jeseň"\n};\nConsole.WriteLine(obdobie);', "leto"),
      podrobne: "<p>Moderný <b>switch výraz</b> vracia hodnotu a vie porovnávať aj rozsahy (<code>&gt;= 3 and &lt;= 5</code>). Znak <code>_</code> znamená „všetko ostatné“. Starší <code>switch</code> s <code>case … break;</code> funguje tiež.</p>" },
    { typ: "volba", otazka: "Čo znamená <code>_</code> vo switch výraze?", moznosti: ["Všetky ostatné prípady", "Prázdny text", "Chyba", "Nula"], spravna: 0, vysvetlenie: "Ako default." },
    { typ: "kod", zadanie: "Načítaj znak operácie a dve čísla (vstup <b>-</b>, <b>20</b>, <b>8</b>, každé na riadku) a cez switch výraz vypíš výsledok: <b>12</b>. Pre neznámu operáciu vráť 0.",
      karty: ["cs"], vstup: "-\n20\n8", start: { cs: kostra("        string op = Console.ReadLine();\n        int a = int.Parse(Console.ReadLine());\n        int b = int.Parse(Console.ReadLine());\n        ") }, vyska: "280px",
      napoveda: 'int v = op switch { "+" => a + b, "-" => a - b, "*" => a * b, "/" => a / b, _ => 0 };', riesenie: { cs: kostra('        string op = Console.ReadLine();\n        int a = int.Parse(Console.ReadLine());\n        int b = int.Parse(Console.ReadLine());\n        int v = op switch\n        {\n            "+" => a + b,\n            "-" => a - b,\n            "*" => a * b,\n            "/" => a / b,\n            _ => 0\n        };\n        Console.WriteLine(v);') },
      kontrola: function (v, kod) { if (!/switch/.test(kod)) return "Použi switch."; return r(v)[0] === "12" ? null : "Pre - 20 8 má vyjsť 12."; },
      vysvetlenie: "Switch výraz je stručný." },
  ] };

  var L3 = { id: "csharp-3-3", nazov: "for a while", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Cykly",
      text: UKAZ('for (int i = 1; i <= 5; i++)\n{\n    Console.Write(i + " ");\n}\nConsole.WriteLine();\n\nint n = 1;\nwhile (n < 1000) n *= 2;\nConsole.WriteLine(n);', "1 2 3 4 5 \n1024"),
      podrobne: "<p>for: začiatok; podmienka; krok. while: kým platí podmienka. <code>do { … } while (…);</code> prebehne aspoň raz.</p>" },
    { typ: "volba", otazka: "Koľkokrát prebehne <code>for (int i = 2; i &lt;= 10; i += 2)</code>?", moznosti: ["5", "4", "10", "6"], spravna: 0, vysvetlenie: "2, 4, 6, 8, 10." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>6</b>) a vypíš prvých n členov Fibonacciho postupnosti oddelených medzerou: <b>0 1 1 2 3 5</b>.",
      karty: ["cs"], vstup: "6", start: { cs: kostra("        int n = int.Parse(Console.ReadLine());\n        ") }, vyska: "260px",
      napoveda: "int a = 0, b = 1; for (i < n) { vypíš a; (a, b) = (b, a + b); }", riesenie: { cs: kostra('        int n = int.Parse(Console.ReadLine());\n        int a = 0, b = 1;\n        string vysl = "";\n        for (int i = 0; i < n; i++)\n        {\n            vysl += (i > 0 ? " " : "") + a;\n            (a, b) = (b, a + b);\n        }\n        Console.WriteLine(vysl);') },
      kontrola: function (v, kod) { if (!/for\s*\(|while\s*\(/.test(kod)) return "Použi cyklus."; return r(v)[0] === "0 1 1 2 3 5" ? null : "Výstup má byť 0 1 1 2 3 5"; },
      vysvetlenie: "(a, b) = (b, a + b) vymení hodnoty naraz." },
  ] };

  var L4 = { id: "csharp-3-4", nazov: "foreach", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Pre každý prvok",
      text: UKAZ('string[] ovocie = { "jablko", "hruška", "slivka" };\nforeach (string o in ovocie)\n{\n    Console.WriteLine(o.ToUpper());\n}\nforeach (char z in "Ahoj")\n{\n    Console.Write(z + "-");\n}', "JABLKO\nHRUŠKA\nSLIVKA\nA-h-o-j-"),
      podrobne: "<p><code>foreach</code> prejde všetky prvky poľa, zoznamu alebo znaky textu. Prvky v ňom nemôžeš meniť. Ak potrebuješ index, použi for.</p>" },
    { typ: "volba", otazka: "Kedy použiješ for namiesto foreach?", moznosti: ["Keď potrebuješ index alebo meniť prvky", "Vždy", "Nikdy", "Pri texte"], spravna: 0, vysvetlenie: "foreach je na čítanie." },
    { typ: "kod", zadanie: "Načítaj vetu (vstup <b>Programovanie v CSharp je zábava</b>) a cez foreach spočítaj samohlásky (a, e, i, o, u, y, aj veľké): <b>Samohlások: 11</b>.",
      karty: ["cs"], vstup: "Programovanie v CSharp je zábava", start: { cs: kostra("        string veta = Console.ReadLine();\n        ") }, vyska: "260px",
      napoveda: 'int p = 0; foreach (char z in veta.ToLower()) if ("aeiouyáéíóúý".Contains(z)) p++;', riesenie: { cs: kostra('        string veta = Console.ReadLine();\n        int p = 0;\n        foreach (char z in veta.ToLower())\n        {\n            if ("aeiouyáéíóúý".Contains(z)) p++;\n        }\n        Console.WriteLine($"Samohlások: {p}");') },
      kontrola: function (v, kod) { if (!/foreach/.test(kod)) return "Použi foreach."; return r(v)[0] === "Samohlások: 11" ? null : "Výstup má byť Samohlások: 11 (teraz: " + (r(v)[0] || "nič") + ")."; },
      vysvetlenie: "Contains funguje aj na znaky." },
  ] };

  var L5 = { id: "csharp-3-5", nazov: "break, continue, vnorené cykly", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Riadenie cyklu",
      text: UKAZ('for (int i = 1; i <= 10; i++)\n{\n    if (i % 2 == 0) continue;\n    if (i > 7) break;\n    Console.Write(i + " ");\n}\nConsole.WriteLine();\nfor (int r = 1; r <= 3; r++)\n{\n    Console.WriteLine(new string(\'#\', r));\n}', "1 3 5 7 \n#\n##\n###"),
      podrobne: "<p><code>new string('#', 3)</code> vytvorí text „###“. break ukončí najbližší cyklus, continue preskočí na ďalší krok.</p>" },
    { typ: "volba", otazka: "Čo vytvorí <code>new string('-', 5)</code>?", moznosti: ["\"-----\"", "\"-5\"", "\"5-\"", "chybu"], spravna: 0, vysvetlenie: "5× znak -." },
    { typ: "kod", zadanie: "Načítaj n (vstup <b>4</b>) a vypíš tabuľku násobenia n × n so stĺpcami zarovnanými na šírku 3 (<code>{x,3}</code>). Prvý riadok: <code>&nbsp;&nbsp;1&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;4</code>, posledný <code>&nbsp;&nbsp;4&nbsp;&nbsp;8&nbsp;12&nbsp;16</code>.",
      karty: ["cs"], vstup: "4", start: { cs: kostra("        int n = int.Parse(Console.ReadLine());\n        ") }, vyska: "260px",
      napoveda: 'for (r) { string riadok = ""; for (s) riadok += $"{r * s,3}"; Console.WriteLine(riadok); }', riesenie: { cs: kostra('        int n = int.Parse(Console.ReadLine());\n        for (int r = 1; r <= n; r++)\n        {\n            string riadok = "";\n            for (int s = 1; s <= n; s++)\n            {\n                riadok += $"{r * s,3}";\n            }\n            Console.WriteLine(riadok);\n        }') },
      kontrola: function (v) { var l = (v || "").replace(/\s+$/, "").split("\n").map(function (x) { return x.replace(/\s+$/, ""); }); return l.join("|") === "  1  2  3  4|  2  4  6  8|  3  6  9 12|  4  8 12 16" ? null : "Tabuľka nesedí. Každé číslo má zaberať 3 znaky ({x,3})."; },
      vysvetlenie: "{x,3} zarovná vpravo na šírku 3." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li><code>if</code>, <code>else if</code>, ternárny operátor <code>? :</code>.</li><li><code>&amp;&amp;</code>, <code>||</code> a switch výraz.</li><li><code>for</code>, <code>while</code>, <code>foreach</code>.</li><li><code>break</code>, <code>continue</code>, vnorené cykly, zarovnanie <code>{x,3}</code>.</li></ul>", tip: "Ďalej metódy, polia a zoznamy." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "csharp-3-1", otazka: "Čo vráti <code>5 &gt; 3 ? \"áno\" : \"nie\"</code>?", moznosti: ["\"áno\"", "\"nie\"", "true", "chyba"], spravna: 0, vysvetlenie: "Podmienka platí." },
    { typ: "volba", lekcia: "csharp-3-2", otazka: "Ako zapíšeš „alebo“?", moznosti: ["<code>||</code>", "<code>&amp;&amp;</code>", "<code>or</code> v if", "<code>|</code> je jediná možnosť"], spravna: 0, vysvetlenie: "|| (or sa používa len vo vzoroch switch)." },
    { typ: "volba", lekcia: "csharp-3-3", otazka: "Ktorý cyklus prebehne aspoň raz?", moznosti: ["do-while", "while", "for", "foreach"], spravna: 0, vysvetlenie: "Podmienka na konci." },
    { typ: "volba", lekcia: "csharp-3-4", otazka: "Čo prejde <code>foreach (char z in \"abc\")</code>?", moznosti: ["Znaky a, b, c", "Text abc trikrát", "Čísla 0, 1, 2", "Nič"], spravna: 0, vysvetlenie: "Text je postupnosť znakov." },
    { typ: "volba", lekcia: "csharp-3-5", otazka: "Čo spraví <code>{x,5}</code> v interpolovanom reťazci?", moznosti: ["Zarovná x vpravo na šírku 5", "Vypíše x 5-krát", "5 desatinných miest", "x krát 5"], spravna: 0, vysvetlenie: "Šírka 5 znakov." },
    { typ: "doplnenie", lekcia: "csharp-3-4", otazka: "Prejdi pole:", sablona: "[[0]] (int x [[1]] cisla)\n{\n    Console.WriteLine(x);\n}", zetony: ["foreach", "in", "for", "of", ":"], spravne: ["foreach", "in"], vysvetlenie: "foreach (… in …)" },
  ];

  K.registrujModul("csharp", { cislo: 3, nazov: "Podmienky a cykly", popis: "if/else, ternárny operátor, switch výraz, for, while, foreach.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
