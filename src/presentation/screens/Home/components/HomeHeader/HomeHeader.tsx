import ChefHatIcon from 'lucide-react-native/icons/chef-hat';
import TargetIcon from 'lucide-react-native/icons/target';
import { AppText } from 'presentation/components/AppText/AppText';
import { Avatar } from 'presentation/components/Avatar/Avatar';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  return (
    <View
      className='flex-row items-center gap-3 px-5 pb-6'
      style={{ paddingTop: top + HEADER_TOP_SPACING }}
    >
      <Pressable
        accessibilityLabel={t('home.profile')}
        accessibilityRole='button'
        className='flex-1 flex-row items-center gap-3 active:opacity-70'
        onPress={onOpenProfile}
      >
        <Avatar initials={initials} />

        <View className='flex-1'>
          <AppText color='muted' size='bodySm'>
            {t('home.greeting')}
          </AppText>

          <AppText numberOfLines={1} weight='semibold'>
            {firstName}
          </AppText>
        </View>
      </Pressable>

      <View className='flex-row gap-2'>
        <HomeHeaderAction icon={ChefHatIcon} label={t('home.recipes')} onPress={onOpenRecipes} />
        <HomeHeaderAction icon={TargetIcon} label={t('home.goals')} onPress={onOpenGoals} />
      </View>
    </View>
  );
}
