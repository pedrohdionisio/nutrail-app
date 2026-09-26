import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { cssInterop } from 'nativewind';
import { AppText } from 'presentation/components/AppText/AppText';
import type { FieldPathByValue, FieldValues } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { cn } from 'shared/utils/cn';
import type { IInputProps } from './InputTypes';
import { useInputController } from './useInputController';

const StyledBottomSheetTextInput = cssInterop(BottomSheetTextInput, { className: 'style' });

export function Input<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TTransformedValues = TFieldValues
>({
  control,
  name,
  label,
  className,
  ...props
}: IInputProps<TFieldValues, TName, TTransformedValues>) {
  const {
    value,
    errorMessage,
    isFocused,
    isInsideBottomSheet,
    handleChangeText,
    handleFocus,
    handleBlur
  } = useInputController({ control, name });
  const TextInputComponent = isInsideBottomSheet ? StyledBottomSheetTextInput : TextInput;

  return (
    <View className='gap-2'>
      <AppText size='bodySm'>{label}</AppText>

      <TextInputComponent
        accessibilityLabel={label}
        className={cn(
          'h-13 rounded-xl border border-gray-400 bg-white px-4 font-host-grotesk-regular text-black-700 text-body',
          isFocused && 'border-black-700',
          !!errorMessage && 'border-support-red',
          className
        )}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        placeholderTextColor={COLORS.gray[600]}
        selectionColor={COLORS.black[700]}
        value={value}
        {...props}
      />

      {!!errorMessage && (
        <AppText color='error' size='bodySm'>
          {errorMessage}
        </AppText>
      )}
    </View>
  );
}
