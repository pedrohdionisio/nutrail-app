import BookmarkIcon from 'lucide-react-native/icons/bookmark';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { ISavedMealsListEmptyProps } from './SavedMealsListEmptyTypes';

export function SavedMealsListEmpty({
  isLoading,
  isError,
  isRetrying,
  onRetry
}: ISavedMealsListEmptyProps) {
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <View className='items-center py-16'>
        <ActivityIndicator accessibilityLabel={t('savedMeals.loading')} color={COLORS.lime[700]} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className='gap-6 py-10'>
        <View className='gap-2'>
          <AppText align='center' weight='medium'>
            {t('savedMeals.errorTitle')}
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
    <View className='flex-1 items-center justify-center gap-6 py-10'>
      <View className='h-12 w-12 items-center justify-center rounded-xl bg-gray-200'>
        <BookmarkIcon color={COLORS.black[700]} size={22} strokeWidth={1.8} />
      </View>

      <View className='gap-2'>
        <AppText align='center' weight='medium'>
          {t('savedMeals.emptyTitle')}
        </AppText>

        <AppText align='center' color='muted' size='bodySm'>
          {t('savedMeals.emptyMessage')}
        </AppText>
      </View>
    </View>
  );
}
