import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Form, FormItem } from "react-native-form-component";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import storage from "../storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../baseUrl";

const winWidth = Dimensions.get("window").width;
const winHeight = Dimensions.get("window").height;

export default function ProfilePage() {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [profile, setProfile] = useState({
    username: "",
    address: "",
    phoneNumber: "",
  });

  const [balance, setBalance] = useState(0);

  const rupiahFormatter = (amount) => {
    let str = Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&.");
    str = str.substring(0, str.length - 3);
    return "Rp." + str;
  };

  useEffect(() => {
    if (id) {
      fetch("https://856e-2001-448a-10a8-3a9f-8ce7-e4ec-1320-8a66.ap.ngrok.io/users/" + id)
        .then((res) => res.json())
        .then((data) => {
          setProfile({
            username: data.username,
            address: data.address,
            phoneNumber: data.phoneNumber,
          });
          setBalance(data.balance);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    storage
      .load({
        key: "loginState",
      })
      .then((ret) => {
        setId(ret.id);
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

  function clickLogout() {
    storage.remove({
      key: "loginState",
    });
    AsyncStorage.removeItem("access_token").then((res) => {
      navigation.navigate("WelcomePage");
    });
  }

  const onChangeHandler = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const onSubmitEdit = () => {
    console.log(id);
    fetch(`${baseUrl}/users/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: profile.username,
        address: profile.address,
        phoneNumber: profile.phoneNumber,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        ToastAndroid.showWithGravity(
          "Edited successfully",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          style={{
            height: 170,
            alignItems: "center",
            justifyContent: "center",
            width: winWidth,
            marginBottom: -20,
          }}
          source={require("../assets/images/TRASHING.png")}
        />
        <View style={{ marginLeft: winWidth * 0.07 }}>
          <Form
            buttonStyle={{
              width: 130,
              height: 50,
              backgroundColor: "#344E41",
              justifyContent: "center",
              marginVertical: 15,
              borderRadius: 15,
              marginHorizontal: winWidth * 0.26,
              borderColor: "#DAD7CD",
              borderWidth: 3,
            }}
            buttonTextStyle={{
              color: "#DAD7CD",
              fontSize: 20,
            }}
            buttonText="Save"
            onButtonPress={onSubmitEdit}
          >
            <FormItem
              style={styles.inputField}
              labelStyle={{
                color: "#DAD7CD",
                fontSize: 18,
                borderRadius: 5,
                marginBottom: 3,
              }}
              textInputStyle={{ color: "#DAD7CD", fontSize: 18 }}
              floatingLabel={false}
              label="Username"
              keyboardType="default"
              showErrorIcon={false}
              value={profile.username}
              onChangeText={(username) => onChangeHandler("username", username)}
            />
            <FormItem
              style={styles.inputField}
              labelStyle={{
                color: "#DAD7CD",
                fontSize: 18,
                borderRadius: 5,
                marginBottom: 3,
              }}
              textInputStyle={{ color: "#DAD7CD", fontSize: 18 }}
              floatingLabel={false}
              label="Address"
              keyboardType="default"
              showErrorIcon={false}
              value={profile.address}
              onChangeText={(address) => onChangeHandler("address", address)}
            />
            <FormItem
              style={styles.inputField}
              labelStyle={{
                color: "#DAD7CD",
                fontSize: 18,
                borderRadius: 5,
                marginBottom: 3,
              }}
              textInputStyle={{ color: "#DAD7CD", fontSize: 18 }}
              floatingLabel={false}
              label="Phone Number"
              keyboardType="default"
              showErrorIcon={false}
              value={profile.phoneNumber}
              onChangeText={(phoneNumber) =>
                onChangeHandler("phoneNumber", phoneNumber)
              }
            />
            <Text
              style={{
                textAlign: "center",
                marginLeft: -35,
                color: "#DAD7CD",
                fontSize: 17,
              }}
            >
              Balance : {rupiahFormatter(balance)}
            </Text>
          </Form>
          <TouchableOpacity
            style={{
              width: 130,
              height: 50,
              backgroundColor: "#DAD7CD",
              justifyContent: "center",
              marginVertical: 5,
              borderRadius: 15,
              marginHorizontal: winWidth * 0.26,
              borderColor: "#344E41",
              borderWidth: 3,
            }}
            onPress={clickLogout}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "#344E41",
                fontWeight: "600",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
