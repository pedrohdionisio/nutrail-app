import { AppText } from 'presentation/components/AppText/AppText';
import { Input } from 'presentation/components/Input/Input';
import { ScrollView } from 'react-native';
import type { IGoalsFormProps } from './GoalsFormTypes';

export function GoalsForm({ control, apiErrorMessage }: IGoalsFormProps) {
  return (
    <ScrollView
      className='flex-1'
      contentContainerClassName='gap-8 px-5 py-8'
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <Input
        control={control}
        keyboardType='number-pad'
        label='Calorias'
        name='calories'
        unit='kcal'
      />
      <Input
        control={control}
        keyboardType='number-pad'
        label='Carboidratos'
        name='carbohydrate'
        unit='g'
      />
      <Input
        control={control}
        keyboardType='number-pad'
        label='Proteínas'
        name='protein'
        unit='g'
      />
      <Input control={control} keyboardType='number-pad' label='Gorduras' name='fat' unit='g' />

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}
    </ScrollView>
  );
}
