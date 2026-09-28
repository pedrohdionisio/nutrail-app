import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { MealPictureManager } from 'data/libs/MealPictureManager';
import { useAttachMealPicture } from 'data/modules/meal/useCases/attachMealPicture/useAttachMealPicture';
import { useGetMeal } from 'data/modules/meal/useCases/getMeal/useGetMeal';
import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';

export function useMealDetailsController() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AppRoutesParamList, 'MealDetails'>>();
  const { paddingBottom } = useScreenPadding();
  const deleteMealSheetRef = useRef<BottomSheetModal>(null);
  const saveMealSheetRef = useRef<BottomSheetModal>(null);
  const { meal, isLoadingMeal, mealError, isRefetchingMeal, refetchMeal } = useGetMeal({
    mealId: params.mealId
  });
  const { attachMealPicture, isAttachingMealPicture } = useAttachMealPicture();
  const [isPickingPicture, setIsPickingPicture] = useState(false);
  const [attachedPictureUri, setAttachedPictureUri] = useState<string | null>(null);

  const isFinished = meal?.status === 'SUCCESS' || meal?.status === 'FAILED';

  function handleGoBack() {
    navigation.goBack();
  }

  function handleEdit() {
    navigation.navigate('EditMeal', { mealId: params.mealId });
  }

  function handleSave() {
    saveMealSheetRef.current?.present();
  }

  function handleDelete() {
    deleteMealSheetRef.current?.present();
  }

  function handleMealDeleted() {
    navigation.goBack();
  }

  async function handleChangePicture() {
    setIsPickingPicture(true);

    let pictureUri: string | null = null;

    try {
      pictureUri = await MealPictureManager.pick();
    } catch {
      Alert.alert('Não foi possível abrir suas fotos', 'Tente de novo em alguns instantes.');
    } finally {
      setIsPickingPicture(false);
    }

    if (!pictureUri) {
      return;
    }

    try {
      await attachMealPicture({ mealId: params.mealId, pictureUri });
      setAttachedPictureUri(pictureUri);
    } catch (error) {
      Alert.alert('Não foi possível enviar a foto', getApiErrorMessage(error));
    }
  }

  function handleRetry() {
    refetchMeal();
  }

  return {
    mealId: params.mealId,
    meal,
    mealName: meal?.name ?? null,
    items: meal?.items ?? [],
    pictureUrl: attachedPictureUri ?? meal?.pictureUrl ?? null,
    isLoadingMeal,
    canEdit: meal?.status === 'SUCCESS',
    canSave: meal?.status === 'SUCCESS',
    canDelete: !!meal,
    canChangePicture: meal?.inputType !== 'PICTURE' && isFinished,
    isChangingPicture: isPickingPicture || isAttachingMealPicture,
    shouldShowError: !meal && !!mealError,
    errorMessage: getApiErrorMessage(mealError),
    isRefetchingMeal,
    listPaddingBottom: paddingBottom,
    deleteMealSheetRef,
    saveMealSheetRef,
    handleGoBack,
    handleEdit,
    handleSave,
    handleDelete,
    handleMealDeleted,
    handleChangePicture,
    handleRetry
  };
}
