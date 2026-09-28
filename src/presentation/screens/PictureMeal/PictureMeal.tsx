import { StatusBar } from 'expo-status-bar';
import XIcon from 'lucide-react-native/icons/x';
import { ActionButton } from 'presentation/components/ActionButton/ActionButton';
import { AiLoading } from 'presentation/components/AiLoading/AiLoading';
import { ReviewActions } from 'presentation/components/ReviewActions/ReviewActions';
import { View } from 'react-native';
import { CaptureActions } from './components/CaptureActions/CaptureActions';
import { PictureFrame } from './components/PictureFrame/PictureFrame';
import { usePictureMealController } from './usePictureMealController';

export function PictureMeal() {
  const {
    screenPadding,
    cameraRef,
    cameraStatus,
    canAskPermission,
    pictureUri,
    isCaptureDisabled,
    isCapturing,
    isPicking,
    shouldShowAnalyzing,
    handleClose,
    handleCameraReady,
    handleRequestPermission,
    handleCapture,
    handlePickFromGallery,
    handleDiscard,
    handleConfirm
  } = usePictureMealController();

  if (shouldShowAnalyzing) {
    return (
      <AiLoading title='Estamos calculando seus macros com ajuda da inteligência artificial' />
    );
  }

  return (
    <View className='flex-1 gap-6 bg-black-800' style={screenPadding}>
      <StatusBar style='light' />

      <View className='px-5'>
        <ActionButton accessibilityLabel='Fechar' icon={XIcon} onPress={handleClose} />
      </View>

      <PictureFrame
        cameraRef={cameraRef}
        cameraStatus={cameraStatus}
        canAskPermission={canAskPermission}
        onCameraReady={handleCameraReady}
        onRequestPermission={handleRequestPermission}
        pictureUri={pictureUri}
      />

      {pictureUri ? (
        <ReviewActions
          confirmAccessibilityLabel='Confirmar foto'
          discardAccessibilityLabel='Descartar foto'
          onConfirm={handleConfirm}
          onDiscard={handleDiscard}
        />
      ) : (
        <CaptureActions
          isCaptureDisabled={isCaptureDisabled}
          isCapturing={isCapturing}
          isPicking={isPicking}
          onCapture={handleCapture}
          onPickFromGallery={handlePickFromGallery}
        />
      )}
    </View>
  );
}
