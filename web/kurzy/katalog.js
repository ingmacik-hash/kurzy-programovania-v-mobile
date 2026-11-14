/* Zoznam jazykov. Kurz sa zobrazí ako dostupný, keď má aspoň jeden modul (kurzy/<id>/modulN.js). */
K.registrujKurz({
  id: "html", nazov: "HTML", skratka: "</>", farba: "#e0522b", naFarbe: "#ffffff",
  podtitul: "Kostra každej webovej stránky",
  popis: "Jazyk, ktorým sa píše obsah webových stránok: nadpisy, texty, obrázky, odkazy, tabuľky a formuláre. Je to prvý krok pre každého, kto chce robiť web.",
  pouzitie: ["webové stránky", "e-maily", "mobilné aplikácie", "dokumentácia"],
  plan: ["Modul 1 · Základy HTML", "Modul 2 · Odkazy a obrázky", "Modul 3 · Zoznamy a tabuľky", "Modul 4 · Formuláre", "Modul 5 · Sémantika a štruktúra stránky", "Záverečné projekty · Osobná stránka, Recept, Prihláška"],
});
K.registrujKurz({
  id: "css", nazov: "CSS", skratka: "{ }", farba: "#6a3fc9", naFarbe: "#ffffff",
  podtitul: "Farby, písmo a rozloženie",
  popis: "Jazyk vzhľadu. Určuje farby, písmo, medzery, rozloženie a animácie. Z obyčajného HTML spraví modernú stránku, ktorá vyzerá dobre na mobile aj počítači.",
  pouzitie: ["dizajn webu", "rozloženie", "animácie", "mobilné verzie"],
  plan: ["Modul 1 · Pravidlá a selektory", "Modul 2 · Farby a písmo", "Modul 3 · Box model", "Modul 4 · Flexbox", "Modul 5 · Grid", "Modul 6 · Responzívny dizajn", "Záverečné projekty"],
});
K.registrujKurz({
  id: "js", nazov: "JavaScript", skratka: "JS", farba: "#f0c419", naFarbe: "#1a1a1a",
  podtitul: "Stránky, ktoré reagujú",
  popis: "Programovací jazyk webu. Vďaka nemu stránka reaguje na kliknutie, počíta, overuje formuláre a mení sa bez obnovenia. Beží v každom prehliadači.",
  pouzitie: ["interaktívny web", "hry", "aplikácie", "servery (Node.js)"],
  plan: ["Modul 1 · Premenné a typy", "Modul 2 · Podmienky", "Modul 3 · Cykly", "Modul 4 · Funkcie", "Modul 5 · Polia a objekty", "Modul 6 · Práca so stránkou (DOM)", "Záverečné projekty"],
});
K.registrujKurz({
  id: "python", nazov: "Python", skratka: "py", farba: "#3572a5", naFarbe: "#ffffff",
  podtitul: "Prvý jazyk pre začiatočníkov",
  popis: "Čitateľný jazyk so širokým využitím: automatizácia, spracovanie dát, umelá inteligencia, weby aj veda. Často sa učí ako prvý programovací jazyk.",
  pouzitie: ["automatizácia", "dáta a grafy", "umelá inteligencia", "skripty"],
  plan: ["Modul 1 · Prvé príkazy", "Modul 2 · Premenné a čísla", "Modul 3 · Podmienky", "Modul 4 · Cykly", "Modul 5 · Funkcie", "Modul 6 · Zoznamy a slovníky", "Záverečné projekty"],
});
K.registrujKurz({
  id: "sql", nazov: "SQL", skratka: "SQL", farba: "#0f8f84", naFarbe: "#ffffff",
  podtitul: "Otázky pre databázy",
  popis: "Jazyk, ktorým sa pýtame databáz. Vyberá, triedi, spája a mení údaje v tabuľkách. Používa ho takmer každá firma, e-shop aj aplikácia.",
  pouzitie: ["databázy", "analýza dát", "reporty", "aplikácie"],
  plan: ["Modul 1 · Tabuľky a SELECT", "Modul 2 · Filtrovanie a triedenie", "Modul 3 · Zoskupovanie", "Modul 4 · Spájanie tabuliek", "Modul 5 · Úpravy dát", "Záverečné projekty"],
});
K.registrujKurz({
  id: "cpp", nazov: "C++", skratka: "C++", farba: "#c0365b", naFarbe: "#ffffff",
  podtitul: "Rýchle programy a hry",
  popis: "Výkonný jazyk, v ktorom vznikajú hry, operačné systémy, prehliadače a programy pre zariadenia. Naučí ťa, ako počítač naozaj pracuje s pamäťou.",
  pouzitie: ["hry", "výkonné programy", "zariadenia", "súťažné programovanie"],
  plan: ["Modul 1 · Prvý program", "Modul 2 · Premenné a typy", "Modul 3 · Podmienky a cykly", "Modul 4 · Funkcie", "Modul 5 · Polia a reťazce", "Modul 6 · Triedy a objekty", "Záverečné projekty"],
});
K.registrujKurz({
  id: "c", nazov: "C", skratka: "C", farba: "#3949ab", naFarbe: "#ffffff",
  podtitul: "Základ, na ktorom stojí svet",
  popis: "Jazyk, v ktorom sú napísané operačné systémy, ovládače a vstavané zariadenia. Naučí ťa, ako počítač pracuje s pamäťou, a otvorí cestu k C++, Jave aj C#.",
  pouzitie: ["operačné systémy", "mikrokontroléry", "ovládače", "výkonné knižnice"],
  plan: ["Modul 1 · Prvý program", "Modul 2 · Premenné a vstup", "Modul 3 · Podmienky a cykly", "Modul 4 · Funkcie a polia", "Modul 5 · Reťazce, ukazovatele a struct", "Záverečné projekty"],
});
K.registrujKurz({
  id: "java", nazov: "Java", skratka: "J", farba: "#b5651d", naFarbe: "#ffffff",
  podtitul: "Jazyk bánk, firiem a Androidu",
  popis: "Jeden z najpoužívanejších jazykov na svete. Bežia v ňom bankové systémy, veľké firemné aplikácie aj časť Androidu. Je prísny a poriadkumilovný, čo ťa naučí dobré návyky.",
  pouzitie: ["podnikové systémy", "Android", "servery", "Minecraft módy"],
  plan: ["Modul 1 · Prvý program", "Modul 2 · Premenné a vstup", "Modul 3 · Podmienky a cykly", "Modul 4 · Metódy, polia a zoznamy", "Modul 5 · Triedy a objekty", "Záverečné projekty"],
});
K.registrujKurz({
  id: "csharp", nazov: "C#", skratka: "C#", farba: "#1b8a3a", naFarbe: "#ffffff",
  podtitul: "Hry v Unity a aplikácie .NET",
  popis: "Moderný jazyk od Microsoftu. Píšu sa v ňom hry v Unity, aplikácie pre Windows, webové služby aj mobilné aplikácie. Je podobný Jave, ale s množstvom pohodlných vychytávok.",
  pouzitie: ["hry v Unity", "aplikácie pre Windows", "webové služby", "cloud"],
  plan: ["Modul 1 · Prvý program", "Modul 2 · Premenné a vstup", "Modul 3 · Podmienky a cykly", "Modul 4 · Metódy, polia a zoznamy", "Modul 5 · Triedy a objekty", "Záverečné projekty"],
});
K.registrujKurz({
  id: "kotlin", nazov: "Kotlin", skratka: "kt", farba: "#7f52ff", naFarbe: "#ffffff",
  podtitul: "Moderný jazyk pre Android",
  popis: "Oficiálny jazyk pre aplikácie na Android. Je stručný, bezpečný a príjemný na písanie. Chráni ťa pred najčastejšou chybou programátorov: prácou s prázdnou hodnotou null.",
  pouzitie: ["aplikácie pre Android", "servery", "multiplatformové aplikácie", "skripty"],
  plan: ["Modul 1 · Prvý program", "Modul 2 · Typy a vstup", "Modul 3 · Podmienky a cykly", "Modul 4 · Funkcie a kolekcie", "Modul 5 · Triedy a null", "Záverečné projekty"],
});
