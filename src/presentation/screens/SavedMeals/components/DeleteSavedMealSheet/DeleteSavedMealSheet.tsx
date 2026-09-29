import { DeleteSheet } from 'presentation/components/DeleteSheet/DeleteSheet';
import { useTranslation } from 'react-i18next';
import type { IDeleteSavedMealSheetProps } from './DeleteSavedMealSheetTypes';
import { useDeleteSavedMealSheetController } from './useDeleteSavedMealSheetController';

export function DeleteSavedMealSheet({
  sheetRef,
  savedMealId,
  onDeleted
}: IDeleteSavedMealSheetProps) {
  const { t } = useTranslation();
  const { apiErrorMessage, isDeletingSavedMeal, handleConfirm, handleCancel, handleDismiss } =
    useDeleteSavedMealSheetController({ sheetRef, savedMealId, onDeleted });

  return (
    <DeleteSheet
      apiErrorMessage={apiErrorMessage}
      description={t('savedMeals.deleteDescription')}
      isDeleting={isDeletingSavedMeal}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      onDismiss={handleDismiss}
      sheetRef={sheetRef}
      title={t('savedMeals.deleteTitle')}
    />
  );
}
