import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from './screens/WelcomePage';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="WelcomePage" component={WelcomePage} />
        <Stack.Screen
          options={{
            title: 'Login Page',
            headerTitleAlign: 'center',
          }}
          name="LoginPage"
          component={LoginPage}
        />
        <Stack.Screen
          options={{
            title: 'Create Your Trashing Account',
            headerTitleAlign: 'center',
          }}
          name="RegisterPage"
          component={RegisterPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
