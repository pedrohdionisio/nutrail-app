import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_MUTATION_KEYS, MEAL_QUERY_KEYS } from '../../keys/MealKeys';
import type { IAttachMealPictureParams } from './UseAttachMealPictureTypes';

export function useAttachMealPicture() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MEAL_MUTATION_KEYS.ATTACH_MEAL_PICTURE],
    mutationFn: async ({ mealId, pictureUri }: IAttachMealPictureParams) => {
      const upload = await MealService.createPictureUpload({ mealId });
      await MealService.uploadPicture({ upload, pictureUri });
    },
    onSuccess: (_, { mealId }) =>
      queryClient.invalidateQueries({ queryKey: [MEAL_QUERY_KEYS.MEAL, mealId] })
  });

  return {
    attachMealPicture: mutateAsync,
    isAttachingMealPicture: isPending
  };
}
