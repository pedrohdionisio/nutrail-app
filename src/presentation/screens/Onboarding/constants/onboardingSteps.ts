import type { IOnboardingStep, OnboardingStepId } from '../OnboardingTypes';

export const ONBOARDING_STEP_IDS = [
  'goal',
  'gender',
  'birthDate',
  'height',
  'weight',
  'activityLevel',
  'account'
] as const;

export const ONBOARDING_STEPS: Record<OnboardingStepId, IOnboardingStep> = {
  goal: {
    title: 'onboarding.steps.goal.title',
    description: 'onboarding.steps.goal.description',
    fields: ['goal'],
    contentAlignment: 'end'
  },
  gender: {
    title: 'onboarding.steps.gender.title',
    description: 'onboarding.steps.gender.description',
    fields: ['gender'],
    contentAlignment: 'end'
  },
  birthDate: {
    title: 'onboarding.steps.birthDate.title',
    description: 'onboarding.steps.birthDate.description',
    fields: ['birthDate'],
    contentAlignment: 'center'
  },
  height: {
    title: 'onboarding.steps.height.title',
    description: 'onboarding.steps.height.description',
    fields: ['height'],
    contentAlignment: 'center'
  },
  weight: {
    title: 'onboarding.steps.weight.title',
    description: 'onboarding.steps.weight.description',
    fields: ['weight'],
    contentAlignment: 'center'
  },
  activityLevel: {
    title: 'onboarding.steps.activityLevel.title',
    fields: ['activityLevel'],
    contentAlignment: 'start'
  },
  account: {
    title: 'onboarding.steps.account.title',
    description: 'onboarding.steps.account.description',
    fields: ['name', 'email', 'password', 'passwordConfirmation'],
    contentAlignment: 'start'
  }
};
