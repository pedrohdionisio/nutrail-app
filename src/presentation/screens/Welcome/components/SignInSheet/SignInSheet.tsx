import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { AuthSheet } from '../AuthSheet/AuthSheet';
import type { ISignInSheetProps } from './SignInSheetTypes';
import { useSignInSheetController } from './useSignInSheetController';

export function SignInSheet({ sheetRef }: ISignInSheetProps) {
  const { control, apiErrorMessage, isSigningIn, isSubmitDisabled, handleSubmit } =
    useSignInSheetController();

  return (
    <AuthSheet sheetRef={sheetRef} title='Entre em sua conta'>
      <Input
        autoCapitalize='none'
        autoComplete='email'
        autoCorrect={false}
        control={control}
        keyboardType='email-address'
        label='E-mail'
        name='email'
        returnKeyType='next'
      />

      <Input
        autoCapitalize='none'
        autoComplete='current-password'
        control={control}
        label='Senha'
        name='password'
        onSubmitEditing={handleSubmit}
        returnKeyType='done'
        secureTextEntry
      />

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}

      <Button
        className='mt-2'
        disabled={isSubmitDisabled}
        isLoading={isSigningIn}
        onPress={handleSubmit}
        title='Entrar'
      />
    </AuthSheet>
  );
}
