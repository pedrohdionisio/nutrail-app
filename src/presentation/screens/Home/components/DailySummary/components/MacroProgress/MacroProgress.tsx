import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import type { IMacroProgressProps } from './MacroProgressTypes';

export function MacroProgress({ label, value, goal, fillClassName }: IMacroProgressProps) {
  return (
    <View className='flex-1 gap-2'>
      <AppText color='muted' size='bodySm'>
        {label}
      </AppText>

      <AppText weight='medium'>
        {`${value}g `}
        <AppText color='muted' size='bodySm'>
          {`/ ${goal}g`}
        </AppText>
      </AppText>

      <ProgressBar
        className='h-1.5'
        fillClassName={fillClassName}
        label={label}
        max={goal}
        value={value}
      />
    </View>
  );
}
