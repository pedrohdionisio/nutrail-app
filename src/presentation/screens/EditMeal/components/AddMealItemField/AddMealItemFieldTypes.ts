import type { IHandleAddItemsParams } from '../../EditMealTypes';

export interface IAddMealItemFieldProps {
  onAdd: (params: IHandleAddItemsParams) => void;
}

export interface IUseAddMealItemFieldControllerParams {
  onAdd: (params: IHandleAddItemsParams) => void;
}
