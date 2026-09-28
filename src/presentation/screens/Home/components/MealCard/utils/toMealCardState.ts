import type { MealStatus } from 'shared/constants/meal';
import type { MealCardState } from '../MealCardTypes';

export function toMealCardState(status: MealStatus): MealCardState {
  if (status === 'SUCCESS') {
    return 'ANALYZED';
  }

  return status === 'FAILED' ? 'FAILED' : 'ANALYZING';
}
