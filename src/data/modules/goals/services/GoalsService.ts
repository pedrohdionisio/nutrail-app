import { api } from 'data/config/api';
import type { IGoals } from 'shared/entities/IGoals';

async function update(goals: IGoals): Promise<void> {
  await api.put('/goals', goals);
}

export const GoalsService = {
  update
};
