import type { IMealSummary } from 'shared/entities/IMealSummary';
import type { IMealsOfDay } from 'shared/entities/IMealsOfDay';

export function buildMeal(overrides: Partial<IMealSummary> = {}): IMealSummary {
  return {
    id: 'meal-1',
    name: 'Pão, manteiga e café',
    inputType: 'PICTURE',
    calories: 210,
    protein: 5,
    carbohydrate: 25,
    fat: 9,
    pictureUrl: null,
    createdAt: '2026-09-26T15:15:00.000Z',
    ...overrides
  };
}

export function buildMealsOfDay(date: string, meals: IMealSummary[] = []): IMealsOfDay {
  return {
    date,
    meals,
    totals: {
      calories: meals.reduce((total, meal) => total + meal.calories, 0),
      protein: meals.reduce((total, meal) => total + meal.protein, 0),
      carbohydrate: meals.reduce((total, meal) => total + meal.carbohydrate, 0),
      fat: meals.reduce((total, meal) => total + meal.fat, 0)
    }
  };
}
