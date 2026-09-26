import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { Logo } from 'shared/assets/svgs/Logo';
import { COLORS } from 'shared/constants/colors';

export function HomeSplash() {
  return (
    <View className='flex-1 items-center justify-center gap-10 bg-lime-700'>
      <StatusBar style='light' />

      <Logo height={40} />

      <ActivityIndicator accessibilityLabel='Carregando' color={COLORS.white} />
    </View>
  );
}
