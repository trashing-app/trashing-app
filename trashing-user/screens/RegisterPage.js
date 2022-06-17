import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { Text, View, TextInput } from "react-native";

export default function RegisterPage() {
  return (
    <SafeAreaView>
      <TextInput
        style={{ height: 40 }}
        placeholder="username"
        onChangeText={(newText) => setText(newText)}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="email"
        onChangeText={(newText) => setText(newText)}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="password"
        onChangeText={(newText) => setText(newText)}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="phone number"
        onChangeText={(newText) => setText(newText)}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="address"
        onChangeText={(newText) => setText(newText)}
      />
    </SafeAreaView>
  );
}
