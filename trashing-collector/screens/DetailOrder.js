import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import storage from "../storage";
import { commitOrder } from "../constant/collectorFunction";
import { useEffect, useState } from "react";
function DetailOrder({ route }) {
  const { order, distance } = route.params;
  // console.log(order, "<<<<<");
  const [loggedUser, setLoggedUser] = useState({
    id: "",
    name: "",
    token: "",
  });

  //navigation guard
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
        console.log(ret.id, ret.name, ret.token);
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

  const rupiahFormatter = (amount) => {
    let str = Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&.");
    str = str.substring(0, str.length - 3);
    return "Rp." + str;
  };

  const navigation = useNavigation();

  function handleCommitOrder() {
    commitOrder(loggedUser.token, loggedUser.id)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        navigation.navigate("HomePage", {
          longitude: order.location.coordinates[0],
          latitude: order.location.coordinates[1],
          orderId: order.id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function goToListOrder() {
    navigation.navigate("ListOrder");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          marginTop: "50%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Username: {order.User.username}
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Distance: {distance} Km
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Address: {order.User.address}
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          List Order Item :
        </Text>
        {order.OrderItems.map((el) => {
          return (
            <View key={el.id}>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {el.Category.name} {el.weight} Kg{" "}
                {rupiahFormatter(el.weight * el.Category.basePrice)}
              </Text>
            </View>
          );
        })}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 3,
              width: "15%",
              marginHorizontal: 10,
            }}
            onPress={() => {
              handleCommitOrder();
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 3,
              width: "15%",
              marginHorizontal: 10,
            }}
            onPress={goToListOrder}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default DetailOrder;
