import { screen, waitFor } from '@testing-library/react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { HttpResponse, http } from 'msw';
import { spyOnAlert } from 'tests/alert';
import { apiUrl } from 'tests/apiUrl';
import { buildMeal, buildMealDetails, buildMealsOfDay } from 'tests/fixtures/meal';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

jest.mock('expo-image-picker', () => ({ launchImageLibraryAsync: jest.fn() }));
jest.mock('expo-image-manipulator', () => ({
  SaveFormat: { JPEG: 'jpeg' },
  ImageManipulator: {
    manipulate: () => ({
      resize: () => undefined,
      renderAsync: async () => ({ saveAsync: async () => ({ uri: 'file:///meal.jpg' }) })
    })
  }
}));

const UPLOAD_URL = 'https://uploads.test/';

function mockPictureUploadApi() {
  const calls = { pictureUploads: [] as string[], s3Uploads: 0 };

  server.use(
    http.post(apiUrl('/meals/:mealId/picture'), ({ params }) => {
      calls.pictureUploads.push(String(params.mealId));

      return HttpResponse.json({
        upload: { url: UPLOAD_URL, fields: { key: 'pictures/meal-1.jpg' } }
      });
    }),
    http.post(UPLOAD_URL, () => {
      calls.s3Uploads += 1;

      return new HttpResponse(null, { status: 204 });
    })
  );

  return calls;
}

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

  it('should add a picture to an audio meal', async () => {
    jest.mocked(launchImageLibraryAsync).mockResolvedValue({
      canceled: false,
      assets: [{ uri: 'file:///original.heic', width: 1200, height: 900 }]
    });
    server.use(
      http.get(apiUrl('/meals/:mealId'), () =>
        HttpResponse.json(buildMealDetails({ inputType: 'AUDIO', pictureUrl: null }))
      )
    );
    const calls = mockPictureUploadApi();
    const { user } = await openMealFromHome();
    await screen.findByRole('header', { name: 'Almoço Fitness' });

    await user.press(screen.getByRole('button', { name: 'Adicionar foto' }));

    expect(await screen.findByLabelText('Foto da refeição')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Trocar foto' })).toBeOnTheScreen();
    expect(calls.pictureUploads).toEqual(['meal-1']);
    expect(calls.s3Uploads).toBe(1);
  });

  it('should warn when the picture cannot be sent', async () => {
    const { alertSpy } = spyOnAlert();
    jest.mocked(launchImageLibraryAsync).mockResolvedValue({
      canceled: false,
      assets: [{ uri: 'file:///original.heic', width: 1200, height: 900 }]
    });
    server.use(
      http.get(apiUrl('/meals/:mealId'), () =>
        HttpResponse.json(buildMealDetails({ inputType: 'MANUAL', pictureUrl: null }))
      ),
      http.post(apiUrl('/meals/:mealId/picture'), () =>
        HttpResponse.json(
          { error: { code: 'MEAL_PICTURE_NOT_ALLOWED', message: 'Not allowed.' } },
          { status: 409 }
        )
      )
    );
    const { user } = await openMealFromHome();
    await screen.findByRole('header', { name: 'Almoço Fitness' });

    await user.press(screen.getByRole('button', { name: 'Adicionar foto' }));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Não foi possível enviar a foto',
        'Não é possível trocar a foto desta refeição agora.'
      )
    );
    expect(screen.getByRole('button', { name: 'Adicionar foto' })).toBeOnTheScreen();
  });

  it('should not offer a new picture for a meal registered by picture', async () => {
    server.use(http.get(apiUrl('/meals/:mealId'), () => HttpResponse.json(buildMealDetails())));
    await openMealFromHome();
    await screen.findByRole('header', { name: 'Almoço Fitness' });

    expect(screen.queryByRole('button', { name: 'Adicionar foto' })).not.toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: 'Trocar foto' })).not.toBeOnTheScreen();
  });
});
