import type { IRecipeContent } from 'shared/entities/IRecipeContent';
import { formatFoodQuantity } from 'shared/utils/formatFoodQuantity';
import type { IRecipeSection } from '../RecipeContentTypes';

export function toRecipeSections({ ingredients, instructions }: IRecipeContent): IRecipeSection[] {
  const steps = instructions
    .split('\n')
    .map((step) => step.trim())
    .filter(Boolean);

  return [
    { title: 'common.ingredients', data: ingredients.map(formatFoodQuantity) },
    { title: 'common.instructions', data: steps }
  ];
}
