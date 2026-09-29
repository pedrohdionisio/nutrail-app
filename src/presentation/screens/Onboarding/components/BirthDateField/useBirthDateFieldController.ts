import { isTranslationKey } from 'data/config/i18n';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { maskDate } from 'shared/utils/maskDate';
import type { IUseBirthDateFieldControllerParams } from './BirthDateFieldTypes';

export function useBirthDateFieldController({ control }: IUseBirthDateFieldControllerParams) {
  const { field, fieldState } = useController({ control, name: 'birthDate' });
  const { t } = useTranslation();
  const errorMessage = fieldState.error?.message;

  function handleChangeText(text: string) {
    field.onChange(maskDate(text));
  }

  return {
    value: field.value,
    errorMessage: errorMessage && isTranslationKey(errorMessage) ? t(errorMessage) : errorMessage,
    handleChangeText,
    handleBlur: field.onBlur
  };
}
