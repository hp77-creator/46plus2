import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/users";
const Login = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Phone Number:", phone);
    console.log("Password:", password);
    dispatch(signIn());
  };

  return (
    <View style={{ padding: "20px" }}>
      <Input
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setphone(text)}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};
export default Login;
