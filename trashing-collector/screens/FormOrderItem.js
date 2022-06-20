import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "react-native";
function FormOrderItem({ route }) {
  console.log(route);
  return (
    <SafeAreaView>
      <Text>ini order item</Text>
      <TextInput />
    </SafeAreaView>
  );
}

export default FormOrderItem;
