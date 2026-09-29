import BookmarkPlusIcon from 'lucide-react-native/icons/bookmark-plus';
import ChevronLeftIcon from 'lucide-react-native/icons/chevron-left';
import ImagePlusIcon from 'lucide-react-native/icons/image-plus';
import PencilIcon from 'lucide-react-native/icons/pencil';
import TrashIcon from 'lucide-react-native/icons/trash';
import UtensilsIcon from 'lucide-react-native/icons/utensils';
import { AppText } from 'presentation/components/AppText/AppText';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from 'shared/constants/colors';
import type { IMealPictureProps } from './MealPictureTypes';

const BUTTON_TOP_SPACING = 8;

export function MealPicture({
  pictureUrl,
  isLoading,
  canEdit,
  canSave,
  canDelete,
  canChangePicture,
  isChangingPicture,
  onBack,
  onEdit,
  onSave,
  onDelete,
  onChangePicture
}: IMealPictureProps) {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  return (
    <View className='h-52 items-center justify-center bg-gray-200'>
      {pictureUrl && (
        <Image
          accessibilityIgnoresInvertColors
          accessibilityLabel={t('common.mealPicture')}
          className='absolute inset-0'
          resizeMode='cover'
          source={{ uri: pictureUrl }}
        />
      )}

      {!pictureUrl && !isLoading && !canChangePicture && (
        <UtensilsIcon color={COLORS.gray[600]} size={40} strokeWidth={1.8} />
      )}

      {!pictureUrl && canChangePicture && !isChangingPicture && (
        <Pressable
          accessibilityRole='button'
          className='items-center gap-3 active:opacity-70'
          onPress={onChangePicture}
        >
          <View className='h-12 w-12 items-center justify-center rounded-xl bg-white'>
            <ImagePlusIcon color={COLORS.black[700]} size={22} strokeWidth={1.8} />
          </View>

          <AppText weight='medium'>{t('common.addPicture')}</AppText>
        </Pressable>
      )}

      {isChangingPicture && (
        <View className='absolute inset-0 items-center justify-center bg-black-800/40'>
          <ActivityIndicator
            accessibilityLabel={t('mealDetails.sendingPicture')}
            color={COLORS.white}
          />
        </View>
      )}

      <Pressable
        accessibilityLabel={t('common.back')}
        accessibilityRole='button'
        className='absolute left-5 h-12 w-12 items-center justify-center rounded-xl bg-black-800/40 active:opacity-70'
        onPress={onBack}
        style={{ top: top + BUTTON_TOP_SPACING }}
      >
        <ChevronLeftIcon color={COLORS.white} size={24} strokeWidth={2} />
      </Pressable>

      <View className='absolute right-5 flex-row gap-3' style={{ top: top + BUTTON_TOP_SPACING }}>
        {canChangePicture && !!pictureUrl && (
          <Pressable
            accessibilityLabel={t('mealDetails.changePicture')}
            accessibilityRole='button'
            accessibilityState={{ disabled: isChangingPicture }}
            className='h-12 w-12 items-center justify-center rounded-xl bg-black-800/40 active:opacity-70'
            disabled={isChangingPicture}
            onPress={onChangePicture}
          >
            <ImagePlusIcon color={COLORS.white} size={20} strokeWidth={2} />
          </Pressable>
        )}

        {canEdit && (
          <Pressable
            accessibilityLabel={t('common.editMeal')}
            accessibilityRole='button'
            className='h-12 w-12 items-center justify-center rounded-xl bg-black-800/40 active:opacity-70'
            onPress={onEdit}
          >
            <PencilIcon color={COLORS.white} size={20} strokeWidth={2} />
          </Pressable>
        )}

        {canSave && (
          <Pressable
            accessibilityLabel={t('common.saveMeal')}
            accessibilityRole='button'
            className='h-12 w-12 items-center justify-center rounded-xl bg-black-800/40 active:opacity-70'
            onPress={onSave}
          >
            <BookmarkPlusIcon color={COLORS.white} size={20} strokeWidth={2} />
          </Pressable>
        )}

        {canDelete && (
          <Pressable
            accessibilityLabel={t('home.deleteMeal')}
            accessibilityRole='button'
            className='h-12 w-12 items-center justify-center rounded-xl bg-black-800/40 active:opacity-70'
            onPress={onDelete}
          >
            <TrashIcon color={COLORS.white} size={20} strokeWidth={2} />
          </Pressable>
        )}
      </View>
    </View>
  );
}
