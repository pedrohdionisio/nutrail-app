import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useListRecipes } from 'data/modules/recipe/useCases/listRecipes/useListRecipes';
import { useRef, useState } from 'react';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';

export function useRecipeDetailsController() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AppRoutesParamList, 'RecipeDetails'>>();
  const { paddingBottom } = useScreenPadding();
  const deleteRecipeSheetRef = useRef<BottomSheetModal>(null);
  const { recipes, isLoadingRecipes, isRecipesError, isRefetchingRecipes, refetchRecipes } =
    useListRecipes();

  const foundRecipe = recipes.find(({ id }) => id === params.recipeId) ?? null;
  const [lastRecipe, setLastRecipe] = useState(foundRecipe);

  if (foundRecipe && foundRecipe !== lastRecipe) {
    setLastRecipe(foundRecipe);
  }

  const recipe = foundRecipe ?? lastRecipe;

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDelete() {
    deleteRecipeSheetRef.current?.present();
  }

  function handleRetry() {
    refetchRecipes();
  }

  return {
    recipeId: params.recipeId,
    recipe,
    isLoadingRecipe: isLoadingRecipes,
    fallbackMessage: isRecipesError
      ? 'Não conseguimos carregar a receita. Verifique sua conexão e tente de novo.'
      : 'Receita não encontrada.',
    fallbackActionTitle: isRecipesError ? 'Tentar de novo' : 'Voltar',
    isRefetchingRecipe: isRefetchingRecipes,
    listPaddingBottom: paddingBottom,
    deleteRecipeSheetRef,
    handleGoBack,
    handleFallbackAction: isRecipesError ? handleRetry : handleGoBack,
    handleDelete,
    handleRecipeDeleted: handleGoBack
  };
}
