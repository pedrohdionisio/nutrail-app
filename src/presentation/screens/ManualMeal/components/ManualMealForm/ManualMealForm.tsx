import { AppText } from 'presentation/components/AppText/AppText';
import { Input } from 'presentation/components/Input/Input';
import { ScrollView, View } from 'react-native';
import { maskDate } from 'shared/utils/maskDate';
import { maskTime } from '../../utils/maskTime';
import { MealPictureField } from '../MealPictureField/MealPictureField';
import type { IManualMealFormProps } from './ManualMealFormTypes';

export function ManualMealForm({ control, apiErrorMessage }: IManualMealFormProps) {
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
        label='O que você comeu?'
        maxLength={1000}
        multiline
        name='text'
        placeholder='Ex.: 2 ovos mexidos, 1 pão francês com manteiga e um café com leite'
        textAlignVertical='top'
      />

      <View className='flex-row gap-4'>
        <View className='flex-1'>
          <Input
            control={control}
            keyboardType='number-pad'
            label='Data'
            mask={maskDate}
            maxLength={10}
            name='date'
            placeholder='DD/MM/AAAA'
          />
        </View>

        <View className='flex-1'>
          <Input
            control={control}
            keyboardType='number-pad'
            label='Horário'
            mask={maskTime}
            maxLength={5}
            name='time'
            placeholder='HH:MM'
          />
        </View>
      </View>

      <MealPictureField control={control} />

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}
    </ScrollView>
  );
}
