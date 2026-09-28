import { getApiErrorMessage } from 'data/config/apiError';
import { useDeleteMeal } from 'data/modules/meal/useCases/deleteMeal/useDeleteMeal';
import { useState } from 'react';
import type { IUseDeleteMealSheetControllerParams } from './DeleteMealSheetTypes';

export function useDeleteMealSheetController({
  sheetRef,
  mealId,
  onDeleted
}: IUseDeleteMealSheetControllerParams) {
  const { deleteMeal, isDeletingMeal } = useDeleteMeal();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  async function handleConfirm() {
    if (!mealId) {
      return;
    }

    setApiErrorMessage(null);

    try {
      await deleteMeal({ mealId });
      sheetRef.current?.dismiss();
      onDeleted();
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  function handleCancel() {
    sheetRef.current?.dismiss();
  }

  function handleDismiss() {
    setApiErrorMessage(null);
  }

  return {
    apiErrorMessage,
    isDeletingMeal,
    handleConfirm,
    handleCancel,
    handleDismiss
  };
}
