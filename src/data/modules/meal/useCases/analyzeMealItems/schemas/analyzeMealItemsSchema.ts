import { z } from 'zod';

export const analyzeMealItemsSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'validation.foodToAddRequired')
    .max(500, 'validation.descriptionMax500')
});

export type AnalyzeMealItemsFormType = z.input<typeof analyzeMealItemsSchema>;
export type AnalyzeMealItemsPayloadType = z.output<typeof analyzeMealItemsSchema>;
