import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'A senha deve ter no mínimo 8 caracteres')
  .max(256, 'A senha deve ter no máximo 256 caracteres');
