import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "../screens/LoginPage";
import RegisterPage from "../screens/RegisterPage";
import TabNavigation from "./tabNavigation.js";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="tabnavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
