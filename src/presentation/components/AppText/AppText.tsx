import { Text } from 'react-native';
import { cn } from 'shared/utils/cn';
import { appTextVariants, DEFAULT_WEIGHT_BY_SIZE } from './AppTextStyles';
import type { IAppTextProps } from './AppTextTypes';

export function AppText({
  size = 'body',
  weight = DEFAULT_WEIGHT_BY_SIZE[size],
  color,
  align,
  className,
  ...props
}: IAppTextProps) {
  return (
    <Text className={cn(appTextVariants({ size, weight, color, align }), className)} {...props} />
  );
}
