import type { VariantProps } from 'class-variance-authority';
import type { avatarVariants } from './AvatarStyles';

export interface IAvatarProps extends VariantProps<typeof avatarVariants> {
  initials: string;
}
