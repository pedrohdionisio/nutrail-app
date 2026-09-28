import type { ISavedMeal } from 'shared/entities/ISavedMeal';

export interface IHandleSelectSavedMealParams {
  savedMealId: string;
}

export interface IHandleDeleteSavedMealParams {
  savedMealId: string;
}

export interface ISavedMealCardProps {
  savedMeal: ISavedMeal;
  isCreating: boolean;
  isDisabled: boolean;
  onPress: (params: IHandleSelectSavedMealParams) => void;
  onDelete: (params: IHandleDeleteSavedMealParams) => void;
}

export interface IUseSavedMealCardControllerParams {
  savedMeal: ISavedMeal;
  onPress: (params: IHandleSelectSavedMealParams) => void;
  onDelete: (params: IHandleDeleteSavedMealParams) => void;
}
