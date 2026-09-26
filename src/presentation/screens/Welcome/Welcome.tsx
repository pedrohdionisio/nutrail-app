import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { View } from 'react-native';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { AuthPrompt } from './components/AuthPrompt/AuthPrompt';
import { ForgotPasswordSheet } from './components/ForgotPasswordSheet/ForgotPasswordSheet';
import { ResetPasswordSheet } from './components/ResetPasswordSheet/ResetPasswordSheet';
import { SignInSheet } from './components/SignInSheet/SignInSheet';
import { WelcomeBackground } from './components/WelcomeBackground/WelcomeBackground';
import { useWelcomeController } from './useWelcomeController';

export function Welcome() {
  const {
    signInSheetRef,
    forgotPasswordSheetRef,
    resetPasswordSheetRef,
    resetPasswordEmail,
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
          Controle sua dieta de forma simples
        </AppText>

        <View className='gap-8'>
          <Button title='Criar Conta' />

          <View className='gap-4'>
            <AuthPrompt
              actionLabel='Acessar conta'
              onPress={handleOpenSignIn}
              question='Já tem conta?'
            />

            <AuthPrompt
              actionLabel='Recuperar senha'
              onPress={handleOpenForgotPassword}
              question='Esqueceu a senha?'
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
