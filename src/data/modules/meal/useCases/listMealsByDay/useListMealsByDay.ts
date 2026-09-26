import { useQuery } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_QUERY_KEYS } from '../../keys/MealKeys';
import type { IUseListMealsByDayParams } from './UseListMealsByDayTypes';

export function useListMealsByDay({ date }: IUseListMealsByDayParams) {
  const { data, isPending, isError, isRefetching, refetch } = useQuery({
    queryKey: [MEAL_QUERY_KEYS.MEALS_BY_DAY, date],
    queryFn: () => MealService.list({ date })
  });

  return {
    mealsOfDay: data ?? null,
    isLoadingMeals: isPending,
    isMealsError: isError,
    isRefetchingMeals: isRefetching,
    refetchMeals: refetch
  };
}
