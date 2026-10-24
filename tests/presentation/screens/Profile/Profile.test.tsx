import { act, screen, waitFor } from '@testing-library/react-native';
import { AuthTokensManager } from 'data/libs/AuthTokensManager';
import * as SecureStore from 'expo-secure-store';
import { HttpResponse, http } from 'msw';
import { spyOnAlert } from 'tests/support/alert';
import { apiUrl } from 'tests/support/apiUrl';
import { buildMe } from 'tests/support/fixtures/me';
import { authSessionCalls, authSessionReturn } from 'tests/support/mocks/webBrowser';
import { renderApp, seedSession } from 'tests/support/render';
import { waitForHome, waitForWelcome } from 'tests/support/screens';
import { server } from 'tests/support/server';

const RECALCULATED_GOALS = { calories: 1800, protein: 150, carbohydrate: 180, fat: 50 };

function mockUpdateProfile(response = () => HttpResponse.json({ goals: RECALCULATED_GOALS })) {
  const bodies: unknown[] = [];

  server.use(
    http.put(apiUrl('/profile'), async ({ request }) => {
      bodies.push(await request.json());

      return response();
    })
  );

  return bodies;
}

async function openProfile() {
  await seedSession();
  const rendered = await renderApp();
  await waitForHome();

  await rendered.user.press(screen.getByRole('button', { name: 'Perfil' }));
  await screen.findByRole('header', { name: 'Perfil' });

  return rendered;
}

const FREE = buildMe();
const PREMIUM = {
  ...buildMe(),
  subscription: { plan: 'PREMIUM' as const, cancelAt: null, available: true },
  dailyLimits: { mealAnalyses: 100, recipes: 30 }
};

function mockMe(...responses: ReturnType<typeof buildMe>[]) {
  const queue = [...responses];

  server.use(
    http.get(apiUrl('/me'), () => HttpResponse.json(queue.length > 1 ? queue.shift() : queue[0]))
  );
}

function mockBillingSession(path: '/billing/checkout' | '/billing/portal', url: string) {
  const calls = { count: 0 };

  server.use(
    http.post(apiUrl(path), () => {
      calls.count++;

      return HttpResponse.json({ url });
    })
  );

  return calls;
}

describe('Profile', () => {
  it('should list the profile, save it and show the recalculated goals', async () => {
    const bodies = mockUpdateProfile();
    const { user } = await openProfile();

    expect(screen.getByDisplayValue('Ana Souza')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('07/03/1990')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('165')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('62,5')).toBeOnTheScreen();
    expect(screen.getByRole('radio', { name: 'Feminino' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Perder peso' })).toBeChecked();
    expect(screen.getByRole('radio', { name: /Leve/ })).toBeChecked();

    const name = screen.getByDisplayValue('Ana Souza');
    await user.clear(name);
    await user.type(name, 'Bruno Lima');
    const birthDate = screen.getByDisplayValue('07/03/1990');
    await user.clear(birthDate);
    await user.type(birthDate, '19022000');
    await user.press(screen.getByRole('radio', { name: 'Masculino' }));
    await user.press(screen.getByRole('radio', { name: 'Manter peso' }));
    await user.press(screen.getByRole('radio', { name: /Moderado/ }));
    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    await waitForHome();
    expect(screen.queryByRole('header', { name: 'Perfil' })).not.toBeOnTheScreen();
    expect(screen.getByText('Bruno')).toBeOnTheScreen();
    expect(screen.getByText('1800 kcal restantes')).toBeOnTheScreen();
    expect(bodies).toEqual([
      {
        name: 'Bruno Lima',
        birthDate: '2000-02-19',
        height: 165,
        weight: 62.5,
        gender: 'MALE',
        goal: 'MAINTAIN',
        activityLevel: 'MODERATE'
      }
    ]);
  });

  it('should validate the fields before sending', async () => {
    const bodies = mockUpdateProfile();
    const { user } = await openProfile();

    const name = screen.getByDisplayValue('Ana Souza');
    await user.clear(name);
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();

    await user.type(name, 'Ana');
    const birthDate = screen.getByDisplayValue('07/03/1990');
    await user.clear(birthDate);
    await user.type(birthDate, '31022000');
    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    expect(await screen.findByText('Informe uma data válida')).toBeOnTheScreen();
    expect(bodies).toEqual([]);
  });

  it('should show the API error and stay on the screen', async () => {
    mockUpdateProfile(() =>
      HttpResponse.json(
        { error: { code: 'USER_NOT_FOUND', message: 'User not found.' } },
        { status: 404 }
      )
    );
    const { user } = await openProfile();

    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    expect(await screen.findByText('Usuário não encontrado.')).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'Perfil' })).toBeOnTheScreen();
  });

  it('should delete the account after confirming and sign out', async () => {
    let deletions = 0;
    server.use(
      http.delete(apiUrl('/me'), () => {
        deletions += 1;

        return new HttpResponse(null, { status: 204 });
      })
    );
    const { user } = await openProfile();

    await user.press(screen.getByRole('button', { name: 'Excluir conta' }));
    await screen.findByRole('header', { name: 'Excluir conta?' });
    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    await waitForWelcome();
    expect(deletions).toBe(1);
    expect(await AuthTokensManager.load()).toBeNull();
  });

  it('should keep the session when the account cannot be deleted', async () => {
    server.use(http.delete(apiUrl('/me'), () => HttpResponse.error()));
    const { user } = await openProfile();

    await user.press(screen.getByRole('button', { name: 'Excluir conta' }));
    await screen.findByRole('header', { name: 'Excluir conta?' });
    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    expect(
      await screen.findByText('Não foi possível falar com o servidor. Verifique sua conexão.')
    ).toBeOnTheScreen();
    expect(await AuthTokensManager.load()).not.toBeNull();
  });

  it('should change the password after checking the confirmation', async () => {
    const { alertSpy } = spyOnAlert();
    const bodies: unknown[] = [];
    server.use(
      http.put(apiUrl('/me/password'), async ({ request }) => {
        bodies.push(await request.json());

        return new HttpResponse(null, { status: 204 });
      })
    );
    const { user } = await openProfile();

    await user.press(screen.getByRole('button', { name: 'Alterar senha' }));
    await screen.findByRole('header', { name: 'Alterar senha' });
    await user.type(screen.getByLabelText('Senha atual'), 'senha-antiga');
    await user.type(screen.getByLabelText('Nova senha'), 'senha-nova-123');
    await user.type(screen.getByLabelText('Confirme a nova senha'), 'senha-diferente');
    await user.press(screen.getByRole('button', { name: 'Salvar nova senha' }));

    expect(await screen.findByText('As senhas não conferem')).toBeOnTheScreen();
    expect(bodies).toEqual([]);

    const confirmation = screen.getByLabelText('Confirme a nova senha');
    await user.clear(confirmation);
    await user.type(confirmation, 'senha-nova-123');
    await user.press(screen.getByRole('button', { name: 'Salvar nova senha' }));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Senha alterada',
        'Use a nova senha na próxima vez que entrar.'
      )
    );
    expect(bodies).toEqual([{ currentPassword: 'senha-antiga', newPassword: 'senha-nova-123' }]);
    expect(screen.queryByRole('header', { name: 'Alterar senha' })).not.toBeOnTheScreen();
    expect(await AuthTokensManager.load()).not.toBeNull();
  });

  it('should explain when the current password is wrong', async () => {
    server.use(
      http.put(apiUrl('/me/password'), () =>
        HttpResponse.json(
          { error: { code: 'INVALID_CURRENT_PASSWORD', message: 'Wrong password.' } },
          { status: 400 }
        )
      )
    );
    const { user } = await openProfile();

    await user.press(screen.getByRole('button', { name: 'Alterar senha' }));
    await screen.findByRole('header', { name: 'Alterar senha' });
    await user.type(screen.getByLabelText('Senha atual'), 'errada');
    await user.type(screen.getByLabelText('Nova senha'), 'senha-nova-123');
    await user.type(screen.getByLabelText('Confirme a nova senha'), 'senha-nova-123');
    await user.press(screen.getByRole('button', { name: 'Salvar nova senha' }));

    expect(await screen.findByText('A senha atual está incorreta.')).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'Alterar senha' })).toBeOnTheScreen();
  });

  it('should go back to the home without saving', async () => {
    const bodies = mockUpdateProfile();
    const { user } = await openProfile();

    await user.press(screen.getByRole('button', { name: 'Voltar' }));

    await waitForHome();
    expect(bodies).toEqual([]);
  });

  it('should switch to English, keep the choice and fill the dates the American way', async () => {
    const languages: (string | null)[] = [];
    const bodies = mockUpdateProfile(() => HttpResponse.json({ goals: RECALCULATED_GOALS }));
    server.events.on('request:start', ({ request }) => {
      languages.push(request.headers.get('Accept-Language'));
    });
    const { user, unmount } = await openProfile();

    expect(screen.getByRole('radio', { name: 'Português' })).toBeChecked();
    await user.press(screen.getByRole('radio', { name: 'English' }));

    expect(await screen.findByRole('header', { name: 'Profile' })).toBeOnTheScreen();
    expect(screen.getByRole('radio', { name: 'English' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Female' })).toBeChecked();
    expect(screen.getByDisplayValue('03/07/1990')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('62.5')).toBeOnTheScreen();
    expect(SecureStore.getItem('nutrail.settings.language')).toBe('en-US');

    const birthDate = screen.getByDisplayValue('03/07/1990');
    await user.clear(birthDate);
    await user.type(birthDate, '02302000');
    await user.press(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByText('Enter a valid date')).toBeOnTheScreen();

    await user.clear(birthDate);
    await user.type(birthDate, '02192000');
    await user.press(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(bodies).toHaveLength(1));
    expect(bodies[0]).toMatchObject({ birthDate: '2000-02-19', weight: 62.5 });
    expect(languages.at(-1)).toBe('en-US');

    server.events.removeAllListeners();
    unmount();
  });

  it('should show the API error in English', async () => {
    mockUpdateProfile(() =>
      HttpResponse.json(
        { error: { code: 'USER_NOT_FOUND', message: 'User not found.' } },
        { status: 404 }
      )
    );
    const { user, unmount } = await openProfile();

    await user.press(screen.getByRole('radio', { name: 'English' }));
    await user.press(await screen.findByRole('button', { name: 'Save' }));

    expect(await screen.findByText('User not found.')).toBeOnTheScreen();

    unmount();
  });

  describe('plan', () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    it('should show the free plan with its limits', async () => {
      await openProfile();

      expect(screen.getByText('Gratuito')).toBeOnTheScreen();
      expect(screen.getByText('20 análises de refeição e 5 receitas por dia')).toBeOnTheScreen();
      expect(screen.getByRole('button', { name: 'Assinar o Premium' })).toBeOnTheScreen();
    });

    it('should hide the plan when the API has no billing', async () => {
      mockMe({ ...FREE, subscription: { ...FREE.subscription, available: false } });
      await openProfile();

      expect(screen.queryByText('Plano')).not.toBeOnTheScreen();
      expect(screen.queryByRole('button', { name: 'Assinar o Premium' })).not.toBeOnTheScreen();
    });

    it('should open the checkout in the browser and show the premium plan when the payment is done', async () => {
      mockMe(FREE, PREMIUM);
      const checkout = mockBillingSession('/billing/checkout', 'https://checkout.stripe.test/cs_1');
      authSessionReturn.current = 'nutrail://billing?status=success';
      const { alertSpy } = spyOnAlert();
      const { user } = await openProfile();

      await user.press(screen.getByRole('button', { name: 'Assinar o Premium' }));

      await waitFor(() =>
        expect(alertSpy).toHaveBeenCalledWith(
          'Bem-vindo ao Premium',
          'Seus novos limites diários já valem.'
        )
      );
      expect(checkout.count).toBe(1);
      expect(authSessionCalls).toEqual([
        {
          url: 'https://checkout.stripe.test/cs_1',
          redirectUrl: 'nutrail://billing',
          options: { preferEphemeralSession: true }
        }
      ]);
      expect(screen.getByText('Premium')).toBeOnTheScreen();
      expect(screen.getByText('100 análises de refeição e 30 receitas por dia')).toBeOnTheScreen();
      expect(screen.getByRole('button', { name: 'Gerenciar assinatura' })).toBeOnTheScreen();
    });

    it('should tell the user the payment is being activated when the plan takes long to change', async () => {
      jest.useFakeTimers({ advanceTimers: true });
      mockMe(FREE);
      mockBillingSession('/billing/checkout', 'https://checkout.stripe.test/cs_1');
      authSessionReturn.current = 'nutrail://billing?status=success';
      const { alertSpy } = spyOnAlert();
      const { user } = await openProfile();

      await user.press(screen.getByRole('button', { name: 'Assinar o Premium' }));
      await act(() => jest.advanceTimersByTimeAsync(6000));

      await waitFor(() =>
        expect(alertSpy).toHaveBeenCalledWith(
          'Pagamento recebido',
          'Estamos ativando o seu Premium. Em instantes ele aparece aqui.'
        )
      );
      expect(screen.getByText('Gratuito')).toBeOnTheScreen();
    });

    it('should stay on the free plan without alerts when the checkout is closed', async () => {
      mockBillingSession('/billing/checkout', 'https://checkout.stripe.test/cs_1');
      const { alertSpy } = spyOnAlert();
      const { user } = await openProfile();

      await user.press(screen.getByRole('button', { name: 'Assinar o Premium' }));

      await waitFor(() => expect(authSessionCalls).toHaveLength(1));
      await waitFor(() =>
        expect(screen.getByRole('button', { name: 'Assinar o Premium' })).toBeEnabled()
      );
      expect(alertSpy).not.toHaveBeenCalled();
      expect(screen.getByText('Gratuito')).toBeOnTheScreen();
    });

    it('should open the portal of a premium user and show when the plan ends', async () => {
      mockMe(PREMIUM, {
        ...PREMIUM,
        subscription: { ...PREMIUM.subscription, cancelAt: '2026-11-25T15:00:00.000Z' }
      });
      const portal = mockBillingSession('/billing/portal', 'https://billing.stripe.test/p_1');
      authSessionReturn.current = 'nutrail://billing';
      const { user } = await openProfile();

      await user.press(screen.getByRole('button', { name: 'Gerenciar assinatura' }));

      expect(await screen.findByText('Premium até 25/11/2026')).toBeOnTheScreen();
      expect(portal.count).toBe(1);
      expect(authSessionCalls[0]?.url).toBe('https://billing.stripe.test/p_1');
    });

    it('should explain an error of the API', async () => {
      server.use(
        http.post(apiUrl('/billing/checkout'), () =>
          HttpResponse.json(
            { error: { code: 'ALREADY_SUBSCRIBED', message: 'Already subscribed.' } },
            { status: 409 }
          )
        )
      );
      const { alertSpy } = spyOnAlert();
      const { user } = await openProfile();

      await user.press(screen.getByRole('button', { name: 'Assinar o Premium' }));

      await waitFor(() =>
        expect(alertSpy).toHaveBeenCalledWith(
          'Não foi possível abrir o pagamento',
          'Sua assinatura Premium já está ativa.'
        )
      );
      expect(authSessionCalls).toEqual([]);
    });
  });
});
