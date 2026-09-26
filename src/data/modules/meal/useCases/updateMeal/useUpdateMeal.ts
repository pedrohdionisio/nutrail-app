import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import type { IMealDetails } from 'shared/entities/IMealDetails';
import { MEAL_MUTATION_KEYS, MEAL_QUERY_KEYS } from '../../keys/MealKeys';

export function useUpdateMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MEAL_MUTATION_KEYS.UPDATE_MEAL],
    mutationFn: MealService.update,
    onSuccess: (updatedMeal, { mealId }) => {
      queryClient.setQueryData<IMealDetails>(
        [MEAL_QUERY_KEYS.MEAL, mealId],
        (meal) => meal && { ...meal, ...updatedMeal }
      );

      return queryClient.resetQueries({ queryKey: [MEAL_QUERY_KEYS.MEALS_BY_DAY] });
    }
  });

  return {
    updateMeal: mutateAsync,
    isUpdatingMeal: isPending
  };
}
