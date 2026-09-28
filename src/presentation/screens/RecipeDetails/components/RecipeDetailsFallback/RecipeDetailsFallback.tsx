import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IRecipeDetailsFallbackProps } from './RecipeDetailsFallbackTypes';

export function RecipeDetailsFallback({
  isLoading,
  message,
  actionTitle,
  isActionLoading,
  onBack,
  onAction
}: IRecipeDetailsFallbackProps) {
  return (
    <View className='flex-1 bg-white'>
      <ScreenHeader onBack={onBack} title='Receita' />

      <View className='flex-1 justify-center gap-6 px-5'>
        {isLoading ? (
          <ActivityIndicator accessibilityLabel='Carregando receita' color={COLORS.lime[700]} />
        ) : (
          <>
            <AppText align='center' color='muted'>
              {message}
            </AppText>

            <Button isLoading={isActionLoading} onPress={onAction} title={actionTitle} />
          </>
        )}
      </View>
    </View>
  );
}
