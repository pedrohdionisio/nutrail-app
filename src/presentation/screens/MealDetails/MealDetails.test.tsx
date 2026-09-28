import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildMeal, buildMealDetails, buildMealsOfDay } from 'tests/fixtures/meal';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

async function openMealFromHome() {
  server.use(
    http.get(apiUrl('/meals'), ({ request }) =>
      HttpResponse.json(
        buildMealsOfDay(new URL(request.url).searchParams.get('date') ?? '', [buildMeal()])
      )
    )
  );
  await seedSession();
  const rendered = await renderApp();
  await waitForHome();

  await rendered.user.press(screen.getByRole('button', { name: /Pão, manteiga e café/ }));

  return rendered;
}

describe('MealDetails', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2026, 8, 26, 10), advanceTimers: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should show the skeleton and then the meal opened from the list', async () => {
    let releaseMeal = () => {};
    const requestedIds: string[] = [];
    server.use(
      http.get(apiUrl('/meals/:mealId'), async ({ params }) => {
        requestedIds.push(String(params.mealId));
        await new Promise<void>((resolve) => {
          releaseMeal = resolve;
        });

        return HttpResponse.json(buildMealDetails());
      })
    );
    await openMealFromHome();

    expect(await screen.findByLabelText('Carregando refeição')).toBeOnTheScreen();
    expect(screen.getByText('Macros Totais')).toBeOnTheScreen();

    releaseMeal();

    expect(await screen.findByRole('header', { name: 'Almoço Fitness' })).toBeOnTheScreen();
    expect(screen.getByText('630kcal')).toBeOnTheScreen();
    expect(screen.getByText('56g (49%)')).toBeOnTheScreen();
    expect(screen.getAllByText('29g (25%)')).toHaveLength(2);
    expect(screen.getByText('120g Arroz')).toBeOnTheScreen();
    expect(screen.getByText('2 unidades Ovos')).toBeOnTheScreen();
    expect(screen.getByText('150g Frango')).toBeOnTheScreen();
    expect(screen.getByLabelText('Foto da refeição')).toBeOnTheScreen();
    expect(screen.queryByLabelText('Carregando refeição')).not.toBeOnTheScreen();
    expect(requestedIds).toEqual(['meal-1']);
  });

  it('should retry after failing to load the meal', async () => {
    let shouldFail = true;
    server.use(
      http.get(apiUrl('/meals/:mealId'), () =>
        shouldFail
          ? HttpResponse.json(
              { error: { code: 'MEAL_NOT_FOUND', message: 'Meal not found.' } },
              { status: 404 }
            )
          : HttpResponse.json(buildMealDetails({ pictureUrl: null }))
      )
    );
    const { user } = await openMealFromHome();

    expect(await screen.findByText('Refeição não encontrada.')).toBeOnTheScreen();

    shouldFail = false;
    await user.press(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(await screen.findByRole('header', { name: 'Almoço Fitness' })).toBeOnTheScreen();
    expect(screen.queryByLabelText('Foto da refeição')).not.toBeOnTheScreen();
  });

  it('should go back to the home', async () => {
    server.use(http.get(apiUrl('/meals/:mealId'), () => HttpResponse.json(buildMealDetails())));
    const { user } = await openMealFromHome();

    await screen.findByRole('header', { name: 'Almoço Fitness' });
    await user.press(screen.getByRole('button', { name: 'Voltar' }));

    await waitForHome();
  });

  it('should delete the meal from the trash button and go back to the home', async () => {
    const deletedIds: string[] = [];
    let meals = [buildMeal()];
    server.use(
      http.get(apiUrl('/meals'), ({ request }) =>
        HttpResponse.json(
          buildMealsOfDay(new URL(request.url).searchParams.get('date') ?? '', meals)
        )
      ),
      http.get(apiUrl('/meals/:mealId'), () => HttpResponse.json(buildMealDetails())),
      http.delete(apiUrl('/meals/:mealId'), ({ params }) => {
        deletedIds.push(String(params.mealId));
        meals = [];

        return new HttpResponse(null, { status: 204 });
      })
    );
    await seedSession();
    const { user } = await renderApp();
    await waitForHome();
    await user.press(screen.getByRole('button', { name: /Pão, manteiga e café/ }));
    await screen.findByRole('header', { name: 'Almoço Fitness' });

    await user.press(screen.getByRole('button', { name: 'Excluir refeição' }));
    await screen.findByRole('header', { name: 'Excluir refeição?' });
    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    await waitForHome();
    expect(screen.queryByText('Pão, manteiga e café')).not.toBeOnTheScreen();
    expect(deletedIds).toEqual(['meal-1']);
  });

  it('should treat a meal that no longer exists as deleted', async () => {
    server.use(
      http.get(apiUrl('/meals/:mealId'), () => HttpResponse.json(buildMealDetails())),
      http.delete(apiUrl('/meals/:mealId'), () =>
        HttpResponse.json(
          { error: { code: 'MEAL_NOT_FOUND', message: 'Meal not found.' } },
          { status: 404 }
        )
      )
    );
    const { user } = await openMealFromHome();
    await screen.findByRole('header', { name: 'Almoço Fitness' });

    await user.press(screen.getByRole('button', { name: 'Excluir refeição' }));
    await screen.findByRole('header', { name: 'Excluir refeição?' });
    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    await waitForHome();
  });
});
