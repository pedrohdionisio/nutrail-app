import { screen, waitFor } from '@testing-library/react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { HttpResponse, http } from 'msw';
import type { IMealSummary } from 'shared/entities/IMealSummary';
import { spyOnAlert } from 'tests/alert';
import { apiUrl } from 'tests/apiUrl';
import { buildMeal, buildMealsOfDay } from 'tests/fixtures/meal';
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

const CREATED_MEAL = buildMeal({
  id: 'meal-9',
  name: 'Ovos mexidos com pão',
  inputType: 'MANUAL',
  calories: 420
});

interface IMockMealsApiParams {
  createResponse?: () => Response | Promise<Response>;
  uploadStatus?: number;
}

function mockMealsApi({
  createResponse = () => HttpResponse.json(CREATED_MEAL, { status: 201 }),
  uploadStatus = 204
}: IMockMealsApiParams = {}) {
  const calls = { created: [] as unknown[], pictureUploads: [] as string[], s3Uploads: 0 };
  let meals: IMealSummary[] = [];

  server.use(
    http.get(apiUrl('/meals'), ({ request }) =>
      HttpResponse.json(buildMealsOfDay(new URL(request.url).searchParams.get('date') ?? '', meals))
    ),
    http.post(apiUrl('/meals/manual'), async ({ request }) => {
      calls.created.push(await request.json());
      const response = await createResponse();

      if (response.ok) {
        meals = [CREATED_MEAL];
      }

      return response;
    }),
    http.post(apiUrl('/meals/:mealId/picture'), ({ params }) => {
      calls.pictureUploads.push(String(params.mealId));

      return HttpResponse.json({
        upload: { url: UPLOAD_URL, fields: { key: 'pictures/meal-9.jpg' } }
      });
    }),
    http.post(UPLOAD_URL, () => {
      calls.s3Uploads += 1;

      return new HttpResponse(null, { status: uploadStatus });
    })
  );

  return calls;
}

async function openManualMeal() {
  await seedSession();
  const rendered = await renderApp();
  await waitForHome();

  await rendered.user.press(screen.getByRole('button', { name: 'Cadastrar refeição manualmente' }));
  await screen.findByRole('header', { name: 'Refeição manual' });

  return rendered;
}

describe('ManualMeal', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2026, 8, 26, 10, 0), advanceTimers: true });
    jest.mocked(launchImageLibraryAsync).mockResolvedValue({
      canceled: false,
      assets: [{ uri: 'file:///original.heic', width: 4032, height: 3024 }]
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should analyze the meal, upload the picture and refresh the day', async () => {
    let releaseAnalysis = () => {};
    const calls = mockMealsApi({
      createResponse: async () => {
        await new Promise<void>((resolve) => {
          releaseAnalysis = resolve;
        });

        return HttpResponse.json(CREATED_MEAL, { status: 201 });
      }
    });
    const { user } = await openManualMeal();

    expect(screen.getByDisplayValue('26/09/2026')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('10:00')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Calcular macros' })).toBeDisabled();

    await user.type(screen.getByLabelText('O que você comeu?'), '2 ovos mexidos e 1 pão');
    const time = screen.getByDisplayValue('10:00');
    await user.clear(time);
    await user.type(time, '0815');
    await user.press(screen.getByRole('button', { name: 'Adicionar foto' }));
    expect(await screen.findByLabelText('Foto da refeição')).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Calcular macros' }));

    expect(
      await screen.findByText('Estamos calculando seus macros com ajuda da inteligência artificial')
    ).toBeOnTheScreen();

    releaseAnalysis();

    expect(await screen.findByText('Ovos mexidos com pão')).toBeOnTheScreen();
    expect(screen.getByText('1580 kcal restantes')).toBeOnTheScreen();
    expect(screen.queryByRole('header', { name: 'Refeição manual' })).not.toBeOnTheScreen();
    expect(calls.created).toEqual([
      { date: '2026-09-26', time: '08:15', text: '2 ovos mexidos e 1 pão' }
    ]);
    expect(calls.pictureUploads).toEqual(['meal-9']);
    expect(calls.s3Uploads).toBe(1);
  });

  it('should skip the upload when there is no picture', async () => {
    const calls = mockMealsApi();
    const { user } = await openManualMeal();

    await user.type(screen.getByLabelText('O que você comeu?'), 'Salada de frutas');
    await user.press(screen.getByRole('button', { name: 'Calcular macros' }));

    expect(await screen.findByText('Ovos mexidos com pão')).toBeOnTheScreen();
    expect(calls.pictureUploads).toEqual([]);
    expect(calls.s3Uploads).toBe(0);
  });

  it('should keep the meal and warn when the picture fails to upload', async () => {
    const { alertSpy } = spyOnAlert();
    mockMealsApi({ uploadStatus: 403 });
    const { user } = await openManualMeal();

    await user.type(screen.getByLabelText('O que você comeu?'), 'Salada de frutas');
    await user.press(screen.getByRole('button', { name: 'Adicionar foto' }));
    await screen.findByLabelText('Foto da refeição');
    await user.press(screen.getByRole('button', { name: 'Calcular macros' }));

    expect(await screen.findByText('Ovos mexidos com pão')).toBeOnTheScreen();
    expect(alertSpy).toHaveBeenCalledWith(
      'Refeição cadastrada sem a foto',
      'Os macros foram calculados, mas não conseguimos enviar a foto.'
    );
  });

  it('should refuse a time in the future before sending', async () => {
    const calls = mockMealsApi();
    const { user } = await openManualMeal();

    await user.type(screen.getByLabelText('O que você comeu?'), 'Salada de frutas');
    const time = screen.getByDisplayValue('10:00');
    await user.clear(time);
    await user.type(time, '1130');
    await user.press(screen.getByRole('button', { name: 'Calcular macros' }));

    expect(await screen.findByText('O horário não pode estar no futuro')).toBeOnTheScreen();
    expect(calls.created).toEqual([]);
  });

  it('should go back to the form with the error when the analysis fails', async () => {
    mockMealsApi({
      createResponse: () =>
        HttpResponse.json(
          { error: { code: 'NO_FOOD_INGREDIENTS', message: 'No food found.' } },
          { status: 422 }
        )
    });
    const { user } = await openManualMeal();

    await user.type(screen.getByLabelText('O que você comeu?'), 'Uma cadeira');
    await user.press(screen.getByRole('button', { name: 'Calcular macros' }));

    expect(
      await screen.findByText('Não identificamos nenhum alimento na descrição.')
    ).toBeOnTheScreen();
    expect(screen.getByDisplayValue('Uma cadeira')).toBeOnTheScreen();
  });

  it('should use the day selected on the home', async () => {
    mockMealsApi();
    await seedSession();
    const { user } = await renderApp();
    await waitForHome();

    await user.press(screen.getByRole('button', { name: 'Dia anterior' }));
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Cadastrar refeição manualmente' })
      ).toBeOnTheScreen()
    );
    await user.press(screen.getByRole('button', { name: 'Cadastrar refeição manualmente' }));

    expect(await screen.findByDisplayValue('25/09/2026')).toBeOnTheScreen();
  });
});
