import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SavedMealService } from 'data/modules/savedMeal/services/SavedMealService';
import type { ISavedMeal } from 'shared/entities/ISavedMeal';
import { SAVED_MEAL_MUTATION_KEYS, SAVED_MEAL_QUERY_KEYS } from '../../keys/SavedMealKeys';

export function useSaveMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [SAVED_MEAL_MUTATION_KEYS.SAVE_MEAL],
    mutationFn: SavedMealService.save,
    onSuccess: (savedMeal) => {
      queryClient.setQueryData<ISavedMeal[]>(
        [SAVED_MEAL_QUERY_KEYS.SAVED_MEALS],
        (savedMeals) => savedMeals && [savedMeal, ...savedMeals]
      );
    }
  });

  return {
    saveMeal: mutateAsync,
    isSavingMeal: isPending
  };
}
