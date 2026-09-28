import { Button } from 'presentation/components/Button/Button';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IRecipeDetailsFooterProps } from './RecipeDetailsFooterTypes';

const FOOTER_BOTTOM_SPACING = 16;

export function RecipeDetailsFooter({ onLogMeal }: IRecipeDetailsFooterProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className='border-gray-400 border-t bg-white px-5 pt-5'
      style={{ paddingBottom: bottom + FOOTER_BOTTOM_SPACING }}
    >
      <Button onPress={onLogMeal} title='Registrar como refeição' />
    </View>
  );
}
