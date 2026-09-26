import PlusIcon from 'lucide-react-native/icons/plus';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from 'shared/constants/colors';
import type { IAddMealButtonProps } from './AddMealButtonTypes';

const BUTTON_OFFSET = 20;

const SHADOW = {
  shadowColor: COLORS.black[900],
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 12,
  elevation: 6
};

export function AddMealButton({ onPress }: IAddMealButtonProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <Pressable
      accessibilityLabel='Cadastrar refeição'
      accessibilityRole='button'
      className='absolute right-5 h-14 w-14 items-center justify-center rounded-2xl bg-lime-500 active:opacity-80'
      onPress={onPress}
      style={[SHADOW, { bottom: bottom + BUTTON_OFFSET }]}
    >
      <PlusIcon color={COLORS.black[700]} size={24} strokeWidth={2} />
    </Pressable>
  );
}
