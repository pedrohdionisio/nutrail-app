import type {
  UpdateGoalsFormType,
  UpdateGoalsMode,
  UpdateGoalsPayloadType
} from 'data/modules/goals/useCases/updateGoals/schemas/updateGoalsSchema';
import type { Control } from 'react-hook-form';
import type { IHandleSelectModeParams } from '../GoalsModeSelector/GoalsModeSelectorTypes';

export interface IGoalsFormProps {
  control: Control<UpdateGoalsFormType, unknown, UpdateGoalsPayloadType>;
  mode: UpdateGoalsMode;
  isCaloriesMode: boolean;
  apiErrorMessage: string | null;
  onSelectMode: (params: IHandleSelectModeParams) => void;
}
