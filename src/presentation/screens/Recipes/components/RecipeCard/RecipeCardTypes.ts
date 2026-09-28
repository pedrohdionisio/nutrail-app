import type { IRecipe } from 'shared/entities/IRecipe';

export interface IHandleOpenRecipeParams {
  recipeId: string;
}

export interface IRecipeCardProps {
  recipe: IRecipe;
  onPress: (params: IHandleOpenRecipeParams) => void;
}

export interface IUseRecipeCardControllerParams {
  recipeId: string;
  onPress: (params: IHandleOpenRecipeParams) => void;
}
