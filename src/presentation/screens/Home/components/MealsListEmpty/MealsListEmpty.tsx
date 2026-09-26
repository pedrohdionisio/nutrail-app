import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { MealSourceOptions } from '../MealSourceOptions/MealSourceOptions';
import type { IMealsListEmptyProps } from './MealsListEmptyTypes';

export function MealsListEmpty({
  isLoading,
  isError,
  isRetrying,
  onRetry,
  onSelectSource
}: IMealsListEmptyProps) {
  if (isLoading) {
    return (
      <View className='items-center py-16'>
        <ActivityIndicator accessibilityLabel='Carregando refeições' color={COLORS.lime[700]} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className='gap-6 py-10'>
        <View className='gap-2'>
          <AppText align='center' weight='medium'>
            Não conseguimos carregar suas refeições
          </AppText>

          <AppText align='center' color='muted' size='bodySm'>
            Verifique sua conexão e tente de novo.
          </AppText>
        </View>

        <Button
          isLoading={isRetrying}
          onPress={onRetry}
          title='Tentar de novo'
          variant='secondary'
        />
      </View>
    );
  }

  return (
    <View className='gap-4'>
      <AppText color='muted'>
        Nenhuma refeição registrada neste dia. Cadastre por uma das opções abaixo:
      </AppText>

      <MealSourceOptions onSelect={onSelectSource} />
    </View>
  );
}
