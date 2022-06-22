
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AboutUs from "../components/AboutUs";

const winWidth = Dimensions.get("window").width;

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    fetch("https://033b-2001-448a-10a8-3a9f-8ce7-e4ec-1320-8a66.ap.ngrok.io/categories")
=======

    fetch("https://8a32-111-94-86-182.ap.ngrok.io/categories")
>>>>>>> c4dc90da072d2b51bda1a88ed5fce70974146dda
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const rupiahFormatter = (amount) => {
    let str = Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&.");
    str = str.substring(0, str.length - 3);
    return "Rp." + str;
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#588157",
        }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.centeredView}>
        <ScrollView>
          <Image
            style={{
              height: 170,
              alignItems: "center",
              justifyContent: "center",
              width: winWidth,
              marginTop: -30,
              marginBottom: 10,
            }}
            source={require("../assets/images/TRASHING.png")}
          />
          <AboutUs />
          <Text
            style={{
              marginBottom: 19,
              fontSize: 30,
              fontWeight: "600",
              textAlign: "center",
              color: "#DAD7CD",
            }}
          >
            Categories
          </Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => {
              return (
                <View style={{ marginHorizontal: 10, paddingBottom: 10 }}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: 175, height: 175, borderRadius: 20 }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#DAD7CD",
                      fontSize: 15,
                      fontWeight: "600",
                      marginTop: 5,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              );
            }}
            horizontal={true}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#588157",
  },
});
