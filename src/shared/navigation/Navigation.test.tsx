import { screen } from '@testing-library/react-native';
import { AuthTokensManager } from 'data/libs/AuthTokensManager';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildMe } from 'tests/fixtures/me';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome, waitForWelcome } from 'tests/screens';
import { server } from 'tests/server';

function acceptOnly(validToken: string) {
  return http.get(apiUrl('/me'), ({ request }) =>
    request.headers.get('Authorization') === `Bearer ${validToken}`
      ? HttpResponse.json(buildMe())
      : new HttpResponse(null, { status: 401 })
  );
}

describe('Navigation', () => {
  it('should open the welcome without a session', async () => {
    await renderApp();

    await waitForWelcome();
  });

  it('should restore the stored session and sign out from the profile', async () => {
    await seedSession();
    const { user } = await renderApp();

    await waitForHome();
    await user.press(screen.getByRole('button', { name: 'Perfil' }));
    await user.press(await screen.findByRole('button', { name: 'Sair' }));

    await waitForWelcome();
    expect(await AuthTokensManager.load()).toBeNull();
  });

  it('should renew an expired session and keep the rotated tokens', async () => {
    server.use(
      acceptOnly('new-access'),
      http.post(apiUrl('/auth/refresh-token'), () =>
        HttpResponse.json({ accessToken: 'new-access', refreshToken: 'new-refresh' })
      )
    );
    await seedSession();
    await renderApp();

    await waitForHome();
    expect(await AuthTokensManager.load()).toEqual({
      accessToken: 'new-access',
      refreshToken: 'new-refresh'
    });
  });

  it('should sign out when the API refuses the refresh token', async () => {
    server.use(
      acceptOnly('never-valid'),
      http.post(apiUrl('/auth/refresh-token'), () =>
        HttpResponse.json(
          {
            error: { code: 'INVALID_REFRESH_TOKEN', message: 'Invalid or expired refresh token.' }
          },
          { status: 401 }
        )
      )
    );
    await seedSession();
    await renderApp();

    await waitForWelcome();
    expect(await AuthTokensManager.load()).toBeNull();
  });
});
