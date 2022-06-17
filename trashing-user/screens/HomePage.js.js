import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("register")}
        style={{ backgroundColor: "blue" }}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("register")}
        style={{ backgroundColor: "blue" }}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
