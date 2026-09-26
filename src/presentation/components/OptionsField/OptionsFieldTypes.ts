import type { Control, FieldPathByValue, FieldValues } from 'react-hook-form';
import type { IOption, OptionCardOrientation } from '../OptionCard/OptionCardTypes';

export interface IOptionsFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TTransformedValues = TFieldValues
> {
  control: Control<TFieldValues, unknown, TTransformedValues>;
  name: TName;
  options: IOption[];
  orientation: OptionCardOrientation;
  label?: string;
}

export interface IUseOptionsFieldControllerParams<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TTransformedValues = TFieldValues
> {
  control: Control<TFieldValues, unknown, TTransformedValues>;
  name: TName;
}

export interface IHandleSelectOptionParams {
  value: string;
}
