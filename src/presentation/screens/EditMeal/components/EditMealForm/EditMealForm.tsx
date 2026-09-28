import { AppText } from 'presentation/components/AppText/AppText';
import { Input } from 'presentation/components/Input/Input';
import { ScrollView, View } from 'react-native';
import { maskDate } from 'shared/utils/maskDate';
import { maskTime } from 'shared/utils/maskTime';
import { AddMealItemField } from '../AddMealItemField/AddMealItemField';
import { EditableItem } from '../EditableItem/EditableItem';
import type { IEditMealFormProps } from './EditMealFormTypes';

export function EditMealForm({
  control,
  items,
  shouldShowEmptyItems,
  apiErrorMessage,
  onRemoveItem,
  onAddItems
}: IEditMealFormProps) {
  return (
    <ScrollView
      className='flex-1'
      contentContainerClassName='gap-8 px-5 py-8'
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <Input control={control} label='Nome da refeição' maxLength={120} name='name' />

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

      <View className='gap-5'>
        <AppText accessibilityRole='header' size='caption'>
          Itens
        </AppText>

        {items.map((item, index) => (
          <EditableItem
            control={control}
            index={index}
            key={item.id}
            name={item.name}
            onRemove={onRemoveItem}
            unit={item.unit}
          />
        ))}

        {shouldShowEmptyItems && (
          <AppText color='muted'>Adicione pelo menos um alimento para salvar a refeição.</AppText>
        )}
      </View>

      <AddMealItemField onAdd={onAddItems} />

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}
    </ScrollView>
  );
}
