import { DeleteSheet } from 'presentation/components/DeleteSheet/DeleteSheet';
import { useTranslation } from 'react-i18next';
import type { IDeleteMealSheetProps } from './DeleteMealSheetTypes';
import { useDeleteMealSheetController } from './useDeleteMealSheetController';

export function DeleteMealSheet({ sheetRef, mealId, onDeleted }: IDeleteMealSheetProps) {
  const { t } = useTranslation();
  const { apiErrorMessage, isDeletingMeal, handleConfirm, handleCancel, handleDismiss } =
    useDeleteMealSheetController({ sheetRef, mealId, onDeleted });

  return (
    <DeleteSheet
      apiErrorMessage={apiErrorMessage}
      description={t('common.deleteMealDescription')}
      isDeleting={isDeletingMeal}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      onDismiss={handleDismiss}
      sheetRef={sheetRef}
      title={t('common.deleteMealTitle')}
    />
  );
}
