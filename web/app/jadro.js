/* SyntaxCode – jadro: stav, ukladanie, XP, séria dní, opakovanie, navigácia. */
var K = window.K = {
  katalog: [],      // zoznam jazykov (kurzy/katalog.js)
  moduly: {},       // kurzId -> [modul, ...]
  slovnik: {},      // kurzId -> [heslo, ...]
  obrazovky: {},    // názov -> function(param) vracia element
};

/* ---------- pomocné ---------- */
K.$ = function (sel, el) { return (el || document).querySelector(sel); };
K.$$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };
K.el = function (html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
K.esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
K.zamiesaj = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
K.den = function (d) { d = d || new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
K.posunDen = function (den, o) { var p = den.split("-"); var d = new Date(+p[0], +p[1] - 1, +p[2] + o); return K.den(d); };
K.ikona = {
  spat: '<svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg>',
  zavriet: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  fajka: '<svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg>',
  zamok: '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  test: '<svg viewBox="0 0 24 24"><path d="M9 4h6M9 4a2 2 0 0 0-2 2H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1a2 2 0 0 0-2-2M9 13l2 2 4-4"/></svg>',
  hviezda: '<svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
  ohen: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 3.5 5 5.6 5 11a5 5 0 0 1-10 0c0-2.2 1-3.7 2-4.6.2 1.6 1 2.6 2 2.6 0-3 0-6 1-9z"/></svg>',
  blesk: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  hrat: '<svg viewBox="0 0 24 24"><path d="M7 5v14l11-7z"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  opak: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4"/></svg>',
  hladat: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  kos: '<svg viewBox="0 0 24 24"><path d="M5 7h14M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
};

/* ---------- stav a ukladanie ---------- */
var KLUC = "syntax-v1", STARY_KLUC = "kodovna-v1";
function novyStav() {
  return { verzia: 1, xp: 0, dni: {}, seria: 0, posledny: null, najdlhsia: 0,
    hotove: {}, testy: {}, opak: {}, projekty: [], kody: {}, odznaky: {}, opravene: 0,
    nast: { tema: "system", ciel: 10, uroven: 1 } };
}
K.stav = novyStav();
try { var ulozene = localStorage.getItem(KLUC) || localStorage.getItem(STARY_KLUC); if (ulozene) { var o = JSON.parse(ulozene); if (o && o.verzia === 1) K.stav = Object.assign(novyStav(), o); } } catch (e) {}
K.uloz = function () { try { localStorage.setItem(KLUC, JSON.stringify(K.stav)); } catch (e) {} };
K.vymaz = function () { K.stav = novyStav(); K.uloz(); K.temu(); };

K.dnes = function () { var d = K.den(); if (!K.stav.dni[d]) K.stav.dni[d] = { xp: 0, s: 0 }; return K.stav.dni[d]; };
K.zaznamenajAktivitu = function () {
  var d = K.den(), s = K.stav;
  if (s.posledny === d) return;
  s.seria = (s.posledny === K.posunDen(d, -1)) ? s.seria + 1 : 1;
  s.posledny = d;
  if (s.seria > s.najdlhsia) s.najdlhsia = s.seria;
};
K.aktualnaSeria = function () {
  var s = K.stav, d = K.den();
  if (s.posledny === d || s.posledny === K.posunDen(d, -1)) return s.seria;
  return 0;
};
K.pridajXP = function (n) { K.stav.xp += n; K.dnes().xp += n; K.zaznamenajAktivitu(); K.skontrolujOdznaky(); K.uloz(); };
K.pridajCas = function (sekundy) { K.dnes().s += Math.min(sekundy, 1800); K.uloz(); };

/* ---------- obsah ---------- */
K.registrujKurz = function (k) { K.katalog.push(k); };
K.registrujModul = function (kurzId, modul) {
  (K.moduly[kurzId] = K.moduly[kurzId] || []).push(modul);
  K.moduly[kurzId].sort(function (a, b) { return a.cislo - b.cislo; });
};
K.registrujSlovnik = function (kurzId, hesla) { K.slovnik[kurzId] = (K.slovnik[kurzId] || []).concat(hesla); };
K.kurz = function (id) { for (var i = 0; i < K.katalog.length; i++) if (K.katalog[i].id === id) return K.katalog[i]; return null; };
K.lekcia = function (id) {
  var p = id.split("-"), mod = (K.moduly[p[0]] || []);
  for (var i = 0; i < mod.length; i++) for (var j = 0; j < mod[i].lekcie.length; j++)
    if (mod[i].lekcie[j].id === id) return { kurz: p[0], modul: mod[i], lekcia: mod[i].lekcie[j], index: j };
  return null;
};
K.modul = function (kurzId, cislo) { var m = K.moduly[kurzId] || []; for (var i = 0; i < m.length; i++) if (m[i].cislo === +cislo) return m[i]; return null; };

/* Poradie odomykania: lekcie modulu za sebou, potom test, potom ďalší modul. */
K.polozkyKurzu = function (kurzId) {
  var out = [];
  (K.moduly[kurzId] || []).forEach(function (m) {
    m.lekcie.forEach(function (l) { out.push({ typ: "lekcia", id: l.id, modul: m, lekcia: l }); });
    if (m.test) out.push({ typ: "test", id: kurzId + "-test-" + m.cislo, modul: m });
  });
  return out;
};
K.jeHotove = function (p) { return p.typ === "lekcia" ? !!K.stav.hotove[p.id] : !!(K.stav.testy[p.id] && K.stav.testy[p.id].preslo); };
K.dalsiaPolozka = function (kurzId) {
  var pol = K.polozkyKurzu(kurzId);
  for (var i = 0; i < pol.length; i++) if (!K.jeHotove(pol[i])) return pol[i];
  return null;
};
K.jeOdomknute = function (kurzId, id) {
  var pol = K.polozkyKurzu(kurzId);
  for (var i = 0; i < pol.length; i++) { if (pol[i].id === id) return true; if (!K.jeHotove(pol[i])) return false; }
  return false;
};
K.pokrokKurzu = function (kurzId) {
  var pol = K.polozkyKurzu(kurzId), h = 0, k = K.kurz(kurzId);
  pol.forEach(function (p) { if (K.jeHotove(p)) h++; });
  var spolu = Math.max(pol.length, (k && k.planLekcii) || pol.length);
  return { hotove: h, spolu: spolu, pct: spolu ? Math.round(h / spolu * 100) : 0 };
};

/* ---------- opakovanie (Leitnerove krabičky: 1, 3, 7, 14 dní) ---------- */
var INTERVALY = [1, 3, 7, 14];
K.krokPodlaId = function (qid) {
  var p = qid.split("#"), l = K.lekcia(p[0]);
  if (l) return l.lekcia.kroky[+p[1]] || null;
  var t = p[0].match(/^(\w+)-test-(\d+)$/);
  if (t) { var m = K.modul(t[1], t[2]); return m && m.test.otazky[+p[1]] || null; }
  return null;
};
K.chybaVOtazke = function (qid) { K.stav.opak[qid] = { box: 0, due: K.den() }; K.uloz(); };
K.opakovanieVysledok = function (qid, dobre) {
  var z = K.stav.opak[qid]; if (!z) return;
  if (!dobre) { z.box = 0; z.due = K.posunDen(K.den(), 1); }
  else if (z.box >= INTERVALY.length - 1) { delete K.stav.opak[qid]; }
  else { z.due = K.posunDen(K.den(), INTERVALY[z.box]); z.box++; }
  K.uloz();
};
K.naOpakovanie = function () {
  var d = K.den();
  return Object.keys(K.stav.opak).filter(function (q) { return K.stav.opak[q].due <= d && K.krokPodlaId(q); });
};

/* ---------- odznaky ---------- */
K.ODZNAKY = [
  { id: "prva", nazov: "Prvá lekcia", ikona: "fajka", ok: function (s) { return Object.keys(s.hotove).length >= 1; } },
  { id: "seria3", nazov: "3 dni za sebou", ikona: "ohen", ok: function (s) { return s.najdlhsia >= 3; } },
  { id: "seria7", nazov: "Týždeň za sebou", ikona: "ohen", ok: function (s) { return s.najdlhsia >= 7; } },
  { id: "test", nazov: "Prvý test", ikona: "test", ok: function (s) { return Object.keys(s.testy).some(function (k) { return s.testy[k].preslo; }); } },
  { id: "xp100", nazov: "100 XP", ikona: "blesk", ok: function (s) { return s.xp >= 100; } },
  { id: "xp500", nazov: "500 XP", ikona: "blesk", ok: function (s) { return s.xp >= 500; } },
  { id: "oprava", nazov: "Z chýb sa učím", ikona: "opak", ok: function (s) { return s.opravene >= 5; } },
  { id: "projekt", nazov: "Vlastný projekt", ikona: "hviezda", ok: function (s) { return s.projekty.length >= 1; } },
  { id: "modul", nazov: "Celý modul", ikona: "hviezda", ok: function (s) { return Object.keys(s.testy).some(function (k) { return s.testy[k].preslo && s.testy[k].best >= 90; }); } },
];
K.skontrolujOdznaky = function () {
  K.ODZNAKY.forEach(function (o) {
    if (!K.stav.odznaky[o.id] && o.ok(K.stav)) { K.stav.odznaky[o.id] = K.den(); setTimeout(function () { K.toast("Nový odznak: " + o.nazov); }, 600); }
  });
};

/* ---------- vzhľad ---------- */
K.temu = function () {
  var t = K.stav.nast.tema, r = document.documentElement;
  if (t === "system") r.removeAttribute("data-theme"); else r.setAttribute("data-theme", t);
};
K.toast = function (text) {
  var t = K.el('<div class="toast" role="status"></div>'); t.textContent = text;
  document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600);
};

/* ---------- navigácia (hash) ---------- */
/* #domov, #kurz-html, #lekcia-html-1-2, #test-html-1, #opakovanie, #slovnik, #slovnik-html, #projekty, #projekt-<id>, #profil */
K.ist = function (hash, nahradit) { if (nahradit) location.replace("#" + hash); else location.hash = hash; };
K.spat = function (nahradnyHash) { if (history.length > 1 && K._bolaNavigacia) history.back(); else K.ist(nahradnyHash || "domov", true); };
K._bolaNavigacia = false;
K.vykresli = function () {
  var h = (location.hash || "#domov").slice(1), m = h.match(/^([a-z]+)(?:-(.+))?$/) || ["", "domov"];
  var nazov = m[1], param = m[2] || null, f = K.obrazovky[nazov] || K.obrazovky.domov;
  if (K._upratat) { try { K._upratat(); } catch (e) {} K._upratat = null; }
  var hlavne = ["domov", "slovnik", "projekty", "profil", "kurz"];
  document.body.classList.toggle("bez-menu", hlavne.indexOf(nazov) < 0);
  K.$$("#spodna a").forEach(function (a) { a.classList.toggle("on", a.dataset.n === nazov || (nazov === "kurz" && a.dataset.n === "domov")); });
  var main = K.$("#obrazovka");
  main.innerHTML = "";
  main.appendChild(f(param));
  main.scrollTop = 0;
};
K.start = function () {
  K.temu();
  window.addEventListener("hashchange", function () { K._bolaNavigacia = true; K.vykresli(); });
  K.vykresli();
};
/* Tlačidlo Späť v Androide volá túto funkciu z Fluttera. Vráti true, ak sa navigovalo. */
K.androidSpat = function () {
  var h = (location.hash || "#domov").slice(1);
  if (h === "domov" || h === "") return false;
  if (K._spatHandler) { K._spatHandler(); return true; }
  K.spat("domov"); return true;
};
