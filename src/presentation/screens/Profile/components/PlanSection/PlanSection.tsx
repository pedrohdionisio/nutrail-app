import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { IPlanSectionProps } from './PlanSectionTypes';

export function PlanSection({ plan, onPress }: IPlanSectionProps) {
  const { t } = useTranslation();

  return (
    <View className='gap-3 rounded-xl border border-gray-400 p-4'>
      <View className='gap-1'>
        <AppText color='muted' size='bodySm'>
          {t('profile.planTitle')}
        </AppText>
        <AppText weight='semibold'>{plan.title}</AppText>
        <AppText color='muted' size='bodySm'>
          {plan.limits}
        </AppText>
        {!!plan.cancelAtLabel && <AppText size='bodySm'>{plan.cancelAtLabel}</AppText>}
      </View>

      <Button
        isLoading={plan.isLoading}
        onPress={onPress}
        title={plan.actionTitle}
        variant='secondary'
      />
    </View>
  );
}
