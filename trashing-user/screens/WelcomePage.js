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

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          style={{
            height: 170,
            alignItems: 'center',
            justifyContent: 'center',
            width: winWidth,
            marginTop: winHeight * 0.2,
          }}
          source={require('../assets/images/TRASHING.png')}
        />
        <Text
          style={{
            fontSize: 20,
            width: winWidth,
            paddingHorizontal: 10,
            textAlign: 'center',
            color: '#DAD7CD',
          }}
        >
          Your solution to dispose of your household waste
        </Text>
        <StatusBar style="auto" />
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: winHeight * 0.1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                width: winWidth,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  marginHorizontal: '5%',
                  borderWidth: 4,
                  borderRadius: 20,
                  width: '30%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#344E41',
                  backgroundColor: '#3A5A40',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
                onPress={() => navigation.navigate('RegisterPage')}
              >
                <Text style={{ color: '#DAD7CD', fontSize: 20 }}>Sign up</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 30, fontWeight: '600', color: '#344E41' }}>X</Text>
              <TouchableOpacity
                style={{
                  marginHorizontal: '5%',
                  borderWidth: 4,
                  borderRadius: 20,
                  width: '30%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#344E41',
                  backgroundColor: '#3A5A40',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
                onPress={() => navigation.navigate('LoginPage')}
              >
                <Text style={{ color: '#DAD7CD', fontSize: 20 }}>Sign in</Text>
              </TouchableOpacity>
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
    backgroundColor: '#588157',
    alignItems: 'center',
  },
});
