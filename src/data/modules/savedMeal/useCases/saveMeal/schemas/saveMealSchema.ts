import { z } from 'zod';

export const saveMealSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Dê um nome para a refeição')
    .max(60, 'O nome pode ter no máximo 60 caracteres')
});

export type SaveMealFormType = z.input<typeof saveMealSchema>;
export type SaveMealPayloadType = z.output<typeof saveMealSchema>;
