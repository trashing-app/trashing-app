import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Image,
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import LoadingMap from "./LoadingMap";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AcceptedMap from "./AcceptedMap";
import { useNavigation } from "@react-navigation/native";

export default function MapPage({ route }) {
  const GOOGLE_MAPS_APIKEY = "AIzaSyBEWG0xvmSUm3zyB-dZAzr_7cuJl_TgxTc";
  const baseUrl =
    "https://2235-2001-448a-4044-6908-754b-26cd-b980-5835.ap.ngrok.io";
  const { id, orderLocation } = route.params;
  // const mapRef = useRef();
  // const markerRef = useRef();
  // const animate = (latitude, longitude) => {
  //   const newCoordinate = { latitude, longitude };
  //   if ((Platform.OS = "android")) {
  //     if (markerRef.current) {
  //       markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
  //     }
  //   } else {
  //     coordinate.timing(newCoordinate).start();
  //   }
  // };
  const [state, setState] = useState({
    customerLocation: false,
    collectorLocation: false,
    isLoading: false,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState("Not Approved");
  const navigation = useNavigation();

  // useEffect(() => {
  // getLiveLocation();
  // getCustomerLocation();
  // console.log(state.customerLocation, "UPDATE LOKASI");
  // const orderLocation = async () => {
  //   try {
  //     const access_token = await AsyncStorage.getItem("access_token");
  //     console.log(id, "ID");
  //     const { data } = await axios.get(`${baseUrl}/orders/${id}`, {
  //       headers: { access_token },
  //     });
  //     console.log(data, "ORDER LOCATION");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // orderLocation().catch((error) => {
  //   console.log(error, "LINE 84");
  // });
  // setState({
  //   ...state,
  //   customerLocation: {
  //     // latitude: -6.178306,
  //     latitude: -7.840243,
  //     // longitude: 106.631889,
  //     longitude: 110.408333,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   },
  // });
  // console.log(state.currentLocation, "Current location");
  // }, []);

  const getCustomerLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let position = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = position.coords;
    // animate(latitude, longitude);
    console.log("get customer location");
    setState({
      ...state,
      customerLocation: {
        latitude: latitude,
        longitude: longitude,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
      },
    });
    const { rawData } = JSON.parse(await AsyncStorage.getItem("loginState"));
    const userId = rawData.id;
    // console.log(userId, "USER");
    // console.log(latitude, longitude);
    const update = await axios.patch(`${baseUrl}/users/location/${userId}`, {
      longitude,
      latitude,
    });
    // setLocation(position);
  };

  // const getLiveLocation = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     setErrorMsg("Permission to access location was denied");
  //     return;
  //   }

  //   let position = await Location.getCurrentPositionAsync({});
  //   const { latitude, longitude } = position.coords;
  //   console.log("get current location");
  //   animate(latitude, longitude);
  //   setState({
  //     ...state,
  //     currentLocation: {
  //       latitude: latitude,
  //       longitude: longitude,
  //     },
  //     coordinate: new AnimatedRegion({
  //       latitude: latitude,
  //       longitude: longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     }),
  //   });
  //   setLocation(position);
  // };

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
      /*
      check order status
      */
      let data = [];
      const getOrder = async () => {
        try {
          await getCustomerLocation();
          const access_token = await AsyncStorage.getItem("access_token");
          // console.log(id, "ID");
          const order = await axios.get(`${baseUrl}/orders/${id}`, {
            headers: { access_token },
          });
          data = order.data;
          // console.log(data, "Approval Status");
          if (approvalStatus === "Not Approved") {
            console.log(data.approvalStatus, "CHANGE STATUS");
            setApprovalStatus(data.approvalStatus);
          } else {
            if (data.orderStatus === "Completed") {
              await AsyncStorage.removeItem("order");
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
        console.log(error, "LINE 200");
      });
      // getLiveLocation();
    }, 5000);
    return () => clearInterval(interval);
  });

  const { customerLocation, currentLocation, collectorLocation } = state;
  if (orderLocation) {
    if (collectorLocation) {
      return (
        <AcceptedMap
          customerLocation={orderLocation}
          collectorLocation={collectorLocation}
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
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
