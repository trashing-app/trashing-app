import { useState } from 'react';
import {
  Pressable,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginPage() {
  const [email, onChangeEmail] = useState('');
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView>
          <ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                name="email"
                style={styles.inputField}
                value={email}
                onChangeText={onChangeEmail}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                name="password"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                secureTextEntry={passwordVisibility}
                value={password}
                enablesReturnKeyAutomatically
                onChangeText={(text) => setPassword(text)}
              />
              <Pressable onPress={handlePasswordVisibility}>
                <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
              </Pressable>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                name="confirmPassword"
                placeholder="Confirm password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                secureTextEntry={passwordVisibility}
                value={confirmPassword}
                enablesReturnKeyAutomatically
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <Pressable onPress={handlePasswordVisibility}>
                <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
              </Pressable>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                value={address}
                onChangeText={setAddress}
                name="address"
                placeholder="Address"
                keyboardType="default"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone number"
                keyboardType="name-phone-pad"
              />
            </View>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'cyan',
                justifyContent: 'center',
                marginTop: 15,
              }}
            >
              <Text style={{ textAlign: 'center' }}>Register</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEDC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 1,
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '80%',
    margin: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d7d7d7',
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: '87%',
  },
});
