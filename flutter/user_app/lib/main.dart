import 'package:flutter/material.dart';
import 'package:user_app/map.dart';
import 'package:user_app/routers.dart';
import 'screeens/login.dart' show LoginPage;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Park+',
      home: MapSample(),
      initialRoute: LoginPage.route,
      onGenerateRoute: Routers.generateRoute,
    );
  }
}
