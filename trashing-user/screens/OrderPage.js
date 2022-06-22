import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import storage from "../storage";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const winWidth = Dimensions.get("window").width;
const winHeight = Dimensions.get("window").height;
const baseUrl = "https://8a32-111-94-86-182.ap.ngrok.io";

export default function OrderPage() {
  const [categories, setCategories] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [lclLocation, setLclLocation] = useState({});
  const [userData, setUserData] = useState({
    id: "",
    token: "",
  });
  const navigation = useNavigation();
  const checkOrder = () => {
    storage
      .load({
        key: "order",
      })
      .then((ret) => {
        const { id, orderLocation } = ret;
        navigation.navigate("MapPage", { id, orderLocation });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    storage.remove({
      key: "order",
    });
    fetch(`${baseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setCheckedState(new Array(categories.length).fill(false));
  }, [categories]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    storage
      .load({
        key: "order",
      })
      .then((ret) => {
        Alert.alert(
          "You have unfinished order. Do you want to cancel them?",
          "Cancel order?",
          [
            {
              text: "Don't cancel",
              style: "cancel",
              onPress: () => {
                navigation.navigate("MapPage", {
                  id: ret.id,
                  orderLocation: ret.orderLocation,
                });
              },
            },
            {
              text: "To current order",
              style: "default",
              onPress: () => {
                navigation.navigate("MapPage", {
                  id: ret.id,
                  orderLocation: ret.orderLocation,
                });
              },
            },
            {
              text: "Cancel order",
              style: "destructive",
              onPress: async () => {
                try {
                  const access_token = await AsyncStorage.getItem(
                    "access_token"
                  );
                  const status = await axios.get(
                    `${baseUrl}/orders/${ret.id}`,
                    { headers: { access_token } }
                  );
                  if (status.data.approvalStatus === "Approved") {
                    Alert.alert(
                      "We are sorry, but you have an active order right now"
                    );
                    navigation.navigate("MapPage", {
                      id: ret.id,
                      orderLocation: ret.orderLocation,
                    });
                  } else {
                    const { data } = await axios.delete(
                      `${baseUrl}/orders/${ret.id}`,
                      { headers: { access_token } }
                    );
                    storage.remove({
                      key: "order",
                    });
                    ToastAndroid.showWithGravity(
                      "Order cancelled",
                      ToastAndroid.LONG,
                      ToastAndroid.CENTER
                    );
                    navigation.replace("tabnavigation");
                  }
                } catch (error) {
                  console.log(error);
                }
              },
            },
          ]
        );
      })
      .catch((err) => {
        const filtered = categories.filter(
          (el, index) => el && checkedState[index]
        );
        const orderItems = filtered.map((el) => {
          return {
            categoryId: el.id,
            description: el.description,
            price: 0,
            weight: 0,
          };
        });
        if (orderItems.length === 0) {
          ToastAndroid.showWithGravity(
            "Please choose at least one",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
        } else {
          const { latitude, longitude } = lclLocation.coords;
          const orderLocation = {
            latitude,
            longitude,
          };
          fetch(`${baseUrl}/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              access_token: userData.token,
            },
            body: JSON.stringify({
              orderItems,
              latitude,
              longitude,
            }),
          })
            .then((res) => res.json())
            .then((newOrder) => {
              const { id } = newOrder;
              storage.save({
                key: "order",
                data: {
                  id,
                  orderLocation,
                },
                expires: null,
              });
              navigation.navigate("MapPage", { id, orderLocation });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };

  const onChangeHandler = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  useEffect(() => {
    storage
      .load({
        key: "loginState",
      })
      .then((ret) => {
        setUserData({
          id: ret.id,
          token: ret.token,
        });
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

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let position = await Location.getCurrentPositionAsync({});

      setLclLocation(position);
    };
    getLocation();
  }, [userData.id]);

  useEffect(() => {
    checkOrder();
  }, [lclLocation]);

  return (
    <SafeAreaView style={styles.container}>
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
      <Text
        style={{
          fontSize: 20,
          color: "white",
          textAlign: "center",
          paddingBottom: 15,
        }}
      >
        What's your household waste?
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: "white",
          textAlign: "center",
          paddingBottom: 15,
        }}
      >
        (choose that is suitable)
      </Text>
      {categories.map((category, index) => {
        return (
          <View
            style={{
              width: winWidth,
              paddingHorizontal: 2,
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={category.id}
          >
            <TouchableHighlight
              onPress={() => onChangeHandler(index)}
              activeOpacity={0.6}
              underlayColor="#DAD7CD"
              style={{
                width: 200,
                height: 60,
                borderWidth: 2,
                borderRadius: 8,
                justifyContent: "center",
                borderColor: "white",
                backgroundColor: checkedState[index] ? "#3A5A40" : "#A3B18A",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#FFFFFF",
                  fontSize: 23,
                  fontWeight: "700",
                }}
              >
                {category.name}
              </Text>
            </TouchableHighlight>
          </View>
        );
      })}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 60,
            borderRadius: 15,
            borderWidth: 3,
            borderColor: "white",
            backgroundColor: "#3A5A40",
          }}
          onPress={onSubmitHandler}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#588157",
  },
  checkbox: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
  },
  taOpacity: {
    width: 120,
    height: 40,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: "center",
    borderColor: "white",
  },
});
