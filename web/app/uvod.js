/* SyntaxCode – úvod pre nových používateľov, dotazník a osobný študijný plán.
   Obrazovky: #uvod (ako funguje aplikácia), #dotaznik (otázky), #plan (odporúčania a plán).
   Všetko sa ukladá len v K.stav (v zariadení). */
(function () {
  var esc = K.esc;

  /* ---------- čísla z obsahu kurzov ---------- */
  K.statKurzu = function (id) {
    var mod = K.moduly[id] || [], s = { moduly: mod.length, lekcie: 0, kroky: 0, minut: 0, projekty: (K.zavery[id] || []).length };
    mod.forEach(function (m) {
      m.lekcie.forEach(function (l) { s.lekcie++; s.kroky += l.kroky.length; s.minut += l.minut || 5; });
      if (m.test) s.minut += Math.max(5, Math.round(m.test.otazky.length * 0.6));
    });
    (K.zavery[id] || []).forEach(function (p) { s.minut += p.minut || 20; });
    return s;
  };
  /* Minúty z plánu, ktoré už má používateľ za sebou (podľa dokončených lekcií, testov a projektov). */
  K.hotoveMinuty = function (id) {
    var spolu = 0;
    K.polozkyKurzu(id).forEach(function (p) {
      if (!K.jeHotove(p)) return;
      if (p.typ === "lekcia") spolu += p.lekcia.minut || 5;
      else if (p.typ === "test") spolu += Math.max(5, Math.round(p.modul.test.otazky.length * 0.6));
      else spolu += p.projekt.minut || 20;
    });
    return spolu;
  };
  function suhrn() {
    var k = 0, l = 0, kr = 0, mn = [], kMin = 99, kMax = 0;
    K.katalog.forEach(function (x) { (K.moduly[x.id] || []).forEach(function (m) { m.lekcie.forEach(function (le) { kMin = Math.min(kMin, le.kroky.length); kMax = Math.max(kMax, le.kroky.length); }); }); });
    K.katalog.forEach(function (x) { var s = K.statKurzu(x.id); if (!s.lekcie) return; k++; l += s.lekcie; kr += s.kroky; mn.push(s.minut); });
    mn.sort(function (a, b) { return a - b; });
    return { kurzy: k, lekcie: l, kroky: kr, minH: Math.round(mn[0] / 60), maxH: Math.round(mn[mn.length - 1] / 60), krokovNaLekciu: Math.round(kr / l), kMin: kMin, kMax: kMax };
  }
  function hodiny(min) { var h = min / 60; return h < 1 ? Math.round(min) + " min" : (h < 10 ? (Math.round(h * 2) / 2).toString().replace(".", ",") : Math.round(h)) + " h"; }
  function datum(d) { var p = d.split("-"); return +p[2] + ". " + +p[1] + ". " + p[0]; }
  function tyzdne(n) { return n === 1 ? "1 týždeň" : n < 5 ? n + " týždne" : n + " týždňov"; }

  /* ---------- 1) úvod: ako funguje SyntaxCode ---------- */
  function ikonaKruh(svg, farba) { return '<span class="uv-ik" style="--f:' + (farba || "var(--accent)") + '">' + svg + "</span>"; }
  var IK = {
    kniha: '<svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h7"/></svg>',
    otazka: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.01"/></svg>',
    doplnit: '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="2"/><path d="M9 12h6" stroke-dasharray="2 2"/></svg>',
    poradie: '<svg viewBox="0 0 24 24"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
    kod: '<svg viewBox="0 0 24 24"><path d="m9 8-4 4 4 4M15 8l4 4-4 4"/></svg>',
    ciel: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  };
  function stranyUvodu() {
    var s = suhrn(), py = K.statKurzu("python");
    return [
      { nadpis: "Vitaj v SyntaxCode", obr: '<div class="uv-logo">Syntax<b>Code</b></div>',
        text: "<p>Naučíš sa programovať <b>po slovensky</b>, v malých krokoch a priamo v telefóne. Nepotrebuješ počítač ani žiadne skúsenosti.</p>" +
          '<ul class="uv-body"><li><b>' + s.kurzy + " programovacích jazykov</b>, od HTML a Pythonu po C a Javu</li><li><b>" + s.lekcie + " lekcií</b> s úlohami, ktoré si hneď vyskúšaš</li><li>Kód sa <b>spustí a skontroluje</b> hneď, ako ho napíšeš</li><li>Chyby ti vysvetlíme <b>po slovensky</b>, nie v angličtine</li></ul>" +
          "<p class=\"tlmene\">Na nasledujúcich stránkach ti ukážeme, ako sa v aplikácii učí. Potom sa ťa opýtame na pár vecí a zostavíme ti <b>osobný plán</b>.</p>" },
      { nadpis: "Ako je kurz poskladaný", obr:
          '<div class="uv-strom"><div class="uv-uroven" style="--f:#3572a5"><b>Kurz</b><span>napr. Python · ' + py.moduly + " modulov</span></div>" +
          '<div class="uv-uroven" style="--f:#6a3fc9"><b>Modul</b><span>jedna téma · 5 lekcií + test</span></div>' +
          '<div class="uv-uroven" style="--f:#11805b"><b>Lekcia</b><span>' + s.kMin + " až " + s.kMax + " krokov · asi 8 minút</span></div>" +
          '<div class="uv-uroven" style="--f:#c96a00"><b>Krok</b><span>jedna malá vec: vysvetlenie alebo úloha</span></div></div>',
        text: "<p>Každý <b>kurz</b> učí jeden programovací jazyk. Je rozdelený na <b>moduly</b>, teda väčšie témy, napríklad „Podmienky“ alebo „Cykly“.</p>" +
          "<p>Modul má <b>5 lekcií</b> a na konci <b>test</b>. Lekcia sa skladá z <b>krokov</b>: v jednom kroku sa niečo dozvieš alebo si to hneď vyskúšaš. Jedna lekcia trvá zvyčajne 7 až 10 minút, takže ju zvládneš aj cestou autobusom.</p>" +
          "<p>Na konci kurzu sú <b>3 záverečné projekty</b>, väčšie programy, v ktorých použiješ všetko, čo si sa naučil. Celý kurz trvá podľa jazyka približne <b>" + s.minH + " až " + s.maxH + " hodín</b> čistého času.</p>" },
      { nadpis: "Čo ťa čaká v lekcii", obr: "",
        text: '<div class="uv-typy">' +
          '<div>' + ikonaKruh(IK.kniha) + "<p><b>Vysvetlenie</b>Prečítaš si novú vec s príkladom. Ak chceš viac, prepni na <i>Podrobne</i>.</p></div>" +
          '<div>' + ikonaKruh(IK.otazka, "#6a3fc9") + "<p><b>Otázka</b>Vyberieš správnu odpoveď. Po odpovedi uvidíš, prečo je správna.</p></div>" +
          '<div>' + ikonaKruh(IK.doplnit, "#11805b") + "<p><b>Doplň</b>V kóde chýba kúsok a ty ho doplníš.</p></div>" +
          '<div>' + ikonaKruh(IK.poradie, "#c96a00") + "<p><b>Zoraď</b>Poprehadzované riadky kódu poukladáš do správneho poradia.</p></div>" +
          '<div>' + ikonaKruh(IK.kod, "#c03a31") + "<p><b>Napíš kód</b>Napíšeš vlastný kód, stlačíš Spustiť a aplikácia skontroluje výsledok. Keď nevieš ďalej, ťukni na <i>Nápoveda</i>.</p></div></div>" +
          "<p class=\"tlmene\">Pomýliť sa je v poriadku. Odpoveď môžeš opraviť a pokračovať. Šípkou vľavo hore sa vrátiš na predchádzajúci krok.</p>" },
      { nadpis: "Odomykanie, testy a projekty", obr: "",
        text: '<ol class="uv-kroky"><li><b>Lekcie idú za sebou.</b> Ďalšia sa odomkne, keď dokončíš predchádzajúcu. Hotovú lekciu si môžeš kedykoľvek zopakovať.</li>' +
          "<li><b>Test modulu</b> príde po piatich lekciách. Na úspech potrebuješ aspoň <b>70 %</b> správnych odpovedí. Keď to nevyjde, nevadí. Aplikácia ti ukáže, ktoré lekcie si zopakovať, a test môžeš skúsiť znova.</li>" +
          "<li><b>Záverečné projekty</b> sa odomknú po všetkých moduloch kurzu. Projekt má zoznam bodov hodnotenia a splníš ho pri <b>70 %</b>.</li>" +
          "<li><b>Kurzy sú všetky otvorené.</b> Môžeš ich striedať, ako chceš. Plán, ktorý ti zostavíme, je len odporúčanie.</li></ol>" },
      { nadpis: "Body XP, séria a odznaky", obr: "",
        text: '<table class="uv-tab"><tr><td>Správne vyriešený krok</td><td><b>+5 XP</b></td></tr><tr><td>Úloha s kódom</td><td><b>+10 XP</b></td></tr><tr><td>Prvé dokončenie lekcie</td><td><b>+10 XP</b> navyše</td></tr><tr><td>Úspešný test (prvýkrát)</td><td><b>+50 XP</b> a 2 XP za každú správnu odpoveď</td></tr><tr><td>Splnený záverečný projekt</td><td><b>+100 XP</b></td></tr><tr><td>Krok pri opakovaní</td><td><b>+3 XP</b></td></tr></table>' +
          "<p><b>XP</b> (z angl. <i>experience points</i>, body skúseností) ukazujú, koľko si sa už naučil. Nedajú sa minúť ani stratiť.</p>" +
          '<p><span class="chip ohen">' + K.ikona.ohen + "3</span> <b>Séria</b> je počet dní za sebou, v ktorých si dokončil aspoň jednu lekciu. Keď vynecháš deň, séria začne znova od 1.</p>" +
          "<p><b>Denný cieľ</b> je počet minút, ktoré chceš denne stráviť v lekciách. Na domovskej obrazovke ho ukazuje krúžok. <b>Odznaky</b> získaš za míľniky, napríklad prvý test alebo týždeň za sebou.</p>" },
      { nadpis: "Opakovanie, aby si nezabudol", obr:
          '<div class="uv-krabice">' + ["dnes", "o 1 deň", "o 3 dni", "o 7 dní", "o 14 dní"].map(function (t, i) { return '<div style="--i:' + i + '"><b>' + (i + 1) + "</b><span>" + t + "</span></div>"; }).join("") + "</div>",
        text: "<p>Keď sa v lekcii alebo teste pomýliš, otázka sa ti vráti na <b>opakovanie</b>: prvýkrát ešte v ten istý deň, potom o 1, 3, 7 a 14 dní. Po každej správnej odpovedi sa interval predĺži a po poslednej otázka z opakovania zmizne. Ak sa pomýliš znova, začne sa odznova.</p>" +
          "<p>Vďaka tomu sa ti vracia presne to, čo ti ešte nejde, a vedomosti ti zostanú v hlave. Keď sa na domovskej obrazovke objaví karta <b>Opakovanie</b>, urob ju ako prvú. Trvá len chvíľu.</p>" },
      { nadpis: "Vysvetlenie podľa teba", obr:
          '<div class="uroven uv-ukazka"><button type="button" class="">Stručne</button><button type="button" class="on">Podrobne</button><button type="button">Do hĺbky</button></div>',
        text: "<ul class=\"uv-body\"><li><b>Stručne</b>: len to najdôležitejšie v pár vetách.</li><li><b>Podrobne</b>: viac príkladov, prirovnania a na čo si dať pozor. Odporúčame pre začiatočníkov.</li><li><b>Do hĺbky</b>: ako to funguje vo vnútri a súvislosti. Pre zvedavých.</li></ul>" +
          "<p>Úroveň prepneš v lekcii priamo nad vysvetlením alebo natrvalo v Profile. Pri ďalších vysvetleniach sa ti ukáže tá úroveň, ktorú si zvolil naposledy.</p>" +
          "<p>Ďalšie pomocníky: <b>Slovník</b> vysvetlí každý symbol, napríklad <code>{ }</code> alebo <code>==</code>, a chyby prekladača ti preložíme do slovenčiny. Tvoj pokrok sa ukladá <b>len v tomto zariadení</b>.</p>" },
      { nadpis: "Teraz ty", obr: '<div class="uv-logo" style="font-size:48px">' + ikonaKruh(IK.ciel) + "</div>",
        text: "<p>Opýtame sa ťa na <b>8 krátkych otázok</b>: čo vieš, čomu sa venuješ, čo chceš dosiahnuť a koľko máš času. Zaberie to asi minútu.</p><p>Podľa odpovedí ti odporučíme, s ktorým jazykom začať, v akom poradí pokračovať a koľko to potrvá. Odpovede zostanú len v tvojom zariadení a môžeš ich kedykoľvek zmeniť.</p>" },
    ];
  }

  K.obrazovky.uvod = function (param) {
    var strany = stranyUvodu(), i = Math.max(0, Math.min(strany.length - 1, (+param || 1) - 1));
    var maPlan = !!(K.stav.plan && K.stav.plan.kurzy);
    var el = K.el('<div class="obal uv"><div class="uv-hore"><button type="button" class="ikona-btn" data-spat aria-label="Späť">' + K.ikona.spat + '</button><div class="uv-bodky"></div><button type="button" class="uv-preskocit" data-preskocit>' + (maPlan ? "Zavrieť" : "Preskočiť") + '</button></div><div class="uv-telo"></div><div class="uv-dole"><button type="button" class="btn plna" data-dalej></button></div></div>');
    var telo = el.querySelector(".uv-telo"), dalej = el.querySelector("[data-dalej]"), bodky = el.querySelector(".uv-bodky");
    function hotovo() { K.stav.uvodVideny = true; K.uloz(); }
    function kresli() {
      var s = strany[i], posledna = i === strany.length - 1;
      bodky.innerHTML = strany.map(function (_, j) { return "<i" + (j === i ? ' class="on"' : j < i ? ' class="za"' : "") + "></i>"; }).join("");
      telo.innerHTML = (s.obr ? '<div class="uv-obr">' + s.obr + "</div>" : "") + "<h1>" + s.nadpis + "</h1>" + s.text;
      dalej.textContent = posledna ? (maPlan ? "Upraviť môj plán" : "Zostaviť môj plán") : "Ďalej";
      el.querySelector("[data-spat]").style.visibility = i ? "visible" : "hidden";
      K.$("#obrazovka").scrollTop = 0;
    }
    function spat() { if (i > 0) { i--; kresli(); } else { hotovo(); K.ist(maPlan ? "plan" : "domov", true); } }
    dalej.onclick = function () { if (i < strany.length - 1) { i++; kresli(); } else { hotovo(); K.ist("dotaznik", true); } };
    el.querySelector("[data-spat]").onclick = spat;
    el.querySelector("[data-preskocit]").onclick = function () { hotovo(); K.ist(maPlan ? "plan" : "dotaznik", true); };
    K._spatHandler = spat;
    K._upratat = function () { K._spatHandler = null; };
    kresli();
    return el;
  };

  /* ---------- 2) dotazník ---------- */
  K.OTAZKY = [
    { id: "vek", otazka: "Koľko máš rokov?", pomoc: "Podľa veku prispôsobíme odporúčania a výber jazykov.", volby: [["do12", "Menej ako 12"], ["13-17", "13 až 17"], ["18-25", "18 až 25"], ["26-45", "26 až 45"], ["46-60", "46 až 60"], ["60+", "Viac ako 60"]] },
    { id: "skusenosti", otazka: "Programoval si už niekedy?", volby: [["nic", "Nie, úplne začínam", "Nevadí. Aplikácia je stavaná presne pre teba."], ["trochu", "Trochu som skúšal", "Napríklad v škole, podľa videa alebo v inej aplikácii."], ["zaklady", "Ovládam základy", "Viem, čo je premenná, podmienka a cyklus."], ["pokrocily", "Programujem pravidelne", "Chcem sa naučiť nový jazyk alebo doplniť medzery."]] },
    { id: "cinnost", otazka: "Čomu sa teraz venuješ?", volby: [["zs", "Chodím na základnú školu"], ["ss", "Študujem na strednej škole"], ["vs", "Študujem na vysokej škole"], ["it", "Pracujem v IT"], ["praca", "Pracujem mimo IT"], ["hladam", "Hľadám prácu alebo som na rodičovskej"], ["dochodca", "Som na dôchodku"]] },
    { id: "preco", otazka: "Prečo sa chceš učiť programovať?", volby: [["profesia", "Chcem sa tým živiť", "Zmeniť prácu alebo začať kariéru v IT."], ["skola", "Chcem sa zlepšiť v škole", "Informatika, maturita, skúšky alebo prijímačky."], ["praca", "Pomôže mi to v práci", "Automatizovať úlohy, pracovať s dátami, rozumieť kolegom z IT."], ["projekt", "Mám vlastný nápad", "Web, hra, aplikácia alebo nástroj pre seba."], ["zabava", "Len pre radosť", "Zaujíma ma, ako to funguje, a chcem si potrénovať hlavu."]] },
    { id: "zaujem", multi: true, otazka: "Čo by si chcel vytvárať?", pomoc: "Môžeš vybrať aj viac možností.", volby: [["web", "Webové stránky", "Stránky, e-shopy, portfólio"], ["aplikacie", "Aplikácie", "Pre mobil aj počítač"], ["data", "Dáta a umelú inteligenciu", "Tabuľky, grafy, analýzy, AI"], ["hry", "Hry", "Od jednoduchých po 3D"], ["automatizacia", "Automatizáciu", "Programy, ktoré urobia nudnú prácu za teba"], ["neviem", "Ešte neviem", "Chcem najprv vyskúšať, čo ma chytí"]] },
    { id: "ciel", otazka: "Kam sa chceš dostať?", volby: [["zaklady", "Pochopiť základy", "Vedieť, ako programy fungujú, a prečítať jednoduchý kód."], ["samostatne", "Písať vlastné programy", "Samostatne vytvoriť menší program alebo stránku."], ["junior", "Pripraviť sa na prácu", "Vedomosti na úrovni začínajúceho (junior) programátora."]] },
    { id: "minut", otazka: "Koľko času denne môžeš venovať učeniu?", pomoc: "Lepšie menej a pravidelne ako veľa raz za čas. Zmeniť to môžeš kedykoľvek v Profile.", volby: [["5", "5 minút", "Kratšia lekcia"], ["10", "10 minút", "Približne jedna lekcia"], ["20", "20 minút", "Dve lekcie alebo test"], ["30", "30 minút", "Tri lekcie"], ["45", "45 minút", "Poriadny tréning"], ["60", "Hodinu a viac", "Intenzívne štúdium"]] },
    { id: "dni", otazka: "Koľko dní v týždni sa chceš učiť?", pomoc: "Na sériu stačí jedna lekcia denne, ale oddych je tiež v poriadku.", volby: [["3", "3 dni v týždni"], ["5", "5 dní v týždni", "Napríklad cez pracovné dni"], ["7", "Každý deň", "Najlepšie pre sériu"]] },
  ];

  K.obrazovky.dotaznik = function (param) {
    var odp = JSON.parse(JSON.stringify((K.stav.plan && K.stav.plan.odpovede) || {}));
    var i = Math.max(0, Math.min(K.OTAZKY.length - 1, (+param || 1) - 1));
    var el = K.el('<div class="obal uv"><div class="uv-hore"><button type="button" class="ikona-btn" data-spat aria-label="Späť">' + K.ikona.spat + '</button><div class="pruh uv-pruh"><i></i></div><button type="button" class="uv-preskocit" data-preskoc>Preskočiť</button></div><div class="uv-telo"></div><div class="uv-dole"><button type="button" class="btn plna" data-dalej>Ďalej</button></div></div>');
    var telo = el.querySelector(".uv-telo"), dalej = el.querySelector("[data-dalej]");
    function vybrane(q) { var v = odp[q.id]; return q.multi ? (v && v.length) : !!v; }
    function kresli() {
      var q = K.OTAZKY[i], v = odp[q.id];
      el.querySelector(".uv-pruh i").style.width = Math.round(i / K.OTAZKY.length * 100) + "%";
      telo.innerHTML = '<span class="stitok">Otázka ' + (i + 1) + " z " + K.OTAZKY.length + "</span><h1>" + q.otazka + "</h1>" + (q.pomoc ? '<p class="tlmene" style="margin:0">' + q.pomoc + "</p>" : "") +
        '<div class="volby' + (q.multi ? " multi" : "") + '" role="' + (q.multi ? "group" : "radiogroup") + '">' + q.volby.map(function (o) {
          var on = q.multi ? (v || []).indexOf(o[0]) >= 0 : v === o[0];
          return '<button type="button" class="volba-uv' + (on ? " on" : "") + '" data-v="' + o[0] + '" aria-pressed="' + on + '"><span class="znacka"></span><span><b>' + esc(o[1]) + "</b>" + (o[2] ? "<small>" + esc(o[2]) + "</small>" : "") + "</span></button>";
        }).join("") + "</div>";
      dalej.disabled = !vybrane(q);
      dalej.textContent = i === K.OTAZKY.length - 1 ? "Zostaviť plán" : "Ďalej";
      K.$("#obrazovka").scrollTop = 0;
    }
    telo.addEventListener("click", function (e) {
      var b = e.target.closest("[data-v]"); if (!b) return;
      var q = K.OTAZKY[i], v = b.dataset.v;
      if (q.multi) {
        var a = (odp[q.id] || []).slice(), x = a.indexOf(v);
        if (x >= 0) a.splice(x, 1); else { if (v === "neviem") a = []; else a = a.filter(function (z) { return z !== "neviem"; }); a.push(v); }
        odp[q.id] = a; kresli();
      } else { odp[q.id] = v; kresli(); setTimeout(function () { if (K.OTAZKY[i] === q && odp[q.id] === v) dalej.click(); }, 260); }
    });
    function dokonci() {
      K.stav.plan = K.zostavPlan(odp); K.stav.uvodVideny = true;
      K.stav.nast.ciel = K.stav.plan.minut;
      if (odp.skusenosti === "nic" || odp.skusenosti === "trochu") K.stav.nast.uroven = Math.max(1, K.stav.nast.uroven); else if (odp.skusenosti === "pokrocily") K.stav.nast.uroven = 0;
      K.uloz(); K.ist("plan", true);
    }
    dalej.onclick = function () { if (!vybrane(K.OTAZKY[i])) return; if (i < K.OTAZKY.length - 1) { i++; kresli(); } else dokonci(); };
    el.querySelector("[data-preskoc]").onclick = function () { delete odp[K.OTAZKY[i].id]; if (i < K.OTAZKY.length - 1) { i++; kresli(); } else dokonci(); };
    function spat() { if (i > 0) { i--; kresli(); } else K.ist(K.stav.plan ? "plan" : "uvod-8", true); }
    el.querySelector("[data-spat]").onclick = spat;
    K._spatHandler = spat;
    K._upratat = function () { K._spatHandler = null; };
    kresli();
    return el;
  };

  /* ---------- 3) zostavenie plánu ---------- */
  var CESTY = {
    web: { zaklad: ["html", "css", "js"], dalej: ["php", "sql"], nazov: "webové stránky" },
    aplikacie: { zaklad: ["python", "kotlin"], dalej: ["java", "csharp"], nazov: "aplikácie" },
    data: { zaklad: ["python", "sql"], dalej: ["js"], nazov: "dáta a umelú inteligenciu" },
    hry: { zaklad: ["python", "csharp"], dalej: ["cpp"], nazov: "hry" },
    automatizacia: { zaklad: ["python", "sql"], dalej: ["js"], nazov: "automatizáciu" },
    neviem: { zaklad: ["python", "html", "css"], dalej: ["js"], nazov: "" },
  };
  var PRECO_KURZ = {
    html: "Základ každej webovej stránky. Výsledok uvidíš hneď, preto je to výborný začiatok.",
    css: "Z obyčajnej stránky spraví peknú. Farby, písmo a rozloženie aj na mobile.",
    js: "Oživí stránky: reaguje na kliknutia, počíta a mení obsah. Jazyk číslo jeden na webe.",
    python: "Najčitateľnejší jazyk a najlepší prvý krok. Používa sa v automatizácii, dátach aj umelej inteligencii.",
    sql: "Jazyk databáz. Hodí sa takmer v každej práci s dátami a pri každom väčšom webe.",
    php: "Beží na serveri za veľkou časťou webov, napríklad WordPress. Spracuje formuláre a dáta.",
    kotlin: "Moderný jazyk na aplikácie pre Android, odporúčaný Googlom.",
    java: "Robustný jazyk pre Android, veľké firemné systémy a servery. Často sa učí na vysokých školách.",
    csharp: "Jazyk hier v Unity, aplikácií pre Windows a webových služieb.",
    cpp: "Rýchly jazyk hier, grafiky a výkonných programov. Náročnejší, ale veľa ťa naučí.",
    c: "Ukáže ti, ako počítač pracuje s pamäťou. Základ operačných systémov a elektroniky.",
    smalltalk: "Historický jazyk, ktorý vymyslel objektové programovanie. Zaujímavý pohľad na to, ako môže programovanie vyzerať.",
  };
  function unik(a) { var o = []; a.forEach(function (x) { if (o.indexOf(x) < 0 && K.moduly[x] && K.moduly[x].length) o.push(x); }); return o; }

  K.zostavPlan = function (o) {
    var zaujmy = (o.zaujem && o.zaujem.length ? o.zaujem : ["neviem"]).filter(function (z) { return CESTY[z]; });
    if (!zaujmy.length) zaujmy = ["neviem"];
    var zaklad = [], dalej = [];
    if (o.preco === "skola") {
      if (o.cinnost === "vs") zaklad = zaklad.concat(["python", "c", "java"]);
      else zaklad = zaklad.concat(["python", "html"]);
    }
    zaujmy.forEach(function (z) { zaklad = zaklad.concat(CESTY[z].zaklad); dalej = dalej.concat(CESTY[z].dalej); });
    var deti = o.vek === "do12";
    if (deti) { var mimo = ["c", "cpp", "java", "csharp", "php", "kotlin"]; dalej = dalej.concat(zaklad.filter(function (x) { return mimo.indexOf(x) >= 0; })); zaklad = zaklad.filter(function (x) { return mimo.indexOf(x) < 0; }); if (!zaklad.length) zaklad = ["python", "html", "css"]; }
    zaklad = unik(zaklad); dalej = unik(dalej).filter(function (x) { return zaklad.indexOf(x) < 0; });
    var kurzy;
    if (o.ciel === "zaklady") kurzy = zaklad.slice(0, 2);
    else if (o.ciel === "junior" || o.preco === "profesia") {
      kurzy = zaklad.concat(dalej);
      if (kurzy.indexOf("sql") < 0) kurzy.push("sql");
      if ((o.skusenosti === "zaklady" || o.skusenosti === "pokrocily") && kurzy.indexOf("c") < 0 && !deti) kurzy.push("c");
      kurzy = unik(kurzy).slice(0, 7);
    } else kurzy = zaklad.slice(0, 4);
    if (o.preco === "zabava" && (o.skusenosti === "zaklady" || o.skusenosti === "pokrocily")) kurzy.push("smalltalk");
    kurzy = unik(kurzy); if (!kurzy.length) kurzy = ["python"];
    var minut = +o.minut || 10, dni = +o.dni || 5;
    var faktor = { nic: 1.3, trochu: 1.15, zaklady: 1, pokrocily: 0.75 }[o.skusenosti] || 1.2;
    return { verzia: 1, odpovede: o, kurzy: kurzy, minut: minut, dni: dni, faktor: faktor, zaciatok: K.den() };
  };

  /* Harmonogram: pre každý kurz týždne a dátum dokončenia. */
  K.harmonogram = function (plan) {
    var tyzdenne = plan.minut * plan.dni, den = plan.zaciatok, spolu = 0;
    return plan.kurzy.map(function (id) {
      var s = K.statKurzu(id), potreba = Math.round(s.minut * plan.faktor);
      var od = spolu; spolu += potreba;
      var dniDo = Math.ceil(spolu / tyzdenne * 7);
      return { id: id, kurz: K.kurz(id), stat: s, minut: potreba, odTyzden: Math.floor(od / tyzdenne) + 1, doTyzden: Math.max(1, Math.ceil(spolu / tyzdenne)), koniec: K.posunDen(den, dniDo) };
    });
  };
  /* Ako je na tom používateľ oproti plánu. */
  K.stavPlanu = function (plan) {
    var h = K.harmonogram(plan), dnes = K.den();
    var ubehloDni = Math.max(0, Math.round((new Date(dnes) - new Date(plan.zaciatok)) / 864e5));
    var ocakavane = ubehloDni / 7 * plan.minut * plan.dni, hotove = 0, spolu = 0, aktualny = null;
    h.forEach(function (x) {
      var hm = Math.min(x.minut, Math.round(K.hotoveMinuty(x.id) * plan.faktor));
      var hotovyKurz = !K.dalsiaPolozka(x.id);
      hotove += hotovyKurz ? x.minut : hm; spolu += x.minut;
      if (!aktualny && !hotovyKurz) aktualny = { x: x, pct: K.pokrokKurzu(x.id).pct };
    });
    var rozdiel = hotove - ocakavane, stav = ubehloDni < 2 ? "start" : rozdiel >= plan.minut * 2 ? "naskok" : rozdiel >= -plan.minut * plan.dni * 0.5 ? "podla" : "sklz";
    return { h: h, aktualny: aktualny, pct: spolu ? Math.min(100, Math.round(hotove / spolu * 100)) : 0, stav: stav, poradie: aktualny ? h.indexOf(aktualny.x) + 1 : h.length };
  };

  /* ---------- 4) odporúčania ---------- */
  K.odporucania = function (plan) {
    var o = plan.odpovede || {}, r = [], h = K.harmonogram(plan), posl = h[h.length - 1];
    var tyzdenne = plan.minut * plan.dni, mesiace = Math.max(1, Math.round(posl.doTyzden / 4.3));
    var zac = o.skusenosti === "nic" || o.skusenosti === "trochu" || !o.skusenosti;
    r.push({ ik: "ohen", nadpis: "Pravidelnosť je dôležitejšia ako dĺžka", text: plan.minut + " minút " + (plan.dni === 7 ? "každý deň" : plan.dni + "-krát do týždňa") + " je " + hodiny(tyzdenne) + " týždenne. S týmto tempom zvládneš celý plán približne za " + (mesiace === 1 ? "mesiac" : mesiace < 5 ? mesiace + " mesiace" : mesiace + " mesiacov") + ". Mozog si nové veci najlepšie ukladá v krátkych dávkach so spánkom medzi nimi, preto sa oplatí učiť sa po kúskoch, ale často." });
    if (zac) r.push({ ik: "fajka", nadpis: "Chyby sú súčasť učenia", text: "Každý programátor robí chyby, aj ten najskúsenejší. Keď kód nefunguje, prečítaj si slovenské vysvetlenie chyby. Keď niečo nie je jasné, prepni vysvetlenie na Podrobne. Začiatok je najťažší, ale po prvých dvoch moduloch sa veci začnú spájať." });
    if (o.preco === "profesia" || o.ciel === "junior") r.push({ ik: "projekt", nadpis: "Cesta k prvej práci", text: "Firmy pri juniorovi najviac zaujímajú vlastné projekty. Záverečné projekty v každom kurze sú dobrý začiatok portfólia, preto ich dokonči všetky. Neskôr si urob aj vlastný projekt, ktorý ťa baví. Popri tom sa oplatí naučiť Git a čítať po anglicky. Buď trpezlivý: cesta k prvej práci v IT trvá väčšine ľudí rok a viac." });
    if (o.preco === "skola") r.push({ ik: "test", nadpis: "Prepoj to so školou", text: "Keď v škole preberáte novú tému, nájdi si k nej lekciu tu a vyskúšaj si ju v telefóne. Testy modulov sú dobrá príprava na písomky a opakovanie ti pomôže nezabudnúť to pred skúškou." });
    if (o.preco === "praca") r.push({ ik: "blesk", nadpis: "Hľadaj úlohy na automatizáciu", text: "Všímaj si v práci úlohy, ktoré robíš stále dookola: prepisovanie tabuliek, premenovanie súborov, kontrolu údajov. Každá taká úloha je ideálny prvý vlastný program a najlepšia motivácia." });
    if (o.preco === "projekt") r.push({ ik: "hviezda", nadpis: "Tvoj nápad je najlepší motor", text: "Zapíš si svoj nápad a rozdeľ ho na malé časti. Po každom module si skús, či už vieš urobiť niektorú z nich. Nemusí byť dokonalý: prvá verzia každého programu je jednoduchá." });
    if (o.preco === "zabava") r.push({ ik: "hviezda", nadpis: "Bez stresu a s radosťou", text: "Nikam sa neponáhľaš, tak si každú lekciu vychutnaj. Skúšaj meniť príklady a sleduj, čo sa stane. Zvedavosť je pre programátora najlepšia vlastnosť." });
    if (o.vek === "do12") r.push({ ik: "fajka", nadpis: "Uč sa s niekým", text: "Ukáž svoje programy rodičom alebo kamarátom a vymýšľajte spolu, čo by mohli robiť. Začni HTML alebo Pythonom: výsledok uvidíš hneď." });
    if (o.vek === "46-60" || o.vek === "60+" || o.cinnost === "dochodca") r.push({ ik: "fajka", nadpis: "Na veku nezáleží", text: "Programovať sa dá naučiť v každom veku. Tvoja výhoda sú skúsenosti a trpezlivosť. Vyber si tempo, ktoré ti vyhovuje, a lekcie si pokojne opakuj. Aplikácia ťa nikam nesúri." });
    if (plan.minut <= 10) r.push({ ik: "ohen", nadpis: "Aj pár minút stačí", text: "Prepoj učenie s niečím, čo robíš každý deň: s rannou kávou, cestou autobusom alebo pred spaním. Malý zvyk, ktorý sa opakuje, prekoná veľké predsavzatia." });
    if (plan.minut >= 45) r.push({ ik: "opak", nadpis: "Rob si prestávky", text: "Po 25 až 30 minútach si daj 5 minút oddych. Pri dlhšom učení sa pozornosť znižuje a krátka prestávka ti pomôže zapamätať si viac." });
    if (o.cinnost === "praca" || o.cinnost === "it") r.push({ ik: "ohen", nadpis: "Jeden pevný čas", text: "Ľudia popri práci najlepšie vydržia, keď majú na učenie pevný čas, napríklad ráno pred prácou alebo cez obed. Večer po náročnom dni sa učí ťažšie." });
    r.push({ ik: "opak", nadpis: "Opakovanie má prednosť", text: "Keď sa na domovskej obrazovke ukáže karta Opakovanie, začni ňou. Pár otázok ti zaberie minútu a vedomosti ti zostanú natrvalo." });
    return r.slice(0, 5);
  };

  /* ---------- 5) obrazovka plánu ---------- */
  K.obrazovky.plan = function () {
    var plan = K.stav.plan;
    if (!plan || !plan.kurzy) { setTimeout(function () { K.ist("dotaznik", true); }); return K.el("<div></div>"); }
    var sp = K.stavPlanu(plan), h = sp.h, o = plan.odpovede || {}, posl = h[h.length - 1];
    var ciel = { zaklady: "pochopiť základy", samostatne: "písať vlastné programy", junior: "pripraviť sa na prácu programátora" }[o.ciel];
    var smery = (o.zaujem || []).map(function (z) { return CESTY[z] && CESTY[z].nazov; }).filter(Boolean);
    var html = '<div class="obal"><div class="riadok"><button type="button" class="ikona-btn" data-spat aria-label="Späť">' + K.ikona.spat + '</button><div><span class="stitok">Osobný študijný plán</span><h1 style="font-size:26px">Tvoj plán</h1></div></div>' +
      '<div class="karta plan-suhrn"><p style="margin:0">' + (ciel ? "Cieľ: <b>" + ciel + "</b>" : "Plán na mieru") + (smery.length ? ". Smer: <b>" + smery.join(", ") + "</b>." : ".") + "</p>" +
      '<div class="plan-cisla"><div><b>' + plan.minut + " min</b><span>denne</span></div><div><b>" + plan.dni + "×</b><span>do týždňa</span></div><div><b>" + h.length + "</b><span>" + (h.length === 1 ? "kurz" : h.length < 5 ? "kurzy" : "kurzov") + "</span></div><div><b>" + datum(posl.koniec) + "</b><span>odhad konca</span></div></div></div>";
    html += '<h2 style="font-size:20px">Odporúčania pre teba</h2><div class="plan-odpor">' + K.odporucania(plan).map(function (r) {
      return '<div class="karta riadok" style="align-items:flex-start"><span class="ikona-btn" style="background:var(--accent-soft);color:var(--accent);flex:0 0 auto">' + (K.ikona[r.ik] || K.ikona.hviezda) + '</span><div style="min-width:0"><b>' + r.nadpis + '</b><p class="tlmene" style="margin:4px 0 0;font-size:14.5px">' + r.text + "</p></div></div>";
    }).join("") + "</div>";
    html += '<h2 style="font-size:20px">Poradie kurzov</h2><ol class="plan-os">' + h.map(function (x, n) {
      var k = x.kurz, pk = K.pokrokKurzu(x.id), hot = !K.dalsiaPolozka(x.id);
      return '<li class="' + (hot ? "hotovo" : sp.aktualny && sp.aktualny.x === x ? "teraz" : "") + '" style="--farba:' + k.farba + '"><span class="plan-c">' + (hot ? K.ikona.fajka : n + 1) + '</span><a href="#kurz-' + x.id + '" class="karta plan-kurz"><div class="riadok" style="gap:10px"><b style="font-size:16.5px">' + esc(k.nazov) + '</b><span class="medzera"></span><small class="tlmene">' + (x.odTyzden === x.doTyzden ? x.odTyzden + ". týždeň" : x.odTyzden + ".–" + x.doTyzden + ". týždeň") + "</small></div>" +
        '<p class="tlmene" style="margin:4px 0 8px;font-size:14px">' + PRECO_KURZ[x.id] + "</p>" +
        '<div class="pruh"><i style="width:' + pk.pct + '%"></i></div><small class="tlmene">' + x.stat.moduly + " modulov · " + x.stat.lekcie + " lekcií · asi " + hodiny(x.minut) + " · hotové do " + datum(x.koniec) + "</small></a></li>";
    }).join("") + "</ol>";
    html += '<p class="tlmene" style="font-size:13.5px;margin:0">Časy sú odhad podľa tvojho tempa a skúseností. Všetky ostatné kurzy máš tiež otvorené. Plán je len odporúčanie.</p>' +
      '<div style="display:flex;flex-direction:column;gap:10px">' + (sp.aktualny ? '<a class="btn plna" href="#kurz-' + sp.aktualny.x.id + '">' + K.ikona.hrat.replace("<svg", '<svg style="width:18px;height:18px;fill:currentColor"') + " Pokračovať: " + esc(sp.aktualny.x.kurz.nazov) + "</a>" : "") +
      '<a class="btn sek plna" href="#dotaznik">Upraviť odpovede</a><a class="btn sek plna" href="#uvod">Ako funguje SyntaxCode</a></div></div>';
    var el = K.el(html);
    el.querySelector("[data-spat]").onclick = function () { K.ist("domov", true); };
    return el;
  };

  /* Karta na domovskej obrazovke. */
  K.kartaPlanu = function () {
    var plan = K.stav.plan;
    if (!plan || !plan.kurzy) return '<a class="karta riadok plan-karta" href="#dotaznik" style="text-decoration:none;color:var(--text)"><span class="ikona-btn" style="background:var(--accent-soft);color:var(--accent)">' + K.ikona.hviezda + '</span><div class="medzera"><b>Zostav si osobný plán</b><div class="tlmene" style="font-size:14px">8 otázok a odporučíme ti, kde začať</div></div><span class="tlmene">›</span></a>';
    var sp = K.stavPlanu(plan);
    var text = { start: "Začiatok je za tebou. Drž sa denného cieľa.", naskok: "Máš náskok pred plánom. Výborne!", podla: "Ideš podľa plánu.", sklz: "Trochu meškáš. Skús dnes o pár minút viac, alebo si uprav plán." }[sp.stav];
    if (!sp.aktualny) text = "Celý plán máš hotový! Môžeš si zostaviť nový.";
    return '<a class="karta plan-karta" href="#plan" style="text-decoration:none;color:var(--text);display:flex;flex-direction:column;gap:8px"><div class="riadok" style="gap:8px"><span class="stitok">Môj plán' + (sp.aktualny ? " · kurz " + sp.poradie + " z " + sp.h.length : "") + '</span><span class="medzera"></span><b style="font-size:14px">' + sp.pct + ' %</b></div>' +
      '<div class="pruh"><i style="width:' + sp.pct + '%"></i></div><div class="tlmene" style="font-size:14px">' + (sp.aktualny ? "Teraz: <b style=\"color:var(--text)\">" + esc(sp.aktualny.x.kurz.nazov) + "</b> · " : "") + text + "</div></a>";
  };

  /* Prvé spustenie: najprv úvod. */
  var povodnyStart = K.start;
  K.start = function () {
    var h = (location.hash || "").slice(1);
    if (!K.stav.uvodVideny && (h === "" || h === "domov")) { try { history.replaceState(null, "", "#uvod"); } catch (e) {} }
    povodnyStart();
  };
})();
