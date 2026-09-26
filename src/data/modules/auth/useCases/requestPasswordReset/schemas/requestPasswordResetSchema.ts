import { emailSchema } from 'data/modules/auth/schemas/emailSchema';
import { z } from 'zod';

export const requestPasswordResetSchema = z.object({
  email: emailSchema
});

export type RequestPasswordResetFormType = z.infer<typeof requestPasswordResetSchema>;
