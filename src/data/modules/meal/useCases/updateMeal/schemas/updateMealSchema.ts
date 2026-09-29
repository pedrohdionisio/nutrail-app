import { getLanguage } from 'data/config/i18n';
import { parseDateInput } from 'shared/utils/parseDateInput';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import { z } from 'zod';

export const updateMealSchema = z
  .object({
    name: z.string().trim().min(1, 'validation.mealNameRequired').max(120, 'validation.nameMax120'),
    items: z
      .array(
        z
          .object({
            name: z.string(),
            unit: z.string(),
            quantity: z
              .string()
              .trim()
              .regex(/^\d{1,6}([.,]\d{1,2})?$/, 'validation.invalidQuantity')
              .transform((value) => Number(value.replace(',', '.')))
              .pipe(z.number().positive('validation.quantityPositive')),
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
      .min(1, 'validation.itemsRequired')
      .max(50, 'validation.itemsMax'),
    date: z
      .string()
      .transform((value, context) => {
        const isoDate = parseDateInput(value, getLanguage());

        if (!isoDate) {
          context.addIssue({ code: 'custom', message: 'validation.invalidDate' });

          return z.NEVER;
        }

        return isoDate;
      })
      .refine((isoDate) => isoDate <= toLocalIsoDate(new Date()), 'validation.futureDate'),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'validation.invalidTime')
  })
  .refine(
    ({ date, time }) => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      return date !== toLocalIsoDate(now) || time <= currentTime;
    },
    { path: ['time'], message: 'validation.futureTime' }
  );

export type UpdateMealFormType = z.input<typeof updateMealSchema>;
export type UpdateMealPayloadType = z.output<typeof updateMealSchema>;
