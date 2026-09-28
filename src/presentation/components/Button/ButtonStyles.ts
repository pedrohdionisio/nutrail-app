import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'h-13 flex-row items-center justify-center gap-2 rounded-xl px-5 active:opacity-80',
  {
    variants: {
      variant: {
        primary: 'bg-lime-500',
        secondary: 'bg-gray-300',
        danger: 'bg-support-red',
        ghost: 'bg-transparent'
      },
      isDisabled: {
        true: 'opacity-50',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'primary',
      isDisabled: false
    }
  }
);
