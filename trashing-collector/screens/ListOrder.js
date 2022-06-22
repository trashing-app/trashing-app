import { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
import storage from "../storage";
import {
  getAllOrder,
  getCurrLocationOrder,
  updateLocationC,
} from "../constant/collectorFunction";
import imagePath from "../constant/imagePath";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function ListOrder() {
  const [loggedUser, setLoggedUser] = useState({
    id: "",
    name: "",
    token: "",
  });
  const [orders, setOrders] = useState([]);
  const [localLocation, setLocalLocation] = useState({
    coords: {
      latitude: "",
      longitude: "",
    },
  });
  const [allOrder, setAllOrder] = useState([]);

  const navigation = useNavigation();

  // function hitung distance
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return Math.round(d * 100) / 100;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  // get all orders
  useEffect(() => {
    if (loggedUser.token) {
      if (orders) {
        getAllOrder(loggedUser.token)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Error");
            }
            return res.json();
          })
          .then((data) => {
            const orderId = orders.map((el) => {
              return +el.id;
            });
            const result = data.filter(function (el) {
              return this.indexOf(el.id) != -1;
            }, orderId);
            setAllOrder(result);
            // console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [orders]);

  // ini get nearestOrder
  useEffect(() => {
    if (loggedUser.token) {
      getCurrLocationOrder(
        loggedUser.token,
        localLocation.coords.longitude,
        localLocation.coords.latitude
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error");
          }
          return res.json();
        })
        .then((data) => {
          // console.log(data, "lalala");
          setOrders(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [localLocation]);

  // ini get nearestOrder
  useEffect(() => {
    if (loggedUser.token) {
      const interval = setInterval(() => {
        // console.log(localLocation, "ini locallocation");
        getCurrLocationOrder(
          loggedUser.token,
          localLocation.coords.longitude,
          localLocation.coords.latitude
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("Error");
            }
            return res.json();
          })
          .then((data) => {
            // console.log(data);
            setOrders(data);
            // console.log("5 dtk");
          })
          .catch((err) => {
            console.log(err);
          });
      }, 60000);
      return () => clearInterval(interval);
    }
  });

  // ini get current loc collector
  useEffect(() => {
    if (loggedUser.token) {
      const interval = setInterval(() => {
        // console.log("dimana");
        (async () => {
          // console.log(localLocation, "ini locallocation");
          let { status } = await Location.requestForegroundPermissionsAsync();
          // console.log(status);
          if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          // console.log(location, "ini lho");
          setLocalLocation(location);
          updateLocationC(
            loggedUser.token,
            loggedUser.id,
            location.coords.latitude,
            location.coords.longitude
          )
            .then((res) => {
              if (!res.ok) {
                throw new Error("Error");
              }
              return res.json();
            })
            .then((_) => {
              // console.log("10 detik");
            })
            .catch((err) => {
              console.log(err, "<<<11");
            });
        })();
      }, 10000);
      return () => clearInterval(interval);
    }
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

  if (!loggedUser.token) {
    return (
      <Text style={{ marginTop: "50%", paddingHorizontal: "50%" }}>
        Loading...
      </Text>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#588157",
        width: width,
        height: height,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          // backgroundColor: "green",
        }}
      >
        <Image
          source={imagePath.logo}
          style={{
            width: width,
            height: (20 / 100) * height,
            marginBottom: -30,
          }}
        />
        <Text
          style={{
            textAlign: "center",
            marginBottom: "10%",
            fontSize: 30,
            marginBottom: "10%",
            color: "#DAD7CD",
          }}
        >
          Get Your Order
        </Text>
        <View
          style={{
            // flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            // flexWrap: "wrap",
            alignItems: "center",
            // backgroundColor: "red",
            height: "100%",
          }}
        >
          {allOrder.map((el) => {
            return (
              <View
                key={el.id}
                style={{
                  width: "85%",
                  height: (25 / 100) * height,
                  marginVertical: "3%",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderColor: "#DAD7CD",
                    borderWidth: 3,
                    alignItems: "center",
                    marginBottom: 20,
                    borderRadius: 12,
                    height: "100%",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("DetailOrder", {
                      order: el,
                      distance: getDistanceFromLatLonInKm(
                        localLocation.coords.latitude,
                        localLocation.coords.longitude,
                        el.location.coordinates[1],
                        el.location.coordinates[0]
                      ),
                    });
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      flexDirection: "row",
                      backgroundColor: "#344E41",
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        height: "100%",
                        // backgroundColor: "red",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome5
                        name="people-carry"
                        size={30}
                        color="#DAD7CD"
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          color: "#DAD7CD",
                        }}
                      >
                        {el.User.username}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Entypo name="location-pin" size={30} color="#DAD7CD" />
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#DAD7CD",
                          }}
                        >
                          {getDistanceFromLatLonInKm(
                            localLocation.coords.latitude,
                            localLocation.coords.longitude,
                            el.location.coordinates[1],
                            el.location.coordinates[0]
                          )}{" "}
                          Km
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#DAD7CD",
                          }}
                        >
                          {el.User.address}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#DAD7CD",
                          }}
                        >
                          Total items: {el.OrderItems.length}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "50%",
                      }}
                    >
                      <Image
                        source={{
                          uri: "https://media.suara.com/pictures/653x366/2018/08/15/39804-ojek-online.jpg",
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderTopRightRadius: 12,
                          borderBottomRightRadius: 12,
                        }}
                        resizeMode="cover"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default ListOrder;
