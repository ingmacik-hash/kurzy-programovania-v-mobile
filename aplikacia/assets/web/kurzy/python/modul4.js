/* Python · Modul 4 · Cykly */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "py", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function beh(kod, vstupy) { return K.spustiPythonHned(kod, vstupy); }

  var OBR_RANGE = '<svg viewBox="0 0 340 90" role="img" aria-label="range(5) vytvorí čísla 0, 1, 2, 3, 4 – päť čísel, bez čísla 5">' +
    [0, 1, 2, 3, 4, 5].map(function (n) {
      var x = 14 + n * 54, ok = n < 5;
      return '<rect x="' + x + '" y="14" width="44" height="40" rx="8" style="fill:' + (ok ? "#3572a5" : "var(--surface-2)") + ';' + (ok ? "" : "stroke:var(--bad);stroke-width:2;stroke-dasharray:4 3") + '"/><text x="' + (x + 22) + '" y="40" text-anchor="middle" font-size="16" font-weight="700" ' + MONO + ' style="fill:' + (ok ? "#fff" : "var(--bad)") + '">' + n + "</text>";
    }).join("") + '<text x="14" y="78" font-size="12" ' + MONO + ' style="fill:var(--text)">range(5)</text><text x="326" y="78" text-anchor="end" font-size="11" ' + TXT + ' style="fill:var(--bad)">5 už nie</text></svg>';

  var L1 = { id: "python-4-1", nazov: "for a range()", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Opakovanie bez kopírovania",
      text: "<p>Cyklus <code>for</code> zopakuje odsadený blok pre každú hodnotu. Funkcia <code>range(n)</code> dá čísla od 0 po n-1:</p>" + UKAZ('for i in range(3):\n    print("Ahoj", i)', "Ahoj 0\nAhoj 1\nAhoj 2"), obr: OBR_RANGE,
      podrobne: "<p>Premenná <code>i</code> dostane postupne hodnoty 0, 1, 2. Pomenovať ju môžeš ľubovoľne, <code>i</code> je len zvyk (index).</p>" },
    { typ: "vyklad", nadpis: "range so začiatkom a krokom",
      text: P.tabulka(["Zápis", "Čísla"], [["<code>range(5)</code>", "0 1 2 3 4"], ["<code>range(1, 6)</code>", "1 2 3 4 5"], ["<code>range(0, 10, 2)</code>", "0 2 4 6 8"], ["<code>range(5, 0, -1)</code>", "5 4 3 2 1"]]),
      podrobne: "<p>Koniec sa nikdy nezapočíta. Keď chceš čísla 1 až 10, píš <code>range(1, 11)</code>.</p>" },
    { typ: "volba", otazka: "Koľkokrát sa vypíše Ahoj?", kod: 'for i in range(4):\n    print("Ahoj")', moznosti: ["4", "3", "5", "0"], spravna: 0, vysvetlenie: "range(4) = 0, 1, 2, 3." },
    { typ: "volba", otazka: "Ktoré čísla dá <code>range(2, 8, 3)</code>?", moznosti: ["2 5", "2 5 8", "2 3 4 5 6 7", "3 6"], spravna: 0, vysvetlenie: "Od 2 s krokom 3, 8 sa nezapočíta." },
    { typ: "kod", zadanie: "Vypíš malú násobilku čísla 7: riadky <b>7 x 1 = 7</b> až <b>7 x 10 = 70</b>.",
      karty: ["py"], start: { py: "" }, vyska: "130px",
      napoveda: 'for i in range(1, 11):\n    print("7 x", i, "=", 7 * i)', riesenie: { py: 'for i in range(1, 11):\n    print(f"7 x {i} = {7 * i}")' },
      kontrola: function (v, kod) {
        if (!/for\s/.test(kod)) return "Použi cyklus for.";
        var l = r(v); if (l.length !== 10) return "Má byť 10 riadkov (teraz " + l.length + ").";
        for (var i = 1; i <= 10; i++) if (l[i - 1] !== "7 x " + i + " = " + 7 * i) return "Riadok " + i + " má byť: 7 x " + i + " = " + 7 * i;
        return null;
      },
      vysvetlenie: "Desať riadkov, dva riadky kódu." },
  ] };

  var L2 = { id: "python-4-2", nazov: "Súčty v cykle", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Premenná, ktorá zbiera",
      text: "<p>Častý vzor: pred cyklom vytvor premennú s nulou a v cykle k nej pripočítavaj:</p>" + UKAZ("sucet = 0\nfor i in range(1, 6):\n    sucet = sucet + i\nprint(sucet)", "15"),
      podrobne: "<p>Postup: 0+1=1, 1+2=3, 3+3=6, 6+4=10, 10+5=15. Rovnako sa počítajú počty (<code>pocet += 1</code>), súčiny (začni od 1) alebo sa skladá text (začni od <code>\"\"</code>).</p>" },
    { typ: "vyklad", nadpis: "Cyklus cez text",
      text: "<p><code>for</code> vie prechádzať aj znaky textu:</p>" + UKAZ('slovo = "banán"\npocet = 0\nfor znak in slovo:\n    if znak == "a" or znak == "á":\n        pocet += 1\nprint("Počet a:", pocet)', "Počet a: 2") },
    { typ: "volba", otazka: "Čo vypíše program?", kod: "s = 0\nfor i in range(4):\n    s += i\nprint(s)", moznosti: ["6", "10", "4", "3"], spravna: 0, vysvetlenie: "0 + 1 + 2 + 3 = 6." },
    { typ: "volba", otazka: "Prečo je <code>sucet = 0</code> pred cyklom a nie v ňom?", moznosti: ["V cykle by sa v každom kroku vynuloval", "Python to tak vyžaduje", "Je to jedno", "Kvôli rýchlosti"], spravna: 0, vysvetlenie: "Vo vnútri by sa súčet stále začínal odznova." },
    { typ: "kod", zadanie: "Program načíta číslo n (vstup: <b>5</b>) a vypíše súčin čísel 1 až n (faktoriál), teda pre 5: <b>120</b>.",
      karty: ["py"], vstup: "5", start: { py: "n = int(input())\n" }, vyska: "160px",
      napoveda: "vysledok = 1, potom for i in range(1, n + 1): vysledok *= i", riesenie: { py: "n = int(input())\nvysledok = 1\nfor i in range(1, n + 1):\n    vysledok *= i\nprint(vysledok)" },
      kontrola: function (v, kod) {
        if (r(v).pop() !== "120") return "Pre 5 má vyjsť 120.";
        return r(beh(kod, ["7"]).vystup).pop() === "5040" ? null : "Pre 7 má vyjsť 5040. Skontroluj range (koniec sa nezapočíta).";
      },
      vysvetlenie: "Súčin začína od 1, nie od 0." },
  ] };

  var L3 = { id: "python-4-3", nazov: "while", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kým platí podmienka",
      text: "<p><code>while</code> opakuje blok, <b>kým podmienka platí</b>. Hodí sa, keď vopred nevieš, koľko opakovaní bude:</p>" + UKAZ('peniaze = 100\nroky = 0\nwhile peniaze < 200:\n    peniaze = peniaze * 1.1\n    roky += 1\nprint("Zdvojnásobia sa za", roky, "rokov")', "Zdvojnásobia sa za 8 rokov"),
      podrobne: "<p>Pozor na <b>nekonečný cyklus</b>: ak sa v bloku nič nezmení, podmienka platí stále a program sa nikdy neskončí. Táto aplikácia ho po chvíli zastaví a povie ti to.</p>" },
    { typ: "vyklad", nadpis: "Opakuj, kým nie je dobre",
      text: UKAZ('heslo = ""\nwhile heslo != "python":\n    heslo = input("Heslo: ")\nprint("Vitaj!")', "Heslo: java\nHeslo: python\nVitaj!") + "<p>Program sa pýta, kým nedostane správnu odpoveď.</p>" },
    { typ: "volba", otazka: "Čo je zle?", kod: "i = 0\nwhile i < 5:\n    print(i)", moznosti: ["i sa nezvyšuje, cyklus je nekonečný", "Chýba range", "while sa píše veľkým", "Nič"], spravna: 0, vysvetlenie: "Chýba i += 1." },
    { typ: "volba", otazka: "Kedy je lepší <code>while</code> ako <code>for</code>?", moznosti: ["Keď vopred nevieš počet opakovaní", "Keď chceš 10 opakovaní", "Pri prechode textom", "Nikdy"], spravna: 0, vysvetlenie: "for = známy počet, while = kým platí podmienka." },
    { typ: "kod", zadanie: "Odpočítavanie: program načíta číslo (vstup: <b>5</b>) a cyklom <code>while</code> vypíše čísla od neho po 1, každé na nový riadok, a nakoniec <b>Štart!</b>.",
      karty: ["py"], vstup: "5", start: { py: "n = int(input())\n" }, vyska: "170px",
      napoveda: "while n > 0:\n    print(n)\n    n -= 1\nprint(\"Štart!\")", riesenie: { py: 'n = int(input())\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("Štart!")' },
      kontrola: function (v, kod) {
        if (!/while\s/.test(kod)) return "Použi cyklus while.";
        var l = r(v).filter(function (x) { return x !== "5" || true; }), ocak = ["5", "5", "4", "3", "2", "1", "Štart!"];
        if (l.join("|") !== ocak.join("|")) return "Výstup má byť 5, 4, 3, 2, 1, Štart! (každé na novom riadku).";
        return r(beh(kod, ["2"]).vystup).join("|") === "2|2|1|Štart!" ? null : "Pre vstup 2 má vypísať 2, 1, Štart!";
      },
      vysvetlenie: "Nezabudol si zmenšovať n." },
  ] };

  var L4 = { id: "python-4-4", nazov: "break a continue", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Predčasný koniec a preskočenie",
      text: "<ul><li><code>break</code> okamžite ukončí celý cyklus.</li><li><code>continue</code> preskočí zvyšok tohto kroku a ide na ďalší.</li></ul>" + UKAZ('for i in range(1, 10):\n    if i == 3:\n        continue\n    if i == 6:\n        break\n    print(i)', "1\n2\n4\n5"),
      podrobne: "<p>Častý vzor je <code>while True:</code> s <code>break</code> vo vnútri: cyklus beží, kým ho niečo zvnútra neukončí.</p>" },
    { typ: "vyklad", nadpis: "Hľadanie",
      text: UKAZ('for n in range(2, 100):\n    if n % 7 == 0 and n % 5 == 0:\n        print("Prvé číslo deliteľné 5 aj 7:", n)\n        break', "Prvé číslo deliteľné 5 aj 7: 35") + "<p>Keď nájdeme, čo hľadáme, nemá zmysel pokračovať.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: "for i in range(5):\n    if i == 2:\n        break\n    print(i)", moznosti: ["0 1", "0 1 2", "0 1 3 4", "2"], spravna: 0, vysvetlenie: "Pri 2 cyklus končí, 2 sa už nevypíše." },
    { typ: "volba", otazka: "Čo spraví <code>continue</code>?", moznosti: ["Preskočí zvyšok kroku a pokračuje ďalším", "Ukončí cyklus", "Ukončí program", "Zopakuje ten istý krok"], spravna: 0, vysvetlenie: "Skok na ďalšie opakovanie." },
    { typ: "kod", zadanie: "Program číta čísla (vstupy sú pripravené) a sčítava ich, kým nepríde <b>0</b>. Potom vypíše <b>Súčet: X</b>. Pre pripravené vstupy 4, 10, 6, 0 vyjde <b>Súčet: 20</b>.",
      karty: ["py"], vstup: "4\n10\n6\n0", start: { py: "sucet = 0\n" }, vyska: "190px",
      napoveda: "while True:\n    x = int(input())\n    if x == 0:\n        break\n    sucet += x", riesenie: { py: 'sucet = 0\nwhile True:\n    x = int(input())\n    if x == 0:\n        break\n    sucet += x\nprint(f"Súčet: {sucet}")' },
      kontrola: function (v, kod) {
        if (r(v).pop() !== "Súčet: 20") return "Pre vstupy 4, 10, 6, 0 má vyjsť Súčet: 20.";
        return r(beh(kod, ["1", "2", "3", "0", "100"]).vystup).pop() === "Súčet: 6" ? null : "Program musí skončiť pri prvej nule (pre 1, 2, 3, 0, 100 má vyjsť Súčet: 6).";
      },
      vysvetlenie: "while True + break." },
  ] };

  var L5 = { id: "python-4-5", nazov: "Vnorené cykly", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Cyklus v cykle",
      text: "<p>Vnútorný cyklus prebehne celý pri každom kroku vonkajšieho. Tak vznikajú tabuľky a obrazce:</p>" + UKAZ('for riadok in range(1, 4):\n    for stlpec in range(1, 4):\n        print(riadok * stlpec, end=" ")\n    print()', "1 2 3 \n2 4 6 \n3 6 9 "),
      podrobne: "<p><code>print(…, end=\" \")</code> nevypíše na konci nový riadok, ale medzeru. Prázdne <code>print()</code> potom ukončí riadok.</p>" },
    { typ: "vyklad", nadpis: "Obrazce z textu",
      text: "<p>Text sa dá násobiť: <code>\"*\" * 3</code> je <code>\"***\"</code>. Preto trojuholník zvládne aj jeden cyklus:</p>" + UKAZ('for i in range(1, 5):\n    print("*" * i)', "*\n**\n***\n****") },
    { typ: "volba", otazka: "Koľkokrát sa vypíše X?", kod: 'for a in range(3):\n    for b in range(4):\n        print("X")', moznosti: ["12", "7", "3", "4"], spravna: 0, vysvetlenie: "3 × 4 = 12." },
    { typ: "kod", zadanie: "Program načíta výšku (vstup: <b>4</b>) a nakreslí štvorec z <code>#</code>: 4 riadky po 4 znaky <b>####</b>. Použi cyklus.",
      karty: ["py"], vstup: "4", start: { py: "n = int(input())\n" }, vyska: "150px",
      napoveda: 'for i in range(n):\n    print("#" * n)', riesenie: { py: 'n = int(input())\nfor i in range(n):\n    print("#" * n)' },
      kontrola: function (v, kod) {
        if (!/for\s|while\s/.test(kod)) return "Použi cyklus.";
        var l = r(v).slice(1); if (l.join("|") !== "####|####|####|####") return "Má byť 4 riadky ####.";
        return r(beh(kod, ["2"]).vystup).slice(1).join("|") === "##|##" ? null : "Pre vstup 2 má vyjsť štvorec 2 × 2.";
      },
      vysvetlenie: "Skús nakresliť aj trojuholník." },
    { typ: "kod", zadanie: "Nakresli schody z čísel pre vstup <b>4</b>: <br><code>1</code><br><code>12</code><br><code>123</code><br><code>1234</code><br>Použi dva vnorené cykly a <code>end=\"\"</code>.",
      karty: ["py"], vstup: "4", start: { py: "n = int(input())\n" }, vyska: "190px",
      napoveda: "for i in range(1, n + 1):\n    for j in range(1, i + 1):\n        print(j, end=\"\")\n    print()", riesenie: { py: 'n = int(input())\nfor i in range(1, n + 1):\n    for j in range(1, i + 1):\n        print(j, end="")\n    print()' },
      kontrola: function (v, kod) {
        if ((kod.match(/for\s/g) || []).length < 2) return "Použi dva vnorené cykly for.";
        return r(v).slice(1).join("|") === "1|12|123|1234" ? null : "Výstup má byť 1, 12, 123, 1234 (každé na novom riadku).";
      },
      vysvetlenie: "Vnútorný cyklus ide po aktuálny riadok." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li><code>for i in range(…)</code> a range so začiatkom a krokom.</li><li>Súčty a počítadlá v cykle.</li><li><code>for znak in text</code>.</li><li><code>while</code> a nekonečný cyklus.</li><li><code>break</code>, <code>continue</code>, <code>while True</code>.</li><li>Vnorené cykly a <code>end=\"\"</code>.</li></ul>", tip: "Ďalej funkcie: vlastné príkazy, ktoré si raz napíšeš a potom používaš." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "python-4-1", otazka: "Aké čísla dá <code>range(3)</code>?", moznosti: ["0 1 2", "1 2 3", "0 1 2 3", "3"], spravna: 0, vysvetlenie: "Od 0, bez konca." },
    { typ: "volba", lekcia: "python-4-1", otazka: "Ako získaš čísla 1 až 10?", moznosti: ["<code>range(1, 11)</code>", "<code>range(1, 10)</code>", "<code>range(10)</code>", "<code>range(0, 10)</code>"], spravna: 0, vysvetlenie: "Koniec sa nezapočíta." },
    { typ: "volba", lekcia: "python-4-2", otazka: "Čo vypíše program?", kod: 'v = ""\nfor z in "abc":\n    v = z + v\nprint(v)', moznosti: ["cba", "abc", "a", "chybu"], spravna: 0, vysvetlenie: "Každý znak sa pridá na začiatok." },
    { typ: "volba", lekcia: "python-4-3", otazka: "Kedy sa cyklus <code>while x &lt; 10:</code> skončí?", moznosti: ["Keď x bude 10 alebo viac", "Po 10 opakovaniach", "Nikdy", "Hneď"], spravna: 0, vysvetlenie: "Keď podmienka prestane platiť." },
    { typ: "volba", lekcia: "python-4-3", otazka: "Čo spôsobí nekonečný cyklus?", moznosti: ["Podmienka nikdy neprestane platiť", "Príliš veľké číslo", "Chýbajúca dvojbodka", "print v cykle"], spravna: 0, vysvetlenie: "Napr. zabudnuté i += 1." },
    { typ: "volba", lekcia: "python-4-4", otazka: "Ktorý príkaz okamžite ukončí cyklus?", moznosti: ["<code>break</code>", "<code>continue</code>", "<code>stop</code>", "<code>exit</code>"], spravna: 0, vysvetlenie: "break." },
    { typ: "volba", lekcia: "python-4-5", otazka: "Čo vypíše <code>print(\"ab\" * 3)</code>?", moznosti: ["ababab", "ab3", "ab ab ab", "chybu"], spravna: 0, vysvetlenie: "Text sa zopakuje 3-krát." },
    { typ: "doplnenie", lekcia: "python-4-1", otazka: "Vypíš párne čísla 0 až 8:", sablona: "for i [[0]] range(0, 10, [[1]]):\n    print(i)", zetony: ["in", "2", "of", "1", "10"], spravne: ["in", "2"], vysvetlenie: "range s krokom 2." },
  ];

  K.registrujModul("python", { cislo: 4, nazov: "Cykly", popis: "for, range, súčty v cykle, while, break, continue a vnorené cykly.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("python", [
    { kat: "Cykly", znak: "for … in …", nazov: "Cyklus for", popis: "Pre každú hodnotu (číslo, znak, prvok) vykoná blok.", priklad: "for i in range(3):\n    print(i)" },
    { kat: "Cykly", znak: "range(a, b, k)", nazov: "Rad čísel", popis: "Od a po b-1 s krokom k." },
    { kat: "Cykly", znak: "while", nazov: "Cyklus while", popis: "Opakuje, kým podmienka platí." },
    { kat: "Cykly", znak: "break / continue", nazov: "Riadenie cyklu", popis: "Ukonči cyklus / preskoč na ďalší krok." },
    { kat: "Cykly", znak: "end=\"\"", nazov: "Bez nového riadku", popis: "print(x, end=\"\") nepridá na koniec nový riadok." },
  ]);
})();
