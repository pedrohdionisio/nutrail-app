import { AppText } from 'presentation/components/AppText/AppText';
import { ActivityIndicator, Pressable } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { cn } from 'shared/utils/cn';
import { buttonVariants } from './ButtonStyles';
import type { IButtonProps } from './ButtonTypes';

export function Button({
  title,
  variant,
  isLoading = false,
  disabled,
  className,
  ...props
}: IButtonProps) {
  const isDisabled = Boolean(disabled) || isLoading;

  return (
    <Pressable
      accessibilityRole='button'
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      className={cn(buttonVariants({ variant, isDisabled }), className)}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.black[700]} />
      ) : (
        <AppText weight='medium'>{title}</AppText>
      )}
    </Pressable>
  );
}
