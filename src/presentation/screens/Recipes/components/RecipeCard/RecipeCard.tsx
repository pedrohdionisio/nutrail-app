import ChefHatIcon from 'lucide-react-native/icons/chef-hat';
import { AppText } from 'presentation/components/AppText/AppText';
import { MacroStats } from 'presentation/components/MacroStats/MacroStats';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IRecipeCardProps } from './RecipeCardTypes';
import { useRecipeCardController } from './useRecipeCardController';

export function RecipeCard({ recipe, onPress }: IRecipeCardProps) {
  const { t } = useTranslation();
  const { handlePress } = useRecipeCardController({ recipeId: recipe.id, onPress });

  return (
    <Pressable
      accessibilityHint={t('recipes.openHint')}
      accessibilityRole='button'
      className='gap-4 rounded-2xl border border-gray-400 bg-white p-4 active:opacity-80'
      onPress={handlePress}
    >
      <View className='flex-row items-center gap-3'>
        <View className='h-12 w-12 items-center justify-center rounded-xl bg-gray-200'>
          <ChefHatIcon color={COLORS.black[700]} size={20} strokeWidth={1.8} />
        </View>

        <AppText className='flex-1' numberOfLines={2} weight='medium'>
          {recipe.name}
        </AppText>
      </View>

      <MacroStats macros={recipe} />
    </Pressable>
  );
}
