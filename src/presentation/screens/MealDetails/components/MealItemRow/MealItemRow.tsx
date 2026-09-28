import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { formatFoodQuantity } from 'shared/utils/formatFoodQuantity';
import type { IMealItemRowProps } from './MealItemRowTypes';

export function MealItemRow({ item }: IMealItemRowProps) {
  return (
    <View className='flex-row items-start gap-4 border-gray-400 border-b px-3 py-4'>
      <View className='flex-1 gap-1'>
        <AppText>{formatFoodQuantity(item)}</AppText>

        <AppText color='muted' size='bodySm'>
          {`${item.protein}g prot · ${item.carbohydrate}g carb · ${item.fat}g gord`}
        </AppText>
      </View>

      <AppText weight='medium'>{`${item.calories} kcal`}</AppText>
    </View>
  );
}
