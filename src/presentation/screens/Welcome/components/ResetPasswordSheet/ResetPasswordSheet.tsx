import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { View } from 'react-native';
import { AuthSheet } from '../AuthSheet/AuthSheet';
import type { IResetPasswordSheetProps } from './ResetPasswordSheetTypes';
import { useResetPasswordSheetController } from './useResetPasswordSheetController';

export function ResetPasswordSheet({ sheetRef, email, onPasswordReset }: IResetPasswordSheetProps) {
  const {
    description,
    control,
    apiErrorMessage,
    isResettingPassword,
    isRequestingPasswordReset,
    isSubmitDisabled,
    handleResendCode,
    handleSubmit
  } = useResetPasswordSheetController({ email, onPasswordReset });

  return (
    <AuthSheet description={description} sheetRef={sheetRef} title='Crie uma nova senha'>
      <Input
        autoComplete='one-time-code'
        control={control}
        keyboardType='number-pad'
        label='Código'
        maxLength={32}
        name='code'
      />

      <Input
        autoCapitalize='none'
        autoComplete='new-password'
        control={control}
        label='Nova senha'
        name='password'
        secureTextEntry
      />

      <Input
        autoCapitalize='none'
        autoComplete='new-password'
        control={control}
        label='Confirme a nova senha'
        name='passwordConfirmation'
        secureTextEntry
      />

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}

      <View className='mt-2 gap-2'>
        <Button
          disabled={isSubmitDisabled}
          isLoading={isResettingPassword}
          onPress={handleSubmit}
          title='Salvar nova senha'
        />

        <Button
          isLoading={isRequestingPasswordReset}
          onPress={handleResendCode}
          title='Reenviar código'
          variant='ghost'
        />
      </View>
    </AuthSheet>
  );
}
