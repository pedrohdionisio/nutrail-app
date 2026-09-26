import type { IMacros } from './IMacros';
import type { IMealSummary } from './IMealSummary';

export interface IMealsOfDay {
  date: string;
  meals: IMealSummary[];
  totals: IMacros;
}
