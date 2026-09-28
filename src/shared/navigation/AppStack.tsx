import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AudioMeal } from 'presentation/screens/AudioMeal/AudioMeal';
import { EditMeal } from 'presentation/screens/EditMeal/EditMeal';
import { Goals } from 'presentation/screens/Goals/Goals';
import { Home } from 'presentation/screens/Home/Home';
import { ManualMeal } from 'presentation/screens/ManualMeal/ManualMeal';
import { MealDetails } from 'presentation/screens/MealDetails/MealDetails';
import { PictureMeal } from 'presentation/screens/PictureMeal/PictureMeal';
import { Profile } from 'presentation/screens/Profile/Profile';
import { RecipeDetails } from 'presentation/screens/RecipeDetails/RecipeDetails';
import { Recipes } from 'presentation/screens/Recipes/Recipes';
import { SuggestRecipe } from 'presentation/screens/SuggestRecipe/SuggestRecipe';
import type { AppRoutesParamList } from './AppRoutesTypes';

const Stack = createNativeStackNavigator<AppRoutesParamList>();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Home} name='Home' />
      <Stack.Screen component={Goals} name='Goals' />
      <Stack.Screen component={Profile} name='Profile' />
      <Stack.Screen component={ManualMeal} name='ManualMeal' />
      <Stack.Screen component={PictureMeal} name='PictureMeal' />
      <Stack.Screen component={AudioMeal} name='AudioMeal' />
      <Stack.Screen component={MealDetails} name='MealDetails' />
      <Stack.Screen component={EditMeal} name='EditMeal' />
      <Stack.Screen component={Recipes} name='Recipes' />
      <Stack.Screen component={SuggestRecipe} name='SuggestRecipe' />
      <Stack.Screen component={RecipeDetails} name='RecipeDetails' />
    </Stack.Navigator>
  );
}
