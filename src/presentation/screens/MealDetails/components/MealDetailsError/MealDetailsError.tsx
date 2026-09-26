import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { View } from 'react-native';
import type { IMealDetailsErrorProps } from './MealDetailsErrorTypes';

export function MealDetailsError({ message, isRetrying, onBack, onRetry }: IMealDetailsErrorProps) {
  return (
    <View className='flex-1 bg-white'>
      <ScreenHeader onBack={onBack} title='Refeição' />

      <View className='flex-1 justify-center gap-6 px-5'>
        <AppText align='center' color='muted'>
          {message}
        </AppText>

        <Button isLoading={isRetrying} onPress={onRetry} title='Tentar de novo' />
      </View>
    </View>
  );
}
