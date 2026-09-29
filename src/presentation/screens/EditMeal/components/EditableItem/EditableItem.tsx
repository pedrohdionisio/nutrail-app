import TrashIcon from 'lucide-react-native/icons/trash';
import { Input } from 'presentation/components/Input/Input';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IEditableItemProps } from './EditableItemTypes';

export function EditableItem({ control, index, name, unit, onRemove }: IEditableItemProps) {
  const { t } = useTranslation();
  return (
    <View className='flex-row items-start gap-2'>
      <View className='flex-1'>
        <Input
          control={control}
          keyboardType='decimal-pad'
          label={name}
          maxLength={9}
          name={`items.${index}.quantity`}
          unit={unit}
        />
      </View>

      <Pressable
        accessibilityLabel={t('editMeal.removeItem', { name })}
        accessibilityRole='button'
        className='mt-7 h-13 w-13 items-center justify-center rounded-xl bg-gray-300 active:opacity-70'
        onPress={() => onRemove({ index })}
      >
        <TrashIcon color={COLORS.black[700]} size={20} strokeWidth={1.8} />
      </Pressable>
    </View>
  );
}
