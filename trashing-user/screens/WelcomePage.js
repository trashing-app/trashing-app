import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AboutUs from '../components/AboutUs';

const dimWidth = Dimensions.get('window').width;

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          style={{
            marginTop: 20,
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          source={require('../assets/images/TRASHING.png')}
        />
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            width: dimWidth,
            paddingHorizontal: 20,
            textAlign: 'center',
            color: '#caf0f8',
          }}
        >
          Your solution to dispose of your household waste
        </Text>
        <StatusBar style="auto" />
        <AboutUs />
        <View style={styles.bottomCenter}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 60,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#caf0f8', fontSize: 18 }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
                <Text style={{ color: '#03045e', textDecorationLine: 'underline', fontSize: 18 }}>
                  Login
                </Text>
              </TouchableOpacity>
              <Text style={{ color: '#caf0f8', fontSize: 18 }}> here! </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ color: '#caf0f8', fontSize: 18 }}>or </Text>
              <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
                <Text style={{ color: '#03045e', textDecorationLine: 'underline', fontSize: 18 }}>
                  Register
                </Text>
              </TouchableOpacity>
              <Text style={{ color: '#caf0f8', fontSize: 18 }}> now!</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b4d8',
    alignItems: 'center',
  },
});
