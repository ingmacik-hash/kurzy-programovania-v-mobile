/* SyntaxCode – editor kódu: farebné zvýraznenie, pruh so znakmi, automatické zatváranie,
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
  var PY_KW = "def|return|if|elif|else|for|while|in|not|and|or|is|break|continue|pass|import|from|as|class|try|except|finally|raise|with|lambda|global|None|True|False|yield|del|assert";
  var PY_FN = "print|input|int|float|str|len|range|list|dict|set|tuple|abs|round|min|max|sum|sorted|type|bool|enumerate|zip|open";
  function hlPy(src) {
    return tokenizuj(src, new RegExp("(#.*)|([fFrRbB]?(?:\"\"\"[\\s\\S]*?(?:\"\"\"|$)|'''[\\s\\S]*?(?:'''|$)|\"(?:\\\\.|[^\"\\\\\\n])*\"?|'(?:\\\\.|[^'\\\\\\n])*'?))|\\b(\\d+\\.?\\d*)\\b|\\b(" + PY_KW + ")\\b|\\b(" + PY_FN + ")\\b", "g"), function (m) {
      if (m[1]) return span("t-com", m[1]);
      if (m[2]) return span("t-str", m[2]);
      if (m[3]) return span("t-num", m[3]);
      if (m[4]) return span("t-kw", m[4]);
      return span("t-sel", m[5]);
    });
  }
  var CPP_KW = "int|double|float|char|bool|void|long|short|unsigned|const|auto|string|vector|return|if|else|for|while|do|break|continue|switch|case|default|class|struct|public|private|protected|new|delete|true|false|using|namespace|std|include|nullptr|this|static|template|typename";
  function hlCpp(src) {
    return tokenizuj(src, new RegExp("(\\/\\/.*|\\/\\*[\\s\\S]*?(?:\\*\\/|$))|(#\\s*\\w+)|(\"(?:\\\\.|[^\"\\\\\\n])*\"?|'(?:\\\\.|[^'\\\\\\n])*'?|<[a-z_]+>(?=\\s*$))|\\b(\\d+\\.?\\d*)\\b|\\b(" + CPP_KW + ")\\b|\\b(cout|cin|endl|main|printf|getline)\\b", "gm"), function (m) {
      if (m[1]) return span("t-com", m[1]);
      if (m[2]) return span("t-tag", m[2]);
      if (m[3]) return span("t-str", m[3]);
      if (m[4]) return span("t-num", m[4]);
      if (m[5]) return span("t-kw", m[5]);
      return span("t-sel", m[6]);
    });
  }
  K.zvyrazni = function (src, jazyk) {
    if (jazyk === "css") return hlCss(src);
    if (jazyk === "js") return hlJs(src);
    if (jazyk === "html") return hlHtml(src);
    if (jazyk === "py" || jazyk === "python") return hlPy(src);
    if (jazyk === "cpp") return hlCpp(src);
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

  /* ---------- chyby Pythonu po slovensky ---------- */
  var PY_CHYBY = [
    [/^NameError$/, /name '(.+)' is not defined/, "„$1“ neexistuje. Vytvoril si túto premennú alebo funkciu? Skontroluj preklepy a veľké a malé písmená."],
    [/^SyntaxError$/, /expected ':'/, "Chýba dvojbodka : na konci riadku (za if, for, while, def…)."],
    [/^SyntaxError$/, /unterminated string|EOL while scanning|unterminated triple/, "Text nie je uzavretý. Skontroluj, či má úvodzovky na začiatku aj na konci."],
    [/^SyntaxError$/, /'\(' was never closed|unexpected EOF|was never closed/, "Niektorá zátvorka nie je zatvorená."],
    [/^SyntaxError$/, /unmatched '(.)'/, "Zátvorka $1 je navyše, nemá svoju otváraciu dvojičku."],
    [/^SyntaxError$/, /invalid syntax.*Maybe you meant '==' or ':='|cannot assign to/, "Na porovnanie použi ==. Jedno = do premennej ukladá."],
    [/^(SyntaxError|IndentationError)$/, /expected an indented block/, "Za dvojbodkou musí nasledovať odsadený riadok (4 medzery)."],
    [/^(SyntaxError|IndentationError)$/, /unexpected indent/, "Tento riadok je odsadený, hoci nemá byť. Zmaž medzery na začiatku."],
    [/^(SyntaxError|IndentationError)$/, /unindent|indent/, "Odsadenie nesedí. Riadky v jednom bloku musia mať rovnaký počet medzier."],
    [/^SyntaxError$/, /./, "Python nerozumie zápisu na tomto riadku. Skontroluj dvojbodky, zátvorky, úvodzovky a odsadenie."],
    [/^TypeError$/, /can only concatenate str|unsupported operand type\(s\) for \+: 'int' and 'str'|unsupported operand type\(s\) for \+: 'str' and 'int'/, "Nedá sa sčítať text a číslo. Číslo premeň na text cez str(…) alebo text na číslo cez int(…)."],
    [/^TypeError$/, /'(.+)' object is not callable/, "Snažíš sa zavolať niečo, čo nie je funkcia ($1). Nepomenoval si premennú rovnako ako funkciu?"],
    [/^TypeError$/, /missing (\d+) required positional argument/, "Funkcii chýba $1 vstup (argument). Pozri, koľko ich funkcia potrebuje."],
    [/^TypeError$/, /takes (\d+) positional arguments? but (\d+) (were|was) given/, "Funkcia čaká $1 vstupy, ale dostala $2."],
    [/^TypeError$/, /./, "Pracuješ s nesprávnym typom údajov (napr. text namiesto čísla)."],
    [/^ZeroDivisionError$/, /./, "Delenie nulou. Nulou sa deliť nedá."],
    [/^ValueError$/, /invalid literal for int\(\).*: '(.*)'/, "„$1“ sa nedá premeniť na celé číslo."],
    [/^ValueError$/, /could not convert string to float: '(.*)'/, "„$1“ sa nedá premeniť na desatinné číslo."],
    [/^IndexError$/, /./, "Index je mimo zoznamu. Zoznam s n prvkami má indexy 0 až n-1."],
    [/^KeyError$/, /(.*)/, "Kľúč $1 v slovníku neexistuje."],
    [/^AttributeError$/, /'(.+)' object has no attribute '(.+)'/, "Typ $1 nemá $2. Nepreklepol si sa?"],
    [/^RecursionError$/, /./, "Funkcia volá sama seba donekonečna."],
  ];
  K.prelozPyChybu = function (typ, sprava) {
    for (var i = 0; i < PY_CHYBY.length; i++) {
      if (!PY_CHYBY[i][0].test(typ)) continue;
      var m = PY_CHYBY[i][1].exec(sprava); if (m) return PY_CHYBY[i][2].replace(/\$(\d)/g, function (_, n) { return m[+n] || ""; });
    }
    return typ + ": " + sprava;
  };

  /* ---------- chyby C++ (gcc) po slovensky ---------- */
  var CPP_CHYBY = [
    [/expected ';' before|expected ';' at end/, "Chýba bodkočiarka ; na konci príkazu (často na riadku vyššie)."],
    [/'(\w+)' was not declared in this scope/, "„$1“ nie je vytvorené. Vytvor premennú (napr. int $1;), alebo skontroluj preklep. Pri cout/cin/string nezabudni na using namespace std;"],
    [/'(\w+)' is not a member of 'std'/, "$1 nie je v std. Chýba #include, alebo je preklep."],
    [/expected '\}' at end of input/, "Chýba zatváracia zložená zátvorka }."],
    [/expected primary-expression before '(.+)'/, "Pred „$1“ niečo chýba (napr. hodnota alebo premenná)."],
    [/missing terminating " character|missing terminating ' character/, "Text nie je uzavretý úvodzovkami."],
    [/invalid conversion from|cannot convert '(.+)' to '(.+)'/, "Nesprávny typ: hodnotu nemožno uložiť do premennej tohto typu."],
    [/no match for 'operator<<'|no match for 'operator>>'/, "Táto hodnota sa nedá vypísať/načítať cez << alebo >>."],
    [/redeclaration of|conflicting declaration/, "Premenná s týmto menom už existuje. Druhýkrát ju nevytváraj."],
    [/assignment of read-only variable '(\w+)'/, "$1 je konštanta (const), nedá sa zmeniť."],
    [/expected '\)' before|expected '\)'/, "Chýba zatváracia zátvorka )."],
    [/expected '\(' /, "Chýba otváracia zátvorka (."],
    [/fatal error: (.+): No such file/, "Knižnica $1 neexistuje. Skontroluj #include."],
    [/control reaches end of non-void function/, "Funkcia má vrátiť hodnotu, ale chýba return."],
  ];
  K.prelozCppChybu = function (text) {
    var riadky = (text || "").split("\n"), prvy = null;
    for (var i = 0; i < riadky.length; i++) if (/error:/.test(riadky[i])) { prvy = riadky[i]; break; }
    if (!prvy) return { sprava: text.trim().split("\n")[0] || "Program sa nepodarilo preložiť.", riadok: 0 };
    var r = /(?:prog\.cc|<source>|example\.cpp):(\d+):/.exec(prvy), msg = prvy.replace(/^.*error:\s*/, "");
    for (var j = 0; j < CPP_CHYBY.length; j++) { var m = CPP_CHYBY[j][0].exec(msg); if (m) return { sprava: CPP_CHYBY[j][1].replace(/\$(\d)/g, function (_, n) { return m[+n] || ""; }), riadok: r ? +r[1] : 0 }; }
    return { sprava: "Chyba prekladača: " + msg, riadok: r ? +r[1] : 0 };
  };

  /* ---------- spustenie Pythonu (Brython, beží v telefóne bez internetu) ---------- */
  var py = { stav: 0, cakaju: [] };
  function pyInit() {
    window.pyVystup = function (s) { py.out.push(s); };
    window.pyChyba = function (t, m, r) { py.chyba = { typ: t, sprava: m, riadok: r }; };
    window.pyVstupy = []; window.pyCitaj = function () { return window.pyVstupy.length ? String(window.pyVstupy.shift()) : ""; };
    brython({ debug: 0 });
    __BRYTHON__.runPythonSource(["import sys, builtins", "from browser import window", "class Vystup:", "  def write(self, s): window.pyVystup(s)", "  def flush(self): pass",
      "sys.stdout = Vystup()", "sys.stderr = Vystup()",
      "def vstup(p=''):", "  print(p, end='')", "  v = window.pyCitaj()", "  print(v)", "  return v", "builtins.input = vstup",
      "def spusti(src):", "  try:", "    exec(compile(src, 'program', 'exec'), {'__name__': '__main__'})", "  except SyntaxError as e:", "    window.pyChyba(type(e).__name__, str(e.msg), e.lineno or 0)",
      "  except BaseException as e:", "    tb = e.__traceback__", "    r = 0", "    while tb is not None:", "      if tb.tb_frame.f_code.co_filename == 'program': r = tb.tb_lineno", "      tb = tb.tb_next",
      "    window.pyChyba(type(e).__name__, str(e), r)", "window.pySpusti = spusti"].join("\n"));
  }
  K.nacitajPython = function (cb) {
    if (py.stav === 2) return cb(true);
    py.cakaju.push(cb);
    if (py.stav === 1) return;
    py.stav = 1;
    var subory = ["lib/brython.min.js", "lib/brython_stdlib.js"], i = 0;
    (function dalsi() {
      if (i >= subory.length) {
        try { pyInit(); py.stav = 2; } catch (e) { py.stav = 0; }
        var c = py.cakaju; py.cakaju = []; c.forEach(function (f) { f(py.stav === 2); }); return;
      }
      var s = document.createElement("script"); s.src = subory[i++]; s.onload = dalsi;
      s.onerror = function () { py.stav = 0; var c = py.cakaju; py.cakaju = []; c.forEach(function (f) { f(false); }); };
      document.head.appendChild(s);
    })();
  };
  /* cb({vystup, chyba:{typ, sprava, riadok, preklad}}) */
  K.spustiPython = function (kod, vstupy, cb) {
    K.nacitajPython(function (ok) {
      if (!ok) return cb({ vystup: "", chyba: { sprava: "Python sa nepodarilo načítať.", riadok: 0, preklad: "Python sa nepodarilo načítať. Skús aplikáciu reštartovať." } });
      py.out = []; py.chyba = null; window.pyVstupy = (vstupy || []).slice();
      setTimeout(function () {
        try { window.pySpusti(kod); } catch (e) { py.chyba = { typ: "Chyba", sprava: String(e && e.message || e), riadok: 0 }; }
        var ch = py.chyba; if (ch) ch.preklad = K.prelozPyChybu(ch.typ, ch.sprava);
        cb({ vystup: py.out.join(""), chyba: ch });
      }, 10);
    });
  };

  /* ---------- spustenie C++ (online prekladač, potrebuje internet) ---------- */
  /* Najprv Compiler Explorer (godbolt.org), pri výpadku Wandbox (wandbox.org). */
  function bezFarieb(s) { return String(s || "").replace(/\x1b\[[0-9;]*[mK]/g, ""); }
  function texty(a) { return (a || []).map(function (x) { return x.text; }).join("\n"); }
  function godbolt(kod, vstup) {
    return fetch("https://godbolt.org/api/compiler/g132/compile", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ source: kod, lang: "c++", allowStoreCodeDebug: false, options: { userArguments: "-std=c++17 -O1", executeParameters: { args: [], stdin: vstup || "" }, compilerOptions: { executorRequest: true }, filters: { execute: true }, tools: [], libraries: [] } }) })
      .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then(function (j) {
        var b = j.buildResult || {};
        if (b.code && b.code !== 0) { var e = bezFarieb(texty(b.stderr)); return { chybaPrekladu: e || "Program sa nepodarilo preložiť." }; }
        if (!j.didExecute) throw new Error("nespustené");
        return { vystup: bezFarieb(texty(j.stdout)), stderr: bezFarieb(texty(j.stderr)), casovyLimit: !!j.timedOut, kod: j.code };
      });
  }
  function wandbox(kod, vstup, pokus) {
    return fetch("https://wandbox.org/api/compile.json", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ compiler: "gcc-13.2.0", code: kod, stdin: vstup || "", options: "c++17" }) })
      .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then(function (j) {
        var vsetko = (j.compiler_error || "") + (j.program_error || "") + (j.compiler_message || "");
        if (/crun:|Resource temporarily unavailable/.test(vsetko)) {
          if ((pokus || 0) < 2) return new Promise(function (ok) { setTimeout(ok, 1200); }).then(function () { return wandbox(kod, vstup, (pokus || 0) + 1); });
          throw new Error("preťažené");
        }
        if (j.compiler_error && /error:/.test(j.compiler_error)) return { chybaPrekladu: j.compiler_error };
        return { vystup: j.program_output || "", stderr: j.program_error || "", signal: j.signal, kod: +j.status || 0 };
      });
  }
  K.spustiCpp = function (kod, vstup, cb) {
    var hotovo = false;
    var t = setTimeout(function () { if (!hotovo) { hotovo = true; cb({ vystup: "", siet: true, chyba: { sprava: "Prekladač neodpovedá.", preklad: "Prekladač C++ neodpovedá. Skontroluj internet a skús znova.", riadok: 0 } }); } }, 40000);
    function koniec(v) {
      if (hotovo) return; hotovo = true; clearTimeout(t);
      if (v.chybaPrekladu) { var p = K.prelozCppChybu(v.chybaPrekladu); return cb({ vystup: "", chyba: { sprava: v.chybaPrekladu, preklad: p.sprava, riadok: p.riadok } }); }
      var ch = null;
      if (v.casovyLimit || /Killed|CPU/.test(v.signal || "")) ch = { sprava: "timeout", preklad: "Program bežal príliš dlho (nekonečný cyklus?) a bol zastavený.", riadok: 0 };
      else if (v.signal || (v.kod && v.kod > 128)) ch = { sprava: String(v.signal || v.kod), preklad: "Program spadol počas behu. Často je to index mimo poľa alebo delenie nulou.", riadok: 0 };
      cb({ vystup: v.vystup + (v.stderr ? (v.vystup ? "\n" : "") + v.stderr : ""), chyba: ch });
    }
    godbolt(kod, vstup).then(koniec).catch(function () {
      wandbox(kod, vstup).then(koniec).catch(function () {
        if (hotovo) return; hotovo = true; clearTimeout(t);
        cb({ vystup: "", siet: true, chyba: { sprava: "Bez spojenia", preklad: "C++ sa prekladá na internete a spojenie sa nepodarilo. Zapni dáta alebo Wi-Fi a skús znova.", riadok: 0 } });
      });
    });
  };

  /* ---------- zostavenie stránky pre náhľad ---------- */
  var CHYBY_SKRIPT = "<script>window.__vystup=[];(function(){function t(x){if(x===undefined)return'undefined';if(typeof x==='string')return x;if(typeof x==='function')return'funkcia '+(x.name||'');try{return JSON.stringify(x)}catch(e){return String(x)}}" +
    "function f(typ){return function(){var a=[].map.call(arguments,t).join(' ');window.__vystup.push(a);try{parent.postMessage({syntaxLog:a,typ:typ},'*')}catch(e){}}}" +
    "console.log=f('log');console.info=f('log');console.warn=f('warn');console.error=f('error');window.alert=function(x){console.log('[alert] '+t(x));__ukaz('Upozornenie: '+t(x),4000)}})();" +
    "window.onerror=function(m,s,l){try{parent.postMessage({syntaxChyba:String(m),riadok:l},'*')}catch(e){}" +
    "var p=document.createElement('pre');p.style.cssText='color:#c0392b;white-space:pre-wrap;font:13px monospace;background:#fde8e6;padding:8px;border-radius:6px';p.textContent='Chyba: '+m;(document.body||document.documentElement).appendChild(p)};" +
    /* Odkazy v náhľade neotvárajú cudzie stránky: kotvy (#…) posunú stránku, ostatné ukážu, kam by viedli. */
    "function __ukaz(x,ms){var b=document.getElementById('__odkaz')||document.createElement('div');b.id='__odkaz';b.style.cssText='position:fixed;left:8px;right:8px;bottom:8px;background:#141725;color:#fff;font:13px system-ui;padding:9px 12px;border-radius:9px;z-index:99999;white-space:pre-wrap';" +
    "b.textContent=x;document.body.appendChild(b);clearTimeout(window.__t);window.__t=setTimeout(function(){b.remove()},ms||3000)}" +
    "document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;e.preventDefault();var h=a.getAttribute('href');" +
    "if(h.charAt(0)==='#'){var t=document.getElementById(h.slice(1));if(t)t.scrollIntoView({behavior:'smooth'});return}" +
    "__ukaz('Odkaz by otvoril: '+h+(a.target==='_blank'?' (v novej karte)':''))});" +
    /* Formulár sa v náhľade neodošle: ukážeme, aké údaje by poslal. */
    "document.addEventListener('submit',function(e){if(e.defaultPrevented)return;e.preventDefault();var f=e.target,r=[];" +
    "try{new FormData(f,e.submitter).forEach(function(v,k){r.push(k+' = '+(typeof v==='string'?(v===''?'(prázdne)':v):(v.name||'(súbor)')))})}catch(er){}" +
    "__ukaz('Formulár by odoslal'+(f.getAttribute('action')?' na '+f.getAttribute('action'):'')+' ('+(f.method||'get').toUpperCase()+'):\\n'+(r.length?r.join('\\n'):'žiadne údaje – polia nemajú atribút name'),6000)});<\/script>";
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
    py: ["Tab", "(", ")", ":", "=", "\"", "'", "[", "]", "{", "}", "+", "-", "*", "/", "<", ">", "#", ","],
    cpp: ["Tab", ";", "{", "}", "(", ")", "<", ">", "=", "\"", "[", "]", "+", "-", "*", "/", "&", "|", "!", "#", ":", ","],
  };
  var NAZVY = { html: "HTML", css: "CSS", js: "JS", py: "Python", cpp: "C++" };
  var PARY = { "(": ")", "[": "]", "{": "}", "\"": "\"", "'": "'" };

  /* opts: { subory:{html,css,js}, karty:["html",...], aktivna, vyska, onZmena(subory) } */
  K.Editor = function (opts) {
    var subory = opts.subory, karty = opts.karty || ["html"], akt = opts.aktivna || karty[0];
    var el = K.el('<div class="ed"><div class="ed-karty"></div><div class="ed-plocha"><div class="ed-cisla"></div><div class="ed-chyba-riadok" hidden></div><pre><code></code></pre>' +
      '<textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Editor kódu"></textarea></div><div class="znaky"></div></div>');
    if (opts.vyska) el.querySelector(".ed-plocha").style.setProperty("--vyska", opts.vyska);
    var ta = el.querySelector("textarea"), pre = el.querySelector("pre"), code = el.querySelector("code"),
        cisla = el.querySelector(".ed-cisla"), pas = el.querySelector(".ed-chyba-riadok"), znaky = el.querySelector(".znaky"), vnutri = false, chybaRiadok = 0;

    function TAB() { return akt === "py" || akt === "cpp" ? "    " : "  "; }
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
        if (/\{\s*$/.test(riad) || (akt === "py" && /:\s*(#.*)?$/.test(riad)) || (otv &&PRAZDNE.indexOf(otv[1].toLowerCase()) < 0)) odsad += TAB();
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
    ta.addEventListener("keydown", function (e) { if (e.key === "Tab") { e.preventDefault(); vloz(TAB()); } });
    znaky.addEventListener("pointerdown", function (e) { if (e.target.closest("button")) e.preventDefault(); });
    znaky.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var z = b.dataset.z;
      if (z === "spat") { ta.focus(); try { document.execCommand("undo"); } catch (er) {} zmena(); return; }
      vloz(z === "Tab" ? TAB() : z);
    });
    el.querySelector(".ed-karty").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) nastavKartu(b.dataset.k); });
    nastavKartu(akt);

    var api = {
      el: el,
      subory: function () { return subory; },
      nastav: function (nove) { subory = nove; nastavKartu(akt); if (opts.onZmena) opts.onZmena(subory, akt); },
      karta: nastavKartu,
      oznacChybu: function (r) { chybaRiadok = r || 0; synchronizuj(); },
    };
    el.__ed = api;
    return api;
  };

  /* Náhľad: iframe so stránkou zostavenou zo súborov. */
  K.Nahlad = function (vyska) {
    var el = K.el('<div class="nahlad"><div class="stitok"><i></i>Výsledok</div><iframe sandbox="allow-scripts allow-same-origin allow-modals" title="Náhľad stránky"></iframe>' +
      '<div class="konzola" hidden><div class="stitok">Konzola</div><pre></pre></div></div>');
    var fr = el.querySelector("iframe"), tm, konz = el.querySelector(".konzola"), kpre = konz.querySelector("pre");
    if (vyska) fr.style.setProperty("--vyska-n", vyska);
    function log(e) {
      if (!e.data || e.data.syntaxLog === undefined || e.source !== fr.contentWindow) return;
      konz.hidden = false;
      var r = document.createElement("div"); r.className = "k-" + (e.data.typ || "log"); r.textContent = e.data.syntaxLog; kpre.appendChild(r);
    }
    window.addEventListener("message", log);
    function nacitaj(subory) { kpre.textContent = ""; konz.hidden = !el.classList.contains("len-konzola"); fr.srcdoc = K.zostavStranku(subory); }
    return {
      el: el, iframe: fr,
      spusti: function (subory, hned) {
        clearTimeout(tm);
        var f = function () { nacitaj(subory); };
        if (hned) f(); else tm = setTimeout(f, 350);
      },
      /* Spustí a po načítaní zavolá cb(document). */
      over: function (subory, cb) {
        clearTimeout(tm);
        fr.onload = function () { fr.onload = null; setTimeout(function () { var d = null; try { d = fr.contentDocument; } catch (e) {} cb(d); }, 60); };
        nacitaj(subory);
      },
    };
  };

  /* Výstup programu (Python, C++): voliteľný vstup, tlačidlo Spustiť a text, ktorý program vypísal.
     opts: { jazyk:"py"|"cpp", vstup:"…" (ak program číta vstup), spusti(): {kod} } */
  K.Vystup = function (opts) {
    var el = K.el('<div class="nahlad vystup-panel">' +
      (opts.vstup !== undefined ? '<label class="vstup"><span class="stitok">Vstup · každá hodnota na novom riadku</span><textarea rows="2" spellcheck="false" autocapitalize="off"></textarea></label>' : "") +
      '<div class="vystup-hlava"><div class="stitok"><i></i>Výstup</div><button type="button" class="btn sek spustit">▶ Spustiť</button></div><pre class="vystup tlmene">Ťukni na ▶ Spustiť a uvidíš, čo program vypíše.</pre></div>');
    var pre = el.querySelector("pre"), ta = el.querySelector("textarea"), tl = el.querySelector(".spustit");
    if (ta) ta.value = opts.vstup;
    function vstup() { return ta ? ta.value : ""; }
    function spusti(kod, cb) {
      tl.disabled = true; pre.className = "vystup tlmene";
      pre.textContent = opts.jazyk === "cpp" ? "Prekladám a spúšťam na internete…" : (K._pyPripraveny ? "Spúšťam…" : "Pripravujem Python (prvýkrát to chvíľu trvá)…");
      var hotovo = function (r) {
        K._pyPripraveny = true; tl.disabled = false;
        pre.className = "vystup" + (r.chyba ? " s-chybou" : "");
        pre.textContent = (r.vystup || "") + (r.chyba ? (r.vystup ? "\n" : "") + "⚠ " + (r.chyba.riadok ? "Riadok " + r.chyba.riadok + ": " : "") + r.chyba.preklad : "");
        if (!r.vystup && !r.chyba) { pre.className = "vystup tlmene"; pre.textContent = "(program nič nevypísal)"; }
        if (cb) cb(r);
      };
      if (opts.jazyk === "cpp") K.spustiCpp(kod, vstup(), hotovo);
      else K.spustiPython(kod, vstup().split("\n").filter(function (x, i, a) { return x !== "" || i < a.length - 1; }), hotovo);
    }
    tl.onclick = function () { if (opts.spusti) spusti(opts.spusti()); };
    return { el: el, spusti: spusti, vstup: vstup };
  };

  /* Statický blok kódu so zvýraznením (v lekciách). */
  K.blokKodu = function (text, jazyk, stitok) {
    return '<pre class="kod">' + (stitok ? '<span class="kod-stitok">' + esc(stitok) + "</span>" : "") + K.zvyrazni(text, jazyk || "html") + "</pre>";
  };
})();
