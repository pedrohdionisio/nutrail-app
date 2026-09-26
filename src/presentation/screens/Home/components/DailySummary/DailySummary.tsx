import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { MacroProgress } from './components/MacroProgress/MacroProgress';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import type { IDailySummaryProps } from './DailySummaryTypes';
import { formatRemainingCalories } from './utils/formatRemainingCalories';

export function DailySummary({ consumed, goals }: IDailySummaryProps) {
  return (
    <View className='gap-6 border-gray-400 border-b pb-6'>
      <View className='gap-3'>
        <View className='flex-row items-end justify-between gap-4'>
          <View className='gap-1'>
            <AppText color='muted' size='bodySm'>
              Calorias
            </AppText>

            <AppText size='title1'>
              {`${consumed.calories} `}
              <AppText color='muted'>{`/ ${goals.calories} kcal`}</AppText>
            </AppText>
          </View>

          <AppText color='muted' size='bodySm'>
            {formatRemainingCalories(consumed.calories, goals.calories)}
          </AppText>
        </View>

        <ProgressBar
          className='h-3'
          fillClassName='bg-support-tomato'
          label='Calorias'
          max={goals.calories}
          value={consumed.calories}
        />
      </View>

      <View className='flex-row gap-5'>
        <MacroProgress
          fillClassName='bg-support-teal'
          goal={goals.protein}
          label='Proteínas'
          value={consumed.protein}
        />
        <MacroProgress
          fillClassName='bg-support-yellow'
          goal={goals.carbohydrate}
          label='Carboidratos'
          value={consumed.carbohydrate}
        />
        <MacroProgress
          fillClassName='bg-support-orange'
          goal={goals.fat}
          label='Gorduras'
          value={consumed.fat}
        />
      </View>
    </View>
  );
}
