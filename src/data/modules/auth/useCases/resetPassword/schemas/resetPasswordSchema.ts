import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    code: z.string().trim().min(1, 'Informe o código que chegou por e-mail').max(32),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .max(256, 'A senha deve ter no máximo 256 caracteres'),
    passwordConfirmation: z.string()
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'As senhas não conferem'
  })
  .transform(({ code, password }) => ({ code, password }));

export type ResetPasswordFormType = z.input<typeof resetPasswordSchema>;
export type ResetPasswordPayloadType = z.output<typeof resetPasswordSchema>;
