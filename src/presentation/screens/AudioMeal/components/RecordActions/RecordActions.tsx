import MicIcon from 'lucide-react-native/icons/mic';
import SquareIcon from 'lucide-react-native/icons/square';
import { ActionButton } from 'presentation/components/ActionButton/ActionButton';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { IRecordActionsProps } from './RecordActionsTypes';

export function RecordActions({
  isRecording,
  isStartingRecording,
  isDisabled,
  onStartRecording,
  onStopRecording
}: IRecordActionsProps) {
  const { t } = useTranslation();
  return (
    <View className='flex-row justify-center'>
      {isRecording ? (
        <ActionButton
          accessibilityLabel={t('audioMeal.stopRecording')}
          icon={SquareIcon}
          label={t('audioMeal.stop')}
          onPress={onStopRecording}
          variant='primary'
        />
      ) : (
        <ActionButton
          accessibilityLabel={t('audioMeal.record')}
          disabled={isDisabled}
          icon={MicIcon}
          isLoading={isStartingRecording}
          label={t('audioMeal.recordLabel')}
          onPress={onStartRecording}
          variant='brand'
        />
      )}
    </View>
  );
}
