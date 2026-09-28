import type { ISavedMeal } from 'shared/entities/ISavedMeal';

export function buildSavedMeal(overrides: Partial<ISavedMeal> = {}): ISavedMeal {
  return {
    id: 'saved-1',
    name: 'Café da manhã de sempre',
    items: [
      {
        name: 'Pão francês',
        quantity: 1,
        unit: 'unidade',
        calories: 150,
        protein: 4,
        carbohydrate: 29,
        fat: 2
      },
      {
        name: 'Café com leite',
        quantity: 200,
        unit: 'ml',
        calories: 90,
        protein: 6,
        carbohydrate: 9,
        fat: 3
      }
    ],
    calories: 240,
    protein: 10,
    carbohydrate: 38,
    fat: 5,
    createdAt: '2026-09-25T11:00:00.000Z',
    ...overrides
  };
}
