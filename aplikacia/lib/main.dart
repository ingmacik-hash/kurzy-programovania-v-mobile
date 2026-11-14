import 'dart:io' show Platform;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';

// Aplikácia zobrazuje SyntaxCode z assets/web/index.html (kópia priečinka ../web).
// Po úprave webu spusti: tool/skopiruj_web.sh
// Beží na Androide aj iOS (WebView v oboch systémoch).
void main() => runApp(const SyntaxApp());

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

  @override
  void initState() {
    super.initState();
    _web = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadFlutterAsset('assets/web/index.html');
  }

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
