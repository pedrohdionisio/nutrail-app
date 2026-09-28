import ClockIcon from 'lucide-react-native/icons/clock';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IMealTimeButtonProps } from './MealTimeButtonTypes';

export function MealTimeButton({ time, onPress }: IMealTimeButtonProps) {
  return (
    <Pressable
      accessibilityHint='Altera o horário da refeição'
      accessibilityLabel={`Horário da refeição: ${time}`}
      accessibilityRole='button'
      className='h-10 flex-row items-center gap-2 self-center rounded-full bg-black-700 px-4 active:opacity-70'
      onPress={onPress}
    >
      <ClockIcon color={COLORS.lime[500]} size={16} strokeWidth={2} />
      <AppText color='inverse' size='bodySm' weight='medium'>
        {`Horário · ${time}`}
      </AppText>
    </Pressable>
  );
}
