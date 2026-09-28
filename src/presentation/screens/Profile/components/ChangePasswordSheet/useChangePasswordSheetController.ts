import { zodResolver } from '@hookform/resolvers/zod';
import { getApiErrorMessage } from 'data/config/apiError';
import {
  type ChangePasswordFormType,
  type ChangePasswordPayloadType,
  changePasswordSchema
} from 'data/modules/me/useCases/changePassword/schemas/changePasswordSchema';
import { useChangePassword } from 'data/modules/me/useCases/changePassword/useChangePassword';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert } from 'react-native';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { IUseChangePasswordSheetControllerParams } from './ChangePasswordSheetTypes';

const EMPTY_FORM: ChangePasswordFormType = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: ''
};

export function useChangePasswordSheetController({
  sheetRef
}: IUseChangePasswordSheetControllerParams) {
  const { paddingBottom } = useScreenPadding();
  const { changePassword, isChangingPassword } = useChangePassword();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<
    ChangePasswordFormType,
    unknown,
    ChangePasswordPayloadType
  >({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: EMPTY_FORM
  });

  const [currentPassword, newPassword, newPasswordConfirmation] = useWatch({
    control,
    name: ['currentPassword', 'newPassword', 'newPasswordConfirmation']
  });

  async function onSubmit(payload: ChangePasswordPayloadType) {
    setApiErrorMessage(null);

    try {
      await changePassword(payload);
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));

      return;
    }

    sheetRef.current?.dismiss();
    Alert.alert('Senha alterada', 'Use a nova senha na próxima vez que entrar.');
  }

  function handleDismiss() {
    reset(EMPTY_FORM);
    setApiErrorMessage(null);
  }

  return {
    paddingBottom,
    control,
    apiErrorMessage,
    isChangingPassword,
    isSubmitDisabled: !currentPassword || !newPassword || !newPasswordConfirmation,
    handleSubmit: handleSubmit(onSubmit),
    handleDismiss
  };
}
