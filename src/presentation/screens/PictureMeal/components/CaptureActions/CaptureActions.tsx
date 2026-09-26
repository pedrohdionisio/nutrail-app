import CameraIcon from 'lucide-react-native/icons/camera';
import ImagesIcon from 'lucide-react-native/icons/images';
import { View } from 'react-native';
import { ActionButton } from '../ActionButton/ActionButton';
import type { ICaptureActionsProps } from './CaptureActionsTypes';

export function CaptureActions({
  isCaptureDisabled,
  isCapturing,
  isPicking,
  onCapture,
  onPickFromGallery
}: ICaptureActionsProps) {
  return (
    <View className='flex-row justify-center gap-12'>
      <ActionButton
        accessibilityLabel='Tirar foto'
        disabled={isCaptureDisabled}
        icon={CameraIcon}
        isLoading={isCapturing}
        label='Tirar Foto'
        onPress={onCapture}
        variant='brand'
      />

      <ActionButton
        accessibilityLabel='Escolher foto da galeria'
        disabled={isCapturing}
        icon={ImagesIcon}
        isLoading={isPicking}
        label='Galeria'
        onPress={onPickFromGallery}
      />
    </View>
  );
}
