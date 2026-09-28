import { useQuery } from '@tanstack/react-query';
import { SavedMealService } from 'data/modules/savedMeal/services/SavedMealService';
import { SAVED_MEAL_QUERY_KEYS } from '../../keys/SavedMealKeys';

export function useListSavedMeals() {
  const { data, isPending, isError, isRefetching, refetch } = useQuery({
    queryKey: [SAVED_MEAL_QUERY_KEYS.SAVED_MEALS],
    queryFn: SavedMealService.list
  });

  return {
    savedMeals: data ?? [],
    isLoadingSavedMeals: isPending,
    isSavedMealsError: isError,
    isRefetchingSavedMeals: isRefetching,
    refetchSavedMeals: refetch
  };
}
