import type {
  UpdateMealFormType,
  UpdateMealPayloadType
} from 'data/modules/meal/useCases/updateMeal/schemas/updateMealSchema';
import type { Control } from 'react-hook-form';
import type { IMealItem } from 'shared/entities/IMealItem';

export type EditMealControl = Control<UpdateMealFormType, unknown, UpdateMealPayloadType>;

export type EditableItemFormType = UpdateMealFormType['items'][number];

export interface IHandleAddItemsParams {
  items: IMealItem[];
}

export interface IHandleRemoveItemParams {
  index: number;
}
