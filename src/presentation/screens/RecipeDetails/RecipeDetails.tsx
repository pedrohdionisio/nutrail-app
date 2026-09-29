import TrashIcon from 'lucide-react-native/icons/trash';
import { RecipeContent } from 'presentation/components/RecipeContent/RecipeContent';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { DeleteRecipeSheet } from './components/DeleteRecipeSheet/DeleteRecipeSheet';
import { LogRecipeMealSheet } from './components/LogRecipeMealSheet/LogRecipeMealSheet';
import { RecipeDetailsFooter } from './components/RecipeDetailsFooter/RecipeDetailsFooter';
import { useRecipeDetailsController } from './useRecipeDetailsController';

const CONTENT_PADDING_BOTTOM = 24;

export function RecipeDetails() {
  const { t } = useTranslation();
  const {
    recipeId,
    recipe,
    deleteRecipeSheetRef,
    logMealSheetRef,
    handleGoBack,
    handleDelete,
    handleRecipeDeleted,
    handleLogMeal
  } = useRecipeDetailsController();

  if (!recipe) {
    return null;
  }

  return (
    <View className='flex-1 bg-white'>
      <ScreenHeader
        action={{ icon: TrashIcon, accessibilityLabel: t('recipes.delete'), onPress: handleDelete }}
        onBack={handleGoBack}
        title={t('recipes.recipe')}
      />

      <RecipeContent paddingBottom={CONTENT_PADDING_BOTTOM} recipe={recipe} />
      <RecipeDetailsFooter onLogMeal={handleLogMeal} />

      <DeleteRecipeSheet
        onDeleted={handleRecipeDeleted}
        recipeId={recipeId}
        sheetRef={deleteRecipeSheetRef}
      />

      <LogRecipeMealSheet recipeId={recipeId} sheetRef={logMealSheetRef} />
    </View>
  );
}
