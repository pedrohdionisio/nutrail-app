import ChevronLeftIcon from 'lucide-react-native/icons/chevron-left';
import PencilIcon from 'lucide-react-native/icons/pencil';
import UtensilsIcon from 'lucide-react-native/icons/utensils';
import { Image, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from 'shared/constants/colors';
import type { IMealPictureProps } from './MealPictureTypes';

const BUTTON_TOP_SPACING = 8;

export function MealPicture({ pictureUrl, isLoading, canEdit, onBack, onEdit }: IMealPictureProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View className='h-52 items-center justify-center bg-gray-200'>
      {pictureUrl && (
        <Image
          accessibilityIgnoresInvertColors
          accessibilityLabel='Foto da refeição'
          className='absolute inset-0'
          resizeMode='cover'
          source={{ uri: pictureUrl }}
        />
      )}

      {!pictureUrl && !isLoading && (
        <UtensilsIcon color={COLORS.gray[600]} size={40} strokeWidth={1.8} />
      )}

      <Pressable
        accessibilityLabel='Voltar'
        accessibilityRole='button'
        className='absolute left-5 h-12 w-12 items-center justify-center rounded-xl bg-black-800/40 active:opacity-70'
        onPress={onBack}
        style={{ top: top + BUTTON_TOP_SPACING }}
      >
        <ChevronLeftIcon color={COLORS.white} size={24} strokeWidth={2} />
      </Pressable>

      {canEdit && (
        <Pressable
          accessibilityLabel='Editar refeição'
          accessibilityRole='button'
          className='absolute right-5 h-12 w-12 items-center justify-center rounded-xl bg-black-800/40 active:opacity-70'
          onPress={onEdit}
          style={{ top: top + BUTTON_TOP_SPACING }}
        >
          <PencilIcon color={COLORS.white} size={20} strokeWidth={2} />
        </Pressable>
      )}
    </View>
  );
}
