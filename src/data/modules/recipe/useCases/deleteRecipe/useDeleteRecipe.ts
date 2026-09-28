import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getApiErrorCode } from 'data/config/apiError';
import { RecipeService } from 'data/modules/recipe/services/RecipeService';
import type { IRecipe } from 'shared/entities/IRecipe';
import { RECIPE_MUTATION_KEYS, RECIPE_QUERY_KEYS } from '../../keys/RecipeKeys';
import type { IDeleteRecipePayload } from '../../types/RecipeTypes';

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [RECIPE_MUTATION_KEYS.DELETE_RECIPE],
    mutationFn: async (payload: IDeleteRecipePayload) => {
      try {
        await RecipeService.remove(payload);
      } catch (error) {
        if (getApiErrorCode(error) !== 'RECIPE_NOT_FOUND') {
          throw error;
        }
      }
    },
    onSuccess: (_, { recipeId }) => {
      queryClient.setQueryData<IRecipe[]>([RECIPE_QUERY_KEYS.RECIPES], (recipes) =>
        recipes?.filter((recipe) => recipe.id !== recipeId)
      );
    }
  });

  return {
    deleteRecipe: mutateAsync,
    isDeletingRecipe: isPending
  };
}
