import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Login, { LOGIN } from "./views/login";
import Signup, { SIGNUP } from "./views/signup";
import Home, { HOME } from "./views/home";

const Stack = createNativeStackNavigator();

const LoginStack = () => (
  <Stack.Navigator
    initialRouteName={LOGIN}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={LOGIN} component={Login} />
    <Stack.Screen name={SIGNUP} component={Signup} />
  </Stack.Navigator>
);

const App = () => {
  const userState = useSelector((state) => state.user);
  if (!userState.isLoggedIn) {
    return (
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
