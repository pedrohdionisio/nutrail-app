import { DeleteSheet } from 'presentation/components/DeleteSheet/DeleteSheet';
import type { IDeleteSavedMealSheetProps } from './DeleteSavedMealSheetTypes';
import { useDeleteSavedMealSheetController } from './useDeleteSavedMealSheetController';

export function DeleteSavedMealSheet({
  sheetRef,
  savedMealId,
  onDeleted
}: IDeleteSavedMealSheetProps) {
  const { apiErrorMessage, isDeletingSavedMeal, handleConfirm, handleCancel, handleDismiss } =
    useDeleteSavedMealSheetController({ sheetRef, savedMealId, onDeleted });

  return (
    <DeleteSheet
      apiErrorMessage={apiErrorMessage}
      description='Ela sai da sua lista de refeições salvas. As refeições já cadastradas continuam no diário.'
      isDeleting={isDeletingSavedMeal}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      onDismiss={handleDismiss}
      sheetRef={sheetRef}
      title='Excluir refeição salva?'
    />
  );
}
