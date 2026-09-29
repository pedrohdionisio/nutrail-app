import ImagePlusIcon from 'lucide-react-native/icons/image-plus';
import XIcon from 'lucide-react-native/icons/x';
import { AppText } from 'presentation/components/AppText/AppText';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IMealPictureFieldProps } from './MealPictureFieldTypes';
import { useMealPictureFieldController } from './useMealPictureFieldController';

const HIT_SLOP = 8;

export function MealPictureField({ control }: IMealPictureFieldProps) {
  const { t } = useTranslation();
  const { pictureUri, isPicking, handlePick, handleRemove } = useMealPictureFieldController({
    control
  });

  return (
    <View className='gap-2'>
      <AppText size='bodySm'>{t('manualMeal.optionalPicture')}</AppText>

      {pictureUri ? (
        <View>
          <Image
            accessibilityIgnoresInvertColors
            accessibilityLabel={t('common.mealPicture')}
            className='h-48 w-full rounded-2xl bg-gray-200'
            source={{ uri: pictureUri }}
          />

          <Pressable
            accessibilityLabel={t('manualMeal.removePicture')}
            accessibilityRole='button'
            className='absolute top-3 right-3 h-9 w-9 items-center justify-center rounded-full bg-white/90 active:opacity-70'
            hitSlop={HIT_SLOP}
            onPress={handleRemove}
          >
            <XIcon color={COLORS.black[700]} size={18} strokeWidth={2} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          accessibilityLabel={t('common.addPicture')}
          accessibilityRole='button'
          accessibilityState={{ busy: isPicking }}
          className='h-32 items-center justify-center gap-3 rounded-2xl border border-gray-400 border-dashed bg-gray-100 active:opacity-70'
          disabled={isPicking}
          onPress={handlePick}
        >
          {isPicking ? (
            <ActivityIndicator color={COLORS.lime[700]} />
          ) : (
            <>
              <View className='h-12 w-12 items-center justify-center rounded-xl bg-gray-200'>
                <ImagePlusIcon color={COLORS.black[700]} size={22} strokeWidth={1.8} />
              </View>

              <AppText weight='medium'>{t('common.addPicture')}</AppText>
            </>
          )}
        </Pressable>
      )}
    </View>
  );
}
