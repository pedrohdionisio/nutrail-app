import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Informe a senha atual'),
    newPassword: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .max(256, 'A senha deve ter no máximo 256 caracteres'),
    newPasswordConfirmation: z.string()
  })
  .refine((values) => values.newPassword === values.newPasswordConfirmation, {
    path: ['newPasswordConfirmation'],
    message: 'As senhas não conferem'
  })
  .transform(({ currentPassword, newPassword }) => ({ currentPassword, newPassword }));

export type ChangePasswordFormType = z.input<typeof changePasswordSchema>;
export type ChangePasswordPayloadType = z.output<typeof changePasswordSchema>;
