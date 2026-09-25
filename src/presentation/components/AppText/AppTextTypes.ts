import type { VariantProps } from 'class-variance-authority';
import type { TextProps } from 'react-native';
import type { appTextVariants } from './AppTextStyles';

type AppTextVariants = VariantProps<typeof appTextVariants>;

export interface IAppTextProps extends TextProps, Omit<AppTextVariants, 'size' | 'weight'> {
  size?: NonNullable<AppTextVariants['size']>;
  weight?: NonNullable<AppTextVariants['weight']>;
  className?: string;
}
