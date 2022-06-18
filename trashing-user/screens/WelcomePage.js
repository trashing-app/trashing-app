import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AboutUs from '../components/AboutUs';

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 30, backgroundColor: 'blue', marginTop: '40%' }}>Trashing</Text>
      <Text
        style={{
          fontSize: 18,
          backgroundColor: 'black',
          color: 'white',
          marginTop: 10,
          width: 390,
          textAlign: 'center',
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
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Login </Text>
            </TouchableOpacity>
            <Text>here! </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text>or </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Register </Text>
            </TouchableOpacity>
            <Text>now!</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});
