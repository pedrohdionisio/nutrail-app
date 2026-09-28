import { AiLoading } from 'presentation/components/AiLoading/AiLoading';
import { RecipeContent } from 'presentation/components/RecipeContent/RecipeContent';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { RecipeSuggestionFooter } from './components/RecipeSuggestionFooter/RecipeSuggestionFooter';
import { SuggestRecipeFooter } from './components/SuggestRecipeFooter/SuggestRecipeFooter';
import { SuggestRecipeForm } from './components/SuggestRecipeForm/SuggestRecipeForm';
import { useSuggestRecipeController } from './useSuggestRecipeController';

const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : undefined;

const CONTENT_PADDING_BOTTOM = 24;

export function SuggestRecipe() {
  const {
    control,
    suggestion,
    apiErrorMessage,
    isSubmitDisabled,
    isSavingRecipe,
    shouldShowLoading,
    handleGoBack,
    handleSubmit,
    handleSave
  } = useSuggestRecipeController();

  if (shouldShowLoading) {
    return <AiLoading title='Estamos montando sua receita com ajuda da inteligência artificial' />;
  }

  if (suggestion) {
    return (
      <View className='flex-1 bg-white'>
        <ScreenHeader onBack={handleGoBack} title='Receita sugerida' />
        <RecipeContent paddingBottom={CONTENT_PADDING_BOTTOM} recipe={suggestion} />
        <RecipeSuggestionFooter
          isSaving={isSavingRecipe}
          onSave={handleSave}
          onSuggestAgain={handleSubmit}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} className='flex-1 bg-white'>
      <ScreenHeader onBack={handleGoBack} title='Sugerir receita' />
      <SuggestRecipeForm apiErrorMessage={apiErrorMessage} control={control} />
      <SuggestRecipeFooter isSubmitDisabled={isSubmitDisabled} onSubmit={handleSubmit} />
    </KeyboardAvoidingView>
  );
}
