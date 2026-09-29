import { getLanguage } from 'data/config/i18n';
import type { UpdateProfileFormType } from 'data/modules/profile/useCases/updateProfile/schemas/updateProfileSchema';
import type { IUserProfile } from 'shared/entities/IUserProfile';
import { toDateInput } from 'shared/utils/toDateInput';
import { toDecimalInput } from 'shared/utils/toDecimalInput';

export function toProfileFormValues({
  name,
  birthDate,
  height,
  weight,
  gender,
  goal,
  activityLevel
}: IUserProfile): UpdateProfileFormType {
  return {
    name,
    birthDate: toDateInput(birthDate, getLanguage()),
    height: String(height),
    weight: toDecimalInput(weight, getLanguage()),
    gender,
    goal,
    activityLevel
  };
}
