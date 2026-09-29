import BookmarkIcon from 'lucide-react-native/icons/bookmark';
import PenLineIcon from 'lucide-react-native/icons/pen-line';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { MealSourceButton } from './components/MealSourceButton/MealSourceButton';
import { MealSourceCard } from './components/MealSourceCard/MealSourceCard';
import { MEAL_SOURCE_OPTIONS } from './constants/mealSourceOptions';
import type { IMealSourceOptionsProps } from './MealSourceOptionsTypes';

export function MealSourceOptions({ onSelect }: IMealSourceOptionsProps) {
  const { t } = useTranslation();
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
        accessibilityLabel={t('home.savedMealAccessibility')}
        icon={BookmarkIcon}
        label={t('home.savedMealLabel')}
        onPress={() => onSelect({ source: 'SAVED' })}
      />

      <MealSourceButton
        accessibilityLabel={t('home.manualMealAccessibility')}
        icon={PenLineIcon}
        label={t('home.manualMealLabel')}
        onPress={() => onSelect({ source: 'MANUAL' })}
      />
    </View>
  );
}
