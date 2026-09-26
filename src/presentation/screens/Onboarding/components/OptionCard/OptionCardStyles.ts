import { cva } from 'class-variance-authority';

export const optionCardVariants = cva('rounded-2xl border active:opacity-80', {
  variants: {
    orientation: {
      row: 'flex-row items-center gap-4 p-4',
      column: 'flex-1 items-center gap-6 px-4 py-8'
    },
    isSelected: {
      true: 'border-lime-700 bg-lime-700/10',
      false: 'border-gray-300 bg-white'
    }
  }
});

export const optionIconVariants = cva('h-12 w-12 items-center justify-center rounded-xl', {
  variants: {
    isSelected: {
      true: 'bg-white/60',
      false: 'bg-gray-200'
    }
  }
});
