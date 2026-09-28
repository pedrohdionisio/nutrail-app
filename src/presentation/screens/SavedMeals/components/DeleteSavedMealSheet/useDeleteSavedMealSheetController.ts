import { getApiErrorMessage } from 'data/config/apiError';
import { useDeleteSavedMeal } from 'data/modules/savedMeal/useCases/deleteSavedMeal/useDeleteSavedMeal';
import { useState } from 'react';
import type { IUseDeleteSavedMealSheetControllerParams } from './DeleteSavedMealSheetTypes';

export function useDeleteSavedMealSheetController({
  sheetRef,
  savedMealId,
  onDeleted
}: IUseDeleteSavedMealSheetControllerParams) {
  const { deleteSavedMeal, isDeletingSavedMeal } = useDeleteSavedMeal();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  async function handleConfirm() {
    if (!savedMealId) {
      return;
    }

    setApiErrorMessage(null);

    try {
      await deleteSavedMeal({ savedMealId });
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
    isDeletingSavedMeal,
    handleConfirm,
    handleCancel,
    handleDismiss
  };
}
