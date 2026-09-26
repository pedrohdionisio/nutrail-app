import type { EditMealControl, IHandleRemoveItemParams } from '../../EditMealTypes';

export interface IEditableItemProps {
  control: EditMealControl;
  index: number;
  name: string;
  unit: string;
  onRemove: (params: IHandleRemoveItemParams) => void;
}
