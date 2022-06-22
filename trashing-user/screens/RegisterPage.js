import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  ToastAndroid,
  Dimensions,
} from "react-native";
import { Form, FormItem } from "react-native-form-component";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseUrl } from "../baseUrl";

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

  const doRegister = () => {
    console.log(input);
    fetch(
      `${baseUrl}/pub/users/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    )
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
              marginTop: -30,
            }}
            source={require("../assets/images/TRASHING.png")}
          />
          <View style={{ marginLeft: winWidth * 0.07 }}>
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
              buttonText="Sign up"
              onButtonPress={doRegister}
            >
              <FormItem
                style={styles.inputField}
                labelStyle={{
                  color: "#A3B18A",
                  backgroundColor: "#3A5A40",
                  fontSize: 18,
                  paddingHorizontal: 10,
                  marginLeft: -6,
                  marginRight: -13,
                  borderRadius: 5,
                }}
                textInputStyle={{ color: "#DAD7CD", fontSize: 18 }}
                floatingLabel
                label="Username "
                keyboardType="default"
                isRequired
                asterik
                showErrorIcon={false}
                onChangeText={(username) => setInput({ ...input, username })}
                value={input.username}
              />
              <FormItem
                style={styles.inputField}
                labelStyle={{
                  color: "#A3B18A",
                  backgroundColor: "#3A5A40",
                  fontSize: 18,
                  paddingHorizontal: 10,
                  marginLeft: -6,
                  marginRight: -13,
                  borderRadius: 5,
                }}
                textInputStyle={{ color: "#DAD7CD", fontSize: 18 }}
                floatingLabel
                label="Email "
                keyboardType="email-address"
                showErrorIcon={false}
                asterik
                isRequired
                onChangeText={(email) => setInput({ ...input, email })}
                value={input.email}
              />
              <FormItem
                style={styles.inputField}
                labelStyle={{
                  color: "#A3B18A",
                  backgroundColor: "#3A5A40",
                  fontSize: 18,
                  paddingHorizontal: 10,
                  marginLeft: -5,
                  marginRight: -12,
                  borderRadius: 3,
                }}
                textInputStyle={{ color: "#DAD7CD", fontSize: 18 }}
                floatingLabel
                autoCapitalize="none"
                label="Password "
                secureTextEntry
                asterik
                isRequired
                showErrorIcon={false}
                onChangeText={(password) => setInput({ ...input, password })}
                value={input.password}
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
                  borderRadius: 5,
                }}
                textInputStyle={{ color: "#DAD7CD", fontSize: 18 }}
                floatingLabel
                label="Address"
                keyboardType="default"
                showErrorIcon={false}
                onChangeText={(address) => setInput({ ...input, address })}
                value={input.address}
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
                  borderRadius: 5,
                }}
                textInputStyle={{ color: "#DAD7CD", fontSize: 18 }}
                floatingLabel
                label="Phone Number"
                keyboardType="default"
                showErrorIcon={false}
                onChangeText={(phoneNumber) =>
                  setInput({ ...input, phoneNumber })
                }
                value={input.phoneNumber}
              />
            </Form>
          </View>
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
