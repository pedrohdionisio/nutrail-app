import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_MUTATION_KEYS, MEAL_QUERY_KEYS } from '../../keys/MealKeys';
import type { IReprocessMealPayload } from '../../types/MealTypes';
import { waitForMealAnalysis } from '../../utils/waitForMealAnalysis';

export function useReprocessMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MEAL_MUTATION_KEYS.REPROCESS_MEAL],
    mutationFn: async ({ mealId }: IReprocessMealPayload) => {
      await MealService.reprocess({ mealId });

      return waitForMealAnalysis(mealId);
    },
    onSuccess: (meal) => {
      queryClient.setQueryData([MEAL_QUERY_KEYS.MEAL, meal.id], meal);

      return queryClient.resetQueries({ queryKey: [MEAL_QUERY_KEYS.MEALS_BY_DAY] });
    }
  });

  return {
    reprocessMeal: mutateAsync,
    isReprocessingMeal: isPending
  };
}
