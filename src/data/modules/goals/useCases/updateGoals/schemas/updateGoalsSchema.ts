import { z } from 'zod';

const INTEGER_MESSAGE = 'Informe um número inteiro';

function goalSchema(min: number, minMessage: string) {
  return z
    .string()
    .trim()
    .regex(/^\d{1,5}$/, INTEGER_MESSAGE)
    .transform(Number)
    .pipe(z.number().int().min(min, minMessage));
}

export const updateGoalsSchema = z.object({
  calories: goalSchema(1, 'A meta de calorias precisa ser maior que zero'),
  carbohydrate: goalSchema(0, INTEGER_MESSAGE),
  protein: goalSchema(0, INTEGER_MESSAGE),
  fat: goalSchema(0, INTEGER_MESSAGE)
});

export type UpdateGoalsFormType = z.input<typeof updateGoalsSchema>;
export type UpdateGoalsPayloadType = z.output<typeof updateGoalsSchema>;
