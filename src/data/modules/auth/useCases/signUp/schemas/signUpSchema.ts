import { getLanguage } from 'data/config/i18n';
import { ACTIVITY_LEVELS, GENDERS, GOALS } from 'shared/constants/profile';
import { parseDateInput } from 'shared/utils/parseDateInput';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    goal: z.enum(GOALS, 'validation.goalRequired'),
    gender: z.enum(GENDERS, 'validation.genderRequired'),
    birthDate: z
      .string()
      .transform((value, context) => {
        const isoDate = parseDateInput(value, getLanguage());

        if (!isoDate) {
          context.addIssue({ code: 'custom', message: 'validation.invalidDate' });

          return z.NEVER;
        }

        return isoDate;
      })
      .refine((isoDate) => isoDate <= toLocalIsoDate(new Date()), 'validation.futureDate')
      .refine((isoDate) => isoDate >= '1900-01-01', 'validation.invalidDate'),
    height: z
      .string()
      .trim()
      .regex(/^\d{2,3}$/, 'validation.heightInCentimeters')
      .transform(Number)
      .pipe(
        z
          .number()
          .min(50, 'validation.heightInCentimeters')
          .max(250, 'validation.heightInCentimeters')
      ),
    weight: z
      .string()
      .trim()
      .regex(/^\d{2,3}([.,]\d{1,2})?$/, 'validation.weightInKilograms')
      .transform((value) => Number(value.replace(',', '.')))
      .pipe(
        z.number().min(20, 'validation.weightInKilograms').max(400, 'validation.weightInKilograms')
      ),
    activityLevel: z.enum(ACTIVITY_LEVELS, 'validation.activityLevelRequired'),
    name: z.string().trim().min(1, 'validation.nameRequired').max(100, 'validation.nameTooLong'),
    email: z.email('validation.emailInvalid').max(254, 'validation.emailTooLong'),
    password: z
      .string()
      .min(8, 'validation.passwordTooShort')
      .max(256, 'validation.passwordTooLong'),
    passwordConfirmation: z.string()
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'validation.passwordsMismatch'
  })
  .transform(({ email, password, passwordConfirmation: _, ...profile }) => ({
    account: { email, password },
    profile
  }));

export type SignUpFormType = z.input<typeof signUpSchema>;
export type SignUpPayloadType = z.output<typeof signUpSchema>;
