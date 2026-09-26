import { screen, waitFor } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import type { IMealSummary } from 'shared/entities/IMealSummary';
import { apiUrl } from 'tests/apiUrl';
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
});
