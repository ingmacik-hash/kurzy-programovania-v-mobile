/* Python · Modul 5 · Funkcie */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "py", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  /* Spustí kód žiaka a za ním testovací kód; vráti riadky výstupu testu */
  function test(kod, doplnok) { var x = K.spustiPythonHned(kod + "\n" + doplnok); return { riadky: r(x.vystup), chyba: x.chyba }; }

  var OBR_FUNKCIA = '<svg viewBox="0 0 340 110" role="img" aria-label="Funkcia dostane vstupy (argumenty), spracuje ich a vráti výsledok">' +
    '<rect x="8" y="36" width="70" height="38" rx="8" style="fill:var(--surface-2);stroke:var(--muted);stroke-width:1.5"/><text x="43" y="60" text-anchor="middle" font-size="13" ' + MONO + ' style="fill:var(--hl-num)">3, 4</text>' +
    '<path d="M80 55h32" style="stroke:var(--muted);stroke-width:2"/><path d="M108 49l8 6-8 6" style="fill:var(--muted)"/>' +
    '<rect x="120" y="22" width="110" height="66" rx="14" style="fill:#3572a5"/><text x="175" y="50" text-anchor="middle" font-size="13" font-weight="700" ' + MONO + ' fill="#fff">obsah(a, b)</text><text x="175" y="70" text-anchor="middle" font-size="11.5" ' + MONO + ' fill="#dfe8ff">return a * b</text>' +
    '<path d="M232 55h32" style="stroke:var(--muted);stroke-width:2"/><path d="M260 49l8 6-8 6" style="fill:var(--muted)"/>' +
    '<rect x="270" y="36" width="62" height="38" rx="8" style="fill:var(--surface-2);stroke:var(--ok);stroke-width:2"/><text x="301" y="60" text-anchor="middle" font-size="14" font-weight="700" ' + MONO + ' style="fill:var(--ok)">12</text>' +
    '<text x="43" y="98" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">argumenty</text><text x="301" y="98" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">výsledok</text></svg>';

  var L1 = { id: "python-5-1", nazov: "def: vlastná funkcia", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Pomenovaný kus kódu",
      text: "<p>Funkciu vytvoríš slovom <code>def</code>, menom, zátvorkami a dvojbodkou. Odsadený blok sa vykoná až vtedy, keď funkciu <b>zavoláš</b>:</p>" + UKAZ('def pozdrav():\n    print("Ahoj!")\n    print("Vitaj v Pythone.")\n\npozdrav()\npozdrav()', "Ahoj!\nVitaj v Pythone.\nAhoj!\nVitaj v Pythone."),
      podrobne: "<p>Funkcie šetria opakovanie a robia program čitateľnejším: namiesto 20 riadkov vidíš <code>vypis_menu()</code>. Funkcia musí byť definovaná <b>skôr</b>, ako ju zavoláš.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: 'def a():\n    print("A")\n\nprint("B")', moznosti: ["B", "A B", "A", "nič"], spravna: 0, vysvetlenie: "Funkcia a nebola zavolaná." },
    { typ: "volba", otazka: "Ako zavoláš funkciu <code>menu</code>?", moznosti: ["<code>menu()</code>", "<code>menu</code>", "<code>def menu()</code>", "<code>call menu</code>"], spravna: 0, vysvetlenie: "Meno a zátvorky." },
    { typ: "poradie", otazka: "Zoraď program:", riadky: ["def ciara():", '    print("----------")', "", "ciara()", 'print("Nadpis")', "ciara()"], vysvetlenie: "Najprv definícia, potom volania." },
    { typ: "kod", zadanie: "Vytvor funkciu <code>hviezdy()</code>, ktorá vypíše <b>*****</b>. Zavolaj ju trikrát.",
      karty: ["py"], start: { py: "" }, vyska: "150px",
      napoveda: 'def hviezdy():\n    print("*****")\n\nhviezdy()\nhviezdy()\nhviezdy()', riesenie: { py: 'def hviezdy():\n    print("*****")\n\nhviezdy()\nhviezdy()\nhviezdy()' },
      kontrola: function (v, kod) { if (!/def\s+hviezdy\s*\(\s*\)\s*:/.test(kod)) return "Vytvor funkciu def hviezdy():"; return r(v).join("|") === "*****|*****|*****" ? null : "Výstup majú byť 3 riadky *****."; },
      vysvetlenie: "Raz napísané, trikrát použité." },
  ] };

  var L2 = { id: "python-5-2", nazov: "Parametre", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Funkcia so vstupom",
      text: "<p>Do zátvoriek napíš <b>parametre</b>: premenné, do ktorých sa pri volaní dosadia hodnoty (<b>argumenty</b>):</p>" + UKAZ('def pozdrav(meno, vek):\n    print(f"Ahoj {meno}, máš {vek} rokov.")\n\npozdrav("Jana", 15)\npozdrav("Peter", 40)', "Ahoj Jana, máš 15 rokov.\nAhoj Peter, máš 40 rokov."),
      podrobne: "<p>Argumenty sa priraďujú podľa poradia. Môžeš ich aj pomenovať: <code>pozdrav(vek=15, meno=\"Jana\")</code>, vtedy na poradí nezáleží.</p>" },
    { typ: "volba", otazka: "Čo sa stane pri <code>pozdrav(\"Jana\")</code>, keď funkcia čaká dva parametre?", moznosti: ["Chyba: chýba argument", "vek bude 0", "vek bude None", "Vypíše len meno"], spravna: 0, vysvetlenie: "TypeError: missing 1 required positional argument." },
    { typ: "kod", zadanie: "Vytvor funkciu <code>obdlznik(sirka, vyska)</code>, ktorá nakreslí obdĺžnik z <code>#</code>. Zavolaj ju <code>obdlznik(5, 2)</code>.",
      karty: ["py"], start: { py: "" }, vyska: "160px",
      napoveda: 'def obdlznik(sirka, vyska):\n    for i in range(vyska):\n        print("#" * sirka)', riesenie: { py: 'def obdlznik(sirka, vyska):\n    for i in range(vyska):\n        print("#" * sirka)\n\nobdlznik(5, 2)' },
      kontrola: function (v, kod) {
        if (!/def\s+obdlznik\s*\(\s*\w+\s*,\s*\w+\s*\)/.test(kod)) return "Vytvor funkciu obdlznik s dvoma parametrami.";
        if (r(v).join("|") !== "#####|#####") return "obdlznik(5, 2) má nakresliť 2 riadky po 5 znakov.";
        var t = test(kod.replace(/^obdlznik\(.*\)\s*$/gm, ""), "obdlznik(3, 3)");
        return t.riadky.join("|") === "###|###|###" ? null : "obdlznik(3, 3) má nakresliť štvorec 3 × 3.";
      },
      vysvetlenie: "Jedna funkcia, rôzne veľkosti." },
  ] };

  var L3 = { id: "python-5-3", nazov: "return", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Funkcia, ktorá vráti výsledok",
      text: "<p><code>return</code> vráti hodnotu tomu, kto funkciu zavolal. S výsledkom potom môžeš ďalej počítať:</p>" + UKAZ("def obsah(a, b):\n    return a * b\n\nx = obsah(3, 4)\nprint(x)\nprint(obsah(2, 5) + obsah(1, 1))", "12\n11"), obr: OBR_FUNKCIA,
      podrobne: "<p><code>print</code> výsledok len ukáže na obrazovke. <code>return</code> ho odovzdá programu. Funkcia bez return vráti <code>None</code>. Return zároveň funkciu okamžite ukončí.</p>" },
    { typ: "vyklad", nadpis: "Return v podmienke",
      text: UKAZ('def znamka(body):\n    if body >= 90:\n        return 1\n    if body >= 75:\n        return 2\n    if body >= 50:\n        return 3\n    return 5\n\nprint(znamka(95), znamka(60), znamka(10))', "1 3 5"),
      podrobne: "<p>Keďže return funkciu ukončí, nepotrebujeme tu ani elif. Prvý splnený return vyhráva.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: "def f(x):\n    print(x * 2)\n\ny = f(5)\nprint(y)", moznosti: ["10 a potom None", "10 a 10", "None", "chybu"], spravna: 0, vysvetlenie: "f vypíše 10, ale nič nevráti, takže y je None." },
    { typ: "volba", otazka: "Čo spraví riadok za <code>return</code> v tom istom bloku?", moznosti: ["Nikdy sa nevykoná", "Vykoná sa po return", "Spôsobí chybu", "Vykoná sa dvakrát"], spravna: 0, vysvetlenie: "return funkciu ukončí." },
    { typ: "kod", zadanie: "Vytvor funkciu <code>je_parne(n)</code>, ktorá <b>vráti</b> True pre párne číslo a False pre nepárne. Vyskúšaj <code>print(je_parne(4))</code>.",
      karty: ["py"], start: { py: "" }, vyska: "150px",
      napoveda: "def je_parne(n):\n    return n % 2 == 0", riesenie: { py: "def je_parne(n):\n    return n % 2 == 0\n\nprint(je_parne(4))" },
      kontrola: function (v, kod) {
        if (!/return/.test(kod)) return "Funkcia má výsledok vrátiť cez return, nie vypísať.";
        var t = test(kod, "print('T', je_parne(10), je_parne(7), je_parne(0))");
        if (t.chyba) return "Funkcia je_parne skončila chybou.";
        return t.riadky.pop() === "T True False True" ? null : "je_parne(10), je_parne(7), je_parne(0) majú vrátiť True, False, True.";
      },
      vysvetlenie: "Porovnanie samo vracia True/False, if netreba." },
    { typ: "kod", zadanie: "Vytvor funkciu <code>maximum(a, b, c)</code>, ktorá vráti najväčšie z troch čísel. <b>Nepoužívaj</b> zabudovanú funkciu max.",
      karty: ["py"], start: { py: "def maximum(a, b, c):\n    \n\nprint(maximum(3, 9, 5))" }, vyska: "190px",
      napoveda: "najv = a, potom if b > najv: najv = b, if c > najv: najv = c, return najv", riesenie: { py: "def maximum(a, b, c):\n    najv = a\n    if b > najv:\n        najv = b\n    if c > najv:\n        najv = c\n    return najv\n\nprint(maximum(3, 9, 5))" },
      kontrola: function (v, kod) {
        if (/\bmax\s*\(/.test(kod)) return "Skús to bez funkcie max, pomocou podmienok.";
        var t = test(kod, "print('T', maximum(1, 2, 3), maximum(9, 2, 3), maximum(1, 8, 3), maximum(-5, -2, -9))");
        if (t.chyba) return "Funkcia skončila chybou: " + K.prelozPyChybu(t.chyba.typ, t.chyba.sprava);
        return t.riadky.pop() === "T 3 9 8 -2" ? null : "Funkcia nevracia vždy najväčšie číslo (vyskúšal som aj záporné).";
      },
      vysvetlenie: "Postupne porovnávaš s doterajším najväčším." },
  ] };

  var L4 = { id: "python-5-4", nazov: "Predvolené hodnoty", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Nepovinné parametre",
      text: "<p>Parameter môže mať <b>predvolenú hodnotu</b>. Keď ho pri volaní vynecháš, použije sa:</p>" + UKAZ('def cena_s_dph(cena, dph=20):\n    return round(cena * (1 + dph / 100), 2)\n\nprint(cena_s_dph(100))\nprint(cena_s_dph(100, 10))', "120.0\n110.0"),
      podrobne: "<p>Parametre s predvolenou hodnotou musia byť <b>za</b> povinnými. Takto funguje aj <code>print</code>: <code>sep=\" \"</code> a <code>end=\"\\n\"</code> sú jeho predvolené parametre.</p>" },
    { typ: "vyklad", nadpis: "Viac výsledkov naraz",
      text: "<p>Funkcia môže vrátiť viac hodnôt oddelených čiarkou a ty ich hneď rozbalíš do premenných:</p>" + UKAZ("def deleni(a, b):\n    return a // b, a % b\n\npodiel, zvysok = deleni(17, 5)\nprint(podiel, zvysok)", "3 2") },
    { typ: "volba", otazka: "Čo vráti <code>mocnina(3)</code>?", kod: "def mocnina(x, n=2):\n    return x ** n", moznosti: ["9", "27", "3", "chybu"], spravna: 0, vysvetlenie: "n je predvolene 2, 3² = 9." },
    { typ: "volba", otazka: "Ktorá hlavička je zle?", moznosti: ["<code>def f(a=1, b):</code>", "<code>def f(a, b=1):</code>", "<code>def f(a=1, b=2):</code>", "<code>def f(a, b):</code>"], spravna: 0, vysvetlenie: "Povinný parameter nemôže byť za nepovinným." },
    { typ: "kod", zadanie: "Vytvor funkciu <code>pozdrav(meno, jazyk=\"sk\")</code>, ktorá <b>vráti</b> <code>\"Ahoj, Jana!\"</code> pre jazyk \"sk\" a <code>\"Hello, Jana!\"</code> pre \"en\".",
      karty: ["py"], start: { py: "" }, vyska: "190px",
      napoveda: 'def pozdrav(meno, jazyk="sk"):\n    if jazyk == "en":\n        return f"Hello, {meno}!"\n    return f"Ahoj, {meno}!"', riesenie: { py: 'def pozdrav(meno, jazyk="sk"):\n    if jazyk == "en":\n        return f"Hello, {meno}!"\n    return f"Ahoj, {meno}!"\n\nprint(pozdrav("Jana"))\nprint(pozdrav("Tom", "en"))' },
      kontrola: function (v, kod) {
        var t = test(kod, "print('T|' + pozdrav('Jana') + '|' + pozdrav('Tom', 'en') + '|' + pozdrav('Eva', jazyk='sk'))");
        if (t.chyba) return "Volanie pozdrav skončilo chybou: " + K.prelozPyChybu(t.chyba.typ, t.chyba.sprava);
        return t.riadky.pop() === "T|Ahoj, Jana!|Hello, Tom!|Ahoj, Eva!" ? null : "pozdrav(\"Jana\") má vrátiť Ahoj, Jana! a pozdrav(\"Tom\", \"en\") Hello, Tom!";
      },
      vysvetlenie: "Predvolená hodnota šetrí písanie." },
  ] };

  var L5 = { id: "python-5-5", nazov: "Funkcie v praxi", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Lokálne premenné",
      text: "<p>Premenné vytvorené vo funkcii existujú <b>len v nej</b>. Zvonka ich nevidno:</p>" + UKAZ('def vypocet():\n    vysledok = 42\n    return vysledok\n\nprint(vypocet())\nprint(vysledok)', "42\nNameError: name 'vysledok' is not defined"),
      podrobne: "<p>Vďaka tomu môžu mať rôzne funkcie premenné s rovnakým menom a navzájom si neprekážajú. Údaje do funkcie posielaj cez parametre a von cez return.</p>" },
    { typ: "vyklad", nadpis: "Funkcie volajú funkcie",
      text: "<p>Veľký problém rozdeľ na malé funkcie. Každá robí jednu vec a dá sa samostatne otestovať:</p>" + UKAZ('def je_delitelne(n, d):\n    return n % d == 0\n\ndef je_prvocislo(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if je_delitelne(n, d):\n            return False\n    return True\n\nfor n in range(1, 20):\n    if je_prvocislo(n):\n        print(n, end=" ")', "2 3 5 7 11 13 17 19 ") },
    { typ: "volba", otazka: "Prečo program skončí chybou na poslednom riadku?", kod: "def f():\n    x = 5\n\nf()\nprint(x)", moznosti: ["x existuje len vo funkcii f", "f nič nevracia", "Chýba return", "x je 5, nie chyba"], spravna: 0, vysvetlenie: "Lokálna premenná." },
    { typ: "kod", zadanie: "Vytvor funkciu <code>pocet_samohlasok(text)</code>, ktorá vráti počet samohlások (a, e, i, o, u, y, aj s dĺžňom á é í ó ú ý) v texte. Malé aj veľké písmená.",
      karty: ["py"], start: { py: 'def pocet_samohlasok(text):\n    \n\nprint(pocet_samohlasok("Ahoj svet"))' }, vyska: "200px",
      napoveda: 'pocet = 0\nfor z in text.lower():\n    if z in "aeiouyáéíóúý":\n        pocet += 1\nreturn pocet', riesenie: { py: 'def pocet_samohlasok(text):\n    pocet = 0\n    for z in text.lower():\n        if z in "aeiouyáéíóúý":\n            pocet += 1\n    return pocet\n\nprint(pocet_samohlasok("Ahoj svet"))' },
      kontrola: function (v, kod) {
        var t = test(kod, "print('T', pocet_samohlasok('Ahoj svet'), pocet_samohlasok('PYTHON'), pocet_samohlasok('Dobrý deň, áno'), pocet_samohlasok('xyz'[0:2]))");
        if (t.chyba) return "Funkcia skončila chybou: " + K.prelozPyChybu(t.chyba.typ, t.chyba.sprava);
        return t.riadky.pop() === "T 3 2 5 1" ? null : "Funkcia nepočíta správne. Mysli na veľké písmená (lower()) a dĺžne.";
      },
      vysvetlenie: "Funkcia s cyklom a podmienkou." },
    { typ: "vyklad", nadpis: "Modul 5 máš za sebou",
      text: "<ul><li><code>def meno(parametre):</code> a volanie <code>meno(argumenty)</code>.</li><li><code>return</code> vs. <code>print</code>.</li><li>Predvolené hodnoty parametrov.</li><li>Vrátenie viacerých hodnôt.</li><li>Lokálne premenné a skladanie funkcií.</li></ul>", tip: "Posledný modul: zoznamy a slovníky, s ktorými zvládneš skutočné programy." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "python-5-1", otazka: "Ktorým slovom začína definícia funkcie?", moznosti: ["<code>def</code>", "<code>function</code>", "<code>func</code>", "<code>fn</code>"], spravna: 0, vysvetlenie: "def." },
    { typ: "volba", lekcia: "python-5-2", otazka: "Ako sa volajú hodnoty, ktoré pošleš funkcii pri volaní?", moznosti: ["Argumenty", "Výsledky", "Bloky", "Moduly"], spravna: 0, vysvetlenie: "V definícii sú to parametre, pri volaní argumenty." },
    { typ: "volba", lekcia: "python-5-3", otazka: "Čo vráti funkcia bez <code>return</code>?", moznosti: ["None", "0", "False", "prázdny text"], spravna: 0, vysvetlenie: "None." },
    { typ: "volba", lekcia: "python-5-3", otazka: "Čo vypíše program?", kod: "def f(a, b):\n    return a + b\n    print(\"hotovo\")\n\nprint(f(2, 3))", moznosti: ["5", "hotovo a 5", "5 a hotovo", "chybu"], spravna: 0, vysvetlenie: "print za return sa nevykoná." },
    { typ: "volba", lekcia: "python-5-4", otazka: "Čo vypíše <code>print(f(2))</code>?", kod: "def f(x, k=10):\n    return x * k", moznosti: ["20", "2", "10", "chybu"], spravna: 0, vysvetlenie: "k = 10." },
    { typ: "volba", lekcia: "python-5-4", otazka: "Čo bude v premenných?", kod: "def f():\n    return 1, 2\n\na, b = f()", moznosti: ["a = 1, b = 2", "a = (1, 2), b = None", "chyba", "a = 2, b = 1"], spravna: 0, vysvetlenie: "Rozbalenie dvoch hodnôt." },
    { typ: "volba", lekcia: "python-5-5", otazka: "Kde existuje premenná vytvorená vo funkcii?", moznosti: ["Len vo vnútri funkcie", "V celom programe", "Až po skončení funkcie", "Nikde"], spravna: 0, vysvetlenie: "Lokálna premenná." },
    { typ: "doplnenie", lekcia: "python-5-3", otazka: "Doplň funkciu:", sablona: "[[0]] dvojnasobok(x):\n    [[1]] x * 2", zetony: ["def", "return", "print", "function", "give"], spravne: ["def", "return"], vysvetlenie: "def … return …" },
  ];

  K.registrujModul("python", { cislo: 5, nazov: "Funkcie", popis: "def, parametre, return, predvolené hodnoty a lokálne premenné.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("python", [
    { kat: "Funkcie", znak: "def", nazov: "Definícia funkcie", popis: "Vytvorí vlastnú funkciu.", priklad: "def obsah(a, b):\n    return a * b" },
    { kat: "Funkcie", znak: "return", nazov: "Vráť výsledok", popis: "Odovzdá hodnotu a ukončí funkciu." },
    { kat: "Funkcie", znak: "param=hodnota", nazov: "Predvolená hodnota", popis: "Parameter, ktorý môžeš vynechať." },
  ]);
})();
