import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import type { IMacroValueProps } from './MacroValueTypes';

export function MacroValue({ value, label, valueClassName }: IMacroValueProps) {
  return (
    <View className='flex-1 items-center gap-1'>
      <AppText className={valueClassName} size='title2'>
        {value}
      </AppText>

      <AppText color='inverse' size='bodySm'>
        {label}
      </AppText>
    </View>
  );
}
