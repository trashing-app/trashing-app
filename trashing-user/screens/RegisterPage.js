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
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { SafeAreaView } from 'react-native-safe-area-context';


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
    fetch('https://0372-125-165-31-194.ap.ngrok.io/pub/users/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then((response) => {
        if (response.status == 400) {
          throw { message: 'Please check your input' };
        }
        navigation.replace('LoginPage');
        ToastAndroid.showWithGravity(
          'Registered Successfully',
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      })
      .catch((err) => {
        ToastAndroid.showWithGravity(`${err.message}`, ToastAndroid.SHORT, ToastAndroid.CENTER);
      });
  };

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
            }}
            source={require("../assets/images/TRASHING.png")}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              onChangeText={(username) => setInput({ ...input, username })}
              placeholder="Username"
              keyboardType="default"
              placeholderTextColor="#ffffff"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              onChangeText={(email) => setInput({ ...input, email })}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#ffffff"
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
              placeholderTextColor="#ffffff"
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                name={rightIcon}
                size={22}
                color="#caf0f8"
              />
            </Pressable>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="#ffffff"
              style={styles.inputField}
              onChangeText={(address) => setInput({ ...input, address })}
              placeholder="Address"
              keyboardType="default"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="#ffffff"
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
              backgroundColor: "#00b4d8",
              justifyContent: "center",
              marginVertical: 15,
              borderRadius: 15,
              marginHorizontal: "34%",
              borderColor: "#caf0f8",
              borderWidth: 3,
            }}
            onPress={doRegister}
          >
            <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>
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
});
