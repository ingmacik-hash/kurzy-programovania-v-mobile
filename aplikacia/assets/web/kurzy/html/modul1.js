/* HTML · Modul 1 · Základy HTML (5 lekcií + test) */
(function () {
  var KOD = function (t, stitok) { return K.blokKodu(t, "html", stitok); };
  /* blok kódu + to, ako ho zobrazí prehliadač */
  var UKAZKA = function (t, vysledok) { return '<div class="kod-obal">' + KOD(t, "Kód") + '<div class="vysledok">' + (vysledok === undefined ? t : vysledok) + "</div></div>"; };
  var TXT = 'font-family="Inter,sans-serif"', MONO = 'font-family="JBMono,monospace"';
  function tabulka(hlavicka, riadky) {
    return '<div class="tabulka"><table><thead><tr>' + hlavicka.map(function (h) { return "<th>" + h + "</th>"; }).join("") + "</tr></thead><tbody>" +
      riadky.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
  }
  function telo(fn) { return function (d) { return fn(d, d.body); }; }
  function textOf(el) { return el ? el.textContent.trim() : ""; }

  /* ---------- ilustrácie ---------- */
  var OBR_CESTA = '<svg viewBox="0 0 340 130" role="img" aria-label="Server pošle HTML súbor, prehliadač ho prečíta a zobrazí stránku">' +
    '<rect x="6" y="30" width="78" height="70" rx="10" style="fill:var(--surface-2);stroke:var(--line)"/>' +
    '<rect x="20" y="44" width="50" height="10" rx="3" style="fill:var(--muted)"/><rect x="20" y="60" width="50" height="10" rx="3" style="fill:var(--muted)"/><circle cx="62" cy="83" r="4" style="fill:var(--ok)"/>' +
    '<text x="45" y="118" text-anchor="middle" font-size="12" font-weight="600" ' + TXT + ' style="fill:var(--text)">Server</text>' +
    '<path d="M92 65h56" style="stroke:var(--accent);stroke-width:3;fill:none" marker-end="url(#sip)"/>' +
    '<rect x="100" y="38" width="42" height="18" rx="4" style="fill:var(--accent-soft)"/><text x="121" y="51" text-anchor="middle" font-size="9.5" font-weight="700" ' + MONO + ' style="fill:var(--accent)">.html</text>' +
    '<rect x="156" y="30" width="80" height="70" rx="10" style="fill:var(--surface-2);stroke:var(--line)"/>' +
    '<circle cx="196" cy="62" r="20" style="fill:none;stroke:var(--accent);stroke-width:4"/><path d="M176 62h40M196 42c-10 12-10 28 0 40M196 42c10 12 10 28 0 40" style="fill:none;stroke:var(--accent);stroke-width:2"/>' +
    '<text x="196" y="118" text-anchor="middle" font-size="12" font-weight="600" ' + TXT + ' style="fill:var(--text)">Prehliadač</text>' +
    '<path d="M244 65h32" style="stroke:var(--accent);stroke-width:3;fill:none" marker-end="url(#sip)"/>' +
    '<rect x="284" y="18" width="50" height="92" rx="9" style="fill:var(--surface);stroke:var(--text);stroke-width:2.5"/>' +
    '<rect x="292" y="32" width="34" height="8" rx="2" style="fill:var(--text)"/><rect x="292" y="46" width="34" height="4" rx="2" style="fill:var(--muted)"/><rect x="292" y="54" width="28" height="4" rx="2" style="fill:var(--muted)"/><rect x="292" y="66" width="34" height="22" rx="3" style="fill:var(--accent-soft)"/>' +
    '<text x="309" y="126" text-anchor="middle" font-size="12" font-weight="600" ' + TXT + ' style="fill:var(--text)">Stránka</text>' +
    '<defs><marker id="sip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" style="fill:var(--accent)"/></marker></defs></svg>';

  function vrstva(y, farba, nazov, popis, kod) {
    return '<rect x="6" y="' + y + '" width="328" height="44" rx="10" style="fill:' + farba + '"/>' +
      '<text x="20" y="' + (y + 19) + '" font-size="14" font-weight="800" ' + TXT + ' style="fill:#fff">' + nazov + "</text>" +
      '<text x="20" y="' + (y + 35) + '" font-size="11" ' + TXT + ' style="fill:#fff;opacity:.9">' + popis + "</text>" +
      '<rect x="182" y="' + (y + 9) + '" width="142" height="26" rx="6" style="fill:rgba(0,0,0,.25)"/>' +
      '<text x="190" y="' + (y + 26) + '" font-size="10.5" ' + MONO + ' style="fill:#fff">' + kod + "</text>";
  }
  var OBR_VRSTVY = '<svg viewBox="0 0 340 162" role="img" aria-label="Tri vrstvy webu: HTML, CSS a JavaScript">' +
    vrstva(6, "#e0522b", "HTML · obsah", "čo na stránke je", "&lt;h1&gt;Ahoj&lt;/h1&gt;") +
    vrstva(58, "#6a3fc9", "CSS · vzhľad", "ako to vyzerá", "h1 { color: red; }") +
    vrstva(110, "#b38a00", "JavaScript · správanie", "čo sa stane po kliknutí", "onclick = pozdrav") + "</svg>";

  var OBR_ANATOMIA = '<svg viewBox="0 0 340 150" role="img" aria-label="Časti prvku p: otváracia značka, obsah, zatváracia značka">' +
    '<rect x="4" y="34" width="332" height="50" rx="10" style="fill:var(--code-bg)"/>' +
    '<text x="170" y="67" text-anchor="middle" font-size="21" ' + MONO + '><tspan style="fill:var(--hl-tag)">&lt;p&gt;</tspan><tspan style="fill:var(--code-text)">Ahoj, svet!</tspan><tspan style="fill:var(--hl-tag)">&lt;/p&gt;</tspan></text>' +
    '<path d="M28 92v8h48v-8M100 92v8h140v-8M250 92v8h62v-8" style="fill:none;stroke:var(--accent);stroke-width:2"/>' +
    '<text x="52" y="116" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">otváracia</text><text x="52" y="130" text-anchor="middle" font-size="11" ' + TXT + ' style="fill:var(--muted)">značka</text>' +
    '<text x="170" y="116" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">obsah</text><text x="170" y="130" text-anchor="middle" font-size="11" ' + TXT + ' style="fill:var(--muted)">text, ktorý uvidíš</text>' +
    '<text x="281" y="116" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">zatváracia</text><text x="281" y="130" text-anchor="middle" font-size="11" ' + TXT + ' style="fill:var(--muted)">značka s lomkou /</text>' +
    '<path d="M20 26v-8h300v8" style="fill:none;stroke:var(--hl-sel);stroke-width:2"/><text x="170" y="12" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--hl-sel)">celé spolu = prvok (element)</text></svg>';

  var OBR_VNARANIE = '<svg viewBox="0 0 340 120" role="img" aria-label="Prvok strong je celý vnútri prvku p">' +
    '<rect x="6" y="10" width="328" height="100" rx="12" style="fill:none;stroke:var(--accent);stroke-width:2.5"/>' +
    '<text x="18" y="30" font-size="12" font-weight="700" ' + MONO + ' style="fill:var(--accent)">&lt;p&gt;</text><text x="300" y="102" font-size="12" font-weight="700" ' + MONO + ' style="fill:var(--accent)">&lt;/p&gt;</text>' +
    '<text x="22" y="68" font-size="14" ' + TXT + ' style="fill:var(--text)">Toto je</text>' +
    '<rect x="86" y="42" width="160" height="40" rx="9" style="fill:var(--flame-bg);stroke:var(--flame);stroke-width:2.5"/>' +
    '<text x="94" y="56" font-size="10" font-weight="700" ' + MONO + ' style="fill:var(--flame)">&lt;strong&gt;</text><text x="166" y="72" text-anchor="middle" font-size="14" font-weight="800" ' + TXT + ' style="fill:var(--text)">dôležité</text>' +
    '<text x="254" y="68" font-size="14" ' + TXT + ' style="fill:var(--text)">slovo.</text></svg>';

  var OBR_ATRIBUT = '<svg viewBox="0 0 340 128" role="img" aria-label="Atribút má názov, znak rovná sa a hodnotu v úvodzovkách">' +
    '<rect x="4" y="30" width="332" height="46" rx="10" style="fill:var(--code-bg)"/>' +
    '<text x="170" y="60" text-anchor="middle" font-size="15" ' + MONO + '><tspan style="fill:var(--hl-tag)">&lt;a </tspan><tspan style="fill:var(--hl-attr)">href</tspan><tspan style="fill:var(--code-muted)">=</tspan><tspan style="fill:var(--hl-str)">"https://sk.wikipedia.org"</tspan><tspan style="fill:var(--hl-tag)">&gt;</tspan></text>' +
    '<path d="M44 84v8h34v-8M84 84v8h10v-8M100 84v8h210v-8" style="fill:none;stroke:var(--accent);stroke-width:2"/>' +
    '<text x="61" y="110" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">názov</text>' +
    '<text x="89" y="124" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">=</text>' +
    '<text x="205" y="110" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">hodnota v úvodzovkách</text>' +
    '<text x="170" y="18" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--hl-sel)">atribút patrí vždy do otváracej značky</text></svg>';

  function uzol(x, y, t, f) { return '<rect x="' + (x - 34) + '" y="' + y + '" width="68" height="26" rx="7" style="fill:' + f + '"/><text x="' + x + '" y="' + (y + 17) + '" text-anchor="middle" font-size="12" font-weight="700" ' + MONO + ' style="fill:#fff">' + t + "</text>"; }
  function hrana(x1, y1, x2, y2) { return '<path d="M' + x1 + " " + y1 + "C" + x1 + " " + (y1 + 14) + " " + x2 + " " + (y2 - 14) + " " + x2 + " " + y2 + '" style="fill:none;stroke:var(--muted);stroke-width:2"/>'; }
  var OBR_STROM = '<svg viewBox="0 0 340 150" role="img" aria-label="Strom dokumentu: html obsahuje head a body">' +
    hrana(170, 32, 90, 58) + hrana(170, 32, 250, 58) + hrana(90, 84, 50, 112) + hrana(90, 84, 130, 112) + hrana(250, 84, 210, 112) + hrana(250, 84, 290, 112) +
    uzol(170, 6, "html", "#e0522b") + uzol(90, 58, "head", "#5b6176") + uzol(250, 58, "body", "#2f5bea") +
    uzol(50, 112, "title", "#5b6176") + uzol(130, 112, "meta", "#5b6176") + uzol(210, 112, "h1", "#2f5bea") + uzol(290, 112, "p", "#2f5bea") +
    '<text x="90" y="148" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">informácie o stránke</text><text x="250" y="148" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">to, čo uvidíš</text></svg>';

  var OBR_HEAD_BODY = '<svg viewBox="0 0 340 170" role="img" aria-label="Obsah title sa zobrazí na karte prehliadača, obsah body na stránke">' +
    '<rect x="150" y="8" width="184" height="156" rx="12" style="fill:var(--surface);stroke:var(--text);stroke-width:2"/>' +
    '<rect x="150" y="8" width="184" height="30" rx="12" style="fill:var(--surface-2)"/><rect x="160" y="14" width="100" height="20" rx="6" style="fill:var(--surface);stroke:var(--accent);stroke-width:2"/>' +
    '<text x="170" y="28" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">Moja stránka</text>' +
    '<text x="164" y="66" font-size="17" font-weight="800" ' + TXT + ' style="fill:var(--text)">Ahoj!</text><rect x="164" y="78" width="150" height="6" rx="3" style="fill:var(--muted)"/><rect x="164" y="90" width="120" height="6" rx="3" style="fill:var(--muted)"/>' +
    '<rect x="164" y="106" width="156" height="46" rx="6" style="fill:none;stroke:var(--ok);stroke-width:2;stroke-dasharray:5 4"/>' +
    '<rect x="6" y="14" width="124" height="26" rx="6" style="fill:var(--code-bg)"/><text x="14" y="31" font-size="10" ' + MONO + ' style="fill:var(--hl-tag)">&lt;title&gt;…&lt;/title&gt;</text>' +
    '<path d="M130 27h26" style="stroke:var(--accent);stroke-width:2.5" marker-end="url(#sip2)"/>' +
    '<rect x="6" y="110" width="124" height="26" rx="6" style="fill:var(--code-bg)"/><text x="14" y="127" font-size="10" ' + MONO + ' style="fill:var(--hl-tag)">&lt;body&gt;…&lt;/body&gt;</text>' +
    '<path d="M130 123h30" style="stroke:var(--ok);stroke-width:2.5" marker-end="url(#sip3)"/>' +
    '<defs><marker id="sip2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" style="fill:var(--accent)"/></marker><marker id="sip3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" style="fill:var(--ok)"/></marker></defs></svg>';

  /* Predvolené veľkosti nadpisov v prehliadačoch (v em, 1 em = veľkosť bežného textu). */
  var VELKOSTI = [["h1", 2], ["h2", 1.5], ["h3", 1.17], ["h4", 1], ["h5", 0.83], ["h6", 0.67]];
  var OBR_NADPISY = (function () {
    var s = '<svg viewBox="0 0 340 196" role="img" aria-label="Predvolená veľkosť nadpisov h1 až h6 v em">';
    var L = 40, sir = 250, max = 2;
    [0, 0.5, 1, 1.5, 2].forEach(function (v) { var x = L + v / max * sir; s += '<line x1="' + x + '" x2="' + x + '" y1="4" y2="172" style="stroke:var(--line)"/><text x="' + x + '" y="188" text-anchor="middle" font-size="10" ' + TXT + ' style="fill:var(--muted)">' + String(v).replace(".", ",") + " em</text>"; });
    VELKOSTI.forEach(function (h, i) {
      var y = 8 + i * 27, w = h[1] / max * sir;
      s += '<text x="' + (L - 8) + '" y="' + (y + 15) + '" text-anchor="end" font-size="12" font-weight="700" ' + MONO + ' style="fill:var(--text)">' + h[0] + "</text>";
      s += '<rect x="' + L + '" y="' + y + '" width="' + w + '" height="20" rx="4" style="fill:' + (i === 0 ? "var(--accent)" : "var(--accent-soft)") + ';stroke:var(--accent)"/>';
      s += '<text x="' + (L + w + 6) + '" y="' + (y + 15) + '" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">' + String(h[1]).replace(".", ",") + "</text>";
    });
    return s + "</svg>";
  })();

  /* ---------- lekcie ---------- */
  var L1 = { id: "html-1-1", nazov: "Čo je HTML", minut: 6, kroky: [
    { typ: "vyklad", nadpis: "Vitaj v HTML",
      text: "<p><b>HTML</b> je jazyk, v ktorom je napísaná každá webová stránka. Aj tá, ktorú si otvoril naposledy. Pomocou neho povieš prehliadaču, <b>čo</b> na stránke je: tu je nadpis, tu odsek, tu obrázok, tu odkaz.</p>",
      obr: OBR_CESTA, obrPopis: "Server pošle súbor s HTML, prehliadač ho prečíta a nakreslí z neho stránku.",
      podrobne: "<p>Skratka HTML znamená <b>HyperText Markup Language</b>:</p><ul><li><b>HyperText</b> – text, ktorý obsahuje odkazy na ďalšie texty. Kliknutím preskočíš inam. To je podstata webu.</li><li><b>Markup</b> – značkovanie. Obyčajný text „označíš“ značkami, aby prehliadač vedel, čo je čo.</li><li><b>Language</b> – jazyk s presnými pravidlami.</li></ul><p>HTML súbor je obyčajný text s príponou <code>.html</code>. Dá sa napísať v akomkoľvek textovom editore, aj v Poznámkovom bloku.</p>",
      hlbka: "<p>HTML vymyslel <b>Tim Berners-Lee</b> v roku 1991 v laboratóriu CERN pri Ženeve, aby si vedci mohli zdieľať dokumenty s odkazmi. Prvá verzia mala len niekoľko značiek.</p><p>Dnes sa používa <b>HTML5</b>. Od roku 2019 ho spravuje skupina WHATWG ako „živý štandard“ (Living Standard): už nevychádzajú očíslované verzie, jazyk sa priebežne dopĺňa. Preto staré stránky fungujú dodnes a nové značky pribúdajú bez toho, aby niečo prestalo fungovať.</p>" },
    { typ: "vyklad", nadpis: "Tri vrstvy webu",
      text: "<p>Moderná stránka sa skladá z troch jazykov. Každý má svoju úlohu:</p>",
      obr: OBR_VRSTVY,
      podrobne: "<p>Predstav si dom. <b>HTML</b> sú steny, dvere a okná, teda to, z čoho sa dom skladá. <b>CSS</b> je omietka, farba a nábytok. <b>JavaScript</b> je elektrina: zvonček, ktorý zazvoní, keď stlačíš gombík.</p><p>Bez HTML nie je čo farbiť ani čo ovládať. Preto sa ako prvé učí HTML.</p>",
      tip: "Aj táto aplikácia je postavená z HTML, CSS a JavaScriptu. Všetko, čo sa tu naučíš, môžeš vidieť priamo okolo seba." },
    { typ: "volba", otazka: "Čo určuje HTML?", moznosti: ["Obsah a štruktúru stránky", "Farby a písmo", "Čo sa stane po kliknutí na tlačidlo", "Rýchlosť načítania stránky"], spravna: 0,
      vysvetlenie: "HTML hovorí, čo na stránke je a ako je to usporiadané. Vzhľad rieši CSS a správanie JavaScript.",
      preco: [null, "Farby a písmo sú vzhľad, a ten má na starosti CSS.", "Reakcie na kliknutie rieši JavaScript.", "Rýchlosť závisí od internetu a veľkosti súborov, nie od jazyka HTML."] },
    { typ: "vyklad", nadpis: "Na čo sa HTML hodí",
      text: "<p>HTML použiješ všade, kde treba zobraziť obsah:</p><ul><li><b>webové stránky</b> a e-shopy,</li><li><b>e-maily</b> s obrázkami a tlačidlami,</li><li><b>mobilné aplikácie</b>, ktoré vnútri zobrazujú web (ako táto),</li><li><b>elektronické knihy</b> (formát EPUB je vnútri HTML),</li><li><b>návody a dokumentácia</b>.</li></ul>",
      podrobne: "<p><b>Na čo sa HTML nehodí:</b> na výpočty, rozhodovanie a prácu s údajmi. HTML nevie sčítať dve čísla, nevie povedať „ak je niečo pravda, urob toto“ a nevie si nič zapamätať.</p><p>Preto HTML nie je <b>programovací</b>, ale <b>značkovací</b> jazyk. Programovacie jazyky (JavaScript, Python, C++) majú podmienky, cykly a premenné. HTML len opisuje obsah.</p>",
      hlbka: "<p>HTML zobrazuje <b>vykresľovacie jadro</b> prehliadača. Chrome, Edge a Opera používajú jadro <b>Blink</b>, Safari jadro <b>WebKit</b> a Firefox jadro <b>Gecko</b>. Jadro prečíta HTML, postaví z neho stromovú štruktúru (DOM), použije štýly CSS a stránku nakreslí.</p><p>V Androide zobrazuje web v aplikáciách súčasť <b>WebView</b>, ktorá je postavená na jadre Chrome. Presne takto beží aj aplikácia SyntaxCode.</p>" },
    { typ: "volba", otazka: "Čo z tohto sa v samotnom HTML <b>nedá</b> urobiť?", moznosti: ["Vypočítať súčet dvoch čísel", "Vložiť obrázok", "Napísať nadpis", "Vytvoriť odkaz na inú stránku"], spravna: 0,
      vysvetlenie: "HTML len opisuje obsah. Počítať vie programovací jazyk, napríklad JavaScript.",
      preco: [null, "Obrázok sa v HTML vkladá značkou <img>.", "Nadpis je jedna zo základných vecí v HTML.", "Odkazy sú podstata HTML, preto sa volá HyperText."] },
    { typ: "vyklad", nadpis: "Ako vyzerá HTML",
      text: "<p>HTML sa píše pomocou <b>značiek</b>. Značka je slovo v lomených zátvorkách <code>&lt;</code> a <code>&gt;</code>. Tento kód vytvorí hlavný nadpis:</p>" + UKAZKA("<h1>Ahoj, svet!</h1>", '<h1 style="margin:0;font-size:2em">Ahoj, svet!</h1>') +
        "<p>Prehliadač značky nezobrazí. Pochopí z nich, že text medzi nimi je <b>nadpis</b>, a preto ho napíše veľkým tučným písmom.</p>",
      podrobne: "<p><code>h1</code> znamená <b>heading 1</b>, teda nadpis prvej (najvyššej) úrovne. O nadpisoch bude celá lekcia.</p><p>Prvý program v novom jazyku sa tradične volá „Ahoj, svet!“ (<i>Hello, World!</i>). Túto tradíciu zaviedla v roku 1978 kniha o jazyku C.</p>" },
    { typ: "kod", zadanie: "Zmeň text nadpisu na svoje meno. Výsledok uvidíš hneď pod editorom.", start: { html: "<h1>Ahoj, svet!</h1>" },
      napoveda: "Text je medzi <code>&lt;h1&gt;</code> a <code>&lt;/h1&gt;</code>. Zmaž „Ahoj, svet!“ a napíš svoje meno, napr. <code>&lt;h1&gt;Mária&lt;/h1&gt;</code>. Značky nechaj tak.",
      riesenie: { html: "<h1>Mária</h1>" },
      kontrola: telo(function (d) { var h = d.querySelector("h1"); if (!h) return "Nadpis h1 zmizol. Nechaj značky <h1> a </h1> na mieste."; if (!textOf(h)) return "Nadpis je prázdny. Napíš doň svoje meno."; if (textOf(h) === "Ahoj, svet!") return "Nadpis má stále pôvodný text. Prepíš ho na svoje meno."; return null; }),
      vysvetlenie: "Napísal si svoj prvý kúsok HTML!" },
    { typ: "volba", otazka: "Ako sa volá program, ktorý prečíta HTML a zobrazí ho ako stránku?", moznosti: ["Prehliadač", "Kompilátor", "Server", "Antivírus"], spravna: 0,
      vysvetlenie: "Prehliadač (Chrome, Firefox, Safari, Edge…) HTML prečíta a nakreslí stránku.",
      preco: [null, "Kompilátor prekladá programy do strojového kódu. HTML sa neprekladá, prehliadač ho číta priamo.", "Server HTML súbor len pošle. Zobrazí ho až prehliadač.", "Antivírus chráni počítač, stránky nezobrazuje."] },
    { typ: "vyklad", nadpis: "Zhrnutie",
      text: "<ul><li>HTML je <b>značkovací jazyk</b>, ktorým sa opisuje obsah webových stránok.</li><li>Web má tri vrstvy: <b>HTML</b> (obsah), <b>CSS</b> (vzhľad), <b>JavaScript</b> (správanie).</li><li>HTML sa píše pomocou <b>značiek</b> v lomených zátvorkách, napr. <code>&lt;h1&gt;</code>.</li><li>HTML číta a zobrazuje <b>prehliadač</b>.</li></ul>" },
  ] };

  var L2 = { id: "html-1-2", nazov: "Značky a prvky", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Anatómia značky",
      text: "<p>Väčšina obsahu sa obalí dvoma značkami: <b>otváracou</b> na začiatku a <b>zatváracou</b> na konci. Zatváracia má pred názvom lomku <code>/</code>.</p>",
      obr: OBR_ANATOMIA,
      podrobne: "<ul><li><code>&lt;</code> a <code>&gt;</code> sú znamienka „menší ako“ a „väčší ako“. V HTML slúžia ako zátvorky okolo názvu značky.</li><li><code>/</code> je lomka. V zatváracej značke hovorí: „tu prvok končí“.</li><li>Medzi značkami je <b>obsah</b>, teda to, čo uvidíš na stránke.</li></ul>",
      hlbka: "<p>Rozlišuj pojmy: <b>značka</b> (tag) je len <code>&lt;p&gt;</code> alebo <code>&lt;/p&gt;</code>. <b>Prvok</b> (element) je celý celok: otváracia značka, obsah aj zatváracia značka.</p><p>Názvy značiek nerozlišujú veľké a malé písmená, <code>&lt;P&gt;</code> funguje rovnako ako <code>&lt;p&gt;</code>. Všade sa však píšu <b>malými písmenami</b>, je to dohodnutý zvyk.</p>" },
    { typ: "doplnenie", otazka: "Doplň zatváraciu značku odseku:", sablona: "<p>Ahoj</[[0]]>", zetony: ["p", "/p", "h1", "<"], spravne: ["p"],
      vysvetlenie: "Zatváracia značka má rovnaký názov ako otváracia, len s lomkou: </p>.", vysvetlenieZle: "Zatváracia značka musí mať rovnaký názov ako otváracia. Lomka už je napísaná pred políčkom." },
    { typ: "vyklad", nadpis: "Prázdne prvky",
      text: "<p>Niektoré prvky nemajú žiadny obsah, a preto nemajú ani zatváraciu značku. Volajú sa <b>prázdne prvky</b>:</p>" +
        tabulka(["Značka", "Čo urobí"], [["<code>&lt;br&gt;</code>", "zalomí riadok"], ["<code>&lt;hr&gt;</code>", "nakreslí deliacu čiaru"], ["<code>&lt;img&gt;</code>", "vloží obrázok"]]) +
        UKAZKA("<p>Prvý riadok<br>druhý riadok</p>", "<p style=\"margin:0\">Prvý riadok<br>druhý riadok</p>"),
      podrobne: "<p>Niekde uvidíš zápis <code>&lt;br /&gt;</code> s lomkou na konci. Je to starší spôsob z jazyka XHTML. V dnešnom HTML fungujú oba zápisy rovnako, kratší <code>&lt;br&gt;</code> stačí.</p><p>Chybou však je napísať <code>&lt;/br&gt;</code>. Prázdny prvok sa nezatvára.</p>" },
    { typ: "volba", otazka: "Ktorý zápis je správny?", moznosti: ["<code>&lt;p&gt;Text&lt;/p&gt;</code>", "<code>&lt;p&gt;Text&lt;p&gt;</code>", "<code>&lt;p&gt;Text&lt;/p</code>", "<code>p&gt;Text&lt;/p&gt;</code>"], spravna: 0,
      vysvetlenie: "Otváracia značka, obsah a zatváracia značka s lomkou. Všetky značky majú obe lomené zátvorky.",
      preco: [null, "Druhá značka je znova otváracia. Chýba jej lomka: </p>.", "Zatváracej značke chýba na konci znak >.", "Otváracej značke chýba na začiatku znak <."] },
    { typ: "vyklad", nadpis: "Vnáranie",
      text: "<p>Prvky sa dajú vkladať do seba, ako krabice do krabíc. Vnútorný prvok musí byť <b>celý</b> vo vnútri vonkajšieho:</p>", obr: OBR_VNARANIE,
      podrobne: "<p>Pravidlo znie: <b>čo otvoríš ako posledné, zatvoríš ako prvé</b>. Rovnako ako pri zátvorkách v matematike: ( [ ] ) je správne, ( [ ) ] je zle.</p>" + KOD("<p>Toto je <strong>dôležité</strong> slovo.</p>", "Správne") + KOD("<p>Toto je <strong>dôležité</p></strong>", "Zle – značky sa krížia"),
      hlbka: "<p>Prehliadače sú k chybám veľmi zhovievavé. Keď nájdu prekrížené značky, pokúsia sa ich samy opraviť (tzv. <i>error recovery</i>). Preto zle napísaná stránka niekedy „funguje“. Každý prehliadač ju však môže opraviť trochu inak a výsledok je nepredvídateľný. Správne vnorený kód sa zobrazí všade rovnako.</p>" },
    { typ: "poradie", otazka: "Zoraď riadky tak, aby bol odsek celý vnútri prvku <code>div</code>:", riadky: ["<div>", "  <p>", "    Ahoj!", "  </p>", "</div>"],
      vysvetlenie: "Najprv sa otvorí div, potom p. Zatvárajú sa v opačnom poradí: najprv p, potom div. Odsadenie medzerami pomáha vidieť, čo je v čom." },
    { typ: "vyklad", nadpis: "Atribúty",
      text: "<p>Otváracia značka môže obsahovať <b>atribúty</b>, teda doplňujúce informácie o prvku. Napríklad odkaz potrebuje vedieť, kam vedie:</p>", obr: OBR_ATRIBUT,
      podrobne: "<p>Pravidlá pre atribúty:</p><ul><li>píšu sa <b>len do otváracej značky</b>, za jej názov,</li><li>tvar je <code>názov=\"hodnota\"</code>,</li><li>hodnota patrí do úvodzoviek,</li><li>viac atribútov oddelíš medzerou, na poradí nezáleží.</li></ul>" + KOD('<a href="https://sk.wikipedia.org" title="Otvorí Wikipédiu">Wikipédia</a>'),
      hlbka: "<p>Niektoré atribúty môže mať <b>každý prvok</b>. Volajú sa globálne: <code>id</code> (jedinečné meno prvku), <code>class</code> (skupina pre CSS), <code>title</code> (bublina pri prejdení myšou), <code>lang</code> (jazyk obsahu) a <code>hidden</code> (skryje prvok).</p><p>Atribút <code>hidden</code> nemá hodnotu. Takéto atribúty sa volajú <b>logické</b> (boolean): stačí, že tam sú.</p>" },
    { typ: "doplnenie", otazka: "Doplň atribút, ktorý určí, kam odkaz vedie:", sablona: '<a [[0]][[1]]"https://sk.wikipedia.org">\n  Wikipédia\n</a>', zetony: ["href", "=", "src", ":", "link"], spravne: ["href", "="],
      vysvetlenie: "href (hypertext reference) je adresa odkazu. Za názvom atribútu nasleduje = a hodnota v úvodzovkách." },
    { typ: "kod", zadanie: "Kód je pokazený: značky sa krížia. Oprav ho tak, aby bolo slovo <b>HTML</b> tučné a všetky značky boli správne zatvorené.",
      start: { html: "<p>Učím sa <strong>HTML</p>\n<p>a je to zábava!</strong></p>" },
      napoveda: "Značka <code>&lt;/strong&gt;</code> má byť hneď za slovom HTML, ešte pred <code>&lt;/p&gt;</code>. Prvý riadok má byť <code>&lt;p&gt;Učím sa &lt;strong&gt;HTML&lt;/strong&gt;&lt;/p&gt;</code>.",
      riesenie: { html: "<p>Učím sa <strong>HTML</strong></p>\n<p>a je to zábava!</p>" },
      kontrola: telo(function (d) { var s = d.querySelector("strong"); if (!s) return "Chýba značka strong."; if (textOf(s) !== "HTML") return "Tučné má byť len slovo HTML. Teraz je tučné: „" + textOf(s) + "“."; if (d.querySelectorAll("p").length < 2) return "Majú zostať dva odseky p."; return null; }),
      vysvetlenie: "Opravené! Všimol si si, ako ti editor ukázal, kde je chyba?" },
    { typ: "volba", otazka: "Čo je zle na tomto kóde?", kod: "<p>Ahoj <em>svet</p></em>", moznosti: ["Zatváracie značky sú v zlom poradí", "Chýba atribút", "Prvok em sa nesmie dať do odseku", "Nič, kód je v poriadku"], spravna: 0,
      vysvetlenie: "em bol otvorený ako posledný, a preto sa musí zatvoriť ako prvý: <p>Ahoj <em>svet</em></p>.",
      preco: [null, "Atribúty sú nepovinné. Problém je v poradí zatváracích značiek.", "Vložiť em do odseku je úplne v poriadku. Len treba dodržať poradie zatvárania.", "Pozri sa na poradie posledných dvoch značiek."] },
  ] };

  var KOSTRA = "<!DOCTYPE html>\n<html lang=\"sk\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Moja stránka</title>\n</head>\n<body>\n  <h1>Ahoj!</h1>\n  <p>Toto je moja prvá stránka.</p>\n</body>\n</html>";
  var L3 = { id: "html-1-3", nazov: "Štruktúra dokumentu", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kostra každej stránky",
      text: "<p>Každá poriadna HTML stránka má rovnakú základnú kostru:</p>" + KOD(KOSTRA) + "<p>Prvky do seba zapadajú ako strom. Na vrchu je <code>html</code>, pod ním dve vetvy: <code>head</code> a <code>body</code>.</p>",
      obr: OBR_STROM,
      podrobne: tabulka(["Riadok", "Význam"], [["<code>&lt;!DOCTYPE html&gt;</code>", "Oznámi prehliadaču, že ide o moderné HTML5. Vždy je na prvom riadku."], ["<code>&lt;html lang=\"sk\"&gt;</code>", "Koreň celej stránky. Atribút <code>lang</code> povie, že je po slovensky."], ["<code>&lt;head&gt;</code>", "Hlava: informácie o stránke, ktoré nie sú vidieť priamo na stránke."], ["<code>&lt;meta charset&gt;</code>", "Kódovanie znakov, aby sa správne zobrazili mäkčene a dĺžne."], ["<code>&lt;title&gt;</code>", "Názov stránky na karte prehliadača."], ["<code>&lt;body&gt;</code>", "Telo: všetko, čo uvidíš na stránke."]]),
      hlbka: "<p><code>&lt;!DOCTYPE html&gt;</code> nie je značka, ale <b>deklarácia</b>. Keď chýba, prehliadač prepne do režimu <i>quirks mode</i> a napodobňuje chyby prehliadačov z 90. rokov. Stránka sa potom môže zobraziť inak, než čakáš.</p><p>Stromu prvkov sa hovorí <b>DOM</b> (Document Object Model). S DOM budeš neskôr pracovať v JavaScripte: nájdeš v ňom prvok a zmeníš ho.</p>" },
    { typ: "poradie", otazka: "Zoraď riadky do správnej kostry stránky:", riadky: ["<!DOCTYPE html>", "<html>", "<head>", "  <title>Moja stránka</title>", "</head>", "<body>", "  <h1>Ahoj</h1>", "</body>", "</html>"],
      vysvetlenie: "DOCTYPE je prvý, potom html. Vo vnútri je najprv head (s title) a za ním body. Všetko sa zatvára v opačnom poradí." },
    { typ: "vyklad", nadpis: "Hlava a telo",
      text: "<p><code>head</code> je ako obálka listu: je na nej adresa a známka, ale samotný list je vnútri. Do <code>head</code> patria informácie <b>o</b> stránke, do <code>body</code> patrí <b>obsah</b> stránky.</p>", obr: OBR_HEAD_BODY, obrPopis: "Text z title uvidíš na karte prehliadača, obsah body na samotnej stránke.",
      podrobne: "<p>Do <code>head</code> patrí napríklad:</p><ul><li><code>&lt;title&gt;</code> – názov na karte a vo výsledkoch vyhľadávania,</li><li><code>&lt;meta&gt;</code> – kódovanie, popis stránky, nastavenie pre mobily,</li><li><code>&lt;link&gt;</code> – pripojenie súboru so štýlmi CSS,</li><li><code>&lt;style&gt;</code> a <code>&lt;script&gt;</code> – štýly a skripty.</li></ul><p>Nadpisy, odseky, obrázky a odkazy patria vždy do <code>body</code>.</p>" },
    { typ: "volba", otazka: "Kam patrí text, ktorý má byť viditeľný na stránke?", moznosti: ["Do <code>&lt;body&gt;</code>", "Do <code>&lt;head&gt;</code>", "Do <code>&lt;title&gt;</code>", "Za <code>&lt;/html&gt;</code>"], spravna: 0,
      vysvetlenie: "Všetko viditeľné patrí do body.",
      preco: [null, "head obsahuje informácie o stránke, ktoré sa priamo nezobrazujú.", "title sa zobrazí len na karte prehliadača, nie na stránke.", "Za koncom html už nemá byť nič."] },
    { typ: "vyklad", nadpis: "Kódovanie a jazyk",
      text: "<p>Riadok <code>&lt;meta charset=\"utf-8\"&gt;</code> zabezpečí, že sa správne zobrazia písmená ako <b>č, ť, ľ, ô, ä</b>. Bez neho môže namiesto „čaj“ na stránke svietiť napríklad „ÄŤaj“.</p><p>Atribút <code>lang=\"sk\"</code> v značke <code>html</code> povie, že stránka je po slovensky. Pomôže to čítačkám pre nevidiacich, prekladačom aj vyhľadávačom.</p>",
      podrobne: "<p>Počítač ukladá text ako čísla. <b>Kódovanie</b> je tabuľka, ktorá určuje, ktoré číslo patrí ku ktorému znaku. <b>UTF-8</b> obsahuje znaky všetkých jazykov sveta aj emoji a dnes ho používa drvivá väčšina webu.</p><p>Na mobilných stránkach uvidíš ešte jeden dôležitý riadok:</p>" + KOD('<meta name="viewport" content="width=device-width, initial-scale=1">') + "<p>Povie mobilu, aby stránku nezmenšoval ako na počítači, ale prispôsobil ju šírke displeja.</p>",
      hlbka: "<p>V UTF-8 zaberá anglické písmeno 1 bajt, ale „č“ zaberá 2 bajty (C4 8D v šestnástkovej sústave). Keď prehliadač tieto dva bajty omylom prečíta v starom kódovaní, kde má každý bajt vlastný znak, vzniknú z jedného „č“ dva nezmyselné znaky. Tak vzniká rozsypaný text, ktorý poznáš zo starých e-mailov.</p>" },
    { typ: "doplnenie", otazka: "Doplň atribúty pre jazyk a kódovanie:", sablona: '<html [[0]]="sk">\n<head>\n  <meta [[1]]="utf-8">', zetony: ["lang", "charset", "jazyk", "href", "font"], spravne: ["lang", "charset"],
      vysvetlenie: "lang určuje jazyk, charset kódovanie znakov. Názvy atribútov sú vždy anglické." },
    { typ: "kod", zadanie: "Kostra je takmer hotová. Do <b>head</b> pridaj <code>&lt;title&gt;</code> s názvom stránky a do <b>body</b> nadpis <code>&lt;h1&gt;</code>.",
      start: { html: "<!DOCTYPE html>\n<html lang=\"sk\">\n<head>\n  <meta charset=\"utf-8\">\n  \n</head>\n<body>\n  \n</body>\n</html>" }, vyska: "250px",
      napoveda: "Na prázdny riadok v head napíš <code>&lt;title&gt;Moja stránka&lt;/title&gt;</code> a na prázdny riadok v body <code>&lt;h1&gt;Vitaj&lt;/h1&gt;</code>.",
      riesenie: { html: "<!DOCTYPE html>\n<html lang=\"sk\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Moja stránka</title>\n</head>\n<body>\n  <h1>Vitaj</h1>\n</body>\n</html>" },
      kontrola: function (d) { if (!d.title.trim()) return "Stránka nemá názov. Do head pridaj <title>Názov</title>."; var h = d.body.querySelector("h1"); if (!h || !textOf(h)) return "V body chýba nadpis h1 s textom."; return null; },
      vysvetlenie: "Toto je kostra, z ktorej vychádza každá stránka na webe." },
    { typ: "vyklad", nadpis: "Komentáre",
      text: "<p>Do kódu si môžeš písať poznámky, ktoré sa na stránke nezobrazia. Volajú sa <b>komentáre</b>. Začínajú znakmi <code>&lt;!--</code> a končia <code>--&gt;</code>:</p>" + UKAZKA("<!-- Tu začína hlavný obsah -->\n<p>Ahoj!</p>", '<p style="margin:0">Ahoj!</p>'),
      podrobne: "<p>Komentáre slúžia na vysvetlenie kódu tebe aj ostatným: čo ktorá časť robí alebo čo treba ešte dorobiť. Môžeš nimi aj dočasne „vypnúť“ kus kódu bez toho, aby si ho zmazal.</p><p><b>Pozor:</b> komentár nie je tajný. Každý návštevník si môže zobraziť zdrojový kód stránky a komentáre v ňom uvidí. Nikdy doň nepíš heslá.</p>" },
    { typ: "volba", otazka: "Čo urobí prehliadač s týmto riadkom?", kod: "<!-- Toto je poznámka -->", moznosti: ["Nezobrazí ho", "Zobrazí ho kurzívou", "Zobrazí chybu", "Zobrazí ho ako nadpis"], spravna: 0,
      vysvetlenie: "Komentáre prehliadač preskočí. Vidno ich len v kóde." },
    { typ: "vyklad", nadpis: "Zhrnutie",
      text: "<ul><li>Každá stránka začína <code>&lt;!DOCTYPE html&gt;</code>.</li><li>Koreň je <code>&lt;html lang=\"sk\"&gt;</code>, v ňom <code>head</code> a <code>body</code>.</li><li><code>head</code> = informácie o stránke (title, meta), <code>body</code> = viditeľný obsah.</li><li><code>&lt;meta charset=\"utf-8\"&gt;</code> zabezpečí správnu diakritiku.</li><li>Komentáre <code>&lt;!-- --&gt;</code> sa nezobrazujú.</li></ul>",
      tip: "V editore v ďalších lekciách už kostru písať nemusíš. Aplikácia ju doplní za teba, aby si sa mohol sústrediť na obsah." },
  ] };

  var L4 = { id: "html-1-4", nazov: "Nadpisy a odseky", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Šesť úrovní nadpisov",
      text: "<p>HTML má šesť úrovní nadpisov: od <code>&lt;h1&gt;</code> (najdôležitejší) po <code>&lt;h6&gt;</code> (najmenej dôležitý). Prehliadač ich bez ďalších štýlov zobrazí v týchto veľkostiach:</p>",
      obr: OBR_NADPISY, obrPopis: "Predvolená veľkosť nadpisov v prehliadačoch. 1 em je veľkosť bežného textu, h1 je teda dvakrát väčší.",
      podrobne: "<p>Nadpisy tvoria <b>osnovu</b> stránky, ako obsah v knihe:</p>" + KOD("<h1>Recepty</h1>\n  <h2>Polievky</h2>\n    <h3>Fazuľová</h3>\n  <h2>Koláče</h2>") + "<ul><li>Na stránke má byť <b>jeden</b> <code>h1</code> s hlavnou témou.</li><li>Úrovne nepreskakuj: pod <code>h2</code> patrí <code>h3</code>, nie <code>h5</code>.</li><li>Nadpis nevyberaj podľa veľkosti. Veľkosť sa dá zmeniť v CSS, úroveň vyjadruje dôležitosť.</li></ul>",
      hlbka: "<p>Podľa nadpisov sa orientujú <b>vyhľadávače</b>, ktoré z nich zisťujú, o čom stránka je. Rovnako dôležité sú pre <b>čítačky obrazovky</b>: nevidiaci človek si nechá prečítať zoznam nadpisov a skočí rovno na časť, ktorá ho zaujíma. Zlá osnova mu stránku znepríjemní rovnako, ako by tebe vadila kniha bez obsahu.</p>" },
    { typ: "volba", otazka: "Koľko úrovní nadpisov má HTML?", moznosti: ["6", "3", "10", "Ľubovoľne veľa"], spravna: 0, vysvetlenie: "h1, h2, h3, h4, h5 a h6. Značka h7 neexistuje." },
    { typ: "vyklad", nadpis: "Odseky a medzery",
      text: "<p>Bežný text patrí do odseku <code>&lt;p&gt;</code> (paragraph). Medzi odsekmi spraví prehliadač automaticky medzeru.</p><p>Dôležitá vec: prehliadač <b>zlúči všetky medzery a nové riadky do jednej medzery</b>. Nezáleží na tom, ako text rozložíš v kóde:</p>" +
        UKAZKA("<p>Toto     je\n      jeden\n   odsek.</p>\n<p>A toto druhý.</p>", '<p style="margin:0 0 1em">Toto je jeden odsek.</p><p style="margin:0">A toto druhý.</p>'),
      podrobne: "<p>Prečo to tak je? HTML opisuje <b>štruktúru</b>, nie vzhľad. Vďaka tomu môžeš kód odsadzovať a rozdeľovať na riadky tak, aby bol prehľadný, a stránka sa tým nezmení. O medzery a zarovnanie sa stará CSS.</p>",
      hlbka: "<p>Výnimkou je prvok <code>&lt;pre&gt;</code> (preformatted), ktorý medzery aj nové riadky zachová presne tak, ako sú v kóde, a použije písmo s rovnako širokými znakmi. Hodí sa na ukážky kódu.</p><p>Ak potrebuješ medzeru, ktorú prehliadač nezlúči a ani na nej nezalomí riadok, napíš <code>&amp;nbsp;</code> (non-breaking space), napríklad medzi číslo a jednotku: <code>10&amp;nbsp;kg</code>.</p>" },
    { typ: "volba", otazka: "Koľko medzier uvidíš na stránke medzi slovami?", kod: "<p>Ahoj          svet</p>", moznosti: ["Jednu", "Desať", "Žiadnu", "Prehliadač zobrazí chybu"], spravna: 0,
      vysvetlenie: "Prehliadač zlúči viac medzier za sebou do jednej." },
    { typ: "vyklad", nadpis: "Nový riadok a deliaca čiara",
      text: "<p>Niekedy potrebuješ zalomiť riadok vnútri odseku, napríklad v adrese alebo v básni. Na to slúži <code>&lt;br&gt;</code>. Prvok <code>&lt;hr&gt;</code> nakreslí čiaru, ktorá oddelí dve témy.</p>" +
        UKAZKA("<p>Hlavná 12<br>811 01 Bratislava</p>\n<hr>\n<p>Otvorené denne.</p>", '<p style="margin:0">Hlavná 12<br>811 01 Bratislava</p><hr><p style="margin:0">Otvorené denne.</p>'),
      podrobne: "<p><b>Nepoužívaj</b> <code>&lt;br&gt;&lt;br&gt;&lt;br&gt;</code> na vytváranie medzier medzi časťami stránky. Je to častá chyba začiatočníkov. Na medzery slúži CSS. <code>&lt;br&gt;</code> patrí len tam, kde je zalomenie súčasťou obsahu (adresa, verše).</p>" },
    { typ: "doplnenie", otazka: "Doplň značku, ktorá zalomí riadok v adrese:", sablona: "<p>Hlavná 12[[0]]\n811 01 Bratislava</p>", zetony: ["<br>", "<hr>", "</br>", "<p>"], spravne: ["<br>"],
      vysvetlenie: "<br> zalomí riadok. Je to prázdny prvok, nezatvára sa.", vysvetlenieZle: "Hľadáš prázdny prvok, ktorý zalomí riadok. Pozor, </br> neexistuje." },
    { typ: "kod", zadanie: "Napíš krátky článok: hlavný nadpis <code>h1</code>, pod ním podnadpis <code>h2</code> a aspoň <b>dva odseky</b> <code>p</code>.", start: { html: "" },
      napoveda: "Napríklad:<br><code>&lt;h1&gt;Môj pes&lt;/h1&gt;</code><br><code>&lt;h2&gt;Ako sa volá&lt;/h2&gt;</code><br><code>&lt;p&gt;Volá sa Rex.&lt;/p&gt;</code><br><code>&lt;p&gt;Má rád loptu.&lt;/p&gt;</code>",
      riesenie: { html: "<h1>Môj pes</h1>\n<h2>Ako sa volá</h2>\n<p>Volá sa Rex.</p>\n<p>Má rád loptu.</p>" },
      kontrola: telo(function (d, b) {
        var h1 = d.querySelector("h1"), h2 = d.querySelector("h2");
        if (!h1 || !textOf(h1)) return "Chýba hlavný nadpis h1 s textom."; if (!h2 || !textOf(h2)) return "Chýba podnadpis h2 s textom.";
        if (h1.compareDocumentPosition(h2) & 2) return "Podnadpis h2 má byť pod hlavným nadpisom h1, nie nad ním.";
        var n = [].filter.call(d.querySelectorAll("p"), function (p) { return textOf(p); }).length;
        return n >= 2 ? null : "Mám " + n + " odsek s textom, potrebujem aspoň 2.";
      }), vysvetlenie: "Toto je presne štruktúra bežného článku na webe." },
    { typ: "volba", otazka: "Ktorú značku použiješ pre hlavný názov stránky?", moznosti: ["<code>&lt;h1&gt;</code>", "<code>&lt;h6&gt;</code>", "<code>&lt;title&gt;</code> v body", "<code>&lt;header&gt;</code>"], spravna: 0,
      vysvetlenie: "Hlavný názov je nadpis najvyššej úrovne, teda h1.",
      preco: [null, "h6 je najmenej dôležitý nadpis.", "title patrí do head a zobrazí sa len na karte prehliadača.", "header je oblasť hlavičky stránky, nie nadpis. Spoznáš ho v module o sémantike."] },
    { typ: "vyklad", nadpis: "Zhrnutie",
      text: "<ul><li>Nadpisy <code>h1</code> až <code>h6</code> tvoria osnovu stránky. <code>h1</code> má byť jeden.</li><li>Text patrí do odsekov <code>&lt;p&gt;</code>.</li><li>Viac medzier a nových riadkov v kóde prehliadač zlúči do jednej medzery.</li><li><code>&lt;br&gt;</code> zalomí riadok, <code>&lt;hr&gt;</code> oddelí témy.</li></ul>" },
  ] };

  var L5 = { id: "html-1-5", nazov: "Formátovanie textu", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Dôležité a zdôraznené",
      text: "<p>Na zvýraznenie časti textu slúžia dve hlavné značky:</p>" + tabulka(["Značka", "Význam", "Vyzerá"], [["<code>&lt;strong&gt;</code>", "dôležitý text", "<strong>tučne</strong>"], ["<code>&lt;em&gt;</code>", "dôraz (emphasis)", "<em>kurzívou</em>"]]) +
        UKAZKA("<p><strong>Pozor:</strong> tento liek užívaj <em>po</em> jedle.</p>", '<p style="margin:0"><strong>Pozor:</strong> tento liek užívaj <em>po</em> jedle.</p>'),
      podrobne: "<p>Existujú aj značky <code>&lt;b&gt;</code> (bold) a <code>&lt;i&gt;</code> (italic). Vyzerajú rovnako, ale nemajú <b>význam</b>, menia len vzhľad.</p><p>Rozdiel spoznáš pri čítačke obrazovky: pri <code>strong</code> a <code>em</code> zmení hlas a zdôrazní slovo, pri <code>b</code> a <code>i</code> nie. Preto ak je slovo naozaj dôležité, použi <code>strong</code>.</p>",
      hlbka: "<p>Kedy je <code>&lt;b&gt;</code> a <code>&lt;i&gt;</code> v poriadku? <code>&lt;i&gt;</code> sa hodí na cudzie slová, latinské názvy alebo názvy lodí (<i>Titanic</i>), teda text, ktorý sa iba odlišuje, ale nie je zdôraznený. <code>&lt;b&gt;</code> na kľúčové slová v texte, ktoré majú byť nápadné, ale nie dôležitejšie.</p><p>Tomuto prístupu sa hovorí <b>sémantické HTML</b>: značku vyberáš podľa významu, nie podľa vzhľadu.</p>" },
    { typ: "volba", otazka: "Ktorá značka hovorí, že text je <b>dôležitý</b>?", moznosti: ["<code>&lt;strong&gt;</code>", "<code>&lt;b&gt;</code>", "<code>&lt;big&gt;</code>", "<code>&lt;bold&gt;</code>"], spravna: 0,
      vysvetlenie: "strong vyjadruje dôležitosť. Prehliadač ho zobrazí tučne.",
      preco: [null, "b text len zobrazí tučne, bez významu dôležitosti.", "big je zastaraná značka a už sa nepoužíva.", "Značka bold v HTML neexistuje."] },
    { typ: "vyklad", nadpis: "Ďalšie značky pre text",
      text: tabulka(["Značka", "Na čo", "Výsledok"], [
        ["<code>&lt;mark&gt;</code>", "zvýraznenie ako fixkou", "Hľadané <mark>slovo</mark>"],
        ["<code>&lt;small&gt;</code>", "drobné poznámky, autorské práva", "<small>© 2026 SyntaxCode</small>"],
        ["<code>&lt;sub&gt;</code>", "dolný index", "H<sub>2</sub>O"],
        ["<code>&lt;sup&gt;</code>", "horný index", "m<sup>2</sup>, 1<sup>.</sup> miesto"],
        ["<code>&lt;del&gt;</code>", "odstránený text", "<del>20 €</del> 15 €"],
        ["<code>&lt;ins&gt;</code>", "pridaný text", "<ins>nové</ins>"],
        ["<code>&lt;code&gt;</code>", "kúsok kódu", "<code>let x = 5;</code>"],
      ]),
      podrobne: "<p>Aj tieto značky sa vyberajú podľa významu. <code>&lt;del&gt;</code> neznamená „preškrtni“, ale „toto už neplatí“. Preto sa hodí napríklad na pôvodnú cenu v zľave.</p>" },
    { typ: "doplnenie", otazka: "Napíš vzorec vody so správnym indexom:", sablona: "H[[0]]2[[1]]O", zetony: ["<sub>", "</sub>", "<sup>", "</sup>"], spravne: ["<sub>", "</sub>"],
      vysvetlenie: "Dvojka je dole, preto sub (subscript = dolný index).", vysvetlenieZle: "Dvojka vo vzorci vody je dole. Horný index je sup, dolný sub." },
    { typ: "vyklad", nadpis: "Špeciálne znaky",
      text: "<p>Ako na stránke napíšeš znak <code>&lt;</code>, keď prehliadač čaká, že ním začína značka? Pomocou <b>entity</b>. Entita začína znakom <code>&amp;</code> a končí bodkočiarkou <code>;</code>:</p>" +
        tabulka(["Napíšeš", "Uvidíš", "Význam"], [["<code>&amp;lt;</code>", "&lt;", "less than – menší ako"], ["<code>&amp;gt;</code>", "&gt;", "greater than – väčší ako"], ["<code>&amp;amp;</code>", "&amp;", "ampersand"], ["<code>&amp;quot;</code>", "&quot;", "úvodzovka"], ["<code>&amp;nbsp;</code>", "(medzera)", "nedeliteľná medzera"], ["<code>&amp;copy;</code>", "&copy;", "copyright"]]),
      podrobne: "<p>Prečo to treba? Keby si napísal <code>a &lt; b</code>, prehliadač by si mohol myslieť, že <code>&lt; b</code> je začiatok značky. Entita mu povie: toto je len znak, nie značka.</p>",
      hlbka: "<p>Každý znak sa dá napísať aj číslom: <code>&amp;#8364;</code> je €, <code>&amp;#269;</code> je č. Keďže stránky dnes používajú UTF-8, väčšinu znakov napíšeš rovno z klávesnice. Nutné je nahrádzať hlavne <code>&lt;</code> a <code>&amp;</code>, lebo tie majú v HTML špeciálny význam.</p>" },
    { typ: "volba", otazka: "Ako na stránke zobrazíš znak <code>&lt;</code>?", moznosti: ["<code>&amp;lt;</code>", "<code>&lt;&lt;</code>", "<code>\\&lt;</code>", "<code>&amp;less;</code>"], spravna: 0,
      vysvetlenie: "&lt; je entita pre znak menší ako (less than).",
      preco: [null, "Dva znaky < za sebou prehliadač nepochopí ako jeden znak.", "Spätná lomka sa takto používa v iných jazykoch, v HTML nie.", "Entita &less; neexistuje, správne je skrátene &lt;."] },
    { typ: "kod", zadanie: "Naformátuj vetu: slovo <b>Pozor</b> daj do <code>strong</code>, slovo <b>zajtra</b> do <code>em</code>, dvojku v H2O do <code>sub</code> a dvojku v m2 do <code>sup</code>.",
      start: { html: "<p>Pozor: zajtra píšeme test. Vzorec vody je H2O a plocha izby je 20 m2.</p>" }, vyska: "160px",
      napoveda: "Obaľ každé slovo značkami, napr. <code>&lt;strong&gt;Pozor&lt;/strong&gt;</code>, <code>H&lt;sub&gt;2&lt;/sub&gt;O</code> a <code>m&lt;sup&gt;2&lt;/sup&gt;</code>.",
      riesenie: { html: "<p><strong>Pozor</strong>: <em>zajtra</em> píšeme test. Vzorec vody je H<sub>2</sub>O a plocha izby je 20 m<sup>2</sup>.</p>" },
      kontrola: telo(function (d) {
        var s = d.querySelector("strong"), e = d.querySelector("em"), sub = d.querySelector("sub"), sup = d.querySelector("sup");
        if (!s || textOf(s).indexOf("Pozor") < 0) return "Slovo Pozor má byť v strong.";
        if (!e || textOf(e).indexOf("zajtra") < 0) return "Slovo zajtra má byť v em.";
        if (!sub || textOf(sub) !== "2") return "Dvojka v H2O má byť v sub (a nič iné).";
        if (!sup || textOf(sup) !== "2") return "Dvojka v m2 má byť v sup (a nič iné).";
        return null;
      }), vysvetlenie: "Výborne. Takto vyzerá text v učebniciach aj na weboch." },
    { typ: "kod", zadanie: "Zobraz na stránke presne túto vetu: <b>Značka &lt;p&gt; znamená odsek.</b> Znaky &lt; a &gt; napíš pomocou entít.",
      start: { html: "<p>Značka  znamená odsek.</p>" }, vyska: "140px",
      napoveda: "Medzi slová „Značka“ a „znamená“ napíš <code>&amp;lt;p&amp;gt;</code>. Prehliadač z toho zobrazí &lt;p&gt;.",
      riesenie: { html: "<p>Značka &lt;p&gt; znamená odsek.</p>" },
      kontrola: telo(function (d, b) { var t = b.textContent.replace(/\s+/g, " ").trim(); if (d.querySelectorAll("p").length > 1) return "Prehliadač si myslí, že si napísal novú značku <p>. Použi &lt; a &gt;."; return t.indexOf("Značka <p> znamená odsek.") >= 0 ? null : "Na stránke má byť presne: Značka <p> znamená odsek."; }),
      vysvetlenie: "Presne tak. Takto sa na webe píšu návody o HTML." },
    { typ: "vyklad", nadpis: "Modul 1 máš za sebou",
      text: "<ul><li><code>&lt;strong&gt;</code> = dôležité, <code>&lt;em&gt;</code> = dôraz. <code>&lt;b&gt;</code> a <code>&lt;i&gt;</code> menia len vzhľad.</li><li><code>mark</code>, <code>small</code>, <code>sub</code>, <code>sup</code>, <code>del</code>, <code>ins</code>, <code>code</code> majú každý svoj význam.</li><li>Špeciálne znaky píšeš cez entity: <code>&amp;lt;</code>, <code>&amp;gt;</code>, <code>&amp;amp;</code>, <code>&amp;nbsp;</code>.</li></ul>",
      tip: "Teraz ťa čaká test z celého modulu. Na prejdenie potrebuješ 70 %. Čo ti nepôjde, ti aplikácia pripomenie v Opakovaní." },
  ] };

  /* ---------- test ---------- */
  var TEST = [
    { typ: "volba", lekcia: "html-1-1", otazka: "Prečo HTML nie je programovací jazyk?", moznosti: ["Nemá podmienky ani cykly, len opisuje obsah", "Lebo je príliš starý", "Lebo beží len na serveri", "Lebo sa píše anglicky"], spravna: 0, vysvetlenie: "HTML je značkovací jazyk: opisuje obsah, ale nevie rozhodovať ani počítať." },
    { typ: "volba", lekcia: "html-1-1", otazka: "Ktorá vrstva webu určuje vzhľad, teda farby a písmo?", moznosti: ["CSS", "HTML", "JavaScript", "Prehliadač"], spravna: 0, vysvetlenie: "CSS je vrstva vzhľadu." },
    { typ: "volba", lekcia: "html-1-2", otazka: "Ako sa volá celok zložený z otváracej značky, obsahu a zatváracej značky?", moznosti: ["Prvok (element)", "Atribút", "Entita", "Komentár"], spravna: 0, vysvetlenie: "Celý celok je prvok. Značka je len jeho časť." },
    { typ: "volba", lekcia: "html-1-2", otazka: "Ktorý prvok sa <b>nezatvára</b>?", moznosti: ["<code>&lt;br&gt;</code>", "<code>&lt;p&gt;</code>", "<code>&lt;strong&gt;</code>", "<code>&lt;h2&gt;</code>"], spravna: 0, vysvetlenie: "br je prázdny prvok, nemá obsah ani zatváraciu značku." },
    { typ: "doplnenie", lekcia: "html-1-2", otazka: "Doplň správne poradie zatváracích značiek:", sablona: "<p>Ahoj <em>svet</[[0]]></[[1]]>", zetony: ["em", "p", "strong"], spravne: ["em", "p"], vysvetlenie: "Čo sa otvorí posledné, zatvorí sa prvé: najprv em, potom p." },
    { typ: "volba", lekcia: "html-1-2", otazka: "Kam sa píšu atribúty?", moznosti: ["Do otváracej značky", "Do zatváracej značky", "Medzi značky, k obsahu", "Do head"], spravna: 0, vysvetlenie: "Atribúty sú vždy v otváracej značke, za názvom prvku." },
    { typ: "poradie", lekcia: "html-1-3", otazka: "Zoraď začiatok stránky:", riadky: ["<!DOCTYPE html>", "<html lang=\"sk\">", "<head>", "  <meta charset=\"utf-8\">"], vysvetlenie: "DOCTYPE, html, head a v ňom meta." },
    { typ: "volba", lekcia: "html-1-3", otazka: "Kde sa zobrazí obsah prvku <code>&lt;title&gt;</code>?", moznosti: ["Na karte prehliadača", "Ako veľký nadpis na stránke", "Nikde", "V spodnej časti stránky"], spravna: 0, vysvetlenie: "title je názov stránky na karte prehliadača a vo vyhľadávaní." },
    { typ: "volba", lekcia: "html-1-3", otazka: "Načo je <code>&lt;meta charset=\"utf-8\"&gt;</code>?", moznosti: ["Aby sa správne zobrazila diakritika", "Aby bola stránka rýchlejšia", "Aby sa zobrazil nadpis", "Aby fungovali odkazy"], spravna: 0, vysvetlenie: "UTF-8 obsahuje znaky všetkých jazykov vrátane č, ť, ľ." },
    { typ: "volba", lekcia: "html-1-4", otazka: "Čo zobrazí prehliadač?", kod: "<p>Dobrý\n\n\n    deň</p>", moznosti: ["Dobrý deň (v jednom riadku)", "Dobrý a o tri riadky nižšie deň", "Nič, je tam chyba", "Dobrý deň s medzerami navyše"], spravna: 0, vysvetlenie: "Nové riadky a medzery prehliadač zlúči do jednej medzery." },
    { typ: "volba", lekcia: "html-1-4", otazka: "Ktorý zápis osnovy je správny?", moznosti: ["h1 → h2 → h3", "h1 → h4 → h6", "h3 → h1 → h2", "h1 → h1 → h1 (všetko rovnaké)"], spravna: 0, vysvetlenie: "Úrovne idú za sebou, nepreskakujú sa a h1 je jeden." },
    { typ: "volba", lekcia: "html-1-5", otazka: "Ako napíšeš na stránku „Tom &amp; Jerry“ správne?", moznosti: ["<code>Tom &amp;amp; Jerry</code>", "<code>Tom &amp;and; Jerry</code>", "<code>Tom &lt;&amp;&gt; Jerry</code>", "<code>Tom \\&amp; Jerry</code>"], spravna: 0, vysvetlenie: "Znak & sa píše ako entita &amp;." },
    { typ: "doplnenie", lekcia: "html-1-5", otazka: "Doplň zápis „20 m²“:", sablona: "20 m[[0]]2[[1]]", zetony: ["<sup>", "</sup>", "<sub>", "</sub>"], spravne: ["<sup>", "</sup>"], vysvetlenie: "Horný index je sup (superscript)." },
  ];

  K.registrujModul("html", {
    cislo: 1, nazov: "Základy HTML", popis: "Čo je HTML, ako sa píšu značky, kostra stránky, nadpisy, odseky a formátovanie textu.",
    lekcie: [L1, L2, L3, L4, L5],
    test: { otazky: TEST, potrebne: 70 },
  });
})();
