import { Button } from 'presentation/components/Button/Button';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IEditMealFooterProps } from './EditMealFooterTypes';

const FOOTER_BOTTOM_SPACING = 16;

export function EditMealFooter({
  isSaving,
  isSaveDisabled,
  onCancel,
  onSave
}: IEditMealFooterProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className='flex-row gap-4 border-gray-400 border-t bg-white px-5 pt-5'
      style={{ paddingBottom: bottom + FOOTER_BOTTOM_SPACING }}
    >
      <Button className='flex-1' onPress={onCancel} title='Cancelar' variant='secondary' />
      <Button
        className='flex-1'
        disabled={isSaveDisabled}
        isLoading={isSaving}
        onPress={onSave}
        title='Salvar'
      />
    </View>
  );
}
