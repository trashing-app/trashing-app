import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrderPage from '../screens/OrderPage.js';
import HomePage from '../screens/HomePage.js';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import ProfilePage from '../screens/ProfilePage.js';

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={24} color="#00b4d8" />,
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plussquare" size={24} color="#00b4d8" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={24} color="#00b4d8" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
