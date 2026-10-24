import type {
  UpdateProfileFormType,
  UpdateProfilePayloadType
} from 'data/modules/profile/useCases/updateProfile/schemas/updateProfileSchema';
import type { Control } from 'react-hook-form';
import type { Language } from 'shared/constants/language';
import type { ISelectLanguageParams } from '../LanguageField/LanguageFieldTypes';
import type { IPlanSectionView } from '../PlanSection/PlanSectionTypes';

export interface IProfileFormProps {
  control: Control<UpdateProfileFormType, unknown, UpdateProfilePayloadType>;
  initials: string;
  apiErrorMessage: string | null;
  language: Language;
  plan: IPlanSectionView | null;
  onManagePlan: () => void;
  onSelectLanguage: (params: ISelectLanguageParams) => void;
  onChangePassword: () => void;
  onDeleteAccount: () => void;
}
