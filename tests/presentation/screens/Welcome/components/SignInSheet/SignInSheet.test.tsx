import { screen } from '@testing-library/react-native';
import { AuthTokensManager } from 'data/libs/AuthTokensManager';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/support/apiUrl';
import { renderApp } from 'tests/support/render';
import { waitForHome } from 'tests/support/screens';
import { server } from 'tests/support/server';

async function openSignInSheet() {
  const rendered = await renderApp();

  expect(screen.queryByText('Entre em sua conta')).not.toBeOnTheScreen();

  await rendered.user.press(await screen.findByRole('link', { name: 'Acessar conta' }));
  await screen.findByText('Entre em sua conta');

  return rendered;
}

describe('SignInSheet', () => {
  it('should open over the welcome instead of leaving it', async () => {
    await openSignInSheet();

    expect(screen.getByText('Controle sua dieta de forma simples')).toBeOnTheScreen();
  });

  it('should sign in, keep the tokens and open the home', async () => {
    const bodies: unknown[] = [];
    server.use(
      http.post(apiUrl('/auth/sign-in'), async ({ request }) => {
        bodies.push(await request.json());

        return HttpResponse.json({ accessToken: 'access', refreshToken: 'refresh' });
      })
    );

    const { user } = await openSignInSheet();

    await user.type(screen.getByLabelText('E-mail'), 'ana@nutrail.test');
    await user.type(screen.getByLabelText('Senha'), 'senha-forte');
    await user.press(screen.getByRole('button', { name: 'Entrar' }));

    await waitForHome();
    expect(bodies).toEqual([{ email: 'ana@nutrail.test', password: 'senha-forte' }]);
    expect(await AuthTokensManager.load()).toEqual({
      accessToken: 'access',
      refreshToken: 'refresh'
    });
  });

  it('should keep the button disabled until both fields are filled', async () => {
    const { user } = await openSignInSheet();

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();

    await user.type(screen.getByLabelText('E-mail'), 'ana@nutrail.test');

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();

    await user.type(screen.getByLabelText('Senha'), 'x');

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeEnabled();
  });

  it('should validate the e-mail before calling the API', async () => {
    const { user } = await openSignInSheet();

    await user.type(screen.getByLabelText('E-mail'), 'ana');
    await user.type(screen.getByLabelText('Senha'), 'senha-forte');
    await user.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(await screen.findByText('Formato de e-mail inválido')).toBeOnTheScreen();
  });

  it('should translate the error code when the credentials are refused', async () => {
    server.use(
      http.post(apiUrl('/auth/sign-in'), () =>
        HttpResponse.json(
          { error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' } },
          { status: 401 }
        )
      )
    );

    const { user } = await openSignInSheet();

    await user.type(screen.getByLabelText('E-mail'), 'ana@nutrail.test');
    await user.type(screen.getByLabelText('Senha'), 'errada');
    await user.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(await screen.findByText('E-mail ou senha incorretos.')).toBeOnTheScreen();
    expect(await AuthTokensManager.load()).toBeNull();
  });
});
