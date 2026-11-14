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
  /* Zvýrazňovanie pre C, Javu, C# a Kotlin (jazyky s podobnou syntaxou) */
  var HL_CLIKE = {
    c: { kw: "int|double|float|char|void|long|short|unsigned|signed|const|return|if|else|for|while|do|break|continue|switch|case|default|struct|typedef|enum|sizeof|static|NULL|bool|true|false", fn: "printf|scanf|main|strlen|strcpy|strcmp|strcat|sqrt|pow|fgets|puts|malloc|free", pre: true },
    java: { kw: "public|private|protected|class|static|void|int|double|float|long|char|boolean|byte|short|String|final|return|if|else|for|while|do|break|continue|switch|case|default|new|this|null|true|false|import|package|extends|implements|interface|try|catch|throw|throws|var|record|enum", fn: "System|out|println|print|printf|main|Scanner|nextInt|nextLine|nextDouble|Math|ArrayList|List|length|size|add|get|equals" },
    cs: { kw: "using|namespace|public|private|protected|class|struct|static|void|int|double|float|long|char|bool|string|decimal|var|const|readonly|return|if|else|for|foreach|in|while|do|break|continue|switch|case|default|new|this|null|true|false|get|set|override|virtual|interface|try|catch|throw|enum|record", fn: "Console|WriteLine|Write|ReadLine|Main|Parse|Math|List|Length|Count|Add|ToString|ToUpper|Split" },
    kt: { kw: "fun|val|var|if|else|when|for|while|do|in|is|as|return|break|continue|class|data|object|interface|open|override|private|public|internal|null|true|false|this|until|downTo|step|import|package|enum|companion|lateinit", fn: "println|print|readln|readLine|main|listOf|mutableListOf|mapOf|mutableMapOf|toInt|toDouble|toString|size|forEach|map|filter|sum|maxOrNull|minOrNull|repeat" },
  };
  function hlClike(src, d) {
    return tokenizuj(src, new RegExp("(\\/\\/.*|\\/\\*[\\s\\S]*?(?:\\*\\/|$))|" + (d.pre ? "(#\\s*\\w+)" : "(#\\w+(?!\\w))") + "|(\\$?\"(?:\\\\.|[^\"\\\\\\n])*\"?|'(?:\\\\.|[^'\\\\\\n])*'?|<[a-z_.]+\\.h>)|\\b(\\d+\\.?\\d*[fFLdD]?)\\b|\\b(" + d.kw + ")\\b|\\b(" + d.fn + ")\\b", "gm"), function (m) {
      if (m[1]) return span("t-com", m[1]);
      if (m[2]) return span("t-tag", m[2]);
      if (m[3]) return span("t-str", m[3]);
      if (m[4]) return span("t-num", m[4]);
      if (m[5]) return span("t-kw", m[5]);
      return span("t-sel", m[6]);
    });
  }
  var CPP_KW ="int|double|float|char|bool|void|long|short|unsigned|const|auto|string|vector|return|if|else|for|while|do|break|continue|switch|case|default|class|struct|public|private|protected|new|delete|true|false|using|namespace|std|include|nullptr|this|static|template|typename";
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
  var SQL_KW = "SELECT|FROM|WHERE|AND|OR|NOT|IN|IS|NULL|LIKE|BETWEEN|ORDER|BY|ASC|DESC|LIMIT|OFFSET|GROUP|HAVING|AS|DISTINCT|JOIN|INNER|LEFT|RIGHT|OUTER|ON|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|ADD|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|DEFAULT|CHECK|INTEGER|TEXT|REAL|CASE|WHEN|THEN|ELSE|END|UNION|ALL|EXISTS|AUTOINCREMENT";
  function hlSql(src) {
    return tokenizuj(src, new RegExp("(--.*)|('(?:''|[^'])*'?)|\\b(\\d+\\.?\\d*)\\b|\\b(" + SQL_KW + ")\\b|\\b(COUNT|SUM|AVG|MIN|MAX|ROUND|LENGTH|UPPER|LOWER|SUBSTR|COALESCE|IFNULL|ABS|DATE|STRFTIME|REPLACE|TRIM)(?=\\s*\\()", "gi"), function (m) {
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
    if (jazyk === "py" || jazyk === "python") return hlPy(src);
    if (jazyk === "cpp") return hlCpp(src);
    if (HL_CLIKE[jazyk]) return hlClike(src, HL_CLIKE[jazyk]);
    if (jazyk === "sql") return hlSql(src);
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
    [/^Zastavene$/, /./, "Program sa točí príliš dlho a zastavil som ho. Asi je to nekonečný cyklus: skontroluj, či sa podmienka cyklu niekedy stane nepravdivou (napr. či zvyšuješ počítadlo)."],
    [/^Zastavene$/, /./, "Program sa točí príliš dlho a zastavil som ho. Asi je to nekonečný cyklus: skontroluj, či sa podmienka cyklu niekedy stane nepravdivou (napr. či zvyšuješ počítadlo)."],
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
    [/expected ';' before|expected ';' at end|expected ',' or ';' before/, "Chýba bodkočiarka ; na konci príkazu (často na riadku vyššie)."],
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
  var C_CHYBY = [
    [/'(\w+)' undeclared/, "„$1“ nie je vytvorené. Vytvor premennú (napr. int $1;) alebo skontroluj preklep."],
    [/implicit declaration of function '(\w+)'/, "Funkciu $1 prekladač nepozná. Chýba #include (napr. <stdio.h>, <string.h>, <math.h>) alebo je v mene preklep."],
    [/format '%(\w+)' expects argument of type '(.+?)'/, "Formát %$1 v printf/scanf čaká hodnotu typu $2. Skontroluj, či formát sedí s typom premennej (%d celé, %f desatinné, %s text, %c znak)."],
    [/unknown type name '(\w+)'/, "Typ $1 neexistuje. V C nie je string ani bool bez #include <stdbool.h>; text je pole znakov char[]."],
  ];
  var JAVA_CHYBY = [
    [/';' expected/, "Chýba bodkočiarka ; na konci príkazu."],
    [/cannot find symbol[\s\S]*?symbol:\s+(?:variable|method|class)\s+(\w+)/, "„$1“ neexistuje. Vytvoril si túto premennú/metódu? Skontroluj preklep a veľké a malé písmená (Java ich rozlišuje: String, System)."],
    [/cannot find symbol/, "Niečo z tohto riadku neexistuje. Skontroluj preklepy a veľké a malé písmená."],
    [/incompatible types: (.+?) cannot be converted to (.+)/, "Nesprávny typ: $1 sa nedá uložiť do $2."],
    [/incompatible types: possible lossy conversion from (\w+) to (\w+)/, "Prevodom z $1 na $2 by sa stratila časť hodnoty. Použi pretypovanie, napr. ($2)."],
    [/reached end of file while parsing/, "Chýba zatváracia zložená zátvorka }."],
    [/unclosed string literal/, "Text nie je uzavretý úvodzovkami."],
    [/missing return statement/, "Metóda má vrátiť hodnotu, ale chýba return."],
    [/variable (\w+) might not have been initialized/, "Premenná $1 ešte nemá hodnotu. Priraď jej hodnotu pred použitím."],
    [/variable (\w+) is already defined/, "Premenná $1 už existuje. Druhýkrát ju nevytváraj (bez typu pred menom)."],
    [/cannot assign a value to final variable (\w+)/, "$1 je konštanta (final), nedá sa zmeniť."],
    [/'\)' expected|'\)' or ',' expected/, "Chýba zatváracia zátvorka )."],
    [/class, interface, enum, or record expected/, "Kód je mimo triedy, alebo je navyše zátvorka }."],
    [/bad operand types for binary operator '(.+?)'/, "Operátor $1 sa nedá použiť na tieto typy. Text porovnávaj cez .equals(), nie ==."],
    [/non-static (?:method|variable) (\w+)/, "$1 nie je static. Z metódy main voláš len static metódy (alebo si vytvor objekt)."],
    [/illegal start of expression/, "Na tomto mieste Java nečaká takýto zápis. Skontroluj zátvorky a bodkočiarky."],
    [/not a statement/, "Toto nie je príkaz. Chýba priradenie alebo volanie?"],
  ];
  var CS_CHYBY = [
    [/CS1002/, "Chýba bodkočiarka ; na konci príkazu."],
    [/CS0103: The name '(\w+)' does not exist/, "„$1“ neexistuje. Vytvoril si túto premennú? Skontroluj preklep a veľké a malé písmená (C# ich rozlišuje: Console, WriteLine)."],
    [/CS0029: Cannot implicitly convert type '(.+?)' to '(.+?)'/, "Hodnotu typu $1 nemožno uložiť do $2. Na prevod textu na číslo použi int.Parse(…)."],
    [/CS0266: Cannot implicitly convert type '(.+?)' to '(.+?)'/, "Prevod z $1 na $2 treba zapísať výslovne, napr. ($2)hodnota."],
    [/CS1513/, "Chýba zatváracia zložená zátvorka }."],
    [/CS1026/, "Chýba zatváracia zátvorka )."],
    [/CS1010/, "Text nie je uzavretý úvodzovkami."],
    [/CS0161/, "Metóda má vrátiť hodnotu, ale nie vo všetkých prípadoch je return."],
    [/CS0165: Use of unassigned local variable '(\w+)'/, "Premenná $1 ešte nemá hodnotu."],
    [/CS0128: A local variable or function named '(\w+)' is already defined/, "Premenná $1 už existuje. Druhýkrát ju nevytváraj."],
    [/CS0117|CS1061: '(.+?)' does not contain a definition for '(\w+)'/, "$1 nemá $2. Nepreklepol si sa?"],
    [/CS0120/, "Táto metóda nie je static. Z Main voláš len static metódy (alebo si vytvor objekt)."],
    [/CS0019: Operator '(.+?)' cannot be applied/, "Operátor $1 sa nedá použiť na tieto typy."],
    [/CS0131/, "Na ľavej strane = musí byť premenná."],
  ];
  var KT_CHYBY = [
    [/Unresolved reference[:']?\s*'?(\w+)/, "„$1“ neexistuje. Vytvoril si túto premennú/funkciu? Skontroluj preklep a veľké a malé písmená."],
    [/(?:Initializer type mismatch|Type mismatch|Assignment type mismatch|Argument type mismatch|Return type mismatch): (?:inferred type is|expected|actual) '?(\w+)'?.*?'?(\w+)'?\.?$/, "Nesprávny typ hodnoty. Text na číslo prevedieš cez .toInt(), číslo na text cez .toString()."],
    [/mismatch/, "Nesprávny typ hodnoty. Text na číslo prevedieš cez .toInt(), číslo na text cez .toString()."],
    [/'val' cannot be reassigned|Val cannot be reassigned/, "Premennú val nemožno zmeniť. Ak sa má meniť, vytvor ju cez var."],
    [/Expecting '\)'/, "Chýba zatváracia zátvorka )."],
    [/Expecting '\}'|Missing '\}'/, "Chýba zatváracia zložená zátvorka }."],
    [/Expecting '"'|Unclosed string|Expecting an expression/, "Neúplný zápis: chýba hodnota alebo úvodzovka."],
    [/must be initialized/, "Premenná musí mať hodnotu hneď pri vytvorení."],
    [/'return' expression required|Missing return/, "Funkcia má vrátiť hodnotu, ale chýba return."],
    [/Conflicting declarations?|already declared/, "Toto meno už existuje. Druhýkrát ho nevytváraj."],
    [/Only safe \(\?\.\) or non-null asserted \(!!\.\) calls are allowed/, "Hodnota môže byť null. Použi ?. alebo ?: (napr. readLine() ?: \"\")."],
    [/None of the following candidates is applicable|No value passed for parameter '(\w+)'/, "Funkcia dostala nesprávne hodnoty (počet alebo typ argumentov)."],
    [/Cannot infer type/, "Prekladač nevie určiť typ. Často je príčinou neexistujúca trieda alebo funkcia na tomto riadku."],
    [/This type is final, so it cannot be (?:inherited from|extended)/, "Z tejto triedy sa nedá dediť. Označ ju ako open class."],
    [/'(\w+)' hides member of supertype|'(\w+)' must override/, "Metódu predka treba prepísať cez override (a predok ju musí mať open)."],
  ];
  function prvaZhoda(tab, msg) {
    for (var j = 0; j < tab.length; j++) { var m = tab[j][0].exec(msg); if (m) return tab[j][1].replace(/\$(\d)/g, function (_, n) { return m[+n] || ""; }); }
    return null;
  }
  /* Chyba prekladu → { sprava (po slovensky), riadok } */
  K.prelozChybuPrekladu = function (jazyk, text) {
    text = text || "";
    if (jazyk === "cpp") return K.prelozCppChybu(text);
    if (jazyk === "kt") return { sprava: prvaZhoda(KT_CHYBY, text) || "Chyba v kóde: " + text, riadok: 0 };
    var riadky = text.split("\n"), i, prvy = null, cast;
    for (i = 0; i < riadky.length; i++) if (/error/.test(riadky[i]) && !/warning/.test(riadky[i])) { prvy = riadky[i]; break; }
    if (!prvy) return { sprava: text.trim().split("\n")[0] || "Program sa nepodarilo preložiť.", riadok: 0 };
    var r;
    if (jazyk === "c") {
      r = /(?:prog\.c|<source>|example\.c):(\d+):/.exec(prvy);
      var msgC = prvy.replace(/^.*error:\s*/, "");
      return { sprava: prvaZhoda(C_CHYBY, msgC) || prvaZhoda(CPP_CHYBY, msgC) || "Chyba prekladača: " + msgC, riadok: r ? +r[1] : 0 };
    }
    if (jazyk === "java") {
      r = /(?:\.java|<source>):(\d+):/.exec(prvy);
      cast = riadky.slice(i, i + 5).join("\n");
      return { sprava: prvaZhoda(JAVA_CHYBY, cast) || "Chyba prekladača: " + prvy.replace(/^.*error:\s*/, ""), riadok: r ? +r[1] : 0 };
    }
    if (jazyk === "cs") {
      r = /\((\d+),\d+\): error/.exec(prvy);
      return { sprava: prvaZhoda(CS_CHYBY, prvy) || "Chyba prekladača: " + prvy.replace(/^.*error\s*/, ""), riadok: r ? +r[1] : 0 };
    }
    return { sprava: text, riadok: 0 };
  };
  var BEH_CHYBY = [
    [/ArithmeticException|DivideByZeroException|divide by zero|Floating point exception/i, "Delenie nulou. Nulou sa deliť nedá."],
    [/IndexOutOfBounds|IndexOutOfRange|ArgumentOutOfRange|out of bounds|index out of range/i, "Index je mimo poľa/zoznamu. Prvky majú indexy 0 až dĺžka − 1."],
    [/NumberFormatException|FormatException/, "Text sa nedá premeniť na číslo. Skontroluj vstup a prevod (parse/toInt)."],
    [/InputMismatchException/, "Vstup nie je číslo, hoci program čaká číslo."],
    [/NoSuchElementException|Vstup sa minul|NullReferenceException.*ReadLine/, "Program chce čítať ďalší vstup, ale vstup sa minul."],
    [/NullPointerException|NullReferenceException|null/, "Pracuješ s hodnotou null (nič). Premenná alebo objekt nemá hodnotu."],
    [/StackOverflow/i, "Funkcia volá sama seba donekonečna (chýba základný prípad rekurzie)."],
    [/OutOfMemory/i, "Programu došla pamäť (príliš veľké pole alebo nekonečné pridávanie)."],
  ];
  /* Chyba za behu (výnimka) → objekt chyby alebo null */
  K.prelozChybuBehu = function (jazyk, stderr, riadok) {
    if (!stderr || !/Exception|Error|exception|Vstup sa minul/.test(stderr)) return null;
    if ((jazyk === "c" || jazyk === "cpp") && !/terminate called|exception/.test(stderr)) return null;
    var r = riadok || 0, m = /\.java:(\d+)\)|:line (\d+)/.exec(stderr);
    if (!r && m) r = +(m[1] || m[2]);
    var prvy = stderr.split("\n").filter(function (x) { return /\S/.test(x); })[0] || stderr;
    return { sprava: prvy, preklad: prvaZhoda(BEH_CHYBY, stderr) || "Program spadol počas behu: " + prvy, riadok: r };
  };
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
      "class Zastavene(Exception): pass", "_poc = [0]", "def _sc_k():", "  _poc[0] += 1", "  if _poc[0] > 300000: raise Zastavene('cyklus')", "  return True",
      "def _sc_it(it):", "  for x in it:", "    _sc_k()", "    yield x",
      "def spusti(src):", "  _poc[0] = 0", "  try:", "    exec(compile(src, 'program', 'exec'), {'__name__': '__main__', '_sc_k': _sc_k, '_sc_it': _sc_it})", "  except SyntaxError as e:", "    window.pyChyba(type(e).__name__, str(e.msg), e.lineno or 0)",
      "  except BaseException as e:", "    tb = e.__traceback__", "    r = 0", "    while tb is not None:", "      if tb.tb_frame.f_code.co_filename == 'program': r = tb.tb_lineno", "      tb = tb.tb_next",
      "    window.pyChyba(type(e).__name__, str(e), r)", "window.pySpusti = spusti"].join("\n"));
  }
  /* Poistka proti nekonečnému cyklu: hlavičky while/for sa obalia počítadlom (čísla riadkov ostanú rovnaké). */
  K.pyStraz = function (src) {
    return src.split("\n").map(function (r) {
      var m = /^(\s*)while\s+(.+):\s*(#.*)?$/.exec(r);
      if (m) return m[1] + "while _sc_k() and (" + m[2] + "):";
      m = /^(\s*)for\s+(.+?)\s+in\s+(.+):\s*(#.*)?$/.exec(r);
      if (m) return m[1] + "for " + m[2] + " in _sc_it(" + m[3] + "):";
      return r;
    }).join("\n");
  };
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
        try { window.pySpusti(K.pyStraz(kod)); } catch (e) { py.chyba = { typ: "Chyba", sprava: String(e && e.message || e), riadok: 0 }; }
        var ch = py.chyba; if (ch) ch.preklad = K.prelozPyChybu(ch.typ, ch.sprava);
        cb({ vystup: py.out.join(""), chyba: ch });
      }, 10);
    });
  };

  /* Synchrónne spustenie (Python už musí byť načítaný) – na kontroly s viacerými vstupmi. Vráti {vystup, chyba}. */
  K.spustiPythonHned = function (kod, vstupy) {
    if (py.stav !== 2) return { vystup: "", chyba: { typ: "Chyba", sprava: "Python nie je načítaný", riadok: 0 } };
    var star = { out: py.out, chyba: py.chyba, vstupy: window.pyVstupy };
    py.out = []; py.chyba = null; window.pyVstupy = (vstupy || []).slice();
    try { window.pySpusti(K.pyStraz(kod)); } catch (e) { py.chyba = { typ: "Chyba", sprava: String(e && e.message || e), riadok: 0 }; }
    var v = { vystup: py.out.join(""), chyba: py.chyba };
    py.out = star.out; py.chyba = star.chyba; window.pyVstupy = star.vstupy;
    return v;
  };

  /* ---------- spustenie C++ (online prekladač, potrebuje internet) ---------- */
  /* Najprv Compiler Explorer (godbolt.org), pri výpadku Wandbox (wandbox.org). */
  function bezFarieb(s) { return String(s || "").replace(/\x1b\[[0-9;]*[mK]/g, ""); }
  function texty(a) { return (a || []).map(function (x) { return x.text; }).join("\n"); }
  /* Jazyky prekladané na internete: Compiler Explorer (hlavný) a Wandbox (záloha). */
  var JAVA_UTF8 = " System.setOut(new java.io.PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.out), true, java.nio.charset.StandardCharsets.UTF_8));";
  function javaBezPublic(kod) { return kod.replace(/^(\s*)public\s+(final\s+)?class\b/m, "$1$2class"); }
  var KOMPIL = {
    cpp: { nazov: "C++", ce: "g132", ceLang: "c++", ceArgs: "-std=c++17 -O1", wb: "gcc-13.2.0", wbOpt: { options: "c++17" } },
    c: { nazov: "C", ce: "cg132", ceLang: "c", ceArgs: "-std=c17 -O1", wb: "gcc-13.2.0-c", wbOpt: {} },
    /* Java: verejná trieda by musela byť v súbore Main.java a výstup treba prepnúť na UTF-8 (v tom istom riadku, aby sedeli čísla riadkov). */
    java: { nazov: "Java", ce: "java2500", ceLang: "java", ceArgs: "", wb: "openjdk-jdk-22+36", wbOpt: { "runtime-option-raw": "-Dstdout.encoding=UTF-8" },
      ceKod: function (k) { return javaBezPublic(k).replace(/(static\s+void\s+main\s*\([^)]*\)\s*(?:throws\s+[\w.,\s]+)?\{)/, "$1" + JAVA_UTF8); }, wbKod: javaBezPublic },
    cs: { nazov: "C#", ce: "dotnet90csharpcoreclr", ceLang: "csharp", ceArgs: "", wb: "dotnetcore-8.0.402", wbOpt: {} },
  };
  function godbolt(j, kod, vstup) {
    return fetch("https://godbolt.org/api/compiler/" + j.ce + "/compile", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ source: j.ceKod ? j.ceKod(kod) : kod, lang: j.ceLang, allowStoreCodeDebug: false, options: { userArguments: j.ceArgs, executeParameters: { args: [], stdin: vstup || "" }, compilerOptions: { executorRequest: true }, filters: { execute: true }, tools: [], libraries: [] } }) })
      .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then(function (o) {
        var b = o.buildResult || {};
        if (b.code && b.code !== 0) { var e = bezFarieb(texty(b.stderr) + "\n" + texty(b.stdout)); return { chybaPrekladu: e.trim() || "Program sa nepodarilo preložiť." }; }
        if (!o.didExecute) throw new Error("nespustené");
        return { vystup: bezFarieb(texty(o.stdout)), stderr: bezFarieb(texty(o.stderr)), casovyLimit: !!o.timedOut, kod: o.code };
      });
  }
  function wandbox(j, kod, vstup, pokus) {
    var telo = { compiler: j.wb, code: j.wbKod ? j.wbKod(kod) : kod, stdin: vstup || "" };
    Object.keys(j.wbOpt).forEach(function (x) { telo[x] = j.wbOpt[x]; });
    return fetch("https://wandbox.org/api/compile.json", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(telo) })
      .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then(function (o) {
        var vsetko = (o.compiler_error || "") + (o.program_error || "") + (o.compiler_message || "");
        if (/crun:|Resource temporarily unavailable/.test(vsetko)) {
          if ((pokus || 0) < 2) return new Promise(function (ok) { setTimeout(ok, 1200); }).then(function () { return wandbox(j, kod, vstup, (pokus || 0) + 1); });
          throw new Error("preťažené");
        }
        if (o.compiler_error && /error/.test(o.compiler_error) && !o.program_output && o.status !== "0") return { chybaPrekladu: o.compiler_error };
        return { vystup: o.program_output || "", stderr: o.program_error || "", signal: o.signal, kod: +o.status || 0 };
      });
  }
  /* cb({vystup, chyba:{sprava, preklad, riadok}, siet}) */
  K.spustiKompil = function (jazyk, kod, vstup, cb) {
    var j = KOMPIL[jazyk], hotovo = false;
    var t = setTimeout(function () { if (!hotovo) { hotovo = true; cb({ vystup: "", siet: true, chyba: { sprava: "Prekladač neodpovedá.", preklad: "Prekladač " + j.nazov + " neodpovedá. Skontroluj internet a skús znova.", riadok: 0 } }); } }, 45000);
    function koniec(v) {
      if (hotovo) return; hotovo = true; clearTimeout(t);
      if (v.chybaPrekladu) { var p = K.prelozChybuPrekladu(jazyk, v.chybaPrekladu); return cb({ vystup: "", chyba: { sprava: v.chybaPrekladu, preklad: p.sprava, riadok: p.riadok } }); }
      var ch = null, behu = K.prelozChybuBehu(jazyk, v.stderr || "");
      if (v.casovyLimit || /Killed|CPU/.test(v.signal || "")) ch = { sprava: "timeout", preklad: "Program bežal príliš dlho (nekonečný cyklus?) a bol zastavený.", riadok: 0 };
      else if (behu) ch = behu;
      else if (v.signal || (v.kod && v.kod > 128) || (jazyk !== "c" && jazyk !== "cpp" && v.kod)) ch = { sprava: String(v.signal || v.kod), preklad: "Program spadol počas behu. Často je to index mimo poľa alebo delenie nulou.", riadok: 0 };
      cb({ vystup: v.vystup + (v.stderr && !behu ? (v.vystup ? "\n" : "") + v.stderr : ""), chyba: ch });
    }
    godbolt(j, kod, vstup).then(koniec).catch(function () {
      wandbox(j, kod, vstup).then(koniec).catch(function () {
        if (hotovo) return; hotovo = true; clearTimeout(t);
        cb({ vystup: "", siet: true, chyba: { sprava: "Bez spojenia", preklad: j.nazov + " sa prekladá na internete a spojenie sa nepodarilo. Zapni dáta alebo Wi-Fi a skús znova.", riadok: 0 } });
      });
    });
  };
  K.spustiCpp = function (kod, vstup, cb) { K.spustiKompil("cpp", kod, vstup, cb); };

  /* ---------- Kotlin: Kotlin Playground (api.kotlinlang.org) ---------- */
  /* Playground nevie čítať vstup, preto na koniec programu pridáme vlastné readln/readLine so vstupom ako zoznamom riadkov
     (deklarácie v tom istom súbore majú prednosť pred kotlin.io; čísla riadkov programu sa nezmenia). */
  /* POST s JSON. V aplikácii ide cez Flutter (kanál SyntaxSiet), lebo server Kotlinu neprijíma požiadavky
     zo stránky načítanej zo súboru (pôvod „null“). V prehliadači obyčajný fetch. */
  var sietCakaju = {}, sietId = 0;
  K._sietOdpoved = function (id, uspech, text) {
    var c = sietCakaju[id]; if (!c) return; delete sietCakaju[id];
    if (!uspech) return c.nie(new Error(text));
    try { c.ok(JSON.parse(text)); } catch (e) { c.nie(e); }
  };
  K.postJson = function (url, telo) {
    if (window.SyntaxSiet && window.SyntaxSiet.postMessage) {
      return new Promise(function (ok, nie) {
        var id = ++sietId; sietCakaju[id] = { ok: ok, nie: nie };
        window.SyntaxSiet.postMessage(JSON.stringify({ id: id, url: url, telo: JSON.stringify(telo) }));
      });
    }
    return fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(telo) })
      .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); });
  };
  function ktText(s) { return '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\$/g, "\\$") + '"'; }
  K.spustiKotlin = function (kod, vstup, cb) {
    var riadky = (vstup || "").replace(/\r/g, "").split("\n"); if (riadky.length && riadky[riadky.length - 1] === "") riadky.pop();
    var doplnok = "\n\nprivate val __vstupSC = mutableListOf<String>(" + riadky.map(ktText).join(", ") + ")\n" +
      "fun readln(): String = if (__vstupSC.isEmpty()) throw IllegalStateException(\"Vstup sa minul\") else __vstupSC.removeAt(0)\n" +
      "fun readLine(): String? = if (__vstupSC.isEmpty()) null else __vstupSC.removeAt(0)\n";
    var hotovo = false;
    var t = setTimeout(function () { if (!hotovo) { hotovo = true; cb({ vystup: "", siet: true, chyba: { sprava: "timeout", preklad: "Server Kotlinu neodpovedá. Skontroluj internet a skús znova.", riadok: 0 } }); } }, 45000);
    K.postJson("https://api.kotlinlang.org/api/2.1.0/compiler/run", { args: "", confType: "java", files: [{ name: "File.kt", text: kod + doplnok }] })
      .then(function (o) {
        if (hotovo) return; hotovo = true; clearTimeout(t);
        var chyby = ((o.errors || {})["File.kt"] || []).filter(function (e) { return e.severity === "ERROR"; });
        /* Neexistujúce meno je príčina, ostatné chyby sú často len jej následok – ukáž ju prvú. */
        chyby.sort(function (a, b) { return (/Unresolved reference/.test(b.message) ? 1 : 0) - (/Unresolved reference/.test(a.message) ? 1 : 0); });
        if (chyby.length) { var e = chyby[0], r0 = e.interval && e.interval.start ? e.interval.start.line + 1 : 0; return cb({ vystup: "", chyba: { sprava: e.message, preklad: K.prelozChybuPrekladu("kt", e.message).sprava, riadok: r0 } }); }
        var text = o.text || "", out = "", err = "";
        text.replace(/<outStream>([\s\S]*?)<\/outStream>|<errStream>([\s\S]*?)<\/errStream>/g, function (_, a, b) { if (a !== undefined) out += a; if (b !== undefined) err += b; return ""; });
        var dek = function (s) { return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&"); };
        out = dek(out); err = dek(err);
        if (/taking too long/.test(err)) return cb({ vystup: out, chyba: { sprava: "timeout", preklad: "Program bežal príliš dlho (nekonečný cyklus?) a bol zastavený.", riadok: 0 } });
        if (o.exception) {
          var ex = o.exception, riadok = 0;
          (ex.stackTrace || []).some(function (s) { if (s.fileName === "File.kt" && s.lineNumber > 0) { riadok = s.lineNumber; return true; } });
          var pocet = kod.split("\n").length; if (riadok > pocet) riadok = 0;
          return cb({ vystup: out, chyba: K.prelozChybuBehu("kt", (ex.fullName || "") + ": " + (ex.message || ""), riadok) });
        }
        cb({ vystup: out + (err ? (out ? "\n" : "") + err : ""), chyba: null });
      })
      .catch(function () {
        if (hotovo) return; hotovo = true; clearTimeout(t);
        cb({ vystup: "", siet: true, chyba: { sprava: "Bez spojenia", preklad: "Kotlin sa spúšťa na internete a spojenie sa nepodarilo. Zapni dáta alebo Wi-Fi a skús znova.", riadok: 0 } });
      });
  };
  K.PREKLADANE = ["cpp", "c", "java", "cs", "kt"];
  K.PROGRAMY = ["py", "sql"].concat(K.PREKLADANE);

  /* ---------- SQL (sql.js bez WebAssembly – beží offline v telefóne) ---------- */
  var sqlS = { stav: 0, cakaju: [], SQL: null, db: null };
  K.nacitajSql = function (cb) {
    if (sqlS.stav === 2) return cb(true);
    sqlS.cakaju.push(cb);
    if (sqlS.stav === 1) return;
    sqlS.stav = 1;
    function koniec(ok) { sqlS.stav = ok ? 2 : 0; var c = sqlS.cakaju; sqlS.cakaju = []; c.forEach(function (f) { f(ok); }); }
    var s = document.createElement("script"); s.src = "lib/sql-asm.js";
    s.onload = function () { try { window.initSqlJs().then(function (SQL) { sqlS.SQL = SQL; koniec(true); }, function () { koniec(false); }); } catch (e) { koniec(false); } };
    s.onerror = function () { koniec(false); };
    document.head.appendChild(s);
  };
  var SQL_CHYBY = [
    [/no such table: (\S+)/, "Tabuľka „$1“ neexistuje. Skontroluj názov tabuľky (zoznam tabuliek je v zadaní)."],
    [/no such column: (\S+)/, "Stĺpec „$1“ neexistuje. Skontroluj jeho názov, prípadne či je v tabuľke, z ktorej vyberáš. Text patrí do apostrofov: 'Bratislava'."],
    [/ambiguous column name: (\S+)/, "Stĺpec „$1“ je vo viacerých tabuľkách. Napíš pred neho názov tabuľky, napríklad zakaznici.$1."],
    [/misuse of aggregate(?: function)? (\w+)?/, "Agregačnú funkciu $1 nemôžeš použiť vo WHERE. Podmienku na skupiny píš do HAVING (za GROUP BY)."],
    [/incomplete input/, "Príkaz nie je dokončený. Chýba koniec, napríklad zatváracia zátvorka alebo apostrof."],
    [/unrecognized token: "?(.+?)"?$/, "Neznámy znak alebo neukončený text pri $1. Text musí byť v apostrofoch na oboch stranách."],
    [/near "(.+?)": syntax error/, "Syntaktická chyba pri „$1“. Skontroluj čiarky medzi stĺpcami, apostrofy a poradie častí: SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT."],
    [/UNIQUE constraint failed: (\S+)/, "V stĺpci $1 už taká hodnota je, a musí byť jedinečná."],
    [/NOT NULL constraint failed: (\S+)/, "Stĺpec $1 nesmie zostať prázdny (NULL)."],
    [/CHECK constraint failed/, "Hodnota nespĺňa pravidlo (CHECK) zadané pri vytvorení tabuľky."],
    [/FOREIGN KEY constraint failed/, "Porušený cudzí kľúč: buď odkazuješ na riadok, ktorý neexistuje, alebo mažeš riadok, na ktorý ešte odkazuje iná tabuľka (napríklad položky objednávky). Najprv zmaž tie."],
    [/table (\S+) has (\d+) columns but (\d+) values were supplied/, "Tabuľka $1 má $2 stĺpce, ale zadal si $3 hodnoty. Vymenuj stĺpce alebo doplň hodnoty."],
    [/(\d+) values for (\d+) columns/, "Zadal si $1 hodnoty pre $2 stĺpce. Počty musia sedieť."],
    [/table (\S+) already exists/, "Tabuľka $1 už existuje."],
    [/no such function: (\S+)/, "Funkcia $1 v SQL (SQLite) neexistuje."],
    [/wrong number of arguments to function (\S+)/, "Funkcia $1 dostala nesprávny počet hodnôt v zátvorke."],
    [/a GROUP BY clause is required before HAVING/, "HAVING sa dá použiť len spolu s GROUP BY."],
    [/ORDER BY term out of range/, "Číslo za ORDER BY je väčšie ako počet vybraných stĺpcov."],
    [/You can only execute one statement at a time|cannot start a transaction/, "Tento príkaz sa tu nedá použiť."],
  ];
  K.prelozSqlChybu = function (sprava) {
    for (var i = 0; i < SQL_CHYBY.length; i++) { var m = SQL_CHYBY[i][0].exec(sprava); if (m) return SQL_CHYBY[i][1].replace(/\$(\d)/g, function (_, n) { return m[+n] || ""; }).replace(/\s+\(/, " ("); }
    return "Chyba v SQL: " + sprava;
  };
  /* cb({ vystup (text), tabulka:{stlpce, riadky} (výsledok posledného SELECT-u), vysledky:[…], zmenene, dotaz(sql) → tabulka, chyba }) */
  function naTabulku(v) { return v ? { stlpce: v.columns, riadky: v.values } : null; }
  K.spustiSql = function (kod, databaza, cb) {
    K.nacitajSql(function (ok) {
      if (!ok) return cb({ vystup: "", chyba: { sprava: "sql", preklad: "Databázu sa nepodarilo pripraviť. Skús aplikáciu reštartovať.", riadok: 0 } });
      if (sqlS.db) { try { sqlS.db.close(); } catch (e) {} }
      var db = sqlS.db = new sqlS.SQL.Database();
      try { db.run("PRAGMA foreign_keys = ON;"); if (databaza) db.run(databaza); } catch (e) { return cb({ vystup: "", chyba: { sprava: e.message, preklad: "Pripravená databáza sa nenačítala: " + e.message, riadok: 0 } }); }
      var dotaz = function (q) { try { return naTabulku(db.exec(q).pop()); } catch (e) { return null; } };
      var pred = db.exec("SELECT total_changes()")[0].values[0][0], vys = [], chyba = null;
      if (!/\S/.test(kod.replace(/--.*$/gm, ""))) chyba = { sprava: "prázdne", preklad: "Editor je prázdny. Napíš SQL príkaz.", riadok: 0 };
      else try { vys = db.exec(kod); } catch (e) {
        chyba = { sprava: e.message, preklad: K.prelozSqlChybu(e.message), riadok: 0 };
        var m = /near "(.+?)"/.exec(e.message);
        if (m) { var ix = kod.indexOf(m[1]); if (ix >= 0) chyba.riadok = kod.slice(0, ix).split("\n").length; }
      }
      var zmenene = db.exec("SELECT total_changes()")[0].values[0][0] - pred, tab = naTabulku(vys[vys.length - 1]);
      var text = tab ? [tab.stlpce.join(" | ")].concat(tab.riadky.map(function (r) { return r.map(function (x) { return x === null ? "NULL" : String(x); }).join(" | "); })).join("\n") : "";
      /* cista(prikazy, kontrolny): spustí príkazy nad čistou kópiou databázy a vráti výsledok kontrolného dotazu (na porovnanie so vzorom) */
      var cista = function (prikazy, kontrolny) {
        var d2 = new sqlS.SQL.Database();
        try { d2.run("PRAGMA foreign_keys = ON;"); if (databaza) d2.run(databaza); var v = d2.exec(prikazy || ""); if (kontrolny) v = d2.exec(kontrolny); return naTabulku(v.pop()); }
        catch (e) { return null; } finally { d2.close(); }
      };
      cb({ vystup: text, tabulka: tab, vysledky: vys.map(naTabulku), zmenene: zmenene, dotaz: dotaz, cista: cista, chyba: chyba });
    });
  };
  /* HTML tabuľka výsledku dotazu */
  K.sqlTabulkaHtml = function (t, max) {
    max = max || 60;
    if (!t) return "";
    var h = '<div class="sql-vysledok"><table><thead><tr>' + t.stlpce.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>";
    t.riadky.slice(0, max).forEach(function (r) { h += "<tr>" + r.map(function (x) { return x === null ? '<td class="null">NULL</td>' : "<td" + (typeof x === "number" ? ' class="cis"' : "") + ">" + esc(String(x)) + "</td>"; }).join("") + "</tr>"; });
    h += "</tbody></table></div>";
    return h + '<small class="sql-pocet">' + (t.riadky.length === 1 ? "1 riadok" : t.riadky.length + (t.riadky.length >= 2 && t.riadky.length <= 4 ? " riadky" : " riadkov")) + (t.riadky.length > max ? ", zobrazených prvých " + max : "") + "</small>";
  };
  /* Živé ukážky v lekciách: <div class="sql-ziva" data-q="…"> sa doplnia výsledkom dotazu nad databázou kurzu. */
  function doplnZiveSql() {
    var e = document.querySelectorAll(".sql-ziva:not([data-hotove])"); if (!e.length) return;
    K.nacitajSql(function (ok) {
      [].forEach.call(document.querySelectorAll(".sql-ziva:not([data-hotove])"), function (x) {
        x.dataset.hotove = 1;
        if (!ok) { x.textContent = "Ukážku sa nepodarilo spustiť."; return; }
        var db = new sqlS.SQL.Database();
        try { db.run(K.sqlDatabaza || ""); x.innerHTML = K.sqlTabulkaHtml(naTabulku(db.exec(x.dataset.q).pop()), 12); } catch (er) { x.textContent = er.message; }
        db.close();
      });
    });
  }
  if (window.MutationObserver) new MutationObserver(function () { clearTimeout(doplnZiveSql.t); doplnZiveSql.t = setTimeout(doplnZiveSql, 30); }).observe(document.documentElement, { childList: true, subtree: true });

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
    sql: ["Tab", "*", ",", ";", "(", ")", "'", "=", "<", ">", "%", ".", "_"],
    c: ["Tab", ";", "{", "}", "(", ")", "\"", "%", "[", "]", "=", "<", ">", "&", "*", "+", "-", "/", "|", "!", "#", ","],
    java: ["Tab", ";", "{", "}", "(", ")", "\"", ".", "[", "]", "=", "<", ">", "+", "-", "*", "/", "&", "|", "!", ","],
    cs: ["Tab", ";", "{", "}", "(", ")", "\"", ".", "$", "[", "]", "=", "<", ">", "+", "-", "*", "/", "&", "|", "!", ","],
    kt: ["Tab", "(", ")", "{", "}", "\"", ".", "$", "[", "]", "=", "<", ">", "+", "-", "*", "/", ":", "?", "!", ","],
  };
  var NAZVY = { html: "HTML", css: "CSS", js: "JS", py: "Python", cpp: "C++", sql: "SQL", c: "C", java: "Java", cs: "C#", kt: "Kotlin" };
  var PARY = { "(": ")", "[": "]", "{": "}", "\"": "\"", "'": "'" };

  /* opts: { subory:{html,css,js}, karty:["html",...], aktivna, vyska, onZmena(subory) } */
  K.Editor = function (opts) {
    var subory = opts.subory, karty = opts.karty || ["html"], akt = opts.aktivna || karty[0];
    var el = K.el('<div class="ed"><div class="ed-karty"></div><div class="ed-plocha"><div class="ed-cisla"></div><div class="ed-chyba-riadok" hidden></div><pre><code></code></pre>' +
      '<textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Editor kódu"></textarea></div><div class="znaky"></div></div>');
    if (opts.vyska) el.querySelector(".ed-plocha").style.setProperty("--vyska", opts.vyska);
    var ta = el.querySelector("textarea"), pre = el.querySelector("pre"), code = el.querySelector("code"),
        cisla = el.querySelector(".ed-cisla"), pas = el.querySelector(".ed-chyba-riadok"), znaky = el.querySelector(".znaky"), vnutri = false, chybaRiadok = 0;

    function TAB() { return akt === "py" || K.PREKLADANE.indexOf(akt) >= 0 ? "    " : "  "; }
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
      '<div class="vystup-hlava"><div class="stitok"><i></i>' + (opts.jazyk === "sql" ? "Výsledok" : "Výstup") + '</div><button type="button" class="btn sek spustit">▶ Spustiť</button></div><pre class="vystup tlmene">' + (opts.jazyk === "sql" ? "Ťukni na ▶ Spustiť a uvidíš výsledok dotazu." : "Ťukni na ▶ Spustiť a uvidíš, čo program vypíše.") + '</pre></div>');
    var pre = el.querySelector("pre"), ta = el.querySelector("textarea"), tl = el.querySelector(".spustit");
    if (ta) ta.value = opts.vstup;
    function vstup() { return ta ? ta.value : ""; }
    function spusti(kod, cb) {
      tl.disabled = true; pre.className = "vystup tlmene";
      pre.textContent = K.PREKLADANE.indexOf(opts.jazyk) >= 0 ? "Prekladám a spúšťam na internete…" : (K._pyPripraveny ? "Spúšťam…" : "Pripravujem Python (prvýkrát to chvíľu trvá)…");
      var hotovo = function (r) {
        K._pyPripraveny = true; tl.disabled = false;
        pre.className = "vystup" + (r.chyba ? " s-chybou" : "");
        pre.textContent = (r.vystup || "") + (r.chyba ? (r.vystup ? "\n" : "") + "⚠ " + (r.chyba.riadok ? "Riadok " + r.chyba.riadok + ": " : "") + r.chyba.preklad : "");
        if (!r.vystup && !r.chyba) { pre.className = "vystup tlmene"; pre.textContent = "(program nič nevypísal)"; }
        if (opts.jazyk === "sql") {
          pre.className = "vystup sql" + (r.chyba ? " s-chybou" : "");
          if (r.chyba) pre.textContent = "⚠ " + r.chyba.preklad;
          else if (r.tabulka) pre.innerHTML = K.sqlTabulkaHtml(r.tabulka) + (r.zmenene ? '<small class="sql-pocet">Zmenené riadky: ' + r.zmenene + "</small>" : "");
          else { pre.className = "vystup sql tlmene"; pre.textContent = "Príkaz prebehol. " + (r.zmenene ? "Zmenené riadky: " + r.zmenene + "." : "Nevrátil žiadnu tabuľku."); }
        }
        if (cb) cb(r);
      };
      if (opts.jazyk === "sql") { pre.textContent = "Spúšťam dotaz…"; K.spustiSql(kod, opts.databaza, hotovo); }
      else if (opts.jazyk === "kt") K.spustiKotlin(kod, vstup(), hotovo);
      else if (K.PREKLADANE.indexOf(opts.jazyk) >= 0) K.spustiKompil(opts.jazyk, kod, vstup(), hotovo);
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
