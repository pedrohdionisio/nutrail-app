import { AiLoading } from 'presentation/components/AiLoading/AiLoading';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ManualMealFooter } from './components/ManualMealFooter/ManualMealFooter';
import { ManualMealForm } from './components/ManualMealForm/ManualMealForm';
import { useManualMealController } from './useManualMealController';

const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : undefined;

export function ManualMeal() {
  const {
    control,
    shouldShowAnalyzing,
    apiErrorMessage,
    isSubmitDisabled,
    handleGoBack,
    handleSubmit
  } = useManualMealController();

  if (shouldShowAnalyzing) {
    return (
      <AiLoading title='Estamos calculando seus macros com ajuda da inteligência artificial' />
    );
  }

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} className='flex-1 bg-white'>
      <ScreenHeader onBack={handleGoBack} title='Refeição manual' />
      <ManualMealForm apiErrorMessage={apiErrorMessage} control={control} />
      <ManualMealFooter isSubmitDisabled={isSubmitDisabled} onSubmit={handleSubmit} />
    </KeyboardAvoidingView>
  );
}
