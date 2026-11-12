/* HTML · Modul 5 · Sémantika a štruktúra stránky (5 lekcií + test) */
(function () {
  var KOD = function (t, stitok) { return K.blokKodu(t, "html", stitok); };
  var UKAZKA = function (t, vysledok) { return '<div class="kod-obal">' + KOD(t, "Kód") + '<div class="vysledok">' + (vysledok === undefined ? t : vysledok) + "</div></div>"; };
  var TXT = 'font-family="Inter,sans-serif"', MONO = 'font-family="JBMono,monospace"';
  function tabulka(h, r) { return '<div class="tabulka"><table><thead><tr>' + h.map(function (x) { return "<th>" + x + "</th>"; }).join("") + "</tr></thead><tbody>" + r.map(function (x) { return "<tr>" + x.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>"; }
  function textOf(el) { return el ? el.textContent.trim() : ""; }

  function blok(x, y, w, h, znacka, popis, farba) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" style="fill:' + (farba || "var(--surface-2)") + ';stroke:var(--line)"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + (popis ? -2 : 4)) + '" text-anchor="middle" font-size="12" font-weight="700" ' + MONO + ' style="fill:var(--hl-tag)">&lt;' + znacka + "&gt;</text>" +
      (popis ? '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 13) + '" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">' + popis + "</text>" : "");
  }
  var OBR_KOSTRA = '<svg viewBox="0 0 340 230" role="img" aria-label="Rozloženie stránky: header hore, pod ním nav, potom main s article a aside vedľa, dole footer">' +
    blok(6, 6, 328, 38, "header", "hlavička: logo, názov") +
    blok(6, 50, 328, 30, "nav") +
    '<rect x="6" y="86" width="328" height="100" rx="10" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-dasharray:5 4"/>' +
    '<text x="16" y="102" font-size="11" font-weight="700" ' + MONO + ' style="fill:var(--accent)">&lt;main&gt;</text>' +
    blok(16, 110, 200, 68, "article", "článok, príspevok") +
    blok(224, 110, 100, 68, "aside", "bočný obsah") +
    blok(6, 192, 328, 32, "footer") + "</svg>";

  var OBR_DIV = '<svg viewBox="0 0 340 120" role="img" aria-label="Div nehovorí nič o obsahu, sémantické značky hovoria, čo je vnútri">' +
    '<text x="80" y="16" text-anchor="middle" font-size="11.5" font-weight="700" ' + TXT + ' style="fill:var(--bad)">Bez významu</text>' +
    [0, 1, 2].map(function (i) { return '<rect x="20" y="' + (26 + i * 30) + '" width="120" height="24" rx="6" style="fill:var(--surface-2);stroke:var(--line)"/><text x="80" y="' + (42 + i * 30) + '" text-anchor="middle" font-size="11" ' + MONO + ' style="fill:var(--muted)">&lt;div&gt;</text>'; }).join("") +
    '<text x="250" y="16" text-anchor="middle" font-size="11.5" font-weight="700" ' + TXT + ' style="fill:var(--ok)">S významom</text>' +
    ["header", "main", "footer"].map(function (t, i) { return '<rect x="190" y="' + (26 + i * 30) + '" width="120" height="24" rx="6" style="fill:var(--surface-2);stroke:var(--line)"/><text x="250" y="' + (42 + i * 30) + '" text-anchor="middle" font-size="11" ' + MONO + ' style="fill:var(--hl-tag)">&lt;' + t + "&gt;</text>"; }).join("") +
    '<path d="M150 62h30" style="stroke:var(--accent);stroke-width:2"/><path d="M174 56l8 6-8 6" style="fill:none;stroke:var(--accent);stroke-width:2"/></svg>';

  var OBR_GOOGLE = '<svg viewBox="0 0 340 112" role="img" aria-label="Výsledok vo vyhľadávači: modrý nadpis z title, zelená adresa a sivý popis z meta description">' +
    '<rect x="4" y="4" width="332" height="104" rx="12" style="fill:var(--surface);stroke:var(--line)"/>' +
    '<text x="18" y="28" font-size="11" ' + TXT + ' style="fill:var(--muted)">www.pekaren-klas.sk</text>' +
    '<text x="18" y="50" font-size="15" font-weight="600" ' + TXT + ' style="fill:var(--accent)">Pekáreň Klas – čerstvý chlieb v Nitre</text>' +
    '<text x="18" y="72" font-size="11.5" ' + TXT + ' style="fill:var(--text)">Kváskový chlieb, rožky a koláče pečené každé ráno.</text>' +
    '<text x="18" y="88" font-size="11.5" ' + TXT + ' style="fill:var(--text)">Otvorené od 6:00.</text>' +
    '<text x="330" y="50" text-anchor="end" font-size="10" font-weight="700" ' + MONO + ' style="fill:var(--hl-tag)">&lt;title&gt;</text>' +
    '<text x="330" y="102" text-anchor="end" font-size="10" font-weight="700" ' + MONO + ' style="fill:var(--hl-attr)">meta description</text></svg>';

  /* ---------- lekcie ---------- */
  var L1 = { id: "html-5-1", nazov: "Čo je sémantika", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Značky s významom",
      text: "<p><b>Sémantika</b> znamená význam. Sémantická značka hovorí, <b>čo</b> obsah je, nie ako vyzerá. Napríklad <code>&lt;nav&gt;</code> hovorí „toto je navigácia“.</p>", obr: OBR_DIV,
      podrobne: "<p>Kedysi sa celé stránky stavali z prvkov <code>&lt;div&gt;</code> (division = oddiel). Div je len prázdna krabica bez významu. Prehliadač, čítačka aj vyhľadávač z neho nevedia, či ide o menu, článok alebo pätičku.</p><p>Sémantické značky vyzerajú rovnako ako div (bez CSS nemajú žiadny vzhľad), ale nesú informáciu.</p>" },
    { typ: "vyklad", nadpis: "Komu to pomáha",
      text: tabulka(["Kto", "Prínos"], [["Nevidiaci s čítačkou", "skočí rovno na menu alebo hlavný obsah"], ["Vyhľadávače", "lepšie pochopia, čo je na stránke dôležité"], ["Ty a kolegovia", "kód sa ľahšie číta a upravuje"], ["Režim čítania v prehliadači", "nájde článok a skryje zvyšok"]]),
      podrobne: "<p>Čítačky obrazovky ponúkajú zoznam „orientačných bodov“ (landmarks): hlavička, navigácia, hlavný obsah, pätička. Vytvoria ho práve zo sémantických značiek. Stránka z divov žiadne orientačné body nemá.</p>" },
    { typ: "volba", otazka: "Čo znamená, že značka je sémantická?", moznosti: ["Hovorí, aký význam má obsah", "Má pekný vzhľad", "Funguje len v Chrome", "Je novšia ako HTML5"], spravna: 0, vysvetlenie: "Sémantika = význam. Vzhľad rieši CSS." },
    { typ: "vyklad", nadpis: "div a span",
      text: "<p>Div a span sa stále používajú, ale len keď <b>žiadna sémantická značka nesedí</b>, napríklad keď potrebuješ obal kvôli CSS:</p>" + tabulka(["Značka", "Druh", "Použitie"], [["<code>&lt;div&gt;</code>", "blokový (nový riadok)", "obal skupiny prvkov"], ["<code>&lt;span&gt;</code>", "riadkový (v texte)", "obal časti textu"]]) +
        KOD('<p>Cena: <span class="cena">12 €</span></p>'),
      podrobne: "<p>Pravidlo: najprv hľadaj značku s významom (<code>nav</code>, <code>article</code>, <code>button</code>…). Až keď žiadna nesedí, použi div alebo span.</p>" },
    { typ: "volba", otazka: "Kedy použiješ <code>&lt;div&gt;</code>?", moznosti: ["Keď žiadna značka s významom nesedí", "Vždy namiesto nadpisov", "Na odkazy", "Na menu"], spravna: 0, vysvetlenie: "Div je posledná možnosť, keď potrebuješ len obal." },
    { typ: "volba", otazka: "Ktorý zápis tlačidla je správny?", moznosti: ["<code>&lt;button&gt;Kúpiť&lt;/button&gt;</code>", "<code>&lt;div class=\"tlacidlo\"&gt;Kúpiť&lt;/div&gt;</code>", "<code>&lt;span&gt;Kúpiť&lt;/span&gt;</code>", "Všetky sú rovnako dobré"], spravna: 0,
      vysvetlenie: "button sa dá ovládať klávesnicou aj čítačkou. Div, ktorý vyzerá ako tlačidlo, tieto vlastnosti nemá.", preco: [null, "Div sa nedá vybrať klávesom Tab a čítačka nevie, že je to tlačidlo.", "Span nemá význam tlačidla.", null] },
  ] };

  var L2 = { id: "html-5-2", nazov: "Kostra stránky", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Hlavné časti",
      text: "<p>Väčšina webov má rovnakú kostru. HTML5 má na každú časť značku:</p>", obr: OBR_KOSTRA,
      podrobne: tabulka(["Značka", "Obsah"], [["<code>&lt;header&gt;</code>", "hlavička: logo, názov, niekedy menu"], ["<code>&lt;nav&gt;</code>", "hlavná navigácia"], ["<code>&lt;main&gt;</code>", "hlavný obsah. Na stránke <b>len raz</b>."], ["<code>&lt;aside&gt;</code>", "doplnkový obsah: reklama, súvisiace odkazy"], ["<code>&lt;footer&gt;</code>", "pätička: kontakt, autorské práva"]]) },
    { typ: "vyklad", nadpis: "Ako to vyzerá v kóde",
      text: KOD('<body>\n  <header>\n    <h1>Pekáreň Klas</h1>\n    <nav>\n      <a href="#">Domov</a>\n      <a href="#">Ponuka</a>\n    </nav>\n  </header>\n  <main>\n    <h2>Dnes v ponuke</h2>\n    <p>Kváskový chlieb…</p>\n  </main>\n  <footer>\n    <p>&copy; 2026 Pekáreň Klas</p>\n  </footer>\n</body>'),
      podrobne: "<p>Header a footer môžu byť aj vnútri článku (hlavička článku s autorom, pätička s tagmi). Main však musí byť na stránke jediný a nesmie byť vnútri header, footer, nav ani article.</p>" },
    { typ: "volba", otazka: "Koľkokrát môže byť na stránke <code>&lt;main&gt;</code>?", moznosti: ["Len raz", "Ľubovoľne veľa", "Dvakrát", "Ani raz, je zastaraný"], spravna: 0, vysvetlenie: "main označuje hlavný obsah stránky a ten je jeden." },
    { typ: "poradie", otazka: "Zoraď časti stránky zhora nadol:", riadky: ["<header>…</header>", "<main>…</main>", "<footer>…</footer>"], vysvetlenie: "Hlavička, hlavný obsah, pätička." },
    { typ: "doplnenie", otazka: "Doplň kostru:", sablona: "<[[0]]>\n  <h1>Môj blog</h1>\n</[[0]]>\n<[[1]]>\n  <p>Prvý článok…</p>\n</[[1]]>\n<[[2]]>\n  <p>&copy; 2026</p>\n</[[2]]>", zetony: ["header", "main", "footer", "head", "div", "bottom"], spravne: ["header", "main", "footer"],
      vysvetlenie: "header – main – footer. Pozor: head je niečo iné, neviditeľná hlava dokumentu." },
    { typ: "volba", otazka: "Aký je rozdiel medzi <code>&lt;head&gt;</code> a <code>&lt;header&gt;</code>?", moznosti: ["head sú neviditeľné údaje o stránke, header je viditeľná hlavička", "Je to to isté", "header je zastaraný head", "head je pre mobily"], spravna: 0, vysvetlenie: "head obsahuje title, meta, odkazy na CSS. header je viditeľná časť v body." },
    { typ: "kod", zadanie: "Obal časti stránky správnymi značkami: nadpis do <code>header</code>, článok do <code>main</code> a odsek s copyrightom do <code>footer</code>.",
      start: { html: "<h1>Turistický klub</h1>\n\n<h2>Výlet na Sitno</h2>\n<p>Stretneme sa v sobotu o 8:00.</p>\n\n<p>&copy; 2026 Turistický klub</p>" }, vyska: "240px",
      napoveda: "<code>&lt;header&gt;&lt;h1&gt;…&lt;/h1&gt;&lt;/header&gt;</code>, potom <code>&lt;main&gt;</code> okolo h2 a odseku, nakoniec <code>&lt;footer&gt;</code>.",
      riesenie: { html: "<header>\n  <h1>Turistický klub</h1>\n</header>\n<main>\n  <h2>Výlet na Sitno</h2>\n  <p>Stretneme sa v sobotu o 8:00.</p>\n</main>\n<footer>\n  <p>&copy; 2026 Turistický klub</p>\n</footer>" },
      kontrola: function (d) {
        if (!d.querySelector("header h1")) return "Nadpis h1 má byť v header.";
        if (!d.querySelector("main h2")) return "Nadpis výletu h2 má byť v main.";
        if (d.querySelectorAll("main").length !== 1) return "main má byť na stránke práve raz.";
        var f = d.querySelector("footer"); if (!f || !/2026/.test(textOf(f))) return "Odsek s copyrightom má byť vo footer.";
        return /sobotu/.test(textOf(d.querySelector("main"))) ? null : "Odsek o stretnutí patrí do main.";
      }, vysvetlenie: "Stránka vyzerá rovnako, ale teraz má jasnú štruktúru." },
  ] };

  var L3 = { id: "html-5-3", nazov: "Články a sekcie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "article",
      text: "<p><code>&lt;article&gt;</code> je samostatný obsah, ktorý by dával zmysel aj vytrhnutý zo stránky: článok, príspevok na blogu, recenzia, produkt v e-shope, komentár.</p>" +
        KOD('<article>\n  <h2>Recenzia: Malý princ</h2>\n  <p>Kniha, ktorá…</p>\n  <footer>Autor: Jana, 5. 3. 2026</footer>\n</article>'),
      podrobne: "<p>Test: dal by si to na Facebook ako samostatný príspevok? Ak áno, je to article. Na stránke s výpisom článkov je každý náhľad článku samostatný article.</p>" },
    { typ: "vyklad", nadpis: "section",
      text: "<p><code>&lt;section&gt;</code> je tematická časť stránky alebo článku, ktorá má <b>vlastný nadpis</b>: kapitola, časť „Naše služby“, „Kontakt“.</p>" +
        KOD('<main>\n  <section>\n    <h2>Naše služby</h2>\n    …\n  </section>\n  <section>\n    <h2>Kontakt</h2>\n    …\n  </section>\n</main>'),
      podrobne: tabulka(["", "article", "section"], [["Význam", "samostatný celok", "časť väčšieho celku"], ["Dá sa vytrhnúť?", "áno", "nie, patrí do kontextu"], ["Nadpis", "áno", "áno"]]) +
        "<p>Ak potrebuješ obal len kvôli vzhľadu a nemá nadpis, použi div, nie section.</p>" },
    { typ: "volba", otazka: "Príspevok na blogu s nadpisom, textom a dátumom:", moznosti: ["<code>article</code>", "<code>section</code>", "<code>aside</code>", "<code>div</code>"], spravna: 0, vysvetlenie: "Príspevok je samostatný celok, preto article." },
    { typ: "volba", otazka: "Časť stránky firmy „Cenník“ s nadpisom:", moznosti: ["<code>section</code>", "<code>article</code>", "<code>nav</code>", "<code>footer</code>"], spravna: 0, vysvetlenie: "Cenník je tematická časť stránky, nie samostatný článok." },
    { typ: "vyklad", nadpis: "Ďalšie užitočné značky",
      text: tabulka(["Značka", "Použitie"], [["<code>&lt;time datetime=\"2026-03-05\"&gt;</code>", "dátum a čas, čitateľný aj pre počítač"], ["<code>&lt;address&gt;</code>", "kontaktné údaje autora alebo firmy"], ["<code>&lt;details&gt;</code> + <code>&lt;summary&gt;</code>", "rozbaľovací blok bez JavaScriptu"], ["<code>&lt;mark&gt;</code>", "zvýraznený text (ako fixkou)"]]) +
        UKAZKA("<details>\n  <summary>Koľko stojí doprava?</summary>\n  <p>Nad 30 € je zadarmo.</p>\n</details>"),
      podrobne: "<p>details/summary je ideálne na časté otázky (FAQ). Ťukni na otázku v ukážke a odpoveď sa rozbalí.</p>" },
    { typ: "kod", zadanie: "Vytvor časté otázky: dva bloky <code>details</code>, každý so <code>summary</code> (otázka) a odsekom <code>p</code> (odpoveď).",
      start: { html: "<h2>Časté otázky</h2>\n" }, vyska: "230px",
      napoveda: "<code>&lt;details&gt;&lt;summary&gt;Otázka?&lt;/summary&gt;&lt;p&gt;Odpoveď.&lt;/p&gt;&lt;/details&gt;</code> dvakrát.",
      riesenie: { html: "<h2>Časté otázky</h2>\n<details>\n  <summary>Kedy máte otvorené?</summary>\n  <p>Každý deň od 8:00 do 18:00.</p>\n</details>\n<details>\n  <summary>Dá sa platiť kartou?</summary>\n  <p>Áno.</p>\n</details>" },
      kontrola: function (d) {
        var det = d.querySelectorAll("details"); if (det.length < 2) return "Majú byť aspoň 2 bloky details, je ich " + det.length + ".";
        for (var i = 0; i < det.length; i++) {
          var s = det[i].querySelector("summary"); if (!s || !textOf(s)) return "Blok details č. " + (i + 1) + " potrebuje summary s otázkou.";
          if (!det[i].querySelector("p")) return "Blok details č. " + (i + 1) + " potrebuje odsek p s odpoveďou.";
        }
        return null;
      }, vysvetlenie: "Ťukni na otázky v náhľade. Rozbaľujú sa bez jediného riadku JavaScriptu." },
  ] };

  var L4 = { id: "html-5-4", nazov: "Hlava stránky a vyhľadávače", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Ako ťa nájde Google",
      text: "<p>Keď hľadáš na Googli, každý výsledok sa skladá z údajov v <code>&lt;head&gt;</code>:</p>", obr: OBR_GOOGLE,
      podrobne: KOD('<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Pekáreň Klas – čerstvý chlieb v Nitre</title>\n  <meta name="description" content="Kváskový chlieb, rožky a koláče pečené každé ráno. Otvorené od 6:00.">\n</head>') +
        "<ul><li><code>title</code>: krátky a výstižný, do 60 znakov. Najdôležitejšie slová na začiatok.</li><li><code>description</code>: 1–2 vety do 160 znakov, ktoré presvedčia kliknúť.</li></ul>" },
    { typ: "vyklad", nadpis: "Viewport: stránka pre mobil",
      text: "<p>Bez tohto riadku by mobil zobrazil stránku zmenšenú ako na počítači a text by bol drobný:</p>" + KOD('<meta name="viewport" content="width=device-width, initial-scale=1">'),
      podrobne: "<p><code>width=device-width</code> povie, aby šírka stránky bola šírka displeja. <code>initial-scale=1</code> = bez zväčšenia či zmenšenia. Patrí na každú stránku.</p>" },
    { typ: "volba", otazka: "Čo zobrazí Google ako modrý nadpis výsledku?", moznosti: ["Obsah <code>&lt;title&gt;</code>", "Prvý <code>&lt;h1&gt;</code>", "Názov súboru", "Meta description"], spravna: 0, vysvetlenie: "Nadpis výsledku je z title. Description je šedý text pod ním." },
    { typ: "volba", otazka: "Načo je <code>meta viewport</code>?", moznosti: ["Aby sa stránka správne zobrazila na mobile", "Aby sa načítala rýchlejšie", "Pre vyhľadávače", "Na pridanie obrázka"], spravna: 0, vysvetlenie: "Bez viewport by mobil stránku zmenšil ako na počítači." },
    { typ: "vyklad", nadpis: "Jazyk a nadpisy",
      text: "<ul><li><code>&lt;html lang=\"sk\"&gt;</code>: čítačka bude čítať slovenskou výslovnosťou a prehliadač ponúkne správny preklad.</li><li>Na stránke má byť <b>jeden h1</b> (hlavná téma) a nadpisy idú po poradí: h1 → h2 → h3, bez preskakovania.</li></ul>",
      podrobne: "<p>Nadpisy nevyberaj podľa veľkosti písma. Veľkosť nastavíš v CSS. Úroveň nadpisu vyjadruje, ako dôležitá je časť a kam patrí. Nevidiaci často prechádzajú stránku práve po nadpisoch.</p>" },
    { typ: "kod", zadanie: "Doplň do hlavy stránky: <code>title</code> s textom <b>Pekáreň Klas</b>, <code>meta name=\"description\"</code> s popisom a <code>meta name=\"viewport\"</code>.",
      start: { html: '<!DOCTYPE html>\n<html lang="sk">\n<head>\n  <meta charset="utf-8">\n  \n</head>\n<body>\n  <h1>Pekáreň Klas</h1>\n</body>\n</html>' }, vyska: "260px",
      napoveda: '<code>&lt;title&gt;Pekáreň Klas&lt;/title&gt;</code>, <code>&lt;meta name="description" content="…"&gt;</code>, <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>',
      riesenie: { html: '<!DOCTYPE html>\n<html lang="sk">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Pekáreň Klas</title>\n  <meta name="description" content="Čerstvý chlieb každé ráno.">\n</head>\n<body>\n  <h1>Pekáreň Klas</h1>\n</body>\n</html>' },
      kontrola: function (d, s) {
        if (!/<title>\s*Pekáreň Klas\s*<\/title>/i.test(s.html)) return "Chýba title s textom Pekáreň Klas.";
        var m = /<meta[^>]+name=["']description["'][^>]*>/i.exec(s.html); if (!m) return "Chýba meta name=\"description\".";
        if (!/content=["'][^"']{5,}["']/i.test(m[0])) return "Description potrebuje content s popisom (aspoň pár slov).";
        return /<meta[^>]+name=["']viewport["'][^>]+width=device-width/i.test(s.html) ? null : "Chýba meta name=\"viewport\" s content=\"width=device-width, initial-scale=1\".";
      }, vysvetlenie: "Hlava nie je vidieť, ale rozhoduje o tom, ako stránku uvidí Google aj mobil." },
  ] };

  var L5 = { id: "html-5-5", nazov: "Prístupnosť a kontrola", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Web pre všetkých",
      text: "<p><b>Prístupnosť</b> znamená, že stránku môže používať každý: nevidiaci, slabozraký, človek ovládajúci počítač len klávesnicou, ale aj ty na slnku s mobilom v jednej ruke.</p><p>Väčšinu práce urobí správne HTML. Všetko potrebné už poznáš:</p>" +
        tabulka(["Pravidlo", "Prečo"], [["obrázky majú <code>alt</code>", "čítačka ich opíše"], ["polia majú <code>label</code>", "vieš, čo kam písať"], ["tlačidlo je <code>button</code>, odkaz je <code>a</code>", "funguje klávesnica"], ["nadpisy po poradí", "orientácia na stránke"], ["sémantické značky", "orientačné body pre čítačku"], ["<code>lang</code> na html", "správna výslovnosť"]]),
      podrobne: "<p>Na Slovensku žije približne 1 z 5 ľudí s nejakým zdravotným znevýhodnením. Od roku 2025 platí v EÚ <b>Európsky akt o prístupnosti</b>: aj e-shopy a bankové služby musia byť prístupné.</p>" },
    { typ: "volba", otazka: "Ktorá stránka je prístupnejšia?", moznosti: ["S nadpismi h1–h3 po poradí a obrázkami s alt", "S veľkým tučným textom namiesto nadpisov", "S tlačidlami z div", "S obrázkami bez alt, ale pekným dizajnom"], spravna: 0, vysvetlenie: "Štruktúra a alternatívne texty sú základ prístupnosti." },
    { typ: "vyklad", nadpis: "Kontrola kódu",
      text: "<p>Prehliadač ti chyby v HTML nepovie, potichu ich opraví po svojom. Preto kód kontroluj:</p><ul><li><b>validator.w3.org</b>: oficiálny validátor HTML. Vlož kód a ukáže chyby.</li><li><b>Lighthouse</b> v Chrome (F12 → Lighthouse): ohodnotí prístupnosť, rýchlosť a SEO.</li><li>Táto aplikácia ti chyby ukazuje priamo v editore.</li></ul>",
      podrobne: "<p>Najčastejšie chyby začiatočníkov: nezatvorené značky, prekrížené značky, chýbajúci alt, dve rovnaké id, chýbajúci lang a title.</p>" },
    { typ: "volba", otazka: "Čo je zle?", kod: '<img src="logo.png">\n<div onclick="kup()">Kúpiť</div>', moznosti: ["Obrázok nemá alt a tlačidlo je div", "Nič", "Chýba width", "Obrázok musí byť v figure"], spravna: 0, vysvetlenie: "Pridaj alt a namiesto div použi button." },
    { typ: "kod", zadanie: "Oprav prístupnosť: doplň obrázku <code>alt</code>, z „tlačidla“ <code>div</code> sprav skutočný <code>button</code> a k poľu pridaj <code>label</code> s textom <b>E-mail</b>.",
      start: { html: '<img src="logo.png" width="60">\n<input type="email" id="email" name="email">\n<div class="tlacidlo">Odoberať novinky</div>' }, vyska: "200px",
      napoveda: 'alt="Logo …", <code>&lt;label for="email"&gt;E-mail&lt;/label&gt;</code>, <code>&lt;button&gt;Odoberať novinky&lt;/button&gt;</code>',
      riesenie: { html: '<img src="logo.png" width="60" alt="Logo kaviarne">\n<label for="email">E-mail</label>\n<input type="email" id="email" name="email">\n<button>Odoberať novinky</button>' },
      kontrola: function (d) {
        var img = d.querySelector("img"); if (!img || !(img.getAttribute("alt") || "").trim()) return "Obrázok potrebuje alt s popisom.";
        var l = d.querySelector('label[for="email"]'); if (!l || !/e-?mail/i.test(textOf(l))) return "Chýba label for=\"email\" s textom E-mail.";
        var b = d.querySelector("button"); if (!b || !/odobera/i.test(textOf(b))) return "Tlačidlo Odoberať novinky má byť značka button.";
        return d.querySelector("div") ? "Div s tlačidlom už nepotrebuješ, zmaž ho." : null;
      }, vysvetlenie: "Teraz stránku zvládne aj čítačka a ovládanie klávesnicou." },
    { typ: "vyklad", nadpis: "HTML máš za sebou!",
      text: "<p>Prešiel si všetkých 5 modulov HTML. Vieš:</p><ul><li>postaviť kostru stránky a písať text,</li><li>vkladať odkazy, obrázky a médiá,</li><li>tvoriť zoznamy, tabuľky a formuláre,</li><li>písať sémantický a prístupný kód.</li></ul>",
      tip: "Po teste ťa čakajú záverečné projekty. Potom pokračuj kurzom CSS: tvoje stránky dostanú farby a rozloženie." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "html-5-1", otazka: "Prečo používať sémantické značky namiesto div?", moznosti: ["Nesú význam pre čítačky, vyhľadávače aj ľudí", "Vyzerajú krajšie", "Sú rýchlejšie", "Div je zakázaný"], spravna: 0, vysvetlenie: "Bez CSS vyzerajú rovnako, rozdiel je vo význame." },
    { typ: "volba", lekcia: "html-5-1", otazka: "Ktorá značka je riadková (v texte)?", moznosti: ["<code>span</code>", "<code>div</code>", "<code>section</code>", "<code>main</code>"], spravna: 0, vysvetlenie: "span obalí časť textu bez zalomenia riadku." },
    { typ: "volba", lekcia: "html-5-2", otazka: "Kam patrí hlavné menu webu?", moznosti: ["<code>nav</code>", "<code>aside</code>", "<code>footer</code>", "<code>menu-bar</code>"], spravna: 0, vysvetlenie: "nav = navigácia." },
    { typ: "doplnenie", lekcia: "html-5-2", otazka: "Doplň:", sablona: "<[[0]]>\n  Hlavný obsah\n</[[0]]>\n<[[1]]>\n  Reklama, súvisiace\n</[[1]]>", zetony: ["main", "aside", "article", "side", "content"], spravne: ["main", "aside"], vysvetlenie: "main = hlavný obsah, aside = doplnkový obsah." },
    { typ: "volba", lekcia: "html-5-2", otazka: "Čo je zle?", kod: "<main>…</main>\n<main>…</main>", moznosti: ["main môže byť len raz", "main musí byť v header", "main je zastaraný", "Nič"], spravna: 0, vysvetlenie: "Hlavný obsah stránky je jeden." },
    { typ: "volba", lekcia: "html-5-3", otazka: "Produkt v e-shope s obrázkom, cenou a tlačidlom Kúpiť:", moznosti: ["<code>article</code>", "<code>section</code>", "<code>nav</code>", "<code>header</code>"], spravna: 0, vysvetlenie: "Produkt je samostatný celok, dal by sa zdieľať." },
    { typ: "volba", lekcia: "html-5-3", otazka: "Rozbaľovacia otázka v FAQ bez JavaScriptu:", moznosti: ["<code>details</code> a <code>summary</code>", "<code>select</code> a <code>option</code>", "<code>dl</code> a <code>dt</code>", "<code>section</code>"], spravna: 0, vysvetlenie: "details sa rozbalí po ťuknutí na summary." },
    { typ: "volba", lekcia: "html-5-4", otazka: "Kam patrí <code>&lt;meta name=\"description\"&gt;</code>?", moznosti: ["Do <code>head</code>", "Do <code>header</code>", "Do <code>footer</code>", "Kamkoľvek do body"], spravna: 0, vysvetlenie: "Meta značky sú údaje o stránke v head." },
    { typ: "poradie", lekcia: "html-5-4", otazka: "Zoraď hlavu stránky:", riadky: ["<head>", '  <meta charset="utf-8">', "  <title>Môj web</title>", "</head>"], vysvetlenie: "charset býva prvý, potom title." },
    { typ: "volba", lekcia: "html-5-4", otazka: "Stránka má nadpisy h1, potom hneď h4. Je to v poriadku?", moznosti: ["Nie, úrovne sa nemajú preskakovať", "Áno, je to jedno", "Áno, ak je h4 menší", "Nie, h4 neexistuje"], spravna: 0, vysvetlenie: "Za h1 nasleduje h2, potom h3. Veľkosť sa nastavuje v CSS." },
    { typ: "volba", lekcia: "html-5-5", otazka: "Čo pomôže človeku, ktorý ovláda web len klávesnicou?", moznosti: ["Skutočné button a a namiesto div", "Väčšie obrázky", "Viac farieb", "Animácie"], spravna: 0, vysvetlenie: "button a odkazy sa dajú vybrať klávesom Tab a stlačiť Enterom." },
    { typ: "volba", lekcia: "html-5-5", otazka: "Ktorý nástroj skontroluje HTML kód?", moznosti: ["validator.w3.org", "Google Prekladač", "Mapy Google", "Kalkulačka"], spravna: 0, vysvetlenie: "W3C validátor ukáže chyby v HTML." },
  ];

  K.registrujModul("html", {
    cislo: 5, nazov: "Sémantika a štruktúra stránky", popis: "Značky s významom, kostra stránky, články a sekcie, hlava stránky pre Google a mobil, prístupnosť.",
    lekcie: [L1, L2, L3, L4, L5],
    test: { otazky: TEST, potrebne: 70 },
  });
})();
