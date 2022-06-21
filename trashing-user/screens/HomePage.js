import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(
      "https://be07-2001-448a-4044-6908-f12a-6787-ab9f-977b.ap.ngrok.io/categories"
    )
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const rupiahFormatter = (amount) => {
    let str = Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&.");
    str = str.substring(0, str.length - 3);
    return "Rp." + str;
  };

  return (
    <SafeAreaView style={styles.centeredView}>
      <Image
        style={{
          height: 70,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginBottom: 200,
        }}
        source={require("../assets/images/TRASHING.png")}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {categories.map((category, index) => {
              return (
                <View style={{ margin: 10, textAlign: "left" }} key={index}>
                  <Text style={{ textAlign: "left" }}>
                    {index + 1}. {category.name} :{" "}
                    {rupiahFormatter(category.basePrice)}
                  </Text>
                  <Text>{category.description}</Text>
                </View>
              );
            })}
            <Pressable
              style={{
                backgroundColor: "#2196F3",
                width: 70,
                borderRadius: 10,
                marginTop: 10,
                height: 30,
                justifyContent: "center",
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.buttonOpen1, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>View Categories</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00b4d8",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  buttonOpen1: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "35%",
    marginBottom: 70,
  },
  buttonOpen: {
    backgroundColor: "#0077b6",
  },
  buttonClose: {
    backgroundColor: "#0077b6",
    width: "35%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
