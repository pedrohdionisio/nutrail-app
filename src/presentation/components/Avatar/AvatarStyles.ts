import { cva } from 'class-variance-authority';

export const avatarVariants = cva('items-center justify-center rounded-full bg-lime-700', {
  variants: {
    size: {
      md: 'h-12 w-12',
      lg: 'h-24 w-24'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
