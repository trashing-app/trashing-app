import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import storage from '../storage';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

export default function OrderPage() {
  const [categories, setCategories] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [lclLocation, setLclLocation] = useState({});
  const [userData, setUserData] = useState({
    id: '',
    token: '',
  });
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://d5b9-114-122-23-77.ap.ngrok.io/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setCheckedState(new Array(categories.length).fill(false));
  }, [categories]);

  useEffect(() => {
    console.log(checkedState);
  }, [checkedState]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const filtered = categories.filter((el, index) => el && checkedState[index]);
    console.log(filtered);
    const orderItems = filtered.map((el) => {
      return {
        categoryId: el.id,
        description: el.description,
        price: 0,
        weight: 0,
      };
    });

    fetch('https://33c2-125-165-31-194.ap.ngrok.io/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: userData.token,
      },
      body: JSON.stringify({
        orderItems,
        latitude: lclLocation.location.coordinates[1],
        longitude: lclLocation.location.coordinates[0],
      }),
    });
  };

  const onChangeHandler = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  useEffect(() => {
    storage
      .load({
        key: 'loginState',
      })
      .then((ret) => {
        setUserData({
          id: ret.id,
          token: ret.token,
        });
      })
      .catch((err) => {
        switch (err.name) {
          case 'NotFoundError':
            navigation.navigate('LoginPage');
            break;
          case 'ExpiredError':
            navigation.navigate('LoginPage');
            break;
        }
      });
  }, []);

  useEffect(() => {
    fetch('https://33c2-125-165-31-194.ap.ngrok.io/users/location/' + userData.id)
      .then((res) => res.json())
      .then((data) => {
        setLclLocation(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData.id]);

  console.log(lclLocation);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          height: 170,
          alignItems: 'center',
          justifyContent: 'center',
          width: winWidth,
          marginTop: 20,
        }}
        source={require('../assets/images/TRASHING.png')}
      />
      {categories.map((category, index) => {
        return (
          <View
            style={{
              width: winWidth,
              paddingHorizontal: 2,
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={category.id}
          >
            <TouchableHighlight
              onPress={() => onChangeHandler(index)}
              activeOpacity={0.6}
              underlayColor="#DAD7CD"
              style={{
                width: 200,
                height: 60,
                borderWidth: 2,
                borderRadius: 8,
                justifyContent: 'center',
                borderColor: 'white',
                backgroundColor: checkedState[index] ? '#3A5A40' : '#A3B18A',
              }}
            >
              <Text
                style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 23, fontWeight: '700' }}
              >
                {category.name}
              </Text>
            </TouchableHighlight>
          </View>
        );
      })}
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 60,
            borderRadius: 15,
            borderWidth: 3,
            borderColor: 'white',
            backgroundColor: '#3A5A40',
          }}
          onPress={onSubmitHandler}
        >
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: '600' }}>
            Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#588157',
  },
  checkbox: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
  },
  taOpacity: {
    width: 120,
    height: 40,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    borderColor: 'white',
  },
});
