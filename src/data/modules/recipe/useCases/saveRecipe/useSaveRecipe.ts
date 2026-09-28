import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RecipeService } from 'data/modules/recipe/services/RecipeService';
import type { IRecipe } from 'shared/entities/IRecipe';
import { RECIPE_MUTATION_KEYS, RECIPE_QUERY_KEYS } from '../../keys/RecipeKeys';

export function useSaveRecipe() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [RECIPE_MUTATION_KEYS.SAVE_RECIPE],
    mutationFn: RecipeService.save,
    onSuccess: (recipe) => {
      queryClient.setQueryData<IRecipe[]>([RECIPE_QUERY_KEYS.RECIPES], (recipes) =>
        recipes ? [recipe, ...recipes] : recipes
      );
    }
  });

  return {
    saveRecipe: mutateAsync,
    isSavingRecipe: isPending
  };
}
