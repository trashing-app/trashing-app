import { useState } from 'react';
import { Pressable, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';

export default function LoginPage() {
  const [email, onChangeEmail] = useState('');
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [password, setPassword] = useState('');

  return (
    <>
      <View style={styles.container}>
        <Text>Login to Trashing</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={onChangeEmail}
            placeholder="Input email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            name="password"
            placeholder="Enter password"
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
        <TouchableOpacity
          style={{ width: 100, height: 40, backgroundColor: 'cyan', justifyContent: 'center' }}
        >
          <Text style={{ textAlign: 'center' }}>Login</Text>
        </TouchableOpacity>
      </View>
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
