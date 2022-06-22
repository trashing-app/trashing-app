import { useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  ToastAndroid,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { SafeAreaView } from "react-native-safe-area-context";

const winWidth = Dimensions.get("window").width;
const winHeight = Dimensions.get("window").height;

export default function RegisterPage({ navigation }) {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const doRegister = (e) => {
    e.preventDefault();
    fetch("https://8a32-111-94-86-182.ap.ngrok.io/pub/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((response) => {
        if (response.status == 400) {
          throw { message: "Please check your input" };
        }
        navigation.replace("LoginPage");
        ToastAndroid.showWithGravity(
          "Registered Successfully",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      })
      .catch((err) => {
        ToastAndroid.showWithGravity(
          `${err.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <Image
            style={{
              height: 170,
              alignItems: "center",
              justifyContent: "center",
              width: winWidth,
            }}
            source={require("../assets/images/TRASHING.png")}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              onChangeText={(username) => setInput({ ...input, username })}
              placeholder="Username"
              keyboardType="default"
              placeholderTextColor="#DAD7CD"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              onChangeText={(email) => setInput({ ...input, email })}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#DAD7CD"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              onChangeText={(password) => setInput({ ...input, password })}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              secureTextEntry={passwordVisibility}
              enablesReturnKeyAutomatically
              placeholderTextColor="#DAD7CD"
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                name={rightIcon}
                size={22}
                color="#DAD7CD"
              />
            </Pressable>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="#DAD7CD"
              style={styles.inputField}
              onChangeText={(address) => setInput({ ...input, address })}
              placeholder="Address"
              keyboardType="default"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="#DAD7CD"
              name="phoneNumber"
              style={styles.inputField}
              onChangeText={(phoneNumber) =>
                setInput({ ...input, phoneNumber })
              }
              placeholder="Phone Number"
              keyboardType="name-phone-pad"
            />
          </View>
          <TouchableOpacity
            style={{
              width: 130,
              height: 50,
              backgroundColor: "#344E41",
              justifyContent: "center",
              marginVertical: 15,
              borderRadius: 15,
              marginHorizontal: "34%",
              borderColor: "#DAD7CD",
              borderWidth: 3,
            }}
            onPress={doRegister}
          >
            <Text
              style={{ textAlign: "center", fontSize: 20, color: "#DAD7CD" }}
            >
              Register
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
    backgroundColor: "#588157",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 1,
  },
  inputContainer: {
    backgroundColor: "#344E41",
    width: winWidth * 0.9,
    height: 62,
    marginHorizontal: "5%",
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#DAD7CD",
  },
  inputField: {
    padding: 14,
    fontSize: 20,
    width: winWidth * 0.78,
    color: "white",
  },
});
