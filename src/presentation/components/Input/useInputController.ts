import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { type FieldPathByValue, type FieldValues, useController } from 'react-hook-form';
import type { IUseInputControllerParams } from './InputTypes';

export function useInputController<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TTransformedValues = TFieldValues
>({ control, name, mask }: IUseInputControllerParams<TFieldValues, TName, TTransformedValues>) {
  const { field, fieldState } = useController({ control, name });
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
    errorMessage: fieldState.error?.message,
    isFocused,
    isInsideBottomSheet,
    handleChangeText,
    handleFocus,
    handleBlur
  };
}
