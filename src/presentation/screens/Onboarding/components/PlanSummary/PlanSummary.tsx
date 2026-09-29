import { StatusBar } from 'expo-status-bar';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { GOAL_SUMMARY } from '../../constants/onboardingOptions';
import { MacroValue } from '../MacroValue/MacroValue';
import type { IPlanSummaryProps } from './PlanSummaryTypes';

export function PlanSummary({ me, onStart }: IPlanSummaryProps) {
  const { t } = useTranslation();
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
              {t('onboarding.planTitlePrefix')}{' '}
              <AppText color='brand' size='title1'>
                {t(goalLabel)}
              </AppText>{' '}
              {t('onboarding.planTitleSuffix')}
            </AppText>

            <AppText align='center' color='inverseMuted'>
              {t('onboarding.planDescription')}
            </AppText>
          </View>
        </View>

        <View className='w-full items-center gap-10'>
          <View className='items-center gap-1'>
            <AppText className='text-support-tomato' size='title1'>
              {`${calories} kcal`}
            </AppText>

            <AppText color='inverse'>{t('common.calories')}</AppText>
          </View>

          <View className='w-full flex-row'>
            <MacroValue
              label={t('common.protein')}
              value={`${protein}g`}
              valueClassName='text-support-teal'
            />
            <MacroValue
              label={t('common.carbohydrate')}
              value={`${carbohydrate}g`}
              valueClassName='text-support-yellow'
            />
            <MacroValue
              label={t('common.fat')}
              value={`${fat}g`}
              valueClassName='text-support-orange'
            />
          </View>
        </View>
      </View>

      <Button onPress={onStart} title={t('onboarding.startPlan')} />
    </View>
  );
}
