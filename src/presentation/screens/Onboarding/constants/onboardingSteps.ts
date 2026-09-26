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
    title: 'Qual é seu objetivo?',
    description: 'O que você pretende alcançar com a dieta?',
    fields: ['goal'],
    contentAlignment: 'end'
  },
  gender: {
    title: 'Qual o seu gênero biológico?',
    description: 'Seu gênero influencia no tipo da dieta',
    fields: ['gender'],
    contentAlignment: 'end'
  },
  birthDate: {
    title: 'Que dia você nasceu?',
    description: 'Cada faixa etária responde de forma única',
    fields: ['birthDate'],
    contentAlignment: 'center'
  },
  height: {
    title: 'Qual é sua altura?',
    description: 'Você pode inserir uma estimativa',
    fields: ['height'],
    contentAlignment: 'center'
  },
  weight: {
    title: 'Qual é seu peso?',
    description: 'Você pode inserir uma estimativa',
    fields: ['weight'],
    contentAlignment: 'center'
  },
  activityLevel: {
    title: 'Qual seu nível de atividade?',
    fields: ['activityLevel'],
    contentAlignment: 'start'
  },
  account: {
    title: 'Crie sua conta',
    description: 'Para poder visualizar seu progresso',
    fields: ['name', 'email', 'password', 'passwordConfirmation'],
    contentAlignment: 'start'
  }
};
