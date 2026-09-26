import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { cn } from 'shared/utils/cn';
import type { IMealStatProps } from './MealStatTypes';

export function MealStat({ label, value, dotClassName }: IMealStatProps) {
  return (
    <View className='flex-1 items-center gap-1'>
      <AppText weight='medium'>{value}</AppText>

      <View className='flex-row items-center gap-1.5'>
        <View className={cn('h-2 w-2 rounded-full', dotClassName)} />
        <AppText color='muted' size='bodyXs'>
          {label}
        </AppText>
      </View>
    </View>
  );
}
