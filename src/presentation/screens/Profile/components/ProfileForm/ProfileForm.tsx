import { AppText } from 'presentation/components/AppText/AppText';
import { Avatar } from 'presentation/components/Avatar/Avatar';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { OptionsField } from 'presentation/components/OptionsField/OptionsField';
import {
  ACTIVITY_LEVEL_OPTIONS,
  GENDER_OPTIONS,
  GOAL_OPTIONS
} from 'presentation/constants/profileOptions';
import { ScrollView, View } from 'react-native';
import { maskDate } from 'shared/utils/maskDate';
import type { IProfileFormProps } from './ProfileFormTypes';

export function ProfileForm({
  control,
  initials,
  apiErrorMessage,
  onChangePassword,
  onDeleteAccount
}: IProfileFormProps) {
  return (
    <ScrollView
      className='flex-1'
      contentContainerClassName='gap-6 px-5 py-8'
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <View className='items-center pb-2'>
        <Avatar initials={initials} size='lg' />
      </View>

      <Input
        autoCapitalize='words'
        autoComplete='name'
        control={control}
        label='Nome'
        name='name'
        returnKeyType='next'
      />
      <Input
        control={control}
        keyboardType='number-pad'
        label='Data de nascimento'
        mask={maskDate}
        maxLength={10}
        name='birthDate'
        placeholder='DD/MM/AAAA'
      />
      <Input control={control} keyboardType='number-pad' label='Altura' name='height' unit='cm' />
      <Input control={control} keyboardType='decimal-pad' label='Peso' name='weight' unit='kg' />
      <OptionsField
        control={control}
        label='Sexo'
        name='gender'
        options={GENDER_OPTIONS}
        orientation='column'
      />
      <OptionsField
        control={control}
        label='Objetivo'
        name='goal'
        options={GOAL_OPTIONS}
        orientation='column'
      />
      <OptionsField
        control={control}
        label='Nível de atividade'
        name='activityLevel'
        options={ACTIVITY_LEVEL_OPTIONS}
        orientation='row'
      />

      <AppText color='muted' size='bodySm'>
        Ao salvar, suas metas de calorias e macros são recalculadas a partir destes dados.
      </AppText>

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}

      <View className='gap-2'>
        <Button onPress={onChangePassword} title='Alterar senha' variant='secondary' />
        <Button onPress={onDeleteAccount} title='Excluir conta' variant='ghost' />
      </View>
    </ScrollView>
  );
}
