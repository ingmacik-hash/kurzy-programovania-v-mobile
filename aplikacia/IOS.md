# SyntaxCode pre iPhone (iOS)

Aplikácia je pripravená aj pre iOS (priečinok `ios/`). Webová časť je rovnaká ako na Androide.

## Čo je hotové
- iOS projekt (Flutter), názov na ploche **SyntaxCode**, ikona z `assets_ikona/ikona.png`.
- Späť na iPhone: šípky v aplikácii a potiahnutie prstom od ľavého okraja doprava.
- Na iOS sa aplikácia sama nezatvára (Apple to nepovoľuje).
- Automatická zostava na GitHube: záložka **Actions → iOS zostava**. Overí, že sa aplikácia pre iPhone preloží.

## Čo treba na vydanie v App Store
1. **Apple Developer Program**: 99 USD ročne, https://developer.apple.com/programs/
2. **Mac s Xcode** (vlastný, požičaný, alebo cloudová služba ako Codemagic, ktorá zostaví a podpíše aplikáciu za teba).
3. **Bundle ID**: teraz `com.example.kurzKodu`. Pred vydaním ho zmeň na vlastný (napr. `sk.syntaxcode.app`), rovnako ako na Androide.
4. V Xcode otvor `ios/Runner.xcworkspace`, nastav tím (Signing & Capabilities) a zvoľ **Product → Archive**. Potom ho nahraj do App Store Connect.
5. V App Store Connect vyplň popis, snímky obrazovky, vekovú kategóriu a odkaz na zásady ochrany súkromia.

## Testovanie na vlastnom iPhone
Na Windows sa aplikácia na iPhone nainštalovať nedá. Bez Macu je najjednoduchšie použiť **Codemagic** (bezplatné minúty pre jednotlivcov) a **TestFlight** (vyžaduje Apple Developer účet).
