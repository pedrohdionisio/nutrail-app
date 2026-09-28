import type {
  SuggestRecipeFormType,
  SuggestRecipePayloadType
} from 'data/modules/recipe/useCases/suggestRecipe/schemas/suggestRecipeSchema';
import type { Control } from 'react-hook-form';

export interface ISuggestRecipeFormProps {
  control: Control<SuggestRecipeFormType, unknown, SuggestRecipePayloadType>;
  apiErrorMessage: string | null;
}
