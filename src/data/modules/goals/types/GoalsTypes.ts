import type { IGoals } from 'shared/entities/IGoals';

export type UpdateGoalsPayload =
  | Pick<IGoals, 'calories'>
  | Pick<IGoals, 'protein' | 'carbohydrate' | 'fat'>;

export interface IUpdateGoalsResponse {
  goals: IGoals;
}
