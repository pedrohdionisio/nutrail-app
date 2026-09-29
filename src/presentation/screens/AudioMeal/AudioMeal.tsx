import { StatusBar } from 'expo-status-bar';
import XIcon from 'lucide-react-native/icons/x';
import { ActionButton } from 'presentation/components/ActionButton/ActionButton';
import { AiLoading } from 'presentation/components/AiLoading/AiLoading';
import { DateTimePickerSheet } from 'presentation/components/DateTimePickerSheet/DateTimePickerSheet';
import { MealTimeButton } from 'presentation/components/MealTimeButton/MealTimeButton';
import { ReviewActions } from 'presentation/components/ReviewActions/ReviewActions';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { RecordActions } from './components/RecordActions/RecordActions';
import { RecordingPanel } from './components/RecordingPanel/RecordingPanel';
import { useAudioMealController } from './useAudioMealController';

export function AudioMeal() {
  const { t } = useTranslation();
  const {
    screenPadding,
    microphoneStatus,
    canAskPermission,
    recordingStep,
    timeLabel,
    timePickerSheetBindings,
    durationLabel,
    isPlaying,
    isStartingRecording,
    isRecordDisabled,
    shouldShowAnalyzing,
    handleClose,
    handleRequestPermission,
    handleStartRecording,
    handleStopRecording,
    handleTogglePlayback,
    handleDiscard,
    handleConfirm,
    handleOpenTimePicker
  } = useAudioMealController();

  if (shouldShowAnalyzing) {
    return <AiLoading title={t('common.analyzingWithAi')} />;
  }

  return (
    <View className='flex-1 gap-6 bg-black-800' style={screenPadding}>
      <StatusBar style='light' />

      <View className='px-5'>
        <ActionButton accessibilityLabel={t('common.close')} icon={XIcon} onPress={handleClose} />
      </View>

      <RecordingPanel
        canAskPermission={canAskPermission}
        durationLabel={durationLabel}
        isPlaying={isPlaying}
        microphoneStatus={microphoneStatus}
        onRequestPermission={handleRequestPermission}
        onTogglePlayback={handleTogglePlayback}
        recordingStep={recordingStep}
      />

      {recordingStep === 'RECORDED' ? (
        <View className='gap-6'>
          <MealTimeButton onPress={handleOpenTimePicker} time={timeLabel} />
          <ReviewActions
            confirmAccessibilityLabel={t('audioMeal.confirm')}
            discardAccessibilityLabel={t('audioMeal.discard')}
            onConfirm={handleConfirm}
            onDiscard={handleDiscard}
          />
        </View>
      ) : (
        <RecordActions
          isDisabled={isRecordDisabled}
          isRecording={recordingStep === 'RECORDING'}
          isStartingRecording={isStartingRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />
      )}

      <DateTimePickerSheet {...timePickerSheetBindings} title={t('common.mealTimeTitle')} />
    </View>
  );
}
