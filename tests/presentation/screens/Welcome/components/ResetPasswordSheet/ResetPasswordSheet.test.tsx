import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { spyOnAlert } from 'tests/support/alert';
import { apiUrl } from 'tests/support/apiUrl';
import { renderApp } from 'tests/support/render';
import { server } from 'tests/support/server';

async function openResetPasswordSheet() {
  const rendered = await renderApp();
  const { user } = rendered;

  await user.press(await screen.findByRole('link', { name: 'Recuperar senha' }));
  await user.type(await screen.findByLabelText('E-mail'), 'ana@nutrail.test');
  await user.press(screen.getByRole('button', { name: 'Enviar código' }));
  await screen.findByText('Crie uma nova senha');

  return rendered;
}

describe('ResetPasswordSheet', () => {
  it('should request a code, reset the password and switch to the sign in sheet', async () => {
    const calls: string[] = [];
    server.use(
      http.post(apiUrl('/auth/forgot-password'), async ({ request }) => {
        calls.push(`forgot ${JSON.stringify(await request.json())}`);

        return new HttpResponse(null, { status: 204 });
      }),
      http.post(apiUrl('/auth/forgot-password/confirm'), async ({ request }) => {
        calls.push(`confirm ${JSON.stringify(await request.json())}`);

        return new HttpResponse(null, { status: 204 });
      })
    );
    const { alertSpy } = spyOnAlert();
    const { user } = await openResetPasswordSheet();

    expect(screen.queryByText('Recupere sua senha')).not.toBeOnTheScreen();
    expect(
      screen.getByText('Enviamos um código para ana@nutrail.test. Confira também a caixa de spam.')
    ).toBeOnTheScreen();

    await user.type(screen.getByLabelText('Código'), '123456');
    await user.type(screen.getByLabelText('Nova senha'), 'senha-nova');
    await user.type(screen.getByLabelText('Confirme a nova senha'), 'senha-nova');
    await user.press(screen.getByRole('button', { name: 'Salvar nova senha' }));

    expect(await screen.findByText('Entre em sua conta')).toBeOnTheScreen();
    expect(screen.queryByText('Crie uma nova senha')).not.toBeOnTheScreen();
    expect(screen.getByText('Controle sua dieta de forma simples')).toBeOnTheScreen();
    expect(alertSpy).toHaveBeenCalledWith('Senha alterada', 'Entre com a sua nova senha.');
    expect(calls).toEqual([
      'forgot {"email":"ana@nutrail.test"}',
      'confirm {"email":"ana@nutrail.test","code":"123456","password":"senha-nova"}'
    ]);
  });

  it('should resend the code and translate an invalid code', async () => {
    server.use(
      http.post(apiUrl('/auth/forgot-password'), () => new HttpResponse(null, { status: 204 })),
      http.post(apiUrl('/auth/forgot-password/confirm'), () =>
        HttpResponse.json(
          { error: { code: 'INVALID_CODE', message: 'Invalid or expired code.' } },
          { status: 400 }
        )
      )
    );
    const { alertSpy } = spyOnAlert();
    const { user } = await openResetPasswordSheet();

    await user.press(screen.getByRole('button', { name: 'Reenviar código' }));

    expect(alertSpy).toHaveBeenCalledWith(
      'Código reenviado',
      'Enviamos um novo código para ana@nutrail.test.'
    );

    await user.type(screen.getByLabelText('Código'), '000000');
    await user.type(screen.getByLabelText('Nova senha'), 'senha-nova');
    await user.type(screen.getByLabelText('Confirme a nova senha'), 'senha-nova');
    await user.press(screen.getByRole('button', { name: 'Salvar nova senha' }));

    expect(await screen.findByText('Código inválido ou expirado.')).toBeOnTheScreen();
  });

  it('should require a matching confirmation of at least 8 characters', async () => {
    server.use(
      http.post(apiUrl('/auth/forgot-password'), () => new HttpResponse(null, { status: 204 }))
    );
    const { user } = await openResetPasswordSheet();

    await user.type(screen.getByLabelText('Código'), '123456');
    await user.type(screen.getByLabelText('Nova senha'), 'curta');
    await user.type(screen.getByLabelText('Confirme a nova senha'), 'outra');
    await user.press(screen.getByRole('button', { name: 'Salvar nova senha' }));

    expect(await screen.findByText('A senha deve ter no mínimo 8 caracteres')).toBeOnTheScreen();
    expect(screen.getByText('As senhas não conferem')).toBeOnTheScreen();
  });
});
