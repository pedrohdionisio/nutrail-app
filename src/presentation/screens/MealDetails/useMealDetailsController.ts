import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useGetMeal } from 'data/modules/meal/useCases/getMeal/useGetMeal';
import { useRef } from 'react';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';

export function useMealDetailsController() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AppRoutesParamList, 'MealDetails'>>();
  const { paddingBottom } = useScreenPadding();
  const deleteMealSheetRef = useRef<BottomSheetModal>(null);
  const { meal, isLoadingMeal, mealError, isRefetchingMeal, refetchMeal } = useGetMeal({
    mealId: params.mealId
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleEdit() {
    navigation.navigate('EditMeal', { mealId: params.mealId });
  }

  function handleDelete() {
    deleteMealSheetRef.current?.present();
  }

  function handleMealDeleted() {
    navigation.goBack();
  }

  function handleRetry() {
    refetchMeal();
  }

  return {
    mealId: params.mealId,
    meal,
    mealName: meal?.name ?? null,
    items: meal?.items ?? [],
    pictureUrl: meal?.pictureUrl ?? null,
    isLoadingMeal,
    canEdit: meal?.status === 'SUCCESS',
    canDelete: !!meal,
    shouldShowError: !meal && !!mealError,
    errorMessage: getApiErrorMessage(mealError),
    isRefetchingMeal,
    listPaddingBottom: paddingBottom,
    deleteMealSheetRef,
    handleGoBack,
    handleEdit,
    handleDelete,
    handleMealDeleted,
    handleRetry
  };
}
