import { zodResolver } from '@hookform/resolvers/zod';
import { getApiErrorMessage } from 'data/config/apiError';
import { useRequestPasswordReset } from 'data/modules/auth/useCases/requestPasswordReset/useRequestPasswordReset';
import {
  type ResetPasswordFormType,
  type ResetPasswordPayloadType,
  resetPasswordSchema
} from 'data/modules/auth/useCases/resetPassword/schemas/resetPasswordSchema';
import { useResetPassword } from 'data/modules/auth/useCases/resetPassword/useResetPassword';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert } from 'react-native';
import type { IUseResetPasswordSheetControllerParams } from './ResetPasswordSheetTypes';

export function useResetPasswordSheetController({
  email,
  onPasswordReset
}: IUseResetPasswordSheetControllerParams) {
  const { resetPassword, isResettingPassword } = useResetPassword();
  const { requestPasswordReset, isRequestingPasswordReset } = useRequestPasswordReset();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<
    ResetPasswordFormType,
    unknown,
    ResetPasswordPayloadType
  >({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: '', password: '', passwordConfirmation: '' }
  });

  const [code, password, passwordConfirmation] = useWatch({
    control,
    name: ['code', 'password', 'passwordConfirmation']
  });

  async function onSubmit(payload: ResetPasswordPayloadType) {
    setApiErrorMessage(null);

    try {
      await resetPassword({ email, ...payload });

      Alert.alert('Senha alterada', 'Entre com a sua nova senha.');
      onPasswordReset();
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  async function handleResendCode() {
    setApiErrorMessage(null);

    try {
      await requestPasswordReset({ email });

      Alert.alert('Código reenviado', `Enviamos um novo código para ${email}.`);
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  return {
    description: `Enviamos um código para ${email}. Confira também a caixa de spam.`,
    control,
    apiErrorMessage,
    isResettingPassword,
    isRequestingPasswordReset,
    isSubmitDisabled: !code || !password || !passwordConfirmation,
    handleResendCode,
    handleSubmit: handleSubmit(onSubmit)
  };
}
