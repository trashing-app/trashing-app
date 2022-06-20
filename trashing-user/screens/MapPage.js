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

export default function MapPage({ route }) {
  const GOOGLE_MAPS_APIKEY = "AIzaSyBEWG0xvmSUm3zyB-dZAzr_7cuJl_TgxTc";
  const baseUrl =
    "https://bb1a-2001-448a-4044-6908-74b9-8883-e2e8-277c.ap.ngrok.io";
  const { id } = route.params;
  const mapRef = useRef();
  const markerRef = useRef();
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
    // pickupCords: {
    //   latitude: -6.2,
    //   longitude: 106.816666,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // },
    currentLocation: {
      latitude: -7.797068,
      longitude: 110.370529,
    },
    customerLocation: false,
    collectorLocation: false,
    // {
    // latitude: -6.178306,
    // latitude: -7.840243,
    // longitude: 106.631889,
    // longitude: 110.408333,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    // },
    isLoading: false,
    // coordinate: new AnimatedRegion({
    //   ...currentLocation,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // }),
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState("Not Approved");

  useEffect(() => {
    // getLiveLocation();
    getCustomerLocation();
    console.log(state.customerLocation, "UPDATE LOKASI");

    const orderLocation = async () => {
      try {
        const access_token = await AsyncStorage.getItem("access_token");
        console.log(id, "ID");
        const { data } = await axios.get(`${baseUrl}/orders/${id}`, {
          headers: { access_token },
        });
        console.log(data, "ORDER LOCATION");
      } catch (error) {
        console.log(error);
      }
    };

    orderLocation().catch((error) => {
      console.log(error, "LINE 84");
    });
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
  }, []);

  const getCustomerLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let position = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = position.coords;
    console.log("get customer location");
    // animate(latitude, longitude);
    setState({
      ...state,
      customerLocation: {
        latitude: latitude,
        longitude: longitude,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
      },
    });
    setLocation(position);
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
    // console.log(data.location, "GET COLLECTOR LOCATION");
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
            console.log(data.collectorId, "CHANGE STATUS");
            getCollectorLocation(data.collectorId);
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
  if (customerLocation) {
    if (collectorLocation) {
      return (
        <AcceptedMap
          customerLocation={customerLocation}
          collectorLocation={collectorLocation}
        />
      );
    } else {
      return <LoadingMap customerLocation={customerLocation} />;
    }
  } else {
    return <Text>{text}</Text>;
  }

  // return (
  //   <View style={styles.container}>
  //     <MapView
  //       ref={mapRef}
  //       style={StyleSheet.absoluteFill}
  //       initialRegion={
  //         // pickupCords
  //         customerLocation
  //         // {
  //         //   ...currentLocation,
  //         //   // latitude: 37.78825,
  //         //   // longitude: -122.4324,
  //         //   latitudeDelta: 0.0922,
  //         //   longitudeDelta: 0.0421,
  //         // }
  //       }
  //     >
  //       {/* <Marker coordinate={pickupCords} /> */}
  //       <Marker coordinate={customerLocation}>
  //         <Image
  //           source={require("../assets/images/Person.png")}
  //           style={{ width: 40, height: 40 }}
  //         />
  //       </Marker>
  //       {/* <Marker.Animated
  //         ref={markerRef}
  //         coordinate={{
  //           ...currentLocation,
  //           // latitudeDelta: 0.0922,
  //           // longitudeDelta: 0.0421,
  //         }}
  //       >
  //         <Image
  //           source={require("../assets/images/MotorIcon.png")}
  //           style={{ width: 40, height: 40 }}
  //         />
  //       </Marker.Animated>
  //       <MapViewDirections
  //         // origin={pickupCords}
  //         origin={{
  //           ...currentLocation,
  //           latitudeDelta: 0.0922,
  //           longitudeDelta: 0.0421,
  //         }}
  //         destination={customerLocation}
  //         apikey={GOOGLE_MAPS_APIKEY}
  //         strokeWidth={3}
  //         strokeColor="hotpink"
  //         optimizeWaypoints={true}
  //         onReady={(result) => {
  //           mapRef.current.fitToCoordinates(result.coordinates, {
  //             edgePadding: {
  //               right: 30,
  //               bottom: 300,
  //               left: 30,
  //               top: 100,
  //             },
  //           });
  //         }}
  //       /> */}
  //     </MapView>
  //     {/* <Text>{text}</Text> */}
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
