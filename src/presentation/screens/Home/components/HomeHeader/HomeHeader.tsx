import ChefHatIcon from 'lucide-react-native/icons/chef-hat';
import TargetIcon from 'lucide-react-native/icons/target';
import { AppText } from 'presentation/components/AppText/AppText';
import { Avatar } from 'presentation/components/Avatar/Avatar';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeHeaderAction } from './components/HomeHeaderAction/HomeHeaderAction';
import type { IHomeHeaderProps } from './HomeHeaderTypes';

const HEADER_TOP_SPACING = 16;

export function HomeHeader({
  firstName,
  initials,
  onOpenProfile,
  onOpenGoals,
  onOpenRecipes
}: IHomeHeaderProps) {
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

      <View className='flex-row gap-2'>
        <HomeHeaderAction icon={ChefHatIcon} label='Receitas' onPress={onOpenRecipes} />
        <HomeHeaderAction icon={TargetIcon} label='Metas' onPress={onOpenGoals} />
      </View>
    </View>
  );
}
