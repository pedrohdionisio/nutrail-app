import { act, screen, waitFor } from '@testing-library/react-native';
import { PermissionStatus } from 'expo';
import type { CameraViewProps, PermissionResponse } from 'expo-camera';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { HttpResponse, http } from 'msw';
import type { Ref } from 'react';
import { spyOnAlert } from 'tests/alert';
import { apiUrl } from 'tests/apiUrl';
import { pickDateTime } from 'tests/dateTimePicker';
import { mockMealAnalysisApi } from 'tests/mealAnalysisApi';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

interface ICameraHandle {
  takePictureAsync: () => Promise<{ uri: string; width: number; height: number }>;
}

const mockCameraPermission: { current: PermissionResponse } = {
  current: { status: PermissionStatus.GRANTED, granted: true, canAskAgain: true, expires: 'never' }
};

jest.mock('expo-camera', () => {
  const { useEffect, useImperativeHandle } = jest.requireActual<typeof import('react')>('react');
  const { View } = jest.requireActual<typeof import('react-native')>('react-native');

  function CameraView({ ref, onCameraReady }: CameraViewProps & { ref?: Ref<ICameraHandle> }) {
    useImperativeHandle(ref, () => ({
      takePictureAsync: async () => ({ uri: 'file:///camera.jpg', width: 3024, height: 4032 })
    }));

    useEffect(() => {
      onCameraReady?.();
    }, [onCameraReady]);

    return <View testID='camera' />;
  }

  return {
    CameraView,
    useCameraPermissions: () => [mockCameraPermission.current, jest.fn(), jest.fn()]
  };
});
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

async function openPictureMeal() {
  await seedSession();
  const rendered = await renderApp();
  await waitForHome();

  await rendered.user.press(screen.getByRole('button', { name: 'Cadastrar refeição por foto' }));
  await screen.findByRole('button', { name: 'Tirar foto' });

  return rendered;
}

describe('PictureMeal', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2026, 8, 26, 10, 0), advanceTimers: true });
    mockCameraPermission.current = {
      status: PermissionStatus.GRANTED,
      granted: true,
      canAskAgain: true,
      expires: 'never'
    };
    jest.mocked(launchImageLibraryAsync).mockResolvedValue({
      canceled: false,
      assets: [{ uri: 'file:///original.heic', width: 4032, height: 3024 }]
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should upload the picture, wait for the analysis and open the meal', async () => {
    const calls = mockMealAnalysisApi({ statuses: ['PROCESSING', 'SUCCESS'] });
    const { user } = await openPictureMeal();

    await waitFor(() => expect(screen.getByRole('button', { name: 'Tirar foto' })).toBeEnabled());
    await user.press(screen.getByRole('button', { name: 'Tirar foto' }));
    expect(await screen.findByLabelText('Foto da refeição')).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Confirmar foto' }));

    expect(
      await screen.findByText('Estamos calculando seus macros com ajuda da inteligência artificial')
    ).toBeOnTheScreen();
    await waitFor(() => expect(calls.polls).toBe(1));

    await act(() => jest.advanceTimersByTimeAsync(2000));

    expect(await screen.findByText('Almoço Fitness')).toBeOnTheScreen();
    expect(screen.getByText('630kcal')).toBeOnTheScreen();
    expect(screen.getByText('56g (49%)')).toBeOnTheScreen();
    expect(screen.getByText('120g Arroz')).toBeOnTheScreen();
    expect(calls.created).toEqual([{ date: '2026-09-26', time: '10:00', inputType: 'PICTURE' }]);
    expect(calls.s3Uploads).toBe(1);

    await user.press(screen.getByRole('button', { name: 'Voltar' }));

    await waitForHome();
    expect(await screen.findByText('Almoço Fitness')).toBeOnTheScreen();
  });

  it('should send a picture chosen from the gallery', async () => {
    const calls = mockMealAnalysisApi();
    const { user } = await openPictureMeal();

    await user.press(screen.getByRole('button', { name: 'Escolher foto da galeria' }));
    await screen.findByLabelText('Foto da refeição');
    await user.press(screen.getByRole('button', { name: 'Confirmar foto' }));

    expect(await screen.findByText('Almoço Fitness')).toBeOnTheScreen();
    expect(calls.s3Uploads).toBe(1);
  });

  it('should go back to the camera when the picture is discarded', async () => {
    const calls = mockMealAnalysisApi();
    const { user } = await openPictureMeal();

    await user.press(screen.getByRole('button', { name: 'Escolher foto da galeria' }));
    await screen.findByLabelText('Foto da refeição');
    await user.press(screen.getByRole('button', { name: 'Descartar foto' }));

    expect(await screen.findByRole('button', { name: 'Tirar foto' })).toBeOnTheScreen();
    expect(screen.queryByLabelText('Foto da refeição')).not.toBeOnTheScreen();
    expect(calls.created).toEqual([]);
  });

  it('should keep the picture and warn when the analysis fails', async () => {
    const { alertSpy } = spyOnAlert();
    mockMealAnalysisApi({ statuses: ['FAILED'] });
    const { user } = await openPictureMeal();

    await user.press(screen.getByRole('button', { name: 'Escolher foto da galeria' }));
    await screen.findByLabelText('Foto da refeição');
    await user.press(screen.getByRole('button', { name: 'Confirmar foto' }));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Não conseguimos analisar a foto',
        'Tente de novo ou use outra foto, com os alimentos bem visíveis.',
        expect.any(Array)
      )
    );
    expect(await screen.findByRole('button', { name: 'Confirmar foto' })).toBeOnTheScreen();
  });

  it('should reprocess the same meal when the user tries again after a failure', async () => {
    const { alertSpy, pressAlertButton } = spyOnAlert();
    const calls = mockMealAnalysisApi({ statuses: ['FAILED', 'SUCCESS'] });
    const { user } = await openPictureMeal();

    await user.press(screen.getByRole('button', { name: 'Escolher foto da galeria' }));
    await screen.findByLabelText('Foto da refeição');
    await user.press(screen.getByRole('button', { name: 'Confirmar foto' }));
    await waitFor(() => expect(alertSpy).toHaveBeenCalled());

    await pressAlertButton('Tentar de novo');

    expect(await screen.findByText('Almoço Fitness')).toBeOnTheScreen();
    expect(calls.reprocessed).toEqual(['meal-9']);
    expect(calls.created).toHaveLength(1);
    expect(calls.s3Uploads).toBe(1);
  });

  it('should show the API error when the upload cannot start', async () => {
    const { alertSpy } = spyOnAlert();
    mockMealAnalysisApi();
    server.use(http.post(apiUrl('/meals'), () => HttpResponse.error()));
    const { user } = await openPictureMeal();

    await user.press(screen.getByRole('button', { name: 'Escolher foto da galeria' }));
    await screen.findByLabelText('Foto da refeição');
    await user.press(screen.getByRole('button', { name: 'Confirmar foto' }));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Não foi possível enviar a foto',
        'Não foi possível falar com o servidor. Verifique sua conexão.'
      )
    );
    expect(await screen.findByRole('button', { name: 'Confirmar foto' })).toBeOnTheScreen();
  });

  it('should offer the gallery when the camera is not allowed', async () => {
    mockCameraPermission.current = {
      status: PermissionStatus.DENIED,
      granted: false,
      canAskAgain: false,
      expires: 'never'
    };
    mockMealAnalysisApi();
    await openPictureMeal();

    expect(
      screen.getByText(
        'Permita o acesso à câmera para fotografar sua refeição, ou escolha uma foto da galeria.'
      )
    ).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Abrir ajustes' })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Tirar foto' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Escolher foto da galeria' })).toBeEnabled();
  });

  it('should register the meal at the time chosen by the user', async () => {
    const calls = mockMealAnalysisApi();
    const { user } = await openPictureMeal();

    await user.press(screen.getByRole('button', { name: 'Escolher foto da galeria' }));
    await screen.findByLabelText('Foto da refeição');
    await user.press(screen.getByRole('button', { name: 'Horário da refeição: 10:00' }));
    await screen.findByRole('header', { name: 'Horário da refeição' });
    await pickDateTime(new Date(2026, 8, 26, 8, 15));
    await user.press(screen.getByRole('button', { name: 'Confirmar' }));

    expect(
      await screen.findByRole('button', { name: 'Horário da refeição: 08:15' })
    ).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Confirmar foto' }));

    expect(await screen.findByText('Almoço Fitness')).toBeOnTheScreen();
    expect(calls.created).toEqual([{ date: '2026-09-26', time: '08:15', inputType: 'PICTURE' }]);
  });

  it('should refuse a time in the future', async () => {
    const { alertSpy } = spyOnAlert();
    mockMealAnalysisApi();
    const { user } = await openPictureMeal();

    await user.press(screen.getByRole('button', { name: 'Escolher foto da galeria' }));
    await screen.findByLabelText('Foto da refeição');
    await user.press(screen.getByRole('button', { name: 'Horário da refeição: 10:00' }));
    await screen.findByRole('header', { name: 'Horário da refeição' });
    await pickDateTime(new Date(2026, 8, 26, 11, 30));
    await user.press(screen.getByRole('button', { name: 'Confirmar' }));

    expect(alertSpy).toHaveBeenCalledWith(
      'Horário inválido',
      'O horário da refeição não pode estar no futuro.'
    );
    expect(screen.getByRole('button', { name: 'Horário da refeição: 10:00' })).toBeOnTheScreen();
  });

  it('should delete the failed meal when the user cancels to try another picture', async () => {
    const { alertSpy, pressAlertButton } = spyOnAlert();
    const deletedIds: string[] = [];
    mockMealAnalysisApi({ statuses: ['FAILED'] });
    server.use(
      http.delete(apiUrl('/meals/:mealId'), ({ params }) => {
        deletedIds.push(String(params.mealId));

        return new HttpResponse(null, { status: 204 });
      })
    );
    const { user } = await openPictureMeal();

    await user.press(screen.getByRole('button', { name: 'Escolher foto da galeria' }));
    await screen.findByLabelText('Foto da refeição');
    await user.press(screen.getByRole('button', { name: 'Confirmar foto' }));
    await waitFor(() => expect(alertSpy).toHaveBeenCalled());

    await pressAlertButton('Cancelar');

    await waitFor(() => expect(deletedIds).toEqual(['meal-9']));
    expect(screen.getByRole('button', { name: 'Confirmar foto' })).toBeOnTheScreen();
  });
});
