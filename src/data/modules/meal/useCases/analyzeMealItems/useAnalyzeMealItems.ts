import { useMutation } from '@tanstack/react-query';
import { MealService } from 'data/modules/meal/services/MealService';
import { MEAL_MUTATION_KEYS } from '../../keys/MealKeys';

export function useAnalyzeMealItems() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MEAL_MUTATION_KEYS.ANALYZE_MEAL_ITEMS],
    mutationFn: MealService.analyzeItems
  });

  return {
    analyzeMealItems: mutateAsync,
    isAnalyzingMealItems: isPending
  };
}
