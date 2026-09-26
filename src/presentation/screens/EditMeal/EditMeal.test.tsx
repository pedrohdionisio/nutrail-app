import { screen, waitFor } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildMeal, buildMealDetails, buildMealsOfDay } from 'tests/fixtures/meal';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

const BANANA = {
  name: 'Banana',
  quantity: 1,
  unit: 'unidade',
  calories: 89,
  protein: 1.1,
  carbohydrate: 23,
  fat: 0.3
};

interface IMockEditMealApiParams {
  analysisResponse?: () => Response;
  updateResponse?: () => Response;
}

function mockEditMealApi({
  analysisResponse = () => HttpResponse.json({ items: [BANANA] }),
  updateResponse
}: IMockEditMealApiParams = {}) {
  const calls = { analyzed: [] as unknown[], updated: [] as unknown[] };

  server.use(
    http.get(apiUrl('/meals'), ({ request }) =>
      HttpResponse.json(
        buildMealsOfDay(new URL(request.url).searchParams.get('date') ?? '', [buildMeal()])
      )
    ),
    http.get(apiUrl('/meals/:mealId'), () => HttpResponse.json(buildMealDetails())),
    http.post(apiUrl('/meals/items/analysis'), async ({ request }) => {
      calls.analyzed.push(await request.json());

      return analysisResponse();
    }),
    http.put(apiUrl('/meals/:mealId'), async ({ request }) => {
      const body = (await request.json()) as { name: string; items: unknown[] };
      calls.updated.push(body);

      if (updateResponse) {
        return updateResponse();
      }

      return HttpResponse.json({
        ...body,
        calories: 401,
        protein: 17.1,
        carbohydrate: 91,
        fat: 18.3
      });
    })
  );

  return calls;
}

async function openEditMeal() {
  await seedSession();
  const rendered = await renderApp();
  await waitForHome();

  await rendered.user.press(screen.getByRole('button', { name: /Pão, manteiga e café/ }));
  await screen.findByRole('header', { name: 'Almoço Fitness' });
  await rendered.user.press(screen.getByRole('button', { name: 'Editar refeição' }));
  await screen.findByRole('header', { name: 'Editar refeição' });

  return rendered;
}

describe('EditMeal', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2026, 8, 26, 10), advanceTimers: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fix quantities, remove and add items, and show the updated meal', async () => {
    const calls = mockEditMealApi();
    const { user } = await openEditMeal();

    expect(screen.getByDisplayValue('Almoço Fitness')).toBeOnTheScreen();

    const rice = screen.getByLabelText('Arroz');
    await user.clear(rice);
    await user.type(rice, '240');
    await user.press(screen.getByRole('button', { name: 'Remover Ovos' }));
    await user.type(screen.getByLabelText('Adicionar alimento'), '1 banana');
    await user.press(screen.getByRole('button', { name: 'Adicionar' }));
    expect(await screen.findByLabelText('Banana')).toBeOnTheScreen();

    const name = screen.getByLabelText('Nome da refeição');
    await user.clear(name);
    await user.type(name, 'Almoço');
    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    expect(await screen.findByRole('header', { name: 'Almoço' })).toBeOnTheScreen();
    expect(screen.getByText('401kcal')).toBeOnTheScreen();
    expect(screen.getByText('240g Arroz')).toBeOnTheScreen();
    expect(screen.getByText('1 unidade Banana')).toBeOnTheScreen();
    expect(screen.queryByText('2 unidades Ovos')).not.toBeOnTheScreen();
    expect(calls.analyzed).toEqual([{ text: '1 banana' }]);
    expect(calls.updated).toEqual([
      {
        name: 'Almoço',
        items: [
          {
            name: 'Arroz',
            unit: 'g',
            quantity: 240,
            calories: 312,
            protein: 6,
            carbohydrate: 68,
            fat: 0
          },
          {
            name: 'Frango',
            unit: 'g',
            quantity: 150,
            calories: 319,
            protein: 13,
            carbohydrate: 21,
            fat: 18
          },
          BANANA
        ]
      }
    ]);
  });

  it('should not save a meal without items', async () => {
    const calls = mockEditMealApi();
    const { user } = await openEditMeal();

    await user.press(screen.getByRole('button', { name: 'Remover Arroz' }));
    await user.press(screen.getByRole('button', { name: 'Remover Ovos' }));
    await user.press(screen.getByRole('button', { name: 'Remover Frango' }));

    expect(
      screen.getByText('Adicione pelo menos um alimento para salvar a refeição.')
    ).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
    expect(calls.updated).toEqual([]);
  });

  it('should refuse an invalid quantity before sending', async () => {
    const calls = mockEditMealApi();
    const { user } = await openEditMeal();

    await user.clear(screen.getByLabelText('Arroz'));
    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    expect(await screen.findByText('Informe uma quantidade válida')).toBeOnTheScreen();
    expect(calls.updated).toEqual([]);
  });

  it('should show the error when the new food is not recognized', async () => {
    mockEditMealApi({
      analysisResponse: () =>
        HttpResponse.json(
          { error: { code: 'MEAL_WITHOUT_ITEMS', message: 'No items.' } },
          { status: 422 }
        )
    });
    const { user } = await openEditMeal();

    await user.type(screen.getByLabelText('Adicionar alimento'), 'uma cadeira');
    await user.press(screen.getByRole('button', { name: 'Adicionar' }));

    expect(
      await screen.findByText('Nenhum alimento foi identificado na refeição.')
    ).toBeOnTheScreen();
    expect(screen.getByDisplayValue('uma cadeira')).toBeOnTheScreen();
  });

  it('should keep the form with the error when saving fails', async () => {
    mockEditMealApi({ updateResponse: () => HttpResponse.error() });
    const { user } = await openEditMeal();

    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    expect(
      await screen.findByText('Não foi possível falar com o servidor. Verifique sua conexão.')
    ).toBeOnTheScreen();
    await waitFor(() =>
      expect(screen.getByRole('header', { name: 'Editar refeição' })).toBeOnTheScreen()
    );
  });

  it('should discard the changes when canceled', async () => {
    const calls = mockEditMealApi();
    const { user } = await openEditMeal();

    await user.press(screen.getByRole('button', { name: 'Remover Ovos' }));
    await user.press(screen.getByRole('button', { name: 'Cancelar' }));

    expect(await screen.findByText('2 unidades Ovos')).toBeOnTheScreen();
    expect(calls.updated).toEqual([]);
  });
});
