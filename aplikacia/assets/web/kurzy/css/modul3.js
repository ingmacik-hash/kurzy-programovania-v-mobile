/* CSS · Modul 3 · Box model */
(function () {
  var P = K.pom, KOD = function (t) { return P.kod(t, "css"); }, TXT = P.TXT, MONO = P.MONO;

  var OBR_BOX = '<svg viewBox="0 0 340 200" role="img" aria-label="Box model: v strede obsah, okolo neho padding, potom border a navonok margin">' +
    '<rect x="6" y="6" width="328" height="188" rx="6" style="fill:#f6c26b;opacity:.35"/>' +
    '<rect x="40" y="34" width="260" height="132" style="fill:#333"/>' +
    '<rect x="48" y="42" width="244" height="116" style="fill:#8fd19e;opacity:.6"/>' +
    '<rect x="96" y="74" width="148" height="52" style="fill:#7fb2f0"/>' +
    '<text x="170" y="98" text-anchor="middle" font-size="13" font-weight="700" ' + TXT + ' fill="#0b2545">obsah</text><text x="170" y="114" text-anchor="middle" font-size="10" ' + MONO + ' fill="#0b2545">width × height</text>' +
    '<text x="170" y="62" text-anchor="middle" font-size="11.5" font-weight="700" ' + TXT + ' fill="#14532d">padding (vnútri)</text>' +
    '<text x="44" y="30" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">border (rámik)</text>' +
    '<text x="170" y="186" text-anchor="middle" font-size="11.5" font-weight="700" ' + TXT + ' style="fill:var(--text)">margin (odstup od ostatných)</text></svg>';

  var OBR_DISPLAY = '<svg viewBox="0 0 340 120" role="img" aria-label="Blokové prvky sú pod sebou na celú šírku, riadkové idú za sebou v riadku">' +
    '<text x="8" y="14" font-size="11" font-weight="700" ' + MONO + ' style="fill:var(--hl-str)">block</text>' +
    ['div', 'p', 'h2'].map(function (t, i) { return '<rect x="8" y="' + (20 + i * 30) + '" width="150" height="24" rx="5" style="fill:var(--accent);opacity:.8"/><text x="16" y="' + (36 + i * 30) + '" font-size="11" ' + MONO + ' fill="#fff">&lt;' + t + '&gt;</text>'; }).join("") +
    '<text x="182" y="14" font-size="11" font-weight="700" ' + MONO + ' style="fill:var(--hl-str)">inline</text>' +
    '<rect x="182" y="20" width="150" height="84" rx="5" style="fill:var(--surface-2)"/>' +
    '<text x="190" y="40" font-size="11" ' + TXT + ' style="fill:var(--text)">Text s</text><rect x="230" y="28" width="34" height="17" rx="3" style="fill:var(--flame);opacity:.8"/><text x="234" y="40" font-size="10" ' + MONO + ' fill="#fff">&lt;a&gt;</text>' +
    '<text x="268" y="40" font-size="11" ' + TXT + ' style="fill:var(--text)">a</text><rect x="278" y="28" width="46" height="17" rx="3" style="fill:var(--flame);opacity:.8"/><text x="281" y="40" font-size="10" ' + MONO + ' fill="#fff">&lt;b&gt;</text>' +
    '<text x="190" y="62" font-size="11" ' + TXT + ' style="fill:var(--text)">v jednom riadku.</text></svg>';

  var L1 = { id: "css-3-1", nazov: "Každý prvok je krabica", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Box model",
      text: "<p>Prehliadač kreslí každý prvok ako <b>obdĺžnik</b> zložený zo štyroch vrstiev:</p>", obr: OBR_BOX,
      podrobne: P.tabulka(["Vrstva", "Vlastnosť", "Čo to je"], [["obsah", "<code>width</code>, <code>height</code>", "text, obrázok"], ["vnútorný okraj", "<code>padding</code>", "priestor medzi obsahom a rámikom, má farbu pozadia"], ["rámik", "<code>border</code>", "čiara okolo"], ["vonkajší okraj", "<code>margin</code>", "odstup od susedov, vždy priehľadný"]]),
      hlbka: "<p>V prehliadači stlač F12, vyber prvok a v záložke <i>Computed</i> uvidíš presne takýto obrázok s číslami. Je to najlepší nástroj na hľadanie, odkiaľ sa berie nechcená medzera.</p>" },
    { typ: "volba", otazka: "Ktorá vrstva je priestor <b>vnútri</b> rámika okolo textu?", moznosti: ["<code>padding</code>", "<code>margin</code>", "<code>border</code>", "<code>width</code>"], spravna: 0, vysvetlenie: "padding = vnútorný okraj, margin = vonkajší." },
    { typ: "volba", otazka: "Ktorá vrstva má farbu pozadia prvku?", moznosti: ["obsah aj padding", "len margin", "len obsah", "nič"], spravna: 0, vysvetlenie: "Pozadie siaha až po rámik. Margin je vždy priehľadný." },
    { typ: "vyklad", nadpis: "Vidieť rozdiel",
      text: P.ziva('<p class="a">padding 20px</p><p class="b">margin 20px</p>', "p { background: #cfe0ff; border: 2px solid #2f5bea; }\n.a { padding: 20px; }\n.b { margin: 20px; }", 170),
      podrobne: "<p>Pri <code>padding</code> rastie modrá plocha (text má okolo seba vzduch). Pri <code>margin</code> sa celá krabica odsunie od okolia, ale vnútri ostane natesno.</p>" },
    { typ: "kod", zadanie: "Prvku <code>.oznam</code> pridaj vnútorný okraj <code>16px</code> a vonkajší okraj <code>24px</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<p>Text nad oznamom.</p>\n<div class="oznam">Zajtra nie je škola!</div>\n<p>Text pod oznamom.</p>', css: ".oznam {\n  background: #fff3cd;\n  border: 1px solid #e0b400;\n  \n}" }, vyska: "210px",
      napoveda: "<code>padding: 16px;</code> a <code>margin: 24px;</code>", riesenie: { css: ".oznam {\n  background: #fff3cd;\n  border: 1px solid #e0b400;\n  padding: 16px;\n  margin: 24px;\n}" },
      kontrola: function (d) {
        if (P.px(d, ".oznam", "padding-top") !== 16 || P.px(d, ".oznam", "padding-left") !== 16) return "Oznam potrebuje padding: 16px.";
        return P.px(d, ".oznam", "margin-top") === 24 && P.px(d, ".oznam", "margin-left") === 24 ? null : "Oznam potrebuje margin: 24px.";
      }, vysvetlenie: "Oznam má vzduch vnútri aj okolo seba." },
  ] };

  var L2 = { id: "css-3-2", nazov: "Zápis okrajov", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Jedna až štyri hodnoty",
      text: "<p>Padding aj margin môžeš zapísať pre každú stranu zvlášť alebo skrátene. Strany idú <b>v smere hodinových ručičiek od vrchu</b>:</p>" +
        P.tabulka(["Zápis", "Význam"], [["<code>padding: 10px;</code>", "všetky strany 10"], ["<code>padding: 10px 20px;</code>", "hore a dole 10, vľavo a vpravo 20"], ["<code>padding: 5px 10px 15px;</code>", "hore 5, bočné 10, dole 15"], ["<code>padding: 1px 2px 3px 4px;</code>", "hore, vpravo, dole, vľavo"], ["<code>padding-top: 10px;</code>", "len hore (aj -right, -bottom, -left)"]]),
      podrobne: "<p>Pomôcka na poradie: <b>TRouBLe</b> (Top, Right, Bottom, Left). Alebo: začni hore a choď ako hodinová ručička.</p>" },
    { typ: "volba", otazka: "Čo znamená <code>margin: 0 16px;</code>?", moznosti: ["hore a dole 0, vľavo a vpravo 16px", "vľavo 0, vpravo 16px", "hore 0, dole 16px", "všade 16px"], spravna: 0, vysvetlenie: "Dve hodnoty: zvislé, vodorovné." },
    { typ: "doplnenie", otazka: "Nastav okraj len zľava:", sablona: "img {\n  [[0]]: 12px;\n}", zetony: ["margin-left", "margin-right", "left-margin", "margin"], spravne: ["margin-left"], vysvetlenie: "margin-left = vonkajší okraj vľavo." },
    { typ: "vyklad", nadpis: "Centrovanie bloku",
      text: "<p>Blok s určenou šírkou vycentruješ vodorovne pomocou <code>margin: 0 auto;</code>. Prehliadač rozdelí voľné miesto rovnako vľavo a vpravo.</p>" +
        P.ziva('<div class="obsah">Obsah stránky v strede</div>', ".obsah {\n  max-width: 220px;\n  margin: 0 auto;\n  background: #e8e0ff;\n  padding: 12px;\n}", 70),
      podrobne: "<p>Takto sú vycentrované takmer všetky weby: obsah má maximálnu šírku (napr. 1100px) a na veľkom monitore sú po stranách prázdne pásy.</p><p>Pozor: <code>auto</code> nefunguje zvislo a nefunguje na riadkových prvkoch. Text v bloku vycentruješ cez <code>text-align: center</code>.</p>" },
    { typ: "vyklad", nadpis: "Zlučovanie okrajov",
      text: "<p>Keď sú dva bloky pod sebou, ich zvislé marginy sa <b>nesčítajú</b>, použije sa väčší z nich. Volá sa to <i>margin collapsing</i>.</p>" + KOD("h2 { margin-bottom: 30px; }\np  { margin-top: 20px; }\n/* medzera medzi nimi = 30px, nie 50px */"),
      podrobne: "<p>Prekvapí to každého začiatočníka. Riešenie: medzery nastavuj len jedným smerom (napr. len margin-bottom), alebo použi <code>gap</code> vo Flexboxe a Gride. Tie sa nezlučujú.</p>" },
    { typ: "kod", zadanie: "Nastav <code>.stranka</code> maximálnu šírku <code>300px</code> (<code>max-width</code>) a vycentruj ju pomocou <code>margin: 0 auto</code>. Vnútorný okraj nech je <code>10px</code> hore a dole a <code>20px</code> po stranách.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="stranka">\n  <h1>Môj blog</h1>\n  <p>Vitaj na mojom blogu.</p>\n</div>', css: "body {\n  background: #eee;\n}\n.stranka {\n  background: white;\n  \n}" }, vyska: "230px",
      napoveda: "<code>max-width: 300px; margin: 0 auto; padding: 10px 20px;</code>", riesenie: { css: "body {\n  background: #eee;\n}\n.stranka {\n  background: white;\n  max-width: 300px;\n  margin: 0 auto;\n  padding: 10px 20px;\n}" },
      kontrola: function (d) {
        if (P.styl(d, ".stranka", "max-width") !== "300px") return "Chýba max-width: 300px.";
        var ml = P.px(d, ".stranka", "margin-left"), mr = P.px(d, ".stranka", "margin-right");
        if (!(ml > 0 && Math.abs(ml - mr) < 1)) return "Stránka nie je vycentrovaná. Použi margin: 0 auto.";
        if (P.px(d, ".stranka", "padding-top") !== 10 || P.px(d, ".stranka", "padding-left") !== 20) return "padding má byť 10px 20px.";
        return null;
      }, vysvetlenie: "Biely blok je v strede so šedými pásmi po stranách." },
  ] };

  var L3 = { id: "css-3-3", nazov: "Šírka, výška a box-sizing", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Rozmery",
      text: P.tabulka(["Vlastnosť", "Význam"], [["<code>width</code>, <code>height</code>", "šírka a výška obsahu"], ["<code>max-width</code>", "najviac taká šírka (na menšej obrazovke sa zúži)"], ["<code>min-height</code>", "aspoň taká výška (pri dlhom texte narastie)"]]),
      podrobne: "<p>Pevnú <code>height</code> radšej nepoužívaj na bloky s textom: keď sa text nezmestí, pretečie von. Lepšie je <code>min-height</code>.</p><p>Na obrázky patrí <code>max-width: 100%;</code>, aby nikdy neboli širšie ako displej.</p>" },
    { typ: "vyklad", nadpis: "Problém so šírkou",
      text: "<p>Štandardne <code>width</code> určuje len obsah. Padding a rámik sa <b>pripočítajú</b>:</p>" + KOD(".box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid;\n}\n/* skutočná šírka = 200 + 2×20 + 2×5 = 250px */") +
        "<p>Riešenie, ktoré používa takmer každý web:</p>" + KOD("* {\n  box-sizing: border-box;\n}"),
      podrobne: "<p>S <code>border-box</code> je <code>width: 200px</code> naozaj 200px aj s paddingom a rámikom. Obsah sa zúži. Oveľa ľahšie sa s tým počíta, najmä pri percentách: dva stĺpce po 50 % s paddingom sa zmestia vedľa seba.</p>" },
    { typ: "volba", otazka: "Aká je celková šírka? <code>width: 100px; padding: 10px; border: 0;</code> bez box-sizing.", moznosti: ["120px", "100px", "110px", "80px"], spravna: 0, vysvetlenie: "100 + 10 vľavo + 10 vpravo = 120." },
    { typ: "volba", otazka: "A s <code>box-sizing: border-box</code>?", moznosti: ["100px", "120px", "80px", "110px"], spravna: 0, vysvetlenie: "border-box: width zahŕňa padding aj rámik." },
    { typ: "kod", zadanie: "Pridaj pravidlo <code>* { box-sizing: border-box; }</code> a obrázku nastav <code>max-width: 100%</code>, aby nepretekal z karty.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="karta">\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'600\' height=\'200\'%3E%3Crect width=\'600\' height=\'200\' fill=\'%2349a\'/%3E%3C/svg%3E" alt="Hory">\n  <p>Výlet do hôr</p>\n</div>', css: ".karta {\n  width: 220px;\n  padding: 10px;\n  border: 2px solid #49a;\n}\n" }, vyska: "230px",
      napoveda: "<code>* { box-sizing: border-box; }</code> a <code>img { max-width: 100%; }</code>", riesenie: { css: "* {\n  box-sizing: border-box;\n}\n.karta {\n  width: 220px;\n  padding: 10px;\n  border: 2px solid #49a;\n}\nimg {\n  max-width: 100%;\n}" },
      kontrola: function (d) {
        if (P.styl(d, ".karta", "box-sizing") !== "border-box") return "Karta ešte nemá box-sizing: border-box. Napíš pravidlo pre *.";
        if (Math.round(d.querySelector(".karta").getBoundingClientRect().width) !== 220) return "Karta má byť široká presne 220px.";
        return d.querySelector("img").getBoundingClientRect().width <= 200 ? null : "Obrázok stále preteká. Pridaj img { max-width: 100%; }.";
      }, vysvetlenie: "Karta má presne 220px a obrázok sa jej prispôsobil." },
    { typ: "vyklad", nadpis: "Čo keď obsah pretečie",
      text: "<p><code>overflow</code> určuje, čo s obsahom, ktorý sa do krabice nezmestí:</p>" + P.tabulka(["Hodnota", "Výsledok"], [["<code>visible</code>", "pretečie von (predvolené)"], ["<code>hidden</code>", "oreže sa"], ["<code>auto</code>", "ukáže sa posuvník, keď treba"]]),
      podrobne: "<p><code>overflow-x: auto</code> sa hodí na široké tabuľky na mobile: tabuľka sa dá posúvať do strany a nerozbije celú stránku.</p>" },
  ] };

  var L4 = { id: "css-3-4", nazov: "Display", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Blokové a riadkové prvky",
      text: "<p>Vlastnosť <code>display</code> určuje, ako sa prvok správa voči ostatným:</p>", obr: OBR_DISPLAY,
      podrobne: P.tabulka(["display", "Správanie", "Príklady"], [["<code>block</code>", "nový riadok, celá šírka, dá sa mu nastaviť šírka a výška", "div, p, h1, ul, section"], ["<code>inline</code>", "v riadku s textom, šírka a výška nefungujú", "a, span, strong, em"], ["<code>inline-block</code>", "v riadku, ale šírka, výška a padding fungujú", "button, img"], ["<code>none</code>", "prvok zmizne, nezaberá miesto", "skryté menu"]]) },
    { typ: "volba", otazka: "Prečo odkazu <code>&lt;a&gt;</code> nefunguje <code>width: 200px</code>?", moznosti: ["Je inline. Treba mu dať display: inline-block alebo block.", "Odkazy nemajú šírku", "Chýba height", "200px je príliš"], spravna: 0, vysvetlenie: "Riadkové prvky ignorujú šírku a výšku." },
    { typ: "vyklad", nadpis: "Odkaz ako tlačidlo",
      text: P.ziva('<p>Ďalší krok: <a class="btn" href="#">Registrovať</a></p>', ".btn {\n  display: inline-block;\n  padding: 8px 16px;\n  background: #2f5bea;\n  color: white;\n  border-radius: 8px;\n  text-decoration: none;\n}", 70),
      podrobne: "<p>Bez <code>inline-block</code> by padding zasahoval do riadkov nad a pod tlačidlom. S ním sa riadok roztiahne a tlačidlo má pevný tvar.</p>" },
    { typ: "volba", otazka: "Aký je rozdiel medzi <code>display: none</code> a <code>visibility: hidden</code>?", moznosti: ["none prvok úplne odstráni z rozloženia, hidden ho skryje, ale miesto ostane", "Žiadny", "hidden funguje len na obrázky", "none je zastarané"], spravna: 0, vysvetlenie: "visibility: hidden nechá prázdne miesto." },
    { typ: "kod", zadanie: "Odkazy s triedou <code>tlacidlo</code> zmeň na <code>inline-block</code> s paddingom <code>10px 20px</code>. Prvok <code>.reklama</code> skry (<code>display: none</code>).",
      karty: ["html", "css"], aktivna: "css", start: { html: '<p>Vyber si: <a class="tlacidlo" href="#">Áno</a> <a class="tlacidlo" href="#">Nie</a></p>\n<div class="reklama">KÚP TERAZ!!!</div>', css: ".tlacidlo {\n  background: #222;\n  color: white;\n  text-decoration: none;\n  \n}" }, vyska: "220px",
      napoveda: "<code>display: inline-block; padding: 10px 20px;</code> a <code>.reklama { display: none; }</code>", riesenie: { css: ".tlacidlo {\n  background: #222;\n  color: white;\n  text-decoration: none;\n  display: inline-block;\n  padding: 10px 20px;\n}\n.reklama {\n  display: none;\n}" },
      kontrola: function (d) {
        if (P.styl(d, ".tlacidlo", "display") !== "inline-block") return "Tlačidlá ešte nie sú inline-block.";
        if (P.px(d, ".tlacidlo", "padding-top") !== 10 || P.px(d, ".tlacidlo", "padding-left") !== 20) return "padding tlačidiel má byť 10px 20px.";
        return P.styl(d, ".reklama", "display") === "none" ? null : "Reklama je ešte vidieť.";
      }, vysvetlenie: "Reklama zmizla úplne a tlačidlá majú pevný tvar." },
  ] };

  var L5 = { id: "css-3-5", nazov: "Pozíciovanie", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "position",
      text: "<p>Bežne sú prvky v <b>toku</b> dokumentu: jeden za druhým. Vlastnosť <code>position</code> ich z toho môže vytrhnúť:</p>" + P.tabulka(["Hodnota", "Správanie"], [["<code>static</code>", "normálne (predvolené)"], ["<code>relative</code>", "posunie sa od svojho miesta, miesto mu ostane"], ["<code>absolute</code>", "vytrhne sa z toku, umiestni sa voči najbližšiemu rodičovi s position"], ["<code>fixed</code>", "prilepí sa k oknu, nehýbe sa pri posúvaní"], ["<code>sticky</code>", "posúva sa, kým nedosiahne okraj, potom sa prilepí"]]),
      podrobne: "<p>Polohu potom určíš vlastnosťami <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>.</p>" },
    { typ: "vyklad", nadpis: "Štítok v rohu karty",
      text: P.ziva('<div class="karta">Tenisky<span class="zlava">-30 %</span></div>', ".karta {\n  position: relative;\n  border: 1px solid #ccc;\n  padding: 30px 12px 12px;\n  width: 150px;\n}\n.zlava {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  background: crimson;\n  color: white;\n  padding: 2px 6px;\n}", 110),
      podrobne: "<p>Klasický vzor: rodič dostane <code>position: relative</code> (bez posunu, len aby bol „kotvou“) a dieťa <code>position: absolute</code> s top/right. Bez relative na rodičovi by sa štítok umiestnil voči celej stránke.</p>" },
    { typ: "volba", otazka: "Ktorá hodnota prilepí lištu k vrchu okna aj pri posúvaní?", moznosti: ["<code>fixed</code>", "<code>relative</code>", "<code>static</code>", "<code>absolute</code>"], spravna: 0, vysvetlenie: "fixed = pevne k oknu prehliadača." },
    { typ: "vyklad", nadpis: "Vrstvy: z-index",
      text: "<p>Keď sa prvky prekrývajú, <code>z-index</code> určí, ktorý je hore. Vyššie číslo = bližšie k tebe. Funguje len na prvkoch s position (nie static).</p>" + KOD(".hlavicka {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}"),
      podrobne: "<p>Sticky hlavička je dnes veľmi obľúbená: pri posúvaní ostane hore. Aplikácia SyntaxCode má takto spodné menu (fixed).</p>" },
    { typ: "volba", otazka: "Štítok s <code>position: absolute</code> sa umiestnil do rohu celej stránky namiesto karty. Čo chýba?", moznosti: ["Karte <code>position: relative</code>", "Štítku <code>z-index</code>", "Karte <code>display: block</code>", "Štítku <code>margin</code>"], spravna: 0, vysvetlenie: "absolute sa riadi najbližším predkom, ktorý má position." },
    { typ: "kod", zadanie: "Umiestni <code>.odznak</code> do pravého horného rohu <code>.profil</code>: rodičovi daj <code>position: relative</code>, odznaku <code>position: absolute</code>, <code>top: 0</code> a <code>right: 0</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="profil">\n  <p>Jana Nováková</p>\n  <span class="odznak">3</span>\n</div>', css: ".profil {\n  border: 1px solid #ccc;\n  padding: 20px;\n  width: 180px;\n  \n}\n.odznak {\n  background: red;\n  color: white;\n  padding: 2px 8px;\n  border-radius: 99px;\n  \n}" }, vyska: "280px",
      napoveda: "V .profil: <code>position: relative;</code>. V .odznak: <code>position: absolute; top: 0; right: 0;</code>", riesenie: { css: ".profil {\n  border: 1px solid #ccc;\n  padding: 20px;\n  width: 180px;\n  position: relative;\n}\n.odznak {\n  background: red;\n  color: white;\n  padding: 2px 8px;\n  border-radius: 99px;\n  position: absolute;\n  top: 0;\n  right: 0;\n}" },
      kontrola: function (d) {
        if (P.styl(d, ".profil", "position") !== "relative") return "Rodič .profil potrebuje position: relative.";
        if (P.styl(d, ".odznak", "position") !== "absolute") return "Odznak potrebuje position: absolute.";
        var p = d.querySelector(".profil").getBoundingClientRect(), o = d.querySelector(".odznak").getBoundingClientRect();
        return Math.abs(o.top - p.top) < 3 && Math.abs(o.right - p.right) < 3 ? null : "Odznak ešte nie je v pravom hornom rohu. Nastav top: 0 a right: 0.";
      }, vysvetlenie: "Takto sa robia počítadlá správ na ikonách." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li>Box model: obsah, padding, border, margin.</li><li>Zápis okrajov 1–4 hodnotami, centrovanie <code>margin: 0 auto</code>.</li><li><code>box-sizing: border-box</code>, <code>max-width</code>, <code>overflow</code>.</li><li><code>display</code>: block, inline, inline-block, none.</li><li><code>position</code> a <code>z-index</code>.</li></ul>", tip: "Teraz test. Potom Modul 4: Flexbox, moderné rozloženie." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "css-3-1", otazka: "Ktorá vrstva box modelu je vždy priehľadná?", moznosti: ["margin", "padding", "border", "obsah"], spravna: 0, vysvetlenie: "Margin je odstup a nemá pozadie." },
    { typ: "poradie", lekcia: "css-3-1", otazka: "Zoraď vrstvy od stredu von:", riadky: ["obsah", "padding", "border", "margin"], vysvetlenie: "Obsah, vnútorný okraj, rámik, vonkajší okraj." },
    { typ: "volba", lekcia: "css-3-2", otazka: "<code>padding: 5px 10px 15px 20px;</code> Koľko je vľavo?", moznosti: ["20px", "5px", "10px", "15px"], spravna: 0, vysvetlenie: "hore, vpravo, dole, vľavo." },
    { typ: "volba", lekcia: "css-3-2", otazka: "Ako vycentruješ blok so šírkou 600px?", moznosti: ["<code>margin: 0 auto;</code>", "<code>text-align: center;</code>", "<code>align: center;</code>", "<code>padding: auto;</code>"], spravna: 0, vysvetlenie: "auto rozdelí voľné miesto vľavo a vpravo." },
    { typ: "volba", lekcia: "css-3-2", otazka: "h2 má margin-bottom 40px, p pod ním margin-top 10px. Aká je medzera?", moznosti: ["40px", "50px", "10px", "30px"], spravna: 0, vysvetlenie: "Zvislé marginy sa zlučujú, platí väčší." },
    { typ: "volba", lekcia: "css-3-3", otazka: "Čo robí <code>box-sizing: border-box</code>?", moznosti: ["width zahŕňa aj padding a rámik", "Pridá rámik", "Zakáže margin", "Vycentruje prvok"], spravna: 0, vysvetlenie: "Šírka je potom celková šírka krabice." },
    { typ: "volba", lekcia: "css-3-3", otazka: "Ako zabrániš, aby bol obrázok širší ako displej?", moznosti: ["<code>max-width: 100%;</code>", "<code>width: 1000px;</code>", "<code>overflow: visible;</code>", "<code>display: inline;</code>"], spravna: 0, vysvetlenie: "Obrázok bude najviac taký široký ako rodič." },
    { typ: "volba", lekcia: "css-3-4", otazka: "Ktoré prvky sú predvolene riadkové (inline)?", moznosti: ["a, span, strong", "div, p, h1", "ul, li, section", "table, form"], spravna: 0, vysvetlenie: "Inline prvky sú súčasťou riadku textu." },
    { typ: "volba", lekcia: "css-3-4", otazka: "Ako úplne skryješ prvok, aby nezaberal miesto?", moznosti: ["<code>display: none;</code>", "<code>visibility: hidden;</code>", "<code>opacity: 0;</code>", "<code>color: transparent;</code>"], spravna: 0, vysvetlenie: "Ostatné možnosti nechajú prázdne miesto." },
    { typ: "volba", lekcia: "css-3-5", otazka: "Hlavička sa má pri posúvaní prilepiť hore, keď k nej dôjdeš:", moznosti: ["<code>position: sticky; top: 0;</code>", "<code>position: static;</code>", "<code>position: relative; top: 0;</code>", "<code>float: top;</code>"], spravna: 0, vysvetlenie: "sticky sa prilepí po dosiahnutí okraja." },
    { typ: "doplnenie", lekcia: "css-3-5", otazka: "Štítok v rohu karty:", sablona: ".karta { position: [[0]]; }\n.stitok {\n  position: [[1]];\n  top: 0;\n  right: 0;\n}", zetony: ["relative", "absolute", "fixed", "static"], spravne: ["relative", "absolute"], vysvetlenie: "Rodič relative, dieťa absolute." },
  ];

  K.registrujModul("css", { cislo: 3, nazov: "Box model", popis: "Padding, margin, rámik, rozmery, box-sizing, display a pozíciovanie prvkov.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
