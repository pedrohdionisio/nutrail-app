import { AxiosError, AxiosHeaders } from 'axios';
import { getApiErrorCode, getApiErrorMessage, isRejectedByApi } from 'data/config/apiError';

function buildResponseError(status: number, data: unknown) {
  const config = { headers: new AxiosHeaders() };

  return new AxiosError('Request failed', 'ERR_BAD_RESPONSE', config, null, {
    status,
    statusText: '',
    headers: {},
    config,
    data
  });
}

const networkError = new AxiosError('Network Error', 'ERR_NETWORK');

describe('apiError', () => {
  it('should translate a known code sent by the API', () => {
    const error = buildResponseError(401, {
      error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' }
    });

    expect(getApiErrorCode(error)).toBe('INVALID_CREDENTIALS');
    expect(getApiErrorMessage(error)).toBe('E-mail ou senha incorretos.');
  });

  it('should fall back to a generic message for codes the app does not know', () => {
    const error = buildResponseError(500, {
      error: { code: 'INTERNAL', message: 'Internal server error.' }
    });

    expect(getApiErrorCode(error)).toBeNull();
    expect(getApiErrorMessage(error)).toBe('Não foi possível concluir a ação. Tente novamente.');
  });

  it('should not treat inherited object keys as codes', () => {
    expect(getApiErrorCode(buildResponseError(400, { error: { code: 'toString' } }))).toBeNull();
  });

  it('should fall back to a connection message when there is no response', () => {
    expect(getApiErrorCode(networkError)).toBeNull();
    expect(getApiErrorMessage(networkError)).toBe(
      'Não foi possível falar com o servidor. Verifique sua conexão.'
    );
  });

  it('should fall back to a generic message for errors that are not from axios', () => {
    expect(getApiErrorMessage(new Error('boom'))).toBe(
      'Não foi possível concluir a ação. Tente novamente.'
    );
  });

  it('should treat only 4xx responses as rejected by the API', () => {
    expect(isRejectedByApi(buildResponseError(401, {}))).toBe(true);
    expect(isRejectedByApi(buildResponseError(503, {}))).toBe(false);
    expect(isRejectedByApi(networkError)).toBe(false);
  });
});
