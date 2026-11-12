/* CSS · Modul 2 · Farby a písmo */
(function () {
  var P = K.pom, KOD = function (t) { return P.kod(t, "css"); }, TXT = P.TXT, MONO = P.MONO;

  var OBR_HEX = '<svg viewBox="0 0 340 120" role="img" aria-label="Hex farba #2f5bea: dve číslice červená, dve zelená, dve modrá">' +
    '<text x="170" y="44" text-anchor="middle" font-size="40" font-weight="700" ' + MONO + '><tspan style="fill:var(--muted)">#</tspan><tspan style="fill:#e5484d">2f</tspan><tspan style="fill:#30a46c">5b</tspan><tspan style="fill:#3e63dd">ea</tspan></text>' +
    '<path d="M134 52v8M182 52v8M230 52v8" style="stroke:var(--line);stroke-width:2"/>' +
    [[134, "červená", "#e5484d", "47"], [182, "zelená", "#30a46c", "91"], [230, "modrá", "#3e63dd", "234"]].map(function (x) {
      return '<text x="' + x[0] + '" y="78" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:' + x[2] + '">' + x[1] + '</text><text x="' + x[0] + '" y="93" text-anchor="middle" font-size="9.5" ' + TXT + ' style="fill:var(--muted)">' + x[3] + "/255</text>";
    }).join("") + '<rect x="270" y="10" width="56" height="56" rx="12" style="fill:#2f5bea"/><text x="298" y="84" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">výsledok</text></svg>';

  var OBR_PISMA = '<svg viewBox="0 0 340 130" role="img" aria-label="Rodiny písma: serif s pätkami, sans-serif bez pätiek, monospace s rovnakou šírkou znakov">' +
    [["serif", "Georgia, serif", "s pätkami: knihy, noviny"], ["sans-serif", "Arial, sans-serif", "bez pätiek: weby, aplikácie"], ["monospace", "Courier New, monospace", "rovnaká šírka: kód"]].map(function (r, i) {
      var y = 10 + i * 40;
      return '<text x="8" y="' + (y + 22) + '" font-size="22" font-family="' + r[1] + '" style="fill:var(--text)">Aa Ťť</text><text x="110" y="' + (y + 14) + '" font-size="12" font-weight="700" ' + MONO + ' style="fill:var(--hl-str)">' + r[0] + '</text><text x="110" y="' + (y + 29) + '" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">' + r[2] + "</text>";
    }).join("") + "</svg>";

  var L1 = { id: "css-2-1", nazov: "Farby", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Farba textu a pozadia",
      text: "<p>Dve najčastejšie vlastnosti: <code>color</code> (farba textu) a <code>background-color</code> alebo skrátene <code>background</code> (pozadie).</p>" +
        P.ziva('<p class="stitok">NOVINKA</p>', ".stitok {\n  color: white;\n  background: crimson;\n  padding: 4px 10px;\n  display: inline-block;\n}", 60),
      podrobne: "<p>Farbu môžeš zapísať viacerými spôsobmi:</p>" + P.tabulka(["Zápis", "Príklad"], [["názov", "<code>red</code>, <code>navy</code>, <code>crimson</code>, <code>tomato</code> (asi 140 mien)"], ["hex", "<code>#2f5bea</code>, skrátene <code>#f00</code>"], ["rgb", "<code>rgb(47, 91, 234)</code>"], ["hsl", "<code>hsl(225, 81%, 55%)</code>"]]) },
    { typ: "vyklad", nadpis: "Hex kód",
      text: "<p>Najčastejší zápis na webe. Šesť znakov po <code>#</code> sú tri dvojice: koľko <b>červenej, zelenej a modrej</b> farba obsahuje. Každá od <code>00</code> (nič) po <code>ff</code> (naplno).</p>", obr: OBR_HEX,
      podrobne: "<ul><li><code>#000000</code> = čierna (nič zo všetkého), <code>#ffffff</code> = biela (všetko naplno).</li><li><code>#ff0000</code> = čistá červená.</li><li>Rovnaké dvojice = sivá: <code>#888888</code>.</li></ul><p>Hex kód nemusíš vymýšľať. Dizajnové nástroje (Figma, výber farby v prehliadači) ti ho dajú.</p>",
      hlbka: "<p>Hex je šestnástková sústava: číslice 0–9 a písmená a–f (a = 10, f = 15). <code>ff</code> = 15 × 16 + 15 = 255. Preto má každá zložka 256 úrovní a spolu je to 16,7 milióna farieb.</p>" },
    { typ: "volba", otazka: "Aká farba je <code>#ffffff</code>?", moznosti: ["biela", "čierna", "červená", "priehľadná"], spravna: 0, vysvetlenie: "Všetky zložky naplno = biela." },
    { typ: "vyklad", nadpis: "Priehľadnosť",
      text: "<p>Štvrtá hodnota v <code>rgb</code> alebo dve číslice navyše v hex určujú <b>priehľadnosť</b> (alfa): 0 = úplne priehľadné, 1 = plné.</p>" +
        P.ziva('<div class="obr"><p class="text">Text na fotke</p></div>', ".obr {\n  background: linear-gradient(135deg, #f6a, #49f);\n  padding: 30px 10px;\n}\n.text {\n  background: rgb(0 0 0 / 0.5);\n  color: white;\n  padding: 8px;\n  margin: 0;\n}", 120),
      podrobne: "<p>Zápis <code>rgb(0 0 0 / 0.5)</code> je polopriehľadná čierna. Starší zápis je <code>rgba(0, 0, 0, 0.5)</code>, funguje rovnako. Pozadie s farebným prechodom robí <code>linear-gradient</code>.</p>" },
    { typ: "volba", otazka: "Ako zapíšeš polopriehľadnú bielu?", moznosti: ["<code>rgb(255 255 255 / 0.5)</code>", "<code>white / 2</code>", "<code>#fff 50%</code>", "<code>half-white</code>"], spravna: 0, vysvetlenie: "Hodnota za lomkou je priehľadnosť od 0 do 1." },
    { typ: "kod", zadanie: "Tlačidlu s triedou <code>kup</code> nastav bielu farbu textu (<code>white</code>) a pozadie <code>#2e8b57</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<button class="kup">Kúpiť</button>', css: ".kup {\n  border: none;\n  padding: 10px 18px;\n  \n}" }, vyska: "190px",
      napoveda: "<code>color: white;</code> a <code>background: #2e8b57;</code>", riesenie: { css: ".kup {\n  border: none;\n  padding: 10px 18px;\n  color: white;\n  background: #2e8b57;\n}" },
      kontrola: function (d) {
        if (!P.rovnakaFarba(d, ".kup", "color", "white")) return "Text tlačidla ešte nie je biely.";
        return P.rovnakaFarba(d, ".kup", "background-color", "#2e8b57") ? null : "Pozadie tlačidla má byť #2e8b57.";
      }, vysvetlenie: "Zelené tlačidlo je hotové." },
    { typ: "vyklad", nadpis: "Kontrast",
      text: "<p>Text musí byť dobre čitateľný: tmavý na svetlom alebo svetlý na tmavom. Svetlosivý text na bielom pozadí je častá chyba moderných webov.</p>",
      podrobne: "<p>Pravidlá prístupnosti WCAG požadujú kontrastný pomer aspoň <b>4,5 : 1</b> pre bežný text. Kontrast overíš v prehliadači (F12 → klikni na farbu) alebo na stránke webaim.org/resources/contrastchecker.</p>" },
  ] };

  var L2 = { id: "css-2-2", nazov: "Písmo", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Rodina písma",
      text: "<p>Písmo nastavíš vlastnosťou <code>font-family</code>. Uvádza sa <b>zoznam</b>: ak počítač nemá prvé písmo, skúsi druhé. Na konci je vždy všeobecná rodina:</p>" + KOD("body {\n  font-family: \"Segoe UI\", Arial, sans-serif;\n}"), obr: OBR_PISMA,
      podrobne: "<p>Názov s medzerou daj do úvodzoviek. Všeobecné rodiny: <code>serif</code>, <code>sans-serif</code>, <code>monospace</code>, <code>cursive</code>, <code>system-ui</code> (písmo systému: v Androide Roboto, v iPhone San Francisco).</p>" },
    { typ: "vyklad", nadpis: "Vlastné písmo z Google Fonts",
      text: "<p>Na fonts.google.com je vyše 1500 písiem zadarmo. Vyberieš písmo a do head vložíš odkaz:</p>" + P.kod('<link rel="stylesheet"\n  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap">', "html") + KOD("body {\n  font-family: Inter, sans-serif;\n}"),
      podrobne: "<p>Vyberaj písma s podporou <b>latin-ext</b>, inak slovenské znaky ako ľ, ť, ŕ zobrazí iné písmo. Na jednom webe stačia 1–2 písma: jedno na nadpisy, jedno na text.</p>",
      hlbka: "<p>Písmo sa dá aj stiahnuť a pripojiť pravidlom <code>@font-face</code> zo svojho servera. Je to rýchlejšie a nezávislé od Googlu (a v EÚ to rieši aj otázky ochrany údajov). Táto aplikácia to tak robí: jej písma Inter a JetBrains Mono sú uložené v telefóne.</p>" },
    { typ: "volba", otazka: "Prečo je na konci <code>font-family</code> slovo ako <code>sans-serif</code>?", moznosti: ["Záloha, ak žiadne uvedené písmo nie je k dispozícii", "Je to povinné slovo bez významu", "Zapne tučné písmo", "Zmení jazyk"], spravna: 0, vysvetlenie: "Prehliadač vtedy použije akékoľvek písmo tej rodiny." },
    { typ: "vyklad", nadpis: "Veľkosť, hrúbka, štýl",
      text: P.tabulka(["Vlastnosť", "Hodnoty", "Príklad"], [["<code>font-size</code>", "px, rem, em, %", "<code>font-size: 18px;</code>"], ["<code>font-weight</code>", "100–900, normal, bold", "<code>font-weight: 700;</code>"], ["<code>font-style</code>", "normal, italic", "<code>font-style: italic;</code>"], ["<code>line-height</code>", "číslo bez jednotky", "<code>line-height: 1.6;</code>"]]),
      podrobne: "<ul><li><code>rem</code> = násobok základnej veľkosti (zvyčajne 16px). <code>2rem</code> = 32px. Rešpektuje nastavenie veľkosti písma v telefóne, preto je na text lepší ako px.</li><li><code>line-height</code> okolo 1.5 až 1.7 sa najlepšie číta.</li></ul>" },
    { typ: "doplnenie", otazka: "Nadpis: veľkosť 2rem, tučné:", sablona: "h1 {\n  [[0]]: 2rem;\n  [[1]]: 700;\n}", zetony: ["font-size", "font-weight", "font-style", "size", "bold"], spravne: ["font-size", "font-weight"], vysvetlenie: "font-size = veľkosť, font-weight = hrúbka." },
    { typ: "kod", zadanie: "Telu stránky (<code>body</code>) nastav písmo <code>Arial, sans-serif</code> a riadkovanie <code>1.6</code>. Nadpisu <code>h1</code> veľkosť <code>32px</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: "<h1>Blog o cestovaní</h1>\n<p>Minulé leto sme prešli celé Tatry pešo. Každý deň sme spali na inej chate a jedli bryndzové halušky.</p>", css: "" }, vyska: "200px",
      napoveda: "<code>body { font-family: Arial, sans-serif; line-height: 1.6; }</code> a <code>h1 { font-size: 32px; }</code>", riesenie: { css: "body {\n  font-family: Arial, sans-serif;\n  line-height: 1.6;\n}\nh1 {\n  font-size: 32px;\n}" },
      kontrola: function (d) {
        if (!/arial/i.test(P.styl(d, "p", "font-family"))) return "Odsek nemá písmo Arial. Nastav font-family na body.";
        if (Math.abs(P.px(d, "p", "line-height") / P.px(d, "p", "font-size") - 1.6) > 0.05) return "Riadkovanie má byť line-height: 1.6.";
        return P.styl(d, "h1", "font-size") === "32px" ? null : "Nadpis h1 má mať font-size: 32px.";
      }, vysvetlenie: "Text s väčším riadkovaním sa číta oveľa príjemnejšie." },
  ] };

  var L3 = { id: "css-2-3", nazov: "Úprava textu", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Zarovnanie a dekorácia",
      text: P.tabulka(["Vlastnosť", "Čo robí", "Hodnoty"], [["<code>text-align</code>", "zarovnanie", "left, center, right, justify"], ["<code>text-decoration</code>", "čiara", "none, underline, line-through"], ["<code>text-transform</code>", "veľké/malé písmená", "uppercase, lowercase, capitalize"], ["<code>letter-spacing</code>", "medzery medzi písmenami", "<code>0.1em</code>"]]) +
        P.ziva('<h2>Akcia týždňa</h2><p class="stara">19,90 €</p><a href="#">Do košíka</a>', "h2 { text-align: center; text-transform: uppercase; letter-spacing: 0.1em; }\n.stara { text-decoration: line-through; color: gray; text-align: center; }\na { text-decoration: none; display: block; text-align: center; }", 140),
      podrobne: "<p><code>text-decoration: none</code> sa často používa na odkazy v menu, aby neboli podčiarknuté. V bežnom texte však odkazy podčiarknuté nechaj, aby ich ľudia spoznali.</p><p><code>justify</code> (do bloku) na webe radšej nepoužívaj, robí v texte veľké diery.</p>" },
    { typ: "volba", otazka: "Ako zrušíš podčiarknutie odkazu?", moznosti: ["<code>text-decoration: none;</code>", "<code>underline: off;</code>", "<code>text-style: normal;</code>", "<code>link: plain;</code>"], spravna: 0, vysvetlenie: "text-decoration ovláda čiary pod, nad a cez text." },
    { typ: "volba", otazka: "Ako napíšeš v CSS všetko veľkými písmenami?", moznosti: ["<code>text-transform: uppercase;</code>", "<code>font-size: big;</code>", "<code>text-case: upper;</code>", "<code>caps: true;</code>"], spravna: 0, vysvetlenie: "V HTML ostane text normálne a CSS ho len zobrazí veľkými." },
    { typ: "kod", zadanie: "Nadpis <code>h1</code> zarovnaj na stred (<code>text-align</code>) a zobraz veľkými písmenami (<code>text-transform</code>). Prvok <code>.stara-cena</code> prečiarkni (<code>line-through</code>).",
      karty: ["html", "css"], aktivna: "css", start: { html: '<h1>Výpredaj</h1>\n<p class="stara-cena">49 €</p>\n<p>Teraz 29 €</p>', css: "" }, vyska: "200px",
      napoveda: "<code>h1 { text-align: center; text-transform: uppercase; }</code> <code>.stara-cena { text-decoration: line-through; }</code>", riesenie: { css: "h1 {\n  text-align: center;\n  text-transform: uppercase;\n}\n.stara-cena {\n  text-decoration: line-through;\n}" },
      kontrola: function (d) {
        if (P.styl(d, "h1", "text-align") !== "center") return "Nadpis nie je na strede.";
        if (P.styl(d, "h1", "text-transform") !== "uppercase") return "Nadpis nie je veľkými písmenami (uppercase).";
        return /line-through/.test(P.styl(d, ".stara-cena", "text-decoration-line")) ? null : "Stará cena nie je prečiarknutá.";
      }, vysvetlenie: "V HTML je stále „Výpredaj“, veľké písmená sú len vzhľad." },
    { typ: "vyklad", nadpis: "Tieň textu",
      text: "<p><code>text-shadow</code> pridá textu tieň: posun vodorovne, zvisle, rozmazanie a farba.</p>" + P.ziva('<h1>Leto 2026</h1>', "body { background: #ffb347; }\nh1 { color: white; text-shadow: 2px 2px 6px rgb(0 0 0 / 0.4); }", 80),
      podrobne: "<p>Tieň používaj jemne. Silný tieň pod každým textom stránku zahltí.</p>" },
  ] };

  var L4 = { id: "css-2-4", nazov: "Jednotky", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Absolútne a relatívne",
      text: P.tabulka(["Jednotka", "Význam", "Na čo"], [["<code>px</code>", "pixel obrazovky", "rámiky, malé detaily"], ["<code>rem</code>", "násobok veľkosti písma stránky (16px)", "písmo, medzery"], ["<code>em</code>", "násobok písma rodiča", "medzery, ktoré rastú s textom"], ["<code>%</code>", "percento rodiča", "šírky"], ["<code>vw</code> / <code>vh</code>", "1 % šírky / výšky okna", "celoobrazovkové bloky"]]),
      podrobne: "<p>Ľudia so slabším zrakom si v telefóne zväčšujú písmo. Text v <code>rem</code> sa zväčší s ním, text v <code>px</code> nie vždy. Preto: písmo v rem, tenké čiary v px.</p>" },
    { typ: "volba", otazka: "Koľko je <code>1.5rem</code> pri základnom písme 16px?", moznosti: ["24px", "15px", "1.5px", "160px"], spravna: 0, vysvetlenie: "1.5 × 16 = 24." },
    { typ: "volba", otazka: "Blok má mať presne výšku celej obrazovky. Ktorá hodnota?", moznosti: ["<code>100vh</code>", "<code>100%</code>", "<code>100rem</code>", "<code>full</code>"], spravna: 0, vysvetlenie: "vh = viewport height, 100vh = celá výška okna." },
    { typ: "vyklad", nadpis: "calc() a premenné",
      text: "<p><code>calc()</code> počíta s rôznymi jednotkami: <code>width: calc(100% - 40px);</code></p><p><b>Premenné</b> (custom properties) si zapamätajú hodnotu a použiješ ju všade. Začínajú dvoma pomlčkami:</p>" +
        KOD(":root {\n  --hlavna: #2f5bea;\n}\nbutton {\n  background: var(--hlavna);\n}\na {\n  color: var(--hlavna);\n}"),
      podrobne: "<p>Keď sa rozhodneš zmeniť hlavnú farbu webu, zmeníš ju na jednom mieste. Takto funguje aj tmavý režim tejto aplikácie: rovnaké premenné, iné hodnoty.</p>" },
    { typ: "kod", zadanie: "Vytvor v <code>:root</code> premennú <code>--hlavna</code> s hodnotou <code>tomato</code> a použi ju ako pozadie tlačidla (<code>background: var(--hlavna)</code>) aj ako farbu nadpisu.",
      karty: ["html", "css"], aktivna: "css", start: { html: "<h1>Pizzeria Roma</h1>\n<button>Objednať</button>", css: ":root {\n  \n}\n" }, vyska: "220px",
      napoveda: "<code>:root { --hlavna: tomato; }</code>, <code>button { background: var(--hlavna); }</code>, <code>h1 { color: var(--hlavna); }</code>", riesenie: { css: ":root {\n  --hlavna: tomato;\n}\nbutton {\n  background: var(--hlavna);\n}\nh1 {\n  color: var(--hlavna);\n}" },
      kontrola: function (d, s) {
        if (!/--hlavna\s*:\s*tomato/i.test(s.css)) return "Chýba premenná --hlavna: tomato v :root.";
        if (!/var\(--hlavna\)/.test(s.css)) return "Premennú použi cez var(--hlavna).";
        if (!P.rovnakaFarba(d, "button", "background-color", "tomato")) return "Tlačidlo ešte nemá pozadie z premennej.";
        return P.rovnakaFarba(d, "h1", "color", "tomato") ? null : "Nadpis ešte nemá farbu z premennej.";
      }, vysvetlenie: "Skús zmeniť tomato na inú farbu. Zmení sa naraz tlačidlo aj nadpis." },
  ] };

  var L5 = { id: "css-2-5", nazov: "Rámiky, tiene, zaoblenie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Rámik",
      text: "<p><code>border</code> má tri časti: hrúbku, štýl a farbu.</p>" + P.ziva('<p class="a">solid</p><p class="b">dashed</p><p class="c">len dole</p>', "p { padding: 6px; }\n.a { border: 2px solid #2f5bea; }\n.b { border: 2px dashed tomato; }\n.c { border-bottom: 3px solid gold; }", 150),
      podrobne: "<p>Štýly: <code>solid</code> (plná), <code>dashed</code> (čiarkovaná), <code>dotted</code> (bodkovaná), <code>double</code>, <code>none</code>. Rámik len na jednej strane: <code>border-top</code>, <code>border-right</code>, <code>border-bottom</code>, <code>border-left</code>.</p>" },
    { typ: "doplnenie", otazka: "Doplň rámik hrúbky 1px, plný, sivý:", sablona: ".karta {\n  border: [[0]] [[1]] [[2]];\n}", zetony: ["1px", "solid", "gray", "line", "thin-gray"], spravne: ["1px", "solid", "gray"], vysvetlenie: "hrúbka štýl farba" },
    { typ: "vyklad", nadpis: "Zaoblenie a tieň",
      text: P.ziva('<div class="karta">Karta s tieňom</div><img class="avatar" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 10 10\'%3E%3Crect width=\'10\' height=\'10\' fill=\'%23f6a\'/%3E%3C/svg%3E" alt="">', ".karta {\n  padding: 16px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);\n}\n.avatar {\n  width: 50px; height: 50px;\n  border-radius: 50%;\n  margin-top: 12px;\n}", 160),
      podrobne: "<ul><li><code>border-radius</code> zaoblí rohy. <code>50%</code> spraví zo štvorca kruh (profilové fotky).</li><li><code>box-shadow</code>: posun x, posun y, rozmazanie, farba. Jemný tieň oddelí kartu od pozadia.</li></ul>" },
    { typ: "volba", otazka: "Ako spravíš zo štvorcového obrázka kruh?", moznosti: ["<code>border-radius: 50%;</code>", "<code>shape: circle;</code>", "<code>border: round;</code>", "<code>radius: full;</code>"], spravna: 0, vysvetlenie: "Zaoblenie 50 % na štvorci = kruh." },
    { typ: "kod", zadanie: "Prvku <code>.karta</code> nastav rámik <code>1px solid #ddd</code>, zaoblenie <code>12px</code> a tieň <code>0 2px 8px rgb(0 0 0 / 0.1)</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="karta">\n  <h3>Bryndzové halušky</h3>\n  <p>6,90 €</p>\n</div>', css: ".karta {\n  padding: 12px;\n  \n}" }, vyska: "210px",
      napoveda: "<code>border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);</code>", riesenie: { css: ".karta {\n  padding: 12px;\n  border: 1px solid #ddd;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);\n}" },
      kontrola: function (d) {
        if (P.styl(d, ".karta", "border-top-style") !== "solid" || P.px(d, ".karta", "border-top-width") !== 1) return "Karta potrebuje rámik 1px solid #ddd.";
        if (!P.rovnakaFarba(d, ".karta", "border-top-color", "#ddd")) return "Farba rámika má byť #ddd.";
        if (P.px(d, ".karta", "border-top-left-radius") !== 12) return "Zaoblenie má byť border-radius: 12px.";
        return P.styl(d, ".karta", "box-shadow") !== "none" ? null : "Karte chýba tieň box-shadow.";
      }, vysvetlenie: "Takto vyzerajú karty v moderných aplikáciách." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<ul><li>Farby: názov, hex, rgb, priehľadnosť, kontrast.</li><li>Písmo: font-family, size, weight, line-height, Google Fonts.</li><li>Text: zarovnanie, dekorácia, veľké písmená, tieň.</li><li>Jednotky px, rem, %, vw/vh, calc() a premenné.</li><li>border, border-radius, box-shadow.</li></ul>", tip: "Teraz test. Potom Modul 3: box model, teda medzery a rozmery." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "css-2-1", otazka: "Ktorá vlastnosť mení farbu textu?", moznosti: ["<code>color</code>", "<code>text-color</code>", "<code>font-color</code>", "<code>background</code>"], spravna: 0, vysvetlenie: "color = farba textu." },
    { typ: "volba", lekcia: "css-2-1", otazka: "Čo znamená <code>#000000</code>?", moznosti: ["čierna", "biela", "priehľadná", "sivá"], spravna: 0, vysvetlenie: "Žiadna farebná zložka = čierna." },
    { typ: "volba", lekcia: "css-2-1", otazka: "Prečo nepoužiť svetlosivý text na bielom pozadí?", moznosti: ["Má slabý kontrast, zle sa číta", "Prehliadač to nedovolí", "Sivá nie je farba", "Spomalí stránku"], spravna: 0, vysvetlenie: "Bežný text potrebuje kontrast aspoň 4,5 : 1." },
    { typ: "volba", lekcia: "css-2-2", otazka: "Ktorý zápis písma je správny?", moznosti: ["<code>font-family: \"Open Sans\", Arial, sans-serif;</code>", "<code>font: Open Sans;</code>", "<code>font-family = Arial;</code>", "<code>family: sans;</code>"], spravna: 0, vysvetlenie: "Zoznam písiem, názov s medzerou v úvodzovkách, na konci všeobecná rodina." },
    { typ: "volba", lekcia: "css-2-2", otazka: "Aká hodnota line-height je pre text najvhodnejšia?", moznosti: ["okolo 1.5", "0.5", "5", "100px"], spravna: 0, vysvetlenie: "1.5 až 1.7 je príjemné na čítanie." },
    { typ: "doplnenie", lekcia: "css-2-3", otazka: "Zarovnaj na stred a zruš podčiarknutie:", sablona: "a {\n  [[0]]: center;\n  [[1]]: none;\n}", zetony: ["text-align", "text-decoration", "align", "underline"], spravne: ["text-align", "text-decoration"], vysvetlenie: "text-align a text-decoration." },
    { typ: "volba", lekcia: "css-2-4", otazka: "Prečo písať veľkosť písma v rem namiesto px?", moznosti: ["Prispôsobí sa nastaveniu veľkosti písma používateľa", "rem je rýchlejší", "px nefunguje na mobile", "Nie je rozdiel"], spravna: 0, vysvetlenie: "rem vychádza zo základnej veľkosti písma, ktorú si človek môže zväčšiť." },
    { typ: "volba", lekcia: "css-2-4", otazka: "Ako použiješ premennú <code>--farba</code>?", moznosti: ["<code>var(--farba)</code>", "<code>$farba</code>", "<code>--farba()</code>", "<code>@farba</code>"], spravna: 0, vysvetlenie: "Premenné sa čítajú funkciou var()." },
    { typ: "volba", lekcia: "css-2-5", otazka: "Čo urobí <code>border-bottom: 2px solid red;</code>?", moznosti: ["Červená čiara len pod prvkom", "Červený rámik okolo", "Červený text", "Nič"], spravna: 0, vysvetlenie: "border-bottom = len spodná strana." },
    { typ: "volba", lekcia: "css-2-5", otazka: "Ktorá vlastnosť pridá prvku tieň?", moznosti: ["<code>box-shadow</code>", "<code>shadow</code>", "<code>text-shadow</code>", "<code>border-shadow</code>"], spravna: 0, vysvetlenie: "box-shadow tieň prvku, text-shadow tieň písmen." },
  ];

  K.registrujModul("css", { cislo: 2, nazov: "Farby a písmo", popis: "Zápisy farieb, kontrast, písma a Google Fonts, úprava textu, jednotky, premenné, rámiky a tiene.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
