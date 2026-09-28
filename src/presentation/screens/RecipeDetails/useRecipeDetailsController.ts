import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useListRecipes } from 'data/modules/recipe/useCases/listRecipes/useListRecipes';
import { useRef, useState } from 'react';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';

export function useRecipeDetailsController() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AppRoutesParamList, 'RecipeDetails'>>();
  const deleteRecipeSheetRef = useRef<BottomSheetModal>(null);
  const logMealSheetRef = useRef<BottomSheetModal>(null);
  const { recipes } = useListRecipes();

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

  function handleLogMeal() {
    logMealSheetRef.current?.present();
  }

  return {
    recipeId: params.recipeId,
    recipe,
    deleteRecipeSheetRef,
    logMealSheetRef,
    handleGoBack,
    handleDelete,
    handleRecipeDeleted: handleGoBack,
    handleLogMeal
  };
}
