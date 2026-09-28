import { AppText } from 'presentation/components/AppText/AppText';
import { Input } from 'presentation/components/Input/Input';
import { ScrollView } from 'react-native';
import type { ISuggestRecipeFormProps } from './SuggestRecipeFormTypes';

export function SuggestRecipeForm({ control, apiErrorMessage }: ISuggestRecipeFormProps) {
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
        label='O que você tem em casa?'
        maxLength={1000}
        multiline
        name='text'
        placeholder='Ex.: meio queijo mussarela, 5 ovos, 1 tomate e um pouco de presunto'
        textAlignVertical='top'
      />

      <AppText color='muted' size='bodySm'>
        A receita considera o seu objetivo e o que ainda falta das suas metas de hoje. Se quiser,
        diga o tamanho, como “cerca de 400 kcal”.
      </AppText>

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}
    </ScrollView>
  );
}
