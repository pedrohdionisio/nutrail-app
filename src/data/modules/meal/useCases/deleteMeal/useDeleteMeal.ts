import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getApiErrorCode } from 'data/config/apiError';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_MUTATION_KEYS, MEAL_QUERY_KEYS } from '../../keys/MealKeys';
import type { IDeleteMealPayload } from '../../types/MealTypes';

export function useDeleteMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MEAL_MUTATION_KEYS.DELETE_MEAL],
    mutationFn: async (payload: IDeleteMealPayload) => {
      try {
        await MealService.remove(payload);
      } catch (error) {
        if (getApiErrorCode(error) !== 'MEAL_NOT_FOUND') {
          throw error;
        }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [MEAL_QUERY_KEYS.MEALS_BY_DAY] })
  });

  return {
    deleteMeal: mutateAsync,
    isDeletingMeal: isPending
  };
}
