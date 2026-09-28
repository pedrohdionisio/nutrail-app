import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getApiErrorCode } from 'data/config/apiError';
import { SavedMealService } from 'data/modules/savedMeal/services/SavedMealService';
import type { ISavedMeal } from 'shared/entities/ISavedMeal';
import { SAVED_MEAL_MUTATION_KEYS, SAVED_MEAL_QUERY_KEYS } from '../../keys/SavedMealKeys';
import type { IDeleteSavedMealPayload } from '../../types/SavedMealTypes';

export function useDeleteSavedMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [SAVED_MEAL_MUTATION_KEYS.DELETE_SAVED_MEAL],
    mutationFn: async (payload: IDeleteSavedMealPayload) => {
      try {
        await SavedMealService.remove(payload);
      } catch (error) {
        if (getApiErrorCode(error) !== 'SAVED_MEAL_NOT_FOUND') {
          throw error;
        }
      }
    },
    onSuccess: (_, { savedMealId }) => {
      queryClient.setQueryData<ISavedMeal[]>([SAVED_MEAL_QUERY_KEYS.SAVED_MEALS], (savedMeals) =>
        savedMeals?.filter((savedMeal) => savedMeal.id !== savedMealId)
      );
    }
  });

  return {
    deleteSavedMeal: mutateAsync,
    isDeletingSavedMeal: isPending
  };
}
