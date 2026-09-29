import { getLanguage } from 'data/config/i18n';
import type { UpdateMealFormType } from 'data/modules/meal/useCases/updateMeal/schemas/updateMealSchema';
import type { IMealDetails } from 'shared/entities/IMealDetails';
import { toDateInput } from 'shared/utils/toDateInput';
import { toEditableItem } from './toEditableItem';

export function toEditMealFormValues(meal: IMealDetails): UpdateMealFormType {
  return {
    name: meal.name ?? '',
    items: meal.items.map(toEditableItem),
    date: toDateInput(meal.date, getLanguage()),
    time: meal.time
  };
}
