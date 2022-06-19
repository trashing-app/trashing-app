import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OrderPage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TextInput
        style={{ height: 40 }}
        placeholder="weight"
        onChangeText={(newText) => setText(newText)}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="category"
        onChangeText={(newText) => setText(newText)}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="description"
        onChangeText={(newText) => setText(newText)}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="price"
        onChangeText={(newText) => setText(newText)}
      />
      <TouchableOpacity
        onPress={() => {
          // console.log("TO MAP");
          navigation.navigate("MapPage");
        }}
        style={{
          width: 100,
          height: 40,
          backgroundColor: "cyan",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <Text style={{ textAlign: "center" }}>Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
