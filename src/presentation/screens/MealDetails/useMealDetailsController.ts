import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useGetMeal } from 'data/modules/meal/useCases/getMeal/useGetMeal';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';

export function useMealDetailsController() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AppRoutesParamList, 'MealDetails'>>();
  const { paddingBottom } = useScreenPadding();
  const { meal, isLoadingMeal, mealError, isRefetchingMeal, refetchMeal } = useGetMeal({
    mealId: params.mealId
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleEdit() {
    navigation.navigate('EditMeal', { mealId: params.mealId });
  }

  function handleRetry() {
    refetchMeal();
  }

  return {
    meal,
    mealName: meal?.name ?? null,
    items: meal?.items ?? [],
    pictureUrl: meal?.pictureUrl ?? null,
    isLoadingMeal,
    canEdit: meal?.status === 'SUCCESS',
    shouldShowError: !meal && !!mealError,
    errorMessage: getApiErrorMessage(mealError),
    isRefetchingMeal,
    listPaddingBottom: paddingBottom,
    handleGoBack,
    handleEdit,
    handleRetry
  };
}
