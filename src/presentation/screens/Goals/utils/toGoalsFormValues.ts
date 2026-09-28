import type { UpdateGoalsFormType } from 'data/modules/goals/useCases/updateGoals/schemas/updateGoalsSchema';
import type { IGoals } from 'shared/entities/IGoals';

export function toGoalsFormValues({
  calories,
  carbohydrate,
  protein,
  fat
}: IGoals): UpdateGoalsFormType {
  return {
    mode: 'calories',
    calories: String(calories),
    carbohydrate: String(carbohydrate),
    protein: String(protein),
    fat: String(fat)
  };
}
