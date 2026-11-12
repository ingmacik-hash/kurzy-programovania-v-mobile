/* SyntaxCode – záverečné projekty kurzu: zadanie, body hodnotenia, editor a vyhodnotenie v percentách.
   Projekt: { id:"html-p1", nazov, minut, popis, zadanie, karty, start, vstup, riesenie,
              kriteria:[{ text, body, test(detail, subory, vysledok) → true/false }], potrebne } */
(function () {
  var esc = K.esc;

  K.obrazovky.zaver = function (id) {
    var p = K.projekt(id || "");
    if (!p) return K.el('<div class="obal"><p>Projekt sa nenašiel.</p></div>');
    var kurzId = id.split("-")[0], kurz = K.kurz(kurzId), potrebne = p.potrebne || 70;
    if (!K.jeOdomknute(kurzId, id)) { setTimeout(function () { K.ist("kurz-" + kurzId, true); K.toast("Projekty sa odomknú po dokončení všetkých modulov."); }); return K.el("<div></div>"); }
    var predch = K.stav.zavery[id], karty = p.karty || ["html"];
    var ulozene = K.stav.zaverKod[id];

    var el = K.el('<div class="lekcia projekt-obr"><div class="lekcia-hore"><button type="button" class="ikona-btn" data-spat aria-label="Späť">' + K.ikona.spat + '</button><div class="medzera"><span class="stitok">Záverečný projekt · ' + esc(kurz.nazov) + '</span></div>' +
      (predch ? '<span class="chip" style="background:var(--surface-2)">najlepšie ' + predch.best + " %</span>" : "") + '</div>' +
      '<div class="lekcia-telo"><div class="obal"><h1 style="font-size:26px">' + esc(p.nazov) + '</h1><p class="tlmene" style="margin:0">' + p.popis + "</p>" +
      '<div class="karta kriteria"><span class="stitok">Hodnotí sa · treba aspoň ' + potrebne + ' %</span><ul>' +
      p.kriteria.map(function (c, i) { return '<li data-i="' + i + '"><span class="znak">' + (i + 1) + "</span><span>" + c.text + '</span><b class="body">' + (c.body || 1) + " b</b></li>"; }).join("") +
      '</ul></div><div data-uloha></div><div data-vysledok></div></div></div>' +
      '<div class="lekcia-dole"><div class="spatna-vazba" hidden></div><button type="button" class="btn plna" data-vyhodnot>Vyhodnotiť projekt</button></div></div>');
    el.style.setProperty("--farba", kurz.farba);

    var uloha = K.UlohaKod({ zadanie: p.zadanie, karty: karty, aktivna: p.aktivna, start: p.start, vyska: p.vyska || "300px", vyskaNahladu: p.vyskaNahladu || "260px", vstup: p.vstup, napoveda: p.napoveda, riesenie: null, kontrola: function () { return null; } },
      function () {}, { subory: ulozene ? JSON.parse(JSON.stringify(ulozene)) : null, bezNadpisu: false, onZmena: function (s) { K.stav.zaverKod[id] = s; ulozZaChvilu(); } });
    var tm; function ulozZaChvilu() { clearTimeout(tm); tm = setTimeout(K.uloz, 600); }
    el.querySelector("[data-uloha]").appendChild(uloha.el);

    var tl = el.querySelector("[data-vyhodnot]"), sv = el.querySelector(".spatna-vazba"), dole = el.querySelector(".lekcia-dole"), vysl = el.querySelector("[data-vysledok]");
    function oznac(vysledky) {
      K.$$(".kriteria li", el).forEach(function (li, i) {
        li.classList.remove("ok", "nie");
        if (vysledky) { li.classList.add(vysledky[i] ? "ok" : "nie"); li.querySelector(".znak").innerHTML = vysledky[i] ? "✓" : "✗"; }
      });
    }
    tl.onclick = function () {
      tl.disabled = true; tl.textContent = "Vyhodnocujem…";
      uloha.skontroluj(function (ok, sprava, detail) {
        tl.disabled = false; tl.textContent = "Vyhodnotiť znova";
        var s = uloha.editor.subory();
        if (!ok) { dole.className = "lekcia-dole zle"; sv.hidden = false; sv.innerHTML = "<div><b>Projekt sa nedá vyhodnotiť</b><p>" + esc(sprava) + "</p></div>"; oznac(null); vysl.innerHTML = ""; return; }
        var spolu = 0, ziskane = 0, vysledky = p.kriteria.map(function (c) {
          var b = c.body || 1, v = false; spolu += b;
          try { v = !!c.test(karty[0] === "py" || karty[0] === "cpp" ? (detail.vystup || "") : detail, s, detail); } catch (e) { v = false; }
          if (v) ziskane += b; return v;
        });
        var pct = Math.round(ziskane / spolu * 100), preslo = pct >= potrebne;
        var z = K.stav.zavery[id] || { best: 0, preslo: false }, prvyKrat = preslo && !z.preslo;
        z.best = Math.max(z.best, pct); z.preslo = z.preslo || preslo; K.stav.zavery[id] = z;
        var body = prvyKrat ? 100 : preslo ? 10 : 0;
        if (body) K.pridajXP(body); else K.uloz();
        oznac(vysledky);
        dole.className = "lekcia-dole " + (preslo ? "ok" : "zle"); sv.hidden = false;
        sv.innerHTML = "<div><b>" + (preslo ? "Projekt je splnený!" : "Ešte nie") + "</b><p>" + (preslo ? "Získal si " + pct + " %." + (body ? " +" + body + " XP" : "") : "Máš " + pct + " %, treba " + potrebne + " %. Pozri body označené ✗.") + "</p></div>";
        vysl.innerHTML = '<div class="karta vysledok-projektu" style="text-align:center"><div class="vysledok-testu" style="color:' + (preslo ? "var(--ok)" : "var(--bad)") + '">' + pct + ' %</div><p class="tlmene" style="margin:6px 0 0">' + ziskane + " z " + spolu + " bodov</p></div>";
        if (preslo) K.toast(prvyKrat ? "Projekt splnený! +100 XP" : "Projekt opäť splnený");
      });
    };
    function spat() { K.ist("kurz-" + kurzId, true); }
    el.querySelector("[data-spat]").onclick = spat;
    K._spatHandler = spat;
    K._upratat = function () { K._spatHandler = null; uloha.upratat(); K.uloz(); };
    return el;
  };
})();
