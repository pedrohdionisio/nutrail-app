import { StatusBar } from 'expo-status-bar';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { GOAL_SUMMARY } from '../../constants/onboardingOptions';
import { MacroValue } from '../MacroValue/MacroValue';
import type { IPlanSummaryProps } from './PlanSummaryTypes';

export function PlanSummary({ me, onStart }: IPlanSummaryProps) {
  const { paddingTop, paddingBottom } = useScreenPadding();
  const { label: goalLabel, icon: GoalIcon } = GOAL_SUMMARY[me.profile.goal];
  const { calories, protein, carbohydrate, fat } = me.goals;

  return (
    <View className='flex-1 bg-lime-900 px-5' style={{ paddingTop, paddingBottom }}>
      <StatusBar style='light' />

      <View className='flex-1 items-center justify-center gap-12'>
        <View className='items-center gap-6'>
          <View className='h-14 w-14 items-center justify-center rounded-full bg-gray-200'>
            <GoalIcon color={COLORS.black[700]} size={26} strokeWidth={1.8} />
          </View>

          <View className='gap-4'>
            <AppText accessibilityRole='header' align='center' color='inverse' size='title1'>
              Seu plano de dieta para{' '}
              <AppText color='brand' size='title1'>
                {goalLabel}
              </AppText>{' '}
              está pronto!
            </AppText>

            <AppText align='center' color='inverseMuted'>
              Essa é a meta diária recomendada para o seu plano. Fique tranquilo, você poderá editar
              depois caso deseje.
            </AppText>
          </View>
        </View>

        <View className='w-full items-center gap-10'>
          <View className='items-center gap-1'>
            <AppText className='text-support-tomato' size='title1'>
              {`${calories} kcal`}
            </AppText>

            <AppText color='inverse'>Calorias</AppText>
          </View>

          <View className='w-full flex-row'>
            <MacroValue
              label='Proteínas'
              value={`${protein}g`}
              valueClassName='text-support-teal'
            />
            <MacroValue
              label='Carboidratos'
              value={`${carbohydrate}g`}
              valueClassName='text-support-yellow'
            />
            <MacroValue label='Gorduras' value={`${fat}g`} valueClassName='text-support-orange' />
          </View>
        </View>
      </View>

      <Button onPress={onStart} title='Começar meu plano' />
    </View>
  );
}
