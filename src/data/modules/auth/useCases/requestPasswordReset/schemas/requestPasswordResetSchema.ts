import { z } from 'zod';

export const requestPasswordResetSchema = z.object({
  email: z.email('validation.emailInvalid').max(254, 'validation.emailTooLong')
});

export type RequestPasswordResetFormType = z.infer<typeof requestPasswordResetSchema>;
