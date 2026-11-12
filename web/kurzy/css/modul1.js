/* CSS · Modul 1 · Pravidlá a selektory */
(function () {
  var P = K.pom, KOD = function (t) { return P.kod(t, "css"); }, HTML = function (t) { return P.kod(t, "html"); }, TXT = P.TXT, MONO = P.MONO;

  var OBR_PRAVIDLO = '<svg viewBox="0 0 340 130" role="img" aria-label="Pravidlo CSS: selektor, zložené zátvorky, vlastnosť, dvojbodka, hodnota a bodkočiarka">' +
    '<rect x="4" y="34" width="332" height="44" rx="10" style="fill:var(--code-bg)"/>' +
    '<text x="170" y="62" text-anchor="middle" font-size="15" ' + MONO + '><tspan style="fill:var(--hl-sel)">h1</tspan><tspan style="fill:var(--code-muted)"> { </tspan><tspan style="fill:var(--hl-attr)">color</tspan><tspan style="fill:var(--code-muted)">: </tspan><tspan style="fill:var(--hl-str)">red</tspan><tspan style="fill:var(--code-muted)">; }</tspan></text>' +
    '<path d="M78 84v8M148 84v8M206 84v8M248 84v8" style="stroke:var(--accent);stroke-width:2"/>' +
    [[78, "selektor", "čo"], [148, "vlastnosť", "akú vec"], [206, "hodnota", "na čo"], [262, "; koniec", ""]].map(function (x) {
      return '<text x="' + x[0] + '" y="108" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">' + x[1] + '</text><text x="' + x[0] + '" y="122" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">' + x[2] + "</text>";
    }).join("") +
    '<text x="170" y="22" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--hl-sel)">„Nadpisy h1 nech majú červenú farbu.“</text></svg>';

  var OBR_SELEKTORY = '<svg viewBox="0 0 340 150" role="img" aria-label="Selektor značky zasiahne všetky odseky, trieda len prvky s class, id len jeden prvok">' +
    [["p", "všetky &lt;p&gt;", [1, 1, 1, 1]], [".dolezite", "prvky s class=\"dolezite\"", [0, 1, 0, 1]], ["#hlavny", "jediný prvok s id", [0, 0, 1, 0]]].map(function (r, j) {
      var y = 8 + j * 48, s = '<text x="8" y="' + (y + 22) + '" font-size="13" font-weight="700" ' + MONO + ' style="fill:var(--hl-sel)">' + r[0] + '</text><text x="8" y="' + (y + 38) + '" font-size="9.5" ' + TXT + ' style="fill:var(--muted)">' + r[1] + "</text>";
      for (var i = 0; i < 4; i++) s += '<rect x="' + (156 + i * 46) + '" y="' + (y + 8) + '" width="38" height="30" rx="6" style="fill:' + (r[2][i] ? "var(--accent)" : "var(--surface-2)") + ';stroke:var(--line)"/>';
      return s;
    }).join("") + "</svg>";

  var L1 = { id: "css-1-1", nazov: "Čo je CSS", minut: 6, kroky: [
    { typ: "vyklad", nadpis: "Jazyk vzhľadu",
      text: "<p><b>CSS</b> (Cascading Style Sheets = kaskádové štýly) určuje, ako stránka <b>vyzerá</b>: farby, písmo, medzery, rozloženie aj animácie. HTML hovorí <i>čo</i> na stránke je, CSS <i>ako</i> to vyzerá.</p>" +
        P.ziva("<h1>Pekáreň Klas</h1><p>Čerstvý chlieb každé ráno.</p>", "h1 { color: #b5541c; font-family: Georgia, serif; }\np { background: #fff4e0; padding: 8px; border-radius: 8px; }", 130),
      podrobne: "<p>Rovnaké HTML môže vyzerať úplne inak, stačí vymeniť CSS. Preto sa obsah a vzhľad držia oddelene: dizajnér mení CSS a obsah ostáva.</p>",
      hlbka: "<p>CSS vzniklo v roku 1996. Predtým sa vzhľad písal priamo do HTML (značky <code>&lt;font color&gt;</code>, <code>&lt;center&gt;</code>), čo bolo neprehľadné a každú zmenu bolo treba robiť na stovkách miest. Dnes je aktuálne „CSS3“, ktoré sa vyvíja po moduloch: Flexbox, Grid, animácie…</p>" },
    { typ: "vyklad", nadpis: "Kam sa CSS píše",
      text: "<p>Sú tri spôsoby:</p>" + P.tabulka(["Spôsob", "Zápis", "Kedy"], [["Externý súbor", "<code>&lt;link rel=\"stylesheet\" href=\"styl.css\"&gt;</code> v head", "<b>takmer vždy</b>: jeden súbor pre celý web"], ["Značka style", "<code>&lt;style&gt; … &lt;/style&gt;</code> v head", "malé stránky, pokusy"], ["Atribút style", "<code>&lt;p style=\"color: red\"&gt;</code>", "výnimočne, len pre jeden prvok"]]),
      podrobne: "<p>Externý súbor má veľkú výhodu: prehliadač si ho zapamätá (cache) a pri ďalšej stránke webu ho už nesťahuje. A keď zmeníš farbu v jednom súbore, zmení sa na všetkých stránkach.</p><p>V tejto aplikácii píšeš CSS do karty <b>CSS</b> nad editorom. Funguje to ako externý súbor.</p>" },
    { typ: "volba", otazka: "Čo určuje CSS?", moznosti: ["Vzhľad stránky", "Obsah stránky", "Správanie po kliknutí", "Adresu stránky"], spravna: 0, vysvetlenie: "HTML = obsah, CSS = vzhľad, JavaScript = správanie." },
    { typ: "volba", otazka: "Ako pripojíš súbor <code>styl.css</code> k stránke?", moznosti: ["<code>&lt;link rel=\"stylesheet\" href=\"styl.css\"&gt;</code>", "<code>&lt;css src=\"styl.css\"&gt;</code>", "<code>&lt;style href=\"styl.css\"&gt;</code>", "<code>&lt;script src=\"styl.css\"&gt;</code>"], spravna: 0,
      vysvetlenie: "Externé štýly pripája značka link v head.", preco: [null, "Značka css neexistuje.", "style obsahuje CSS priamo, href nepozná.", "script je na JavaScript."] },
    { typ: "kod", zadanie: "Prepni sa na kartu <b>CSS</b> a napíš pravidlo, ktoré nadpisu <code>h1</code> nastaví farbu <code>green</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: "<h1>Moja záhrada</h1>\n<p>Rajčiny, uhorky a bylinky.</p>", css: "" }, vyska: "150px",
      napoveda: "<code>h1 { color: green; }</code>", riesenie: { css: "h1 {\n  color: green;\n}" },
      kontrola: function (d) { return P.rovnakaFarba(d, "h1", "color", "green") ? null : "Nadpis ešte nie je zelený. Napíš h1 { color: green; }"; },
      vysvetlenie: "Prvé CSS pravidlo je hotové!" },
  ] };

  var L2 = { id: "css-1-2", nazov: "Pravidlo CSS", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Anatómia pravidla",
      text: "<p>CSS sa skladá z <b>pravidiel</b>. Každé hovorí: <i>týmto prvkom nastav tieto vlastnosti</i>.</p>", obr: OBR_PRAVIDLO,
      podrobne: "<ul><li><b>Selektor</b> vyberá prvky, ktorých sa pravidlo týka.</li><li>V <b>zložených zátvorkách</b> <code>{ }</code> sú deklarácie.</li><li><b>Deklarácia</b> = vlastnosť, dvojbodka, hodnota, bodkočiarka.</li><li>Deklarácií môže byť ľubovoľne veľa, každá na samostatnom riadku.</li></ul>" + KOD("p {\n  color: navy;\n  font-size: 18px;\n  line-height: 1.6;\n}") },
    { typ: "doplnenie", otazka: "Doplň znaky do pravidla:", sablona: "p [[0]]\n  color[[1]] blue[[2]]\n[[3]]", zetony: ["{", ":", ";", "}", "=", "(", ")"], spravne: ["{", ":", ";", "}"], vysvetlenie: "Selektor { vlastnosť: hodnota; }" },
    { typ: "volba", otazka: "Čo je v tomto pravidle zle?", kod: "h2 {\n  color = red;\n}", moznosti: ["Namiesto = má byť dvojbodka :", "Chýbajú úvodzovky okolo red", "h2 nemôže mať farbu", "Nič"], spravna: 0, vysvetlenie: "V CSS sa vlastnosť od hodnoty oddeľuje dvojbodkou." },
    { typ: "vyklad", nadpis: "Komentáre a chyby",
      text: "<p>Komentár v CSS je medzi <code>/*</code> a <code>*/</code>. Prehliadač ho ignoruje:</p>" + KOD("/* Farby hlavičky */\nheader {\n  background: #222;\n}"),
      podrobne: "<p>CSS je veľmi tolerantné: keď niečomu nerozumie (preklep vo vlastnosti, chýbajúca bodkočiarka), <b>potichu to preskočí</b> a pokračuje ďalej. Žiadna chybová hláška. Preto keď sa štýl neprejaví, hľadaj preklep.</p><p>Chýbajúca bodkočiarka pokazí aj nasledujúci riadok, lebo prehliadač ich prečíta ako jednu hodnotu.</p>" },
    { typ: "volba", otazka: "Prečo sa neprejaví veľkosť písma?", kod: "p {\n  color: red\n  font-size: 20px;\n}", moznosti: ["Za red chýba bodkočiarka", "font-size neexistuje", "20px je príliš veľa", "Červená a veľkosť sa nedajú kombinovať"], spravna: 0, vysvetlenie: "Bez ; prehliadač číta „red font-size: 20px“ ako jednu chybnú hodnotu a preskočí obe." },
    { typ: "kod", zadanie: "Odsekom <code>p</code> nastav farbu <code>navy</code> a veľkosť písma <code>18px</code> (<code>font-size</code>).",
      karty: ["html", "css"], aktivna: "css", start: { html: "<h1>Recept</h1>\n<p>Zmiešaj múku s mliekom.</p>", css: "p {\n  \n}" }, vyska: "170px",
      napoveda: "Do zátvoriek napíš <code>color: navy;</code> a pod to <code>font-size: 18px;</code>", riesenie: { css: "p {\n  color: navy;\n  font-size: 18px;\n}" },
      kontrola: function (d) {
        if (!P.rovnakaFarba(d, "p", "color", "navy")) return "Odsek ešte nemá farbu navy.";
        return P.styl(d, "p", "font-size") === "18px" ? null : "Odsek ešte nemá font-size: 18px. Nezabudni na bodkočiarky.";
      }, vysvetlenie: "Jedno pravidlo, dve deklarácie." },
  ] };

  var L3 = { id: "css-1-3", nazov: "Selektory: značka, trieda, id", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Tri základné selektory",
      text: "<p>Selektor určuje, ktoré prvky pravidlo zasiahne:</p>", obr: OBR_SELEKTORY,
      podrobne: P.tabulka(["Selektor", "Zápis", "Zasiahne"], [["značka", "<code>p</code>", "všetky odseky"], ["trieda (class)", "<code>.dolezite</code>", "prvky s <code>class=\"dolezite\"</code>"], ["id", "<code>#hlavny</code>", "prvok s <code>id=\"hlavny\"</code>"]]) },
    { typ: "vyklad", nadpis: "Triedy sú najdôležitejšie",
      text: "<p>Triedu môžeš dať ľubovoľne veľa prvkom a jeden prvok môže mať viac tried (oddelených medzerou):</p>" +
        P.ziva('<p class="tip">Tip: pi vodu.</p>\n<p>Bežný text.</p>\n<p class="tip velky">Veľký tip!</p>', ".tip {\n  background: #e6f4ea;\n  color: #1e6b34;\n}\n.velky {\n  font-size: 22px;\n}", 150, true),
      podrobne: "<p>V HTML je trieda bez bodky (<code>class=\"tip\"</code>), v CSS s bodkou (<code>.tip</code>). Názvy tried píš malými písmenami bez diakritiky, slová oddeľ pomlčkou: <code>.hlavne-menu</code>.</p>",
      hlbka: "<p>Prečo nie id? Id môže byť na stránke len raz a má veľmi vysokú „silu“ (špecifickosť), takže sa ťažko prepisuje. Profesionáli štylujú takmer výhradne triedami. Id sa používa na kotvy a v JavaScripte.</p>" },
    { typ: "volba", otazka: "Ako v CSS vyberieš prvky s <code>class=\"cena\"</code>?", moznosti: ["<code>.cena</code>", "<code>#cena</code>", "<code>cena</code>", "<code>class=cena</code>"], spravna: 0,
      vysvetlenie: "Trieda = bodka.", preco: [null, "Mriežka # vyberá id, nie triedu.", "Bez bodky by to hľadalo značku <cena>.", null] },
    { typ: "volba", otazka: "Koľko prvkov môže mať rovnaké id?", moznosti: ["Len jeden", "Neobmedzene", "Najviac tri", "Len nadpisy"], spravna: 0, vysvetlenie: "id je jedinečné. Na viac prvkov použi triedu." },
    { typ: "vyklad", nadpis: "Skupina selektorov",
      text: "<p>Ak má viac selektorov dostať rovnaký štýl, oddeľ ich čiarkou:</p>" + KOD("h1, h2, h3 {\n  font-family: Georgia, serif;\n}"),
      podrobne: "<p>Ušetríš opakovanie. Ešte jeden špeciálny selektor: hviezdička <code>*</code> vyberie <b>všetky</b> prvky. Používa sa napríklad na <code>* { box-sizing: border-box; }</code>, ktoré spoznáš v module Box model.</p>" },
    { typ: "kod", zadanie: "Prvky s triedou <code>akcia</code> nech majú farbu <code>red</code>. Prvok s id <code>novinka</code> nech má pozadie <code>yellow</code> (<code>background</code>).",
      karty: ["html", "css"], aktivna: "css", start: { html: '<p class="akcia">Zľava 20 %</p>\n<p>Bežná cena</p>\n<p class="akcia">2 + 1 zadarmo</p>\n<p id="novinka">Nový chlieb!</p>', css: "" }, vyska: "190px",
      napoveda: "<code>.akcia { color: red; }</code> a <code>#novinka { background: yellow; }</code>", riesenie: { css: ".akcia {\n  color: red;\n}\n#novinka {\n  background: yellow;\n}" },
      kontrola: function (d) {
        var a = d.querySelectorAll(".akcia"); for (var i = 0; i < a.length; i++) if (!P.rovnakaFarba(d, a[i], "color", "red")) return "Nie všetky prvky .akcia sú červené.";
        if (P.rovnakaFarba(d, d.querySelectorAll("p")[1], "color", "red")) return "Bežný odsek nemá byť červený. Použi selektor triedy .akcia, nie p.";
        return P.rovnakaFarba(d, "#novinka", "background-color", "yellow") ? null : "#novinka ešte nemá žlté pozadie.";
      }, vysvetlenie: "Trieda zasiahla dva prvky, id len jeden." },
  ] };

  var L4 = { id: "css-1-4", nazov: "Potomkovia a stavy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Prvok vnútri prvku",
      text: "<p>Selektory spojené <b>medzerou</b> vyberajú prvky vnútri iných prvkov (potomkov):</p>" +
        P.ziva('<nav><a href="#">Domov</a> <a href="#">Kontakt</a></nav>\n<p>Pozri aj <a href="#">cenník</a>.</p>', "nav a {\n  color: white;\n  background: #2f5bea;\n  padding: 4px 10px;\n  text-decoration: none;\n}", 100, true),
      podrobne: "<p><code>nav a</code> čítaj sprava: „odkazy, ktoré sú niekde vnútri nav“. Odkaz v odseku zostal obyčajný. Takto sa štylujú menu, karty, pätičky…</p><p>Prísnejšia verzia je <code>nav &gt; a</code>: len <b>priame</b> deti, nie vnúčatá.</p>" },
    { typ: "volba", otazka: "Ktoré prvky vyberie <code>footer p</code>?", moznosti: ["Odseky vnútri footer", "Všetky odseky a všetky footer", "Footer vnútri odseku", "Prvý odsek za footer"], spravna: 0, vysvetlenie: "Medzera = „vnútri“. Čiarka by znamenala „aj“." },
    { typ: "vyklad", nadpis: "Pseudotriedy: stav prvku",
      text: "<p>Za dvojbodkou píšeš <b>stav</b> alebo pozíciu prvku:</p>" + P.tabulka(["Pseudotrieda", "Kedy platí"], [["<code>:hover</code>", "myš je nad prvkom"], ["<code>:focus</code>", "prvok je vybratý (pole, do ktorého píšeš)"], ["<code>:active</code>", "práve ho stláčaš"], ["<code>:first-child</code>", "je prvý v rodičovi"], ["<code>:last-child</code>", "je posledný"], ["<code>:nth-child(2n)</code>", "každý párny (napr. riadky tabuľky)"]]) +
        KOD("a:hover {\n  color: red;\n}\ntr:nth-child(2n) {\n  background: #f2f2f2;\n}"),
      podrobne: "<p>Na mobile <code>:hover</code> nefunguje (nemáš myš), preto dôležité veci na ňom nestavaj. <code>:focus</code> je dôležitý pre ovládanie klávesnicou: nikdy neodstraňuj obrys vybratého prvku bez náhrady.</p>" },
    { typ: "doplnenie", otazka: "Zafarbi každý párny riadok tabuľky:", sablona: "tr[[0]]([[1]]) {\n  background: #eee;\n}", zetony: [":nth-child", "2n", ":hover", "::child", "every"], spravne: [":nth-child", "2n"], vysvetlenie: ":nth-child(2n) = 2., 4., 6. … prvok. Funguje aj :nth-child(even)." },
    { typ: "kod", zadanie: "Odkazom vnútri <code>nav</code> nastav farbu <code>white</code>. Pri prejdení myšou (<code>:hover</code>) nech je ich farba <code>yellow</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<nav>\n  <a href="#">Domov</a>\n  <a href="#">Galéria</a>\n</nav>\n<p>Pozri <a href="#">mapu</a>.</p>', css: "nav {\n  background: #333;\n  padding: 10px;\n}\n" }, vyska: "230px",
      napoveda: "<code>nav a { color: white; }</code> a <code>nav a:hover { color: yellow; }</code>", riesenie: { css: "nav {\n  background: #333;\n  padding: 10px;\n}\nnav a {\n  color: white;\n}\nnav a:hover {\n  color: yellow;\n}" },
      kontrola: function (d, s) {
        if (!P.rovnakaFarba(d, "nav a", "color", "white")) return "Odkazy v nav ešte nie sú biele.";
        if (P.rovnakaFarba(d, "p a", "color", "white")) return "Odkaz v odseku nemá byť biely. Použi selektor nav a.";
        return /a:hover\s*\{[^}]*color\s*:\s*yellow/i.test(s.css) ? null : "Chýba pravidlo nav a:hover s color: yellow.";
      }, vysvetlenie: "Na počítači by sa odkaz pri prejdení myšou zafarbil na žlto." },
  ] };

  var L5 = { id: "css-1-5", nazov: "Kaskáda a dedičnosť", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Keď sa pravidlá bijú",
      text: "<p>Čo ak dve pravidlá nastavia tomu istému prvku inú farbu? Rozhodne <b>kaskáda</b> (preto „Cascading“ Style Sheets):</p><ol><li><b>Špecifickosť:</b> presnejší selektor vyhráva.</li><li><b>Poradie:</b> pri rovnakej presnosti vyhráva pravidlo, ktoré je <b>neskôr</b>.</li></ol>" +
        P.ziva('<p class="pozor">Ktorá farba?</p>', "p { color: blue; }\n.pozor { color: red; }\np { color: green; }", 60),
      podrobne: "<p>Výsledok je červený: <code>.pozor</code> je trieda, a tá je presnejšia ako značka <code>p</code>, hoci zelené pravidlo je až za ňou.</p>" + P.tabulka(["Selektor", "Sila"], [["<code>p</code> (značka)", "slabá"], ["<code>.trieda</code>, <code>:hover</code>", "stredná"], ["<code>#id</code>", "silná"], ["<code>style=\"…\"</code> v HTML", "najsilnejšia"]]),
      hlbka: "<p>Špecifickosť sa počíta ako trojica (id, triedy, značky). <code>nav a</code> = (0,0,2), <code>.menu a</code> = (0,1,1), <code>#hlavny .menu a</code> = (1,1,1). Porovnáva sa zľava. Existuje aj <code>!important</code>, ktoré prebije všetko, ale robí z CSS chaos. Používaj ho len ako poslednú možnosť.</p>" },
    { typ: "volba", otazka: "Akú farbu bude mať nadpis?", kod: "h1 { color: blue; }\nh1 { color: orange; }", moznosti: ["oranžovú", "modrú", "zmiešanú", "čiernu"], spravna: 0, vysvetlenie: "Rovnaká presnosť, vyhráva neskoršie pravidlo." },
    { typ: "volba", otazka: "Akú farbu bude mať <code>&lt;p id=\"x\" class=\"y\"&gt;</code>?", kod: "#x { color: red; }\n.y { color: green; }\np { color: blue; }", moznosti: ["červenú (#x)", "zelenú (.y)", "modrú (p)", "zelenú, lebo je v strede"], spravna: 0, vysvetlenie: "id je najpresnejší selektor." },
    { typ: "vyklad", nadpis: "Dedičnosť",
      text: "<p>Niektoré vlastnosti sa <b>dedia</b> z rodiča na všetky prvky vnútri. Typicky vlastnosti textu: <code>color</code>, <code>font-family</code>, <code>font-size</code>, <code>line-height</code>.</p>" + KOD("body {\n  font-family: Arial, sans-serif;\n  color: #333;\n}"),
      podrobne: "<p>Preto stačí písmo nastaviť raz na <code>body</code> a zdedia ho všetky odseky, nadpisy aj zoznamy. Naopak <code>background</code>, <code>border</code>, <code>padding</code> či <code>width</code> sa nededia. Keby sa dedil rámik, mal by ho každý prvok vnútri.</p>" },
    { typ: "volba", otazka: "Ktorá vlastnosť sa dedí z body na odseky?", moznosti: ["<code>font-family</code>", "<code>border</code>", "<code>padding</code>", "<code>background</code>"], spravna: 0, vysvetlenie: "Vlastnosti textu sa dedia, rámiky a medzery nie." },
    { typ: "kod", zadanie: "Nastav <code>body</code> písmo <code>Georgia, serif</code> (<code>font-family</code>) a farbu <code>#333</code>. Potom triede <code>.upozornenie</code> daj farbu <code>red</code>, ktorá prebije farbu z body.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<h1>Oznam</h1>\n<p>Knižnica bude zatvorená.</p>\n<p class="upozornenie">Vráť knihy do piatku!</p>', css: "" }, vyska: "220px",
      napoveda: "<code>body { font-family: Georgia, serif; color: #333; }</code> a <code>.upozornenie { color: red; }</code>", riesenie: { css: "body {\n  font-family: Georgia, serif;\n  color: #333;\n}\n.upozornenie {\n  color: red;\n}" },
      kontrola: function (d) {
        if (!/georgia/i.test(P.styl(d, "p", "font-family"))) return "Odseky nezdedili písmo Georgia. Nastav ho na body.";
        if (!P.rovnakaFarba(d, "h1", "color", "#333")) return "Nadpis nemá zdedenú farbu #333 z body.";
        return P.rovnakaFarba(d, ".upozornenie", "color", "red") ? null : "Upozornenie má byť červené.";
      }, vysvetlenie: "Písmo zdedili všetky prvky a trieda prebila zdedenú farbu." },
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li>Pravidlo: <code>selektor { vlastnosť: hodnota; }</code></li><li>Selektory: <code>p</code>, <code>.trieda</code>, <code>#id</code>, <code>a, b</code>, <code>nav a</code>, <code>a:hover</code></li><li>Kaskáda: presnejší vyhráva, pri zhode neskorší.</li><li>Text sa dedí, rámiky a medzery nie.</li></ul>", tip: "Teraz test. Potom Modul 2: farby a písmo." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "css-1-1", otazka: "Kam najčastejšie píšeš CSS na skutočnom webe?", moznosti: ["Do externého súboru pripojeného cez link", "Do atribútu style každého prvku", "Do title", "Do JavaScriptu"], spravna: 0, vysvetlenie: "Jeden súbor pre celý web, prehliadač si ho zapamätá." },
    { typ: "doplnenie", lekcia: "css-1-2", otazka: "Doplň pravidlo:", sablona: "h2 [[0]] color[[1]] gray[[2]] [[3]]", zetony: ["{", ":", ";", "}", "="], spravne: ["{", ":", ";", "}"], vysvetlenie: "selektor { vlastnosť: hodnota; }" },
    { typ: "volba", lekcia: "css-1-2", otazka: "Čo urobí prehliadač s neznámou vlastnosťou <code>colr: red;</code>?", moznosti: ["Potichu ju preskočí", "Ukáže chybovú hlášku", "Nezobrazí stránku", "Opraví ju na color"], spravna: 0, vysvetlenie: "CSS chyby ignoruje. Preto hľadaj preklepy." },
    { typ: "volba", lekcia: "css-1-3", otazka: "Ktorý selektor vyberie <code>&lt;div id=\"menu\"&gt;</code>?", moznosti: ["<code>#menu</code>", "<code>.menu</code>", "<code>menu</code>", "<code>*menu</code>"], spravna: 0, vysvetlenie: "Mriežka = id." },
    { typ: "volba", lekcia: "css-1-3", otazka: "Ako zapíšeš rovnaký štýl pre h1 aj h2?", moznosti: ["<code>h1, h2 { … }</code>", "<code>h1 h2 { … }</code>", "<code>h1 + h2 { … }</code>", "<code>h1.h2 { … }</code>"], spravna: 0, vysvetlenie: "Čiarka = skupina. Medzera by znamenala h2 vnútri h1." },
    { typ: "volba", lekcia: "css-1-3", otazka: "Prvok má <code>class=\"karta tmava\"</code>. Koľko tried má?", moznosti: ["Dve", "Jednu s medzerou", "Žiadnu, je to chyba", "Tri"], spravna: 0, vysvetlenie: "Triedy sa oddeľujú medzerou: .karta a .tmava." },
    { typ: "volba", lekcia: "css-1-4", otazka: "Čo vyberie <code>.menu a</code>?", moznosti: ["Odkazy vnútri prvku s triedou menu", "Prvky s triedou menu aj všetky odkazy", "Odkaz s triedou menu", "Nič"], spravna: 0, vysvetlenie: "Medzera = potomok." },
    { typ: "volba", lekcia: "css-1-4", otazka: "Ktorá pseudotrieda platí, keď je nad prvkom myš?", moznosti: ["<code>:hover</code>", "<code>:mouse</code>", "<code>:over</code>", "<code>:focus</code>"], spravna: 0, vysvetlenie: ":hover. Na mobile nefunguje." },
    { typ: "volba", lekcia: "css-1-5", otazka: "Ktoré pravidlo vyhrá pre <code>&lt;p class=\"a\"&gt;</code>?", kod: ".a { color: red; }\np { color: blue; }", moznosti: [".a, červená", "p, modrá, lebo je neskôr", "žiadne", "obe, fialová"], spravna: 0, vysvetlenie: "Trieda je presnejšia ako značka. Poradie rozhoduje až pri zhode." },
    { typ: "volba", lekcia: "css-1-5", otazka: "Prečo stačí nastaviť písmo na <code>body</code>?", moznosti: ["Písmo sa dedí na prvky vnútri", "body je jediný prvok", "Prehliadač to vyžaduje", "Nestačí"], spravna: 0, vysvetlenie: "font-family je dedičná vlastnosť." },
    { typ: "poradie", lekcia: "css-1-2", otazka: "Zoraď pravidlo:", riadky: [".tlacidlo {", "  color: white;", "  background: green;", "}"], vysvetlenie: "Selektor, otváracia zátvorka, deklarácie, zatváracia zátvorka." },
  ];

  K.registrujModul("css", { cislo: 1, nazov: "Pravidlá a selektory", popis: "Čo je CSS, kam sa píše, ako vyzerá pravidlo, selektory, kaskáda a dedičnosť.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
