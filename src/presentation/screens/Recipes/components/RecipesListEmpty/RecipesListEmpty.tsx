import ChefHatIcon from 'lucide-react-native/icons/chef-hat';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IRecipesListEmptyProps } from './RecipesListEmptyTypes';

export function RecipesListEmpty({
  isLoading,
  isError,
  isRetrying,
  onRetry
}: IRecipesListEmptyProps) {
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <View className='items-center py-16'>
        <ActivityIndicator accessibilityLabel={t('recipes.loading')} color={COLORS.lime[700]} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className='gap-6 py-10'>
        <View className='gap-2'>
          <AppText align='center' weight='medium'>
            {t('recipes.errorTitle')}
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
        <ChefHatIcon color={COLORS.black[700]} size={22} strokeWidth={1.8} />
      </View>

      <View className='gap-2'>
        <AppText align='center' weight='medium'>
          {t('recipes.emptyTitle')}
        </AppText>

        <AppText align='center' color='muted' size='bodySm'>
          {t('recipes.emptyMessage')}
        </AppText>
      </View>
    </View>
  );
}
