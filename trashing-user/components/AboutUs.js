import { Text, View, Dimensions } from 'react-native';

const dimWidth = Dimensions.get('window').width;

export default function AboutUs() {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 30,
          fontWeight: '600',
          marginTop: 20,
          color: '#caf0f8',
          marginBottom: 10,
        }}
      >
        About Us
      </Text>
      <Text
        style={{
          width: dimWidth,
          textAlign: 'center',
          paddingHorizontal: 20,
          color: '#caf0f8',
          fontSize: 20,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis, nulla eu ultrices
        finibus, metus sapien rhoncus lacus, vitae suscipit quam nulla sit amet nulla. Fusce et
        scelerisque metus. Pellentesque.
      </Text>
    </View>
  );
}
