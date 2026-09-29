import { AppText } from 'presentation/components/AppText/AppText';
import { Input } from 'presentation/components/Input/Input';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import type { ISuggestRecipeFormProps } from './SuggestRecipeFormTypes';

export function SuggestRecipeForm({ control, apiErrorMessage }: ISuggestRecipeFormProps) {
  const { t } = useTranslation();
  return (
    <ScrollView
      className='flex-1'
      contentContainerClassName='gap-6 px-5 py-8'
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <Input
        className='h-32 py-3'
        control={control}
        label={t('recipes.whatDoYouHave')}
        maxLength={1000}
        multiline
        name='text'
        placeholder={t('recipes.ingredientsPlaceholder')}
        textAlignVertical='top'
      />

      <AppText color='muted' size='bodySm'>
        {t('recipes.suggestHint')}
      </AppText>

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}
    </ScrollView>
  );
}
