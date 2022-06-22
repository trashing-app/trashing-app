import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListOrder from "../screens/ListOrder";
import Profile from "../screens/Profile";
import { Entypo, FontAwesome } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      // tabBarOptions={{
      //   style: {
      //     elevation: 0,
      //   },
      // }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#DAD7CD",
          borderColor: "#344E41",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: { color: "#588157" },
        tabBarInactiveBackgroundColor: "#DAD7CD",
        tabBarActiveBackgroundColor: "#344E41",
      }}
    >
      <Tab.Screen
        name="ListOrder"
        component={ListOrder}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={24} color="#588157" />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default TabNavigator;
