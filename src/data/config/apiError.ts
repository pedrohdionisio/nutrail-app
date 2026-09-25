import { isAxiosError } from 'axios';

const API_ERROR_MESSAGES = {
  VALIDATION: 'Confira os dados informados e tente de novo.',
  UNAUTHORIZED: 'Sua sessão expirou. Entre de novo.',
  INVALID_REFRESH_TOKEN: 'Sua sessão expirou. Entre de novo.',
  INVALID_CREDENTIALS: 'E-mail ou senha incorretos.',
  EMAIL_ALREADY_IN_USE: 'Este e-mail já está em uso.',
  INVALID_CODE: 'Código inválido ou expirado.',
  TOO_MANY_ATTEMPTS: 'Muitas tentativas. Aguarde um pouco e tente de novo.',
  USER_NOT_FOUND: 'Usuário não encontrado.',
  MEAL_NOT_FOUND: 'Refeição não encontrada.',
  MEAL_NOT_EDITABLE: 'Só é possível editar refeições que já foram processadas.',
  MEAL_WITHOUT_ITEMS: 'Nenhum alimento foi identificado na refeição.',
  MEAL_ANALYSIS_FAILED: 'Não conseguimos analisar a refeição. Tente de novo.',
  MEAL_PICTURE_NOT_ALLOWED: 'Não é possível trocar a foto desta refeição agora.',
  INVALID_MEAL_TRANSITION: 'Esta refeição não pode ser alterada agora.',
  NO_FOOD_INGREDIENTS: 'Não identificamos nenhum alimento na descrição.',
  RECIPE_NOT_FOUND: 'Receita não encontrada.',
  RECIPE_GENERATION_FAILED: 'Não conseguimos gerar uma receita. Tente de novo.'
} as const;

export type ApiErrorCode = keyof typeof API_ERROR_MESSAGES;

const NETWORK_ERROR_MESSAGE = 'Não foi possível falar com o servidor. Verifique sua conexão.';
const FALLBACK_MESSAGE = 'Não foi possível concluir a ação. Tente novamente.';

interface IApiErrorBody {
  error?: {
    code?: string;
    message?: string;
  };
}

function isApiErrorCode(code: string): code is ApiErrorCode {
  return Object.hasOwn(API_ERROR_MESSAGES, code);
}

export function getApiErrorCode(error: unknown): ApiErrorCode | null {
  if (!isAxiosError<IApiErrorBody>(error)) {
    return null;
  }

  const code = error.response?.data?.error?.code;

  if (!code || !isApiErrorCode(code)) {
    return null;
  }

  return code;
}

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error) && !error.response) {
    return NETWORK_ERROR_MESSAGE;
  }

  const code = getApiErrorCode(error);

  return code ? API_ERROR_MESSAGES[code] : FALLBACK_MESSAGE;
}
