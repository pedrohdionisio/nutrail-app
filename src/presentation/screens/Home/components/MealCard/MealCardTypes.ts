import type { IMealSummary } from 'shared/entities/IMealSummary';

export interface IHandleOpenMealParams {
  mealId: string;
}

export interface IHandleDeleteMealParams {
  mealId: string;
}

export interface IMealCardProps {
  meal: IMealSummary;
  onPress: (params: IHandleOpenMealParams) => void;
  onDelete: (params: IHandleDeleteMealParams) => void;
}

export interface IUseMealCardControllerParams {
  mealId: string;
  onPress: (params: IHandleOpenMealParams) => void;
  onDelete: (params: IHandleDeleteMealParams) => void;
}
