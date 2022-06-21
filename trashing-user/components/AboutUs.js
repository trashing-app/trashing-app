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
          color: '#DAD7CD',
          marginBottom: 10,
          marginTop: -20,
        }}
      >
        About Us
      </Text>
      <Text
        style={{
          width: dimWidth,
          textAlign: 'justify',
          paddingHorizontal: 20,
          color: '#DAD7CD',
          fontSize: 20,
          marginBottom: 30,
        }}
      >
        We are promoting the movement of 3R (reduce, reuse and recycle) by providing people a place
        to distribnute their household waste with a better impact for society and business. All in
        the grasp of your hand.
      </Text>
    </View>
  );
}
