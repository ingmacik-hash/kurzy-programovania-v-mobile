/* HTML · Modul 4 · Formuláre (5 lekcií + test) */
(function () {
  var KOD = function (t, stitok) { return K.blokKodu(t, "html", stitok); };
  var UKAZKA = function (t, vysledok) { return '<div class="kod-obal">' + KOD(t, "Kód") + '<div class="vysledok">' + (vysledok === undefined ? t : vysledok) + "</div></div>"; };
  var TXT = 'font-family="Inter,sans-serif"', MONO = 'font-family="JBMono,monospace"';
  function tabulka(h, r) { return '<div class="tabulka"><table><thead><tr>' + h.map(function (x) { return "<th>" + x + "</th>"; }).join("") + "</tr></thead><tbody>" + r.map(function (x) { return "<tr>" + x.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>"; }
  function textOf(el) { return el ? el.textContent.trim() : ""; }
  /* Pri ukážkach formulárov nechceme, aby sa niečo odoslalo z lekcie. */
  var STOP = ' onsubmit="return false"';
  function popis(d, pole) {
    if (!pole) return "";
    if (pole.id) { var l = d.querySelector('label[for="' + pole.id + '"]'); if (l) return textOf(l); }
    var obal = pole.closest("label"); return obal ? textOf(obal) : "";
  }

  /* ---------- obrázky ---------- */
  var OBR_CESTA = '<svg viewBox="0 0 340 150" role="img" aria-label="Používateľ vyplní pole meno, formulár pošle dvojicu meno=Jana na server">' +
    '<rect x="6" y="10" width="130" height="130" rx="12" style="fill:var(--surface-2)"/>' +
    '<text x="20" y="36" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">Meno</text>' +
    '<rect x="20" y="44" width="102" height="28" rx="6" style="fill:var(--surface);stroke:var(--line)"/><text x="30" y="63" font-size="12" ' + TXT + ' style="fill:var(--text)">Jana</text>' +
    '<rect x="20" y="88" width="102" height="30" rx="8" style="fill:var(--accent)"/><text x="71" y="108" text-anchor="middle" font-size="12" font-weight="700" ' + TXT + ' style="fill:#fff">Odoslať</text>' +
    '<path d="M144 75h52" style="stroke:var(--accent);stroke-width:2.5"/><path d="M190 69l8 6-8 6" style="fill:none;stroke:var(--accent);stroke-width:2.5"/>' +
    '<text x="170" y="64" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">odošle</text>' +
    '<rect x="206" y="44" width="128" height="62" rx="10" style="fill:var(--code-bg)"/>' +
    '<text x="270" y="70" text-anchor="middle" font-size="13" ' + MONO + '><tspan style="fill:var(--hl-attr)">meno</tspan><tspan style="fill:var(--code-text)">=</tspan><tspan style="fill:var(--hl-str)">Jana</tspan></text>' +
    '<text x="270" y="92" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--code-muted)">name = hodnota</text>' +
    '<text x="270" y="128" text-anchor="middle" font-size="10.5" font-weight="700" ' + TXT + ' style="fill:var(--muted)">server (PHP, Python…)</text></svg>';

  function pole(x, y, w, nazov, obsah) {
    return '<text x="' + x + '" y="' + y + '" font-size="10" font-weight="700" ' + MONO + ' style="fill:var(--hl-attr)">' + nazov + "</text>" +
      '<rect x="' + x + '" y="' + (y + 6) + '" width="' + w + '" height="26" rx="6" style="fill:var(--surface);stroke:var(--line)"/>' + obsah;
  }
  var OBR_TYPY = '<svg viewBox="0 0 340 172" role="img" aria-label="Rôzne typy polí: text, e-mail, heslo s bodkami, číslo so šípkami, dátum s kalendárom a posuvník">' +
    pole(8, 14, 155, "text", '<text x="18" y="39" font-size="11.5" ' + TXT + ' style="fill:var(--text)">Jana Nováková</text>') +
    pole(177, 14, 155, "email", '<text x="187" y="39" font-size="11.5" ' + TXT + ' style="fill:var(--text)">jana@mail.sk</text>') +
    pole(8, 70, 155, "password", '<text x="18" y="96" font-size="15" ' + TXT + ' style="fill:var(--text)">••••••••</text>') +
    pole(177, 70, 155, "number", '<text x="187" y="95" font-size="11.5" ' + TXT + ' style="fill:var(--text)">15</text><text x="318" y="91" font-size="9" ' + TXT + ' style="fill:var(--muted)">▲</text><text x="318" y="100" font-size="9" ' + TXT + ' style="fill:var(--muted)">▼</text>') +
    pole(8, 126, 155, "date", '<text x="18" y="151" font-size="11.5" ' + TXT + ' style="fill:var(--text)">12. 11. 2026</text><rect x="141" y="139" width="12" height="11" rx="2" style="fill:none;stroke:var(--muted)"/><path d="M141 143h12" style="stroke:var(--muted)"/>') +
    '<text x="177" y="126" font-size="10" font-weight="700" ' + MONO + ' style="fill:var(--hl-attr)">range</text>' +
    '<rect x="181" y="149" width="147" height="5" rx="2.5" style="fill:var(--line)"/><rect x="181" y="149" width="90" height="5" rx="2.5" style="fill:var(--accent)"/><circle cx="271" cy="151.5" r="8" style="fill:var(--accent)"/></svg>';

  var OBR_VOLBA = '<svg viewBox="0 0 340 120" role="img" aria-label="Radio: dá sa vybrať len jedna možnosť. Checkbox: dá sa zaškrtnúť viac možností.">' +
    '<text x="80" y="18" text-anchor="middle" font-size="12" font-weight="700" ' + MONO + ' style="fill:var(--hl-attr)">radio</text>' +
    '<text x="80" y="34" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">práve jedna</text>' +
    [["S", 0], ["M", 1], ["L", 0]].map(function (o, i) {
      return '<circle cx="34" cy="' + (56 + i * 22) + '" r="7" style="fill:none;stroke:' + (o[1] ? "var(--accent)" : "var(--muted)") + ';stroke-width:2"/>' + (o[1] ? '<circle cx="34" cy="' + (56 + i * 22) + '" r="3.5" style="fill:var(--accent)"/>' : "") +
        '<text x="50" y="' + (60 + i * 22) + '" font-size="12" ' + TXT + ' style="fill:var(--text)">veľkosť ' + o[0] + "</text>";
    }).join("") +
    '<text x="250" y="18" text-anchor="middle" font-size="12" font-weight="700" ' + MONO + ' style="fill:var(--hl-attr)">checkbox</text>' +
    '<text x="250" y="34" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">žiadna, jedna aj viac</text>' +
    [["syr", 1], ["šunka", 0], ["olivy", 1]].map(function (o, i) {
      return '<rect x="197" y="' + (49 + i * 22) + '" width="14" height="14" rx="3" style="fill:' + (o[1] ? "var(--accent)" : "none") + ';stroke:' + (o[1] ? "var(--accent)" : "var(--muted)") + ';stroke-width:2"/>' +
        (o[1] ? '<path d="M200 ' + (56 + i * 22) + "l3 3 6-6" + '" style="fill:none;stroke:#fff;stroke-width:2"/>' : "") +
        '<text x="220" y="' + (60 + i * 22) + '" font-size="12" ' + TXT + ' style="fill:var(--text)">' + o[0] + "</text>";
    }).join("") + "</svg>";

  var OBR_GETPOST = '<svg viewBox="0 0 340 130" role="img" aria-label="GET dá údaje do adresy stránky, POST ich pošle skryto v tele požiadavky">' +
    '<text x="8" y="18" font-size="12" font-weight="700" ' + MONO + ' style="fill:var(--hl-kw)">GET</text>' +
    '<rect x="8" y="26" width="324" height="30" rx="8" style="fill:var(--code-bg)"/>' +
    '<text x="18" y="45" font-size="11" ' + MONO + '><tspan style="fill:var(--code-text)">hladaj.html</tspan><tspan style="fill:var(--hl-attr)">?q=</tspan><tspan style="fill:var(--hl-str)">pizza</tspan><tspan style="fill:var(--hl-attr)">&amp;mesto=</tspan><tspan style="fill:var(--hl-str)">Nitra</tspan></text>' +
    '<text x="8" y="74" font-size="12" font-weight="700" ' + MONO + ' style="fill:var(--hl-kw)">POST</text>' +
    '<rect x="8" y="82" width="140" height="30" rx="8" style="fill:var(--code-bg)"/><text x="18" y="101" font-size="11" ' + MONO + ' style="fill:var(--code-text)">registracia.php</text>' +
    '<rect x="160" y="82" width="172" height="40" rx="8" style="fill:var(--surface-2);stroke:var(--line);stroke-dasharray:4 3"/>' +
    '<text x="170" y="98" font-size="10.5" ' + MONO + ' style="fill:var(--text)">heslo=••••••</text><text x="170" y="114" font-size="9.5" ' + TXT + ' style="fill:var(--muted)">skryté v tele požiadavky</text></svg>';

  /* ---------- lekcie ---------- */
  var L1 = { id: "html-4-1", nazov: "Formulár a textové pole", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Načo sú formuláre",
      text: "<p>Formulár je spôsob, ako návštevník <b>pošle údaje</b> webu: prihlásenie, vyhľadávanie, objednávka, komentár. Návštevník vyplní polia a formulár pošle dvojice <b>názov = hodnota</b> na server:</p>", obr: OBR_CESTA,
      podrobne: "<p>HTML formulár len <b>zbiera</b> údaje. Čo sa s nimi stane (uloženie, poslanie e-mailu), rieši program na serveri, napríklad v PHP alebo Pythone. V tejto aplikácii sa formulár neodošle: náhľad ti ukáže, aké údaje by poslal.</p>" },
    { typ: "vyklad", nadpis: "Značky form a input",
      text: "<p>Celý formulár obaľuje <code>&lt;form&gt;</code>. Políčko na písanie je <code>&lt;input&gt;</code>. Je to prázdny prvok, nemá zatváraciu značku:</p>" +
        UKAZKA('<form>\n  <input type="text" name="meno">\n</form>', '<form' + STOP + '><input type="text" name="meno"></form>'),
      podrobne: tabulka(["Atribút", "Význam"], [["<code>type</code>", "druh poľa (text, email, heslo…)"], ["<code>name</code>", "názov, pod ktorým sa hodnota pošle. <b>Bez name sa pole neodošle!</b>"], ["<code>value</code>", "hodnota, ktorá je v poli vopred"], ["<code>placeholder</code>", "sivý pomocný text, kým je pole prázdne"]]) },
    { typ: "volba", otazka: "Pole nemá atribút <code>name</code>. Čo sa stane pri odoslaní?", kod: '<input type="text" placeholder="Meno">', moznosti: ["Jeho hodnota sa neodošle", "Odošle sa pod názvom text", "Formulár sa nedá odoslať", "Nič, name je nepovinný a nemá vplyv"], spravna: 0,
      vysvetlenie: "Formulár posiela len polia s name. Je to častá chyba začiatočníkov." },
    { typ: "vyklad", nadpis: "Popis poľa: label",
      text: "<p>Každé pole potrebuje popis, aby bolo jasné, čo do neho písať. Na to slúži <code>&lt;label&gt;</code>. Atribút <code>for</code> sa musí zhodovať s <code>id</code> poľa:</p>" +
        UKAZKA('<label for="meno">Meno</label>\n<input type="text" id="meno" name="meno">', '<label for="u-meno">Meno</label> <input type="text" id="u-meno" name="meno">'),
      podrobne: "<ul><li>Keď ťukneš na text <i>Meno</i>, kurzor skočí do poľa. Na mobile to veľmi pomáha, lebo políčka sú malé.</li><li>Čítačka obrazovky pri vstupe do poľa prečíta jeho label.</li><li><code>id</code> slúži na prepojenie s label, <code>name</code> na odoslanie. Často majú rovnakú hodnotu.</li></ul>",
      hlbka: "<p>Pole sa dá aj vložiť priamo do label: <code>&lt;label&gt;Meno &lt;input name=\"meno\"&gt;&lt;/label&gt;</code>. Vtedy for ani id netreba.</p><p><b>placeholder nie je náhrada za label.</b> Zmizne, keď začneš písať, takže potom nevieš, čo do poľa patrilo. Navyše má často slabý kontrast.</p>" },
    { typ: "doplnenie", otazka: "Prepoj popis s poľom:", sablona: '<label [[0]]="email">E-mail</label>\n<input type="email" [[1]]="email" name="email">', zetony: ["for", "id", "name", "class", "label"], spravne: ["for", "id"],
      vysvetlenie: "label for=\"email\" ukazuje na pole s id=\"email\"." },
    { typ: "kod", zadanie: "Do formulára pridaj popis <b>Mesto</b> (<code>label</code>) a textové pole s <code>id</code> aj <code>name</code> <b>mesto</b>. Potom ťukni na Odoslať v náhľade.",
      start: { html: "<form>\n  \n  <button>Odoslať</button>\n</form>" }, vyska: "190px",
      napoveda: '<code>&lt;label for="mesto"&gt;Mesto&lt;/label&gt;</code> a <code>&lt;input type="text" id="mesto" name="mesto"&gt;</code>',
      riesenie: { html: '<form>\n  <label for="mesto">Mesto</label>\n  <input type="text" id="mesto" name="mesto">\n  <button>Odoslať</button>\n</form>' },
      kontrola: function (d) {
        var i = d.querySelector("form input"); if (!i) return "Vo formulári chýba pole input.";
        if (i.getAttribute("name") !== "mesto") return "Pole potrebuje name=\"mesto\", inak sa neodošle.";
        var p = popis(d, i); if (!p) return "Pole nemá popis. Pridaj label for=\"mesto\" a poľu id=\"mesto\".";
        return /mesto/i.test(p) ? null : "Popis poľa má byť Mesto.";
      }, vysvetlenie: "Ťukni na Odoslať a uvidíš, čo by formulár poslal." },
    { typ: "vyklad", nadpis: "Zhrnutie",
      text: "<ul><li><code>form</code> obaľuje formulár.</li><li><code>input</code> je pole, bez zatváracej značky.</li><li><code>name</code> = pod akým názvom sa hodnota odošle.</li><li><code>label for</code> + <code>id</code> = popis poľa.</li><li>placeholder je len nápoveda, nie popis.</li></ul>" },
  ] };

  var L2 = { id: "html-4-2", nazov: "Typy polí", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Správny typ = lepšia klávesnica",
      text: "<p>Atribút <code>type</code> mení, ako sa pole správa. Na mobile dokonca ukáže <b>inú klávesnicu</b>: pri e-maile so zavináčom, pri čísle len číslice.</p>", obr: OBR_TYPY,
      podrobne: tabulka(["type", "Na čo", "Čo urobí"], [["<code>text</code>", "meno, mesto", "obyčajné pole"], ["<code>email</code>", "e-mail", "klávesnica so @, skontroluje tvar"], ["<code>password</code>", "heslo", "skryje znaky bodkami"], ["<code>number</code>", "vek, počet", "číselná klávesnica, šípky"], ["<code>tel</code>", "telefón", "telefónna klávesnica"], ["<code>date</code>", "dátum", "kalendár na výber"], ["<code>color</code>", "farba", "výber farby"], ["<code>range</code>", "hlasitosť, hodnotenie", "posuvník"], ["<code>search</code>", "vyhľadávanie", "pole s krížikom na vymazanie"], ["<code>file</code>", "príloha", "výber súboru"]]) },
    { typ: "volba", otazka: "Ktorý typ použiješ na heslo?", moznosti: ["<code>password</code>", "<code>text</code>", "<code>secret</code>", "<code>hidden</code>"], spravna: 0,
      vysvetlenie: "password skryje písané znaky.", preco: [null, "text by heslo ukázal každému, kto ti pozerá cez plece.", "Typ secret neexistuje.", "hidden je pole, ktoré používateľ vôbec nevidí ani nevyplní."] },
    { typ: "volba", otazka: "Prečo je pre telefónne číslo lepší <code>type=\"tel\"</code> ako <code>text</code>?", moznosti: ["Na mobile sa ukáže klávesnica s číslami", "Číslo sa automaticky zavolá", "Overí, že číslo existuje", "Nie je rozdiel"], spravna: 0,
      vysvetlenie: "Hlavný prínos je pohodlnejšie písanie. Formát čísla tel nekontroluje, lebo sa v každej krajine líši." },
    { typ: "vyklad", nadpis: "Čísla a rozsahy",
      text: "<p>Pri <code>number</code>, <code>range</code> a <code>date</code> môžeš určiť povolený rozsah:</p>" +
        UKAZKA('<label for="vek">Vek</label>\n<input type="number" id="vek" name="vek"\n  min="6" max="99">', '<label for="u-vek">Vek</label> <input type="number" id="u-vek" min="6" max="99" style="width:70px">'),
      podrobne: "<ul><li><code>min</code> a <code>max</code>: najmenšia a najväčšia hodnota.</li><li><code>step</code>: o koľko sa mení. <code>step=\"0.5\"</code> povolí aj polovice, <code>step=\"10\"</code> skáče po desiatkach.</li><li>Pri dátume sa píše tvar rok-mesiac-deň: <code>min=\"2026-01-01\"</code>.</li></ul>" },
    { typ: "doplnenie", otazka: "Doplň pole na počet lístkov od 1 do 10:", sablona: '<input type="[[0]]" name="listky"\n  [[1]]="1" [[2]]="10">', zetony: ["number", "min", "max", "text", "from", "to"], spravne: ["number", "min", "max"],
      vysvetlenie: "type=\"number\" s min a max." },
    { typ: "kod", zadanie: "Vytvor prihlásenie: pole <b>E-mail</b> typu <code>email</code> s name <b>email</b> a pole <b>Heslo</b> typu <code>password</code> s name <b>heslo</b>. Obe s popisom <code>label</code>.",
      start: { html: "<form>\n  \n  <button>Prihlásiť</button>\n</form>" }, vyska: "220px",
      napoveda: '<code>&lt;label for="email"&gt;E-mail&lt;/label&gt; &lt;input type="email" id="email" name="email"&gt;</code>, podobne heslo.',
      riesenie: { html: '<form>\n  <label for="email">E-mail</label>\n  <input type="email" id="email" name="email">\n  <label for="heslo">Heslo</label>\n  <input type="password" id="heslo" name="heslo">\n  <button>Prihlásiť</button>\n</form>' },
      kontrola: function (d) {
        var e = d.querySelector('input[name="email"]'); if (!e) return "Chýba pole s name=\"email\".";
        if (e.type !== "email") return "Pole e-mail má mať type=\"email\".";
        var h = d.querySelector('input[name="heslo"]'); if (!h) return "Chýba pole s name=\"heslo\".";
        if (h.type !== "password") return "Heslo má mať type=\"password\", aby nebolo vidieť.";
        if (!popis(d, e)) return "Pole e-mail nemá label.";
        return popis(d, h) ? null : "Pole heslo nemá label.";
      }, vysvetlenie: "Skús do e-mailu napísať niečo bez @ a odoslať. Prehliadač ťa upozorní." },
  ] };

  var L3 = { id: "html-4-3", nazov: "Zaškrtávanie a výber", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Radio a checkbox",
      text: "<p>Keď má návštevník vyberať z ponuky, máš dva druhy políčok:</p>", obr: OBR_VOLBA,
      podrobne: UKAZKA('<label><input type="radio" name="velkost" value="S"> S</label>\n<label><input type="radio" name="velkost" value="M"> M</label>\n\n<label><input type="checkbox" name="syr"> syr</label>',
        '<label><input type="radio" name="u-velkost"> S</label> <label><input type="radio" name="u-velkost"> M</label><br><label><input type="checkbox"> syr</label>') +
        "<ul><li>Prepínače <b>radio</b> so <b>spoločným name</b> tvoria skupinu, v ktorej môže byť vybratý len jeden.</li><li><code>value</code> určuje, čo sa odošle. Bez value by sa poslalo len slovo <i>on</i>.</li><li><code>checked</code> označí možnosť vopred.</li></ul>" },
    { typ: "volba", otazka: "Prečo sa dajú v tomto kóde zaškrtnúť obe možnosti naraz?", kod: '<input type="radio" name="a" value="ano"> Áno\n<input type="radio" name="b" value="nie"> Nie', moznosti: ["Majú rôzne name, preto netvoria skupinu", "Chýba checked", "Mal by tam byť checkbox", "Chýba form"], spravna: 0,
      vysvetlenie: "Prepínače patria do jednej skupiny, len keď majú rovnaký name." },
    { typ: "volba", otazka: "Ktoré pole na „Súhlasím s podmienkami“?", moznosti: ["<code>checkbox</code>", "<code>radio</code>", "<code>text</code>", "<code>select</code>"], spravna: 0, vysvetlenie: "Jedno políčko, ktoré sa dá zaškrtnúť alebo nie, je checkbox." },
    { typ: "vyklad", nadpis: "Rozbaľovací zoznam",
      text: "<p>Pri dlhšej ponuke (krajina, mesiac) je prehľadnejší <code>&lt;select&gt;</code>. Každá možnosť je <code>&lt;option&gt;</code>:</p>" +
        UKAZKA('<label for="kraj">Kraj</label>\n<select id="kraj" name="kraj">\n  <option value="BA">Bratislavský</option>\n  <option value="NR">Nitriansky</option>\n  <option value="KE">Košický</option>\n</select>',
          '<label for="u-kraj">Kraj</label> <select id="u-kraj"><option>Bratislavský</option><option>Nitriansky</option><option>Košický</option></select>'),
      podrobne: "<ul><li>Odošle sa <code>value</code> vybratej možnosti, napr. <code>kraj=NR</code>. Bez value sa pošle text možnosti.</li><li><code>selected</code> vyberie možnosť vopred.</li><li><code>multiple</code> dovolí vybrať viac možností, ale na mobile sa ovláda ťažko. Lepšie sú checkboxy.</li></ul>" },
    { typ: "vyklad", nadpis: "Dlhší text: textarea",
      text: "<p>Na správu alebo komentár je pole na viac riadkov <code>&lt;textarea&gt;</code>. Na rozdiel od input <b>má zatváraciu značku</b>:</p>" +
        UKAZKA('<label for="sprava">Správa</label>\n<textarea id="sprava" name="sprava"\n  rows="3"></textarea>', '<label for="u-sprava">Správa</label><br><textarea id="u-sprava" rows="3" style="width:90%"></textarea>'),
      podrobne: "<p><code>rows</code> určuje počet viditeľných riadkov. Text medzi značkami je predvyplnený obsah. Preto medzi <code>&lt;textarea&gt;</code> a <code>&lt;/textarea&gt;</code> nedávaj medzery ani nový riadok, inak bude pole začínať medzerami.</p>" },
    { typ: "doplnenie", otazka: "Doplň rozbaľovací zoznam:", sablona: '<[[0]] name="farba">\n  <[[1]] value="r">červená</[[1]]>\n  <[[1]] value="g">zelená</[[1]]>\n</[[0]]>', zetony: ["select", "option", "list", "item", "input"], spravne: ["select", "option"],
      vysvetlenie: "select obaľuje možnosti option." },
    { typ: "kod", zadanie: "Pridaj výber veľkosti trička: tri prepínače <code>radio</code> so spoločným <code>name=\"velkost\"</code> a hodnotami <b>S</b>, <b>M</b>, <b>L</b>. Každý v <code>label</code>.",
      start: { html: "<form>\n  <p>Veľkosť trička:</p>\n  \n  <button>Objednať</button>\n</form>" }, vyska: "230px",
      napoveda: '<code>&lt;label&gt;&lt;input type="radio" name="velkost" value="S"&gt; S&lt;/label&gt;</code> a rovnako pre M a L.',
      riesenie: { html: '<form>\n  <p>Veľkosť trička:</p>\n  <label><input type="radio" name="velkost" value="S"> S</label>\n  <label><input type="radio" name="velkost" value="M"> M</label>\n  <label><input type="radio" name="velkost" value="L"> L</label>\n  <button>Objednať</button>\n</form>' },
      kontrola: function (d) {
        var r = d.querySelectorAll('input[type="radio"]'); if (r.length !== 3) return "Majú byť 3 prepínače radio, je ich " + r.length + ".";
        for (var i = 0; i < 3; i++) {
          if (r[i].getAttribute("name") !== "velkost") return "Všetky prepínače majú mať name=\"velkost\", aby tvorili jednu skupinu.";
          if (!popis(d, r[i])) return "Prepínač " + (i + 1) + " nemá popis label.";
        }
        var v = [].map.call(r, function (x) { return x.getAttribute("value"); }).join(",");
        return v === "S,M,L" ? null : "Hodnoty value majú byť S, M a L (teraz: " + v + ").";
      }, vysvetlenie: "Vyber veľkosť, odošli a pozri, čo sa pošle." },
  ] };

  var L4 = { id: "html-4-4", nazov: "Tlačidlá a odoslanie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Tlačidlo",
      text: "<p>Tlačidlo je <code>&lt;button&gt;</code>. Vo formulári ho určuje atribút <code>type</code>:</p>" + tabulka(["type", "Čo urobí"], [["<code>submit</code>", "odošle formulár (predvolené)"], ["<code>reset</code>", "vymaže všetky polia"], ["<code>button</code>", "nič, ovláda sa JavaScriptom"]]),
      podrobne: "<p>Tlačidlo vo formulári bez <code>type</code> formulár <b>odošle</b>. Keď chceš tlačidlo napríklad na zobrazenie hesla, napíš <code>type=\"button\"</code>, inak ti odošle formulár.</p><p>Tlačidlo <b>reset</b> sa dnes skoro nepoužíva: ľudia ho omylom stlačia a prídu o všetko, čo napísali.</p>",
      hlbka: "<p>Formulár sa odošle aj stlačením Enter v textovom poli. Starší zápis tlačidla je <code>&lt;input type=\"submit\" value=\"Odoslať\"&gt;</code>. <code>button</code> je lepší, lebo do neho môžeš dať aj ikonu alebo tučný text.</p>" },
    { typ: "volba", otazka: "Čo urobí ťuknutie na toto tlačidlo vo formulári?", kod: "<form>\n  <input name=\"q\">\n  <button>Hľadať</button>\n</form>", moznosti: ["Odošle formulár", "Nič", "Vymaže pole", "Chyba, chýba type"], spravna: 0, vysvetlenie: "button vo formulári má predvolene type=\"submit\"." },
    { typ: "vyklad", nadpis: "Kam a ako sa údaje pošlú",
      text: "<p>Dva atribúty značky <code>form</code> určujú, čo sa stane po odoslaní:</p><ul><li><code>action</code>: adresa, kam sa údaje pošlú.</li><li><code>method</code>: spôsob, <b>GET</b> alebo <b>POST</b>.</li></ul>", obr: OBR_GETPOST,
      podrobne: tabulka(["", "GET", "POST"], [["Údaje", "v adrese za ?", "skryté v požiadavke"], ["Použi na", "vyhľadávanie, filtre", "prihlásenie, registrácia, objednávka"], ["Dá sa uložiť ako odkaz", "áno", "nie"]]) +
        "<p><b>Heslá a osobné údaje vždy cez POST.</b> Pri GET by heslo zostalo v histórii prehliadača.</p>" },
    { typ: "volba", otazka: "Ktorú metódu použiješ pre registráciu s heslom?", moznosti: ["POST", "GET", "SEND", "Je to jedno"], spravna: 0, vysvetlenie: "POST nedá heslo do adresy, takže nezostane v histórii ani v záznamoch servera." },
    { typ: "vyklad", nadpis: "Skupiny polí",
      text: "<p>Dlhý formulár rozdeľ na časti. <code>&lt;fieldset&gt;</code> zoskupí súvisiace polia a <code>&lt;legend&gt;</code> je nadpis skupiny:</p>" +
        UKAZKA('<fieldset>\n  <legend>Doručenie</legend>\n  <label><input type="radio" name="dorucenie" value="kurier"> Kuriér</label>\n  <label><input type="radio" name="dorucenie" value="posta"> Pošta</label>\n</fieldset>',
          '<fieldset><legend>Doručenie</legend><label><input type="radio" name="u-dor"> Kuriér</label> <label><input type="radio" name="u-dor"> Pošta</label></fieldset>'),
      podrobne: "<p>Pri skupine prepínačov je fieldset skoro povinný: čítačka prečíta „Doručenie, Kuriér“, takže nevidiaci vie, na čo sa „Kuriér“ vzťahuje.</p>" },
    { typ: "poradie", otazka: "Zoraď vyhľadávací formulár:", riadky: ['<form action="hladaj.html" method="get">', '  <label for="q">Hľadať</label>', '  <input type="search" id="q" name="q">', "  <button>Hľadať</button>", "</form>"], vysvetlenie: "form obaľuje label, pole aj tlačidlo." },
    { typ: "kod", zadanie: "Doplň značke <code>form</code> atribúty <code>action=\"objednavka.php\"</code> a <code>method=\"post\"</code>. Zmeň tlačidlo na odosielacie s textom <b>Objednať</b>.",
      start: { html: '<form>\n  <label for="ks">Počet kusov</label>\n  <input type="number" id="ks" name="ks" value="1">\n  <button type="button">Tlačidlo</button>\n</form>' }, vyska: "190px",
      napoveda: '<code>&lt;form action="objednavka.php" method="post"&gt;</code> a <code>&lt;button type="submit"&gt;Objednať&lt;/button&gt;</code>',
      riesenie: { html: '<form action="objednavka.php" method="post">\n  <label for="ks">Počet kusov</label>\n  <input type="number" id="ks" name="ks" value="1">\n  <button type="submit">Objednať</button>\n</form>' },
      kontrola: function (d) {
        var f = d.querySelector("form"); if (!f) return "Chýba form.";
        if (f.getAttribute("action") !== "objednavka.php") return "form potrebuje action=\"objednavka.php\".";
        if ((f.getAttribute("method") || "").toLowerCase() !== "post") return "form potrebuje method=\"post\".";
        var b = f.querySelector("button"); if (!b) return "Chýba tlačidlo.";
        if (b.type !== "submit") return "Tlačidlo má type=\"button\", takže formulár neodošle. Zmeň ho na submit (alebo type zmaž).";
        return /objedna/i.test(textOf(b)) ? null : "Text tlačidla má byť Objednať.";
      }, vysvetlenie: "Ťukni na Objednať: náhľad ukáže adresu, metódu aj údaje." },
  ] };

  var L5 = { id: "html-4-5", nazov: "Kontrola údajov", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Povinné polia",
      text: "<p>Prehliadač vie skontrolovať údaje ešte pred odoslaním. Najjednoduchší je atribút <code>required</code>: formulár sa neodošle, kým pole nie je vyplnené.</p>" +
        KOD('<input type="email" name="email" required>'),
      podrobne: "<p>Prehliadač ukáže bublinu s chybou vo svojom jazyku a pole označí. Pri <code>type=\"email\"</code> zároveň skontroluje, či je v adrese @ a doména.</p><p>Povinné polia označ aj pre ľudí, napríklad hviezdičkou v label: <code>Meno *</code>.</p>",
      hlbka: "<p><b>Kontrola v prehliadači nie je ochrana.</b> Šikovný používateľ ju obíde (stačí upraviť HTML v prehliadači). Je to pohodlie pre návštevníka. Server musí údaje skontrolovať vždy znova.</p>" },
    { typ: "vyklad", nadpis: "Ďalšie pravidlá",
      text: tabulka(["Atribút", "Kontroluje", "Príklad"], [["<code>required</code>", "vyplnenie", "<code>required</code>"], ["<code>minlength</code> / <code>maxlength</code>", "dĺžku textu", "<code>minlength=\"8\"</code>"], ["<code>min</code> / <code>max</code>", "číslo alebo dátum", "<code>min=\"18\"</code>"], ["<code>pattern</code>", "tvar podľa vzoru", "<code>pattern=\"[0-9]{5}\"</code>"]]),
      podrobne: "<p><code>pattern</code> používa takzvaný regulárny výraz. <code>[0-9]{5}</code> znamená „presne 5 číslic“, napríklad PSČ bez medzery. K pattern pridaj <code>title</code> s vysvetlením. Prehliadač ho ukáže v chybovej bubline.</p>" },
    { typ: "volba", otazka: "Ako zabezpečíš, že heslo bude mať aspoň 8 znakov?", moznosti: ["<code>minlength=\"8\"</code>", "<code>min=\"8\"</code>", "<code>size=\"8\"</code>", "<code>length=\"8\"</code>"], spravna: 0,
      vysvetlenie: "minlength kontroluje dĺžku textu.", preco: [null, "min je pre čísla a dátumy, nie pre dĺžku textu.", "size mení len šírku poľa na obrazovke.", "Atribút length neexistuje."] },
    { typ: "volba", otazka: "Stačí kontrola cez <code>required</code> na ochranu pred zlými údajmi?", moznosti: ["Nie, server musí údaje kontrolovať znova", "Áno, obísť sa nedá", "Áno, ak je aj pattern", "Áno, pri POST"], spravna: 0, vysvetlenie: "Kontrola v prehliadači je pre pohodlie. Bezpečnosť musí zabezpečiť server." },
    { typ: "vyklad", nadpis: "Automatické vypĺňanie",
      text: "<p>Atribút <code>autocomplete</code> povie prehliadaču, aký údaj pole čaká. Prehliadač potom ponúkne uložené meno, adresu alebo heslo:</p>" +
        KOD('<input type="email" name="email" autocomplete="email">\n<input type="password" name="heslo" autocomplete="current-password">\n<input type="text" name="psc" autocomplete="postal-code">'),
      podrobne: "<p>Ďalšie hodnoty: <code>name</code>, <code>tel</code>, <code>street-address</code>, <code>new-password</code> (pri registrácii, prehliadač ponúkne silné heslo). Formulár sa potom vyplní na dve ťuknutia.</p>" },
    { typ: "doplnenie", otazka: "Doplň povinné pole na PSČ s presne 5 číslicami:", sablona: '<input type="text" name="psc"\n  [[0]] [[1]]="[0-9]{5}">', zetony: ["required", "pattern", "minlength", "check", "rule"], spravne: ["required", "pattern"],
      vysvetlenie: "required = povinné, pattern = tvar." },
    { typ: "kod", zadanie: "Sprav z registrácie bezpečnejší formulár: e-mail má byť <b>povinný</b> (<code>required</code>) a heslo povinné s dĺžkou <b>aspoň 8 znakov</b> (<code>minlength</code>).",
      start: { html: '<form method="post">\n  <label for="email">E-mail *</label>\n  <input type="email" id="email" name="email">\n  <label for="heslo">Heslo *</label>\n  <input type="password" id="heslo" name="heslo">\n  <button>Registrovať</button>\n</form>' }, vyska: "220px",
      napoveda: 'Do e-mailu pridaj <code>required</code>. Do hesla <code>required minlength="8"</code>.',
      riesenie: { html: '<form method="post">\n  <label for="email">E-mail *</label>\n  <input type="email" id="email" name="email" required>\n  <label for="heslo">Heslo *</label>\n  <input type="password" id="heslo" name="heslo" required minlength="8">\n  <button>Registrovať</button>\n</form>' },
      kontrola: function (d) {
        var e = d.querySelector('input[name="email"]'), h = d.querySelector('input[name="heslo"]');
        if (!e || !h) return "Polia email a heslo musia zostať vo formulári.";
        if (!e.required) return "E-mail ešte nie je povinný. Pridaj required.";
        if (!h.required) return "Heslo ešte nie je povinné. Pridaj required.";
        return h.minLength === 8 ? null : "Heslu nastav minlength=\"8\".";
      }, vysvetlenie: "Skús odoslať prázdny formulár a uvidíš, ako ťa prehliadač zastaví." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li><code>form</code>, <code>input</code>, <code>label</code> a dôležitý <code>name</code>.</li><li>Typy polí: email, password, number, tel, date, range…</li><li><code>radio</code>, <code>checkbox</code>, <code>select</code>, <code>textarea</code>.</li><li><code>button</code>, <code>action</code>, <code>method</code> GET/POST, <code>fieldset</code>.</li><li>Kontrola: <code>required</code>, <code>minlength</code>, <code>min</code>/<code>max</code>, <code>pattern</code>.</li></ul>",
      tip: "Teraz test. Potom ťa čaká Modul 5: sémantika a štruktúra stránky." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "html-4-1", otazka: "Ktorý atribút určuje, pod akým názvom sa hodnota poľa odošle?", moznosti: ["<code>name</code>", "<code>id</code>", "<code>label</code>", "<code>type</code>"], spravna: 0, vysvetlenie: "name sa odošle spolu s hodnotou: name=hodnota." },
    { typ: "volba", lekcia: "html-4-1", otazka: "Prečo placeholder nenahradí label?", moznosti: ["Zmizne, keď začneš písať", "Placeholder sa neodošle", "Placeholder nefunguje na mobile", "Nahradí ho, je to jedno"], spravna: 0, vysvetlenie: "Po začatí písania už nevidíš, čo do poľa patrilo." },
    { typ: "doplnenie", lekcia: "html-4-1", otazka: "Prepoj label s poľom:", sablona: '<label [[0]]="tel">Telefón</label>\n<input type="tel" [[1]]="tel" name="tel">', zetony: ["for", "id", "name", "to"], spravne: ["for", "id"], vysvetlenie: "for v label = id poľa." },
    { typ: "volba", lekcia: "html-4-2", otazka: "Ktoré pole ukáže na mobile klávesnicu so zavináčom?", moznosti: ["<code>type=\"email\"</code>", "<code>type=\"text\"</code>", "<code>type=\"at\"</code>", "<code>type=\"mail\"</code>"], spravna: 0, vysvetlenie: "email zároveň skontroluje tvar adresy." },
    { typ: "volba", lekcia: "html-4-2", otazka: "Ktorý typ ukáže posuvník?", moznosti: ["<code>range</code>", "<code>slider</code>", "<code>number</code>", "<code>scroll</code>"], spravna: 0, vysvetlenie: "range je posuvník, typy slider a scroll neexistujú." },
    { typ: "volba", lekcia: "html-4-3", otazka: "Ako zaistíš, že z prepínačov radio sa dá vybrať len jeden?", moznosti: ["Dáš im rovnaký name", "Dáš im rovnaký id", "Dáš im atribút single", "Obalíš ich do select"], spravna: 0, vysvetlenie: "Skupinu tvoria prepínače s rovnakým name. id musí byť naopak jedinečné." },
    { typ: "volba", lekcia: "html-4-3", otazka: "Ktorý prvok má zatváraciu značku?", moznosti: ["<code>textarea</code>", "<code>input</code>", "<code>br</code>", "<code>img</code>"], spravna: 0, vysvetlenie: "textarea má obsah (predvyplnený text), preto sa zatvára." },
    { typ: "poradie", lekcia: "html-4-3", otazka: "Zoraď rozbaľovací zoznam:", riadky: ['<select name="den">', '  <option value="po">pondelok</option>', '  <option value="ut">utorok</option>', "</select>"], vysvetlenie: "select obaľuje možnosti option." },
    { typ: "volba", lekcia: "html-4-4", otazka: "Tlačidlo na zobrazenie hesla vo formulári ho stále odosiela. Čo chýba?", kod: "<button>Ukázať heslo</button>", moznosti: ["<code>type=\"button\"</code>", "<code>type=\"submit\"</code>", "<code>action</code>", "<code>name</code>"], spravna: 0, vysvetlenie: "Bez type je button vo formulári odosielací." },
    { typ: "volba", lekcia: "html-4-4", otazka: "Pri ktorej metóde sa údaje objavia v adrese stránky?", moznosti: ["GET", "POST", "Pri oboch", "Pri žiadnej"], spravna: 0, vysvetlenie: "GET dá údaje za ? do adresy, napr. hladaj.html?q=pizza." },
    { typ: "volba", lekcia: "html-4-4", otazka: "Čo je <code>legend</code>?", moznosti: ["Nadpis skupiny polí vo fieldset", "Popis jedného poľa", "Nápoveda v poli", "Tlačidlo"], spravna: 0, vysvetlenie: "fieldset zoskupuje polia, legend je jeho nadpis." },
    { typ: "doplnenie", lekcia: "html-4-5", otazka: "Doplň povinné pole veku od 18 rokov:", sablona: '<input type="number" name="vek"\n  [[0]] [[1]]="18">', zetony: ["required", "min", "minlength", "max", "need"], spravne: ["required", "min"], vysvetlenie: "required = povinné, min = najmenšie číslo." },
    { typ: "volba", lekcia: "html-4-5", otazka: "Na čo slúži <code>autocomplete=\"email\"</code>?", moznosti: ["Prehliadač ponúkne uložený e-mail", "Skontroluje, či e-mail existuje", "Pošle potvrdzovací e-mail", "Skryje e-mail"], spravna: 0, vysvetlenie: "autocomplete pomáha prehliadaču vyplniť pole uloženými údajmi." },
  ];

  K.registrujModul("html", {
    cislo: 4, nazov: "Formuláre", popis: "Polia, popisy, typy vstupov, výbery, tlačidlá, odoslanie GET a POST a kontrola údajov.",
    lekcie: [L1, L2, L3, L4, L5],
    test: { otazky: TEST, potrebne: 70 },
  });
})();
