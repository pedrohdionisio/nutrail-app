import { screen, waitFor } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import type { IRecipe } from 'shared/entities/IRecipe';
import { spyOnAlert } from 'tests/support/alert';
import { apiUrl } from 'tests/support/apiUrl';
import { buildRecipe } from 'tests/support/fixtures/recipe';
import { renderApp, seedSession } from 'tests/support/render';
import { waitForHome } from 'tests/support/screens';
import { server } from 'tests/support/server';

function mockRecipesApi(recipes: IRecipe[]) {
  const calls = { lists: 0, deletedIds: [] as string[] };

  server.use(
    http.get(apiUrl('/recipes'), () => {
      calls.lists += 1;

      return HttpResponse.json({ recipes });
    }),
    http.delete(apiUrl('/recipes/:recipeId'), ({ params }) => {
      calls.deletedIds.push(String(params.recipeId));

      return new HttpResponse(null, { status: 204 });
    })
  );

  return calls;
}

async function openRecipes() {
  await seedSession();
  const rendered = await renderApp();
  await waitForHome();

  await rendered.user.press(screen.getByRole('button', { name: 'Receitas' }));
  await screen.findByRole('header', { name: 'Receitas' });

  return rendered;
}

describe('Recipes', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should list the saved recipes with their macros', async () => {
    mockRecipesApi([
      buildRecipe({ id: 'recipe-2', name: 'Panqueca de banana', calories: 310 }),
      buildRecipe()
    ]);
    await openRecipes();

    expect(await screen.findByText('Panqueca de banana')).toBeOnTheScreen();
    expect(screen.getByText('Omelete de queijo com tomate')).toBeOnTheScreen();
    expect(screen.getByText('310')).toBeOnTheScreen();
  });

  it('should explain how to get a recipe when none is saved', async () => {
    mockRecipesApi([]);
    await openRecipes();

    expect(await screen.findByText('Nenhuma receita salva')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Sugerir receita' })).toBeOnTheScreen();
  });

  it('should retry when the recipes cannot be loaded', async () => {
    server.use(http.get(apiUrl('/recipes'), () => HttpResponse.error()));
    const { user } = await openRecipes();

    expect(await screen.findByText('Não conseguimos carregar suas receitas')).toBeOnTheScreen();

    mockRecipesApi([buildRecipe()]);
    await user.press(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(await screen.findByText('Omelete de queijo com tomate')).toBeOnTheScreen();
  });

  it('should open a recipe with its ingredients and steps', async () => {
    mockRecipesApi([buildRecipe()]);
    const { user } = await openRecipes();

    await user.press(await screen.findByRole('button', { name: /Omelete de queijo com tomate/ }));

    expect(
      await screen.findByRole('header', { name: 'Omelete de queijo com tomate' })
    ).toBeOnTheScreen();
    expect(screen.getByText('420kcal')).toBeOnTheScreen();
    expect(screen.getByText('3 unidades Ovo')).toBeOnTheScreen();
    expect(screen.getByText('40g Queijo mussarela')).toBeOnTheScreen();
    expect(screen.getByText('2. Junte o queijo e o tomate picado.')).toBeOnTheScreen();
  });

  it('should delete a recipe and go back to the list', async () => {
    const calls = mockRecipesApi([buildRecipe()]);
    const { user } = await openRecipes();

    await user.press(await screen.findByRole('button', { name: /Omelete de queijo com tomate/ }));
    await screen.findByRole('header', { name: 'Omelete de queijo com tomate' });

    await user.press(screen.getByRole('button', { name: 'Excluir receita' }));
    await screen.findByRole('header', { name: 'Excluir receita?' });
    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    expect(await screen.findByText('Nenhuma receita salva')).toBeOnTheScreen();
    expect(calls.deletedIds).toEqual(['recipe-1']);
    expect(calls.lists).toBe(1);
  });

  it('should register a recipe as a meal', async () => {
    jest.useFakeTimers({ now: new Date(2026, 8, 26, 13), advanceTimers: true });
    const { alertSpy } = spyOnAlert();
    const logged: { recipeId: string; body: unknown }[] = [];
    mockRecipesApi([buildRecipe()]);
    server.use(
      http.post(apiUrl('/recipes/:recipeId/meal'), async ({ params, request }) => {
        logged.push({ recipeId: String(params.recipeId), body: await request.json() });

        return HttpResponse.json({ id: 'meal-2' }, { status: 201 });
      })
    );
    const { user } = await openRecipes();

    await user.press(await screen.findByRole('button', { name: /Omelete de queijo com tomate/ }));
    await screen.findByRole('header', { name: 'Omelete de queijo com tomate' });

    await user.press(screen.getByRole('button', { name: 'Registrar como refeição' }));
    await screen.findByRole('header', { name: 'Registrar como refeição' });

    expect(screen.getByLabelText('Data')).toHaveDisplayValue('26/09/2026');
    expect(screen.getByLabelText('Horário')).toHaveDisplayValue('13:00');

    await user.press(screen.getByRole('button', { name: 'Registrar refeição' }));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Refeição registrada',
        'A receita já aparece no dia escolhido.'
      )
    );
    expect(logged).toEqual([{ recipeId: 'recipe-1', body: { date: '2026-09-26', time: '13:00' } }]);
  });

  it('should treat a recipe that no longer exists as deleted', async () => {
    mockRecipesApi([buildRecipe()]);
    server.use(
      http.delete(apiUrl('/recipes/:recipeId'), () =>
        HttpResponse.json(
          { error: { code: 'RECIPE_NOT_FOUND', message: 'Recipe not found.' } },
          { status: 404 }
        )
      )
    );
    const { user } = await openRecipes();

    await user.press(await screen.findByRole('button', { name: /Omelete de queijo com tomate/ }));
    await user.press(await screen.findByRole('button', { name: 'Excluir receita' }));
    await screen.findByRole('header', { name: 'Excluir receita?' });
    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    expect(await screen.findByText('Nenhuma receita salva')).toBeOnTheScreen();
  });

  it('should keep the sheet open with the error when the recipe cannot be deleted', async () => {
    mockRecipesApi([buildRecipe()]);
    server.use(http.delete(apiUrl('/recipes/:recipeId'), () => HttpResponse.error()));
    const { user } = await openRecipes();

    await user.press(await screen.findByRole('button', { name: /Omelete de queijo com tomate/ }));
    await user.press(await screen.findByRole('button', { name: 'Excluir receita' }));
    await screen.findByRole('header', { name: 'Excluir receita?' });
    await user.press(screen.getByRole('button', { name: 'Excluir' }));

    expect(
      await screen.findByText('Não foi possível falar com o servidor. Verifique sua conexão.')
    ).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'Excluir receita?' })).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Cancelar' }));

    expect(
      await screen.findByRole('header', { name: 'Omelete de queijo com tomate' })
    ).toBeOnTheScreen();
    expect(screen.queryByRole('header', { name: 'Excluir receita?' })).not.toBeOnTheScreen();
  });

  it('should refuse registering the recipe at a future time', async () => {
    jest.useFakeTimers({ now: new Date(2026, 8, 26, 13), advanceTimers: true });
    const logged: unknown[] = [];
    mockRecipesApi([buildRecipe()]);
    server.use(
      http.post(apiUrl('/recipes/:recipeId/meal'), async ({ request }) => {
        logged.push(await request.json());

        return HttpResponse.json({ id: 'meal-2' }, { status: 201 });
      })
    );
    const { user } = await openRecipes();

    await user.press(await screen.findByRole('button', { name: /Omelete de queijo com tomate/ }));
    await user.press(await screen.findByRole('button', { name: 'Registrar como refeição' }));
    const time = await screen.findByLabelText('Horário');
    await user.clear(time);
    await user.type(time, '1500');
    await user.press(screen.getByRole('button', { name: 'Registrar refeição' }));

    expect(await screen.findByText('O horário não pode estar no futuro')).toBeOnTheScreen();
    expect(logged).toEqual([]);
  });

  it('should show the error when the recipe cannot be registered', async () => {
    mockRecipesApi([buildRecipe()]);
    server.use(
      http.post(apiUrl('/recipes/:recipeId/meal'), () =>
        HttpResponse.json(
          { error: { code: 'RECIPE_NOT_FOUND', message: 'Recipe not found.' } },
          { status: 404 }
        )
      )
    );
    const { user } = await openRecipes();

    await user.press(await screen.findByRole('button', { name: /Omelete de queijo com tomate/ }));
    await user.press(await screen.findByRole('button', { name: 'Registrar como refeição' }));
    await screen.findByRole('header', { name: 'Registrar como refeição' });
    await user.press(screen.getByRole('button', { name: 'Registrar refeição' }));

    expect(await screen.findByText('Receita não encontrada.')).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'Registrar como refeição' })).toBeOnTheScreen();
  });
});
