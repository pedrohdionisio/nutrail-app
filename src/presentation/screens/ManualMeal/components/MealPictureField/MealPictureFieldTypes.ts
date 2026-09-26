import type {
  CreateManualMealFormType,
  CreateManualMealPayloadType
} from 'data/modules/meal/useCases/createManualMeal/schemas/createManualMealSchema';
import type { Control } from 'react-hook-form';

export interface IMealPictureFieldProps {
  control: Control<CreateManualMealFormType, unknown, CreateManualMealPayloadType>;
}

export interface IUseMealPictureFieldControllerParams {
  control: Control<CreateManualMealFormType, unknown, CreateManualMealPayloadType>;
}
