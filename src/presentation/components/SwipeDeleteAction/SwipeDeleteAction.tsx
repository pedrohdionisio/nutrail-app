import TrashIcon from 'lucide-react-native/icons/trash';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { ISwipeDeleteActionProps } from './SwipeDeleteActionTypes';

export function SwipeDeleteAction({ accessibilityLabel, onPress }: ISwipeDeleteActionProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole='button'
      className='ml-3 w-24 items-center justify-center gap-2 rounded-2xl bg-support-red active:opacity-80'
      onPress={onPress}
    >
      <TrashIcon color={COLORS.black[700]} size={22} strokeWidth={1.8} />
      <AppText size='bodySm' weight='medium'>
        Excluir
      </AppText>
    </Pressable>
  );
}
