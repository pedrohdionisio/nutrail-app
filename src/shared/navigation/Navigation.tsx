import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { AppStack } from './AppStack';

function handleReady() {
  SplashScreen.hideAsync();
}

export function Navigation() {
  return (
    <NavigationContainer onReady={handleReady}>
      <AppStack />
    </NavigationContainer>
  );
}
