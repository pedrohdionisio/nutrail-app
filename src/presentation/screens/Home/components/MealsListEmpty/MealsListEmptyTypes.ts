import type { IMealSourceOptionsProps } from '../MealSourceOptions/MealSourceOptionsTypes';

export interface IMealsListEmptyProps {
  isLoading: boolean;
  isError: boolean;
  isRetrying: boolean;
  onRetry: () => void;
  onSelectSource: IMealSourceOptionsProps['onSelect'];
}
