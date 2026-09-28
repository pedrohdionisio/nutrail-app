import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IMealSourceButtonProps } from './MealSourceButtonTypes';

export function MealSourceButton({
  label,
  accessibilityLabel,
  icon: Icon,
  onPress
}: IMealSourceButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole='button'
      className='h-13 flex-row items-center justify-center gap-2 rounded-2xl border border-gray-400 bg-white px-4 active:opacity-80'
      onPress={onPress}
    >
      <Icon color={COLORS.black[700]} size={18} strokeWidth={1.8} />
      <AppText weight='medium'>{label}</AppText>
    </Pressable>
  );
}
