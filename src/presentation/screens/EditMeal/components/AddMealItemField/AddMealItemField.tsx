import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { View } from 'react-native';
import type { IAddMealItemFieldProps } from './AddMealItemFieldTypes';
import { useAddMealItemFieldController } from './useAddMealItemFieldController';

export function AddMealItemField({ onAdd }: IAddMealItemFieldProps) {
  const { control, apiErrorMessage, isAnalyzingMealItems, isAddDisabled, handleAdd } =
    useAddMealItemFieldController({ onAdd });

  return (
    <View className='gap-3'>
      <Input
        control={control}
        label='Adicionar alimento'
        maxLength={500}
        name='text'
        placeholder='Ex.: 2 colheres de sopa de azeite'
      />

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}

      <Button
        disabled={isAddDisabled}
        isLoading={isAnalyzingMealItems}
        onPress={handleAdd}
        title='Adicionar'
        variant='secondary'
      />
    </View>
  );
}
