/* C · Záverečné projekty */
(function () {
  var P = K.pom;
  function r(v) { return P.riadky(v); }
  function ma(v, x) { return r(v).indexOf(x) >= 0; }

  K.registrujZaver("c", [
    { id: "c-p1", nazov: "Štatistika teplôt", minut: 30,
      popis: "Meteorologická stanica nameria teploty za niekoľko dní. Program z nich spraví prehľad.",
      zadanie: "Na vstupe je počet dní a potom teploty (desatinné čísla). Ulož ich do poľa. Priemer počítaj vo funkcii <code>double priemer(double t[], int n)</code>. Vypíš presne (desatinné čísla na 1 miesto, deň číslovaný od 1):<pre class=\"kod\">Priemer: 6.6\nNajteplejšie: 14.5 (deň 4)\nNajchladnejšie: -3.0 (deň 2)\nMrazivé dni: 2\nNad priemerom: 3</pre>Mrazivý deň má teplotu pod 0.",
      karty: ["c"], vstup: "7\n2.5 -3.0 8.0 14.5 -0.5 12.0 12.7", start: { c: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    \n    return 0;\n}" },
      napoveda: "double t[100]; načítaj cez %lf. Najteplejší deň: index maxima + 1. Mrazivé: t[i] < 0. Nad priemerom: t[i] > priemer.",
      kriteria: [
        { text: "Priemer na 1 desatinné miesto", body: 2, test: function (v) { return ma(v, "Priemer: 6.6"); } },
        { text: "Najteplejší deň s číslom dňa", body: 2, test: function (v) { return ma(v, "Najteplejšie: 14.5 (deň 4)"); } },
        { text: "Najchladnejší deň s číslom dňa", body: 2, test: function (v) { return ma(v, "Najchladnejšie: -3.0 (deň 2)"); } },
        { text: "Počet mrazivých dní", body: 1, test: function (v) { return ma(v, "Mrazivé dni: 2"); } },
        { text: "Počet dní nad priemerom", body: 2, test: function (v) { return ma(v, "Nad priemerom: 4"); } },
        { text: "Funkcia double priemer(double t[], int n)", body: 2, test: function (v, s) { return /double\s+priemer\s*\(\s*(const\s+)?double\s+\w+\s*\[\s*\]\s*,\s*int\s+\w+\s*\)|double\s+priemer\s*\(\s*(const\s+)?double\s*\*\s*\w+\s*,\s*int\s+\w+\s*\)/.test(s.c); } },
        { text: "Teploty sú v poli double", body: 1, test: function (v, s) { return /double\s+\w+\s*\[/.test(s.c); } },
      ],
      riesenie: { c: '#include <stdio.h>\n\ndouble priemer(double t[], int n) {\n    double s = 0;\n    for (int i = 0; i < n; i++) s += t[i];\n    return s / n;\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    double t[100];\n    for (int i = 0; i < n; i++) scanf("%lf", &t[i]);\n    double p = priemer(t, n);\n    int mx = 0, mn = 0, mraz = 0, nad = 0;\n    for (int i = 0; i < n; i++) {\n        if (t[i] > t[mx]) mx = i;\n        if (t[i] < t[mn]) mn = i;\n        if (t[i] < 0) mraz++;\n        if (t[i] > p) nad++;\n    }\n    printf("Priemer: %.1f\\n", p);\n    printf("Najteplejšie: %.1f (deň %d)\\n", t[mx], mx + 1);\n    printf("Najchladnejšie: %.1f (deň %d)\\n", t[mn], mn + 1);\n    printf("Mrazivé dni: %d\\n", mraz);\n    printf("Nad priemerom: %d\\n", nad);\n    return 0;\n}' } },

    { id: "c-p2", nazov: "Caesarova šifra", minut: 30,
      popis: "Najznámejšia šifra histórie: každé písmeno sa posunie o pevný počet miest v abecede. Julius Caesar ju používal s posunom 3.",
      zadanie: "Na vstupe je posun (celé číslo) a na ďalšom riadku text (môže mať medzery, načítaj ho cez <code>fgets</code>). Napíš funkciu <code>void sifruj(char s[], int k)</code>, ktorá posunie malé aj veľké písmená anglickej abecedy o k miest (z <b>z</b> sa stane <b>c</b> pri k = 3), ostatné znaky nechá. Vypíš zašifrovaný text a potom text dešifrovaný späť (posun 26 − k):<pre class=\"kod\">Šifra: Dkrm Vyhw, cbc!\nSpäť: Ahoj Svet, zyz!</pre>",
      karty: ["c"], vstup: "3\nAhoj Svet, zyz!", start: { c: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int k;\n    char text[200];\n    scanf(\"%d \", &k);\n    fgets(text, sizeof text, stdin);\n    text[strcspn(text, \"\\n\")] = '\\0';\n    \n    return 0;\n}" },
      napoveda: "Pre malé písmeno: s[i] = 'a' + (s[i] - 'a' + k) % 26; pre veľké rovnako s 'A'. Dešifrovanie = sifruj(text, 26 - k).",
      kriteria: [
        { text: "Text sa zašifruje (posun 3)", body: 3, test: function (v) { return ma(v, "Šifra: Dkrm Vyhw, cbc!"); } },
        { text: "Na konci abecedy sa pokračuje od začiatku (z → c)", body: 2, test: function (v) { var l = r(v).filter(function (x) { return x.indexOf("Šifra:") === 0; })[0] || ""; return /cbc!$/.test(l); } },
        { text: "Veľké písmená ostanú veľké, medzery a interpunkcia sa nemenia", body: 2, test: function (v) { var l = r(v).filter(function (x) { return x.indexOf("Šifra:") === 0; })[0] || ""; return /^Šifra: D\w+ V\w+, \w+!$/.test(l); } },
        { text: "Dešifrovanie vráti pôvodný text", body: 2, test: function (v) { return ma(v, "Späť: Ahoj Svet, zyz!"); } },
        { text: "Funkcia void sifruj(char s[], int k)", body: 2, test: function (v, s) { return /void\s+sifruj\s*\(\s*char\s*(\w+\s*\[\s*\]|\*\s*\w+)\s*,\s*int\s+\w+\s*\)/.test(s.c); } },
        { text: "Funkcia sa použije na šifrovanie aj dešifrovanie", body: 1, test: function (v, s) { return (s.c.match(/sifruj\s*\(/g) || []).length >= 3; } },
      ],
      riesenie: { c: '#include <stdio.h>\n#include <string.h>\n\nvoid sifruj(char s[], int k) {\n    for (int i = 0; s[i] != \'\\0\'; i++) {\n        if (s[i] >= \'a\' && s[i] <= \'z\') s[i] = \'a\' + (s[i] - \'a\' + k) % 26;\n        else if (s[i] >= \'A\' && s[i] <= \'Z\') s[i] = \'A\' + (s[i] - \'A\' + k) % 26;\n    }\n}\n\nint main(void) {\n    int k;\n    char text[200];\n    scanf("%d ", &k);\n    fgets(text, sizeof text, stdin);\n    text[strcspn(text, "\\n")] = \'\\0\';\n    sifruj(text, k);\n    printf("Šifra: %s\\n", text);\n    sifruj(text, 26 - k);\n    printf("Späť: %s\\n", text);\n    return 0;\n}' } },

    { id: "c-p3", nazov: "Evidencia kníh", minut: 35,
      popis: "Malá knižnica: program načíta knihy do poľa štruktúr, zoradí ich podľa roku vydania a spraví štatistiku.",
      zadanie: "Vytvor <code>typedef struct { char nazov[40]; int rok; int strany; } Kniha;</code>. Na vstupe je počet kníh a potom pre každú názov (jedno slovo), rok a počet strán. Zoraď knihy podľa roku (od najstaršej) a vypíš ich v tvare <code>rok nazov</code>. Potom vypíš:<pre class=\"kod\">1719 Robinson\n1876 TomSawyer\n1937 Hobit\n1943 MalyPrinc\nStrán spolu: 1098\nPred rokom 1900: 2\nNajhrubšia: Robinson</pre>",
      karty: ["c"], vstup: "4\nHobit 1937 310\nMalyPrinc 1943 96\nRobinson 1719 420\nTomSawyer 1876 272", start: { c: "#include <stdio.h>\n\nint main(void) {\n    \n    return 0;\n}" },
      napoveda: "Načítaj scanf(\"%39s %d %d\", k[i].nazov, &k[i].rok, &k[i].strany). Triedenie: bublinkové podľa k[j].rok, vymieňaj celé štruktúry (Kniha pom = k[j]; …).",
      kriteria: [
        { text: "Knihy sú vypísané zoradené podľa roku", body: 3, test: function (v) { return r(v).slice(0, 4).join("|") === "1719 Robinson|1876 TomSawyer|1937 Hobit|1943 MalyPrinc"; } },
        { text: "Súčet strán", body: 1, test: function (v) { return ma(v, "Strán spolu: 1098"); } },
        { text: "Počet kníh pred rokom 1900", body: 1, test: function (v) { return ma(v, "Pred rokom 1900: 2"); } },
        { text: "Najhrubšia kniha", body: 2, test: function (v) { return ma(v, "Najhrubšia: Robinson"); } },
        { text: "Knihy sú v poli štruktúr (typedef struct Kniha)", body: 2, test: function (v, s) { return /typedef\s+struct/.test(s.c) && /Kniha\s+\w+\s*\[/.test(s.c); } },
        { text: "Pri triedení sa vymieňajú celé štruktúry", body: 1, test: function (v, s) { return /Kniha\s+\w+\s*=\s*\w+\s*\[/.test(s.c); } },
      ],
      riesenie: { c: '#include <stdio.h>\n\ntypedef struct {\n    char nazov[40];\n    int rok;\n    int strany;\n} Kniha;\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    Kniha k[100];\n    for (int i = 0; i < n; i++) scanf("%39s %d %d", k[i].nazov, &k[i].rok, &k[i].strany);\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - 1 - i; j++) {\n            if (k[j].rok > k[j + 1].rok) {\n                Kniha pom = k[j];\n                k[j] = k[j + 1];\n                k[j + 1] = pom;\n            }\n        }\n    }\n    int spolu = 0, stare = 0, hrubka = 0;\n    for (int i = 0; i < n; i++) {\n        printf("%d %s\\n", k[i].rok, k[i].nazov);\n        spolu += k[i].strany;\n        if (k[i].rok < 1900) stare++;\n        if (k[i].strany > k[hrubka].strany) hrubka = i;\n    }\n    printf("Strán spolu: %d\\n", spolu);\n    printf("Pred rokom 1900: %d\\n", stare);\n    printf("Najhrubšia: %s\\n", k[hrubka].nazov);\n    return 0;\n}' } },
  ]);
})();
