import { emailSchema } from 'data/modules/auth/schemas/emailSchema';
import { z } from 'zod';

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Informe sua senha').max(256)
});

export type SignInFormType = z.infer<typeof signInSchema>;
