import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:user_app/providers/auth_provider.dart';
import 'package:user_app/ui/utils/buttons.dart';

class LoginPage extends StatefulWidget {
  static const String route = '/login';

  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late TextEditingController _phoneController;

  @override
  void initState() {
    super.initState();
    _phoneController = TextEditingController(text: "");
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text("Enter your Phone number"),
                TextField(
                  controller: _phoneController,
                  keyboardType: TextInputType.number,
                  maxLines: 1,
                  inputFormatters: [
                    // FilteringTextInputFormatter.allow(RegExp("[0–9]"))
                  ],
                ),
                Button(
                  child: Text("Next"),
                  onPressed: () {
                    authProvider.sendOTP(_phoneController.text.trim());
                  },
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }
}
