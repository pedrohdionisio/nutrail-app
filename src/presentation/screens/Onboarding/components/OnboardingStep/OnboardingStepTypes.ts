import type { PropsWithChildren, ReactNode } from 'react';
import type { OnboardingContentAlignment } from '../../OnboardingTypes';

export interface IOnboardingStepProps extends PropsWithChildren {
  title: string;
  description?: string;
  contentAlignment: OnboardingContentAlignment;
  progress: number;
  footer: ReactNode;
  onBack: () => void;
}
