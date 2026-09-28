import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/support/apiUrl';
import { renderApp, seedSession } from 'tests/support/render';
import { waitForHome } from 'tests/support/screens';
import { server } from 'tests/support/server';

const UPDATED_GOALS = { calories: 2200, protein: 175, carbohydrate: 250, fat: 56 };

function mockUpdateGoals(response = () => HttpResponse.json({ goals: UPDATED_GOALS })) {
  const bodies: unknown[] = [];

  server.use(
    http.put(apiUrl('/goals'), async ({ request }) => {
      bodies.push(await request.json());

      return response();
    })
  );

  return bodies;
}

async function openGoals() {
  await seedSession();
  const rendered = await renderApp();
  await waitForHome();

  await rendered.user.press(screen.getByRole('button', { name: 'Metas' }));
  await screen.findByRole('header', { name: 'Suas Metas' });

  return rendered;
}

describe('Goals', () => {
  it('should save the calories and show the goals returned by the API', async () => {
    const bodies = mockUpdateGoals();
    const { user } = await openGoals();

    expect(screen.getByRole('radio', { name: 'Por calorias' })).toBeChecked();
    expect(screen.queryByDisplayValue('175')).not.toBeOnTheScreen();

    const calories = screen.getByDisplayValue('2000');
    await user.clear(calories);
    await user.type(calories, '2200');
    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    await waitForHome();
    expect(screen.queryByRole('header', { name: 'Suas Metas' })).not.toBeOnTheScreen();
    expect(screen.getByText('2200 kcal restantes')).toBeOnTheScreen();
    expect(bodies).toEqual([{ calories: 2200 }]);
  });

  it('should save the macros', async () => {
    const bodies = mockUpdateGoals();
    const { user } = await openGoals();

    await user.press(screen.getByRole('radio', { name: 'Por macros' }));

    expect(screen.queryByDisplayValue('2000')).not.toBeOnTheScreen();
    expect(screen.getByDisplayValue('200')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('56')).toBeOnTheScreen();

    const carbohydrate = screen.getByDisplayValue('200');
    await user.clear(carbohydrate);
    await user.type(carbohydrate, '250');
    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    await waitForHome();
    expect(screen.getByText('2200 kcal restantes')).toBeOnTheScreen();
    expect(bodies).toEqual([{ carbohydrate: 250, protein: 175, fat: 56 }]);
  });

  it('should validate the fields before sending', async () => {
    const bodies = mockUpdateGoals();
    const { user } = await openGoals();

    await user.press(screen.getByRole('radio', { name: 'Por macros' }));
    const protein = screen.getByDisplayValue('175');
    await user.clear(protein);
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();

    await user.type(protein, '17.5');
    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    expect(await screen.findByText('Informe um número inteiro')).toBeOnTheScreen();
    expect(bodies).toEqual([]);
  });

  it('should show the API error and stay on the screen', async () => {
    mockUpdateGoals(() =>
      HttpResponse.json(
        { error: { code: 'GOALS_BELOW_MACROS', message: 'Calories are too low.' } },
        { status: 422 }
      )
    );
    const { user } = await openGoals();

    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    expect(
      await screen.findByText('As calorias não cobrem suas metas de proteína e gordura.')
    ).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'Suas Metas' })).toBeOnTheScreen();
  });

  it('should discard the changes on cancel', async () => {
    const bodies = mockUpdateGoals();
    const { user } = await openGoals();

    await user.type(screen.getByDisplayValue('2000'), '0');
    await user.press(screen.getByRole('button', { name: 'Cancelar' }));

    await waitForHome();
    expect(screen.getByText('2000 kcal restantes')).toBeOnTheScreen();
    expect(bodies).toEqual([]);
  });
});
