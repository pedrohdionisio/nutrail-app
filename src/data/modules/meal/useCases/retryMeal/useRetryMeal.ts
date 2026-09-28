import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_MUTATION_KEYS, MEAL_QUERY_KEYS } from '../../keys/MealKeys';

export function useRetryMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, variables } = useMutation({
    mutationKey: [MEAL_MUTATION_KEYS.RETRY_MEAL],
    mutationFn: MealService.reprocess,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [MEAL_QUERY_KEYS.MEALS_BY_DAY] })
  });

  return {
    retryMeal: mutateAsync,
    retryingMealId: isPending ? (variables?.mealId ?? null) : null
  };
}
