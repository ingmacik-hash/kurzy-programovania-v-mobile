/* HTML · Modul 2 · Odkazy a obrázky (5 lekcií + test) */
(function () {
  var KOD = function (t, stitok) { return K.blokKodu(t, "html", stitok); };
  var UKAZKA = function (t, vysledok) { return '<div class="kod-obal">' + KOD(t, "Kód") + '<div class="vysledok">' + (vysledok === undefined ? t : vysledok) + "</div></div>"; };
  var TXT = 'font-family="Inter,sans-serif"', MONO = 'font-family="JBMono,monospace"';
  function tabulka(h, r) { return '<div class="tabulka"><table><thead><tr>' + h.map(function (x) { return "<th>" + x + "</th>"; }).join("") + "</tr></thead><tbody>" + r.map(function (x) { return "<tr>" + x.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>"; }
  function textOf(el) { return el ? el.textContent.trim() : ""; }

  /* Obrázky, ktoré fungujú aj bez internetu (SVG zapísané priamo v adrese). */
  var OBR_SLNKO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 80'%3E%3Crect width='120' height='80' fill='%23bfe3ff'/%3E%3Ccircle cx='90' cy='22' r='12' fill='%23ffc93c'/%3E%3Cpath d='M0 80 40 34l26 30 16-16 38 32z' fill='%232e8b57'/%3E%3C/svg%3E";
  var OBR_MACKA = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23fdebd3'/%3E%3Cpath d='M25 40 30 18l14 14h12l14-14 5 22c6 8 6 30-25 38-31-8-31-30-25-38z' fill='%23e0822b'/%3E%3Ccircle cx='40' cy='50' r='4'/%3E%3Ccircle cx='60' cy='50' r='4'/%3E%3Cpath d='M46 60h8l-4 4z'/%3E%3C/svg%3E";

  var OBR_URL = '<svg viewBox="0 0 340 120" role="img" aria-label="Časti webovej adresy: protokol, doména, cesta a kotva">' +
    '<rect x="2" y="30" width="336" height="40" rx="9" style="fill:var(--code-bg)"/>' +
    '<text x="170" y="56" text-anchor="middle" font-size="12" ' + MONO + '><tspan style="fill:var(--hl-kw)">https://</tspan><tspan style="fill:var(--hl-tag)">sk.wikipedia.org</tspan><tspan style="fill:var(--hl-str)">/wiki/HTML</tspan><tspan style="fill:var(--hl-attr)">#Dejiny</tspan></text>' +
    '<path d="M24 76v7h50v-7M80 76v7h124v-7M210 76v7h70v-7M286 76v7h48v-7" style="fill:none;stroke:var(--accent);stroke-width:2"/>' +
    [[49, "protokol", "spojenie"], [142, "doména", "ktorý web"], [245, "cesta", "stránka"], [310, "kotva", "miesto"]].map(function (x) {
      return '<text x="' + x[0] + '" y="98" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">' + x[1] + '</text><text x="' + x[0] + '" y="112" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">' + x[2] + "</text>";
    }).join("") + '<text x="170" y="18" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--hl-sel)">adresa = URL (Uniform Resource Locator)</text></svg>';

  function subor(x, y, meno, prieč) {
    return (prieč ? '<path d="M' + x + " " + (y + 3) + "h9l3 3h12v12h-24z" + '" style="fill:var(--flame)"/>' : '<path d="M' + (x + 3) + " " + y + "h12l6 6v15h-18z" + '" style="fill:var(--surface-2);stroke:var(--muted)"/>') +
      '<text x="' + (x + 30) + '" y="' + (y + 15) + '" font-size="12" ' + MONO + ' style="fill:var(--text)">' + meno + "</text>";
  }
  var OBR_PRIECINKY = '<svg viewBox="0 0 340 168" role="img" aria-label="Priečinok web obsahuje index.html, kontakt.html, priečinok obrazky s pes.jpg a priečinok clanky s recept.html">' +
    '<path d="M18 30v118M18 52h16M18 76h16M18 100h16M18 148h16M50 124v0" style="fill:none;stroke:var(--line);stroke-width:2"/><path d="M58 108v16h16" style="fill:none;stroke:var(--line);stroke-width:2"/><path d="M58 156v0" />' +
    subor(6, 6, "web/", true) + subor(36, 42, "index.html") + subor(36, 66, "kontakt.html") + subor(36, 90, "obrazky/", true) + subor(76, 114, "pes.jpg") + subor(36, 138, "clanky/", true) +
    '<path d="M58 156v6" style="fill:none;stroke:var(--line)"/>' +
    '<rect x="186" y="40" width="148" height="122" rx="10" style="fill:var(--surface-2)"/>' +
    '<text x="196" y="60" font-size="10.5" font-weight="700" ' + TXT + ' style="fill:var(--muted)">Z index.html:</text>' +
    '<text x="196" y="80" font-size="11" ' + MONO + ' style="fill:var(--hl-str)">kontakt.html</text>' +
    '<text x="196" y="98" font-size="11" ' + MONO + ' style="fill:var(--hl-str)">obrazky/pes.jpg</text>' +
    '<text x="196" y="122" font-size="10.5" font-weight="700" ' + TXT + ' style="fill:var(--muted)">Z clanky/recept.html:</text>' +
    '<text x="196" y="142" font-size="11" ' + MONO + ' style="fill:var(--hl-str)">../index.html</text></svg>';

  var OBR_BITMAPA = '<svg viewBox="0 0 340 130" role="img" aria-label="Bitmapový obrázok je pri zväčšení kockatý, vektorový zostane ostrý">' +
    (function () {
      var s = "", n = 10, v = 9;
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) { var dx = x - 4.5, dy = y - 4.5; if (dx * dx + dy * dy <= 20) s += '<rect x="' + (30 + x * v) + '" y="' + (12 + y * v) + '" width="' + v + '" height="' + v + '" style="fill:var(--accent)"/>'; }
      return s;
    })() +
    '<circle cx="250" cy="57" r="42" style="fill:var(--accent)"/>' +
    '<text x="75" y="122" text-anchor="middle" font-size="12" font-weight="700" ' + TXT + ' style="fill:var(--text)">Bitmapa (JPG, PNG)</text>' +
    '<text x="250" y="122" text-anchor="middle" font-size="12" font-weight="700" ' + TXT + ' style="fill:var(--text)">Vektor (SVG)</text></svg>';

  /* ---------- lekcie ---------- */
  var L1 = { id: "html-2-1", nazov: "Odkazy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Čo je odkaz",
      text: "<p>Odkaz (anglicky <i>link</i>) je text alebo obrázok, na ktorý ťukneš a dostaneš sa inam. Odkazy spájajú milióny stránok do jedného webu. Píšu sa značkou <code>&lt;a&gt;</code> (anchor = kotva):</p>" +
        UKAZKA('<a href="https://sk.wikipedia.org">Slovenská Wikipédia</a>', '<a href="#" onclick="return false">Slovenská Wikipédia</a>'),
      podrobne: "<ul><li><code>href</code> je adresa, kam odkaz vedie. Bez neho odkaz nikam nevedie.</li><li>Text medzi značkami je to, čo používateľ uvidí a na čo ťukne.</li><li>Prehliadač odkaz automaticky podčiarkne a zafarbí. Navštívené odkazy majú inú farbu (zvyčajne fialovú).</li></ul>",
      hlbka: "<p>Text odkazu má hovoriť, <b>kam vedie</b>. „Kliknite sem“ je zlý text: čítačka obrazovky často číta zoznam všetkých odkazov na stránke a desaťkrát „kliknite sem“ nikomu nepomôže. Lepšie je „Cenník služieb“ alebo „Stiahnuť prihlášku (PDF)“.</p>" },
    { typ: "vyklad", nadpis: "Webová adresa",
      text: "<p>Hodnota <code>href</code> je najčastejšie webová adresa, odborne <b>URL</b>. Má niekoľko častí:</p>", obr: OBR_URL,
      podrobne: "<ul><li><b>Protokol</b> <code>https://</code> hovorí, ako sa prehliadač so serverom spojí. „s“ znamená zabezpečené (šifrované) spojenie.</li><li><b>Doména</b> je meno webu, napr. <code>sme.sk</code>.</li><li><b>Cesta</b> určuje konkrétnu stránku na webe.</li><li><b>Kotva</b> za <code>#</code> skočí na konkrétne miesto na stránke.</li></ul>",
      hlbka: "<p>Za cestou môže byť ešte <b>dopyt</b> (query) za otáznikom, napr. <code>?q=html&amp;strana=2</code>. Tak vyhľadávače a e-shopy posielajú, čo hľadáš. Jednotlivé časti sú oddelené znakom <code>&amp;</code>, a preto ho v HTML odkaze treba písať ako <code>&amp;amp;</code>. Prehliadače sú však zhovievavé a fungujú aj s obyčajným &.</p>" },
    { typ: "volba", otazka: "Ktorý atribút určuje, kam odkaz vedie?", moznosti: ["<code>href</code>", "<code>src</code>", "<code>link</code>", "<code>url</code>"], spravna: 0,
      vysvetlenie: "href = hypertext reference, adresa odkazu.", preco: [null, "src sa používa pri obrázkoch a médiách, nie pri odkazoch.", "Atribút link neexistuje. Existuje však značka <link> v head na pripojenie štýlov.", "Atribút url v HTML neexistuje."] },
    { typ: "vyklad", nadpis: "Otvoriť v novej karte",
      text: "<p>Atribút <code>target=\"_blank\"</code> otvorí odkaz v novej karte prehliadača. Hodí sa na odkazy na iné weby, aby návštevník neodišiel z tvojej stránky:</p>" + KOD('<a href="https://sme.sk" target="_blank" rel="noopener">Správy SME</a>'),
      podrobne: "<p><b>Nepoužívaj to všade.</b> Ľudia sú zvyknutí, že odkaz sa otvorí v tej istej karte a že sa vrátia tlačidlom Späť. Novú kartu použi len pri odkazoch mimo tvoj web alebo na dokumenty (PDF).</p>",
      hlbka: "<p><code>rel=\"noopener\"</code> zabráni tomu, aby otvorená stránka mohla cez JavaScript ovládať pôvodnú kartu. Moderné prehliadače to pri <code>_blank</code> robia automaticky, ale zápis sa stále používa kvôli starším prehliadačom. Hodnota <code>noreferrer</code> navyše cieľovému webu nepovie, odkiaľ návštevník prišiel.</p>" },
    { typ: "doplnenie", otazka: "Doplň odkaz tak, aby sa otvoril v novej karte:", sablona: '<a href="https://sme.sk" [[0]]="[[1]]">\n  SME\n</a>', zetony: ["target", "_blank", "new", "open", "href"], spravne: ["target", "_blank"],
      vysvetlenie: "target=\"_blank\" otvorí odkaz v novej karte." },
    { typ: "vyklad", nadpis: "E-mail a telefón",
      text: "<p>Odkaz nemusí viesť len na web. Môže otvoriť e-mail alebo vytočiť číslo:</p>" + KOD('<a href="mailto:info@firma.sk">Napíšte nám</a>\n<a href="tel:+421900123456">Zavolajte nám</a>'),
      podrobne: "<p><code>mailto:</code> otvorí aplikáciu na e-maily s vyplneným adresátom. <code>tel:</code> na mobile ponúkne vytočenie čísla. Číslo píš v medzinárodnom tvare bez medzier (+421…), aby fungovalo všade.</p><p>Do <code>mailto:</code> sa dá pridať aj predmet: <code>mailto:info@firma.sk?subject=Objednávka</code>.</p>" },
    { typ: "volba", otazka: "Čo urobí tento odkaz na mobile?", kod: '<a href="tel:+421900123456">Zavolať</a>', moznosti: ["Ponúkne vytočenie čísla", "Otvorí webovú stránku", "Pošle SMS", "Nič, je to chyba"], spravna: 0, vysvetlenie: "tel: otvorí telefón s predvyplneným číslom." },
    { typ: "kod", zadanie: "Vytvor odkaz s textom <b>Wikipédia</b>, ktorý vedie na <code>https://sk.wikipedia.org</code> a otvorí sa v novej karte.", start: { html: "<p>Moja obľúbená stránka:</p>\n" }, vyska: "160px",
      napoveda: 'Potrebuješ značku a s dvoma atribútmi: <code>&lt;a href="https://sk.wikipedia.org" target="_blank"&gt;Wikipédia&lt;/a&gt;</code>',
      riesenie: { html: '<p>Moja obľúbená stránka:</p>\n<a href="https://sk.wikipedia.org" target="_blank">Wikipédia</a>' },
      kontrola: function (d) {
        var a = d.querySelector("a"); if (!a) return "Chýba odkaz <a>.";
        if (!/^https:\/\/sk\.wikipedia\.org\/?$/.test(a.getAttribute("href") || "")) return "Adresa v href má byť presne https://sk.wikipedia.org";
        if (textOf(a) !== "Wikipédia") return "Text odkazu má byť Wikipédia.";
        return a.getAttribute("target") === "_blank" ? null : "Odkaz sa má otvoriť v novej karte: target=\"_blank\".";
      }, vysvetlenie: "Ťukni na odkaz v náhľade a uvidíš, kam by ťa poslal." },
    { typ: "vyklad", nadpis: "Zhrnutie",
      text: "<ul><li>Odkaz = <code>&lt;a href=\"adresa\"&gt;text&lt;/a&gt;</code>.</li><li>URL má protokol, doménu, cestu a môže mať kotvu za <code>#</code>.</li><li><code>target=\"_blank\"</code> otvorí novú kartu. Používaj ho s mierou.</li><li><code>mailto:</code> a <code>tel:</code> otvoria e-mail alebo telefón.</li><li>Text odkazu má hovoriť, kam vedie.</li></ul>" },
  ] };

  var L2 = { id: "html-2-2", nazov: "Cesty k súborom a kotvy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Absolútna a relatívna adresa",
      text: "<p>Web sa zvyčajne skladá z viacerých súborov. Keď odkazuješ na <b>iný web</b>, píšeš celú adresu s <code>https://</code>. Tej sa hovorí <b>absolútna</b>.</p><p>Keď odkazuješ na <b>súbor na tom istom webe</b>, stačí napísať cestu od miesta, kde si. Tej sa hovorí <b>relatívna</b>:</p>" +
        KOD('<a href="https://sme.sk">Iný web</a>\n<a href="kontakt.html">Môj kontakt</a>'),
      podrobne: "<p>Relatívne cesty majú veľkú výhodu: keď celý web presunieš na inú doménu, odkazy fungujú ďalej. Absolútnu adresu by si musel všade prepísať.</p>" },
    { typ: "vyklad", nadpis: "Priečinky",
      text: "<p>Väčší web má súbory v priečinkoch. Cesta vedie cez priečinky oddelené lomkou <code>/</code>. Dve bodky <code>..</code> znamenajú „o priečinok vyššie“:</p>", obr: OBR_PRIECINKY,
      podrobne: tabulka(["Zápis", "Význam"], [["<code>kontakt.html</code>", "súbor v tom istom priečinku"], ["<code>obrazky/pes.jpg</code>", "súbor v podpriečinku obrazky"], ["<code>../index.html</code>", "súbor o priečinok vyššie"], ["<code>/index.html</code>", "od koreňa webu (začína lomkou)"]]),
      hlbka: "<p>Názvy súborov na webe píš <b>malými písmenami, bez diakritiky a medzier</b>. Servery často rozlišujú veľké a malé písmená (Linux), takže <code>Pes.JPG</code> a <code>pes.jpg</code> sú dva rôzne súbory. Medzeru prehliadač zakóduje ako <code>%20</code> a „č“ dokonca ako <code>%C4%8D</code>. Namiesto medzery použi pomlčku: <code>moj-recept.html</code>.</p>" },
    { typ: "volba", otazka: "Si v súbore <code>clanky/recept.html</code>. Ako odkážeš na <code>index.html</code>, ktorý je o priečinok vyššie?", moznosti: ["<code>../index.html</code>", "<code>index.html</code>", "<code>clanky/index.html</code>", "<code>..index.html</code>"], spravna: 0,
      vysvetlenie: "Dve bodky a lomka znamenajú: choď o priečinok vyššie, a tam hľadaj index.html.", preco: [null, "Takto by prehliadač hľadal index.html v priečinku clanky, kde nie je.", "Takto by hľadal clanky/clanky/index.html.", "Za dvoma bodkami musí byť lomka."] },
    { typ: "vyklad", nadpis: "Kotvy: skok na miesto na stránke",
      text: "<p>Na dlhej stránke sa hodí obsah, ktorý skočí na konkrétnu časť. Cieľu dáš <code>id</code> a v odkaze naň odkážeš cez <code>#</code>:</p>" +
        KOD('<a href="#kontakt">Prejsť na kontakt</a>\n\n<!-- … dlhý obsah … -->\n\n<h2 id="kontakt">Kontakt</h2>'),
      podrobne: "<ul><li><code>id</code> musí byť na stránke <b>jedinečné</b>. Dva prvky s rovnakým id sú chyba.</li><li>V id nepoužívaj medzery ani diakritiku.</li><li>Na kotvu sa dá odkázať aj z inej stránky: <code>clanok.html#zaver</code>.</li></ul>" },
    { typ: "doplnenie", otazka: "Doplň odkaz, ktorý skočí na nadpis s id <b>zaver</b>:", sablona: '<a href="[[0]]">Na záver</a>\n…\n<h2 id="zaver">Záver</h2>', zetony: ["#zaver", "zaver", "id=zaver", "/zaver"], spravne: ["#zaver"],
      vysvetlenie: "Kotva v odkaze začína mriežkou #, za ňou je id cieľa." },
    { typ: "kod", zadanie: "Na stránke je nadpis <b>Recept</b> a nižšie nadpis <b>Postup</b>. Daj nadpisu Postup <code>id=\"postup\"</code> a do prvého odseku pridaj odkaz <b>Prejsť na postup</b>, ktorý naň skočí.",
      start: { html: "<h1>Recept</h1>\n<p></p>\n<p>Suroviny: múka, mlieko, vajcia.</p>\n<h2>Postup</h2>\n<p>Všetko zmiešaj a upeč.</p>" }, vyska: "190px",
      napoveda: 'Do nadpisu: <code>&lt;h2 id="postup"&gt;</code>. Do prázdneho odseku: <code>&lt;a href="#postup"&gt;Prejsť na postup&lt;/a&gt;</code>.',
      riesenie: { html: '<h1>Recept</h1>\n<p><a href="#postup">Prejsť na postup</a></p>\n<p>Suroviny: múka, mlieko, vajcia.</p>\n<h2 id="postup">Postup</h2>\n<p>Všetko zmiešaj a upeč.</p>' },
      kontrola: function (d) {
        var h = d.getElementById("postup"); if (!h) return "Žiadny prvok nemá id=\"postup\".";
        if (h.tagName !== "H2") return "id=\"postup\" má mať nadpis h2 Postup.";
        var a = d.querySelector('a[href="#postup"]'); if (!a) return "Chýba odkaz s href=\"#postup\".";
        return textOf(a) ? null : "Odkaz potrebuje text, napr. Prejsť na postup.";
      }, vysvetlenie: "Ťukni na odkaz v náhľade a stránka sa posunie na postup." },
    { typ: "volba", otazka: "Čo je zle?", kod: '<h2 id="uvod">Úvod</h2>\n<h2 id="uvod">Záver</h2>', moznosti: ["Dva prvky majú rovnaké id", "Nadpisy nesmú mať id", "id musí byť číslo", "Nič"], spravna: 0, vysvetlenie: "id musí byť na stránke jedinečné. Odkaz #uvod by nevedel, kam skočiť." },
    { typ: "vyklad", nadpis: "Zhrnutie",
      text: "<ul><li>Absolútna adresa: <code>https://…</code>, na iné weby.</li><li>Relatívna cesta: <code>kontakt.html</code>, <code>obrazky/pes.jpg</code>, <code>../index.html</code>.</li><li>Kotva: cieľ dostane <code>id</code>, odkaz má <code>href=\"#id\"</code>.</li><li>Názvy súborov malými písmenami, bez diakritiky a medzier.</li></ul>" },
  ] };

  var L3 = { id: "html-2-3", nazov: "Obrázky", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Vloženie obrázka",
      text: "<p>Obrázok vložíš značkou <code>&lt;img&gt;</code> (image). Je to prázdny prvok, nemá zatváraciu značku. Potrebuje dva atribúty:</p>" +
        UKAZKA('<img src="hory.svg" alt="Zelené hory a slnko">', '<img src="' + OBR_SLNKO + '" alt="Zelené hory a slnko" width="160">'),
      podrobne: "<ul><li><code>src</code> (source = zdroj) je cesta k súboru obrázka. Platia rovnaké pravidlá ako pri odkazoch: relatívna alebo absolútna adresa.</li><li><code>alt</code> (alternatívny text) je popis obrázka slovami.</li></ul>" },
    { typ: "vyklad", nadpis: "Prečo je alt dôležitý",
      text: "<p>Text v <code>alt</code> sa použije, keď obrázok nie je vidieť:</p><ul><li>nevidiacemu ho prečíta <b>čítačka obrazovky</b>,</li><li>keď sa obrázok <b>nenačíta</b> (zlý internet, chybná cesta), zobrazí sa text,</li><li>z neho <b>vyhľadávače</b> zistia, čo je na obrázku.</li></ul>",
      podrobne: "<p>Dobrý alt opisuje, <b>čo je na obrázku dôležité v danej súvislosti</b>:</p>" + tabulka(["Zle", "Dobre"], [["<code>alt=\"obrázok\"</code>", "<code>alt=\"Hnedý jazvečík spí na gauči\"</code>"], ["<code>alt=\"IMG_2041.jpg\"</code>", "<code>alt=\"Graf: tržby vzrástli o 20 %\"</code>"]]),
      hlbka: "<p>Ak je obrázok čisto ozdobný (čiara, vzor v pozadí), napíš <b>prázdny</b> alt: <code>alt=\"\"</code>. Čítačka ho potom preskočí. Ak by alt chýbal úplne, čítačka by často prečítala názov súboru, napr. „dekoracia-final-2 jpg“.</p><p>Zobrazenie bez alt je v Európe aj právny problém: weby verejnej správy musia byť prístupné podľa normy EN 301 549 a od roku 2025 sa požiadavky rozšírili aj na e-shopy (Európsky akt o prístupnosti).</p>" },
    { typ: "volba", otazka: "Ktorý alt je najlepší pre fotku na stránke útulku?", moznosti: ["<code>alt=\"Čierna mačka Micka sedí v košíku\"</code>", "<code>alt=\"foto\"</code>", "<code>alt=\"micka.jpg\"</code>", "Alt netreba, fotka je pekná"], spravna: 0,
      vysvetlenie: "Dobrý alt opíše, čo je na obrázku a čo z neho potrebuje vedieť človek, ktorý ho nevidí." },
    { typ: "vyklad", nadpis: "Veľkosť obrázka",
      text: "<p>Atribúty <code>width</code> (šírka) a <code>height</code> (výška) určia veľkosť v pixeloch:</p>" +
        UKAZKA('<img src="macka.svg" alt="Oranžová mačka" width="80" height="80">', '<img src="' + OBR_MACKA + '" alt="Oranžová mačka" width="80" height="80">'),
      podrobne: "<p>Prečo uvádzať rozmery, aj keď obrázok vyzerá dobre aj bez nich? Prehliadač vďaka nim vie vopred, koľko miesta má obrázku nechať. Bez nich sa text pri načítaní obrázka posunie a stránka „skáče“. Je to nepríjemné, najmä keď sa chystáš na niečo ťuknúť.</p><p>Na zmenu veľkosti podľa obrazovky (napr. na mobile) sa neskôr naučíš používať CSS.</p>" },
    { typ: "vyklad", nadpis: "Formáty obrázkov",
      text: tabulka(["Formát", "Na čo"], [["<b>JPG</b>", "fotografie, malá veľkosť súboru"], ["<b>PNG</b>", "snímky obrazovky, obrázky s priehľadnosťou"], ["<b>WebP / AVIF</b>", "moderné formáty, menšie súbory pri rovnakej kvalite"], ["<b>SVG</b>", "ikony, logá, grafy – ostré pri každej veľkosti"], ["<b>GIF</b>", "jednoduché animácie (dnes skôr video)"]]),
      obr: OBR_BITMAPA, obrPopis: "Bitmapa sa skladá z bodov (pixelov) a pri zväčšení je kockatá. Vektor je zapísaný ako tvary a zostane ostrý.",
      hlbka: "<p>SVG je vlastne text: obrázok zapísaný značkami, podobne ako HTML. Napríklad <code>&lt;circle r=\"40\"&gt;</code> nakreslí kruh. Preto sa dá písať aj priamo do HTML stránky. Všetky ilustrácie v tejto aplikácii sú SVG.</p>" },
    { typ: "volba", otazka: "Aký formát zvolíš na logo, ktoré má byť ostré na mobile aj na veľkom plagáte?", moznosti: ["SVG", "JPG", "GIF", "PNG s malým rozlíšením"], spravna: 0, vysvetlenie: "SVG je vektorový formát, pri zväčšení zostáva ostrý." },
    { typ: "kod", zadanie: "Obrázok mačky je už vložený. Doplň mu <code>alt</code> s popisom a <code>width=\"120\"</code>.",
      start: { html: '<h2>Naša mačka</h2>\n<img src="' + OBR_MACKA + '">' }, vyska: "170px",
      napoveda: 'Do značky img pred &gt; dopíš: <code>alt="Oranžová mačka" width="120"</code>. Pozor, adresa v src je dlhá, nič v nej nemeň.',
      riesenie: { html: '<h2>Naša mačka</h2>\n<img src="' + OBR_MACKA + '" alt="Oranžová mačka" width="120">' },
      kontrola: function (d) {
        var i = d.querySelector("img"); if (!i) return "Obrázok zmizol. Nemazal si omylom značku img?";
        if (!(i.getAttribute("alt") || "").trim()) return "Chýba alt s popisom obrázka.";
        if ((i.getAttribute("alt") || "").trim().length < 4) return "Popis v alt je príliš krátky. Napíš, čo je na obrázku.";
        return i.getAttribute("width") === "120" ? null : "Šírka má byť width=\"120\".";
      }, vysvetlenie: "Obrázok má popis aj rozmer. Presne tak to má byť." },
    { typ: "vyklad", nadpis: "Zhrnutie",
      text: "<ul><li><code>&lt;img src=\"…\" alt=\"…\"&gt;</code> – prázdny prvok.</li><li><code>alt</code> opisuje obrázok slovami. Ozdobný obrázok má <code>alt=\"\"</code>.</li><li><code>width</code> a <code>height</code> zabránia skákaniu stránky.</li><li>Fotky JPG/WebP, ikony a logá SVG, priehľadnosť PNG.</li></ul>" },
  ] };

  var L4 = { id: "html-2-4", nazov: "Obrázok s popisom", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "figure a figcaption",
      text: "<p>Keď má obrázok mať viditeľný popis (ako v novinách alebo v učebnici), obalíš ho do <code>&lt;figure&gt;</code> a popis dáš do <code>&lt;figcaption&gt;</code>:</p>" +
        UKAZKA('<figure>\n  <img src="hory.svg" alt="Zelené hory a slnko">\n  <figcaption>Tatry v lete</figcaption>\n</figure>', '<figure style="margin:0"><img src="' + OBR_SLNKO + '" alt="Zelené hory a slnko" width="150"><figcaption style="font-size:13px;color:#555">Tatry v lete</figcaption></figure>'),
      podrobne: "<p>Aký je rozdiel medzi <code>alt</code> a <code>figcaption</code>? <b>alt</b> nahrádza obrázok pre toho, kto ho nevidí. <b>figcaption</b> je popis pre všetkých, ktorý dopĺňa, čo vidno: kto fotil, kde, prečo je to dôležité.</p><p><code>figure</code> nie je len na obrázky. Môže obsahovať aj graf, ukážku kódu, citát alebo tabuľku s popisom.</p>" },
    { typ: "poradie", otazka: "Zoraď riadky tak, aby bol obrázok s popisom vo figure:", riadky: ["<figure>", '  <img src="pes.jpg" alt="Pes">', "  <figcaption>Môj pes Rex</figcaption>", "</figure>"],
      vysvetlenie: "figure obaľuje obrázok aj jeho popis. figcaption býva zvyčajne za obrázkom." },
    { typ: "vyklad", nadpis: "Obrázok ako odkaz",
      text: "<p>Do odkazu <code>&lt;a&gt;</code> môžeš namiesto textu vložiť obrázok. Ťuknutím na obrázok sa potom prejde na adresu:</p>" + KOD('<a href="galeria.html">\n  <img src="nahlad.jpg" alt="Otvoriť galériu">\n</a>'),
      podrobne: "<p>Pozor na <code>alt</code>: keď je obrázok jediným obsahom odkazu, alt sa stáva <b>textom odkazu</b>. Preto má hovoriť, kam odkaz vedie („Otvoriť galériu“), nie len čo je na obrázku.</p><p>Takto fungujú napríklad logá v hlavičke webov: ťuknutím na logo sa vrátiš na úvodnú stránku.</p>" },
    { typ: "volba", otazka: "Logo v hlavičke vedie na úvodnú stránku. Aký má mať alt?", kod: '<a href="index.html">\n  <img src="logo.svg" alt="?">\n</a>', moznosti: ["Názov firmy a cieľ, napr. „Pekáreň Klások – úvodná stránka“", "„logo“", "Prázdny alt=\"\"", "„obrázok s modrým pozadím“"], spravna: 0,
      vysvetlenie: "Alt je tu textom odkazu, takže má povedať, kam ťuknutie vedie.", preco: [null, "„logo“ nehovorí, čie logo to je ani kam vedie.", "Prázdny alt by spravil odkaz bez textu. Čítačka by nevedela, čo prečítať.", "Opis farieb tu nepomôže, dôležitý je cieľ odkazu."] },
    { typ: "kod", zadanie: "Obaľ obrázok do <code>figure</code> a pod obrázok pridaj <code>figcaption</code> s textom <b>Moja mačka</b>.",
      start: { html: '<img src="' + OBR_MACKA + '" alt="Oranžová mačka" width="100">' }, vyska: "170px",
      napoveda: 'Pred obrázok napíš <code>&lt;figure&gt;</code>, za neho <code>&lt;figcaption&gt;Moja mačka&lt;/figcaption&gt;</code> a nakoniec <code>&lt;/figure&gt;</code>.',
      riesenie: { html: '<figure>\n  <img src="' + OBR_MACKA + '" alt="Oranžová mačka" width="100">\n  <figcaption>Moja mačka</figcaption>\n</figure>' },
      kontrola: function (d) {
        var f = d.querySelector("figure"); if (!f) return "Chýba figure.";
        if (!f.querySelector("img")) return "Obrázok má byť vnútri figure.";
        var c = f.querySelector("figcaption"); if (!c) return "Vo figure chýba figcaption.";
        return textOf(c) === "Moja mačka" ? null : "Popis má byť Moja mačka.";
      }, vysvetlenie: "Takto sa obrázky s popisom píšu v článkoch aj učebniciach." },
    { typ: "vyklad", nadpis: "Zhrnutie",
      text: "<ul><li><code>figure</code> obaľuje obrázok (alebo graf, kód) a jeho popis <code>figcaption</code>.</li><li>alt nahrádza obrázok, figcaption ho dopĺňa.</li><li>Obrázok môže byť v odkaze. Vtedy jeho alt hovorí, kam odkaz vedie.</li></ul>" },
  ] };

  var L5 = { id: "html-2-5", nazov: "Zvuk a video", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Video na stránke",
      text: "<p>Video vložíš značkou <code>&lt;video&gt;</code>. Atribút <code>controls</code> zobrazí ovládanie (prehrať, hlasitosť, celá obrazovka):</p>" + KOD('<video src="vylet.mp4" controls width="320">\n  Tvoj prehliadač nevie prehrať video.\n</video>'),
      podrobne: "<p>Text medzi značkami sa zobrazí len vo veľmi starých prehliadačoch, ktoré video nepoznajú.</p>" + tabulka(["Atribút", "Čo robí"], [["<code>controls</code>", "zobrazí ovládanie"], ["<code>autoplay</code>", "spustí sa samo (prehliadače to dovolia len so stlmeným zvukom)"], ["<code>muted</code>", "stlmený zvuk"], ["<code>loop</code>", "prehráva sa dokola"], ["<code>poster</code>", "obrázok, ktorý sa ukáže pred spustením"]]),
      hlbka: "<p><code>controls</code>, <code>autoplay</code>, <code>muted</code> a <code>loop</code> sú <b>logické atribúty</b>: nemajú hodnotu, stačí ich napísať. Zápis <code>controls=\"false\"</code> ovládanie <b>nevypne</b>. Atribút tam stále je, a to stačí.</p><p>Prehliadače blokujú automatické prehrávanie so zvukom, lebo ľudí obťažuje. Preto <code>autoplay</code> funguje len spolu s <code>muted</code>.</p>" },
    { typ: "volba", otazka: "Ktorý atribút zobrazí tlačidlá na ovládanie videa?", moznosti: ["<code>controls</code>", "<code>buttons</code>", "<code>play</code>", "<code>autoplay</code>"], spravna: 0, vysvetlenie: "controls zobrazí prehrávanie, hlasitosť aj celú obrazovku." },
    { typ: "vyklad", nadpis: "Zvuk",
      text: "<p>Zvuk funguje rovnako, len značka sa volá <code>&lt;audio&gt;</code>:</p>" + KOD('<audio src="pesnicka.mp3" controls></audio>') +
        "<p>Na rozdiel od <code>img</code> majú <code>audio</code> a <code>video</code> zatváraciu značku.</p>",
      podrobne: "<p>Rôzne prehliadače kedysi podporovali rôzne formáty. Preto sa dá uviesť viac zdrojov cez <code>&lt;source&gt;</code> a prehliadač si vyberie prvý, ktorý vie prehrať:</p>" + KOD('<video controls>\n  <source src="film.webm" type="video/webm">\n  <source src="film.mp4" type="video/mp4">\n</video>') + "<p>Dnes MP4 (video) a MP3 (zvuk) prehrá takmer každý prehliadač.</p>" },
    { typ: "doplnenie", otazka: "Doplň prehrávač zvuku s ovládaním:", sablona: '<[[0]] src="podcast.mp3" [[1]]></[[2]]>', zetony: ["audio", "controls", "audio", "video", "sound", "play"], spravne: ["audio", "controls", "audio"],
      vysvetlenie: "audio s atribútom controls. Zatváracia značka je </audio>." },
    { typ: "vyklad", nadpis: "Vložené stránky (YouTube, mapy)",
      text: "<p>Video z YouTube alebo mapu z Google Máp nevkladáš cez <code>video</code>, ale cez <code>&lt;iframe&gt;</code>. Je to „okno“, v ktorom sa zobrazí iná stránka. Kód na vloženie ti dá samotná služba (tlačidlo Zdieľať → Vložiť):</p>" + KOD('<iframe src="https://www.youtube.com/embed/…"\n  width="320" height="180"\n  title="Video: Ako upiecť chlieb"></iframe>'),
      podrobne: "<p>Aj <code>iframe</code> má mať atribút <code>title</code>, ktorý opíše, čo je vnútri. Čítačka ho prečíta namiesto obsahu okna.</p><p>Aj náhľad pod editorom v tejto aplikácii je <code>iframe</code>.</p>" },
    { typ: "kod", zadanie: "Vlož video <code>vylet.mp4</code> s ovládaním (<code>controls</code>), ktoré sa bude prehrávať dokola (<code>loop</code>). Video sa v náhľade nenačíta, lebo súbor neexistuje, ale prehrávač uvidíš.",
      start: { html: "<h2>Náš výlet</h2>\n" }, vyska: "150px",
      napoveda: '<code>&lt;video src="vylet.mp4" controls loop&gt;&lt;/video&gt;</code>',
      riesenie: { html: '<h2>Náš výlet</h2>\n<video src="vylet.mp4" controls loop></video>' },
      kontrola: function (d) {
        var v = d.querySelector("video"); if (!v) return "Chýba značka video.";
        if (!/vylet\.mp4$/.test(v.getAttribute("src") || "")) return "Zdroj videa má byť src=\"vylet.mp4\".";
        if (!v.hasAttribute("controls")) return "Chýba atribút controls.";
        return v.hasAttribute("loop") ? null : "Chýba atribút loop.";
      }, vysvetlenie: "Logické atribúty controls a loop nepotrebujú hodnotu." },
    { typ: "volba", otazka: "Ako vložíš do stránky video z YouTube?", moznosti: ["Cez <code>&lt;iframe&gt;</code> s kódom od YouTube", "Cez <code>&lt;video src=\"youtube.com/...\"&gt;</code>", "Cez <code>&lt;img&gt;</code>", "Nedá sa to"], spravna: 0, vysvetlenie: "YouTube nedáva priamy súbor s videom, ale celú stránku s prehrávačom. Tá sa vkladá cez iframe." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li>Odkazy <code>&lt;a href&gt;</code>: absolútne, relatívne, kotvy, mailto a tel.</li><li>Obrázky <code>&lt;img src alt&gt;</code> s rozmermi a správnym formátom.</li><li><code>figure</code> a <code>figcaption</code> pre obrázok s popisom.</li><li><code>video</code>, <code>audio</code> s <code>controls</code> a <code>iframe</code> pre vložené služby.</li></ul>",
      tip: "Teraz test. Potom ťa čaká Modul 3: zoznamy a tabuľky." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "html-2-1", otazka: "Čo zobrazí prehliadač z tohto odkazu?", kod: '<a href="https://sme.sk">Správy</a>', moznosti: ["Klikateľný text Správy", "Adresu https://sme.sk", "Tlačidlo s nápisom a", "Nič"], spravna: 0, vysvetlenie: "Zobrazí sa text medzi značkami. Adresa je skrytá v href." },
    { typ: "volba", lekcia: "html-2-1", otazka: "Ktorá časť adresy <code>https://shop.sk/topanky#zlava</code> je kotva?", moznosti: ["<code>#zlava</code>", "<code>https://</code>", "<code>shop.sk</code>", "<code>/topanky</code>"], spravna: 0, vysvetlenie: "Kotva je časť za mriežkou #." },
    { typ: "doplnenie", lekcia: "html-2-1", otazka: "Doplň odkaz na e-mail:", sablona: '<a href="[[0]]info@obec.sk">Napíšte nám</a>', zetony: ["mailto:", "mail:", "email://", "tel:"], spravne: ["mailto:"], vysvetlenie: "E-mailový odkaz začína mailto:" },
    { typ: "volba", lekcia: "html-2-2", otazka: "Si v <code>index.html</code>. Obrázok je v priečinku <code>obrazky</code>. Aká je správna cesta?", moznosti: ["<code>obrazky/pes.jpg</code>", "<code>../pes.jpg</code>", "<code>pes.jpg</code>", "<code>obrazky\\pes.jpg</code>"], spravna: 0, vysvetlenie: "Do podpriečinka ideš cez jeho názov a lomku /. Na webe sa používa len lomka /, nie spätná \\." },
    { typ: "volba", lekcia: "html-2-2", otazka: "Ktorý názov súboru je pre web najvhodnejší?", moznosti: ["<code>letny-tabor.html</code>", "<code>Letný Tábor.html</code>", "<code>LETNY_TABOR.HTML</code>", "<code>letný tábor.html</code>"], spravna: 0, vysvetlenie: "Malé písmená, bez diakritiky a medzier, slová oddelené pomlčkou." },
    { typ: "doplnenie", lekcia: "html-2-2", otazka: "Doplň kotvu a cieľ:", sablona: '<a href="[[0]]">Kontakt</a>\n…\n<h2 [[1]]="kontakt">Kontakt</h2>', zetony: ["#kontakt", "id", "kontakt", "class", "name"], spravne: ["#kontakt", "id"], vysvetlenie: "Odkaz má #kontakt, cieľ id=\"kontakt\"." },
    { typ: "volba", lekcia: "html-2-3", otazka: "Načo slúži atribút <code>alt</code>?", moznosti: ["Opisuje obrázok slovami pre toho, kto ho nevidí", "Určuje výšku obrázka", "Určuje, odkiaľ sa obrázok načíta", "Pridá obrázku rámik"], spravna: 0, vysvetlenie: "alt je alternatívny text: čítačky, nenačítané obrázky, vyhľadávače." },
    { typ: "volba", lekcia: "html-2-3", otazka: "Prečo uvádzať <code>width</code> a <code>height</code>?", moznosti: ["Prehliadač nechá miesto vopred a stránka pri načítaní neskáče", "Bez nich sa obrázok nezobrazí", "Obrázok sa tým zmenší na disku", "Kvôli farbám"], spravna: 0, vysvetlenie: "Rozmery povedia prehliadaču, koľko miesta má obrázku vyhradiť." },
    { typ: "volba", lekcia: "html-2-3", otazka: "Obrázok je len ozdobná čiara. Aký alt mu dáš?", moznosti: ["<code>alt=\"\"</code>", "<code>alt=\"čiara\"</code>", "Žiadny alt", "<code>alt=\"ozdobný obrázok čiary\"</code>"], spravna: 0, vysvetlenie: "Prázdny alt povie čítačke, aby obrázok preskočila." },
    { typ: "poradie", lekcia: "html-2-4", otazka: "Zoraď obrázok s popisom:", riadky: ["<figure>", '  <img src="graf.svg" alt="Graf tržieb">', "  <figcaption>Tržby za rok 2025</figcaption>", "</figure>"], vysvetlenie: "figure obaľuje obrázok aj figcaption." },
    { typ: "volba", lekcia: "html-2-5", otazka: "Prečo nefunguje automatické spustenie videa so zvukom?", kod: '<video src="reklama.mp4" autoplay></video>', moznosti: ["Prehliadače dovolia autoplay len so stlmeným zvukom (muted)", "autoplay neexistuje", "Video musí byť v iframe", "Chýba controls"], spravna: 0, vysvetlenie: "Prehliadače blokujú hlasné automatické prehrávanie. Treba pridať muted." },
    { typ: "volba", lekcia: "html-2-5", otazka: "Ktorý zápis je správny?", moznosti: ["<code>&lt;audio src=\"a.mp3\" controls&gt;&lt;/audio&gt;</code>", "<code>&lt;audio src=\"a.mp3\" controls&gt;</code> bez zatvorenia", "<code>&lt;sound src=\"a.mp3\"&gt;&lt;/sound&gt;</code>", "<code>&lt;img src=\"a.mp3\"&gt;</code>"], spravna: 0, vysvetlenie: "audio má zatváraciu značku. Značka sound neexistuje." },
  ];

  K.registrujModul("html", {
    cislo: 2, nazov: "Odkazy a obrázky", popis: "Odkazy, webové adresy a cesty k súborom, kotvy, obrázky a ich popis, zvuk a video.",
    lekcie: [L1, L2, L3, L4, L5],
    test: { otazky: TEST, potrebne: 70 },
  });
})();
