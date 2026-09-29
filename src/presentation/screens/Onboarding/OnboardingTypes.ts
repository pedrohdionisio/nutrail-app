import type { TranslationKey } from 'data/config/i18n';
import type { SignUpFormType } from 'data/modules/auth/useCases/signUp/schemas/signUpSchema';
import type { FieldPath } from 'react-hook-form';

import type { ONBOARDING_STEP_IDS } from './constants/onboardingSteps';

export type OnboardingStepId = (typeof ONBOARDING_STEP_IDS)[number];

export type OnboardingContentAlignment = 'start' | 'center' | 'end';

export interface IOnboardingStep {
  title: TranslationKey;
  description?: TranslationKey;
  fields: FieldPath<SignUpFormType>[];
  contentAlignment: OnboardingContentAlignment;
}
