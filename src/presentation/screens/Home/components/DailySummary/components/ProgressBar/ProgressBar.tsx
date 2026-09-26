import { View } from 'react-native';
import { cn } from 'shared/utils/cn';
import type { IProgressBarProps } from './ProgressBarTypes';
import { toProgressWidth } from './utils/toProgressWidth';

export function ProgressBar({ label, value, max, className, fillClassName }: IProgressBarProps) {
  return (
    <View
      accessibilityLabel={label}
      accessibilityRole='progressbar'
      accessibilityValue={{ min: 0, max, now: Math.min(value, max) }}
      className={cn('w-full overflow-hidden rounded-full bg-gray-200', className)}
    >
      <View
        className={cn('h-full rounded-full', fillClassName)}
        style={{ width: toProgressWidth(value, max) }}
      />
    </View>
  );
}
