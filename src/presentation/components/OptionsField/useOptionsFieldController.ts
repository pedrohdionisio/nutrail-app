import { type FieldPathByValue, type FieldValues, useController } from 'react-hook-form';
import type {
  IHandleSelectOptionParams,
  IUseOptionsFieldControllerParams
} from './OptionsFieldTypes';

export function useOptionsFieldController<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TTransformedValues = TFieldValues
>({ control, name }: IUseOptionsFieldControllerParams<TFieldValues, TName, TTransformedValues>) {
  const { field } = useController({ control, name });

  function handleSelectOption({ value }: IHandleSelectOptionParams) {
    field.onChange(value);
  }

  return {
    selectedValue: field.value,
    handleSelectOption
  };
}
