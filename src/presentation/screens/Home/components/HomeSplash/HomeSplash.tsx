import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { Logo } from 'shared/assets/svgs/Logo';
import { COLORS } from 'shared/constants/colors';

export function HomeSplash() {
  const { t } = useTranslation();
  return (
    <View className='flex-1 items-center justify-center gap-10 bg-lime-700'>
      <StatusBar style='light' />

      <Logo height={40} />

      <ActivityIndicator accessibilityLabel={t('common.loading')} color={COLORS.white} />
    </View>
  );
}
