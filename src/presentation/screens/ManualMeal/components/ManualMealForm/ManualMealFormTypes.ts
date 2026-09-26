import type {
  CreateManualMealFormType,
  CreateManualMealPayloadType
} from 'data/modules/meal/useCases/createManualMeal/schemas/createManualMealSchema';
import type { Control } from 'react-hook-form';

export interface IManualMealFormProps {
  control: Control<CreateManualMealFormType, unknown, CreateManualMealPayloadType>;
  apiErrorMessage: string | null;
}
