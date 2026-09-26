import { emailSchema } from 'data/modules/auth/schemas/emailSchema';
import { passwordSchema } from 'data/modules/auth/schemas/passwordSchema';
import { ACTIVITY_LEVELS, GENDERS, GOALS } from 'shared/constants/profile';
import { parseBrazilianDate } from 'shared/utils/parseBrazilianDate';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import { z } from 'zod';

const MIN_BIRTH_DATE = '1900-01-01';

const birthDateSchema = z
  .string()
  .transform((value, context) => {
    const isoDate = parseBrazilianDate(value);

    if (!isoDate) {
      context.addIssue({ code: 'custom', message: 'Informe uma data válida' });

      return z.NEVER;
    }

    return isoDate;
  })
  .refine((isoDate) => isoDate <= toLocalIsoDate(new Date()), 'A data não pode estar no futuro')
  .refine((isoDate) => isoDate >= MIN_BIRTH_DATE, 'Informe uma data válida');

const heightSchema = z
  .string()
  .trim()
  .regex(/^\d{2,3}$/, 'Informe a altura em centímetros')
  .transform(Number)
  .pipe(
    z
      .number()
      .min(50, 'Informe a altura em centímetros')
      .max(250, 'Informe a altura em centímetros')
  );

const weightSchema = z
  .string()
  .trim()
  .regex(/^\d{2,3}([.,]\d{1,2})?$/, 'Informe o peso em quilos')
  .transform((value) => Number(value.replace(',', '.')))
  .pipe(z.number().min(20, 'Informe o peso em quilos').max(400, 'Informe o peso em quilos'));

export const signUpSchema = z
  .object({
    goal: z.enum(GOALS, 'Escolha um objetivo'),
    gender: z.enum(GENDERS, 'Escolha um gênero'),
    birthDate: birthDateSchema,
    height: heightSchema,
    weight: weightSchema,
    activityLevel: z.enum(ACTIVITY_LEVELS, 'Escolha um nível de atividade'),
    name: z.string().trim().min(1, 'Informe seu nome').max(100, 'O nome é muito longo'),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: z.string()
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'As senhas não conferem'
  })
  .transform(({ email, password, passwordConfirmation: _, ...profile }) => ({
    account: { email, password },
    profile
  }));

export type SignUpFormType = z.input<typeof signUpSchema>;
export type SignUpPayloadType = z.output<typeof signUpSchema>;
