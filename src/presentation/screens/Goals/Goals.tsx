import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GoalsFallback } from './components/GoalsFallback/GoalsFallback';
import { GoalsFooter } from './components/GoalsFooter/GoalsFooter';
import { GoalsForm } from './components/GoalsForm/GoalsForm';
import { useGoalsController } from './useGoalsController';

const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : undefined;

export function Goals() {
  const {
    control,
    shouldShowForm,
    isLoadingMe,
    isRefetchingMe,
    apiErrorMessage,
    isUpdatingGoals,
    isSaveDisabled,
    handleGoBack,
    handleRetry,
    handleSave
  } = useGoalsController();

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} className='flex-1 bg-white'>
      <ScreenHeader onBack={handleGoBack} title='Suas Metas' />

      {shouldShowForm ? (
        <>
          <GoalsForm apiErrorMessage={apiErrorMessage} control={control} />
          <GoalsFooter
            isSaveDisabled={isSaveDisabled}
            isSaving={isUpdatingGoals}
            onCancel={handleGoBack}
            onSave={handleSave}
          />
        </>
      ) : (
        <GoalsFallback isLoading={isLoadingMe} isRetrying={isRefetchingMe} onRetry={handleRetry} />
      )}
    </KeyboardAvoidingView>
  );
}
