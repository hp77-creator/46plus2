import 'package:flutter/material.dart';
import 'package:user_app/screeens/login.dart' show LoginPage;
import 'package:user_app/screeens/signup.dart' show SignupPage;
import 'package:user_app/map.dart' show MapSample;

class Routers {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case LoginPage.route:
        return MaterialPageRoute(builder: (_) => LoginPage());
      case SignupPage.route:
        return MaterialPageRoute(builder: (_) => SignupPage());
      case LoginPage.route:
        return MaterialPageRoute(builder: (_) => MapSample());
      default:
        return MaterialPageRoute(builder: (_) {
          return Scaffold(
            body: Center(
              child: Text('No route defined for ${settings.name}'),
            ),
          );
        });
    }
  }
}
