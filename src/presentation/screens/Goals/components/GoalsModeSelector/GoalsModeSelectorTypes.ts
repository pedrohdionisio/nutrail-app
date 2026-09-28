import type { UpdateGoalsMode } from 'data/modules/goals/useCases/updateGoals/schemas/updateGoalsSchema';

export interface IGoalsModeSelectorProps {
  mode: UpdateGoalsMode;
  onSelectMode: (params: IHandleSelectModeParams) => void;
}

export interface IHandleSelectModeParams {
  mode: UpdateGoalsMode;
}
