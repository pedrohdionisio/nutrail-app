import { getApiErrorMessage } from 'data/config/apiError';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import { useDeleteAccount } from 'data/modules/me/useCases/deleteAccount/useDeleteAccount';
import { useState } from 'react';
import type { IUseDeleteAccountSheetControllerParams } from './DeleteAccountSheetTypes';

export function useDeleteAccountSheetController({
  sheetRef
}: IUseDeleteAccountSheetControllerParams) {
  const { signOut } = useAuth();
  const { deleteAccount, isDeletingAccount } = useDeleteAccount();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  async function handleConfirm() {
    setApiErrorMessage(null);

    try {
      await deleteAccount();
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));

      return;
    }

    sheetRef.current?.dismiss();
    await signOut();
  }

  function handleCancel() {
    sheetRef.current?.dismiss();
  }

  function handleDismiss() {
    setApiErrorMessage(null);
  }

  return {
    apiErrorMessage,
    isDeletingAccount,
    handleConfirm,
    handleCancel,
    handleDismiss
  };
}
