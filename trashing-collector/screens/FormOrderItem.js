import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { getOrderItems, updateOrderItem } from "../constant/collectorFunction";
import storage from "../storage";
import { useNavigation } from "@react-navigation/native";
import { completeOrder } from "../constant/collectorFunction";

function FormOrderItem({ route }) {
  // console.log(route);
  const [orderItems, setOrderItems] = useState([]);
  const [loggedUser, setLoggedUser] = useState({
    id: "",
    name: "",
    token: "",
  });
  const navigation = useNavigation();
  const [input, setInput] = useState({});

  function handlerOnChangeText(name, text) {
    // console.log(e);
    setInput({ ...input, [name]: text });
  }

  useEffect(() => {
    storage
      .load({
        key: "loginState",
      })
      .then((ret) => {
        setLoggedUser({
          id: ret.id,
          name: ret.name,
          token: ret.token,
        });
      })
      .catch((err) => {
        console.warn(err.message);
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
    getOrderItems(loggedUser.token, route.params.orderId)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setOrderItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit() {
    updateOrderItem(loggedUser.token, input, route.params.orderId)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((_) => {
        navigation.navigate("ListOrder");
        return completeOrder(loggedUser.token, route.params.orderId);
      })
      .then((_) => {})
      .catch((err) => {
        console.log(err);
      });
  }
  // console.log(input);
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          // borderWidth: 2,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginBottom: "8%",
          }}
        >
          Order Items
        </Text>
        <View
          style={{
            // borderWidth: 1,
            width: "80%",
          }}
        >
          {orderItems.map((el, index) => {
            return (
              <View
                key={el.id}
                style={{
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 20, marginLeft: 5 }}>
                  {el.Category.name}
                </Text>
                <Text style={{ fontSize: 20, marginLeft: 5 }}>Weight :</Text>
                <TextInput
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 5,
                    width: 100,
                    fontSize: 20,
                  }}
                  onChangeText={(text) =>
                    handlerOnChangeText(el.Category.id, text)
                  }
                  keyboardType={"number-pad"}
                />

                <Text style={{ fontSize: 20, marginLeft: 5 }}>
                  Total Price :
                </Text>
                <Text style={{ fontSize: 20, marginLeft: 5 }}>
                  {}
                  {+input[`${el.Category.id}`] * +el.Category.basePrice
                    ? +input[`${el.Category.id}`] * +el.Category.basePrice
                    : 0}
                </Text>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Complete Order", "Choose option", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => handleSubmit() },
            ]);
          }}
          style={{
            borderRadius: 15,
            borderWidth: 1,
            alignItems: "center",
            width: "80%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      {/* <TextInput
        placeholderTextColor="#ffffff"
        placeholder="Enter item price"
      /> */}
    </SafeAreaView>
  );
}

export default FormOrderItem;
