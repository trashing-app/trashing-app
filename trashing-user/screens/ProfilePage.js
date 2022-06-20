import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfilePage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Username"
            placeholderTextColor="#ffffff"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Address"
            placeholderTextColor="#ffffff"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Phone Number"
            placeholderTextColor="#ffffff"
          />
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
            borderColor: '#caf0f8',
            borderWidth: 3,
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Save Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 130,
            height: 50,
            backgroundColor: '#0077b6',
            justifyContent: 'center',
            marginVertical: 15,
            borderRadius: 15,
            marginHorizontal: '34%',
            borderColor: '#caf0f8',
            borderWidth: 3,
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    height: 62,
    marginHorizontal: '5%',
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#caf0f8',
  },
  inputField: {
    padding: 14,
    fontSize: 20,
    width: '87%',
    color: 'white',
  },
});
