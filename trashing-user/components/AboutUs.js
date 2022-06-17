import { Text, View } from 'react-native';

export default function AboutUs() {
  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}>About Us</Text>
      <Text style={{ backgroundColor: 'green', width: 390, textAlign: 'justify' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis, nulla eu ultrices
        finibus, metus sapien rhoncus lacus, vitae suscipit quam nulla sit amet nulla. Fusce et
        scelerisque metus. Pellentesque.
      </Text>
    </View>
  );
}
