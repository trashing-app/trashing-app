import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

export default function OrderPage() {
  const [input, setInput] = useState({
    weight: 0,
    categoryId: 0,
    description: "",
    price: 0,
  });

  const categories = ["Plastik", "Sampah Basah", "Sampah Kering"];
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <Image
            style={{
              height: 70,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: 20,
            }}
            source={require("../assets/images/TRASHING.png")}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              onChangeText={(weight) => setInput({ ...input, weight })}
              placeholder="Weight"
              keyboardType="decimal-pad"
              placeholderTextColor="#ffffff"
            />
          </View>
          <View style={styles.inputContainer}>
            <SelectDropdown
              data={categories}
              onSelect={(selectedItem, index) => {
                setInput({ ...input, categoryId: index + 1 });
              }}
              defaultButtonText={"Category"}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#ffffff"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              onChangeText={(description) =>
                setInput({ ...input, description })
              }
              placeholder="Description"
              autoCorrect={false}
              placeholderTextColor="#ffffff"
              keyboardType="default"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="#ffffff"
              style={styles.inputField}
              onChangeText={(price) => setInput({ ...input, price })}
              placeholder="Price"
              keyboardType="decimal-pad"
            />
          </View>
          <TouchableOpacity
            style={{
              width: 130,
              height: 50,
              backgroundColor: "#00b4d8",
              justifyContent: "center",
              marginVertical: 15,
              borderRadius: 15,
              marginHorizontal: "34%",
              borderColor: "#caf0f8",
              borderWidth: 3,
            }}
            onPress={async () => {
              try {
                const { rawData } = JSON.parse(
                  await AsyncStorage.getItem("loginState")
                );
                const access_token = rawData.token;
                let { status } =
                  await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                  setErrorMsg("Permission to access location was denied");
                  return;
                }

                let position = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = position.coords;
                const orderLocation = {
                  latitude: latitude,
                  longitude: longitude,
                };
                const { data } = await axios.post(
                  `https://2235-2001-448a-4044-6908-754b-26cd-b980-5835.ap.ngrok.io/orders`,
                  {
                    orderItems: [input],
                    longitude,
                    latitude,
                  },
                  {
                    headers: { access_token },
                  }
                );
                const id = data.id;
                navigation.navigate("MapPage", { id, orderLocation });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>
              Order
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00b4d8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 1,
  },
  inputContainer: {
    backgroundColor: "#00b4d8",
    width: "90%",
    height: 62,
    marginHorizontal: "5%",
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#caf0f8",
  },
  inputField: {
    padding: 14,
    fontSize: 20,
    width: "87%",
    color: "white",
  },
  dropdown1BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#00b4d8",
  },
  dropdown1BtnTxtStyle: { color: "#ffffff", textAlign: "left", fontSize: 20 },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});
