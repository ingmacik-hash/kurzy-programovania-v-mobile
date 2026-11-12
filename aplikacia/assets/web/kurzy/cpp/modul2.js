/* C++ · Modul 2 · Premenné a typy */
(function () {
  var P = K.pom, CPP = function (t) { return P.kod(t, "cpp"); }, TXT = P.TXT, MONO = P.MONO;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "cpp", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function kostra(telo) { return "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n" + telo + "\n    return 0;\n}"; }

  var OBR_TYPY = '<svg viewBox="0 0 340 130" role="img" aria-label="Typy premenných a koľko miesta zaberajú v pamäti">' +
    [["char", 1, "'A'"], ["bool", 1, "true"], ["int", 4, "42"], ["double", 8, "3.14"]].map(function (x, i) {
      var y = 10 + i * 29, s = '<text x="8" y="' + (y + 16) + '" font-size="12" font-weight="700" ' + MONO + ' style="fill:var(--hl-kw)">' + x[0] + "</text>";
      for (var b = 0; b < x[1]; b++) s += '<rect x="' + (70 + b * 26) + '" y="' + (y + 2) + '" width="22" height="20" rx="3" style="fill:#c0365b;opacity:.8"/>';
      return s + '<text x="' + (78 + x[1] * 26) + '" y="' + (y + 16) + '" font-size="11" ' + MONO + ' style="fill:var(--text)">' + x[2] + '</text>';
    }).join("") + '<text x="330" y="124" text-anchor="end" font-size="10" ' + TXT + ' style="fill:var(--muted)">1 štvorček = 1 bajt</text></svg>';

  var L1 = { id: "cpp-2-1", nazov: "Premenné", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Premenná má typ",
      text: "<p>V C++ musíš pri vytvorení premennej povedať jej <b>typ</b>, čiže aké hodnoty bude uchovávať. Typ sa potom už nezmení:</p>" + UKAZ('int vek = 15;\ndouble vyska = 1.72;\nstring meno = "Jana";\n\nvek = vek + 1;\ncout << meno << " má " << vek << " rokov." << endl;', "Jana má 16 rokov."),
      podrobne: "<p>Prekladač vďaka typom vopred vie, koľko pamäte vyhradiť a ktoré operácie dávajú zmysel. Keď sa pokúsiš uložiť text do <code>int</code>, ohlási chybu ešte pred spustením.</p><p>Premenná bez počiatočnej hodnoty (<code>int x;</code>) obsahuje náhodný „odpad“ z pamäte. Vždy jej daj hodnotu.</p>" },
    { typ: "volba", otazka: "Čo je zle?", kod: 'int pocet = "desať";', moznosti: ["Do int nemožno uložiť text", "Chýba typ", "Názov je zlý", "Nič"], spravna: 0, vysvetlenie: "int je celé číslo, text patrí do string." },
    { typ: "volba", otazka: "Akú hodnotu má <code>int x;</code> hneď po vytvorení?", moznosti: ["Nepredvídateľnú (odpad z pamäte)", "Vždy 0", "null", "chybu"], spravna: 0, vysvetlenie: "Preto premenné vždy inicializuj: int x = 0;" },
    { typ: "kod", zadanie: "Vytvor premennú <code>int body = 10;</code>, pripočítaj k nej 5 a vypíš <b>Body: 15</b>.",
      karty: ["cpp"], start: { cpp: kostra("    ") }, vyska: "210px",
      napoveda: 'int body = 10; body = body + 5; cout << "Body: " << body << endl;', riesenie: { cpp: kostra('    int body = 10;\n    body = body + 5;\n    cout << "Body: " << body << endl;') },
      kontrola: function (v, kod) { if (!/int\s+body/.test(kod)) return "Vytvor premennú int body."; return r(v)[0] === "Body: 15" ? null : "Výstup má byť Body: 15."; },
      vysvetlenie: "Premenná s typom int." },
  ] };

  var L2 = { id: "cpp-2-2", nazov: "Základné typy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Prehľad typov",
      text: P.tabulka(["Typ", "Hodnoty", "Príklad"], [["<code>int</code>", "celé čísla (asi ±2 miliardy)", "<code>int pocet = 42;</code>"], ["<code>long long</code>", "veľmi veľké celé čísla", "<code>long long svet = 8000000000;</code>"], ["<code>double</code>", "desatinné čísla", "<code>double pi = 3.14;</code>"], ["<code>char</code>", "jeden znak, v apostrofoch", "<code>char znamka = 'A';</code>"], ["<code>bool</code>", "true / false", "<code>bool hotovo = false;</code>"], ["<code>string</code>", "text, v úvodzovkách", "<code>string meno = \"Jana\";</code>"]]), obr: OBR_TYPY,
      podrobne: "<p>Pre <code>string</code> pridaj <code>#include &lt;string&gt;</code>. Pozor na rozdiel: <code>'A'</code> (apostrofy) je jeden znak <code>char</code>, <code>\"A\"</code> (úvodzovky) je text <code>string</code>.</p>",
      hlbka: "<p>Typy majú obmedzený rozsah. <code>int</code> má 4 bajty = 32 bitov, najväčšia hodnota je 2 147 483 647. Ak ju prekročíš, číslo „pretečie“ do záporných hodnôt. V roku 2014 sa tak „pokazilo“ počítadlo videnia Gangnam Style na YouTube a museli ho zmeniť na väčší typ.</p>" },
    { typ: "volba", otazka: "Ktorý typ použiješ na cenu 4,99 €?", moznosti: ["<code>double</code>", "<code>int</code>", "<code>char</code>", "<code>bool</code>"], spravna: 0, vysvetlenie: "Desatinné číslo = double." },
    { typ: "volba", otazka: "Aký je rozdiel medzi <code>'x'</code> a <code>\"x\"</code>?", moznosti: ["'x' je char, \"x\" je string", "Žiadny", "\"x\" je číslo", "'x' je chyba"], spravna: 0, vysvetlenie: "Apostrofy = jeden znak." },
    { typ: "kod", zadanie: "Vytvor premenné: <code>string</code> meno <b>Peter</b>, <code>double</code> priemer <b>1.75</b> a <code>bool</code> vyznamenanie <b>false</b>. Vypíš <b>Peter: 1.75</b>.",
      karty: ["cpp"], start: { cpp: kostra("    ") }, vyska: "220px",
      napoveda: 'string meno = "Peter"; double priemer = 1.75; bool vyznamenanie = false; cout << meno << ": " << priemer << endl;', riesenie: { cpp: kostra('    string meno = "Peter";\n    double priemer = 1.75;\n    bool vyznamenanie = false;\n    cout << meno << ": " << priemer << endl;') },
      kontrola: function (v, kod) {
        if (!/string\s+\w+\s*=\s*"Peter"/.test(kod)) return "Chýba string s hodnotou \"Peter\".";
        if (!/double\s+\w+\s*=\s*1\.75/.test(kod)) return "Chýba double s hodnotou 1.75.";
        if (!/bool\s+\w+\s*=\s*false/.test(kod)) return "Chýba bool s hodnotou false.";
        return r(v)[0] === "Peter: 1.75" ? null : "Výstup má byť Peter: 1.75";
      }, vysvetlenie: "Tri typy, tri premenné." },
  ] };

  var L3 = { id: "cpp-2-3", nazov: "Počítanie a pozor na typy", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Celočíselné delenie",
      text: "<p>Najväčšia pasca C++: <b>delenie dvoch int je vždy celé číslo</b>, desatinná časť sa zahodí:</p>" + UKAZ("int a = 7, b = 2;\ncout << a / b << endl;\ncout << a % b << endl;\ncout << 7.0 / 2 << endl;\ncout << (double)a / b << endl;", "3\n1\n3.5\n3.5"),
      podrobne: "<ul><li><code>%</code> je zvyšok po delení (len pre celé čísla).</li><li>Ak je aspoň jedno číslo desatinné, výsledok je desatinný.</li><li><code>(double)a</code> alebo <code>static_cast&lt;double&gt;(a)</code> dočasne zmení typ. Volá sa to <b>pretypovanie</b>.</li></ul>" },
    { typ: "volba", otazka: "Čo vypíše <code>cout &lt;&lt; 9 / 4;</code>?", moznosti: ["2", "2.25", "2.3", "3"], spravna: 0, vysvetlenie: "int / int = celé číslo, 2.25 sa oreže na 2." },
    { typ: "vyklad", nadpis: "Skrátené zápisy a const",
      text: CPP("int x = 5;\nx += 3;   // 8\nx *= 2;   // 16\nx++;      // 17\nx--;      // 16\n\nconst double DPH = 0.23;  // konštanta, nedá sa zmeniť\nauto cena = 9.99;         // typ si domyslí prekladač (double)"),
      podrobne: "<p><code>const</code> chráni hodnoty, ktoré sa nemajú meniť. Pokus o zmenu skončí chybou prekladu. <code>auto</code> šetrí písanie, keď je typ zrejmý z hodnoty.</p>" },
    { typ: "kod", zadanie: "Načítaj dve celé čísla (vstup <b>7 2</b>) a vypíš ich podiel <b>presne</b> ako desatinné číslo (3.5) pomocou pretypovania na double.",
      karty: ["cpp"], vstup: "7 2", start: { cpp: kostra("    int a, b;\n    cin >> a >> b;\n    ") }, vyska: "210px",
      napoveda: "cout << (double)a / b << endl;", riesenie: { cpp: kostra("    int a, b;\n    cin >> a >> b;\n    cout << (double)a / b << endl;") },
      kontrola: function (v) { return r(v)[0] === "3.5" ? null : "Výstup má byť 3.5 (teraz: " + r(v)[0] + "). Bez pretypovania by vyšlo 3."; },
      vysvetlenie: "Pretypovanie zachránilo desatinnú časť." },
  ] };

  var L4 = { id: "cpp-2-4", nazov: "Texty: string", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Práca s textom",
      text: P.tabulka(["Zápis", "Výsledok pre s = \"Ahoj\""], [["<code>s.length()</code>", "4"], ["<code>s + \" svet\"</code>", "\"Ahoj svet\""], ["<code>s[0]</code>", "'A' (char)"], ["<code>s.substr(1, 2)</code>", "\"ho\" (od 1, dĺžka 2)"], ["<code>s.find(\"oj\")</code>", "2 (pozícia)"]]),
      podrobne: "<p>Texty spájaš operátorom <code>+</code>. Číslo na text prevedie <code>to_string(42)</code>, text na číslo <code>stoi(\"42\")</code>.</p>" },
    { typ: "vyklad", nadpis: "Celý riadok: getline",
      text: "<p><code>cin &gt;&gt;</code> načíta len po medzeru. Celý riadok aj s medzerami načítaš cez <code>getline</code>:</p>" + UKAZ('string meno;\ngetline(cin, meno);\ncout << "Ahoj, " << meno << "!" << endl;', "Jana Nováková\nAhoj, Jana Nováková!"),
      podrobne: "<p>Pri kombinácii <code>cin &gt;&gt; cislo;</code> a potom <code>getline</code> zostane v riadku Enter a getline načíta prázdny text. Pomôže <code>cin.ignore();</code> medzi nimi.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>string(\"Praha\").length()</code>?", moznosti: ["5", "4", "6", "\"5\""], spravna: 0, vysvetlenie: "P-r-a-h-a." },
    { typ: "kod", zadanie: "Načítaj celé meno cez <code>getline</code> (vstup: <b>Jana Novakova</b>) a vypíš <b>Ahoj, Jana Novakova!</b> a na druhom riadku dĺžku mena. (Bez diakritiky: C++ string počíta bajty a písmeno á zaberá dva.)",
      karty: ["cpp"], vstup: "Jana Novakova", start: { cpp: kostra("    string meno;\n    ") }, vyska: "210px",
      napoveda: 'getline(cin, meno); cout << "Ahoj, " << meno << "!" << endl; cout << meno.length() << endl;', riesenie: { cpp: kostra('    string meno;\n    getline(cin, meno);\n    cout << "Ahoj, " << meno << "!" << endl;\n    cout << meno.length() << endl;') },
      kontrola: function (v, kod) { if (!/getline/.test(kod)) return "Použi getline(cin, meno)."; var l = r(v); return l[0] === "Ahoj, Jana Novakova!" && l[1] === "13" ? null : "Očakávané: Ahoj, Jana Novakova! a 13."; },
      vysvetlenie: "getline načítal meno aj s medzerou." },
  ] };

  var L5 = { id: "cpp-2-5", nazov: "Matematika v C++", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Knižnica cmath",
      text: CPP("#include <cmath>\n\nsqrt(16)      // 4    odmocnina\npow(2, 10)    // 1024 mocnina\nabs(-5)       // 5    absolútna hodnota\nround(2.6)    // 3    zaokrúhlenie\nfloor(2.6)    // 2    nadol\nceil(2.1)     // 3    nahor"),
      podrobne: "<p>V C++ nie je operátor na mocninu (<code>^</code> znamená niečo iné!). Používa sa <code>pow</code>. Výsledky funkcií z cmath sú typu double.</p>" },
    { typ: "volba", otazka: "Ako v C++ vypočítaš 3 na druhú?", moznosti: ["<code>pow(3, 2)</code>", "<code>3 ^ 2</code>", "<code>3 ** 2</code>", "<code>sqr(3)</code>"], spravna: 0, vysvetlenie: "^ v C++ nie je mocnina." },
    { typ: "vyklad", nadpis: "Výpis desatinných čísel",
      text: "<p>Na pevný počet desatinných miest slúži <code>&lt;iomanip&gt;</code>:</p>" + UKAZ("#include <iomanip>\ndouble cena = 24.5877;\ncout << fixed << setprecision(2) << cena << endl;", "24.59"),
      podrobne: "<p><code>fixed</code> + <code>setprecision(2)</code> platí pre všetky ďalšie výpisy, kým to nezmeníš.</p>" },
    { typ: "kod", zadanie: "Načítaj polomer kruhu (vstup <b>3</b>) a vypíš jeho obsah <code>3.14159 * r * r</code> s presnosťou na 2 desatinné miesta: <b>28.27</b>.",
      karty: ["cpp"], vstup: "3", start: { cpp: "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double r;\n    cin >> r;\n    \n    return 0;\n}" }, vyska: "220px",
      napoveda: "cout << fixed << setprecision(2) << 3.14159 * r * r << endl;", riesenie: { cpp: "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double r;\n    cin >> r;\n    cout << fixed << setprecision(2) << 3.14159 * r * r << endl;\n    return 0;\n}" },
      kontrola: function (v) { return r(v)[0] === "28.27" ? null : "Výstup má byť 28.27 (teraz: " + (r(v)[0] || "nič") + ")."; },
      vysvetlenie: "Presný výpis s dvoma desatinnými miestami." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li>Premenné s typom: int, long long, double, char, bool, string.</li><li>Celočíselné delenie, <code>%</code> a pretypovanie.</li><li><code>const</code>, <code>auto</code>, <code>+=</code>, <code>++</code>.</li><li>string: length, substr, getline.</li><li>cmath a výpis cez iomanip.</li></ul>", tip: "Teraz test. Ďalšie moduly C++ (podmienky, cykly, funkcie, polia, triedy) pripravujeme." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "cpp-2-1", otazka: "Čo musíš uviesť pri vytvorení premennej v C++?", moznosti: ["Typ", "Nič, len meno", "Kľúčové slovo let", "Komentár"], spravna: 0, vysvetlenie: "Napr. int x = 5;" },
    { typ: "volba", lekcia: "cpp-2-2", otazka: "Ktorý typ uloží text „Bratislava“?", moznosti: ["<code>string</code>", "<code>char</code>", "<code>int</code>", "<code>text</code>"], spravna: 0, vysvetlenie: "char je len jeden znak." },
    { typ: "volba", lekcia: "cpp-2-3", otazka: "Čo vypíše <code>cout &lt;&lt; 10 / 4;</code>?", moznosti: ["2", "2.5", "3", "2.0"], spravna: 0, vysvetlenie: "Dva int = celočíselné delenie." },
    { typ: "volba", lekcia: "cpp-2-3", otazka: "Čo vypíše <code>cout &lt;&lt; 10 % 4;</code>?", moznosti: ["2", "2.5", "0", "4"], spravna: 0, vysvetlenie: "Zvyšok po delení." },
    { typ: "doplnenie", lekcia: "cpp-2-3", otazka: "Konštanta:", sablona: "[[0]] double PI = 3.14159;", zetony: ["const", "final", "let", "static"], spravne: ["const"], vysvetlenie: "const = nemenná hodnota." },
    { typ: "volba", lekcia: "cpp-2-4", otazka: "Ako načítaš celý riadok aj s medzerami?", moznosti: ["<code>getline(cin, s);</code>", "<code>cin &gt;&gt; s;</code>", "<code>input(s);</code>", "<code>cin.line(s);</code>"], spravna: 0, vysvetlenie: "cin >> číta len po medzeru." },
    { typ: "volba", lekcia: "cpp-2-5", otazka: "Ktorá knižnica obsahuje <code>sqrt</code> a <code>pow</code>?", moznosti: ["<code>&lt;cmath&gt;</code>", "<code>&lt;iostream&gt;</code>", "<code>&lt;string&gt;</code>", "<code>&lt;math.py&gt;</code>"], spravna: 0, vysvetlenie: "cmath = matematické funkcie." },
  ];

  K.registrujModul("cpp", { cislo: 2, nazov: "Premenné a typy", popis: "Premenné s typom, int, double, char, bool, string, delenie a pretypovanie, texty a matematika.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("cpp", [
    { kat: "Znaky", znak: ";", nazov: "Bodkočiarka", popis: "Koniec každého príkazu. Najčastejšia chyba, keď chýba." },
    { kat: "Znaky", znak: "{ }", nazov: "Blok", popis: "Telo funkcie, podmienky, cyklu." },
    { kat: "Znaky", znak: "#include", nazov: "Pripojenie knižnice", popis: "Pridá knižnicu, napr. <iostream>, <string>, <cmath>." },
    { kat: "Znaky", znak: "<<", nazov: "Výstup", popis: "Pošle hodnotu do cout.", priklad: 'cout << "Ahoj" << endl;' },
    { kat: "Znaky", znak: ">>", nazov: "Vstup", popis: "Načíta hodnotu z cin do premennej.", priklad: "cin >> x;" },
    { kat: "Znaky", znak: "//  /* */", nazov: "Komentár", popis: "Riadkový a viacriadkový komentár." },
    { kat: "Znaky", znak: "' '  \" \"", nazov: "Apostrofy a úvodzovky", popis: "'A' je char, \"Ahoj\" je string." },
    { kat: "Znaky", znak: "%", nazov: "Zvyšok", popis: "Zvyšok po celočíselnom delení." },
    { kat: "Kostra", znak: "int main()", nazov: "Hlavná funkcia", popis: "Tu program začína." },
    { kat: "Kostra", znak: "using namespace std;", nazov: "Menný priestor", popis: "Nemusíš písať std:: pred cout, cin, string." },
    { kat: "Kostra", znak: "return 0;", nazov: "Koniec programu", popis: "0 = program skončil bez chyby." },
    { kat: "Typy", znak: "int", nazov: "Celé číslo", popis: "Približne ±2 miliardy." },
    { kat: "Typy", znak: "long long", nazov: "Veľké celé číslo", popis: "Pre čísla nad 2 miliardy." },
    { kat: "Typy", znak: "double", nazov: "Desatinné číslo", popis: "3.14, s bodkou." },
    { kat: "Typy", znak: "char", nazov: "Znak", popis: "Jeden znak v apostrofoch." },
    { kat: "Typy", znak: "bool", nazov: "Logická hodnota", popis: "true alebo false." },
    { kat: "Typy", znak: "string", nazov: "Text", popis: "Potrebuje #include <string>." },
    { kat: "Typy", znak: "const", nazov: "Konštanta", popis: "Hodnota sa nedá zmeniť." },
    { kat: "Typy", znak: "auto", nazov: "Automatický typ", popis: "Prekladač si typ domyslí." },
    { kat: "Vstup a výstup", znak: "cout", nazov: "Výpis", popis: "Console output." },
    { kat: "Vstup a výstup", znak: "cin", nazov: "Vstup", popis: "Console input, číta po medzeru." },
    { kat: "Vstup a výstup", znak: "endl", nazov: "Nový riadok", popis: "Alebo \"\\n\"." },
    { kat: "Vstup a výstup", znak: "getline()", nazov: "Celý riadok", popis: "getline(cin, text);" },
    { kat: "Vstup a výstup", znak: "setprecision()", nazov: "Desatinné miesta", popis: "S fixed z <iomanip>.", priklad: "cout << fixed << setprecision(2) << x;" },
    { kat: "Matematika", znak: "sqrt() / pow()", nazov: "Odmocnina, mocnina", popis: "Z <cmath>." },
    { kat: "Matematika", znak: "(double)x", nazov: "Pretypovanie", popis: "Zmení typ, napr. pre presné delenie." },
  ]);
})();
