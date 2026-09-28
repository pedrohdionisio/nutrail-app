import { DeleteSheet } from 'presentation/components/DeleteSheet/DeleteSheet';
import type { IDeleteAccountSheetProps } from './DeleteAccountSheetTypes';
import { useDeleteAccountSheetController } from './useDeleteAccountSheetController';

export function DeleteAccountSheet({ sheetRef }: IDeleteAccountSheetProps) {
  const { apiErrorMessage, isDeletingAccount, handleConfirm, handleCancel, handleDismiss } =
    useDeleteAccountSheetController({ sheetRef });

  return (
    <DeleteSheet
      apiErrorMessage={apiErrorMessage}
      description='Seu perfil, suas refeições, fotos e receitas serão apagados para sempre. Essa ação não pode ser desfeita.'
      isDeleting={isDeletingAccount}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      onDismiss={handleDismiss}
      sheetRef={sheetRef}
      title='Excluir conta?'
    />
  );
}
