import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IHomeHeaderActionProps } from './HomeHeaderActionTypes';

export function HomeHeaderAction({ icon: Icon, label, onPress }: IHomeHeaderActionProps) {
  return (
    <Pressable
      accessibilityRole='button'
      className='h-10 flex-row items-center gap-2 rounded-full bg-white/60 px-4 active:opacity-70'
      onPress={onPress}
    >
      <Icon color={COLORS.black[700]} size={18} strokeWidth={2} />
      <AppText size='bodySm' weight='medium'>
        {label}
      </AppText>
    </Pressable>
  );
}
