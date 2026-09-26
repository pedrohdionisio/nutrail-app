import { useController } from 'react-hook-form';
import type { IUseBirthDateFieldControllerParams } from './BirthDateFieldTypes';
import { maskDate } from './utils/maskDate';

export function useBirthDateFieldController({ control }: IUseBirthDateFieldControllerParams) {
  const { field, fieldState } = useController({ control, name: 'birthDate' });

  function handleChangeText(text: string) {
    field.onChange(maskDate(text));
  }

  return {
    value: field.value,
    errorMessage: fieldState.error?.message,
    handleChangeText,
    handleBlur: field.onBlur
  };
}
