import type { IRecipe } from 'shared/entities/IRecipe';
import type { IRecipeContent } from 'shared/entities/IRecipeContent';

export interface IListRecipesResponse {
  recipes: IRecipe[];
}

export interface ISuggestRecipePayload {
  date: string;
  text: string;
}

export interface ISuggestRecipeResponse {
  recipe: IRecipeContent;
}

export interface IDeleteRecipePayload {
  recipeId: string;
}
