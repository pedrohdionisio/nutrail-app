import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

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

describe('Profile', () => {
  it('should list the profile, save it and show the recalculated goals', async () => {
    const bodies = mockUpdateProfile();
    const { user } = await openProfile();

    expect(screen.getByDisplayValue('Ana Souza')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('07/03/1990')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('165')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('62,5')).toBeOnTheScreen();
    expect(screen.getByRole('radio', { name: 'Feminino' })).toBeChecked();

    const name = screen.getByDisplayValue('Ana Souza');
    await user.clear(name);
    await user.type(name, 'Bruno Lima');
    const birthDate = screen.getByDisplayValue('07/03/1990');
    await user.clear(birthDate);
    await user.type(birthDate, '19022000');
    await user.press(screen.getByRole('radio', { name: 'Masculino' }));
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
        goal: 'LOSE',
        activityLevel: 'LIGHT'
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
});
