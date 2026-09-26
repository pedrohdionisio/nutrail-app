import type { ActivityLevel, Gender, Goal } from 'shared/constants/profile';

export interface IUserProfile {
  name: string;
  email: string;
  gender: Gender;
  birthDate: string;
  height: number;
  weight: number;
  goal: Goal;
  activityLevel: ActivityLevel;
}
