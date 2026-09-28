import { parseBrazilianDate } from 'shared/utils/parseBrazilianDate';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import { z } from 'zod';

export const updateMealSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Informe o nome da refeição')
      .max(120, 'O nome pode ter no máximo 120 caracteres'),
    items: z
      .array(
        z
          .object({
            name: z.string(),
            unit: z.string(),
            quantity: z
              .string()
              .trim()
              .regex(/^\d{1,6}([.,]\d{1,2})?$/, 'Informe uma quantidade válida')
              .transform((value) => Number(value.replace(',', '.')))
              .pipe(z.number().positive('A quantidade precisa ser maior que zero')),
            original: z.object({
              quantity: z.number(),
              calories: z.number(),
              protein: z.number(),
              carbohydrate: z.number(),
              fat: z.number()
            })
          })
          .transform(({ name, unit, quantity, original }) => {
            const ratio = quantity / original.quantity;

            return {
              name,
              unit,
              quantity,
              calories: Math.round(original.calories * ratio),
              protein: Math.round(original.protein * ratio * 10) / 10,
              carbohydrate: Math.round(original.carbohydrate * ratio * 10) / 10,
              fat: Math.round(original.fat * ratio * 10) / 10
            };
          })
      )
      .min(1, 'Mantenha pelo menos um item na refeição')
      .max(50, 'A refeição pode ter no máximo 50 itens'),
    date: z
      .string()
      .transform((value, context) => {
        const isoDate = parseBrazilianDate(value);

        if (!isoDate) {
          context.addIssue({ code: 'custom', message: 'Informe uma data válida' });

          return z.NEVER;
        }

        return isoDate;
      })
      .refine(
        (isoDate) => isoDate <= toLocalIsoDate(new Date()),
        'A data não pode estar no futuro'
      ),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Informe um horário válido')
  })
  .refine(
    ({ date, time }) => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      return date !== toLocalIsoDate(now) || time <= currentTime;
    },
    { path: ['time'], message: 'O horário não pode estar no futuro' }
  );

export type UpdateMealFormType = z.input<typeof updateMealSchema>;
export type UpdateMealPayloadType = z.output<typeof updateMealSchema>;
