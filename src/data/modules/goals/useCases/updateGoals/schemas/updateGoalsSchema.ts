import { z } from 'zod';

export const updateGoalsSchema = z.discriminatedUnion('mode', [
  z
    .object({
      mode: z.literal('calories'),
      calories: z
        .string()
        .trim()
        .regex(/^\d{1,5}$/, 'validation.wholeNumber')
        .transform(Number)
        .pipe(z.number().int().min(1, 'validation.caloriesPositive')),
      carbohydrate: z.string(),
      protein: z.string(),
      fat: z.string()
    })
    .transform(({ calories }) => ({ calories })),
  z
    .object({
      mode: z.literal('macros'),
      calories: z.string(),
      carbohydrate: z
        .string()
        .trim()
        .regex(/^\d{1,5}$/, 'validation.wholeNumber')
        .transform(Number)
        .pipe(z.number().int().min(0, 'validation.wholeNumber')),
      protein: z
        .string()
        .trim()
        .regex(/^\d{1,5}$/, 'validation.wholeNumber')
        .transform(Number)
        .pipe(z.number().int().min(0, 'validation.wholeNumber')),
      fat: z
        .string()
        .trim()
        .regex(/^\d{1,5}$/, 'validation.wholeNumber')
        .transform(Number)
        .pipe(z.number().int().min(0, 'validation.wholeNumber'))
    })
    .transform(({ carbohydrate, protein, fat }) => ({ carbohydrate, protein, fat }))
]);

export type UpdateGoalsFormType = z.input<typeof updateGoalsSchema>;
export type UpdateGoalsPayloadType = z.output<typeof updateGoalsSchema>;
export type UpdateGoalsMode = UpdateGoalsFormType['mode'];
