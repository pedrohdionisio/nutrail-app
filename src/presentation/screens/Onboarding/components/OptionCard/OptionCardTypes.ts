import type { IOnboardingOption } from '../../OnboardingTypes';

export type OptionCardOrientation = 'row' | 'column';

export interface IOptionCardProps {
  option: IOnboardingOption;
  isSelected: boolean;
  orientation: OptionCardOrientation;
  onPress: () => void;
}
