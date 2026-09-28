import BookmarkIcon from 'lucide-react-native/icons/bookmark';
import PenLineIcon from 'lucide-react-native/icons/pen-line';
import { View } from 'react-native';
import { MealSourceButton } from './components/MealSourceButton/MealSourceButton';
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

      <MealSourceButton
        accessibilityLabel='Cadastrar refeição salva'
        icon={BookmarkIcon}
        label='Refeição salva'
        onPress={() => onSelect({ source: 'SAVED' })}
      />

      <MealSourceButton
        accessibilityLabel='Cadastrar refeição manualmente'
        icon={PenLineIcon}
        label='Refeição manual'
        onPress={() => onSelect({ source: 'MANUAL' })}
      />
    </View>
  );
}
