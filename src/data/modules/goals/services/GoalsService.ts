import { api } from 'data/config/api';
import type { IUpdateGoalsResponse, UpdateGoalsPayload } from '../types/GoalsTypes';

async function update(goals: UpdateGoalsPayload): Promise<IUpdateGoalsResponse> {
  const { data } = await api.put<IUpdateGoalsResponse>('/goals', goals);

  return data;
}

export const GoalsService = {
  update
};
