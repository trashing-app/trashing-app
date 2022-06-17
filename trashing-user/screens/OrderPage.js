import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { View, TextInput } from "react-native";

export default function OrderPage() {
  return (
    <SafeAreaView>
      <TextInput
        style={{ height: 40 }}
        placeholder="weight"
        onChangeText={(newText) => setText(newText)}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="category"
        onChangeText={(newText) => setText(newText)}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="description"
        onChangeText={(newText) => setText(newText)}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="price"
        onChangeText={(newText) => setText(newText)}
      />
    </SafeAreaView>
  );
}
