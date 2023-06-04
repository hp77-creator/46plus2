import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:user_app/auth_widget_builder.dart';
import 'package:user_app/firebase_options.dart';
import 'package:user_app/home_page.dart';
import 'package:user_app/map.dart';
import 'package:user_app/providers/auth_provider.dart';
import 'package:user_app/routes.dart';
import 'ui/auth/login_page.dart' show LoginPage;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => AuthProvider())],
      child: const MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return AuthWidgetBuilder(
      builder: (context, snapshot) => MaterialApp(
        title: 'Park+',
        // home: Consumer<AuthProvider>(),
        initialRoute: snapshot.hasData ? LoginPage.route : MapSample.route,
        // effect of listen
        onGenerateRoute: Routes.generateRoute,
      ),
    );
  }
}
