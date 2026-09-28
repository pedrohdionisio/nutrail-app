import MicIcon from 'lucide-react-native/icons/mic';
import SquareIcon from 'lucide-react-native/icons/square';
import { ActionButton } from 'presentation/components/ActionButton/ActionButton';
import { View } from 'react-native';
import type { IRecordActionsProps } from './RecordActionsTypes';

export function RecordActions({
  isRecording,
  isStartingRecording,
  isDisabled,
  onStartRecording,
  onStopRecording
}: IRecordActionsProps) {
  return (
    <View className='flex-row justify-center'>
      {isRecording ? (
        <ActionButton
          accessibilityLabel='Parar gravação'
          icon={SquareIcon}
          label='Parar'
          onPress={onStopRecording}
          variant='primary'
        />
      ) : (
        <ActionButton
          accessibilityLabel='Gravar áudio'
          disabled={isDisabled}
          icon={MicIcon}
          isLoading={isStartingRecording}
          label='Gravar'
          onPress={onStartRecording}
          variant='brand'
        />
      )}
    </View>
  );
}
