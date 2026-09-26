import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

function mockUpdateGoals(response = () => new HttpResponse(null, { status: 204 })) {
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
  it('should show the current goals, save the changes and update the home', async () => {
    const bodies = mockUpdateGoals();
    const { user } = await openGoals();

    expect(screen.getByDisplayValue('200')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('175')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('56')).toBeOnTheScreen();

    const calories = screen.getByDisplayValue('2000');
    await user.clear(calories);
    await user.type(calories, '2200');
    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    await waitForHome();
    expect(screen.queryByRole('header', { name: 'Suas Metas' })).not.toBeOnTheScreen();
    expect(screen.getByText('2200 kcal restantes')).toBeOnTheScreen();
    expect(bodies).toEqual([{ calories: 2200, carbohydrate: 200, protein: 175, fat: 56 }]);
  });

  it('should validate the fields before sending', async () => {
    const bodies = mockUpdateGoals();
    const { user } = await openGoals();

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
        { error: { code: 'VALIDATION', message: 'Invalid body.' } },
        { status: 400 }
      )
    );
    const { user } = await openGoals();

    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    expect(
      await screen.findByText('Confira os dados informados e tente de novo.')
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
