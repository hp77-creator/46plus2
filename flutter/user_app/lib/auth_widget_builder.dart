import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:user_app/models/user_model.dart';
import 'package:user_app/providers/auth_provider.dart';

class AuthWidgetBuilder extends StatelessWidget {
  final Widget Function(BuildContext, AsyncSnapshot<UserModel>) builder;

  const AuthWidgetBuilder({super.key, required this.builder});

  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthProvider>(context, listen: false);
    return StreamBuilder<UserModel>(
        stream: authService.user,
        builder: (BuildContext context, AsyncSnapshot<UserModel> snapshot) {
          final UserModel? user = snapshot.data;
          if (user != null) {
            return MultiProvider(
              providers: [Provider<UserModel>.value(value: user)],
              child: builder(context, snapshot),
            );
          }
          return builder(context, snapshot);
        });
  }
}
