/* C# · Modul 2 · Premenné a vstup */
(function () {
  var P = K.pom;
  var KOD = function (t) { return P.kod(t, "cs"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "cs", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "using System;\n\nclass Program\n{\n    static void Main()\n    {\n" + telo + "\n    }\n}"; }

  var L1 = { id: "csharp-2-1", nazov: "Premenné a typy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Typy v C#",
      text: P.tabulka(["Typ", "Hodnoty", "Príklad"], [["<code>int</code>", "celé čísla", "<code>int vek = 15;</code>"], ["<code>double</code>", "desatinné čísla", "<code>double vyska = 1.72;</code>"], ["<code>decimal</code>", "peniaze (presné)", "<code>decimal cena = 19.90m;</code>"], ["<code>bool</code>", "true / false", "<code>bool hotovo = false;</code>"], ["<code>char</code>", "jeden znak", "<code>char z = 'A';</code>"], ["<code>string</code>", "text", "<code>string meno = \"Jana\";</code>"]]) + KOD('var mesto = "Nitra";   // typ string si odvodí prekladač'),
      podrobne: "<p><code>decimal</code> počíta s desatinnými číslami presne, preto sa používa na peniaze (pri double vyjde 0.1 + 0.2 = 0.30000000000000004). <code>var</code> je pohodlný, ale premenná má stále pevný typ.</p>" },
    { typ: "volba", otazka: "Ktorý typ je najvhodnejší na sumu v eurách?", moznosti: ["<code>decimal</code>", "<code>int</code>", "<code>bool</code>", "<code>char</code>"], spravna: 0, vysvetlenie: "decimal je presný." },
    { typ: "kod", zadanie: "Vytvor premenné <code>string hra = \"Tetris\"</code> a <code>int rok = 1984</code> a cez interpolovaný reťazec vypíš <b>Tetris vznikol v roku 1984.</b>",
      karty: ["cs"], start: { cs: kostra("        ") }, vyska: "220px",
      napoveda: 'Console.WriteLine($"{hra} vznikol v roku {rok}.");', riesenie: { cs: kostra('        string hra = "Tetris";\n        int rok = 1984;\n        Console.WriteLine($"{hra} vznikol v roku {rok}.");') },
      kontrola: function (v, kod) { if (!/string\s+hra/.test(kod) || !/int\s+rok/.test(kod)) return "Vytvor premenné string hra a int rok."; return r(v)[0] === "Tetris vznikol v roku 1984." ? null : "Výstup má byť Tetris vznikol v roku 1984."; },
      vysvetlenie: "Premenné vložené do textu cez { }." },
  ] };

  var L2 = { id: "csharp-2-2", nazov: "Vstup a Parse", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Console.ReadLine",
      text: "<p><code>Console.ReadLine()</code> načíta celý riadok ako text. Čísla treba previesť cez <code>int.Parse</code> alebo <code>double.Parse</code>:</p>" + UKAZ('string meno = Console.ReadLine();\nint vek = int.Parse(Console.ReadLine());\nConsole.WriteLine($"{meno}, o rok budeš mať {vek + 1}.");', "Jana\n15\nJana, o rok budeš mať 16."),
      podrobne: "<p>Ak je viac čísel v jednom riadku, rozdeľ ho: <code>string[] c = Console.ReadLine().Split(' ');</code> a potom <code>int.Parse(c[0])</code>. Ak text nie je číslo, Parse vyhodí FormatException. Bezpečnejší je <code>int.TryParse(text, out int x)</code>, ktorý vráti true/false.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>Console.ReadLine()</code>?", moznosti: ["Text (string)", "Číslo", "bool", "Prvý znak"], spravna: 0, vysvetlenie: "Vždy text, čísla treba Parse." },
    { typ: "kod", zadanie: "Na vstupe sú dve čísla v jednom riadku (<b>12 4</b>). Vypíš ich podiel a súčin: <b>12 / 4 = 3</b> a <b>12 * 4 = 48</b>.",
      karty: ["cs"], vstup: "12 4", start: { cs: kostra("        string[] c = Console.ReadLine().Split(' ');\n        ") }, vyska: "240px",
      napoveda: 'int a = int.Parse(c[0]); int b = int.Parse(c[1]); Console.WriteLine($"{a} / {b} = {a / b}");', riesenie: { cs: kostra('        string[] c = Console.ReadLine().Split(\' \');\n        int a = int.Parse(c[0]);\n        int b = int.Parse(c[1]);\n        Console.WriteLine($"{a} / {b} = {a / b}");\n        Console.WriteLine($"{a} * {b} = {a * b}");') },
      kontrola: function (v, kod) { if (!/int\.Parse|Convert\.ToInt32/.test(kod)) return "Preveď text na číslo cez int.Parse."; return r(v).join("|") === "12 / 4 = 3|12 * 4 = 48" ? null : "Výstup má byť 12 / 4 = 3 a 12 * 4 = 48."; },
      vysvetlenie: "Split rozdelil riadok na dve časti." },
  ] };

  var L3 = { id: "csharp-2-3", nazov: "Delenie a formát", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Celé a desatinné",
      text: UKAZ('int a = 7, b = 2;\nConsole.WriteLine(a / b);\nConsole.WriteLine((double)a / b);\ndouble pi = Math.PI;\nConsole.WriteLine($"{pi:F2}");\nConsole.WriteLine($"{0.256:P1}");\nConsole.WriteLine(Math.Round(2.675, 1));', "3\n3.5\n3.14\n25.6 %\n2.7"),
      podrobne: "<p>Za dvojbodkou v { } je <b>formát</b>: <code>F2</code> = 2 desatinné miesta, <code>P1</code> = percentá, <code>N0</code> = s oddeľovačmi tisícov. Desatinný oddeľovač (bodka/čiarka) závisí od nastavenia jazyka počítača.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>Console.WriteLine($\"{10 / 4}\");</code>?", moznosti: ["2", "2.5", "2.50", "3"], spravna: 0, vysvetlenie: "int / int." },
    { typ: "kod", zadanie: "Načítaj vzdialenosť v km a čas v minútach (vstup <b>42 150</b>, v jednom riadku). Vypíš priemernú rýchlosť v km/h na 2 desatinné miesta: <b>Rýchlosť: 16.80 km/h</b>.",
      karty: ["cs"], vstup: "42 150", start: { cs: kostra("        string[] c = Console.ReadLine().Split(' ');\n        int km = int.Parse(c[0]);\n        int min = int.Parse(c[1]);\n        ") }, vyska: "240px",
      napoveda: 'double v = km / (min / 60.0);\nConsole.WriteLine($"Rýchlosť: {v:F2} km/h");', riesenie: { cs: kostra('        string[] c = Console.ReadLine().Split(\' \');\n        int km = int.Parse(c[0]);\n        int min = int.Parse(c[1]);\n        double v = km / (min / 60.0);\n        Console.WriteLine($"Rýchlosť: {v:F2} km/h");') },
      kontrola: function (v) { var l = (r(v)[0] || "").replace(",", "."); return l === "Rýchlosť: 16.80 km/h" ? null : "Výstup má byť Rýchlosť: 16.80 km/h (teraz: " + (r(v)[0] || "nič") + "). Pozor na celočíselné delenie min / 60."; },
      vysvetlenie: "60.0 zabezpečilo desatinné delenie." },
  ] };

  var L4 = { id: "csharp-2-4", nazov: "Práca s textom", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Metódy stringu",
      text: P.tabulka(["Zápis", "Výsledok pre s = \"Programovanie\""], [["<code>s.Length</code>", "13 (bez zátvoriek!)"], ["<code>s.ToUpper()</code>", "PROGRAMOVANIE"], ["<code>s[0]</code>", "'P'"], ["<code>s.Substring(0, 7)</code>", "\"Program\""], ["<code>s.IndexOf(\"gram\")</code>", "3"], ["<code>s.Contains(\"mov\")</code>", "true"], ["<code>s.Replace(\"o\", \"0\")</code>", "Pr0gram0vanie"]]),
      podrobne: "<p>V C# sa texty porovnávajú normálne cez <code>==</code> (na rozdiel od Javy). Metódy sa píšu s veľkým začiatočným písmenom. Length je <b>vlastnosť</b>, preto bez zátvoriek.</p>" },
    { typ: "volba", otazka: "Ako zistíš dĺžku textu <code>s</code> v C#?", moznosti: ["<code>s.Length</code>", "<code>s.length()</code>", "<code>len(s)</code>", "<code>s.Size()</code>"], spravna: 0, vysvetlenie: "Vlastnosť Length." },
    { typ: "kod", zadanie: "Načítaj celé meno (vstup <b>Jana Nováková</b>) a vypíš iniciály s bodkami: <b>J. N.</b> Tip: <code>Split(' ')</code> a prvý znak každej časti.",
      karty: ["cs"], vstup: "Jana Nováková", start: { cs: kostra("        string meno = Console.ReadLine();\n        ") }, vyska: "220px",
      napoveda: 'string[] c = meno.Split(\' \');\nConsole.WriteLine($"{c[0][0]}. {c[1][0]}.");', riesenie: { cs: kostra('        string meno = Console.ReadLine();\n        string[] c = meno.Split(\' \');\n        Console.WriteLine($"{c[0][0]}. {c[1][0]}.");') },
      kontrola: function (v) { return r(v)[0] === "J. N." ? null : "Výstup má byť J. N."; },
      vysvetlenie: "c[0][0] = prvý znak prvého slova." },
  ] };

  var L5 = { id: "csharp-2-5", nazov: "Math a const", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Trieda Math a konštanty",
      text: P.tabulka(["Zápis", "Výsledok"], [["<code>Math.Sqrt(16)</code>", "4"], ["<code>Math.Pow(2, 10)</code>", "1024"], ["<code>Math.Abs(-7)</code>", "7"], ["<code>Math.Max(3, 9)</code>", "9"], ["<code>Math.Round(2.6)</code>", "3"], ["<code>Math.PI</code>", "3.14159…"]]) + KOD("const double DPH = 0.2;   // nedá sa zmeniť\nint x = 5;\nx += 3;\nx++;   // 9"),
      podrobne: "<p>Náhodné čísla: <code>Random rnd = new Random(); int k = rnd.Next(1, 7);</code> vráti 1 až 6 (horná hranica sa nezapočíta).</p>" },
    { typ: "volba", otazka: "Aké čísla vráti <code>new Random().Next(1, 7)</code>?", moznosti: ["1 až 6", "1 až 7", "0 až 7", "len 1 alebo 7"], spravna: 0, vysvetlenie: "Horná hranica sa nezapočíta." },
    { typ: "kod", zadanie: "Načítaj dve odvesny (vstup <b>5 12</b>, v jednom riadku) a vypíš preponu: <b>Prepona: 13</b>. Použi Math.Sqrt.",
      karty: ["cs"], vstup: "5 12", start: { cs: kostra("        string[] c = Console.ReadLine().Split(' ');\n        double a = double.Parse(c[0]);\n        double b = double.Parse(c[1]);\n        ") }, vyska: "240px",
      napoveda: 'Console.WriteLine($"Prepona: {Math.Sqrt(a * a + b * b)}");', riesenie: { cs: kostra('        string[] c = Console.ReadLine().Split(\' \');\n        double a = double.Parse(c[0]);\n        double b = double.Parse(c[1]);\n        Console.WriteLine($"Prepona: {Math.Sqrt(a * a + b * b)}");') },
      kontrola: function (v, kod) { if (!/Math\.Sqrt/.test(kod)) return "Použi Math.Sqrt."; return r(v)[0] === "Prepona: 13" ? null : "Výstup má byť Prepona: 13"; },
      vysvetlenie: "√(25 + 144) = 13." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li>int, double, decimal, bool, char, string, var.</li><li>Console.ReadLine, int.Parse, Split.</li><li>Formáty <code>{x:F2}</code> a pretypovanie.</li><li>Metódy stringu, Length.</li><li>Math, const, Random.</li></ul>", tip: "Ďalej podmienky a cykly." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "csharp-2-1", otazka: "Ktorý typ v C# uloží true/false?", moznosti: ["bool", "boolean", "Bool je jediná možnosť", "bit"], spravna: 0, vysvetlenie: "bool." },
    { typ: "volba", lekcia: "csharp-2-2", otazka: "Ako prevedieš text „42“ na číslo?", moznosti: ["<code>int.Parse(\"42\")</code>", "<code>(int)\"42\"</code>", "<code>\"42\".toInt()</code>", "<code>Number(\"42\")</code>"], spravna: 0, vysvetlenie: "int.Parse." },
    { typ: "volba", lekcia: "csharp-2-3", otazka: "Čo znamená <code>{x:F2}</code>?", moznosti: ["x na 2 desatinné miesta", "x krát 2", "druhý znak x", "x v hexadecimálnom tvare"], spravna: 0, vysvetlenie: "Formát F2." },
    { typ: "volba", lekcia: "csharp-2-4", otazka: "Ako v C# porovnáš dva texty?", moznosti: ["<code>a == b</code>", "Len cez a.equals(b)", "<code>strcmp(a, b)</code>", "Nedá sa"], spravna: 0, vysvetlenie: "V C# == porovnáva obsah textu." },
    { typ: "volba", lekcia: "csharp-2-4", otazka: "Čo vráti <code>\"Ahoj\".Substring(1, 2)</code>?", moznosti: ["\"ho\"", "\"Ah\"", "\"hoj\"", "\"oj\""], spravna: 0, vysvetlenie: "Od indexu 1, dva znaky." },
    { typ: "volba", lekcia: "csharp-2-5", otazka: "Čo spraví <code>const</code>?", moznosti: ["Hodnota sa nedá zmeniť", "Premenná je verejná", "Premenná je text", "Nič"], spravna: 0, vysvetlenie: "Konštanta." },
    { typ: "doplnenie", lekcia: "csharp-2-2", otazka: "Načítaj číslo:", sablona: "int x = int.[[0]](Console.[[1]]());", zetony: ["Parse", "ReadLine", "Read", "Convert", "Input"], spravne: ["Parse", "ReadLine"], vysvetlenie: "int.Parse(Console.ReadLine())" },
  ];

  K.registrujModul("csharp", { cislo: 2, nazov: "Premenné a vstup", popis: "Typy, ReadLine a Parse, formátovanie, string a Math.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
