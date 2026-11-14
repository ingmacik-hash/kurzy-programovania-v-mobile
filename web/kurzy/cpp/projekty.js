/* C++ · Záverečné projekty */
(function () {
  var P = K.pom;
  function r(v) { return P.riadky(v); }
  function ma(v, riadok) { return r(v).indexOf(riadok) >= 0; }
  /* V ktorej časti triedy Ucet je atribút deklarovaný: "private" | "public" | null (v class je predvolene private). */
  function pristup(kod, atribut) {
    var m = /class\s+Ucet\s*\{([\s\S]*?)\n\s*\};/.exec(kod); if (!m) return null;
    var cast = "private", casti = m[1].split(/\b(public|private|protected)\s*:/);
    for (var i = 0; i < casti.length; i++) {
      if (/^(public|private|protected)$/.test(casti[i])) { cast = casti[i]; continue; }
      if (new RegExp("^\\s*(string|double|int|float)\\s+[^;(]*\\b" + atribut + "\\b[^;(]*;", "m").test(casti[i])) return cast;
    }
    return null;
  }
  var HLAVA ="#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\n";

  K.registrujZaver("cpp", [
    { id: "cpp-p1", nazov: "Štatistika známok", minut: 30,
      popis: "Program spracuje známky celej triedy: priemer, najlepšiu a najhoršiu známku a jednoduchý graf (histogram) z hviezdičiek.",
      zadanie: "Na vstupe je počet známok a potom známky (1 až 5). Ulož ich do <code>vector&lt;int&gt;</code>. Priemer počítaj vo vlastnej funkcii <code>double priemer(const vector&lt;int&gt;&amp; z)</code>. Vypíš presne:<pre class=\"kod\">Pocet: 8\nPriemer: 2.38\nNajlepsia: 1\nNajhorsia: 5\n1: **\n2: ***\n3: **\n4: \n5: *</pre>Priemer na 2 desatinné miesta: <code>#include &lt;iomanip&gt;</code> a <code>cout &lt;&lt; fixed &lt;&lt; setprecision(2)</code>.",
      karty: ["cpp"], vstup: "8\n1 2 3 2 5 1 3 2", start: { cpp: HLAVA + "int main() {\n    int n;\n    cin >> n;\n    \n    return 0;\n}" },
      napoveda: "Načítaj do vektora cez push_back. Funkcia priemer: súčet / (double)z.size(). Histogram: pre k od 1 po 5 spočítaj, koľkokrát je k vo vektore, a vypíš toľko hviezdičiek (string(pocet, '*')).",
      kriteria: [
        { text: "Počet známok", body: 1, test: function (v) { return ma(v, "Pocet: 8"); } },
        { text: "Priemer na 2 desatinné miesta", body: 2, test: function (v) { return ma(v, "Priemer: 2.38"); } },
        { text: "Najlepšia a najhoršia známka", body: 2, test: function (v) { return ma(v, "Najlepsia: 1") && ma(v, "Najhorsia: 5"); } },
        { text: "Histogram: riadky 1 až 5 so správnym počtom hviezdičiek", body: 3, test: function (v) { var l = r(v); return ["1: **", "2: ***", "3: **", "4:", "5: *"].every(function (x) { return l.indexOf(x) >= 0; }); } },
        { text: "Známky sú vo vector<int>", body: 1, test: function (v, s) { return /vector\s*<\s*int\s*>/.test(s.cpp) && /push_back|resize|\(\s*n\s*\)/.test(s.cpp); } },
        { text: "Vlastná funkcia priemer s parametrom const vector<int>&", body: 2, test: function (v, s) { return /double\s+priemer\s*\(\s*const\s+vector\s*<\s*int\s*>\s*&/.test(s.cpp); } },
      ],
      riesenie: { cpp: HLAVA.replace("#include <vector>\n", "#include <vector>\n#include <iomanip>\n") + "double priemer(const vector<int>& z) {\n    int sucet = 0;\n    for (int x : z) sucet += x;\n    return (double)sucet / z.size();\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> z;\n    for (int i = 0; i < n; i++) {\n        int x;\n        cin >> x;\n        z.push_back(x);\n    }\n    int mn = z[0], mx = z[0];\n    for (int x : z) {\n        if (x < mn) mn = x;\n        if (x > mx) mx = x;\n    }\n    cout << \"Pocet: \" << n << endl;\n    cout << fixed << setprecision(2) << \"Priemer: \" << priemer(z) << endl;\n    cout << \"Najlepsia: \" << mn << endl;\n    cout << \"Najhorsia: \" << mx << endl;\n    for (int k = 1; k <= 5; k++) {\n        int pocet = 0;\n        for (int x : z) if (x == k) pocet++;\n        cout << k << \": \" << string(pocet, '*') << endl;\n    }\n    return 0;\n}" } },

    { id: "cpp-p2", nazov: "Hra Hádaj číslo", minut: 25,
      popis: "Klasická hra: počítač má tajné číslo a hráč háda. Po každom pokuse dostane radu Viac alebo Menej.",
      zadanie: "Tajné číslo je <code>const int TAJNE = 42;</code>. Program číta tipy zo vstupu, kým hráč neuhádne. Pre každý tip vypíše <b>Viac</b> (tajné je väčšie), <b>Menej</b> alebo pri správnom tipe <b>Uhadol si na N. pokus</b>. Tip mimo rozsahu 1 až 100 odmietne správou <b>Mimo rozsahu</b> a do pokusov ho nepočíta. Ak vstup skončí bez uhádnutia, vypíše <b>Koniec hry</b>.",
      karty: ["cpp"], vstup: "50 25 150 40 42", start: { cpp: HLAVA + "int main() {\n    const int TAJNE = 42;\n    \n    return 0;\n}" },
      napoveda: "int tip, pokusy = 0; while (cin >> tip) { if (tip < 1 || tip > 100) { … continue; } pokusy++; if (tip < TAJNE) … else if (tip > TAJNE) … else { …; return 0; } } cout << \"Koniec hry\";",
      kriteria: [
        { text: "Rada Menej pre príliš veľký tip (50)", body: 2, test: function (v) { return r(v)[0] === "Menej"; } },
        { text: "Rada Viac pre príliš malý tip (25 a 40)", body: 2, test: function (v) { var l = r(v); return l.filter(function (x) { return x === "Viac"; }).length === 2; } },
        { text: "Tip 150 sa odmietne ako Mimo rozsahu", body: 2, test: function (v) { return r(v)[2] === "Mimo rozsahu"; } },
        { text: "Správny tip: Uhadol si na 4. pokus (neplatný tip sa nepočíta)", body: 3, test: function (v) { return ma(v, "Uhadol si na 4. pokus"); } },
        { text: "Po uhádnutí program skončí (žiadne ďalšie riadky)", body: 1, test: function (v) { var l = r(v); return l[l.length - 1] === "Uhadol si na 4. pokus" && l.indexOf("Koniec hry") < 0; } },
        { text: "Program číta tipy v cykle a TAJNE je konštanta", body: 1, test: function (v, s) { return /while\s*\(|for\s*\(/.test(s.cpp) && /const\s+int\s+TAJNE/.test(s.cpp); } },
        { text: "Ošetrený koniec vstupu bez uhádnutia (Koniec hry)", body: 1, test: function (v, s) { return /Koniec hry/.test(s.cpp) && /while\s*\(\s*cin\s*>>/.test(s.cpp); } },
      ],
      riesenie: { cpp: HLAVA + 'int main() {\n    const int TAJNE = 42;\n    int tip, pokusy = 0;\n    while (cin >> tip) {\n        if (tip < 1 || tip > 100) {\n            cout << "Mimo rozsahu" << endl;\n            continue;\n        }\n        pokusy++;\n        if (tip < TAJNE) {\n            cout << "Viac" << endl;\n        } else if (tip > TAJNE) {\n            cout << "Menej" << endl;\n        } else {\n            cout << "Uhadol si na " << pokusy << ". pokus" << endl;\n            return 0;\n        }\n    }\n    cout << "Koniec hry" << endl;\n    return 0;\n}' } },

    { id: "cpp-p3", nazov: "Bankový účet", minut: 35,
      popis: "Objektový program: trieda Ucet chráni zostatok a spracúva príkazy klienta zo vstupu.",
      zadanie: "Vytvor triedu <code>Ucet</code> s <b>private</b> atribútmi <code>string majitel</code> a <code>double zostatok</code>, konštruktorom <code>Ucet(string m)</code> (zostatok 0) a metódami <code>bool vloz(double)</code>, <code>bool vyber(double)</code> a <code>double getZostatok()</code>. Vklad aj výber musí byť kladný, výber nesmie prekročiť zostatok.<br>V main vytvor účet pre <b>Jana</b> a spracuj príkazy zo vstupu: <code>vloz X</code>, <code>vyber X</code>, <code>stav</code>, <code>koniec</code>. Po vklade a výbere vypíš <b>OK</b> alebo <b>Zamietnute</b>, po <code>stav</code> vypíš <b>Jana: X</b>.",
      karty: ["cpp"], vstup: "vloz 100\nvyber 30\nvyber 500\nvloz -5\nstav\nkoniec\nstav", start: { cpp: HLAVA + "class Ucet {\n    \n};\n\nint main() {\n    \n    return 0;\n}" },
      napoveda: "Getter getMajitel() sa hodí na výpis mena. V main: string prikaz; while (cin >> prikaz) { if (prikaz == \"koniec\") break; if (prikaz == \"vloz\") { double x; cin >> x; cout << (u.vloz(x) ? \"OK\" : \"Zamietnute\") << endl; } … }",
      kriteria: [
        { text: "Vklad 100 a výber 30 prejdú (OK, OK)", body: 2, test: function (v) { var l = r(v); return l[0] === "OK" && l[1] === "OK"; } },
        { text: "Výber nad zostatok sa zamietne", body: 2, test: function (v) { return r(v)[2] === "Zamietnute"; } },
        { text: "Záporný vklad sa zamietne", body: 1, test: function (v) { return r(v)[3] === "Zamietnute"; } },
        { text: "Príkaz stav vypíše Jana: 70", body: 2, test: function (v) { return r(v)[4] === "Jana: 70"; } },
        { text: "Po príkaze koniec program skončí", body: 1, test: function (v) { return r(v).length === 5; } },
        { text: "Trieda Ucet má private atribúty", body: 2, test: function (v, s) { return pristup(s.cpp, "zostatok") === "private" && pristup(s.cpp, "majitel") === "private"; } },
        { text: "Konštruktor Ucet(string …) a metódy vloz, vyber vracajú bool", body: 2, test: function (v, s) { return /Ucet\s*\(\s*(const\s+)?string\s*&?\s*\w+\s*\)/.test(s.cpp) && /bool\s+vloz\s*\(/.test(s.cpp) && /bool\s+vyber\s*\(/.test(s.cpp); } },
      ],
      riesenie: { cpp: HLAVA + 'class Ucet {\nprivate:\n    string majitel;\n    double zostatok;\npublic:\n    Ucet(string m) {\n        majitel = m;\n        zostatok = 0;\n    }\n    bool vloz(double suma) {\n        if (suma <= 0) return false;\n        zostatok += suma;\n        return true;\n    }\n    bool vyber(double suma) {\n        if (suma <= 0 || suma > zostatok) return false;\n        zostatok -= suma;\n        return true;\n    }\n    double getZostatok() { return zostatok; }\n    string getMajitel() { return majitel; }\n};\n\nint main() {\n    Ucet u("Jana");\n    string prikaz;\n    while (cin >> prikaz) {\n        if (prikaz == "koniec") break;\n        if (prikaz == "vloz" || prikaz == "vyber") {\n            double x;\n            cin >> x;\n            bool ok = prikaz == "vloz" ? u.vloz(x) : u.vyber(x);\n            cout << (ok ? "OK" : "Zamietnute") << endl;\n        } else if (prikaz == "stav") {\n            cout << u.getMajitel() << ": " << u.getZostatok() << endl;\n        }\n    }\n    return 0;\n}' } },
  ]);
})();
