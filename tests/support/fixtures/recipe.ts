import type { IRecipe } from 'shared/entities/IRecipe';
import type { IRecipeContent } from 'shared/entities/IRecipeContent';

export function buildRecipeContent(overrides: Partial<IRecipeContent> = {}): IRecipeContent {
  return {
    name: 'Omelete de queijo com tomate',
    ingredients: [
      { name: 'Ovo', quantity: 3, unit: 'unidades' },
      { name: 'Queijo mussarela', quantity: 40, unit: 'g' },
      { name: 'Tomate', quantity: 1, unit: 'unidade' }
    ],
    instructions: '1. Bata os ovos com uma pitada de sal.\n2. Junte o queijo e o tomate picado.',
    calories: 420,
    protein: 30,
    carbohydrate: 6,
    fat: 30,
    ...overrides
  };
}

export function buildRecipe(overrides: Partial<IRecipe> = {}): IRecipe {
  return {
    ...buildRecipeContent(),
    id: 'recipe-1',
    createdAt: '2026-09-26T15:15:00.000Z',
    ...overrides
  };
}
