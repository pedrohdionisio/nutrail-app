import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { COLORS } from 'shared/constants/colors';
import { MealCardDeleteAction } from './components/MealCardDeleteAction/MealCardDeleteAction';
import { MealStat } from './components/MealStat/MealStat';
import { MEAL_INPUT_ICONS } from './constants/mealInputIcons';
import type { IMealCardProps } from './MealCardTypes';
import { useMealCardController } from './useMealCardController';
import { formatMealTime } from './utils/formatMealTime';

export function MealCard({ meal, onPress, onDelete }: IMealCardProps) {
  const { id, name, inputType, createdAt, calories, protein, carbohydrate, fat } = meal;
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

        <View className='flex-row rounded-xl bg-gray-100 py-3'>
          <MealStat dotClassName='bg-support-tomato' label='kcal' value={`${calories}`} />
          <MealStat dotClassName='bg-support-teal' label='Proteínas' value={`${protein}g`} />
          <MealStat dotClassName='bg-support-yellow' label='Carbos' value={`${carbohydrate}g`} />
          <MealStat dotClassName='bg-support-orange' label='Gorduras' value={`${fat}g`} />
        </View>
      </Pressable>
    </ReanimatedSwipeable>
  );
}
