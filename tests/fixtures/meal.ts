import type { IMealDetails } from 'shared/entities/IMealDetails';
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

export function buildMealDetails(overrides: Partial<IMealDetails> = {}): IMealDetails {
  return {
    id: 'meal-1',
    name: 'Almoço Fitness',
    status: 'SUCCESS',
    inputType: 'PICTURE',
    date: '2026-09-26',
    items: [
      {
        name: 'Arroz',
        quantity: 120,
        unit: 'g',
        calories: 156,
        protein: 3,
        carbohydrate: 34,
        fat: 0
      },
      {
        name: 'Ovos',
        quantity: 2,
        unit: 'unidades',
        calories: 155,
        protein: 13,
        carbohydrate: 1,
        fat: 11
      },
      {
        name: 'Frango',
        quantity: 150,
        unit: 'g',
        calories: 319,
        protein: 13,
        carbohydrate: 21,
        fat: 18
      }
    ],
    calories: 630,
    protein: 29,
    carbohydrate: 56,
    fat: 29,
    pictureUrl: 'https://pictures.test/meal-1.jpg',
    createdAt: '2026-09-26T15:15:00.000Z',
    ...overrides
  };
}
