import { DeleteSheet } from 'presentation/components/DeleteSheet/DeleteSheet';
import type { IDeleteMealSheetProps } from './DeleteMealSheetTypes';
import { useDeleteMealSheetController } from './useDeleteMealSheetController';

export function DeleteMealSheet({ sheetRef, mealId, onDeleted }: IDeleteMealSheetProps) {
  const { apiErrorMessage, isDeletingMeal, handleConfirm, handleCancel, handleDismiss } =
    useDeleteMealSheetController({ sheetRef, mealId, onDeleted });

  return (
    <DeleteSheet
      apiErrorMessage={apiErrorMessage}
      description='A refeição e a foto serão apagadas. Essa ação não pode ser desfeita.'
      isDeleting={isDeletingMeal}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      onDismiss={handleDismiss}
      sheetRef={sheetRef}
      title='Excluir refeição?'
    />
  );
}
