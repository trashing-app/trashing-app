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
  const baseUrl =
    "https://bb1a-2001-448a-4044-6908-74b9-8883-e2e8-277c.ap.ngrok.io";
  const navigation = useNavigation();
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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
        onPress={async () => {
          try {
            // console.log("TO MAP");
            // const { data } = await axios.post(`${baseUrl}/pub/users/login`, {
            //   email,
            //   password,
            // });
            navigation.navigate("MapPage");
          } catch (error) {
            console.log(error);
          }
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
