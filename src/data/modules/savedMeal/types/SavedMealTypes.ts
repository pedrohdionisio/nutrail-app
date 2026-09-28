import type { ISavedMeal } from 'shared/entities/ISavedMeal';

export interface IListSavedMealsResponse {
  savedMeals: ISavedMeal[];
}

export interface ISaveMealPayload {
  mealId: string;
  name: string;
}

export interface IDeleteSavedMealPayload {
  savedMealId: string;
}
