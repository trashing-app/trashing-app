import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import storage from "../storage";
import { commitOrder } from "../constant/collectorFunction";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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
    commitOrder(loggedUser.token, order.id)
      .then((res) => {
        if (!res.ok) {
          ToastAndroid.showWithGravity(
            "Order is canceled",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          navigation.replace("TabNavigator");
          throw new Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
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
        backgroundColor: "#3A5A40",
      }}
    >
      <ScrollView>
        <Text
          style={{
            fontSize: 42,
            textAlign: "center",
            marginTop: "5%",
            color: "#A3B18A",
            marginBottom: -60,
          }}
        >
          Detail Order
        </Text>

        <View
          style={{
            marginTop: "20%",
            alignItems: "center",
            // backgroundColor: "blue",
          }}
        >
          <View
            style={{
              backgroundColor: "#A3B18A",
              width: (85 / 100) * width,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                marginTop: "7%",
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "red",
                }}
              >
                <View
                  style={{
                    // backgroundColor: "blue",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      borderWidth: 3,
                      borderColor: "#344E41",
                      width: 70,
                      height: 70,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 40,
                        color: "#344E41",
                      }}
                    >
                      {order.User.username[0].toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginLeft: "5%",
                    // backgroundColor: "red",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginBottom: "3%",
                      color: "#344E41",
                    }}
                  >
                    {order.User.username}
                  </Text>
                  <View
                    style={{
                      marginLeft: -10,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Entypo name="location-pin" size={24} color="#344E41" />
                    <Text
                      style={{
                        fontSize: 20,
                        marginBottom: "3%",
                        color: "#344E41",
                        marginHorizontal: "4%",
                      }}
                    >
                      {distance} Km
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      marginBottom: "3%",
                      color: "#344E41",
                    }}
                  >
                    {order.User.address}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  marginVertical: "5%",
                  color: "#344E41",
                }}
              >
                List Order Item
              </Text>
              {order.OrderItems.map((el) => {
                return (
                  <View
                    key={el.id}
                    style={{
                      backgroundColor: "#3A5A40",
                      marginBottom: "3%",
                      height: (15 / 100) * height,
                      width: "100%",
                      borderWidth: 3,
                      borderColor: "#A3B18A",
                      borderRadius: 15,
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "55%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#A3B18A",
                        }}
                      >
                        {el.Category.name}
                      </Text>
                    </View>
                    {/* {el.weight} Kg{" "}
                      {rupiahFormatter(el.weight * el.Category.basePrice)} */}
                    <View
                      style={{
                        width: "30%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{
                          uri: `${el.Category.imageUrl}`,
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 11,
                        }}
                      />
                    </View>
                  </View>
                );
              })}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: "5%",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 3,
                    width: "35%",
                    borderRadius: 12,
                    borderColor: "#344E41",
                    marginHorizontal: 10,
                  }}
                  onPress={() => {
                    handleCommitOrder();
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: "#344E41",
                      margin: 5,
                    }}
                  >
                    Accept
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 3,
                    borderRadius: 12,
                    width: "35%",
                    marginHorizontal: 10,
                    borderColor: "#344E41",
                  }}
                  onPress={goToListOrder}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: "#344E41",
                      margin: 5,
                    }}
                  >
                    Ignore
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailOrder;
