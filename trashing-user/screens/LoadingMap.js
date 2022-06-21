import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { StyleSheet, Text, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingMap({ customerLocation }) {
  const mapRef = useRef();

  let text = "Waiting..";

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
