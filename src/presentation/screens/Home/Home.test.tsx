import { act, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import type { IMealSummary } from 'shared/entities/IMealSummary';
import { apiUrl } from 'tests/apiUrl';
import { pickDateTime } from 'tests/dateTimePicker';
import { buildMe } from 'tests/fixtures/me';
import { buildMeal, buildMealsOfDay } from 'tests/fixtures/meal';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

function mockMealsByDate(mealsByDate: Record<string, IMealSummary[]>) {
  const requestedDates: string[] = [];

  server.use(
    http.get(apiUrl('/meals'), ({ request }) => {
      const date = new URL(request.url).searchParams.get('date') ?? '';
      requestedDates.push(date);

      return HttpResponse.json(buildMealsOfDay(date, mealsByDate[date]));
    })
  );

  return requestedDates;
}

describe('Home', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2026, 8, 26, 10), advanceTimers: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should keep the splash until the user and the day are loaded', async () => {
    let releaseMeals = () => {};
    let hasRespondedMe = false;
    server.use(
      http.get(apiUrl('/me'), () => {
        hasRespondedMe = true;

        return HttpResponse.json(buildMe());
      }),
      http.get(apiUrl('/meals'), async () => {
        await new Promise<void>((resolve) => {
          releaseMeals = resolve;
        });

        return HttpResponse.json(buildMealsOfDay('2026-09-26', [buildMeal()]));
      })
    );
    await seedSession();
    await renderApp();

    await waitFor(() => expect(hasRespondedMe).toBe(true));
    expect(screen.getByLabelText('Carregando')).toBeOnTheScreen();
    expect(screen.queryByText('Refeições')).not.toBeOnTheScreen();

    releaseMeals();

    await waitForHome();
    expect(screen.getByText('1790 kcal restantes')).toBeOnTheScreen();
    expect(screen.getByText('Pão, manteiga e café')).toBeOnTheScreen();
    expect(screen.queryByLabelText('Carregando refeições')).not.toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Cadastrar refeição' })).toBeOnTheScreen();
  });

  it('should show the user and an empty day', async () => {
    await seedSession();
    await renderApp();

    await waitForHome();
    expect(screen.getByText('Ana')).toBeOnTheScreen();
    expect(screen.getByText('AS', { includeHiddenElements: true })).toBeOnTheScreen();
    expect(screen.getByText('Hoje, 26 de setembro')).toBeOnTheScreen();
    expect(screen.getByText('2000 kcal restantes')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Cadastrar refeição por áudio' })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Cadastrar refeição por foto' })).toBeOnTheScreen();
    expect(
      screen.getByRole('button', { name: 'Cadastrar refeição manualmente' })
    ).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Cadastrar refeição salva' })).toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: 'Cadastrar refeição' })).not.toBeOnTheScreen();
  });

  it('should load the meals of each day without going past today', async () => {
    const requestedDates = mockMealsByDate({
      '2026-09-25': [buildMeal({ id: 'meal-2', name: 'Arroz, feijão e frango', calories: 650 })]
    });
    await seedSession();
    const { user } = await renderApp();
    await waitForHome();

    const nextDay = screen.getByRole('button', { name: 'Próximo dia' });
    expect(nextDay).toBeDisabled();

    await user.press(screen.getByRole('button', { name: 'Dia anterior' }));
    expect(screen.getByText('Ontem, 25 de setembro')).toBeOnTheScreen();
    expect(await screen.findByText('Arroz, feijão e frango')).toBeOnTheScreen();
    expect(screen.getByText('1350 kcal restantes')).toBeOnTheScreen();

    await user.press(nextDay);
    expect(screen.getByText('Hoje, 26 de setembro')).toBeOnTheScreen();
    expect(screen.getByText('2000 kcal restantes')).toBeOnTheScreen();
    expect(nextDay).toBeDisabled();
    expect(requestedDates).toEqual(['2026-09-26', '2026-09-25']);
  });

  it('should jump to the day picked in the calendar', async () => {
    const requestedDates = mockMealsByDate({
      '2026-09-12': [buildMeal({ id: 'meal-3', name: 'Tapioca com queijo', calories: 320 })]
    });
    await seedSession();
    const { user } = await renderApp();
    await waitForHome();

    await user.press(screen.getByRole('button', { name: 'Escolher dia: Hoje, 26 de setembro' }));
    await screen.findByRole('header', { name: 'Escolher dia' });
    await pickDateTime(new Date(2026, 8, 12));
    await user.press(screen.getByRole('button', { name: 'Confirmar' }));

    expect(await screen.findByText('Tapioca com queijo')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Próximo dia' })).toBeEnabled();
    expect(requestedDates).toEqual(['2026-09-26', '2026-09-12']);
  });

  it('should offer a retry when the meals fail to load', async () => {
    let attempts = 0;
    server.use(
      http.get(apiUrl('/meals'), () => {
        attempts += 1;

        return attempts === 1
          ? new HttpResponse(null, { status: 500 })
          : HttpResponse.json(buildMealsOfDay('2026-09-26', [buildMeal()]));
      })
    );
    await seedSession();
    const { user } = await renderApp();

    await screen.findByText('Não conseguimos carregar suas refeições');
    expect(screen.getByText('Ana')).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(await screen.findByText('Pão, manteiga e café')).toBeOnTheScreen();
  });

  it('should reload the day when the list is pulled down', async () => {
    let attempts = 0;
    server.use(
      http.get(apiUrl('/meals'), () => {
        attempts += 1;

        return HttpResponse.json(
          buildMealsOfDay('2026-09-26', attempts === 1 ? [] : [buildMeal()])
        );
      })
    );
    await seedSession();
    await renderApp();

    await waitForHome();
    expect(screen.queryByText('Pão, manteiga e café')).not.toBeOnTheScreen();

    await fireEvent(screen.getByTestId('meals-list'), 'refresh');

    expect(await screen.findByText('Pão, manteiga e café')).toBeOnTheScreen();
  });

  it('should offer a retry when the user fails to load', async () => {
    let attempts = 0;
    server.use(
      http.get(apiUrl('/me'), () => {
        attempts += 1;

        return attempts === 1
          ? new HttpResponse(null, { status: 500 })
          : HttpResponse.json(buildMe());
      })
    );
    await seedSession();
    const { user } = await renderApp();

    await screen.findByText('Não conseguimos carregar seus dados');
    await user.press(screen.getByRole('button', { name: 'Tentar de novo' }));

    await waitForHome();
  });

  it('should delete a meal from the swipe action after confirming', async () => {
    const deletedIds: string[] = [];
    let meals = [buildMeal()];
    server.use(
      http.get(apiUrl('/meals'), () => HttpResponse.json(buildMealsOfDay('2026-09-26', meals))),
      http.delete(apiUrl('/meals/:mealId'), ({ params }) => {
        deletedIds.push(String(params.mealId));
        meals = [];

        return new HttpResponse(null, { status: 204 });
      })
    );
    await seedSession();
    const { user } = await renderApp();
    await screen.findByText('Pão, manteiga e café');

    await user.press(screen.getByRole('button', { name: 'Excluir refeição' }));
    expect(await screen.findByRole('header', { name: 'Excluir refeição?' })).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    await waitFor(() => expect(screen.queryByText('Pão, manteiga e café')).not.toBeOnTheScreen());
    expect(screen.queryByRole('header', { name: 'Excluir refeição?' })).not.toBeOnTheScreen();
    expect(deletedIds).toEqual(['meal-1']);
  });

  it('should keep the meal when the deletion is canceled', async () => {
    const deletedIds: string[] = [];
    mockMealsByDate({ '2026-09-26': [buildMeal()] });
    server.use(
      http.delete(apiUrl('/meals/:mealId'), ({ params }) => {
        deletedIds.push(String(params.mealId));

        return new HttpResponse(null, { status: 204 });
      })
    );
    await seedSession();
    const { user } = await renderApp();
    await screen.findByText('Pão, manteiga e café');

    await user.press(screen.getByRole('button', { name: 'Excluir refeição' }));
    await screen.findByRole('header', { name: 'Excluir refeição?' });
    await user.press(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.queryByRole('header', { name: 'Excluir refeição?' })).not.toBeOnTheScreen();
    expect(screen.getByText('Pão, manteiga e café')).toBeOnTheScreen();
    expect(deletedIds).toEqual([]);
  });

  it('should keep the sheet open with the error when the deletion fails', async () => {
    mockMealsByDate({ '2026-09-26': [buildMeal()] });
    server.use(http.delete(apiUrl('/meals/:mealId'), () => HttpResponse.error()));
    await seedSession();
    const { user } = await renderApp();
    await screen.findByText('Pão, manteiga e café');

    await user.press(screen.getByRole('button', { name: 'Excluir refeição' }));
    await screen.findByRole('header', { name: 'Excluir refeição?' });
    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    expect(
      await screen.findByText('Não foi possível falar com o servidor. Verifique sua conexão.')
    ).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'Excluir refeição?' })).toBeOnTheScreen();
    expect(screen.getByText('Pão, manteiga e café')).toBeOnTheScreen();
  });

  it('should show a meal being analyzed and refresh it until it is ready', async () => {
    let requests = 0;
    server.use(
      http.get(apiUrl('/meals'), ({ request }) => {
        requests += 1;
        const date = new URL(request.url).searchParams.get('date') ?? '';
        const meal =
          requests === 1
            ? buildMeal({ id: 'meal-7', name: null, status: 'PROCESSING', calories: 0 })
            : buildMeal({ id: 'meal-7', name: 'Omelete', calories: 320 });

        return HttpResponse.json(buildMealsOfDay(date, [meal]));
      })
    );
    await seedSession();
    await renderApp();
    await waitForHome();

    expect(await screen.findByText('Analisando refeição')).toBeOnTheScreen();

    await act(() => jest.advanceTimersByTimeAsync(3000));

    expect(await screen.findByText('Omelete')).toBeOnTheScreen();
    expect(screen.queryByText('Analisando refeição')).not.toBeOnTheScreen();
  });

  it('should reprocess a failed meal from its card', async () => {
    const reprocessed: string[] = [];
    let status: IMealSummary['status'] = 'FAILED';
    server.use(
      http.get(apiUrl('/meals'), ({ request }) =>
        HttpResponse.json(
          buildMealsOfDay(new URL(request.url).searchParams.get('date') ?? '', [
            buildMeal({ id: 'meal-8', name: null, status, calories: 0 })
          ])
        )
      ),
      http.post(apiUrl('/meals/:mealId/reprocess'), ({ params }) => {
        reprocessed.push(String(params.mealId));
        status = 'QUEUED';

        return HttpResponse.json({ id: params.mealId, status: 'QUEUED' }, { status: 202 });
      })
    );
    await seedSession();
    const { user } = await renderApp();
    await waitForHome();

    expect(await screen.findByText('Refeição não analisada')).toBeOnTheScreen();
    await user.press(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(await screen.findByText('Analisando refeição')).toBeOnTheScreen();
    expect(reprocessed).toEqual(['meal-8']);
  });
});
