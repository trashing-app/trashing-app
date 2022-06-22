import { useEffect, useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import storage from "../storage";
import { baseUrl } from "../constant/baseUrl";
import { SafeAreaView } from "react-native-safe-area-context";
const winWidth = Dimensions.get("window").width;
const winHeight = Dimensions.get("window").height;
export default function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");

  useEffect(() => {
    // console.log(storage);
    storage
      .load({
        key: "loginState",
      })
      .then((ret) => {
        navigation.replace("TabNavigator");
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

  useEffect(() => {
    return () => {
      setPassword("");
      setEmail("");
    };
  }, []);

  const doLogin = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/pub/collectors/login`, {
        email,
        password,
      });
      if (data.access_token) {
        const { id, username, email, access_token } = data;
        console.log("login success");
        storage.save({
          key: "loginState",
          data: {
            id,
            name: username,
            email,
            photoUrl:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            welcomeMessage: "Hello",
            role: "default",
            token: access_token,
          },
          expires: null,
        });
        navigation.replace("TabNavigator");
      } else {
        throw "login failed";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          height: 170,
          alignItems: "center",
          justifyContent: "center",
          width: winWidth,
          marginBottom: -30,
          marginTop: winHeight * -0.07,
        }}
        source={require("../assets/images/TRASHING.png")}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor="#ffffff"
          style={styles.inputField}
          value={email}
          onChangeText={setEmail}
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
          <MaterialCommunityIcons name={rightIcon} size={22} color="#ffffff" />
        </Pressable>
      </View>
      <TouchableOpacity
        style={{
          width: winWidth * 0.3,
          height: 50,
          backgroundColor: "#3A5A40",
          borderColor: "#DAD7CD",
          borderWidth: 3,
          borderRadius: 15,
          justifyContent: "center",
          marginVertical: 15,
          marginHorizontal: "34%",
        }}
        onPress={doLogin}
      >
        <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>
          Login
        </Text>
      </TouchableOpacity>
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
    backgroundColor: "#3A5A40",
    width: "90%",
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
    fontSize: 22,
    width: "87%",
    color: "#DAD7CD",
  },
});
