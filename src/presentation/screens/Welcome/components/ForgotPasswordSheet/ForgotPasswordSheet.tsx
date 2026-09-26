import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { AuthSheet } from '../AuthSheet/AuthSheet';
import type { IForgotPasswordSheetProps } from './ForgotPasswordSheetTypes';
import { useForgotPasswordSheetController } from './useForgotPasswordSheetController';

export function ForgotPasswordSheet({ sheetRef, onCodeSent }: IForgotPasswordSheetProps) {
  const { control, apiErrorMessage, isRequestingPasswordReset, isSubmitDisabled, handleSubmit } =
    useForgotPasswordSheetController({ onCodeSent });

  return (
    <AuthSheet
      description='Informe o e-mail da sua conta e enviaremos um código para você criar uma senha nova.'
      sheetRef={sheetRef}
      title='Recupere sua senha'
    >
      <Input
        autoCapitalize='none'
        autoComplete='email'
        autoCorrect={false}
        control={control}
        keyboardType='email-address'
        label='E-mail'
        name='email'
        onSubmitEditing={handleSubmit}
        returnKeyType='send'
      />

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}

      <Button
        className='mt-2'
        disabled={isSubmitDisabled}
        isLoading={isRequestingPasswordReset}
        onPress={handleSubmit}
        title='Enviar código'
      />
    </AuthSheet>
  );
}
