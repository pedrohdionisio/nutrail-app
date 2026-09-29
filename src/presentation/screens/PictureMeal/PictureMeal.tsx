import { StatusBar } from 'expo-status-bar';
import XIcon from 'lucide-react-native/icons/x';
import { ActionButton } from 'presentation/components/ActionButton/ActionButton';
import { AiLoading } from 'presentation/components/AiLoading/AiLoading';
import { DateTimePickerSheet } from 'presentation/components/DateTimePickerSheet/DateTimePickerSheet';
import { MealTimeButton } from 'presentation/components/MealTimeButton/MealTimeButton';
import { ReviewActions } from 'presentation/components/ReviewActions/ReviewActions';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { CaptureActions } from './components/CaptureActions/CaptureActions';
import { PictureFrame } from './components/PictureFrame/PictureFrame';
import { usePictureMealController } from './usePictureMealController';

export function PictureMeal() {
  const { t } = useTranslation();
  const {
    screenPadding,
    cameraRef,
    cameraStatus,
    canAskPermission,
    pictureUri,
    timeLabel,
    timePickerSheetBindings,
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
    handleConfirm,
    handleOpenTimePicker
  } = usePictureMealController();

  if (shouldShowAnalyzing) {
    return <AiLoading title={t('common.analyzingWithAi')} />;
  }

  return (
    <View className='flex-1 gap-6 bg-black-800' style={screenPadding}>
      <StatusBar style='light' />

      <View className='px-5'>
        <ActionButton accessibilityLabel={t('common.close')} icon={XIcon} onPress={handleClose} />
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
        <View className='gap-6'>
          <MealTimeButton onPress={handleOpenTimePicker} time={timeLabel} />
          <ReviewActions
            confirmAccessibilityLabel={t('pictureMeal.confirm')}
            discardAccessibilityLabel={t('pictureMeal.discard')}
            onConfirm={handleConfirm}
            onDiscard={handleDiscard}
          />
        </View>
      ) : (
        <CaptureActions
          isCaptureDisabled={isCaptureDisabled}
          isCapturing={isCapturing}
          isPicking={isPicking}
          onCapture={handleCapture}
          onPickFromGallery={handlePickFromGallery}
        />
      )}

      <DateTimePickerSheet {...timePickerSheetBindings} title={t('common.mealTimeTitle')} />
    </View>
  );
}
