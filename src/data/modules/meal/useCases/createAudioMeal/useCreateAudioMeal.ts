import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_MUTATION_KEYS, MEAL_QUERY_KEYS } from '../../keys/MealKeys';
import { waitForMealAnalysis } from '../../utils/waitForMealAnalysis';
import type { ICreateAudioMealParams } from './UseCreateAudioMealTypes';

export function useCreateAudioMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MEAL_MUTATION_KEYS.CREATE_AUDIO_MEAL],
    mutationFn: async ({ date, time, audioUri }: ICreateAudioMealParams) => {
      const { mealId, upload } = await MealService.create({ date, time, inputType: 'AUDIO' });
      await MealService.uploadAudio({ upload, audioUri });

      return waitForMealAnalysis(mealId);
    },
    onSuccess: (meal) => {
      queryClient.setQueryData([MEAL_QUERY_KEYS.MEAL, meal.id], meal);

      return queryClient.resetQueries({ queryKey: [MEAL_QUERY_KEYS.MEALS_BY_DAY] });
    }
  });

  return {
    createAudioMeal: mutateAsync,
    isCreatingAudioMeal: isPending
  };
}
