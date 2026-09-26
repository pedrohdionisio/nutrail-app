import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import * as SplashScreen from 'expo-splash-screen';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

function handleReady() {
  SplashScreen.hideAsync();
}

export function Navigation() {
  const { signedIn } = useAuth();

  return (
    <NavigationContainer onReady={handleReady}>
      {signedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
