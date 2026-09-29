import { AppText } from 'presentation/components/AppText/AppText';
import { Input } from 'presentation/components/Input/Input';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { IAccountFieldsProps } from './AccountFieldsTypes';

export function AccountFields({ control, apiErrorMessage }: IAccountFieldsProps) {
  const { t } = useTranslation();
  return (
    <View className='gap-6'>
      <Input
        autoCapitalize='words'
        autoComplete='name'
        control={control}
        label={t('onboarding.name')}
        name='name'
        placeholder={t('onboarding.namePlaceholder')}
      />

      <Input
        autoCapitalize='none'
        autoComplete='email'
        autoCorrect={false}
        control={control}
        keyboardType='email-address'
        label={t('common.email')}
        name='email'
        placeholder={t('onboarding.emailPlaceholder')}
      />

      <Input
        autoCapitalize='none'
        autoComplete='new-password'
        control={control}
        label={t('common.password')}
        name='password'
        placeholder={t('onboarding.passwordPlaceholder')}
        secureTextEntry
      />

      <Input
        autoCapitalize='none'
        autoComplete='new-password'
        control={control}
        label={t('onboarding.passwordConfirmation')}
        name='passwordConfirmation'
        placeholder={t('onboarding.passwordPlaceholder')}
        secureTextEntry
      />

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}
    </View>
  );
}
