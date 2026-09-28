import MicIcon from 'lucide-react-native/icons/mic';
import PauseIcon from 'lucide-react-native/icons/pause';
import PlayIcon from 'lucide-react-native/icons/play';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { cn } from 'shared/utils/cn';
import { RECORDING_HINTS } from './constants/recordingHints';
import type { IRecordingPanelProps } from './RecordingPanelTypes';

export function RecordingPanel({
  microphoneStatus,
  canAskPermission,
  recordingStep,
  durationLabel,
  isPlaying,
  onRequestPermission,
  onTogglePlayback
}: IRecordingPanelProps) {
  const isRecording = recordingStep === 'RECORDING';
  const PlaybackIcon = isPlaying ? PauseIcon : PlayIcon;

  return (
    <View className='flex-1 items-center justify-center gap-8 px-8'>
      {microphoneStatus === 'LOADING' && (
        <ActivityIndicator accessibilityLabel='Preparando o microfone' color={COLORS.lime[500]} />
      )}

      {microphoneStatus === 'DENIED' && (
        <View className='gap-6'>
          <AppText align='center' color='inverse'>
            Permita o acesso ao microfone para gravar a descrição da sua refeição.
          </AppText>

          <Button
            onPress={onRequestPermission}
            title={canAskPermission ? 'Permitir microfone' : 'Abrir ajustes'}
          />
        </View>
      )}

      {microphoneStatus === 'GRANTED' && recordingStep === 'RECORDED' && (
        <Pressable
          accessibilityLabel={isPlaying ? 'Pausar áudio' : 'Ouvir áudio'}
          accessibilityRole='button'
          className='h-24 w-24 items-center justify-center rounded-full bg-black-700 active:opacity-80'
          onPress={onTogglePlayback}
        >
          <PlaybackIcon color={COLORS.lime[500]} size={32} strokeWidth={1.8} />
        </Pressable>
      )}

      {microphoneStatus === 'GRANTED' && recordingStep !== 'RECORDED' && (
        <View
          className={cn(
            'h-24 w-24 items-center justify-center rounded-full',
            isRecording ? 'bg-lime-500' : 'bg-black-700'
          )}
        >
          <MicIcon
            color={isRecording ? COLORS.black[700] : COLORS.lime[500]}
            size={32}
            strokeWidth={1.8}
          />
        </View>
      )}

      {microphoneStatus === 'GRANTED' && (
        <View className='gap-3'>
          <AppText align='center' color='inverse' size='title1'>
            {durationLabel}
          </AppText>

          <AppText align='center' color='inverseMuted'>
            {RECORDING_HINTS[recordingStep]}
          </AppText>
        </View>
      )}
    </View>
  );
}
