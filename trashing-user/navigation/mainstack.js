import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '../screens/LoginPage';
import RegisterPage from '../screens/RegisterPage';
import WelcomePage from '../screens/WelcomePage';
import MapPage from '../screens/MapPage';
import TabNavigation from './tabNavigation.js';
import OrderPage from '../screens/OrderPage';
import Chat from '../components/Chat';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="WelcomePage" component={WelcomePage} />
        <Stack.Screen
          name="tabnavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen options={{ headerShown: false }} name="LoginPage" component={LoginPage} />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen options={{ headerShown: false }} name="MapPage" component={MapPage} />
        <Stack.Screen
          options={{
            title: 'Chat',
            headerTitleAlign: 'center',
          }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          options={{
            title: 'Create Your Trashing Account',
            headerTitleAlign: 'center',
          }}
          name="OrderPage"
          component={OrderPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
