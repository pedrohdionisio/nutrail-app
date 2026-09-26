import { useQuery } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_QUERY_KEYS } from '../../keys/MealKeys';
import type { IUseGetMealParams } from './UseGetMealTypes';

export function useGetMeal({ mealId }: IUseGetMealParams) {
  const { data, isPending, error, isRefetching, refetch } = useQuery({
    queryKey: [MEAL_QUERY_KEYS.MEAL, mealId],
    queryFn: () => MealService.getById({ mealId })
  });

  return {
    meal: data ?? null,
    isLoadingMeal: isPending,
    mealError: error,
    isRefetchingMeal: isRefetching,
    refetchMeal: refetch
  };
}
