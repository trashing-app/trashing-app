import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
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
  const navigation = useNavigation();

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
            source={require("../assets/images/motorbike.jpg")}
            style={styles.marker}
          />
        </Marker.Animated>
        <MapViewDirections
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
      <View
        style={{
          flex: 0.1,
          paddingVertical: "5%",
          justifyContent: "center",
          backgroundColor: "#588157",
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
              backgroundColor: "#DAD7CD",
            }}
            onPress={async () => {
              try {
                const access_token = await AsyncStorage.getItem("access_token");
                const { data } = await axios.get(
                  `https://be07-2001-448a-4044-6908-f12a-6787-ab9f-977b.ap.ngrok.io/orders/${orderId}`,
                  { headers: { access_token } }
                );
                navigation.navigate("Chat", { data });
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
  },
  map: {
    flex: 0.9,
  },
  marker: {
    width: 40,
    height: 40,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
