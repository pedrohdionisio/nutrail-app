import TrashIcon from 'lucide-react-native/icons/trash';
import { RecipeContent } from 'presentation/components/RecipeContent/RecipeContent';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { View } from 'react-native';
import { DeleteRecipeSheet } from './components/DeleteRecipeSheet/DeleteRecipeSheet';
import { RecipeDetailsFallback } from './components/RecipeDetailsFallback/RecipeDetailsFallback';
import { useRecipeDetailsController } from './useRecipeDetailsController';

export function RecipeDetails() {
  const {
    recipeId,
    recipe,
    isLoadingRecipe,
    fallbackMessage,
    fallbackActionTitle,
    isRefetchingRecipe,
    listPaddingBottom,
    deleteRecipeSheetRef,
    handleGoBack,
    handleFallbackAction,
    handleDelete,
    handleRecipeDeleted
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

      <RecipeContent paddingBottom={listPaddingBottom} recipe={recipe} />

      <DeleteRecipeSheet
        onDeleted={handleRecipeDeleted}
        recipeId={recipeId}
        sheetRef={deleteRecipeSheetRef}
      />
    </View>
  );
}
