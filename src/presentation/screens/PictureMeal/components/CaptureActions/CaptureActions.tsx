import CameraIcon from 'lucide-react-native/icons/camera';
import ImagesIcon from 'lucide-react-native/icons/images';
import { ActionButton } from 'presentation/components/ActionButton/ActionButton';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { ICaptureActionsProps } from './CaptureActionsTypes';

export function CaptureActions({
  isCaptureDisabled,
  isCapturing,
  isPicking,
  onCapture,
  onPickFromGallery
}: ICaptureActionsProps) {
  const { t } = useTranslation();
  return (
    <View className='flex-row justify-center gap-12'>
      <ActionButton
        accessibilityLabel={t('pictureMeal.take')}
        disabled={isCaptureDisabled}
        icon={CameraIcon}
        isLoading={isCapturing}
        label={t('pictureMeal.takeLabel')}
        onPress={onCapture}
        variant='brand'
      />

      <ActionButton
        accessibilityLabel={t('pictureMeal.chooseFromGallery')}
        disabled={isCapturing}
        icon={ImagesIcon}
        isLoading={isPicking}
        label={t('pictureMeal.gallery')}
        onPress={onPickFromGallery}
      />
    </View>
  );
}
