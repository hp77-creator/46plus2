import 'package:flutter/material.dart';
import 'package:user_app/map.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(title: 'Park+', home: const MapSample());
  }
}
