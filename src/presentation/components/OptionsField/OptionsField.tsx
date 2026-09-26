import { AppText } from 'presentation/components/AppText/AppText';
import type { FieldPathByValue, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { OptionCard } from '../OptionCard/OptionCard';
import { optionsFieldVariants } from './OptionsFieldStyles';
import type { IOptionsFieldProps } from './OptionsFieldTypes';
import { useOptionsFieldController } from './useOptionsFieldController';

export function OptionsField<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TTransformedValues = TFieldValues
>({
  control,
  name,
  options,
  orientation,
  label
}: IOptionsFieldProps<TFieldValues, TName, TTransformedValues>) {
  const { selectedValue, handleSelectOption } = useOptionsFieldController({ control, name });

  return (
    <View className='gap-2'>
      {!!label && <AppText size='bodySm'>{label}</AppText>}

      <View
        accessibilityLabel={label}
        accessibilityRole='radiogroup'
        className={optionsFieldVariants({ orientation })}
      >
        {options.map((option) => (
          <OptionCard
            isSelected={option.value === selectedValue}
            key={option.value}
            onPress={() => handleSelectOption({ value: option.value })}
            option={option}
            orientation={orientation}
          />
        ))}
      </View>
    </View>
  );
}
