import type { UpdateMealFormType } from 'data/modules/meal/useCases/updateMeal/schemas/updateMealSchema';
import type { FieldArrayWithId } from 'react-hook-form';
import type {
  EditMealControl,
  IHandleAddItemsParams,
  IHandleRemoveItemParams
} from '../../EditMealTypes';

export interface IEditMealFormProps {
  control: EditMealControl;
  items: FieldArrayWithId<UpdateMealFormType, 'items'>[];
  shouldShowEmptyItems: boolean;
  apiErrorMessage: string | null;
  onRemoveItem: (params: IHandleRemoveItemParams) => void;
  onAddItems: (params: IHandleAddItemsParams) => void;
}
