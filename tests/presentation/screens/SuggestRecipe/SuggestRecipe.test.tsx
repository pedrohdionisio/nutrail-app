import { screen, waitFor } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import type { IRecipe } from 'shared/entities/IRecipe';
import type { IRecipeContent } from 'shared/entities/IRecipeContent';
import { spyOnAlert } from 'tests/support/alert';
import { apiUrl } from 'tests/support/apiUrl';
import { buildRecipe, buildRecipeContent } from 'tests/support/fixtures/recipe';
import { renderApp, seedSession } from 'tests/support/render';
import { waitForHome } from 'tests/support/screens';
import { server } from 'tests/support/server';

const SUGGESTION = buildRecipeContent();

interface IMockSuggestionApiParams {
  suggestions?: (() => Response)[];
}

function mockSuggestionApi({
  suggestions = [() => HttpResponse.json({ recipe: SUGGESTION })]
}: IMockSuggestionApiParams = {}) {
  const calls = { suggested: [] as unknown[], saved: [] as unknown[] };
  let recipes: IRecipe[] = [];

  server.use(
    http.get(apiUrl('/recipes'), () => HttpResponse.json({ recipes })),
    http.post(apiUrl('/recipes/suggestions'), async ({ request }) => {
      calls.suggested.push(await request.json());
      const respond = suggestions[Math.min(calls.suggested.length, suggestions.length) - 1];

      return respond ? respond() : HttpResponse.error();
    }),
    http.post<never, IRecipeContent>(apiUrl('/recipes'), async ({ request }) => {
      const body = await request.json();
      calls.saved.push(body);
      const recipe = buildRecipe({ ...body, id: 'recipe-9' });
      recipes = [recipe, ...recipes];

      return HttpResponse.json(recipe, { status: 201 });
    })
  );

  return calls;
}

async function openSuggestRecipe() {
  await seedSession();
  const rendered = await renderApp();
  await waitForHome();

  await rendered.user.press(screen.getByRole('button', { name: 'Receitas' }));
  await rendered.user.press(await screen.findByRole('button', { name: 'Sugerir receita' }));
  await screen.findByRole('header', { name: 'Sugerir receita' });

  return rendered;
}

describe('SuggestRecipe', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2026, 8, 26, 22, 30), advanceTimers: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should suggest a recipe from what the user has at home and save it', async () => {
    const calls = mockSuggestionApi();
    const { user } = await openSuggestRecipe();

    expect(screen.getByRole('button', { name: 'Sugerir receita' })).toBeDisabled();

    await user.type(screen.getByLabelText('O que você tem em casa?'), '5 ovos, queijo e 1 tomate');
    await user.press(screen.getByRole('button', { name: 'Sugerir receita' }));

    expect(
      await screen.findByRole('header', { name: 'Omelete de queijo com tomate' })
    ).toBeOnTheScreen();
    expect(screen.getByText('3 unidades Ovo')).toBeOnTheScreen();
    expect(calls.suggested).toEqual([{ date: '2026-09-26', text: '5 ovos, queijo e 1 tomate' }]);

    await user.press(screen.getByRole('button', { name: 'Salvar receita' }));

    await screen.findByRole('header', { name: 'Receitas' });
    expect(await screen.findByText('Omelete de queijo com tomate')).toBeOnTheScreen();
    expect(calls.saved).toEqual([SUGGESTION]);
  });

  it('should suggest another recipe with the same ingredients', async () => {
    const calls = mockSuggestionApi({
      suggestions: [
        () => HttpResponse.json({ recipe: SUGGESTION }),
        () => HttpResponse.json({ recipe: buildRecipeContent({ name: 'Ovos mexidos com queijo' }) })
      ]
    });
    const { user } = await openSuggestRecipe();

    await user.type(screen.getByLabelText('O que você tem em casa?'), '5 ovos e queijo');
    await user.press(screen.getByRole('button', { name: 'Sugerir receita' }));
    await screen.findByRole('header', { name: 'Omelete de queijo com tomate' });

    await user.press(screen.getByRole('button', { name: 'Sugerir outra' }));

    expect(
      await screen.findByRole('header', { name: 'Ovos mexidos com queijo' })
    ).toBeOnTheScreen();
    expect(calls.suggested).toHaveLength(2);
    expect(calls.saved).toEqual([]);
  });

  it('should go back to the description without saving the suggestion', async () => {
    const calls = mockSuggestionApi();
    const { user } = await openSuggestRecipe();

    await user.type(screen.getByLabelText('O que você tem em casa?'), '5 ovos e queijo');
    await user.press(screen.getByRole('button', { name: 'Sugerir receita' }));
    await screen.findByRole('header', { name: 'Receita sugerida' });

    await user.press(screen.getByRole('button', { name: 'Voltar' }));

    expect(await screen.findByRole('header', { name: 'Sugerir receita' })).toBeOnTheScreen();
    expect(screen.getByDisplayValue('5 ovos e queijo')).toBeOnTheScreen();
    expect(calls.saved).toEqual([]);
  });

  it('should explain when the description has no food', async () => {
    mockSuggestionApi({
      suggestions: [
        () =>
          HttpResponse.json(
            { error: { code: 'NO_FOOD_INGREDIENTS', message: 'No food ingredients.' } },
            { status: 422 }
          )
      ]
    });
    const { user } = await openSuggestRecipe();

    await user.type(screen.getByLabelText('O que você tem em casa?'), 'nada');
    await user.press(screen.getByRole('button', { name: 'Sugerir receita' }));

    expect(
      await screen.findByText('Não identificamos nenhum alimento na descrição.')
    ).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'Sugerir receita' })).toBeOnTheScreen();
  });

  it('should keep the suggestion when it cannot be saved', async () => {
    const { alertSpy } = spyOnAlert();
    mockSuggestionApi();
    server.use(http.post(apiUrl('/recipes'), () => HttpResponse.error()));
    const { user } = await openSuggestRecipe();

    await user.type(screen.getByLabelText('O que você tem em casa?'), '5 ovos e queijo');
    await user.press(screen.getByRole('button', { name: 'Sugerir receita' }));
    await screen.findByRole('header', { name: 'Receita sugerida' });
    await user.press(screen.getByRole('button', { name: 'Salvar receita' }));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Não foi possível salvar a receita',
        'Não foi possível falar com o servidor. Verifique sua conexão.'
      )
    );
    expect(screen.getByRole('header', { name: 'Receita sugerida' })).toBeOnTheScreen();
  });

  it('should keep the current suggestion when another one cannot be suggested', async () => {
    const { alertSpy } = spyOnAlert();
    mockSuggestionApi({
      suggestions: [
        () => HttpResponse.json({ recipe: SUGGESTION }),
        () =>
          HttpResponse.json(
            { error: { code: 'RECIPE_GENERATION_FAILED', message: 'Failed.' } },
            { status: 502 }
          )
      ]
    });
    const { user } = await openSuggestRecipe();

    await user.type(screen.getByLabelText('O que você tem em casa?'), '5 ovos e queijo');
    await user.press(screen.getByRole('button', { name: 'Sugerir receita' }));
    await screen.findByRole('header', { name: 'Omelete de queijo com tomate' });

    await user.press(screen.getByRole('button', { name: 'Sugerir outra' }));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Não foi possível sugerir outra receita',
        'Não conseguimos gerar uma receita. Tente de novo.'
      )
    );
    expect(
      await screen.findByRole('header', { name: 'Omelete de queijo com tomate' })
    ).toBeOnTheScreen();
  });

  it('should go back to the recipes from the description', async () => {
    const calls = mockSuggestionApi();
    const { user } = await openSuggestRecipe();

    await user.press(screen.getByRole('button', { name: 'Voltar' }));

    expect(await screen.findByRole('header', { name: 'Receitas' })).toBeOnTheScreen();
    expect(calls.suggested).toEqual([]);
  });
});
