import type { IMe } from 'shared/entities/IMe';

export interface IPlanSummaryProps {
  me: IMe;
  onStart: () => void;
}
