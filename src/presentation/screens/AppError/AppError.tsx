import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { IAppErrorProps } from './AppErrorTypes';
import { useAppErrorController } from './useAppErrorController';

export function AppError({ resetErrorBoundary }: IAppErrorProps) {
  const { t } = useTranslation();
  useAppErrorController();

  return (
    <ScreenLayout className='justify-center gap-8'>
      <View className='gap-2'>
        <AppText size='title1'>{t('appError.title')}</AppText>

        <AppText color='muted'>{t('appError.message')}</AppText>
      </View>

      <Button onPress={resetErrorBoundary} title={t('common.retry')} />
    </ScreenLayout>
  );
}
