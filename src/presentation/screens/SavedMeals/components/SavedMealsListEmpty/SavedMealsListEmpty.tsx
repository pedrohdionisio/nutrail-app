import BookmarkIcon from 'lucide-react-native/icons/bookmark';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { ISavedMealsListEmptyProps } from './SavedMealsListEmptyTypes';

export function SavedMealsListEmpty({
  isLoading,
  isError,
  isRetrying,
  onRetry
}: ISavedMealsListEmptyProps) {
  if (isLoading) {
    return (
      <View className='items-center py-16'>
        <ActivityIndicator
          accessibilityLabel='Carregando refeições salvas'
          color={COLORS.lime[700]}
        />
      </View>
    );
  }

  if (isError) {
    return (
      <View className='gap-6 py-10'>
        <View className='gap-2'>
          <AppText align='center' weight='medium'>
            Não conseguimos carregar suas refeições salvas
          </AppText>

          <AppText align='center' color='muted' size='bodySm'>
            Verifique sua conexão e tente de novo.
          </AppText>
        </View>

        <Button
          isLoading={isRetrying}
          onPress={onRetry}
          title='Tentar de novo'
          variant='secondary'
        />
      </View>
    );
  }

  return (
    <View className='flex-1 items-center justify-center gap-6 py-10'>
      <View className='h-12 w-12 items-center justify-center rounded-xl bg-gray-200'>
        <BookmarkIcon color={COLORS.black[700]} size={22} strokeWidth={1.8} />
      </View>

      <View className='gap-2'>
        <AppText align='center' weight='medium'>
          Nenhuma refeição salva
        </AppText>

        <AppText align='center' color='muted' size='bodySm'>
          Abra uma refeição já analisada e toque em salvar. Ela aparece aqui para você cadastrar de
          novo com um toque.
        </AppText>
      </View>
    </View>
  );
}
