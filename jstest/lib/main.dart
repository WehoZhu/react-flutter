import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_js/flutter_js.dart';
import 'package:jstest/renderer.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final JavascriptRuntime jsRt = getJavascriptRuntime();
  String tip = 'Js render result:';
  Widget jsContainer = Container();

  @override
  void initState() {
    jsRt.onMessage('render', (json) {
      setState(() {
        jsContainer = getJsWidget(json, jsRt);
      });
    });
    rootBundle.loadString('assets/bundle.js').then((s) => jsRt.evaluateAsync(s));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text(tip),
          Container(
            height: 1,
            width: double.infinity,
            color: Colors.black.withOpacity(0.3),
            padding: const EdgeInsets.symmetric(vertical: 16),
          ),
          jsContainer,
        ],
      ),
    );
  }
}
