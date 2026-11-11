import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';

// Aplikácia zobrazuje kurz z assets/kurz/index.html (kópia ../index.html).
// Kurz po aktualizácii skopíruj: tool/skopiruj_kurz.sh
void main() => runApp(const KurzApp());

class KurzApp extends StatelessWidget {
  const KurzApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Kurz kódu',
      debugShowCheckedModeBanner: false,
      home: KurzObrazovka(),
    );
  }
}

class KurzObrazovka extends StatefulWidget {
  const KurzObrazovka({super.key});

  @override
  State<KurzObrazovka> createState() => _KurzObrazovkaState();
}

class _KurzObrazovkaState extends State<KurzObrazovka> {
  late final WebViewController _web;

  @override
  void initState() {
    super.initState();
    _web = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadFlutterAsset('assets/kurz/index.html');
  }

  @override
  Widget build(BuildContext context) {
    final tmava = MediaQuery.platformBrightnessOf(context) == Brightness.dark;
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: tmava ? SystemUiOverlayStyle.light : SystemUiOverlayStyle.dark,
      child: Scaffold(
        backgroundColor: tmava ? const Color(0xFF16171A) : const Color(0xFFF6F5F2),
        body: SafeArea(child: WebViewWidget(controller: _web)),
      ),
    );
  }
}
