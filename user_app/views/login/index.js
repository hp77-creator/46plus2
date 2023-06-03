import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { SIGNUP } from "../signup";

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Validate form values (you can add your own validation logic here)
    if (phoneNumber === "" || password === "") {
      Alert.alert("Please fill in all fields");
      return;
    }

    // Perform login process (you can replace this with your own login logic)
    if (phoneNumber === "1234567890" && password === "password") {
      Alert.alert("Login Successful!");
    } else {
      Alert.alert("Invalid phone number or password");
    }

    // Clear form
    setPhoneNumber("");
    setPassword("");
  };

  const navigateToSignup = () => {
    navigation.navigate(SIGNUP);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        > */}
        {/* <Text>New to the app?</Text> */}
        {/* <TouchableOpacity onPress={() => navigation.navigate(SIGNUP)}>
          <Text style={{ color: "#AD40AF", fontWeight: "700" }}> SignUp</Text>
        </TouchableOpacity> */}
        {/* </View> */}
        <Button title="Signup" onPress={navigateToSignup} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Login;
export const LOGIN = "login";
