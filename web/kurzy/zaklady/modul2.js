/* Základy programovania · Modul 2 · Od kódu k spusteniu */
(function () {
  var P = K.pom, TXT = P.TXT, MONO = P.MONO, F = "#b45309";
  var UKAZ = function (kod, vystup, jazyk) { return '<div class="kod-obal">' + P.kod(kod, jazyk || "py", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }

  /* Strom priečinkov projektu */
  var OBR_STROM = '<svg viewBox="0 0 340 128" role="img" aria-label="Projekt je priečinok so súbormi a podpriečinkami">' +
    [[0, "📁 moja-hra", ""], [1, "📄 hra.py", "hlavný program"], [1, "📄 nastavenia.json", "údaje"], [1, "📁 obrazky", "podpriečinok"], [2, "🖼 hrac.png", ""], [1, "📄 README.md", "popis projektu"]].map(function (x, i) {
      var y = 18 + i * 20;
      return '<text x="' + (12 + x[0] * 22) + '" y="' + y + '" font-size="12" ' + MONO + ' style="fill:var(--text)">' + x[1] + '</text>' + (x[2] ? '<text x="330" y="' + y + '" text-anchor="end" font-size="10" ' + TXT + ' style="fill:var(--muted)">' + x[2] + "</text>" : "");
    }).join("") + "</svg>";

  /* Kompilátor a interpreter */
  function krabica(x, y, w, t, s, plna) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="36" rx="8" style="fill:' + (plna ? F : "var(--surface-2)") + ';stroke:' + F + ';stroke-width:1.5"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + 16) + '" text-anchor="middle" font-size="11" font-weight="700" ' + TXT + ' style="fill:' + (plna ? "#fff" : "var(--text)") + '">' + t + "</text>" +
      '<text x="' + (x + w / 2) + '" y="' + (y + 29) + '" text-anchor="middle" font-size="9" ' + TXT + ' style="fill:' + (plna ? "#fff" : "var(--muted)") + '">' + s + "</text>";
  }
  function sip(x1, x2, y) { return '<path d="M' + x1 + " " + y + "H" + (x2 - 4) + '" style="stroke:var(--muted);stroke-width:2"/><path d="M' + (x2 - 7) + " " + (y - 5) + "l7 5-7 5" + '" style="fill:var(--muted)"/>'; }
  var OBR_PREKLAD = '<svg viewBox="0 0 340 128" role="img" aria-label="Kompilátor preloží celý program dopredu do spustiteľného súboru. Interpreter vykonáva program priebežne.">' +
    '<text x="4" y="12" font-size="10" font-weight="700" ' + TXT + ' style="fill:var(--muted)">KOMPILÁTOR (C, C++)</text>' +
    krabica(4, 18, 78, "program.c", "zdrojový kód") + sip(84, 104, 36) + krabica(104, 18, 78, "kompilátor", "preloží celé", true) + sip(184, 204, 36) + krabica(204, 18, 64, "hra.exe", "strojový kód") + sip(270, 286, 36) + krabica(286, 18, 50, "beh", "rýchly") +
    '<text x="4" y="80" font-size="10" font-weight="700" ' + TXT + ' style="fill:var(--muted)">INTERPRETER (Python, PHP)</text>' +
    krabica(4, 86, 78, "program.py", "zdrojový kód") + sip(84, 104, 104) + krabica(104, 86, 120, "interpreter", "číta a hneď vykonáva", true) + sip(226, 286, 104) + krabica(286, 86, 50, "beh", "") + "</svg>";

  /* ====================== Lekcia 1 ====================== */
  var L1 = { id: "zaklady-2-1", nazov: "Zdrojový kód a súbory", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Kód je obyčajný text",
      text: "<p>Program sa píše ako obyčajný <b>text</b> a ukladá sa do <b>súboru</b>. Tomuto textu sa hovorí <b>zdrojový kód</b>.</p><p>Koncovka v mene súboru, takzvaná <b>prípona</b>, prezrádza jazyk: <code>hra.py</code> je Python, <code>index.html</code> je webová stránka, <code>skript.js</code> je JavaScript.</p>",
      podrobne: P.tabulka(["Prípona", "Čo obsahuje"], [["<code>.py</code>", "program v Pythone"], ["<code>.js</code>", "JavaScript"], ["<code>.html</code>, <code>.css</code>", "webová stránka a jej vzhľad"], ["<code>.java</code>, <code>.kt</code>", "Java, Kotlin"], ["<code>.c</code>, <code>.cpp</code>", "C, C++"], ["<code>.cs</code>, <code>.php</code>, <code>.sql</code>", "C#, PHP, SQL"], ["<code>.txt</code>, <code>.csv</code>, <code>.json</code>", "údaje: text, tabuľka, štruktúrované údaje"]]) +
        "<p>Kód sa <b>nepíše vo Worde</b>. Textový procesor pridáva do súboru neviditeľné formátovanie (písmo, tučné, okraje) a mení úvodzovky na „pekné“, s ktorými si programovací jazyk neporadí. Na kód sa používa <b>editor kódu</b>, ktorý ukladá čistý text.</p>",
      hlbka: "<p>Súbor je pre počítač len postupnosť bajtov. Aby sa z nich dali čítať písmená, potrebuje vedieť <b>kódovanie</b>, teda ktoré číslo znamená ktorý znak. Dnes je štandardom <b>UTF-8</b>: zvládne slovenskú diakritiku, čínske znaky aj emoji. Keď vidíš namiesto „č“ zvláštne znaky ako „Ä�“, súbor bol uložený v inom kódovaní, ako ho program číta.</p><p>Iným problémom býva koniec riadku: Windows ho ukladá ako dva znaky (CR LF), Linux a macOS ako jeden (LF). Dobré editory a Git to vedia zjednotiť.</p>" },
    { typ: "vyklad", nadpis: "Priečinky, cesty a projekt",
      text: "<p>Súbory sa triedia do <b>priečinkov</b> (adresárov). Program sa zvyčajne skladá z viacerých súborov a všetky patria do jedného priečinka, ktorému hovoríme <b>projekt</b>.</p>", obr: OBR_STROM,
      podrobne: "<p><b>Cesta</b> je adresa súboru: postupnosť priečinkov oddelená lomkami.</p><ul><li><b>Absolútna cesta</b> začína od koreňa disku: <code>C:\\Projekty\\moja-hra\\hra.py</code> vo Windows alebo <code>/home/jana/moja-hra/hra.py</code> v Linuxe a macOS.</li><li><b>Relatívna cesta</b> sa počíta od miesta, kde práve si: z priečinka <code>moja-hra</code> je obrázok na ceste <code>obrazky/hrac.png</code>.</li></ul><p>V programoch sa používajú takmer vždy <b>relatívne</b> cesty. Keď projekt skopíruješ na iný počítač, absolútne cesty by prestali platiť, relatívne fungujú ďalej.</p><p>Súbor <b>README</b> je zvyk: v každom projekte popisuje, čo program robí a ako ho spustiť.</p>",
      hlbka: "<p>Dve špeciálne mená v cestách: <code>.</code> znamená aktuálny priečinok a <code>..</code> nadradený priečinok. Cesta <code>../obrazky/logo.png</code> teda znamená „o úroveň vyššie, potom do obrazky“.</p><p>Windows oddeľuje priečinky spätnou lomkou <code>\\</code>, ostatné systémy aj web obyčajnou <code>/</code>. Väčšina jazykov dnes zvládne obe, no v textoch v kóde je spätná lomka špeciálny znak (napríklad <code>\\n</code> je nový riadok). Preto programátori píšu cesty radšej s <code>/</code>.</p><p>Súbory a priečinky, ktorých meno začína bodkou (napríklad <code>.gitignore</code>), sú v Linuxe a macOS skryté. Obvykle obsahujú nastavenia nástrojov.</p>" },
    { typ: "volba", otazka: "V akom jazyku je súbor <code>pocasie.js</code>?", moznosti: ["JavaScript", "Java", "Python", "HTML"], spravna: 0,
      vysvetlenie: "Prípona .js znamená JavaScript. Java používa .java." },
    { typ: "vyklad", nadpis: "Editor a vývojové prostredie",
      text: "<p>Kód sa píše v <b>editore kódu</b>. Farebne zvýrazňuje časti kódu, dopĺňa zátvorky a upozorňuje na chyby. Najpoužívanejší je <b>Visual Studio Code</b>, ktorý je zadarmo.</p><p>V tejto aplikácii máš malý editor priamo v lekciách, takže nič inštalovať netreba.</p>",
      podrobne: "<p>Väčšie nástroje sa volajú <b>IDE</b> (integrované vývojové prostredie). Okrem editora obsahujú tlačidlo na spustenie, hľadanie chýb, prácu s projektom a ďalšie pomôcky. Známe IDE:</p><ul><li><b>PyCharm</b> pre Python,</li><li><b>IntelliJ IDEA</b> pre Javu a Kotlin, <b>Android Studio</b> pre aplikácie na Android,</li><li><b>Visual Studio</b> pre C# a C++,</li><li><b>Xcode</b> pre aplikácie na iPhone.</li></ul><p>Začiatočníkovi stačí VS Code s doplnkom pre jazyk, ktorý sa učí. Dôležité nie je, v čom píšeš, ale čo píšeš.</p>",
      hlbka: "<p>Moderné editory sa s jazykom dorozumievajú cez <b>jazykový server</b> (Language Server Protocol). Ten analyzuje kód počas písania, ponúka doplnenie mien, zobrazí dokumentáciu a podčiarkne chyby ešte pred spustením.</p><p>Čoraz bežnejší sú aj <b>AI asistenti</b>, ktorí navrhujú celé riadky kódu. Sú užitoční, ale navrhnutý kód musíš vedieť prečítať a posúdiť, či je správny. Práve na to je dobré rozumieť základom.</p>" },
    { typ: "volba", otazka: "Prečo sa kód nepíše vo Worde?", moznosti: ["Word pridáva formátovanie a mení úvodzovky, s ktorými si jazyk neporadí", "Word je zakázaný", "Word nevie uložiť súbor", "Kód sa musí písať len na papier"], spravna: 0,
      vysvetlenie: "Kód musí byť čistý text. Editor kódu ho ukladá presne tak, ako ho napíšeš." },
    { typ: "volba", otazka: "Si v priečinku <code>moja-hra</code>. Ktorá cesta vedie k obrázku <code>hrac.png</code> v podpriečinku <code>obrazky</code>?", moznosti: ["<code>obrazky/hrac.png</code>", "<code>hrac.png/obrazky</code>", "<code>../hrac.png</code>", "<code>obrazky.hrac.png</code>"], spravna: 0,
      vysvetlenie: "Relatívna cesta: najprv priečinok, potom lomka a meno súboru." },
  ] };

  /* ====================== Lekcia 2 ====================== */
  var L2 = { id: "zaklady-2-2", nazov: "Kompilátor a interpreter", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Kto prekladá kód",
      text: "<p>Procesor zdrojovému kódu nerozumie. Niekto ho musí preložiť do strojového kódu. Robia to dva druhy programov:</p><ul><li><b>Kompilátor</b> (prekladač) preloží celý program <b>dopredu</b> a vytvorí spustiteľný súbor. Tak to funguje v C a C++.</li><li><b>Interpreter</b> číta program a vykonáva ho <b>priebežne</b>, riadok po riadku. Tak to funguje v Pythone a PHP.</li></ul>", obr: OBR_PREKLAD,
      podrobne: "<p>Prirovnanie ku knihe v cudzom jazyku:</p><ul><li><b>Kompilátor</b> je prekladateľ, ktorý preloží celú knihu. Trvá to, ale potom ju čítaš rýchlo a prekladateľa už nepotrebuješ.</li><li><b>Interpreter</b> je tlmočník, ktorý ti knihu číta a hneď prekladá vetu po vete. Môžeš začať okamžite, ale tlmočník musí byť stále pri tebe a čítanie je pomalšie.</li></ul>" + P.tabulka(["", "Kompilátor", "Interpreter"], [["kedy prekladá", "raz, pred spustením", "zakaždým pri behu"], ["rýchlosť behu", "vyššia", "nižšia"], ["chyby v zápise", "nájde všetky pred spustením", "zistí ich, až keď na ne príde (Python skontroluje celý súbor na začiatku)"], ["čo potrebuje používateľ", "len hotový program", "aj interpreter"]]),
      hlbka: "<p>Kompilácia má zvyčajne niekoľko fáz: rozdelenie textu na tokeny, kontrola gramatiky (syntaktický strom), kontrola typov, optimalizácia a vytvorenie strojového kódu. Nakoniec <b>linker</b> pripojí knižnice a vznikne spustiteľný súbor. Vo Windows má príponu <code>.exe</code>, v Linuxe a macOS žiadnu.</p><p>Strojový kód je viazaný na procesor a operačný systém. Program preložený pre Windows na procesore x86 nespustíš na telefóne s Androidom a procesorom ARM. Musíš ho preložiť znova pre tú platformu.</p><p>Aj Python vnútorne najprv preloží program do jednoduchšieho <b>bajtkódu</b> (súbory <code>.pyc</code>) a ten potom vykonáva. Hranica medzi kompilátorom a interpreterom teda nie je ostrá.</p>" },
    { typ: "vyklad", nadpis: "Zlatá stredná cesta",
      text: "<p>Niektoré jazyky kombinujú oba prístupy. <b>Java</b>, <b>Kotlin</b> a <b>C#</b> sa preložia do medzikódu (bajtkódu) a ten vykonáva <b>virtuálny stroj</b>, ktorý existuje pre každý systém. Vďaka tomu jeden preložený program beží na Windows, Linuxe aj Macu.</p>",
      podrobne: "<p>V Jave to vyzerá takto: <code>Hra.java</code> preloží kompilátor <code>javac</code> do súboru <code>Hra.class</code> s bajtkódom. Ten spustí <b>JVM</b> (Java Virtual Machine). Heslo Javy bolo „napíš raz, spusti kdekoľvek“.</p><p><b>JavaScript</b> sa šíri ako zdrojový kód a prehliadač ho preloží až u teba, počas behu. Moderné prehliadače sú v tom také dobré, že je JavaScript prekvapivo rýchly.</p>" + P.tabulka(["Jazyk", "Ako sa spúšťa"], [["C, C++", "kompilátor → strojový kód"], ["Java, Kotlin", "kompilátor → bajtkód → JVM"], ["C#", "kompilátor → medzikód → .NET"], ["Python, PHP", "interpreter"], ["JavaScript", "prehliadač, prekladá počas behu (JIT)"]]),
      hlbka: "<p>Virtuálne stroje používajú <b>JIT</b> (just-in-time) kompiláciu: počas behu sledujú, ktoré časti programu sa vykonávajú najčastejšie, a tie preložia do strojového kódu. Program sa tak môže počas behu zrýchľovať.</p><p>Android používa vlastný systém ART, ktorý aplikácie v Kotline a Jave čiastočne prekladá do strojového kódu už pri inštalácii (AOT, ahead-of-time). Táto aplikácia je ešte zaujímavejšia: jej obsah je napísaný v JavaScripte a beží v komponente WebView, teda v prehliadači zabudovanom do aplikácie. Python v lekciách prekladá do JavaScriptu nástroj Brython a programy v C a Jave sa posielajú na preklad na internetové služby.</p>" },
    { typ: "volba", otazka: "Ktorý program preloží celý zdrojový kód dopredu a vytvorí spustiteľný súbor?", moznosti: ["Kompilátor", "Interpreter", "Editor kódu", "Operačný systém"], spravna: 0,
      vysvetlenie: "Kompilátor prekladá dopredu. Interpreter vykonáva program priebežne a spustiteľný súbor nevytvára." },
    { typ: "volba", otazka: "Prečo program v C preložený pre Windows nefunguje na Androide?", moznosti: ["Strojový kód závisí od procesora a operačného systému", "Android nepozná jazyk C", "Súbor je príliš veľký", "Na telefóne sa nedá programovať"], spravna: 0,
      vysvetlenie: "Preložený program obsahuje pokyny pre konkrétny procesor a systém. Pre iný systém ho treba preložiť znova." },
    { typ: "doplnenie", otazka: "Doplň:", sablona: "Python vykonáva [[0]]. C prekladá [[1]]. Java beží vo [[2]].", zetony: ["interpreter", "kompilátor", "virtuálnom stroji", "editor"], spravne: ["interpreter", "kompilátor", "virtuálnom stroji"],
      vysvetlenie: "Python: interpreter. C: kompilátor. Java: bajtkód vo virtuálnom stroji JVM." },
  ] };

  /* ====================== Lekcia 3 ====================== */
  var L3 = { id: "zaklady-2-3", nazov: "Spustenie programu", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Terminál",
      text: "<p>Programátori často pracujú v <b>termináli</b> (príkazovom riadku). Je to okno, do ktorého sa píšu príkazy namiesto klikania. Program v Pythone spustíš takto:</p>" + P.kod("python hra.py", "", "Terminál") + "<p>Slovo <code>python</code> je meno interpretera a <code>hra.py</code> je súbor, ktorý má vykonať.</p>",
      podrobne: "<p>Prečo terminál, keď existuje myš? Lebo je rýchly, presný a dá sa automatizovať. Jedným príkazom urobíš to, na čo by si inak klikal minútu.</p><p>Základné príkazy terminálu:</p>" + P.tabulka(["Príkaz", "Čo urobí"], [["<code>cd moja-hra</code>", "prejdi do priečinka moja-hra"], ["<code>cd ..</code>", "o úroveň vyššie"], ["<code>ls</code> (Windows: <code>dir</code>)", "vypíš obsah priečinka"], ["<code>python hra.py</code>", "spusti program v Pythone"], ["<code>node skript.js</code>", "spusti JavaScript mimo prehliadača"]]) +
        "<p>Vo Windows sa terminál volá Príkazový riadok, PowerShell alebo Windows Terminal, v macOS Terminal. Netreba sa ho báť: príkaz, ktorý nepozná, len ohlási chybu.</p>",
      hlbka: "<p>Programu môžeš pri spustení poslať <b>argumenty</b>: <code>python premenuj.py fotky 2026</code>. Program ich dostane ako zoznam textov a podľa nich sa zariadi. Takto fungujú takmer všetky nástroje pre programátorov.</p><p>Každý program po skončení vráti <b>návratový kód</b>: 0 znamená, že všetko prebehlo v poriadku, iné číslo znamená chybu. Vďaka tomu môže jeden program spúšťať ďalšie a reagovať na ich úspech. Na tom stojí automatizácia, napríklad automatické testy pri každej zmene kódu.</p>" },
    { typ: "vyklad", nadpis: "Štandardný vstup a výstup",
      text: "<p>Program v termináli <b>číta vstup</b> z klávesnice a <b>vypisuje výstup</b> na obrazovku. V tejto aplikácii to zastupuje pole <b>Vstup</b> a čierne okno <b>výstupu</b> pod editorom.</p>" + UKAZ('meno = input("Ako sa voláš? ")\nprint("Ahoj,", meno)', "Ako sa voláš? Jana\nAhoj, Jana"),
      podrobne: "<p>Takýmto programom sa hovorí <b>konzolové</b>. Sú to najjednoduchšie programy a preto sa na nich učí. Aplikácie s oknami, tlačidlami a obrázkami majú <b>grafické rozhranie</b> (GUI). Princíp je však rovnaký: vstup je ťuknutie alebo text v políčku, výstup je zmena na obrazovke.</p><p>Keď sa naučíš konzolové programy, prechod na grafické je už len o tom, odkiaľ sa berie vstup a kam ide výstup.</p>",
      hlbka: "<p>Programy majú tri štandardné prúdy: <b>stdin</b> (vstup), <b>stdout</b> (výstup) a <b>stderr</b> (chybové hlásenia). V termináli ich možno presmerovať: <code>python program.py &lt; vstup.txt &gt; vystup.txt</code> číta vstup zo súboru a výstup zapíše do iného súboru.</p><p>Znak <code>|</code> (rúra, pipe) spojí výstup jedného programu so vstupom ďalšieho. Z malých programov, z ktorých každý robí jednu vec dobre, tak vznikajú veľké celky. Je to jedna zo základných myšlienok systému Unix.</p>" },
    { typ: "volba", otazka: "Čo urobí príkaz <code>python pozdrav.py</code> v termináli?", moznosti: ["Spustí program pozdrav.py v interpreteri Pythonu", "Vymaže súbor pozdrav.py", "Nainštaluje Python", "Otvorí súbor vo Worde"], spravna: 0,
      vysvetlenie: "python je interpreter, pozdrav.py je súbor, ktorý má vykonať." },
    { typ: "kod", zadanie: "Vyskúšaj si program so vstupom. V poli Vstup je pripravené meno <b>Peter</b>. Doplň druhý riadok tak, aby program vypísal <b>Ahoj, Peter</b>.",
      karty: ["py"], vstup: "Peter", start: { py: 'meno = input()\n' }, vyska: "120px",
      napoveda: 'Pridaj riadok print("Ahoj,", meno). Meno píš bez úvodzoviek, aby sa vypísal obsah premennej.', riesenie: { py: 'meno = input()\nprint("Ahoj,", meno)' },
      kontrola: function (v) { var l = r(v); return l[l.length - 1] === "Ahoj, Peter" ? null : "Posledný riadok má byť Ahoj, Peter (teraz: " + l[l.length - 1] + ")."; },
      vysvetlenie: "Program prečítal vstup a vytvoril z neho výstup. Skús v poli Vstup zmeniť meno a spusti ho znova." },
  ] };

  /* ====================== Lekcia 4 ====================== */
  var L4 = { id: "zaklady-2-4", nazov: "Chyby a ladenie", minut: 10, kroky: [
    { typ: "vyklad", nadpis: "Chyby sú súčasť práce",
      text: "<p>Aj skúsení programátori robia chyby každý deň. Rozdiel je v tom, že ich vedia rýchlo <b>nájsť a opraviť</b>. Tejto činnosti sa hovorí <b>ladenie</b> (debugging).</p><p>Chybové hlásenie nie je trest, ale nápoveda: povie ti <b>riadok</b>, <b>druh chyby</b> a krátky <b>popis</b>.</p>" + UKAZ('print("Začínam")\nprint(10 / 0)', "Začínam\nZeroDivisionError: division by zero (riadok 2)"),
      podrobne: "<p>Postup pri chybe:</p><ol><li><b>Prečítaj hlásenie</b> celé, hlavne posledný riadok.</li><li>Pozri sa na <b>riadok</b>, ktorý uvádza, a aj na riadok <b>nad ním</b>. Chýbajúca zátvorka sa často prejaví až o riadok nižšie.</li><li><b>Oprav jednu vec</b> a spusti znova. Keď zmeníš päť vecí naraz, nevieš, ktorá pomohla.</li><li>Keď hláseniu nerozumieš, skopíruj ho do vyhľadávača. Takmer isto ho už niekto riešil.</li></ol>",
      hlbka: "<p>Profesionálne nástroje majú <b>debugger</b>: program zastavíš na zvolenom riadku (breakpoint), pozrieš sa, aké hodnoty majú premenné, a potom ho vykonávaš krok po kroku.</p><p>Známa technika je <b>gumená kačička</b>: vysvetľuješ svoj kód riadok po riadku kačičke na stole (alebo kamarátovi). Pri vysvetľovaní si často sám všimneš, kde je chyba, lebo musíš nahlas povedať, čo kód naozaj robí, a nie čo si myslíš, že robí.</p>" },
    { typ: "vyklad", nadpis: "Ako nájsť logickú chybu",
      text: "<p>Pri logickej chybe počítač nič nehlási. Najjednoduchšia technika: <b>vypisuj medzivýsledky</b>. Pridaj pomocné <code>print</code> a uvidíš, kde sa hodnota prvýkrát pokazí.</p>",
      podrobne: UKAZ('cena = 20\nzlava = 25\nnova = cena - zlava / 100 * cena\nprint("zľava:", zlava / 100 * cena)  # pomocný výpis\nprint("nová cena:", nova)', "zľava: 5.0\nnová cena: 15.0") +
        "<p>Pomocný výpis ukázal, že zľava 5 € je správna, teda chyba nie je vo výpočte zľavy. Keď všetko sedí, pomocné výpisy zmaž alebo zakomentuj.</p><p>Ďalšia rada: <b>testuj s jednoduchými číslami</b>, pri ktorých výsledok poznáš z hlavy. Zľava 50 % zo 100 € musí byť 50 €.</p>",
      hlbka: "<p>Profesionáli si overovanie automatizujú: píšu <b>testy</b>, teda malé programy, ktoré volajú ich kód s rôznymi vstupmi a kontrolujú výsledky. Keď neskôr niečo zmenia a pokazia, test to okamžite odhalí.</p><p>Aj táto aplikácia má takéto testy: pred každou verziou automaticky prejde všetkých vyše 300 lekcií, spustí každé vzorové riešenie a overí, že kontrola ho uzná. Aj kontrola tvojich úloh v lekciách je vlastne malý test.</p>" },
    { typ: "volba", otazka: "Program hlási chybu na riadku 5, ale na riadku 5 nič zlé nevidíš. Kde hľadať ďalej?", moznosti: ["Na riadku nad ním, napríklad chýbajúca zátvorka", "Nikde, je to chyba počítača", "Na poslednom riadku programu", "Treba preinštalovať jazyk"], spravna: 0,
      vysvetlenie: "Neuzavretá zátvorka alebo úvodzovka na riadku 4 sa často prejaví až na riadku 5." },
    { typ: "kod", zadanie: "Tento program má počítať <b>priemer</b> známok 1, 2 a 3, ale vypisuje zlý výsledok. Nájdi logickú chybu a oprav ju, aby vypísal <b>2.0</b>.",
      karty: ["py"], start: { py: "a = 1\nb = 2\nc = 3\nprint(a + b + c / 3)" }, vyska: "140px",
      napoveda: "Delenie má prednosť pred sčítaním, takže sa delí len c. Celý súčet daj do zátvoriek: (a + b + c) / 3.", riesenie: { py: "a = 1\nb = 2\nc = 3\nprint((a + b + c) / 3)" },
      kontrola: function (v) { return r(v)[0] === "2.0" ? null : "Výstup má byť 2.0. Program teraz delí tromi iba posledné číslo."; },
      vysvetlenie: "Program sa spustil aj predtým, no počítal zle. Takú chybu nájdeš, len keď vieš, aký výsledok má vyjsť." },
    { typ: "poradie", otazka: "Zoraď kroky pri hľadaní chyby:", riadky: ["prečítaj chybové hlásenie", "nájdi riadok, ktorý uvádza", "oprav jednu vec", "spusti program znova"],
      vysvetlenie: "Najprv pochop, čo sa deje, potom meň po jednej veci a over výsledok." },
    { typ: "vyklad", nadpis: "Modul 2 máš za sebou",
      text: "<p>Čo už vieš:</p><ul><li>kód je čistý text v <b>súbore</b> s príponou, súbory tvoria <b>projekt</b>,</li><li>čo je <b>absolútna</b> a <b>relatívna cesta</b> a na čo je <b>editor kódu</b> a IDE,</li><li>rozdiel medzi <b>kompilátorom</b>, <b>interpreterom</b> a <b>virtuálnym strojom</b>,</li><li>ako sa program spúšťa v <b>termináli</b> a čo je vstup a výstup,</li><li>ako čítať <b>chybové hlásenia</b> a hľadať logické chyby.</li></ul>",
      tip: "Po teste ťa čaká modul 3: premenné, podmienky, cykly a funkcie, teda stavebné kamene každého programu." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "zaklady-2-1", otazka: "Čo je zdrojový kód?", moznosti: ["Text programu, ako ho napísal programátor", "Strojový kód v procesore", "Heslo k počítaču", "Zoznam súborov na disku"], spravna: 0, vysvetlenie: "Zdrojový kód je text programu v programovacom jazyku." },
    { typ: "volba", lekcia: "zaklady-2-1", otazka: "Ktorá cesta je relatívna?", moznosti: ["<code>obrazky/logo.png</code>", "<code>C:\\Projekty\\logo.png</code>", "<code>/home/jana/logo.png</code>", "Všetky"], spravna: 0, vysvetlenie: "Relatívna cesta nezačína od koreňa disku, počíta sa od aktuálneho priečinka." },
    { typ: "volba", lekcia: "zaklady-2-1", otazka: "Čo je IDE?", moznosti: ["Vývojové prostredie: editor, spúšťanie a hľadanie chýb v jednom", "Programovací jazyk", "Druh súboru", "Súčiastka počítača"], spravna: 0, vysvetlenie: "IDE je integrované vývojové prostredie, napríklad PyCharm alebo Android Studio." },
    { typ: "volba", lekcia: "zaklady-2-2", otazka: "Čo robí interpreter?", moznosti: ["Vykonáva program priebežne", "Vytvorí .exe súbor", "Opravuje chyby", "Kreslí grafiku"], spravna: 0, vysvetlenie: "Interpreter číta program a hneď ho vykonáva." },
    { typ: "volba", lekcia: "zaklady-2-2", otazka: "Výhoda kompilovaného programu je:", moznosti: ["Rýchlejší beh a používateľ nepotrebuje prekladač", "Beží na každom procesore bez prekladu", "Nemôže obsahovať chyby", "Netreba ho písať"], spravna: 0, vysvetlenie: "Preložený strojový kód beží rýchlo, ale len na platforme, pre ktorú bol preložený." },
    { typ: "volba", lekcia: "zaklady-2-2", otazka: "Čo vykonáva bajtkód Javy?", moznosti: ["Virtuálny stroj JVM", "Priamo procesor", "Prehliadač", "Databáza"], spravna: 0, vysvetlenie: "Java sa preloží do bajtkódu, ktorý vykonáva JVM na akomkoľvek systéme." },
    { typ: "volba", lekcia: "zaklady-2-3", otazka: "Čo je terminál?", moznosti: ["Okno, kde sa programy ovládajú písaním príkazov", "Druh procesora", "Zoznam chýb", "Súbor s heslami"], spravna: 0, vysvetlenie: "V termináli sa píšu príkazy, napríklad python hra.py." },
    { typ: "volba", lekcia: "zaklady-2-4", otazka: "Ako najjednoduchšie nájdeš logickú chybu?", moznosti: ["Vypíšeš medzivýsledky a porovnáš ich s očakávanými", "Počkáš, kým ju počítač ohlási", "Prepíšeš celý program", "Reštartuješ počítač"], spravna: 0, vysvetlenie: "Pri logickej chybe počítač nič nehlási. Pomocné výpisy ukážu, kde sa hodnota pokazí." },
  ];

  K.registrujModul("zaklady", { cislo: 2, nazov: "Od kódu k spusteniu", popis: "Súbory a priečinky, editor, kompilátor a interpreter, terminál, vstup a výstup a hľadanie chýb.", lekcie: [L1, L2, L3, L4], test: { otazky: TEST, potrebne: 70 } });
})();
