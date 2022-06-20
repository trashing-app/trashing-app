import { useEffect, useState } from 'react';
import { Pressable, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import storage from '../storage';

export default function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [password, setPassword] = useState('');

  useEffect(() => {
    storage
      .load({
        key: 'loginState',
      })
      .then((ret) => {
        navigation.replace('ListOrder');
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

  const doLogin = async () => {
    try {
      const { data } = await axios.post(`https://c9ab-125-160-217-65.ap.ngrok.io/pub/users/login`, {
        email,
        password,
      });
      if (data.access_token) {
        const { id, username, email, access_token } = data;
        console.log('login success');
        storage.save({
          key: 'loginState',
          data: {
            id,
            name: username,
            email,
            photoUrl:
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            welcomeMessage: 'Hello',
            role: 'default',
            token: access_token,
          },
          expires: null,
        });
        navigation.navigate('tabnavigation');
        setEmail('');
        setPassword('');
      } else {
        throw 'login failed';
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#ffffff"
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            placeholder="Input email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#ffffff"
            style={styles.inputField}
            name="password"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            secureTextEntry={passwordVisibility}
            value={password}
            enablesReturnKeyAutomatically
            onChangeText={(text) => setPassword(text)}
          />
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={22} color="#ffffff" />
          </Pressable>
        </View>
        <TouchableOpacity
          style={{
            width: 130,
            height: 50,
            backgroundColor: '#00b4d8',
            justifyContent: 'center',
            marginVertical: 15,
            borderRadius: 15,
            marginHorizontal: '34%',
            borderColor: '#d7d7d7',
            borderWidth: 3,
          }}
          onPress={doLogin}
        >
          <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b4d8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 1,
  },
  inputContainer: {
    backgroundColor: '#00b4d8',
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d7d7d7',
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: '87%',
    color: '#ffffff',
  },
});
