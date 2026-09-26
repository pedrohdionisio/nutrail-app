import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IPersonalizingProps } from './PersonalizingTypes';

export function Personalizing({ isError, onRetry }: IPersonalizingProps) {
  if (isError) {
    return (
      <ScreenLayout className='justify-center gap-8'>
        <View className='gap-4'>
          <AppText accessibilityRole='header' align='center' size='title1'>
            Não conseguimos montar seu plano
          </AppText>

          <AppText align='center' color='muted'>
            Sua conta foi criada. Verifique sua conexão e tente de novo.
          </AppText>
        </View>

        <Button onPress={onRetry} title='Tentar de novo' />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout className='items-center justify-center gap-10'>
      <AppText accessibilityRole='header' align='center' size='title1'>
        Estamos personalizando o app para você
      </AppText>

      <ActivityIndicator accessibilityLabel='Carregando' color={COLORS.lime[700]} size='small' />
    </ScreenLayout>
  );
}
