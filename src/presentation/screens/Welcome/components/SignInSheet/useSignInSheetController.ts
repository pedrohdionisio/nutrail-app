import { zodResolver } from '@hookform/resolvers/zod';
import { getApiErrorMessage } from 'data/config/apiError';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import {
  type SignInFormType,
  signInSchema
} from 'data/modules/auth/useCases/signIn/schemas/signInSchema';
import { useSignIn } from 'data/modules/auth/useCases/signIn/useSignIn';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

export function useSignInSheetController() {
  const { activateSession, enterApp } = useAuth();
  const { signIn, isSigningIn } = useSignIn();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [email, password] = useWatch({ control, name: ['email', 'password'] });

  async function onSubmit(formData: SignInFormType) {
    setApiErrorMessage(null);

    try {
      await activateSession(await signIn(formData));
      enterApp();
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  return {
    control,
    apiErrorMessage,
    isSigningIn,
    isSubmitDisabled: !email || !password,
    handleSubmit: handleSubmit(onSubmit)
  };
}
