import 'package:flutter/material.dart';
import 'package:flutter_js/javascript_runtime.dart';

Widget getJsWidget(dynamic data, JavascriptRuntime jsRuntime) {
  if (data is String) {
    return Text(data);
  }
  data = data as Map<String, dynamic>;
  switch (data['type']) {
    case 'rn-row':
      final list = (data['children'] as List);
      list.removeWhere((e) => e is String);
      return Row(
        children: list.map((e) => getJsWidget(e, jsRuntime)).toList(),
      );
    case 'container':
      return Container(child: getJsWidget(data['children'][0], jsRuntime));
    case 'rn-text':
      return Text(getProps(data, 'label'));
    case 'rn-button':
      return ElevatedButton(onPressed: () {
        String callbackId = getProps(data, 'onClick');
        jsRuntime.evaluateAsync('callFunctionById(\'$callbackId\')');
      }, child: Text(getProps(data, 'label')));
    case 'rn-spacer':
      return SizedBox(width: getDoubleProps(data, 'width'), height: getDoubleProps(data, 'height'));
    default:
      return Container();
  }
}

T getProps<T>(Map data, String key) {
  return data['props']['props'][key] as T;
}

double getDoubleProps(data, key) {
  final value = data['props']['props'][key];
  if (value == null) return 0;
  return (value as int).toDouble();
}
