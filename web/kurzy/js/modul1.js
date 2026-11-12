/* JavaScript · Modul 1 · Premenné a typy */
(function () {
  var P = K.pom, JS = function (t) { return P.kod(t, "js"); }, TXT = P.TXT, MONO = P.MONO;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "js", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };

  var OBR_VRSTVY = '<svg viewBox="0 0 340 110" role="img" aria-label="HTML je kostra, CSS vzhľad, JavaScript správanie">' +
    [["HTML", "kostra", "#e0522b"], ["CSS", "vzhľad", "#6a3fc9"], ["JS", "správanie", "#f0c419"]].map(function (x, i) {
      return '<rect x="' + (10 + i * 112) + '" y="14" width="96" height="70" rx="12" style="fill:' + x[2] + '"/><text x="' + (58 + i * 112) + '" y="48" text-anchor="middle" font-size="18" font-weight="700" ' + MONO + ' fill="' + (i === 2 ? "#1a1a1a" : "#fff") + '">' + x[0] + '</text><text x="' + (58 + i * 112) + '" y="70" text-anchor="middle" font-size="11.5" ' + TXT + ' fill="' + (i === 2 ? "#1a1a1a" : "#fff") + '">' + x[1] + "</text>";
    }).join("") + '<text x="170" y="104" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">tlačidlo existuje (HTML) · je modré (CSS) · po kliknutí niečo urobí (JS)</text></svg>';

  var OBR_KRABICA = '<svg viewBox="0 0 340 120" role="img" aria-label="Premenná je pomenovaná krabica s hodnotou">' +
    '<path d="M70 40l40-16 40 16v56l-40 16-40-16z" style="fill:var(--surface-2);stroke:var(--accent);stroke-width:2"/><path d="M70 40l40 16 40-16M110 56v56" style="fill:none;stroke:var(--accent);stroke-width:2"/>' +
    '<text x="110" y="18" text-anchor="middle" font-size="13" font-weight="700" ' + MONO + ' style="fill:var(--hl-sel)">vek</text>' +
    '<text x="90" y="86" text-anchor="middle" font-size="16" font-weight="700" ' + MONO + ' style="fill:var(--hl-num)">15</text>' +
    '<text x="190" y="50" font-size="13" ' + MONO + '><tspan style="fill:var(--hl-kw)">let</tspan><tspan style="fill:var(--text)"> vek = </tspan><tspan style="fill:var(--hl-num)">15</tspan><tspan style="fill:var(--text)">;</tspan></text>' +
    '<text x="190" y="72" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">meno krabice: vek</text><text x="190" y="88" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">obsah: 15</text></svg>';

  var L1 = { id: "js-1-1", nazov: "Čo je JavaScript", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Jazyk, ktorý oživí web",
      text: "<p><b>JavaScript</b> (JS) je programovací jazyk, ktorý beží v každom prehliadači. Kým HTML a CSS stránku len opisujú, JavaScript vie <b>počítať, rozhodovať sa a reagovať</b> na používateľa.</p>", obr: OBR_VRSTVY,
      podrobne: "<p>Čo všetko robí JavaScript: kontroluje formuláre, mení obsah bez obnovenia stránky, robí hry, mapy, chaty, celé aplikácie (Gmail, YouTube, Figma). Cez Node.js beží aj na serveroch a cez React Native v mobilných aplikáciách.</p>",
      hlbka: "<p>JavaScript vznikol v roku 1995 za 10 dní (Brendan Eich, Netscape). S Javou nemá spoločné nič okrem mena: to bol marketingový ťah. Oficiálne sa jazyk volá ECMAScript a každý rok vychádza nová verzia (ES2015 priniesla let, const, šípkové funkcie a ďalšie).</p>" },
    { typ: "vyklad", nadpis: "Prvý príkaz: console.log",
      text: "<p><code>console.log()</code> vypíše hodnotu do <b>konzoly</b>. Je to okno pre programátora, bežný návštevník ho nevidí. V tejto aplikácii sa konzola ukazuje pod editorom.</p>" + UKAZ('console.log("Ahoj, svet!");\nconsole.log(2 + 3);', "Ahoj, svet!\n5"),
      podrobne: "<ul><li>Text píšeš v úvodzovkách (<code>\"…\"</code> alebo <code>'…'</code>).</li><li>Čísla bez úvodzoviek, JavaScript ich vypočíta.</li><li>Príkaz končí bodkočiarkou <code>;</code>. Často funguje aj bez nej, ale je dobrý zvyk ju písať.</li></ul><p>V prehliadači na počítači otvoríš konzolu klávesom F12.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>console.log(4 * 2);</code>?", moznosti: ["8", "4 * 2", "\"8\"", "Nič"], spravna: 0, vysvetlenie: "Bez úvodzoviek JavaScript výraz vypočíta." },
    { typ: "volba", otazka: "Čo vypíše <code>console.log(\"4 * 2\");</code>?", moznosti: ["4 * 2", "8", "chybu", "42"], spravna: 0, vysvetlenie: "V úvodzovkách je to text a vypíše sa presne tak." },
    { typ: "kod", zadanie: "Vypíš do konzoly text <b>Ahoj, JavaScript!</b> a na ďalšom riadku výsledok <code>7 * 6</code>.",
      karty: ["js"], start: { js: "" }, vyska: "140px",
      napoveda: '<code>console.log("Ahoj, JavaScript!");</code> a <code>console.log(7 * 6);</code>', riesenie: { js: 'console.log("Ahoj, JavaScript!");\nconsole.log(7 * 6);' },
      kontrola: function (d) {
        var l = P.log(d);
        if (!l.length) return "Konzola je prázdna. Použi console.log(…).";
        if (l[0] !== "Ahoj, JavaScript!") return "Prvý riadok má byť presne Ahoj, JavaScript! (teraz: " + l[0] + ").";
        return l[1] === "42" ? null : "Druhý riadok má byť výsledok 7 * 6, teda 42. Píš ho bez úvodzoviek.";
      }, vysvetlenie: "Tvoj prvý program v JavaScripte!" },
  ] };

  var L2 = { id: "js-1-2", nazov: "Premenné", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Krabica s menom",
      text: "<p><b>Premenná</b> je pomenované miesto v pamäti, kde si program uloží hodnotu, aby ju mohol neskôr použiť.</p>", obr: OBR_KRABICA,
      podrobne: UKAZ('let meno = "Jana";\nlet vek = 15;\nconsole.log(meno);\nconsole.log(vek + 1);', "Jana\n16") },
    { typ: "vyklad", nadpis: "let a const",
      text: P.tabulka(["Kľúčové slovo", "Hodnota sa dá zmeniť?", "Kedy"], [["<code>const</code>", "nie", "<b>predvolene</b>, väčšina premenných"], ["<code>let</code>", "áno", "keď sa hodnota mení (počítadlo, skóre)"], ["<code>var</code>", "áno", "staré, dnes nepoužívaj"]]) +
        JS('let skore = 0;\nskore = 10;      // OK\n\nconst PI = 3.14;\nPI = 3;          // chyba! const sa nedá zmeniť'),
      podrobne: "<p>Komentár začína <code>//</code> a JavaScript ho ignoruje. Pri zmene hodnoty už <code>let</code> nepíšeš, len meno premennej.</p>" },
    { typ: "volba", otazka: "Ktoré kľúčové slovo použiješ pre počítadlo bodov v hre?", moznosti: ["<code>let</code>", "<code>const</code>", "<code>var</code>", "<code>number</code>"], spravna: 0, vysvetlenie: "Skóre sa mení, preto let." },
    { typ: "vyklad", nadpis: "Ako pomenovať premennú",
      text: "<ul><li>Písmená, číslice, <code>_</code> a <code>$</code>. Nesmie začínať číslicou.</li><li>Rozlišujú sa veľké a malé písmená: <code>vek</code> a <code>Vek</code> sú dve rôzne premenné.</li><li>Viac slov sa píše <b>camelCase</b>: <code>pocetZiakov</code>, <code>celkovaCena</code>.</li><li>Nepoužívaj diakritiku a vyhradené slová (<code>let</code>, <code>if</code>…).</li></ul>",
      podrobne: "<p>Dobré meno hovorí, čo je vnútri: <code>cenaSDPH</code> je lepšie ako <code>x</code>. O pol roka budeš rád.</p>" },
    { typ: "volba", otazka: "Ktoré meno premennej je správne?", moznosti: ["<code>pocetBodov</code>", "<code>2hrac</code>", "<code>počet bodov</code>", "<code>let</code>"], spravna: 0, vysvetlenie: "camelCase, bez medzier a diakritiky, nezačína číslom." },
    { typ: "kod", zadanie: "Vytvor konštantu <code>mesto</code> s textom <b>Nitra</b> a premennú <code>teplota</code> s hodnotou <b>18</b>. Potom teplotu zvýš na <b>21</b> a vypíš obe premenné (najprv mesto, potom teplotu).",
      karty: ["js"], start: { js: "" }, vyska: "170px",
      napoveda: 'const mesto = "Nitra"; let teplota = 18; teplota = 21; console.log(mesto); console.log(teplota);', riesenie: { js: 'const mesto = "Nitra";\nlet teplota = 18;\nteplota = 21;\nconsole.log(mesto);\nconsole.log(teplota);' },
      kontrola: function (d, s) {
        if (!/const\s+mesto\s*=/.test(s.js)) return "Mesto vytvor ako const mesto = \"Nitra\";";
        if (!/let\s+teplota\s*=\s*18/.test(s.js)) return "Teplotu vytvor ako let teplota = 18;";
        if (P.js(d, "teplota") !== 21) return "Teplota má mať na konci hodnotu 21.";
        var l = P.log(d); return l[0] === "Nitra" && l[1] === "21" ? null : "Vypíš najprv mesto, potom teplotu (Nitra, 21).";
      }, vysvetlenie: "const sa nemenilo, let áno." },
  ] };

  var L3 = { id: "js-1-3", nazov: "Dátové typy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Druhy hodnôt",
      text: P.tabulka(["Typ", "Príklad", "Na čo"], [["<code>number</code>", "<code>42</code>, <code>3.14</code>, <code>-7</code>", "čísla (desatinná bodka!)"], ["<code>string</code>", "<code>\"Ahoj\"</code>, <code>'x'</code>", "text"], ["<code>boolean</code>", "<code>true</code>, <code>false</code>", "áno / nie"], ["<code>undefined</code>", "<code>undefined</code>", "premenná zatiaľ bez hodnoty"], ["<code>null</code>", "<code>null</code>", "zámerne „nič“"]]),
      podrobne: "<p>Typ zistíš operátorom <code>typeof</code>:</p>" + UKAZ('console.log(typeof 42);\nconsole.log(typeof "42");\nconsole.log(typeof true);', "number\nstring\nboolean"),
      hlbka: "<p>Ďalšie typy: <code>object</code> (objekty a polia, Modul 5), <code>bigint</code> (obrovské celé čísla) a <code>symbol</code>. Zvláštnosť: <code>typeof null</code> vráti \"object\". Je to stará chyba jazyka, ktorú už nemožno opraviť.</p>" },
    { typ: "volba", otazka: "Aký typ je <code>\"15\"</code>?", moznosti: ["string", "number", "boolean", "undefined"], spravna: 0, vysvetlenie: "Úvodzovky = text, aj keď sú v ňom číslice." },
    { typ: "volba", otazka: "Ako zapíšeš číslo tri a pol?", moznosti: ["<code>3.5</code>", "<code>3,5</code>", "<code>\"3,5\"</code>", "<code>3½</code>"], spravna: 0, vysvetlenie: "V programovaní sa používa desatinná bodka." },
    { typ: "vyklad", nadpis: "Pozor na text a číslo",
      text: "<p>Operátor <code>+</code> pri dvoch číslach sčíta, ale ak je jedna hodnota text, <b>spojí</b> ich:</p>" + UKAZ('console.log(2 + 3);\nconsole.log("2" + 3);\nconsole.log("2" * 3);', "5\n23\n6"),
      podrobne: "<p>Pri <code>*</code>, <code>-</code>, <code>/</code> JavaScript text na číslo prevedie sám, pri <code>+</code> nie. Hodnoty z formulárov sú vždy text, preto ich treba previesť: <code>Number(\"2\")</code> → 2.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>console.log(\"5\" + 5);</code>?", moznosti: ["55", "10", "chybu", "\"5\"5"], spravna: 0, vysvetlenie: "Text + číslo = spojenie textov." },
    { typ: "kod", zadanie: "Premenná <code>vstup</code> obsahuje text <code>\"7\"</code> (ako z formulára). Preveď ju na číslo cez <code>Number()</code>, ulož do premennej <code>cislo</code> a vypíš <code>cislo + 3</code>. Má vyjsť 10.",
      karty: ["js"], start: { js: 'const vstup = "7";\n' }, vyska: "160px",
      napoveda: "<code>const cislo = Number(vstup);</code> a <code>console.log(cislo + 3);</code>", riesenie: { js: 'const vstup = "7";\nconst cislo = Number(vstup);\nconsole.log(cislo + 3);' },
      kontrola: function (d) {
        if (P.js(d, "typeof cislo") !== "number") return "Premenná cislo neexistuje alebo nie je číslo. Použi Number(vstup).";
        var l = P.log(d); return l[l.length - 1] === "10" ? null : "Výsledok má byť 10, nie " + (l[l.length - 1] || "nič") + ".";
      }, vysvetlenie: "Bez Number() by vyšlo 73." },
  ] };

  var L4 = { id: "js-1-4", nazov: "Počítanie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Aritmetické operátory",
      text: P.tabulka(["Operátor", "Význam", "Príklad", "Výsledok"], [["<code>+</code>", "sčítanie", "<code>7 + 2</code>", "9"], ["<code>-</code>", "odčítanie", "<code>7 - 2</code>", "5"], ["<code>*</code>", "násobenie", "<code>7 * 2</code>", "14"], ["<code>/</code>", "delenie", "<code>7 / 2</code>", "3.5"], ["<code>%</code>", "zvyšok po delení", "<code>7 % 2</code>", "1"], ["<code>**</code>", "mocnina", "<code>7 ** 2</code>", "49"]]),
      podrobne: "<p>Platí poradie ako v matematike: najprv <code>**</code>, potom <code>* / %</code>, nakoniec <code>+ -</code>. Zátvorky menia poradie: <code>(2 + 3) * 4</code> = 20.</p><p><code>%</code> je užitočnejší, než vyzerá: <code>cislo % 2 === 0</code> zistí, či je číslo párne.</p>" },
    { typ: "volba", otazka: "Koľko je <code>10 % 3</code>?", moznosti: ["1", "3", "3.33", "0"], spravna: 0, vysvetlenie: "10 : 3 = 3, zvyšok 1." },
    { typ: "vyklad", nadpis: "Skrátené zápisy",
      text: JS("let body = 10;\nbody = body + 5;  // 15\nbody += 5;        // 20 (to isté, kratšie)\nbody -= 2;        // 18\nbody *= 2;        // 36\nbody++;           // 37 (o jedna viac)\nbody--;           // 36 (o jedna menej)"),
      podrobne: "<p><code>++</code> a <code>--</code> sa používajú najmä v cykloch a počítadlách.</p>" },
    { typ: "vyklad", nadpis: "Objekt Math",
      text: P.tabulka(["Zápis", "Výsledok"], [["<code>Math.round(4.6)</code>", "5 (zaokrúhli)"], ["<code>Math.floor(4.6)</code>", "4 (nadol)"], ["<code>Math.ceil(4.1)</code>", "5 (nahor)"], ["<code>Math.max(3, 9, 2)</code>", "9"], ["<code>Math.sqrt(16)</code>", "4"], ["<code>Math.random()</code>", "náhodné číslo od 0 do 1"]]),
      podrobne: "<p>Náhodné celé číslo od 1 do 6 (kocka): <code>Math.floor(Math.random() * 6) + 1</code>. Na peniaze s centami: <code>(cena).toFixed(2)</code> vráti text s dvoma desatinnými miestami.</p>" },
    { typ: "doplnenie", otazka: "Zvýš skóre o 10:", sablona: "let skore = 0;\nskore [[0]] 10;", zetony: ["+=", "=+", "++", "=="], spravne: ["+="], vysvetlenie: "skore += 10 je to isté ako skore = skore + 10." },
    { typ: "kod", zadanie: "Nákup: <code>cena</code> je 4.5 € a <code>kusov</code> je 3. Vypočítaj <code>spolu</code> (cena × kusov) a vypíš ho zaokrúhlený na celé eurá cez <code>Math.round()</code>.",
      karty: ["js"], start: { js: "const cena = 4.5;\nconst kusov = 3;\n" }, vyska: "160px",
      napoveda: "<code>const spolu = cena * kusov;</code> a <code>console.log(Math.round(spolu));</code>", riesenie: { js: "const cena = 4.5;\nconst kusov = 3;\nconst spolu = cena * kusov;\nconsole.log(Math.round(spolu));" },
      kontrola: function (d) {
        if (P.js(d, "spolu") !== 13.5) return "Premenná spolu má byť cena * kusov (13.5).";
        var l = P.log(d); return l[l.length - 1] === "14" ? null : "Vypíš Math.round(spolu), malo by vyjsť 14.";
      }, vysvetlenie: "13,5 sa zaokrúhli na 14." },
  ] };

  var L5 = { id: "js-1-5", nazov: "Práca s textom", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Šablónové reťazce",
      text: "<p>Najpohodlnejší spôsob, ako vložiť premenné do textu, sú <b>spätné apostrofy</b> <code>`…`</code> a <code>${…}</code>:</p>" + UKAZ('const meno = "Jana";\nconst vek = 15;\nconsole.log(`Ahoj ${meno}, o rok budeš mať ${vek + 1}.`);', "Ahoj Jana, o rok budeš mať 16."),
      podrobne: "<p>Starší spôsob je spájanie cez <code>+</code>: <code>\"Ahoj \" + meno + \"!\"</code>. Funguje, ale ľahko zabudneš medzeru. Spätný apostrof nájdeš na slovenskej klávesnici cez pravý Alt + 7, v tejto aplikácii ho napíš z klávesnice telefónu.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>console.log(`2 + 2 = ${2 + 2}`);</code>?", moznosti: ["2 + 2 = 4", "2 + 2 = 2 + 2", "4 = 4", "${2 + 2}"], spravna: 0, vysvetlenie: "Vnútri ${ } sa výraz vypočíta." },
    { typ: "vyklad", nadpis: "Vlastnosti a metódy textu",
      text: P.tabulka(["Zápis", "Výsledok pre \"Ahoj svet\""], [["<code>.length</code>", "9 (počet znakov)"], ["<code>.toUpperCase()</code>", "\"AHOJ SVET\""], ["<code>.toLowerCase()</code>", "\"ahoj svet\""], ["<code>.includes(\"svet\")</code>", "true"], ["<code>.slice(0, 4)</code>", "\"Ahoj\""], ["<code>.replace(\"svet\", \"Slovensko\")</code>", "\"Ahoj Slovensko\""], ["<code>.trim()</code>", "odstráni medzery na začiatku a konci"]]),
      podrobne: "<p>Metóda je funkcia, ktorá patrí hodnote. Volá sa cez bodku a zátvorky. Pôvodný text sa nemení, metóda vráti nový. Znaky sú číslované od <b>nuly</b>: v \"Ahoj\" je A na pozícii 0.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>\"Bratislava\".length</code>?", moznosti: ["10", "9", "11", "\"Bratislava\""], spravna: 0, vysvetlenie: "B-r-a-t-i-s-l-a-v-a = 10 znakov." },
    { typ: "doplnenie", otazka: "Zmeň meno na veľké písmená:", sablona: 'const meno = "jana";\nconsole.log(meno.[[0]]());', zetony: ["toUpperCase", "upper", "toUpper", "length"], spravne: ["toUpperCase"], vysvetlenie: "toUpperCase() = všetko veľkými." },
    { typ: "kod", zadanie: "Z premenných <code>meno</code> a <code>body</code> vypíš pomocou šablónového reťazca presne: <b>JANA má 42 bodov.</b> (meno veľkými písmenami).",
      karty: ["js"], start: { js: 'const meno = "Jana";\nconst body = 42;\n' }, vyska: "150px",
      napoveda: "console.log(`${meno.toUpperCase()} má ${body} bodov.`);", riesenie: { js: 'const meno = "Jana";\nconst body = 42;\nconsole.log(`${meno.toUpperCase()} má ${body} bodov.`);' },
      kontrola: function (d, s) {
        var l = P.log(d); if (l[l.length - 1] !== "JANA má 42 bodov.") return "Výpis má byť presne: JANA má 42 bodov. (teraz: " + (l[l.length - 1] || "nič") + ")";
        return /\$\{/.test(s.js) ? null : "Použi šablónový reťazec s ${…}.";
      }, vysvetlenie: "Šablóny a metódy spolu." },
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li><code>console.log()</code> a komentáre <code>//</code>.</li><li><code>let</code>, <code>const</code>, pomenovanie premenných.</li><li>Typy: number, string, boolean, undefined, null; <code>typeof</code>, <code>Number()</code>.</li><li>Operátory <code>+ - * / % **</code>, <code>+=</code>, <code>++</code>, <code>Math</code>.</li><li>Šablónové reťazce a metódy textu.</li></ul>", tip: "Teraz test. Potom Modul 2: program sa naučí rozhodovať." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "js-1-1", otazka: "Kde sa zobrazí výpis z <code>console.log</code>?", moznosti: ["V konzole pre programátora", "Na stránke pre návštevníka", "V adrese stránky", "V title"], spravna: 0, vysvetlenie: "Konzola je nástroj programátora." },
    { typ: "volba", lekcia: "js-1-2", otazka: "Čo sa stane?", kod: "const x = 5;\nx = 6;", moznosti: ["Chyba: const sa nedá zmeniť", "x bude 6", "x bude 11", "Nič"], spravna: 0, vysvetlenie: "const = konštanta." },
    { typ: "volba", lekcia: "js-1-2", otazka: "Sú <code>skore</code> a <code>Skore</code> tá istá premenná?", moznosti: ["Nie, záleží na veľkosti písmen", "Áno", "Len v prehliadači Chrome", "Áno, ak sú čísla"], spravna: 0, vysvetlenie: "JavaScript rozlišuje veľké a malé písmená." },
    { typ: "volba", lekcia: "js-1-3", otazka: "Čo vráti <code>typeof false</code>?", moznosti: ["\"boolean\"", "\"false\"", "\"string\"", "\"number\""], spravna: 0, vysvetlenie: "true a false sú typu boolean." },
    { typ: "volba", lekcia: "js-1-3", otazka: "Čo vypíše <code>console.log(\"3\" + 4);</code>?", moznosti: ["34", "7", "chybu", "3 + 4"], spravna: 0, vysvetlenie: "Text + číslo = spojenie." },
    { typ: "volba", lekcia: "js-1-4", otazka: "Ako zistíš, či je číslo <code>n</code> párne?", moznosti: ["<code>n % 2 === 0</code>", "<code>n / 2</code>", "<code>n ** 2</code>", "<code>n.even</code>"], spravna: 0, vysvetlenie: "Párne číslo nemá zvyšok po delení dvoma." },
    { typ: "doplnenie", lekcia: "js-1-4", otazka: "Zaokrúhli nadol:", sablona: "Math.[[0]](7.9)  // 7", zetony: ["floor", "round", "ceil", "down"], spravne: ["floor"], vysvetlenie: "floor = podlaha, zaokrúhli nadol." },
    { typ: "volba", lekcia: "js-1-4", otazka: "Aká bude hodnota <code>a</code>?", kod: "let a = 5;\na += 3;\na++;", moznosti: ["9", "8", "6", "53"], spravna: 0, vysvetlenie: "5 + 3 = 8, potom o jedna viac = 9." },
    { typ: "volba", lekcia: "js-1-5", otazka: "Čo vráti <code>\"Ahoj\".slice(1, 3)</code>?", moznosti: ["\"ho\"", "\"Ah\"", "\"hoj\"", "\"Aho\""], spravna: 0, vysvetlenie: "Od indexu 1 (h) po index 3 bez neho: h, o." },
    { typ: "volba", lekcia: "js-1-5", otazka: "Ktorý zápis vloží premennú do textu?", moznosti: ["<code>`Ahoj ${meno}`</code>", "<code>\"Ahoj ${meno}\"</code>", "<code>'Ahoj {meno}'</code>", "<code>Ahoj + meno</code>"], spravna: 0, vysvetlenie: "${} funguje len v spätných apostrofoch." },
  ];

  K.registrujModul("js", { cislo: 1, nazov: "Premenné a typy", popis: "Prvý program, premenné let a const, dátové typy, počítanie a práca s textom.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
