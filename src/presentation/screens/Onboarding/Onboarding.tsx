import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { AccountFields } from './components/AccountFields/AccountFields';
import { BirthDateField } from './components/BirthDateField/BirthDateField';
import { NextButton } from './components/NextButton/NextButton';
import { OnboardingStep } from './components/OnboardingStep/OnboardingStep';
import { OptionsField } from './components/OptionsField/OptionsField';
import { Personalizing } from './components/Personalizing/Personalizing';
import { PlanSummary } from './components/PlanSummary/PlanSummary';
import {
  ACTIVITY_LEVEL_OPTIONS,
  GENDER_OPTIONS,
  GOAL_OPTIONS
} from './constants/onboardingOptions';
import { useOnboardingController } from './useOnboardingController';

export function Onboarding() {
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
      description={currentStep.description}
      footer={
        stepId === 'account' ? (
          <Button
            disabled={isNextDisabled}
            isLoading={isSigningUp}
            onPress={handleCreateAccount}
            title='Criar conta'
          />
        ) : (
          <NextButton disabled={isNextDisabled} onPress={handleNext} />
        )
      }
      onBack={handleGoBack}
      progress={progress}
      title={currentStep.title}
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
          label='Altura (cm)'
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
          label='Peso (kg)'
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
