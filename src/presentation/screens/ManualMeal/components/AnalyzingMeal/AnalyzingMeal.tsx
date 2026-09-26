import SparklesIcon from 'lucide-react-native/icons/sparkles';
import { AppText } from 'presentation/components/AppText/AppText';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';

export function AnalyzingMeal() {
  return (
    <ScreenLayout className='items-center justify-center gap-10'>
      <View className='h-14 w-14 items-center justify-center rounded-full bg-lime-500'>
        <SparklesIcon color={COLORS.black[700]} size={26} strokeWidth={1.8} />
      </View>

      <View className='gap-4'>
        <AppText accessibilityRole='header' align='center' size='title1'>
          Estamos calculando seus macros com ajuda da inteligência artificial
        </AppText>

        <AppText align='center' color='muted'>
          Isso pode levar alguns segundos.
        </AppText>
      </View>

      <ActivityIndicator accessibilityLabel='Carregando' color={COLORS.lime[700]} size='small' />
    </ScreenLayout>
  );
}
