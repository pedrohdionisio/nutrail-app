import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import type { IRecipe } from 'shared/entities/IRecipe';
import { apiUrl } from 'tests/apiUrl';
import { buildRecipe } from 'tests/fixtures/recipe';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

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
});
