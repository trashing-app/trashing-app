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
import storage from "../storage";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../constant/baseUrl";
const GOOGLE_MAPS_APIKEY = "AIzaSyBEWG0xvmSUm3zyB-dZAzr_7cuJl_TgxTc";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function HomePage({ route }) {
  const navigation = useNavigation();
  const [loggedUser, setLoggedUser] = useState({
    id: "",
    name: "",
    token: "",
  });
  const [order, setOrder] = useState({});
  const [localLocation, setLocalLocation] = useState({
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
      setLocalLocation(location);

      setState({
        ...state,
        pickUpCord: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        destinationCord: {
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      });
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
        setLocalLocation(location);
        setState({
          ...state,
          pickUpCord: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          destinationCord: {
            latitude: route.params.latitude,
            longitude: route.params.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
        setIsLoading(true);
      })();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  function onChat() {
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
      .then((res) => {
        // setOrder(res)
        navigation.navigate("Chat", { order: res });
      })
      .catch((error) => console.log(error));
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

  if (!isLoading && localLocation) {
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

        <Marker image={imagePath.icGreenMarker} coordinate={destinationCord} />

        <MapViewDirections
          origin={pickUpCord}
          destination={destinationCord}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          optimizeWaypoints={true}
          onReady={(result) => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {},
            });
          }}
        />
      </MapView>
      <View
        style={{
          flex: 0.1,
          paddingVertical: "5%",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: "70%",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "40%",
              borderRadius: 15,
              borderWidth: 3,
              height: "100%",
              marginHorizontal: "5%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              navigation.navigate("FormOrderItem", {
                orderId: route.params.orderId,
              });
            }}
          >
            <Text>Input Order Item</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "40%",
              borderRadius: 15,
              borderWidth: 3,
              height: "100%",
              marginHorizontal: "5%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onChat}
          >
            <Text>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 0.9,
  },
});
