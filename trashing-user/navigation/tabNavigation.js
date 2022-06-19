import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrderPage from '../screens/OrderPage.js';
import HomePage from '../screens/HomePage.js';
import storage from "../storage"
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function TabNavigation() {
  const navigation = useNavigation();
  useEffect(()=>{
    storage
    .load({
      key: 'loginState',
    })
    .then(ret => {
      console.log(ret.id, ret.name, ret.token)
    })
    .catch(err => {
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          navigation.navigate('LoginPage')
          break
        case 'ExpiredError':
          navigation.navigate('LoginPage')
          break
      }
    })
  },[])

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="OrderPage" component={OrderPage} />
    </Tab.Navigator>
  );
}
