import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { formatFoodQuantity } from 'shared/utils/formatFoodQuantity';
import type { IMealItemRowProps } from './MealItemRowTypes';

export function MealItemRow({ item }: IMealItemRowProps) {
  return (
    <View className='border-gray-400 border-b px-3 py-4'>
      <AppText>{formatFoodQuantity(item)}</AppText>
    </View>
  );
}
