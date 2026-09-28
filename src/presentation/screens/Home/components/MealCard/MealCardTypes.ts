import type { IMealSummary } from 'shared/entities/IMealSummary';

export type MealCardState = 'ANALYZED' | 'ANALYZING' | 'FAILED';

export interface IHandleOpenMealParams {
  mealId: string;
}

export interface IHandleDeleteMealParams {
  mealId: string;
}

export interface IHandleRetryMealParams {
  mealId: string;
}

export interface IMealCardProps {
  meal: IMealSummary;
  isRetrying: boolean;
  onPress: (params: IHandleOpenMealParams) => void;
  onDelete: (params: IHandleDeleteMealParams) => void;
  onRetry: (params: IHandleRetryMealParams) => void;
}

export interface IUseMealCardControllerParams {
  meal: IMealSummary;
  onPress: (params: IHandleOpenMealParams) => void;
  onDelete: (params: IHandleDeleteMealParams) => void;
  onRetry: (params: IHandleRetryMealParams) => void;
}
