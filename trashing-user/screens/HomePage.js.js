import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import storage from "../storage";
import { useEffect } from "react";

export default function HomePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const categories = ['Plastik', 'Sampah Kering', 'Sampah Basah'];
  const navigation = useNavigation();
  useEffect(() => {
    storage
      .load({
        key: "loginState",
      })
      .then((ret) => {
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

  function clickLogout() {
    storage.remove({
      key: "loginState",
    });
    navigation.navigate("LoginPage");
  }
  
  return (
    <SafeAreaView style={styles.centeredView}>
      <Image
        style={{
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: 20,
          marginBottom: 240,
        }}
        source={require('../assets/images/TRASHING.png')}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {categories.map((category, index) => {
              return (
                <View key={index}>
                  <Text style={{ margin: 10 }}>{category}</Text>
                </View>
              );
            })}
            <Pressable
              style={{ backgroundColor: '#2196F3', width: 70, borderRadius: 10, marginTop: 10 }}
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
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b4d8',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    width: '35%',
  },
  buttonOpen: {
    backgroundColor: '#0077b6',
  },
  buttonClose: {
    backgroundColor: '#0077b6',
    width: '35%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
