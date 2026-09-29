import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { useTranslation } from 'react-i18next';
import { AuthSheet } from '../AuthSheet/AuthSheet';
import type { ISignInSheetProps } from './SignInSheetTypes';
import { useSignInSheetController } from './useSignInSheetController';

export function SignInSheet({ sheetRef }: ISignInSheetProps) {
  const { t } = useTranslation();
  const { control, apiErrorMessage, isSigningIn, isSubmitDisabled, handleSubmit } =
    useSignInSheetController();

  return (
    <AuthSheet sheetRef={sheetRef} title={t('welcome.signInTitle')}>
      <Input
        autoCapitalize='none'
        autoComplete='email'
        autoCorrect={false}
        control={control}
        keyboardType='email-address'
        label={t('common.email')}
        name='email'
        returnKeyType='next'
      />

      <Input
        autoCapitalize='none'
        autoComplete='current-password'
        control={control}
        label={t('common.password')}
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
        title={t('welcome.signIn')}
      />
    </AuthSheet>
  );
}
