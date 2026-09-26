import { cva } from 'class-variance-authority';

export const onboardingContentVariants = cva('flex-1 py-8', {
  variants: {
    contentAlignment: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end'
    }
  }
});
