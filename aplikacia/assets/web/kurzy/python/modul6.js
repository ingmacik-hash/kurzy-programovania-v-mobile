/* Python · Modul 6 · Zoznamy a slovníky
   Vysvetlenia v troch vrstvách: text (Stručne), podrobne a hlbka (Do hĺbky). */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "py", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function test(kod, doplnok) { var x = K.spustiPythonHned(kod + "\n" + doplnok); return { riadky: r(x.vystup), chyba: x.chyba }; }

  var OBR_ZOZNAM = '<svg viewBox="0 0 340 100" role="img" aria-label="Zoznam má prvky s indexmi od 0; záporný index -1 je posledný prvok">' +
    ["jablko", "hruška", "slivka", "kiwi"].map(function (x, i) {
      var X = 10 + i * 82;
      return '<rect x="' + X + '" y="26" width="76" height="38" rx="8" style="fill:#3572a5"/><text x="' + (X + 38) + '" y="50" text-anchor="middle" font-size="12" font-weight="700" ' + MONO + ' fill="#fff">"' + x + '"</text>' +
        '<text x="' + (X + 38) + '" y="18" text-anchor="middle" font-size="12" ' + MONO + ' style="fill:var(--text)">' + i + '</text><text x="' + (X + 38) + '" y="84" text-anchor="middle" font-size="11" ' + MONO + ' style="fill:var(--muted)">' + (i - 4) + "</text>";
    }).join("") + "</svg>";

  /* ====================== Lekcia 1 ====================== */
  var L1 = { id: "python-6-1", nazov: "Zoznamy", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Viac hodnôt v jednej premennej",
      text: "<p><b>Zoznam</b> (list) je rad hodnôt uložených v jednej premennej. Píše sa v <b>hranatých zátvorkách</b>, prvky sú oddelené čiarkami. K prvku sa dostaneš cez jeho poradie, <b>index</b>, ktorý sa počíta <b>od 0</b>.</p>" + UKAZ('ovocie = ["jablko", "hruška", "slivka", "kiwi"]\nprint(ovocie[0])\nprint(ovocie[-1])\nprint(len(ovocie))', "jablko\nkiwi\n4"), obr: OBR_ZOZNAM,
      podrobne: "<p>Prečo zoznamy? Predstav si, že máš známky 30 žiakov. Bez zoznamu by si potreboval 30 premenných <code>znamka1</code>, <code>znamka2</code>… Zoznam ich udrží pod jedným menom a cyklom ich prejdeš naraz.</p><p>Indexovanie funguje rovnako ako pri texte:</p><ul><li><code>ovocie[0]</code> je prvý prvok, <code>ovocie[-1]</code> posledný,</li><li><code>ovocie[1:3]</code> je výrez: nový zoznam s prvkami 1 a 2,</li><li><code>len(ovocie)</code> je počet prvkov.</li></ul><p><b>Rozdiel oproti textu:</b> zoznam sa dá <b>meniť</b>. Do prvku môžeš priradiť novú hodnotu:</p>" + UKAZ('ovocie = ["jablko", "hruška", "slivka"]\novocie[1] = "banán"\nprint(ovocie)', "['jablko', 'banán', 'slivka']") +
        "<p>Zoznam môže obsahovať čokoľvek: čísla, texty, aj zmes, a dokonca ďalšie zoznamy. Prázdny zoznam je <code>[]</code>.</p>",
      hlbka: "<p>Zoznam v Pythone neukladá samotné hodnoty, ale <b>odkazy</b> na ne. Preto môže miešať typy. Prístup cez index je bleskový bez ohľadu na dĺžku zoznamu.</p><p>Pozor na <b>zdieľanie</b>: <code>b = a</code> nevytvorí kópiu zoznamu, ale druhé meno pre ten istý zoznam. Keď potom zmeníš <code>b[0]</code>, zmení sa aj <code>a[0]</code>. Kópiu vytvoríš <code>b = a.copy()</code> alebo <code>b = a[:]</code>. Toto je jedna z najčastejších záhad pre začiatočníkov.</p><p>Existuje aj nemenná verzia zoznamu, <b>n-tica</b> (tuple), písaná v okrúhlych zátvorkách: <code>bod = (3, 4)</code>. Používa sa pre hodnoty, ktoré patria k sebe a nemajú sa meniť.</p>" },
    { typ: "volba", otazka: "Čo je <code>[10, 20, 30][1]</code>?", moznosti: ["20", "10", "30", "chyba"], spravna: 0, vysvetlenie: "Indexy začínajú od 0, index 1 je druhý prvok." },
    { typ: "volba", otazka: "Čo spraví <code>znamky[5]</code>, keď má zoznam 5 prvkov?", moznosti: ["IndexError, posledný index je 4", "Vráti posledný prvok", "Vráti None", "Pridá prvok"], spravna: 0, vysvetlenie: "Päť prvkov má indexy 0 až 4. Index 5 neexistuje." },
    { typ: "kod", zadanie: "Vytvor zoznam <code>dni</code> s piatimi pracovnými dňami (pondelok až piatok). Vypíš prvý deň, posledný deň a počet dní, každé na nový riadok.",
      karty: ["py"], start: { py: "" }, vyska: "150px",
      napoveda: 'dni = ["pondelok", "utorok", "streda", "štvrtok", "piatok"]\nprint(dni[0])\nprint(dni[-1])\nprint(len(dni))', riesenie: { py: 'dni = ["pondelok", "utorok", "streda", "štvrtok", "piatok"]\nprint(dni[0])\nprint(dni[-1])\nprint(len(dni))' },
      kontrola: function (v, kod) { if (!/\[/.test(kod)) return "Vytvor zoznam v hranatých zátvorkách."; return r(v).join("|") === "pondelok|piatok|5" ? null : "Výstup má byť pondelok, piatok, 5."; },
      vysvetlenie: "dni[-1] je vždy posledný prvok, nech má zoznam akúkoľvek dĺžku." },
  ] };

  /* ====================== Lekcia 2 ====================== */
  var L2 = { id: "python-6-2", nazov: "Práca so zoznamom", minut: 11, kroky: [
    { typ: "vyklad", nadpis: "Metódy zoznamu",
      text: "<p>Zoznam má metódy na pridávanie, odstraňovanie a triedenie prvkov. Najdôležitejšia je <code>append</code>, ktorá pridá prvok na koniec.</p>" + UKAZ('nakup = []\nnakup.append("chlieb")\nnakup.append("mlieko")\nprint(nakup)', "['chlieb', 'mlieko']"),
      podrobne: P.tabulka(["Zápis", "Čo spraví"], [["<code>z.append(x)</code>", "pridá x na koniec"], ["<code>z.insert(i, x)</code>", "vloží x na pozíciu i"], ["<code>z.remove(x)</code>", "odstráni prvý výskyt x"], ["<code>z.pop()</code>", "odstráni a vráti posledný prvok"], ["<code>z.sort()</code>", "zoradí zoznam (zmení ho)"], ["<code>sorted(z)</code>", "vráti zoradenú kópiu, pôvodný nezmení"], ["<code>x in z</code>", "je x v zozname? (True/False)"], ["<code>z.index(x)</code>", "na ktorej pozícii je x"]]) +
        "<p>Najčastejší vzor: začni prázdnym zoznamom <code>[]</code> a postupne ho plň cez <code>append</code>, napríklad v cykle s <code>input()</code>.</p><p>Pozor na rozdiel: <code>z.sort()</code> zmení samotný zoznam a vráti None. <code>sorted(z)</code> vytvorí nový zoradený zoznam. Preto <code>z = z.sort()</code> je chyba, zoznam by sa stratil.</p>",
      hlbka: "<p>Metódy, ktoré menia zoznam (<code>append</code>, <code>sort</code>, <code>remove</code>), vracajú <code>None</code>. Je to zámer Pythonu: je vždy jasné, či funkcia mení pôvodný objekt alebo vracia nový.</p><p>Rýchlosť operácií nie je rovnaká. <code>append</code> a <code>pop()</code> na konci sú okamžité. <code>insert(0, x)</code> a <code>pop(0)</code> na začiatku musia posunúť všetky ostatné prvky, takže pri miliónovom zozname sú pomalé. Na frontu sa preto používa <code>collections.deque</code>.</p><p>Triedenie v Pythone používa algoritmus Timsort, ktorý vymyslel Tim Peters pre Python v roku 2002. Neskôr ho prevzala aj Java a Android.</p>" },
    { typ: "vyklad", nadpis: "Čísla v zozname",
      text: "<p>Na zoznamy čísel sú hotové funkcie: <code>sum</code> (súčet), <code>min</code>, <code>max</code> a <code>len</code>.</p>" + UKAZ("znamky = [1, 3, 2, 1, 4]\nprint(sum(znamky), min(znamky), max(znamky))\nprint(sum(znamky) / len(znamky))\nznamky.sort()\nprint(znamky)", "11 1 4\n2.2\n[1, 1, 2, 3, 4]"),
      podrobne: "<p>Priemer je súčet delený počtom: <code>sum(z) / len(z)</code>. Pri prázdnom zozname by to bolo delenie nulou, preto sa to v praxi najprv overí.</p><p><code>z.sort(reverse=True)</code> zoradí od najväčšieho. Texty sa triedia podľa abecedy, presnejšie podľa čísel znakov, takže veľké písmená idú pred malé.</p>",
      hlbka: "<p>Triediť sa dá aj podľa vlastného kritéria parametrom <code>key</code>: <code>sorted(slova, key=len)</code> zoradí slová podľa dĺžky. Pre správne triedenie slovenských slov s diakritikou slúži modul <code>locale</code>.</p><p>Na štatistiku má Python modul <code>statistics</code> s funkciami <code>mean</code> (priemer), <code>median</code> (medián) a <code>stdev</code> (smerodajná odchýlka).</p>" },
    { typ: "volba", otazka: "Čo bude v zozname?", kod: "z = [1, 2]\nz.append(3)\nz.insert(0, 0)", moznosti: ["[0, 1, 2, 3]", "[1, 2, 3, 0]", "[0, 2, 3]", "[3, 1, 2, 0]"], spravna: 0, vysvetlenie: "append pridá 3 na koniec a insert(0, 0) vloží nulu na začiatok." },
    { typ: "kod", zadanie: "Program načíta 5 čísel (vstupy sú pripravené) do zoznamu cez <code>append</code>. Potom vypíše <b>Súčet: X</b>, <b>Priemer: X</b> (na 1 desatinné miesto) a <b>Najväčšie: X</b>.",
      karty: ["py"], vstup: "4\n8\n15\n16\n23", start: { py: "cisla = []\nfor i in range(5):\n    \n" }, vyska: "210px",
      napoveda: "V cykle cisla.append(int(input())), potom sum, len a max. Priemer: f\"{sum(cisla) / len(cisla):.1f}\"", riesenie: { py: 'cisla = []\nfor i in range(5):\n    cisla.append(int(input()))\nprint(f"Súčet: {sum(cisla)}")\nprint(f"Priemer: {sum(cisla) / len(cisla):.1f}")\nprint(f"Najväčšie: {max(cisla)}")' },
      kontrola: function (v, kod) {
        if (!/append/.test(kod)) return "Pridávaj čísla do zoznamu cez append.";
        var l = r(v).slice(-3); if (l.join("|") !== "Súčet: 66|Priemer: 13.2|Najväčšie: 23") return "Očakávam Súčet: 66, Priemer: 13.2, Najväčšie: 23.";
        return r(K.spustiPythonHned(kod, ["1", "1", "1", "1", "2"]).vystup).slice(-3).join("|") === "Súčet: 6|Priemer: 1.2|Najväčšie: 2" ? null : "Pre iné vstupy výsledok nesedí.";
      },
      vysvetlenie: "Zoznam plnený v cykle a hotové funkcie sum, len a max. Overil som aj iné vstupy." },
  ] };

  /* ====================== Lekcia 3 ====================== */
  var L3 = { id: "python-6-3", nazov: "Cykly a zoznamy", minut: 11, kroky: [
    { typ: "vyklad", nadpis: "Prechod zoznamom",
      text: "<p>Cyklus <code>for</code> prejde zoznam prvok po prvku, rovnako ako text znak po znaku.</p>" + UKAZ('nakup = ["chlieb", "mlieko", "vajcia"]\nfor vec in nakup:\n    print("-", vec)', "- chlieb\n- mlieko\n- vajcia"),
      podrobne: "<p>Premenná <code>vec</code> má v každom kole jeden prvok zoznamu. Nepotrebuješ indexy ani <code>range</code>.</p><p>Keď potrebuješ aj poradové číslo, použi <code>enumerate</code>. Druhý argument určuje, od ktorého čísla sa počíta:</p>" + UKAZ('nakup = ["chlieb", "mlieko", "vajcia"]\nfor i, vec in enumerate(nakup, 1):\n    print(i, vec)', "1 chlieb\n2 mlieko\n3 vajcia") +
        "<p>Zoznam a cyklus sú najsilnejšia dvojica v programovaní. Súčet, priemer, hľadanie, filtrovanie aj výpis tabuľky sú vždy ten istý vzor: prejdi prvky a s každým niečo urob.</p>",
      hlbka: "<p>Počas prechodu cyklom <b>nemeň dĺžku</b> toho istého zoznamu (nepridávaj ani neodstraňuj prvky). Cyklus by preskočil prvky alebo nikdy neskončil. Radšej vytvor nový zoznam.</p><p>Dva zoznamy naraz prejdeš funkciou <code>zip</code>: <code>for meno, body in zip(mena, body):</code>. Spáruje prvé s prvým, druhé s druhým atď.</p>" },
    { typ: "vyklad", nadpis: "Filtrovanie a list comprehension",
      text: "<p>Častá úloha: z jedného zoznamu vytvoriť nový, len s niektorými prvkami. Klasicky cyklom a <code>append</code>:</p>" + UKAZ("cisla = [3, 8, 1, 12, 7, 6]\nparne = []\nfor c in cisla:\n    if c % 2 == 0:\n        parne.append(c)\nprint(parne)", "[8, 12, 6]"),
      podrobne: "<p>Python má na to aj skratku, <b>list comprehension</b> (zápis zoznamu). Robí presne to isté v jednom riadku:</p>" + UKAZ("cisla = [3, 8, 1, 12, 7, 6]\nprint([c for c in cisla if c % 2 == 0])\nprint([c * c for c in range(1, 6)])", "[8, 12, 6]\n[1, 4, 9, 16, 25]") +
        "<p>Zápis <code>[výraz for prvok in zoznam if podmienka]</code> čítaj: „výraz pre každý prvok zo zoznamu, ktorý spĺňa podmienku“. Časť s <code>if</code> je nepovinná.</p><p>Keď ti skratka nie je jasná, kľudne používaj klasický cyklus. Výsledok je rovnaký.</p>",
      hlbka: "<p>Podobne sa dá vytvoriť aj slovník (<code>{x: x * x for x in range(5)}</code>) a množina. Keď sú hranaté zátvorky nahradené okrúhlymi, vznikne <b>generátor</b>, ktorý hodnoty nevytvára naraz, ale postupne: <code>sum(x * x for x in range(1000000))</code> nezaberie pamäť na milión čísel.</p><p>List comprehension pochádza z funkcionálnych jazykov (Haskell) a z matematického zápisu množín { x² | x ∈ N, x &lt; 5 }.</p>" },
    { typ: "volba", otazka: "Čo je <code>[x * 2 for x in [1, 2, 3]]</code>?", moznosti: ["[2, 4, 6]", "[1, 2, 3, 1, 2, 3]", "[1, 4, 9]", "12"], spravna: 0, vysvetlenie: "Každý prvok sa vynásobí dvoma a vznikne nový zoznam." },
    { typ: "kod", zadanie: "Zo zoznamu <code>teploty</code> vytvor nový zoznam <code>teple</code> len s teplotami <b>nad 20</b> a vypíš ho. Potom vypíš, koľko takých dní bolo: <b>Teplých dní: X</b>.",
      karty: ["py"], start: { py: "teploty = [18, 22, 25, 19, 30, 21, 15]\n" }, vyska: "170px",
      napoveda: "teple = [t for t in teploty if t > 20], potom print(teple) a print(f\"Teplých dní: {len(teple)}\")", riesenie: { py: 'teploty = [18, 22, 25, 19, 30, 21, 15]\nteple = [t for t in teploty if t > 20]\nprint(teple)\nprint(f"Teplých dní: {len(teple)}")' },
      kontrola: function (v, kod) { return r(v).join("|") === "[22, 25, 30, 21]|Teplých dní: 4" ? null : "Výstup má byť [22, 25, 30, 21] a Teplých dní: 4."; },
      vysvetlenie: "Filtrovanie jedným riadkom. Rovnako dobre funguje aj cyklus s append." },
  ] };

  /* ====================== Lekcia 4 ====================== */
  var L4 = { id: "python-6-4", nazov: "Slovníky", minut: 11, kroky: [
    { typ: "vyklad", nadpis: "Kľúč → hodnota",
      text: "<p><b>Slovník</b> (dict) ukladá dvojice <b>kľúč: hodnota</b> v zložených zátvorkách. Hodnotu nehľadáš podľa poradia, ale podľa <b>kľúča</b>, ako heslo v slovníku.</p>" + UKAZ('ziak = {"meno": "Jana", "vek": 15, "trieda": "9.A"}\nprint(ziak["meno"])\nprint(ziak["trieda"])', "Jana\n9.A"),
      podrobne: "<p>Zoznam alebo slovník? <b>Zoznam</b>, keď záleží na poradí a prvky sú rovnakého druhu (známky, mená v rade). <b>Slovník</b>, keď údaje majú mená (meno, vek, trieda jedného žiaka) alebo keď chceš rýchlo nájsť hodnotu podľa kľúča (telefónny zoznam).</p><p>Slovník sa dá meniť:</p>" + UKAZ('ziak = {"meno": "Jana", "vek": 15}\nziak["vek"] = 16          # zmena\nziak["mesto"] = "Nitra"   # pridanie\nprint(ziak)\nprint(len(ziak))', "{'meno': 'Jana', 'vek': 16, 'mesto': 'Nitra'}\n3") +
        "<p>Kľúče sú <b>jedinečné</b>. Priradenie do existujúceho kľúča hodnotu prepíše, do nového ju pridá.</p><p>Neexistujúci kľúč (<code>ziak[\"email\"]</code>) skončí chybou <b>KeyError</b>. Bezpečnejšie je <code>ziak.get(\"email\", \"nemá\")</code>, ktoré vráti náhradnú hodnotu.</p>",
      hlbka: "<p>Slovník je vnútri <b>hašovacia tabuľka</b>. Z kľúča sa vypočíta číslo (hash), ktoré určí miesto v pamäti. Preto je hľadanie podľa kľúča okamžité aj pri miliónoch položiek, kým v zozname by sa muselo prechádzať prvok po prvku.</p><p>Kľúčom môže byť len <b>nemenná</b> hodnota: text, číslo, n-tica. Zoznam kľúčom byť nemôže, lebo keby sa zmenil, zmenil by sa aj jeho hash. Hodnotou môže byť čokoľvek, aj ďalší slovník alebo zoznam.</p><p>Od Pythonu 3.7 si slovník pamätá poradie, v akom boli kľúče pridané.</p>" },
    { typ: "vyklad", nadpis: "Prechod slovníkom",
      text: "<p>Metóda <code>.items()</code> vráti dvojice kľúč a hodnota, ktoré prejdeš cyklom. Operátor <code>in</code> zistí, či kľúč existuje.</p>" + UKAZ('ceny = {"chlieb": 1.2, "mlieko": 0.9, "syr": 2.5}\nfor tovar, cena in ceny.items():\n    print(f"{tovar}: {cena} €")\nprint("syr" in ceny)', "chlieb: 1.2 €\nmlieko: 0.9 €\nsyr: 2.5 €\nTrue"),
      podrobne: P.tabulka(["Zápis", "Vráti"], [["<code>d.keys()</code>", "všetky kľúče"], ["<code>d.values()</code>", "všetky hodnoty"], ["<code>d.items()</code>", "dvojice (kľúč, hodnota)"], ["<code>\"syr\" in d</code>", "True, ak je syr medzi kľúčmi"], ["<code>del d[\"syr\"]</code>", "odstráni kľúč aj s hodnotou"]]) +
        "<p>Samotné <code>for x in ceny:</code> prechádza <b>kľúče</b>. Aj <code>in</code> sa pýta na kľúče, nie na hodnoty.</p>",
      hlbka: "<p>Súčet všetkých cien: <code>sum(ceny.values())</code>. Najdrahší tovar: <code>max(ceny, key=ceny.get)</code>, teda kľúč, ktorého hodnota je najväčšia.</p><p>Dva slovníky spojíš operátorom <code>|</code> (Python 3.9+): <code>d1 | d2</code>. Pri rovnakých kľúčoch vyhrá hodnota z druhého.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>print(d[\"b\"])</code> pre <code>d = {\"a\": 1, \"b\": 2}</code>?", moznosti: ["2", "1", "b", "chybu"], spravna: 0, vysvetlenie: "Hodnota pod kľúčom b je 2." },
    { typ: "volba", otazka: "Ako pridáš do slovníka <code>d</code> kľúč \"c\" s hodnotou 3?", moznosti: ["<code>d[\"c\"] = 3</code>", "<code>d.append(\"c\", 3)</code>", "<code>d.add(c=3)</code>", "<code>d + {\"c\": 3}</code>"], spravna: 0, vysvetlenie: "Priradenie do nového kľúča ho pridá. append je metóda zoznamu, nie slovníka." },
    { typ: "kod", zadanie: "Máš slovník cien. Program načíta názov tovaru (vstup: <b>syr</b>) a vypíše <b>Cena: X €</b>. Ak tovar v slovníku nie je, vypíše <b>Nemáme</b>.",
      karty: ["py"], vstup: "syr", start: { py: 'ceny = {"chlieb": 1.2, "mlieko": 0.9, "syr": 2.5, "jablko": 0.4}\ntovar = input()\n' }, vyska: "190px",
      napoveda: 'if tovar in ceny:\n    print(f"Cena: {ceny[tovar]} €")\nelse:\n    print("Nemáme")', riesenie: { py: 'ceny = {"chlieb": 1.2, "mlieko": 0.9, "syr": 2.5, "jablko": 0.4}\ntovar = input()\nif tovar in ceny:\n    print(f"Cena: {ceny[tovar]} €")\nelse:\n    print("Nemáme")' },
      kontrola: function (v, kod) {
        if (r(v).pop() !== "Cena: 2.5 €") return "Pre syr má vypísať Cena: 2.5 €.";
        var x = K.spustiPythonHned(kod, ["banán"]); if (x.chyba) return "Pre tovar, ktorý nie je v slovníku, program spadol. Skontroluj ho cez in.";
        return r(x.vystup).pop() === "Nemáme" ? null : "Pre banán má vypísať Nemáme.";
      },
      vysvetlenie: "Najprv over kľúč cez in, až potom čítaj hodnotu. Program tak nespadne ani pri neznámom tovare." },
  ] };

  /* ====================== Lekcia 5 ====================== */
  var L5 = { id: "python-6-5", nazov: "Slovníky v praxi", minut: 12, kroky: [
    { typ: "vyklad", nadpis: "Počítanie výskytov",
      text: "<p>Klasická úloha: koľkokrát sa čo vyskytuje (hlasovanie, slová v texte, predaje). Slovník je na to ideálny: kľúč je vec, hodnota je počet.</p>" + UKAZ('hlasy = ["Jana", "Peter", "Jana", "Eva", "Jana", "Eva"]\npocty = {}\nfor meno in hlasy:\n    pocty[meno] = pocty.get(meno, 0) + 1\nprint(pocty)', "{'Jana': 3, 'Peter': 1, 'Eva': 2}"),
      podrobne: "<p>Kľúčový je riadok <code>pocty[meno] = pocty.get(meno, 0) + 1</code>:</p><ol><li><code>pocty.get(meno, 0)</code> zistí doterajší počet. Keď meno v slovníku ešte nie je, vráti 0.</li><li>Pripočíta 1.</li><li>Výsledok uloží späť pod to isté meno.</li></ol><p>Víťaza nájdeš funkciou <code>max</code> s parametrom <code>key</code>: <code>max(pocty, key=pocty.get)</code> vráti kľúč s najväčšou hodnotou, tu „Jana“.</p>",
      hlbka: "<p>Python má na počítanie hotovú triedu <code>Counter</code> v module <code>collections</code>: <code>Counter(hlasy).most_common(1)</code> vráti najčastejší prvok aj s počtom. Je dobré vedieť, ako to funguje vnútri, a potom používať hotové riešenie.</p><p>Rovnakým postupom sa počíta frekvencia slov v knihách, najpredávanejšie produkty alebo najčastejšie chyby v logoch servera.</p>" },
    { typ: "vyklad", nadpis: "Zoznam slovníkov",
      text: "<p>Skutočné údaje často vyzerajú ako <b>zoznam záznamov</b>, kde každý záznam je slovník. Je to ako tabuľka: zoznam sú riadky, kľúče sú stĺpce.</p>" + UKAZ('ziaci = [\n    {"meno": "Jana", "body": 87},\n    {"meno": "Peter", "body": 64},\n    {"meno": "Eva", "body": 92},\n]\nfor z in ziaci:\n    print(z["meno"], z["body"])', "Jana 87\nPeter 64\nEva 92"),
      podrobne: "<p>Zoradiť ich podľa bodov môžeš funkciou <code>sorted</code> s parametrom <code>key</code>:</p>" + UKAZ('ziaci = [{"meno": "Jana", "body": 87}, {"meno": "Peter", "body": 64}, {"meno": "Eva", "body": 92}]\nfor z in sorted(ziaci, key=lambda z: z["body"], reverse=True):\n    print(z["meno"], z["body"])', "Eva 92\nJana 87\nPeter 64") +
        "<p><code>lambda z: z[\"body\"]</code> je krátka funkcia bez mena. Pre každého žiaka povie, podľa čoho sa má triediť: podľa jeho bodov.</p><p>Presne takto vyzerajú údaje, ktoré si aplikácie posielajú cez internet vo formáte <b>JSON</b>.</p>",
      hlbka: "<p>Modul <code>json</code> premení zoznam slovníkov na text a späť: <code>json.dumps(ziaci)</code> a <code>json.loads(text)</code>. Tak si program uloží údaje do súboru alebo ich pošle serveru.</p><p>Pri veľkých tabuľkách sa v praxi používa knižnica <b>pandas</b>, ktorá s tabuľkou pracuje ako Excel, len programom. Je jedným z hlavných dôvodov, prečo je Python jazykom číslo jeden v analýze dát.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>d.get(\"x\", 0)</code>, keď kľúč x v slovníku nie je?", moznosti: ["0", "None", "KeyError", "\"x\""], spravna: 0, vysvetlenie: "get vráti náhradnú hodnotu, ktorú si mu dal, tu 0." },
    { typ: "kod", zadanie: "Vytvor funkciu <code>pocet_slov(text)</code>, ktorá vráti slovník: slovo → koľkokrát sa v texte vyskytuje. Slová porovnávaj malými písmenami. Tip: <code>text.lower().split()</code>.",
      karty: ["py"], start: { py: 'def pocet_slov(text):\n    \n\nprint(pocet_slov("Ja som ja a ty si ty"))' }, vyska: "200px",
      napoveda: "pocty = {}\nfor s in text.lower().split():\n    pocty[s] = pocty.get(s, 0) + 1\nreturn pocty", riesenie: { py: 'def pocet_slov(text):\n    pocty = {}\n    for s in text.lower().split():\n        pocty[s] = pocty.get(s, 0) + 1\n    return pocty\n\nprint(pocet_slov("Ja som ja a ty si ty"))' },
      kontrola: function (v, kod) {
        var t = test(kod, "d = pocet_slov('Mačka pes mačka MAČKA vták')\nprint('T', d.get('mačka'), d.get('pes'), d.get('vták'), len(d), type(d).__name__)");
        if (t.chyba) return "Funkcia skončila chybou: " + K.prelozPyChybu(t.chyba.typ, t.chyba.sprava);
        return t.riadky.pop() === "T 3 1 1 3 dict" ? null : "Pre text „Mačka pes mačka MAČKA vták“ má vrátiť {mačka: 3, pes: 1, vták: 1}.";
      },
      vysvetlenie: "Toto je základ analýzy textov: funkcia, cyklus a slovník spolu." },
    { typ: "vyklad", nadpis: "Kurz Python máš za sebou",
      text: "<p>Gratulujem! Teraz ovládaš základy Pythonu:</p><ul><li>výpis, vstup, premenné, typy a f-reťazce,</li><li>podmienky <code>if</code>, <code>elif</code>, <code>else</code> a cykly <code>for</code> a <code>while</code>,</li><li>vlastné funkcie s parametrami a <code>return</code>,</li><li>zoznamy, list comprehension a slovníky.</li></ul><p>S týmito nástrojmi sa dá napísať takmer akýkoľvek program. Ďalej sa učia už len nové knižnice a lepšie postupy.</p>",
      tip: "Po teste ťa čakajú záverečné projekty: vysvedčenie, matematické funkcie a analýza textu." },
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
