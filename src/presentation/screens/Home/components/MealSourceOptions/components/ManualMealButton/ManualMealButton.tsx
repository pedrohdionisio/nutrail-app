import PenLineIcon from 'lucide-react-native/icons/pen-line';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IManualMealButtonProps } from './ManualMealButtonTypes';

export function ManualMealButton({ onPress }: IManualMealButtonProps) {
  return (
    <Pressable
      accessibilityLabel='Cadastrar refeição manualmente'
      accessibilityRole='button'
      className='h-13 flex-row items-center justify-center gap-2 rounded-2xl border border-gray-400 bg-white px-4 active:opacity-80'
      onPress={onPress}
    >
      <PenLineIcon color={COLORS.black[700]} size={18} strokeWidth={1.8} />
      <AppText weight='medium'>Refeição manual</AppText>
    </Pressable>
  );
}
