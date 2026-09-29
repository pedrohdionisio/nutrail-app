import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { IMealDetailsErrorProps } from './MealDetailsErrorTypes';

export function MealDetailsError({ message, isRetrying, onBack, onRetry }: IMealDetailsErrorProps) {
  const { t } = useTranslation();
  return (
    <View className='flex-1 bg-white'>
      <ScreenHeader onBack={onBack} title={t('common.meal')} />

      <View className='flex-1 justify-center gap-6 px-5'>
        <AppText align='center' color='muted'>
          {message}
        </AppText>

        <Button isLoading={isRetrying} onPress={onRetry} title={t('common.retry')} />
      </View>
    </View>
  );
}
