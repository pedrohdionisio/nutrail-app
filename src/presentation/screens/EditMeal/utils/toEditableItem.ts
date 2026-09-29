import { getLanguage } from 'data/config/i18n';
import type { IMealItem } from 'shared/entities/IMealItem';
import { toDecimalInput } from 'shared/utils/toDecimalInput';
import type { EditableItemFormType } from '../EditMealTypes';

export function toEditableItem({
  name,
  unit,
  quantity,
  calories,
  protein,
  carbohydrate,
  fat
}: IMealItem): EditableItemFormType {
  return {
    name,
    unit,
    quantity: toDecimalInput(quantity, getLanguage()),
    original: { quantity, calories, protein, carbohydrate, fat }
  };
}
