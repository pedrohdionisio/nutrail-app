import type { IMacros } from './IMacros';
import type { IMealItem } from './IMealItem';

export interface ISavedMeal extends IMacros {
  id: string;
  name: string;
  items: IMealItem[];
  createdAt: string;
}
