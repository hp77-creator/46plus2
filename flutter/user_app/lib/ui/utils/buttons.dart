import 'package:flutter/material.dart';

class Button extends StatelessWidget {
  final Widget? child;
  final VoidCallback? onPressed;

  const Button({super.key, this.onPressed, this.child});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(onPressed: onPressed, child: child);
  }
}
