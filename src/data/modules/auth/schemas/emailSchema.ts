import { z } from 'zod';

export const emailSchema = z.email('Formato de e-mail inválido').max(254, 'O e-mail é muito longo');
