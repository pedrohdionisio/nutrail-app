import type { IMealSummary } from 'shared/entities/IMealSummary';

export interface IHandleOpenMealParams {
  mealId: string;
}

export interface IMealCardProps {
  meal: IMealSummary;
  onPress: (params: IHandleOpenMealParams) => void;
}
