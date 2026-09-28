import { View } from 'react-native';
import { cn } from 'shared/utils/cn';
import type { ISkeletonProps } from './SkeletonTypes';

export function Skeleton({ className }: ISkeletonProps) {
  return <View className={cn('h-6 rounded-lg bg-gray-400', className)} />;
}
