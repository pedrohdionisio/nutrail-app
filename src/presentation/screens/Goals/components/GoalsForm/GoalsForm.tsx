import { AppText } from 'presentation/components/AppText/AppText';
import { Input } from 'presentation/components/Input/Input';
import { ScrollView } from 'react-native';
import { GoalsModeSelector } from '../GoalsModeSelector/GoalsModeSelector';
import type { IGoalsFormProps } from './GoalsFormTypes';

export function GoalsForm({
  control,
  mode,
  isCaloriesMode,
  apiErrorMessage,
  onSelectMode
}: IGoalsFormProps) {
  return (
    <ScrollView
      className='flex-1'
      contentContainerClassName='gap-8 px-5 py-8'
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <GoalsModeSelector mode={mode} onSelectMode={onSelectMode} />

      {isCaloriesMode ? (
        <>
          <Input
            control={control}
            keyboardType='number-pad'
            label='Calorias'
            name='calories'
            unit='kcal'
          />

          <AppText color='muted' size='bodySm'>
            Proteínas e gorduras continuam como estão; os carboidratos são ajustados para completar
            as calorias.
          </AppText>
        </>
      ) : (
        <>
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

          <AppText color='muted' size='bodySm'>
            As calorias passam a ser a soma dos macros.
          </AppText>
        </>
      )}

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}
    </ScrollView>
  );
}
