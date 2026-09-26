import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_MUTATION_KEYS, MEAL_QUERY_KEYS } from '../../keys/MealKeys';
import type { CreateManualMealPayloadType } from './schemas/createManualMealSchema';

export function useCreateManualMeal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MEAL_MUTATION_KEYS.CREATE_MANUAL_MEAL],
    mutationFn: async ({ pictureUri, ...payload }: CreateManualMealPayloadType) => {
      const meal = await MealService.createManual(payload);

      if (!pictureUri) {
        return { isPictureUploaded: true };
      }

      try {
        const upload = await MealService.createPictureUpload({ mealId: meal.id });
        await MealService.uploadPicture({ upload, pictureUri });

        return { isPictureUploaded: true };
      } catch {
        return { isPictureUploaded: false };
      }
    },
    onSuccess: () => queryClient.resetQueries({ queryKey: [MEAL_QUERY_KEYS.MEALS_BY_DAY] })
  });

  return {
    createManualMeal: mutateAsync,
    isCreatingManualMeal: isPending
  };
}
