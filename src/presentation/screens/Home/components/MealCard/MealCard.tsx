import CircleAlertIcon from 'lucide-react-native/icons/circle-alert';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { MacroStats } from 'presentation/components/MacroStats/MacroStats';
import { SwipeDeleteAction } from 'presentation/components/SwipeDeleteAction/SwipeDeleteAction';
import { ActivityIndicator, Pressable, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { COLORS } from 'shared/constants/colors';
import { MEAL_INPUT_ICONS } from './constants/mealInputIcons';
import type { IMealCardProps } from './MealCardTypes';
import { useMealCardController } from './useMealCardController';

export function MealCard({ meal, isRetrying, onPress, onDelete, onRetry }: IMealCardProps) {
  const InputIcon = MEAL_INPUT_ICONS[meal.inputType];
  const { swipeableRef, state, title, timeLabel, handlePress, handleDelete, handleRetry } =
    useMealCardController({ meal, onPress, onDelete, onRetry });

  return (
    <ReanimatedSwipeable
      friction={2}
      overshootRight={false}
      ref={swipeableRef}
      renderRightActions={() => (
        <SwipeDeleteAction accessibilityLabel='Excluir refeição' onPress={handleDelete} />
      )}
      rightThreshold={40}
    >
      <Pressable
        accessibilityHint={state === 'ANALYZED' ? 'Abre os detalhes da refeição' : undefined}
        accessibilityRole='button'
        className='gap-4 rounded-2xl border border-gray-400 bg-white p-4 active:opacity-80'
        disabled={state !== 'ANALYZED'}
        onPress={handlePress}
      >
        <View className='flex-row items-center gap-3'>
          <View className='h-12 w-12 items-center justify-center rounded-xl bg-gray-200'>
            {state === 'ANALYZED' && (
              <InputIcon color={COLORS.black[700]} size={20} strokeWidth={1.8} />
            )}
            {state === 'ANALYZING' && (
              <ActivityIndicator accessibilityLabel='Analisando' color={COLORS.lime[700]} />
            )}
            {state === 'FAILED' && (
              <CircleAlertIcon color={COLORS.support.red} size={20} strokeWidth={1.8} />
            )}
          </View>

          <View className='flex-1 gap-0.5'>
            <AppText color='muted' size='bodySm'>
              {timeLabel}
            </AppText>

            <AppText numberOfLines={2} weight='medium'>
              {title}
            </AppText>
          </View>
        </View>

        {state === 'ANALYZED' && <MacroStats macros={meal} />}

        {state === 'ANALYZING' && (
          <AppText color='muted' size='bodySm'>
            Estamos calculando os macros. A refeição entra no resumo do dia assim que ficar pronta.
          </AppText>
        )}

        {state === 'FAILED' && (
          <View className='gap-3'>
            <AppText color='error' size='bodySm'>
              Não conseguimos analisar esta refeição. Tente de novo ou exclua deslizando para o
              lado.
            </AppText>

            <Button
              isLoading={isRetrying}
              onPress={handleRetry}
              title='Tentar de novo'
              variant='secondary'
            />
          </View>
        )}
      </Pressable>
    </ReanimatedSwipeable>
  );
}
