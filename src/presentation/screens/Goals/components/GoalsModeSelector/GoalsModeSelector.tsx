import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { modeSegmentVariants } from './GoalsModeSelectorStyles';
import type { IGoalsModeSelectorProps } from './GoalsModeSelectorTypes';

const MODE_OPTIONS = [
  { value: 'calories', label: 'Por calorias' },
  { value: 'macros', label: 'Por macros' }
] as const;

export function GoalsModeSelector({ mode, onSelectMode }: IGoalsModeSelectorProps) {
  return (
    <View
      accessibilityLabel='Como definir as metas'
      accessibilityRole='radiogroup'
      className='flex-row gap-1 rounded-xl bg-gray-300 p-1'
    >
      {MODE_OPTIONS.map((option) => (
        <Pressable
          accessibilityLabel={option.label}
          accessibilityRole='radio'
          accessibilityState={{ checked: option.value === mode }}
          className={modeSegmentVariants({ isSelected: option.value === mode })}
          key={option.value}
          onPress={() => onSelectMode({ mode: option.value })}
        >
          <AppText weight='medium'>{option.label}</AppText>
        </Pressable>
      ))}
    </View>
  );
}
