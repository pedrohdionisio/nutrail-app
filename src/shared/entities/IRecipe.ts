import type { IRecipeContent } from './IRecipeContent';

export interface IRecipe extends IRecipeContent {
  id: string;
  createdAt: string;
}
