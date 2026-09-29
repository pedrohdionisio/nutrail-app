import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GoalsFooter } from './components/GoalsFooter/GoalsFooter';
import { GoalsForm } from './components/GoalsForm/GoalsForm';
import { useGoalsController } from './useGoalsController';

const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : undefined;

export function Goals() {
  const { t } = useTranslation();
  const {
    control,
    mode,
    isCaloriesMode,
    apiErrorMessage,
    isUpdatingGoals,
    isSaveDisabled,
    handleSelectMode,
    handleGoBack,
    handleSave
  } = useGoalsController();

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} className='flex-1 bg-white'>
      <ScreenHeader onBack={handleGoBack} title={t('goals.title')} />

      <GoalsForm
        apiErrorMessage={apiErrorMessage}
        control={control}
        isCaloriesMode={isCaloriesMode}
        mode={mode}
        onSelectMode={handleSelectMode}
      />
      <GoalsFooter
        isSaveDisabled={isSaveDisabled}
        isSaving={isUpdatingGoals}
        onCancel={handleGoBack}
        onSave={handleSave}
      />
    </KeyboardAvoidingView>
  );
}
