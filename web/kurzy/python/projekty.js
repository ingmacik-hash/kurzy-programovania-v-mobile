/* Python · Záverečné projekty */
(function () {
  var P = K.pom;
  function beh(kod, vstupy) { var x = K.spustiPythonHned(kod, vstupy); return { riadky: P.riadky(x.vystup), chyba: x.chyba, text: x.vystup }; }
  function ma(kod, vstupy, riadok) { var b = beh(kod, vstupy); return !b.chyba && b.riadky.indexOf(riadok) >= 0; }
  function volaj(kod, vyraz) { var b = beh(kod.replace(/^print\(.*\)\s*$/gm, "").replace(/^\w+\s*=\s*input\(.*$/gm, "") + "\nprint('@@', " + vyraz + ")"); var l = b.riadky.filter(function (x) { return x.indexOf("@@ ") === 0; }).pop(); return b.chyba || !l ? null : l.slice(3); }

  K.registrujZaver("python", [
    { id: "python-p1", nazov: "Vysvedčenie", minut: 30,
      popis: "Program, ktorý spracuje známky žiaka: vypočíta priemer, nájde najlepšiu a najhoršiu známku a určí celkový prospech.",
      zadanie: "Program najprv načíta <b>počet známok</b> a potom jednotlivé známky (1 až 5). Neplatnú známku odmietne správou <b>Neplatná známka</b> a načíta ju znova. Nakoniec vypíše presne tieto riadky:<pre class=\"kod\">Priemer: 1.67\nNajlepšia: 1\nNajhoršia: 2\nProspel s vyznamenaním</pre>Priemer má 2 desatinné miesta. Prospech: ak je niektorá známka 5 → <b>Neprospel</b>; inak ak je priemer najviac 1.5 a žiadna známka nie je horšia ako 2 → <b>Prospel s vyznamenaním</b>; inak <b>Prospel</b>. Výpočet prospechu daj do vlastnej funkcie.",
      karty: ["py"], vstup: "3\n1\n2\n2", start: { py: "pocet = int(input())\nznamky = []\n\n" },
      napoveda: "Cyklus for pre počet známok, vnútri while, kým známka nie je od 1 do 5. Funkcia def prospech(znamky): s podmienkami 5 in znamky, sum/len a max. Priemer: f\"{priemer:.2f}\".",
      kriteria: [
        { text: "Priemer sa vypíše s 2 desatinnými miestami (1, 2, 2 → Priemer: 1.67)", body: 2, test: function (v, s) { return ma(s.py, ["3", "1", "2", "2"], "Priemer: 1.67") && ma(s.py, ["2", "1", "2"], "Priemer: 1.50"); } },
        { text: "Najlepšia a najhoršia známka", body: 2, test: function (v, s) { var b = beh(s.py, ["4", "3", "1", "4", "2"]); return b.riadky.indexOf("Najlepšia: 1") >= 0 && b.riadky.indexOf("Najhoršia: 4") >= 0; } },
        { text: "Prospel s vyznamenaním (1, 1, 2)", body: 1, test: function (v, s) { return ma(s.py, ["3", "1", "1", "2"], "Prospel s vyznamenaním"); } },
        { text: "Bez vyznamenania, keď je niektorá známka 3 (1, 1, 1, 3)", body: 1, test: function (v, s) { return ma(s.py, ["4", "1", "1", "1", "3"], "Prospel"); } },
        { text: "Neprospel pri známke 5", body: 2, test: function (v, s) { return ma(s.py, ["3", "1", "5", "1"], "Neprospel"); } },
        { text: "Neplatná známka sa odmietne a načíta znova", body: 2, test: function (v, s) { var b = beh(s.py, ["2", "7", "0", "1", "3"]); return !b.chyba && b.riadky.indexOf("Neplatná známka") >= 0 && b.riadky.indexOf("Priemer: 2.00") >= 0; } },
        { text: "Prospech počíta vlastná funkcia (def)", body: 1, test: function (v, s) { return /def\s+\w+\s*\(/.test(s.py); } },
        { text: "Známky sú uložené v zozname", body: 1, test: function (v, s) { return /append|\[\s*\]/.test(s.py); } },
      ],
      riesenie: { py: 'def prospech(znamky):\n    priemer = sum(znamky) / len(znamky)\n    if 5 in znamky:\n        return "Neprospel"\n    if priemer <= 1.5 and max(znamky) <= 2:\n        return "Prospel s vyznamenaním"\n    return "Prospel"\n\npocet = int(input())\nznamky = []\nfor i in range(pocet):\n    z = int(input())\n    while z < 1 or z > 5:\n        print("Neplatná známka")\n        z = int(input())\n    znamky.append(z)\n\nprint(f"Priemer: {sum(znamky) / len(znamky):.2f}")\nprint(f"Najlepšia: {min(znamky)}")\nprint(f"Najhoršia: {max(znamky)}")\nprint(prospech(znamky))' } },

    { id: "python-p2", nazov: "Matematická knižnica", minut: 30,
      popis: "Napíš sadu užitočných matematických funkcií. Kontrola ich zavolá s rôznymi číslami, aj s hraničnými prípadmi.",
      zadanie: "Vytvor funkcie, ktoré <b>vracajú</b> výsledok (return):<ul><li><code>je_prvocislo(n)</code>: True/False. Čísla menšie ako 2 nie sú prvočísla.</li><li><code>delitele(n)</code>: zoznam všetkých deliteľov n od najmenšieho, napr. <code>delitele(12)</code> → <code>[1, 2, 3, 4, 6, 12]</code>.</li><li><code>nsd(a, b)</code>: najväčší spoločný deliteľ, napr. <code>nsd(12, 18)</code> → 6.</li><li><code>prvocisla_do(n)</code>: zoznam prvočísel od 2 po n vrátane.</li></ul>Na konci vypíš <code>prvocisla_do(30)</code>.",
      karty: ["py"], start: { py: "def je_prvocislo(n):\n    pass\n\ndef delitele(n):\n    pass\n\ndef nsd(a, b):\n    pass\n\ndef prvocisla_do(n):\n    pass\n\nprint(prvocisla_do(30))" },
      napoveda: "je_prvocislo: for d in range(2, n): ak n % d == 0, return False. delitele: [d for d in range(1, n + 1) if n % d == 0]. nsd: najväčšie d, ktoré delí obe čísla (alebo Euklidov algoritmus: while b: a, b = b, a % b). prvocisla_do: použi je_prvocislo.",
      kriteria: [
        { text: "je_prvocislo správne pre 2, 7, 13 a 97", body: 2, test: function (v, s) { return volaj(s.py, "je_prvocislo(2), je_prvocislo(7), je_prvocislo(13), je_prvocislo(97)") === "True True True True"; } },
        { text: "je_prvocislo vráti False pre 0, 1, 9 a 100", body: 2, test: function (v, s) { return volaj(s.py, "je_prvocislo(0), je_prvocislo(1), je_prvocislo(9), je_prvocislo(100)") === "False False False False"; } },
        { text: "delitele(12) a delitele(7)", body: 2, test: function (v, s) { return volaj(s.py, "delitele(12), delitele(7), delitele(1)") === "[1, 2, 3, 4, 6, 12] [1, 7] [1]"; } },
        { text: "nsd pre rôzne dvojice", body: 2, test: function (v, s) { return volaj(s.py, "nsd(12, 18), nsd(7, 5), nsd(100, 75), nsd(9, 9)") === "6 1 25 9"; } },
        { text: "prvocisla_do(20)", body: 2, test: function (v, s) { return volaj(s.py, "prvocisla_do(20)") === "[2, 3, 5, 7, 11, 13, 17, 19]"; } },
        { text: "Program vypíše prvočísla do 30", body: 1, test: function (v) { return P.riadky(v).indexOf("[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]") >= 0; } },
        { text: "prvocisla_do využíva funkciu je_prvocislo", body: 1, test: function (v, s) { var m = /def\s+prvocisla_do[\s\S]*?(?=\ndef\s|\n\S|$)/.exec(s.py); return !!m && /je_prvocislo\s*\(/.test(m[0]); } },
      ],
      riesenie: { py: "def je_prvocislo(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\ndef delitele(n):\n    return [d for d in range(1, n + 1) if n % d == 0]\n\ndef nsd(a, b):\n    while b:\n        a, b = b, a % b\n    return a\n\ndef prvocisla_do(n):\n    return [x for x in range(2, n + 1) if je_prvocislo(x)]\n\nprint(prvocisla_do(30))" } },

    { id: "python-p3", nazov: "Analýza textu", minut: 30,
      popis: "Program prečíta vetu alebo odsek a vypíše o ňom štatistiku: počet slov, najdlhšie slovo a najčastejšie slovo.",
      zadanie: "Program načíta jeden riadok textu. Slová sú oddelené medzerami. Pred spracovaním z nich odstráň interpunkciu <code>.,!?</code> a pri počítaní výskytov porovnávaj malé písmená. Vypíš presne:<pre class=\"kod\">Slov: 9\nZnakov: 47\nNajdlhšie slovo: programovanie\nNajčastejšie slovo: je (2x)</pre><b>Znakov</b> je dĺžka celého načítaného textu. Pri zhode vyhráva slovo, ktoré je v texte skôr. Najdlhšie slovo vypíš malými písmenami.",
      karty: ["py"], vstup: "Python je super, programovanie je zábava a hra!", start: { py: "text = input()\n" },
      napoveda: "slova = [s.strip(\".,!?\").lower() for s in text.split()]. Počty cez slovník a get. Najdlhšie: max(slova, key=len). Najčastejšie: max(pocty, key=pocty.get).",
      kriteria: [
        { text: "Počet slov", body: 2, test: function (v, s) { return ma(s.py, ["Python je super, programovanie je zábava a hra!"], "Slov: 8") && ma(s.py, ["Ahoj"], "Slov: 1"); } },
        { text: "Počet znakov textu", body: 1, test: function (v, s) { return ma(s.py, ["Python je super, programovanie je zábava a hra!"], "Znakov: 47"); } },
        { text: "Najdlhšie slovo (bez interpunkcie, malými)", body: 2, test: function (v, s) { return ma(s.py, ["Python je super, programovanie je zábava a hra!"], "Najdlhšie slovo: programovanie") && ma(s.py, ["Dobrý deň, Slovensko!"], "Najdlhšie slovo: slovensko"); } },
        { text: "Najčastejšie slovo s počtom", body: 2, test: function (v, s) { return ma(s.py, ["Python je super, programovanie je zábava a hra!"], "Najčastejšie slovo: je (2x)"); } },
        { text: "Veľké a malé písmená sa pri počítaní neodlišujú", body: 2, test: function (v, s) { return ma(s.py, ["Pes a mačka. PES, pes!"], "Najčastejšie slovo: pes (3x)"); } },
        { text: "Pri zhode vyhrá slovo, ktoré je v texte skôr", body: 1, test: function (v, s) { return ma(s.py, ["kto skôr príde ten skôr melie kto"], "Najčastejšie slovo: kto (2x)"); } },
        { text: "Používa slovník na počítanie výskytov", body: 1, test: function (v, s) { return /\{\s*\}|dict\s*\(/.test(s.py); } },
      ],
      riesenie: { py: 'text = input()\nslova = [s.strip(".,!?").lower() for s in text.split()]\nslova = [s for s in slova if s]\n\npocty = {}\nfor s in slova:\n    pocty[s] = pocty.get(s, 0) + 1\n\nnajcastejsie = max(pocty, key=pocty.get)\nprint(f"Slov: {len(slova)}")\nprint(f"Znakov: {len(text)}")\nprint(f"Najdlhšie slovo: {max(slova, key=len)}")\nprint(f"Najčastejšie slovo: {najcastejsie} ({pocty[najcastejsie]}x)")' } },
  ]);
})();
