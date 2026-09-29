import { z } from 'zod';

export const suggestRecipeSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'validation.ingredientsRequired')
    .max(1000, 'validation.descriptionMax1000')
});

export type SuggestRecipeFormType = z.input<typeof suggestRecipeSchema>;
export type SuggestRecipePayloadType = z.output<typeof suggestRecipeSchema>;
