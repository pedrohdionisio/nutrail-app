import { useController } from 'react-hook-form';
import type {
  IHandleSelectOptionParams,
  IUseOptionsFieldControllerParams
} from './OptionsFieldTypes';

export function useOptionsFieldController({ control, name }: IUseOptionsFieldControllerParams) {
  const { field } = useController({ control, name });

  function handleSelectOption({ value }: IHandleSelectOptionParams) {
    field.onChange(value);
  }

  return {
    selectedValue: field.value,
    handleSelectOption
  };
}
