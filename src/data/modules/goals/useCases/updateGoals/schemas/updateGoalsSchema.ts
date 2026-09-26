import { z } from 'zod';

export const updateGoalsSchema = z.object({
  calories: z
    .string()
    .trim()
    .regex(/^\d{1,5}$/, 'Informe um número inteiro')
    .transform(Number)
    .pipe(z.number().int().min(1, 'A meta de calorias precisa ser maior que zero')),
  carbohydrate: z
    .string()
    .trim()
    .regex(/^\d{1,5}$/, 'Informe um número inteiro')
    .transform(Number)
    .pipe(z.number().int().min(0, 'Informe um número inteiro')),
  protein: z
    .string()
    .trim()
    .regex(/^\d{1,5}$/, 'Informe um número inteiro')
    .transform(Number)
    .pipe(z.number().int().min(0, 'Informe um número inteiro')),
  fat: z
    .string()
    .trim()
    .regex(/^\d{1,5}$/, 'Informe um número inteiro')
    .transform(Number)
    .pipe(z.number().int().min(0, 'Informe um número inteiro'))
});

export type UpdateGoalsFormType = z.input<typeof updateGoalsSchema>;
export type UpdateGoalsPayloadType = z.output<typeof updateGoalsSchema>;
