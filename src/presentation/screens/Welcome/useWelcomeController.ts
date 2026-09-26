import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import type { IHandleCodeSentParams } from './WelcomeTypes';

export function useWelcomeController() {
  const navigation = useNavigation();
  const signInSheetRef = useRef<BottomSheetModal>(null);
  const forgotPasswordSheetRef = useRef<BottomSheetModal>(null);
  const resetPasswordSheetRef = useRef<BottomSheetModal>(null);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');

  function handleCreateAccount() {
    navigation.navigate('Onboarding');
  }

  function handleOpenSignIn() {
    signInSheetRef.current?.present();
  }

  function handleOpenForgotPassword() {
    forgotPasswordSheetRef.current?.present();
  }

  function handleCodeSent({ email }: IHandleCodeSentParams) {
    setResetPasswordEmail(email);
    resetPasswordSheetRef.current?.present();
  }

  function handlePasswordReset() {
    signInSheetRef.current?.present();
  }

  return {
    signInSheetRef,
    forgotPasswordSheetRef,
    resetPasswordSheetRef,
    resetPasswordEmail,
    handleCreateAccount,
    handleOpenSignIn,
    handleOpenForgotPassword,
    handleCodeSent,
    handlePasswordReset
  };
}
