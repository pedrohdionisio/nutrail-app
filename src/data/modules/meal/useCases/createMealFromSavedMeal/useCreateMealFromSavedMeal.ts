import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_MUTATION_KEYS, MEAL_QUERY_KEYS } from '../../keys/MealKeys';

export function useCreateMealFromSavedMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, variables } = useMutation({
    mutationKey: [MEAL_MUTATION_KEYS.CREATE_MEAL_FROM_SAVED_MEAL],
    mutationFn: MealService.createFromSavedMeal,
    onSuccess: () => queryClient.resetQueries({ queryKey: [MEAL_QUERY_KEYS.MEALS_BY_DAY] })
  });

  return {
    createMealFromSavedMeal: mutateAsync,
    creatingSavedMealId: isPending ? (variables?.savedMealId ?? null) : null
  };
}
