import { cva } from 'class-variance-authority';

export const optionsFieldVariants = cva('', {
  variants: {
    orientation: {
      row: 'gap-4',
      column: 'flex-row gap-4'
    }
  }
});
