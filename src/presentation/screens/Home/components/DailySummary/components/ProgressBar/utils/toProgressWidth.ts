import type { DimensionValue } from 'react-native';

export function toProgressWidth(value: number, max: number): DimensionValue {
  if (max <= 0) {
    return '0%';
  }

  return `${Math.min(Math.max(value / max, 0), 1) * 100}%`;
}
