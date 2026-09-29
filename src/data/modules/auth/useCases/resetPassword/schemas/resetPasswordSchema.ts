import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    code: z.string().trim().min(1, 'validation.codeRequired').max(32),
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
  .transform(({ code, password }) => ({ code, password }));

export type ResetPasswordFormType = z.input<typeof resetPasswordSchema>;
export type ResetPasswordPayloadType = z.output<typeof resetPasswordSchema>;
