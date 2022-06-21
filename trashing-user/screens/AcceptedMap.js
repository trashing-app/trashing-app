import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function AcceptedMap({
  customerLocation,
  collectorLocation,
  orderId,
}) {
  const GOOGLE_MAPS_APIKEY = "AIzaSyBEWG0xvmSUm3zyB-dZAzr_7cuJl_TgxTc";
  const mapRef = useRef();
  const markerRef = useRef();
  console.log("ACCEPTED....");
  const navigation = useNavigation();
  let text = "Editing...";

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          ...customerLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            ...customerLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Image
            source={require("../assets/images/greenMarker.png")}
            style={{ width: 40, height: 40 }}
          />
        </Marker>
        <Marker.Animated
          ref={markerRef}
          coordinate={{
            ...collectorLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Image
            source={require("../assets/images/icon2.jpg")}
            style={{ width: 40, height: 40 }}
          />
        </Marker.Animated>
        <MapViewDirections
          // origin={pickupCords}
          origin={{
            ...collectorLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          destination={{
            ...customerLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={(result) => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100,
              },
            });
          }}
        />
      </MapView>
      {/* <Text>{text}</Text> */}
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
            onPress={async () => {
              try {
                // const order = JSON.parse(await AsyncStorage.getItem("order"));
                const access_token = await AsyncStorage.getItem("access_token");
                //   const id = data.id;
                // console.log(id);
                // console.log(latitude, longitude, "coordinate");
                // console.log(order, "ACCEPTED MAP");
                const { data } = await axios.get(
                  `https://2235-2001-448a-4044-6908-754b-26cd-b980-5835.ap.ngrok.io/orders/${orderId}`,
                  { headers: { access_token } }
                );
                navigation.navigate("Chat", { data, access_token });
              } catch (error) {
                console.log(error);
              }
            }}
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    flex: 0.9,
  },
});
