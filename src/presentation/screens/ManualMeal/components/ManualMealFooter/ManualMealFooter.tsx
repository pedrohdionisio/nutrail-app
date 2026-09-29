import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IManualMealFooterProps } from './ManualMealFooterTypes';

const FOOTER_BOTTOM_SPACING = 16;

export function ManualMealFooter({ isSubmitDisabled, onSubmit }: IManualMealFooterProps) {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className='border-gray-400 border-t bg-white px-5 pt-5'
      style={{ paddingBottom: bottom + FOOTER_BOTTOM_SPACING }}
    >
      <Button disabled={isSubmitDisabled} onPress={onSubmit} title={t('manualMeal.calculate')} />
    </View>
  );
}
