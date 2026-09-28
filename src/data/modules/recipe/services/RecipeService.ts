import { api } from 'data/config/api';
import type { IRecipe } from 'shared/entities/IRecipe';
import type { IRecipeContent } from 'shared/entities/IRecipeContent';
import type {
  IDeleteRecipePayload,
  IListRecipesResponse,
  ISuggestRecipePayload,
  ISuggestRecipeResponse
} from '../types/RecipeTypes';

async function list(): Promise<IRecipe[]> {
  const { data } = await api.get<IListRecipesResponse>('/recipes');

  return data.recipes;
}

async function suggest(payload: ISuggestRecipePayload): Promise<IRecipeContent> {
  const { data } = await api.post<ISuggestRecipeResponse>('/recipes/suggestions', payload);

  return data.recipe;
}

async function save(recipe: IRecipeContent): Promise<IRecipe> {
  const { data } = await api.post<IRecipe>('/recipes', recipe);

  return data;
}

async function remove({ recipeId }: IDeleteRecipePayload): Promise<void> {
  await api.delete(`/recipes/${recipeId}`);
}

export const RecipeService = {
  list,
  suggest,
  save,
  remove
};
