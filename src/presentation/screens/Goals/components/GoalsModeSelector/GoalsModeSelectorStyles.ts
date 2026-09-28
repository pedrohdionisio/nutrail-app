import { cva } from 'class-variance-authority';

export const modeSegmentVariants = cva('h-11 flex-1 items-center justify-center rounded-lg', {
  variants: {
    isSelected: {
      true: 'bg-white',
      false: 'active:opacity-80'
    }
  }
});
