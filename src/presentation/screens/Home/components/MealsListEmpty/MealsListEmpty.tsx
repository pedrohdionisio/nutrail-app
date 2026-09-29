import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <View className='items-center py-16'>
        <ActivityIndicator accessibilityLabel={t('home.loadingMeals')} color={COLORS.lime[700]} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className='gap-6 py-10'>
        <View className='gap-2'>
          <AppText align='center' weight='medium'>
            {t('home.mealsErrorTitle')}
          </AppText>

          <AppText align='center' color='muted' size='bodySm'>
            {t('common.connectionHint')}
          </AppText>
        </View>

        <Button
          isLoading={isRetrying}
          onPress={onRetry}
          title={t('common.retry')}
          variant='secondary'
        />
      </View>
    );
  }

  return (
    <View className='gap-4'>
      <AppText color='muted'>{t('home.emptyMeals')}</AppText>

      <MealSourceOptions onSelect={onSelectSource} />
    </View>
  );
}
