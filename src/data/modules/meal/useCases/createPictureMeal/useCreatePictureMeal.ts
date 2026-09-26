import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_MUTATION_KEYS, MEAL_QUERY_KEYS } from '../../keys/MealKeys';
import type { ICreatePictureMealParams } from './UseCreatePictureMealTypes';
import { waitForMealAnalysis } from './utils/waitForMealAnalysis';

export function useCreatePictureMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MEAL_MUTATION_KEYS.CREATE_PICTURE_MEAL],
    mutationFn: async ({ date, time, pictureUri }: ICreatePictureMealParams) => {
      const { mealId, upload } = await MealService.create({ date, time, inputType: 'PICTURE' });
      await MealService.uploadPicture({ upload, pictureUri });

      return waitForMealAnalysis(mealId);
    },
    onSuccess: (meal) => {
      queryClient.setQueryData([MEAL_QUERY_KEYS.MEAL, meal.id], meal);

      return queryClient.resetQueries({ queryKey: [MEAL_QUERY_KEYS.MEALS_BY_DAY] });
    }
  });

  return {
    createPictureMeal: mutateAsync,
    isCreatingPictureMeal: isPending
  };
}
