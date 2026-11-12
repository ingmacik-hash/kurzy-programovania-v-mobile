/* HTML · Záverečné projekty */
(function () {
  function t(el) { return el ? el.textContent.trim() : ""; }
  function maPopis(d, pole) {
    if (pole.id && d.querySelector('label[for="' + pole.id + '"]')) return true;
    return !!pole.closest("label");
  }

  K.registrujZaver("html", [
    { id: "html-p1", nazov: "Osobná stránka", minut: 25,
      popis: "Vytvor stránku o sebe (alebo o vymyslenej postave). Môžeš písať čokoľvek, hodnotí sa správne použitie HTML.",
      zadanie: "Postav celú stránku od <code>&lt;!DOCTYPE html&gt;</code>. Hore hlavička s menom, potom hlavný obsah s krátkym predstavením, zoznamom koníčkov a obrázkom s popisom, dole pätička s kontaktom.",
      start: { html: '<!DOCTYPE html>\n<html lang="sk">\n<head>\n  <meta charset="utf-8">\n  <title></title>\n</head>\n<body>\n  \n</body>\n</html>' },
      napoveda: "Pomôž si štruktúrou: <code>header</code> s h1 → <code>main</code> (p, h2 + ul, figure s img a figcaption) → <code>footer</code> s odkazom mailto:.",
      kriteria: [
        { text: "Stránka má vyplnený <code>title</code> a <code>lang</code>", body: 1, test: function (d, s) { return /<title>\s*[^<\s][^<]*<\/title>/i.test(s.html) && /<html[^>]+lang=["']\w+/i.test(s.html); } },
        { text: "<code>header</code> s nadpisom <code>h1</code>", body: 2, test: function (d) { return !!t(d.querySelector("header h1")); } },
        { text: "Na stránke je práve jeden <code>h1</code>", body: 1, test: function (d) { return d.querySelectorAll("h1").length === 1; } },
        { text: "<code>main</code> s odsekom predstavenia (aspoň 10 slov)", body: 2, test: function (d) { var p = d.querySelector("main p"); return !!p && t(p).split(/\s+/).length >= 10; } },
        { text: "Podnadpis <code>h2</code> a zoznam aspoň 3 koníčkov", body: 2, test: function (d) { return !!d.querySelector("main h2") && [].some.call(d.querySelectorAll("main ul, main ol"), function (u) { return u.querySelectorAll("li").length >= 3; }); } },
        { text: "Obrázok v <code>figure</code> s <code>figcaption</code> a vyplneným <code>alt</code>", body: 2, test: function (d) { var i = d.querySelector("figure img"); return !!i && !!(i.getAttribute("alt") || "").trim() && !!t(d.querySelector("figure figcaption")); } },
        { text: "Aspoň jedno <b>zvýraznené</b> slovo (<code>strong</code> alebo <code>em</code>)", body: 1, test: function (d) { return !!d.querySelector("main strong, main em"); } },
        { text: "<code>footer</code> s e-mailovým odkazom <code>mailto:</code>", body: 2, test: function (d) { return !!d.querySelector('footer a[href^="mailto:"]'); } },
      ],
      riesenie: { html: '<!DOCTYPE html>\n<html lang="sk">\n<head>\n  <meta charset="utf-8">\n  <title>Jana Nováková</title>\n</head>\n<body>\n  <header>\n    <h1>Jana Nováková</h1>\n  </header>\n  <main>\n    <p>Volám sa Jana, mám pätnásť rokov a učím sa robiť <strong>webové stránky</strong> v aplikácii SyntaxCode.</p>\n    <h2>Moje koníčky</h2>\n    <ul>\n      <li>kreslenie</li>\n      <li>volejbal</li>\n      <li>programovanie</li>\n    </ul>\n    <figure>\n      <img src="jana.jpg" alt="Jana s loptou na ihrisku" width="200">\n      <figcaption>Ja na turnaji</figcaption>\n    </figure>\n  </main>\n  <footer>\n    <a href="mailto:jana@example.com">Napíš mi</a>\n  </footer>\n</body>\n</html>' } },

    { id: "html-p2", nazov: "Recept", minut: 25,
      popis: "Spracuj svoj obľúbený recept ako stránku: suroviny, postup a tabuľka nutričných hodnôt.",
      zadanie: "Recept zabaľ do <code>article</code>. Pridaj obrázok jedla, zoznam surovín, očíslovaný postup a tabuľku s hodnotami. Nezabudni na čas prípravy.",
      start: { html: "<article>\n  <h1></h1>\n  \n</article>", css: "table { border-collapse: collapse; }\nth, td { border: 1px solid #999; padding: 4px 8px; }" },
      napoveda: "Kostra: h1 → img s alt → h2 Suroviny + ul → h2 Postup + ol → table s caption, th a td → p s časom (môžeš použiť <code>&lt;time&gt;</code>).",
      kriteria: [
        { text: "Recept je v <code>article</code> s nadpisom <code>h1</code>", body: 2, test: function (d) { return !!t(d.querySelector("article h1")); } },
        { text: "Obrázok jedla s vyplneným <code>alt</code>", body: 1, test: function (d) { var i = d.querySelector("article img"); return !!i && !!(i.getAttribute("alt") || "").trim(); } },
        { text: "Zoznam surovín <code>ul</code> s aspoň 4 položkami", body: 2, test: function (d) { return [].some.call(d.querySelectorAll("ul"), function (u) { return u.querySelectorAll("li").length >= 4; }); } },
        { text: "Postup v <code>ol</code> s aspoň 3 krokmi", body: 2, test: function (d) { return [].some.call(d.querySelectorAll("ol"), function (u) { return u.querySelectorAll("li").length >= 3; }); } },
        { text: "Suroviny sú pred postupom", body: 1, test: function (d) { var u = d.querySelector("ul"), o = d.querySelector("ol"); return !!u && !!o && !!(u.compareDocumentPosition(o) & 4); } },
        { text: "Podnadpisy <code>h2</code> (aspoň 2)", body: 1, test: function (d) { return d.querySelectorAll("h2").length >= 2; } },
        { text: "Tabuľka s <code>caption</code>, hlavičkou <code>th</code> a aspoň 2 riadkami údajov", body: 3, test: function (d) { var tb = d.querySelector("table"); return !!tb && !!t(tb.querySelector("caption")) && !!tb.querySelector("th") && [].filter.call(tb.querySelectorAll("tr"), function (r) { return r.querySelector("td"); }).length >= 2; } },
        { text: "Uvedený čas prípravy (slovo „min“)", body: 1, test: function (d) { return /min/i.test(t(d.body)); } },
      ],
      riesenie: { html: '<article>\n  <h1>Palacinky</h1>\n  <img src="palacinky.jpg" alt="Kôpka palaciniek s džemom" width="200">\n  <p>Príprava: <time datetime="PT30M">30 min</time></p>\n  <h2>Suroviny</h2>\n  <ul>\n    <li>200 g múky</li>\n    <li>300 ml mlieka</li>\n    <li>2 vajcia</li>\n    <li>štipka soli</li>\n  </ul>\n  <h2>Postup</h2>\n  <ol>\n    <li>Všetko vymiešaj na hladké cesto.</li>\n    <li>Rozohrej panvicu s troškou oleja.</li>\n    <li>Opeč z oboch strán dozlatista.</li>\n  </ol>\n  <table>\n    <caption>Výživové hodnoty na 1 kus</caption>\n    <tr><th>Hodnota</th><th>Množstvo</th></tr>\n    <tr><td>Energia</td><td>120 kcal</td></tr>\n    <tr><td>Bielkoviny</td><td>5 g</td></tr>\n  </table>\n</article>' } },

    { id: "html-p3", nazov: "Prihláška na tábor", minut: 30,
      popis: "Vytvor prihlasovací formulár na letný tábor, ktorý by sa dal naozaj použiť.",
      zadanie: "Formulár má zbierať meno, e-mail, vek, termín tábora, veľkosť trička a poznámku. Polia musia mať popisy a povinné údaje sa musia kontrolovať. Odošli ho a pozri, čo by sa poslalo.",
      start: { html: '<h1>Prihláška na tábor</h1>\n<form action="prihlaska.php" method="post">\n  \n</form>' },
      napoveda: "Každé pole: <code>label for</code> + <code>input id name</code>. Termín: <code>select</code>. Tričko: <code>fieldset</code> s <code>legend</code> a <code>radio</code>. Poznámka: <code>textarea</code>.",
      kriteria: [
        { text: "Formulár sa posiela metódou <code>post</code>", body: 1, test: function (d) { var f = d.querySelector("form"); return !!f && (f.getAttribute("method") || "").toLowerCase() === "post"; } },
        { text: "Povinné meno (<code>text</code>, <code>required</code>)", body: 2, test: function (d) { var i = d.querySelector('form input[type="text"][required]'); return !!i && !!i.name; } },
        { text: "Povinný e-mail typu <code>email</code>", body: 2, test: function (d) { var i = d.querySelector('form input[type="email"]'); return !!i && i.required && !!i.name; } },
        { text: "Vek ako <code>number</code> s <code>min</code> a <code>max</code>", body: 2, test: function (d) { var i = d.querySelector('form input[type="number"]'); return !!i && i.hasAttribute("min") && i.hasAttribute("max") && !!i.name; } },
        { text: "Výber termínu v <code>select</code> (aspoň 2 možnosti)", body: 2, test: function (d) { var s = d.querySelector("form select"); return !!s && !!s.name && s.querySelectorAll("option").length >= 2; } },
        { text: "Veľkosť trička: aspoň 3 <code>radio</code> s rovnakým name vo <code>fieldset</code> s <code>legend</code>", body: 3, test: function (d) { var f = d.querySelector("form fieldset"); if (!f || !t(f.querySelector("legend"))) return false; var r = f.querySelectorAll('input[type="radio"]'); if (r.length < 3) return false; return [].every.call(r, function (x) { return x.name && x.name === r[0].name && x.value; }); } },
        { text: "Poznámka v <code>textarea</code>", body: 1, test: function (d) { var a = d.querySelector("form textarea"); return !!a && !!a.name; } },
        { text: "Všetky polia majú popis (<code>label</code>)", body: 2, test: function (d) { var p = [].filter.call(d.querySelectorAll("form input, form select, form textarea"), function (x) { return x.type !== "hidden" && x.type !== "submit"; }); return p.length > 0 && p.every(function (x) { return maPopis(d, x); }); } },
        { text: "Odosielacie tlačidlo", body: 1, test: function (d) { var b = d.querySelector('form button:not([type="button"]):not([type="reset"]), form input[type="submit"]'); return !!b; } },
      ],
      riesenie: { html: '<h1>Prihláška na tábor</h1>\n<form action="prihlaska.php" method="post">\n  <label for="meno">Meno a priezvisko *</label>\n  <input type="text" id="meno" name="meno" required>\n  <label for="email">E-mail rodiča *</label>\n  <input type="email" id="email" name="email" required>\n  <label for="vek">Vek</label>\n  <input type="number" id="vek" name="vek" min="7" max="15">\n  <label for="termin">Termín</label>\n  <select id="termin" name="termin">\n    <option value="1">1. – 7. júla</option>\n    <option value="2">8. – 14. júla</option>\n  </select>\n  <fieldset>\n    <legend>Veľkosť trička</legend>\n    <label><input type="radio" name="tricko" value="S"> S</label>\n    <label><input type="radio" name="tricko" value="M"> M</label>\n    <label><input type="radio" name="tricko" value="L"> L</label>\n  </fieldset>\n  <label for="pozn">Poznámka</label>\n  <textarea id="pozn" name="poznamka"></textarea>\n  <button>Odoslať prihlášku</button>\n</form>' } },
  ]);
})();
