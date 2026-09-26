import { View } from 'react-native';
import { ManualMealButton } from './components/ManualMealButton/ManualMealButton';
import { MealSourceCard } from './components/MealSourceCard/MealSourceCard';
import { MEAL_SOURCE_OPTIONS } from './constants/mealSourceOptions';
import type { IMealSourceOptionsProps } from './MealSourceOptionsTypes';

export function MealSourceOptions({ onSelect }: IMealSourceOptionsProps) {
  return (
    <View className='gap-4'>
      <View className='flex-row gap-4'>
        {MEAL_SOURCE_OPTIONS.map((option) => (
          <MealSourceCard
            key={option.source}
            onPress={() => onSelect({ source: option.source })}
            option={option}
          />
        ))}
      </View>

      <ManualMealButton onPress={() => onSelect({ source: 'MANUAL' })} />
    </View>
  );
}
