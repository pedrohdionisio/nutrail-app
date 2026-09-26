import type { IGoals } from 'shared/entities/IGoals';
import type { IUserProfile } from 'shared/entities/IUserProfile';

export type UpdateProfilePayload = Omit<IUserProfile, 'email'>;

export interface IUpdateProfileResponse {
  goals: IGoals;
}
