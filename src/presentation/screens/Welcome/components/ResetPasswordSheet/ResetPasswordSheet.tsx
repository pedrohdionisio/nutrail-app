import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { AuthSheet } from '../AuthSheet/AuthSheet';
import type { IResetPasswordSheetProps } from './ResetPasswordSheetTypes';
import { useResetPasswordSheetController } from './useResetPasswordSheetController';

export function ResetPasswordSheet({ sheetRef, email, onPasswordReset }: IResetPasswordSheetProps) {
  const { t } = useTranslation();
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
    <AuthSheet
      description={description}
      sheetRef={sheetRef}
      title={t('welcome.resetPasswordTitle')}
    >
      <Input
        autoComplete='one-time-code'
        control={control}
        keyboardType='number-pad'
        label={t('welcome.code')}
        maxLength={32}
        name='code'
      />

      <Input
        autoCapitalize='none'
        autoComplete='new-password'
        control={control}
        label={t('profile.newPassword')}
        name='password'
        secureTextEntry
      />

      <Input
        autoCapitalize='none'
        autoComplete='new-password'
        control={control}
        label={t('profile.newPasswordConfirmation')}
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
          title={t('profile.saveNewPassword')}
        />

        <Button
          isLoading={isRequestingPasswordReset}
          onPress={handleResendCode}
          title={t('welcome.resendCode')}
          variant='ghost'
        />
      </View>
    </AuthSheet>
  );
}
