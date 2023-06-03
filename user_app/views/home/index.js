import { Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/users";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details PV"
        onPress={() => navigation.navigate("Details")}
      />
      <Button title="Logout" onPress={() => dispatch(signOut())} />
    </View>
  );
};
export default Home;
