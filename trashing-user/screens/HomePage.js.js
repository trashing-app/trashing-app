import { View, Text, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import storage from "../storage";
import { useEffect } from "react";
export default function HomePage() {
  const navigation = useNavigation();
  useEffect(() => {
    storage
      .load({
        key: "loginState",
      })
      .then((ret) => {
        navigation.navigate("tabnavigation");
      })
      .catch((err) => {
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

  function clickLogout() {
    storage.remove({
      key: "loginState",
    });
    navigation.navigate("LoginPage");
  }
  return (
    <View>
      <Text>Home</Text>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('HomePage')}
        style={{ backgroundColor: 'blue' }}
      >
        <Text style={{ fontSize: 20, color: '#fff' }}>Home Page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderPage')}
        style={{ backgroundColor: 'blue' }}
      >
        <Text style={{ fontSize: 20, color: '#fff' }}>Order Page</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={clickLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
