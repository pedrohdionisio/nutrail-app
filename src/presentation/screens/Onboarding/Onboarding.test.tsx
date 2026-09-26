import { screen } from '@testing-library/react-native';
import { AuthTokensManager } from 'data/libs/AuthTokensManager';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildMe } from 'tests/fixtures/me';
import { renderApp } from 'tests/render';
import { waitForHome, waitForWelcome } from 'tests/screens';
import { server } from 'tests/server';

type User = Awaited<ReturnType<typeof renderApp>>['user'];

async function openOnboarding() {
  const rendered = await renderApp();

  await rendered.user.press(await screen.findByRole('button', { name: 'Criar Conta' }));
  await screen.findByText('Qual é seu objetivo?');

  return rendered;
}

async function pressContinue(user: User) {
  await user.press(screen.getByRole('button', { name: 'Continuar' }));
}

async function answerProfileSteps(user: User) {
  await user.press(screen.getByRole('radio', { name: 'Perder peso' }));
  await pressContinue(user);

  await user.press(await screen.findByRole('radio', { name: 'Feminino' }));
  await pressContinue(user);

  await user.type(await screen.findByLabelText('Data de nascimento'), '07031990');
  await pressContinue(user);

  await user.type(await screen.findByLabelText('Altura (cm)'), '165');
  await pressContinue(user);

  await user.type(await screen.findByLabelText('Peso (kg)'), '62,5');
  await pressContinue(user);

  await user.press(await screen.findByRole('radio', { name: 'Leve' }));
  await pressContinue(user);

  await screen.findByText('Crie sua conta');
}

async function fillAccount(user: User) {
  await user.type(screen.getByLabelText('Nome'), 'Ana Souza');
  await user.type(screen.getByLabelText('E-mail'), 'ana@nutrail.test');
  await user.type(screen.getByLabelText('Senha'), 'senha-forte');
  await user.type(screen.getByLabelText('Confirmar Senha'), 'senha-forte');
  await user.press(screen.getByRole('button', { name: 'Criar conta' }));
}

function mockSignUp(bodies: unknown[] = []) {
  return http.post(apiUrl('/auth/sign-up'), async ({ request }) => {
    bodies.push(await request.json());

    return HttpResponse.json({ accessToken: 'access', refreshToken: 'refresh' }, { status: 201 });
  });
}

describe('Onboarding', () => {
  it('should create the account, show the plan and enter the app only on start', async () => {
    const bodies: unknown[] = [];
    server.use(
      mockSignUp(bodies),
      http.get(apiUrl('/me'), ({ request }) =>
        request.headers.get('Authorization') === 'Bearer access'
          ? HttpResponse.json(buildMe())
          : new HttpResponse(null, { status: 401 })
      )
    );

    const { user } = await openOnboarding();

    await answerProfileSteps(user);
    await fillAccount(user);

    expect(await screen.findByText('Perder Peso')).toBeOnTheScreen();
    expect(screen.getByText('2000 kcal')).toBeOnTheScreen();
    expect(screen.getByText('175g')).toBeOnTheScreen();
    expect(screen.getByText('200g')).toBeOnTheScreen();
    expect(screen.getByText('56g')).toBeOnTheScreen();
    expect(bodies).toEqual([
      {
        account: { email: 'ana@nutrail.test', password: 'senha-forte' },
        profile: {
          goal: 'LOSE',
          gender: 'FEMALE',
          birthDate: '1990-03-07',
          height: 165,
          weight: 62.5,
          activityLevel: 'LIGHT',
          name: 'Ana Souza'
        }
      }
    ]);
    expect(await AuthTokensManager.load()).toEqual({
      accessToken: 'access',
      refreshToken: 'refresh'
    });
    expect(screen.queryByText('Olá!')).not.toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Começar meu plano' }));

    await waitForHome();
  });

  it('should keep continue disabled until the step is answered', async () => {
    const { user } = await openOnboarding();

    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled();

    await user.press(screen.getByRole('radio', { name: 'Manter peso' }));

    expect(screen.getByRole('radio', { name: 'Manter peso' })).toBeChecked();
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeEnabled();
  });

  it('should go back through the steps keeping the answers and leave from the first one', async () => {
    const { user } = await openOnboarding();

    await user.press(screen.getByRole('radio', { name: 'Ganhar peso' }));
    await pressContinue(user);
    await screen.findByText('Qual o seu gênero biológico?');

    await user.press(screen.getByRole('button', { name: 'Voltar' }));

    expect(await screen.findByRole('radio', { name: 'Ganhar peso' })).toBeChecked();

    await user.press(screen.getByRole('button', { name: 'Voltar' }));

    await waitForWelcome();
  });

  it('should refuse birth dates that do not exist or are in the future', async () => {
    const { user } = await openOnboarding();

    await user.press(screen.getByRole('radio', { name: 'Perder peso' }));
    await pressContinue(user);
    await user.press(await screen.findByRole('radio', { name: 'Masculino' }));
    await pressContinue(user);

    const birthDateInput = await screen.findByLabelText('Data de nascimento');

    await user.type(birthDateInput, '31022000');

    expect(birthDateInput).toHaveDisplayValue('31/02/2000');

    await pressContinue(user);

    expect(await screen.findByText('Informe uma data válida')).toBeOnTheScreen();

    await user.clear(birthDateInput);
    await user.type(birthDateInput, '01012999');
    await pressContinue(user);

    expect(await screen.findByText('A data não pode estar no futuro')).toBeOnTheScreen();
    expect(screen.getByText('Que dia você nasceu?')).toBeOnTheScreen();
  });

  it('should keep the answers and translate the error when the e-mail is taken', async () => {
    server.use(
      http.post(apiUrl('/auth/sign-up'), () =>
        HttpResponse.json(
          { error: { code: 'EMAIL_ALREADY_IN_USE', message: 'Email is already in use.' } },
          { status: 409 }
        )
      )
    );

    const { user } = await openOnboarding();

    await answerProfileSteps(user);
    await fillAccount(user);

    expect(await screen.findByText('Este e-mail já está em uso.')).toBeOnTheScreen();
    expect(screen.getByText('Crie sua conta')).toBeOnTheScreen();
    expect(await AuthTokensManager.load()).toBeNull();
  });

  it('should let the user retry when the plan fails to load', async () => {
    let meCalls = 0;
    server.use(
      mockSignUp(),
      http.get(apiUrl('/me'), () => {
        meCalls += 1;

        return meCalls === 1
          ? new HttpResponse(null, { status: 500 })
          : HttpResponse.json(buildMe({ goal: 'GAIN' }));
      })
    );

    const { user } = await openOnboarding();

    await answerProfileSteps(user);
    await fillAccount(user);

    expect(await screen.findByText('Não conseguimos montar seu plano')).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(await screen.findByText('Ganhar Peso')).toBeOnTheScreen();
  });
});
