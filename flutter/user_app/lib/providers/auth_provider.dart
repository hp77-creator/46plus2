import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';

import '../models/user_model.dart';

enum Status {
  notLogged,
  authenticated,
  busy,
  OTPSent,
}

class AuthProvider extends ChangeNotifier {
  late FirebaseAuth _auth;
  String verificationId = "";
  Status _status = Status.notLogged;

  Status get status => _status;

  Stream<UserModel> get user => _auth.authStateChanges().map(_userFromFirebase);

  AuthProvider() {
    _auth = FirebaseAuth.instance;
    _auth.authStateChanges().listen(onAuthStateChanged);
  }

  UserModel _userFromFirebase(User? firebaseUser) {
    if (firebaseUser == null) {
      return UserModel(uid: "null", displayName: "null");
    }
    return UserModel(
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        phoneNo: firebaseUser.phoneNumber);
  }

  Future<void> onAuthStateChanged(User? firebaseUser) async {
    if (firebaseUser == null) {
      _status = Status.notLogged;
    } else {
      _status = Status.authenticated;
    }
    notifyListeners();
  }

  // method to handle phone input
  void sendOTP(String phoneNo) async {
    // Only for Web
    // await firebaseAuth.signInWithPhoneNumber(phoneNumber);
    await _auth.verifyPhoneNumber(
      phoneNumber: phoneNo,
      verificationCompleted: (PhoneAuthCredential credential) async {
        // Android Only
        // ...
        // Sign user in
        print("object");
        await _auth.signInWithCredential(credential);
      },
      // called when code is sent to the user
      codeSent: (String verificationId, int? resendToken) {
        // PhoneAuthProvider.credential(verificationId: verificationId, smsCode: smsCode);
        this.verificationId = verificationId;
      },
      codeAutoRetrievalTimeout: (String verificationId) {
        this.verificationId = verificationId;
      },
      verificationFailed: (FirebaseAuthException e) {
        print(e);
        if (e.code == 'invalid-phone-number') {
          print('The provided phone number is not valid.');
        }
      },
    );
  }

  // method to handle OTP check
  Future<UserModel> verifyOTP(String otp) async {
    var credentials = await _auth.signInWithCredential(
        PhoneAuthProvider.credential(
            verificationId: verificationId, smsCode: otp));
    return _userFromFirebase(credentials.user);
  }

  Future signOut() async {
    await _auth.signOut();
    _status = Status.notLogged;
    notifyListeners();
  }
}
