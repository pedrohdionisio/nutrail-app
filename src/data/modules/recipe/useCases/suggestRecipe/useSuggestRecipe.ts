import { useMutation } from '@tanstack/react-query';
import { RecipeService } from 'data/modules/recipe/services/RecipeService';
import { RECIPE_MUTATION_KEYS } from '../../keys/RecipeKeys';

export function useSuggestRecipe() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [RECIPE_MUTATION_KEYS.SUGGEST_RECIPE],
    mutationFn: RecipeService.suggest
  });

  return {
    suggestRecipe: mutateAsync,
    isSuggestingRecipe: isPending
  };
}
