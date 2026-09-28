import { useNavigation } from '@react-navigation/native';
import { useListRecipes } from 'data/modules/recipe/useCases/listRecipes/useListRecipes';
import type { IHandleOpenRecipeParams } from './components/RecipeCard/RecipeCardTypes';

export function useRecipesController() {
  const navigation = useNavigation();
  const { recipes, isLoadingRecipes, isRecipesError, isRefetchingRecipes, refetchRecipes } =
    useListRecipes();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleOpenRecipe({ recipeId }: IHandleOpenRecipeParams) {
    navigation.navigate('RecipeDetails', { recipeId });
  }

  function handleSuggest() {
    navigation.navigate('SuggestRecipe');
  }

  function handleRetry() {
    refetchRecipes();
  }

  return {
    recipes,
    isLoadingRecipes,
    isRecipesError,
    isRefetchingRecipes,
    handleGoBack,
    handleOpenRecipe,
    handleSuggest,
    handleRetry
  };
}
