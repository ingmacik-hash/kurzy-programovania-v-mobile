/* Java · Modul 4 · Metódy, polia a zoznamy */
(function () {
  var P = K.pom, MONO = P.MONO;
  var KOD = function (t) { return P.kod(t, "java"); };
  var UKAZ = function (kod, vystup) { return '<div class="kod-obal">' + P.kod(kod, "java", "Kód") + '<pre class="kod vystup-ukazka">' + K.esc(vystup) + "</pre></div>"; };
  function r(v) { return P.riadky(v); }
  function trieda(metody, telo, importy) { return (importy || "") + "public class Main {\n" + (metody ? metody + "\n\n" : "") + "    public static void main(String[] args) {\n" + telo + "\n    }\n}"; }
  var SC = "import java.util.Scanner;\n\n", LIST = "import java.util.ArrayList;\n\n", OBA = "import java.util.ArrayList;\nimport java.util.Scanner;\n\n";

  var L1 = { id: "java-4-1", nazov: "Metódy", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Vlastné metódy",
      text: "<p>Funkcie sa v Jave volajú <b>metódy</b> a sú vždy v triede. Kým nepoznáme objekty, píšeme ich so slovom <code>static</code>:</p>" + UKAZ('public class Main {\n    static int stvorec(int x) {\n        return x * x;\n    }\n\n    static void pozdrav(String meno) {\n        System.out.println("Ahoj, " + meno + "!");\n    }\n\n    public static void main(String[] args) {\n        System.out.println(stvorec(9));\n        pozdrav("Jana");\n    }\n}', "81\nAhoj, Jana!"),
      podrobne: "<p>Návratový typ (<code>int</code>, <code>void</code>…), meno, parametre s typmi. Metódy môžu byť v triede v ľubovoľnom poradí, aj pod main. Viac metód s rovnakým menom a inými parametrami je tiež povolené (preťaženie).</p>" },
    { typ: "volba", otazka: "Čo chýba v metóde <code>static int dvakrat(int x) { x * 2; }</code>?", moznosti: ["return", "void", "public", "Nič"], spravna: 0, vysvetlenie: "return x * 2;" },
    { typ: "kod", zadanie: "Napíš metódu <code>static boolean jePrvocislo(int n)</code> a v main vypíš prvočísla od 2 do 20 oddelené medzerou: <b>2 3 5 7 11 13 17 19</b>.",
      karty: ["java"], start: { java: trieda("", "        ") }, vyska: "300px",
      napoveda: "if (n < 2) return false; for (int d = 2; d * d <= n; d++) if (n % d == 0) return false; return true;", riesenie: { java: trieda("    static boolean jePrvocislo(int n) {\n        if (n < 2) return false;\n        for (int d = 2; d * d <= n; d++) {\n            if (n % d == 0) return false;\n        }\n        return true;\n    }", '        StringBuilder sb = new StringBuilder();\n        for (int i = 2; i <= 20; i++) {\n            if (jePrvocislo(i)) {\n                if (sb.length() > 0) sb.append(" ");\n                sb.append(i);\n            }\n        }\n        System.out.println(sb);') },
      kontrola: function (v, kod) { if (!/static\s+boolean\s+jePrvocislo\s*\(\s*int\s+\w+\s*\)/.test(kod)) return "Chýba metóda static boolean jePrvocislo(int n)."; return r(v)[0] === "2 3 5 7 11 13 17 19" ? null : "Výstup má byť 2 3 5 7 11 13 17 19"; },
      vysvetlenie: "Metóda vracia boolean, takže sa dá dať priamo do if." },
  ] };

  var L2 = { id: "java-4-2", nazov: "Polia", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Pole s pevnou dĺžkou",
      text: UKAZ('int[] body = {12, 7, 30, 5};\nSystem.out.println(body[0]);\nSystem.out.println(body.length);\nbody[1] = 8;\nint sucet = 0;\nfor (int b : body) sucet += b;\nSystem.out.println(sucet);\n\nString[] dni = new String[7];\nSystem.out.println(dni[0]);', "12\n4\n55\nnull"),
      podrobne: "<p>Pole pozná svoju dĺžku <code>length</code> (bez zátvoriek). Na rozdiel od C Java <b>kontroluje hranice</b>: <code>body[10]</code> vyhodí výnimku ArrayIndexOutOfBoundsException. Nové pole čísel má nuly, pole objektov hodnoty null.</p><p><code>for (int b : body)</code> je cyklus „pre každý prvok“.</p>" },
    { typ: "volba", otazka: "Ako zistíš dĺžku poľa <code>a</code>?", moznosti: ["<code>a.length</code>", "<code>a.length()</code>", "<code>a.size()</code>", "<code>len(a)</code>"], spravna: 0, vysvetlenie: "Pri poli bez zátvoriek, pri Stringu so zátvorkami." },
    { typ: "kod", zadanie: "Načítaj počet čísel a čísla (vstup <b>5</b> a <b>3 -2 8 0 -7</b>) do poľa. Vypíš, koľko je kladných, záporných a núl: <b>Kladné: 2, záporné: 2, nuly: 1</b>.",
      karty: ["java"], vstup: "5\n3 -2 8 0 -7", start: { java: trieda("", "        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        ", SC) }, vyska: "280px",
      napoveda: "for (int i = 0; i < n; i++) a[i] = sc.nextInt(); potom for (int x : a) { if (x > 0) … }", riesenie: { java: trieda("", '        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int kl = 0, za = 0, nu = 0;\n        for (int x : a) {\n            if (x > 0) kl++;\n            else if (x < 0) za++;\n            else nu++;\n        }\n        System.out.println("Kladné: " + kl + ", záporné: " + za + ", nuly: " + nu);', SC) },
      kontrola: function (v) { return r(v)[0] === "Kladné: 2, záporné: 2, nuly: 1" ? null : "Výstup má byť Kladné: 2, záporné: 2, nuly: 1"; },
      vysvetlenie: "Tri počítadlá v jednom cykle." },
  ] };

  var L3 = { id: "java-4-3", nazov: "ArrayList", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Zoznam, ktorý rastie",
      text: UKAZ('import java.util.ArrayList;\n…\nArrayList<String> nakup = new ArrayList<>();\nnakup.add("chlieb");\nnakup.add("mlieko");\nnakup.add(0, "vajcia");\nSystem.out.println(nakup);\nSystem.out.println(nakup.size() + " " + nakup.get(1));\nnakup.remove("mlieko");\nSystem.out.println(nakup.contains("mlieko"));', "[vajcia, chlieb, mlieko]\n3 chlieb\nfalse"),
      podrobne: "<p>V lomených zátvorkách je typ prvkov. Pre čísla sa píše <code>ArrayList&lt;Integer&gt;</code> (nie int), lebo zoznam obsahuje objekty. Zoradíš ho cez <code>java.util.Collections.sort(zoznam)</code>.</p>" },
    { typ: "volba", otazka: "Ako zistíš počet prvkov ArrayListu <code>z</code>?", moznosti: ["<code>z.size()</code>", "<code>z.length</code>", "<code>z.count</code>", "<code>size(z)</code>"], spravna: 0, vysvetlenie: "size()." },
    { typ: "kod", zadanie: "Načítaj slová, kým sú na vstupe (vstup <b>pes mačka pes vták mačka pes</b>), a pridaj do ArrayListu len tie, ktoré v ňom ešte nie sú. Vypíš zoznam: <b>[pes, mačka, vták]</b>.",
      karty: ["java"], vstup: "pes mačka pes vták mačka pes", start: { java: trieda("", "        Scanner sc = new Scanner(System.in);\n        ArrayList<String> slova = new ArrayList<>();\n        ", OBA) }, vyska: "260px",
      napoveda: "while (sc.hasNext()) { String s = sc.next(); if (!slova.contains(s)) slova.add(s); }", riesenie: { java: trieda("", "        Scanner sc = new Scanner(System.in);\n        ArrayList<String> slova = new ArrayList<>();\n        while (sc.hasNext()) {\n            String s = sc.next();\n            if (!slova.contains(s)) slova.add(s);\n        }\n        System.out.println(slova);", OBA) },
      kontrola: function (v, kod) { if (!/\.add\s*\(/.test(kod)) return "Pridávaj cez add."; return r(v)[0] === "[pes, mačka, vták]" ? null : "Výstup má byť [pes, mačka, vták]"; },
      vysvetlenie: "contains zabránil duplikátom." },
  ] };

  var L4 = { id: "java-4-4", nazov: "Polia a metódy spolu", minut: 9, kroky: [
    { typ: "vyklad", nadpis: "Pole ako parameter",
      text: KOD('static double priemer(int[] a) {\n    int s = 0;\n    for (int x : a) s += x;\n    return (double) s / a.length;\n}\n\nstatic int[] zdvojnasob(int[] a) {\n    int[] b = new int[a.length];\n    for (int i = 0; i < a.length; i++) b[i] = a[i] * 2;\n    return b;\n}') + KOD('int[] z = {1, 2, 3};\nSystem.out.println(priemer(z));                          // 2.0\nSystem.out.println(java.util.Arrays.toString(zdvojnasob(z))); // [2, 4, 6]'),
      podrobne: "<p>Pole sa do metódy neskopíruje, metóda dostane odkaz na to isté pole. Ak ho zmení, zmení originál. <code>Arrays.toString(pole)</code> pekne vypíše obsah, <code>Arrays.sort(pole)</code> ho zoradí.</p>" },
    { typ: "volba", otazka: "Čo vypíše <code>System.out.println(pole)</code> pre pole čísel?", moznosti: ["Niečo ako [I@1b6d3586 (adresu)", "Prvky poľa", "Dĺžku", "Chybu"], spravna: 0, vysvetlenie: "Preto Arrays.toString(pole)." },
    { typ: "kod", zadanie: "Napíš metódu <code>static int pocetVacsich(int[] a, int hranica)</code>, ktorá vráti, koľko prvkov je väčších ako hranica. V main pre pole <code>{4, 9, 1, 7, 12, 3}</code> a hranicu 5 vypíš <b>3</b>.",
      karty: ["java"], start: { java: trieda("", "        int[] cisla = {4, 9, 1, 7, 12, 3};\n        ") }, vyska: "280px",
      napoveda: "int p = 0; for (int x : a) if (x > hranica) p++; return p;", riesenie: { java: trieda("    static int pocetVacsich(int[] a, int hranica) {\n        int p = 0;\n        for (int x : a) {\n            if (x > hranica) p++;\n        }\n        return p;\n    }", "        int[] cisla = {4, 9, 1, 7, 12, 3};\n        System.out.println(pocetVacsich(cisla, 5));") },
      kontrola: function (v, kod) { if (!/static\s+int\s+pocetVacsich\s*\(\s*int\s*\[\s*\]\s*\w+\s*,\s*int\s+\w+\s*\)/.test(kod)) return "Chýba metóda static int pocetVacsich(int[] a, int hranica)."; return r(v)[0] === "3" ? null : "Výstup má byť 3."; },
      vysvetlenie: "9, 7 a 12 sú väčšie ako 5." },
  ] };

  var L5 = { id: "java-4-5", nazov: "Triedenie a hľadanie", minut: 8, kroky: [
    { typ: "vyklad", nadpis: "Hotové nástroje",
      text: UKAZ('int[] a = {5, 2, 9, 1};\njava.util.Arrays.sort(a);\nSystem.out.println(java.util.Arrays.toString(a));\n\nArrayList<String> mena = new ArrayList<>(List.of("Peter", "Eva", "Jana"));\nCollections.sort(mena);\nSystem.out.println(mena);\nSystem.out.println(Collections.max(mena));', "[1, 2, 5, 9]\n[Eva, Jana, Peter]\nPeter"),
      podrobne: "<p>Triedy <code>Arrays</code> a <code>Collections</code> z balíka java.util majú triedenie, hľadanie, maximum, minimum aj otočenie (<code>Collections.reverse</code>). Netreba vymýšľať koleso.</p>" },
    { typ: "volba", otazka: "Ktorá metóda zoradí ArrayList?", moznosti: ["<code>Collections.sort(z)</code>", "<code>z.sort()</code> je jediná možnosť", "<code>Arrays.sort(z)</code>", "<code>sort(z)</code>"], spravna: 0, vysvetlenie: "Collections pre zoznamy, Arrays pre polia." },
    { typ: "kod", zadanie: "Načítaj čísla do konca vstupu (vstup <b>40 10 50 20 30 60</b>) do <code>ArrayList&lt;Integer&gt;</code>, zoraď ich a vypíš zoznam a medián (priemer dvoch prostredných pri párnom počte): <b>[10, 20, 30, 40, 50, 60]</b> a <b>Medián: 35.0</b>.",
      karty: ["java"], vstup: "40 10 50 20 30 60", start: { java: trieda("", "        Scanner sc = new Scanner(System.in);\n        ArrayList<Integer> z = new ArrayList<>();\n        ", "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.Scanner;\n\n") }, vyska: "300px",
      napoveda: "Collections.sort(z); int n = z.size(); double m = n % 2 == 1 ? z.get(n / 2) : (z.get(n / 2 - 1) + z.get(n / 2)) / 2.0;", riesenie: { java: trieda("", '        Scanner sc = new Scanner(System.in);\n        ArrayList<Integer> z = new ArrayList<>();\n        while (sc.hasNextInt()) z.add(sc.nextInt());\n        Collections.sort(z);\n        int n = z.size();\n        double m = n % 2 == 1 ? z.get(n / 2) : (z.get(n / 2 - 1) + z.get(n / 2)) / 2.0;\n        System.out.println(z);\n        System.out.println("Medián: " + m);', "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.Scanner;\n\n") },
      kontrola: function (v) { return r(v).join("|") === "[10, 20, 30, 40, 50, 60]|Medián: 35.0" ? null : "Výstup má byť [10, 20, 30, 40, 50, 60] a Medián: 35.0"; },
      vysvetlenie: "Pri párnom počte je medián priemer dvoch prostredných." },
    { typ: "vyklad", nadpis: "Modul 4 máš za sebou",
      text: "<ul><li>static metódy, parametre a return.</li><li>Polia, <code>length</code>, cyklus for-each.</li><li><code>ArrayList</code>: add, get, size, remove, contains.</li><li>Polia v metódach a <code>Arrays.toString</code>.</li><li><code>Arrays.sort</code>, <code>Collections.sort</code>.</li></ul>", tip: "Posledný modul: vlastné triedy a objekty." },
  ] };

  var TEST = [
    { typ: "volba", lekcia: "java-4-1", otazka: "Čo znamená <code>void</code> pri metóde?", moznosti: ["Nič nevracia", "Je prázdna", "Vracia 0", "Je súkromná"], spravna: 0, vysvetlenie: "Bez návratovej hodnoty." },
    { typ: "volba", lekcia: "java-4-2", otazka: "Čo sa stane pri <code>a[5]</code> v poli s dĺžkou 5?", moznosti: ["Výnimka ArrayIndexOutOfBoundsException", "Vráti 0", "Vráti posledný prvok", "Nič"], spravna: 0, vysvetlenie: "Java hranice kontroluje." },
    { typ: "volba", lekcia: "java-4-2", otazka: "Čo robí <code>for (int x : a)</code>?", moznosti: ["Prejde všetky prvky poľa a", "Spočíta prvky", "Vytvorí pole", "Nič"], spravna: 0, vysvetlenie: "for-each." },
    { typ: "volba", lekcia: "java-4-3", otazka: "Ako vytvoríš zoznam celých čísel?", moznosti: ["<code>ArrayList&lt;Integer&gt; z = new ArrayList&lt;&gt;();</code>", "<code>ArrayList&lt;int&gt; z = new ArrayList&lt;&gt;();</code>", "<code>int[] z = new ArrayList();</code>", "<code>List z = [];</code>"], spravna: 0, vysvetlenie: "Integer, nie int." },
    { typ: "volba", lekcia: "java-4-4", otazka: "Ako pekne vypíšeš obsah poľa?", moznosti: ["<code>Arrays.toString(pole)</code>", "<code>pole.print()</code>", "<code>System.out.println(pole)</code>", "<code>String(pole)</code>"], spravna: 0, vysvetlenie: "Inak vypíše adresu." },
    { typ: "volba", lekcia: "java-4-5", otazka: "Čo vráti <code>Collections.max(z)</code>?", moznosti: ["Najväčší prvok zoznamu", "Počet prvkov", "Posledný prvok", "Zoradený zoznam"], spravna: 0, vysvetlenie: "Maximum." },
    { typ: "doplnenie", lekcia: "java-4-3", otazka: "Pridaj a vypíš počet:", sablona: 'z.[[0]]("Jana");\nSystem.out.println(z.[[1]]());', zetony: ["add", "size", "push", "length", "append"], spravne: ["add", "size"], vysvetlenie: "add a size()." },
  ];

  K.registrujModul("java", { cislo: 4, nazov: "Metódy, polia a zoznamy", popis: "static metódy, polia, ArrayList, Arrays a Collections.", lekcie: [L1, L2, L3, L4, L5], test: { otazky: TEST, potrebne: 70 } });
})();
