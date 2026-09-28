import type {
  UpdateProfileFormType,
  UpdateProfilePayloadType
} from 'data/modules/profile/useCases/updateProfile/schemas/updateProfileSchema';
import type { Control } from 'react-hook-form';

export interface IProfileFormProps {
  control: Control<UpdateProfileFormType, unknown, UpdateProfilePayloadType>;
  initials: string;
  apiErrorMessage: string | null;
  onDeleteAccount: () => void;
}
