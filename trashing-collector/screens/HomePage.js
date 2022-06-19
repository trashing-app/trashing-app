import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import imagePath from "../constant/imagePath";
import * as Location from "expo-location";
const GOOGLE_MAPS_APIKEY = "AIzaSyBEWG0xvmSUm3zyB-dZAzr_7cuJl_TgxTc";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function HomePage() {
  const [location, setLocation] = useState({
    coords: {
      latitude: "",
      longitude: "",
    },
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mapRef = useRef();
  const [state, setState] = useState({
    pickUpCord: {
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    destinationCord: {
      latitude: 30.7046,
      longitude: 77.1125,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  });
  const { pickUpCord, destinationCord } = state;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setState({
        ...state,
        pickUpCord: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        destinationCord: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      });
      // console.log("5 detik");
      setIsLoading(true);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setState({
          ...state,
          pickUpCord: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
        setIsLoading(true);
      })();
    }, 10000);
    return () => clearInterval(interval);
  });

  if (!isLoading && location) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={pickUpCord}>
        <Marker coordinate={pickUpCord} image={imagePath.icCurLoc} />
        {/* 
        <Marker coordinate={destinationCord} image={imagePath.icGreenMarker} /> */}
        <Marker
          image={imagePath.icGreenMarker}
          onPress={() => {
            console.log("hai");
            Alert.alert("Destination", "Choose this location", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
            setState({
              ...state,
              destinationCord: {
                latitude: -4.1358869,
                longitude: 104.178226,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
            });
          }}
          coordinate={{
            latitude: -4.1358869,
            longitude: 104.178226,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        />
        <Marker
          image={imagePath.icGreenMarker}
          onPress={() => {
            console.log("hai2");
            Alert.alert("Destination", "Choose this location", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
            setState({
              ...state,
              destinationCord: {
                latitude: -4.1358869,
                longitude: 104.179226,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
            });
          }}
          coordinate={{
            latitude: -4.1358869,
            longitude: 104.179226,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        />

        <MapViewDirections
          origin={pickUpCord}
          destination={destinationCord}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          optimizeWaypoints={true}
          onReady={(result) => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                // right: 30,
                // bottom: 300,
                // left: 30,
                // top: 100,
              },
            });
          }}
        />
      </MapView>
      {/* <View
        style={{
          width: "100%",
          height: "10%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 10,
            borderWidth: 3,
            alignItems: "center",
            justifyContent: "center",
            width: "75%",
            height: "75%",
          }}
          onPress={() => {
            goToChooseLocation();
          }}
        >
          <Text>Choose Location</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
});
