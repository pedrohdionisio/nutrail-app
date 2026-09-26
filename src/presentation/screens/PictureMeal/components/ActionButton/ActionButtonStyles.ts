import { cva } from 'class-variance-authority';
import { COLORS } from 'shared/constants/colors';

export const actionButtonVariants = cva(
  'h-12 w-12 items-center justify-center rounded-xl active:opacity-80',
  {
    variants: {
      variant: {
        dark: 'bg-black-700',
        brand: 'bg-black-700',
        primary: 'bg-lime-500'
      },
      isDisabled: {
        true: 'opacity-50',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'dark',
      isDisabled: false
    }
  }
);

export const ACTION_BUTTON_ICON_COLORS = {
  dark: COLORS.white,
  brand: COLORS.lime[500],
  primary: COLORS.black[700]
} as const;
