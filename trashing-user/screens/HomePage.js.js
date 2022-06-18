import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Home</Text>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('HomePage')}
        style={{ backgroundColor: 'blue' }}
      >
        <Text style={{ fontSize: 20, color: '#fff' }}>Home Page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderPage')}
        style={{ backgroundColor: 'blue' }}
      >
        <Text style={{ fontSize: 20, color: '#fff' }}>Order Page</Text>
      </TouchableOpacity> */}
    </View>
  );
}
