import { AppText } from 'presentation/components/AppText/AppText';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { formatFoodQuantity } from 'shared/utils/formatFoodQuantity';
import type { IMealItemRowProps } from './MealItemRowTypes';

export function MealItemRow({ item }: IMealItemRowProps) {
  const { t } = useTranslation();
  return (
    <View className='flex-row items-start gap-4 border-gray-400 border-b px-3 py-4'>
      <View className='flex-1 gap-1'>
        <AppText>{formatFoodQuantity(item)}</AppText>

        <AppText color='muted' size='bodySm'>
          {t('mealDetails.itemMacros', {
            protein: item.protein,
            carbohydrate: item.carbohydrate,
            fat: item.fat
          })}
        </AppText>
      </View>

      <AppText weight='medium'>{`${item.calories} kcal`}</AppText>
    </View>
  );
}
