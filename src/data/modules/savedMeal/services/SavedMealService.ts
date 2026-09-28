import { api } from 'data/config/api';
import type { ISavedMeal } from 'shared/entities/ISavedMeal';
import type {
  IDeleteSavedMealPayload,
  IListSavedMealsResponse,
  ISaveMealPayload
} from '../types/SavedMealTypes';

async function list(): Promise<ISavedMeal[]> {
  const { data } = await api.get<IListSavedMealsResponse>('/saved-meals');

  return data.savedMeals;
}

async function save(payload: ISaveMealPayload): Promise<ISavedMeal> {
  const { data } = await api.post<ISavedMeal>('/saved-meals', payload);

  return data;
}

async function remove({ savedMealId }: IDeleteSavedMealPayload): Promise<void> {
  await api.delete(`/saved-meals/${savedMealId}`);
}

export const SavedMealService = {
  list,
  save,
  remove
};
