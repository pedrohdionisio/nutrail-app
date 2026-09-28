import { act, screen, waitFor } from '@testing-library/react-native';
import { PermissionStatus } from 'expo';
import { HttpResponse, http } from 'msw';
import { spyOnAlert } from 'tests/support/alert';
import { apiUrl } from 'tests/support/apiUrl';
import { pickDateTime } from 'tests/support/dateTimePicker';
import { mockMealAnalysisApi } from 'tests/support/mealAnalysisApi';
import { audioPlayer, microphonePermission } from 'tests/support/mocks/audio';
import { renderApp, seedSession } from 'tests/support/render';
import { waitForHome } from 'tests/support/screens';
import { server } from 'tests/support/server';

async function openAudioMeal() {
  await seedSession();
  const rendered = await renderApp();
  await waitForHome();

  await rendered.user.press(screen.getByRole('button', { name: 'Cadastrar refeição por áudio' }));
  await screen.findByRole('button', { name: 'Gravar áudio' });

  return rendered;
}

async function recordAudio(user: Awaited<ReturnType<typeof openAudioMeal>>['user']) {
  await waitFor(() => expect(screen.getByRole('button', { name: 'Gravar áudio' })).toBeEnabled());
  await user.press(screen.getByRole('button', { name: 'Gravar áudio' }));
  expect(await screen.findByText('0:07')).toBeOnTheScreen();

  await user.press(screen.getByRole('button', { name: 'Parar gravação' }));
  await screen.findByRole('button', { name: 'Confirmar áudio' });
}

describe('AudioMeal', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2026, 8, 26, 20, 30), advanceTimers: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should upload the recording, wait for the analysis and open the meal', async () => {
    const calls = mockMealAnalysisApi({ statuses: ['PROCESSING', 'SUCCESS'] });
    const { user } = await openAudioMeal();

    await recordAudio(user);
    expect(screen.getByText('0:07')).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Confirmar áudio' }));

    expect(
      await screen.findByText('Estamos calculando seus macros com ajuda da inteligência artificial')
    ).toBeOnTheScreen();
    await waitFor(() => expect(calls.polls).toBe(1));

    await act(() => jest.advanceTimersByTimeAsync(2000));

    expect(await screen.findByText('Almoço Fitness')).toBeOnTheScreen();
    expect(calls.created).toEqual([{ date: '2026-09-26', time: '20:30', inputType: 'AUDIO' }]);
    expect(calls.s3Uploads).toBe(1);

    await user.press(screen.getByRole('button', { name: 'Voltar' }));

    await waitForHome();
    expect(await screen.findByText('Almoço Fitness')).toBeOnTheScreen();
  });

  it('should play the recording before sending it', async () => {
    mockMealAnalysisApi();
    const { user } = await openAudioMeal();

    await recordAudio(user);
    await user.press(screen.getByRole('button', { name: 'Ouvir áudio' }));

    expect(audioPlayer.play).toHaveBeenCalledTimes(1);
  });

  it('should go back to recording when the audio is discarded', async () => {
    const calls = mockMealAnalysisApi();
    const { user } = await openAudioMeal();

    await recordAudio(user);
    await user.press(screen.getByRole('button', { name: 'Descartar áudio' }));

    expect(await screen.findByRole('button', { name: 'Gravar áudio' })).toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: 'Confirmar áudio' })).not.toBeOnTheScreen();
    expect(calls.created).toEqual([]);
  });

  it('should keep the recording and warn when the analysis fails', async () => {
    const { alertSpy } = spyOnAlert();
    mockMealAnalysisApi({ statuses: ['FAILED'] });
    const { user } = await openAudioMeal();

    await recordAudio(user);
    await user.press(screen.getByRole('button', { name: 'Confirmar áudio' }));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Não conseguimos entender o áudio',
        'Tente de novo ou grave outra vez, dizendo os alimentos e as quantidades.',
        expect.any(Array)
      )
    );
    expect(await screen.findByRole('button', { name: 'Confirmar áudio' })).toBeOnTheScreen();
  });

  it('should reprocess the same meal when the user tries again after a failure', async () => {
    const { alertSpy, pressAlertButton } = spyOnAlert();
    const calls = mockMealAnalysisApi({ statuses: ['FAILED', 'SUCCESS'] });
    const { user } = await openAudioMeal();

    await recordAudio(user);
    await user.press(screen.getByRole('button', { name: 'Confirmar áudio' }));
    await waitFor(() => expect(alertSpy).toHaveBeenCalled());

    await pressAlertButton('Tentar de novo');

    expect(await screen.findByText('Almoço Fitness')).toBeOnTheScreen();
    expect(calls.reprocessed).toEqual(['meal-9']);
    expect(calls.created).toHaveLength(1);
    expect(calls.s3Uploads).toBe(1);
  });

  it('should keep the recording when the meal cannot be reprocessed', async () => {
    const { alertSpy, pressAlertButton } = spyOnAlert();
    mockMealAnalysisApi({ statuses: ['FAILED'] });
    server.use(
      http.post(apiUrl('/meals/:mealId/reprocess'), () =>
        HttpResponse.json(
          { error: { code: 'INVALID_MEAL_TRANSITION', message: 'Invalid transition.' } },
          { status: 409 }
        )
      )
    );
    const { user } = await openAudioMeal();

    await recordAudio(user);
    await user.press(screen.getByRole('button', { name: 'Confirmar áudio' }));
    await waitFor(() => expect(alertSpy).toHaveBeenCalled());

    await pressAlertButton('Tentar de novo');

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Não foi possível tentar de novo',
        'Esta refeição não pode ser alterada agora.'
      )
    );
    expect(await screen.findByRole('button', { name: 'Confirmar áudio' })).toBeOnTheScreen();
  });

  it('should show the API error when the upload cannot start', async () => {
    const { alertSpy } = spyOnAlert();
    mockMealAnalysisApi();
    server.use(http.post(apiUrl('/meals'), () => HttpResponse.error()));
    const { user } = await openAudioMeal();

    await recordAudio(user);
    await user.press(screen.getByRole('button', { name: 'Confirmar áudio' }));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Não foi possível enviar o áudio',
        'Não foi possível falar com o servidor. Verifique sua conexão.'
      )
    );
    expect(await screen.findByRole('button', { name: 'Confirmar áudio' })).toBeOnTheScreen();
  });

  it('should ask for the microphone when it is not allowed', async () => {
    microphonePermission.current = {
      status: PermissionStatus.DENIED,
      granted: false,
      canAskAgain: false,
      expires: 'never'
    };
    mockMealAnalysisApi();
    await openAudioMeal();

    expect(
      await screen.findByText(
        'Permita o acesso ao microfone para gravar a descrição da sua refeição.'
      )
    ).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Abrir ajustes' })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Gravar áudio' })).toBeDisabled();
  });

  it('should register the meal at the time chosen by the user', async () => {
    const calls = mockMealAnalysisApi();
    const { user } = await openAudioMeal();

    await recordAudio(user);
    await user.press(screen.getByRole('button', { name: 'Horário da refeição: 20:30' }));
    await screen.findByRole('header', { name: 'Horário da refeição' });
    await pickDateTime(new Date(2026, 8, 26, 19, 45));
    await user.press(screen.getByRole('button', { name: 'Confirmar' }));
    await user.press(screen.getByRole('button', { name: 'Confirmar áudio' }));

    expect(await screen.findByText('Almoço Fitness')).toBeOnTheScreen();
    expect(calls.created).toEqual([{ date: '2026-09-26', time: '19:45', inputType: 'AUDIO' }]);
  });
});
