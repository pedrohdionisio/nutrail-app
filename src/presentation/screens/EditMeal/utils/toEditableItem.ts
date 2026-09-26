import type { IMealItem } from 'shared/entities/IMealItem';
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
    quantity: String(quantity).replace('.', ','),
    original: { quantity, calories, protein, carbohydrate, fat }
  };
}
