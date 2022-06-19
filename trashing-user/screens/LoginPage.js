import { useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  // AsyncStorage,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
  const [email, onChangeEmail] = useState("");
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");
  const baseUrl =
    "https://bb1a-2001-448a-4044-6908-74b9-8883-e2e8-277c.ap.ngrok.io";
  const navigation = useNavigation();

  const doLogin = async () => {
    // the fetching goes here
    try {
      const { data } = await axios.post(`${baseUrl}/pub/users/login`, {
        email,
        password,
      });
      // console.log(data);
      await AsyncStorage.setItem("access_token", data);
      // console.log("logging in");
      navigation.navigate("OrderPage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#ffffff"
            style={styles.inputField}
            value={email}
            onChangeText={onChangeEmail}
            placeholder="Input email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#ffffff"
            style={styles.inputField}
            name="password"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            secureTextEntry={passwordVisibility}
            value={password}
            enablesReturnKeyAutomatically
            onChangeText={(text) => setPassword(text)}
          />
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons
              name={rightIcon}
              size={22}
              color="#ffffff"
            />
          </Pressable>
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
            borderColor: "#d7d7d7",
            borderWidth: 3,
          }}
          onPress={doLogin}
        >
          <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
    marginHorizontal: "5%",
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#d7d7d7",
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: "87%",
  },
});
