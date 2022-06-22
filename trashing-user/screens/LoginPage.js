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
        return axios.patch(
          `https://856e-2001-448a-10a8-3a9f-8ce7-e4ec-1320-8a66.ap.ngrok.io/pub/users/registerdevice`,
          {
            email: ret.email,
            device_token: expoPushToken,
          }
        );
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
      const { data } = await axios.post(
        `https://856e-2001-448a-10a8-3a9f-8ce7-e4ec-1320-8a66.ap.ngrok.io/pub/users/login`,
        {
          email,
          password,
        }
      );
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

        await axios.patch(
          `https://856e-2001-448a-10a8-3a9f-8ce7-e4ec-1320-8a66.ap.ngrok.io/pub/users/registerdevice`,
          {
            email: email,
            device_token: expoPushToken,
          }
        );
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
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#DAD7CD"
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#DAD7CD"
            style={styles.inputField}
            name="password"
            placeholder="Password"
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
              color="#DAD7CD"
            />
          </Pressable>
        </View>
        <TouchableOpacity
          style={{
            width: 130,
            height: 50,
            backgroundColor: "#3A5A40",
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
    backgroundColor: "#588157",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 1,
    height: winHeight,
  },
  inputContainer: {
    backgroundColor: "#3A5A40",
    width: winWidth * 0.85,
    marginHorizontal: "10%",
    marginVertical: 15,
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
