export type AuthRoutesParamList = {
  Welcome: undefined;
  Onboarding: undefined;
};

export type AppRoutesParamList = {
  Home: undefined;
  Goals: undefined;
  Profile: undefined;
  ManualMeal: { date: string };
  PictureMeal: { date: string };
  AudioMeal: { date: string };
  MealDetails: { mealId: string };
  EditMeal: { mealId: string };
  Recipes: undefined;
  SuggestRecipe: undefined;
  RecipeDetails: { recipeId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutesParamList, AppRoutesParamList {}
  }
}
