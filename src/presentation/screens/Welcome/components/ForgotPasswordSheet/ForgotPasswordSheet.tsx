import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { useTranslation } from 'react-i18next';
import { AuthSheet } from '../AuthSheet/AuthSheet';
import type { IForgotPasswordSheetProps } from './ForgotPasswordSheetTypes';
import { useForgotPasswordSheetController } from './useForgotPasswordSheetController';

export function ForgotPasswordSheet({ sheetRef, onCodeSent }: IForgotPasswordSheetProps) {
  const { t } = useTranslation();
  const { control, apiErrorMessage, isRequestingPasswordReset, isSubmitDisabled, handleSubmit } =
    useForgotPasswordSheetController({ onCodeSent });

  return (
    <AuthSheet
      description={t('welcome.forgotPasswordDescription')}
      sheetRef={sheetRef}
      title={t('welcome.forgotPasswordTitle')}
    >
      <Input
        autoCapitalize='none'
        autoComplete='email'
        autoCorrect={false}
        control={control}
        keyboardType='email-address'
        label={t('common.email')}
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
        title={t('welcome.sendCode')}
      />
    </AuthSheet>
  );
}
