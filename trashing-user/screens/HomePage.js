import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseUrl } from "../baseUrl";
import AboutUs from "../components/AboutUs";

const winWidth = Dimensions.get("window").width;

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    imageUrl: "",
    basePrice: "",
  });

  const rupiahFormatter = (amount) => {
    let str = Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&.");
    str = str.substring(0, str.length - 3);
    return "Rp." + str;
  };

  useEffect(() => {
    fetch(`${baseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (modalVisible) {
    return (
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Image
              style={{ width: "90%", height: "40%", borderRadius: 20 }}
              source={{ uri: category.imageUrl }}
            />
            <Text
              style={{
                marginBottom: 15,
                textAlign: "center",
                marginTop: 5,
                fontWeight: "700",
                fontSize: 25,
                color: "#DAD7CD",
              }}
            >
              {category.name}
            </Text>
            <Text style={styles.modalLabel}>Description :</Text>
            <Text style={styles.modalText}>{category.description}</Text>
            <Text style={styles.modalLabel}>Buy price per kilogram :</Text>
            <Text style={styles.modalText}>
              {rupiahFormatter(category.basePrice)}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

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
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      setCategory({
                        name: item.name,
                        description: item.description,
                        imageUrl: item.imageUrl,
                        basePrice: item.basePrice,
                      });
                    }}
                  >
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{ width: 175, height: 175, borderRadius: 20 }}
                    />
                  </TouchableOpacity>
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
  modalView: {
    margin: 20,
    backgroundColor: "#344E41",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#588157",
  },
  textStyle: {
    color: "#DAD7CD",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 17,
    color: "#DAD7CD",
    textAlign: "justify",
  },
  modalLabel: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#A3B18A",
  },
});
