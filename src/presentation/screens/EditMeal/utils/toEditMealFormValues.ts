import type { UpdateMealFormType } from 'data/modules/meal/useCases/updateMeal/schemas/updateMealSchema';
import type { IMealDetails } from 'shared/entities/IMealDetails';
import { toEditableItem } from './toEditableItem';

export function toEditMealFormValues(meal: IMealDetails): UpdateMealFormType {
  return {
    name: meal.name ?? '',
    items: meal.items.map(toEditableItem)
  };
}
