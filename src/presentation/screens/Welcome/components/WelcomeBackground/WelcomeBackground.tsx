import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { cssInterop } from 'nativewind';
import type { PropsWithChildren } from 'react';
import { ImageBackground, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import loginBackground from 'shared/assets/login-bg.png';
import { Logo } from 'shared/assets/svgs/Logo';

const StyledLinearGradient = cssInterop(LinearGradient, { className: 'style' });

const OVERLAY_COLORS = [
  'rgba(9, 9, 11, 0.45)',
  'rgba(9, 9, 11, 0)',
  'rgba(9, 9, 11, 0)',
  'rgba(9, 9, 11, 0.95)'
] as const;

const OVERLAY_LOCATIONS = [0, 0.2, 0.5, 1] as const;

export function WelcomeBackground({ children }: PropsWithChildren) {
  const { top } = useSafeAreaInsets();

  return (
    <ImageBackground
      className='flex-1 justify-end bg-black-800'
      resizeMode='cover'
      source={loginBackground}
    >
      <StatusBar style='light' />

      <StyledLinearGradient
        className='absolute inset-0'
        colors={OVERLAY_COLORS}
        locations={OVERLAY_LOCATIONS}
      />

      <View className='absolute inset-x-0 items-center' style={{ top: top + 16 }}>
        <Logo />
      </View>

      {children}
    </ImageBackground>
  );
}
