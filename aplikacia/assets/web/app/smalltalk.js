/* Smalltalk pre SyntaxCode: malý interpreter v JavaScripte (beží offline).
   Syntax výrazov ako Pharo/Squeak, triedy v zápise GNU Smalltalk:
     Object subclass: Zviera [ | meno | meno: m [ meno := m ] ... ]
   K.spustiSmalltalk(kod, vstup, cb) → cb({ vystup, chyba }) */
(function () {
  "use strict";

  /* ================= LEXER ================= */
  var BIN = "+-*/\\<>=~@%|&?,";
  function SyntaxErr(msg, line) { this.msg = msg; this.line = line; }
  function lex(src) {
    var t = [], i = 0, line = 1, n = src.length;
    function push(type, v, extra) { var o = { t: type, v: v, line: line }; if (extra) for (var k in extra) o[k] = extra[k]; t.push(o); }
    function prevIsOperand() {
      var p = t[t.length - 1]; if (!p) return false;
      return p.t === "num" || p.t === "id" || p.t === "str" || p.t === "chr" || p.t === "sym" || (p.t === "pun" && (p.v === ")" || p.v === "]" || p.v === "}")) || p.t === "litarr";
    }
    while (i < n) {
      var c = src[i];
      if (c === "\n") { line++; i++; continue; }
      if (/\s/.test(c)) { i++; continue; }
      if (c === '"') { var s0 = line; i++; while (i < n && src[i] !== '"') { if (src[i] === "\n") line++; i++; } if (i >= n) throw new SyntaxErr("Komentár nie je uzavretý druhými úvodzovkami \".", s0); i++; continue; }
      if (c === "'") {
        var s = "", sl = line; i++;
        while (true) { if (i >= n) throw new SyntaxErr("Text nie je uzavretý apostrofom '.", sl); if (src[i] === "'") { if (src[i + 1] === "'") { s += "'"; i += 2; continue; } i++; break; } if (src[i] === "\n") line++; s += src[i++]; }
        push("str", s); continue;
      }
      if (c === "$") { if (i + 1 >= n) throw new SyntaxErr("Za $ chýba znak.", line); push("chr", src[i + 1]); if (src[i + 1] === "\n") line++; i += 2; continue; }
      if (c === "#") {
        if (src[i + 1] === "(") { push("pun", "#("); i += 2; continue; }
        if (src[i + 1] === "'") { i++; continue; }
        var m = /^#([A-Za-z_][A-Za-z0-9_]*:?(?:[A-Za-z_][A-Za-z0-9_]*:)*|[A-Za-z_][A-Za-z0-9_]*)/.exec(src.slice(i)) || /^#([+\-*\/\\<>=~@%|&?,]+)/.exec(src.slice(i));
        if (!m) throw new SyntaxErr("Za # má nasledovať meno symbolu, napr. #ahoj.", line);
        push("sym", m[1]); i += m[0].length; continue;
      }
      if (/[0-9]/.test(c) || (c === "-" && /[0-9]/.test(src[i + 1] || "") && !prevIsOperand())) {
        var mm = /^-?[0-9]+(?:\.[0-9]+)?(?:e-?[0-9]+)?/.exec(src.slice(i));
        var txt = mm[0];
        if (/r/.test(src[i + txt.length] || "") && /^-?[0-9]+$/.test(txt)) { var mr = /^([0-9]+)r([0-9A-Z]+)/.exec(src.slice(i)); if (mr) { push("num", BigInt(parseInt(mr[2], +mr[1]))); i += mr[0].length; continue; } }
        if (/[.e]/.test(txt)) push("num", parseFloat(txt), { flt: true }); else push("num", BigInt(txt));
        i += txt.length; continue;
      }
      if (/[A-Za-z_]/.test(c)) {
        var mi = /^[A-Za-z_][A-Za-z0-9_]*/.exec(src.slice(i))[0]; i += mi.length;
        if (src[i] === ":" && src[i + 1] !== "=") { push("kw", mi + ":"); i++; } else push("id", mi);
        continue;
      }
      if (c === ":" && src[i + 1] === "=") { push("asg", ":="); i += 2; continue; }
      if (c === "_" ) { push("asg", ":="); i++; continue; }
      if ("^.;()[]{}:".indexOf(c) >= 0) { push("pun", c); i++; continue; }
      if (c === "!") { push("pun", "."); i++; continue; }
      if (BIN.indexOf(c) >= 0) {
        var b = c; i++;
        while (i < n && BIN.indexOf(src[i]) >= 0 && !(src[i] === "-" && /[0-9]/.test(src[i + 1] || ""))) b += src[i++];
        push("bin", b); continue;
      }
      throw new SyntaxErr("Neznámy znak „" + c + "“.", line);
    }
    push("eof", null);
    return t;
  }

  /* ================= PARSER ================= */
  function Parser(tokens) { this.t = tokens; this.i = 0; }
  Parser.prototype = {
    peek: function (k) { return this.t[this.i + (k || 0)]; },
    next: function () { return this.t[this.i++]; },
    is: function (type, v, k) { var x = this.peek(k); return x.t === type && (v === undefined || x.v === v); },
    expect: function (type, v, msg) { var x = this.next(); if (x.t !== type || (v !== undefined && x.v !== v)) throw new SyntaxErr(msg || ("Očakávam „" + v + "“."), x.line); return x; },
    temps: function () {
      var names = [];
      if (this.is("bin", "||")) { this.next(); return names; }
      if (!this.is("bin", "|")) return names;
      this.next();
      while (this.is("id")) names.push(this.next().v);
      this.expect("bin", "|", "Zoznam premenných | a b | nie je uzavretý znakom |.");
      return names;
    },
    statements: function (end) {
      var temps = this.temps(), st = [];
      while (!this.is("eof") && !(end && this.is("pun", end))) {
        if (this.is("pun", ".")) { this.next(); continue; }
        if (this.is("bin", "|")) { temps = temps.concat(this.temps()); continue; }
        var s = this.statement();
        st.push(s);
        if (this.is("pun", ".")) { this.next(); continue; }
        if (end && this.is("pun", end)) break;
        if (this.is("eof")) break;
        var x = this.peek();
        throw new SyntaxErr("Za príkazom nečakane nasleduje „" + (x.v === null ? "koniec" : String(x.v)) + "“. Nechýba bodka . na konci predchádzajúceho príkazu?", x.line);
      }
      return { temps: temps, st: st };
    },
    statement: function () {
      if (this.is("pun", "^")) { var l = this.next().line; return { t: "ret", e: this.expression(), line: l }; }
      return this.expression();
    },
    expression: function () {
      if (this.is("id") && this.is("asg", undefined, 1)) { var id = this.next(); this.next(); return { t: "asg", name: id.v, e: this.expression(), line: id.line }; }
      var e = this.keywordExpr();
      if (this.is("pun", ";")) {
        if (e.t !== "send") throw new SyntaxErr("Kaskáda ; musí nasledovať za správou.", this.peek().line);
        var msgs = [{ sel: e.sel, args: e.args, line: e.line }];
        while (this.is("pun", ";")) { this.next(); msgs.push(this.cascadeMsg()); }
        return { t: "casc", rcv: e.rcv, sup: e.sup, msgs: msgs, line: e.line };
      }
      return e;
    },
    cascadeMsg: function () {
      var x = this.peek();
      if (x.t === "id") { this.next(); var m = { sel: x.v, args: [], line: x.line }; return this.continueMsg(m); }
      if (x.t === "bin") { this.next(); return this.continueMsg({ sel: x.v, args: [this.unaryExpr()], line: x.line }); }
      if (x.t === "kw") { var sel = "", args = []; while (this.is("kw")) { var k = this.next(); sel += k.v; args.push(this.binaryExpr()); } return { sel: sel, args: args, line: x.line }; }
      throw new SyntaxErr("Za ; má nasledovať správa.", x.line);
    },
    continueMsg: function (m) {
      /* správa v kaskáde môže pokračovať ďalšími unárnymi/binárnymi správami: tie sa posielajú výsledku – tu ich jednoducho nepodporujeme */
      return m;
    },
    keywordExpr: function () {
      var r = this.binaryExpr();
      if (this.is("kw")) {
        var sel = "", args = [], line = this.peek().line;
        while (this.is("kw")) { sel += this.next().v; args.push(this.binaryExpr()); }
        return { t: "send", rcv: r, sel: sel, args: args, line: line, sup: r.t === "var" && r.name === "super" };
      }
      return r;
    },
    binaryExpr: function () {
      var r = this.unaryExpr();
      while (this.is("bin")) { var op = this.next(); r = { t: "send", rcv: r, sel: op.v, args: [this.unaryExpr()], line: op.line, sup: r.t === "var" && r.name === "super" }; }
      return r;
    },
    unaryExpr: function () {
      var r = this.primary();
      while (this.is("id") && !this.is("asg", undefined, 1)) { var u = this.next(); r = { t: "send", rcv: r, sel: u.v, args: [], line: u.line, sup: r.t === "var" && r.name === "super" }; }
      return r;
    },
    primary: function () {
      var x = this.next();
      switch (x.t) {
        case "num": return { t: "lit", v: x.v };
        case "str": return { t: "lit", v: x.v };
        case "chr": return { t: "lit", v: chr(x.v) };
        case "sym": return { t: "lit", v: sym(x.v) };
        case "id":
          if (x.v === "true") return { t: "lit", v: true };
          if (x.v === "false") return { t: "lit", v: false };
          if (x.v === "nil") return { t: "lit", v: null };
          return { t: "var", name: x.v, line: x.line };
        case "pun":
          if (x.v === "(") { var e = this.expression(); this.expect("pun", ")", "Chýba zatváracia zátvorka )."); return e; }
          if (x.v === "[") return this.block(x.line);
          if (x.v === "{") { var it = []; while (!this.is("pun", "}")) { if (this.is("eof")) throw new SyntaxErr("Chýba zatváracia zátvorka }.", x.line); it.push(this.expression()); if (this.is("pun", ".")) this.next(); } this.next(); return { t: "brace", items: it, line: x.line }; }
          if (x.v === "#(") return { t: "lit", v: this.literalArray(), fresh: true };
          break;
        case "bin":
          if (x.v === "-" && this.is("num")) { var nn = this.next(); return { t: "lit", v: typeof nn.v === "bigint" ? -nn.v : -nn.v }; }
          break;
        case "kw": throw new SyntaxErr("Správa „" + x.v + "“ nemá príjemcu. Pred ňou chýba objekt.", x.line);
        case "eof": throw new SyntaxErr("Program nečakane skončil. Chýba výraz alebo zátvorka.", x.line);
      }
      throw new SyntaxErr("Nečakaný znak „" + x.v + "“.", x.line);
    },
    literalArray: function () {
      var a = [];
      while (!this.is("pun", ")")) {
        var x = this.next();
        if (x.t === "eof") throw new SyntaxErr("Literálne pole #( nie je uzavreté zátvorkou ).", x.line);
        if (x.t === "num" || x.t === "str") a.push(x.v);
        else if (x.t === "chr") a.push(chr(x.v));
        else if (x.t === "sym") a.push(sym(x.v));
        else if (x.t === "id") a.push(x.v === "true" ? true : x.v === "false" ? false : x.v === "nil" ? null : sym(x.v));
        else if (x.t === "kw") a.push(sym(x.v));
        else if (x.t === "bin") { if (x.v === "-" && this.is("num")) { var nn = this.next(); a.push(-nn.v); } else a.push(sym(x.v)); }
        else if (x.t === "pun" && (x.v === "(" || x.v === "#(")) a.push(this.literalArray());
        else throw new SyntaxErr("V literálnom poli nemôže byť „" + x.v + "“.", x.line);
      }
      this.next();
      return a;
    },
    block: function (line) {
      var params = [];
      while (this.is("pun", ":")) { this.next(); params.push(this.expect("id", undefined, "Za : v bloku má byť meno parametra.").v); }
      if (params.length) {
        if (this.is("bin", "||")) { this.t[this.i] = { t: "bin", v: "|", line: this.peek().line }; }
        else if (this.is("bin", "|")) this.next();
        else if (!this.is("pun", "]")) throw new SyntaxErr("Parametre bloku ukonči znakom |, napr. [:x | x * 2].", this.peek().line);
      }
      var body = this.statements("]");
      this.expect("pun", "]", "Blok nie je uzavretý zátvorkou ].");
      return { t: "block", params: params, temps: body.temps, st: body.st, line: line };
    },
    /* ---- definície tried (GNU Smalltalk) ---- */
    pattern: function () {
      var x = this.peek();
      if (x.t === "id") { this.next(); return { sel: x.v, params: [] }; }
      if (x.t === "bin") { this.next(); return { sel: x.v, params: [this.expect("id", undefined, "Za binárnou správou v hlavičke metódy má byť meno parametra.").v] }; }
      if (x.t === "kw") { var sel = "", ps = []; while (this.is("kw")) { sel += this.next().v; ps.push(this.expect("id", undefined, "Za kľúčovým slovom v hlavičke metódy má byť meno parametra.").v); } return { sel: sel, params: ps }; }
      throw new SyntaxErr("Očakávam hlavičku metódy (napr. meno [ … ] alebo nastav: x [ … ]).", x.line);
    },
    methodBody: function (pat, line) {
      this.expect("pun", "[", "Telo metódy " + pat.sel + " začína zátvorkou [.");
      while (this.is("bin", "<")) { while (!this.is("bin", ">") && !this.is("eof")) this.next(); this.next(); }
      var b = this.statements("]");
      this.expect("pun", "]", "Metóda " + pat.sel + " nie je uzavretá zátvorkou ].");
      return { sel: pat.sel, params: pat.params, temps: b.temps, st: b.st, line: line };
    },
    classBody: function (def) {
      this.expect("pun", "[", "Telo triedy začína zátvorkou [.");
      while (!this.is("pun", "]")) {
        if (this.is("eof")) throw new SyntaxErr("Trieda " + def.name + " nie je uzavretá zátvorkou ].", this.peek().line);
        if (this.is("bin", "|")) { def.ivars = def.ivars.concat(this.temps()); continue; }
        if (this.is("bin", "<")) { while (!this.is("bin", ">") && !this.is("eof")) this.next(); this.next(); continue; }
        if (this.is("pun", ".")) { this.next(); continue; }
        var line = this.peek().line;
        if (this.is("id") && this.is("id", "class", 1) && this.is("bin", ">>", 2)) { this.i += 3; var pc = this.pattern(); def.cmethods.push(this.methodBody(pc, line)); continue; }
        if (this.is("id") && this.is("id", "class", 1) && this.is("pun", "[", 2)) { this.i += 2; this.next(); while (!this.is("pun", "]")) { if (this.is("bin", "|")) def.civars = def.civars.concat(this.temps()); else this.next(); } this.next(); continue; }
        var p = this.pattern();
        def.methods.push(this.methodBody(p, line));
      }
      this.next();
      return def;
    },
    program: function () {
      var items = [], temps = [];
      while (!this.is("eof")) {
        if (this.is("pun", ".")) { this.next(); continue; }
        if (this.is("bin", "|") || this.is("bin", "||")) { temps = temps.concat(this.temps()); continue; }
        var line = this.peek().line;
        if (this.is("id") && this.is("kw", "subclass:", 1) && (this.is("id", undefined, 2) || this.is("sym", undefined, 2)) && this.is("pun", "[", 3)) {
          var sup = this.next().v; this.next(); var nm = this.next().v;
          items.push({ t: "classdef", sup: sup, name: nm, ivars: [], civars: [], methods: [], cmethods: [], line: line });
          this.classBody(items[items.length - 1]); continue;
        }
        if (this.is("id") && this.is("id", "extend", 1) && this.is("pun", "[", 2)) {
          var en = this.next().v; this.next();
          items.push(this.classBody({ t: "extend", name: en, ivars: [], civars: [], methods: [], cmethods: [], line: line })); continue;
        }
        if (this.is("id") && this.is("id", "class", 1) && this.is("id", "extend", 2) && this.is("pun", "[", 3)) {
          var cn = this.next().v; this.i += 2;
          var d = this.classBody({ t: "extend", name: cn, ivars: [], civars: [], methods: [], cmethods: [], line: line });
          d.cmethods = d.methods; d.methods = []; items.push(d); continue;
        }
        if (this.is("id") && this.is("bin", ">>", 1)) {
          var mn = this.next().v; this.next(); var pt = this.pattern();
          items.push({ t: "extend", name: mn, ivars: [], civars: [], methods: [this.methodBody(pt, line)], cmethods: [], line: line }); continue;
        }
        if (this.is("id") && this.is("id", "class", 1) && this.is("bin", ">>", 2)) {
          var mc = this.next().v; this.i += 2; var pc2 = this.pattern();
          items.push({ t: "extend", name: mc, ivars: [], civars: [], methods: [], cmethods: [this.methodBody(pc2, line)], line: line }); continue;
        }
        items.push(this.statement());
        if (this.is("pun", ".")) { this.next(); continue; }
        if (this.is("eof")) break;
        var x = this.peek();
        throw new SyntaxErr("Za príkazom nečakane nasleduje „" + (x.v === null ? "koniec" : String(x.v)) + "“. Nechýba bodka . na konci predchádzajúceho príkazu?", x.line);
      }
      return { temps: temps, items: items };
    },
  };

  /* ================= HODNOTY ================= */
  var SYMS = {}, CHRS = {};
  function Sym(n) { this.n = n; }
  function sym(n) { return SYMS[n] || (SYMS[n] = new Sym(n)); }
  function Chr(c) { this.c = c; }
  function chr(c) { return CHRS[c] || (CHRS[c] = new Chr(c)); }
  function Frac(n, d) { this.n = n; this.d = d; }
  function Obj(cls) { this.cls = cls; this.iv = {}; }
  function Coll(cls, items) { this.cls = cls; this.items = items || []; }
  function Dict(cls) { this.cls = cls; this.keys = []; this.vals = []; this.idx = {}; }
  function Assoc(k, v) { this.k = k; this.v = v; }
  function Block(node, ctx) { this.node = node; this.ctx = ctx; }
  function Stream(s) { this.s = s || ""; }
  function Interval(a, b, s) { this.a = a; this.b = b; this.s = s; }
  function StErr(cls, text, line) { this.cls = cls; this.text = text; this.line = line; this.signalLine = line; }
  function NLR(home, v) { this.home = home; this.v = v; }

  function bgcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { var t = a % b; a = b; b = t; } return a; }
  function frac(n, d) {
    if (d === 0n) throw zeroDiv();
    if (d < 0n) { n = -n; d = -d; }
    var g = bgcd(n, d); if (g > 1n) { n /= g; d /= g; }
    return d === 1n ? n : new Frac(n, d);
  }
  function isInt(v) { return typeof v === "bigint"; }
  function isFlt(v) { return typeof v === "number"; }
  function isNum(v) { return isInt(v) || isFlt(v) || v instanceof Frac; }
  function toF(v) { return isInt(v) ? Number(v) : isFlt(v) ? v : Number(v.n) / Number(v.d); }
  function asFrac(v) { return isInt(v) ? { n: v, d: 1n } : { n: v.n, d: v.d }; }
  function arith(op, a, b) {
    if (!isNum(b)) throw stErr("Error", "Číslo nemožno " + ({ "+": "sčítať", "-": "odčítať", "*": "násobiť", "/": "deliť" }[op] || "počítať") + " s " + popis(b) + ". " + (typeof b === "string" ? "Text na číslo prevedieš cez asNumber." : ""));
    if (isFlt(a) || isFlt(b)) {
      var x = toF(a), y = toF(b);
      if (op === "/" && y === 0) throw zeroDiv();
      return op === "+" ? x + y : op === "-" ? x - y : op === "*" ? x * y : x / y;
    }
    if (isInt(a) && isInt(b)) {
      if (op === "+") return a + b; if (op === "-") return a - b; if (op === "*") return a * b;
      return frac(a, b);
    }
    var p = asFrac(a), q = asFrac(b);
    if (op === "+") return frac(p.n * q.d + q.n * p.d, p.d * q.d);
    if (op === "-") return frac(p.n * q.d - q.n * p.d, p.d * q.d);
    if (op === "*") return frac(p.n * q.n, p.d * q.d);
    return frac(p.n * q.d, p.d * q.n);
  }
  function cmp(a, b) {
    if (isNum(a) && isNum(b)) {
      if (isFlt(a) || isFlt(b)) { var x = toF(a), y = toF(b); return x < y ? -1 : x > y ? 1 : 0; }
      var p = asFrac(a), q = asFrac(b), l = p.n * q.d, r = q.n * p.d; return l < r ? -1 : l > r ? 1 : 0;
    }
    if (typeof a === "string" && typeof b === "string") return a < b ? -1 : a > b ? 1 : 0;
    if (a instanceof Chr && b instanceof Chr) return a.c < b.c ? -1 : a.c > b.c ? 1 : 0;
    if (a instanceof Sym && b instanceof Sym) return a.n < b.n ? -1 : a.n > b.n ? 1 : 0;
    throw stErr("Error", "Hodnoty " + popis(a) + " a " + popis(b) + " sa nedajú porovnať cez < alebo >.");
  }
  function floorDiv(a, b) { if (b === 0n) throw zeroDiv(); var q = a / b; if ((a % b !== 0n) && ((a < 0n) !== (b < 0n))) q -= 1n; return q; }
  function fmtFloat(x) {
    if (x === Infinity) return "inf"; if (x === -Infinity) return "-inf"; if (x !== x) return "nan";
    if (Number.isInteger(x) && Math.abs(x) < 1e16) return x.toFixed(1);
    var s = String(x); if (/e/.test(s)) s = s.replace(/e\+?/, "e"); return s;
  }

  /* ================= TRIEDY ================= */
  var CL = {};
  function Cls(name, sup, ivars) { this.name = name; this.sup = sup || null; this.ivars = ivars || []; this.methods = {}; this.prim = {}; this.cmethods = {}; this.cprim = {}; this.isClass = true; this.civ = {}; }
  function defCls(name, supName) { return (CL[name] = new Cls(name, supName ? CL[supName] : null)); }
  ["Object"].forEach(function (n) { defCls(n); });
  defCls("Magnitude", "Object"); defCls("Number", "Magnitude"); defCls("Integer", "Number");
  defCls("SmallInteger", "Integer"); defCls("LargePositiveInteger", "Integer"); defCls("LargeNegativeInteger", "Integer");
  defCls("Float", "Number"); defCls("Fraction", "Number"); defCls("Character", "Magnitude");
  defCls("Boolean", "Object"); defCls("True", "Boolean"); defCls("False", "Boolean"); defCls("UndefinedObject", "Object");
  defCls("Collection", "Object"); defCls("SequenceableCollection", "Collection"); defCls("ArrayedCollection", "SequenceableCollection");
  defCls("Array", "ArrayedCollection"); defCls("String", "ArrayedCollection"); defCls("Symbol", "String");
  defCls("OrderedCollection", "SequenceableCollection"); defCls("SortedCollection", "OrderedCollection"); defCls("Interval", "SequenceableCollection");
  defCls("HashedCollection", "Collection"); defCls("Set", "HashedCollection"); defCls("Dictionary", "HashedCollection");
  defCls("Association", "Object"); defCls("BlockClosure", "Object"); defCls("WriteStream", "Object"); defCls("ReadStream", "Object");
  defCls("TextCollector", "Object"); defCls("StdinStream", "Object"); defCls("Class", "Object");
  defCls("Exception", "Object"); defCls("Error", "Exception"); defCls("ZeroDivide", "Error"); defCls("MessageNotUnderstood", "Error");
  defCls("SubscriptOutOfBounds", "Error"); defCls("NotFound", "Error");
  var TRANSCRIPT = new Obj(CL.TextCollector), STDIN = new Obj(CL.StdinStream);

  function classOf(v) {
    if (v === null || v === undefined) return CL.UndefinedObject;
    if (v === true) return CL.True; if (v === false) return CL.False;
    if (isInt(v)) return (v < 4611686018427387904n && v >= -4611686018427387904n) ? CL.SmallInteger : v > 0n ? CL.LargePositiveInteger : CL.LargeNegativeInteger;
    if (isFlt(v)) return CL.Float;
    if (typeof v === "string") return CL.String;
    if (v instanceof Frac) return CL.Fraction;
    if (v instanceof Sym) return CL.Symbol;
    if (v instanceof Chr) return CL.Character;
    if (Array.isArray(v)) return CL.Array;
    if (v instanceof Obj || v instanceof Coll || v instanceof Dict) return v.cls;
    if (v instanceof Assoc) return CL.Association;
    if (v instanceof Block) return CL.BlockClosure;
    if (v instanceof Stream) return CL.WriteStream;
    if (v instanceof Interval) return CL.Interval;
    if (v instanceof StErr) return v.cls;
    if (v instanceof Cls) return CL.Class;
    return CL.Object;
  }
  function isKind(c, target) { while (c) { if (c === target) return true; c = c.sup; } return false; }
  function popis(v) {
    var c = classOf(v); var s; try { s = printString(v); } catch (e) { s = c.name; }
    if (s.length > 30) s = s.slice(0, 27) + "…";
    return s + " (" + (v instanceof Cls ? "trieda" : c.name) + ")";
  }

  /* ================= INTERPRETER ================= */
  var stav = null; /* { out, kroky, vstup, line } */
  function stErr(clsName, text, line) { return new StErr(CL[clsName] || CL.Error, text, line || (stav && stav.line)); }
  function zeroDiv() { return stErr("ZeroDivide", "Delenie nulou. Nulou sa deliť nedá."); }

  function Ctx(parent, self, cls, home) { this.vars = Object.create(null); this.parent = parent; this.self = self; this.cls = cls; this.home = home || this; this.alive = true; }
  function lookupVar(ctx, name) {
    for (var c = ctx; c; c = c.parent) if (name in c.vars) return { ctx: c };
    return null;
  }
  function getVar(ctx, name, line) {
    var f = lookupVar(ctx, name); if (f) return f.ctx.vars[name];
    if (name === "self") return ctx.self;
    if (name === "super") return ctx.self;
    if (name === "thisContext") return null;
    var self = ctx.self;
    if (self instanceof Obj && name in self.iv) return self.iv[name];
    if (self instanceof Cls && name in self.civ) return self.civ[name];
    if (name in CL) return CL[name];
    if (name === "Transcript") return TRANSCRIPT;
    if (name === "stdin") return STDIN;
    if (stav.glob && name in stav.glob) return stav.glob[name];
    throw stErr("Error", "Premenná „" + name + "“ neexistuje. " + (/^[A-Z]/.test(name) ? "Triedu s týmto menom nepoznám, skontroluj preklep." : "Deklaruj ju medzi | | alebo jej najprv priraď hodnotu cez :=."), line);
  }
  function setVar(ctx, name, v, line) {
    var f = lookupVar(ctx, name); if (f) { f.ctx.vars[name] = v; return v; }
    var self = ctx.self;
    if (self instanceof Obj && name in self.iv) { self.iv[name] = v; return v; }
    if (self instanceof Cls && name in self.civ) { self.civ[name] = v; return v; }
    if (name === "self" || name === "super" || name === "true" || name === "false" || name === "nil") throw stErr("Error", "Do „" + name + "“ nemôžeš priradiť hodnotu.", line);
    if (ctx.top) { ctx.vars[name] = v; return v; }
    for (var c = ctx; c; c = c.parent) if (c.top) { c.vars[name] = v; return v; }
    throw stErr("Error", "Premenná „" + name + "“ nie je deklarovaná. Pridaj ju do zoznamu | " + name + " | na začiatku metódy alebo bloku.", line);
  }

  function evalSeq(stmts, ctx) {
    var v = null;
    for (var i = 0; i < stmts.length; i++) v = ev(stmts[i], ctx);
    return v;
  }
  function ev(n, ctx) {
    switch (n.t) {
      case "lit": return n.fresh ? copyLit(n.v) : n.v;
      case "var": return getVar(ctx, n.name, n.line);
      case "asg": stav.line = n.line; return setVar(ctx, n.name, ev(n.e, ctx), n.line);
      case "send": {
        var r = ev(n.rcv, ctx), a = [];
        for (var i = 0; i < n.args.length; i++) a.push(ev(n.args[i], ctx));
        stav.line = n.line;
        return send(r, n.sel, a, n.sup ? ctx.home.cls : null, n.line);
      }
      case "casc": {
        var rc = ev(n.rcv, ctx), res = null;
        for (var j = 0; j < n.msgs.length; j++) { var m = n.msgs[j], aa = []; for (var k = 0; k < m.args.length; k++) aa.push(ev(m.args[k], ctx)); stav.line = m.line; res = send(rc, m.sel, aa, n.sup ? ctx.home.cls : null, m.line); }
        return res;
      }
      case "block": return new Block(n, ctx);
      case "brace": return n.items.map(function (x) { return ev(x, ctx); });
      case "ret": {
        var v = ev(n.e, ctx);
        if (ctx.home.isMethod) { if (!ctx.home.alive) throw stErr("Error", "Blok sa pokúsil vrátiť z metódy, ktorá už skončila.", n.line); throw new NLR(ctx.home, v); }
        throw new NLR(ctx.home, v);
      }
    }
    throw new Error("neznámy uzol " + n.t);
  }
  function copyLit(v) { return Array.isArray(v) ? v.map(copyLit) : v; }

  function findMethod(cls, sel, classSide) {
    for (var c = cls; c; c = c.sup) {
      if (classSide) { if (c.cmethods[sel]) return { m: c.cmethods[sel], cls: c }; if (c.cprim[sel]) return { p: c.cprim[sel], cls: c }; }
      else { if (c.methods[sel]) return { m: c.methods[sel], cls: c }; if (c.prim[sel]) return { p: c.prim[sel], cls: c }; }
    }
    if (classSide) {
      for (var d = CL.Class; d; d = d.sup) { if (d.methods[sel]) return { m: d.methods[sel], cls: d }; if (d.prim[sel]) return { p: d.prim[sel], cls: d }; }
    }
    return null;
  }
  function send(rcv, sel, args, superFrom, line) {
    if (++stav.kroky > stav.limit) throw stErr("Error", "__LIMIT__", line);
    var classSide = rcv instanceof Cls, f;
    if (superFrom) f = findMethod(classSide ? superFrom.sup : superFrom.sup, sel, classSide);
    else f = findMethod(classSide ? rcv : classOf(rcv), sel, classSide);
    if (!f) return dnu(rcv, sel, args, line);
    if (f.p) return f.p(rcv, args, line);
    return callMethod(f.m, f.cls, rcv, args);
  }
  function dnu(rcv, sel, args, line) {
    var hint = "";
    if (rcv === null) hint = " Premenná má hodnotu nil: asi si jej zabudol priradiť hodnotu, alebo metóda nevrátila výsledok (chýba ^).";
    else if (/:$/.test(sel) === false && args.length === 0 && findMethod(classOf(rcv), sel + ":", rcv instanceof Cls)) hint = " Táto správa potrebuje argument: " + sel + ": hodnota.";
    else if (sel === "," && !(typeof rcv === "string")) hint = " Čiarka spája texty. Číslo prevedieš na text cez printString.";
    var e = stErr("MessageNotUnderstood", popis(rcv) + " nerozumie správe #" + sel + "." + hint, line);
    e.dnu = true;
    throw e;
  }
  function callMethod(m, defCls, rcv, args) {
    var ctx = new Ctx(null, rcv, defCls); ctx.isMethod = true;
    for (var i = 0; i < m.params.length; i++) ctx.vars[m.params[i]] = args[i];
    for (var j = 0; j < m.temps.length; j++) ctx.vars[m.temps[j]] = null;
    try {
      evalSeq(m.st, ctx);
      return rcv;
    } catch (e) {
      if (e instanceof NLR && e.home === ctx) return e.v;
      throw e;
    } finally { ctx.alive = false; }
  }
  function callBlock(b, args, line) {
    if (!(b instanceof Block)) throw stErr("Error", popis(b) + " nie je blok [ ]. Na tomto mieste má byť blok v hranatých zátvorkách.", line);
    var n = b.node;
    if (args.length !== n.params.length) throw stErr("Error", "Blok má " + n.params.length + " parametr" + (n.params.length === 1 ? "" : "e") + ", ale dostal " + args.length + " hodnôt.", line);
    if (++stav.kroky > stav.limit) throw stErr("Error", "__LIMIT__", line);
    var ctx = new Ctx(b.ctx, b.ctx.self, b.ctx.cls, b.ctx.home);
    if (b.ctx.top) ctx.top = false;
    for (var i = 0; i < n.params.length; i++) ctx.vars[n.params[i]] = args[i];
    for (var j = 0; j < n.temps.length; j++) ctx.vars[n.temps[j]] = null;
    return evalSeq(n.st, ctx);
  }
  function truthy(v, sel, line) { if (v === true || v === false) return v; throw stErr("Error", "Správa " + sel + " očakáva true alebo false, ale dostala " + popis(v) + ".", line); }

  /* ================= TLAČ ================= */
  function printString(v) {
    if (v === null || v === undefined) return "nil";
    if (v === true) return "true"; if (v === false) return "false";
    if (isInt(v)) return v.toString();
    if (isFlt(v)) return fmtFloat(v);
    if (v instanceof Frac) return v.n + "/" + v.d;
    if (typeof v === "string") return "'" + v.replace(/'/g, "''") + "'";
    if (v instanceof Sym) return "#" + v.n;
    if (v instanceof Chr) return "$" + v.c;
    if (v instanceof Cls) return v.name;
    var f = findMethod(classOf(v), "printOn:", false);
    if (f && f.m) { var s = new Stream(""); callMethod(f.m, f.cls, v, [s]); return s.s; }
    return defaultPrint(v);
  }
  function defaultPrint(v) {
    if (Array.isArray(v)) return "#(" + v.map(printString).join(" ") + ")";
    if (v instanceof Coll) return clen(v.cls.name) + "(" + v.items.map(printString).join(" ") + ")";
    if (v instanceof Dict) return clen(v.cls.name) + "(" + v.keys.map(function (k, i) { return printString(k) + "->" + printString(v.vals[i]); }).join(" ") + ")";
    if (v instanceof Assoc) return printString(v.k) + "->" + printString(v.v);
    if (v instanceof Interval) return "(" + printString(v.a) + " to: " + printString(v.b) + (v.s !== 1n ? " by: " + printString(v.s) : "") + ")";
    if (v instanceof Block) return "a BlockClosure";
    if (v instanceof Stream) return "a WriteStream";
    if (v instanceof StErr) return clen(v.cls.name);
    if (v === TRANSCRIPT) return "a TextCollector";
    return clen(classOf(v).name);
  }
  function clen(n) { return (/^[AEIOU]/.test(n) ? "an " : "a ") + n; }
  function displayString(v) {
    if (typeof v === "string") return v;
    if (v instanceof Sym) return v.n;
    if (v instanceof Chr) return v.c;
    var f = findMethod(classOf(v), "displayString", false);
    if (f && f.m) return asJsString(callMethod(f.m, f.cls, v, []));
    return printString(v);
  }
  function asJsString(v) { return typeof v === "string" ? v : displayString(v); }
  function out(s) { stav.out.push(s); stav.dlzka += s.length; if (stav.dlzka > 200000) throw stErr("Error", "Program vypísal príliš veľa textu (asi nekonečný cyklus) a bol zastavený."); }

  /* ================= KOLEKCIE: pomocné ================= */
  function items(v, line) {
    if (Array.isArray(v)) return v;
    if (typeof v === "string") return v.split("").map(chr);
    if (v instanceof Sym) return v.n.split("").map(chr);
    if (v instanceof Coll) return v.items;
    if (v instanceof Dict) return v.vals;
    if (v instanceof Interval) { var r = []; if (v.s === 0n) throw stErr("Error", "Krok intervalu nemôže byť 0."); if (isInt(v.a) && isInt(v.b) && isInt(v.s)) { for (var i = v.a; v.s > 0n ? i <= v.b : i >= v.b; i += v.s) { r.push(i); if (r.length > 2e6) throw stErr("Error", "Interval je príliš veľký."); } } else { var a = toF(v.a), b = toF(v.b), s = toF(v.s); for (var x = a; s > 0 ? x <= b + 1e-12 : x >= b - 1e-12; x += s) r.push(x); } return r; }
    throw stErr("Error", popis(v) + " nie je kolekcia.", line);
  }
  function likeSpecies(orig, arr) {
    if (typeof orig === "string" || orig instanceof Sym) return arr.every(function (x) { return x instanceof Chr; }) ? arr.map(function (x) { return x.c; }).join("") : arr;
    if (orig instanceof Coll) return new Coll(orig.cls === CL.SortedCollection ? CL.OrderedCollection : orig.cls, arr);
    return arr;
  }
  function eq(a, b) {
    if (a === b) return true;
    if (isNum(a) && isNum(b)) return cmp(a, b) === 0;
    if (typeof a === "string" && typeof b === "string") return a === b;
    if (typeof a === "string" && b instanceof Sym) return a === b.n;
    if (a instanceof Sym && typeof b === "string") return false;
    if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every(function (x, i) { return eqSend(x, b[i]); });
    if (a instanceof Coll && b instanceof Coll) return a.cls === b.cls && a.items.length === b.items.length && a.items.every(function (x, i) { return eqSend(x, b.items[i]); });
    if (a instanceof Assoc && b instanceof Assoc) return eqSend(a.k, b.k) && eqSend(a.v, b.v);
    if (a instanceof Interval && b instanceof Interval) return eq(items(a), items(b));
    return false;
  }
  function eqSend(a, b) { var f = findMethod(classOf(a), "=", false); if (f && f.m) return send(a, "=", [b]) === true; return eq(a, b); }
  var idCounter = 0, idMap = new WeakMap();
  function keyOf(k) {
    if (k === null) return "nil"; if (k === true) return "T"; if (k === false) return "F";
    if (isNum(k)) { if (isFlt(k) && Number.isInteger(k)) return "n" + BigInt(k); if (k instanceof Frac) return "n" + k.n + "/" + k.d; return "n" + String(k); }
    if (typeof k === "string") return "s" + k;
    if (k instanceof Sym) return "y" + k.n;
    if (k instanceof Chr) return "c" + k.c;
    if (Array.isArray(k)) return "a[" + k.map(keyOf).join(",") + "]";
    if (typeof k === "object") { if (!idMap.has(k)) idMap.set(k, ++idCounter); return "o" + idMap.get(k); }
    return "?" + String(k);
  }
  function dictAt(d, k) { var i = d.idx[keyOf(k)]; return i === undefined ? undefined : d.vals[i]; }
  function dictPut(d, k, v) { var key = keyOf(k), i = d.idx[key]; if (i === undefined) { d.idx[key] = d.keys.length; d.keys.push(k); d.vals.push(v); } else d.vals[i] = v; return v; }
  function dictRemove(d, k) { var key = keyOf(k), i = d.idx[key]; if (i === undefined) return undefined; var v = d.vals[i]; d.keys.splice(i, 1); d.vals.splice(i, 1); d.idx = {}; d.keys.forEach(function (kk, j) { d.idx[keyOf(kk)] = j; }); return v; }
  function setAdd(s, v) { var key = keyOf(v); if (!(key in s.idx)) { s.idx[key] = s.items.length; s.items.push(v); } return v; }
  function sortItems(arr, blk, line) {
    var a = arr.slice();
    a.sort(blk ? function (x, y) { var r = callBlock(blk, [x, y], line); if (truthy(r, "sortBlock", line)) { var r2 = callBlock(blk, [y, x], line); return r2 === true ? 0 : -1; } return 1; } : function (x, y) { var f = findMethod(classOf(x), "<=", false); if (f && f.m) { return send(x, "<=", [y]) === true ? (send(y, "<=", [x]) === true ? 0 : -1) : 1; } return cmp(x, y); });
    return a;
  }
  function index(v, line) { if (!isInt(v)) throw stErr("Error", "Index musí byť celé číslo, nie " + popis(v) + ".", line); return Number(v); }
  function checkIdx(arr, i, line) { if (i < 1 || i > arr.length) throw stErr("SubscriptOutOfBounds", "Index " + i + " je mimo kolekcie s " + arr.length + " prvkami. Indexy v Smalltalku idú od 1 po size.", line); }

  /* ================= PRIMITÍVA ================= */
  function P(clsName, sel, fn) { sel.split(" ").forEach(function (s) { CL[clsName].prim[s] = fn; }); }
  function CP(clsName, sel, fn) { sel.split(" ").forEach(function (s) { CL[clsName].cprim[s] = fn; }); }
  function B(v) { return v; }

  /* --- Object --- */
  P("Object", "printString", function (r) { return printString(r); });
  P("Object", "displayString asString", function (r) { return displayString(r); });
  P("Object", "printNl", function (r) { out(printString(r) + "\n"); return r; });
  P("Object", "displayNl", function (r) { out(displayString(r) + "\n"); return r; });
  P("Object", "printOn:", function (r, a) { a[0].s += defaultPrint(r); return r; });
  P("Object", "=", function (r, a) { return eq(r, a[0]); });
  P("Object", "~=", function (r, a) { return !(send(r, "=", [a[0]]) === true); });
  P("Object", "==", function (r, a) { return r === a[0] || (isNum(r) && isNum(a[0]) && isInt(r) && isInt(a[0]) && r === a[0]); });
  P("Object", "~~", function (r, a) { return r !== a[0]; });
  P("Object", "hash", function (r) { return BigInt(keyOf(r).length); });
  P("Object", "class", function (r) { return classOf(r); });
  P("Object", "yourself", function (r) { return r; });
  P("Object", "isNil", function () { return false; });
  P("Object", "notNil", function () { return true; });
  P("Object", "ifNil:", function (r) { return r; });
  P("Object", "ifNotNil:", function (r, a, l) { return a[0] instanceof Block && a[0].node.params.length ? callBlock(a[0], [r], l) : callBlock(a[0], [], l); });
  P("Object", "ifNil:ifNotNil:", function (r, a, l) { return a[1].node.params.length ? callBlock(a[1], [r], l) : callBlock(a[1], [], l); });
  P("Object", "ifNotNil:ifNil:", function (r, a, l) { return a[0].node.params.length ? callBlock(a[0], [r], l) : callBlock(a[0], [], l); });
  P("Object", "isString", function () { return false; });
  P("Object", "isNumber", function () { return false; });
  P("Object", "isSymbol", function () { return false; });
  P("Object", "isCollection", function () { return false; });
  P("Object", "isKindOf:", function (r, a) { return isKind(classOf(r), a[0]); });
  P("Object", "isMemberOf:", function (r, a) { return classOf(r) === a[0]; });
  P("Object", "respondsTo:", function (r, a) { return !!findMethod(r instanceof Cls ? r : classOf(r), a[0].n, r instanceof Cls); });
  P("Object", "->", function (r, a) { return new Assoc(r, a[0]); });
  P("Object", "error:", function (r, a, l) { throw stErr("Error", asJsString(a[0]), l); });
  P("Object", "subclassResponsibility", function (r, a, l) { throw stErr("Error", "Túto metódu má prepísať podtrieda (subclassResponsibility).", l); });
  P("Object", "copy shallowCopy deepCopy", function (r) {
    if (Array.isArray(r)) return r.slice(); if (r instanceof Coll) return new Coll(r.cls, r.items.slice());
    if (r instanceof Dict) { var d = new Dict(r.cls); r.keys.forEach(function (k, i) { dictPut(d, k, r.vals[i]); }); return d; }
    if (r instanceof Obj) { var o = new Obj(r.cls); for (var k in r.iv) o.iv[k] = r.iv[k]; return o; }
    return r;
  });
  P("Object", "value", function (r) { return r; });
  P("Object", "inspect", function (r) { out(printString(r) + "\n"); return r; });
  P("Object", "initialize", function (r) { return r; });

  /* --- Class --- */
  P("Class", "new basicNew", function (r, a, l) {
    if (r === CL.OrderedCollection || r === CL.SortedCollection) return new Coll(r, []);
    if (r === CL.Set) { var s = new Coll(CL.Set, []); s.idx = {}; return s; }
    if (isKind(r, CL.Dictionary)) return new Dict(r);
    if (r === CL.Array) return [];
    if (r === CL.String) return "";
    if (r === CL.WriteStream) return new Stream("");
    if (isKind(r, CL.Exception)) return new StErr(r, null, l);
    if (r === CL.Object || isUser(r)) {
      var o = new Obj(r);
      for (var c = r; c; c = c.sup) c.ivars.forEach(function (n) { if (!(n in o.iv)) o.iv[n] = null; });
      var f = findMethod(r, "initialize", false); if (f && f.m) callMethod(f.m, f.cls, o, []);
      return o;
    }
    throw stErr("Error", "Objekt triedy " + r.name + " sa nedá vytvoriť cez new.", l);
  });
  P("Class", "new:", function (r, a, l) {
    var n = index(a[0], l);
    if (r === CL.Array) return new Array(n).fill(null);
    if (r === CL.String) return " ".repeat(n);
    if (r === CL.OrderedCollection) return new Coll(r, []);
    if (isKind(r, CL.Dictionary)) return new Dict(r);
    if (r === CL.Set) { var s = new Coll(CL.Set, []); s.idx = {}; return s; }
    return send(r, "new", [], null, l);
  });
  P("Class", "name", function (r) { return r.name; });
  P("Class", "superclass", function (r) { return r.sup; });
  P("Class", "printString displayString", function (r) { return r.name; });
  P("Class", "with:", function (r, a, l) { return withArgs(r, a, l); });
  P("Class", "with:with:", function (r, a, l) { return withArgs(r, a, l); });
  P("Class", "with:with:with:", function (r, a, l) { return withArgs(r, a, l); });
  P("Class", "with:with:with:with:", function (r, a, l) { return withArgs(r, a, l); });
  P("Class", "with:with:with:with:with:", function (r, a, l) { return withArgs(r, a, l); });
  P("Class", "withAll:", function (r, a, l) { return withArgs(r, items(a[0], l), l); });
  P("Class", "new:withAll:", function (r, a, l) { var n = index(a[0], l); return r === CL.String ? asJsString(a[1]).repeat(n) : new Array(n).fill(a[1]); });
  P("Class", "on:", function (r, a) { return new Stream(typeof a[0] === "string" ? "" : ""); });
  P("Class", "streamContents:", function (r, a, l) { var s = new Stream(""); callBlock(a[0], [s], l); return s.s; });
  P("Class", "signal signal:", function (r, a, l) { var e = new StErr(r, a.length ? asJsString(a[0]) : null, l); throw e; });
  P("Class", "value:", function (r, a, l) { if (r === CL.Character) return chr(String.fromCodePoint(index(a[0], l))); throw dnu(r, "value:", a, l); });
  P("Class", "cr", function (r) { if (r === CL.Character) return chr("\n"); return r; });
  P("Class", "tab space", function (r, a) { return r === CL.Character ? chr(this === undefined ? " " : " ") : r; });
  CL.Character.cprim.tab = function () { return chr("\t"); };
  CL.Character.cprim.space = function () { return chr(" "); };
  CL.Character.cprim.cr = function () { return chr("\n"); };
  CL.String.cprim.cr = function () { return "\n"; };
  CL.String.cprim.tab = function () { return "\t"; };
  CL.String.cprim.crlf = function () { return "\n"; };
  CL.Float.cprim.pi = function () { return Math.PI; };
  CL.Float.cprim.e = function () { return Math.E; };
  CL.Float.cprim.infinity = function () { return Infinity; };
  function withArgs(r, a, l) {
    if (r === CL.Array) return a.slice();
    if (r === CL.OrderedCollection) return new Coll(r, a.slice());
    if (r === CL.Set) { var s = new Coll(CL.Set, []); s.idx = {}; a.forEach(function (x) { setAdd(s, x); }); return s; }
    if (r === CL.String) return a.map(function (c) { return c instanceof Chr ? c.c : asJsString(c); }).join("");
    if (isKind(r, CL.Dictionary)) { var d = new Dict(r); a.forEach(function (as) { dictPut(d, as.k, as.v); }); return d; }
    throw stErr("Error", r.name + " nepozná with:.", l);
  }
  function isUser(c) { return !!c.user; }

  /* --- Boolean / nil --- */
  P("Boolean", "ifTrue:", function (r, a, l) { return r ? callBlock(a[0], [], l) : null; });
  P("Boolean", "ifFalse:", function (r, a, l) { return r ? null : callBlock(a[0], [], l); });
  P("Boolean", "ifTrue:ifFalse:", function (r, a, l) { return r ? callBlock(a[0], [], l) : callBlock(a[1], [], l); });
  P("Boolean", "ifFalse:ifTrue:", function (r, a, l) { return r ? callBlock(a[1], [], l) : callBlock(a[0], [], l); });
  P("Boolean", "and:", function (r, a, l) { return r ? truthy(callBlock(a[0], [], l), "and:", l) : false; });
  P("Boolean", "or:", function (r, a, l) { return r ? true : truthy(callBlock(a[0], [], l), "or:", l); });
  P("Boolean", "&", function (r, a, l) { return r && truthy(a[0], "&", l); });
  P("Boolean", "|", function (r, a, l) { return r || truthy(a[0], "|", l); });
  P("Boolean", "not", function (r) { return !r; });
  P("Boolean", "xor:", function (r, a, l) { return r !== truthy(a[0], "xor:", l); });
  P("Boolean", "printString displayString", function (r) { return String(r); });
  P("UndefinedObject", "isNil", function () { return true; });
  P("UndefinedObject", "notNil", function () { return false; });
  P("UndefinedObject", "ifNil:", function (r, a, l) { return callBlock(a[0], [], l); });
  P("UndefinedObject", "ifNotNil:", function () { return null; });
  P("UndefinedObject", "ifNil:ifNotNil:", function (r, a, l) { return callBlock(a[0], [], l); });
  P("UndefinedObject", "ifNotNil:ifNil:", function (r, a, l) { return callBlock(a[1], [], l); });
  P("UndefinedObject", "printString displayString", function () { return "nil"; });

  /* --- Čísla --- */
  P("Number", "+", function (r, a) { return arith("+", r, a[0]); });
  P("Number", "-", function (r, a) { return arith("-", r, a[0]); });
  P("Number", "*", function (r, a) { return arith("*", r, a[0]); });
  P("Number", "/", function (r, a) { return arith("/", r, a[0]); });
  P("Number", "//", function (r, a) { if (isInt(r) && isInt(a[0])) return floorDiv(r, a[0]); var y = toF(a[0]); if (y === 0) throw zeroDiv(); return BigInt(Math.floor(toF(r) / y)); });
  P("Number", "\\\\", function (r, a) { if (isInt(r) && isInt(a[0])) { if (a[0] === 0n) throw zeroDiv(); return r - floorDiv(r, a[0]) * a[0]; } var x = toF(r), y = toF(a[0]); if (y === 0) throw zeroDiv(); return x - Math.floor(x / y) * y; });
  P("Number", "rem:", function (r, a) { if (isInt(r) && isInt(a[0])) { if (a[0] === 0n) throw zeroDiv(); return r % a[0]; } return toF(r) % toF(a[0]); });
  P("Number", "quo:", function (r, a) { if (a[0] === 0n) throw zeroDiv(); return isInt(r) && isInt(a[0]) ? r / a[0] : BigInt(Math.trunc(toF(r) / toF(a[0]))); });
  P("Number", "<", function (r, a) { return cmp(r, a[0]) < 0; });
  P("Number", ">", function (r, a) { return cmp(r, a[0]) > 0; });
  P("Number", "<=", function (r, a) { return cmp(r, a[0]) <= 0; });
  P("Number", ">=", function (r, a) { return cmp(r, a[0]) >= 0; });
  P("Number", "=", function (r, a) { return isNum(a[0]) && cmp(r, a[0]) === 0; });
  P("Number", "max:", function (r, a) { return cmp(r, a[0]) >= 0 ? r : a[0]; });
  P("Number", "min:", function (r, a) { return cmp(r, a[0]) <= 0 ? r : a[0]; });
  P("Number", "between:and:", function (r, a) { return cmp(r, a[0]) >= 0 && cmp(r, a[1]) <= 0; });
  P("Number", "abs", function (r) { return isInt(r) ? (r < 0n ? -r : r) : isFlt(r) ? Math.abs(r) : frac(r.n < 0n ? -r.n : r.n, r.d); });
  P("Number", "negated", function (r) { return arith("-", 0n, r); });
  P("Number", "squared", function (r) { return arith("*", r, r); });
  P("Number", "sqrt", function (r, a, l) { var x = toF(r); if (x < 0) throw stErr("Error", "Odmocnina zo záporného čísla neexistuje.", l); return Math.sqrt(x); });
  P("Number", "raisedTo: **", function (r, a, l) {
    var e = a[0];
    if (isInt(e) && e >= 0n && (isInt(r) || r instanceof Frac)) { if (e > 100000n) throw stErr("Error", "Exponent je príliš veľký.", l); if (isInt(r)) return r ** e; return frac(r.n ** e, r.d ** e); }
    if (isInt(e) && e < 0n && isInt(r)) return frac(1n, r ** -e);
    return Math.pow(toF(r), toF(e));
  });
  P("Number", "sign", function (r) { var x = toF(r); return x > 0 ? 1n : x < 0 ? -1n : 0n; });
  P("Number", "isZero", function (r) { return toF(r) === 0; });
  P("Number", "even", function (r, a, l) { if (!isInt(r)) throw stErr("Error", "even funguje len pre celé čísla.", l); return r % 2n === 0n; });
  P("Number", "odd", function (r, a, l) { if (!isInt(r)) throw stErr("Error", "odd funguje len pre celé čísla.", l); return r % 2n !== 0n; });
  P("Number", "isNumber", function () { return true; });
  P("Number", "isInteger", function (r) { return isInt(r); });
  P("Number", "isFloat", function (r) { return isFlt(r); });
  P("Number", "asFloat", function (r) { return toF(r); });
  P("Number", "asInteger truncated", function (r) { return isInt(r) ? r : BigInt(Math.trunc(toF(r))); });
  P("Number", "rounded", function (r) { if (isInt(r)) return r; var x = toF(r); return BigInt(Math.sign(x) * Math.round(Math.abs(x))); });
  P("Number", "floor", function (r) { return isInt(r) ? r : BigInt(Math.floor(toF(r))); });
  P("Number", "ceiling", function (r) { return isInt(r) ? r : BigInt(Math.ceil(toF(r))); });
  P("Number", "roundTo:", function (r, a) { var s = toF(a[0]); var v = Math.round(toF(r) / s) * s; if (isInt(a[0])) return BigInt(Math.round(v)); var dec = (String(a[0]).split(".")[1] || "").length; return parseFloat(v.toFixed(dec)); });
  P("Number", "truncateTo:", function (r, a) { var s = toF(a[0]); var v = Math.trunc(toF(r) / s) * s; var dec = (String(a[0]).split(".")[1] || "").length; return isInt(a[0]) ? BigInt(v) : parseFloat(v.toFixed(dec)); });
  P("Number", "reciprocal", function (r) { return arith("/", 1n, r); });
  P("Number", "printString displayString", function (r) { return printString(r); });
  P("Number", "printString:", function (r, a, l) { if (!isInt(r)) throw stErr("Error", "printString: (sústava) funguje len pre celé čísla.", l); return r.toString(index(a[0], l)).toUpperCase(); });
  P("Number", "printPaddedWith:to:", function (r, a, l) { var s = printString(r); var c = a[0] instanceof Chr ? a[0].c : " "; var n = index(a[1], l); while (s.length < n) s = c + s; return s; });
  P("Number", "printShowingDecimalPlaces: printString:decimalPlaces:", function (r, a, l) { return toF(r).toFixed(index(a[a.length - 1], l)); });
  P("Number", "asString", function (r) { return printString(r); });
  P("Number", "asCharacter", function (r, a, l) { return chr(String.fromCodePoint(index(r, l))); });
  P("Number", "timesRepeat:", function (r, a, l) { for (var i = 0n; i < r; i++) callBlock(a[0], [], l); return r; });
  P("Number", "to:", function (r, a) { return new Interval(r, a[0], 1n); });
  P("Number", "to:by:", function (r, a) { return new Interval(r, a[0], a[1]); });
  P("Number", "to:do:", function (r, a, l) {
    if (isInt(r) && isInt(a[0])) { for (var i = r; i <= a[0]; i++) callBlock(a[1], [i], l); return r; }
    for (var x = toF(r); x <= toF(a[0]); x++) callBlock(a[1], [x], l); return r;
  });
  P("Number", "to:by:do:", function (r, a, l) {
    var s = a[1]; if (toF(s) === 0) throw stErr("Error", "Krok cyklu nemôže byť 0.", l);
    if (isInt(r) && isInt(a[0]) && isInt(s)) { for (var i = r; s > 0n ? i <= a[0] : i >= a[0]; i += s) callBlock(a[2], [i], l); return r; }
    for (var x = toF(r); toF(s) > 0 ? x <= toF(a[0]) + 1e-12 : x >= toF(a[0]) - 1e-12; x += toF(s)) callBlock(a[2], [x], l); return r;
  });
  P("Number", "@", function (r, a) { return new Assoc(r, a[0]); });
  P("Number", "ln", function (r) { return Math.log(toF(r)); });
  P("Number", "log:", function (r, a) { return Math.log(toF(r)) / Math.log(toF(a[0])); });
  P("Number", "sin", function (r) { return Math.sin(toF(r)); });
  P("Number", "cos", function (r) { return Math.cos(toF(r)); });
  P("Integer", "factorial", function (r, a, l) { if (r < 0n) throw stErr("Error", "Faktoriál záporného čísla neexistuje.", l); if (r > 5000n) throw stErr("Error", "Číslo je príliš veľké na faktoriál.", l); var f = 1n; for (var i = 2n; i <= r; i++) f *= i; return f; });
  P("Integer", "gcd:", function (r, a) { return bgcd(r, a[0]); });
  P("Integer", "lcm:", function (r, a) { var g = bgcd(r, a[0]); return g === 0n ? 0n : (r * a[0] < 0n ? -(r * a[0]) : r * a[0]) / g; });
  P("Integer", "isPrime", function (r) { if (r < 2n) return false; for (var d = 2n; d * d <= r; d++) { if (r % d === 0n) return false; if (++stav.kroky > stav.limit) throw stErr("Error", "__LIMIT__"); } return true; });
  P("Integer", "sqrtFloor", function (r) { return BigInt(Math.floor(Math.sqrt(Number(r)))); });
  P("Integer", "numberOfDigits", function (r) { return BigInt((r < 0n ? -r : r).toString().length); });
  P("Integer", "isInteger", function () { return true; });
  P("Integer", "bitAnd:", function (r, a) { return r & a[0]; });
  P("Integer", "bitOr:", function (r, a) { return r | a[0]; });
  P("Fraction", "numerator", function (r) { return r.n; });
  P("Fraction", "denominator", function (r) { return r.d; });
  P("Integer", "numerator", function (r) { return r; });
  P("Integer", "denominator", function () { return 1n; });

  /* --- Character --- */
  P("Character", "value asInteger codePoint", function (r) { return BigInt(r.c.codePointAt(0)); });
  P("Character", "asCharacter", function (r) { return r; });
  P("Character", "asString displayString", function (r) { return r.c; });
  P("Character", "printString", function (r) { return "$" + r.c; });
  P("Character", "asSymbol", function (r) { return sym(r.c); });
  P("Character", "asUppercase", function (r) { return chr(r.c.toUpperCase()); });
  P("Character", "asLowercase", function (r) { return chr(r.c.toLowerCase()); });
  P("Character", "isVowel", function (r) { return /[aeiouyáéíóúýäô]/i.test(r.c); });
  P("Character", "isLetter", function (r) { return /\p{L}/u.test(r.c); });
  P("Character", "isDigit", function (r) { return /[0-9]/.test(r.c); });
  P("Character", "digitValue", function (r) { return BigInt(parseInt(r.c, 36)); });
  P("Character", "isUppercase", function (r) { return r.c !== r.c.toLowerCase(); });
  P("Character", "isLowercase", function (r) { return r.c !== r.c.toUpperCase(); });
  P("Character", "isSeparator", function (r) { return /\s/.test(r.c); });
  P("Character", "<", function (r, a) { return cmp(r, a[0]) < 0; });
  P("Character", ">", function (r, a) { return cmp(r, a[0]) > 0; });
  P("Character", "<=", function (r, a) { return cmp(r, a[0]) <= 0; });
  P("Character", ">=", function (r, a) { return cmp(r, a[0]) >= 0; });
  P("Character", "to:", function (r, a) { var arr = []; for (var i = r.c.codePointAt(0); i <= a[0].c.codePointAt(0); i++) arr.push(chr(String.fromCodePoint(i))); return arr; });

  /* --- Kolekcie (spoločné) --- */
  P("Collection", "do:", function (r, a, l) { items(r, l).slice().forEach(function (x) { callBlock(a[0], [x], l); }); return r; });
  P("Collection", "do:separatedBy:", function (r, a, l) { items(r, l).slice().forEach(function (x, i) { if (i) callBlock(a[1], [], l); callBlock(a[0], [x], l); }); return r; });
  P("Collection", "reverseDo:", function (r, a, l) { items(r, l).slice().reverse().forEach(function (x) { callBlock(a[0], [x], l); }); return r; });
  P("Collection", "doWithIndex: withIndexDo: keysAndValuesDo:", function (r, a, l) {
    if (r instanceof Dict) { r.keys.slice().forEach(function (k, i) { callBlock(a[0], [k, r.vals[i]], l); }); return r; }
    var it = items(r, l).slice(), sel = a[0].node.params.length === 2;
    it.forEach(function (x, i) { var p0 = BigInt(i + 1); callBlock(a[0], stav.lastSel === "keysAndValuesDo:" ? [p0, x] : [x, p0], l); }); return r;
  });
  P("Collection", "collect:", function (r, a, l) {
    if (r instanceof Dict) { var d = r.vals.map(function (x) { return callBlock(a[0], [x], l); }); return new Coll(CL.OrderedCollection, d); }
    var res = items(r, l).map(function (x) { return callBlock(a[0], [x], l); });
    if (r instanceof Coll && r.cls === CL.Set) { var s = new Coll(CL.Set, []); s.idx = {}; res.forEach(function (x) { setAdd(s, x); }); return s; }
    return likeSpecies(r, res);
  });
  P("Collection", "select:", function (r, a, l) {
    if (r instanceof Dict) { var d = new Dict(r.cls); r.keys.forEach(function (k, i) { if (truthy(callBlock(a[0], [r.vals[i]], l), "select:", l)) dictPut(d, k, r.vals[i]); }); return d; }
    var res = items(r, l).filter(function (x) { return truthy(callBlock(a[0], [x], l), "select:", l); });
    if (r instanceof Coll && r.cls === CL.Set) { var s = new Coll(CL.Set, []); s.idx = {}; res.forEach(function (x) { setAdd(s, x); }); return s; }
    if (r instanceof Coll && r.cls === CL.SortedCollection) { var sc = new Coll(CL.SortedCollection, res); sc.blk = r.blk; return sc; }
    return likeSpecies(r, res);
  });
  P("Collection", "reject:", function (r, a, l) { var res = items(r, l).filter(function (x) { return !truthy(callBlock(a[0], [x], l), "reject:", l); }); return likeSpecies(r, res); });
  P("Collection", "detect:", function (r, a, l) { var it = items(r, l); for (var i = 0; i < it.length; i++) if (truthy(callBlock(a[0], [it[i]], l), "detect:", l)) return it[i]; throw stErr("NotFound", "detect: nenašiel žiadny prvok, ktorý spĺňa podmienku. Použi detect:ifNone:.", l); });
  P("Collection", "detect:ifNone:", function (r, a, l) { var it = items(r, l); for (var i = 0; i < it.length; i++) if (truthy(callBlock(a[0], [it[i]], l), "detect:", l)) return it[i]; return callBlock(a[1], [], l); });
  P("Collection", "inject:into:", function (r, a, l) { var acc = a[0]; items(r, l).slice().forEach(function (x) { acc = callBlock(a[1], [acc, x], l); }); return acc; });
  P("Collection", "includes:", function (r, a, l) { if (r instanceof Coll && r.idx) return keyOf(a[0]) in r.idx; return items(r, l).some(function (x) { return eqSend(x, a[0]); }); });
  P("Collection", "occurrencesOf:", function (r, a, l) { return BigInt(items(r, l).filter(function (x) { return eqSend(x, a[0]); }).length); });
  P("Collection", "anySatisfy: contains:", function (r, a, l) { return items(r, l).some(function (x) { return truthy(callBlock(a[0], [x], l), "anySatisfy:", l); }); });
  P("Collection", "allSatisfy:", function (r, a, l) { return items(r, l).every(function (x) { return truthy(callBlock(a[0], [x], l), "allSatisfy:", l); }); });
  P("Collection", "count:", function (r, a, l) { return BigInt(items(r, l).filter(function (x) { return truthy(callBlock(a[0], [x], l), "count:", l); }).length); });
  P("Collection", "size", function (r, a, l) { return BigInt(r instanceof Dict ? r.keys.length : items(r, l).length); });
  P("Collection", "isEmpty", function (r, a, l) { return (r instanceof Dict ? r.keys.length : items(r, l).length) === 0; });
  P("Collection", "notEmpty isNotEmpty", function (r, a, l) { return (r instanceof Dict ? r.keys.length : items(r, l).length) > 0; });
  P("Collection", "ifEmpty:", function (r, a, l) { return items(r, l).length === 0 ? callBlock(a[0], [], l) : r; });
  P("Collection", "ifNotEmpty:", function (r, a, l) { return items(r, l).length ? (a[0].node.params.length ? callBlock(a[0], [r], l) : callBlock(a[0], [], l)) : r; });
  P("Collection", "ifEmpty:ifNotEmpty:", function (r, a, l) { return items(r, l).length === 0 ? callBlock(a[0], [], l) : (a[1].node.params.length ? callBlock(a[1], [r], l) : callBlock(a[1], [], l)); });
  P("Collection", "isCollection", function () { return true; });
  P("Collection", "sum", function (r, a, l) { var it = items(r, l); if (!it.length) return 0n; return it.reduce(function (s, x) { return arith("+", s, x); }); });
  P("Collection", "sum:", function (r, a, l) { return items(r, l).reduce(function (s, x) { return arith("+", s, callBlock(a[0], [x], l)); }, 0n); });
  P("Collection", "detectSum:", function (r, a, l) { return items(r, l).reduce(function (s, x) { return arith("+", s, callBlock(a[0], [x], l)); }, 0n); });
  P("Collection", "average", function (r, a, l) { var it = items(r, l); if (!it.length) throw stErr("Error", "Priemer prázdnej kolekcie neexistuje.", l); return arith("/", it.reduce(function (s, x) { return arith("+", s, x); }), BigInt(it.length)); });
  P("Collection", "max", function (r, a, l) { var it = items(r, l); if (!it.length) throw stErr("Error", "Prázdna kolekcia nemá maximum.", l); return it.reduce(function (m, x) { return cmp(x, m) > 0 ? x : m; }); });
  P("Collection", "min", function (r, a, l) { var it = items(r, l); if (!it.length) throw stErr("Error", "Prázdna kolekcia nemá minimum.", l); return it.reduce(function (m, x) { return cmp(x, m) < 0 ? x : m; }); });
  P("Collection", "detectMax:", function (r, a, l) { var best = null, bv = null; items(r, l).forEach(function (x) { var v = callBlock(a[0], [x], l); if (bv === null || cmp(v, bv) > 0) { bv = v; best = x; } }); return best; });
  P("Collection", "detectMin:", function (r, a, l) { var best = null, bv = null; items(r, l).forEach(function (x) { var v = callBlock(a[0], [x], l); if (bv === null || cmp(v, bv) < 0) { bv = v; best = x; } }); return best; });
  P("Collection", "asArray", function (r, a, l) { return items(r, l).slice(); });
  P("Collection", "asOrderedCollection", function (r, a, l) { return new Coll(CL.OrderedCollection, items(r, l).slice()); });
  P("Collection", "asSet", function (r, a, l) { var s = new Coll(CL.Set, []); s.idx = {}; items(r, l).forEach(function (x) { setAdd(s, x); }); return s; });
  P("Collection", "asBag", function (r, a, l) { return new Coll(CL.OrderedCollection, items(r, l).slice()); });
  P("Collection", "asSortedCollection", function (r, a, l) { return new Coll(CL.SortedCollection, sortItems(items(r, l), null, l)); });
  P("Collection", "asSortedCollection:", function (r, a, l) { var c = new Coll(CL.SortedCollection, sortItems(items(r, l), a[0], l)); c.blk = a[0]; return c; });
  P("Collection", "sorted", function (r, a, l) { return likeSpecies(r, sortItems(items(r, l), null, l)); });
  P("Collection", "sorted: sortBlock:", function (r, a, l) { return likeSpecies(r, sortItems(items(r, l), a[0], l)); });
  P("Collection", "printString", function (r) { return printString(r); });
  P("Collection", "displayString", function (r) { return displayString(r); });
  P("Collection", "groupedBy:", function (r, a, l) { var d = new Dict(CL.Dictionary); items(r, l).forEach(function (x) { var k = callBlock(a[0], [x], l), g = dictAt(d, k); if (g === undefined) dictPut(d, k, g = new Coll(CL.OrderedCollection, [])); g.items.push(x); }); return d; });

  /* --- Sekvenčné --- */
  function seqArr(r, l) { return items(r, l); }
  P("SequenceableCollection", "at:", function (r, a, l) { var it = seqArr(r, l), i = index(a[0], l); checkIdx(it, i, l); return it[i - 1]; });
  P("SequenceableCollection", "at:ifAbsent:", function (r, a, l) { var it = seqArr(r, l), i = index(a[0], l); return i >= 1 && i <= it.length ? it[i - 1] : callBlock(a[1], [], l); });
  P("SequenceableCollection", "at:put:", function (r, a, l) {
    if (typeof r === "string" || r instanceof Sym) throw stErr("Error", "Text sa v tomto Smalltalku nedá meniť po znakoch. Vytvor nový text (napr. cez , alebo copyReplaceAll:with:).", l);
    if (r instanceof Interval) throw stErr("Error", "Interval sa nedá meniť.", l);
    var it = seqArr(r, l), i = index(a[0], l); checkIdx(it, i, l); it[i - 1] = a[1]; return a[1];
  });
  P("SequenceableCollection", "first", function (r, a, l) { var it = seqArr(r, l); if (!it.length) throw stErr("Error", "Prázdna kolekcia nemá prvý prvok.", l); return it[0]; });
  P("SequenceableCollection", "last", function (r, a, l) { var it = seqArr(r, l); if (!it.length) throw stErr("Error", "Prázdna kolekcia nemá posledný prvok.", l); return it[it.length - 1]; });
  P("SequenceableCollection", "first:", function (r, a, l) { return likeSpecies(r, seqArr(r, l).slice(0, index(a[0], l))); });
  P("SequenceableCollection", "last:", function (r, a, l) { var it = seqArr(r, l); return likeSpecies(r, it.slice(Math.max(0, it.length - index(a[0], l)))); });
  P("SequenceableCollection", "allButFirst", function (r, a, l) { return likeSpecies(r, seqArr(r, l).slice(1)); });
  P("SequenceableCollection", "allButLast", function (r, a, l) { return likeSpecies(r, seqArr(r, l).slice(0, -1)); });
  P("SequenceableCollection", "indexOf:", function (r, a, l) { var it = seqArr(r, l); for (var i = 0; i < it.length; i++) if (eqSend(it[i], a[0])) return BigInt(i + 1); return 0n; });
  P("SequenceableCollection", "reversed reverse", function (r, a, l) { return likeSpecies(r, seqArr(r, l).slice().reverse()); });
  P("SequenceableCollection", "copyFrom:to:", function (r, a, l) { var it = seqArr(r, l), i = index(a[0], l), j = index(a[1], l); if (j >= i) { checkIdx(it, i, l); checkIdx(it, j, l); } return likeSpecies(r, it.slice(i - 1, j)); });
  P("SequenceableCollection", ",", function (r, a, l) {
    if (typeof r === "string") { if (typeof a[0] !== "string" && !(a[0] instanceof Sym)) throw stErr("Error", "Čiarkou spájaš len texty, ale dostala " + popis(a[0]) + ". Číslo premeň na text cez printString, napr. 'Vek: ', vek printString.", l); return r + (a[0] instanceof Sym ? a[0].n : a[0]); }
    return likeSpecies(r, seqArr(r, l).concat(items(a[0], l)));
  });
  P("SequenceableCollection", "with:collect:", function (r, a, l) { var x = seqArr(r, l), y = items(a[0], l); return likeSpecies(r, x.map(function (v, i) { return callBlock(a[1], [v, y[i]], l); })); });
  P("SequenceableCollection", "sort", function (r, a, l) { var s = sortItems(seqArr(r, l), null, l); if (Array.isArray(r)) { r.length = 0; s.forEach(function (x) { r.push(x); }); } else if (r instanceof Coll) r.items = s; else return likeSpecies(r, s); return r; });
  P("SequenceableCollection", "sort:", function (r, a, l) { var s = sortItems(seqArr(r, l), a[0], l); if (Array.isArray(r)) { r.length = 0; s.forEach(function (x) { r.push(x); }); } else if (r instanceof Coll) r.items = s; else return likeSpecies(r, s); return r; });
  P("SequenceableCollection", "keysAndValuesDo:", function (r, a, l) { seqArr(r, l).slice().forEach(function (x, i) { callBlock(a[0], [BigInt(i + 1), x], l); }); return r; });
  P("SequenceableCollection", "doWithIndex: withIndexDo:", function (r, a, l) { seqArr(r, l).slice().forEach(function (x, i) { callBlock(a[0], [x, BigInt(i + 1)], l); }); return r; });
  P("SequenceableCollection", "withIndexCollect: collectWithIndex:", function (r, a, l) { return likeSpecies(r, seqArr(r, l).map(function (x, i) { return callBlock(a[0], [x, BigInt(i + 1)], l); })); });
  P("SequenceableCollection", "readStream", function (r, a, l) { var o = new Obj(CL.ReadStream); o.arr = seqArr(r, l); o.pos = 0; o.str = typeof r === "string"; return o; });
  P("SequenceableCollection", "=", function (r, a) { return eq(r, a[0]); });
  P("SequenceableCollection", "isArray", function (r) { return Array.isArray(r); });
  P("Interval", "printString displayString", function (r) { return printString(r); });
  P("Interval", "collect:", function (r, a, l) { return items(r, l).map(function (x) { return callBlock(a[0], [x], l); }); });
  P("Interval", "select:", function (r, a, l) { return items(r, l).filter(function (x) { return truthy(callBlock(a[0], [x], l), "select:", l); }); });
  P("Interval", "do:", function (r, a, l) {
    if (isInt(r.a) && isInt(r.b) && isInt(r.s)) { if (r.s === 0n) throw stErr("Error", "Krok intervalu nemôže byť 0.", l); for (var i = r.a; r.s > 0n ? i <= r.b : i >= r.b; i += r.s) callBlock(a[0], [i], l); return r; }
    items(r, l).forEach(function (x) { callBlock(a[0], [x], l); }); return r;
  });

  /* --- OrderedCollection / SortedCollection --- */
  P("OrderedCollection", "add: addLast:", function (r, a) { if (r.cls === CL.SortedCollection) { r.items = sortItems(r.items.concat([a[0]]), r.blk || null); } else r.items.push(a[0]); return a[0]; });
  P("OrderedCollection", "addFirst:", function (r, a) { r.items.unshift(a[0]); return a[0]; });
  P("OrderedCollection", "addAll:", function (r, a, l) { items(a[0], l).forEach(function (x) { r.items.push(x); }); if (r.cls === CL.SortedCollection) r.items = sortItems(r.items, r.blk || null, l); return a[0]; });
  P("OrderedCollection", "remove:", function (r, a, l) { for (var i = 0; i < r.items.length; i++) if (eqSend(r.items[i], a[0])) { r.items.splice(i, 1); return a[0]; } throw stErr("NotFound", printString(a[0]) + " v kolekcii nie je, nedá sa odstrániť. Použi remove:ifAbsent:.", l); });
  P("OrderedCollection", "remove:ifAbsent:", function (r, a, l) { for (var i = 0; i < r.items.length; i++) if (eqSend(r.items[i], a[0])) { r.items.splice(i, 1); return a[0]; } return callBlock(a[1], [], l); });
  P("OrderedCollection", "removeFirst", function (r, a, l) { if (!r.items.length) throw stErr("Error", "Kolekcia je prázdna, nedá sa odstrániť prvý prvok.", l); return r.items.shift(); });
  P("OrderedCollection", "removeLast", function (r, a, l) { if (!r.items.length) throw stErr("Error", "Kolekcia je prázdna, nedá sa odstrániť posledný prvok.", l); return r.items.pop(); });
  P("OrderedCollection", "removeAll:", function (r, a, l) { items(a[0], l).slice().forEach(function (x) { send(r, "remove:", [x], null, l); }); return a[0]; });
  P("OrderedCollection", "removeAll", function (r) { r.items.length = 0; return r; });
  P("OrderedCollection", "insert:before:", function (r, a, l) { r.items.splice(index(a[1], l) - 1, 0, a[0]); return a[0]; });
  P("OrderedCollection", "removeIndex: removeAt:", function (r, a, l) { var i = index(a[0], l); checkIdx(r.items, i, l); return r.items.splice(i - 1, 1)[0]; });

  /* --- Set --- */
  P("Set", "add:", function (r, a) { return setAdd(r, a[0]); });
  P("Set", "addAll:", function (r, a, l) { items(a[0], l).forEach(function (x) { setAdd(r, x); }); return a[0]; });
  P("Set", "remove: remove:ifAbsent:", function (r, a, l) { var k = keyOf(a[0]); if (!(k in r.idx)) { if (a[1]) return callBlock(a[1], [], l); throw stErr("NotFound", printString(a[0]) + " v množine nie je.", l); } r.items.splice(r.idx[k], 1); r.idx = {}; r.items.forEach(function (x, i) { r.idx[keyOf(x)] = i; }); return a[0]; });

  /* --- Dictionary --- */
  P("Dictionary", "at:put:", function (r, a) { return dictPut(r, a[0], a[1]); });
  P("Dictionary", "at:", function (r, a, l) { var v = dictAt(r, a[0]); if (v === undefined) throw stErr("NotFound", "Kľúč " + printString(a[0]) + " v slovníku nie je. Použi at:ifAbsent:.", l); return v; });
  P("Dictionary", "at:ifAbsent:", function (r, a, l) { var v = dictAt(r, a[0]); return v === undefined ? callBlock(a[1], [], l) : v; });
  P("Dictionary", "at:ifAbsentPut:", function (r, a, l) { var v = dictAt(r, a[0]); return v === undefined ? dictPut(r, a[0], callBlock(a[1], [], l)) : v; });
  P("Dictionary", "at:ifPresent:", function (r, a, l) { var v = dictAt(r, a[0]); return v === undefined ? null : callBlock(a[1], [v], l); });
  P("Dictionary", "removeKey:", function (r, a, l) { var v = dictRemove(r, a[0]); if (v === undefined) throw stErr("NotFound", "Kľúč " + printString(a[0]) + " v slovníku nie je.", l); return v; });
  P("Dictionary", "removeKey:ifAbsent:", function (r, a, l) { var v = dictRemove(r, a[0]); return v === undefined ? callBlock(a[1], [], l) : v; });
  P("Dictionary", "includesKey:", function (r, a) { return dictAt(r, a[0]) !== undefined; });
  P("Dictionary", "includes:", function (r, a) { return r.vals.some(function (x) { return eqSend(x, a[0]); }); });
  P("Dictionary", "keys", function (r) { return r.keys.slice(); });
  P("Dictionary", "values", function (r) { return r.vals.slice(); });
  P("Dictionary", "keysDo:", function (r, a, l) { r.keys.slice().forEach(function (k) { callBlock(a[0], [k], l); }); return r; });
  P("Dictionary", "valuesDo:", function (r, a, l) { r.vals.slice().forEach(function (v) { callBlock(a[0], [v], l); }); return r; });
  P("Dictionary", "keysAndValuesDo:", function (r, a, l) { r.keys.slice().forEach(function (k, i) { callBlock(a[0], [k, r.vals[i]], l); }); return r; });
  P("Dictionary", "associationsDo:", function (r, a, l) { r.keys.slice().forEach(function (k, i) { callBlock(a[0], [new Assoc(k, r.vals[i])], l); }); return r; });
  P("Dictionary", "associations", function (r) { return r.keys.map(function (k, i) { return new Assoc(k, r.vals[i]); }); });
  P("Dictionary", "keyAtValue:", function (r, a) { for (var i = 0; i < r.vals.length; i++) if (eqSend(r.vals[i], a[0])) return r.keys[i]; return null; });
  P("Dictionary", "add:", function (r, a) { dictPut(r, a[0].k, a[0].v); return a[0]; });
  P("Dictionary", "keysSortedSafely", function (r) { return sortItems(r.keys); });
  P("Association", "key", function (r) { return r.k; });
  P("Association", "value", function (r) { return r.v; });
  P("Association", "key: value:", function (r, a) { if (stav.lastSel === "key:") r.k = a[0]; else r.v = a[0]; return r; });

  /* --- String / Symbol --- */
  function str(r) { return r instanceof Sym ? r.n : r; }
  P("String", "size", function (r) { return BigInt(Array.from(str(r)).length); });
  P("String", "isString", function () { return true; });
  P("String", "isEmpty", function (r) { return str(r).length === 0; });
  P("String", "notEmpty isNotEmpty", function (r) { return str(r).length > 0; });
  P("String", "asUppercase", function (r) { return str(r).toUpperCase(); });
  P("String", "asLowercase", function (r) { return str(r).toLowerCase(); });
  P("String", "capitalized", function (r) { var s = str(r); return s.charAt(0).toUpperCase() + s.slice(1); });
  P("String", "asSymbol", function (r) { return sym(str(r)); });
  P("String", "asString displayString", function (r) { return str(r); });
  P("String", "printString", function (r) { return r instanceof Sym ? "#" + r.n : "'" + r.replace(/'/g, "''") + "'"; });
  P("String", "displayNl", function (r) { out(str(r) + "\n"); return r; });
  P("String", "asNumber", function (r) { var s = str(r).trim(); if (/^-?\d+$/.test(s)) return BigInt(s); if (/^-?\d+\/\d+$/.test(s)) { var p = s.split("/"); return frac(BigInt(p[0]), BigInt(p[1])); } if (/^-?\d*\.\d+(e-?\d+)?$/.test(s) || /^-?\d+e-?\d+$/.test(s)) return parseFloat(s); return null; });
  P("String", "asInteger", function (r) { var m = /-?\d+/.exec(str(r)); return m ? BigInt(m[0]) : null; });
  P("String", "includesSubstring: includesSubString:", function (r, a) { return str(r).indexOf(str(a[0])) >= 0; });
  P("String", "beginsWith: startsWith:", function (r, a) { return str(r).indexOf(str(a[0])) === 0; });
  P("String", "endsWith:", function (r, a) { var s = str(r), b = str(a[0]); return s.slice(s.length - b.length) === b; });
  P("String", "indexOf:", function (r, a) { var i = str(r).indexOf(a[0] instanceof Chr ? a[0].c : str(a[0])); return BigInt(i + 1); });
  P("String", "occurrencesOf:", function (r, a) { var c = a[0] instanceof Chr ? a[0].c : str(a[0]); return BigInt(Array.from(str(r)).filter(function (x) { return x === c; }).length); });
  P("String", "copyReplaceAll:with:", function (r, a) { return str(r).split(str(a[0])).join(str(a[1])); });
  P("String", "copyReplacing:with:", function (r, a) { return str(r).split(a[0].c).join(a[1].c); });
  P("String", "copyWithout:", function (r, a) { return str(r).split(a[0].c).join(""); });
  P("String", "trimSeparators trimBoth trimmed", function (r) { return str(r).trim(); });
  P("String", "substrings subStrings", function (r) { return str(r).split(/\s+/).filter(Boolean); });
  P("String", "substrings: subStrings: tokenize:", function (r, a) { var sep = a[0] instanceof Chr ? a[0].c : str(a[0]); return str(r).split(new RegExp("[" + sep.replace(/[\]\\^-]/g, "\\$&") + "]+")).filter(Boolean); });
  P("String", "lines", function (r) { return str(r).split("\n"); });
  P("String", "reversed reverse", function (r) { return Array.from(str(r)).reverse().join(""); });
  P("String", "asArray", function (r) { return Array.from(str(r)).map(chr); });
  P("String", "first", function (r, a, l) { var s = Array.from(str(r)); if (!s.length) throw stErr("Error", "Prázdny text nemá prvý znak.", l); return chr(s[0]); });
  P("String", "last", function (r, a, l) { var s = Array.from(str(r)); if (!s.length) throw stErr("Error", "Prázdny text nemá posledný znak.", l); return chr(s[s.length - 1]); });
  P("String", "at:", function (r, a, l) { var s = Array.from(str(r)), i = index(a[0], l); checkIdx(s, i, l); return chr(s[i - 1]); });
  P("String", "copyFrom:to:", function (r, a, l) { var s = Array.from(str(r)), i = index(a[0], l), j = index(a[1], l); if (j >= i) { checkIdx(s, i, l); checkIdx(s, j, l); } return s.slice(i - 1, j).join(""); });
  P("String", "copyFrom:", function (r, a, l) { return Array.from(str(r)).slice(index(a[0], l) - 1).join(""); });
  P("String", "<", function (r, a) { return cmp(str(r), str(a[0])) < 0; });
  P("String", ">", function (r, a) { return cmp(str(r), str(a[0])) > 0; });
  P("String", "<=", function (r, a) { return cmp(str(r), str(a[0])) <= 0; });
  P("String", ">=", function (r, a) { return cmp(str(r), str(a[0])) >= 0; });
  P("String", "=", function (r, a) { if (r instanceof Sym) return r === a[0]; return typeof a[0] === "string" && r === a[0]; });
  P("String", "sameAs:", function (r, a) { return str(r).toLowerCase() === str(a[0]).toLowerCase(); });
  P("String", "isVowel", function () { return false; });
  P("String", "writeStream", function (r) { return new Stream(""); });
  P("String", "join:", function (r, a, l) { return items(a[0], l).map(asJsString).join(str(r)); });
  P("String", "format:", function (r, a, l) { var it = items(a[0], l); return str(r).replace(/\{(\d+)\}/g, function (_, n) { return asJsString(it[+n - 1]); }); });
  P("String", "asLowercase asLowerCase", function (r) { return str(r).toLowerCase(); });
  P("String", "asUppercase asUpperCase", function (r) { return str(r).toUpperCase(); });
  P("String", "numArgs", function (r) { var s = str(r); return BigInt(/^[^A-Za-z]/.test(s) ? 1 : (s.match(/:/g) || []).length); });
  P("String", "value:", function (r, a, l) { return send(a[0], str(r), [], null, l); });

  /* --- Streamy --- */
  P("WriteStream", "nextPutAll: <<", function (r, a) { r.s += a[0] instanceof Chr ? a[0].c : asJsString(a[0]); return r; });
  P("WriteStream", "nextPut:", function (r, a) { r.s += a[0] instanceof Chr ? a[0].c : asJsString(a[0]); return a[0]; });
  P("WriteStream", "print:", function (r, a) { r.s += printString(a[0]); return r; });
  P("WriteStream", "display:", function (r, a) { r.s += displayString(a[0]); return r; });
  P("WriteStream", "cr nl", function (r) { r.s += "\n"; return r; });
  P("WriteStream", "space", function (r) { r.s += " "; return r; });
  P("WriteStream", "tab", function (r) { r.s += "\t"; return r; });
  P("WriteStream", "contents", function (r) { return r.s; });
  P("ReadStream", "next", function (r) { if (r.pos >= r.arr.length) return null; return r.arr[r.pos++]; });
  P("ReadStream", "atEnd", function (r) { return r.pos >= r.arr.length; });
  P("ReadStream", "peek", function (r) { return r.pos < r.arr.length ? r.arr[r.pos] : null; });
  P("ReadStream", "upToEnd", function (r) { var x = r.arr.slice(r.pos); r.pos = r.arr.length; return r.str ? x.map(function (c) { return c.c; }).join("") : x; });

  /* --- Transcript a stdin --- */
  P("TextCollector", "show: nextPutAll: <<", function (r, a) { out(a[0] instanceof Chr ? a[0].c : asJsString(a[0])); return r; });
  P("TextCollector", "showCr: displayNl:", function (r, a) { out(asJsString(a[0]) + "\n"); return r; });
  P("TextCollector", "print:", function (r, a) { out(printString(a[0])); return r; });
  P("TextCollector", "display:", function (r, a) { out(displayString(a[0])); return r; });
  P("TextCollector", "cr nl newLine", function (r) { out("\n"); return r; });
  P("TextCollector", "tab", function (r) { out("\t"); return r; });
  P("TextCollector", "space", function (r) { out(" "); return r; });
  P("TextCollector", "flush endEntry", function (r) { return r; });
  P("StdinStream", "nextLine", function (r) { return stav.vstup.length ? stav.vstup.shift() : null; });
  P("StdinStream", "atEnd", function () { return stav.vstup.length === 0; });
  P("StdinStream", "upToEnd contents", function () { var s = stav.vstup.join("\n"); stav.vstup = []; return s; });

  /* --- Bloky --- */
  P("BlockClosure", "value", function (r, a, l) { return callBlock(r, [], l); });
  P("BlockClosure", "value:", function (r, a, l) { return callBlock(r, a, l); });
  P("BlockClosure", "value:value:", function (r, a, l) { return callBlock(r, a, l); });
  P("BlockClosure", "value:value:value:", function (r, a, l) { return callBlock(r, a, l); });
  P("BlockClosure", "value:value:value:value:", function (r, a, l) { return callBlock(r, a, l); });
  P("BlockClosure", "valueWithArguments:", function (r, a, l) { return callBlock(r, items(a[0], l), l); });
  P("BlockClosure", "numArgs", function (r) { return BigInt(r.node.params.length); });
  P("BlockClosure", "whileTrue:", function (r, a, l) { while (truthy(callBlock(r, [], l), "whileTrue:", l)) callBlock(a[0], [], l); return null; });
  P("BlockClosure", "whileFalse:", function (r, a, l) { while (!truthy(callBlock(r, [], l), "whileFalse:", l)) callBlock(a[0], [], l); return null; });
  P("BlockClosure", "whileTrue", function (r, a, l) { while (truthy(callBlock(r, [], l), "whileTrue", l)); return null; });
  P("BlockClosure", "whileFalse", function (r, a, l) { while (!truthy(callBlock(r, [], l), "whileFalse", l)); return null; });
  P("BlockClosure", "repeat", function (r, a, l) { for (;;) callBlock(r, [], l); });
  P("BlockClosure", "ensure:", function (r, a, l) { try { return callBlock(r, [], l); } finally { callBlock(a[0], [], l); } });
  P("BlockClosure", "ifCurtailed:", function (r, a, l) { try { return callBlock(r, [], l); } catch (e) { callBlock(a[0], [], l); throw e; } });
  P("BlockClosure", "on:do:", function (r, a, l) {
    try { return callBlock(r, [], l); }
    catch (e) {
      if (!(e instanceof StErr) || e.text === "__LIMIT__") throw e;
      var ok = a[0] instanceof Cls ? isKind(e.cls, a[0]) : (a[0] instanceof Coll || Array.isArray(a[0])) && items(a[0]).some(function (c) { return isKind(e.cls, c); });
      if (!ok) throw e;
      e.handled = true;
      try { return a[1].node.params.length ? callBlock(a[1], [e], l) : callBlock(a[1], [], l); }
      catch (x) { if (x && x.ret === e) return x.v; throw x; }
    }
  });
  /* --- Výnimky --- */
  P("Exception", "messageText description", function (r) { return r.text === null ? (r.cls === CL.ZeroDivide ? "Delenie nulou." : r.cls.name) : r.text; });
  P("Exception", "messageText:", function (r, a) { r.text = asJsString(a[0]); return r; });
  P("Exception", "signal", function (r, a, l) { r.line = l; throw r; });
  P("Exception", "signal:", function (r, a, l) { r.text = asJsString(a[0]); r.line = l; throw r; });
  P("Exception", "return:", function (r, a) { throw { ret: r, v: a[0] }; });
  P("Exception", "return", function (r) { throw { ret: r, v: null }; });
  P("Exception", "class", function (r) { return r.cls; });
  P("Exception", "printString displayString", function (r) { return clen(r.cls.name); });

  /* ================= SPUSTENIE ================= */
  function defineClasses(items, glob) {
    items.forEach(function (it) {
      if (it.t === "classdef") {
        var sup = CL[it.sup];
        if (!sup) throw stErr("Error", "Nadtrieda „" + it.sup + "“ neexistuje.", it.line);
        if (CL[it.name] && !CL[it.name].user) throw stErr("Error", "Trieda " + it.name + " už v Smalltalku existuje. Zvoľ iné meno.", it.line);
        var c = CL[it.name] && CL[it.name].user ? CL[it.name] : new Cls(it.name, sup);
        c.sup = sup; c.user = true; c.ivars = it.ivars.slice(); CL[it.name] = c; stav.userCls.push(it.name);
        it.civars.forEach(function (n) { c.civ[n] = null; });
        it.methods.forEach(function (m) { c.methods[m.sel] = m; });
        it.cmethods.forEach(function (m) { c.cmethods[m.sel] = m; });
      }
    });
  }
  function applyExtend(it) {
    var c = CL[it.name];
    if (!c) throw stErr("Error", "Trieda „" + it.name + "“ neexistuje, nedá sa rozšíriť.", it.line);
    c.ivars = c.ivars.concat(it.ivars);
    it.methods.forEach(function (m) { c.methods[m.sel] = m; stav.ext.push([c, "methods", m.sel]); });
    it.cmethods.forEach(function (m) { c.cmethods[m.sel] = m; stav.ext.push([c, "cmethods", m.sel]); });
  }
  function upratat() {
    (stav.userCls || []).forEach(function (n) { delete CL[n]; });
    (stav.ext || []).forEach(function (e) { delete e[0][e[1]][e[2]]; });
  }
  var lastSelHook = send;
  send = function (rcv, sel, args, superFrom, line) { stav.lastSel = sel; return lastSelHook(rcv, sel, args, superFrom, line); };

  function prelozChybu(e) {
    if (e instanceof SyntaxErr) return { sprava: e.msg, preklad: "Chyba v zápise: " + e.msg, riadok: e.line };
    if (e instanceof StErr) {
      if (e.text === "__LIMIT__") return { sprava: "limit", preklad: "Program sa točí príliš dlho a zastavil som ho. Asi je to nekonečný cyklus: skontroluj podmienku vo whileTrue: alebo rekurziu.", riadok: e.line || 0 };
      var t = e.text === null ? (e.cls === CL.ZeroDivide ? "Delenie nulou." : "Výnimka " + e.cls.name + ".") : e.text;
      return { sprava: t, preklad: (e.cls.user || (e.cls !== CL.Error && e.cls !== CL.MessageNotUnderstood && e.cls !== CL.ZeroDivide && e.cls !== CL.SubscriptOutOfBounds && e.cls !== CL.NotFound) ? "Nezachytená výnimka " + e.cls.name + ": " : "") + t, riadok: e.line || 0 };
    }
    if (e instanceof NLR) return { sprava: "return", preklad: "^ vo vnútri bloku sa pokúsil vrátiť z metódy, ktorá už skončila.", riadok: 0 };
    if (e instanceof RangeError) return { sprava: "stack", preklad: "Metóda volá samu seba donekonečna (príliš hlboká rekurzia). Skontroluj základný prípad.", riadok: stav.line || 0 };
    if (e && e.ret) return { sprava: "return:", preklad: "return: sa dá použiť len v obsluhe výnimky (on:do:).", riadok: 0 };
    return { sprava: String(e && e.message || e), preklad: "Vnútorná chyba interpretera: " + String(e && e.message || e), riadok: stav.line || 0 };
  }

  K.spustiSmalltalkHned = function (kod, vstup) {
    var predch = stav;
    stav = { out: [], dlzka: 0, kroky: 0, limit: 3000000, vstup: (vstup || "").replace(/\r/g, "").split("\n"), line: 0, userCls: [], ext: [], glob: {} };
    if (stav.vstup.length && stav.vstup[stav.vstup.length - 1] === "") stav.vstup.pop();
    var vysl = { vystup: "", chyba: null };
    try {
      var prog = new Parser(lex(kod)).program();
      defineClasses(prog.items);
      var top = new Ctx(null, null, null); top.top = true;
      prog.temps.forEach(function (n) { top.vars[n] = null; });
      prog.items.forEach(function (it) {
        if (it.t === "classdef") return;
        if (it.t === "extend") { applyExtend(it); return; }
        try { ev(it, top); }
        catch (e) { if (e instanceof NLR && e.home === top) return; throw e; }
      });
    } catch (e) { vysl.chyba = prelozChybu(e); }
    finally { upratat(); }
    vysl.vystup = stav.out.join("");
    stav = predch;
    return vysl;
  };
  K.spustiSmalltalk = function (kod, vstup, cb) { setTimeout(function () { cb(K.spustiSmalltalkHned(kod, vstup)); }, 10); };
})();
