import type { IIngredient } from './IIngredient';
import type { IMacros } from './IMacros';

export interface IRecipeContent extends IMacros {
  name: string;
  ingredients: IIngredient[];
  instructions: string;
}
