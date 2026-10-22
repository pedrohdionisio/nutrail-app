import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, usePreventRemove } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import {
  type SignUpFormType,
  type SignUpPayloadType,
  signUpSchema
} from 'data/modules/auth/useCases/signUp/schemas/signUpSchema';
import { useSignUp } from 'data/modules/auth/useCases/signUp/useSignUp';
import { useGetMe } from 'data/modules/me/useCases/getMe/useGetMe';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { ONBOARDING_STEP_IDS, ONBOARDING_STEPS } from './constants/onboardingSteps';
import type { OnboardingStepId } from './OnboardingTypes';

export function useOnboardingController() {
  const navigation = useNavigation();
  const { activateSession, enterApp } = useAuth();
  const { signUp, isSigningUp } = useSignUp();
  const [stepId, setStepId] = useState<OnboardingStepId>('goal');
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const { me, isMeError, refetchMe } = useGetMe({ enabled: hasSignedUp });

  const { control, trigger, handleSubmit } = useForm<SignUpFormType, unknown, SignUpPayloadType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      birthDate: '',
      height: '',
      weight: '',
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  });

  const values = useWatch({ control });
  const currentStep = ONBOARDING_STEPS[stepId];
  const stepIndex = ONBOARDING_STEP_IDS.indexOf(stepId);
  const previousStepId = ONBOARDING_STEP_IDS[stepIndex - 1];
  const nextStepId = ONBOARDING_STEP_IDS[stepIndex + 1];

  usePreventRemove(!!previousStepId || hasSignedUp, () => {
    if (!hasSignedUp && previousStepId) {
      setStepId(previousStepId);
    }
  });

  function handleGoBack() {
    if (previousStepId) {
      setStepId(previousStepId);

      return;
    }

    navigation.goBack();
  }

  async function handleNext() {
    const isStepValid = await trigger(currentStep.fields);

    if (isStepValid && nextStepId) {
      setStepId(nextStepId);
    }
  }

  async function onSubmit(payload: SignUpPayloadType) {
    setApiErrorMessage(null);

    try {
      await activateSession(await signUp(payload));
      setHasSignedUp(true);
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  function handleRetry() {
    refetchMe();
  }

  return {
    stepId,
    currentStep,
    progress: stepIndex / (ONBOARDING_STEP_IDS.length - 1),
    control,
    me,
    isPersonalizing: hasSignedUp && !me,
    isMeError,
    isSigningUp,
    isNextDisabled: currentStep.fields.some((field) => !values[field]),
    apiErrorMessage,
    handleGoBack,
    handleNext,
    handleCreateAccount: handleSubmit(onSubmit),
    handleRetry,
    handleStart: enterApp
  };
}
