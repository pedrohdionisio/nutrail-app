import ChefHatIcon from 'lucide-react-native/icons/chef-hat';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IRecipesListEmptyProps } from './RecipesListEmptyTypes';

export function RecipesListEmpty({
  isLoading,
  isError,
  isRetrying,
  onRetry
}: IRecipesListEmptyProps) {
  if (isLoading) {
    return (
      <View className='items-center py-16'>
        <ActivityIndicator accessibilityLabel='Carregando receitas' color={COLORS.lime[700]} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className='gap-6 py-10'>
        <View className='gap-2'>
          <AppText align='center' weight='medium'>
            Não conseguimos carregar suas receitas
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
        <ChefHatIcon color={COLORS.black[700]} size={22} strokeWidth={1.8} />
      </View>

      <View className='gap-2'>
        <AppText align='center' weight='medium'>
          Nenhuma receita salva
        </AppText>

        <AppText align='center' color='muted' size='bodySm'>
          Conte o que você tem em casa e a IA sugere uma receita que cabe nas suas metas de hoje.
        </AppText>
      </View>
    </View>
  );
}
