import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'validation.currentPasswordRequired'),
    newPassword: z
      .string()
      .min(8, 'validation.passwordTooShort')
      .max(256, 'validation.passwordTooLong'),
    newPasswordConfirmation: z.string()
  })
  .refine((values) => values.newPassword === values.newPasswordConfirmation, {
    path: ['newPasswordConfirmation'],
    message: 'validation.passwordsMismatch'
  })
  .transform(({ currentPassword, newPassword }) => ({ currentPassword, newPassword }));

export type ChangePasswordFormType = z.input<typeof changePasswordSchema>;
export type ChangePasswordPayloadType = z.output<typeof changePasswordSchema>;
