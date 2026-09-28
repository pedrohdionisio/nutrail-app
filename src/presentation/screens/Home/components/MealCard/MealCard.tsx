import { AppText } from 'presentation/components/AppText/AppText';
import { MacroStats } from 'presentation/components/MacroStats/MacroStats';
import { Pressable, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { COLORS } from 'shared/constants/colors';
import { MealCardDeleteAction } from './components/MealCardDeleteAction/MealCardDeleteAction';
import { MEAL_INPUT_ICONS } from './constants/mealInputIcons';
import type { IMealCardProps } from './MealCardTypes';
import { useMealCardController } from './useMealCardController';
import { formatMealTime } from './utils/formatMealTime';

export function MealCard({ meal, onPress, onDelete }: IMealCardProps) {
  const { id, name, inputType, createdAt } = meal;
  const InputIcon = MEAL_INPUT_ICONS[inputType];
  const { swipeableRef, handlePress, handleDelete } = useMealCardController({
    mealId: id,
    onPress,
    onDelete
  });

  return (
    <ReanimatedSwipeable
      friction={2}
      overshootRight={false}
      ref={swipeableRef}
      renderRightActions={() => <MealCardDeleteAction onPress={handleDelete} />}
      rightThreshold={40}
    >
      <Pressable
        accessibilityHint='Abre os detalhes da refeição'
        accessibilityRole='button'
        className='gap-4 rounded-2xl border border-gray-400 bg-white p-4 active:opacity-80'
        onPress={handlePress}
      >
        <View className='flex-row items-center gap-3'>
          <View className='h-12 w-12 items-center justify-center rounded-xl bg-gray-200'>
            <InputIcon color={COLORS.black[700]} size={20} strokeWidth={1.8} />
          </View>

          <View className='flex-1 gap-0.5'>
            <AppText color='muted' size='bodySm'>
              {formatMealTime(createdAt)}
            </AppText>

            <AppText numberOfLines={2} weight='medium'>
              {name}
            </AppText>
          </View>
        </View>

        <MacroStats macros={meal} />
      </Pressable>
    </ReanimatedSwipeable>
  );
}
