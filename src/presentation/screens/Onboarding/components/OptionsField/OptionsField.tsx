import { View } from 'react-native';
import { OptionCard } from '../OptionCard/OptionCard';
import { optionsFieldVariants } from './OptionsFieldStyles';
import type { IOptionsFieldProps } from './OptionsFieldTypes';
import { useOptionsFieldController } from './useOptionsFieldController';

export function OptionsField({ control, name, options, orientation }: IOptionsFieldProps) {
  const { selectedValue, handleSelectOption } = useOptionsFieldController({ control, name });

  return (
    <View accessibilityRole='radiogroup' className={optionsFieldVariants({ orientation })}>
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
  );
}
