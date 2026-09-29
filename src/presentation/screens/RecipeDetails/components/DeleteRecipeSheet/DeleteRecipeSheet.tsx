import { DeleteSheet } from 'presentation/components/DeleteSheet/DeleteSheet';
import { useTranslation } from 'react-i18next';
import type { IDeleteRecipeSheetProps } from './DeleteRecipeSheetTypes';
import { useDeleteRecipeSheetController } from './useDeleteRecipeSheetController';

export function DeleteRecipeSheet({ sheetRef, recipeId, onDeleted }: IDeleteRecipeSheetProps) {
  const { t } = useTranslation();
  const { apiErrorMessage, isDeletingRecipe, handleConfirm, handleCancel, handleDismiss } =
    useDeleteRecipeSheetController({ sheetRef, recipeId, onDeleted });

  return (
    <DeleteSheet
      apiErrorMessage={apiErrorMessage}
      description={t('recipes.deleteDescription')}
      isDeleting={isDeletingRecipe}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      onDismiss={handleDismiss}
      sheetRef={sheetRef}
      title={t('recipes.deleteTitle')}
    />
  );
}
