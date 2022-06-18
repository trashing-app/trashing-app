import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrderPage from '../screens/OrderPage.js';
import HomePage from '../screens/HomePage.js';

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="OrderPage" component={OrderPage} />
    </Tab.Navigator>
  );
}
