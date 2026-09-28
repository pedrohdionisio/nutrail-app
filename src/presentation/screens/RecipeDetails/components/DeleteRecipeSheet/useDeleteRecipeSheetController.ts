import { getApiErrorMessage } from 'data/config/apiError';
import { useDeleteRecipe } from 'data/modules/recipe/useCases/deleteRecipe/useDeleteRecipe';
import { useState } from 'react';
import type { IUseDeleteRecipeSheetControllerParams } from './DeleteRecipeSheetTypes';

export function useDeleteRecipeSheetController({
  sheetRef,
  recipeId,
  onDeleted
}: IUseDeleteRecipeSheetControllerParams) {
  const { deleteRecipe, isDeletingRecipe } = useDeleteRecipe();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  async function handleConfirm() {
    setApiErrorMessage(null);

    try {
      await deleteRecipe({ recipeId });
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
    isDeletingRecipe,
    handleConfirm,
    handleCancel,
    handleDismiss
  };
}
