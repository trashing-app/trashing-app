import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import * as Location from "expo-location";
import LoadingMap from "./LoadingMap";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AcceptedMap from "./AcceptedMap";
import { useNavigation } from "@react-navigation/native";

export default function MapPage({ route }) {
  const baseUrl =
    "https://2235-2001-448a-4044-6908-754b-26cd-b980-5835.ap.ngrok.io";
  const { id, orderLocation } = route.params;

  const [state, setState] = useState({
    customerLocation: false,
    collectorLocation: false,
    isLoading: false,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState("Not Approved");
  const navigation = useNavigation();

  const getCustomerLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let position = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = position.coords;
    console.log("get customer location");
    setState({
      ...state,
      customerLocation: {
        latitude: latitude,
        longitude: longitude,
      },
    });
    const { rawData } = JSON.parse(await AsyncStorage.getItem("loginState"));
    const userId = rawData.id;
    const update = await axios.patch(`${baseUrl}/users/location/${userId}`, {
      longitude,
      latitude,
    });
  };

  const getCollectorLocation = async (collectorId) => {
    const { data } = await axios.get(`${baseUrl}/collectors/${collectorId}`);
    console.log(data.location, "GET COLLECTOR LOCATION");
    const [longitude, latitude] = data.location.coordinates;
    setState({
      ...state,
      collectorLocation: {
        latitude,
        longitude,
      },
    });
  };

  let text = "Loading..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("UPDATING....");
      let data = [];
      const getOrder = async () => {
        try {
          await getCustomerLocation();
          const access_token = await AsyncStorage.getItem("access_token");
          const order = await axios.get(`${baseUrl}/orders/${id}`, {
            headers: { access_token },
          });
          data = order.data;
          if (approvalStatus === "Not Approved") {
            console.log(data.approvalStatus, "CHANGE STATUS");
            setApprovalStatus(data.approvalStatus);
          } else {
            if (data.orderStatus === "Completed") {
              navigation.navigate("tabnavigation");
            } else {
              console.log(data.collectorId, "COLLECTOR ID");
              getCollectorLocation(data.collectorId);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };

      getOrder().catch((error) => {
        console.log(error, "LINE 108");
      });
    }, 5000);
    return () => clearInterval(interval);
  });

  const { collectorLocation } = state;
  if (orderLocation) {
    if (collectorLocation) {
      return (
        <AcceptedMap
          customerLocation={orderLocation}
          collectorLocation={collectorLocation}
          orderId={id}
        />
      );
    } else {
      return <LoadingMap customerLocation={orderLocation} />;
    }
  } else {
    return <Text>{text}</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
