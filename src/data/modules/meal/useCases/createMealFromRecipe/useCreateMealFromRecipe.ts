import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_MUTATION_KEYS, MEAL_QUERY_KEYS } from '../../keys/MealKeys';

export function useCreateMealFromRecipe() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MEAL_MUTATION_KEYS.CREATE_MEAL_FROM_RECIPE],
    mutationFn: MealService.createFromRecipe,
    onSuccess: () => queryClient.resetQueries({ queryKey: [MEAL_QUERY_KEYS.MEALS_BY_DAY] })
  });

  return {
    createMealFromRecipe: mutateAsync,
    isCreatingMealFromRecipe: isPending
  };
}
