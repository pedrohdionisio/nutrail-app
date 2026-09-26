import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import type { IHandleCodeSentParams } from './WelcomeTypes';

export function useWelcomeController() {
  const signInSheetRef = useRef<BottomSheetModal>(null);
  const forgotPasswordSheetRef = useRef<BottomSheetModal>(null);
  const resetPasswordSheetRef = useRef<BottomSheetModal>(null);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');

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
    handleOpenSignIn,
    handleOpenForgotPassword,
    handleCodeSent,
    handlePasswordReset
  };
}
