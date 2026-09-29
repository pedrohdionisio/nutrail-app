import ArrowRightIcon from 'lucide-react-native/icons/arrow-right';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { cn } from 'shared/utils/cn';
import type { INextButtonProps } from './NextButtonTypes';

export function NextButton({ disabled, onPress }: INextButtonProps) {
  const { t } = useTranslation();
  return (
    <Pressable
      accessibilityLabel={t('common.continue')}
      accessibilityRole='button'
      accessibilityState={{ disabled }}
      className={cn(
        'h-12 w-12 items-center justify-center self-end rounded-xl bg-lime-500 active:opacity-80',
        disabled && 'opacity-50'
      )}
      disabled={disabled}
      onPress={onPress}
    >
      <ArrowRightIcon color={COLORS.black[700]} size={20} strokeWidth={2} />
    </Pressable>
  );
}
