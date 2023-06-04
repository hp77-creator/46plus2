import 'package:flutter/material.dart';

enum ViewState { Ideal, Busy }

enum AuthState { SignIn, SignUp }

class BaseModel extends ChangeNotifier {
  late ViewState _viewState;
  late AuthState _authState;

  ViewState get viewState => _viewState;

  AuthState get authState => _authState;

  setViewState(ViewState viewState) {
    _viewState = viewState;
    notifyListeners();
  }

  setAuthState(AuthState authState) {
    _authState = authState;
    notifyListeners();
  }
}
