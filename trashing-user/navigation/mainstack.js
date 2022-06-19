import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "../screens/LoginPage";
import RegisterPage from "../screens/RegisterPage";
import WelcomePage from "../screens/WelcomePage";
import MapPage from "../screens/MapPage";
import TabNavigation from "./tabNavigation.js";
import OrderPage from "../screens/OrderPage";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="WelcomePage"
          component={WelcomePage}
        />
        <Stack.Screen
          name="tabnavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{
            title: "Login To Trashing",
            headerTitleAlign: "center",
          }}
          name="LoginPage"
          component={LoginPage}
        />
        <Stack.Screen
          options={{
            title: "Create Your Trashing Account",
            headerTitleAlign: "center",
          }}
          name="RegisterPage"
          component={RegisterPage}
        />
        <Stack.Screen
          options={{
            title: "Map",
            headerTitleAlign: "center",
          }}
          name="MapPage"
          component={MapPage}
        />
        <Stack.Screen
          options={{
            title: "Create Your Trashing Account",
            headerTitleAlign: "center",
          }}
          name="OrderPage"
          component={OrderPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
