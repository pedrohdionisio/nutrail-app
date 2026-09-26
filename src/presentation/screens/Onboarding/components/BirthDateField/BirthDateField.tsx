import { AppText } from 'presentation/components/AppText/AppText';
import { TextInput, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IBirthDateFieldProps } from './BirthDateFieldTypes';
import { useBirthDateFieldController } from './useBirthDateFieldController';

export function BirthDateField({ control }: IBirthDateFieldProps) {
  const { value, errorMessage, handleChangeText, handleBlur } = useBirthDateFieldController({
    control
  });

  return (
    <View className='items-center gap-4'>
      <TextInput
        accessibilityLabel='Data de nascimento'
        autoFocus
        className='h-14 w-full text-center font-host-grotesk-medium text-black-700 text-title-1-input'
        keyboardType='number-pad'
        maxLength={10}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        placeholder='DD/MM/AAAA'
        placeholderTextColor={COLORS.gray[700]}
        selectionColor={COLORS.black[700]}
        value={value}
      />

      {!!errorMessage && (
        <AppText color='error' size='bodySm'>
          {errorMessage}
        </AppText>
      )}
    </View>
  );
}
