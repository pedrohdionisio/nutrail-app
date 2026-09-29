import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IProfileFooterProps } from './ProfileFooterTypes';

const FOOTER_BOTTOM_SPACING = 16;

export function ProfileFooter({ isSaving, isSaveDisabled, onSave }: IProfileFooterProps) {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className='gap-3 border-gray-400 border-t bg-white px-5 pt-4'
      style={{ paddingBottom: bottom + FOOTER_BOTTOM_SPACING }}
    >
      <AppText align='center' color='muted' size='bodySm'>
        {t('profile.goalsRecalculatedShort')}
      </AppText>

      <Button
        disabled={isSaveDisabled}
        isLoading={isSaving}
        onPress={onSave}
        title={t('common.save')}
      />
    </View>
  );
}
