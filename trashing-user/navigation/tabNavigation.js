import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrderPage from "../screens/OrderPage.js";
import HomePage from "../screens/HomePage.js";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomePage} />
      <Tab.Screen name="order" component={OrderPage} />
    </Tab.Navigator>
  );
}
