import { useQuery } from '@tanstack/react-query';
import { RecipeService } from 'data/modules/recipe/services/RecipeService';
import { RECIPE_QUERY_KEYS } from '../../keys/RecipeKeys';

export function useListRecipes() {
  const { data, isPending, isError, isRefetching, refetch } = useQuery({
    queryKey: [RECIPE_QUERY_KEYS.RECIPES],
    queryFn: RecipeService.list
  });

  return {
    recipes: data ?? [],
    isLoadingRecipes: isPending,
    isRecipesError: isError,
    isRefetchingRecipes: isRefetching,
    refetchRecipes: refetch
  };
}
