import { CameraView } from 'expo-camera';
import { cssInterop } from 'nativewind';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <View className='aspect-[3/4] w-full items-center justify-center overflow-hidden bg-black-700'>
      {pictureUri && (
        <Image
          accessibilityIgnoresInvertColors
          accessibilityLabel={t('common.mealPicture')}
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
        <ActivityIndicator
          accessibilityLabel={t('pictureMeal.openingCamera')}
          color={COLORS.lime[500]}
        />
      )}

      {!pictureUri && cameraStatus === 'DENIED' && (
        <View className='gap-6 px-8'>
          <AppText align='center' color='inverse'>
            {t('pictureMeal.cameraPermission')}
          </AppText>

          <Button
            onPress={onRequestPermission}
            title={canAskPermission ? t('pictureMeal.allowCamera') : t('common.openSettings')}
          />
        </View>
      )}
    </View>
  );
}
