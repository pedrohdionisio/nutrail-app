import { useController } from 'react-hook-form';
import { maskDate } from 'shared/utils/maskDate';
import type { IUseBirthDateFieldControllerParams } from './BirthDateFieldTypes';

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
