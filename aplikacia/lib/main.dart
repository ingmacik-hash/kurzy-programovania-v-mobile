import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:webview_flutter/webview_flutter.dart';

// Aplikácia zobrazuje SyntaxCode z assets/web/index.html (kópia priečinka ../web).
// Po úprave webu spusti: tool/skopiruj_web.sh
// Beží na Androide aj iOS (WebView v oboch systémoch).
void main() {
  // Úvodná obrazovka s logom ostane, kým sa nenačíta webová časť (pozri _skryUvod).
  final binding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: binding);
  runApp(const SyntaxApp());
}

class SyntaxApp extends StatelessWidget {
  const SyntaxApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'SyntaxCode',
      debugShowCheckedModeBanner: false,
      home: SyntaxObrazovka(),
    );
  }
}

class SyntaxObrazovka extends StatefulWidget {
  const SyntaxObrazovka({super.key});

  @override
  State<SyntaxObrazovka> createState() => _SyntaxObrazovkaState();
}

class _SyntaxObrazovkaState extends State<SyntaxObrazovka> {
  late final WebViewController _web;

  // Servery, na ktoré smie webová časť poslať požiadavku cez kanál SyntaxSiet.
  // (Server Kotlinu neprijíma požiadavky zo stránky načítanej zo súboru, preto ich posiela aplikácia.)
  static const _povolene = {'api.kotlinlang.org'};

  @override
  void initState() {
    super.initState();
    final tmava = WidgetsBinding.instance.platformDispatcher.platformBrightness == Brightness.dark;
    _web = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(tmava ? const Color(0xFF0C0F17) : const Color(0xFFF3F4F8))
      ..setNavigationDelegate(NavigationDelegate(onPageFinished: (_) => _skryUvod()))
      ..addJavaScriptChannel('SyntaxSiet', onMessageReceived: (m) => _siet(m.message))
      ..addJavaScriptChannel('SyntaxLicencie', onMessageReceived: (_) => _licencie())
      ..loadFlutterAsset('assets/web/index.html');
    // Poistka: úvodná obrazovka zmizne najneskôr po 8 sekundách.
    Future.delayed(const Duration(seconds: 8), _skryUvod);
  }

  // Zoznam licencií všetkých súčastí Flutteru a balíkov (Flutter ho zostaví sám).
  void _licencie() {
    if (!mounted) return;
    showLicensePage(context: context, applicationName: 'SyntaxCode');
  }

  var _uvodSkryty = false;
  // Stránka je načítaná: ešte chvíľu počkáme, kým sa vykreslí, a skryjeme logo.
  void _skryUvod() {
    if (_uvodSkryty) return;
    _uvodSkryty = true;
    Future.delayed(const Duration(milliseconds: 150), FlutterNativeSplash.remove);
  }

  // Požiadavka z webu: {id, url, telo}. Odpoveď ide späť cez K._sietOdpoved(id, úspech, text).
  Future<void> _siet(String sprava) async {
    var id = 0;
    try {
      final m = jsonDecode(sprava) as Map<String, dynamic>;
      id = (m['id'] as num).toInt();
      final uri = Uri.parse(m['url'] as String);
      if (uri.scheme != 'https' || !_povolene.contains(uri.host)) throw 'Nepovolená adresa';
      final klient = HttpClient()..connectionTimeout = const Duration(seconds: 20);
      try {
        final poz = await klient.postUrl(uri);
        poz.headers.contentType = ContentType.json;
        poz.add(utf8.encode(m['telo'] as String));
        final odp = await poz.close().timeout(const Duration(seconds: 40));
        final text = await odp.transform(utf8.decoder).join();
        if (odp.statusCode != 200) throw 'http ${odp.statusCode}';
        await _odpovedz(id, true, text);
      } finally {
        klient.close();
      }
    } catch (e) {
      await _odpovedz(id, false, e.toString());
    }
  }

  Future<void> _odpovedz(int id, bool uspech, String text) =>
      _web.runJavaScript('K._sietOdpoved($id, $uspech, ${jsonEncode(text)})');

  // Späť: najprv sa pýtame webu (krok späť v lekcii, návrat na kurz…).
  // Na domovskej obrazovke sa aplikácia na Androide zavrie. Na iOS nie –
  // Apple nepovoľuje, aby sa aplikácia zatvárala sama.
  Future<void> _spat() async {
    var navigoval = false;
    try {
      final r = await _web.runJavaScriptReturningResult('K.androidSpat()');
      navigoval = r == true || r.toString() == 'true' || r.toString() == '1';
    } catch (_) {}
    if (!navigoval && Platform.isAndroid) SystemNavigator.pop();
  }

  @override
  Widget build(BuildContext context) {
    final tmava = MediaQuery.platformBrightnessOf(context) == Brightness.dark;
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop) _spat();
      },
      child: AnnotatedRegion<SystemUiOverlayStyle>(
        value: tmava ? SystemUiOverlayStyle.light : SystemUiOverlayStyle.dark,
        child: Scaffold(
          backgroundColor: tmava ? const Color(0xFF0C0F17) : const Color(0xFFF3F4F8),
          body: SafeArea(
            child: Stack(
              children: [
                WebViewWidget(controller: _web),
                // iPhone nemá tlačidlo Späť: potiahnutie od ľavého okraja doprava = späť.
                if (Platform.isIOS)
                  Positioned(
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 16,
                    child: GestureDetector(
                      behavior: HitTestBehavior.translucent,
                      onHorizontalDragEnd: (d) {
                        if ((d.primaryVelocity ?? 0) > 200) _spat();
                      },
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
