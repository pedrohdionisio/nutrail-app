import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IGoalsFallbackProps } from './GoalsFallbackTypes';

export function GoalsFallback({ isLoading, isRetrying, onRetry }: IGoalsFallbackProps) {
  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator accessibilityLabel='Carregando metas' color={COLORS.lime[700]} />
      </View>
    );
  }

  return (
    <View className='flex-1 justify-center gap-6 px-5'>
      <AppText align='center' color='muted'>
        Não conseguimos carregar suas metas. Verifique sua conexão e tente de novo.
      </AppText>

      <Button isLoading={isRetrying} onPress={onRetry} title='Tentar de novo' />
    </View>
  );
}
