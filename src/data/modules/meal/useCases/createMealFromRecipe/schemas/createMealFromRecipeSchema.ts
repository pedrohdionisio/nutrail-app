import { getLanguage } from 'data/config/i18n';
import { parseDateInput } from 'shared/utils/parseDateInput';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import { z } from 'zod';

export const createMealFromRecipeSchema = z
  .object({
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

export type CreateMealFromRecipeFormType = z.input<typeof createMealFromRecipeSchema>;
export type CreateMealFromRecipePayloadType = z.output<typeof createMealFromRecipeSchema>;
