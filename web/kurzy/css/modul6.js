/* CSS · Modul 6 · Responzívny dizajn a animácie */
(function () {
  var P = K.pom, KOD = function (t) { return P.kod(t, "css"); }, TXT = P.TXT, MONO = P.MONO;
  /* Nájde pravidlo vnútri @media s danou podmienkou. */
  function mediaPravidlo(d, podmienka, selektor) {
    var najdene = null;
    [].forEach.call(d.styleSheets, function (ss) {
      var pravidla; try { pravidla = ss.cssRules; } catch (e) { return; }
      [].forEach.call(pravidla, function (r) {
        if (r.media && r.conditionText !== undefined && podmienka.test(r.conditionText.replace(/\s+/g, " ")))
          [].forEach.call(r.cssRules, function (x) { if (x.selectorText && x.selectorText.trim() === selektor) najdene = x; });
      });
    });
    return najdene;
  }

  var OBR_ZARIADENIA = '<svg viewBox="0 0 340 130" role="img" aria-label="Rovnaká stránka na mobile v jednom stĺpci, na tablete v dvoch a na počítači v troch">' +
    [[20, 50, 70, 1, "mobil"], [100, 100, 90, 2, "tablet"], [220, 110, 100, 3, "počítač"]].map(function (z) {
      var x = z[0], w = z[1], h = z[2], n = z[3], s = '<rect x="' + x + '" y="' + (110 - h) + '" width="' + w + '" height="' + h + '" rx="6" style="fill:var(--surface-2);stroke:var(--muted);stroke-width:1.5"/>';
      var bw = (w - 8 - (n - 1) * 4) / n;
      for (var r = 0; r < Math.ceil(3 / n) + (n === 1 ? 0 : 1); r++) for (var c = 0; c < n; c++) { var y = 110 - h + 6 + r * 20; if (y + 15 > 106) continue; s += '<rect x="' + (x + 4 + c * (bw + 4)) + '" y="' + y + '" width="' + bw + '" height="15" rx="3" style="fill:var(--accent);opacity:.75"/>'; }
      return s + '<text x="' + (x + w / 2) + '" y="126" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:var(--text)">' + z[4] + "</text>";
    }).join("") + "</svg>";

  var L1 = { id: "css-6-1", nazov: "Responzívny dizajn", minut: 7, kroky: [
    { typ: "vyklad", nadpis: "Jeden web, všetky obrazovky",
      text: "<p><b>Responzívny</b> web sa prispôsobí šírke obrazovky: na mobile je obsah pod sebou, na počítači vedľa seba. Viac ako polovica návštev webov je dnes z mobilu.</p>", obr: OBR_ZARIADENIA,
      podrobne: "<p>Základné stavebné kamene už poznáš:</p><ul><li><code>&lt;meta name=\"viewport\"&gt;</code> v HTML,</li><li>pružné jednotky (<code>%</code>, <code>fr</code>, <code>rem</code>) namiesto pevných px,</li><li><code>max-width: 100%</code> na obrázkoch,</li><li>Flexbox s <code>wrap</code> a Grid s <code>auto-fit</code>.</li></ul><p>Čo nestačí, doriešia <b>media queries</b>.</p>" },
    { typ: "vyklad", nadpis: "Mobile first",
      text: "<p>Profesionáli píšu CSS najprv <b>pre mobil</b> (jednoduché, jeden stĺpec) a až potom pridávajú úpravy pre väčšie obrazovky.</p>",
      podrobne: "<p>Prečo? Mobilná verzia je jednoduchšia, takže základ je krátky. Väčšie obrazovky dostanú len doplnky. Navyše mobil nemusí sťahovať a spracovať štýly, ktoré nepotrebuje. A Google hodnotí stránky podľa mobilnej verzie.</p>" },
    { typ: "volba", otazka: "Čo znamená prístup „mobile first“?", moznosti: ["Základné CSS je pre mobil, úpravy pre väčšie obrazovky sa pridávajú", "Web sa robí len pre mobil", "Mobil sa načíta skôr", "Najprv aplikácia, potom web"], spravna: 0, vysvetlenie: "Začneš od najmenšej obrazovky a pridávaš." },
    { typ: "volba", otazka: "Čo nepomôže responzivite?", moznosti: ["Pevná šírka <code>width: 1200px</code> na obsahu", "<code>max-width: 100%</code> na obrázkoch", "Flexbox s wrap", "Jednotka fr"], spravna: 0, vysvetlenie: "Pevná šírka spôsobí na mobile posúvanie do strany." },
  ] };

  var L2 = { id: "css-6-2", nazov: "Media queries", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "@media",
      text: "<p>Media query je podmienka: <i>ak je obrazovka aspoň taká široká, použi tieto pravidlá</i>.</p>" + KOD(".karty {\n  display: grid;\n  gap: 10px;\n}\n\n@media (min-width: 600px) {\n  .karty {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n\n@media (min-width: 1000px) {\n  .karty {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}"),
      podrobne: "<p>Hranice (anglicky <i>breakpoints</i>) sa volia podľa obsahu, nie podľa konkrétnych telefónov. Bežné sú približne 600px (tablet) a 1000px (počítač).</p>" + P.tabulka(["Podmienka", "Platí"], [["<code>(min-width: 600px)</code>", "600px a širšie"], ["<code>(max-width: 599px)</code>", "najviac 599px"], ["<code>(orientation: landscape)</code>", "na šírku"], ["<code>(prefers-color-scheme: dark)</code>", "zapnutý tmavý režim"]]) },
    { typ: "volba", otazka: "Kedy platí <code>@media (min-width: 800px)</code>?", moznosti: ["Pri šírke 800px a viac", "Pri šírke do 800px", "Len presne pri 800px", "Vždy"], spravna: 0, vysvetlenie: "min-width = aspoň." },
    { typ: "doplnenie", otazka: "Doplň media query pre obrazovky od 700px:", sablona: "[[0]] ([[1]]: 700px) {\n  nav { display: flex; }\n}", zetony: ["@media", "min-width", "max-width", "@screen", "width-min"], spravne: ["@media", "min-width"], vysvetlenie: "@media (min-width: 700px)" },
    { typ: "kod", zadanie: "Mobile first: <code>.karty</code> sú v jednom stĺpci. Pridaj <code>@media (min-width: 600px)</code>, v ktorom budú mať <code>grid-template-columns: 1fr 1fr 1fr</code>. (Náhľad je úzky, takže v ňom ostane jeden stĺpec. Kontrola pozrie do CSS.)",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="karty">\n  <div>Jar</div>\n  <div>Leto</div>\n  <div>Jeseň</div>\n</div>', css: ".karty {\n  display: grid;\n  gap: 8px;\n}\n.karty div {\n  background: #d8f3dc;\n  padding: 12px;\n}\n" }, vyska: "290px",
      napoveda: "<code>@media (min-width: 600px) { .karty { grid-template-columns: 1fr 1fr 1fr; } }</code>", riesenie: { css: ".karty {\n  display: grid;\n  gap: 8px;\n}\n.karty div {\n  background: #d8f3dc;\n  padding: 12px;\n}\n@media (min-width: 600px) {\n  .karty {\n    grid-template-columns: 1fr 1fr 1fr;\n  }\n}" },
      kontrola: function (d) {
        var r = mediaPravidlo(d, /min-width: 600px/, ".karty");
        if (!r) return "Chýba @media (min-width: 600px) s pravidlom pre .karty.";
        if (!/1fr 1fr 1fr|repeat\(3, 1fr\)/.test(r.style.gridTemplateColumns)) return "V media query nastav grid-template-columns: 1fr 1fr 1fr.";
        return P.styl(d, ".karty", "grid-template-columns").split(" ").length === 1 ? null : "Mimo media query má ostať jeden stĺpec (mobil).";
      }, vysvetlenie: "Na mobile pod sebou, od 600px vedľa seba." },
  ] };

  var L3 = { id: "css-6-3", nazov: "Pružné obrázky a písmo", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "object-fit a aspect-ratio",
      text: "<p>Fotky majú rôzne pomery strán. Aby boli v galérii rovnaké a nedeformované:</p>" + KOD("img {\n  width: 100%;\n  aspect-ratio: 4 / 3;\n  object-fit: cover;\n}") +
        P.ziva('<div class="g"><img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 300 100\'%3E%3Crect width=\'300\' height=\'100\' fill=\'%2390caf9\'/%3E%3Ccircle cx=\'150\' cy=\'50\' r=\'40\' fill=\'%23f57c00\'/%3E%3C/svg%3E" alt=""><img class="c" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 300 100\'%3E%3Crect width=\'300\' height=\'100\' fill=\'%2390caf9\'/%3E%3Ccircle cx=\'150\' cy=\'50\' r=\'40\' fill=\'%23f57c00\'/%3E%3C/svg%3E" alt=""></div>',
          ".g { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }\nimg { width: 100%; aspect-ratio: 1; }\n.c { object-fit: cover; }", 170),
      podrobne: "<p>Ľavý obrázok je štvorcový bez <code>object-fit</code>: deformovaný. Pravý s <code>object-fit: cover</code>: vyplní plochu a prečnievajúce časti oreže. Hodnota <code>contain</code> by naopak zobrazila celý obrázok s prázdnymi okrajmi.</p>" },
    { typ: "volba", otazka: "Ktorá hodnota vyplní plochu bez deformácie a oreže okraje?", moznosti: ["<code>object-fit: cover;</code>", "<code>object-fit: fill;</code>", "<code>object-fit: contain;</code>", "<code>object-fit: stretch;</code>"], spravna: 0, vysvetlenie: "cover = zakryť plochu." },
    { typ: "vyklad", nadpis: "Plynulá veľkosť písma: clamp()",
      text: "<p><code>clamp(min, ideál, max)</code> nastaví hodnotu, ktorá rastie s oknom, ale nikdy nie je menšia ako min ani väčšia ako max:</p>" + KOD("h1 {\n  font-size: clamp(1.8rem, 5vw, 3.5rem);\n}"),
      podrobne: "<p>Nadpis bude na mobile 1,8rem, na veľkom monitore 3,5rem a medzi tým plynulo podľa šírky okna (5vw). Bez jediného media query.</p>" },
    { typ: "kod", zadanie: "Obrázkom v <code>.galeria</code> nastav <code>width: 100%</code>, <code>aspect-ratio: 1</code> (štvorec) a <code>object-fit: cover</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="galeria">\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 200\'%3E%3Crect width=\'400\' height=\'200\' fill=\'%23a5d6a7\'/%3E%3C/svg%3E" alt="Lúka">\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 400\'%3E%3Crect width=\'200\' height=\'400\' fill=\'%2390caf9\'/%3E%3C/svg%3E" alt="Nebo">\n</div>', css: ".galeria {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.galeria img {\n  \n}" }, vyska: "250px",
      napoveda: "<code>width: 100%; aspect-ratio: 1; object-fit: cover;</code>", riesenie: { css: ".galeria {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.galeria img {\n  width: 100%;\n  aspect-ratio: 1;\n  object-fit: cover;\n}" },
      kontrola: function (d) {
        var a = d.querySelectorAll("img")[0].getBoundingClientRect(), b = d.querySelectorAll("img")[1].getBoundingClientRect();
        if (P.styl(d, "img", "object-fit") !== "cover") return "Chýba object-fit: cover.";
        return Math.abs(a.width - a.height) < 2 && Math.abs(b.width - b.height) < 2 ? null : "Obrázky ešte nie sú štvorcové (width: 100%; aspect-ratio: 1).";
      }, vysvetlenie: "Dva úplne rôzne obrázky, rovnaké štvorce." },
  ] };

  var L4 = { id: "css-6-4", nazov: "Prechody a transformácie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "transition",
      text: "<p>Bez prechodu sa zmena (napr. pri <code>:hover</code>) stane okamžite. S <code>transition</code> plynulo:</p>" + KOD(".tlacidlo {\n  background: #2f5bea;\n  transition: background 0.3s, transform 0.2s;\n}\n.tlacidlo:hover {\n  background: #1d3fb8;\n  transform: scale(1.05);\n}"),
      podrobne: "<p>Zapisuje sa: vlastnosť, trvanie (s alebo ms), voliteľne priebeh (<code>ease</code>, <code>linear</code>, <code>ease-in-out</code>). Prechody kratšie ako 0,3 s pôsobia svižne, dlhšie ako 0,5 s otravne.</p>" },
    { typ: "vyklad", nadpis: "transform",
      text: P.tabulka(["Funkcia", "Efekt"], [["<code>translate(10px, 0)</code>", "posun"], ["<code>scale(1.1)</code>", "zväčšenie"], ["<code>rotate(45deg)</code>", "otočenie"], ["<code>skew(10deg)</code>", "skosenie"]]) +
        P.ziva('<div class="r">A</div><div class="r t1">B</div><div class="r t2">C</div><div class="r t3">D</div>', "body { display: flex; gap: 22px; padding: 22px; }\n.r { width: 40px; height: 40px; background: #6a3fc9; color: white; display: grid; place-items: center; }\n.t1 { transform: rotate(45deg); }\n.t2 { transform: scale(1.3); }\n.t3 { transform: translateY(10px); }", 100),
      podrobne: "<p>Transform neposúva okolité prvky (ako margin), len prvok vizuálne. Preto je rýchly a ideálny na animácie.</p>" },
    { typ: "volba", otazka: "Ako plynulo zmeníš farbu za 0,5 sekundy?", moznosti: ["<code>transition: color 0.5s;</code>", "<code>animation: color 0.5s;</code>", "<code>color: slow;</code>", "<code>transform: color(0.5s);</code>"], spravna: 0, vysvetlenie: "transition: vlastnosť trvanie." },
    { typ: "kod", zadanie: "Karte <code>.karta</code> pridaj <code>transition: transform 0.2s</code> a pri <code>:hover</code> nech sa zväčší na <code>scale(1.05)</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<div class="karta">Prejdi myšou nado mňa</div>', css: ".karta {\n  padding: 20px;\n  background: #ffd6a5;\n  border-radius: 12px;\n  \n}\n" }, vyska: "220px",
      napoveda: "<code>transition: transform 0.2s;</code> a <code>.karta:hover { transform: scale(1.05); }</code>", riesenie: { css: ".karta {\n  padding: 20px;\n  background: #ffd6a5;\n  border-radius: 12px;\n  transition: transform 0.2s;\n}\n.karta:hover {\n  transform: scale(1.05);\n}" },
      kontrola: function (d, s) {
        if (!/transform/.test(P.styl(d, ".karta", "transition-property")) || P.styl(d, ".karta", "transition-duration") !== "0.2s") return "Karta potrebuje transition: transform 0.2s.";
        return /\.karta:hover\s*\{[^}]*transform\s*:\s*scale\(\s*1\.05\s*\)/.test(s.css) ? null : "Chýba .karta:hover { transform: scale(1.05); }";
      }, vysvetlenie: "Na počítači sa karta pri prejdení myšou jemne zväčší." },
  ] };

  var L5 = { id: "css-6-5", nazov: "Animácie a tmavý režim", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "@keyframes",
      text: "<p>Animácia beží sama, bez hover. Najprv opíšeš kroky v <code>@keyframes</code>, potom ich priradíš:</p>" + KOD("@keyframes pulz {\n  from { transform: scale(1); }\n  to   { transform: scale(1.2); }\n}\n.srdce {\n  animation: pulz 0.8s ease-in-out infinite alternate;\n}") +
        P.ziva('<div class="srdce">♥</div>', "@keyframes pulz { from { transform: scale(1); } to { transform: scale(1.3); } }\n.srdce { font-size: 40px; color: crimson; width: 50px; animation: pulz .8s ease-in-out infinite alternate; }", 80),
      podrobne: "<p>Zápis <code>animation</code>: meno, trvanie, priebeh, počet opakovaní (<code>infinite</code> = stále), smer (<code>alternate</code> = tam a späť). Namiesto from/to môžeš použiť percentá: <code>0%</code>, <code>50%</code>, <code>100%</code>.</p>",
      hlbka: "<p>Niektorým ľuďom pohyb na obrazovke spôsobuje nevoľnosť. Rešpektuj nastavenie systému: <code>@media (prefers-reduced-motion: reduce) { * { animation: none; } }</code>.</p>" },
    { typ: "volba", otazka: "Ako nastavíš, aby sa animácia opakovala stále?", moznosti: ["<code>infinite</code>", "<code>forever</code>", "<code>loop</code>", "<code>repeat: all</code>"], spravna: 0, vysvetlenie: "animation-iteration-count: infinite." },
    { typ: "vyklad", nadpis: "Tmavý režim",
      text: "<p>Systém telefónu vie, či má používateľ zapnutý tmavý režim. CSS sa naň vie prispôsobiť. S premennými je to pár riadkov:</p>" + KOD(":root {\n  --pozadie: white;\n  --text: #222;\n}\n@media (prefers-color-scheme: dark) {\n  :root {\n    --pozadie: #121212;\n    --text: #eee;\n  }\n}\nbody {\n  background: var(--pozadie);\n  color: var(--text);\n}"),
      podrobne: "<p>V tmavom režime nepoužívaj úplne čiernu a úplne bielu, oči unavuje vysoký kontrast. Lepšie je tmavosivá (#121212) a svetlosivá (#eee). Aj táto aplikácia sa takto prepína.</p>" },
    { typ: "kod", zadanie: "Vytvor animáciu <code>@keyframes blik</code> (od <code>opacity: 1</code> do <code>opacity: 0.2</code>) a nastav ju prvku <code>.live</code>: <code>animation: blik 1s infinite alternate</code>.",
      karty: ["html", "css"], aktivna: "css", start: { html: '<p><span class="live">●</span> NAŽIVO</p>', css: ".live {\n  color: red;\n  \n}\n" }, vyska: "220px",
      napoveda: "<code>@keyframes blik { from { opacity: 1; } to { opacity: 0.2; } }</code>", riesenie: { css: "@keyframes blik {\n  from { opacity: 1; }\n  to { opacity: 0.2; }\n}\n.live {\n  color: red;\n  animation: blik 1s infinite alternate;\n}\n" },
      kontrola: function (d) {
        if (P.styl(d, ".live", "animation-name") !== "blik") return "Prvok .live nemá animáciu s menom blik.";
        if (P.styl(d, ".live", "animation-iteration-count") !== "infinite") return "Animácia sa má opakovať stále (infinite).";
        var ok = false; [].forEach.call(d.styleSheets, function (ss) { [].forEach.call(ss.cssRules, function (r) { if (r.name === "blik" && r.cssRules && r.cssRules.length >= 2) ok = true; }); });
        return ok ? null : "Chýba @keyframes blik s krokmi from a to.";
      }, vysvetlenie: "Červená bodka bliká ako v živom prenose." },
    { typ: "vyklad", nadpis: "CSS máš za sebou!",
      text: "<p>Prešiel si všetkých 6 modulov CSS. Vieš:</p><ul><li>písať pravidlá a selektory a rozumieš kaskáde,</li><li>pracovať s farbami, písmom, rámikmi a tieňmi,</li><li>ovládať box model a pozíciovanie,</li><li>rozložiť stránku Flexboxom a Gridom,</li><li>prispôsobiť web mobilu, pridať animácie a tmavý režim.</li></ul>", tip: "Po teste ťa čakajú záverečné projekty CSS. Potom JavaScript: stránky ožijú." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "css-6-1", otazka: "Čo je responzívny web?", moznosti: ["Prispôsobí sa šírke obrazovky", "Rýchlo odpovedá na kliknutie", "Má animácie", "Funguje bez internetu"], spravna: 0, vysvetlenie: "Responzívny = prispôsobivý." },
    { typ: "volba", lekcia: "css-6-2", otazka: "Ktorá podmienka platí pre obrazovky od 900px?", moznosti: ["<code>@media (min-width: 900px)</code>", "<code>@media (max-width: 900px)</code>", "<code>@media (width: 900px)</code>", "<code>@screen 900</code>"], spravna: 0, vysvetlenie: "min-width = od." },
    { typ: "volba", lekcia: "css-6-2", otazka: "Pri mobile first píšeš media queries najčastejšie s:", moznosti: ["<code>min-width</code>", "<code>max-width</code>", "<code>orientation</code>", "<code>height</code>"], spravna: 0, vysvetlenie: "Základ je mobil, väčšie obrazovky pridávaš cez min-width." },
    { typ: "volba", lekcia: "css-6-3", otazka: "Ako spravíš z obrázka štvorec bez deformácie?", moznosti: ["<code>aspect-ratio: 1; object-fit: cover;</code>", "<code>width: 100px; height: 100px;</code>", "<code>border-radius: 0;</code>", "<code>scale: 1;</code>"], spravna: 0, vysvetlenie: "aspect-ratio určí tvar, object-fit zabráni deformácii." },
    { typ: "volba", lekcia: "css-6-3", otazka: "Čo robí <code>clamp(1rem, 4vw, 2rem)</code>?", moznosti: ["Hodnota rastie s oknom, ale je medzi 1rem a 2rem", "Vždy 4vw", "Vždy 1rem", "Náhodná hodnota"], spravna: 0, vysvetlenie: "clamp(min, ideál, max)." },
    { typ: "volba", lekcia: "css-6-4", otazka: "Ktorá funkcia otočí prvok?", moznosti: ["<code>rotate()</code>", "<code>turn()</code>", "<code>spin()</code>", "<code>scale()</code>"], spravna: 0, vysvetlenie: "transform: rotate(45deg)." },
    { typ: "doplnenie", lekcia: "css-6-4", otazka: "Plynulá zmena pozadia za 0,3 s:", sablona: "[[0]]: background [[1]];", zetony: ["transition", "0.3s", "animation", "300", "slow"], spravne: ["transition", "0.3s"], vysvetlenie: "transition: background 0.3s;" },
    { typ: "volba", lekcia: "css-6-5", otazka: "Čím opíšeš kroky animácie?", moznosti: ["<code>@keyframes</code>", "<code>@media</code>", "<code>@animation</code>", "<code>@steps</code>"], spravna: 0, vysvetlenie: "@keyframes meno { from {} to {} }" },
    { typ: "volba", lekcia: "css-6-5", otazka: "Ako zistíš, že používateľ má tmavý režim?", moznosti: ["<code>@media (prefers-color-scheme: dark)</code>", "<code>@media (dark)</code>", "<code>:dark</code>", "<code>body.dark</code> sa nastaví sám"], spravna: 0, vysvetlenie: "prefers-color-scheme: dark." },
  ];

  K.registrujModul("css", { cislo: 6, nazov: "Responzívny dizajn a animácie", popis: "Mobile first, media queries, pružné obrázky a písmo, prechody, transformácie, animácie a tmavý režim.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
