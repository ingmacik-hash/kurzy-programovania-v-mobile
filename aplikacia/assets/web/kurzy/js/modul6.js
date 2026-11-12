/* JavaScript · Modul 6 · Práca so stránkou (DOM) */
(function () {
  var P = K.pom, JS = function (t) { return P.kod(t, "js"); }, TXT = P.TXT, MONO = P.MONO;
  function t(el) { return el ? el.textContent.trim() : ""; }
  function klik(d, sel, n) { var e = d.querySelector(sel); for (var i = 0; i < (n || 1); i++) if (e) e.click(); return e; }

  var OBR_DOM = '<svg viewBox="0 0 340 140" role="img" aria-label="DOM je strom: document, html, head a body, v body h1 a button">' +
    (function () {
      function u(x, y, txt, f) { return '<rect x="' + (x - 40) + '" y="' + y + '" width="80" height="24" rx="6" style="fill:' + (f || "var(--surface-2)") + ';stroke:var(--line)"/><text x="' + x + '" y="' + (y + 16) + '" text-anchor="middle" font-size="11" ' + MONO + ' style="fill:var(--text)">' + txt + "</text>"; }
      function c(x1, y1, x2, y2) { return '<path d="M' + x1 + " " + y1 + "L" + x2 + " " + y2 + '" style="stroke:var(--muted);stroke-width:1.5"/>'; }
      return c(170, 30, 170, 42) + c(170, 66, 100, 80) + c(170, 66, 240, 80) + c(240, 104, 190, 114) + c(240, 104, 290, 114) +
        u(170, 6, "document", "var(--accent-soft, var(--surface-2))") + u(170, 42, "html") + u(100, 80, "head") + u(240, 80, "body") + u(190, 114, "h1") + u(290, 114, "button");
    })() + "</svg>";

  var L1 = { id: "js-6-1", nazov: "DOM: stránka ako strom", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "JavaScript vidí HTML",
      text: "<p>Keď prehliadač načíta HTML, postaví z neho <b>DOM</b> (Document Object Model): strom objektov, ktorý JavaScript môže čítať aj meniť. Každá značka je uzol stromu.</p>", obr: OBR_DOM,
      podrobne: "<p>Všetko, čo vidíš na interaktívnych weboch (otvorí sa menu, pribudne komentár, zmení sa košík), je JavaScript, ktorý mení DOM. Stránka sa pritom neobnovuje.</p>" },
    { typ: "vyklad", nadpis: "Nájdi prvok",
      text: P.tabulka(["Zápis", "Vráti"], [["<code>document.querySelector(\"h1\")</code>", "prvý prvok podľa CSS selektora"], ["<code>document.querySelector(\"#skore\")</code>", "prvok s id skore"], ["<code>document.querySelectorAll(\".karta\")</code>", "všetky prvky (zoznam)"], ["<code>document.getElementById(\"skore\")</code>", "prvok s id (starší zápis)"]]) +
        JS('const nadpis = document.querySelector("h1");\nnadpis.textContent = "Nový nadpis";'),
      podrobne: "<p>Selektory sú tie isté ako v CSS. Ak prvok neexistuje, querySelector vráti <code>null</code> a ďalší riadok skončí chybou „Cannot read properties of null“. Táto aplikácia ti ju preloží.</p>" },
    { typ: "volba", otazka: "Ktorý zápis nájde prvok <code>&lt;p class=\"info\"&gt;</code>?", moznosti: ["<code>document.querySelector(\".info\")</code>", "<code>document.querySelector(\"info\")</code>", "<code>document.querySelector(\"#info\")</code>", "<code>document.info</code>"], spravna: 0, vysvetlenie: "Selektor triedy s bodkou, ako v CSS." },
    { typ: "kod", zadanie: "Pomocou JavaScriptu zmeň text nadpisu <code>#titulok</code> na <b>Vitaj v DOM!</b> (vlastnosť <code>textContent</code>).",
      karty: ["html", "js"], aktivna: "js", start: { html: '<h1 id="titulok">Starý nadpis</h1>', js: "" }, vyska: "160px",
      napoveda: 'document.querySelector("#titulok").textContent = "Vitaj v DOM!";', riesenie: { js: 'document.querySelector("#titulok").textContent = "Vitaj v DOM!";' },
      kontrola: function (d, s) {
        if (/Vitaj v DOM/.test(s.html)) return "Nemeň HTML, zmeň text cez JavaScript.";
        return t(d.querySelector("#titulok")) === "Vitaj v DOM!" ? null : "Nadpis má po spustení obsahovať Vitaj v DOM!";
      }, vysvetlenie: "V HTML je stále pôvodný text. Zmenil ho JavaScript." },
  ] };

  var L2 = { id: "js-6-2", nazov: "Udalosti", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Reakcia na kliknutie",
      text: "<p><b>Udalosť</b> (event) je niečo, čo sa stane: klik, písanie, odoslanie formulára. Na udalosť nastavíš <b>poslucháča</b> (listener), čo je funkcia, ktorá sa zavolá, keď udalosť nastane:</p>" +
        JS('const tlacidlo = document.querySelector("button");\nlet pocet = 0;\n\ntlacidlo.addEventListener("click", () => {\n  pocet++;\n  tlacidlo.textContent = `Kliknuté ${pocet}×`;\n});'),
      podrobne: P.tabulka(["Udalosť", "Kedy"], [["<code>click</code>", "kliknutie, ťuknutie"], ["<code>input</code>", "každá zmena v poli"], ["<code>change</code>", "pole zmenené a opustené"], ["<code>submit</code>", "odoslanie formulára"], ["<code>keydown</code>", "stlačenie klávesu"]]) },
    { typ: "volba", otazka: "Ktorá metóda nastaví reakciu na udalosť?", moznosti: ["<code>addEventListener</code>", "<code>onEvent</code>", "<code>listen</code>", "<code>querySelector</code>"], spravna: 0, vysvetlenie: "prvok.addEventListener(\"click\", funkcia)." },
    { typ: "volba", otazka: "Kedy sa vykoná funkcia v <code>addEventListener(\"click\", f)</code>?", moznosti: ["Pri každom kliknutí na prvok", "Hneď pri načítaní", "Len raz", "Nikdy"], spravna: 0, vysvetlenie: "Je to callback, prehliadač ho zavolá pri udalosti." },
    { typ: "kod", zadanie: "Počítadlo: po každom kliknutí na tlačidlo zvýš číslo v <code>#cislo</code> o 1.",
      karty: ["html", "js"], aktivna: "js", start: { html: '<p>Kliknutí: <span id="cislo">0</span></p>\n<button id="plus">+1</button>', js: 'const tlacidlo = document.querySelector("#plus");\nconst cislo = document.querySelector("#cislo");\nlet pocet = 0;\n\n' }, vyska: "210px",
      napoveda: 'tlacidlo.addEventListener("click", () => { pocet++; cislo.textContent = pocet; });', riesenie: { js: 'const tlacidlo = document.querySelector("#plus");\nconst cislo = document.querySelector("#cislo");\nlet pocet = 0;\n\ntlacidlo.addEventListener("click", () => {\n  pocet++;\n  cislo.textContent = pocet;\n});' },
      kontrola: function (d) {
        if (t(d.querySelector("#cislo")) !== "0") return "Na začiatku má byť 0.";
        klik(d, "#plus", 3);
        return t(d.querySelector("#cislo")) === "3" ? null : "Po 3 kliknutiach má byť 3, je " + t(d.querySelector("#cislo")) + ".";
      }, vysvetlenie: "Kontrola trikrát klikla. Skús ťukať v náhľade aj ty." },
  ] };

  var L3 = { id: "js-6-3", nazov: "Štýly a triedy", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "classList",
      text: "<p>Vzhľad je najlepšie meniť <b>pridávaním tried</b>, ktoré máš pripravené v CSS:</p>" + P.tabulka(["Zápis", "Čo robí"], [["<code>el.classList.add(\"aktivny\")</code>", "pridá triedu"], ["<code>el.classList.remove(\"aktivny\")</code>", "odoberie"], ["<code>el.classList.toggle(\"aktivny\")</code>", "prepne: ak má, odoberie, inak pridá"], ["<code>el.classList.contains(\"aktivny\")</code>", "má triedu?"]]),
      podrobne: "<p>Dá sa meniť aj priamo štýl: <code>el.style.color = \"red\"</code> (vlastnosti v camelCase: <code>backgroundColor</code>). Triedy sú však lepšie: vzhľad ostáva v CSS a JavaScript len prepína stav. Takto funguje tmavý režim, otvorenie menu, označenie vybratej karty.</p>" },
    { typ: "volba", otazka: "Ktorá metóda pri jednom kliknutí triedu pridá a pri ďalšom odoberie?", moznosti: ["<code>toggle</code>", "<code>add</code>", "<code>switch</code>", "<code>change</code>"], spravna: 0, vysvetlenie: "toggle = prepínač." },
    { typ: "kod", zadanie: "Tmavý režim: po kliknutí na tlačidlo prepni (<code>toggle</code>) triedu <code>tmavy</code> na elemente <code>body</code>. CSS je pripravené.",
      karty: ["html", "css", "js"], aktivna: "js", start: { html: "<h1>Môj blog</h1>\n<button id=\"rezim\">Prepnúť režim</button>", css: "body.tmavy {\n  background: #111;\n  color: #eee;\n}", js: "" }, vyska: "180px",
      napoveda: 'document.querySelector("#rezim").addEventListener("click", () => { document.body.classList.toggle("tmavy"); });', riesenie: { js: 'document.querySelector("#rezim").addEventListener("click", () => {\n  document.body.classList.toggle("tmavy");\n});' },
      kontrola: function (d) {
        klik(d, "#rezim"); if (!d.body.classList.contains("tmavy")) return "Po prvom kliknutí má mať body triedu tmavy.";
        klik(d, "#rezim"); return d.body.classList.contains("tmavy") ? "Po druhom kliknutí sa má trieda odobrať (toggle)." : null;
      }, vysvetlenie: "Toto je celé tajomstvo tlačidla na tmavý režim." },
  ] };

  var L4 = { id: "js-6-4", nazov: "Vytváranie prvkov", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Nové prvky na stránke",
      text: JS('const zoznam = document.querySelector("ul");\nconst polozka = document.createElement("li");\npolozka.textContent = "Nová úloha";\nzoznam.appendChild(polozka);\n\n// odstránenie\npolozka.remove();'),
      podrobne: "<ul><li><code>createElement</code> vytvorí prvok v pamäti.</li><li><code>textContent</code> mu nastaví text (bezpečne, HTML sa nevykoná).</li><li><code>appendChild</code> alebo <code>append</code> ho vloží na stránku.</li><li><code>remove()</code> ho odstráni.</li></ul>",
      hlbka: "<p>Existuje aj <code>el.innerHTML = \"&lt;b&gt;text&lt;/b&gt;\"</code>, ktoré vloží HTML. Nikdy doň nevkladaj text od používateľa: niekto by mohol napísať škodlivý skript (útok XSS). Text od ľudí vždy cez textContent.</p>" },
    { typ: "volba", otazka: "Prečo text od používateľa vkladať cez <code>textContent</code> a nie <code>innerHTML</code>?", moznosti: ["innerHTML by vykonal prípadný škodlivý kód", "textContent je krajší", "innerHTML nefunguje", "Je to jedno"], spravna: 0, vysvetlenie: "Ochrana pred útokom XSS." },
    { typ: "poradie", otazka: "Zoraď kroky pridania položky:", riadky: ['const li = document.createElement("li");', 'li.textContent = "Mlieko";', "zoznam.appendChild(li);"], vysvetlenie: "Vytvor, naplň, vlož." },
    { typ: "kod", zadanie: "Nákupný zoznam: po kliknutí na <b>Pridať</b> vytvor nový <code>li</code> s textom z poľa <code>#vec</code> (vlastnosť <code>value</code>), pridaj ho do <code>#zoznam</code> a pole vymaž. Prázdny text nepridávaj.",
      karty: ["html", "js"], aktivna: "js", start: { html: '<input id="vec" placeholder="Čo kúpiť?">\n<button id="pridat">Pridať</button>\n<ul id="zoznam"></ul>', js: 'const pole = document.querySelector("#vec");\nconst zoznam = document.querySelector("#zoznam");\n\ndocument.querySelector("#pridat").addEventListener("click", () => {\n  \n});' }, vyska: "260px",
      napoveda: 'if (!pole.value.trim()) return; const li = document.createElement("li"); li.textContent = pole.value; zoznam.appendChild(li); pole.value = "";', riesenie: { js: 'const pole = document.querySelector("#vec");\nconst zoznam = document.querySelector("#zoznam");\n\ndocument.querySelector("#pridat").addEventListener("click", () => {\n  if (!pole.value.trim()) return;\n  const li = document.createElement("li");\n  li.textContent = pole.value;\n  zoznam.appendChild(li);\n  pole.value = "";\n});' },
      kontrola: function (d) {
        var p = d.querySelector("#vec");
        p.value = "mlieko"; klik(d, "#pridat"); p.value = "chlieb"; klik(d, "#pridat");
        var li = d.querySelectorAll("#zoznam li");
        if (li.length !== 2) return "Po pridaní dvoch vecí má byť v zozname 2 položky, je " + li.length + ".";
        if (t(li[0]) !== "mlieko" || t(li[1]) !== "chlieb") return "Položky majú obsahovať text z poľa.";
        if (p.value !== "") return "Po pridaní vymaž pole (pole.value = \"\").";
        klik(d, "#pridat");
        return d.querySelectorAll("#zoznam li").length === 2 ? null : "Prázdny text sa nemá pridať.";
      }, vysvetlenie: "Kontrola pridala mlieko, chlieb a skúsila aj prázdny text." },
  ] };

  var L5 = { id: "js-6-5", nazov: "Formuláre v JavaScripte", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Čítanie polí a odoslanie",
      text: JS('const formular = document.querySelector("form");\n\nformular.addEventListener("submit", (e) => {\n  e.preventDefault();               // neodosielaj, obnovila by sa stránka\n  const vek = Number(formular.vek.value);\n  if (vek < 15) {\n    vysledok.textContent = "Si príliš mladý.";\n  } else {\n    vysledok.textContent = "Vitaj!";\n  }\n});'),
      podrobne: "<ul><li><code>e.preventDefault()</code> zastaví predvolené správanie (odoslanie a obnovenie stránky).</li><li>Hodnota poľa je v <code>.value</code> a je to vždy <b>text</b>. Na čísla použi Number().</li><li>Pole nájdeš aj cez meno: <code>formular.vek</code> (atribút name).</li></ul>" },
    { typ: "volba", otazka: "Prečo voláme <code>e.preventDefault()</code> pri submit?", moznosti: ["Aby sa stránka neobnovila a mohli sme spracovať údaje sami", "Aby sa formulár vymazal", "Je to povinné", "Aby sa zobrazila chyba"], spravna: 0, vysvetlenie: "Predvolene by prehliadač formulár odoslal." },
    { typ: "volba", otazka: "Aký typ má <code>pole.value</code> pri <code>&lt;input type=\"number\"&gt;</code>?", moznosti: ["string (text)", "number", "boolean", "závisí od čísla"], spravna: 0, vysvetlenie: "value je vždy text, treba Number()." },
    { typ: "kod", zadanie: "Kalkulačka BMI: pri odoslaní formulára (<code>submit</code>) zastav odoslanie, vypočítaj <code>vaha / (vyska * vyska)</code> (výška v metroch), zaokrúhli na 1 desatinné miesto (<code>toFixed(1)</code>) a zobraz v <code>#bmi</code>.",
      karty: ["html", "js"], aktivna: "js", start: { html: '<form id="f">\n  <label>Váha (kg) <input name="vaha" type="number" value="60"></label>\n  <label>Výška (m) <input name="vyska" type="number" step="0.01" value="1.70"></label>\n  <button>Vypočítať</button>\n</form>\n<p>BMI: <b id="bmi">?</b></p>', js: 'const f = document.querySelector("#f");\n\n' }, vyska: "220px",
      napoveda: 'f.addEventListener("submit", e => { e.preventDefault(); const bmi = Number(f.vaha.value) / (Number(f.vyska.value) ** 2); document.querySelector("#bmi").textContent = bmi.toFixed(1); });', riesenie: { js: 'const f = document.querySelector("#f");\n\nf.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const vaha = Number(f.vaha.value);\n  const vyska = Number(f.vyska.value);\n  const bmi = vaha / (vyska * vyska);\n  document.querySelector("#bmi").textContent = bmi.toFixed(1);\n});' },
      kontrola: function (d) {
        var f = d.querySelector("#f"), w = d.defaultView;
        f.vaha.value = "80"; f.vyska.value = "2";
        var ev = new w.Event("submit", { cancelable: true, bubbles: true }); f.dispatchEvent(ev);
        if (!ev.defaultPrevented) return "Zavolaj e.preventDefault(), inak by sa stránka obnovila.";
        var v = t(d.querySelector("#bmi")); if (v !== "20.0") return "Pre 80 kg a 2 m má vyjsť 20.0, vyšlo: " + v + ".";
        f.vaha.value = "60"; f.vyska.value = "1.70"; f.dispatchEvent(new w.Event("submit", { cancelable: true, bubbles: true }));
        return t(d.querySelector("#bmi")) === "20.8" ? null : "Pre 60 kg a 1,70 m má vyjsť 20.8.";
      }, vysvetlenie: "Prvá skutočná webová aplikácia: formulár, výpočet, výsledok." },
    { typ: "vyklad", nadpis: "JavaScript máš za sebou!",
      text: "<p>Prešiel si všetkých 6 modulov. Vieš:</p><ul><li>pracovať s premennými, typmi a textom,</li><li>rozhodovať sa podmienkami a opakovať cyklami,</li><li>písať funkcie a pracovať s poliami a objektmi,</li><li>ovládať stránku: hľadať prvky, reagovať na udalosti, meniť triedy, vytvárať prvky, spracovať formulár.</li></ul>", tip: "Po teste ťa čakajú záverečné projekty: kalkulačka, zoznam úloh a hra." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "js-6-1", otazka: "Čo je DOM?", moznosti: ["Strom objektov zo stránky, ktorý JavaScript mení", "Databáza", "Typ súboru", "Prehliadač"], spravna: 0, vysvetlenie: "Document Object Model." },
    { typ: "volba", lekcia: "js-6-1", otazka: "Čo vráti <code>querySelector</code>, keď prvok nenájde?", moznosti: ["null", "prázdny text", "0", "chybu"], spravna: 0, vysvetlenie: "null. Ďalší prístup k nemu skončí chybou." },
    { typ: "doplnenie", lekcia: "js-6-2", otazka: "Reakcia na kliknutie:", sablona: 'btn.[[0]]("[[1]]", () => {\n  …\n});', zetony: ["addEventListener", "click", "onclick", "press", "listen"], spravne: ["addEventListener", "click"], vysvetlenie: "addEventListener(\"click\", …)" },
    { typ: "volba", lekcia: "js-6-2", otazka: "Ktorá udalosť nastane pri každom napísanom znaku v poli?", moznosti: ["input", "submit", "click", "load"], spravna: 0, vysvetlenie: "input sa spustí pri každej zmene." },
    { typ: "volba", lekcia: "js-6-3", otazka: "Ako pridáš prvku triedu <code>otvorene</code>?", moznosti: ["<code>el.classList.add(\"otvorene\")</code>", "<code>el.class = \"otvorene\"</code>", "<code>el.addClass(\"otvorene\")</code>", "<code>el.style.class = \"otvorene\"</code>"], spravna: 0, vysvetlenie: "classList.add." },
    { typ: "volba", lekcia: "js-6-4", otazka: "Ktorá metóda vytvorí nový prvok?", moznosti: ["<code>document.createElement(\"li\")</code>", "<code>document.newElement(\"li\")</code>", "<code>new li()</code>", "<code>document.add(\"li\")</code>"], spravna: 0, vysvetlenie: "createElement, potom append." },
    { typ: "volba", lekcia: "js-6-5", otazka: "Čo vypíše <code>console.log(pole.value + 1)</code>, ak je v poli 5?", moznosti: ["51", "6", "chybu", "5"], spravna: 0, vysvetlenie: "value je text: \"5\" + 1 = \"51\"." },
  ];

  K.registrujModul("js", { cislo: 6, nazov: "Práca so stránkou (DOM)", popis: "Hľadanie prvkov, udalosti, zmena tried a štýlov, vytváranie prvkov a spracovanie formulárov.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
