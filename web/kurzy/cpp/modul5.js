/* C++ · Modul 5 · Polia a reťazce */
(function () {
  var P = K.pom, CPP = function (t) { return P.kod(t, "cpp"); }, MONO = P.MONO, TXT = P.TXT;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "cpp", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo, include) { return "#include <iostream>\n#include <string>\n" + (include || "") + "using namespace std;\n\nint main() {\n" + telo + "\n    return 0;\n}"; }
  var VEC = "#include <vector>\n", ALG = "#include <vector>\n#include <algorithm>\n";

  var OBR_POLE = '<svg viewBox="0 0 340 96" role="img" aria-label="Pole je rad premenných rovnakého typu tesne za sebou v pamäti, s indexmi od 0">' +
    [12, 7, 30, 5, 18].map(function (x, i) {
      var X = 14 + i * 64;
      return '<rect x="' + X + '" y="24" width="58" height="40" rx="6" style="fill:#c0365b"/><text x="' + (X + 29) + '" y="49" text-anchor="middle" font-size="15" font-weight="700" ' + MONO + ' fill="#fff">' + x + '</text><text x="' + (X + 29) + '" y="16" text-anchor="middle" font-size="12" ' + MONO + ' style="fill:var(--hl-num)">[' + i + "]</text>";
    }).join("") + '<text x="14" y="86" font-size="11.5" ' + MONO + ' style="fill:var(--text)">int body[5] = {12, 7, 30, 5, 18};</text></svg>';

  var L1 = { id: "cpp-5-1", nazov: "Polia", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Veľa hodnôt jedného typu",
      text: "<p><b>Pole</b> je rad premenných rovnakého typu tesne za sebou v pamäti. Veľkosť sa určí pri vytvorení a <b>nemení sa</b>. Indexy idú od 0:</p>", obr: OBR_POLE,
      podrobne: UKAZ("int body[5] = {12, 7, 30, 5, 18};\ncout << body[0] << endl;\nbody[2] = 31;\nint sucet = 0;\nfor (int i = 0; i < 5; i++) {\n    sucet += body[i];\n}\ncout << sucet << endl;", "12\n73") + "<p>C++ <b>nekontroluje</b>, či je index v poli. <code>body[5]</code> siahne do cudzej pamäte a program sa môže správať nepredvídateľne alebo spadnúť. Dávaj pozor na podmienku <code>i &lt; 5</code>, nie <code>i &lt;= 5</code>.</p>" },
    { typ: "volba", otazka: "Aký je posledný platný index poľa <code>int a[10]</code>?", moznosti: ["9", "10", "11", "-1"], spravna: 0, vysvetlenie: "Indexy 0 až 9." },
    { typ: "volba", otazka: "Čo sa stane pri <code>a[10]</code> v poli s 10 prvkami?", moznosti: ["Siahne mimo poľa, správanie je nepredvídateľné", "Vráti 0", "Prekladač pole zväčší", "Vždy chyba prekladu"], spravna: 0, vysvetlenie: "C++ hranice nekontroluje." },
    { typ: "kod", zadanie: "Načítaj 5 celých čísel do poľa (vstup <b>4 9 2 7 5</b>) a vypíš ich v <b>opačnom poradí</b> oddelené medzerou: <b>5 7 2 9 4</b>.",
      karty: ["cpp"], vstup: "4 9 2 7 5", start: { cpp: kostra("    int a[5];\n    ") }, vyska: "260px",
      napoveda: "for (int i = 0; i < 5; i++) cin >> a[i];  potom for (int i = 4; i >= 0; i--) cout << a[i] << \" \";", riesenie: { cpp: kostra('    int a[5];\n    for (int i = 0; i < 5; i++) {\n        cin >> a[i];\n    }\n    for (int i = 4; i >= 0; i--) {\n        cout << a[i];\n        if (i > 0) cout << " ";\n    }\n    cout << endl;') },
      kontrola: function (v, kod) { if (!/\[\s*\w+\s*\]/.test(kod) || !/for\s*\(/.test(kod)) return "Použi pole a cyklus for."; return r(v)[0] === "5 7 2 9 4" ? null : "Výstup má byť 5 7 2 9 4."; },
      vysvetlenie: "Cyklus odzadu: od 4 po 0." },
  ] };

  var L2 = { id: "cpp-5-2", nazov: "vector", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Pole, ktoré rastie",
      text: "<p><code>vector</code> z knižnice <code>&lt;vector&gt;</code> je pole, ktoré sa vie zväčšovať. V modernom C++ sa používa častejšie ako obyčajné pole:</p>" + UKAZ('#include <vector>\n…\nvector<int> cisla = {3, 8, 1};\ncisla.push_back(10);\ncout << cisla.size() << endl;\ncout << cisla[3] << endl;\nfor (int x : cisla) {\n    cout << x << " ";\n}', "4\n10\n3 8 1 10 "),
      podrobne: "<p>V lomených zátvorkách je typ prvkov: <code>vector&lt;string&gt;</code>, <code>vector&lt;double&gt;</code>. Zápis <code>for (int x : cisla)</code> je cyklus „pre každý prvok“. <code>cisla.at(i)</code> na rozdiel od <code>[i]</code> skontroluje hranice a pri zlom indexe ohlási chybu.</p>" },
    { typ: "vyklad", nadpis: "Užitočné metódy",
      text: P.tabulka(["Zápis", "Čo spraví"], [["<code>v.push_back(x)</code>", "pridá x na koniec"], ["<code>v.pop_back()</code>", "odstráni posledný"], ["<code>v.size()</code>", "počet prvkov"], ["<code>v.empty()</code>", "je prázdny?"], ["<code>v.front()</code>, <code>v.back()</code>", "prvý, posledný"], ["<code>v.clear()</code>", "vymaže všetko"]]) },
    { typ: "volba", otazka: "Ako pridáš číslo 5 na koniec vektora <code>v</code>?", moznosti: ["<code>v.push_back(5);</code>", "<code>v.append(5);</code>", "<code>v.add(5);</code>", "<code>v[v.size()] = 5;</code>"], spravna: 0, vysvetlenie: "push_back." },
    { typ: "kod", zadanie: "Načítaj čísla až do konca vstupu (vstup <b>5 12 7 3 20 8</b>) do <code>vector&lt;int&gt;</code> cez <code>push_back</code>. Vypíš počet čísel a ich priemer na nový riadok: <b>6</b> a <b>9.16667</b>.",
      karty: ["cpp"], vstup: "5 12 7 3 20 8", start: { cpp: kostra("    vector<int> v;\n    int x;\n    ", VEC) }, vyska: "280px",
      napoveda: "while (cin >> x) v.push_back(x);  potom súčet cez for (int y : v) a priemer (double)sucet / v.size()", riesenie: { cpp: kostra("    vector<int> v;\n    int x;\n    while (cin >> x) {\n        v.push_back(x);\n    }\n    int sucet = 0;\n    for (int y : v) sucet += y;\n    cout << v.size() << endl;\n    cout << (double)sucet / v.size() << endl;", VEC) },
      kontrola: function (v, kod) { if (!/push_back/.test(kod)) return "Pridávaj čísla cez push_back."; return r(v).join("|") === "6|9.16667" ? null : "Výstup má byť 6 a 9.16667 (pozor na celočíselné delenie)."; },
      vysvetlenie: "Vektor sa prispôsobí počtu čísel." },
  ] };

  var L3 = { id: "cpp-5-3", nazov: "Hľadanie v poli", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Najväčší prvok",
      text: "<p>Klasický algoritmus: predpokladaj, že najväčší je prvý, a prejdi ostatné:</p>" + UKAZ("vector<int> v = {12, 7, 30, 5, 18};\nint najv = v[0], index = 0;\nfor (int i = 1; i < v.size(); i++) {\n    if (v[i] > najv) {\n        najv = v[i];\n        index = i;\n    }\n}\ncout << najv << \" na indexe \" << index << endl;", "30 na indexe 2"),
      podrobne: "<p>Nezačínaj s <code>najv = 0</code>: keby boli všetky čísla záporné, výsledok by bol zlý.</p>" },
    { typ: "vyklad", nadpis: "Je tam?",
      text: UKAZ('vector<string> mena = {"Jana", "Peter", "Eva"};\nstring hladane = "Eva";\nbool nasiel = false;\nfor (string m : mena) {\n    if (m == hladane) {\n        nasiel = true;\n        break;\n    }\n}\ncout << (nasiel ? "áno" : "nie") << endl;', "áno"),
      podrobne: "<p><code>podmienka ? a : b</code> je krátky if: vráti a, ak podmienka platí, inak b.</p>" },
    { typ: "volba", otazka: "Prečo je lepšie začať s <code>najv = v[0]</code> ako s <code>najv = 0</code>?", moznosti: ["Pri záporných číslach by 0 bola zlý výsledok", "Je to rýchlejšie", "0 nie je int", "Nie je rozdiel"], spravna: 0, vysvetlenie: "Napr. pre {-5, -2} by vyšlo 0." },
    { typ: "kod", zadanie: "Načítaj čísla do konca vstupu (vstup <b>-4 -9 -2 -7</b>) a vypíš najmenšie a najväčšie, oddelené medzerou: <b>-9 -2</b>. Nepoužívaj min_element ani max_element.",
      karty: ["cpp"], vstup: "-4 -9 -2 -7", start: { cpp: kostra("    vector<int> v;\n    int x;\n    while (cin >> x) v.push_back(x);\n    ", VEC) }, vyska: "280px",
      napoveda: "int mn = v[0], mx = v[0]; for (int y : v) { if (y < mn) mn = y; if (y > mx) mx = y; }", riesenie: { cpp: kostra('    vector<int> v;\n    int x;\n    while (cin >> x) v.push_back(x);\n    int mn = v[0], mx = v[0];\n    for (int y : v) {\n        if (y < mn) mn = y;\n        if (y > mx) mx = y;\n    }\n    cout << mn << " " << mx << endl;', VEC) },
      kontrola: function (v, kod) { if (/min_element|max_element/.test(kod)) return "Skús to bez min_element a max_element."; return r(v)[0] === "-9 -2" ? null : "Výstup má byť -9 -2."; },
      vysvetlenie: "Fungovalo to aj pre záporné čísla." },
  ] };

  var L4 = { id: "cpp-5-4", nazov: "Reťazce string", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Text ako pole znakov",
      text: "<p><code>string</code> sa správa ako pole znakov <code>char</code>. K znakom pristupuješ cez index:</p>" + UKAZ('string s = "Programovanie";\ncout << s.length() << endl;\ncout << s[0] << s[s.length() - 1] << endl;\ncout << s.substr(0, 7) << endl;\ncout << s.find("gram") << endl;\nfor (char c : s) {\n    if (c == \'a\') cout << "a";\n}', "13\nPe\nProgram\n3\naa"),
      podrobne: "<p>Pozor na diakritiku: znaky ako č, š, ž zaberajú v UTF-8 2 bajty, takže <code>length()</code> ich počíta dvakrát. Preto v úlohách používame text bez diakritiky.</p>" },
    { typ: "vyklad", nadpis: "Ďalšie operácie",
      text: P.tabulka(["Zápis", "Čo spraví"], [["<code>a + b</code>", "spojí texty"], ["<code>s.find(\"x\")</code>", "pozícia, alebo <code>string::npos</code>, ak nie je"], ["<code>s.substr(od, dĺžka)</code>", "časť textu"], ["<code>s.replace(od, dĺžka, \"x\")</code>", "nahradí časť"], ["<code>toupper(c)</code>", "veľké písmeno (znak)"], ["<code>to_string(42)</code>", "číslo na text"], ["<code>stoi(\"42\")</code>", "text na číslo"]]) },
    { typ: "volba", otazka: "Čo vypíše <code>cout &lt;&lt; string(\"Ahoj\").substr(1, 2);</code>?", moznosti: ["ho", "Ah", "hoj", "oj"], spravna: 0, vysvetlenie: "Od indexu 1, dva znaky." },
    { typ: "volba", otazka: "Aký je rozdiel medzi <code>'a'</code> a <code>\"a\"</code>?", moznosti: ["'a' je char, \"a\" je string", "Žiadny", "\"a\" je číslo", "'a' sa nedá vypísať"], spravna: 0, vysvetlenie: "Apostrofy = jeden znak." },
    { typ: "kod", zadanie: "Načítaj slovo (vstup <b>kayak</b>) a zisti, či je to <b>palindróm</b> (číta sa rovnako odpredu aj odzadu). Vypíš <b>palindrom</b> alebo <b>nie</b>. Porovnávaj znaky cyklom.",
      karty: ["cpp"], vstup: "kayak", start: { cpp: kostra("    string s;\n    cin >> s;\n    ") }, vyska: "280px",
      napoveda: "bool je = true; for (int i = 0; i < s.length() / 2; i++) if (s[i] != s[s.length() - 1 - i]) je = false;", riesenie: { cpp: kostra('    string s;\n    cin >> s;\n    bool je = true;\n    int n = s.length();\n    for (int i = 0; i < n / 2; i++) {\n        if (s[i] != s[n - 1 - i]) je = false;\n    }\n    cout << (je ? "palindrom" : "nie") << endl;') },
      kontrola: function (v, kod) { if (!/for\s*\(|while\s*\(/.test(kod)) return "Porovnávaj znaky v cykle."; return r(v)[0] === "palindrom" ? null : "Pre kayak má vypísať palindrom."; },
      vysvetlenie: "Stačí prejsť polovicu slova." },
  ] };

  var L5 = { id: "cpp-5-5", nazov: "Triedenie a algoritmy", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Knižnica algorithm",
      text: "<p>C++ má hotové, veľmi rýchle algoritmy v <code>&lt;algorithm&gt;</code>:</p>" + UKAZ("#include <algorithm>\n…\nvector<int> v = {5, 2, 9, 1, 7};\nsort(v.begin(), v.end());\nfor (int x : v) cout << x << \" \";\ncout << endl;\nreverse(v.begin(), v.end());\ncout << v[0] << endl;\ncout << count(v.begin(), v.end(), 9) << endl;", "1 2 5 7 9 \n9\n1"),
      podrobne: "<p><code>v.begin()</code> a <code>v.end()</code> označujú začiatok a koniec rozsahu, s ktorým algoritmus pracuje. Zostupne zoradíš cez <code>sort(v.begin(), v.end(), greater&lt;int&gt;())</code>.</p>" },
    { typ: "vyklad", nadpis: "Ako triedi počítač",
      text: "<p>Najjednoduchší (a najpomalší) je <b>bublinkové triedenie</b>: opakovane porovnávaj susedov a vymeň ich, ak sú v zlom poradí:</p>" + CPP("for (int i = 0; i < n - 1; i++)\n    for (int j = 0; j < n - 1 - i; j++)\n        if (a[j] > a[j + 1])\n            swap(a[j], a[j + 1]);"),
      podrobne: "<p>Bublinkové triedenie potrebuje pre n prvkov asi n² porovnaní. <code>std::sort</code> len asi n·log n. Pri milióne prvkov je to rozdiel medzi hodinami a zlomkom sekundy.</p>" },
    { typ: "volba", otazka: "Čo spraví <code>sort(v.begin(), v.end());</code>?", moznosti: ["Zoradí vektor vzostupne", "Zoradí zostupne", "Otočí vektor", "Vráti zoradenú kópiu"], spravna: 0, vysvetlenie: "Mení priamo vektor v." },
    { typ: "kod", zadanie: "Načítaj čísla do konca vstupu (vstup <b>40 10 30 20 50</b>), zoraď ich a vypíš <b>medián</b> (prostredný prvok po zoradení): <b>30</b>. Na druhý riadok vypíš zoradené čísla oddelené medzerou.",
      karty: ["cpp"], vstup: "40 10 30 20 50", start: { cpp: kostra("    vector<int> v;\n    int x;\n    while (cin >> x) v.push_back(x);\n    ", ALG) }, vyska: "280px",
      napoveda: "sort(v.begin(), v.end()); cout << v[v.size() / 2] << endl;", riesenie: { cpp: kostra('    vector<int> v;\n    int x;\n    while (cin >> x) v.push_back(x);\n    sort(v.begin(), v.end());\n    cout << v[v.size() / 2] << endl;\n    for (int i = 0; i < v.size(); i++) {\n        cout << v[i];\n        if (i + 1 < v.size()) cout << " ";\n    }\n    cout << endl;', ALG) },
      kontrola: function (v) { return r(v).join("|") === "30|10 20 30 40 50" ? null : "Výstup má byť 30 a 10 20 30 40 50."; },
      vysvetlenie: "Medián je odolný voči extrémnym hodnotám." },
    { typ: "vyklad", nadpis: "Modul 5 máš za sebou",
      text: "<ul><li>Polia a indexy od 0, pozor na hranice.</li><li><code>vector</code>, <code>push_back</code>, <code>size</code>, cyklus <code>for (x : v)</code>.</li><li>Hľadanie najväčšieho a najmenšieho prvku.</li><li><code>string</code>: length, substr, find, znaky.</li><li><code>sort</code>, <code>reverse</code>, <code>count</code>.</li></ul>", tip: "Posledný modul: triedy a objekty, základ objektového programovania." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "cpp-5-1", otazka: "Koľko prvkov má <code>int a[5]</code>?", moznosti: ["5", "4", "6", "0"], spravna: 0, vysvetlenie: "Indexy 0 až 4." },
    { typ: "volba", lekcia: "cpp-5-1", otazka: "Čo kontroluje C++ pri <code>a[i]</code>?", moznosti: ["Nič, za hranice zodpovedáš ty", "Či je i v rozsahu", "Či je a vektor", "Typ i"], spravna: 0, vysvetlenie: "Preto je dôležité i < n." },
    { typ: "volba", lekcia: "cpp-5-2", otazka: "Ktorá metóda vráti počet prvkov vektora?", moznosti: ["<code>size()</code>", "<code>length</code>", "<code>count()</code>", "<code>len()</code>"], spravna: 0, vysvetlenie: "v.size()" },
    { typ: "volba", lekcia: "cpp-5-2", otazka: "Čo robí <code>for (int x : v)</code>?", moznosti: ["Prejde všetky prvky vektora v", "Prejde čísla 0 až x", "Vytvorí vektor", "Nič"], spravna: 0, vysvetlenie: "Cyklus pre každý prvok." },
    { typ: "volba", lekcia: "cpp-5-3", otazka: "Čím začať pri hľadaní najmenšieho prvku?", moznosti: ["Prvým prvkom poľa", "Nulou", "Veľmi veľkým číslom je jediná možnosť", "Posledným indexom"], spravna: 0, vysvetlenie: "Prvý prvok je bezpečný začiatok." },
    { typ: "volba", lekcia: "cpp-5-4", otazka: "Čo vráti <code>s.find(\"x\")</code>, keď tam x nie je?", moznosti: ["<code>string::npos</code>", "-1 ako int", "0", "chybu"], spravna: 0, vysvetlenie: "Špeciálna hodnota npos." },
    { typ: "volba", lekcia: "cpp-5-5", otazka: "Ktorá knižnica obsahuje <code>sort</code>?", moznosti: ["<code>&lt;algorithm&gt;</code>", "<code>&lt;vector&gt;</code>", "<code>&lt;iostream&gt;</code>", "<code>&lt;sort&gt;</code>"], spravna: 0, vysvetlenie: "#include <algorithm>" },
    { typ: "doplnenie", lekcia: "cpp-5-2", otazka: "Vektor reťazcov a pridanie mena:", sablona: "vector<[[0]]> mena;\nmena.[[1]](\"Jana\");", zetony: ["string", "push_back", "int", "append", "add"], spravne: ["string", "push_back"], vysvetlenie: "vector<string> a push_back." },
  ];

  K.registrujModul("cpp", { cislo: 5, nazov: "Polia a reťazce", popis: "Polia, vector, hľadanie v poli, string a triedenie.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("cpp", [
    { kat: "Polia", znak: "int a[n]", nazov: "Pole", popis: "Pevný počet prvkov, indexy 0 až n-1." },
    { kat: "Polia", znak: "vector<T>", nazov: "Vektor", popis: "Pole, ktoré rastie. #include <vector>", priklad: "vector<int> v = {1, 2};\nv.push_back(3);" },
    { kat: "Polia", znak: "for (x : v)", nazov: "Cyklus cez prvky", popis: "Pre každý prvok kontajnera." },
    { kat: "Polia", znak: "sort(b, e)", nazov: "Triedenie", popis: "Zoradí rozsah. #include <algorithm>" },
    { kat: "Text", znak: ".substr() / .find()", nazov: "Práca s textom", popis: "Časť textu / pozícia podreťazca." },
    { kat: "Text", znak: "to_string / stoi", nazov: "Prevody", popis: "Číslo na text / text na číslo." },
  ]);
})();
