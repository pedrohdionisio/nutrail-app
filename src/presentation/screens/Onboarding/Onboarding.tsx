import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { OptionsField } from 'presentation/components/OptionsField/OptionsField';
import {
  ACTIVITY_LEVEL_OPTIONS,
  GENDER_OPTIONS,
  GOAL_OPTIONS
} from 'presentation/constants/profileOptions';
import { useTranslation } from 'react-i18next';
import { AccountFields } from './components/AccountFields/AccountFields';
import { BirthDateField } from './components/BirthDateField/BirthDateField';
import { NextButton } from './components/NextButton/NextButton';
import { OnboardingStep } from './components/OnboardingStep/OnboardingStep';
import { Personalizing } from './components/Personalizing/Personalizing';
import { PlanSummary } from './components/PlanSummary/PlanSummary';
import { useOnboardingController } from './useOnboardingController';

export function Onboarding() {
  const { t } = useTranslation();
  const {
    stepId,
    currentStep,
    progress,
    control,
    me,
    isPersonalizing,
    isMeError,
    isSigningUp,
    isNextDisabled,
    apiErrorMessage,
    handleGoBack,
    handleNext,
    handleCreateAccount,
    handleRetry,
    handleStart
  } = useOnboardingController();

  if (me) {
    return <PlanSummary me={me} onStart={handleStart} />;
  }

  if (isPersonalizing) {
    return <Personalizing isError={isMeError} onRetry={handleRetry} />;
  }

  return (
    <OnboardingStep
      contentAlignment={currentStep.contentAlignment}
      description={currentStep.description && t(currentStep.description)}
      footer={
        stepId === 'account' ? (
          <Button
            disabled={isNextDisabled}
            isLoading={isSigningUp}
            onPress={handleCreateAccount}
            title={t('onboarding.createAccount')}
          />
        ) : (
          <NextButton disabled={isNextDisabled} onPress={handleNext} />
        )
      }
      onBack={handleGoBack}
      progress={progress}
      title={t(currentStep.title)}
    >
      {stepId === 'goal' && (
        <OptionsField control={control} name='goal' options={GOAL_OPTIONS} orientation='row' />
      )}

      {stepId === 'gender' && (
        <OptionsField
          control={control}
          name='gender'
          options={GENDER_OPTIONS}
          orientation='column'
        />
      )}

      {stepId === 'birthDate' && <BirthDateField control={control} />}

      {stepId === 'height' && (
        <Input
          autoFocus
          control={control}
          keyboardType='number-pad'
          label={t('onboarding.heightLabel')}
          maxLength={3}
          name='height'
          placeholder='175'
        />
      )}

      {stepId === 'weight' && (
        <Input
          autoFocus
          control={control}
          keyboardType='decimal-pad'
          label={t('onboarding.weightLabel')}
          maxLength={6}
          name='weight'
          placeholder='80'
        />
      )}

      {stepId === 'activityLevel' && (
        <OptionsField
          control={control}
          name='activityLevel'
          options={ACTIVITY_LEVEL_OPTIONS}
          orientation='row'
        />
      )}

      {stepId === 'account' && (
        <AccountFields apiErrorMessage={apiErrorMessage} control={control} />
      )}
    </OnboardingStep>
  );
}
