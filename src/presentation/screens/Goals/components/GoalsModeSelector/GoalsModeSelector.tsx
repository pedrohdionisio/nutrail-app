import { AppText } from 'presentation/components/AppText/AppText';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { modeSegmentVariants } from './GoalsModeSelectorStyles';
import type { IGoalsModeSelectorProps } from './GoalsModeSelectorTypes';

const MODE_OPTIONS = [
  { value: 'calories', label: 'goals.byCalories' },
  { value: 'macros', label: 'goals.byMacros' }
] as const;

export function GoalsModeSelector({ mode, onSelectMode }: IGoalsModeSelectorProps) {
  const { t } = useTranslation();
  return (
    <View
      accessibilityLabel={t('goals.modeLabel')}
      accessibilityRole='radiogroup'
      className='flex-row gap-1 rounded-xl bg-gray-300 p-1'
    >
      {MODE_OPTIONS.map((option) => (
        <Pressable
          accessibilityLabel={t(option.label)}
          accessibilityRole='radio'
          accessibilityState={{ checked: option.value === mode }}
          className={modeSegmentVariants({ isSelected: option.value === mode })}
          key={option.value}
          onPress={() => onSelectMode({ mode: option.value })}
        >
          <AppText weight='medium'>{t(option.label)}</AppText>
        </Pressable>
      ))}
    </View>
  );
}
