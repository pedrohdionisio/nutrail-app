import { z } from 'zod';

export const requestPasswordResetSchema = z.object({
  email: z.email('Formato de e-mail inválido').max(254, 'O e-mail é muito longo')
});

export type RequestPasswordResetFormType = z.infer<typeof requestPasswordResetSchema>;
