import type {
  SignUpFormType,
  SignUpPayloadType
} from 'data/modules/auth/useCases/signUp/schemas/signUpSchema';
import type { Control } from 'react-hook-form';

export interface IBirthDateFieldProps {
  control: Control<SignUpFormType, unknown, SignUpPayloadType>;
}

export interface IUseBirthDateFieldControllerParams {
  control: Control<SignUpFormType, unknown, SignUpPayloadType>;
}
