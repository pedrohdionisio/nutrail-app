import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { RecipeCard } from './components/RecipeCard/RecipeCard';
import { RecipesFooter } from './components/RecipesFooter/RecipesFooter';
import { RecipesListEmpty } from './components/RecipesListEmpty/RecipesListEmpty';
import { useRecipesController } from './useRecipesController';

export function Recipes() {
  const { t } = useTranslation();
  const {
    recipes,
    isLoadingRecipes,
    isRecipesError,
    isRefetchingRecipes,
    handleGoBack,
    handleOpenRecipe,
    handleSuggest,
    handleRetry
  } = useRecipesController();

  return (
    <View className='flex-1 bg-white'>
      <ScreenHeader onBack={handleGoBack} title={t('recipes.title')} />

      <FlatList
        contentContainerClassName='grow gap-4 px-5 py-6'
        data={recipes}
        keyExtractor={(recipe) => recipe.id}
        ListEmptyComponent={
          <RecipesListEmpty
            isError={isRecipesError}
            isLoading={isLoadingRecipes}
            isRetrying={isRefetchingRecipes}
            onRetry={handleRetry}
          />
        }
        renderItem={({ item }) => <RecipeCard onPress={handleOpenRecipe} recipe={item} />}
        showsVerticalScrollIndicator={false}
      />

      <RecipesFooter onSuggest={handleSuggest} />
    </View>
  );
}
