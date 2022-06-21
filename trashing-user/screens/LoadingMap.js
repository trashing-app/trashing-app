import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import storage from "../storage";

export default function LoadingMap({ customerLocation, orderId }) {
  const mapRef = useRef();
  const navigation = useNavigation();
  let text = "Waiting..";

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
        <Marker coordinate={customerLocation}>
          <Image
            source={require("../assets/images/greenMarker.png")}
            style={{ width: 40, height: 40 }}
          />
        </Marker>
        <Text>{text}</Text>
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
            onPress={async () => {
              try {
                const access_token = await AsyncStorage.getItem("access_token");
                const { data } = await axios.delete(
                  `https://be07-2001-448a-4044-6908-f12a-6787-ab9f-977b.ap.ngrok.io/orders/${orderId}`,
                  { headers: { access_token } }
                );
                storage.remove({
                  key: "order",
                });
                console.log("CANCEL ORDER");
                navigation.replace("OrderPage");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Text>Cancel Order</Text>
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
