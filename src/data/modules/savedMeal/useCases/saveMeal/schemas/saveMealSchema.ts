import { z } from 'zod';

export const saveMealSchema = z.object({
  name: z.string().trim().min(1, 'validation.savedMealNameRequired').max(60, 'validation.nameMax60')
});

export type SaveMealFormType = z.input<typeof saveMealSchema>;
export type SaveMealPayloadType = z.output<typeof saveMealSchema>;
