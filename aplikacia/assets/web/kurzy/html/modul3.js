/* HTML · Modul 3 · Zoznamy a tabuľky (5 lekcií + test) */
(function () {
  var KOD = function (t, stitok) { return K.blokKodu(t, "html", stitok); };
  var UKAZKA = function (t, vysledok) { return '<div class="kod-obal">' + KOD(t, "Kód") + '<div class="vysledok">' + (vysledok === undefined ? t : vysledok) + "</div></div>"; };
  var TXT = 'font-family="Inter,sans-serif"', MONO = 'font-family="JBMono,monospace"';
  function tabulka(h, r) { return '<div class="tabulka"><table><thead><tr>' + h.map(function (x) { return "<th>" + x + "</th>"; }).join("") + "</tr></thead><tbody>" + r.map(function (x) { return "<tr>" + x.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>"; }
  function textOf(el) { return el ? el.textContent.trim() : ""; }
  /* Tenké čiary pre tabuľky v náhľade (bez CSS by tabuľka nemala žiadne čiary). */
  var CSS_TABULKA = "table { border-collapse: collapse; }\nth, td { border: 1px solid #999; padding: 4px 8px; }\nth { background: #eee; }";

  /* ---------- obrázky ---------- */
  function riadok(x, y, w, h, styl, text, farbaTextu, mono) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" style="' + styl + '"/>' +
      (text ? '<text x="' + (x + 10) + '" y="' + (y + h / 2 + 4) + '" font-size="11.5" ' + (mono ? MONO : TXT) + ' style="fill:' + (farbaTextu || "var(--text)") + '">' + text + "</text>" : "");
  }
  var OBR_ZOZNAMY = '<svg viewBox="0 0 340 150" role="img" aria-label="Tri druhy zoznamov: neočíslovaný s bodkami, očíslovaný s číslami a zoznam pojmov s vysvetlením">' +
    [[6, "ul", "neočíslovaný", ["•", "•", "•"], ["mlieko", "chlieb", "syr"]], [118, "ol", "očíslovaný", ["1.", "2.", "3."], ["zapni", "napíš", "ulož"]]].map(function (z) {
      var s = '<rect x="' + z[0] + '" y="6" width="104" height="138" rx="10" style="fill:var(--surface-2)"/>' +
        '<text x="' + (z[0] + 52) + '" y="28" text-anchor="middle" font-size="14" font-weight="700" ' + MONO + ' style="fill:var(--hl-tag)">&lt;' + z[1] + '&gt;</text>' +
        '<text x="' + (z[0] + 52) + '" y="44" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">' + z[2] + "</text>";
      for (var i = 0; i < 3; i++) s += '<text x="' + (z[0] + 14) + '" y="' + (74 + i * 22) + '" font-size="12" font-weight="700" ' + TXT + ' style="fill:var(--accent)">' + z[3][i] + '</text><text x="' + (z[0] + 34) + '" y="' + (74 + i * 22) + '" font-size="12" ' + TXT + ' style="fill:var(--text)">' + z[4][i] + "</text>";
      return s;
    }).join("") +
    '<rect x="230" y="6" width="104" height="138" rx="10" style="fill:var(--surface-2)"/>' +
    '<text x="282" y="28" text-anchor="middle" font-size="14" font-weight="700" ' + MONO + ' style="fill:var(--hl-tag)">&lt;dl&gt;</text>' +
    '<text x="282" y="44" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">pojmy</text>' +
    '<text x="244" y="72" font-size="12" font-weight="700" ' + TXT + ' style="fill:var(--text)">HTML</text><text x="256" y="88" font-size="11" ' + TXT + ' style="fill:var(--muted)">obsah</text>' +
    '<text x="244" y="112" font-size="12" font-weight="700" ' + TXT + ' style="fill:var(--text)">CSS</text><text x="256" y="128" font-size="11" ' + TXT + ' style="fill:var(--muted)">vzhľad</text></svg>';

  var OBR_VNORENY = '<svg viewBox="0 0 340 132" role="img" aria-label="Vnorený zoznam: položka Ovocie obsahuje vlastný zoznam s jablkom a hruškou">' +
    riadok(6, 8, 150, 26, "fill:var(--code-bg)", "&lt;ul&gt;", "var(--hl-tag)", true) +
    riadok(22, 40, 134, 26, "fill:var(--code-bg)", "&lt;li&gt;Ovocie", "var(--code-text)", true) +
    riadok(38, 72, 118, 26, "fill:var(--code-bg)", "&lt;ul&gt; &lt;li&gt;…", "var(--hl-tag)", true) +
    riadok(22, 104, 134, 22, "fill:var(--code-bg)", "&lt;li&gt;Zelenina", "var(--code-text)", true) +
    '<path d="M162 54h14M162 86h14" style="stroke:var(--accent);stroke-width:2"/>' +
    '<rect x="184" y="8" width="150" height="118" rx="10" style="fill:var(--surface-2)"/>' +
    '<text x="198" y="36" font-size="12.5" ' + TXT + ' style="fill:var(--text)">• Ovocie</text>' +
    '<text x="218" y="60" font-size="12.5" ' + TXT + ' style="fill:var(--text)">◦ jablko</text>' +
    '<text x="218" y="82" font-size="12.5" ' + TXT + ' style="fill:var(--text)">◦ hruška</text>' +
    '<text x="198" y="108" font-size="12.5" ' + TXT + ' style="fill:var(--text)">• Zelenina</text></svg>';

  var OBR_TABULKA = '<svg viewBox="0 0 340 150" role="img" aria-label="Tabuľka sa skladá z riadkov tr. Každý riadok má bunky: hlavičkové th alebo dátové td.">' +
    (function () {
      var s = "", x0 = 40, sirka = 90, vyska = 30, data = [["Deň", "Teplota", "Počasie"], ["Po", "18 °C", "slnko"], ["Ut", "15 °C", "dážď"]];
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          var hl = r === 0;
          s += '<rect x="' + (x0 + c * sirka) + '" y="' + (14 + r * vyska) + '" width="' + sirka + '" height="' + vyska + '" style="fill:' + (hl ? "var(--accent-soft, var(--surface-2))" : "var(--surface)") + ';stroke:var(--line)"/>' +
            '<text x="' + (x0 + c * sirka + 45) + '" y="' + (14 + r * vyska + 19) + '" text-anchor="middle" font-size="12" ' + (hl ? 'font-weight="700" ' : "") + TXT + ' style="fill:var(--text)">' + data[r][c] + "</text>";
        }
        s += '<text x="30" y="' + (14 + r * vyska + 19) + '" text-anchor="end" font-size="11" font-weight="700" ' + MONO + ' style="fill:var(--hl-tag)">tr</text>';
      }
      s += '<path d="M85 112v8M175 112v8" style="stroke:var(--accent);stroke-width:2"/>' +
        '<text x="85" y="134" text-anchor="middle" font-size="11" font-weight="700" ' + MONO + ' style="fill:var(--hl-tag)">td</text>' +
        '<text x="175" y="134" text-anchor="middle" font-size="11" font-weight="700" ' + MONO + ' style="fill:var(--hl-tag)">td</text>' +
        '<text x="85" y="148" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">dátová bunka</text>' +
        '<text x="265" y="134" text-anchor="middle" font-size="11" font-weight="700" ' + MONO + ' style="fill:var(--hl-tag)">th v 1. riadku</text>' +
        '<text x="265" y="148" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">hlavička stĺpca</text>';
      return s;
    })() + "</svg>";

  var OBR_ZLUCENIE = '<svg viewBox="0 0 340 120" role="img" aria-label="colspan spojí bunky vedľa seba, rowspan spojí bunky pod sebou">' +
    '<text x="80" y="14" text-anchor="middle" font-size="11.5" font-weight="700" ' + MONO + ' style="fill:var(--hl-attr)">colspan="2"</text>' +
    '<rect x="10" y="22" width="140" height="30" style="fill:var(--accent);opacity:.85"/><text x="80" y="41" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:#fff">2 stĺpce</text>' +
    '<rect x="10" y="52" width="70" height="30" style="fill:var(--surface);stroke:var(--line)"/><rect x="80" y="52" width="70" height="30" style="fill:var(--surface);stroke:var(--line)"/>' +
    '<rect x="10" y="82" width="70" height="30" style="fill:var(--surface);stroke:var(--line)"/><rect x="80" y="82" width="70" height="30" style="fill:var(--surface);stroke:var(--line)"/>' +
    '<text x="260" y="14" text-anchor="middle" font-size="11.5" font-weight="700" ' + MONO + ' style="fill:var(--hl-attr)">rowspan="2"</text>' +
    '<rect x="190" y="22" width="70" height="60" style="fill:var(--accent);opacity:.85"/><text x="225" y="56" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:#fff">2 riadky</text>' +
    '<rect x="260" y="22" width="70" height="30" style="fill:var(--surface);stroke:var(--line)"/><rect x="260" y="52" width="70" height="30" style="fill:var(--surface);stroke:var(--line)"/>' +
    '<rect x="190" y="82" width="70" height="30" style="fill:var(--surface);stroke:var(--line)"/><rect x="260" y="82" width="70" height="30" style="fill:var(--surface);stroke:var(--line)"/></svg>';

  /* ---------- lekcie ---------- */
  var L1 = { id: "html-3-1", nazov: "Zoznamy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Prečo zoznamy",
      text: "<p>Zoznamy sú na webe všade: nákupný zoznam, kroky receptu, ale aj <b>menu</b> stránky. HTML má tri druhy zoznamov:</p>", obr: OBR_ZOZNAMY,
      podrobne: "<ul><li><code>&lt;ul&gt;</code> (unordered list) je zoznam, kde na poradí nezáleží. Položky majú bodky.</li><li><code>&lt;ol&gt;</code> (ordered list) je zoznam, kde na poradí záleží. Položky sú očíslované.</li><li><code>&lt;dl&gt;</code> (description list) je zoznam pojmov s vysvetlením, ako slovník.</li></ul>" },
    { typ: "vyklad", nadpis: "Neočíslovaný zoznam",
      text: "<p>Zoznam obaľuje značka <code>&lt;ul&gt;</code> a každá položka je v <code>&lt;li&gt;</code> (list item = položka zoznamu):</p>" +
        UKAZKA("<ul>\n  <li>mlieko</li>\n  <li>chlieb</li>\n  <li>syr</li>\n</ul>"),
      podrobne: "<p>Priamo v <code>ul</code> môžu byť <b>len</b> prvky <code>li</code>. Text alebo odsek priamo v <code>ul</code> je chyba. Vnútri <code>li</code> však môže byť čokoľvek: odkaz, obrázok, odsek aj ďalší zoznam.</p>",
      hlbka: "<p>Čítačka obrazovky pri zozname povie „zoznam, 3 položky“. Nevidiaci tak hneď vie, čo ho čaká. Preto zoznam nepíš ako odseky s pomlčkami na začiatku, ale ako skutočný <code>ul</code>. Bodky sa dajú v CSS zmeniť alebo úplne skryť, takže zoznam nemusí vyzerať ako zoznam.</p>" },
    { typ: "volba", otazka: "Ktorá značka označuje jednu položku zoznamu?", moznosti: ["<code>&lt;li&gt;</code>", "<code>&lt;ul&gt;</code>", "<code>&lt;item&gt;</code>", "<code>&lt;p&gt;</code>"], spravna: 0,
      vysvetlenie: "li = list item, položka zoznamu.", preco: [null, "ul obaľuje celý zoznam, nie jednu položku.", "Značka item v HTML neexistuje.", "p je odsek, nie položka zoznamu."] },
    { typ: "vyklad", nadpis: "Očíslovaný zoznam",
      text: "<p>Keď na poradí záleží (postup, rebríček), použi <code>&lt;ol&gt;</code>. Čísla doplní prehliadač sám:</p>" +
        UKAZKA("<ol>\n  <li>Zapni počítač</li>\n  <li>Otvor editor</li>\n  <li>Napíš kód</li>\n</ol>"),
      podrobne: "<p>Keď pridáš alebo vymažeš položku, čísla sa automaticky prečíslujú. Preto čísla nikdy nepíš do textu ručne.</p>" + tabulka(["Atribút", "Čo robí"], [["<code>start=\"5\"</code>", "číslovanie začne od 5"], ["<code>reversed</code>", "číslovanie odzadu (3, 2, 1)"], ["<code>type=\"a\"</code>", "písmená a, b, c (aj A, i, I)"]]) },
    { typ: "doplnenie", otazka: "Doplň očíslovaný zoznam:", sablona: "<[[0]]>\n  <[[1]]>Umy ruky</[[1]]>\n  <[[1]]>Uvar čaj</[[1]]>\n</[[0]]>", zetony: ["ol", "li", "ul", "list", "p"], spravne: ["ol", "li"],
      vysvetlenie: "Postup má poradie, preto ol. Položky sú li." },
    { typ: "volba", otazka: "Čo je v tomto kóde zle?", kod: "<ul>\n  Nákup:\n  <li>mlieko</li>\n</ul>", moznosti: ["Text „Nákup:“ nesmie byť priamo v ul", "Chýba ol", "li musí mať atribút", "Nič"], spravna: 0,
      vysvetlenie: "V ul môžu byť priamo len li. Nadpis zoznamu daj pred zoznam, napr. do odseku p." },
    { typ: "kod", zadanie: "Vytvor neočíslovaný zoznam s tromi položkami: <b>jablká</b>, <b>hrušky</b>, <b>slivky</b>.",
      start: { html: "<h2>Na trh</h2>\n" }, vyska: "190px",
      napoveda: "<code>&lt;ul&gt;</code>, v ňom tri <code>&lt;li&gt;…&lt;/li&gt;</code> a nakoniec <code>&lt;/ul&gt;</code>.",
      riesenie: { html: "<h2>Na trh</h2>\n<ul>\n  <li>jablká</li>\n  <li>hrušky</li>\n  <li>slivky</li>\n</ul>" },
      kontrola: function (d) {
        var ul = d.querySelector("ul"); if (!ul) return d.querySelector("ol") ? "Na poradí tu nezáleží, použi ul namiesto ol." : "Chýba zoznam ul.";
        var li = ul.querySelectorAll("li"); if (li.length !== 3) return "Zoznam má mať 3 položky li, má " + li.length + ".";
        var t = [].map.call(li, function (x) { return textOf(x).toLowerCase(); }).join(",");
        return /jabl/.test(t) && /hru/.test(t) && /sliv/.test(t) ? null : "Položky majú byť jablká, hrušky a slivky.";
      }, vysvetlenie: "Bodky pridal prehliadač sám." },
    { typ: "vyklad", nadpis: "Zhrnutie",
      text: "<ul><li><code>ul</code> pre zoznam bez poradia, <code>ol</code> pre zoznam s poradím.</li><li>Každá položka je v <code>li</code>.</li><li>Priamo v <code>ul</code>/<code>ol</code> sú len <code>li</code>.</li><li>Čísla a bodky pridá prehliadač.</li></ul>" },
  ] };

  var L2 = { id: "html-3-2", nazov: "Vnorené zoznamy a menu", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Zoznam v zozname",
      text: "<p>Položka zoznamu môže obsahovať ďalší zoznam. Tak vznikne osnova alebo podmenu. Vnorený zoznam patrí <b>dovnútra</b> <code>li</code>, pred jeho zatváraciu značku:</p>", obr: OBR_VNORENY,
      podrobne: KOD("<ul>\n  <li>Ovocie\n    <ul>\n      <li>jablko</li>\n      <li>hruška</li>\n    </ul>\n  </li>\n  <li>Zelenina</li>\n</ul>") + "<p>Odsadenie (medzery na začiatku riadkov) prehliadač ignoruje, ale tebe ukáže, čo je v čom.</p>" },
    { typ: "volba", otazka: "Kde má byť vnorený zoznam?", moznosti: ["Vnútri <code>&lt;li&gt;</code>, pred <code>&lt;/li&gt;</code>", "Medzi dvoma <code>&lt;li&gt;</code>", "Za <code>&lt;/ul&gt;</code>", "Kdekoľvek"], spravna: 0,
      vysvetlenie: "Podzoznam patrí k položke, preto je vnútri jej li.", preco: [null, "Priamo v ul môžu byť len li, nie ďalší ul.", "Za </ul> by to už bol samostatný zoznam, nie podzoznam.", null] },
    { typ: "poradie", otazka: "Zoraď vnorený zoznam:", riadky: ["<ul>", "  <li>Šport", "    <ul><li>futbal</li></ul>", "  </li>", "</ul>"], vysvetlenie: "Podzoznam je vnútri li Šport, pred jeho </li>." },
    { typ: "vyklad", nadpis: "Menu stránky",
      text: "<p>Hlavné menu takmer každého webu je v skutočnosti <b>zoznam odkazov</b>. Je to preto, že ide o skupinu rovnocenných položiek:</p>" +
        UKAZKA('<nav>\n  <ul>\n    <li><a href="index.html">Domov</a></li>\n    <li><a href="o-nas.html">O nás</a></li>\n    <li><a href="kontakt.html">Kontakt</a></li>\n  </ul>\n</nav>', '<ul><li><a href="#" onclick="return false">Domov</a></li><li><a href="#" onclick="return false">O nás</a></li><li><a href="#" onclick="return false">Kontakt</a></li></ul>'),
      podrobne: "<p><code>&lt;nav&gt;</code> (navigation) označí, že ide o navigáciu. Bližšie ho spoznáš v Module 5. Vodorovné menu bez bodiek z neho spraví až CSS.</p>" },
    { typ: "doplnenie", otazka: "Doplň položku menu:", sablona: '<ul>\n  <[[0]]><[[1]] href="blog.html">Blog</[[1]]></[[0]]>\n</ul>', zetony: ["li", "a", "link", "ul", "nav"], spravne: ["li", "a"],
      vysvetlenie: "Položka zoznamu li obsahuje odkaz a." },
    { typ: "kod", zadanie: "Doplň menu: zoznam <code>ul</code> s dvoma položkami. Každá je odkaz: <b>Domov</b> na <code>index.html</code> a <b>Kontakt</b> na <code>kontakt.html</code>.",
      start: { html: "<nav>\n  \n</nav>" }, vyska: "190px",
      napoveda: '<code>&lt;ul&gt;&lt;li&gt;&lt;a href="index.html"&gt;Domov&lt;/a&gt;&lt;/li&gt; …&lt;/ul&gt;</code>',
      riesenie: { html: '<nav>\n  <ul>\n    <li><a href="index.html">Domov</a></li>\n    <li><a href="kontakt.html">Kontakt</a></li>\n  </ul>\n</nav>' },
      kontrola: function (d) {
        var ul = d.querySelector("nav ul"); if (!ul) return "V nav chýba zoznam ul.";
        var li = ul.querySelectorAll(":scope > li"); if (li.length !== 2) return "Menu má mať 2 položky li, má " + li.length + ".";
        var a1 = li[0].querySelector("a"), a2 = li[1].querySelector("a");
        if (!a1 || !a2) return "Každá položka li má obsahovať odkaz a.";
        if (a1.getAttribute("href") !== "index.html" || !/domov/i.test(textOf(a1))) return "Prvý odkaz: text Domov, href=\"index.html\".";
        return a2.getAttribute("href") === "kontakt.html" && /kontakt/i.test(textOf(a2)) ? null : "Druhý odkaz: text Kontakt, href=\"kontakt.html\".";
      }, vysvetlenie: "Presne takto vyzerá kostra menu na väčšine webov." },
    { typ: "vyklad", nadpis: "Zoznam pojmov",
      text: "<p>Na slovníček alebo otázky a odpovede je <code>&lt;dl&gt;</code>. Pojem je v <code>&lt;dt&gt;</code> (term), vysvetlenie v <code>&lt;dd&gt;</code> (description):</p>" +
        UKAZKA("<dl>\n  <dt>HTML</dt>\n  <dd>jazyk obsahu stránky</dd>\n  <dt>CSS</dt>\n  <dd>jazyk vzhľadu</dd>\n</dl>"),
      podrobne: "<p>Jeden pojem môže mať aj viac vysvetlení (viac <code>dd</code> za sebou). Hodí sa aj na technické parametre: <i>Hmotnosť – 1,2 kg</i>.</p>" },
    { typ: "volba", otazka: "V čom je vysvetlenie pojmu v zozname dl?", moznosti: ["<code>&lt;dd&gt;</code>", "<code>&lt;dt&gt;</code>", "<code>&lt;li&gt;</code>", "<code>&lt;p&gt;</code>"], spravna: 0, vysvetlenie: "dt = pojem (term), dd = vysvetlenie (description)." },
  ] };

  var L3 = { id: "html-3-3", nazov: "Tabuľky", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Kedy tabuľka",
      text: "<p>Tabuľka je na údaje, ktoré majú <b>riadky a stĺpce</b>: rozvrh, cenník, výsledky zápasov. Skladá sa z riadkov a riadky z buniek:</p>", obr: OBR_TABULKA,
      podrobne: tabulka(["Značka", "Význam"], [["<code>&lt;table&gt;</code>", "celá tabuľka"], ["<code>&lt;tr&gt;</code>", "riadok (table row)"], ["<code>&lt;th&gt;</code>", "hlavičková bunka (table header), tučne a na stred"], ["<code>&lt;td&gt;</code>", "bežná bunka s údajom (table data)"]]),
      hlbka: "<p>Kedysi sa tabuľkami robilo rozloženie celých stránok (menu vľavo, obsah vpravo). Dnes je to chyba: čítačka by obsah čítala ako tabuľku a na mobile sa to nedá prispôsobiť. Na rozloženie je CSS (Flexbox a Grid). Tabuľka je len na tabuľkové údaje.</p>" },
    { typ: "vyklad", nadpis: "Prvá tabuľka",
      text: "<p>Tabuľka sa píše po riadkoch. Každý riadok <code>tr</code> obsahuje toľko buniek, koľko je stĺpcov:</p>" +
        UKAZKA("<table>\n  <tr>\n    <th>Deň</th>\n    <th>Teplota</th>\n  </tr>\n  <tr>\n    <td>Pondelok</td>\n    <td>18 °C</td>\n  </tr>\n</table>"),
      podrobne: "<p><b>Pozor:</b> samotné HTML tabuľke čiary nekreslí. V ukážkach ich pridávame cez CSS, ktoré sa naučíš v ďalšom kurze. Bez CSS by boli bunky len zarovnané pod sebou.</p>" },
    { typ: "volba", otazka: "Ktorá značka je riadok tabuľky?", moznosti: ["<code>&lt;tr&gt;</code>", "<code>&lt;td&gt;</code>", "<code>&lt;th&gt;</code>", "<code>&lt;row&gt;</code>"], spravna: 0,
      vysvetlenie: "tr = table row.", preco: [null, "td je jedna bunka s údajom.", "th je hlavičková bunka.", "Značka row neexistuje."] },
    { typ: "volba", otazka: "Kedy použiješ <code>th</code> namiesto <code>td</code>?", moznosti: ["Pre nadpis stĺpca alebo riadku", "Keď chceš tučný text", "Pre posledný riadok", "Pre čísla"], spravna: 0,
      vysvetlenie: "th označuje hlavičku. To, že je tučná, je len vedľajší efekt. Čítačka podľa th vie, ku ktorému stĺpcu údaj patrí." },
    { typ: "poradie", otazka: "Zoraď riadok tabuľky:", riadky: ["<tr>", "  <td>Jana</td>", "  <td>1:52</td>", "</tr>"], vysvetlenie: "Bunky td sú vnútri riadku tr." },
    { typ: "kod", zadanie: "Doplň do tabuľky druhý riadok s bunkami <b>Peter</b> a <b>15</b>.",
      start: { html: "<table>\n  <tr>\n    <th>Meno</th>\n    <th>Vek</th>\n  </tr>\n  \n</table>", css: CSS_TABULKA }, vyska: "220px",
      napoveda: "<code>&lt;tr&gt;&lt;td&gt;Peter&lt;/td&gt;&lt;td&gt;15&lt;/td&gt;&lt;/tr&gt;</code>",
      riesenie: { html: "<table>\n  <tr>\n    <th>Meno</th>\n    <th>Vek</th>\n  </tr>\n  <tr>\n    <td>Peter</td>\n    <td>15</td>\n  </tr>\n</table>" },
      kontrola: function (d) {
        var tr = d.querySelectorAll("table tr"); if (tr.length < 2) return "Tabuľka má mať 2 riadky tr, má " + tr.length + ".";
        var td = tr[1].querySelectorAll("td"); if (td.length !== 2) return "Druhý riadok má mať 2 bunky td, má " + td.length + ".";
        return textOf(td[0]) === "Peter" && textOf(td[1]) === "15" ? null : "Bunky majú obsahovať Peter a 15.";
      }, vysvetlenie: "Čiary v náhľade kreslí pripravené CSS." },
    { typ: "vyklad", nadpis: "Zhrnutie",
      text: "<ul><li><code>table</code> obaľuje tabuľku.</li><li><code>tr</code> je riadok, v ňom bunky.</li><li><code>th</code> = hlavička, <code>td</code> = údaj.</li><li>Tabuľky len na údaje, nie na rozloženie stránky.</li></ul>" },
  ] };

  var L4 = { id: "html-3-4", nazov: "Štruktúra tabuľky", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Nadpis tabuľky",
      text: "<p><code>&lt;caption&gt;</code> je nadpis tabuľky. Píše sa hneď za <code>&lt;table&gt;</code>:</p>" +
        KOD("<table>\n  <caption>Rozvrh na pondelok</caption>\n  …\n</table>"),
      podrobne: "<p>Caption pomôže každému: vidiaci hneď vie, čo tabuľka obsahuje, a čítačka ho prečíta ako prvé.</p>" },
    { typ: "vyklad", nadpis: "Hlava, telo, päta",
      text: "<p>Dlhšie tabuľky sa delia na tri časti:</p>" + tabulka(["Značka", "Obsah"], [["<code>&lt;thead&gt;</code>", "riadok s nadpismi stĺpcov"], ["<code>&lt;tbody&gt;</code>", "riadky s údajmi"], ["<code>&lt;tfoot&gt;</code>", "súčet, priemer, poznámka"]]) +
        KOD("<table>\n  <thead>\n    <tr><th>Položka</th><th>Cena</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Káva</td><td>2 €</td></tr>\n    <tr><td>Koláč</td><td>3 €</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><td>Spolu</td><td>5 €</td></tr>\n  </tfoot>\n</table>"),
      podrobne: "<ul><li>Pri tlači dlhej tabuľky na viac strán prehliadač zopakuje <code>thead</code> na každej strane.</li><li>CSS potom vie ľahko zafarbiť hlavičku inak ako telo.</li><li>Ak <code>tbody</code> nenapíšeš, prehliadač si ho doplní sám.</li></ul>" },
    { typ: "volba", otazka: "Kam patrí riadok „Spolu: 5 €“?", moznosti: ["<code>&lt;tfoot&gt;</code>", "<code>&lt;thead&gt;</code>", "<code>&lt;caption&gt;</code>", "<code>&lt;th&gt;</code>"], spravna: 0, vysvetlenie: "tfoot = päta tabuľky: súčty a zhrnutia." },
    { typ: "doplnenie", otazka: "Doplň časti tabuľky:", sablona: "<table>\n  <[[0]]>Cenník</[[0]]>\n  <[[1]]><tr><th>Káva</th></tr></[[1]]>\n  <[[2]]><tr><td>2 €</td></tr></[[2]]>\n</table>", zetony: ["caption", "thead", "tbody", "title", "head"], spravne: ["caption", "thead", "tbody"],
      vysvetlenie: "caption = nadpis tabuľky, thead = hlavička, tbody = údaje." },
    { typ: "vyklad", nadpis: "Spájanie buniek",
      text: "<p>Bunka sa môže roztiahnuť cez viac stĺpcov alebo riadkov:</p>", obr: OBR_ZLUCENIE,
      podrobne: UKAZKA('<table>\n  <tr><th colspan="2">Víkend</th></tr>\n  <tr><td>sobota</td><td>nedeľa</td></tr>\n</table>', '<table style="border-collapse:collapse"><tr><th colspan="2" style="border:1px solid #999;padding:4px 8px">Víkend</th></tr><tr><td style="border:1px solid #999;padding:4px 8px">sobota</td><td style="border:1px solid #999;padding:4px 8px">nedeľa</td></tr></table>') +
        "<p>Keď bunka zaberie 2 stĺpce, v tom riadku napíšeš o jednu bunku menej. Pri <code>rowspan</code> vynecháš bunku v riadkoch pod ňou.</p>" },
    { typ: "volba", otazka: "Tabuľka má 3 stĺpce. Prvý riadok má jednu bunku cez celú šírku. Aký atribút jej dáš?", moznosti: ["<code>colspan=\"3\"</code>", "<code>rowspan=\"3\"</code>", "<code>width=\"3\"</code>", "<code>span=\"all\"</code>"], spravna: 0, vysvetlenie: "colspan = koľko stĺpcov bunka zaberie." },
    { typ: "kod", zadanie: "Pridaj tabuľke nadpis <code>caption</code> s textom <b>Výsledky</b> a hlavičku <code>th</code> nad oboma stĺpcami spoj do jednej bunky s textom <b>Kolo 1</b> (<code>colspan=\"2\"</code>).",
      start: { html: "<table>\n  <tr>\n    <th>Tím A</th>\n    <th>Tím B</th>\n  </tr>\n  <tr>\n    <td>2</td>\n    <td>1</td>\n  </tr>\n</table>", css: CSS_TABULKA }, vyska: "240px",
      napoveda: "Za <code>&lt;table&gt;</code> napíš <code>&lt;caption&gt;Výsledky&lt;/caption&gt;</code> a potom nový riadok <code>&lt;tr&gt;&lt;th colspan=\"2\"&gt;Kolo 1&lt;/th&gt;&lt;/tr&gt;</code>.",
      riesenie: { html: '<table>\n  <caption>Výsledky</caption>\n  <tr>\n    <th colspan="2">Kolo 1</th>\n  </tr>\n  <tr>\n    <th>Tím A</th>\n    <th>Tím B</th>\n  </tr>\n  <tr>\n    <td>2</td>\n    <td>1</td>\n  </tr>\n</table>' },
      kontrola: function (d) {
        var c = d.querySelector("table caption"); if (!c) return "Chýba caption.";
        if (!/v[ýy]sledky/i.test(textOf(c))) return "Nadpis tabuľky má byť Výsledky.";
        var th = d.querySelector('th[colspan="2"]'); if (!th) return "Chýba bunka th s colspan=\"2\".";
        return /kolo\s*1/i.test(textOf(th)) ? null : "Spojená bunka má obsahovať Kolo 1.";
      }, vysvetlenie: "Bunka Kolo 1 sa roztiahla nad oba stĺpce." },
  ] };

  var L5 = { id: "html-3-5", nazov: "Kedy zoznam, kedy tabuľka", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Ako sa rozhodnúť",
      text: "<p>Pri každom obsahu sa spýtaj, <b>aký tvar</b> majú údaje:</p>" + tabulka(["Tvar údajov", "Použi"], [["skupina vecí, poradie nehrá rolu", "<code>ul</code>"], ["kroky, poradie, rebríček", "<code>ol</code>"], ["pojem a vysvetlenie", "<code>dl</code>"], ["viac vlastností pre viac vecí (riadky × stĺpce)", "<code>table</code>"], ["súvislý text", "<code>p</code>"]]),
      podrobne: "<p>Dobrý test pre tabuľku: dá sa to otvoriť v Exceli a malo by to zmysel? Ak áno, je to tabuľka. Ak by bol v Exceli len jeden stĺpec, je to zoznam.</p>" },
    { typ: "volba", otazka: "Postup inštalácie aplikácie v 5 krokoch:", moznosti: ["<code>ol</code>", "<code>ul</code>", "<code>table</code>", "<code>dl</code>"], spravna: 0, vysvetlenie: "Kroky majú poradie, preto očíslovaný zoznam." },
    { typ: "volba", otazka: "Porovnanie 3 telefónov podľa ceny, batérie a fotoaparátu:", moznosti: ["<code>table</code>", "<code>ul</code>", "<code>ol</code>", "tri odseky"], spravna: 0, vysvetlenie: "Viac vecí × viac vlastností = riadky a stĺpce = tabuľka." },
    { typ: "volba", otazka: "Zoznam vecí, ktoré si zbaliť na tábor:", moznosti: ["<code>ul</code>", "<code>ol</code>", "<code>table</code>", "<code>dl</code>"], spravna: 0, vysvetlenie: "Poradie nehrá rolu, takže ul." },
    { typ: "volba", otazka: "Slovníček pojmov s vysvetleniami:", moznosti: ["<code>dl</code>", "<code>table</code>", "<code>ol</code>", "<code>ul</code>"], spravna: 0, vysvetlenie: "Pojem + vysvetlenie = dl s dt a dd." },
    { typ: "kod", zadanie: "Vytvor stránku receptu: nadpis <code>h1</code> <b>Palacinky</b>, potom zoznam surovín v <code>ul</code> (aspoň 3) a postup v <code>ol</code> (aspoň 3 kroky).",
      start: { html: "" }, vyska: "260px",
      napoveda: "Suroviny: <code>&lt;ul&gt;&lt;li&gt;múka&lt;/li&gt;…&lt;/ul&gt;</code>. Postup: <code>&lt;ol&gt;&lt;li&gt;Zmiešaj…&lt;/li&gt;…&lt;/ol&gt;</code>.",
      riesenie: { html: "<h1>Palacinky</h1>\n<h2>Suroviny</h2>\n<ul>\n  <li>múka</li>\n  <li>mlieko</li>\n  <li>vajce</li>\n</ul>\n<h2>Postup</h2>\n<ol>\n  <li>Všetko zmiešaj.</li>\n  <li>Rozohrej panvicu.</li>\n  <li>Opeč z oboch strán.</li>\n</ol>" },
      kontrola: function (d) {
        var h = d.querySelector("h1"); if (!h || !/palacink/i.test(textOf(h))) return "Chýba nadpis h1 Palacinky.";
        var ul = d.querySelector("ul"); if (!ul) return "Chýba zoznam surovín ul.";
        if (ul.querySelectorAll("li").length < 3) return "Surovín má byť aspoň 3.";
        var ol = d.querySelector("ol"); if (!ol) return "Chýba postup v ol.";
        if (ol.querySelectorAll("li").length < 3) return "Postup má mať aspoň 3 kroky.";
        return ul.compareDocumentPosition(ol) & 4 ? null : "Suroviny (ul) majú byť pred postupom (ol).";
      }, vysvetlenie: "Toto je základ záverečného projektu Recept." },
    { typ: "vyklad", nadpis: "Modul 3 máš za sebou",
      text: "<ul><li><code>ul</code>, <code>ol</code>, <code>li</code> a vnorené zoznamy.</li><li>Menu ako zoznam odkazov v <code>nav</code>.</li><li><code>dl</code>, <code>dt</code>, <code>dd</code> pre pojmy.</li><li><code>table</code>, <code>tr</code>, <code>th</code>, <code>td</code>, <code>caption</code>, <code>thead</code>, <code>tbody</code>, <code>tfoot</code>.</li><li><code>colspan</code> a <code>rowspan</code>.</li></ul>",
      tip: "Teraz test. Potom ťa čaká Modul 4: formuláre." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "html-3-1", otazka: "Aký zoznam použiješ na rebríček 10 najlepších filmov?", moznosti: ["<code>ol</code>", "<code>ul</code>", "<code>dl</code>", "<code>table</code>"], spravna: 0, vysvetlenie: "V rebríčku záleží na poradí." },
    { typ: "volba", lekcia: "html-3-1", otazka: "Čo zobrazí tento kód?", kod: '<ol start="3">\n  <li>A</li>\n  <li>B</li>\n</ol>', moznosti: ["3. A, 4. B", "1. A, 2. B", "3. A, 3. B", "• A, • B"], spravna: 0, vysvetlenie: "start určuje, od ktorého čísla sa začína." },
    { typ: "doplnenie", lekcia: "html-3-1", otazka: "Doplň zoznam bez poradia:", sablona: "<[[0]]>\n  <[[1]]>pero</[[1]]>\n</[[0]]>", zetony: ["ul", "li", "ol", "item"], spravne: ["ul", "li"], vysvetlenie: "ul s položkami li." },
    { typ: "volba", lekcia: "html-3-2", otazka: "Ktorý zápis vnoreného zoznamu je správny?", moznosti: ["<code>&lt;li&gt;A &lt;ul&gt;&lt;li&gt;B&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;</code>", "<code>&lt;li&gt;A&lt;/li&gt; &lt;ul&gt;&lt;li&gt;B&lt;/li&gt;&lt;/ul&gt;</code> priamo v ul", "<code>&lt;ul&gt;&lt;ul&gt;B&lt;/ul&gt;&lt;/ul&gt;</code>", "<code>&lt;li&gt;&lt;li&gt;B&lt;/li&gt;&lt;/li&gt;</code>"], spravna: 0, vysvetlenie: "Podzoznam je vnútri li, ku ktorému patrí." },
    { typ: "volba", lekcia: "html-3-2", otazka: "Ako sa zvyčajne píše hlavné menu webu?", moznosti: ["Zoznam odkazov ul v nav", "Tabuľka s odkazmi", "Odseky p s odkazmi", "Obrázky"], spravna: 0, vysvetlenie: "Menu je skupina rovnocenných odkazov, teda zoznam." },
    { typ: "volba", lekcia: "html-3-2", otazka: "Čo je v <code>&lt;dt&gt;</code>?", moznosti: ["Pojem", "Vysvetlenie pojmu", "Celý zoznam", "Číslo položky"], spravna: 0, vysvetlenie: "dt = term (pojem), dd = vysvetlenie." },
    { typ: "volba", lekcia: "html-3-3", otazka: "Z čoho sa skladá riadok tabuľky?", moznosti: ["Z buniek th alebo td", "Zo stĺpcov col", "Z odsekov p", "Z položiek li"], spravna: 0, vysvetlenie: "tr obsahuje bunky th (hlavička) alebo td (údaj)." },
    { typ: "volba", lekcia: "html-3-3", otazka: "Prečo by si tabuľkou nemal robiť rozloženie celej stránky?", moznosti: ["Čítačky ju čítajú ako údaje a na mobile sa nedá prispôsobiť", "Tabuľky nefungujú v Chrome", "Tabuľka môže mať najviac 10 riadkov", "Nie je dôvod"], spravna: 0, vysvetlenie: "Na rozloženie je CSS. Tabuľka je len na tabuľkové údaje." },
    { typ: "poradie", lekcia: "html-3-3", otazka: "Zoraď najmenšiu tabuľku:", riadky: ["<table>", "  <tr>", "    <td>1</td>", "  </tr>", "</table>"], vysvetlenie: "table > tr > td." },
    { typ: "volba", lekcia: "html-3-4", otazka: "Kam patrí nadpis „Cenník 2026“ priamo v tabuľke?", moznosti: ["<code>&lt;caption&gt;</code>", "<code>&lt;thead&gt;</code>", "<code>&lt;title&gt;</code>", "<code>&lt;h1&gt;</code> medzi riadky"], spravna: 0, vysvetlenie: "caption je nadpis tabuľky, hneď za <table>." },
    { typ: "volba", lekcia: "html-3-4", otazka: "Bunka má <code>rowspan=\"2\"</code>. Čo to znamená?", moznosti: ["Zaberá 2 riadky pod sebou", "Zaberá 2 stĺpce vedľa seba", "Je 2× širšia", "Opakuje sa 2-krát"], spravna: 0, vysvetlenie: "row = riadok. colspan by spojil stĺpce." },
    { typ: "doplnenie", lekcia: "html-3-4", otazka: "Doplň časti tabuľky:", sablona: "<table>\n  <[[0]]>…nadpisy stĺpcov…</[[0]]>\n  <[[1]]>…údaje…</[[1]]>\n  <[[2]]>…súčet…</[[2]]>\n</table>", zetony: ["thead", "tbody", "tfoot", "head", "body"], spravne: ["thead", "tbody", "tfoot"], vysvetlenie: "Hlava, telo a päta tabuľky." },
    { typ: "volba", lekcia: "html-3-5", otazka: "Rozpis zápasov: dátum, súper, miesto, výsledok. Čo použiješ?", moznosti: ["<code>table</code>", "<code>ol</code>", "<code>ul</code>", "<code>dl</code>"], spravna: 0, vysvetlenie: "Viac zápasov × viac vlastností = tabuľka." },
  ];

  K.registrujModul("html", {
    cislo: 3, nazov: "Zoznamy a tabuľky", popis: "Neočíslované, očíslované a vnorené zoznamy, menu, zoznam pojmov a tabuľky s hlavičkou, popisom a spájaním buniek.",
    lekcie: [L1, L2, L3, L4, L5],
    test: { otazky: TEST, potrebne: 70 },
  });
})();
