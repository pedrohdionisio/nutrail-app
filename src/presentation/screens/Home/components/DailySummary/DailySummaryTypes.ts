import type { IGoals } from 'shared/entities/IGoals';
import type { IMacros } from 'shared/entities/IMacros';

export interface IDailySummaryProps {
  consumed: IMacros;
  goals: IGoals;
}
