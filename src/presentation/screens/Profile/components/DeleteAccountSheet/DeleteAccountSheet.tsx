import { DeleteSheet } from 'presentation/components/DeleteSheet/DeleteSheet';
import { useTranslation } from 'react-i18next';
import type { IDeleteAccountSheetProps } from './DeleteAccountSheetTypes';
import { useDeleteAccountSheetController } from './useDeleteAccountSheetController';

export function DeleteAccountSheet({ sheetRef }: IDeleteAccountSheetProps) {
  const { t } = useTranslation();
  const { apiErrorMessage, isDeletingAccount, handleConfirm, handleCancel, handleDismiss } =
    useDeleteAccountSheetController({ sheetRef });

  return (
    <DeleteSheet
      apiErrorMessage={apiErrorMessage}
      description={t('profile.deleteAccountDescription')}
      isDeleting={isDeletingAccount}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      onDismiss={handleDismiss}
      sheetRef={sheetRef}
      title={t('profile.deleteAccountTitle')}
    />
  );
}
