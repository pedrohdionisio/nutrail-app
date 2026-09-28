import { MealService } from 'data/modules/meal/services/MealService';
import type { IMealDetails } from 'shared/entities/IMealDetails';
import { sleep } from 'shared/utils/sleep';

const POLLING_INTERVAL_MS = 2000;
const MAX_POLLING_ATTEMPTS = 60;

export async function waitForMealAnalysis(mealId: string): Promise<IMealDetails> {
  let meal = await MealService.getById({ mealId });

  for (let attempt = 1; attempt < MAX_POLLING_ATTEMPTS; attempt++) {
    if (meal.status === 'SUCCESS' || meal.status === 'FAILED') {
      return meal;
    }

    await sleep(POLLING_INTERVAL_MS);
    meal = await MealService.getById({ mealId });
  }

  return meal;
}
