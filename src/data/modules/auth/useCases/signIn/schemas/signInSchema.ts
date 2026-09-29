import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email('validation.emailInvalid').max(254, 'validation.emailTooLong'),
  password: z.string().min(1, 'validation.passwordRequired').max(256)
});

export type SignInFormType = z.infer<typeof signInSchema>;
