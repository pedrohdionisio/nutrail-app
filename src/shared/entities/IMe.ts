import type { IDailyLimits } from './IDailyLimits';
import type { IGoals } from './IGoals';
import type { ISubscription } from './ISubscription';
import type { IUserProfile } from './IUserProfile';

export interface IMe {
  profile: IUserProfile;
  goals: IGoals;
  subscription: ISubscription;
  dailyLimits: IDailyLimits;
}
