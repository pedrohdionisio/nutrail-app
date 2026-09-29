import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useCreateMealFromSavedMeal } from 'data/modules/meal/useCases/createMealFromSavedMeal/useCreateMealFromSavedMeal';
import { useListSavedMeals } from 'data/modules/savedMeal/useCases/listSavedMeals/useListSavedMeals';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useMealTimePicker } from 'shared/hooks/useMealTimePicker';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import type {
  IHandleDeleteSavedMealParams,
  IHandleSelectSavedMealParams
} from './components/SavedMealCard/SavedMealCardTypes';

export function useSavedMealsController() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AppRoutesParamList, 'SavedMeals'>>();
  const { paddingBottom } = useScreenPadding();
  const deleteSavedMealSheetRef = useRef<BottomSheetModal>(null);
  const [savedMealIdToDelete, setSavedMealIdToDelete] = useState<string | null>(null);
  const {
    savedMeals,
    isLoadingSavedMeals,
    isSavedMealsError,
    isRefetchingSavedMeals,
    refetchSavedMeals
  } = useListSavedMeals();
  const { createMealFromSavedMeal, creatingSavedMealId } = useCreateMealFromSavedMeal();
  const { timeLabel, timePickerSheetBindings, handleOpenTimePicker, getMealTime } =
    useMealTimePicker({ date: params.date });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSelectSavedMeal({ savedMealId }: IHandleSelectSavedMealParams) {
    try {
      await createMealFromSavedMeal({ savedMealId, date: params.date, time: getMealTime() });
      navigation.goBack();
    } catch (error) {
      Alert.alert(t('savedMeals.logError'), getApiErrorMessage(error));
    }
  }

  function handleDeleteSavedMeal({ savedMealId }: IHandleDeleteSavedMealParams) {
    setSavedMealIdToDelete(savedMealId);
    deleteSavedMealSheetRef.current?.present();
  }

  function handleSavedMealDeleted() {
    setSavedMealIdToDelete(null);
  }

  function handleRetry() {
    refetchSavedMeals();
  }

  return {
    savedMeals,
    isLoadingSavedMeals,
    isSavedMealsError,
    isRefetchingSavedMeals,
    shouldShowTimeButton: savedMeals.length > 0,
    creatingSavedMealId,
    isCreatingMeal: creatingSavedMealId !== null,
    timeLabel,
    timePickerSheetBindings,
    listPaddingBottom: paddingBottom,
    deleteSavedMealSheetRef,
    savedMealIdToDelete,
    handleGoBack,
    handleOpenTimePicker,
    handleSelectSavedMeal,
    handleDeleteSavedMeal,
    handleSavedMealDeleted,
    handleRetry
  };
}
