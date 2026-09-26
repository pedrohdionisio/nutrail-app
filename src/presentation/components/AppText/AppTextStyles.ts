import { cva } from 'class-variance-authority';

export const appTextVariants = cva('', {
  variants: {
    size: {
      caption: 'text-caption uppercase',
      title1: 'text-title-1',
      title2: 'text-title-2',
      bodyXl: 'text-body-xl',
      body: 'text-body',
      bodySm: 'text-body-sm',
      bodyXs: 'text-body-xs'
    },
    weight: {
      regular: 'font-host-grotesk-regular',
      medium: 'font-host-grotesk-medium',
      semibold: 'font-host-grotesk-semibold'
    },
    color: {
      default: 'text-black-700',
      muted: 'text-gray-700',
      inverse: 'text-white',
      brand: 'text-lime-500',
      error: 'text-support-red'
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    }
  },
  defaultVariants: {
    color: 'default',
    align: 'left'
  }
});

export const DEFAULT_WEIGHT_BY_SIZE = {
  caption: 'medium',
  title1: 'semibold',
  title2: 'semibold',
  bodyXl: 'medium',
  body: 'regular',
  bodySm: 'regular',
  bodyXs: 'regular'
} as const;
