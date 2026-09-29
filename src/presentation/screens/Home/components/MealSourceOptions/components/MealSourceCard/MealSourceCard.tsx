import { AppText } from 'presentation/components/AppText/AppText';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IMealSourceCardProps } from './MealSourceCardTypes';

export function MealSourceCard({ option, onPress }: IMealSourceCardProps) {
  const { t } = useTranslation();
  const { icon: Icon, label, accessibilityLabel } = option;

  return (
    <Pressable
      accessibilityLabel={t(accessibilityLabel)}
      accessibilityRole='button'
      className='flex-1 items-center gap-4 rounded-2xl border border-gray-400 bg-white px-4 py-6 active:opacity-80'
      onPress={onPress}
    >
      <View className='h-12 w-12 items-center justify-center rounded-xl bg-gray-200'>
        <Icon color={COLORS.black[700]} size={22} strokeWidth={1.8} />
      </View>

      <AppText weight='medium'>{t(label)}</AppText>
    </Pressable>
  );
}
