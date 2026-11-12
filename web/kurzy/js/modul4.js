/* JavaScript · Modul 4 · Funkcie */
(function () {
  var P = K.pom, JS = function (t) { return P.kod(t, "js"); }, TXT = P.TXT, MONO = P.MONO;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "js", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function over(d, testy) {
    for (var i = 0; i < testy.length; i++) { var v = P.js(d, testy[i][0]); if (v !== testy[i][1]) return testy[i][0] + " má vrátiť " + JSON.stringify(testy[i][1]) + ", vrátilo: " + JSON.stringify(v) + "."; }
    return null;
  }

  var OBR_STROJ = '<svg viewBox="0 0 340 120" role="img" aria-label="Funkcia ako stroj: vstupy (parametre) idú dnu, von vyjde výsledok (return)">' +
    '<rect x="110" y="24" width="120" height="70" rx="14" style="fill:var(--accent)"/>' +
    '<text x="170" y="56" text-anchor="middle" font-size="14" font-weight="700" ' + MONO + ' fill="#fff">sucet</text><text x="170" y="76" text-anchor="middle" font-size="10.5" ' + TXT + ' fill="#fff">a + b</text>' +
    '<text x="20" y="44" font-size="14" font-weight="700" ' + MONO + ' style="fill:var(--hl-num)">2</text><text x="20" y="80" font-size="14" font-weight="700" ' + MONO + ' style="fill:var(--hl-num)">3</text>' +
    '<path d="M36 40h66M36 76h66" style="stroke:var(--muted);stroke-width:2"/><path d="M96 34l8 6-8 6M96 70l8 6-8 6" style="fill:var(--muted)"/>' +
    '<path d="M238 58h56" style="stroke:var(--ok);stroke-width:2.5"/><path d="M288 52l8 6-8 6" style="fill:var(--ok)"/><text x="312" y="63" font-size="16" font-weight="700" ' + MONO + ' style="fill:var(--ok)">5</text>' +
    '<text x="60" y="112" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">parametre</text><text x="300" y="112" text-anchor="middle" font-size="10.5" ' + TXT + ' style="fill:var(--muted)">return</text></svg>';

  var L1 = { id: "js-4-1", nazov: "Prvá funkcia", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Pomenovaný kus kódu",
      text: "<p><b>Funkcia</b> je kus kódu s menom, ktorý môžeš spustiť (zavolať) kedykoľvek a koľkokrát chceš. Raz napíšeš, mnohokrát použiješ.</p>" + UKAZ('function pozdrav() {\n  console.log("Ahoj!");\n  console.log("Vitaj v SyntaxCode.");\n}\n\npozdrav();\npozdrav();', "Ahoj!\nVitaj v SyntaxCode.\nAhoj!\nVitaj v SyntaxCode."),
      podrobne: "<ul><li><code>function</code> + meno + <code>()</code> + telo v <code>{ }</code> = <b>deklarácia</b>. Zatiaľ sa nič nespustí.</li><li><code>pozdrav();</code> = <b>volanie</b>. Až teraz sa telo vykoná.</li></ul><p>Už si ich používal: <code>console.log()</code>, <code>Math.round()</code> aj <code>Number()</code> sú funkcie.</p>" },
    { typ: "volba", otazka: "Čo vypíše tento kód?", kod: 'function test() {\n  console.log("A");\n}\nconsole.log("B");', moznosti: ["B", "A B", "A", "Nič"], spravna: 0, vysvetlenie: "Funkcia test nebola zavolaná, len vytvorená." },
    { typ: "volba", otazka: "Ako zavoláš funkciu <code>skok</code>?", moznosti: ["<code>skok();</code>", "<code>function skok;</code>", "<code>call skok;</code>", "<code>skok;</code>"], spravna: 0, vysvetlenie: "Meno a zátvorky." },
    { typ: "kod", zadanie: "Vytvor funkciu <code>ciara()</code>, ktorá vypíše <b>----------</b> (10 pomlčiek). Zavolaj ju dvakrát.",
      karty: ["js"], start: { js: "" }, vyska: "160px",
      napoveda: 'function ciara() { console.log("----------"); } ciara(); ciara();', riesenie: { js: 'function ciara() {\n  console.log("----------");\n}\n\nciara();\nciara();' },
      kontrola: function (d) {
        if (P.js(d, "typeof ciara") !== "function") return "Funkcia ciara neexistuje.";
        return P.log(d).join("|") === "----------|----------" ? null : "Majú sa vypísať 2 riadky po 10 pomlčiek. Teraz: " + (P.log(d).join(" | ") || "nič");
      }, vysvetlenie: "Raz napísaná, dvakrát použitá." },
  ] };

  var L2 = { id: "js-4-2", nazov: "Parametre a return", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Funkcia ako stroj",
      text: "<p>Funkcia môže dostať <b>vstupy</b> (parametre) a vrátiť <b>výsledok</b> (return):</p>", obr: OBR_STROJ,
      podrobne: UKAZ("function sucet(a, b) {\n  return a + b;\n}\n\nconst x = sucet(2, 3);\nconsole.log(x);\nconsole.log(sucet(10, 20));", "5\n30") + "<p>Pri volaní sa hodnoty (argumenty) dosadia do parametrov v rovnakom poradí: <code>a</code> = 2, <code>b</code> = 3.</p>" },
    { typ: "vyklad", nadpis: "return vs. console.log",
      text: "<p>Častý omyl: <code>console.log</code> len <b>ukáže</b> hodnotu človeku. <code>return</code> ju <b>odovzdá</b> programu, aby s ňou mohol ďalej pracovať.</p>" + JS("function dvojnasobok(n) {\n  return n * 2;\n}\nconst cena = dvojnasobok(15) + 5;  // 35"),
      podrobne: "<p><code>return</code> funkciu zároveň <b>ukončí</b>: kód za ním sa už nevykoná. Funkcia bez return vráti <code>undefined</code>.</p>" },
    { typ: "volba", otazka: "Čo vypíše kód?", kod: "function f(x) {\n  return x + 1;\n  console.log(\"ahoj\");\n}\nconsole.log(f(4));", moznosti: ["5", "ahoj 5", "ahoj", "undefined"], spravna: 0, vysvetlenie: "Za return sa už nič nevykoná." },
    { typ: "volba", otazka: "Čo vráti funkcia bez return?", moznosti: ["undefined", "0", "null", "chybu"], spravna: 0, vysvetlenie: "Bez return je výsledok undefined." },
    { typ: "doplnenie", otazka: "Doplň funkciu na obsah obdĺžnika:", sablona: "function obsah([[0]], [[1]]) {\n  [[2]] a * b;\n}", zetony: ["a", "b", "return", "console.log", "c"], spravne: ["a", "b", "return"], vysvetlenie: "Dva parametre a return." },
    { typ: "kod", zadanie: "Napíš funkciu <code>sDPH(cena)</code>, ktorá vráti cenu zvýšenú o 23 % DPH (cena × 1.23), zaokrúhlenú na 2 desatinné miesta cez <code>Math.round(x * 100) / 100</code>.",
      karty: ["js"], start: { js: "function sDPH(cena) {\n  \n}\n\nconsole.log(sDPH(10));" }, vyska: "180px",
      napoveda: "return Math.round(cena * 1.23 * 100) / 100;", riesenie: { js: "function sDPH(cena) {\n  return Math.round(cena * 1.23 * 100) / 100;\n}\n\nconsole.log(sDPH(10));" },
      kontrola: function (d) { return over(d, [["sDPH(10)", 12.3], ["sDPH(100)", 123], ["sDPH(4.99)", 6.14], ["sDPH(0)", 0]]); },
      vysvetlenie: "Funkciu teraz môžeš použiť pre ľubovoľnú cenu." },
  ] };

  var L3 = { id: "js-4-3", nazov: "Šípkové funkcie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kratší zápis",
      text: "<p>Moderný JavaScript má kratší zápis funkcií so šípkou <code>=&gt;</code>:</p>" + JS("// klasická\nfunction stvorec(x) {\n  return x * x;\n}\n\n// šípková\nconst stvorec2 = (x) => {\n  return x * x;\n};\n\n// najkratšia: jeden výraz = automatický return\nconst stvorec3 = x => x * x;"),
      podrobne: "<ul><li>Pri jednom parametri môžeš zátvorky vynechať: <code>x =&gt; …</code></li><li>Bez parametrov: <code>() =&gt; …</code></li><li>Ak je za šípkou len jeden výraz bez <code>{ }</code>, automaticky sa vráti.</li></ul><p>Šípkové funkcie sú obľúbené najmä pri práci s poliami (map, filter) a udalosťami.</p>" },
    { typ: "volba", otazka: "Čo vráti <code>const f = (a, b) =&gt; a * b;</code> pri volaní <code>f(3, 4)</code>?", moznosti: ["12", "7", "undefined", "34"], spravna: 0, vysvetlenie: "Jeden výraz bez zátvoriek = automatický return." },
    { typ: "volba", otazka: "Prečo vráti táto funkcia <code>undefined</code>?", kod: "const f = x => { x * 2 };", moznosti: ["V { } treba napísať return", "Chýbajú zátvorky okolo x", "Šípka je zle", "Nevráti undefined"], spravna: 0, vysvetlenie: "So zloženými zátvorkami už automatický return neplatí." },
    { typ: "kod", zadanie: "Vytvor šípkovú funkciu <code>jeParne</code>, ktorá pre číslo vráti <code>true</code>, ak je párne, inak <code>false</code>.",
      karty: ["js"], start: { js: "const jeParne = \n\nconsole.log(jeParne(4));" }, vyska: "150px",
      napoveda: "const jeParne = n => n % 2 === 0;", riesenie: { js: "const jeParne = n => n % 2 === 0;\n\nconsole.log(jeParne(4));" },
      kontrola: function (d, s) {
        if (!/=>/.test(s.js)) return "Použi šípkovú funkciu (=>).";
        return over(d, [["jeParne(4)", true], ["jeParne(7)", false], ["jeParne(0)", true]]);
      }, vysvetlenie: "Porovnanie samo vráti true alebo false." },
  ] };

  var L4 = { id: "js-4-4", nazov: "Rozsah premenných", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Kde premenná platí",
      text: "<p>Premenná vytvorená vo funkcii (alebo v bloku <code>{ }</code>) existuje <b>len vnútri</b>. Zvonku ju nevidno:</p>" + JS('function f() {\n  const tajne = 42;\n  console.log(tajne);   // 42\n}\nf();\nconsole.log(tajne);     // chyba: tajne is not defined'),
      podrobne: "<p>Premenné mimo funkcií sú <b>globálne</b> a vidno ich všade. Funkcia ich môže čítať aj meniť, ale je lepšie, keď funkcia dostane všetko cez parametre a výsledok vráti cez return. Taký kód sa ľahšie testuje a opravuje.</p>" },
    { typ: "volba", otazka: "Čo vypíše posledný riadok?", kod: "let x = 1;\nfunction zmen() {\n  let x = 5;\n}\nzmen();\nconsole.log(x);", moznosti: ["1", "5", "chybu", "undefined"], spravna: 0, vysvetlenie: "let x vo funkcii je nová premenná, tá vonkajšia sa nezmenila." },
    { typ: "volba", otazka: "Prečo je lepšie, keď funkcia výsledok vráti, ako keby menila globálnu premennú?", moznosti: ["Je predvídateľná a ľahko sa testuje", "Je rýchlejšia", "Globálne premenné neexistujú", "Nie je to lepšie"], spravna: 0, vysvetlenie: "Funkcia, ktorá závisí len od vstupov, je spoľahlivá." },
    { typ: "kod", zadanie: "Funkcia <code>najvacsie(a, b, c)</code> má vrátiť najväčšie z troch čísel <b>bez</b> použitia Math.max (použi podmienky alebo pomocnú premennú vo funkcii).",
      karty: ["js"], start: { js: "function najvacsie(a, b, c) {\n  \n}\n\nconsole.log(najvacsie(3, 9, 4));" }, vyska: "200px",
      napoveda: "let max = a; if (b > max) max = b; if (c > max) max = c; return max;", riesenie: { js: "function najvacsie(a, b, c) {\n  let max = a;\n  if (b > max) max = b;\n  if (c > max) max = c;\n  return max;\n}\n\nconsole.log(najvacsie(3, 9, 4));" },
      kontrola: function (d, s) {
        if (/Math\.max/.test(s.js)) return "Skús to bez Math.max, pomocou podmienok.";
        return over(d, [["najvacsie(3, 9, 4)", 9], ["najvacsie(10, 2, 3)", 10], ["najvacsie(1, 2, 30)", 30], ["najvacsie(-5, -2, -9)", -2]]);
      }, vysvetlenie: "Premenná max existuje len vo funkcii." },
  ] };

  var L5 = { id: "js-4-5", nazov: "Funkcia ako hodnota", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Funkciu môžeš odovzdať",
      text: "<p>V JavaScripte je funkcia hodnota ako číslo či text. Môžeš ju uložiť do premennej alebo dať inej funkcii ako argument. Taká funkcia sa volá <b>callback</b>:</p>" + UKAZ("function dvakrat(akcia) {\n  akcia();\n  akcia();\n}\n\ndvakrat(() => console.log(\"Hip hip hurá!\"));", "Hip hip hurá!\nHip hip hurá!"),
      podrobne: "<p>Callbacky sú v JavaScripte všade: „keď používateľ klikne, zavolaj túto funkciu“, „o sekundu zavolaj túto funkciu“, „pre každý prvok poľa zavolaj túto funkciu“.</p>" },
    { typ: "vyklad", nadpis: "setTimeout",
      text: "<p>Zavolá funkciu neskôr. Čas je v milisekundách (1000 ms = 1 s):</p>" + UKAZ('console.log("Štart");\nsetTimeout(() => console.log("Po sekunde"), 1000);\nconsole.log("Koniec");', "Štart\nKoniec\nPo sekunde"),
      podrobne: "<p>Všimni si poradie: program na setTimeout <b>nečaká</b>. Naplánuje si funkciu a pokračuje ďalej. Toto je základ asynchrónneho programovania, ktoré využiješ pri načítavaní údajov z internetu.</p>" },
    { typ: "volba", otazka: "V akom poradí sa vypíšu písmená?", kod: 'setTimeout(() => console.log("A"), 0);\nconsole.log("B");', moznosti: ["B, A", "A, B", "Len B", "Len A"], spravna: 0, vysvetlenie: "Aj s 0 ms sa callback spustí až po dokončení aktuálneho kódu." },
    { typ: "kod", zadanie: "Funkcia <code>opakuj(n, akcia)</code> má zavolať funkciu <code>akcia</code> presne <code>n</code>-krát a pri každom volaní jej dať číslo kola (1, 2, …, n).",
      karty: ["js"], start: { js: "function opakuj(n, akcia) {\n  \n}\n\nopakuj(3, kolo => console.log(`Kolo ${kolo}`));" }, vyska: "190px",
      napoveda: "for (let i = 1; i <= n; i++) { akcia(i); }", riesenie: { js: "function opakuj(n, akcia) {\n  for (let i = 1; i <= n; i++) {\n    akcia(i);\n  }\n}\n\nopakuj(3, kolo => console.log(`Kolo ${kolo}`));" },
      kontrola: function (d) {
        var v = P.js(d, "(function(){ var z = []; opakuj(4, function (k) { z.push(k); }); return z.join(','); })()");
        return v === "1,2,3,4" ? null : "opakuj(4, …) má zavolať akciu s 1, 2, 3, 4. Zavolalo s: " + (v || "nič") + ".";
      }, vysvetlenie: "Napísal si vlastnú funkciu, ktorá prijíma inú funkciu." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li>Deklarácia a volanie funkcie.</li><li>Parametre, argumenty a <code>return</code>.</li><li>Šípkové funkcie <code>=&gt;</code>.</li><li>Rozsah premenných.</li><li>Funkcie ako hodnoty, callbacky, <code>setTimeout</code>.</li></ul>", tip: "Teraz test. Potom Modul 5: polia a objekty." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "js-4-1", otazka: "Kedy sa vykoná telo funkcie?", moznosti: ["Pri jej zavolaní", "Hneď pri vytvorení", "Na konci programu", "Nikdy"], spravna: 0, vysvetlenie: "Deklarácia len pripraví, volanie spustí." },
    { typ: "volba", lekcia: "js-4-2", otazka: "Čo vypíše <code>console.log(plus(2, 5))</code>?", kod: "function plus(a, b) {\n  console.log(a + b);\n}", moznosti: ["7 a potom undefined", "7", "undefined", "chybu"], spravna: 0, vysvetlenie: "Funkcia vypíše 7, ale nič nevráti, takže vonkajší console.log vypíše undefined." },
    { typ: "doplnenie", lekcia: "js-4-2", otazka: "Vráť dvojnásobok:", sablona: "function dvojnasobok(n) {\n  [[0]] n * 2;\n}", zetony: ["return", "console.log", "give", "="], spravne: ["return"], vysvetlenie: "return odovzdá výsledok." },
    { typ: "volba", lekcia: "js-4-3", otazka: "Ktorý zápis je správna šípková funkcia?", moznosti: ["<code>const f = x =&gt; x + 1;</code>", "<code>const f = x -&gt; x + 1;</code>", "<code>function =&gt; f(x)</code>", "<code>f =&lt; x + 1</code>"], spravna: 0, vysvetlenie: "=> sa píše rovná sa a väčší ako." },
    { typ: "volba", lekcia: "js-4-4", otazka: "Premenná vytvorená vnútri funkcie…", moznosti: ["existuje len vnútri funkcie", "je viditeľná všade", "sa uloží do prehliadača", "je vždy const"], spravna: 0, vysvetlenie: "Má lokálny rozsah." },
    { typ: "volba", lekcia: "js-4-5", otazka: "Čo je callback?", moznosti: ["Funkcia odovzdaná inej funkcii, ktorá ju zavolá", "Spätný telefonát", "Chyba v kóde", "Typ premennej"], spravna: 0, vysvetlenie: "Napr. setTimeout(callback, 1000)." },
    { typ: "volba", lekcia: "js-4-5", otazka: "Koľko je 2,5 sekundy v setTimeout?", moznosti: ["2500", "2.5", "25", "250"], spravna: 0, vysvetlenie: "Čas je v milisekundách." },
  ];

  K.registrujModul("js", { cislo: 4, nazov: "Funkcie", popis: "Vlastné funkcie, parametre a return, šípkové funkcie, rozsah premenných a callbacky.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
