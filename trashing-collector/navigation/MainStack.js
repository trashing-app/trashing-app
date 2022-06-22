import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../screens/HomePage";
import TabNavigator from "./TabNavigator";
import DetailOrder from "../screens/DetailOrder";
import LoginPage from "../screens/LoginPage";
import Chat from "../components/Chat";
import FormOrderItem from "../screens/FormOrderItem";
const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginPage"
          component={LoginPage}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="TabNavigator"
          component={TabNavigator}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailOrder"
          component={DetailOrder}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomePage"
          component={HomePage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          name="FormOrderItem"
          component={FormOrderItem}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
