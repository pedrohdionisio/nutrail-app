import type { MealCardState } from '../MealCardTypes';

export const MEAL_CARD_FALLBACK_TITLES: Record<MealCardState, string> = {
  ANALYZED: 'Refeição',
  ANALYZING: 'Analisando refeição',
  FAILED: 'Refeição não analisada'
};
