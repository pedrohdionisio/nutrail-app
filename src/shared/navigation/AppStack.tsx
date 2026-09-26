import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Goals } from 'presentation/screens/Goals/Goals';
import { Home } from 'presentation/screens/Home/Home';
import type { AppRoutesParamList } from './AppRoutesTypes';

const Stack = createNativeStackNavigator<AppRoutesParamList>();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Home} name='Home' />
      <Stack.Screen component={Goals} name='Goals' />
    </Stack.Navigator>
  );
}
