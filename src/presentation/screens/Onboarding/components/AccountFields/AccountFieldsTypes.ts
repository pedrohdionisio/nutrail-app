import type {
  SignUpFormType,
  SignUpPayloadType
} from 'data/modules/auth/useCases/signUp/schemas/signUpSchema';
import type { Control } from 'react-hook-form';

export interface IAccountFieldsProps {
  control: Control<SignUpFormType, unknown, SignUpPayloadType>;
  apiErrorMessage: string | null;
}
