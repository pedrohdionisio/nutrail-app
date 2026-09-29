import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { IAddMealItemFieldProps } from './AddMealItemFieldTypes';
import { useAddMealItemFieldController } from './useAddMealItemFieldController';

export function AddMealItemField({ onAdd }: IAddMealItemFieldProps) {
  const { t } = useTranslation();
  const { control, apiErrorMessage, isAnalyzingMealItems, isAddDisabled, handleAdd } =
    useAddMealItemFieldController({ onAdd });

  return (
    <View className='gap-3'>
      <Input
        control={control}
        label={t('editMeal.addFood')}
        maxLength={500}
        name='text'
        placeholder={t('editMeal.addFoodPlaceholder')}
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
        title={t('editMeal.add')}
        variant='secondary'
      />
    </View>
  );
}
