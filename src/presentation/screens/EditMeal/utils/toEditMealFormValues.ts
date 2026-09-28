import type { UpdateMealFormType } from 'data/modules/meal/useCases/updateMeal/schemas/updateMealSchema';
import type { IMealDetails } from 'shared/entities/IMealDetails';
import { toBrazilianDate } from 'shared/utils/toBrazilianDate';
import { toEditableItem } from './toEditableItem';

export function toEditMealFormValues(meal: IMealDetails): UpdateMealFormType {
  return {
    name: meal.name ?? '',
    items: meal.items.map(toEditableItem),
    date: toBrazilianDate(meal.date),
    time: meal.time
  };
}
