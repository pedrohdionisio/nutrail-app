import TrashIcon from 'lucide-react-native/icons/trash';
import { RecipeContent } from 'presentation/components/RecipeContent/RecipeContent';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { View } from 'react-native';
import { DeleteRecipeSheet } from './components/DeleteRecipeSheet/DeleteRecipeSheet';
import { LogRecipeMealSheet } from './components/LogRecipeMealSheet/LogRecipeMealSheet';
import { RecipeDetailsFallback } from './components/RecipeDetailsFallback/RecipeDetailsFallback';
import { RecipeDetailsFooter } from './components/RecipeDetailsFooter/RecipeDetailsFooter';
import { useRecipeDetailsController } from './useRecipeDetailsController';

const CONTENT_PADDING_BOTTOM = 24;

export function RecipeDetails() {
  const {
    recipeId,
    recipe,
    isLoadingRecipe,
    fallbackMessage,
    fallbackActionTitle,
    isRefetchingRecipe,
    deleteRecipeSheetRef,
    logMealSheetRef,
    handleGoBack,
    handleFallbackAction,
    handleDelete,
    handleRecipeDeleted,
    handleLogMeal
  } = useRecipeDetailsController();

  if (!recipe) {
    return (
      <RecipeDetailsFallback
        actionTitle={fallbackActionTitle}
        isActionLoading={isRefetchingRecipe}
        isLoading={isLoadingRecipe}
        message={fallbackMessage}
        onAction={handleFallbackAction}
        onBack={handleGoBack}
      />
    );
  }

  return (
    <View className='flex-1 bg-white'>
      <ScreenHeader
        action={{ icon: TrashIcon, accessibilityLabel: 'Excluir receita', onPress: handleDelete }}
        onBack={handleGoBack}
        title='Receita'
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
