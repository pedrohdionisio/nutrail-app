import {
  type RouteProp,
  useNavigation,
  usePreventRemove,
  useRoute
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getApiErrorMessage } from 'data/config/apiError';
import { MEAL_RECORDING_OPTIONS, MealAudioManager } from 'data/libs/MealAudioManager';
import { useCreateAudioMeal } from 'data/modules/meal/useCases/createAudioMeal/useCreateAudioMeal';
import { useDeleteMeal } from 'data/modules/meal/useCases/deleteMeal/useDeleteMeal';
import { useReprocessMeal } from 'data/modules/meal/useCases/reprocessMeal/useReprocessMeal';
import type { PermissionResponse } from 'expo';
import {
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState
} from 'expo-audio';
import { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import type { IMealDetails } from 'shared/entities/IMealDetails';
import { useMealTimePicker } from 'shared/hooks/useMealTimePicker';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import { toDevicePermissionStatus } from 'shared/utils/toDevicePermissionStatus';
import type { IHandleFailedMealParams, IRecording, RecordingStep } from './AudioMealTypes';
import { formatRecordingDuration } from './utils/formatRecordingDuration';

export function useAudioMealController() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutesParamList>>();
  const { params } = useRoute<RouteProp<AppRoutesParamList, 'AudioMeal'>>();
  const screenPadding = useScreenPadding();
  const recorder = useAudioRecorder(MEAL_RECORDING_OPTIONS);
  const recorderState = useAudioRecorderState(recorder);
  const { createAudioMeal } = useCreateAudioMeal();
  const { reprocessMeal } = useReprocessMeal();
  const { deleteMeal } = useDeleteMeal();
  const { timeLabel, timePickerSheetBindings, handleOpenTimePicker, getMealTime } =
    useMealTimePicker({ date: params.date });
  const [permission, setPermission] = useState<PermissionResponse | null>(null);
  const [recording, setRecording] = useState<IRecording | null>(null);
  const [isStartingRecording, setIsStartingRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedMealId, setAnalyzedMealId] = useState<string | null>(null);
  const [shouldLeave, setShouldLeave] = useState(false);
  const player = useAudioPlayer(recording?.uri ?? null);
  const playerStatus = useAudioPlayerStatus(player);

  const microphoneStatus = toDevicePermissionStatus(permission);

  let recordingStep: RecordingStep = 'IDLE';

  if (recorderState.isRecording) {
    recordingStep = 'RECORDING';
  }

  if (recording) {
    recordingStep = 'RECORDED';
  }

  usePreventRemove(isAnalyzing, () => {});

  useEffect(() => {
    MealAudioManager.getPermission().then(setPermission);
  }, []);

  useEffect(() => {
    if (analyzedMealId) {
      navigation.replace('MealDetails', { mealId: analyzedMealId });
    }
  }, [analyzedMealId, navigation]);

  useEffect(() => {
    if (shouldLeave) {
      navigation.goBack();
    }
  }, [shouldLeave, navigation]);

  function handleClose() {
    navigation.goBack();
  }

  async function handleRequestPermission() {
    if (permission?.canAskAgain) {
      setPermission(await MealAudioManager.requestPermission());

      return;
    }

    Linking.openSettings();
  }

  async function handleStartRecording() {
    setIsStartingRecording(true);

    try {
      await MealAudioManager.enableRecording();
      await recorder.prepareToRecordAsync();
      recorder.record();
    } catch {
      Alert.alert('Não foi possível gravar o áudio', 'Tente de novo em alguns instantes.');
    } finally {
      setIsStartingRecording(false);
    }
  }

  async function handleStopRecording() {
    const { durationMillis } = recorderState;

    try {
      await recorder.stop();
      await MealAudioManager.enablePlayback();

      if (recorder.uri) {
        setRecording({ uri: recorder.uri, durationMillis });
      }
    } catch {
      Alert.alert('Não foi possível salvar o áudio', 'Tente gravar de novo.');
    }
  }

  async function handleTogglePlayback() {
    if (playerStatus.playing) {
      player.pause();

      return;
    }

    if (playerStatus.currentTime >= playerStatus.duration) {
      await player.seekTo(0);
    }

    player.play();
  }

  function handleDiscard() {
    player.pause();
    setRecording(null);
  }

  async function handleConfirm() {
    if (!recording) {
      return;
    }

    player.pause();
    setIsAnalyzing(true);

    try {
      const meal = await createAudioMeal({
        date: params.date,
        time: getMealTime(),
        audioUri: recording.uri
      });

      showAnalysisResult(meal);
    } catch (error) {
      Alert.alert('Não foi possível enviar o áudio', getApiErrorMessage(error));
    } finally {
      setIsAnalyzing(false);
    }
  }

  async function handleReprocess({ mealId }: IHandleFailedMealParams) {
    setIsAnalyzing(true);

    try {
      showAnalysisResult(await reprocessMeal({ mealId }));
    } catch (error) {
      Alert.alert('Não foi possível tentar de novo', getApiErrorMessage(error));
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleDiscardFailedMeal({ mealId }: IHandleFailedMealParams) {
    deleteMeal({ mealId }).catch(() => undefined);
  }

  function showAnalysisResult(meal: IMealDetails) {
    if (meal.status === 'SUCCESS') {
      setAnalyzedMealId(meal.id);

      return;
    }

    if (meal.status === 'FAILED') {
      Alert.alert(
        'Não conseguimos entender o áudio',
        'Tente de novo ou grave outra vez, dizendo os alimentos e as quantidades.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => handleDiscardFailedMeal({ mealId: meal.id })
          },
          { text: 'Tentar de novo', onPress: () => handleReprocess({ mealId: meal.id }) }
        ]
      );

      return;
    }

    Alert.alert(
      'A análise está demorando',
      'Sua refeição vai aparecer na lista assim que ficar pronta.'
    );
    setShouldLeave(true);
  }

  return {
    screenPadding,
    microphoneStatus,
    canAskPermission: permission?.canAskAgain ?? true,
    recordingStep,
    timeLabel,
    timePickerSheetBindings,
    durationLabel: formatRecordingDuration(
      recording?.durationMillis ?? recorderState.durationMillis
    ),
    isPlaying: playerStatus.playing,
    isStartingRecording,
    isRecordDisabled: microphoneStatus !== 'GRANTED',
    shouldShowAnalyzing: isAnalyzing || !!analyzedMealId || shouldLeave,
    handleClose,
    handleRequestPermission,
    handleStartRecording,
    handleStopRecording,
    handleTogglePlayback,
    handleDiscard,
    handleConfirm,
    handleOpenTimePicker
  };
}
