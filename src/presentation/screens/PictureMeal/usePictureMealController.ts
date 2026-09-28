import {
  type RouteProp,
  useNavigation,
  usePreventRemove,
  useRoute
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getApiErrorMessage } from 'data/config/apiError';
import { MealPictureManager } from 'data/libs/MealPictureManager';
import { useCreatePictureMeal } from 'data/modules/meal/useCases/createPictureMeal/useCreatePictureMeal';
import { useReprocessMeal } from 'data/modules/meal/useCases/reprocessMeal/useReprocessMeal';
import { type CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Alert, Linking } from 'react-native';
import type { IMealDetails } from 'shared/entities/IMealDetails';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import { toDevicePermissionStatus } from 'shared/utils/toDevicePermissionStatus';
import { toLocalTime } from 'shared/utils/toLocalTime';
import type { IHandleReprocessMealParams } from './PictureMealTypes';

export function usePictureMealController() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutesParamList>>();
  const { params } = useRoute<RouteProp<AppRoutesParamList, 'PictureMeal'>>();
  const screenPadding = useScreenPadding();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const { createPictureMeal } = useCreatePictureMeal();
  const { reprocessMeal } = useReprocessMeal();
  const [pictureUri, setPictureUri] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isPicking, setIsPicking] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedMealId, setAnalyzedMealId] = useState<string | null>(null);
  const [shouldLeave, setShouldLeave] = useState(false);

  const permissionStatus = permission?.status;

  usePreventRemove(isAnalyzing, () => {});

  useEffect(() => {
    if (permissionStatus === 'undetermined') {
      requestPermission();
    }
  }, [permissionStatus, requestPermission]);

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

  function handleCameraReady() {
    setIsCameraReady(true);
  }

  function handleRequestPermission() {
    if (permission?.canAskAgain) {
      requestPermission();

      return;
    }

    Linking.openSettings();
  }

  async function handleCapture() {
    if (!cameraRef.current) {
      return;
    }

    setIsCapturing(true);

    try {
      const { uri, width } = await cameraRef.current.takePictureAsync({ quality: 1 });
      setPictureUri(await MealPictureManager.optimize({ uri, width }));
    } catch {
      Alert.alert('Não foi possível tirar a foto', 'Tente de novo em alguns instantes.');
    } finally {
      setIsCapturing(false);
    }
  }

  async function handlePickFromGallery() {
    setIsPicking(true);

    try {
      const pickedUri = await MealPictureManager.pick();

      if (pickedUri) {
        setPictureUri(pickedUri);
      }
    } catch {
      Alert.alert('Não foi possível abrir suas fotos', 'Tente de novo em alguns instantes.');
    } finally {
      setIsPicking(false);
    }
  }

  function handleDiscard() {
    setPictureUri(null);
    setIsCameraReady(false);
  }

  async function handleConfirm() {
    if (!pictureUri) {
      return;
    }

    setIsAnalyzing(true);

    try {
      const meal = await createPictureMeal({
        date: params.date,
        time: toLocalTime(new Date()),
        pictureUri
      });

      showAnalysisResult(meal);
    } catch (error) {
      Alert.alert('Não foi possível enviar a foto', getApiErrorMessage(error));
    } finally {
      setIsAnalyzing(false);
    }
  }

  async function handleReprocess({ mealId }: IHandleReprocessMealParams) {
    setIsAnalyzing(true);

    try {
      showAnalysisResult(await reprocessMeal({ mealId }));
    } catch (error) {
      Alert.alert('Não foi possível tentar de novo', getApiErrorMessage(error));
    } finally {
      setIsAnalyzing(false);
    }
  }

  function showAnalysisResult(meal: IMealDetails) {
    if (meal.status === 'SUCCESS') {
      setAnalyzedMealId(meal.id);

      return;
    }

    if (meal.status === 'FAILED') {
      Alert.alert(
        'Não conseguimos analisar a foto',
        'Tente de novo ou use outra foto, com os alimentos bem visíveis.',
        [
          { text: 'Cancelar', style: 'cancel' },
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
    cameraRef,
    cameraStatus: toDevicePermissionStatus(permission),
    canAskPermission: permission?.canAskAgain ?? true,
    pictureUri,
    isCaptureDisabled: !isCameraReady || isPicking,
    isCapturing,
    isPicking,
    shouldShowAnalyzing: isAnalyzing || !!analyzedMealId || shouldLeave,
    handleClose,
    handleCameraReady,
    handleRequestPermission,
    handleCapture,
    handlePickFromGallery,
    handleDiscard,
    handleConfirm
  };
}
