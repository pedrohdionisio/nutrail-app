import TargetIcon from 'lucide-react-native/icons/target';
import { AppText } from 'presentation/components/AppText/AppText';
import { Avatar } from 'presentation/components/Avatar/Avatar';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from 'shared/constants/colors';
import type { IHomeHeaderProps } from './HomeHeaderTypes';

const HEADER_TOP_SPACING = 16;

export function HomeHeader({ firstName, initials, onOpenProfile, onOpenGoals }: IHomeHeaderProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View
      className='flex-row items-center gap-3 px-5 pb-6'
      style={{ paddingTop: top + HEADER_TOP_SPACING }}
    >
      <Pressable
        accessibilityLabel='Perfil'
        accessibilityRole='button'
        className='flex-1 flex-row items-center gap-3 active:opacity-70'
        onPress={onOpenProfile}
      >
        <Avatar initials={initials} />

        <View className='flex-1'>
          <AppText color='muted' size='bodySm'>
            Olá,
          </AppText>

          <AppText numberOfLines={1} weight='semibold'>
            {firstName}
          </AppText>
        </View>
      </Pressable>

      <Pressable
        accessibilityRole='button'
        className='h-10 flex-row items-center gap-2 rounded-full bg-white/60 px-4 active:opacity-70'
        onPress={onOpenGoals}
      >
        <TargetIcon color={COLORS.black[700]} size={18} strokeWidth={2} />
        <AppText size='bodySm' weight='medium'>
          Metas
        </AppText>
      </Pressable>
    </View>
  );
}
