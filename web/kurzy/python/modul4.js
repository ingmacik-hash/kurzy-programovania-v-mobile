/* Python · Modul 4 · Cykly
   Vysvetlenia v troch vrstvách: text (Stručne), podrobne a hlbka (Do hĺbky). */
(function () {
  var P = K.pom, MONO = P.MONO, TXT = P.TXT;
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "py", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function beh(kod, vstupy) { return K.spustiPythonHned(kod, vstupy); }

  var OBR_RANGE = '<svg viewBox="0 0 340 90" role="img" aria-label="range(5) vytvorí čísla 0, 1, 2, 3, 4 – päť čísel, bez čísla 5">' +
    [0, 1, 2, 3, 4, 5].map(function (n) {
      var x = 14 + n * 54, ok = n < 5;
      return '<rect x="' + x + '" y="14" width="44" height="40" rx="8" style="fill:' + (ok ? "#3572a5" : "var(--surface-2)") + ';' + (ok ? "" : "stroke:var(--bad);stroke-width:2;stroke-dasharray:4 3") + '"/><text x="' + (x + 22) + '" y="40" text-anchor="middle" font-size="16" font-weight="700" ' + MONO + ' style="fill:' + (ok ? "#fff" : "var(--bad)") + '">' + n + "</text>";
    }).join("") + '<text x="14" y="78" font-size="12" ' + MONO + ' style="fill:var(--text)">range(5)</text><text x="326" y="78" text-anchor="end" font-size="11" ' + TXT + ' style="fill:var(--bad)">5 už nie</text></svg>';

  /* ====================== Lekcia 1 ====================== */
  var L1 = { id: "python-4-1", nazov: "for a range()", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Opakovanie bez kopírovania",
      text: "<p><b>Cyklus</b> zopakuje kus kódu viackrát. Cyklus <code>for</code> zopakuje odsadený blok pre každú hodnotu, ktorú mu dáš. Funkcia <code>range(n)</code> vytvorí čísla od 0 po n − 1.</p>" + UKAZ('for i in range(3):\n    print("Ahoj", i)', "Ahoj 0\nAhoj 1\nAhoj 2"), obr: OBR_RANGE,
      podrobne: "<p>Čo sa deje krok za krokom:</p><ol><li><code>range(3)</code> pripraví čísla 0, 1, 2.</li><li>Do premennej <code>i</code> sa vloží 0 a vykoná sa blok: vypíše „Ahoj 0“.</li><li>Do <code>i</code> sa vloží 1 a blok sa vykoná znova.</li><li>Potom 2. Čísla sa minuli, cyklus končí a program pokračuje za ním.</li></ol><p>Zápis čítaj ako vetu: „<b>pre</b> každé <code>i</code> <b>v</b> rozsahu 3 urob…“. Ako pri podmienke: dvojbodka na konci a blok odsadený o 4 medzery.</p><p>Premennú môžeš pomenovať ľubovoľne. <code>i</code> je len zvyk (z anglického index). Keď ju v bloku nepotrebuješ, programátori píšu <code>_</code>: <code>for _ in range(3):</code>.</p>",
      hlbka: "<p>Prečo 0 až n − 1, a nie 1 až n? Lebo v programovaní sa indexy počítajú od nuly a <code>range(n)</code> potom presne zodpovedá indexom textu alebo zoznamu s n prvkami.</p><p><code>range</code> čísla netvorí naraz, ale <b>postupne</b>, keď ich cyklus pýta. Preto <code>range(1000000000)</code> nezaberie gigabajty pamäte. Takýmto objektom sa hovorí <b>lenivé</b> (lazy). Ak chceš vidieť všetky čísla naraz, preveď ho na zoznam: <code>list(range(5))</code>.</p><p>Python <code>for</code> je v skutočnosti cyklus „pre každý prvok“ (foreach). Neprechádza len čísla, ale čokoľvek, čo sa dá prechádzať: text, zoznam, súbor riadok po riadku.</p>" },
    { typ: "vyklad", nadpis: "range so začiatkom a krokom",
      text: "<p><code>range</code> môže mať až tri čísla: <b>začiatok</b>, <b>koniec</b> a <b>krok</b>. Koniec sa nikdy nezapočíta.</p>" + P.tabulka(["Zápis", "Čísla"], [["<code>range(5)</code>", "0 1 2 3 4"], ["<code>range(1, 6)</code>", "1 2 3 4 5"], ["<code>range(0, 10, 2)</code>", "0 2 4 6 8"], ["<code>range(5, 0, -1)</code>", "5 4 3 2 1"]]),
      podrobne: "<p>Keď chceš čísla 1 až 10, píš <code>range(1, 11)</code>. Pomôcka: v <code>range(a, b)</code> je presne b − a čísel.</p><p>Krok môže byť aj záporný, vtedy sa počíta dozadu. Začiatok musí byť väčší ako koniec, inak <code>range</code> nevytvorí nič a cyklus sa nevykoná ani raz:</p>" + UKAZ('for i in range(5, 0, -1):\n    print(i, end=" ")\nprint("Štart!")', "5 4 3 2 1 Štart!"),
      hlbka: "<p>Čísla v <code>range</code> musia byť celé. Pre desatinné kroky (0.1, 0.2 …) sa používa <code>for i in range(10): x = i / 10</code> alebo knižnica numpy s funkciou <code>arange</code>.</p><p><code>range</code> vie aj odpovedať na otázky bez prechádzania: <code>len(range(0, 100, 7))</code> vráti počet čísel a <code>50 in range(0, 100, 2)</code> zistí, či tam 50 je, okamžite, výpočtom.</p>" },
    { typ: "volba", otazka: "Koľkokrát sa vypíše Ahoj?", kod: 'for i in range(4):\n    print("Ahoj")', moznosti: ["4", "3", "5", "0"], spravna: 0, vysvetlenie: "range(4) sú čísla 0, 1, 2, 3, teda štyri opakovania." },
    { typ: "volba", otazka: "Ktoré čísla dá <code>range(2, 8, 3)</code>?", moznosti: ["2 5", "2 5 8", "2 3 4 5 6 7", "3 6"], spravna: 0, vysvetlenie: "Od 2 s krokom 3: 2, 5. Ďalšie by bolo 8, ale koniec sa nezapočíta." },
    { typ: "kod", zadanie: "Vypíš malú násobilku čísla 7: riadky <b>7 x 1 = 7</b> až <b>7 x 10 = 70</b>.",
      karty: ["py"], start: { py: "" }, vyska: "130px",
      napoveda: 'for i in range(1, 11):\n    print("7 x", i, "=", 7 * i)', riesenie: { py: 'for i in range(1, 11):\n    print(f"7 x {i} = {7 * i}")' },
      kontrola: function (v, kod) {
        if (!/for\s/.test(kod)) return "Použi cyklus for.";
        var l = r(v); if (l.length !== 10) return "Má byť 10 riadkov (teraz " + l.length + ").";
        for (var i = 1; i <= 10; i++) if (l[i - 1] !== "7 x " + i + " = " + 7 * i) return "Riadok " + i + " má byť: 7 x " + i + " = " + 7 * i;
        return null;
      },
      vysvetlenie: "Desať riadkov výstupu z dvoch riadkov kódu. Zmeň 7 na 8 a máš ďalšiu násobilku." },
  ] };

  /* ====================== Lekcia 2 ====================== */
  var L2 = { id: "python-4-2", nazov: "Súčty v cykle", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Premenná, ktorá zbiera",
      text: "<p>Veľmi častý vzor: <b>pred</b> cyklom vytvor premennú s nulou a <b>v</b> cykle k nej pripočítavaj.</p>" + UKAZ("sucet = 0\nfor i in range(1, 6):\n    sucet = sucet + i\nprint(sucet)", "15"),
      podrobne: "<p>Ako sa mení <code>sucet</code> v jednotlivých kolách:</p>" + P.tabulka(["Kolo", "i", "sucet pred", "sucet po"], [["1.", "1", "0", "1"], ["2.", "2", "1", "3"], ["3.", "3", "3", "6"], ["4.", "4", "6", "10"], ["5.", "5", "10", "15"]]) +
        "<p>Takúto tabuľku si môžeš nakresliť pri každom cykle, keď nerozumieš, čo robí. Programátori tomu hovoria „prejsť program ručne“.</p><p>Rovnakým vzorom sa:</p><ul><li><b>počíta</b>, koľko vecí niečo spĺňa: začni od 0 a pripočítaj 1 (<code>pocet += 1</code>),</li><li><b>násobí</b>: začni od <b>1</b>, lebo 0 by všetko vynulovala,</li><li><b>skladá text</b>: začni od prázdneho textu <code>\"\"</code>.</li></ul><p><code>print(sucet)</code> je <b>mimo</b> cyklu (nie je odsadený), preto sa vypíše len raz, na konci.</p>",
      hlbka: "<p>Premennej, do ktorej sa výsledok postupne zbiera, sa hovorí <b>akumulátor</b>. Python má na najčastejšie prípady hotové funkcie: <code>sum(range(1, 6))</code> je 15, <code>max</code> a <code>min</code> nájdu najväčšiu a najmenšiu hodnotu. Je dobré vedieť, ako fungujú vnútri, a potom používať hotové.</p><p>Súčet 1 + 2 + … + n sa dá vypočítať aj bez cyklu vzorcom n · (n + 1) / 2. Podľa legendy na to prišiel matematik Gauss ako deväťročný žiak. Hľadanie rýchlejšieho postupu je podstata algoritmizácie.</p>" },
    { typ: "vyklad", nadpis: "Cyklus cez text",
      text: "<p><code>for</code> vie prechádzať aj <b>znaky textu</b>, jeden po druhom:</p>" + UKAZ('slovo = "banán"\npocet = 0\nfor znak in slovo:\n    if znak == "a" or znak == "á":\n        pocet += 1\nprint("Počet a:", pocet)', "Počet a: 2"),
      podrobne: "<p>Premenná <code>znak</code> má v každom kole jeden znak: „b“, „a“, „n“, „á“, „n“. Podmienka v cykle rozhodne, či ho započítať. Takto spojíš cyklus a podmienku, dva najdôležitejšie nástroje programovania.</p><p>Pre tento konkrétny prípad má Python aj skratku <code>slovo.count(\"a\")</code>, no tá by „á“ nezapočítala.</p>",
      hlbka: "<p>Keď potrebuješ znak aj jeho poradové číslo, použi <code>enumerate</code>: <code>for i, znak in enumerate(slovo):</code>. Premenná <code>i</code> bude 0, 1, 2 … a <code>znak</code> príslušný znak. Je to prehľadnejšie ako <code>for i in range(len(slovo)):</code> a potom <code>slovo[i]</code>.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: "s = 0\nfor i in range(4):\n    s += i\nprint(s)", moznosti: ["6", "10", "4", "3"], spravna: 0, vysvetlenie: "range(4) sú 0, 1, 2, 3 a ich súčet je 6." },
    { typ: "volba", otazka: "Prečo je <code>sucet = 0</code> pred cyklom a nie v ňom?", moznosti: ["V cykle by sa v každom kole vynuloval", "Python to tak vyžaduje", "Je to jedno", "Kvôli rýchlosti"], spravna: 0, vysvetlenie: "Vo vnútri cyklu by sa súčet na začiatku každého kola nastavil znova na 0 a na konci by zostalo len posledné číslo." },
    { typ: "kod", zadanie: "Program načíta číslo n (vstup: <b>5</b>) a vypíše súčin čísel 1 až n (faktoriál), teda pre 5: <b>120</b>.",
      karty: ["py"], vstup: "5", start: { py: "n = int(input())\n" }, vyska: "160px",
      napoveda: "vysledok = 1, potom for i in range(1, n + 1): vysledok *= i a nakoniec print(vysledok)", riesenie: { py: "n = int(input())\nvysledok = 1\nfor i in range(1, n + 1):\n    vysledok *= i\nprint(vysledok)" },
      kontrola: function (v, kod) {
        if (r(v).pop() !== "120") return "Pre 5 má vyjsť 120.";
        return r(beh(kod, ["7"]).vystup).pop() === "5040" ? null : "Pre 7 má vyjsť 5040. Skontroluj range (koniec sa nezapočíta).";
      },
      vysvetlenie: "Súčin začína od 1, nie od 0. Overil som aj vstup 7 (5040)." },
  ] };

  /* ====================== Lekcia 3 ====================== */
  var L3 = { id: "python-4-3", nazov: "while", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Kým platí podmienka",
      text: "<p>Cyklus <code>while</code> opakuje blok, <b>kým podmienka platí</b>. Hodí sa, keď vopred nevieš, koľko opakovaní bude.</p>" + UKAZ('peniaze = 100\nroky = 0\nwhile peniaze < 200:\n    peniaze = peniaze * 1.1\n    roky += 1\nprint("Zdvojnásobia sa za", roky, "rokov")', "Zdvojnásobia sa za 8 rokov"),
      podrobne: "<p>Pred každým kolom sa Python opýta: platí <code>peniaze &lt; 200</code>? Ak áno, vykoná blok (pripíše 10 % úrok a pripočíta rok) a pýta sa znova. Keď podmienka prestane platiť, cyklus skončí.</p><p><code>while</code> je ako <code>if</code>, ktorý sa opakuje. Kým <code>if</code> blok vykoná najviac raz, <code>while</code> ho vykonáva znova a znova.</p><p><b>Pozor na nekonečný cyklus:</b> ak sa v bloku nezmení nič, od čoho podmienka závisí, platí stále a program sa nikdy neskončí. Táto aplikácia ho po chvíli zastaví a povie ti to. Na počítači ho zastavíš klávesmi <b>Ctrl + C</b>.</p>",
      hlbka: "<p>Každý <code>for</code> cyklus sa dá prepísať na <code>while</code>: <code>i = 0; while i &lt; 5: …; i += 1</code>. Opačne to neplatí. <code>for</code> je však kratší a nehrozí v ňom, že zabudneš zvýšiť počítadlo, preto ho používaj vždy, keď poznáš počet opakovaní alebo prechádzaš nejakú postupnosť.</p><p>V niektorých jazykoch existuje aj cyklus <code>do … while</code>, ktorý podmienku kontroluje až na konci, takže prebehne aspoň raz. Python ho nemá. Nahrádza ho vzor <code>while True:</code> s <code>break</code>, ktorý uvidíš v ďalšej lekcii.</p>" },
    { typ: "vyklad", nadpis: "Opakuj, kým nie je dobre",
      text: "<p>Typické použitie <code>while</code>: pýtaj sa, kým nedostaneš správnu odpoveď.</p>" + UKAZ('heslo = ""\nwhile heslo != "python":\n    heslo = input("Heslo: ")\nprint("Vitaj!")', "Heslo: java\nHeslo: python\nVitaj!"),
      podrobne: "<p>Prečo je na začiatku <code>heslo = \"\"</code>? Podmienka <code>heslo != \"python\"</code> sa kontroluje <b>pred</b> prvým kolom a premenná už musí existovať. Prázdny text sa nerovná „python“, preto cyklus prvýkrát prebehne.</p><p>Rovnako fungujú hry („hraj, kým má hráč životy“), menu („zobrazuj, kým používateľ nezvolí Koniec“) aj kontrola vstupu („pýtaj sa, kým nezadá číslo od 1 do 10“).</p>",
      hlbka: "<p>Hry sú postavené na takzvanej <b>hernej slučke</b> (game loop): <code>while hra_bezi:</code> načítaj vstup, posuň objekty, vykresli obrazovku. Opakuje sa to 30 až 120-krát za sekundu.</p><p>Aj táto aplikácia beží v slučke udalostí prehliadača, ktorá stále čaká na ťuknutie, časovač alebo odpoveď zo siete.</p>" },
    { typ: "volba", otazka: "Čo je zle?", kod: "i = 0\nwhile i < 5:\n    print(i)", moznosti: ["i sa nezvyšuje, cyklus je nekonečný", "Chýba range", "while sa píše veľkým", "Nič"], spravna: 0, vysvetlenie: "i zostane 0, podmienka platí stále. Chýba riadok i += 1 v bloku." },
    { typ: "volba", otazka: "Kedy je lepší <code>while</code> ako <code>for</code>?", moznosti: ["Keď vopred nevieš počet opakovaní", "Keď chceš 10 opakovaní", "Pri prechode textom", "Nikdy"], spravna: 0, vysvetlenie: "for pre známy počet alebo prechádzanie postupnosti, while pre „kým platí podmienka“." },
    { typ: "kod", zadanie: "Odpočítavanie: program načíta číslo (vstup: <b>5</b>) a cyklom <code>while</code> vypíše čísla od neho po 1, každé na nový riadok, a nakoniec <b>Štart!</b>.",
      karty: ["py"], vstup: "5", start: { py: "n = int(input())\n" }, vyska: "170px",
      napoveda: "while n > 0:\n    print(n)\n    n -= 1\nprint(\"Štart!\")", riesenie: { py: 'n = int(input())\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("Štart!")' },
      kontrola: function (v, kod) {
        if (!/while\s/.test(kod)) return "Použi cyklus while.";
        var l = r(v).filter(function (x) { return x !== "5" || true; }), ocak = ["5", "5", "4", "3", "2", "1", "Štart!"];
        if (l.join("|") !== ocak.join("|")) return "Výstup má byť 5, 4, 3, 2, 1, Štart! (každé na novom riadku).";
        return r(beh(kod, ["2"]).vystup).join("|") === "2|2|1|Štart!" ? null : "Pre vstup 2 má vypísať 2, 1, Štart!";
      },
      vysvetlenie: "Nezabudol si zmenšovať n, inak by cyklus nikdy neskončil." },
  ] };

  /* ====================== Lekcia 4 ====================== */
  var L4 = { id: "python-4-4", nazov: "break a continue", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Predčasný koniec a preskočenie",
      text: "<p>Dva príkazy menia priebeh cyklu:</p><ul><li><code>break</code> (prerušiť) okamžite <b>ukončí</b> celý cyklus,</li><li><code>continue</code> (pokračovať) <b>preskočí</b> zvyšok tohto kola a ide na ďalšie.</li></ul>" + UKAZ('for i in range(1, 10):\n    if i == 3:\n        continue\n    if i == 6:\n        break\n    print(i)', "1\n2\n4\n5"),
      podrobne: "<p>Čo sa stalo: 1 a 2 sa vypísali normálne. Pri 3 sa vykonal <code>continue</code>, takže <code>print</code> sa preskočil a pokračovalo sa číslom 4. Pri 6 sa vykonal <code>break</code> a cyklus skončil úplne, 7, 8 a 9 už neprišli na rad.</p><p>Oba príkazy sa takmer vždy píšu <b>do podmienky</b> vo vnútri cyklu. Samotný <code>break</code> bez podmienky by cyklus ukončil hneď v prvom kole.</p><p>Častý vzor je <code>while True:</code> s <code>break</code> vo vnútri. <code>True</code> platí vždy, takže cyklus beží, kým ho niečo zvnútra neukončí.</p>",
      hlbka: "<p><code>break</code> ukončí iba <b>najvnútornejší</b> cyklus, v ktorom sa nachádza. Pri vnorených cykloch vonkajší pokračuje ďalej.</p><p>Python má zriedkavú vlastnosť: cyklus môže mať vetvu <code>else</code>. Vykoná sa, keď cyklus skončil prirodzene, <b>bez</b> <code>break</code>. Hodí sa pri hľadaní: „prešiel som všetko a nenašiel som“.</p><p>Niektorí programátori sa <code>break</code> a <code>continue</code> vyhýbajú, lebo pri dlhom cykle zneprehľadňujú, kadiaľ program ide. Pri krátkych cykloch sú však úplne v poriadku.</p>" },
    { typ: "vyklad", nadpis: "Hľadanie",
      text: "<p>Keď nájdeš, čo hľadáš, nemá zmysel pokračovať. Na to je <code>break</code>.</p>" + UKAZ('for n in range(2, 100):\n    if n % 7 == 0 and n % 5 == 0:\n        print("Prvé číslo deliteľné 5 aj 7:", n)\n        break', "Prvé číslo deliteľné 5 aj 7: 35"),
      podrobne: "<p>Bez <code>break</code> by program vypísal aj 70 a cyklus by prešiel zbytočne až po 99. Pri malých číslach to nevadí, ale pri hľadaní v miliónoch záznamov je rozdiel obrovský.</p>",
      hlbka: "<p>Tento spôsob sa volá <b>lineárne hľadanie</b>: skúšaš prvky jeden po druhom. V najhoršom prípade prejdeš všetky. Keď sú údaje zoradené, dá sa hľadať oveľa rýchlejšie, napríklad binárnym vyhľadávaním, ktoré zakaždým zahodí polovicu možností.</p>" },
    { typ: "volba", otazka: "Čo vypíše program?", kod: "for i in range(5):\n    if i == 2:\n        break\n    print(i)", moznosti: ["0 1", "0 1 2", "0 1 3 4", "2"], spravna: 0, vysvetlenie: "Pri 2 sa cyklus ukončí ešte pred print, takže 2 sa už nevypíše." },
    { typ: "volba", otazka: "Čo spraví <code>continue</code>?", moznosti: ["Preskočí zvyšok kola a pokračuje ďalším", "Ukončí cyklus", "Ukončí program", "Zopakuje to isté kolo"], spravna: 0, vysvetlenie: "continue skočí na začiatok ďalšieho kola. Ukončuje break." },
    { typ: "kod", zadanie: "Program číta čísla (vstupy sú pripravené) a sčítava ich, kým nepríde <b>0</b>. Potom vypíše <b>Súčet: X</b>. Pre pripravené vstupy 4, 10, 6, 0 vyjde <b>Súčet: 20</b>.",
      karty: ["py"], vstup: "4\n10\n6\n0", start: { py: "sucet = 0\n" }, vyska: "190px",
      napoveda: "while True:\n    x = int(input())\n    if x == 0:\n        break\n    sucet += x", riesenie: { py: 'sucet = 0\nwhile True:\n    x = int(input())\n    if x == 0:\n        break\n    sucet += x\nprint(f"Súčet: {sucet}")' },
      kontrola: function (v, kod) {
        if (r(v).pop() !== "Súčet: 20") return "Pre vstupy 4, 10, 6, 0 má vyjsť Súčet: 20.";
        return r(beh(kod, ["1", "2", "3", "0", "100"]).vystup).pop() === "Súčet: 6" ? null : "Program musí skončiť pri prvej nule (pre 1, 2, 3, 0, 100 má vyjsť Súčet: 6).";
      },
      vysvetlenie: "while True s break: cyklus beží, kým nepríde nula. Overil som, že sa zastaví pri prvej nule." },
  ] };

  /* ====================== Lekcia 5 ====================== */
  var L5 = { id: "python-4-5", nazov: "Vnorené cykly", minut: 11, kroky: [
    { typ: "vyklad", nadpis: "Cyklus v cykle",
      text: "<p>Do cyklu môžeš dať ďalší cyklus. <b>Vnútorný</b> cyklus prebehne celý pri <b>každom</b> kole vonkajšieho. Tak vznikajú tabuľky a obrazce.</p>" + UKAZ('for riadok in range(1, 4):\n    for stlpec in range(1, 4):\n        print(riadok * stlpec, end=" ")\n    print()', "1 2 3 \n2 4 6 \n3 6 9 "),
      podrobne: "<p>Predstav si hodiny: ručička minút (vnútorný cyklus) obehne celý ciferník, kým sa hodinová (vonkajší cyklus) posunie o jedno číslo.</p><p>V príklade: keď je <code>riadok</code> 1, vnútorný cyklus prejde <code>stlpec</code> 1, 2, 3 a vypíše 1 2 3. Potom <code>print()</code> ukončí riadok. Potom je <code>riadok</code> 2 a vnútorný cyklus beží odznova.</p><p><code>print(…, end=\" \")</code> na konci nevypíše nový riadok, ale medzeru, takže čísla sú vedľa seba. Prázdne <code>print()</code> potom riadok ukončí. Všimni si jeho odsadenie: patrí do vonkajšieho cyklu, nie do vnútorného.</p>",
      hlbka: "<p>Počet opakovaní sa pri vnorených cykloch <b>násobí</b>. Dva cykly po 1000 kolách znamenajú milión vykonaní vnútorného bloku. Tri cykly by boli miliarda. Programátori preto pri veľkých údajoch sledujú <b>zložitosť</b> algoritmu a vyhýbajú sa zbytočnému vnáraniu.</p><p>Vnorené cykly sa používajú pri práci s mriežkami: obrázok sú riadky a stĺpce pixelov, šachovnica 8 × 8 políčok, tabuľka v Exceli.</p>" },
    { typ: "vyklad", nadpis: "Obrazce z textu",
      text: "<p>Text sa dá násobiť: <code>\"*\" * 3</code> je <code>\"***\"</code>. Vďaka tomu trojuholník zvládne aj jeden cyklus:</p>" + UKAZ('for i in range(1, 5):\n    print("*" * i)', "*\n**\n***\n****"),
      podrobne: "<p>V každom kole sa vypíše toľko hviezdičiek, koľko je hodnota <code>i</code>. Násobenie textu tu nahrádza vnútorný cyklus.</p><p>Obrátený trojuholník: <code>range(4, 0, -1)</code>. Zarovnanie doprava: <code>print(\" \" * (4 - i) + \"*\" * i)</code>.</p>",
      hlbka: "<p>Kreslenie obrazcov z textu je klasické cvičenie, lebo núti presne premýšľať, koľkokrát sa čo zopakuje. Keď nevieš, ako na to, napíš si pre každý riadok, koľko medzier a koľko znakov má mať, a hľadaj vzťah s číslom riadku.</p>" },
    { typ: "volba", otazka: "Koľkokrát sa vypíše X?", kod: 'for a in range(3):\n    for b in range(4):\n        print("X")', moznosti: ["12", "7", "3", "4"], spravna: 0, vysvetlenie: "Vnútorný cyklus (4 kolá) prebehne pri každom z 3 kôl vonkajšieho: 3 × 4 = 12." },
    { typ: "kod", zadanie: "Program načíta výšku (vstup: <b>4</b>) a nakreslí štvorec z <code>#</code>: 4 riadky po 4 znaky <b>####</b>. Použi cyklus.",
      karty: ["py"], vstup: "4", start: { py: "n = int(input())\n" }, vyska: "150px",
      napoveda: 'for i in range(n):\n    print("#" * n)', riesenie: { py: 'n = int(input())\nfor i in range(n):\n    print("#" * n)' },
      kontrola: function (v, kod) {
        if (!/for\s|while\s/.test(kod)) return "Použi cyklus.";
        var l = r(v).slice(1); if (l.join("|") !== "####|####|####|####") return "Má byť 4 riadky ####.";
        return r(beh(kod, ["2"]).vystup).slice(1).join("|") === "##|##" ? null : "Pre vstup 2 má vyjsť štvorec 2 × 2.";
      },
      vysvetlenie: "Skús nakresliť aj trojuholník." },
    { typ: "kod", zadanie: "Nakresli schody z čísel pre vstup <b>4</b>: <br><code>1</code><br><code>12</code><br><code>123</code><br><code>1234</code><br>Použi dva vnorené cykly a <code>end=\"\"</code>.",
      karty: ["py"], vstup: "4", start: { py: "n = int(input())\n" }, vyska: "190px",
      napoveda: "for i in range(1, n + 1):\n    for j in range(1, i + 1):\n        print(j, end=\"\")\n    print()", riesenie: { py: 'n = int(input())\nfor i in range(1, n + 1):\n    for j in range(1, i + 1):\n        print(j, end="")\n    print()' },
      kontrola: function (v, kod) {
        if ((kod.match(/for\s/g) || []).length < 2) return "Použi dva vnorené cykly for.";
        return r(v).slice(1).join("|") === "1|12|123|1234" ? null : "Výstup má byť 1, 12, 123, 1234 (každé na novom riadku).";
      },
      vysvetlenie: "Vnútorný cyklus ide vždy po číslo aktuálneho riadku." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<p>Čo už vieš:</p><ul><li>cyklus <code>for i in range(…)</code> a <code>range</code> so začiatkom a krokom,</li><li><b>súčty a počítadlá</b> v cykle a prechod textom <code>for znak in text</code>,</li><li>cyklus <code>while</code> a ako sa vyhnúť nekonečnému cyklu,</li><li><code>break</code>, <code>continue</code> a vzor <code>while True</code>,</li><li><b>vnorené</b> cykly a <code>end=\"\"</code>.</li></ul>",
      tip: "Teraz test. Potom funkcie: vlastné príkazy, ktoré raz napíšeš a potom používaš kdekoľvek." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "python-4-1", otazka: "Aké čísla dá <code>range(3)</code>?", moznosti: ["0 1 2", "1 2 3", "0 1 2 3", "3"], spravna: 0, vysvetlenie: "Od 0, bez konca." },
    { typ: "volba", lekcia: "python-4-1", otazka: "Ako získaš čísla 1 až 10?", moznosti: ["<code>range(1, 11)</code>", "<code>range(1, 10)</code>", "<code>range(10)</code>", "<code>range(0, 10)</code>"], spravna: 0, vysvetlenie: "Koniec sa nezapočíta." },
    { typ: "volba", lekcia: "python-4-2", otazka: "Čo vypíše program?", kod: 'v = ""\nfor z in "abc":\n    v = z + v\nprint(v)', moznosti: ["cba", "abc", "a", "chybu"], spravna: 0, vysvetlenie: "Každý znak sa pridá na začiatok." },
    { typ: "volba", lekcia: "python-4-3", otazka: "Kedy sa cyklus <code>while x &lt; 10:</code> skončí?", moznosti: ["Keď x bude 10 alebo viac", "Po 10 opakovaniach", "Nikdy", "Hneď"], spravna: 0, vysvetlenie: "Keď podmienka prestane platiť." },
    { typ: "volba", lekcia: "python-4-3", otazka: "Čo spôsobí nekonečný cyklus?", moznosti: ["Podmienka nikdy neprestane platiť", "Príliš veľké číslo", "Chýbajúca dvojbodka", "print v cykle"], spravna: 0, vysvetlenie: "Napr. zabudnuté i += 1." },
    { typ: "volba", lekcia: "python-4-4", otazka: "Ktorý príkaz okamžite ukončí cyklus?", moznosti: ["<code>break</code>", "<code>continue</code>", "<code>stop</code>", "<code>exit</code>"], spravna: 0, vysvetlenie: "break." },
    { typ: "volba", lekcia: "python-4-5", otazka: "Čo vypíše <code>print(\"ab\" * 3)</code>?", moznosti: ["ababab", "ab3", "ab ab ab", "chybu"], spravna: 0, vysvetlenie: "Text sa zopakuje 3-krát." },
    { typ: "doplnenie", lekcia: "python-4-1", otazka: "Vypíš párne čísla 0 až 8:", sablona: "for i [[0]] range(0, 10, [[1]]):\n    print(i)", zetony: ["in", "2", "of", "1", "10"], spravne: ["in", "2"], vysvetlenie: "range s krokom 2." },
  ];

  K.registrujModul("python", { cislo: 4, nazov: "Cykly", popis: "for, range, súčty v cykle, while, break, continue a vnorené cykly.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });

  K.registrujSlovnik("python", [
    { kat: "Cykly", znak: "for … in …", nazov: "Cyklus for", popis: "Pre každú hodnotu (číslo, znak, prvok) vykoná blok.", priklad: "for i in range(3):\n    print(i)" },
    { kat: "Cykly", znak: "range(a, b, k)", nazov: "Rad čísel", popis: "Od a po b-1 s krokom k." },
    { kat: "Cykly", znak: "while", nazov: "Cyklus while", popis: "Opakuje, kým podmienka platí." },
    { kat: "Cykly", znak: "break / continue", nazov: "Riadenie cyklu", popis: "Ukonči cyklus / preskoč na ďalší krok." },
    { kat: "Cykly", znak: "end=\"\"", nazov: "Bez nového riadku", popis: "print(x, end=\"\") nepridá na koniec nový riadok." },
  ]);
})();
