import { zodResolver } from '@hookform/resolvers/zod';
import { getApiErrorMessage } from 'data/config/apiError';
import {
  type RequestPasswordResetFormType,
  requestPasswordResetSchema
} from 'data/modules/auth/useCases/requestPasswordReset/schemas/requestPasswordResetSchema';
import { useRequestPasswordReset } from 'data/modules/auth/useCases/requestPasswordReset/useRequestPasswordReset';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { IUseForgotPasswordSheetControllerParams } from './ForgotPasswordSheetTypes';

export function useForgotPasswordSheetController({
  onCodeSent
}: IUseForgotPasswordSheetControllerParams) {
  const { requestPasswordReset, isRequestingPasswordReset } = useRequestPasswordReset();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<RequestPasswordResetFormType>({
    resolver: zodResolver(requestPasswordResetSchema),
    defaultValues: { email: '' }
  });

  const email = useWatch({ control, name: 'email' });

  async function onSubmit(payload: RequestPasswordResetFormType) {
    setApiErrorMessage(null);

    try {
      await requestPasswordReset(payload);
      onCodeSent({ email: payload.email });
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  return {
    control,
    apiErrorMessage,
    isRequestingPasswordReset,
    isSubmitDisabled: !email,
    handleSubmit: handleSubmit(onSubmit)
  };
}
