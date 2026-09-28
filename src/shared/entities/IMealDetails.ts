import type { MealInputType, MealStatus } from 'shared/constants/meal';
import type { IMacros } from './IMacros';
import type { IMealItem } from './IMealItem';

export interface IMealDetails extends IMacros {
  id: string;
  name: string | null;
  status: MealStatus;
  inputType: MealInputType;
  date: string;
  time: string;
  items: IMealItem[];
  pictureUrl: string | null;
  createdAt: string;
}
