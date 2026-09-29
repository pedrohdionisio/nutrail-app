import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { isTranslationKey } from 'data/config/i18n';
import { useState } from 'react';
import { type FieldPathByValue, type FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { IUseInputControllerParams } from './InputTypes';

export function useInputController<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TTransformedValues = TFieldValues
>({ control, name, mask }: IUseInputControllerParams<TFieldValues, TName, TTransformedValues>) {
  const { field, fieldState } = useController({ control, name });
  const { t } = useTranslation();
  const errorMessage = fieldState.error?.message;
  const [isFocused, setIsFocused] = useState(false);
  const isInsideBottomSheet = useBottomSheetInternal(true) !== null;

  function handleFocus() {
    setIsFocused(true);
  }

  function handleChangeText(text: string) {
    field.onChange(mask ? mask(text) : text);
  }

  function handleBlur() {
    setIsFocused(false);
    field.onBlur();
  }

  return {
    value: field.value,
    errorMessage: errorMessage && isTranslationKey(errorMessage) ? t(errorMessage) : errorMessage,
    isFocused,
    isInsideBottomSheet,
    handleChangeText,
    handleFocus,
    handleBlur
  };
}
