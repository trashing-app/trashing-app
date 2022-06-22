import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrderPage from "../screens/OrderPage.js";
import HomePage from "../screens/HomePage.js";
import storage from "../storage";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import ProfilePage from "../screens/ProfilePage.js";
import { Text } from "react-native";

export default function TabNavigation() {
  const navigation = useNavigation();
  useEffect(() => {
    storage
      .load({
        key: "loginState",
      })
      .then((ret) => {
        console.log(ret.id, ret.name, ret.token);
      })
      .catch((err) => {
        console.warn(err.message);
        switch (err.name) {
          case "NotFoundError":
            navigation.navigate("LoginPage");
            break;
          case "ExpiredError":
            navigation.navigate("LoginPage");
            break;
        }
      });
  }, []);

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#DAD7CD", borderTopWidth: 0 },
        tabBarLabelStyle: { color: "#588157" },
        tabBarInactiveBackgroundColor: "#DAD7CD",
        tabBarActiveBackgroundColor: "#344E41",
        tabBarActiveTintColor: "#344E41",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{ color: focused ? "#DAD7CD" : "#588157", fontSize: 12 }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? "#DAD7CD" : "#588157"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderPage}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{ color: focused ? "#DAD7CD" : "#588157", fontSize: 12 }}
            >
              Order
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign
              name="plussquare"
              size={24}
              color={focused ? "#DAD7CD" : "#588157"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{ color: focused ? "#DAD7CD" : "#588157", fontSize: 12 }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name="user-circle"
              size={24}
              color={focused ? "#DAD7CD" : "#588157"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
