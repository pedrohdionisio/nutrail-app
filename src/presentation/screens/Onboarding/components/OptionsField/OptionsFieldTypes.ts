import type {
  SignUpFormType,
  SignUpPayloadType
} from 'data/modules/auth/useCases/signUp/schemas/signUpSchema';
import type { Control } from 'react-hook-form';
import type { IOnboardingOption } from '../../OnboardingTypes';
import type { OptionCardOrientation } from '../OptionCard/OptionCardTypes';

export type OptionsFieldName = 'goal' | 'gender' | 'activityLevel';

export interface IOptionsFieldProps {
  control: Control<SignUpFormType, unknown, SignUpPayloadType>;
  name: OptionsFieldName;
  options: IOnboardingOption[];
  orientation: OptionCardOrientation;
}

export interface IUseOptionsFieldControllerParams {
  control: Control<SignUpFormType, unknown, SignUpPayloadType>;
  name: OptionsFieldName;
}

export interface IHandleSelectOptionParams {
  value: string;
}
