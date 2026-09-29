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
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { maskDate } from 'shared/utils/maskDate';
import { LanguageField } from '../LanguageField/LanguageField';
import type { IProfileFormProps } from './ProfileFormTypes';

export function ProfileForm({
  control,
  initials,
  apiErrorMessage,
  language,
  onSelectLanguage,
  onChangePassword,
  onDeleteAccount
}: IProfileFormProps) {
  const { t } = useTranslation();

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
        label={t('profile.name')}
        name='name'
        returnKeyType='next'
      />
      <Input
        control={control}
        keyboardType='number-pad'
        label={t('profile.birthDate')}
        mask={maskDate}
        maxLength={10}
        name='birthDate'
        placeholder={t('common.dateInputPlaceholder')}
      />
      <Input
        control={control}
        keyboardType='number-pad'
        label={t('profile.height')}
        name='height'
        unit='cm'
      />
      <Input
        control={control}
        keyboardType='decimal-pad'
        label={t('profile.weight')}
        name='weight'
        unit='kg'
      />
      <OptionsField
        control={control}
        label={t('profile.gender')}
        name='gender'
        options={GENDER_OPTIONS}
        orientation='column'
      />
      <OptionsField
        control={control}
        label={t('profile.goal')}
        name='goal'
        options={GOAL_OPTIONS}
        orientation='column'
      />
      <OptionsField
        control={control}
        label={t('profile.activityLevel')}
        name='activityLevel'
        options={ACTIVITY_LEVEL_OPTIONS}
        orientation='row'
      />

      <AppText color='muted' size='bodySm'>
        {t('profile.goalsRecalculated')}
      </AppText>

      <LanguageField language={language} onSelectLanguage={onSelectLanguage} />

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}

      <View className='gap-2'>
        <Button
          onPress={onChangePassword}
          title={t('profile.changePassword')}
          variant='secondary'
        />
        <Button onPress={onDeleteAccount} title={t('profile.deleteAccount')} variant='ghost' />
      </View>
    </ScrollView>
  );
}
