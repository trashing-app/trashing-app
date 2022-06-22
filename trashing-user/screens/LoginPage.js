import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import storage from "../storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Form, FormItem } from "react-native-form-component";
import { baseUrl } from "../baseUrl";
const winWidth = Dimensions.get("window").width;
const winHeight = Dimensions.get("window").height;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    storage
      .load({
        key: "loginState",
      })
      .then((ret) => {
        return axios.patch(`${baseUrl}/pub/users/registerdevice`, {
          email: ret.email,
          device_token: expoPushToken,
        });
      })
      .then((_) => {
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

  const doLogin = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/pub/users/login`, {
        email,
        password,
      });
      if (data.access_token) {
        const { id, username, email, access_token } = data;
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

        await AsyncStorage.setItem("access_token", access_token);
        navigation.navigate("tabnavigation");
        ToastAndroid.showWithGravity(
          "Login successfull",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );

        await axios.patch(`${baseUrl}/pub/users/registerdevice`, {
          email: email,
          device_token: expoPushToken,
        });
        setEmail("");
        setPassword("");
      } else {
        throw "login failed";
      }
    } catch (err) {
      ToastAndroid.showWithGravity(
        "Invalid email/password",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={{
            height: 170,
            alignItems: "center",
            justifyContent: "center",
            width: winWidth,
            marginBottom: -30,
            marginTop: winHeight * 0.2,
          }}
          source={require("../assets/images/TRASHING.png")}
        />
        <Form
          buttonStyle={{
            backgroundColor: "#3A5A40",
            borderColor: "#DAD7CD",
            borderWidth: 3,
            width: winWidth * 0.3,
            marginLeft: winWidth * 0.27,
          }}
          buttonTextStyle={{
            color: "#DAD7CD",
          }}
          buttonText="Sign in"
          onButtonPress={doLogin}
        >
          <FormItem
            style={styles.inputField}
            labelStyle={{
              color: "#A3B18A",
              backgroundColor: "#3A5A40",
              fontSize: 18,
              paddingHorizontal: 10,
              marginLeft: -5,
              marginRight: -5,
              borderRadius: 5,
            }}
            textInputStyle={{ color: "#DAD7CD", fontSize: 18 }}
            floatingLabel
            label="Email"
            keyboardType="email-address"
            showErrorIcon={false}
            onChangeText={setEmail}
            value={email}
          />
          <FormItem
            style={styles.inputField}
            labelStyle={{
              color: "#A3B18A",
              backgroundColor: "#3A5A40",
              fontSize: 18,
              paddingHorizontal: 10,
              marginLeft: -5,
              marginRight: -5,
              borderRadius: 3,
            }}
            textInputStyle={{ color: "#DAD7CD", fontSize: 18 }}
            floatingLabel
            autoCapitalize="none"
            label="Password"
            secureTextEntry
            isRequired
            showErrorIcon={false}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </Form>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#588157",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 1,
    height: winHeight,
  },
  inputField: {
    fontSize: 22,
    width: winWidth * 0.85,
    backgroundColor: "#3A5A40",
    borderWidth: 4,
    borderColor: "#DAD7CD",
    borderRadius: 8,
    height: 55,
    color: "#DAD7CD",
  },
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

//fungsi yang nanti dipanggil buat notify
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
