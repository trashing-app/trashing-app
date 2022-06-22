import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Alert,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import {
  changeStatusPayment,
  getOrderItems,
  topUpBalanceUser,
  updateOrderItem,
} from "../constant/collectorFunction";
import storage from "../storage";
import { useNavigation } from "@react-navigation/native";
import { completeOrder } from "../constant/collectorFunction";
import { baseUrl } from "../constant/baseUrl";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

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
  const [order, setOrder] = useState({});
  // const [sum, setSum] = useState(0);
  function handlerOnChangeText(name, text) {
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
    if (loggedUser.token) {
      fetch(`${baseUrl}/orders/${route.params.orderId}`, {
        headers: {
          "Content-type": "application/json",
          access_token: loggedUser.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error");
          }
          return res.json();
        })
        .then((data) => {
          setOrder(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedUser.token]);

  useEffect(() => {
    if (loggedUser.token) {
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
    }
  }, [loggedUser.token]);

  function handleSubmit() {
    // console.log(loggedUser, input, route.params.orderId);
    updateOrderItem(loggedUser.token, input, route.params.orderId)
      .then((_) => {
        return completeOrder(loggedUser.token, route.params.orderId);
      })
      .then((_) => {
        let sum = 0;
        for (const key in input) {
          orderItems.forEach((e) => {
            if (e.categoryId == key) {
              sum += input[key] * e.Category.basePrice;
            }
          });
        }
        return topUpBalanceUser(loggedUser.token, order.userId, sum);
      })
      .then((_) => {
        return changeStatusPayment(loggedUser.token, order.id);
      })
      .then((_) => {
        ToastAndroid.showWithGravity(
          "Order completed",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        navigation.navigate("ListOrder");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // console.log(input);
  return (
    <SafeAreaView>
      <View
        style={{
          height: height,
          alignItems: "center",

          backgroundColor: "#588157",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            marginVertical: "8%",
          }}
        >
          Order Items
        </Text>
        <View
          style={{
            // borderWidth: 1,
            width: "80%",
            borderRadius: 10,
            backgroundColor: "#3A5A40",
          }}
        >
          <View
            style={{
              marginTop: "10%",
              // backgroundColor: "red",
            }}
          >
            {orderItems.map((el, index) => {
              return (
                <View
                  key={el.id}
                  style={{
                    marginLeft: "8%",
                    marginBottom: "7%",
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
                      width: (50 / 100) * width,
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
          <View
            style={{
              alignItems: "center",
              marginVertical: "8%",
            }}
          >
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
                borderRadius: 12,
                borderWidth: 1,
                alignItems: "center",
                width: "80%",
                backgroundColor: "#A3B18A",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "#DAD7CD",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <TextInput
        placeholderTextColor="#ffffff"
        placeholder="Enter item price"
      /> */}
    </SafeAreaView>
  );
}

export default FormOrderItem;
