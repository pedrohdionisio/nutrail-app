import { StatusBar } from 'expo-status-bar';
import XIcon from 'lucide-react-native/icons/x';
import { AnalyzingMeal } from 'presentation/components/AnalyzingMeal/AnalyzingMeal';
import { View } from 'react-native';
import { ActionButton } from './components/ActionButton/ActionButton';
import { CaptureActions } from './components/CaptureActions/CaptureActions';
import { PictureFrame } from './components/PictureFrame/PictureFrame';
import { ReviewActions } from './components/ReviewActions/ReviewActions';
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
    return <AnalyzingMeal />;
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
        <ReviewActions onConfirm={handleConfirm} onDiscard={handleDiscard} />
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
