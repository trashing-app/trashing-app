import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";

export default function OrderPage() {
  const baseUrl =
    "https://bb1a-2001-448a-4044-6908-74b9-8883-e2e8-277c.ap.ngrok.io";
  const navigation = useNavigation();
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // useEffect(()=>{

  // },[])

  return (
    <SafeAreaView>
      <TextInput
        style={{ height: 40 }}
        placeholder="weight"
        onChangeText={(newText) => setWeight(newText)}
      />
      {/* <TextInput
        style={{ height: 40 }}
        placeholder="category"
        onChangeText={(newText) => setCategory(newText)}
      /> */}
      <SelectDropdown
        data={[
          { name: "Plastik", value: 1 },
          { name: "Sampah basah", value: 2 },
          { name: "Sampah kering", value: 3 },
        ]}
        onSelect={(selectedItem, index) => {
          setCategory(selectedItem.value);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name;
        }}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="description"
        onChangeText={(newText) => setDescription(newText)}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="price"
        onChangeText={(newText) => setPrice(newText)}
      />
      <TouchableOpacity
        onPress={async () => {
          try {
            console.log("TO MAP");
            // console.log(weight, 1, description, price);
            const access_token = await AsyncStorage.getItem("access_token");
            // const { data } = await axios.post(
            //   `${baseUrl}/orders`,
            //   {
            //     weight,
            //     categoryId: category,
            //     description,
            //     price,
            //   },
            //   {
            //     headers: { access_token },
            //   }
            // );
            // console.log(data, "CREATE ORDER");
            // await AsyncStorage.setItem("order", `${data.id}`);
            const id = await AsyncStorage.getItem("order");
            console.log(await AsyncStorage.getItem("order"));
            navigation.navigate("MapPage", { id });
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
