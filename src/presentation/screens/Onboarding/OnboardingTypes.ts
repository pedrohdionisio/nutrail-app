import type { SignUpFormType } from 'data/modules/auth/useCases/signUp/schemas/signUpSchema';
import type { LucideIcon } from 'lucide-react-native';
import type { FieldPath } from 'react-hook-form';

import type { ONBOARDING_STEP_IDS } from './constants/onboardingSteps';

export type OnboardingStepId = (typeof ONBOARDING_STEP_IDS)[number];

export type OnboardingContentAlignment = 'start' | 'center' | 'end';

export interface IOnboardingStep {
  title: string;
  description?: string;
  fields: FieldPath<SignUpFormType>[];
  contentAlignment: OnboardingContentAlignment;
}

export interface IOnboardingOption {
  value: string;
  label: string;
  description?: string;
  icon: LucideIcon;
}
