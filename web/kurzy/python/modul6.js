/* Python · Modul 6 · Zoznamy a slovníky */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "py", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function test(kod, doplnok) { var x = K.spustiPythonHned(kod + "\n" + doplnok); return { riadky: r(x.vystup), chyba: x.chyba }; }

  var OBR_ZOZNAM = '<svg viewBox="0 0 340 100" role="img" aria-label="Zoznam má prvky s indexmi od 0; záporný index -1 je posledný prvok">' +
    ["jablko", "hruška", "slivka", "kiwi"].map(function (x, i) {
      var X = 10 + i * 82;
      return '<rect x="' + X + '" y="26" width="76" height="38" rx="8" style="fill:#3572a5"/><text x="' + (X + 38) + '" y="50" text-anchor="middle" font-size="12" font-weight="700" ' + MONO + ' fill="#fff">"' + x + '"</text>' +
        '<text x="' + (X + 38) + '" y="18" text-anchor="middle" font-size="12" ' + MONO + ' style="fill:var(--hl-num)">' + i + '</text><text x="' + (X + 38) + '" y="84" text-anchor="middle" font-size="11" ' + MONO + ' style="fill:var(--muted)">' + (i - 4) + "</text>";
    }).join("") + "</svg>";

  var L1 = { id: "python-6-1", nazov: "Zoznamy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Viac hodnôt v jednej premennej",
      text: "<p><b>Zoznam</b> (list) je usporiadaný rad hodnôt v hranatých zátvorkách. Prvky majú <b>indexy od 0</b>:</p>" + UKAZ('ovocie = ["jablko", "hruška", "slivka", "kiwi"]\nprint(ovocie[0])\nprint(ovocie[-1])\nprint(len(ovocie))\novocie[1] = "banán"\nprint(ovocie)', "jablko\nkiwi\n4\n['jablko', 'banán', 'slivka', 'kiwi']"), obr: OBR_ZOZNAM,
      podrobne: "<p>Zoznam môže obsahovať čokoľvek, aj čísla a texty naraz, aj ďalšie zoznamy. Na rozdiel od textu sa dá meniť: <code>ovocie[1] = \"banán\"</code>. Výrezy fungujú ako pri texte: <code>ovocie[1:3]</code>.</p>" },
    { typ: "volba", otazka: "Čo je <code>[10, 20, 30][1]</code>?", moznosti: ["20", "10", "30", "chyba"], spravna: 0, vysvetlenie: "Index 1 je druhý prvok." },
    { typ: "volba", otazka: "Čo spraví <code>znamky[5]</code>, keď má zoznam 5 prvkov?", moznosti: ["IndexError, posledný index je 4", "Vráti posledný prvok", "Vráti None", "Pridá prvok"], spravna: 0, vysvetlenie: "Indexy 0 až 4." },
    { typ: "kod", zadanie: "Vytvor zoznam <code>dni</code> s piatimi pracovnými dňami (pondelok až piatok). Vypíš prvý deň, posledný deň a počet dní, každé na nový riadok.",
      karty: ["py"], start: { py: "" }, vyska: "150px",
      napoveda: 'dni = ["pondelok", "utorok", "streda", "štvrtok", "piatok"]\nprint(dni[0])\nprint(dni[-1])\nprint(len(dni))', riesenie: { py: 'dni = ["pondelok", "utorok", "streda", "štvrtok", "piatok"]\nprint(dni[0])\nprint(dni[-1])\nprint(len(dni))' },
      kontrola: function (v, kod) { if (!/\[/.test(kod)) return "Vytvor zoznam v hranatých zátvorkách."; return r(v).join("|") === "pondelok|piatok|5" ? null : "Výstup má byť pondelok, piatok, 5."; },
      vysvetlenie: "dni[-1] je vždy posledný." },
  ] };

  var L2 = { id: "python-6-2", nazov: "Práca so zoznamom", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Metódy zoznamu",
      text: P.tabulka(["Zápis", "Čo spraví"], [["<code>z.append(x)</code>", "pridá x na koniec"], ["<code>z.insert(i, x)</code>", "vloží x na pozíciu i"], ["<code>z.remove(x)</code>", "odstráni prvý výskyt x"], ["<code>z.pop()</code>", "odstráni a vráti posledný"], ["<code>z.sort()</code>", "zoradí (zmení zoznam)"], ["<code>sorted(z)</code>", "vráti zoradenú kópiu"], ["<code>x in z</code>", "je x v zozname?"], ["<code>z.index(x)</code>", "pozícia x"]]),
      podrobne: "<p>Prázdny zoznam vytvoríš <code>[]</code> a postupne ho plníš cez append. To je najčastejší vzor.</p>" },
    { typ: "vyklad", nadpis: "Čísla v zozname",
      text: UKAZ("znamky = [1, 3, 2, 1, 4]\nprint(sum(znamky), min(znamky), max(znamky))\nprint(sum(znamky) / len(znamky))\nznamky.sort()\nprint(znamky)", "11 1 4\n2.2\n[1, 1, 2, 3, 4]"),
      podrobne: "<p><code>sum</code>, <code>min</code>, <code>max</code> a <code>len</code> sú zabudované funkcie. <code>z.sort(reverse=True)</code> zoradí zostupne.</p>" },
    { typ: "volba", otazka: "Čo bude v zozname?", kod: "z = [1, 2]\nz.append(3)\nz.insert(0, 0)", moznosti: ["[0, 1, 2, 3]", "[1, 2, 3, 0]", "[0, 2, 3]", "[3, 1, 2, 0]"], spravna: 0, vysvetlenie: "append na koniec, insert(0, …) na začiatok." },
    { typ: "kod", zadanie: "Program načíta 5 čísel (vstupy sú pripravené) do zoznamu cez <code>append</code>. Potom vypíše <b>Súčet: X</b>, <b>Priemer: X</b> (na 1 desatinné miesto) a <b>Najväčšie: X</b>.",
      karty: ["py"], vstup: "4\n8\n15\n16\n23", start: { py: "cisla = []\nfor i in range(5):\n    \n" }, vyska: "210px",
      napoveda: "cisla.append(int(input())) v cykle, potom sum, len, max. Priemer: f\"{sum(cisla) / len(cisla):.1f}\"", riesenie: { py: 'cisla = []\nfor i in range(5):\n    cisla.append(int(input()))\nprint(f"Súčet: {sum(cisla)}")\nprint(f"Priemer: {sum(cisla) / len(cisla):.1f}")\nprint(f"Najväčšie: {max(cisla)}")' },
      kontrola: function (v, kod) {
        if (!/append/.test(kod)) return "Pridávaj čísla do zoznamu cez append.";
        var l = r(v).slice(-3); if (l.join("|") !== "Súčet: 66|Priemer: 13.2|Najväčšie: 23") return "Očakávam Súčet: 66, Priemer: 13.2, Najväčšie: 23.";
        return r(K.spustiPythonHned(kod, ["1", "1", "1", "1", "2"]).vystup).slice(-3).join("|") === "Súčet: 6|Priemer: 1.2|Najväčšie: 2" ? null : "Pre iné vstupy výsledok nesedí.";
      },
      vysvetlenie: "Zoznam + zabudované funkcie." },
  ] };

  var L3 = { id: "python-6-3", nazov: "Cykly a zoznamy", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Prechod zoznamom",
      text: UKAZ('nakup = ["chlieb", "mlieko", "vajcia"]\nfor vec in nakup:\n    print("-", vec)\n\nfor i, vec in enumerate(nakup, 1):\n    print(i, vec)', "- chlieb\n- mlieko\n- vajcia\n1 chlieb\n2 mlieko\n3 vajcia"),
      podrobne: "<p><code>enumerate</code> dáva k prvku aj jeho poradie. Druhý argument určuje, od ktorého čísla sa počíta.</p>" },
    { typ: "vyklad", nadpis: "Filtrovanie a list comprehension",
      text: "<p>Nový zoznam z existujúceho môžeš vytvoriť cyklom, alebo kratšie <b>list comprehension</b>:</p>" + UKAZ("cisla = [3, 8, 1, 12, 7, 6]\nparne = []\nfor c in cisla:\n    if c % 2 == 0:\n        parne.append(c)\nprint(parne)\n\nprint([c for c in cisla if c % 2 == 0])\nprint([c * c for c in range(1, 6)])", "[8, 12, 6]\n[8, 12, 6]\n[1, 4, 9, 16, 25]"),
      podrobne: "<p>Zápis <code>[výraz for prvok in zoznam if podmienka]</code> čítaj: „výraz pre každý prvok zo zoznamu, ktorý spĺňa podmienku“.</p>" },
    { typ: "volba", otazka: "Čo je <code>[x * 2 for x in [1, 2, 3]]</code>?", moznosti: ["[2, 4, 6]", "[1, 2, 3, 1, 2, 3]", "[1, 4, 9]", "12"], spravna: 0, vysvetlenie: "Každý prvok krát 2." },
    { typ: "kod", zadanie: "Zo zoznamu <code>teploty</code> vytvor nový zoznam <code>teple</code> len s teplotami <b>nad 20</b> a vypíš ho. Potom vypíš, koľko takých dní bolo: <b>Teplých dní: X</b>.",
      karty: ["py"], start: { py: "teploty = [18, 22, 25, 19, 30, 21, 15]\n" }, vyska: "170px",
      napoveda: "teple = [t for t in teploty if t > 20]", riesenie: { py: 'teploty = [18, 22, 25, 19, 30, 21, 15]\nteple = [t for t in teploty if t > 20]\nprint(teple)\nprint(f"Teplých dní: {len(teple)}")' },
      kontrola: function (v, kod) { return r(v).join("|") === "[22, 25, 30, 21]|Teplých dní: 4" ? null : "Výstup má byť [22, 25, 30, 21] a Teplých dní: 4."; },
      vysvetlenie: "Filtrovanie jedným riadkom." },
  ] };

  var L4 = { id: "python-6-4", nazov: "Slovníky", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Kľúč → hodnota",
      text: "<p><b>Slovník</b> (dict) ukladá dvojice <b>kľúč: hodnota</b>. Namiesto indexu sa hodnota hľadá podľa kľúča:</p>" + UKAZ('ziak = {"meno": "Jana", "vek": 15, "trieda": "9.A"}\nprint(ziak["meno"])\nziak["vek"] = 16\nziak["mesto"] = "Nitra"\nprint(ziak)\nprint(len(ziak))', "Jana\n{'meno': 'Jana', 'vek': 16, 'trieda': '9.A', 'mesto': 'Nitra'}\n4"),
      podrobne: "<p>Kľúče sú jedinečné. Priradenie do existujúceho kľúča hodnotu prepíše, do nového ju pridá. Neexistujúci kľúč skončí chybou KeyError. Bezpečnejšie je <code>ziak.get(\"email\", \"nemá\")</code>, ktoré vráti náhradnú hodnotu.</p>" },
    { typ: "vyklad", nadpis: "Prechod slovníkom",
      text: UKAZ('ceny = {"chlieb": 1.2, "mlieko": 0.9, "syr": 2.5}\nfor tovar, cena in ceny.items():\n    print(f"{tovar}: {cena} €")\nprint("syr" in ceny)', "chlieb: 1.2 €\nmlieko: 0.9 €\nsyr: 2.5 €\nTrue"),
      podrobne: "<p><code>.keys()</code> dá kľúče, <code>.values()</code> hodnoty a <code>.items()</code> dvojice. <code>in</code> sa pýta na kľúče.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>print(d[\"b\"])</code> pre <code>d = {\"a\": 1, \"b\": 2}</code>?", moznosti: ["2", "1", "b", "chybu"], spravna: 0, vysvetlenie: "Hodnota kľúča b." },
    { typ: "volba", otazka: "Ako pridáš do slovníka <code>d</code> kľúč \"c\" s hodnotou 3?", moznosti: ["<code>d[\"c\"] = 3</code>", "<code>d.append(\"c\", 3)</code>", "<code>d.add(c=3)</code>", "<code>d + {\"c\": 3}</code>"], spravna: 0, vysvetlenie: "Priradenie do nového kľúča." },
    { typ: "kod", zadanie: "Máš slovník cien. Program načíta názov tovaru (vstup: <b>syr</b>) a vypíše <b>Cena: X €</b>. Ak tovar v slovníku nie je, vypíše <b>Nemáme</b>.",
      karty: ["py"], vstup: "syr", start: { py: 'ceny = {"chlieb": 1.2, "mlieko": 0.9, "syr": 2.5, "jablko": 0.4}\ntovar = input()\n' }, vyska: "190px",
      napoveda: 'if tovar in ceny:\n    print(f"Cena: {ceny[tovar]} €")\nelse:\n    print("Nemáme")', riesenie: { py: 'ceny = {"chlieb": 1.2, "mlieko": 0.9, "syr": 2.5, "jablko": 0.4}\ntovar = input()\nif tovar in ceny:\n    print(f"Cena: {ceny[tovar]} €")\nelse:\n    print("Nemáme")' },
      kontrola: function (v, kod) {
        if (r(v).pop() !== "Cena: 2.5 €") return "Pre syr má vypísať Cena: 2.5 €.";
        var x = K.spustiPythonHned(kod, ["banán"]); if (x.chyba) return "Pre tovar, ktorý nie je v slovníku, program spadol. Skontroluj ho cez in.";
        return r(x.vystup).pop() === "Nemáme" ? null : "Pre banán má vypísať Nemáme.";
      },
      vysvetlenie: "Najprv over kľúč cez in." },
  ] };

  var L5 = { id: "python-6-5", nazov: "Slovníky v praxi", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Počítanie výskytov",
      text: "<p>Klasická úloha: koľkokrát sa čo vyskytuje. Slovník je na to ideálny:</p>" + UKAZ('hlasy = ["Jana", "Peter", "Jana", "Eva", "Jana", "Eva"]\npocty = {}\nfor meno in hlasy:\n    pocty[meno] = pocty.get(meno, 0) + 1\nprint(pocty)\nvitaz = max(pocty, key=pocty.get)\nprint("Vyhral(a):", vitaz)', "{'Jana': 3, 'Peter': 1, 'Eva': 2}\nVyhral(a): Jana"),
      podrobne: "<p><code>pocty.get(meno, 0)</code> vráti doterajší počet, alebo 0, ak meno ešte nie je v slovníku. <code>max(pocty, key=pocty.get)</code> nájde kľúč s najväčšou hodnotou.</p>" },
    { typ: "vyklad", nadpis: "Zoznam slovníkov",
      text: "<p>Skutočné údaje často vyzerajú ako zoznam záznamov, kde každý záznam je slovník:</p>" + UKAZ('ziaci = [\n    {"meno": "Jana", "body": 87},\n    {"meno": "Peter", "body": 64},\n    {"meno": "Eva", "body": 92},\n]\nfor z in sorted(ziaci, key=lambda z: z["body"], reverse=True):\n    print(z["meno"], z["body"])', "Eva 92\nJana 87\nPeter 64"),
      podrobne: "<p><code>lambda z: z[\"body\"]</code> je krátka funkcia bez mena, ktorá povie, podľa čoho sa má triediť. Takto vyzerajú údaje z internetu vo formáte JSON.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>d.get(\"x\", 0)</code>, keď kľúč x v slovníku nie je?", moznosti: ["0", "None", "KeyError", "\"x\""], spravna: 0, vysvetlenie: "Náhradná hodnota." },
    { typ: "kod", zadanie: "Vytvor funkciu <code>pocet_slov(text)</code>, ktorá vráti slovník: slovo → koľkokrát sa v texte vyskytuje. Slová porovnávaj malými písmenami. Tip: <code>text.lower().split()</code>.",
      karty: ["py"], start: { py: 'def pocet_slov(text):\n    \n\nprint(pocet_slov("Ja som ja a ty si ty"))' }, vyska: "200px",
      napoveda: "pocty = {}\nfor s in text.lower().split():\n    pocty[s] = pocty.get(s, 0) + 1\nreturn pocty", riesenie: { py: 'def pocet_slov(text):\n    pocty = {}\n    for s in text.lower().split():\n        pocty[s] = pocty.get(s, 0) + 1\n    return pocty\n\nprint(pocet_slov("Ja som ja a ty si ty"))' },
      kontrola: function (v, kod) {
        var t = test(kod, "d = pocet_slov('Mačka pes mačka MAČKA vták')\nprint('T', d.get('mačka'), d.get('pes'), d.get('vták'), len(d), type(d).__name__)");
        if (t.chyba) return "Funkcia skončila chybou: " + K.prelozPyChybu(t.chyba.typ, t.chyba.sprava);
        return t.riadky.pop() === "T 3 1 1 3 dict" ? null : "Pre text „Mačka pes mačka MAČKA vták“ má vrátiť {mačka: 3, pes: 1, vták: 1}.";
      },
      vysvetlenie: "Toto je základ analýzy textov." },
    { typ: "vyklad", nadpis: "Kurz Python máš za sebou",
      text: "<ul><li>Výpis, vstup, premenné, typy a f-reťazce.</li><li>Podmienky a cykly.</li><li>Vlastné funkcie s parametrami a return.</li><li>Zoznamy, list comprehension a slovníky.</li></ul>", tip: "Po teste ťa čakajú záverečné projekty: vysvedčenie, matematické funkcie a analýza textu." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "python-6-1", otazka: "Aký index má prvý prvok zoznamu?", moznosti: ["0", "1", "-1", "závisí od zoznamu"], spravna: 0, vysvetlenie: "Indexy začínajú od 0." },
    { typ: "volba", lekcia: "python-6-1", otazka: "Čo vráti <code>[5, 6, 7][-1]</code>?", moznosti: ["7", "5", "6", "chybu"], spravna: 0, vysvetlenie: "-1 = posledný." },
    { typ: "volba", lekcia: "python-6-2", otazka: "Ktorá metóda pridá prvok na koniec zoznamu?", moznosti: ["<code>append</code>", "<code>add</code>", "<code>push</code>", "<code>insert</code>"], spravna: 0, vysvetlenie: "append. push je z JavaScriptu." },
    { typ: "volba", lekcia: "python-6-2", otazka: "Čo vypíše <code>print(sum([2, 3, 5]))</code>?", moznosti: ["10", "235", "[2, 3, 5]", "3"], spravna: 0, vysvetlenie: "Súčet prvkov." },
    { typ: "volba", lekcia: "python-6-3", otazka: "Čo je <code>[c for c in \"abc\" if c != \"b\"]</code>?", moznosti: ["['a', 'c']", "['b']", "\"ac\"", "['a', 'b', 'c']"], spravna: 0, vysvetlenie: "Vynechá b." },
    { typ: "volba", lekcia: "python-6-4", otazka: "Ako získaš z <code>osoba = {\"meno\": \"Eva\"}</code> meno?", moznosti: ["<code>osoba[\"meno\"]</code>", "<code>osoba[0]</code>", "<code>osoba.meno</code>", "<code>osoba(\"meno\")</code>"], spravna: 0, vysvetlenie: "Hodnota podľa kľúča." },
    { typ: "volba", lekcia: "python-6-4", otazka: "Čo dá <code>.items()</code> pri slovníku?", moznosti: ["Dvojice kľúč a hodnota", "Len kľúče", "Len hodnoty", "Počet prvkov"], spravna: 0, vysvetlenie: "for k, v in d.items()" },
    { typ: "doplnenie", lekcia: "python-6-5", otazka: "Počítanie výskytov:", sablona: "pocty[slovo] = pocty.[[0]](slovo, [[1]]) + 1", zetony: ["get", "0", "find", "1", "None"], spravne: ["get", "0"], vysvetlenie: "get s náhradnou hodnotou 0." },
  ];

  K.registrujModul("python", { cislo: 6, nazov: "Zoznamy a slovníky", popis: "Zoznamy, metódy, list comprehension, slovníky a počítanie výskytov.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("python", [
    { kat: "Zoznamy", znak: "[ ]", nazov: "Zoznam", popis: "Usporiadané hodnoty, indexy od 0.", priklad: 'z = ["a", "b"]\nz.append("c")' },
    { kat: "Zoznamy", znak: ".append() / .pop()", nazov: "Pridaj / odober", popis: "Na koniec zoznamu / z konca." },
    { kat: "Zoznamy", znak: "sum() / min() / max()", nazov: "Súhrny", popis: "Súčet, najmenší, najväčší prvok." },
    { kat: "Zoznamy", znak: "[x for x in z if …]", nazov: "List comprehension", popis: "Nový zoznam v jednom riadku." },
    { kat: "Slovníky", znak: "{ k: v }", nazov: "Slovník", popis: "Dvojice kľúč: hodnota.", priklad: 'd = {"meno": "Jana"}\nprint(d["meno"])' },
    { kat: "Slovníky", znak: ".get(k, x)", nazov: "Bezpečné čítanie", popis: "Vráti x, ak kľúč k neexistuje." },
    { kat: "Slovníky", znak: ".items()", nazov: "Dvojice", popis: "for k, v in d.items():" },
  ]);
})();
