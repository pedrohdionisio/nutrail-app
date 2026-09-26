import { CameraView } from 'expo-camera';
import { cssInterop } from 'nativewind';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ActivityIndicator, Image, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IPictureFrameProps } from './PictureFrameTypes';

cssInterop(CameraView, { className: 'style' });

export function PictureFrame({
  cameraRef,
  cameraStatus,
  canAskPermission,
  pictureUri,
  onCameraReady,
  onRequestPermission
}: IPictureFrameProps) {
  return (
    <View className='aspect-[3/4] w-full items-center justify-center overflow-hidden bg-black-700'>
      {pictureUri && (
        <Image
          accessibilityIgnoresInvertColors
          accessibilityLabel='Foto da refeição'
          className='h-full w-full'
          resizeMode='cover'
          source={{ uri: pictureUri }}
        />
      )}

      {!pictureUri && cameraStatus === 'GRANTED' && (
        <CameraView
          className='h-full w-full'
          facing='back'
          onCameraReady={onCameraReady}
          ref={cameraRef}
        />
      )}

      {!pictureUri && cameraStatus === 'LOADING' && (
        <ActivityIndicator accessibilityLabel='Abrindo a câmera' color={COLORS.lime[500]} />
      )}

      {!pictureUri && cameraStatus === 'DENIED' && (
        <View className='gap-6 px-8'>
          <AppText align='center' color='inverse'>
            Permita o acesso à câmera para fotografar sua refeição, ou escolha uma foto da galeria.
          </AppText>

          <Button
            onPress={onRequestPermission}
            title={canAskPermission ? 'Permitir câmera' : 'Abrir ajustes'}
          />
        </View>
      )}
    </View>
  );
}
