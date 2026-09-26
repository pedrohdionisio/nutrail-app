import { AppText } from 'presentation/components/AppText/AppText';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { OnboardingHeader } from '../OnboardingHeader/OnboardingHeader';
import { onboardingContentVariants } from './OnboardingStepStyles';
import type { IOnboardingStepProps } from './OnboardingStepTypes';

const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : undefined;

export function OnboardingStep({
  title,
  description,
  contentAlignment,
  progress,
  footer,
  onBack,
  children
}: IOnboardingStepProps) {
  const { paddingTop, paddingBottom } = useScreenPadding();

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} className='flex-1 bg-white'>
      <View className='px-5' style={{ paddingTop: paddingTop - 16 }}>
        <OnboardingHeader onBack={onBack} progress={progress} />
      </View>

      <ScrollView
        className='flex-1'
        contentContainerClassName='grow px-5 pt-8'
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <View className='gap-4'>
          <AppText accessibilityRole='header' align='center' size='title1'>
            {title}
          </AppText>

          {!!description && (
            <AppText align='center' color='muted'>
              {description}
            </AppText>
          )}
        </View>

        <View className={onboardingContentVariants({ contentAlignment })}>{children}</View>
      </ScrollView>

      <View className='px-5 pt-4' style={{ paddingBottom }}>
        {footer}
      </View>
    </KeyboardAvoidingView>
  );
}
