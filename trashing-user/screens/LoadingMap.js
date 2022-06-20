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
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingMap({ customerLocation }) {
  const GOOGLE_MAPS_APIKEY = "AIzaSyBEWG0xvmSUm3zyB-dZAzr_7cuJl_TgxTc";

  const mapRef = useRef();
  const markerRef = useRef();
  console.log("LOADING....");
  //   const animate = (latitude, longitude) => {
  //     const newCoordinate = { latitude, longitude };
  //     if ((Platform.OS = "android")) {
  //       if (markerRef.current) {
  //         markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
  //       }
  //     } else {
  //       coordinate.timing(newCoordinate).start();
  //     }
  //   };
  //   const [state, setState] = useState({
  //     pickupCords: {
  //       latitude: -6.2,
  //       longitude: 106.816666,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     },
  //     currentLocation: {
  //       latitude: -7.797068,
  //       longitude: 110.370529,
  //     },
  //     customerLocation: {
  //       // latitude: -6.178306,
  //       latitude: -7.840243,
  //       // longitude: 106.631889,
  //       longitude: 110.408333,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     },
  //     isLoading: false,
  //     coordinate: new AnimatedRegion({
  //       ...currentLocation,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     }),
  //   });

  //   const [location, setLocation] = useState(null);
  //   const [errorMsg, setErrorMsg] = useState(null);
  //   useEffect(() => {
  //     getLiveLocation();
  //     // setState({
  //     //   ...state,
  //     //   customerLocation: {
  //     //     // latitude: -6.178306,
  //     //     latitude: -7.840243,
  //     //     // longitude: 106.631889,
  //     //     longitude: 110.408333,
  //     //     latitudeDelta: 0.0922,
  //     //     longitudeDelta: 0.0421,
  //     //   },
  //     // });
  //     console.log(state.currentLocation);
  //   }, []);

  //   const getLiveLocation = async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let position = await Location.getCurrentPositionAsync({});
  //     const { latitude, longitude } = position.coords;
  //     console.log("get current location");
  //     animate(latitude, longitude);
  //     setState({
  //       ...state,
  //       currentLocation: {
  //         latitude: latitude,
  //         longitude: longitude,
  //       },
  //       coordinate: new AnimatedRegion({
  //         latitude: latitude,
  //         longitude: longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       }),
  //     });
  //     setLocation(position);
  //   };

  let text = "Waiting..";
  //   if (errorMsg) {
  //     text = errorMsg;
  //   } else if (location) {
  //     text = JSON.stringify(location);
  //   }

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       console.log("UPDATING....");
  //       getLiveLocation();
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   });

  //   const { pickupCords, customerLocation, currentLocation, coordinate } = state;

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={
          // pickupCords
          {
            ...customerLocation,
            // ...currentLocation,
            // latitude: 37.78825,
            // longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
      >
        {/* <Marker coordinate={pickupCords} /> */}
        <Marker coordinate={customerLocation}>
          <Image
            source={require("../assets/images/greenMarker.png")}
            style={{ width: 40, height: 40 }}
          />
        </Marker>
        <Text>{text}</Text>
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
