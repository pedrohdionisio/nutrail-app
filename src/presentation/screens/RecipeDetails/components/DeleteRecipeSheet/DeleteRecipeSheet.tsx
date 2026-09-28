import { DeleteSheet } from 'presentation/components/DeleteSheet/DeleteSheet';
import type { IDeleteRecipeSheetProps } from './DeleteRecipeSheetTypes';
import { useDeleteRecipeSheetController } from './useDeleteRecipeSheetController';

export function DeleteRecipeSheet({ sheetRef, recipeId, onDeleted }: IDeleteRecipeSheetProps) {
  const { apiErrorMessage, isDeletingRecipe, handleConfirm, handleCancel, handleDismiss } =
    useDeleteRecipeSheetController({ sheetRef, recipeId, onDeleted });

  return (
    <DeleteSheet
      apiErrorMessage={apiErrorMessage}
      description='A receita será apagada. Essa ação não pode ser desfeita.'
      isDeleting={isDeletingRecipe}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      onDismiss={handleDismiss}
      sheetRef={sheetRef}
      title='Excluir receita?'
    />
  );
}
