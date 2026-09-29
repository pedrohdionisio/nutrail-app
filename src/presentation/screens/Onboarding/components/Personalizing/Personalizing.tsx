import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IPersonalizingProps } from './PersonalizingTypes';

export function Personalizing({ isError, onRetry }: IPersonalizingProps) {
  const { t } = useTranslation();
  if (isError) {
    return (
      <ScreenLayout className='justify-center gap-8'>
        <View className='gap-4'>
          <AppText accessibilityRole='header' align='center' size='title1'>
            {t('onboarding.planErrorTitle')}
          </AppText>

          <AppText align='center' color='muted'>
            {t('onboarding.planErrorMessage')}
          </AppText>
        </View>

        <Button onPress={onRetry} title={t('common.retry')} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout className='items-center justify-center gap-10'>
      <AppText accessibilityRole='header' align='center' size='title1'>
        {t('onboarding.personalizing')}
      </AppText>

      <ActivityIndicator
        accessibilityLabel={t('common.loading')}
        color={COLORS.lime[700]}
        size='small'
      />
    </ScreenLayout>
  );
}
