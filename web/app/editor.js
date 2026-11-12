/* Kódovňa – editor kódu: farebné zvýraznenie, pruh so znakmi, automatické zatváranie,
   náhľad stránky a preklad chýb do slovenčiny. */
(function () {
  var esc = K.esc;
  function span(c, t) { return '<span class="' + c + '">' + esc(t) + "</span>"; }
  function tokenizuj(src, re, f) {
    var out = "", last = 0, m; re.lastIndex = 0;
    while ((m = re.exec(src))) { if (m[0] === "") { re.lastIndex++; continue; } out += esc(src.slice(last, m.index)) + f(m); last = re.lastIndex; }
    return out + esc(src.slice(last));
  }

  /* ---------- zvýrazňovanie ---------- */
  function hlAtributy(s) {
    return tokenizuj(s, /("[^"]*"?|'[^']*'?)|([^\s=\/"']+)|([=\/])/g, function (m) {
      return m[1] ? span("t-str", m[1]) : m[2] ? span("t-at", m[2]) : span("t-pun", m[3]);
    });
  }
  function hlHtml(src) {
    return tokenizuj(src, /(<!--[\s\S]*?(?:-->|$))|(<![a-zA-Z][^>]*>?)|(<\/?)([a-zA-Z][\w-]*)([^<>]*)(>?)|(&[a-zA-Z#0-9]+;)/g, function (m) {
      if (m[1]) return span("t-com", m[1]);
      if (m[2]) return span("t-kw", m[2]);
      if (m[7]) return span("t-num", m[7]);
      return span("t-pun", m[3]) + span("t-tag", m[4]) + hlAtributy(m[5]) + span("t-pun", m[6]);
    });
  }
  function hlCss(src) {
    var hlbka = 0, poDvojbodke = false;
    return tokenizuj(src, /(\/\*[\s\S]*?(?:\*\/|$))|("[^"]*"?|'[^']*'?)|([{}])|([;:])|(#[0-9a-fA-F]{3,8}\b|-?\d*\.?\d+(?:px|em|rem|%|vh|vw|s|ms|deg|fr)?)|(@?[\w-]+)/g, function (m) {
      if (m[1]) return span("t-com", m[1]);
      if (m[2]) return span("t-str", m[2]);
      if (m[3]) { hlbka += m[3] === "{" ? 1 : -1; if (hlbka < 0) hlbka = 0; poDvojbodke = false; return span("t-pun", m[3]); }
      if (m[4]) { if (hlbka > 0) poDvojbodke = m[4] === ":"; return span("t-pun", m[4]); }
      if (m[5] && (hlbka > 0)) return span("t-num", m[5]);
      var w = m[5] || m[6];
      if (hlbka === 0) return span(w.charAt(0) === "@" ? "t-kw" : "t-sel", w);
      return poDvojbodke ? span("t-str", w) : span("t-at", w);
    });
  }
  var JS_KW = "var|let|const|function|return|if|else|for|while|do|break|continue|new|this|true|false|null|undefined|typeof|class|switch|case|default|try|catch|finally|throw|of|in|async|await";
  function hlJs(src) {
    return tokenizuj(src, new RegExp("(\\/\\/.*|\\/\\*[\\s\\S]*?(?:\\*\\/|$))|(\"(?:\\\\.|[^\"\\\\\\n])*\"?|'(?:\\\\.|[^'\\\\\\n])*'?|`(?:\\\\.|[^`\\\\])*`?)|\\b(\\d+\\.?\\d*)\\b|\\b(" + JS_KW + ")\\b|([A-Za-z_$][\\w$]*)(?=\\s*\\()", "g"), function (m) {
      if (m[1]) return span("t-com", m[1]);
      if (m[2]) return span("t-str", m[2]);
      if (m[3]) return span("t-num", m[3]);
      if (m[4]) return span("t-kw", m[4]);
      return span("t-sel", m[5]);
    });
  }
  K.zvyrazni = function (src, jazyk) {
    if (jazyk === "css") return hlCss(src);
    if (jazyk === "js") return hlJs(src);
    if (jazyk === "html") return hlHtml(src);
    return esc(src);
  };

  /* ---------- kontrola HTML s vysvetlením po slovensky ---------- */
  var PRAZDNE = "area base br col embed hr img input link meta source track wbr".split(" ");
  var ZNAME = ("html head body title meta link style script noscript base h1 h2 h3 h4 h5 h6 p br hr strong b em i u s mark small sub sup code pre kbd samp var q blockquote cite abbr " +
    "time address del ins span div a img figure figcaption picture source video audio track iframe embed object canvas svg ul ol li dl dt dd table caption thead tbody tfoot tr th td col colgroup " +
    "form label input button select option optgroup textarea fieldset legend datalist output progress meter header footer main nav section article aside details summary dialog template slot wbr area map").split(" ");
  K.skontrolujHtml = function (src) {
    var riadok = function (i) { return src.slice(0, i).split("\n").length; };
    var bezKom = src.replace(/<!--[\s\S]*?-->/g, function (k) { return k.replace(/[^\n]/g, " "); });
    if (/<!--/.test(bezKom)) return { riadok: riadok(bezKom.indexOf("<!--")), sprava: "Komentár <!-- nie je ukončený. Na jeho koniec patrí -->." };
    var neuz = /<\/?[a-zA-Z][^<>]*(?=<|$)/.exec(bezKom);
    if (neuz) return { riadok: riadok(neuz.index), sprava: "Značke " + neuz[0].trim().slice(0, 12) + "… chýba na konci znak >." };
    var re = /<(\/?)([a-zA-Z][\w-]*)([^<>]*)>/g, m, zasobnik = [];
    while ((m = re.exec(bezKom))) {
      var meno = m[2].toLowerCase(), r = riadok(m.index);
      if ((m[3].match(/"/g) || []).length % 2) return { riadok: r, sprava: "V značke <" + meno + "> chýba úvodzovka \". Hodnota atribútu má byť medzi dvoma úvodzovkami, napr. href=\"…\"." };
      if (ZNAME.indexOf(meno) < 0) return { riadok: r, sprava: "Značku <" + meno + "> HTML nepozná. Nepreklepol si sa? " + (/^h\d$/.test(meno) ? "Nadpisy sú len h1 až h6." : "") };
      if (PRAZDNE.indexOf(meno) >= 0) { if (m[1]) return { riadok: r, sprava: "Značka <" + meno + "> je prázdna a nemá zatváraciu časť. Zmaž </" + meno + ">." }; continue; }
      if (/\/\s*$/.test(m[3])) continue;
      if (!m[1]) { zasobnik.push({ meno: meno, riadok: r }); continue; }
      var vrch = zasobnik[zasobnik.length - 1];
      if (!vrch) return { riadok: r, sprava: "Na riadku " + r + " je zatváracia značka </" + meno + ">, ale žiadna <" + meno + "> pred ňou nie je otvorená." };
      if (vrch.meno !== meno) {
        var je = zasobnik.some(function (z) { return z.meno === meno; });
        return je ? { riadok: vrch.riadok, sprava: "Značku <" + vrch.meno + "> (riadok " + vrch.riadok + ") treba zavrieť skôr ako </" + meno + ">. Zatváraj v opačnom poradí, ako si otváral." }
                  : { riadok: r, sprava: "Na riadku " + r + " je </" + meno + ">, ale otvorená je <" + vrch.meno + ">. Nepreklepol si sa?" };
      }
      zasobnik.pop();
    }
    if (zasobnik.length) { var z = zasobnik[zasobnik.length - 1]; return { riadok: z.riadok, sprava: "Značka <" + z.meno + "> na riadku " + z.riadok + " nie je zatvorená. Na koniec jej obsahu pridaj </" + z.meno + ">." }; }
    return null;
  };

  /* ---------- preklad chýb JavaScriptu ---------- */
  var PREKLADY = [
    [/^(?:Uncaught )?ReferenceError: (\S+) is not defined/, "„$1“ neexistuje. Vytvoril si túto premennú alebo funkciu? Skontroluj aj veľké a malé písmená."],
    [/Cannot read propert(?:y|ies) of (null|undefined)(?: \(reading '(.+)'\))?/, "Pracuješ s niečím, čo neexistuje ($1). Najčastejšie getElementById nenašiel prvok – skontroluj, či id v HTML sedí."],
    [/Cannot set propert(?:y|ies) of (null|undefined)/, "Nastavuješ vlastnosť niečomu, čo neexistuje ($1). Skontroluj id prvku."],
    [/Unexpected end of input/, "Kód náhle skončil. Pravdepodobne chýba zatváracia zátvorka } alebo )."],
    [/missing \) after argument list/, "Chýba zatváracia zátvorka ) za tým, čo posielaš do funkcie."],
    [/Invalid or unexpected token/, "Je tu neplatný znak. Často to sú neuzavreté úvodzovky."],
    [/Unexpected token '?([^']+)'?/, "Na tomto mieste nečakám „$1“. Skontroluj zátvorky, čiarky a úvodzovky okolo."],
    [/Unexpected identifier/, "Nečakané slovo. Možno chýba čiarka, bodka, operátor alebo zátvorka pred ním."],
    [/(\S+) is not a function/, "„$1“ nie je funkcia, takže sa nedá zavolať so zátvorkami (). Skontroluj názov."],
    [/Assignment to constant variable/, "Do konštanty (const) sa nedá priradiť nová hodnota. Ak sa má meniť, vytvor ju cez let."],
    [/Identifier '(.+)' has already been declared/, "Premenná „$1“ už existuje. Druhýkrát ju nevytváraj, len jej priraď hodnotu."],
  ];
  K.prelozChybu = function (sprava) {
    for (var i = 0; i < PREKLADY.length; i++) { var m = PREKLADY[i][0].exec(sprava); if (m) return PREKLADY[i][1].replace(/\$(\d)/g, function (_, n) { return m[+n] || ""; }); }
    return "Chyba v JavaScripte: " + sprava;
  };

  /* ---------- zostavenie stránky pre náhľad ---------- */
  var CHYBY_SKRIPT = "<script>window.onerror=function(m,s,l){try{parent.postMessage({kodovnaChyba:String(m),riadok:l},'*')}catch(e){}" +
    "var p=document.createElement('pre');p.style.cssText='color:#c0392b;white-space:pre-wrap;font:13px monospace;background:#fde8e6;padding:8px;border-radius:6px';p.textContent='Chyba: '+m;(document.body||document.documentElement).appendChild(p)};<\/script>";
  K.zostavStranku = function (s) {
    var html = s.html || "", css = s.css || "", js = s.js || "";
    var zaklad = "<style>body{font-family:system-ui,sans-serif;padding:8px;margin:0;line-height:1.4}</style>";
    var hlava = '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + CHYBY_SKRIPT + zaklad + (css ? "<style>" + css + "</style>" : "");
    var skript = js ? "<script>\n" + js + "\n<\/script>" : "";
    if (/<html[\s>]|<!doctype/i.test(html)) {
      var d = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, function (x) { return x + hlava; }) : hlava + html;
      return /<\/body>/i.test(d) ? d.replace(/<\/body>/i, skript + "</body>") : d + skript;
    }
    return "<!DOCTYPE html><html><head>" + hlava + "</head><body>" + html + skript + "</body></html>";
  };

  /* ---------- editor ---------- */
  var ZNAKY = {
    html: ["Tab", "<", ">", "/", "=", "\"", "!", "-", "&", ";", "#", "(", ")"],
    css: ["Tab", "{", "}", ":", ";", ".", "#", "-", "%", "(", ")", "\"", ","],
    js: ["Tab", "(", ")", "{", "}", "[", "]", ";", "=", "\"", "'", "+", ".", "<", ">", "!", "&", "|", ","],
  };
  var NAZVY = { html: "HTML", css: "CSS", js: "JS" };
  var PARY = { "(": ")", "[": "]", "{": "}", "\"": "\"", "'": "'" };

  /* opts: { subory:{html,css,js}, karty:["html",...], aktivna, vyska, onZmena(subory) } */
  K.Editor = function (opts) {
    var subory = opts.subory, karty = opts.karty || ["html"], akt = opts.aktivna || karty[0];
    var el = K.el('<div class="ed"><div class="ed-karty"></div><div class="ed-plocha"><div class="ed-cisla"></div><div class="ed-chyba-riadok" hidden></div><pre><code></code></pre>' +
      '<textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Editor kódu"></textarea></div><div class="znaky"></div></div>');
    if (opts.vyska) el.querySelector(".ed-plocha").style.setProperty("--vyska", opts.vyska);
    var ta = el.querySelector("textarea"), pre = el.querySelector("pre"), code = el.querySelector("code"),
        cisla = el.querySelector(".ed-cisla"), pas = el.querySelector(".ed-chyba-riadok"), znaky = el.querySelector(".znaky"), vnutri = false, chybaRiadok = 0;

    el.querySelector(".ed-karty").innerHTML = karty.map(function (k) { return '<button type="button" data-k="' + k + '">' + NAZVY[k] + "</button>"; }).join("");
    function prekresli() {
      code.innerHTML = K.zvyrazni(ta.value, akt) + "\n";
      var n = ta.value.split("\n").length, s = ""; for (var i = 1; i <= n; i++) s += i + "\n"; cisla.textContent = s;
      synchronizuj();
    }
    function synchronizuj() {
      pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft; cisla.scrollTop = ta.scrollTop;
      if (chybaRiadok) { pas.hidden = false; pas.style.top = (12 + (chybaRiadok - 1) * 22.4 - ta.scrollTop) + "px"; } else pas.hidden = true;
    }
    function nastavKartu(k) {
      akt = k; ta.value = subory[k] || ""; chybaRiadok = 0;
      K.$$(".ed-karty button", el).forEach(function (b) { b.classList.toggle("on", b.dataset.k === k); });
      znaky.innerHTML = ZNAKY[k].map(function (z) { return '<button type="button" class="' + (z.length > 1 ? "fn" : "") + '" data-z="' + esc(z) + '">' + (z === "Tab" ? "⇥ Tab" : esc(z)) + "</button>"; }).join("") +
        '<button type="button" class="fn" data-z="spat" aria-label="Späť">↶ Späť</button>';
      prekresli();
    }
    function vloz(text) {
      ta.focus();
      vnutri = true;
      var ok = false; try { ok = document.execCommand("insertText", false, text); } catch (e) {}
      if (!ok) { var s = ta.selectionStart; ta.setRangeText(text, s, ta.selectionEnd, "end"); }
      vnutri = false;
      zmena();
    }
    function zmena() { subory[akt] = ta.value; prekresli(); if (opts.onZmena) opts.onZmena(subory, akt); }

    /* automatické doplnenia po napísaní znaku */
    ta.addEventListener("input", function (e) {
      if (vnutri) return;
      var pos = ta.selectionStart, pred = ta.value.slice(0, pos), za = ta.value.slice(pos), d = e.data;
      var novyRiadok = pred.slice(-1) === "\n" && (e.inputType === "insertLineBreak" || e.inputType === "insertParagraph" || (e.inputType === "insertText" && (d === null || d === "\n")));
      if (novyRiadok) {
        var predch = pred.slice(0, -1), riad = predch.slice(predch.lastIndexOf("\n") + 1), odsad = (riad.match(/^[ \t]*/) || [""])[0];
        var otv = akt === "html" ? /<([a-zA-Z][\w-]*)[^<>\/]*>\s*$/.exec(riad) : null;
        if (/\{\s*$/.test(riad) || (otv && PRAZDNE.indexOf(otv[1].toLowerCase()) < 0)) odsad += "  ";
        if (odsad) { vloz(odsad); return; }
      } else if (d && d.length === 1) {
        if (akt === "html" && d === ">") {
          var mt = /<([a-zA-Z][\w-]*)(\s[^<>]*)?>$/.exec(pred);
          if (mt && PRAZDNE.indexOf(mt[1].toLowerCase()) < 0 && !/\/>$/.test(pred) && za.indexOf("</" + mt[1] + ">") !== 0) {
            vloz("</" + mt[1] + ">"); ta.setSelectionRange(pos, pos); return;
          }
        } else if (akt !== "html" && PARY[d] && (za === "" || /^[\s)\]};,]/.test(za))) {
          if ((d === "\"" || d === "'") && /[\w]$/.test(pred.slice(0, -1))) { /* apostrof v slove */ }
          else { vloz(PARY[d]); ta.setSelectionRange(pos, pos); return; }
        } else if (akt !== "html" && /[)\]}"']/.test(d) && za.charAt(0) === d) {
          vnutri = true; ta.setSelectionRange(pos, pos + 1); try { document.execCommand("delete"); } catch (er) { ta.setRangeText("", pos, pos + 1, "end"); } vnutri = false;
        }
      }
      zmena();
    });
    ta.addEventListener("scroll", synchronizuj);
    ta.addEventListener("keydown", function (e) { if (e.key === "Tab") { e.preventDefault(); vloz("  "); } });
    znaky.addEventListener("pointerdown", function (e) { if (e.target.closest("button")) e.preventDefault(); });
    znaky.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var z = b.dataset.z;
      if (z === "spat") { ta.focus(); try { document.execCommand("undo"); } catch (er) {} zmena(); return; }
      vloz(z === "Tab" ? "  " : z);
    });
    el.querySelector(".ed-karty").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) nastavKartu(b.dataset.k); });
    nastavKartu(akt);

    return {
      el: el,
      subory: function () { return subory; },
      nastav: function (nove) { subory = nove; nastavKartu(akt); if (opts.onZmena) opts.onZmena(subory, akt); },
      karta: nastavKartu,
      oznacChybu: function (r) { chybaRiadok = r || 0; synchronizuj(); },
    };
  };

  /* Náhľad: iframe so stránkou zostavenou zo súborov. */
  K.Nahlad = function (vyska) {
    var el = K.el('<div class="nahlad"><div class="stitok"><i></i>Výsledok</div><iframe sandbox="allow-scripts allow-same-origin allow-modals" title="Náhľad stránky"></iframe></div>');
    var fr = el.querySelector("iframe"), tm;
    if (vyska) fr.style.setProperty("--vyska-n", vyska);
    return {
      el: el, iframe: fr,
      spusti: function (subory, hned) {
        clearTimeout(tm);
        var f = function () { fr.srcdoc = K.zostavStranku(subory); };
        if (hned) f(); else tm = setTimeout(f, 350);
      },
      /* Spustí a po načítaní zavolá cb(document). */
      over: function (subory, cb) {
        clearTimeout(tm);
        fr.onload = function () { fr.onload = null; setTimeout(function () { var d = null; try { d = fr.contentDocument; } catch (e) {} cb(d); }, 60); };
        fr.srcdoc = K.zostavStranku(subory);
      },
    };
  };

  /* Statický blok kódu so zvýraznením (v lekciách). */
  K.blokKodu = function (text, jazyk, stitok) {
    return '<pre class="kod">' + (stitok ? '<span class="kod-stitok">' + esc(stitok) + "</span>" : "") + K.zvyrazni(text, jazyk || "html") + "</pre>";
  };
})();
