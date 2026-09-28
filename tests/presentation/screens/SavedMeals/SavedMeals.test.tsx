import { screen, waitFor } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import type { IMealSummary } from 'shared/entities/IMealSummary';
import type { ISavedMeal } from 'shared/entities/ISavedMeal';
import { spyOnAlert } from 'tests/support/alert';
import { apiUrl } from 'tests/support/apiUrl';
import { pickDateTime } from 'tests/support/dateTimePicker';
import { buildMeal, buildMealsOfDay } from 'tests/support/fixtures/meal';
import { buildSavedMeal } from 'tests/support/fixtures/savedMeal';
import { renderApp, seedSession } from 'tests/support/render';
import { waitForHome } from 'tests/support/screens';
import { server } from 'tests/support/server';

function mockSavedMealsApi(savedMeals: ISavedMeal[]) {
  const calls = {
    created: [] as { savedMealId: string; body: unknown }[],
    deletedIds: [] as string[]
  };
  let meals: IMealSummary[] = [];

  server.use(
    http.get(apiUrl('/meals'), ({ request }) =>
      HttpResponse.json(buildMealsOfDay(new URL(request.url).searchParams.get('date') ?? '', meals))
    ),
    http.get(apiUrl('/saved-meals'), () => HttpResponse.json({ savedMeals })),
    http.post(apiUrl('/saved-meals/:savedMealId/meal'), async ({ params, request }) => {
      calls.created.push({ savedMealId: String(params.savedMealId), body: await request.json() });
      meals = [buildMeal({ id: 'meal-2', name: 'Café da manhã de sempre', inputType: 'MANUAL' })];

      return HttpResponse.json({ id: 'meal-2' }, { status: 201 });
    }),
    http.delete(apiUrl('/saved-meals/:savedMealId'), ({ params }) => {
      calls.deletedIds.push(String(params.savedMealId));

      return new HttpResponse(null, { status: 204 });
    })
  );

  return calls;
}

async function openSavedMeals() {
  await seedSession();
  const rendered = await renderApp();
  await waitForHome();

  await rendered.user.press(screen.getByRole('button', { name: 'Cadastrar refeição salva' }));
  await screen.findByRole('header', { name: 'Refeições salvas' });

  return rendered;
}

describe('SavedMeals', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2026, 8, 26, 10), advanceTimers: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should register a saved meal with one tap and go back to the home', async () => {
    const calls = mockSavedMealsApi([buildSavedMeal()]);
    const { user } = await openSavedMeals();

    expect(await screen.findByText('Pão francês, Café com leite')).toBeOnTheScreen();
    expect(screen.getByText('Horário · 10:00')).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: /Café da manhã de sempre/ }));

    await waitForHome();
    expect(await screen.findByText('Café da manhã de sempre')).toBeOnTheScreen();
    expect(calls.created).toEqual([
      { savedMealId: 'saved-1', body: { date: '2026-09-26', time: '10:00' } }
    ]);
  });

  it('should explain how to save a meal when none is saved', async () => {
    mockSavedMealsApi([]);
    await openSavedMeals();

    expect(await screen.findByText('Nenhuma refeição salva')).toBeOnTheScreen();
    expect(screen.queryByText(/Horário ·/)).not.toBeOnTheScreen();
  });

  it('should stay on the list when the meal cannot be registered', async () => {
    const { alertSpy } = spyOnAlert();
    mockSavedMealsApi([buildSavedMeal()]);
    server.use(
      http.post(apiUrl('/saved-meals/:savedMealId/meal'), () =>
        HttpResponse.json(
          { error: { code: 'SAVED_MEAL_NOT_FOUND', message: 'Saved meal not found.' } },
          { status: 404 }
        )
      )
    );
    const { user } = await openSavedMeals();

    await user.press(await screen.findByRole('button', { name: /Café da manhã de sempre/ }));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Não foi possível cadastrar a refeição',
        'Refeição salva não encontrada.'
      )
    );
    expect(screen.getByRole('header', { name: 'Refeições salvas' })).toBeOnTheScreen();
  });

  it('should delete a saved meal from the swipe action', async () => {
    const calls = mockSavedMealsApi([buildSavedMeal()]);
    const { user } = await openSavedMeals();

    await screen.findByText('Pão francês, Café com leite');
    await user.press(screen.getByRole('button', { name: 'Excluir refeição salva' }));
    await screen.findByRole('header', { name: 'Excluir refeição salva?' });
    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    expect(await screen.findByText('Nenhuma refeição salva')).toBeOnTheScreen();
    expect(calls.deletedIds).toEqual(['saved-1']);
  });

  it('should treat a saved meal that no longer exists as deleted', async () => {
    mockSavedMealsApi([buildSavedMeal()]);
    server.use(
      http.delete(apiUrl('/saved-meals/:savedMealId'), () =>
        HttpResponse.json(
          { error: { code: 'SAVED_MEAL_NOT_FOUND', message: 'Saved meal not found.' } },
          { status: 404 }
        )
      )
    );
    const { user } = await openSavedMeals();

    await screen.findByText('Pão francês, Café com leite');
    await user.press(screen.getByRole('button', { name: 'Excluir refeição salva' }));
    await screen.findByRole('header', { name: 'Excluir refeição salva?' });
    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    expect(await screen.findByText('Nenhuma refeição salva')).toBeOnTheScreen();
  });

  it('should keep the saved meal when the deletion fails or is canceled', async () => {
    mockSavedMealsApi([buildSavedMeal()]);
    server.use(http.delete(apiUrl('/saved-meals/:savedMealId'), () => HttpResponse.error()));
    const { user } = await openSavedMeals();

    await screen.findByText('Pão francês, Café com leite');
    await user.press(screen.getByRole('button', { name: 'Excluir refeição salva' }));
    await screen.findByRole('header', { name: 'Excluir refeição salva?' });
    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    expect(
      await screen.findByText('Não foi possível falar com o servidor. Verifique sua conexão.')
    ).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.queryByRole('header', { name: 'Excluir refeição salva?' })).not.toBeOnTheScreen();
    expect(screen.getByText('Pão francês, Café com leite')).toBeOnTheScreen();
  });

  it('should register the saved meal at the time chosen by the user', async () => {
    const calls = mockSavedMealsApi([buildSavedMeal()]);
    const { user } = await openSavedMeals();

    await user.press(await screen.findByRole('button', { name: 'Horário da refeição: 10:00' }));
    await screen.findByRole('header', { name: 'Horário da refeição' });
    await pickDateTime(new Date(2026, 8, 26, 7, 45));
    await user.press(screen.getByRole('button', { name: 'Confirmar' }));
    await user.press(await screen.findByRole('button', { name: /Café da manhã de sempre/ }));

    await waitForHome();
    expect(calls.created).toEqual([
      { savedMealId: 'saved-1', body: { date: '2026-09-26', time: '07:45' } }
    ]);
  });

  it('should retry when the saved meals cannot be loaded', async () => {
    let shouldFail = true;
    mockSavedMealsApi([buildSavedMeal()]);
    server.use(
      http.get(apiUrl('/saved-meals'), () =>
        shouldFail ? HttpResponse.error() : HttpResponse.json({ savedMeals: [buildSavedMeal()] })
      )
    );
    const { user } = await openSavedMeals();

    expect(
      await screen.findByText('Não conseguimos carregar suas refeições salvas')
    ).toBeOnTheScreen();

    shouldFail = false;
    await user.press(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(await screen.findByText('Pão francês, Café com leite')).toBeOnTheScreen();
  });
});
