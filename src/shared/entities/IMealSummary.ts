import type { MealInputType, MealStatus } from 'shared/constants/meal';
import type { IMacros } from './IMacros';

export interface IMealSummary extends IMacros {
  id: string;
  name: string | null;
  status: MealStatus;
  inputType: MealInputType;
  time: string;
  pictureUrl: string | null;
  createdAt: string;
}
