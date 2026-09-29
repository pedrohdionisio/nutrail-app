import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { IHomeErrorProps } from './HomeErrorTypes';

export function HomeError({ isRetrying, onRetry, onSignOut }: IHomeErrorProps) {
  const { t } = useTranslation();
  return (
    <ScreenLayout className='justify-center gap-8'>
      <View className='gap-4'>
        <AppText accessibilityRole='header' align='center' size='title1'>
          {t('home.dataErrorTitle')}
        </AppText>

        <AppText align='center' color='muted'>
          {t('common.connectionHint')}
        </AppText>
      </View>

      <View className='gap-2'>
        <Button isLoading={isRetrying} onPress={onRetry} title={t('common.retry')} />
        <Button onPress={onSignOut} title={t('common.signOut')} variant='ghost' />
      </View>
    </ScreenLayout>
  );
}
