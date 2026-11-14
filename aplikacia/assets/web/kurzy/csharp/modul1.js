/* C# · Modul 1 · Prvý program */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var KOD = function (t) { return P.kod(t, "cs"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "cs", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "using System;\n\nclass Program\n{\n    static void Main()\n    {\n" + telo + "\n    }\n}"; }

  var OBR = '<svg viewBox="0 0 340 92" role="img" aria-label="C# sa používa v hrách Unity, aplikáciách pre Windows, na webe aj v cloude">' +
    [["Unity", "hry"], [".NET", "aplikácie"], ["ASP.NET", "web"], ["Azure", "cloud"]].map(function (x, i) {
      var X = 6 + i * 84;
      return '<rect x="' + X + '" y="14" width="76" height="44" rx="10" style="fill:' + (i === 0 ? "#1b8a3a" : "var(--surface-2)") + ';stroke:#1b8a3a;stroke-width:2"/><text x="' + (X + 38) + '" y="41" text-anchor="middle" font-size="12" font-weight="700" ' + MONO + ' style="fill:' + (i === 0 ? "#fff" : "var(--text)") + '">' + x[0] + '</text><text x="' + (X + 38) + '" y="78" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">' + x[1] + "</text>";
    }).join("") + "</svg>";

  var L1 = { id: "csharp-1-1", nazov: "Ahoj, C#!", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Jazyk hier a aplikácií",
      text: "<p>C# (čítaj „sí šarp“) vytvoril Microsoft v roku 2000. Dnes v ňom vznikajú hry v Unity, aplikácie pre Windows aj webové služby:</p>", obr: OBR,
      podrobne: "<p>C# beží na platforme <b>.NET</b>, ktorá funguje na Windows, Linuxe aj Macu. Syntaxou je podobný Jave a C++, takže čo sa naučíš tu, využiješ aj inde. V tejto aplikácii sa C# prekladá na internete.</p>" },
    { typ: "vyklad", nadpis: "Prvý program",
      text: UKAZ('using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Ahoj, svet!");\n    }\n}', "Ahoj, svet!"),
      podrobne: "<ul><li><code>using System;</code> sprístupní základné triedy, napríklad Console.</li><li>Kód je v triede <code>Program</code>.</li><li><code>static void Main()</code> je hlavná metóda, tu program začína.</li><li><code>Console.WriteLine</code> vypíše text a nový riadok.</li><li>V C# sa zložené zátvorky zvyčajne píšu na samostatný riadok.</li></ul>" },
    { typ: "volba", otazka: "Ktorý príkaz vypíše text s novým riadkom?", moznosti: ["<code>Console.WriteLine(\"…\");</code>", "<code>System.out.println(\"…\");</code>", "<code>print(\"…\")</code>", "<code>cout &lt;&lt; \"…\";</code>"], spravna: 0, vysvetlenie: "Console.WriteLine." },
    { typ: "poradie", otazka: "Zoraď program:", riadky: ["using System;", "class Program", "{", "    static void Main()", "    {", '        Console.WriteLine("Ahoj");', "    }", "}"], vysvetlenie: "using, trieda, Main, príkaz, zátvorky." },
    { typ: "kod", zadanie: "Uprav program, aby vypísal <b>Učím sa C#</b>.",
      karty: ["cs"], start: { cs: kostra('        Console.WriteLine("Ahoj, svet!");') }, vyska: "220px",
      napoveda: 'Console.WriteLine("Učím sa C#");', riesenie: { cs: kostra('        Console.WriteLine("Učím sa C#");') },
      kontrola: function (v) { return r(v)[0] === "Učím sa C#" ? null : "Výstup má byť presne: Učím sa C#"; },
      vysvetlenie: "Prvý program v C# beží." },
  ] };

  var L2 = { id: "csharp-1-2", nazov: "Write a WriteLine", minut: 6, kroky: [
    { typ: "vyklad", nadpis: "S novým riadkom aj bez",
      text: UKAZ('Console.Write("Jeden ");\nConsole.Write("riadok");\nConsole.WriteLine();\nConsole.WriteLine("Druhý\\nTretí");', "Jeden riadok\nDruhý\nTretí"),
      podrobne: "<p><code>Write</code> nepridá nový riadok, <code>WriteLine</code> áno. Špeciálne znaky: <code>\\n</code>, <code>\\t</code>, <code>\\\"</code>. Text so znakom <code>@</code> pred úvodzovkami (<code>@\"C:\\priečinok\"</code>) berie lomítka doslovne.</p>" },
    { typ: "volba", otazka: "Koľko riadkov vypíše <code>Console.Write(\"A\"); Console.WriteLine(\"B\");</code>?", moznosti: ["1", "2", "0", "3"], spravna: 0, vysvetlenie: "AB na jednom riadku." },
    { typ: "kod", zadanie: "Vypíš tri riadky: <b>Hra: Minecraft</b>, <b>Žáner: sandbox</b>, <b>Rok: 2011</b>.",
      karty: ["cs"], start: { cs: kostra("        ") }, vyska: "220px",
      napoveda: 'Console.WriteLine("Hra: Minecraft"); …', riesenie: { cs: kostra('        Console.WriteLine("Hra: Minecraft");\n        Console.WriteLine("Žáner: sandbox");\n        Console.WriteLine("Rok: 2011");') },
      kontrola: function (v) { return r(v).join("|") === "Hra: Minecraft|Žáner: sandbox|Rok: 2011" ? null : "Výstup majú byť 3 riadky: Hra: Minecraft, Žáner: sandbox, Rok: 2011."; },
      vysvetlenie: "Tri WriteLine, tri riadky." },
  ] };

  var L3 = { id: "csharp-1-3", nazov: "Komentáre", minut: 5, kroky: [
    { typ: "vyklad", nadpis: "Poznámky v kóde",
      text: KOD("// komentár do konca riadku\n\n/* komentár\n   na viac riadkov */\n\n/// <summary>Dokumentačný komentár (XML)</summary>"),
      podrobne: "<p>Komentáre s tromi lomkami <code>///</code> nad metódami používa Visual Studio na nápovedu pri písaní kódu.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: '// Console.WriteLine("A");\nConsole.WriteLine("B");', moznosti: ["B", "A a B", "A", "nič"], spravna: 0, vysvetlenie: "Prvý riadok je komentár." },
    { typ: "kod", zadanie: "Zakomentuj riadok s textom <b>Ladenie</b>, aby sa vypísalo len <b>Hotovo</b>.",
      karty: ["cs"], start: { cs: kostra('        Console.WriteLine("Ladenie");\n        Console.WriteLine("Hotovo");') }, vyska: "220px",
      napoveda: "Pred prvý riadok daj //", riesenie: { cs: kostra('        // Console.WriteLine("Ladenie");\n        Console.WriteLine("Hotovo");') },
      kontrola: function (v, kod) { if (!/\/\/|\/\*/.test(kod)) return "Použi komentár //."; return r(v).join("|") === "Hotovo" ? null : "Má sa vypísať len Hotovo."; },
      vysvetlenie: "Komentár vypol riadok." },
  ] };

  var L4 = { id: "csharp-1-4", nazov: "Chyby prekladu", minut: 6, kroky: [
    { typ: "vyklad", nadpis: "Prekladač ťa chráni",
      text: "<p>C# kontroluje program pred spustením. Najčastejšie chyby:</p><ul><li>chýbajúca <b>bodkočiarka</b> (chyba CS1002),</li><li>zlé <b>veľké písmená</b>: <code>console.writeline</code> nefunguje, správne je <code>Console.WriteLine</code>,</li><li>chýbajúca zátvorka <code>}</code> (CS1513),</li><li>neznámy názov (CS0103).</li></ul>",
      podrobne: "<p>Každá chyba má kód CSxxxx. Ak ho zadáš do vyhľadávača, nájdeš podrobné vysvetlenie. Aplikácia najčastejšie z nich prekladá do slovenčiny.</p>" },
    { typ: "volba", otazka: "Čo je zle?", kod: 'console.WriteLine("Ahoj");', jazyk: "cs", moznosti: ["console má byť Console", "Chýba bodkočiarka", "WriteLine je zle", "Nič"], spravna: 0, vysvetlenie: "C# rozlišuje veľké a malé písmená." },
    { typ: "kod", zadanie: "Program má dve chyby. Oprav ho, aby vypísal <b>Funguje!</b>",
      karty: ["cs"], start: { cs: 'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.Writeline("Funguje!")\n    }\n}' }, vyska: "220px",
      napoveda: "Writeline má byť WriteLine (veľké L) a na konci riadku chýba ;", riesenie: { cs: kostra('        Console.WriteLine("Funguje!");') },
      kontrola: function (v) { return r(v)[0] === "Funguje!" ? null : "Výstup má byť Funguje!"; },
      vysvetlenie: "Veľké písmená sú v C# dôležité." },
  ] };

  var L5 = { id: "csharp-1-5", nazov: "Počítanie a spájanie", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Čísla a text",
      text: UKAZ('Console.WriteLine(7 + 5);\nConsole.WriteLine("Súčet: " + 7 + 5);\nConsole.WriteLine("Súčet: " + (7 + 5));\nConsole.WriteLine($"Súčet: {7 + 5}");\nConsole.WriteLine(17 / 5 + " a " + 17 % 5);', "12\nSúčet: 75\nSúčet: 12\nSúčet: 12\n3 a 2"),
      podrobne: "<p>Text so znakom <code>$</code> pred úvodzovkami je <b>interpolovaný reťazec</b>: výrazy v <code>{ }</code> sa vypočítajú a vložia. Je to najpohodlnejší spôsob skladania textu. Delenie celých čísel je celočíselné.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>Console.WriteLine($\"{2 * 3} kusy\");</code>?", moznosti: ["6 kusy", "2 * 3 kusy", "{2 * 3} kusy", "chybu"], spravna: 0, vysvetlenie: "Výraz v {} sa vypočíta." },
    { typ: "kod", zadanie: "Pomocou interpolovaného reťazca vypíš <b>Hodín za rok: 8760</b>. Číslo nech vypočíta program (<code>365 * 24</code>).",
      karty: ["cs"], start: { cs: kostra("        ") }, vyska: "200px",
      napoveda: 'Console.WriteLine($"Hodín za rok: {365 * 24}");', riesenie: { cs: kostra('        Console.WriteLine($"Hodín za rok: {365 * 24}");') },
      kontrola: function (v, kod) { if (/8760/.test(kod)) return "Nepíš 8760 priamo."; if (!/\$"/.test(kod)) return "Použi interpolovaný reťazec $\"…{…}…\"."; return r(v)[0] === "Hodín za rok: 8760" ? null : "Výstup má byť Hodín za rok: 8760"; },
      vysvetlenie: "$\"…\" je v C# najčastejší spôsob výpisu." },
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li><code>using System;</code>, trieda Program, metóda Main.</li><li><code>Console.WriteLine</code> a <code>Write</code>.</li><li>Komentáre a kódy chýb CS.</li><li>Veľké a malé písmená.</li><li>Interpolovaný reťazec <code>$\"…{x}…\"</code>.</li></ul>", tip: "Teraz test, potom premenné a vstup." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "csharp-1-1", otazka: "Kde C# program začína?", moznosti: ["V metóde Main", "V using", "V triede Console", "Na poslednom riadku"], spravna: 0, vysvetlenie: "static void Main()" },
    { typ: "volba", lekcia: "csharp-1-1", otazka: "Na čo slúži <code>using System;</code>?", moznosti: ["Sprístupní triedy ako Console", "Spustí program", "Je to komentár", "Vytvorí triedu"], spravna: 0, vysvetlenie: "Menný priestor System." },
    { typ: "volba", lekcia: "csharp-1-2", otazka: "Ktorá metóda nepridá nový riadok?", moznosti: ["Console.Write", "Console.WriteLine", "Console.ReadLine", "obe pridajú"], spravna: 0, vysvetlenie: "Write." },
    { typ: "volba", lekcia: "csharp-1-3", otazka: "Ktorý zápis je komentár?", moznosti: ["<code>// text</code>", "<code># text</code>", "<code>-- text</code>", "<code>' text</code>"], spravna: 0, vysvetlenie: "//" },
    { typ: "volba", lekcia: "csharp-1-4", otazka: "Prečo nefunguje <code>Console.writeLine(\"x\");</code>?", moznosti: ["Správne je WriteLine s veľkým W", "Chýba using", "Chýba bodkočiarka", "Funguje"], spravna: 0, vysvetlenie: "Veľké písmená." },
    { typ: "volba", lekcia: "csharp-1-5", otazka: "Čo vypíše <code>Console.WriteLine(\"A\" + 1 + 2);</code>?", moznosti: ["A12", "A3", "3A", "chybu"], spravna: 0, vysvetlenie: "Spájanie zľava." },
    { typ: "doplnenie", lekcia: "csharp-1-5", otazka: "Doplň interpolovaný výpis:", sablona: 'Console.WriteLine([[0]]"Vek: [[1]]vek}");', zetony: ["$", "{", "@", "%", "#"], spravne: ["$", "{"], vysvetlenie: "$\"Vek: {vek}\"" },
  ];

  K.registrujModul("csharp", { cislo: 1, nazov: "Prvý program", popis: "Console.WriteLine, komentáre, chyby prekladu a interpolované reťazce.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
