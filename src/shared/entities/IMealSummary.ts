import type { MealInputType } from 'shared/constants/meal';
import type { IMacros } from './IMacros';

export interface IMealSummary extends IMacros {
  id: string;
  name: string;
  inputType: MealInputType;
  pictureUrl: string | null;
  createdAt: string;
}
