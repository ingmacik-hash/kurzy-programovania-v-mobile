import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';

// Aplikácia zobrazuje Kódovňu z assets/web/index.html (kópia priečinka ../web).
// Po úprave webu spusti: tool/skopiruj_web.sh
void main() => runApp(const KodovnaApp());

class KodovnaApp extends StatelessWidget {
  const KodovnaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Kódovňa',
      debugShowCheckedModeBanner: false,
      home: KodovnaObrazovka(),
    );
  }
}

class KodovnaObrazovka extends StatefulWidget {
  const KodovnaObrazovka({super.key});

  @override
  State<KodovnaObrazovka> createState() => _KodovnaObrazovkaState();
}

class _KodovnaObrazovkaState extends State<KodovnaObrazovka> {
  late final WebViewController _web;

  @override
  void initState() {
    super.initState();
    _web = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadFlutterAsset('assets/web/index.html');
  }

  // Tlačidlo Späť: najprv sa pýtame webu (zatvorí lekciu, vráti sa z kurzu…).
  // Ak je na domovskej obrazovke, aplikácia sa zavrie.
  Future<void> _spat() async {
    var navigoval = false;
    try {
      final r = await _web.runJavaScriptReturningResult('K.androidSpat()');
      navigoval = r == true || r.toString() == 'true';
    } catch (_) {}
    if (!navigoval) SystemNavigator.pop();
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
          body: SafeArea(child: WebViewWidget(controller: _web)),
        ),
      ),
    );
  }
}
