import type { TranslationKey } from 'data/config/i18n';
import type { MealCardState } from '../MealCardTypes';

export const MEAL_CARD_FALLBACK_TITLES: Record<MealCardState, TranslationKey> = {
  ANALYZED: 'home.fallbackTitle.ANALYZED',
  ANALYZING: 'home.fallbackTitle.ANALYZING',
  FAILED: 'home.fallbackTitle.FAILED'
};
