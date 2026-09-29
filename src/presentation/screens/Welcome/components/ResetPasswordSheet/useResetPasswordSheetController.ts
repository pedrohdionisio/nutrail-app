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
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import type { IUseResetPasswordSheetControllerParams } from './ResetPasswordSheetTypes';

export function useResetPasswordSheetController({
  email,
  onPasswordReset
}: IUseResetPasswordSheetControllerParams) {
  const { t } = useTranslation();
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

      Alert.alert(t('welcome.passwordResetTitle'), t('welcome.passwordResetMessage'));
      onPasswordReset();
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  async function handleResendCode() {
    setApiErrorMessage(null);

    try {
      await requestPasswordReset({ email });

      Alert.alert(t('welcome.codeResentTitle'), t('welcome.codeResentMessage', { email }));
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  return {
    description: t('welcome.resetPasswordDescription', { email }),
    control,
    apiErrorMessage,
    isResettingPassword,
    isRequestingPasswordReset,
    isSubmitDisabled: !code || !password || !passwordConfirmation,
    handleResendCode,
    handleSubmit: handleSubmit(onSubmit)
  };
}
