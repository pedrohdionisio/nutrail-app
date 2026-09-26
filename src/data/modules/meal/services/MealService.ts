import { api } from 'data/config/api';
import type { IMealsOfDay } from 'shared/entities/IMealsOfDay';
import type { IListMealsPayload } from '../types/MealTypes';

async function list({ date }: IListMealsPayload): Promise<IMealsOfDay> {
  const { data } = await api.get<IMealsOfDay>('/meals', { params: { date } });

  return data;
}

export const MealService = {
  list
};
