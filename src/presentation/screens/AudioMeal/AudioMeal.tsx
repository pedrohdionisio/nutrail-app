import { StatusBar } from 'expo-status-bar';
import XIcon from 'lucide-react-native/icons/x';
import { ActionButton } from 'presentation/components/ActionButton/ActionButton';
import { AiLoading } from 'presentation/components/AiLoading/AiLoading';
import { ReviewActions } from 'presentation/components/ReviewActions/ReviewActions';
import { View } from 'react-native';
import { RecordActions } from './components/RecordActions/RecordActions';
import { RecordingPanel } from './components/RecordingPanel/RecordingPanel';
import { useAudioMealController } from './useAudioMealController';

export function AudioMeal() {
  const {
    screenPadding,
    microphoneStatus,
    canAskPermission,
    recordingStep,
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
    handleConfirm
  } = useAudioMealController();

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
        <ReviewActions
          confirmAccessibilityLabel='Confirmar áudio'
          discardAccessibilityLabel='Descartar áudio'
          onConfirm={handleConfirm}
          onDiscard={handleDiscard}
        />
      ) : (
        <RecordActions
          isDisabled={isRecordDisabled}
          isRecording={recordingStep === 'RECORDING'}
          isStartingRecording={isStartingRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />
      )}
    </View>
  );
}
