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

const windowWidth = Dimensions.get('window').width;

export default function OrderPage() {
  const [categories, setCategories] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [lclLocation, setLclLocation] = useState({});
  const [userData, setUserData] = useState({
    id: '',
    token: '',
  });

  useEffect(() => {
    fetch('https://33c2-125-165-31-194.ap.ngrok.io/categories')
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
    console.log(orderItems);
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
        // console.log('🚀 ~ file: OrderPage.js ~ line 95 ~ .then ~ data', data);
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
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: 20,
        }}
        source={require('../assets/images/TRASHING.png')}
      />
      {categories.map((category, index) => {
        return (
          <View
            style={{
              width: windowWidth,
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
              underlayColor="#00b4d8"
              style={{
                width: 140,
                height: 40,
                borderWidth: 2,
                borderRadius: 8,
                justifyContent: 'center',
                borderColor: 'white',
                backgroundColor: checkedState[index] ? '#03045E' : '#00b4d8',
              }}
            >
              <Text
                style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}
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
            width: 80,
            height: 50,
            borderRadius: 15,
            borderWidth: 3,
            borderColor: 'white',
          }}
          onPress={onSubmitHandler}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b4d8',
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
