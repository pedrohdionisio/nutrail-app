import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome } from 'presentation/screens/Welcome/Welcome';
import type { AuthRoutesParamList } from './AppRoutesTypes';

const Stack = createNativeStackNavigator<AuthRoutesParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Welcome} name='Welcome' />
    </Stack.Navigator>
  );
}
