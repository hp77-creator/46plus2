import 'package:firebase_auth/firebase_auth.dart';
import 'package:user_app/models/base_model.dart';

class AuthModel extends BaseModel {
  FirebaseAuth firebaseAuth = FirebaseAuth.instance;

  void createNewUser(String phoneNumber) async {
    setViewState(ViewState.Busy);
    // Only for Web
    // await firebaseAuth.signInWithPhoneNumber(phoneNumber);
    await firebaseAuth.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        verificationCompleted: (PhoneAuthCredential credential) async {
          // Android Only

          // Sign user in
          await firebaseAuth.signInWithCredential(credential);
        },
        verificationFailed: (FirebaseAuthException e) {
          print(e);
          if (e.code == 'invalid-phone-number') {
            print('The provided phone number is not valid.');
          }
        },
        // called when code is sent to the user
        codeSent: (String verificationId, int? resendToken) {
          // PhoneAuthProvider.credential(verificationId: verificationId, smsCode: smsCode);
        },
        codeAutoRetrievalTimeout: (String verificationId) {});
    setViewState(ViewState.Ideal);
  }

  void logout() async {
    setViewState(ViewState.Busy);
    await firebaseAuth.signOut();
    setViewState(ViewState.Ideal);
  }
}
