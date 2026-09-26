import { z } from 'zod';

export const analyzeMealItemsSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Descreva o alimento que você quer adicionar')
    .max(500, 'A descrição pode ter no máximo 500 caracteres')
});

export type AnalyzeMealItemsFormType = z.input<typeof analyzeMealItemsSchema>;
export type AnalyzeMealItemsPayloadType = z.output<typeof analyzeMealItemsSchema>;
