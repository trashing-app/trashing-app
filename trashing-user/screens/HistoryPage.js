import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseUrl } from "../baseUrl";
import storage from "../storage";
import { FontAwesome5 } from "@expo/vector-icons";
const winWidth = Dimensions.get("window").width;

export default function HistoryPage() {
  const [id, setId] = useState("");
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    storage
      .load({
        key: "loginState",
      })
      .then((ret) => {
        setId(ret.id);
        navigation.navigate("tabnavigation");
      })
      .catch((err) => {
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

  useEffect(() => {
    if (id) {
      fetch(`${baseUrl}/histories/` + id)
        .then((response) => response.json())
        .then((data) => {
          setHistories(data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <SafeAreaView style={styles.centeredView}>
      <Image
        style={{
          height: 170,
          alignItems: "center",
          justifyContent: "center",
          width: winWidth,
          marginBottom: -20,
        }}
        source={require("../assets/images/TRASHING.png")}
      />
      <Text style={{ fontSize: 30, color: "#DAD7CD", marginBottom: 20 }}>
        Histories
      </Text>
      <FlatList
        data={histories}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: winWidth * 0.92,
                // justifyContent: "center",
              }}
            >
              <View
                style={{
                  marginLeft: winWidth * 0.15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5
                    name="money-bill-wave-alt"
                    size={24}
                    color="#344E41"
                  />
                  <Text
                    style={{
                      color: "#DAD7CD",
                      fontSize: 19,
                      paddingHorizontal: 3,
                      marginVertical: 10,
                      textAlign: "left",
                      marginLeft: 10,
                      // borderBottomWidth: 2,
                      // borderBottomColor: "#344E41",
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        listKey={(item) => item.id}
        ListFooterComponent={
          <View style={{ marginBottom: 40 }}>
            <Text style={styles.footerText}>- End of Histories -</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#588157",
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
    fontWeight: "500",
    color: "#344E41",
  },
});
