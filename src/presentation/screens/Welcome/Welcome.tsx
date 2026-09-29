import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { AuthPrompt } from './components/AuthPrompt/AuthPrompt';
import { ForgotPasswordSheet } from './components/ForgotPasswordSheet/ForgotPasswordSheet';
import { ResetPasswordSheet } from './components/ResetPasswordSheet/ResetPasswordSheet';
import { SignInSheet } from './components/SignInSheet/SignInSheet';
import { WelcomeBackground } from './components/WelcomeBackground/WelcomeBackground';
import { useWelcomeController } from './useWelcomeController';

export function Welcome() {
  const { t } = useTranslation();
  const {
    signInSheetRef,
    forgotPasswordSheetRef,
    resetPasswordSheetRef,
    resetPasswordEmail,
    handleCreateAccount,
    handleOpenSignIn,
    handleOpenForgotPassword,
    handleCodeSent,
    handlePasswordReset
  } = useWelcomeController();
  const { paddingBottom } = useScreenPadding();

  return (
    <WelcomeBackground>
      <View className='gap-10 px-5' style={{ paddingBottom }}>
        <AppText accessibilityRole='header' align='center' color='inverse' size='title1'>
          {t('welcome.title')}
        </AppText>

        <View className='gap-8'>
          <Button onPress={handleCreateAccount} title={t('welcome.createAccount')} />

          <View className='gap-4'>
            <AuthPrompt
              actionLabel={t('welcome.signInAction')}
              onPress={handleOpenSignIn}
              question={t('welcome.haveAccount')}
            />

            <AuthPrompt
              actionLabel={t('welcome.recoverPasswordAction')}
              onPress={handleOpenForgotPassword}
              question={t('welcome.forgotPassword')}
            />
          </View>
        </View>
      </View>

      <SignInSheet sheetRef={signInSheetRef} />

      <ForgotPasswordSheet onCodeSent={handleCodeSent} sheetRef={forgotPasswordSheetRef} />

      <ResetPasswordSheet
        email={resetPasswordEmail}
        onPasswordReset={handlePasswordReset}
        sheetRef={resetPasswordSheetRef}
      />
    </WelcomeBackground>
  );
}
