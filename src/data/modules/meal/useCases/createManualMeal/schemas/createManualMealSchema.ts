import { parseBrazilianDate } from 'shared/utils/parseBrazilianDate';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import { z } from 'zod';

export const createManualMealSchema = z
  .object({
    text: z
      .string()
      .trim()
      .min(1, 'Descreva o que você comeu')
      .max(1000, 'A descrição pode ter no máximo 1000 caracteres'),
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
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Informe um horário válido'),
    pictureUri: z.string().nullable()
  })
  .refine(
    ({ date, time }) => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      return date !== toLocalIsoDate(now) || time <= currentTime;
    },
    { path: ['time'], message: 'O horário não pode estar no futuro' }
  );

export type CreateManualMealFormType = z.input<typeof createManualMealSchema>;
export type CreateManualMealPayloadType = z.output<typeof createManualMealSchema>;
