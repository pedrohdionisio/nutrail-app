import CheckIcon from 'lucide-react-native/icons/check';
import TrashIcon from 'lucide-react-native/icons/trash';
import { View } from 'react-native';
import { ActionButton } from '../ActionButton/ActionButton';
import type { IReviewActionsProps } from './ReviewActionsTypes';

export function ReviewActions({ onDiscard, onConfirm }: IReviewActionsProps) {
  return (
    <View className='flex-row justify-center gap-12'>
      <ActionButton accessibilityLabel='Descartar foto' icon={TrashIcon} onPress={onDiscard} />
      <ActionButton
        accessibilityLabel='Confirmar foto'
        icon={CheckIcon}
        onPress={onConfirm}
        variant='primary'
      />
    </View>
  );
}
