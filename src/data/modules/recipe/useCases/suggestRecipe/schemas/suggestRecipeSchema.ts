import { z } from 'zod';

export const suggestRecipeSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Conte o que você tem em casa')
    .max(1000, 'A descrição pode ter no máximo 1000 caracteres')
});

export type SuggestRecipeFormType = z.input<typeof suggestRecipeSchema>;
export type SuggestRecipePayloadType = z.output<typeof suggestRecipeSchema>;
