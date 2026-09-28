import { useQuery } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_QUERY_KEYS } from '../../keys/MealKeys';
import type { IUseListMealsByDayParams } from './UseListMealsByDayTypes';

const ANALYSIS_REFRESH_INTERVAL_MS = 3000;

const ANALYZING_STATUSES = ['QUEUED', 'PROCESSING'];

export function useListMealsByDay({ date }: IUseListMealsByDayParams) {
  const { data, isPending, isError, isRefetching, refetch } = useQuery({
    queryKey: [MEAL_QUERY_KEYS.MEALS_BY_DAY, date],
    queryFn: () => MealService.list({ date }),
    refetchInterval: ({ state }) =>
      state.data?.meals.some(({ status }) => ANALYZING_STATUSES.includes(status))
        ? ANALYSIS_REFRESH_INTERVAL_MS
        : false
  });

  return {
    mealsOfDay: data ?? null,
    isLoadingMeals: isPending,
    isMealsError: isError,
    isRefetchingMeals: isRefetching,
    refetchMeals: refetch
  };
}
