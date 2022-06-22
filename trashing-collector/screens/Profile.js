import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from "react-native";
import storage from "../storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { baseUrl } from "../constant/baseUrl";
const winWidth = Dimensions.get("window").width;

function Profile() {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [profile, setProfile] = useState({
    username: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`${baseUrl}/collectors/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile({
            username: data.username,
            address: data.address,
            phoneNumber: data.phoneNumber,
          });
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
        // console.log(ret);
        // navigation.navigate("HomePage");
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
    console.log(storage);
    storage.remove({
      key: "loginState",
    });
    AsyncStorage.removeItem("access_token").then((res) => {
      navigation.navigate("LoginPage");
    });
  }

  const onChangeHandler = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const onSubmitEdit = () => {
    fetch(`${baseUrl}/collectors/${id}`, {
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
            marginTop: 20,
          }}
          source={require("../assets/images/TRASHING.png")}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Username"
            placeholderTextColor="#ffffff"
            value={profile.username}
            onChangeText={(username) => onChangeHandler("username", username)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Address"
            placeholderTextColor="#ffffff"
            value={profile.address}
            onChangeText={(address) => onChangeHandler("address", address)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Phone Number"
            placeholderTextColor="#ffffff"
            value={profile.phoneNumber}
            onChangeText={(phoneNumber) =>
              onChangeHandler("phoneNumber", phoneNumber)
            }
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
          onPress={() => onSubmitEdit(profile)}
        >
          <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>
            Save Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 130,
            height: 50,
            backgroundColor: "#DAD7CD",
            justifyContent: "center",
            marginVertical: 5,
            borderRadius: 15,
            marginHorizontal: "34%",
            borderColor: "#344E41",
            borderWidth: 3,
          }}
          onPress={clickLogout}
        >
          <Text style={{ textAlign: "center", fontSize: 20, color: "#344E41" }}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    width: "90%",
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
    width: "87%",
    color: "white",
  },
});

export default Profile;
