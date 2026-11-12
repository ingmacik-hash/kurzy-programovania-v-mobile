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
