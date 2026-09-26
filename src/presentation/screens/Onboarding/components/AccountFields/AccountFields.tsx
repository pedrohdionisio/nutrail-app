import { AppText } from 'presentation/components/AppText/AppText';
import { Input } from 'presentation/components/Input/Input';
import { View } from 'react-native';
import type { IAccountFieldsProps } from './AccountFieldsTypes';

export function AccountFields({ control, apiErrorMessage }: IAccountFieldsProps) {
  return (
    <View className='gap-6'>
      <Input
        autoCapitalize='words'
        autoComplete='name'
        control={control}
        label='Nome'
        name='name'
        placeholder='Seu nome'
      />

      <Input
        autoCapitalize='none'
        autoComplete='email'
        autoCorrect={false}
        control={control}
        keyboardType='email-address'
        label='E-mail'
        name='email'
        placeholder='voce@email.com'
      />

      <Input
        autoCapitalize='none'
        autoComplete='new-password'
        control={control}
        label='Senha'
        name='password'
        placeholder='Mínimo 8 caracteres'
        secureTextEntry
      />

      <Input
        autoCapitalize='none'
        autoComplete='new-password'
        control={control}
        label='Confirmar Senha'
        name='passwordConfirmation'
        placeholder='Mínimo 8 caracteres'
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
