import { isAxiosError } from 'axios';
import { i18n } from './i18n';

const API_ERROR_CODES = [
  'VALIDATION',
  'UNAUTHORIZED',
  'INVALID_REFRESH_TOKEN',
  'INVALID_CREDENTIALS',
  'INVALID_CURRENT_PASSWORD',
  'EMAIL_ALREADY_IN_USE',
  'INVALID_CODE',
  'TOO_MANY_ATTEMPTS',
  'USER_NOT_FOUND',
  'MEAL_NOT_FOUND',
  'MEAL_NOT_EDITABLE',
  'MEAL_NOT_SAVABLE',
  'MEAL_WITHOUT_ITEMS',
  'MEAL_ANALYSIS_FAILED',
  'MEAL_PICTURE_NOT_ALLOWED',
  'INVALID_MEAL_TRANSITION',
  'NO_FOOD_INGREDIENTS',
  'GOALS_BELOW_MACROS',
  'RECIPE_NOT_FOUND',
  'SAVED_MEAL_NOT_FOUND',
  'RECIPE_GENERATION_FAILED'
] as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

interface IApiErrorBody {
  error?: {
    code?: string;
    message?: string;
  };
}

function isApiErrorCode(code: string): code is ApiErrorCode {
  return API_ERROR_CODES.some((apiErrorCode) => apiErrorCode === code);
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

export function isRejectedByApi(error: unknown): boolean {
  if (!isAxiosError(error) || !error.response) {
    return false;
  }

  const { status } = error.response;

  return status >= 400 && status < 500;
}

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error) && !error.response) {
    return i18n.t('errors.network');
  }

  const code = getApiErrorCode(error);

  return code ? i18n.t(`errors.${code}`) : i18n.t('errors.fallback');
}
