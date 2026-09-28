import type { IUseRecipeCardControllerParams } from './RecipeCardTypes';

export function useRecipeCardController({ recipeId, onPress }: IUseRecipeCardControllerParams) {
  function handlePress() {
    onPress({ recipeId });
  }

  return {
    handlePress
  };
}
