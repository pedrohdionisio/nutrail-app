import BookmarkIcon from 'lucide-react-native/icons/bookmark';
import { AppText } from 'presentation/components/AppText/AppText';
import { MacroStats } from 'presentation/components/MacroStats/MacroStats';
import { SwipeDeleteAction } from 'presentation/components/SwipeDeleteAction/SwipeDeleteAction';
import { ActivityIndicator, Pressable, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { COLORS } from 'shared/constants/colors';
import type { ISavedMealCardProps } from './SavedMealCardTypes';
import { useSavedMealCardController } from './useSavedMealCardController';

export function SavedMealCard({
  savedMeal,
  isCreating,
  isDisabled,
  onPress,
  onDelete
}: ISavedMealCardProps) {
  const { swipeableRef, itemsLabel, handlePress, handleDelete } = useSavedMealCardController({
    savedMeal,
    onPress,
    onDelete
  });

  return (
    <ReanimatedSwipeable
      enabled={!isDisabled}
      friction={2}
      overshootRight={false}
      ref={swipeableRef}
      renderRightActions={() => (
        <SwipeDeleteAction accessibilityLabel='Excluir refeição salva' onPress={handleDelete} />
      )}
      rightThreshold={40}
    >
      <Pressable
        accessibilityHint='Cadastra esta refeição'
        accessibilityRole='button'
        accessibilityState={{ disabled: isDisabled, busy: isCreating }}
        className='gap-4 rounded-2xl border border-gray-400 bg-white p-4 active:opacity-80'
        disabled={isDisabled}
        onPress={handlePress}
      >
        <View className='flex-row items-center gap-3'>
          <View className='h-12 w-12 items-center justify-center rounded-xl bg-gray-200'>
            {isCreating ? (
              <ActivityIndicator accessibilityLabel='Cadastrando' color={COLORS.lime[700]} />
            ) : (
              <BookmarkIcon color={COLORS.black[700]} size={20} strokeWidth={1.8} />
            )}
          </View>

          <View className='flex-1 gap-0.5'>
            <AppText numberOfLines={1} weight='medium'>
              {savedMeal.name}
            </AppText>

            <AppText color='muted' numberOfLines={2} size='bodySm'>
              {itemsLabel}
            </AppText>
          </View>
        </View>

        <MacroStats macros={savedMeal} />
      </Pressable>
    </ReanimatedSwipeable>
  );
}
