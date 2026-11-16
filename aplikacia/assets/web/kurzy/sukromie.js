/* Zásady ochrany súkromia. Jeden zdroj pre obrazovku #sukromie v aplikácii aj pre verejnú stránku web/sukromie.html. */
(function (g) {
  var K = g.K || (g.K = {});
  K.SUKROMIE = {
    nazov: "Zásady ochrany súkromia",
    ucinnost: "15. 11. 2026",
    kontakt: "", // TODO: verejný kontaktný e-mail pred zverejnením na Google Play
    casti: [
      ["Stručne", "<p>SyntaxCode nezbiera o tebe žiadne osobné údaje. Nemá účty, prihlasovanie, reklamy ani analytické nástroje a nesleduje ťa. Tvoj pokrok zostáva len v tvojom zariadení.</p>"],
      ["Čo sa ukladá v zariadení", "<p>Aplikácia si v pamäti zariadenia ukladá tvoj pokrok v kurzoch: dokončené lekcie, výsledky testov, body (XP), sériu dní, nastavenia a kód, ktorý si napísal v úlohách. Tieto údaje nikam neodchádzajú a nikto iný k nim nemá prístup.</p><p>Celý pokrok môžeš kedykoľvek vymazať v aplikácii (Profil → Vymazať celý pokrok) alebo odinštalovaním aplikácie.</p>"],
      ["Čo sa posiela na internet", "<p>Programy v niektorých jazykoch sa nedajú spustiť priamo v telefóne. Keď v kurzoch C, C++, Java, C#, Kotlin alebo PHP stlačíš <b>Spustiť</b>, aplikácia pošle kód úlohy a prípadný vstup programu na bezplatnú službu, ktorá ho preloží a spustí, a zobrazí ti výsledok:</p><ul><li><b>Compiler Explorer</b> (godbolt.org): C, C++, Java, C#</li><li><b>Wandbox</b> (wandbox.org): záložný prekladač pre C, C++, Javu a C#, a PHP</li><li><b>Kotlin Playground</b> od spoločnosti JetBrains (api.kotlinlang.org): Kotlin</li></ul><p>Posiela sa len kód a vstup programu, nie tvoje meno, kontakt ani identifikátor zariadenia. Tieto služby, ako každý server na internete, vidia IP adresu, z ktorej požiadavka prišla, a riadia sa vlastnými zásadami ochrany súkromia. Do kódu úloh preto nepíš osobné údaje.</p><p>Python, SQL, Smalltalk, HTML, CSS a JavaScript bežia priamo v zariadení a nič neposielajú.</p>"],
      ["Oprávnenia", "<p>Aplikácia potrebuje len prístup na internet, aby mohla spúšťať programy cez uvedené služby. Nepristupuje k fotkám, kontaktom, polohe, mikrofónu ani kamere.</p>"],
      ["Deti", "<p>Aplikáciu môžu používať aj deti. Keďže nezbiera osobné údaje, nevyžaduje súhlas rodiča. Rodičom odporúčame vysvetliť deťom, aby do kódu úloh nepísali osobné údaje.</p>"],
      ["Zdieľanie a predaj údajov", "<p>Žiadne osobné údaje nepredávame ani nezdieľame s tretími stranami, pretože ich nezbierame.</p>"],
      ["Zmeny zásad", "<p>Ak sa zásady zmenia, novú verziu zverejníme na tejto stránke s novým dátumom účinnosti.</p>"],
    ],
  };
  K.sukromieHtml = function () {
    var s = K.SUKROMIE;
    return '<p class="tlmene" style="margin:0">Účinné od ' + s.ucinnost + "</p>" +
      s.casti.map(function (c) { return "<h2>" + c[0] + "</h2>" + c[1]; }).join("") +
      (s.kontakt ? '<h2>Kontakt</h2><p>Otázky k ochrane súkromia posielaj na <b>' + s.kontakt + "</b>.</p>" : "");
  };
})(window);
