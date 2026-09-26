import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import type { IHomeErrorProps } from './HomeErrorTypes';

export function HomeError({ isRetrying, onRetry, onSignOut }: IHomeErrorProps) {
  return (
    <ScreenLayout className='justify-center gap-8'>
      <View className='gap-4'>
        <AppText accessibilityRole='header' align='center' size='title1'>
          Não conseguimos carregar seus dados
        </AppText>

        <AppText align='center' color='muted'>
          Verifique sua conexão e tente de novo.
        </AppText>
      </View>

      <View className='gap-2'>
        <Button isLoading={isRetrying} onPress={onRetry} title='Tentar de novo' />
        <Button onPress={onSignOut} title='Sair' variant='ghost' />
      </View>
    </ScreenLayout>
  );
}
