import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./screens/HomePage";
import ListOrder from "./screens/ListOrder";
import DetailOrder from "./screens/DetailOrder";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="ListOrder"
          component={ListOrder}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomePage"
          component={HomePage}
        />
        <Stack.Screen 
        options={{
          headerShown: false
        }}
        name="DetailOrder"component={DetailOrder} ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
