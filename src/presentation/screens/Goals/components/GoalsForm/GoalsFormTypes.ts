import type {
  UpdateGoalsFormType,
  UpdateGoalsPayloadType
} from 'data/modules/goals/useCases/updateGoals/schemas/updateGoalsSchema';
import type { Control } from 'react-hook-form';

export interface IGoalsFormProps {
  control: Control<UpdateGoalsFormType, unknown, UpdateGoalsPayloadType>;
  apiErrorMessage: string | null;
}
