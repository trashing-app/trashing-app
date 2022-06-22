import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import storage from "../storage";

export default function LoadingMap({ customerLocation, orderId }) {
  const mapRef = useRef();
  const navigation = useNavigation();
  const baseUrl =
    "https://be07-2001-448a-4044-6908-f12a-6787-ab9f-977b.ap.ngrok.io";
  let text = "Waiting...";

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
        <Text style={{ fontSize: 17 }}>{text}</Text>
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
                Alert.alert(
                  "Cancel order?",
                  "You have an inactive order. Are you sure to cancel them?",
                  [
                    {
                      text: "Don't cancel",
                      style: "cancel",
                      onPress: () => {},
                    },
                    {
                      text: "Cancel order",
                      style: "destructive",
                      onPress: async () => {
                        try {
                          const ret = await storage.load({ key: "order" });
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
